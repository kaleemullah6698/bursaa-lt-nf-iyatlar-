import React, { useState, useMemo } from 'react';
import { useGold } from '../context/GoldContext';
import { formatTL, formatUSD } from '../data/goldData';
import { Link } from './Link';
import { 
  ArrowRight, 
  BarChart2, 
  Calculator, 
  TrendingUp, 
  TrendingDown, 
  ShieldCheck, 
  Sparkles,
  Zap
} from 'lucide-react';
import { GoldPriceItem } from '../types/gold';

interface HeroProps {
  onOpenAlertModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenAlertModal }) => {
  const { 
    items, 
    lastRefreshTime, 
    marketStatus, 
    setSelectedItem, 
    openCalculatorWithGold,
    flashedItemIds
  } = useGold();

  // Top 4 most actively traded physical retail assets in Bursa
  const [activeTab, setActiveTab] = useState<'gram' | 'ceyrek' | 'burma' | 'cumhuriyet'>('gram');

  const gramItem = items.find(i => i.id === 'gram-altin') || items[0];
  const ceyrekItem = items.find(i => i.id === 'ceyrek-altin') || items[7];
  const burmaItem = items.find(i => i.id === '22-ayar-bilezik') || items[1];
  const cumhuriyetItem = items.find(i => i.id === 'cumhuriyet-altin') || items[8];

  const onsItem = items.find(i => i.id === 'ons-altin');
  const usdItem = items.find(i => i.id === 'usd-try');
  const eurItem = items.find(i => i.id === 'eur-try');
  const gumusItem = items.find(i => i.id === 'gumus-tl');

  const activeAsset: GoldPriceItem = useMemo(() => {
    switch (activeTab) {
      case 'ceyrek': return ceyrekItem;
      case 'burma': return burmaItem;
      case 'cumhuriyet': return cumhuriyetItem;
      case 'gram':
      default: return gramItem;
    }
  }, [activeTab, gramItem, ceyrekItem, burmaItem, cumhuriyetItem]);

  const isFlashing = flashedItemIds[activeAsset.id];
  const isUp = activeAsset.changeRate >= 0;
  const spreadAmount = Math.max(0, activeAsset.sellingPrice - activeAsset.buyingPrice);
  const spreadPct = activeAsset.sellingPrice > 0 
    ? ((spreadAmount / activeAsset.sellingPrice) * 100).toFixed(2) 
    : '0.15';

  // Bank typical spread estimated comparison (Banks take ~2.5% to 3.5%)
  const estimatedBankSpread = (activeAsset.sellingPrice * 0.028).toFixed(0);
  const physicalSavings = Math.max(0, Number(estimatedBankSpread) - spreadAmount).toFixed(0);

  const formattedTime = new Intl.DateTimeFormat('tr-TR', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  }).format(lastRefreshTime);

  return (
    <section className="relative pt-8 pb-12 overflow-hidden border-b border-[rgba(244,241,232,0.06)] bg-[#080A0D]">
      {/* Subtle Cinematic Ambient Glow (No visual clutter) */}
      <div className="absolute top-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-[#C8A646]/6 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute -top-10 right-0 w-[400px] h-[400px] bg-emerald-500/4 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Main 2-Column Uncluttered Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          
          {/* Left Column: Authoritative, Breatheable Editorial Typography (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            
            {/* Minimalist Live Status Kicker */}
            <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 mb-4 tracking-wide">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="text-[#E2C76A] font-semibold tracking-wider uppercase">
                Bursa Tarihi Kapalı Çarşı
              </span>
              <span className="text-zinc-600" aria-hidden="true">·</span>
              <span className="text-zinc-400">Canlı Sarraf Kotasyonu</span>
              <span className="text-zinc-600 hidden sm:inline" aria-hidden="true">·</span>
              <span className="text-zinc-500 font-mono hidden sm:inline">{formattedTime}</span>
            </div>

            {/* Masterpiece Display Heading */}
            <h1 className="text-3xl sm:text-5xl lg:text-[54px] font-serif font-bold text-[#F4F1E8] tracking-tight leading-[1.08] mb-5 text-balance">
              Bursa{' '}
              <span className="italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#F6E6B4] via-[#E2C76A] to-[#C8A646]">
                Altın
              </span>{' '}
              Fiyatları
            </h1>

            {/* Editorial Financial Lede */}
            <p className="text-base sm:text-lg text-[#A5A8AE] max-w-2xl leading-relaxed mb-7 font-normal">
              Bursa Kapalı Çarşı sarrafları, Bedesten kuyumcuları ve fiziki serbest piyasa saniyelik alış-satış kurları. Banka makaslarından bağımsız, fiziki teslimatlı şeffaf serbest piyasa terminali.
            </p>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 mb-7">
              <button
                type="button"
                onClick={() => {
                  const el = document.getElementById('tablo');
                  if (el) {
                    el.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="px-6 py-3.5 bg-gradient-to-r from-[#C8A646] to-[#B89438] hover:from-[#E2C76A] hover:to-[#C8A646] text-[#080A0D] text-sm font-bold rounded-xl transition-all shadow-[0_4px_24px_rgba(200,166,70,0.28)] hover:shadow-[0_6px_30px_rgba(200,166,70,0.4)] flex items-center gap-2 group active:scale-[0.98] cursor-pointer"
              >
                <span>Canlı Fiyat Tablosu</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>

              <Link
                to="/grafik"
                className="px-5 py-3.5 bg-[#101318] border border-[rgba(244,241,232,0.12)] text-[#F4F1E8] text-sm font-semibold rounded-xl hover:border-[#C8A646]/50 hover:bg-[#14181E] hover:text-[#E2C76A] transition-all flex items-center gap-2 active:scale-[0.98]"
              >
                <BarChart2 className="w-4 h-4 text-[#C8A646]" />
                <span>Grafik Terminali</span>
              </Link>

              <Link
                to="/hesaplama"
                className="px-4 py-3.5 text-xs text-zinc-400 hover:text-white font-medium flex items-center gap-1.5 transition-colors"
              >
                <Calculator className="w-4 h-4 text-[#C8A646]" />
                <span>Hesapla & Zekat</span>
              </Link>
            </div>

            {/* Zero-Slop Institutional Trust Attribution */}
            <div className="flex items-center gap-3 text-xs text-[#A5A8AE] font-mono">
              <span className="flex items-center gap-1.5 text-zinc-300 font-medium">
                <ShieldCheck className="w-4 h-4 text-[#C8A646]" />
                <span>Bursa Veri Doğrulama:</span>
              </span>
              <span className="text-zinc-400">Bursa Kuyumcular Odası</span>
              <span className="text-zinc-600">·</span>
              <span className="text-zinc-400">Borsa İstanbul</span>
              <span className="text-zinc-600">·</span>
              <span className="text-emerald-400 font-sans font-medium">Sıfır Komisyon</span>
            </div>
          </div>

          {/* Right Column: Clean, Sculptural Bursa Physical Quotation Card (5 cols) */}
          <div className="lg:col-span-5">
            <div className="relative bg-[#0E1117] border border-[rgba(200,166,70,0.25)] rounded-2xl p-6 shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden">
              
              {/* Subtle Top Gold Accent Line */}
              <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#C8A646] to-transparent opacity-90" />

              {/* Segmented Switcher for Top 4 Bursa Physical Trading Items */}
              <div className="grid grid-cols-4 gap-1 p-1 bg-[#07090C] border border-[rgba(244,241,232,0.06)] rounded-xl mb-6">
                {[
                  { id: 'gram', label: 'Gram (24A)' },
                  { id: 'ceyrek', label: 'Çeyrek' },
                  { id: 'burma', label: 'Bursa Burması' },
                  { id: 'cumhuriyet', label: 'Cumhuriyet' }
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`py-2 text-[11px] font-semibold rounded-lg transition-all text-center truncate px-1 cursor-pointer ${
                      activeTab === tab.id
                        ? 'bg-[#C8A646] text-[#080A0D] shadow-sm font-bold'
                        : 'text-[#A5A8AE] hover:text-white hover:bg-[#14181E]'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Active Asset Title & Change Rate */}
              <div className="flex items-start justify-between gap-3 mb-5">
                <div>
                  <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider block">
                    {activeAsset.category || 'Fiziki Çarşı Altını'}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-white mt-0.5">
                    {activeAsset.name}
                  </h3>
                </div>

                <div className={`px-2.5 py-1 rounded-lg border font-mono text-xs font-bold flex items-center gap-1 shrink-0 ${
                  isUp 
                    ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' 
                    : 'bg-rose-500/10 border-rose-500/30 text-rose-400'
                }`}>
                  {isUp ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
                  <span>{isUp ? '+' : ''}{activeAsset.changeRate.toFixed(2)}%</span>
                </div>
              </div>

              {/* High-Contrast Buy / Sell Quotation Display */}
              <div className={`grid grid-cols-2 gap-3 p-4 bg-[#07090C] border rounded-xl mb-5 transition-all duration-300 ${
                isFlashing === 'up'
                  ? 'border-emerald-500/60 bg-emerald-500/5'
                  : isFlashing === 'down'
                  ? 'border-rose-500/60 bg-rose-500/5'
                  : 'border-[rgba(244,241,232,0.08)]'
              }`}>
                {/* Buying (Alış) */}
                <div>
                  <div className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider mb-1 font-medium">
                    Sarrafa Satış (Alış)
                  </div>
                  <div className="text-2xl sm:text-3xl font-bold font-mono text-white tabular-nums tracking-tight">
                    {formatTL(activeAsset.buyingPrice)}
                  </div>
                  <div className="text-[10px] text-zinc-500 mt-1">
                    Bozdururken elinize geçen
                  </div>
                </div>

                {/* Selling (Satış) */}
                <div className="text-right">
                  <div className="text-[11px] font-mono text-[#C8A646] uppercase tracking-wider mb-1 font-semibold">
                    Sarraftan Alış (Satış)
                  </div>
                  <div className="text-2xl sm:text-3xl font-bold font-mono text-[#E2C76A] tabular-nums tracking-tight">
                    {formatTL(activeAsset.sellingPrice)}
                  </div>
                  <div className="text-[10px] text-zinc-500 mt-1">
                    Satın alırken ödenen
                  </div>
                </div>
              </div>

              {/* Bursa Arbitrage & Spread Value Card */}
              <div className="p-3.5 bg-[#12161E] border border-[rgba(244,241,232,0.06)] rounded-xl mb-5 space-y-1.5 font-mono text-xs">
                <div className="flex items-center justify-between text-zinc-300">
                  <span className="text-zinc-400">Kapalı Çarşı Makası:</span>
                  <strong className="text-white">₺{spreadAmount.toFixed(2)} (%{spreadPct})</strong>
                </div>
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-zinc-500">Tahmini Banka Makası:</span>
                  <span className="text-rose-400 line-through">₺{estimatedBankSpread}</span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-emerald-400 font-semibold pt-1 border-t border-zinc-800">
                  <span>Çarşıda Fiziki Tasarrufunuz:</span>
                  <span>~₺{physicalSavings} / adet</span>
                </div>
              </div>

              {/* Action Buttons inside Card */}
              <div className="grid grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={() => openCalculatorWithGold(activeAsset.id)}
                  className="py-2.5 px-3 bg-[#151922] hover:bg-[#1C2230] text-zinc-200 hover:text-[#E2C76A] border border-[rgba(244,241,232,0.1)] rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Calculator className="w-3.5 h-3.5 text-[#C8A646]" />
                  <span>Bu Kurla Hesapla</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedItem(activeAsset)}
                  className="py-2.5 px-3 bg-[#C8A646]/15 hover:bg-[#C8A646]/25 text-[#E2C76A] border border-[#C8A646]/35 rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <BarChart2 className="w-3.5 h-3.5" />
                  <span>Detaylı İncele</span>
                </button>
              </div>

            </div>
          </div>

        </div>

        {/* Sleek FinTech Marquee Ribbon (Zero Clutter) */}
        <div className="mt-10 p-3 sm:p-4 bg-[#0A0D12] border border-[rgba(244,241,232,0.06)] rounded-xl flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
          <div className="flex items-center gap-2 text-zinc-400">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C8A646]" />
            <span className="text-white font-semibold">Küresel Spot & Parite:</span>
          </div>

          <div className="flex flex-wrap items-center gap-6 sm:gap-8">
            {onsItem && (
              <div className="flex items-center gap-2">
                <span className="text-zinc-500">Spot Ons:</span>
                <span className="text-[#E2C76A] font-bold">${onsItem.buyingPrice.toFixed(2)}</span>
                <span className="text-emerald-400 text-[10px]">+{onsItem.changeRate.toFixed(2)}%</span>
              </div>
            )}

            {usdItem && (
              <div className="flex items-center gap-2">
                <span className="text-zinc-500">Dolar/TL:</span>
                <span className="text-white font-bold">₺{usdItem.buyingPrice.toFixed(4)}</span>
              </div>
            )}

            {eurItem && (
              <div className="flex items-center gap-2 hidden sm:flex">
                <span className="text-zinc-500">Euro/TL:</span>
                <span className="text-white font-bold">₺{eurItem.buyingPrice.toFixed(4)}</span>
              </div>
            )}

            {gumusItem && (
              <div className="flex items-center gap-2 hidden md:flex">
                <span className="text-zinc-500">Has Gümüş:</span>
                <span className="text-zinc-200 font-bold">₺{gumusItem.buyingPrice.toFixed(2)}</span>
              </div>
            )}

            <div className="flex items-center gap-2 text-zinc-500 hidden lg:flex">
              <span>Rasyo (XAU/XAG):</span>
              <span className="text-zinc-300 font-semibold">82.4</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
