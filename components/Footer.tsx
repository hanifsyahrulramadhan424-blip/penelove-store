   "use client";

import React from "react";
import { Heart, Sparkles, MessageCircle, ShieldCheck, Clock } from "lucide-react";

export const Footer: React.FC = () => {
  const waNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "6289501485483";

  return (
    <footer className="border-t-2 border-[#FDD1D9] bg-white/95 backdrop-blur-md pt-12 pb-8 px-4 sm:px-6 lg:px-8 mt-16">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Col 1: Brand Info */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#FDD1D9] via-[#D0CCE9] to-[#BCE0F6] flex items-center justify-center text-white shadow-sm border border-white/80">
                <Heart className="w-5 h-5 fill-white" />
              </div>
              <span className="font-display font-black text-xl text-slate-800">
                PENELOVE <span className="bg-gradient-to-r from-[#EE5B7F] to-[#7A66C4] bg-clip-text text-transparent">SHOP</span>
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 max-w-sm leading-relaxed">
              Katalog digital interaktif dan penyedia layanan langganan aplikasi AI, produktivitas & streaming premium bergaransi resmi, legal, dan aman.
            </p>
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-600 pt-1">
              <Clock className="w-4 h-4 text-[#EE5B7F]" />
              <span>Jam Operasional: 08:00 - 23:00 WIB (Setiap Hari)</span>
            </div>
          </div>

          {/* Col 2: Kategori */}
          <div className="space-y-2.5 text-xs sm:text-sm">
            <h4 className="font-display font-bold text-slate-800 uppercase tracking-wider text-[11px]">
              Kategori Aplikasi
            </h4>
            <ul className="space-y-1.5 text-slate-500 font-medium">
              <li>
                <a href="#catalog" className="hover:text-[#EE5B7F] transition-colors">
                  🤖 AI & Productivity Tools
                </a>
              </li>
              <li>
                <a href="#catalog" className="hover:text-[#EE5B7F] transition-colors">
                  🍿 Streaming & Film Series
                </a>
              </li>
              <li>
                <a href="#catalog" className="hover:text-[#EE5B7F] transition-colors">
                  🔥 Best Seller & Promo
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Customer Care & Order */}
          <div className="space-y-2.5 text-xs sm:text-sm">
            <h4 className="font-display font-bold text-slate-800 uppercase tracking-wider text-[11px]">
              Direct Contact
            </h4>
            <p className="text-slate-500 text-xs">
              Pemesanan instan & klaim garansi cepat via WhatsApp resmi:
            </p>
            <a
              href={`https://wa.me/${waNumber}?text=${encodeURIComponent(
                "Halo Admin Penelove! Mau order aplikasi premium dong kak 💕"
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 btn-cheerful-wa text-white text-xs font-bold px-4 py-2 rounded-xl shadow-xs"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>+62 895-0148-5483</span>
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-[#FDD1D9]/60 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} PENELOVE SHOP. All Rights Reserved.</p>
          <div className="flex items-center gap-2">
            <span>Dibuat dengan</span>
            <Heart className="w-3.5 h-3.5 fill-[#EE5B7F] text-[#EE5B7F]" />
            <span>untuk pengalaman belanja ceria & aman</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
