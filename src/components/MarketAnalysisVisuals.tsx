import React from 'react';
import { useGold } from '../context/GoldContext';
import { Scale, ShieldCheck, TrendingUp, Layers, HelpCircle, ArrowRight } from 'lucide-react';

export const MarketAnalysisVisuals: React.FC = () => {
  const { items } = useGold();

  // Find representative items for spread comparison
  const sampleItems = [
    { name: 'Gram Altın (24K)', buy: 3418.40, sell: 3438.90, spreadPct: 0.60, badge: 'En Düşük Makas' },
    { name: '22 Ayar Bilezik', buy: 3120.00, sell: 3260.00, spreadPct: 4.48, badge: 'Düşük İşçilik' },
    { name: 'Çeyrek Altın', buy: 5585.00, sell: 5665.00, spreadPct: 1.43, badge: 'Geleneksel' },
    { name: 'Cumhuriyet Altını', buy: 22850.00, sell: 23200.00, spreadPct: 1.53, badge: 'Birikim' },
    { name: '14 Ayar Altın', buy: 1950.00, sell: 2240.00, spreadPct: 14.87, badge: 'Yüksek İşçilik' },
  ];

  return (
    <section className="py-12 bg-[#0E1217] border-y border-[rgba(244,241,232,0.06)]">
      <div className="max-w-[1180px] mx-auto px-4 sm:px-6">
        {/* Section Head matching user's HTML */}
        <div className="mb-10">
          <span className="text-xs uppercase tracking-[0.16em] text-[#C8A646] font-semibold mb-2 block">
            Piyasa Özeti & Analiz
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif text-[#F4F1E8] font-semibold tracking-tight">
            Bursa Altın Piyasası Dinamikleri
          </h2>
          <p className="text-sm sm:text-base text-[#A5A8AE] mt-2 max-w-2xl">
            Altın fiyatları neden değişir, alış-satış arasında neden fark vardır ve yatırımcılar için en avantajlı altın türü hangisidir?
          </p>
        </div>

        {/* 4 Informational Cards matching user's HTML */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
          <div className="bg-[#14181E] border border-[rgba(244,241,232,0.08)] rounded-2xl p-6 hover:border-[#C8A646]/30 transition-colors">
            <h3 className="text-lg font-serif font-semibold text-[#F4F1E8] mb-2.5 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#C8A646]" />
              Fiyatlar neden sürekli değişiyor?
            </h3>
            <p className="text-sm text-[#A5A8AE] leading-relaxed">
              Altın, küresel piyasalarda ons bazında fiyatlanır ve hafta içi neredeyse kesintisiz işlem görür. Dolar/TL kurundaki hareket ile birlikte gram altın fiyatı gün içinde defalarca değişir. Bu sayfadaki fiyatlar bu iki temel değişkene bağlı olarak dakikalar içinde otomatik olarak güncellenir.
            </p>
          </div>

          <div className="bg-[#14181E] border border-[rgba(244,241,232,0.08)] rounded-2xl p-6 hover:border-[#C8A646]/30 transition-colors">
            <h3 className="text-lg font-serif font-semibold text-[#F4F1E8] mb-2.5 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#3FA97A]" />
              Alış ve satış neden farklı?
            </h3>
            <p className="text-sm text-[#A5A8AE] leading-relaxed">
              Kuyumcular ve döviz büroları, alım ile satım arasında makas (spread) uygular. Bu fark; operasyon maliyetlerini, anlık fiyat dalgalanma riskini ve işlem masraflarını karşılar. Makas daraldığında alım-satım maliyeti düşer ve yatırımcının kâra geçiş süresi kısalır.
            </p>
          </div>

          <div className="bg-[#14181E] border border-[rgba(244,241,232,0.08)] rounded-2xl p-6 hover:border-[#C8A646]/30 transition-colors">
            <h3 className="text-lg font-serif font-semibold text-[#F4F1E8] mb-2.5 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#E2C76A]" />
              Kuyumcu fiyatları neden farklı olabilir?
            </h3>
            <p className="text-sm text-[#A5A8AE] leading-relaxed">
              Her kuyumcu kendi maliyet yapısına ve stok riskine göre fiyat belirler. İşçilik ücreti, ürünün ayarı (22/24 ayar) ve kuyumcunun anlık pozisyonu nihai teklifi etkiler. Bu nedenle internette görülen fiyatlar güvenilir bir referanstır; alım öncesi kuyumcunuzun teyidi önerilir.
            </p>
          </div>

          <div className="bg-[#14181E] border border-[rgba(244,241,232,0.08)] rounded-2xl p-6 hover:border-[#C8A646]/30 transition-colors">
            <h3 className="text-lg font-serif font-semibold text-[#F4F1E8] mb-2.5 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#38BDF8]" />
              Altın, döviz ve piyasa koşulları
            </h3>
            <p className="text-sm text-[#A5A8AE] leading-relaxed">
              Türkiye'de gram altın fiyatı; küresel ons fiyatı ile dolar/lira kurunun çarpımına dayanır. Ons fiyatı küresel talebe, merkez bankası faiz kararlarına ve jeopolitik risklere; kur ise yerel ekonomik dengelere göre hareket eder.
            </p>
          </div>
        </div>

        {/* Visual Charts: Spread Analysis & Karat Guide */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* 1. Visual Spread (Makas) Comparative Chart */}
          <div className="bg-[#14181E] border border-[rgba(244,241,232,0.08)] rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <span className="text-xs uppercase tracking-wider text-[#C8A646] font-semibold block">
                  Karşılaştırmalı Grafik
                </span>
                <h3 className="text-lg font-serif font-semibold text-[#F4F1E8]">
                  Alış-Satış Makas Oranları (Spread)
                </h3>
              </div>
              <Scale className="w-5 h-5 text-[#C8A646]" />
            </div>
            <p className="text-xs text-[#A5A8AE] mb-6">
              Makas yüzdesi ne kadar düşükse, altın o kadar az kayıpla nakde çevrilebilir.
            </p>

            <div className="space-y-4">
              {sampleItems.map((item, idx) => (
                <div key={idx} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium text-[#F4F1E8] flex items-center gap-2">
                      {item.name}
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#101318] text-[#C8A646] border border-[#C8A646]/20">
                        {item.badge}
                      </span>
                    </span>
                    <span className="font-mono text-[#E2C76A] font-semibold">
                      %{item.spreadPct.toFixed(2)}
                    </span>
                  </div>

                  {/* Horizontal Bar Graphic */}
                  <div className="w-full h-3 bg-[#0D1015] rounded-full overflow-hidden flex">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        item.spreadPct < 1
                          ? 'bg-[#3FA97A]'
                          : item.spreadPct < 3
                          ? 'bg-[#C8A646]'
                          : 'bg-[#C9605F]'
                      }`}
                      style={{ width: `${Math.min(100, Math.max(8, item.spreadPct * 6.5))}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-5 pt-4 border-t border-[rgba(244,241,232,0.06)] text-[11px] text-[#A5A8AE] flex items-center justify-between">
              <span>* Yatırım amaçlı alımlarda Gram Altın en dar makasa sahiptir.</span>
            </div>
          </div>

          {/* 2. Visual Karat & Purity Guide Graphic */}
          <div className="bg-[#14181E] border border-[rgba(244,241,232,0.08)] rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <span className="text-xs uppercase tracking-wider text-[#C8A646] font-semibold block">
                  Saflık Rehberi
                </span>
                <h3 className="text-lg font-serif font-semibold text-[#F4F1E8]">
                  Altın Ayarları & Has Oranları
                </h3>
              </div>
              <Layers className="w-5 h-5 text-[#C8A646]" />
            </div>
            <p className="text-xs text-[#A5A8AE] mb-6">
              Ayar derecesi altının içindeki saf altın (milyem) oranını temsil eder.
            </p>

            <div className="grid grid-cols-2 gap-3.5">
              {[
                { karat: '24 Ayar', purity: '0.995 (%99.5 Has)', desc: 'Külçe & Sertifikalı Gram', color: '#E2C76A', pct: 99.5 },
                { karat: '22 Ayar', purity: '0.916 (%91.6 Has)', desc: 'Bilezik, Çeyrek, Ziynet', color: '#C8A646', pct: 91.6 },
                { karat: '18 Ayar', purity: '0.750 (%75.0 Has)', desc: 'Pırlantalı & Özel Mücevher', color: '#9C7E23', pct: 75.0 },
                { karat: '14 Ayar', purity: '0.585 (%58.5 Has)', desc: 'Tasarım Takı & Hediyelik', color: '#78611D', pct: 58.5 },
              ].map((k, i) => (
                <div key={i} className="bg-[#101318] border border-[rgba(244,241,232,0.06)] rounded-xl p-3.5 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-serif font-bold text-sm text-[#F4F1E8]">{k.karat}</span>
                      <span className="font-mono text-xs font-semibold text-[#E2C76A]">%{k.pct}</span>
                    </div>
                    <div className="text-[11px] text-[#C8A646] font-mono">{k.purity}</div>
                    <div className="text-[11px] text-[#A5A8AE] mt-1">{k.desc}</div>
                  </div>
                  {/* Progress bar */}
                  <div className="w-full h-1.5 bg-[#080A0D] rounded-full overflow-hidden mt-3">
                    <div
                      className="h-full rounded-full bg-[#C8A646]"
                      style={{ width: `${k.pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-3.5 border-t border-[rgba(244,241,232,0.06)] text-[11px] text-[#A5A8AE]">
              Bursa Kapalı Çarşı kuyumcularında satılan tüm ziynet ve bileziklerde T.C. Darphane veya TSE ayar damgası aranmalıdır.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
