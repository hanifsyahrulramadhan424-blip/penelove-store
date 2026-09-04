"use client";

import React from "react";
import { Sparkles, ShieldCheck, Zap, Heart, CheckCircle2, MessageSquareText, Star, Award, Search } from "lucide-react";

interface HeroBannerProps {
  totalApps?: number;
  onExploreClick?: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({ totalApps = 49, onExploreClick }) => {
  return (
    <section className="relative overflow-hidden pt-8 pb-12 sm:pt-14 sm:pb-16 px-4 sm:px-6 lg:px-8">
      {/* Decorative Pastel Background Blobs - 5 Requested Colors */}
      <div className="absolute top-0 left-10 w-72 h-72 sm:w-96 sm:h-96 bg-[#FDD1D9]/50 rounded-full blur-3xl pointer-events-none -z-10 animate-float-slow" />
      <div className="absolute top-10 right-10 w-72 h-72 sm:w-96 sm:h-96 bg-[#BCE0F6]/50 rounded-full blur-3xl pointer-events-none -z-10 animate-float-fast" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-80 h-80 bg-[#FFE9A9]/60 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/3 left-1/4 w-60 h-60 bg-[#D0CCE9]/40 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/2 right-1/4 w-60 h-60 bg-[#E1E8BC]/40 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto text-center space-y-6 sm:space-y-8">
        {/* Floating Cheerful Welcome Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/95 border-2 border-[#FDD1D9] shadow-sm backdrop-blur-sm animate-pulse-soft">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#EE5B7F] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#EE5B7F]"></span>
          </span>
          <span className="text-xs sm:text-sm font-extrabold text-slate-800">
            🌸 Toko Aplikasi Premium Terpercaya #1 Penelove
          </span>
          <Heart className="w-4 h-4 text-[#EE5B7F] fill-[#FDD1D9]" />
        </div>

        {/* Main Hero Headline */}
        <div className="space-y-3">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-display font-extrabold text-slate-800 tracking-tight leading-tight sm:leading-tight">
            Langganan Aplikasi Favorit,{" "}
            <span className="bg-gradient-to-r from-[#EE5B7F] via-[#7A66C4] to-[#2695DC] bg-clip-text text-transparent underline decoration-[#FFE9A9] decoration-wavy decoration-2 sm:decoration-4">
              Harga Super Hemat!
            </span>
          </h1>
          <p className="max-w-2xl mx-auto text-slate-600 text-sm sm:text-base sm:leading-relaxed font-medium">
            Temukan <strong className="text-[#EE5B7F] font-bold">{totalApps}+ katalog</strong> aplikasi AI, produktivitas & streaming legal. Pesan praktis via WhatsApp tanpa ribet, langsung aktif dalam 5 menit! ✨
          </p>
        </div>

        {/* CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 pt-2">
          <a
            href="#catalog"
            onClick={onExploreClick}
            className="btn-cheerful-pink flex items-center gap-2 text-white font-bold text-sm sm:text-base px-6 sm:px-8 py-3.5 rounded-2xl shadow-pastel hover:shadow-pastel-hover transition-all cursor-pointer"
          >
            <Sparkles className="w-5 h-5 fill-white" />
            <span>Lihat Semua Pricelist</span>
          </a>

          <a
            href="#how-to-order"
            className="flex items-center gap-2 bg-white/95 hover:bg-white text-slate-700 font-bold text-sm sm:text-base px-6 py-3.5 rounded-2xl border-2 border-[#FDD1D9] shadow-sm hover:border-[#FAB4C2] transition-all"
          >
            <MessageSquareText className="w-5 h-5 text-[#EE5B7F]" />
            <span>Cara Pesan Kilat</span>
          </a>
        </div>

        {/* Trust Badges Bar - 4 Feature Cards */}
        <div className="pt-6 sm:pt-8 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto">
          {/* Card 1: Pink */}
          <div className="bg-white/90 backdrop-blur-sm p-3.5 sm:p-4 rounded-2xl border-2 border-[#FDD1D9] shadow-xs flex items-center gap-3 text-left hover:scale-[1.02] transition-transform">
            <div className="p-2.5 rounded-xl bg-[#FDD1D9] text-[#AC2849]">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-xs sm:text-sm text-slate-800">Proses 5-10 Mnt</div>
              <div className="text-[11px] text-slate-500">Kirim akun kilat</div>
            </div>
          </div>

          {/* Card 2: Blue */}
          <div className="bg-white/90 backdrop-blur-sm p-3.5 sm:p-4 rounded-2xl border-2 border-[#BCE0F6] shadow-xs flex items-center gap-3 text-left hover:scale-[1.02] transition-transform">
            <div className="p-2.5 rounded-xl bg-[#BCE0F6] text-[#1777B6]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-xs sm:text-sm text-slate-800">Garansi 100% Full</div>
              <div className="text-[11px] text-slate-500">Replace aman anti-hold</div>
            </div>
          </div>

          {/* Card 3: Yellow */}
          <div className="bg-white/90 backdrop-blur-sm p-3.5 sm:p-4 rounded-2xl border-2 border-[#FFE9A9] shadow-xs flex items-center gap-3 text-left hover:scale-[1.02] transition-transform">
            <div className="p-2.5 rounded-xl bg-[#FFE9A9] text-[#B8780B]">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-xs sm:text-sm text-slate-800">Hemat s/d 75%</div>
              <div className="text-[11px] text-slate-500">Harga pelajar & umum</div>
            </div>
          </div>

          {/* Card 4: Lilac */}
          <div className="bg-white/90 backdrop-blur-sm p-3.5 sm:p-4 rounded-2xl border-2 border-[#D0CCE9] shadow-xs flex items-center gap-3 text-left hover:scale-[1.02] transition-transform">
            <div className="p-2.5 rounded-xl bg-[#D0CCE9] text-[#4F3E8C]">
              <Star className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-xs sm:text-sm text-slate-800">5.000+ Transaksi</div>
              <div className="text-[11px] text-slate-500">Pelanggan puas & setia</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
