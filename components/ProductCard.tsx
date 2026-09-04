"use client";

import React, { useState } from "react";
import { ProductType, ProductVariantType } from "@/lib/types";
import {
  Sparkles,
  ShieldCheck,
  Check,
  MessageCircle,
  Clock,
  Zap,
  Star,
  ExternalLink,
  Bot,
  BrainCircuit,
  Boxes,
  LayoutGrid,
  Compass,
  GraduationCap,
  Languages,
  Video,
  Feather,
  BookOpen,
  Briefcase,
  FileSpreadsheet,
  Atom,
  CheckCheck,
  Globe,
  BookMarked,
  Film,
  Tv,
  Clapperboard,
  Trophy,
  Heart,
  Tv2,
  PlayCircle,
  Smartphone,
  HeartHandshake,
  Play,
  Rainbow,
  PlaySquare,
  Waves,
  LucideIcon,
} from "lucide-react";
import confetti from "canvas-confetti";

interface ProductCardProps {
  product: ProductType;
  onOrderSuccess?: (info: { productName: string; variantDuration: string; price: number }) => void;
  onOpenDetails?: (product: ProductType, selectedVariant: ProductVariantType) => void;
}

// Icon dictionary mapper
const ICON_MAP: Record<string, LucideIcon> = {
  Bot,
  BrainCircuit,
  Zap,
  Boxes,
  LayoutGrid,
  Compass,
  GraduationCap,
  Languages,
  Video,
  Feather,
  BookOpen,
  Briefcase,
  FileSpreadsheet,
  Atom,
  CheckCheck,
  Globe,
  BookMarked,
  Film,
  Tv,
  Clapperboard,
  Trophy,
  Sparkles,
  Heart,
  Tv2,
  PlayCircle,
  Smartphone,
  HeartHandshake,
  Play,
  Rainbow,
  PlaySquare,
  Waves,
  Star,
};

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onOrderSuccess,
  onOpenDetails,
}) => {
  // Select initial default variant or first variant
  const defaultVar =
    product.variants.find((v) => v.isDefault) || product.variants[0] || {
      id: "v-default",
      productId: product.id,
      duration: "1 Bulan",
      accountType: "Sharing",
      price: 25000,
      originalPrice: 50000,
      isDefault: true,
    };

  const [selectedVariant, setSelectedVariant] = useState<ProductVariantType>(defaultVar);
  const [isOrdering, setIsOrdering] = useState(false);

  const IconComponent = ICON_MAP[product.icon] || Sparkles;

  // Calculate discount percentage
  const discountPercent =
    selectedVariant.originalPrice && selectedVariant.originalPrice > selectedVariant.price
      ? Math.round(
          ((selectedVariant.originalPrice - selectedVariant.price) /
            selectedVariant.originalPrice) *
            100
        )
      : null;

  // Format IDR Currency
  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(val);
  };

  // Parse features if string
  const featuresList: string[] = Array.isArray(product.features)
    ? product.features
    : typeof product.features === "string"
    ? (() => {
        try {
          return JSON.parse(product.features);
        } catch {
          return (product.features as string).split(",");
        }
      })()
    : [];

  // Cheerful pastel color variants for badges & icons - 5 requested colors
  const badgeColorClass =
    product.badgeColor === "pink"
      ? "bg-[#FDD1D9] text-[#AC2849] border-[#FAB4C2]"
      : product.badgeColor === "blue"
      ? "bg-[#BCE0F6] text-[#1777B6] border-[#8ECCF1]"
      : product.badgeColor === "yellow"
      ? "bg-[#FFE9A9] text-[#9A6008] border-[#FED978]"
      : product.badgeColor === "lilac"
      ? "bg-[#D0CCE9] text-[#4F3E8C] border-[#B4ACE0]"
      : "bg-[#E1E8BC] text-[#4A5D18] border-[#C7D58F]";

  const iconBgClass =
    product.categoryId === "cat-ai-prod"
      ? "bg-gradient-to-br from-[#BCE0F6] via-[#D0CCE9] to-[#FDD1D9] text-[#2695DC]"
      : "bg-gradient-to-br from-[#FDD1D9] via-[#FFE9A9] to-[#D0CCE9] text-[#EE5B7F]";

  // Handle Direct WhatsApp Order Click
  const handleOrderWhatsApp = async () => {
    setIsOrdering(true);

    // Trigger sweet confetti burst
    try {
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.8 },
        colors: ["#FDD1D9", "#FFE9A9", "#D0CCE9", "#BCE0F6", "#E1E8BC"],
      });
    } catch {
      // ignore
    }

    try {
      // Optimistically log inquiry to API (Zod-validated & Rate-limited)
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId: product.id,
          variantId: selectedVariant.id,
          productName: product.name,
          variantDuration: selectedVariant.duration,
          price: selectedVariant.price,
          accountType: selectedVariant.accountType,
        }),
      });

      const json = await res.json();

      let targetUrl = "";
      if (json.success && json.data?.whatsappUrl) {
        targetUrl = json.data.whatsappUrl;
      } else {
        // Fallback standard URL
        const waNum = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "6289501485483";
        const fallbackMsg = `Halo Kak Admin Penelove Pricelist! 💖\nSaya mau order: *${product.name}*\nDurasi: ${selectedVariant.duration} (${selectedVariant.accountType})\nHarga: ${formatRupiah(selectedVariant.price)}\n\nApakah stok ready kak? Terima kasih! ✨`;
        targetUrl = `https://wa.me/${waNum}?text=${encodeURIComponent(fallbackMsg)}`;
      }

      if (onOrderSuccess) {
        onOrderSuccess({
          productName: product.name,
          variantDuration: selectedVariant.duration,
          price: selectedVariant.price,
        });
      }

      // Open WhatsApp in new tab
      window.open(targetUrl, "_blank", "noopener,noreferrer");
    } catch (err) {
      console.error("Order error:", err);
      // Fallback open WhatsApp directly
      const waNum = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "6289501485483";
      const fallbackMsg = `Halo Kak Admin Penelove Pricelist! 💖\nSaya mau order: *${product.name}*\nDurasi: ${selectedVariant.duration}\nHarga: ${formatRupiah(selectedVariant.price)}\n\nMohon info order ya kak! ✨`;
      window.open(`https://wa.me/${waNum}?text=${encodeURIComponent(fallbackMsg)}`, "_blank");
    } finally {
      setTimeout(() => setIsOrdering(false), 800);
    }
  };

  return (
    <div className="glass-card glass-card-hover rounded-3xl p-5 sm:p-6 flex flex-col justify-between relative overflow-hidden transition-all group border-2 border-[#FDD1D9]/70">
      {/* Top Background Glow Effect on Hover */}
      <div className="absolute -top-12 -right-12 w-32 h-32 bg-[#FDD1D9]/40 rounded-full blur-2xl group-hover:bg-[#FDD1D9]/60 transition-colors pointer-events-none" />

      {/* Card Header: Icon, Badges & Category */}
      <div className="space-y-4">
        <div className="flex items-start justify-between gap-3">
          {/* App Brand Avatar */}
          <div
            className={`w-14 h-14 rounded-2xl flex items-center justify-center p-3 shadow-sm border border-white/80 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 ${iconBgClass}`}
          >
            <IconComponent className="w-8 h-8" />
          </div>

          {/* Badges & Warranty Pill */}
          <div className="flex flex-col items-end gap-1.5">
            {product.badge && (
              <span
                className={`text-[11px] font-extrabold px-2.5 py-1 rounded-full border shadow-2xs whitespace-nowrap animate-wiggle-soft ${badgeColorClass}`}
              >
                {product.badge}
              </span>
            )}
            <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#4A5D18] bg-[#E1E8BC]/60 border border-[#E1E8BC] px-2.5 py-0.5 rounded-full">
              <ShieldCheck className="w-3 h-3 text-[#6D8126]" />
              Garansi {product.warrantyDays} Hari
            </span>
          </div>
        </div>

        {/* Product Title & Short Description */}
        <div>
          <h3 className="font-display font-bold text-lg sm:text-xl text-slate-800 tracking-tight group-hover:text-[#EE5B7F] transition-colors">
            {product.name}
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Feature Highlights */}
        <div className="pt-1 space-y-1.5">
          {featuresList.slice(0, 3).map((feat, idx) => (
            <div key={idx} className="flex items-center gap-2 text-xs font-medium text-slate-600">
              <div className="w-4 h-4 rounded-full bg-[#FDD1D9]/70 flex items-center justify-center shrink-0">
                <Check className="w-2.5 h-2.5 text-[#AC2849] stroke-[3]" />
              </div>
              <span className="line-clamp-1">{feat}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Duration Variant Selector & Pricing Box */}
      <div className="pt-5 mt-4 border-t border-[#FDD1D9]/60 space-y-4">
        {/* Duration Pills */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-[11px] font-bold text-slate-500">
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3 text-[#EE5B7F]" />
              Pilih Durasi:
            </span>
            <span className="text-[#624FA8] font-bold bg-[#D0CCE9]/40 px-2 py-0.5 rounded-md">
              {selectedVariant.accountType}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
            {product.variants.map((v) => {
              const isSelected = selectedVariant.id === v.id;
              return (
                <button
                  key={v.id}
                  onClick={() => setSelectedVariant(v)}
                  className={`px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all text-center cursor-pointer border ${
                    isSelected
                      ? "bg-gradient-to-r from-[#EE5B7F] to-[#7A66C4] text-white border-transparent shadow-sm scale-102"
                      : "bg-white/95 hover:bg-[#FDD1D9]/30 text-slate-700 border-[#FDD1D9]"
                  }`}
                >
                  <div className="leading-tight">{v.duration}</div>
                  <div className={`text-[10px] font-medium opacity-90 ${isSelected ? "text-[#FFE9A9]" : "text-slate-400"}`}>
                    {formatRupiah(v.price).replace(",00", "")}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Price Display */}
        <div className="flex items-baseline justify-between pt-1">
          <div>
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Harga Promo:
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="font-display font-black text-2xl sm:text-3xl text-slate-900 tracking-tight">
                {formatRupiah(selectedVariant.price)}
              </span>
            </div>
          </div>

          {discountPercent && discountPercent > 0 ? (
            <div className="text-right">
              <div className="text-xs text-slate-400 line-through">
                {formatRupiah(selectedVariant.originalPrice!)}
              </div>
              <span className="inline-block text-[10px] font-black px-2 py-0.5 rounded-full bg-[#FDD1D9] text-[#AC2849] border border-[#FAB4C2]">
                Hemat {discountPercent}%
              </span>
            </div>
          ) : null}
        </div>

        {/* Cheerful "Pesan via WhatsApp" Button */}
        <button
          onClick={handleOrderWhatsApp}
          disabled={isOrdering}
          className="w-full btn-cheerful-wa text-white font-bold text-sm sm:text-base py-3.5 px-4 rounded-2xl flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed group/btn"
        >
          {isOrdering ? (
            <>
              <Sparkles className="w-4 h-4 animate-spin" />
              <span>Menyiapkan Pesanan...</span>
            </>
          ) : (
            <>
              <MessageCircle className="w-5 h-5 fill-white group-hover/btn:scale-110 transition-transform" />
              <span>Pesan via WhatsApp</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
