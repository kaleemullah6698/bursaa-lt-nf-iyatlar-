import React from 'react';
import { useGold } from '../context/GoldContext';
import { Scroll, Award, ShieldCheck, TrendingUp, CheckCircle2 } from 'lucide-react';

export const CityEditorialSection: React.FC = () => {
  const { activeCity } = useGold();

  return (
    <section className="py-12 bg-[#0B0E14] border-t border-[rgba(244,241,232,0.06)]" aria-labelledby="editorialTitle">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-10">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-[#E2C76A] uppercase tracking-wider mb-2">
            <Scroll className="w-3.5 h-3.5 text-[#C8A646]" />
            <span>Piyasa Tarihi & Yerel Dinamikler</span>
          </div>
          <h2 id="editorialTitle" className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
            {activeCity.editorialTitle}
          </h2>
          <p className="text-sm text-[#A5A8AE] mt-2 leading-relaxed">
            {activeCity.editorialSubtitle}
          </p>
        </div>

        {/* 3 Editorial Story Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {activeCity.editorialPoints.map((pt, idx) => (
            <div
              key={idx}
              className="p-6 bg-[#10141C] border border-[rgba(244,241,232,0.08)] rounded-2xl flex flex-col justify-between hover:border-[#C8A646]/35 transition-colors"
            >
              <div>
                <div className="w-9 h-9 rounded-xl bg-[#C8A646]/10 border border-[#C8A646]/25 flex items-center justify-center text-[#E2C76A] font-mono text-sm font-bold mb-4">
                  0{idx + 1}
                </div>
                <h3 className="text-base sm:text-lg font-serif font-bold text-white mb-2">
                  {pt.title}
                </h3>
                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                  {pt.desc}
                </p>
              </div>

              <div className="mt-6 pt-3 border-t border-[rgba(244,241,232,0.06)] flex items-center gap-2 text-[11px] font-mono text-[#E2C76A]">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#C8A646]" />
                <span>{activeCity.name} Serbest Piyasa Standardı</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
