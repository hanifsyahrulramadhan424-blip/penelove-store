import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { ProductQuerySchema, safeErrorResponse, safeSuccessResponse } from "@/lib/security";
import { CATEGORIES_DATA, PRODUCTS_DATA } from "@/lib/data";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const rawCategory = searchParams.get("category") || undefined;
    const rawSearch = searchParams.get("search") || undefined;
    const rawSort = searchParams.get("sort") || "popular";

    // 1. Zod Validation for search parameters
    const parseResult = ProductQuerySchema.safeParse({
      category: rawCategory,
      search: rawSearch,
      sort: rawSort,
    });

    if (!parseResult.success) {
      return safeErrorResponse("Parameter query tidak valid", 400, parseResult.error.flatten());
    }

    const { category, search, sort } = parseResult.data;

    // 2. Fetch categories & products via Prisma ORM
    try {
      // Build Prisma where clause safely without raw SQL
      const whereClause: any = {};

      if (category && category !== "all") {
        whereClause.category = {
          slug: category,
        };
      }

      if (search && search.trim() !== "") {
        whereClause.OR = [
          { name: { contains: search } },
          { description: { contains: search } },
        ];
      }

      // Sorting strategy
      let orderBy: any = [{ order: "asc" }, { createdAt: "desc" }];
      if (sort === "popular") {
        orderBy = [{ isPopular: "desc" }, { order: "asc" }];
      } else if (sort === "name-asc") {
        orderBy = [{ name: "asc" }];
      }

      const [categories, products] = await Promise.all([
        prisma.category.findMany({
          orderBy: { order: "asc" },
          include: {
            _count: {
              select: { products: true },
            },
          },
        }),
        prisma.product.findMany({
          where: whereClause,
          orderBy,
          include: {
            variants: {
              orderBy: [{ isDefault: "desc" }, { price: "asc" }],
            },
            category: true,
          },
        }),
      ]);

      // If price sorting was requested
      let sortedProducts = products;
      if (sort === "price-asc") {
        sortedProducts = [...products].sort((a, b) => {
          const priceA = a.variants[0]?.price || 0;
          const priceB = b.variants[0]?.price || 0;
          return priceA - priceB;
        });
      } else if (sort === "price-desc") {
        sortedProducts = [...products].sort((a, b) => {
          const priceA = a.variants[0]?.price || 0;
          const priceB = b.variants[0]?.price || 0;
          return priceB - priceA;
        });
      }

      // Parse JSON string features back to array if needed
      const sanitizedProducts = sortedProducts.map((p) => {
        let parsedFeatures: string[] = [];
        try {
          parsedFeatures = typeof p.features === "string" ? JSON.parse(p.features) : p.features;
        } catch {
          parsedFeatures = typeof p.features === "string" ? p.features.split(",") : [];
        }
        return {
          ...p,
          features: parsedFeatures,
        };
      });

      return safeSuccessResponse({
        categories,
        products: sanitizedProducts,
        total: sanitizedProducts.length,
      });
    } catch (dbError) {
      console.warn("Database fallback to in-memory data:", dbError);
      
      // Resilient Fallback to static memory dataset if DB is warming up
      let filtered = PRODUCTS_DATA;
      if (category && category !== "all") {
        filtered = filtered.filter((p) => p.categorySlug === category);
      }
      if (search && search.trim() !== "") {
        const lowerSearch = search.toLowerCase();
        filtered = filtered.filter(
          (p) =>
            p.name.toLowerCase().includes(lowerSearch) ||
            p.description.toLowerCase().includes(lowerSearch)
        );
      }

      return safeSuccessResponse({
        categories: CATEGORIES_DATA,
        products: filtered,
        total: filtered.length,
      });
    }
  } catch (error) {
    console.error("GET /api/products unexpected error:", error);
    return safeErrorResponse("Gagal mengambil data katalog produk", 500);
  }
}
