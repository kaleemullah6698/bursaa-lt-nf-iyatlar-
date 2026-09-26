import React from 'react';
import { useGold } from '../context/GoldContext';
import { MapPin, Building2, Train, Store, ShieldCheck, ArrowRight } from 'lucide-react';
import { Link } from './Link';

export const CityHubsDetailSection: React.FC = () => {
  const { activeCity } = useGold();

  return (
    <section className="py-12 bg-[#080A0D] border-t border-[rgba(244,241,232,0.06)]" aria-labelledby="cityHubsTitle">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono text-[#E2C76A] uppercase tracking-wider mb-2">
              <MapPin className="w-3.5 h-3.5 text-[#C8A646]" />
              <span>{activeCity.name} Bölgesel Sarrafiye Merkezleri</span>
            </div>
            <h2 id="cityHubsTitle" className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
              {activeCity.name}'da Altın Nereden Alınır? Çarşı & İlçe Rehberi
            </h2>
            <p className="text-sm text-[#A5A8AE] mt-1.5 max-w-2xl">
              {activeCity.name} genelinde {activeCity.activeJewelersCount}+ yetkili kuyumcu ve toptan sarraf masası bulunmaktadır. En yoğun işlem yapılan ana ticaret merkezleri:
            </p>
          </div>

          <Link
            to="/kuyumcular"
            className="px-4 py-2 bg-[#121620] hover:bg-[#181D2A] text-[#E2C76A] border border-[rgba(200,166,70,0.25)] rounded-xl text-xs font-semibold font-mono flex items-center gap-1.5 transition-colors self-start md:self-end"
          >
            <span>Tüm Sarrafları Gör ({activeCity.activeJewelersCount}+)</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* 4 Key District Hub Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {activeCity.keyHubs.map((hub, idx) => (
            <div
              key={idx}
              className="p-5 bg-[#0D1016] border border-[rgba(244,241,232,0.08)] hover:border-[#C8A646]/40 rounded-2xl transition-all flex flex-col justify-between group shadow-sm hover:shadow-[0_8px_30px_rgba(0,0,0,0.5)]"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#C8A646]/10 text-[#E2C76A] border border-[#C8A646]/20">
                    {hub.type}
                  </span>
                  <span className="text-[11px] font-mono text-zinc-400">
                    {hub.jewelersCount}+ Sarraf
                  </span>
                </div>

                <h3 className="text-base font-serif font-bold text-white group-hover:text-[#E2C76A] transition-colors mb-2">
                  {hub.name}
                </h3>

                <p className="text-xs text-zinc-400 leading-relaxed mb-4">
                  {hub.highlight}
                </p>
              </div>

              <div className="pt-3 border-t border-[rgba(244,241,232,0.06)] flex items-start gap-2 text-[11px] font-mono text-zinc-400">
                <Train className="w-3.5 h-3.5 text-[#C8A646] shrink-0 mt-0.5" />
                <span>{hub.metroInfo}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Local Chamber Assurance Banner */}
        <div className="mt-8 p-4 bg-[#0F131A] border border-[rgba(244,241,232,0.06)] rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-mono">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#C8A646]/15 border border-[#C8A646]/30 flex items-center justify-center text-[#E2C76A] shrink-0">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <span className="text-white font-bold block">{activeCity.chamberName}</span>
              <span className="text-zinc-400 text-[11px]">Resmi mühürlü hassas terazi ve patent damga kontrol standartları uygulanır.</span>
            </div>
          </div>

          <div className="text-zinc-400 shrink-0">
            <span className="text-zinc-500">Seans Saatleri: </span>
            <strong className="text-emerald-400">{activeCity.workingHours}</strong>
          </div>
        </div>

      </div>
    </section>
  );
};
