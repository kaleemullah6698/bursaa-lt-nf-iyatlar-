import React from 'react';
import { useGold } from '../context/GoldContext';
import { 
  Navigation, 
  MapPin, 
  Clock, 
  Train, 
  Car, 
  ShieldCheck, 
  Calculator, 
  ArrowRight,
  Info,
  CheckCircle2
} from 'lucide-react';
import { Link } from './Link';

export const CityHyperlocalGuide: React.FC = () => {
  const { activeCity } = useGold();

  const routes = activeCity.routes || [];
  const tips = activeCity.practicalTips || [];
  const spreadExamples = activeCity.spreadExamples || [];

  if (routes.length === 0 && tips.length === 0) return null;

  return (
    <section className="py-12 bg-[#090C10] border-t border-[rgba(244,241,232,0.06)]" aria-labelledby="cityGuideTitle">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">

        {/* Section Header */}
        <div className="max-w-3xl mb-10">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-[#E2C76A] uppercase tracking-wider mb-2">
            <Navigation className="w-3.5 h-3.5 text-[#C8A646]" />
            <span>{activeCity.name} Yerel Rehberi & Ulaşım Güzergahları</span>
          </div>
          <h2 id="cityGuideTitle" className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
            {activeCity.marketName}'ne Ulaşım, Çarşı Rotaları & Pratik Sarrafiye İpuçları
          </h2>
          <p className="text-sm text-[#A5A8AE] mt-2 leading-relaxed">
            {activeCity.districts[0]} ve çevresindeki ana sarraflar masasına {activeCity.name}'nın ana merkezlerinden en hızlı ulaşım yolları, transit alternatifleri ve fiziki altın alırken bilmeniz gereken yerel dinamikler.
          </p>
        </div>

        {/* 1. Local Routes & Transit Access Matrix */}
        {routes.length > 0 && (
          <div className="mb-12">
            <div className="flex items-center justify-between gap-4 mb-4">
              <h3 className="text-base sm:text-lg font-serif font-bold text-white flex items-center gap-2">
                <Train className="w-4 h-4 text-[#C8A646]" />
                <span>{activeCity.name} Sarraflar Çarşısı'na Popüler Ulaşım Rotaları</span>
              </h3>
              <span className="text-xs font-mono text-zinc-400">Doğrulanmış Yerel Güzergahlar</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {routes.map((route, idx) => (
                <div 
                  key={idx}
                  className="p-5 bg-[#0D1016] border border-[rgba(244,241,232,0.08)] hover:border-[#C8A646]/35 rounded-2xl flex flex-col justify-between transition-colors shadow-sm"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs font-mono mb-2">
                      <span className="px-2 py-0.5 rounded bg-[#C8A646]/10 text-[#E2C76A] border border-[#C8A646]/20 font-bold">
                        {route.origin.split('(')[0].trim()}
                      </span>
                      <span className="text-emerald-400 font-semibold flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        ~{route.durationMin} dk
                      </span>
                    </div>

                    <h4 className="text-sm font-semibold text-white mb-1.5 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#C8A646] shrink-0" />
                      <span>{route.origin}</span>
                    </h4>

                    <p className="text-xs text-zinc-400 leading-relaxed mb-3">
                      {route.notes}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[rgba(244,241,232,0.06)] flex items-center justify-between text-[11px] font-mono text-[#A5A8AE]">
                    <span className="flex items-center gap-1">
                      <Car className="w-3.5 h-3.5 text-[#C8A646]" />
                      {route.distanceKm} km mesafe
                    </span>
                    <span className="text-zinc-400 font-normal">
                      {route.transitOptions}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 2. Practical Local Buying Tips */}
        {tips.length > 0 && (
          <div className="mb-12">
            <div className="flex items-center justify-between gap-4 mb-4">
              <h3 className="text-base sm:text-lg font-serif font-bold text-white flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#C8A646]" />
                <span>{activeCity.name}'da Altın Alırken Dikkat Edilmesi Gereken 5 Pratik Kural</span>
              </h3>
              <span className="text-xs font-mono text-[#E2C76A]">{activeCity.chamberName.split('(')[1]?.replace(')', '') || 'Yerel Oda'} Rehberi</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {tips.map((tip, idx) => (
                <div 
                  key={idx}
                  className="p-5 bg-[#10141C] border border-[rgba(244,241,232,0.08)] rounded-2xl flex flex-col justify-between"
                >
                  <div>
                    <div className="w-7 h-7 rounded-lg bg-[#C8A646]/10 border border-[#C8A646]/25 flex items-center justify-center text-[#E2C76A] font-mono text-xs font-bold mb-3">
                      0{idx + 1}
                    </div>
                    <h4 className="text-sm font-serif font-bold text-white mb-2">
                      {tip.title}
                    </h4>
                    <p className="text-xs text-zinc-400 leading-relaxed">
                      {tip.summary}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[rgba(244,241,232,0.06)] flex items-center gap-1.5 text-[11px] font-mono text-zinc-400">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#C8A646]" />
                    <span>Doğrulanmış Sarrafiye Kuralı</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 3. City Bazaar vs Bank Spread Savings Calculation Table */}
        {spreadExamples.length > 0 && (
          <div className="bg-[#0E1218] border border-[rgba(244,241,232,0.08)] rounded-2xl p-6 sm:p-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div>
                <div className="inline-flex items-center gap-1.5 text-xs font-mono text-[#E2C76A] uppercase tracking-wider mb-1">
                  <Calculator className="w-3.5 h-3.5 text-[#C8A646]" />
                  <span>{activeCity.name} Serbest Piyasa Fiziki Arbitraj Örnekleri</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-white">
                  {activeCity.marketName}'nden Alınca Ne Kadar Tasarruf Edersiniz?
                </h3>
                <p className="text-xs sm:text-sm text-[#A5A8AE] mt-1">
                  Bankaların kaydi altın alım-satımındaki geniş spread farkı ile {activeCity.name} fiziki sarrafiye fiyatlarının somut karşılaştırması:
                </p>
              </div>

              <Link
                to="/hesaplama"
                className="px-4 py-2.5 rounded-xl bg-[#C8A646] hover:bg-[#E2C76A] text-[#080A0D] font-bold text-xs font-mono flex items-center gap-2 transition-colors self-start md:self-auto shrink-0"
              >
                <span>Kendi Tutarını Hesapla</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono border-collapse" aria-label={`${activeCity.name} Fiziki Altın ve Banka Makas Karşılaştırma Tablosu`}>
                <thead>
                  <tr className="border-b border-[rgba(244,241,232,0.1)] text-[#A5A8AE] bg-[#0A0D12]">
                    <th scope="col" className="py-3 px-4 font-medium">Yatırım Miktarı & Türü</th>
                    <th scope="col" className="py-3 px-4 font-medium text-right">Banka Kaydi Tutar</th>
                    <th scope="col" className="py-3 px-4 font-medium text-right">{activeCity.name} Serbest Çarşı</th>
                    <th scope="col" className="py-3 px-4 font-medium text-right text-emerald-400">Net Cepte Kalan Tasarruf</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[rgba(244,241,232,0.06)]">
                  {spreadExamples.map((ex, idx) => (
                    <tr key={idx} className="hover:bg-[#141820] transition-colors">
                      <td className="py-3 px-4 text-white font-semibold">
                        {ex.goldType}
                      </td>
                      <td className="py-3 px-4 text-right text-zinc-400">
                        ₺{ex.bankTotalTL.toLocaleString('tr-TR')}
                      </td>
                      <td className="py-3 px-4 text-right text-[#E2C76A] font-semibold">
                        ₺{ex.bursaBazaarTotalTL.toLocaleString('tr-TR')}
                      </td>
                      <td className="py-3 px-4 text-right text-emerald-400 font-bold">
                        +₺{ex.savingsTL.toLocaleString('tr-TR')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-4 pt-3 border-t border-[rgba(244,241,232,0.06)] flex flex-wrap items-center justify-between gap-3 text-[11px] font-mono text-zinc-400">
              <div className="flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5 text-[#C8A646]" />
                <span>Hesaplamalar {activeCity.chamberName} referans serbest piyasa alış-satış farklarına göre simüle edilmiştir.</span>
              </div>
              <div className="flex items-center gap-3">
                <Link to="/kuyumcular" className="hover:text-[#E2C76A] transition-colors underline">
                  {activeCity.name} Kuyumcular Listesi
                </Link>
                <span>·</span>
                <Link to="/bursada-altin" className="hover:text-[#E2C76A] transition-colors underline">
                  Tarihi Çarşı Rehberi
                </Link>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
