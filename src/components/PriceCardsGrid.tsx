import React from 'react';
import { useGold } from '../context/GoldContext';
import { ArrowUp, ArrowDown, Activity, Sparkles, ChevronRight } from 'lucide-react';
import { GoldPriceItem } from '../types/gold';

export const PriceCardsGrid: React.FC = () => {
  const { items, setSelectedItem, flashedItemIds, openCalculatorWithGold } = useGold();

  // Top 4 flagship instruments matching the user's HTML specification
  const primaryKeys = ['gram-altin', 'ceyrek-altin', 'yarim-altin', 'tam-altin'];
  const primaryItems = primaryKeys
    .map(key => items.find(i => i.id === key))
    .filter((i): i is GoldPriceItem => Boolean(i));

  const formatTL = (val: number) => {
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'TRY',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(val);
  };

  const formatPct = (val: number) => {
    return new Intl.NumberFormat('tr-TR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
      signDisplay: 'always'
    }).format(val);
  };

  // SVG Sparkline path generator
  const renderSparkline = (points: number[], isPositive: boolean) => {
    if (!points || points.length < 2) return null;
    const min = Math.min(...points);
    const max = Math.max(...points);
    const range = max - min || 1;
    const w = 180;
    const h = 38;

    const coords = points.map((p, idx) => {
      const x = (idx / (points.length - 1)) * w;
      const y = h - 4 - ((p - min) / range) * (h - 8);
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    });

    const pathD = 'M ' + coords.join(' L ');
    const strokeColor = isPositive ? '#3FA97A' : '#C9605F';

    return (
      <svg className="w-full h-8 overflow-visible" viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none">
        <path
          d={pathD}
          fill="none"
          stroke={strokeColor}
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  };

  return (
    <section id="fiyatlar" aria-labelledby="dashTitle" className="py-10 bg-[#080A0D]">
      <div className="max-w-[1180px] mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="mb-8">
          <span className="text-xs uppercase tracking-[0.16em] text-[#C8A646] font-semibold mb-2 block">
            Anlık Veriler
          </span>
          <h2 id="dashTitle" className="text-2xl sm:text-3xl font-serif text-[#F4F1E8] font-semibold tracking-tight">
            Güncel Bursa Altın Fiyatları
          </h2>
          <p className="text-sm sm:text-base text-[#A5A8AE] mt-2 max-w-2xl">
            Alış ve satış fiyatları. Gram altın küresel spot piyasadan canlı alınır; diğer ürünler saf altın karşılığı üzerinden hesaplanır.
          </p>
        </div>

        {/* 4 Dashboard Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" aria-live="polite">
          {primaryItems.map((item) => {
            const isFlashed = flashedItemIds[item.id];
            const isUp = item.changeRate >= 0;
            const spreadTL = item.sellingPrice - item.buyingPrice;

            return (
              <article
                key={item.id}
                onClick={() => setSelectedItem(item)}
                className={`bg-gradient-to-b from-[#14181E] to-[#101318] border rounded-2xl p-5 relative transition-all duration-200 cursor-pointer group hover:-translate-y-1 hover:border-[#C8A646]/50 shadow-lg flex flex-col justify-between ${
                  isFlashed
                    ? 'border-[#E2C76A] shadow-[0_0_20px_rgba(200,166,70,0.25)] ring-1 ring-[#E2C76A]'
                    : 'border-[rgba(244,241,232,0.08)]'
                }`}
              >
                <div>
                  {/* Top Label */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs uppercase tracking-wider text-[#A5A8AE] font-medium flex items-center gap-1.5">
                      {item.shortName || item.name}
                      {item.id === 'gram-altin' && (
                        <span className="text-[10px] normal-case tracking-normal text-[#C8A646] bg-[#C8A646]/10 px-1.5 py-0.5 rounded">
                          24 ayar · canlı
                        </span>
                      )}
                    </span>
                    <ChevronRight className="w-4 h-4 text-[#A5A8AE] opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                  </div>

                  {/* Sell Price (Big num) */}
                  <div className="mb-4">
                    <span className="text-[11px] uppercase tracking-wider text-[#A5A8AE] block mb-0.5 font-medium">
                      Satış
                    </span>
                    <div className="text-2xl sm:text-3xl font-bold font-mono text-[#E2C76A] tracking-tight">
                      {formatTL(item.sellingPrice)}
                    </div>
                  </div>

                  {/* Mini Sparkline Chart */}
                  <div className="py-1 mb-3">
                    {renderSparkline(item.sparkline, isUp)}
                  </div>
                </div>

                <div className="space-y-2 border-t border-[rgba(244,241,232,0.08)] pt-3">
                  {/* Buy Price Row */}
                  <div className="flex items-center justify-between text-xs sm:text-sm text-[#A5A8AE]">
                    <span>Alış</span>
                    <span className="text-[#F4F1E8] font-mono font-semibold">
                      {formatTL(item.buyingPrice)}
                    </span>
                  </div>

                  {/* 24h Change Row */}
                  <div className="flex items-center justify-between text-xs sm:text-sm">
                    <span className="text-[#A5A8AE]">Değişim (24s)</span>
                    <span
                      className={`inline-flex items-center gap-1 font-mono font-semibold px-2 py-0.5 rounded-full text-xs ${
                        isUp
                          ? 'text-[#3FA97A] bg-[#3FA97A]/10'
                          : 'text-[#C9605F] bg-[#C9605F]/10'
                      }`}
                    >
                      {isUp ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
                      %{formatPct(item.changeRate)}
                    </span>
                  </div>

                  {/* Makas / Spread quick indicator */}
                  <div className="flex items-center justify-between text-[11px] text-[#A5A8AE] pt-1">
                    <span>Makas (Fark):</span>
                    <span className="font-mono text-[#F4F1E8]/70">₺{spreadTL.toFixed(2)}</span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
