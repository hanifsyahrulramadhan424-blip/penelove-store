"use client";

import React from "react";
import { Bot, Tv, Sparkles, Layers } from "lucide-react";
import { motion } from "framer-motion";

interface CategoryTabsProps {
  selectedCategory: string;
  onSelectCategory: (categorySlug: string) => void;
  counts: {
    all: number;
    ai: number;
    streaming: number;
  };
}

export const CategoryTabs: React.FC<CategoryTabsProps> = ({
  selectedCategory,
  onSelectCategory,
  counts,
}) => {
  const tabs = [
    {
      id: "all",
      label: "Semua Aplikasi",
      icon: Layers,
      count: counts.all,
      color: "penelove-pink",
    },
    {
      id: "ai-productivity",
      label: "AI & Productivity Tools",
      icon: Bot,
      count: counts.ai,
      color: "penelove-blue",
    },
    {
      id: "streaming-apps",
      label: "Streaming Apps",
      icon: Tv,
      count: counts.streaming,
      color: "penelove-lilac",
    },
  ];

  return (
    <div className="w-full flex justify-center px-4">
      <div className="inline-flex p-1.5 sm:p-2 bg-white/95 backdrop-blur-md rounded-3xl border-2 border-[#FDD1D9] shadow-pastel gap-1.5 sm:gap-2 max-w-full overflow-x-auto no-scrollbar">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = selectedCategory === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => onSelectCategory(tab.id)}
              className={`relative flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-2xl text-xs sm:text-sm font-extrabold transition-all duration-300 whitespace-nowrap cursor-pointer z-10 ${
                isActive
                  ? "text-white shadow-sm"
                  : "text-slate-600 hover:text-slate-900 hover:bg-[#FDD1D9]/20"
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeCategoryPill"
                  className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#EE5B7F] via-[#7A66C4] to-[#2695DC] -z-10 shadow-pastel"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <Icon
                className={`w-4 h-4 sm:w-5 sm:h-5 transition-transform ${
                  isActive ? "scale-110 text-white" : "text-slate-500"
                }`}
              />
              <span>{tab.label}</span>
              <span
                className={`text-[10px] sm:text-xs px-2 py-0.5 rounded-full font-extrabold ${
                  isActive
                    ? "bg-white/30 text-white"
                    : "bg-[#FDD1D9]/40 text-[#AC2849]"
                }`}
              >
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
