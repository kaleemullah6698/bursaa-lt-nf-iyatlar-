import React, { lazy, Suspense } from 'react';
import { Hero } from '../components/Hero';
import { CityHubsNavigator } from '../components/CityHubsNavigator';
import { AeoDirectAnswers } from '../components/AeoDirectAnswers';
import { ProFreeMarketTable } from '../components/ProFreeMarketTable';
import { PriceCardsGrid } from '../components/PriceCardsGrid';
import { Link } from '../components/Link';
import { useGold } from '../context/GoldContext';

// Below-the-fold components code-split for minimal initial JS payload
const BankSpreadComparison = lazy(() => import('../components/BankSpreadComparison').then(m => ({ default: m.BankSpreadComparison })));
const CityHubsDetailSection = lazy(() => import('../components/CityHubsDetailSection').then(m => ({ default: m.CityHubsDetailSection })));
const CityHyperlocalGuide = lazy(() => import('../components/CityHyperlocalGuide').then(m => ({ default: m.CityHyperlocalGuide })));
const CityEditorialSection = lazy(() => import('../components/CityEditorialSection').then(m => ({ default: m.CityEditorialSection })));
const CityFaqSection = lazy(() => import('../components/CityFaqSection').then(m => ({ default: m.CityFaqSection })));
import { 
  BarChart2, 
  Coins, 
  Briefcase, 
  Calculator, 
  MapPin, 
  HelpCircle, 
  ArrowRight,
  ShieldCheck,
  Zap
} from 'lucide-react';

interface HomePageProps {
  onOpenAlertModal: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onOpenAlertModal }) => {
  const { activeCity } = useGold();

  return (
    <div className="space-y-0">
      {/* 1. Flagship Institutional Hero & Interactive Trend Terminal */}
      <Hero onOpenAlertModal={onOpenAlertModal} />

      {/* 2. Turkey Physical Markets City Hub Strip (Google SEO Hub Architecture) */}
      <CityHubsNavigator />

      {/* 3. Direct Answers Snippets for AI Overviews & Local Search */}
      <AeoDirectAnswers />

      {/* 4. City Free Market Gold Prices Table (Exact 21 Instruments) */}
      <ProFreeMarketTable />

      {/* 5. 4 Flagship Price Cards Grid (Gram, Çeyrek, Yarım, Tam) */}
      <div className="cv-auto">
        <PriceCardsGrid />
      </div>

      {/* 6. Bank Spread Arbitrage & Savings Matrix */}
      <div className="cv-auto">
        <Suspense fallback={<div className="min-h-[240px]" />}>
          <BankSpreadComparison />
        </Suspense>
      </div>

      {/* 7. City-Specific District Hubs & Regional Sarrafiye Breakdown */}
      <div className="cv-auto">
        <Suspense fallback={<div className="min-h-[240px]" />}>
          <CityHubsDetailSection />
        </Suspense>
      </div>

      {/* 7.5. City Hyperlocal Guide: Routes, Transit, Practical Tips & Arbitrage Savings */}
      <div className="cv-auto">
        <Suspense fallback={<div className="min-h-[240px]" />}>
          <CityHyperlocalGuide />
        </Suspense>
      </div>

      {/* 8. City-Specific Editorial History, Culture & Market Dynamics */}
      <div className="cv-auto">
        <Suspense fallback={<div className="min-h-[240px]" />}>
          <CityEditorialSection />
        </Suspense>
      </div>

      {/* 9. City-Specific SSS / Frequently Asked Questions */}
      <div className="cv-auto">
        <Suspense fallback={<div className="min-h-[240px]" />}>
          <CityFaqSection />
        </Suspense>
      </div>

      {/* 10. Dedicated Portals Hub: Clean semantic Link cards to all standalone modules */}
      <section className="py-12 bg-[#0A0D12] border-t border-[rgba(244,241,232,0.06)] cv-auto">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="inline-flex items-center gap-1.5 text-xs font-mono text-[#C8A646] uppercase tracking-wider mb-2">
              <Zap className="w-3.5 h-3.5" />
              <span>{activeCity.name} & Ulusal Finans Modülleri</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#F4F1E8]">
              Özel Finans & Araştırma İstasyonları
            </h2>
            <p className="text-sm text-[#A5A8AE] mt-2">
              {activeCity.name} serbest piyasasını derinlemesine inceleyin. Her sayfamız bağımsız analitik araçlarla donatılmıştır.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {/* Portal 1: Grafik Terminali */}
            <Link 
              to="/grafik"
              className="group p-5 bg-[#101318] hover:bg-[#14181E] border border-[rgba(244,241,232,0.08)] hover:border-[#C8A646]/50 rounded-2xl transition-all flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#C8A646]/10 border border-[#C8A646]/30 flex items-center justify-center text-[#E2C76A] mb-4 group-hover:scale-110 transition-transform">
                  <BarChart2 className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-serif font-bold text-white group-hover:text-[#E2C76A] transition-colors mb-2">
                  Grafik Terminali
                </h3>
                <p className="text-xs text-[#A5A8AE] leading-relaxed">
                  TradingView hassasiyetinde mum grafikler, EMA & RSI indikatörleri, derinlik analizi ve çoklu zaman dilimleri.
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-[rgba(244,241,232,0.06)] flex items-center justify-between text-xs text-[#E2C76A] font-semibold">
                <span>Terminali Başlat</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            {/* Portal 2: Altın Türleri */}
            <Link 
              to="/altin-turleri"
              className="group p-5 bg-[#101318] hover:bg-[#14181E] border border-[rgba(244,241,232,0.08)] hover:border-[#C8A646]/50 rounded-2xl transition-all flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-4 group-hover:scale-110 transition-transform">
                  <Coins className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-serif font-bold text-white group-hover:text-[#E2C76A] transition-colors mb-2">
                  Altın Türleri Ansiklopedisi
                </h3>
                <p className="text-xs text-[#A5A8AE] leading-relaxed">
                  24 ayar has gramdan Cumhuriyet, Reşat ve 22 ayar bileziğe miligram saflık ve Darphane basım standartları.
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-[rgba(244,241,232,0.06)] flex items-center justify-between text-xs text-[#E2C76A] font-semibold">
                <span>Türleri İncele</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            {/* Portal 3: Portföy */}
            <Link 
              to="/portfoy"
              className="group p-5 bg-[#101318] hover:bg-[#14181E] border border-[rgba(244,241,232,0.08)] hover:border-[#C8A646]/50 rounded-2xl transition-all flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-4 group-hover:scale-110 transition-transform">
                  <Briefcase className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-serif font-bold text-white group-hover:text-[#E2C76A] transition-colors mb-2">
                  Portföy Yönetim İstasyonu
                </h3>
                <p className="text-xs text-[#A5A8AE] leading-relaxed">
                  Fiziki altın yatırımlarınızı kaydedin; anlık net kâr/zararınızı, ortalama maliyetinizi ve varlık dağılımınızı izleyin.
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-[rgba(244,241,232,0.06)] flex items-center justify-between text-xs text-[#E2C76A] font-semibold">
                <span>Portföyümü Yönet</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            {/* Portal 4: Hesaplama & Zekat */}
            <Link 
              to="/hesaplama"
              className="group p-5 bg-[#101318] hover:bg-[#14181E] border border-[rgba(244,241,232,0.08)] hover:border-[#C8A646]/50 rounded-2xl transition-all flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 mb-4 group-hover:scale-110 transition-transform">
                  <Calculator className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-serif font-bold text-white group-hover:text-[#E2C76A] transition-colors mb-2">
                  Hesaplama, Zekat & Düğün
                </h3>
                <p className="text-xs text-[#A5A8AE] leading-relaxed">
                  Canlı fiyatlarla anlık çevirici, 80.18 gram nisap sınırına göre tam zekat ve düğün takı bütçesi planlayıcısı.
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-[rgba(244,241,232,0.06)] flex items-center justify-between text-xs text-[#E2C76A] font-semibold">
                <span>Hesaplamaya Git</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            {/* Portal 5: Şehirde Altın */}
            <Link 
              to="/bursada-altin"
              className="group p-5 bg-[#101318] hover:bg-[#14181E] border border-[rgba(244,241,232,0.08)] hover:border-[#C8A646]/50 rounded-2xl transition-all flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 mb-4 group-hover:scale-110 transition-transform">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-serif font-bold text-white group-hover:text-[#E2C76A] transition-colors mb-2">
                  {activeCity.name}'da Altın & {activeCity.marketName}
                </h3>
                <p className="text-xs text-[#A5A8AE] leading-relaxed">
                  {activeCity.marketName} kültürü, fiziki teslimatlı işlemler ve banka makas farklarının karşılaştırmalı analizi.
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-[rgba(244,241,232,0.06)] flex items-center justify-between text-xs text-[#E2C76A] font-semibold">
                <span>Bağlamı Oku</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            {/* Portal 6: Kuyumcular Rehberi */}
            <Link 
              to="/kuyumcular"
              className="group p-5 bg-[#101318] hover:bg-[#14181E] border border-[rgba(244,241,232,0.08)] hover:border-[#C8A646]/50 rounded-2xl transition-all flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400 mb-4 group-hover:scale-110 transition-transform">
                  <MapPin className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-serif font-bold text-white group-hover:text-[#E2C76A] transition-colors mb-2">
                  {activeCity.name} Kuyumcular Rehberi
                </h3>
                <p className="text-xs text-[#A5A8AE] leading-relaxed">
                  {activeCity.districts.slice(0, 3).join(', ')} sarrafları, çalışma saatleri ve ulaşım rotaları.
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-[rgba(244,241,232,0.06)] flex items-center justify-between text-xs text-[#E2C76A] font-semibold">
                <span>Rehbere Göz At</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            {/* Portal 7: Sıkça Sorulan Sorular (SSS) */}
            <Link 
              to="/sss"
              className="group p-5 bg-[#101318] hover:bg-[#14181E] border border-[rgba(244,241,232,0.08)] hover:border-[#C8A646]/50 rounded-2xl transition-all flex flex-col justify-between md:col-span-2 lg:col-span-3"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400 shrink-0 group-hover:scale-110 transition-transform">
                    <HelpCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-serif font-bold text-white group-hover:text-[#E2C76A] transition-colors mb-1">
                      Sıkça Sorulan Sorular & Veri Metodolojisi
                    </h3>
                    <p className="text-xs text-[#A5A8AE] leading-relaxed max-w-2xl">
                      Eski-yeni tarih farkları, 22 ayar bilezikte işçilik kesintileri, serbest piyasa kotasyon kaynakları ve altın alımında dikkat edilecek noktalar.
                    </p>
                  </div>
                </div>
                <div className="pt-2 sm:pt-0 flex items-center gap-2 text-xs text-[#E2C76A] font-semibold shrink-0">
                  <span>Soruları İncele</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
