import React from 'react';
import { useGold } from '../context/GoldContext';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

export const LiveTickerMarquee: React.FC = React.memo(() => {
  const { items, marketStatus, activeCity } = useGold();

  const formatPrice = (p: number, curr?: string) => {
    if (curr === 'USD') return `$${p.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
    if (curr === 'EUR') return `€${p.toLocaleString('de-DE', { minimumFractionDigits: 2 })}`;
    return `₺${p.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  return (
    <div className="bg-[#090C10] border-b border-[rgba(244,241,232,0.06)] text-xs overflow-hidden h-[34px] min-h-[34px] flex items-center px-4 select-none relative z-30">
      <div className="flex items-center justify-between gap-4 max-w-[1280px] w-full mx-auto">
        {/* City Status Pill */}
        <div className="flex items-center gap-2 shrink-0 border-r border-[rgba(244,241,232,0.08)] pr-3 sm:pr-4">
          <span className="relative flex h-2 w-2">
            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${marketStatus.isOpen ? 'bg-emerald-400' : 'bg-amber-400'} opacity-75`} />
            <span className={`relative inline-flex rounded-full h-2 w-2 ${marketStatus.isOpen ? 'bg-emerald-500' : 'bg-amber-500'}`} />
          </span>
          <span className="font-mono text-[11px] text-[#F4F1E8] font-semibold">
            {activeCity.name.toUpperCase()} {marketStatus.isOpen ? 'AÇIK' : 'KAPALI'}
          </span>
          <span className="text-[10px] text-[#A5A8AE] font-mono hidden md:inline">
            {marketStatus.turkeyTimeStr}
          </span>
        </div>

        {/* Ticker Items (Smoothly scrollable, responsive) */}
        <div className="flex items-center gap-5 sm:gap-6 overflow-x-auto scrollbar-none whitespace-nowrap py-0.5">
          {items.slice(0, 8).map((item) => {
            const isUp = item.changeRate >= 0;
            return (
              <div key={item.id} className="inline-flex items-center gap-1.5 font-mono text-[11px] shrink-0">
                <span className="text-[#A5A8AE] font-sans font-medium">{item.shortName || item.name}:</span>
                <span className="text-[#F4F1E8] font-semibold">{formatPrice(item.sellingPrice, item.currency)}</span>
                <span className={`inline-flex items-center text-[10px] font-bold ${isUp ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {isUp ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                  {item.changeRate > 0 ? '+' : ''}{item.changeRate.toFixed(2)}%
                </span>
              </div>
            );
          })}
        </div>

        {/* Local Market Terminal Badge */}
        <div className="shrink-0 pl-3 sm:pl-4 border-l border-[rgba(244,241,232,0.08)] hidden lg:flex items-center gap-1.5 text-[11px] font-mono text-zinc-400">
          <span className="w-1.5 h-1.5 rounded-full bg-[#C8A646]" />
          <span className="text-zinc-300">{activeCity.marketName}</span>
        </div>
      </div>
    </div>
  );
});

LiveTickerMarquee.displayName = 'LiveTickerMarquee';
