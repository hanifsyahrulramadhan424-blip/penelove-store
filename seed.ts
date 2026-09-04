import { PrismaClient } from "@prisma/client";
import { CATEGORIES_DATA, PRODUCTS_DATA } from "./lib/data";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Mulai Seeding Data Penelove Pricelist...");

  // 1. Seed Categories
  for (const cat of CATEGORIES_DATA) {
    await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {
        name: cat.name,
        icon: cat.icon,
        description: cat.description,
        order: cat.order,
      },
      create: {
        id: cat.id,
        name: cat.name,
        slug: cat.slug,
        icon: cat.icon,
        description: cat.description,
        order: cat.order,
      },
    });
    console.log(`✅ Kategori siap: ${cat.name}`);
  }

  // 2. Seed Products & Variants
  for (const prod of PRODUCTS_DATA) {
    const featuresString = Array.isArray(prod.features)
      ? JSON.stringify(prod.features)
      : prod.features;

    // Upsert product
    const createdProduct = await prisma.product.upsert({
      where: { slug: prod.slug },
      update: {
        name: prod.name,
        categoryId: prod.categoryId,
        description: prod.description,
        features: featuresString,
        icon: prod.icon,
        badge: prod.badge,
        badgeColor: prod.badgeColor,
        isPopular: prod.isPopular,
        warrantyDays: prod.warrantyDays,
        order: prod.order,
      },
      create: {
        id: prod.id,
        name: prod.name,
        slug: prod.slug,
        categoryId: prod.categoryId,
        description: prod.description,
        features: featuresString,
        icon: prod.icon,
        badge: prod.badge,
        badgeColor: prod.badgeColor,
        isPopular: prod.isPopular,
        warrantyDays: prod.warrantyDays,
        order: prod.order,
      },
    });

    // Delete existing variants for clean replace on re-seed
    await prisma.productVariant.deleteMany({
      where: { productId: createdProduct.id },
    });

    // Create variants
    for (const variant of prod.variants) {
      await prisma.productVariant.create({
        data: {
          id: variant.id,
          productId: createdProduct.id,
          duration: variant.duration,
          accountType: variant.accountType,
          price: variant.price,
          originalPrice: variant.originalPrice,
          isDefault: variant.isDefault,
        },
      });
    }

    console.log(`📦 Produk siap: ${prod.name} (${prod.variants.length} varian)`);
  }

  const totalProducts = await prisma.product.count();
  const totalVariants = await prisma.productVariant.count();
  console.log(`\n🎉 Seeding Selesai! Berhasil memuat ${totalProducts} produk dan ${totalVariants} varian.`);
}

main()
  .catch((e) => {
    console.error("❌ Error Seeding Prisma:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
