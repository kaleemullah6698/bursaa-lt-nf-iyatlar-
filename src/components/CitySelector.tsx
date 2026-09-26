import React, { useState, useRef, useEffect } from 'react';
import { useGold } from '../context/GoldContext';
import { MapPin, ChevronDown, Check, Building2, TrendingUp, Sparkles } from 'lucide-react';
import { CityConfig, CityId } from '../types/city';
import { navigate } from '../utils/router';

interface CitySelectorProps {
  variant?: 'header' | 'mobile';
  onCityChanged?: () => void;
}

export const CitySelector: React.FC<CitySelectorProps> = ({ variant = 'header', onCityChanged }) => {
  const { activeCity, setActiveCityId, cities } = useGold();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close popover when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const handleSelect = (city: CityConfig, e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    setActiveCityId(city.id);
    setIsOpen(false);
    navigate(`/${city.slug}`);
    if (onCityChanged) onCityChanged();
  };

  if (variant === 'mobile') {
    return (
      <div className="space-y-2">
        <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400 px-1">
          <span className="flex items-center gap-1.5 text-[#E2C76A]">
            <MapPin className="w-3.5 h-3.5 text-[#C8A646]" />
            <span>FİZİKİ BORSALAR & ŞEHİR</span>
          </span>
          <span className="text-zinc-500">4 İl Hazır</span>
        </div>
        <div className="grid grid-cols-2 gap-1.5">
          {cities.map((city) => {
            const isSelected = city.id === activeCity.id;
            return (
              <a
                key={city.id}
                href={`/${city.slug}`}
                onClick={(e) => handleSelect(city, e)}
                className={`p-2 rounded-xl text-left transition-all border flex items-center justify-between cursor-pointer ${
                  isSelected
                    ? 'bg-[#C8A646]/20 border-[#C8A646] text-white shadow-[0_0_12px_rgba(200,166,70,0.2)]'
                    : 'bg-[#101318] border-white/5 text-zinc-300 hover:border-white/15'
                }`}
              >
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-semibold">{city.name}</span>
                    <span className="text-[10px] font-mono px-1 py-0.2 rounded bg-black/40 text-[#E2C76A]">
                      {city.shortCode}
                    </span>
                  </div>
                  <span className="text-[10px] text-zinc-400 block truncate mt-0.5">
                    {city.marketName}
                  </span>
                </div>
                {isSelected && <Check className="w-3.5 h-3.5 text-[#E2C76A] shrink-0" />}
              </a>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="relative" ref={containerRef}>
      {/* City Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        type="button"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        className="group flex items-center gap-2 px-2.5 sm:px-3 py-1.5 rounded-lg bg-[#101318] hover:bg-[#161B22] border border-[rgba(244,241,232,0.1)] hover:border-[#C8A646]/50 text-left transition-all shadow-sm focus:outline-none focus:ring-1 focus:ring-[#C8A646] cursor-pointer"
        title="Şehir ve Borsa Değiştir"
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
        </span>
        <MapPin className="w-3.5 h-3.5 text-[#C8A646] shrink-0 group-hover:scale-110 transition-transform" />
        <div className="flex flex-col leading-tight">
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-semibold text-zinc-100 group-hover:text-white">
              {activeCity.name}
            </span>
            <span className="text-[10px] font-mono px-1 py-0.2 rounded bg-[#C8A646]/15 text-[#E2C76A] border border-[#C8A646]/30">
              {activeCity.shortCode}
            </span>
          </div>
          <span className="text-[10px] text-zinc-400 hidden xl:inline truncate max-w-[120px]">
            {activeCity.marketName}
          </span>
        </div>
        <ChevronDown className={`w-3.5 h-3.5 text-zinc-400 group-hover:text-zinc-200 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* City Switcher Popover Drawer */}
      {isOpen && (
        <div
          role="listbox"
          className="absolute left-0 top-full mt-2 w-80 sm:w-96 rounded-2xl bg-[#0C0F14]/98 backdrop-blur-2xl border border-[rgba(244,241,232,0.12)] p-2.5 shadow-[0_20px_50px_rgba(0,0,0,0.85)] z-50 animate-in fade-in slide-in-from-top-2 duration-150"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-2.5 py-2 border-b border-white/5 mb-1.5">
            <div className="flex items-center gap-1.5 text-xs font-mono text-zinc-300">
              <Building2 className="w-3.5 h-3.5 text-[#C8A646]" />
              <span className="font-semibold">Şehir & Fiziki Çarşı Kotasyonları</span>
            </div>
            <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 px-1.5 py-0.5 rounded">
              Canlı Ağ
            </span>
          </div>

          {/* Cities List with real anchor URLs for Google crawling */}
          <div className="space-y-1 max-h-[360px] overflow-y-auto">
            {cities.map((city) => {
              const isSelected = city.id === activeCity.id;
              return (
                <a
                  key={city.id}
                  href={`/${city.slug}`}
                  onClick={(e) => handleSelect(city, e)}
                  role="option"
                  aria-selected={isSelected}
                  className={`w-full p-2.5 rounded-xl text-left transition-all flex items-center justify-between group cursor-pointer ${
                    isSelected
                      ? 'bg-gradient-to-r from-[#C8A646]/20 to-[#C8A646]/5 border border-[#C8A646]/60 shadow-[0_0_16px_rgba(200,166,70,0.15)]'
                      : 'hover:bg-white/[0.04] border border-transparent'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center font-mono text-xs font-black shrink-0 ${
                        isSelected
                          ? 'bg-[#C8A646] text-[#080A0D]'
                          : 'bg-[#161B22] text-[#E2C76A] border border-white/10 group-hover:border-[#C8A646]/40'
                      }`}
                    >
                      {city.shortCode}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className={`text-sm font-semibold ${isSelected ? 'text-white' : 'text-zinc-200 group-hover:text-white'}`}>
                          {city.name}
                        </span>
                        {isSelected && (
                          <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                            Aktif Sayfa
                          </span>
                        )}
                        {city.id === 'ankara' && !isSelected && (
                          <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-amber-500/15 text-[#E2C76A] border border-amber-500/30">
                            Başkent
                          </span>
                        )}
                      </div>
                      <span className="block text-xs text-zinc-400 group-hover:text-zinc-300 mt-0.5">
                        {city.marketName}
                      </span>
                      <div className="flex items-center gap-2 mt-1 text-[10px] font-mono text-zinc-500">
                        <span>{city.activeJewelersCount}+ Sarraf</span>
                        <span>·</span>
                        <span>24s: {city.tradingVolume24h}</span>
                      </div>
                    </div>
                  </div>

                  {isSelected ? (
                    <div className="w-5 h-5 rounded-full bg-[#C8A646] flex items-center justify-center text-[#080A0D] shrink-0">
                      <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                    </div>
                  ) : (
                    <span className="text-[11px] font-mono text-zinc-500 group-hover:text-[#E2C76A] opacity-0 group-hover:opacity-100 transition-opacity">
                      Sayfaya Git →
                    </span>
                  )}
                </a>
              );
            })}
          </div>

          {/* Footer Note */}
          <div className="mt-2 pt-2 border-t border-white/5 px-2 text-[10px] text-zinc-500 font-mono flex items-center justify-between">
            <span>Google SEO Uyumlu Bağımsız Şehir Sayfaları</span>
            <span className="text-zinc-400">0ms Geçiş</span>
          </div>
        </div>
      )}
    </div>
  );
};
