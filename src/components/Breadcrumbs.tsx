import React from 'react';
import { ChevronRight, Home } from 'lucide-react';
import { GoldPriceItem } from '../types/gold';
import { Link } from './Link';
import { PageRoute, PAGE_PATHS } from '../utils/router';

interface BreadcrumbsProps {
  activePage?: PageRoute;
  currentItem?: GoldPriceItem | null;
  onReset?: () => void;
}

const PAGE_NAMES: Record<PageRoute, string> = {
  'fiyatlar': 'Canlı Kurlar',
  'grafik': 'Grafik Terminali',
  'altin-turleri': 'Altın Türleri',
  'portfoy': 'Portföy Yönetimi',
  'hesaplama': 'Altın Hesaplama',
  'bursada-altin': "Bursa'da Altın",
  'kuyumcular': 'Kuyumcular Rehberi',
  'sss': 'Sıkça Sorulan Sorular'
};

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ 
  activePage = 'fiyatlar', 
  currentItem, 
  onReset 
}) => {
  const pageLabel = PAGE_NAMES[activePage];
  const pagePath = PAGE_PATHS[activePage];
  const isHome = activePage === 'fiyatlar';

  return (
    <nav aria-label="Breadcrumb" className="h-[36px] min-h-[36px] flex items-center px-4 bg-[#0A0D12] border-b border-[rgba(244,241,232,0.06)] text-xs text-[#A5A8AE]">
      <div className="max-w-[1240px] w-full mx-auto flex items-center gap-1.5 overflow-x-auto whitespace-nowrap scrollbar-none font-mono">
        <Link
          to="/"
          onClick={() => {
            if (onReset) onReset();
          }}
          className="flex items-center gap-1 hover:text-[#E2C76A] transition-colors"
        >
          <Home className="w-3.5 h-3.5" />
          <span className="font-sans">Ana Sayfa</span>
        </Link>

        {!isHome && pageLabel && (
          <>
            <ChevronRight className="w-3 h-3 text-zinc-600 shrink-0" />
            <Link to={pagePath} className="text-zinc-200 font-medium font-sans hover:text-[#E2C76A] transition-colors">
              {pageLabel}
            </Link>
          </>
        )}

        {isHome && !currentItem && (
          <>
            <ChevronRight className="w-3 h-3 text-zinc-600 shrink-0" />
            <span className="text-[#C8A646] font-medium font-sans">
              Bursa Canlı Altın Fiyatları
            </span>
          </>
        )}

        {currentItem && (
          <>
            <ChevronRight className="w-3 h-3 text-zinc-600 shrink-0" />
            <span className="text-[#E2C76A] font-semibold font-sans">
              {currentItem.name}
            </span>
          </>
        )}
      </div>
    </nav>
  );
};
