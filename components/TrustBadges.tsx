"use client";

import React from "react";
import { Star, ShieldCheck, Lock, CheckCircle2, Heart } from "lucide-react";

export const TrustBadges: React.FC = () => {
  const reviews = [
    {
      name: "Adinda P.",
      role: "Mahasiswi UI",
      text: "Langganan Claude 3.5 Sonnet & Jenni AI di Penelove bener-bener nyelametin skripsi aku! Admin ramah banget dan 5 menit langsung aktif. Makasih Penelove! 💕",
      rating: 5,
      app: "Claude Pro & Jenni AI",
    },
    {
      name: "Rian Pratama",
      role: "Software Developer",
      text: "ChatGPT Plus & Netflix-nya stabil banget, gak pernah kena hold sama sekali. Garansi juga amanah pas mau renew perpanjangan. Recommended seller!",
      rating: 5,
      app: "ChatGPT Plus & Netflix",
    },
    {
      name: "Siti Rahma",
      role: "K-Drama Enthusiast",
      text: "Viu & WeTV di sini murah banget dibanding tempat lain. Kualitasnya 1080p jernih, gak buffering. Tiap malem maraton drakor jadi makin hepi 🥰",
      rating: 5,
      app: "Viu & WeTV VIP",
    },
  ];

  const paymentMethods = [
    "QRIS (All E-Wallet)",
    "BCA",
    "Mandiri",
    "BRI",
    "BNI",
    "Dana",
    "GoPay",
    "OVO",
    "ShopeePay",
  ];

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      {/* Testimonials */}
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#FFE9A9] text-[#9A6008] border border-[#FED978] text-xs font-black shadow-2xs">
            <Star className="w-3.5 h-3.5 fill-[#EFA21C] text-[#EFA21C]" />
            <span>TESTIMONI REAL</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-slate-800">
            Kata Pelanggan Setia Penelove
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {reviews.map((r, idx) => (
            <div
              key={idx}
              className="glass-card rounded-3xl p-5 sm:p-6 space-y-3 flex flex-col justify-between hover:shadow-pastel transition-all border-2 border-[#FDD1D9]/60 hover:border-[#FAB4C2]"
            >
              <div className="space-y-2">
                <div className="flex items-center gap-1 text-[#FAC248]">
                  {[...Array(r.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#FAC248]" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-slate-600 italic leading-relaxed">
                  "{r.text}"
                </p>
              </div>

              <div className="pt-3 border-t border-[#FDD1D9]/60 flex items-center justify-between">
                <div>
                  <div className="font-bold text-xs sm:text-sm text-slate-800">{r.name}</div>
                  <div className="text-[11px] text-slate-400">{r.role}</div>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#FDD1D9]/50 text-[#AC2849] border border-[#FDD1D9]">
                  {r.app}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Payment Channels Strip */}
      <div className="p-6 rounded-3xl bg-white/90 border-2 border-[#FDD1D9]/60 shadow-xs text-center space-y-4">
        <div className="text-xs font-extrabold text-slate-500 uppercase tracking-widest flex items-center justify-center gap-2">
          <Lock className="w-3.5 h-3.5 text-[#6D8126]" />
          <span>Metode Pembayaran Aman & Terverifikasi</span>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          {paymentMethods.map((method, idx) => (
            <span
              key={idx}
              className="text-xs font-bold px-3 py-1.5 rounded-xl bg-[#FDD1D9]/20 hover:bg-[#FDD1D9]/50 text-slate-700 border border-[#FDD1D9] transition-colors"
            >
              {method}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};
