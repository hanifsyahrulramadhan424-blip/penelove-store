"use client";

import React, { useState } from "react";
import { ChevronDown, HelpCircle, ShieldCheck, Zap, Heart, MessageCircle } from "lucide-react";

export const FAQSection: React.FC = () => {
  const faqs = [
    {
      q: "Bagaimana sistem garansi di Penelove Pricelist?",
      a: "Semua akun bergaransi full 100% sesuai dengan durasi langganan yang kamu beli (misal 30 hari / 1 tahun). Jika akun mengalami kendala atau on-hold sebelum masa habis, admin akan langsung memperbaiki atau memberikan akun replace baru secara gratis!",
    },
    {
      q: "Apa perbedaan Akun Sharing dan Akun Private?",
      a: "Akun Sharing adalah 1 akun resmi yang dibagi menjadi beberapa profil pengguna (hemat dan cocok untuk pemakaian personal). Sedangkan Akun Private adalah 1 akun full khusus milik kamu sendiri (bisa ganti password / pakai email sendiri). Keduanya dijamin stabil dan legal!",
    },
    {
      q: "Berapa lama proses pembuatan / pengiriman akun?",
      a: "Proses rata-rata memakan waktu 5 hingga 10 menit setelah konfirmasi pembayaran diterima di jam operasional (08:00 - 23:00 WIB). Tim kami siap melayani dengan cepat!",
    },
    {
      q: "Metode pembayaran apa saja yang diterima?",
      a: "Kami menerima pembayaran serba praktis: QRIS (Semua E-Wallet & M-Banking), BCA, Mandiri, BRI, BNI, Dana, GoPay, OVO, dan ShopeePay tanpa biaya admin tersembunyi.",
    },
    {
      q: "Apakah aplikasi streaming bisa ditonton di Smart TV / Laptop?",
      a: "Bisa banget! Sebagian besar aplikasi (Netflix, Disney+, Prime Video, HBO Max, Vidio, Viu, dll) bisa diakses di Smart TV, Android Box, Laptop, Tablet, maupun HP (iOS & Android).",
    },
    {
      q: "Bagaimana cara klaim garansi jika ada kendala?",
      a: "Cukup chat ke WhatsApp Admin Penelove (6289501485483) dengan menyertakan bukti screenshot kendala dan invoice order. CS kami akan merespon dan memproses klaim dalam hitungan menit.",
    },
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  const waNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "6289501485483";

  return (
    <section id="faq" className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <div className="text-center space-y-3 mb-10">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#D0CCE9] text-[#4F3E8C] border border-[#B4ACE0] text-xs font-black shadow-2xs">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>PERTANYAAN UMUM</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-display font-extrabold text-slate-800 tracking-tight">
          FAQ & Jaminan Garansi
        </h2>
        <p className="text-slate-500 text-sm sm:text-base">
          Ada pertanyaan sebelum order? Temukan jawabannya di bawah ini!
        </p>
      </div>

      <div className="space-y-3">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className={`glass-card rounded-2xl transition-all overflow-hidden border-2 ${
                isOpen ? "border-[#FAB4C2] shadow-pastel" : "border-[#FDD1D9]/60"
              }`}
            >
              <button
                onClick={() => toggleFaq(idx)}
                className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 cursor-pointer"
              >
                <span className="font-display font-bold text-sm sm:text-base text-slate-800">
                  {faq.q}
                </span>
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 ${
                    isOpen
                      ? "bg-[#EE5B7F] text-white rotate-180"
                      : "bg-[#FDD1D9]/40 text-slate-700"
                  }`}
                >
                  <ChevronDown className="w-4 h-4" />
                </div>
              </button>

              {isOpen && (
                <div className="px-4 pb-5 sm:px-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-[#FDD1D9]/40 pt-3 animate-in fade-in-50 duration-200">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Still Have Questions CTA */}
      <div className="mt-8 p-6 rounded-3xl bg-gradient-to-r from-[#FDD1D9]/60 via-[#FFE9A9]/60 to-[#BCE0F6]/60 border-2 border-[#FDD1D9] text-center space-y-3 shadow-xs">
        <h3 className="font-display font-extrabold text-base sm:text-lg text-slate-800">
          Masih ada pertanyaan lain yang belum terjawab? 🌸
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto font-medium">
          Jangan ragu untuk langsung menyapa Customer Service Penelove. Kami senang membantu!
        </p>
        <a
          href={`https://wa.me/${waNumber}?text=${encodeURIComponent(
            "Halo Kak Admin Penelove! Mau tanya-tanya seputar pricelist dan garansi aplikasi ya kak ✨"
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 btn-cheerful-wa text-white font-bold text-xs sm:text-sm px-6 py-2.5 rounded-2xl shadow-sm hover:shadow-md cursor-pointer"
        >
          <MessageCircle className="w-4 h-4 fill-white" />
          <span>Tanya Admin via WhatsApp</span>
        </a>
      </div>
    </section>
  );
};
