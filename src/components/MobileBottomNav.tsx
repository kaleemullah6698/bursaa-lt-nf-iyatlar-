import React from 'react';
import { Table, BarChart2, Calculator, Briefcase, Bell } from 'lucide-react';
import { Link } from './Link';
import { PageRoute } from '../utils/router';

interface MobileBottomNavProps {
  activePage?: PageRoute;
  onOpenAlertModal: () => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({ 
  activePage = 'fiyatlar', 
  onOpenAlertModal 
}) => {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0C0F14]/95 backdrop-blur-lg border-t border-[rgba(244,241,232,0.1)] px-2 py-1.5 flex items-center justify-around text-[10px] select-none safe-area-bottom shadow-2xl">
      {/* 1. Kurlar (Home) */}
      <Link
        to="/"
        className={`flex flex-col items-center gap-1 p-1.5 transition-colors ${
          activePage === 'fiyatlar' ? 'text-[#E2C76A] font-bold' : 'text-[#A5A8AE] hover:text-white'
        }`}
      >
        <Table className={`w-4 h-4 ${activePage === 'fiyatlar' ? 'text-[#E2C76A]' : 'text-[#C8A646]'}`} />
        <span>Kurlar</span>
      </Link>

      {/* 2. Grafik */}
      <Link
        to="/grafik"
        className={`flex flex-col items-center gap-1 p-1.5 transition-colors ${
          activePage === 'grafik' ? 'text-[#E2C76A] font-bold' : 'text-[#A5A8AE] hover:text-white'
        }`}
      >
        <BarChart2 className={`w-4 h-4 ${activePage === 'grafik' ? 'text-[#E2C76A]' : 'text-[#C8A646]'}`} />
        <span>Grafik</span>
      </Link>

      {/* 3. Hesapla */}
      <Link
        to="/hesaplama"
        className={`flex flex-col items-center gap-1 p-1.5 transition-colors ${
          activePage === 'hesaplama' ? 'text-[#E2C76A] font-bold' : 'text-[#A5A8AE] hover:text-white'
        }`}
      >
        <Calculator className={`w-4 h-4 ${activePage === 'hesaplama' ? 'text-[#E2C76A]' : 'text-[#C8A646]'}`} />
        <span>Hesapla</span>
      </Link>

      {/* 4. Portföy */}
      <Link
        to="/portfoy"
        className={`flex flex-col items-center gap-1 p-1.5 transition-colors ${
          activePage === 'portfoy' ? 'text-[#E2C76A] font-bold' : 'text-[#A5A8AE] hover:text-white'
        }`}
      >
        <Briefcase className={`w-4 h-4 ${activePage === 'portfoy' ? 'text-[#E2C76A]' : 'text-[#C8A646]'}`} />
        <span>Portföy</span>
      </Link>

      {/* 5. Alarm */}
      <button
        onClick={onOpenAlertModal}
        className="flex flex-col items-center gap-1 p-1.5 text-[#A5A8AE] hover:text-[#E2C76A] transition-colors"
      >
        <Bell className="w-4 h-4 text-[#C8A646]" />
        <span>Alarm</span>
      </button>
    </div>
  );
};
