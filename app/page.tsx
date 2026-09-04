"use client";

import React, { useState, useEffect, useMemo } from "react";
import { Header } from "@/components/Header";
import { HeroBanner } from "@/components/HeroBanner";
import { CategoryTabs } from "@/components/CategoryTabs";
import { SearchBar } from "@/components/SearchBar";
import { ProductCard } from "@/components/ProductCard";
import { HowToOrder } from "@/components/HowToOrder";
import { FAQSection } from "@/components/FAQSection";
import { TrustBadges } from "@/components/TrustBadges";
import { Footer } from "@/components/Footer";
import { Toast } from "@/components/Toast";
import { ProductType, SortOption } from "@/lib/types";
import { PRODUCTS_DATA, CATEGORIES_DATA } from "@/lib/data";
import { Sparkles, Frown, RefreshCw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function HomePage() {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortOption, setSortOption] = useState<SortOption>("popular");
  const [filterTag, setFilterTag] = useState<string>("all");
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  // Fetch products from API on mount
  useEffect(() => {
    async function loadProducts() {
      try {
        setLoading(true);
        const res = await fetch("/api/products");
        const json = await res.json();
        if (json.success && json.data?.products) {
          setProducts(json.data.products);
        } else {
          // Fallback to local data
          setProducts(PRODUCTS_DATA as any);
        }
      } catch (err) {
        console.warn("Failed fetching from API, using fallback:", err);
        setProducts(PRODUCTS_DATA as any);
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  // Compute category counts
  const categoryCounts = useMemo(() => {
    const aiCount = products.filter(
      (p) => p.categoryId === "cat-ai-prod" || (p as any).categorySlug === "ai-productivity"
    ).length;
    const streamingCount = products.filter(
      (p) => p.categoryId === "cat-streaming" || (p as any).categorySlug === "streaming-apps"
    ).length;

    return {
      all: products.length,
      ai: aiCount || 18,
      streaming: streamingCount || 31,
    };
  }, [products]);

  // Filter and Sort Logic
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // 1. Category Filter
    if (selectedCategory !== "all") {
      result = result.filter(
        (p) =>
          p.categoryId === selectedCategory ||
          (selectedCategory === "ai-productivity" && p.categoryId === "cat-ai-prod") ||
          (selectedCategory === "streaming-apps" && p.categoryId === "cat-streaming") ||
          (p as any).categorySlug === selectedCategory
      );
    }

    // 2. Search Keyword Filter
    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.slug.toLowerCase().includes(q)
      );
    }

    // 3. Tag Filter
    if (filterTag === "best-seller") {
      result = result.filter((p) => p.isPopular || (p.badge && p.badge.includes("Best")));
    } else if (filterTag === "sharing") {
      result = result.filter((p) =>
        p.variants.some((v) => v.accountType.toLowerCase().includes("sharing"))
      );
    } else if (filterTag === "private") {
      result = result.filter((p) =>
        p.variants.some((v) => v.accountType.toLowerCase().includes("private"))
      );
    } else if (filterTag === "long-warranty") {
      result = result.filter((p) => p.warrantyDays >= 60);
    }

    // 4. Sorting
    if (sortOption === "popular") {
      result.sort((a, b) => (b.isPopular ? 1 : 0) - (a.isPopular ? 1 : 0) || a.order - b.order);
    } else if (sortOption === "price-asc") {
      result.sort((a, b) => {
        const minA = Math.min(...a.variants.map((v) => v.price));
        const minB = Math.min(...b.variants.map((v) => v.price));
        return minA - minB;
      });
    } else if (sortOption === "price-desc") {
      result.sort((a, b) => {
        const minA = Math.min(...a.variants.map((v) => v.price));
        const minB = Math.min(...b.variants.map((v) => v.price));
        return minB - minA;
      });
    } else if (sortOption === "name-asc") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    }

    return result;
  }, [products, selectedCategory, searchQuery, filterTag, sortOption]);

  const handleOrderSuccess = (info: { productName: string; variantDuration: string; price: number }) => {
    const formattedPrice = new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(info.price);

    setToastMsg(`Membuka WhatsApp untuk order ${info.productName} (${info.variantDuration}) - ${formattedPrice} 💖`);
    setTimeout(() => setToastMsg(null), 5000);
  };

  const handleResetFilters = () => {
    setSelectedCategory("all");
    setSearchQuery("");
    setFilterTag("all");
    setSortOption("popular");
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <Header />

      {/* Hero Banner */}
      <HeroBanner
        totalApps={products.length || 49}
        onExploreClick={() => {
          const el = document.getElementById("catalog");
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }}
      />

      {/* Catalog Section */}
      <main id="catalog" className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-8 scroll-mt-24">
        {/* Section Heading */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#FDD1D9] text-[#AC2849] border border-[#FAB4C2] text-xs font-black shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 fill-[#EE5B7F] text-[#EE5B7F]" />
            <span>KATALOG LENGKAP & READY</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-display font-extrabold text-slate-800 tracking-tight">
            Pricelist Aplikasi Premium
          </h2>
          <p className="text-slate-500 text-xs sm:text-sm max-w-lg mx-auto">
            Klik durasi untuk cek harga otomatis, lalu pesan instan via WhatsApp!
          </p>
        </div>

        {/* Category Tabs */}
        <CategoryTabs
          selectedCategory={selectedCategory}
          onSelectCategory={(cat) => setSelectedCategory(cat)}
          counts={categoryCounts}
        />

        {/* Search & Filter Toolbar */}
        <SearchBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          sortOption={sortOption}
          onSortChange={setSortOption}
          selectedFilterTag={filterTag}
          onFilterTagChange={setFilterTag}
          totalResults={filteredProducts.length}
        />

        {/* Product Cards Grid */}
        {loading ? (
          <div className="py-20 text-center space-y-3">
            <div className="w-12 h-12 border-4 border-[#FDD1D9] border-t-[#EE5B7F] rounded-full animate-spin mx-auto" />
            <p className="text-slate-500 text-sm font-semibold">Memuat pricelist Penelove...</p>
          </div>
        ) : filteredProducts.length > 0 ? (
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2"
          >
            <AnimatePresence>
              {filteredProducts.map((product) => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.25 }}
                >
                  <ProductCard
                    product={product}
                    onOrderSuccess={handleOrderSuccess}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          /* Empty State when no match */
          <div className="py-16 px-4 text-center space-y-4 glass-card rounded-3xl max-w-md mx-auto my-8 border-2 border-dashed border-[#FDD1D9]">
            <div className="w-16 h-16 rounded-full bg-[#FDD1D9] flex items-center justify-center mx-auto text-[#EE5B7F]">
              <Frown className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <h3 className="font-display font-bold text-lg text-slate-800">
                Aplikasi Tidak Ditemukan
              </h3>
              <p className="text-xs text-slate-500">
                Tidak ada aplikasi yang cocok dengan kata kunci <strong>"{searchQuery}"</strong> atau filter saat ini.
              </p>
            </div>
            <button
              onClick={handleResetFilters}
              className="inline-flex items-center gap-2 btn-cheerful-pink text-white font-bold text-xs px-5 py-2.5 rounded-xl cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset Pencarian</span>
            </button>
          </div>
        )}
      </main>

      {/* How to Order Guide */}
      <HowToOrder />

      {/* Trust & Testimonials */}
      <TrustBadges />

      {/* FAQs */}
      <FAQSection />

      {/* Footer */}
      <Footer />

      {/* Toast Notification */}
      <Toast
        message={toastMsg || ""}
        isVisible={!!toastMsg}
        onClose={() => setToastMsg(null)}
      />
    </div>
  );
}
