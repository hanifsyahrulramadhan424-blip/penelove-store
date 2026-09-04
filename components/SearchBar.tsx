"use client";

import React from "react";
import { Search, X, ArrowUpDown, Filter, Sparkles } from "lucide-react";
import { SortOption } from "@/lib/types";

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (val: string) => void;
  sortOption: SortOption;
  onSortChange: (sort: SortOption) => void;
  selectedFilterTag: string;
  onFilterTagChange: (tag: string) => void;
  totalResults: number;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  searchQuery,
  onSearchChange,
  sortOption,
  onSortChange,
  selectedFilterTag,
  onFilterTagChange,
  totalResults,
}) => {
  const filterTags = [
    { id: "all", label: "Semua Tipe" },
    { id: "best-seller", label: "🔥 Best Seller" },
    { id: "sharing", label: "💸 Sharing Hemat" },
    { id: "private", label: "🔒 Private Akun" },
    { id: "long-warranty", label: "🛡️ Garansi 1 Tahun" },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto space-y-3.5 px-4">
      {/* Search Input & Sort Controls */}
      <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3 items-center">
        {/* Search Bar Input */}
        <div className="relative w-full flex-1">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#EE5B7F]">
            <Search className="w-5 h-5" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Cari nama aplikasi (Netflix, Claude, ChatGPT, Viu, Zoom...)"
            className="w-full pl-11 pr-10 py-3 rounded-2xl bg-white/95 border-2 border-[#FDD1D9] focus:border-[#FAB4C2] focus:bg-white text-slate-800 placeholder-slate-400 text-sm sm:text-base outline-none transition-all shadow-xs focus:shadow-pastel"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange("")}
              className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer"
              aria-label="Hapus pencarian"
            >
              <X className="w-4 h-4 bg-slate-100 hover:bg-slate-200 rounded-full p-0.5" />
            </button>
          )}
        </div>

        {/* Sort Select Dropdown */}
        <div className="relative w-full sm:w-auto min-w-[200px]">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <ArrowUpDown className="w-4 h-4 text-[#7A66C4]" />
          </div>
          <select
            value={sortOption}
            onChange={(e) => onSortChange(e.target.value as SortOption)}
            className="w-full pl-9 pr-8 py-3 rounded-2xl bg-white border-2 border-[#FDD1D9] focus:border-[#FAB4C2] text-slate-700 text-xs sm:text-sm font-bold outline-none cursor-pointer shadow-xs appearance-none"
          >
            <option value="popular">🌟 Paling Populer</option>
            <option value="price-asc">💸 Harga: Termurah</option>
            <option value="price-desc">💎 Harga: Tertinggi</option>
            <option value="name-asc">🔤 Nama (A - Z)</option>
          </select>
          <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-slate-400 text-xs">
            ▼
          </div>
        </div>
      </div>

      {/* Filter Quick Chips & Result Count */}
      <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          {filterTags.map((tag) => {
            const isActive = selectedFilterTag === tag.id;
            return (
              <button
                key={tag.id}
                onClick={() => onFilterTagChange(tag.id)}
                className={`text-xs font-bold px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                  isActive
                    ? "bg-gradient-to-r from-[#EE5B7F] to-[#7A66C4] text-white shadow-xs scale-105"
                    : "bg-white/90 hover:bg-[#FDD1D9]/30 text-slate-600 border border-[#FDD1D9]"
                }`}
              >
                {tag.label}
              </button>
            );
          })}
        </div>

        <div className="text-xs font-medium text-slate-500 flex items-center gap-1 ml-auto">
          <span>Menampilkan</span>
          <span className="font-extrabold text-[#EE5B7F]">{totalResults}</span>
          <span>aplikasi</span>
        </div>
      </div>
    </div>
  );
};
