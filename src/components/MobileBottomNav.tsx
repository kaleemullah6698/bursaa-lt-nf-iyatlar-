import React from 'react';
import { Table, BarChart2, Calculator, Briefcase, Bell } from 'lucide-react';

interface MobileBottomNavProps {
  onOpenAlertModal: () => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({ onOpenAlertModal }) => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0C0F14]/95 backdrop-blur-lg border-t border-[rgba(244,241,232,0.1)] px-2 py-1.5 flex items-center justify-around text-[10px] text-[#A5A8AE] select-none safe-area-bottom shadow-2xl">
      {/* 1. Kurlar */}
      <button
        onClick={() => scrollTo('tablo')}
        className="flex flex-col items-center gap-1 p-1.5 hover:text-[#E2C76A] active:text-[#C8A646] transition-colors"
      >
        <Table className="w-4 h-4 text-[#C8A646]" />
        <span>Kurlar</span>
      </button>

      {/* 2. Grafik */}
      <button
        onClick={() => scrollTo('grafik')}
        className="flex flex-col items-center gap-1 p-1.5 hover:text-[#E2C76A] active:text-[#C8A646] transition-colors"
      >
        <BarChart2 className="w-4 h-4 text-[#C8A646]" />
        <span>Grafik</span>
      </button>

      {/* 3. Hesapla */}
      <button
        onClick={() => scrollTo('altin-hesaplama')}
        className="flex flex-col items-center gap-1 p-1.5 hover:text-[#E2C76A] active:text-[#C8A646] transition-colors"
      >
        <Calculator className="w-4 h-4 text-[#C8A646]" />
        <span>Hesapla</span>
      </button>

      {/* 4. Portföy */}
      <button
        onClick={() => scrollTo('portfoy')}
        className="flex flex-col items-center gap-1 p-1.5 hover:text-[#E2C76A] active:text-[#C8A646] transition-colors"
      >
        <Briefcase className="w-4 h-4 text-[#C8A646]" />
        <span>Portföy</span>
      </button>

      {/* 5. Alarm */}
      <button
        onClick={onOpenAlertModal}
        className="flex flex-col items-center gap-1 p-1.5 hover:text-[#E2C76A] active:text-[#C8A646] transition-colors"
      >
        <Bell className="w-4 h-4 text-[#C8A646]" />
        <span>Alarm</span>
      </button>
    </div>
  );
};
