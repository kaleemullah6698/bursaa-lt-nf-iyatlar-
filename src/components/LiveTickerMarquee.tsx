import React from 'react';
import { useGold } from '../context/GoldContext';
import { ArrowUpRight, ArrowDownRight, Radio } from 'lucide-react';

export const LiveTickerMarquee: React.FC = () => {
  const { items, liveStreamActive, marketStatus } = useGold();

  const formatPrice = (p: number, curr?: string) => {
    if (curr === 'USD') return `$${p.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
    if (curr === 'EUR') return `€${p.toLocaleString('de-DE', { minimumFractionDigits: 2 })}`;
    return `₺${p.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  return (
    <div className="bg-[#0A0D12] border-b border-[rgba(244,241,232,0.06)] text-xs overflow-hidden py-1.5 px-4 select-none relative z-30">
      <div className="flex items-center justify-between gap-4 max-w-[1400px] mx-auto">
        {/* Market Status Pill */}
        <div className="flex items-center gap-2 shrink-0 border-r border-[rgba(244,241,232,0.08)] pr-4">
          <span className="relative flex h-2 w-2">
            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${marketStatus.isOpen ? 'bg-emerald-400' : 'bg-amber-400'} opacity-75`} />
            <span className={`relative inline-flex rounded-full h-2 w-2 ${marketStatus.isOpen ? 'bg-emerald-500' : 'bg-amber-500'}`} />
          </span>
          <span className="font-mono text-[11px] text-[#F4F1E8] font-medium hidden sm:inline">
            BURSA {marketStatus.isOpen ? 'AÇIK' : 'KAPALI'}
          </span>
          <span className="text-[11px] text-[#A5A8AE] font-mono hidden md:inline">
            {marketStatus.turkeyTimeStr}
          </span>
        </div>

        {/* Ticker Items */}
        <div className="flex items-center gap-6 overflow-x-auto scrollbar-none whitespace-nowrap py-0.5">
          {items.slice(0, 8).map((item) => {
            const isUp = item.changeRate >= 0;
            return (
              <div key={item.id} className="inline-flex items-center gap-2 font-mono text-[11px] shrink-0">
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

        {/* Live Radar */}
        <div className="shrink-0 pl-4 border-l border-[rgba(244,241,232,0.08)] hidden lg:flex items-center gap-1.5 text-[11px] font-mono text-[#C8A646]">
          <Radio className="w-3 h-3 animate-pulse text-emerald-400" />
          <span>PRO MAX FEED</span>
        </div>
      </div>
    </div>
  );
};
