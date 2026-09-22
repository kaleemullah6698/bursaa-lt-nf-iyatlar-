import React, { useState } from 'react';
import { useGold } from '../context/GoldContext';
import { Bell, Menu, X, BarChart2, Calculator } from 'lucide-react';

interface HeaderProps {
  onOpenAlertModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenAlertModal }) => {
  const { marketStatus, alerts } = useGold();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-[#080A0D]/85 backdrop-blur-md border-b border-[rgba(244,241,232,0.08)]">
      <div className="max-w-[1180px] mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-[64px]">
          {/* Brand Logo with Glowing Gold Dot */}
          <a
            href="#top"
            className="font-serif text-lg sm:text-xl font-semibold tracking-tight text-[#F4F1E8] flex items-center gap-2.5 group"
            aria-label="Bursa Altın Fiyatları ana sayfa"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-[#C8A646] shadow-[0_0_12px_rgba(200,166,70,0.7)] group-hover:scale-125 transition-transform" />
            <span>Bursa Altın Fiyatları</span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-7 text-sm text-[#A5A8AE]" aria-label="Ana gezinme">
            <a
              href="#fiyatlar"
              onClick={(e) => { e.preventDefault(); scrollToSection('fiyatlar'); }}
              className="hover:text-[#E2C76A] transition-colors py-1.5"
            >
              Fiyatlar
            </a>
            <a
              href="#grafik"
              onClick={(e) => { e.preventDefault(); scrollToSection('grafik'); }}
              className="hover:text-[#E2C76A] transition-colors py-1.5 flex items-center gap-1.5"
            >
              <BarChart2 className="w-3.5 h-3.5 text-[#C8A646]" />
              Grafik Terminali
            </a>
            <a
              href="#altin-turleri"
              onClick={(e) => { e.preventDefault(); scrollToSection('altin-turleri'); }}
              className="hover:text-[#E2C76A] transition-colors py-1.5"
            >
              Altın Türleri
            </a>
            <a
              href="#portfoy"
              onClick={(e) => { e.preventDefault(); scrollToSection('portfoy'); }}
              className="hover:text-[#E2C76A] transition-colors py-1.5"
            >
              Portföy
            </a>
            <a
              href="#altin-hesaplama"
              onClick={(e) => { e.preventDefault(); scrollToSection('altin-hesaplama'); }}
              className="hover:text-[#E2C76A] transition-colors py-1.5 flex items-center gap-1.5"
            >
              <Calculator className="w-3.5 h-3.5 text-[#C8A646]" />
              Hesaplama
            </a>
            <a
              href="#bursada-altin"
              onClick={(e) => { e.preventDefault(); scrollToSection('bursada-altin'); }}
              className="hover:text-[#E2C76A] transition-colors py-1.5"
            >
              Bursa'da Altın
            </a>
            <a
              href="#bursa-kuyumculari"
              onClick={(e) => { e.preventDefault(); scrollToSection('bursa-kuyumculari'); }}
              className="hover:text-[#E2C76A] transition-colors py-1.5"
            >
              Kuyumcular
            </a>
            <a
              href="#sss"
              onClick={(e) => { e.preventDefault(); scrollToSection('sss'); }}
              className="hover:text-[#E2C76A] transition-colors py-1.5"
            >
              SSS
            </a>
          </nav>

          {/* Right Status Pill & Actions */}
          <div className="flex items-center gap-3">
            {/* Status Pill matching the user's HTML design */}
            <div
              className="flex items-center gap-2 text-xs text-[#A5A8AE] border border-[rgba(244,241,232,0.1)] rounded-full px-3.5 py-1.5 bg-[#101318]"
              role="status"
              aria-live="polite"
            >
              <span className="w-2 h-2 rounded-full bg-[#3FA97A] shadow-[0_0_8px_rgba(63,169,122,0.6)] animate-pulse" />
              <span className="font-medium text-[#F4F1E8] hidden sm:inline">
                {marketStatus.isOpen ? `Piyasa Açık · ${marketStatus.turkeyTimeStr}` : 'Kapalı · Nöbetçi'}
              </span>
              <span className="sm:hidden font-medium text-[#F4F1E8]">Canlı</span>
            </div>

            {/* Price Alert button */}
            <button
              onClick={onOpenAlertModal}
              className="relative p-2 rounded-full bg-[#101318] border border-[rgba(244,241,232,0.1)] text-[#A5A8AE] hover:text-[#E2C76A] hover:border-[#C8A646]/40 transition-colors"
              title="Fiyat Alarmı Kur"
              aria-label="Fiyat Alarmı Kur"
            >
              <Bell className="w-4 h-4" />
              {alerts.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#C8A646] text-[#080A0D] font-bold text-[10px] rounded-full flex items-center justify-center">
                  {alerts.length}
                </span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg bg-[#101318] border border-[rgba(244,241,232,0.1)] text-[#F4F1E8] hover:text-[#C8A646] transition-colors"
              aria-label="Menüyü aç"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <nav className="md:hidden border-t border-[rgba(244,241,232,0.08)] py-4 px-2 space-y-2 bg-[#101318] rounded-b-xl shadow-xl">
            <a
              href="#fiyatlar"
              onClick={(e) => { e.preventDefault(); scrollToSection('fiyatlar'); }}
              className="block px-3 py-2 rounded-lg text-sm text-[#F4F1E8] hover:bg-[#14181E] hover:text-[#E2C76A]"
            >
              Canlı Fiyatlar
            </a>
            <a
              href="#grafik"
              onClick={(e) => { e.preventDefault(); scrollToSection('grafik'); }}
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-[#F4F1E8] hover:bg-[#14181E] hover:text-[#E2C76A]"
            >
              <BarChart2 className="w-4 h-4 text-[#C8A646]" />
              Mum Grafik Terminali
            </a>
            <a
              href="#altin-turleri"
              onClick={(e) => { e.preventDefault(); scrollToSection('altin-turleri'); }}
              className="block px-3 py-2 rounded-lg text-sm text-[#F4F1E8] hover:bg-[#14181E] hover:text-[#E2C76A]"
            >
              Altın Türleri ve Ayarlar
            </a>
            <a
              href="#altin-hesaplama"
              onClick={(e) => { e.preventDefault(); scrollToSection('altin-hesaplama'); }}
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-[#F4F1E8] hover:bg-[#14181E] hover:text-[#E2C76A]"
            >
              <Calculator className="w-4 h-4 text-[#C8A646]" />
              Altın Çevirici & Hesaplama
            </a>
            <a
              href="#bursada-altin"
              onClick={(e) => { e.preventDefault(); scrollToSection('bursada-altin'); }}
              className="block px-3 py-2 rounded-lg text-sm text-[#F4F1E8] hover:bg-[#14181E] hover:text-[#E2C76A]"
            >
              Bursa'da Altın Piyasası
            </a>
            <a
              href="#sss"
              onClick={(e) => { e.preventDefault(); scrollToSection('sss'); }}
              className="block px-3 py-2 rounded-lg text-sm text-[#F4F1E8] hover:bg-[#14181E] hover:text-[#E2C76A]"
            >
              Sıkça Sorulan Sorular
            </a>
          </nav>
        )}
      </div>
    </header>
  );
};
