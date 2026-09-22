import React from 'react';
import { useGold } from '../context/GoldContext';
import { formatTL } from '../data/goldData';
import { Sparkles, Clock, MapPin, CheckCircle2, HelpCircle } from 'lucide-react';

export const AeoDirectAnswers: React.FC = () => {
  const { items, marketStatus } = useGold();

  const gramItem = items.find(i => i.id === 'gram-altin') || items[0];
  const ceyrekItem = items.find(i => i.id === 'ceyrek-altin') || items[7];
  const bilezikItem = items.find(i => i.id === '22-ayar-bilezik') || items[1];
  const cumhuriyetItem = items.find(i => i.id === 'cumhuriyet-altini') || items[5];

  return (
    <section className="py-8 bg-[#0C0F14] border-y border-[rgba(244,241,232,0.06)]" aria-label="Hızlı Cevaplar ve Piyasa Özeti">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6">
        {/* AEO Header Pill */}
        <div className="flex items-center gap-2 mb-4">
          <div className="p-1 rounded-md bg-[#C8A646]/20 text-[#E2C76A]">
            <Sparkles className="w-3.5 h-3.5" />
          </div>
          <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[#C8A646]">
            AEO / Doğrudan Bilgi Özeti (AI & Arama Motoru Özeti)
          </span>
        </div>

        {/* 3 Quick Direct Answer Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Answer 1: Gram Altın Bugün Ne Kadar? */}
          <div className="bg-[#14181E] border border-[rgba(244,241,232,0.08)] rounded-2xl p-4 sm:p-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs text-[#A5A8AE] font-medium mb-1.5">
                <HelpCircle className="w-3.5 h-3.5 text-[#C8A646]" />
                <span>Bursa'da gram altın bugün ne kadar?</span>
              </div>
              <p className="text-sm text-[#F4F1E8] font-normal leading-relaxed">
                Bursa Kapalı Çarşı serbest piyasasında 24 ayar saf gram altın satış fiyatı{' '}
                <strong className="text-[#E2C76A] font-mono font-bold text-base">
                  {formatTL(gramItem.sellingPrice)}
                </strong>
                , alış fiyatı ise{' '}
                <span className="font-mono text-white font-semibold">
                  {formatTL(gramItem.buyingPrice)}
                </span>
                'dir.
              </p>
            </div>
            <div className="mt-3 pt-2.5 border-t border-[rgba(244,241,232,0.06)] text-[11px] text-[#A5A8AE] flex items-center justify-between">
              <span>Makas: ₺{(gramItem.sellingPrice - gramItem.buyingPrice).toFixed(2)}</span>
              <span className="font-mono text-emerald-400">%{gramItem.changeRate.toFixed(2)}</span>
            </div>
          </div>

          {/* Answer 2: Çeyrek & Bilezik Fiyatları */}
          <div className="bg-[#14181E] border border-[rgba(244,241,232,0.08)] rounded-2xl p-4 sm:p-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs text-[#A5A8AE] font-medium mb-1.5">
                <HelpCircle className="w-3.5 h-3.5 text-[#C8A646]" />
                <span>Çeyrek altın ve 22 ayar bilezik kaç TL?</span>
              </div>
              <p className="text-sm text-[#F4F1E8] font-normal leading-relaxed">
                Çeyrek altın satış:{' '}
                <strong className="text-[#E2C76A] font-mono font-bold">
                  {formatTL(ceyrekItem.sellingPrice)}
                </strong>
                . 22 ayar işçiliksiz tel bilezik gram satış:{' '}
                <strong className="text-white font-mono font-bold">
                  {formatTL(bilezikItem.sellingPrice)}
                </strong>
                .
              </p>
            </div>
            <div className="mt-3 pt-2.5 border-t border-[rgba(244,241,232,0.06)] text-[11px] text-[#A5A8AE] flex items-center justify-between">
              <span>Cumhuriyet: {formatTL(cumhuriyetItem.sellingPrice)}</span>
              <span className="text-emerald-400">22 Ayar (%91.6 Saf)</span>
            </div>
          </div>

          {/* Answer 3: Kapalı Çarşı Çalışma Saatleri */}
          <div className="bg-[#14181E] border border-[rgba(244,241,232,0.08)] rounded-2xl p-4 sm:p-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs text-[#A5A8AE] font-medium mb-1.5">
                <Clock className="w-3.5 h-3.5 text-[#C8A646]" />
                <span>Bursa Kapalı Çarşı çalışma saatleri nedir?</span>
              </div>
              <p className="text-sm text-[#F4F1E8] font-normal leading-relaxed">
                Hafta içi{' '}
                <strong className="text-white">09:00 - 18:30</strong> arası tüm sarraflar açıktır. Cumartesi{' '}
                <span className="text-[#E2C76A]">09:00 - 15:30</span>, pazar günleri nöbetçi kuyumcular hizmet verir.
              </p>
            </div>
            <div className="mt-3 pt-2.5 border-t border-[rgba(244,241,232,0.06)] text-[11px] text-[#A5A8AE] flex items-center gap-1.5">
              <span className={`w-2 h-2 rounded-full ${marketStatus.isOpen ? 'bg-emerald-500' : 'bg-amber-500'}`} />
              <span className="font-medium text-white">{marketStatus.statusText}</span>
              <span className="font-mono text-zinc-400">({marketStatus.turkeyTimeStr})</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
