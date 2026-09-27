import React from 'react';
import { useGold } from '../context/GoldContext';
import { CITIES } from '../data/cities';
import { Link } from './Link';
import { MapPin, ArrowRight, Building2, TrendingUp, CheckCircle2 } from 'lucide-react';
import { formatTL } from '../data/goldData';

export const CityHubsNavigator: React.FC = () => {
  const { activeCity, items } = useGold();
  const gramItem = items.find(i => i.id === 'gram-altin') || items[0];

  return (
    <section className="py-6 bg-[#0B0E13] border-b border-[rgba(244,241,232,0.06)]" aria-label="Türkiye Fiziki Altın Borsaları Hubı">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
            <span className="p-1 rounded bg-[#C8A646]/20 text-[#E2C76A]">
              <Building2 className="w-3.5 h-3.5" />
            </span>
            <span className="text-[#F4F1E8] font-bold uppercase tracking-wider">
              Türkiye Serbest Piyasa Şehir Hubları
            </span>
            <span className="text-zinc-600 hidden sm:inline">|</span>
            <span className="text-zinc-400 hidden sm:inline">Her şehir için bağımsız canlı kotasyon</span>
          </div>

          <div className="text-[11px] font-mono text-[#E2C76A] flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>Aktif Borsa: <strong>{activeCity.name} ({activeCity.shortCode})</strong></span>
          </div>
        </div>

        {/* 4 City Cards Grid with SEO-friendly clean URLs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {CITIES.map((city) => {
            const isSelected = city.id === activeCity.id;
            const cityPrice = gramItem ? (gramItem.sellingPrice + city.pricePremiumTL) : 7150;

            return (
              <Link
                key={city.id}
                to={`/${city.slug}`}
                aria-label={`${city.name} Altın Fiyatları ve Serbest Piyasa Sayfası`}
                className={`group p-3.5 sm:p-4 rounded-xl border transition-all flex flex-col justify-between relative overflow-hidden ${
                  isSelected
                    ? 'bg-gradient-to-b from-[#C8A646]/15 to-[#0D1016] border-[#C8A646]/60 shadow-[0_4px_20px_rgba(200,166,70,0.15)] ring-1 ring-[#C8A646]/40'
                    : 'bg-[#10141B] hover:bg-[#141822] border-[rgba(244,241,232,0.08)] hover:border-[#C8A646]/40'
                }`}
              >
                {isSelected && (
                  <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-[#C8A646]/30 via-transparent to-transparent pointer-events-none" />
                )}

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-1.5">
                      <span className={`text-sm sm:text-base font-serif font-bold ${isSelected ? 'text-[#E2C76A]' : 'text-white group-hover:text-[#E2C76A]'}`}>
                        {city.name}
                      </span>
                      <span className="text-[10px] font-mono px-1 py-0.2 rounded bg-black/50 text-zinc-400 border border-white/10">
                        {city.shortCode}
                      </span>
                    </div>

                    {isSelected ? (
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1 font-semibold">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Açık</span>
                      </span>
                    ) : (
                      <ArrowRight className="w-3.5 h-3.5 text-zinc-500 group-hover:text-[#E2C76A] group-hover:translate-x-0.5 transition-all" />
                    )}
                  </div>

                  <div className="text-[11px] text-zinc-400 truncate mb-2">
                    {city.marketName}
                  </div>
                </div>

                <div className="pt-2 border-t border-[rgba(244,241,232,0.06)] flex items-end justify-between">
                  <div>
                    <div className="text-[9px] font-mono text-zinc-500 uppercase">Gram Satış</div>
                    <div className="text-xs sm:text-sm font-mono font-bold text-white group-hover:text-[#E2C76A] transition-colors">
                      {formatTL(cityPrice)}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-[9px] font-mono text-zinc-500 uppercase">24s Hacim</div>
                    <div className="text-[11px] font-mono text-zinc-400">
                      {city.tradingVolume24h}
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};
