import React, { useState } from 'react';
import { useGold } from '../context/GoldContext';
import { Link } from './Link';
import { PageRoute } from '../utils/router';
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
  const { marketStatus, alerts, setCommandPaletteOpen, items } = useGold();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Quick ticker quotes for header strip
  const gramItem = items.find(i => i.id === 'gram-altin');
  const usdItem = items.find(i => i.id === 'usd-try');

  const navLinks: { id: PageRoute; path: string; label: string; icon?: React.ComponentType<{ className?: string }> }[] = [
    { id: 'fiyatlar', path: '/', label: 'Canlı Kurlar' },
    { id: 'grafik', path: '/grafik', label: 'Grafik Terminali', icon: BarChart2 },
    { id: 'altin-turleri', path: '/altin-turleri', label: 'Altın Türleri' },
    { id: 'portfoy', path: '/portfoy', label: 'Portföyüm' },
    { id: 'hesaplama', path: '/hesaplama', label: 'Hesaplama & Zekat', icon: Calculator },
    { id: 'bursada-altin', path: '/bursada-altin', label: "Bursa'da Altın" },
    { id: 'kuyumcular', path: '/kuyumcular', label: 'Kuyumcular & Nöbetçi' },
    { id: 'sss', path: '/sss', label: 'Rehber & SSS' }
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#080A0D]/92 backdrop-blur-xl border-b border-[rgba(244,241,232,0.07)]">
      {/* Top Micro-Bar: Hyper-Local Market Timing & Bursa Session Ribbon */}
      <div className="hidden lg:block border-b border-[rgba(244,241,232,0.04)] bg-[#05070A] py-1 text-[11px] text-[#A5A8AE] font-mono">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-zinc-300">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <strong className="text-zinc-200">Bursa Kapalı Çarşı Sarraflar Masası</strong>
            </span>
            <span className="text-zinc-700">·</span>
            <span className="text-zinc-400">Hafta İçi 09:00 - 18:30 / Cumartesi 09:00 - 15:00</span>
            <span className="text-zinc-700">·</span>
            <span className="text-amber-400/90 font-medium">Fiziki Altın OTC Tahtası</span>
          </div>

          <div className="flex items-center gap-4">
            {gramItem && (
              <span className="text-zinc-300">
                Gram: <strong className="text-white font-semibold">₺{gramItem.buyingPrice.toLocaleString('tr-TR')}</strong>
                <span className={`ml-1 text-[10px] ${gramItem.changeRate >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {gramItem.changeRate >= 0 ? '+' : ''}%{gramItem.changeRate.toFixed(2)}
                </span>
              </span>
            )}
            {usdItem && (
              <span className="text-zinc-300">
                USD/TRY: <strong className="text-white font-semibold">₺{usdItem.buyingPrice.toFixed(4)}</strong>
              </span>
            )}
            <span className="text-zinc-500">Gecikmesiz Canlı Veri</span>
          </div>
        </div>
      </div>

      {/* Main Global Navigation Bar */}
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-[68px]">
          
          {/* $100M FinTech Brandmark Logo */}
          <Link
            to="/"
            className="flex items-center gap-3 group text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C8A646]/50 rounded-lg py-1"
            aria-label="Bursa Altın Fiyatları Ana Sayfa"
          >
            {/* Sculptural Bullion Monogram Icon */}
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-[#222834] via-[#141820] to-[#0A0D12] border border-[#C8A646]/35 p-0.5 shadow-[0_2px_16px_rgba(200,166,70,0.18)] group-hover:border-[#C8A646] group-hover:shadow-[0_4px_24px_rgba(200,166,70,0.35)] transition-all duration-300 flex items-center justify-center overflow-hidden">
              <div className="absolute -top-3 -right-3 w-8 h-8 bg-[#C8A646]/20 rounded-full blur-sm group-hover:bg-[#C8A646]/30 transition-all" />
              <div className="text-center font-mono">
                <span className="block text-[11px] font-black text-[#E2C76A] tracking-wider leading-none">
                  BKÇ
                </span>
                <span className="block text-[8px] text-zinc-400 font-bold tracking-tighter scale-90">
                  995.0
                </span>
              </div>
            </div>

            {/* Brand Typography */}
            <div className="flex flex-col">
              <span className="font-serif text-lg sm:text-xl font-bold tracking-tight text-[#F4F1E8] group-hover:text-white transition-colors leading-tight flex items-center gap-1.5">
                <span>Bursa Altın</span>
                <span className="text-xs font-mono font-medium px-1.5 py-0.5 rounded bg-[#C8A646]/15 text-[#E2C76A] border border-[#C8A646]/30">
                  Canlı
                </span>
              </span>
              <span className="text-[11px] text-[#A5A8AE] font-sans font-normal tracking-normal">
                Tarihi Kapalı Çarşı Sarrafları
              </span>
            </div>
          </Link>

          {/* Desktop Primary Navigation */}
          <nav className="hidden xl:flex items-center gap-6 text-[13px] text-[#A5A8AE]" aria-label="Ana gezinme">
            {navLinks.map((link) => {
              const isActive = activePage === link.id;
              const Icon = link.icon;
              return (
                <Link
                  key={link.id}
                  to={link.path}
                  className={`transition-all py-2 text-[13px] font-medium tracking-normal relative flex items-center gap-1.5 ${
                    isActive
                      ? 'text-[#F4F1E8] font-semibold'
                      : 'text-[#A5A8AE] hover:text-[#F4F1E8]'
                  }`}
                >
                  {Icon && <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#E2C76A]' : 'text-zinc-500'}`} />}
                  <span>{link.label}</span>
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#C8A646] to-transparent rounded-full shadow-[0_0_10px_rgba(200,166,70,0.8)]" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Medium Screen Compact Navigation */}
          <nav className="hidden md:flex xl:hidden items-center gap-3.5 text-xs text-[#A5A8AE]" aria-label="Kompakt gezinme">
            {navLinks.slice(0, 5).map((link) => {
              const isActive = activePage === link.id;
              return (
                <Link
                  key={link.id}
                  to={link.path}
                  className={`transition-all py-1.5 text-xs font-medium relative ${
                    isActive ? 'text-[#E2C76A] font-semibold' : 'text-[#A5A8AE] hover:text-[#F4F1E8]'
                  }`}
                >
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right Action Suite: Search ⌘K + Price Alert + Market Status Pill */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            
            {/* Quick Command Palette Trigger (Desktop) */}
            <button
              onClick={() => setCommandPaletteOpen(true)}
              className="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 bg-[#101318] hover:bg-[#161B22] border border-[rgba(244,241,232,0.1)] hover:border-[#C8A646]/40 text-xs text-[#A5A8AE] hover:text-white rounded-lg transition-all font-mono shadow-sm"
              title="Arama Paleti (⌘K)"
              type="button"
            >
              <Search className="w-3.5 h-3.5 text-[#C8A646]" />
              <span className="hidden lg:inline">Arama</span>
              <kbd className="px-1.5 py-0.5 bg-[#1C222B] text-zinc-400 rounded text-[10px] border border-zinc-700/60 font-sans">
                ⌘K
              </kbd>
            </button>

            {/* Price Alert Bell */}
            <button
              onClick={onOpenAlertModal}
              className="relative p-2 rounded-lg bg-[#101318] hover:bg-[#161B22] border border-[rgba(244,241,232,0.1)] text-[#A5A8AE] hover:text-[#E2C76A] hover:border-[#C8A646]/40 transition-colors"
              title="Fiyat Alarmı Kur"
              aria-label="Fiyat Alarmı Kur"
              type="button"
            >
              <Bell className="w-4 h-4" />
              {alerts.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#C8A646] text-[#080A0D] font-bold text-[10px] rounded-full flex items-center justify-center animate-pulse">
                  {alerts.length}
                </span>
              )}
            </button>

            {/* Live Market Status Pill */}
            <div
              className="flex items-center gap-2 text-xs text-[#A5A8AE] border border-[rgba(244,241,232,0.1)] rounded-lg px-2.5 py-1.5 bg-[#101318]"
              role="status"
              aria-live="polite"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.7)] animate-pulse" />
              <span className="font-mono text-zinc-200 hidden sm:inline text-[11px]">
                {marketStatus.isOpen ? 'Seans Açık' : 'Nöbetçi Kotasyon'}
              </span>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg bg-[#101318] border border-[rgba(244,241,232,0.1)] text-[#F4F1E8] hover:text-[#C8A646] transition-colors"
              aria-label="Menüyü aç"
              aria-expanded={mobileMenuOpen}
              type="button"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <nav className="md:hidden border-t border-[rgba(244,241,232,0.08)] py-4 px-3 space-y-1.5 bg-[#0C0F14] rounded-b-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] mb-2">
            <div className="text-[11px] font-mono text-zinc-500 uppercase px-2 mb-2">
              Bursa Altın Fiyatları Gezinme
            </div>
            {[
              { id: 'fiyatlar', path: '/', label: 'Canlı Kurlar Tablosu', icon: Table, desc: 'Kapalı Çarşı 21 enstrüman anlık alış-satış' },
              { id: 'grafik', path: '/grafik', label: 'Teknik Grafik Terminali', icon: BarChart2, desc: 'Gram, Çeyrek ve Ons mum grafikleri' },
              { id: 'altin-turleri', path: '/altin-turleri', label: 'Altın Türleri & Ayar Rehberi', icon: Coins, desc: '22A Bursa Burması, Çeyrek, Has Külçe' },
              { id: 'portfoy', path: '/portfoy', label: 'Portföy Yönetim İstasyonu', icon: Briefcase, desc: 'Fiziki altın varlık ve kar/zarar hesabı' },
              { id: 'hesaplama', path: '/hesaplama', label: 'Hesaplama & Zekat Terminali', icon: Calculator, desc: 'Düğün takı bütçesi, 80.18g nisap ve hurda çevirici' },
              { id: 'bursada-altin', path: '/bursada-altin', label: "Bursa'da Altın & Kapalı Çarşı", icon: Building2, desc: '700 yıllık çarşı kültürü ve banka makas analizi' },
              { id: 'kuyumcular', path: '/kuyumcular', label: 'Bursa Kuyumcular & Nöbetçi Sarraflar', icon: MapPin, desc: 'Osmangazi, Nilüfer, Yıldırım rehberi ve ulaşım' },
              { id: 'sss', path: '/sss', label: 'Sıkça Sorulan Sorular', icon: HelpCircle, desc: 'Sahte altın testi, pazarlık ve mevzuat' }
            ].map(item => {
              const Icon = item.icon;
              const isActive = activePage === item.id;
              return (
                <Link
                  key={item.id}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`w-full flex items-start gap-3 p-2.5 rounded-xl transition-colors text-left ${
                    isActive
                      ? 'bg-[#C8A646]/15 border border-[#C8A646]/35 text-[#F4F1E8]'
                      : 'hover:bg-[#141820] text-zinc-300'
                  }`}
                >
                  <div className={`p-2 rounded-lg ${isActive ? 'bg-[#C8A646] text-[#080A0D]' : 'bg-[#141820] text-[#C8A646]'}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className={`text-sm font-medium ${isActive ? 'text-[#E2C76A] font-bold' : 'text-white'}`}>
                        {item.label}
                      </span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-zinc-500" />
                    </div>
                    <span className="block text-[11px] text-zinc-400 truncate mt-0.5">
                      {item.desc}
                    </span>
                  </div>
                </Link>
              );
            })}
          </nav>
        )}
      </div>
    </header>
  );
};
