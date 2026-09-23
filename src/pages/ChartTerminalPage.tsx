import React from 'react';
import { FinancialTerminalChart } from '../components/FinancialTerminalChart';
import { useGold } from '../context/GoldContext';
import { formatTL } from '../data/goldData';
import { Link } from '../components/Link';
import { 
  BarChart2, 
  TrendingUp, 
  TrendingDown, 
  Layers, 
  Zap, 
  Info,
  Table,
  Briefcase,
  Coins,
  ArrowRight,
  ShieldCheck,
  Compass,
  FileSpreadsheet,
  HelpCircle,
  Activity
} from 'lucide-react';

export const ChartTerminalPage: React.FC = () => {
  const { items, lastRefreshTime, marketStatus } = useGold();

  const gramItem = items.find(i => i.id === 'gram-altin') || items[0];
  const ceyrekItem = items.find(i => i.id === 'ceyrek-altin') || items[7];
  const bilezikItem = items.find(i => i.id === '22-ayar-bilezik') || items[1];
  const onsItem = items.find(i => i.id === 'ons-altin');
  const usdItem = items.find(i => i.id === 'usd-try');

  // Calculate technical pivot points for Gram Gold
  const currentPrice = gramItem.buyingPrice;
  const pivot = currentPrice;
  const r1 = pivot * 1.012;
  const r2 = pivot * 1.025;
  const s1 = pivot * 0.988;
  const s2 = pivot * 0.975;

  // Ons to Gram formula calculation
  const onsVal = onsItem?.buyingPrice || 2745.2;
  const usdVal = usdItem?.buyingPrice || 34.85;
  const calculatedGramTL = (onsVal / 31.1034768) * usdVal;

  return (
    <div className="min-h-screen bg-[#080A0D] py-8 sm:py-12">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        
        {/* Terminal Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-xs font-mono text-[#E2C76A] uppercase tracking-wider mb-2">
            <BarChart2 className="w-4 h-4 text-[#C8A646]" />
            <span>Bursa Kapalı Çarşı Finansal Terminal</span>
            <span className="text-zinc-600">·</span>
            <span className="text-emerald-400">Canlı Tick & Derinlik Akışı</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#F4F1E8] tracking-tight text-balance">
                Teknik Grafik Terminali
              </h1>
              <p className="text-sm sm:text-base text-[#A5A8AE] mt-2 max-w-2xl leading-relaxed">
                Bursa Kapalı Çarşı serbest piyasa ve Darphane altın enstrümanlarının gerçek zamanlı mum grafikleri, hacim osilatörleri, hareketli ortalamalar ve teknik pivot seviyeleri.
              </p>

              {/* Clean Navigation Interlinks */}
              <div className="flex flex-wrap items-center gap-2.5 mt-4 font-mono text-xs">
                <Link 
                  to="/" 
                  className="px-3.5 py-1.5 rounded-xl bg-[#101318] border border-[rgba(244,241,232,0.1)] text-[#A5A8AE] hover:text-[#E2C76A] hover:border-[#C8A646]/40 transition-colors flex items-center gap-1.5"
                >
                  <Table className="w-3.5 h-3.5 text-[#C8A646]" />
                  <span>21 Canlı Fiyat Tablosu</span>
                </Link>
                <Link 
                  to="/portfoy" 
                  className="px-3.5 py-1.5 rounded-xl bg-[#101318] border border-[rgba(244,241,232,0.1)] text-[#A5A8AE] hover:text-[#E2C76A] hover:border-[#C8A646]/40 transition-colors flex items-center gap-1.5"
                >
                  <Briefcase className="w-3.5 h-3.5 text-[#C8A646]" />
                  <span>Portföy İstasyonu</span>
                </Link>
                <Link 
                  to="/altin-turleri" 
                  className="px-3.5 py-1.5 rounded-xl bg-[#101318] border border-[rgba(244,241,232,0.1)] text-[#A5A8AE] hover:text-[#E2C76A] hover:border-[#C8A646]/40 transition-colors flex items-center gap-1.5"
                >
                  <Coins className="w-3.5 h-3.5 text-[#C8A646]" />
                  <span>Altın Özellikleri</span>
                </Link>
              </div>
            </div>

            {/* Quick Market Overview Badge */}
            <div className="p-3.5 bg-[#0E1117] border border-[rgba(244,241,232,0.08)] rounded-xl flex items-center gap-4 text-xs font-mono shrink-0 shadow-sm">
              <div>
                <div className="text-[10px] text-zinc-500 uppercase">Seans Durumu</div>
                <div className="font-bold text-white flex items-center gap-1.5 mt-0.5">
                  <span className={`w-2 h-2 rounded-full ${marketStatus.isOpen ? 'bg-emerald-400' : 'bg-amber-400'} animate-pulse`} />
                  <span>{marketStatus.statusText}</span>
                </div>
              </div>
              <div className="border-l border-[rgba(244,241,232,0.08)] pl-4">
                <div className="text-[10px] text-zinc-500 uppercase">Veri Akışı</div>
                <div className="font-bold text-emerald-400 mt-0.5">0.4ms Borsa İstanbul</div>
              </div>
            </div>
          </div>
        </div>

        {/* Live Top Quick-Quote Tickers */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-3 mb-6 font-mono">
          {gramItem && (
            <div className="p-3.5 bg-[#0E1117] border border-[rgba(244,241,232,0.08)] rounded-xl">
              <div className="text-[11px] text-[#A5A8AE] truncate">{gramItem.name}</div>
              <div className="text-base font-bold text-white tabular-nums mt-0.5">
                {formatTL(gramItem.buyingPrice)}
              </div>
              <div className={`text-[10px] flex items-center gap-1 mt-0.5 ${gramItem.changeRate >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                {gramItem.changeRate >= 0 ? '+' : ''}{gramItem.changeRate.toFixed(2)}%
              </div>
            </div>
          )}

          {ceyrekItem && (
            <div className="p-3.5 bg-[#0E1117] border border-[rgba(244,241,232,0.08)] rounded-xl">
              <div className="text-[11px] text-[#A5A8AE] truncate">{ceyrekItem.name}</div>
              <div className="text-base font-bold text-white tabular-nums mt-0.5">
                {formatTL(ceyrekItem.buyingPrice)}
              </div>
              <div className={`text-[10px] flex items-center gap-1 mt-0.5 ${ceyrekItem.changeRate >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                {ceyrekItem.changeRate >= 0 ? '+' : ''}{ceyrekItem.changeRate.toFixed(2)}%
              </div>
            </div>
          )}

          {bilezikItem && (
            <div className="p-3.5 bg-[#0E1117] border border-[rgba(244,241,232,0.08)] rounded-xl">
              <div className="text-[11px] text-[#A5A8AE] truncate">{bilezikItem.name}</div>
              <div className="text-base font-bold text-white tabular-nums mt-0.5">
                {formatTL(bilezikItem.buyingPrice)}
              </div>
              <div className={`text-[10px] flex items-center gap-1 mt-0.5 ${bilezikItem.changeRate >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                {bilezikItem.changeRate >= 0 ? '+' : ''}{bilezikItem.changeRate.toFixed(2)}%
              </div>
            </div>
          )}

          {onsItem && (
            <div className="p-3.5 bg-[#0E1117] border border-[rgba(244,241,232,0.08)] rounded-xl">
              <div className="text-[11px] text-[#A5A8AE] truncate">Spot Ons (XAU/USD)</div>
              <div className="text-base font-bold text-[#E2C76A] tabular-nums mt-0.5">
                ${onsItem.buyingPrice.toFixed(2)}
              </div>
              <div className="text-[10px] text-emerald-400 mt-0.5">
                +{onsItem.changeRate.toFixed(2)}% Küresel
              </div>
            </div>
          )}

          {usdItem && (
            <div className="p-3.5 bg-[#0E1117] border border-[rgba(244,241,232,0.08)] rounded-xl hidden lg:block">
              <div className="text-[11px] text-[#A5A8AE] truncate">Dolar / TL Serbest</div>
              <div className="text-base font-bold text-zinc-200 tabular-nums mt-0.5">
                ₺{usdItem.buyingPrice.toFixed(4)}
              </div>
              <div className="text-[10px] text-zinc-400 mt-0.5">
                Kapalı Çarşı Kuru
              </div>
            </div>
          )}
        </div>

        {/* Main Terminal Chart */}
        <div className="mb-10">
          <FinancialTerminalChart />
        </div>

        {/* Technical Pivot Levels & Cross Parity Analysis */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-12">
          
          {/* Col 1: Technical Pivot Points Table (7 cols) */}
          <div className="lg:col-span-7 bg-[#0E1117] border border-[rgba(244,241,232,0.08)] rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-[#C8A646]" />
                <h3 className="text-base font-serif font-bold text-white">
                  Gram Altın Günlük Teknik Pivot ve Destek/Direnç Seviyeleri
                </h3>
              </div>
              <span className="text-[10px] font-mono text-[#E2C76A] bg-[#C8A646]/10 px-2 py-0.5 rounded border border-[#C8A646]/20">
                Klasik Pivot Modeli
              </span>
            </div>

            <div className="grid grid-cols-5 gap-2 font-mono text-center mb-4">
              <div className="p-2.5 bg-[#07090C] rounded-xl border border-rose-500/20">
                <div className="text-[10px] text-rose-400">Direnç 2 (R2)</div>
                <div className="text-xs font-bold text-white mt-1">₺{r2.toFixed(0)}</div>
              </div>
              <div className="p-2.5 bg-[#07090C] rounded-xl border border-amber-500/20">
                <div className="text-[10px] text-amber-400">Direnç 1 (R1)</div>
                <div className="text-xs font-bold text-white mt-1">₺{r1.toFixed(0)}</div>
              </div>
              <div className="p-2.5 bg-[#141820] rounded-xl border border-[#C8A646]/40">
                <div className="text-[10px] text-[#E2C76A] font-bold">Pivot Noktası</div>
                <div className="text-xs font-black text-[#E2C76A] mt-1">₺{pivot.toFixed(0)}</div>
              </div>
              <div className="p-2.5 bg-[#07090C] rounded-xl border border-emerald-500/20">
                <div className="text-[10px] text-emerald-400">Destek 1 (S1)</div>
                <div className="text-xs font-bold text-white mt-1">₺{s1.toFixed(0)}</div>
              </div>
              <div className="p-2.5 bg-[#07090C] rounded-xl border border-emerald-500/20">
                <div className="text-[10px] text-emerald-400">Destek 2 (S2)</div>
                <div className="text-xs font-bold text-white mt-1">₺{s2.toFixed(0)}</div>
              </div>
            </div>

            <p className="text-xs text-zinc-400 leading-relaxed">
              *Pivot seviyeleri, önceki seansın en yüksek, en düşük ve kapanış fiyatlarının ağırlıklı ortalamasıyla matematiksel olarak hesaplanır. Fiyat pivotun üzerindeyse alıcılar piyasaya hakimdir.
            </p>
          </div>

          {/* Col 2: Cross Parity Formula Card (5 cols) */}
          <div className="lg:col-span-5 bg-[#0E1117] border border-[rgba(244,241,232,0.08)] rounded-2xl p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <FileSpreadsheet className="w-4 h-4 text-[#C8A646]" />
                <h3 className="text-base font-serif font-bold text-white">
                  Gram Altın Fiyatı Nasıl Hesaplanır?
                </h3>
              </div>
              <p className="text-xs text-zinc-400 mb-4 leading-relaxed">
                Bursa Kapalı Çarşı serbest piyasa gram altın fiyatı, küresel spot ons altın ile serbest piyasa dolar kurunun çarpımının 1 troy ons ağırlığına (31.1035 gram) bölünmesiyle elde edilir.
              </p>

              <div className="p-3.5 bg-[#07090C] rounded-xl border border-zinc-800 font-mono text-xs space-y-1.5">
                <div className="text-[#E2C76A] font-bold text-center pb-2 border-b border-zinc-800">
                  Formül: (Ons Fiyatı × USD/TRY) ÷ 31.1035
                </div>
                <div className="flex justify-between text-zinc-400 pt-1">
                  <span>Spot Ons ($):</span>
                  <strong className="text-white">${onsVal.toFixed(2)}</strong>
                </div>
                <div className="flex justify-between text-zinc-400">
                  <span>Dolar Kuru (₺):</span>
                  <strong className="text-white">₺{usdVal.toFixed(4)}</strong>
                </div>
                <div className="flex justify-between text-emerald-400 font-bold pt-2 border-t border-zinc-800">
                  <span>Teorik Gram Fiyatı:</span>
                  <span>₺{calculatedGramTL.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-zinc-800 text-[11px] text-zinc-500">
              *Kapalı Çarşı fiziki teslimat primi genellikle teorik fiyata +%0.2 ila +%0.5 ekler.
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
