import React from 'react';
import { ChevronRight, Home } from 'lucide-react';
import { GoldPriceItem } from '../types/gold';

interface BreadcrumbsProps {
  currentCategory?: string;
  currentItem?: GoldPriceItem | null;
  onReset?: () => void;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ currentItem, onReset }) => {
  return (
    <nav aria-label="Breadcrumb" className="py-2.5 px-4 bg-[#0A0D12] border-b border-[rgba(244,241,232,0.06)] text-xs text-[#A5A8AE]">
      <div className="max-w-[1240px] mx-auto flex items-center gap-1.5 overflow-x-auto whitespace-nowrap scrollbar-none font-mono">
        <a
          href="#top"
          onClick={(e) => {
            if (onReset) {
              e.preventDefault();
              onReset();
            }
          }}
          className="flex items-center gap-1 hover:text-[#E2C76A] transition-colors"
        >
          <Home className="w-3.5 h-3.5" />
          <span className="font-sans">Ana Sayfa</span>
        </a>

        <ChevronRight className="w-3 h-3 text-zinc-600 shrink-0" />

        <a href="#tablo" className="hover:text-[#E2C76A] transition-colors font-sans">
          Bursa Altın Fiyatları
        </a>

        {currentItem && (
          <>
            <ChevronRight className="w-3 h-3 text-zinc-600 shrink-0" />
            <span className="text-[#C8A646] font-semibold font-sans">
              {currentItem.name}
            </span>
          </>
        )}
      </div>
    </nav>
  );
};
