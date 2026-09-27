import React, { useState, useRef, useEffect } from 'react';
import { useGold } from '../context/GoldContext';
import { Link } from './Link';
import { PageRoute } from '../utils/router';
import { CitySelector } from './CitySelector';
import { 
  Bell, 
  Menu, 
  X, 
  BarChart2, 
  Calculator, 
  Coins, 
  Briefcase, 
  MapPin, 
  HelpCircle,
  Building2,
  Table,
  Search,
  ChevronDown,
  ArrowUpRight
} from 'lucide-react';

interface HeaderProps {
  activePage?: PageRoute;
  onOpenAlertModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  activePage = 'fiyatlar', 
  onOpenAlertModal 
}) => {
  const { marketStatus, alerts, setCommandPaletteOpen, activeCity } = useGold();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [moreMenuOpen, setMoreMenuOpen] = useState(false);
  const moreMenuRef = useRef<HTMLDivElement>(null);

  // Close more menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (moreMenuRef.current && !moreMenuRef.current.contains(e.target as Node)) {
        setMoreMenuOpen(false);
      }
    };
    if (moreMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [moreMenuOpen]);

  // Primary 4 focal navigation links
  const primaryLinks: { id: PageRoute; path: string; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: 'fiyatlar', path: '/', label: 'Canlı Kurlar', icon: Table },
    { id: 'grafik', path: '/grafik', label: 'Grafik Terminali', icon: BarChart2 },
    { id: 'altin-turleri', path: '/altin-turleri', label: 'Altın Türleri', icon: Coins },
    { id: 'hesaplama', path: '/hesaplama', label: 'Hesaplama & Zekat', icon: Calculator }
  ];

  // Secondary links grouped under "Daha Fazla" (More) to avoid clutter
  const secondaryLinks: { id: PageRoute; path: string; label: string; desc: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { 
      id: 'portfoy', 
      path: '/portfoy', 
      label: 'Portföyüm', 
      desc: 'Fiziki altın varlık ve kar/zarar hesabı',
      icon: Briefcase 
    },
    { 
      id: 'bursada-altin', 
      path: '/bursada-altin', 
      label: `${activeCity.name}'da Altın & Çarşı`, 
      desc: `${activeCity.marketName} kültürü ve banka makas analizi`,
      icon: Building2 
    },
    { 
      id: 'kuyumcular', 
      path: '/kuyumcular', 
      label: 'Kuyumcular & Nöbetçi', 
      desc: `${activeCity.districts.slice(0, 3).join(', ')} sarraflar rehberi`,
      icon: MapPin 
    },
    { 
      id: 'sss', 
      path: '/sss', 
      label: 'Rehber & SSS', 
      desc: 'Sahte altın testi, pazarlık ve mevzuat',
      icon: HelpCircle 
    }
  ];

  const isSecondaryActive = secondaryLinks.some(link => link.id === activePage);

  return (
    <header className="sticky top-0 z-50 bg-[#080A0D]/95 backdrop-blur-xl border-b border-[rgba(244,241,232,0.07)]">
      {/* Top Micro-Bar: Refined, unboxed single-line session metadata */}
      <div className="hidden lg:block border-b border-[rgba(244,241,232,0.04)] bg-[#05070A] py-1 text-[11px] text-[#A5A8AE] font-mono">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-zinc-300">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <strong className="text-zinc-200">{activeCity.tableTitle}</strong>
            </span>
            <span className="text-zinc-700">·</span>
            <span className="text-zinc-400">{activeCity.workingHours}</span>
            <span className="text-zinc-700">·</span>
            <span className="text-amber-400/90 font-medium">Fiziki OTC Tahtası</span>
          </div>

          <div className="flex items-center gap-4 text-zinc-400">
            <span>24s İşlem Hacmi: <strong className="text-zinc-200 font-semibold">{activeCity.tradingVolume24h}</strong></span>
            <span className="text-zinc-700">·</span>
            <span className="text-emerald-400/90 font-medium flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              Gecikmesiz Kotasyon
            </span>
          </div>
        </div>
      </div>

      {/* Main Global Navigation Bar (Decluttered & Scalable) */}
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-[64px] sm:h-[68px] gap-3 sm:gap-6">
          
          {/* Brandmark + City Selector Cluster */}
          <div className="flex items-center gap-2.5 sm:gap-4 shrink-0">
            <Link
              to="/"
              className="flex items-center gap-2.5 group text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C8A646]/50 rounded-lg py-1"
              aria-label={`${activeCity.name} Altın Fiyatları Ana Sayfa`}
            >
              {/* Bullion Monogram (Dynamically updates with City shortCode) */}
              <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-[#222834] via-[#141820] to-[#0A0D12] border border-[#C8A646]/35 p-0.5 shadow-[0_2px_16px_rgba(200,166,70,0.18)] group-hover:border-[#C8A646] group-hover:shadow-[0_4px_24px_rgba(200,166,70,0.35)] transition-all duration-300 flex items-center justify-center overflow-hidden shrink-0">
                <div className="absolute -top-3 -right-3 w-8 h-8 bg-[#C8A646]/20 rounded-full blur-sm group-hover:bg-[#C8A646]/30 transition-all" />
                <div className="text-center font-mono">
                  <span className="block text-[11px] font-black text-[#E2C76A] tracking-wider leading-none">
                    {activeCity.shortCode}
                  </span>
                  <span className="block text-[8px] text-zinc-400 font-bold tracking-tighter scale-90">
                    995.0
                  </span>
                </div>
              </div>

              {/* Brand Typography */}
              <div className="flex flex-col">
                <span className="font-serif text-base sm:text-lg font-bold tracking-tight text-[#F4F1E8] group-hover:text-white transition-colors leading-tight flex items-center gap-1.5">
                  <span>{activeCity.name} Altın</span>
                  <span className="text-[10px] font-mono font-medium px-1 py-0.2 rounded bg-[#C8A646]/15 text-[#E2C76A] border border-[#C8A646]/30 hidden xs:inline">
                    Canlı
                  </span>
                </span>
                <span className="text-[11px] text-[#A5A8AE] font-sans font-normal truncate max-w-[130px] sm:max-w-[180px]">
                  {activeCity.marketName}
                </span>
              </div>
            </Link>

            {/* Bespoke City Selector Dropdown (Scalable to Ankara, Istanbul, etc.) */}
            <div className="hidden sm:block pl-2 border-l border-white/10">
              <CitySelector variant="header" />
            </div>
          </div>

          {/* Desktop Primary Navigation (Clean 4 Links + "Daha Fazla" Dropdown) */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2 text-[13px] text-[#A5A8AE]" aria-label="Ana gezinme">
            {primaryLinks.map((link) => {
              const isActive = activePage === link.id;
              const Icon = link.icon;
              return (
                <Link
                  key={link.id}
                  to={link.path}
                  className={`transition-all px-3 py-1.5 rounded-lg text-[13px] font-medium tracking-normal relative flex items-center gap-1.5 ${
                    isActive
                      ? 'text-[#F4F1E8] font-semibold bg-white/[0.04]'
                      : 'text-[#A5A8AE] hover:text-[#F4F1E8] hover:bg-white/[0.02]'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#E2C76A]' : 'text-zinc-400'}`} />
                  <span>{link.label}</span>
                  {isActive && (
                    <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-gradient-to-r from-transparent via-[#C8A646] to-transparent rounded-full shadow-[0_0_10px_rgba(200,166,70,0.8)]" />
                  )}
                </Link>
              );
            })}

            {/* "Daha Fazla" (More) Dropdown Menu */}
            <div className="relative" ref={moreMenuRef}>
              <button
                onClick={() => setMoreMenuOpen(!moreMenuOpen)}
                type="button"
                aria-expanded={moreMenuOpen}
                aria-label="Diğer Modüller Menüsünü Aç / Kapat"
                className={`transition-all px-3 py-1.5 rounded-lg text-[13px] font-medium tracking-normal flex items-center gap-1.5 cursor-pointer ${
                  isSecondaryActive || moreMenuOpen
                    ? 'text-[#F4F1E8] font-semibold bg-white/[0.04]'
                    : 'text-[#A5A8AE] hover:text-[#F4F1E8] hover:bg-white/[0.02]'
                }`}
              >
                <span>Diğer Modüller</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${moreMenuOpen ? 'rotate-180' : ''}`} />
                {isSecondaryActive && (
                  <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-gradient-to-r from-transparent via-[#C8A646] to-transparent rounded-full shadow-[0_0_10px_rgba(200,166,70,0.8)]" />
                )}
              </button>

              {moreMenuOpen && (
                <div className="absolute right-0 top-full mt-2 w-72 rounded-2xl bg-[#0C0F14]/98 backdrop-blur-2xl border border-[rgba(244,241,232,0.12)] p-2 shadow-[0_20px_50px_rgba(0,0,0,0.85)] z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="px-2.5 py-1.5 text-[10px] font-mono text-zinc-400 uppercase border-b border-white/5 mb-1">
                    Genişletilmiş Analiz & Rehber
                  </div>
                  <div className="space-y-0.5">
                    {secondaryLinks.map((item) => {
                      const Icon = item.icon;
                      const isActive = activePage === item.id;
                      return (
                        <Link
                          key={item.id}
                          to={item.path}
                          onClick={() => setMoreMenuOpen(false)}
                          className={`flex items-start gap-2.5 p-2 rounded-xl transition-all ${
                            isActive
                              ? 'bg-[#C8A646]/15 text-white font-semibold'
                              : 'text-zinc-300 hover:text-white hover:bg-white/[0.05]'
                          }`}
                        >
                          <div className={`p-1.5 rounded-lg mt-0.5 ${isActive ? 'bg-[#C8A646] text-[#080A0D]' : 'bg-[#141820] text-[#C8A646]'}`}>
                            <Icon className="w-3.5 h-3.5" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <span className={`text-xs ${isActive ? 'text-[#E2C76A] font-bold' : 'text-zinc-100'}`}>
                                {item.label}
                              </span>
                              <ArrowUpRight className="w-3 h-3 text-zinc-400" />
                            </div>
                            <span className="block text-[10px] text-zinc-400 truncate mt-0.5">
                              {item.desc}
                            </span>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </nav>

          {/* Right Action Suite: Search ⌘K + Price Alert + Market Status + Mobile Toggle */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            
            {/* Quick Command Palette Trigger (Desktop) */}
            <button
              onClick={() => setCommandPaletteOpen(true)}
              className="hidden md:inline-flex items-center gap-2 px-2.5 sm:px-3 py-1.5 bg-[#101318] hover:bg-[#161B22] border border-[rgba(244,241,232,0.1)] hover:border-[#C8A646]/40 text-xs text-[#A5A8AE] hover:text-white rounded-lg transition-all font-mono shadow-sm cursor-pointer"
              title="Arama Paleti (⌘K)"
              aria-label="Arama Paletini Aç (Komut + K)"
              type="button"
            >
              <Search className="w-3.5 h-3.5 text-[#C8A646]" aria-hidden="true" />
              <span className="hidden xl:inline">Arama</span>
              <kbd className="px-1.5 py-0.5 bg-[#1C222B] text-zinc-400 rounded text-[10px] border border-zinc-700/60 font-sans">
                ⌘K
              </kbd>
            </button>

            {/* Price Alert Bell */}
            <button
              onClick={onOpenAlertModal}
              className="relative p-2 rounded-lg bg-[#101318] hover:bg-[#161B22] border border-[rgba(244,241,232,0.1)] text-[#A5A8AE] hover:text-[#E2C76A] hover:border-[#C8A646]/40 transition-colors cursor-pointer"
              title="Fiyat Alarmı Kur"
              aria-label="Fiyat Alarmı Kur"
              type="button"
            >
              <Bell className="w-4 h-4" aria-hidden="true" />
              {alerts.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#C8A646] text-[#080A0D] font-bold text-[10px] rounded-full flex items-center justify-center animate-pulse">
                  {alerts.length}
                </span>
              )}
            </button>

            {/* Live Market Status Pill */}
            <div
              className="hidden sm:flex items-center gap-2 text-xs text-[#A5A8AE] border border-[rgba(244,241,232,0.1)] rounded-lg px-2.5 py-1.5 bg-[#101318]"
              role="status"
              aria-live="polite"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.7)] animate-pulse" aria-hidden="true" />
              <span className="font-mono text-zinc-200 text-[11px] whitespace-nowrap">
                {marketStatus.isOpen ? 'Seans Açık' : 'Nöbetçi'}
              </span>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg bg-[#101318] border border-[rgba(244,241,232,0.1)] text-[#F4F1E8] hover:text-[#C8A646] transition-colors cursor-pointer"
              aria-label={mobileMenuOpen ? 'Menüyü Kapat' : 'Menüyü Aç'}
              aria-expanded={mobileMenuOpen}
              type="button"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" aria-hidden="true" /> : <Menu className="w-5 h-5" aria-hidden="true" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer with Integrated City Switcher */}
        {mobileMenuOpen && (
          <nav className="lg:hidden border-t border-[rgba(244,241,232,0.08)] py-4 px-3 space-y-4 bg-[#0C0F14] rounded-b-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] mb-2">
            
            {/* Quick City Switcher in Mobile Drawer */}
            <CitySelector variant="mobile" onCityChanged={() => setMobileMenuOpen(false)} />

            <div className="border-t border-white/5 pt-3">
              <div className="text-[11px] font-mono text-zinc-400 uppercase px-2 mb-2">
                {activeCity.name} Altın Modülleri
              </div>
              <div className="space-y-1">
                {[...primaryLinks, ...secondaryLinks].map(item => {
                  const Icon = item.icon;
                  const isActive = activePage === item.id;
                  return (
                    <Link
                      key={item.id}
                      to={item.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`w-full flex items-center gap-3 p-2.5 rounded-xl transition-colors text-left ${
                        isActive
                          ? 'bg-[#C8A646]/15 border border-[#C8A646]/35 text-[#F4F1E8]'
                          : 'hover:bg-[#141820] text-zinc-300'
                      }`}
                    >
                      <div className={`p-2 rounded-lg ${isActive ? 'bg-[#C8A646] text-[#080A0D]' : 'bg-[#141820] text-[#C8A646]'}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className={`text-sm font-medium block ${isActive ? 'text-[#E2C76A] font-bold' : 'text-white'}`}>
                          {item.label}
                        </span>
                      </div>
                      <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400" />
                    </Link>
                  );
                })}
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};
