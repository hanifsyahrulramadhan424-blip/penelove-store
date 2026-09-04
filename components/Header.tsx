"use client";

import React, { useState } from "react";
import { Sparkles, MessageCircle, Heart, ShieldCheck, HelpCircle, BookOpen, Menu, X, ShoppingBag } from "lucide-react";

interface HeaderProps {
  onCategoryClick?: (category: string) => void;
  cartCount?: number;
  onOpenCart?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onCategoryClick, cartCount = 0, onOpenCart }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const waNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "6289501485483";

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-white/90 border-b border-[#FDD1D9] shadow-xs transition-all">
      {/* Top Cute Announcement Bar with 5 Pastel Colors */}
      <div className="bg-gradient-to-r from-[#FDD1D9] via-[#FFE9A9] via-[#D0CCE9] to-[#BCE0F6] text-slate-800 text-xs sm:text-sm font-bold py-1.5 px-4 text-center flex items-center justify-center gap-2 border-b border-[#FDD1D9]/40">
        <span className="inline-flex items-center gap-1 bg-white/70 backdrop-blur-sm px-2.5 py-0.5 rounded-full text-xs text-slate-800 shadow-2xs">
          ✨ PROMO SPESIAL
        </span>
        <span className="drop-shadow-2xs">Pricelist Terupdate! Garansi Full 100% & Proses Kilat 5-10 Menit 💕</span>
      </div>

      {/* Main Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <a href="#" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-br from-[#FDD1D9] via-[#D0CCE9] to-[#BCE0F6] flex items-center justify-center text-white shadow-pastel group-hover:scale-105 group-hover:rotate-3 transition-transform duration-300 border border-white/60">
            <Heart className="w-5 h-5 sm:w-6 sm:h-6 fill-white text-white drop-shadow-sm animate-wiggle-soft" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-display font-extrabold text-xl sm:text-2xl text-slate-800 tracking-tight group-hover:text-[#EE5B7F] transition-colors">
                PENELOVE
              </span>
              <span className="font-display font-black text-xl sm:text-2xl bg-gradient-to-r from-[#EE5B7F] to-[#7A66C4] bg-clip-text text-transparent">
                SHOP
              </span>
              <Sparkles className="w-4 h-4 text-[#FAC248] animate-sparkle" />
            </div>
            <p className="text-[11px] text-slate-500 font-medium hidden sm:block">
              Katalog Premium Digital & Instant WhatsApp Order
            </p>
          </div>
        </a>

        {/* Desktop Quick Navigation */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-semibold text-slate-600">
          <a
            href="#catalog"
            className="hover:text-[#EE5B7F] transition-colors flex items-center gap-1.5 py-1 px-2.5 rounded-xl hover:bg-[#FDD1D9]/30"
          >
            <Sparkles className="w-4 h-4 text-[#EE5B7F]" />
            Katalog Produk
          </a>
          <a
            href="#how-to-order"
            className="hover:text-[#2695DC] transition-colors flex items-center gap-1.5 py-1 px-2.5 rounded-xl hover:bg-[#BCE0F6]/30"
          >
            <BookOpen className="w-4 h-4 text-[#2695DC]" />
            Cara Order
          </a>
          <a
            href="#faq"
            className="hover:text-[#7A66C4] transition-colors flex items-center gap-1.5 py-1 px-2.5 rounded-xl hover:bg-[#D0CCE9]/30"
          >
            <HelpCircle className="w-4 h-4 text-[#7A66C4]" />
            FAQ & Garansi
          </a>
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5">
          {/* Online Indicator Badge */}
          <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#E1E8BC]/40 border border-[#E1E8BC] text-xs font-bold text-[#4A5D18]">
            <span className="w-2 h-2 rounded-full bg-[#6D8126] animate-ping" />
            <span>Admin Ready</span>
          </div>

          {/* WhatsApp Direct Order Action */}
          <a
            href={`https://wa.me/${waNumber}?text=${encodeURIComponent(
              "Halo Kak Admin Penelove Pricelist! 💖 Mau tanya pricelist dan info stok aplikasi dong kak ✨"
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-cheerful-wa flex items-center gap-2 text-white font-bold text-xs sm:text-sm px-4 py-2 sm:py-2.5 rounded-2xl shadow-sm hover:shadow-md cursor-pointer"
          >
            <MessageCircle className="w-4 h-4 fill-white" />
            <span>Chat CS</span>
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl bg-[#FDD1D9]/30 border border-[#FDD1D9] text-slate-700 hover:bg-[#FDD1D9]/60 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-md border-b border-[#FDD1D9] px-4 py-4 space-y-2 shadow-lg animate-in slide-in-from-top duration-200">
          <a
            href="#catalog"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl font-semibold text-slate-700 hover:bg-[#FDD1D9]/30 hover:text-[#EE5B7F] transition-colors"
          >
            <Sparkles className="w-4 h-4 text-[#EE5B7F]" />
            Katalog Produk
          </a>
          <a
            href="#how-to-order"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl font-semibold text-slate-700 hover:bg-[#BCE0F6]/30 hover:text-[#2695DC] transition-colors"
          >
            <BookOpen className="w-4 h-4 text-[#2695DC]" />
            Cara Order Mudah
          </a>
          <a
            href="#faq"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl font-semibold text-slate-700 hover:bg-[#D0CCE9]/30 hover:text-[#7A66C4] transition-colors"
          >
            <HelpCircle className="w-4 h-4 text-[#7A66C4]" />
            FAQ & Garansi
          </a>
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              Online 08:00 - 23:00 WIB
            </span>
            <span className="font-bold text-[#EE5B7F]">WA: +62 895-0148-5483</span>
          </div>
        </div>
      )}
    </header>
  );
};
