"use client";

import React from "react";
import { Search, MousePointerClick, CreditCard, Rocket, Heart, ArrowRight } from "lucide-react";

export const HowToOrder: React.FC = () => {
  const steps = [
    {
      number: "01",
      title: "Pilih Aplikasi & Durasi",
      desc: "Pilih aplikasi AI atau Streaming favoritmu, lalu tentukan pilihan durasi yang diinginkan.",
      icon: Search,
      color: "bg-[#FDD1D9] text-[#AC2849] border-[#FAB4C2]",
    },
    {
      number: "02",
      title: "Klik Pesan via WA",
      desc: "Tekan tombol WhatsApp ceria. Format teks pesanan akan otomatis terisi rapi & akurat.",
      icon: MousePointerClick,
      color: "bg-[#BCE0F6] text-[#1777B6] border-[#8ECCF1]",
    },
    {
      number: "03",
      title: "Pembayaran Fleksibel",
      desc: "Lakukan pembayaran aman lewat QRIS, BCA, Dana, GoPay, OVO, atau ShopeePay.",
      icon: CreditCard,
      color: "bg-[#FFE9A9] text-[#9A6008] border-[#FED978]",
    },
    {
      number: "04",
      title: "Akun Aktif Kilat",
      desc: "Admin kirim akun dan panduan login dalam 5-10 menit. Siap dinikmati bergaransi full!",
      icon: Rocket,
      color: "bg-[#E1E8BC] text-[#4A5D18] border-[#C7D58F]",
    },
  ];

  return (
    <section id="how-to-order" className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center space-y-3 mb-10 sm:mb-12">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#BCE0F6] text-[#1777B6] border border-[#8ECCF1] text-xs font-extrabold">
          <Heart className="w-3.5 h-3.5 fill-[#1777B6]" />
          <span>MUDAH & PRAKTIS</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-display font-extrabold text-slate-800 tracking-tight">
          Cara Order Kilat di Penelove
        </h2>
        <p className="text-slate-500 text-sm sm:text-base max-w-xl mx-auto">
          Hanya 4 langkah mudah untuk menikmati aplikasi premium tanpa repot registrasi kartu kredit!
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 relative">
        {steps.map((step, idx) => {
          const Icon = step.icon;
          return (
            <div
              key={idx}
              className="glass-card rounded-3xl p-6 relative flex flex-col justify-between hover:shadow-pastel transition-all group border-2 border-[#FDD1D9]/60 hover:border-[#FAB4C2]"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border-2 shadow-xs group-hover:scale-110 transition-transform ${step.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="font-display font-black text-2xl sm:text-3xl text-slate-300 group-hover:text-[#EE5B7F] transition-colors">
                    {step.number}
                  </span>
                </div>
                <h3 className="font-display font-bold text-lg text-slate-800 mb-2">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
