import React, { useState, useMemo, useRef, useCallback } from 'react';
import { useGold } from '../context/GoldContext';
import { formatTL } from '../data/goldData';
import { Link } from './Link';
import { 
  ArrowRight, 
  BarChart2, 
  Calculator, 
  TrendingUp, 
  TrendingDown, 
  ShieldCheck
} from 'lucide-react';
import { GoldPriceItem } from '../types/gold';

interface HeroProps {
  onOpenAlertModal: () => void;
}

type Timeframe = '1G' | '1H' | '1A' | '1Y';

export const Hero: React.FC<HeroProps> = ({ onOpenAlertModal }) => {
  const { 
    items, 
    lastRefreshTime, 
    setSelectedItem, 
    openCalculatorWithGold,
    flashedItemIds,
    activeCity
  } = useGold();

  // Top 4 most actively traded physical retail assets in the active market
  const [activeTab, setActiveTab] = useState<'gram' | 'ceyrek' | 'burma' | 'cumhuriyet'>('gram');
  const [timeframe, setTimeframe] = useState<Timeframe>('1G');
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  const svgRef = useRef<SVGSVGElement | null>(null);

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

  // Bank spread comparison (~2.8% average bank spread)
  const estimatedBankSpread = (activeAsset.sellingPrice * 0.028).toFixed(0);
  const physicalSavings = Math.max(0, Number(estimatedBankSpread) - spreadAmount).toFixed(0);

  const formattedTime = new Intl.DateTimeFormat('tr-TR', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  }).format(lastRefreshTime);

  // Timeframe-specific chart data points generator based on active asset
  const chartPoints = useMemo(() => {
    const cur = activeAsset.sellingPrice;
    const low = activeAsset.dayLow || cur * 0.995;
    const high = activeAsset.dayHigh || cur * 1.005;

    switch (timeframe) {
      case '1G': // 10 intraday hourly points
        return [
          { label: '09:00', price: low + (high - low) * 0.2 },
          { label: '10:00', price: low + (high - low) * 0.35 },
          { label: '11:00', price: low + (high - low) * 0.15 },
          { label: '12:00', price: low + (high - low) * 0.45 },
          { label: '13:00', price: low + (high - low) * 0.6 },
          { label: '14:00', price: low + (high - low) * 0.5 },
          { label: '15:00', price: low + (high - low) * 0.75 },
          { label: '16:00', price: low + (high - low) * 0.65 },
          { label: '17:00', price: low + (high - low) * 0.88 },
          { label: 'Şimdi', price: cur }
        ];
      case '1H': // 5 days of the week
        return [
          { label: 'Pzt', price: cur * 0.988 },
          { label: 'Sal', price: cur * 0.992 },
          { label: 'Çar', price: cur * 0.985 },
          { label: 'Per', price: cur * 0.997 },
          { label: 'Cum', price: cur }
        ];
      case '1A': // 4 weeks
        return [
          { label: '1. Hft', price: cur * 0.965 },
          { label: '2. Hft', price: cur * 0.978 },
          { label: '3. Hft', price: cur * 0.972 },
          { label: '4. Hft', price: cur * 0.994 },
          { label: 'Güncel', price: cur }
        ];
      case '1Y': // 6 bimonthly points
        return [
          { label: 'Eki', price: cur * 0.74 },
          { label: 'Ara', price: cur * 0.81 },
          { label: 'Şub', price: cur * 0.86 },
          { label: 'Nis', price: cur * 0.91 },
          { label: 'Haz', price: cur * 0.95 },
          { label: 'Güncel', price: cur }
        ];
      default:
        return [];
    }
  }, [activeAsset, timeframe]);

  // Chart SVG Coordinates & Smooth Path calculation
  const width = 420;
  const height = 110;
  const padX = 14;
  const padY = 16;

  const minVal = Math.min(...chartPoints.map(p => p.price));
  const maxVal = Math.max(...chartPoints.map(p => p.price));
  const range = maxVal - minVal || 1;

  const pointsCoords = useMemo(() => {
    return chartPoints.map((pt, i) => {
      const x = padX + (i / (chartPoints.length - 1)) * (width - padX * 2);
      const y = height - padY - ((pt.price - minVal) / range) * (height - padY * 2);
      return { x, y, ...pt };
    });
  }, [chartPoints, minVal, range, width, height]);

  // Smooth Catmull-Rom or Cubic Bezier path
  const { linePath, areaPath } = useMemo(() => {
    if (pointsCoords.length < 2) return { linePath: '', areaPath: '' };

    let d = `M ${pointsCoords[0].x} ${pointsCoords[0].y}`;
    for (let i = 0; i < pointsCoords.length - 1; i++) {
      const p0 = pointsCoords[i === 0 ? 0 : i - 1];
      const p1 = pointsCoords[i];
      const p2 = pointsCoords[i + 1];
      const p3 = pointsCoords[i + 2] || p2;

      const cp1x = p1.x + (p2.x - p0.x) / 6;
      const cp1y = p1.y + (p2.y - p0.y) / 6;
      const cp2x = p2.x - (p3.x - p1.x) / 6;
      const cp2y = p2.y - (p3.y - p1.y) / 6;

      d += ` C ${cp1x.toFixed(1)} ${cp1y.toFixed(1)}, ${cp2x.toFixed(1)} ${cp2y.toFixed(1)}, ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`;
    }

    const lastX = pointsCoords[pointsCoords.length - 1].x;
    const firstX = pointsCoords[0].x;
    const baselineY = height;

    const area = `${d} L ${lastX} ${baselineY} L ${firstX} ${baselineY} Z`;
    return { linePath: d, areaPath: area };
  }, [pointsCoords, height]);

  // Chart Mouse/Touch hover interaction
  const handleMouseMove = useCallback((e: React.MouseEvent<SVGSVGElement>) => {
    if (!svgRef.current || pointsCoords.length === 0) return;
    const rect = svgRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const svgX = (mouseX / rect.width) * width;

    let closestIdx = 0;
    let minDistance = Infinity;

    pointsCoords.forEach((pt, idx) => {
      const dist = Math.abs(pt.x - svgX);
      if (dist < minDistance) {
        minDistance = dist;
        closestIdx = idx;
      }
    });

    setHoverIndex(closestIdx);
  }, [pointsCoords, width]);

  const handleMouseLeave = useCallback(() => {
    setHoverIndex(null);
  }, []);

  const activeHoverPoint = hoverIndex !== null ? pointsCoords[hoverIndex] : null;

  return (
    <section className="relative pt-8 pb-12 overflow-hidden border-b border-[rgba(244,241,232,0.06)] bg-[#080A0D]">
      {/* Subtle Atmospheric Ambient Glow */}
      <div className="absolute top-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[580px] h-[580px] bg-[#C8A646]/7 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute -top-10 right-0 w-[420px] h-[420px] bg-emerald-500/4 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Main 2-Column Uncluttered Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          
          {/* Left Column: Authoritative Editorial Typography & Essential CTAs (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            
            {/* Minimalist Live Status Kicker */}
            <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 mb-4 tracking-wide flex-wrap">
              <span className="flex h-2 w-2 relative shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="text-[#E2C76A] font-semibold tracking-wider uppercase">
                {activeCity.name} {activeCity.marketName}
              </span>
              <span className="text-zinc-600" aria-hidden="true">·</span>
              <span className="text-zinc-300">Canlı Sarraf Kotasyonu</span>
              <span className="text-zinc-600 hidden sm:inline" aria-hidden="true">·</span>
              <span className="text-zinc-400 font-mono hidden sm:inline">{formattedTime}</span>
            </div>

            {/* Masterpiece Display Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-serif font-bold text-[#F4F1E8] tracking-tight leading-[1.08] mb-5 text-balance">
              {activeCity.name}{' '}
              <span className="italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#F6E6B4] via-[#E2C76A] to-[#C8A646]">
                Altın
              </span>{' '}
              Fiyatları
            </h1>

            {/* Editorial Financial Lede (Focused & High Impact) */}
            <p className="text-base sm:text-lg text-[#A5A8AE] max-w-xl leading-relaxed mb-7 font-normal text-balance">
              {activeCity.description}
            </p>

            {/* Essential Action CTAs */}
            <div className="flex flex-wrap items-center gap-3.5 mb-7">
              <button
                type="button"
                aria-label="Canlı Fiyat Tablosuna Git"
                onClick={() => {
                  const el = document.getElementById('tablo');
                  if (el) {
                    el.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="px-6 py-3.5 bg-gradient-to-r from-[#C8A646] to-[#B89438] hover:from-[#E2C76A] hover:to-[#C8A646] text-[#080A0D] text-sm font-bold rounded-xl transition-all shadow-[0_4px_24px_rgba(200,166,70,0.28)] hover:shadow-[0_6px_30px_rgba(200,166,70,0.4)] flex items-center gap-2 group active:scale-[0.98] cursor-pointer"
              >
                <span>Canlı Fiyat Tablosu</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
              </button>

              <Link
                to="/grafik"
                aria-label="Teknik Grafik Terminaline Git"
                className="px-5 py-3.5 bg-[#101318] border border-[rgba(244,241,232,0.12)] text-[#F4F1E8] text-sm font-semibold rounded-xl hover:border-[#C8A646]/50 hover:bg-[#14181E] hover:text-[#E2C76A] transition-all flex items-center gap-2 active:scale-[0.98]"
              >
                <BarChart2 className="w-4 h-4 text-[#C8A646]" aria-hidden="true" />
                <span>Teknik Grafik Terminali</span>
              </Link>
            </div>

            {/* Clean Institutional Proof Marker */}
            <div className="flex items-center gap-2.5 text-xs text-zinc-400 font-mono">
              <ShieldCheck className="w-4 h-4 text-[#C8A646] shrink-0" aria-hidden="true" />
              <span>{activeCity.name} Sarraflar Odası & Borsa İstanbul verileriyle anlık eşleşir</span>
            </div>
          </div>

          {/* Right Column: $100M FinTech Quotation Terminal Card with Interactive Graph (5 cols) */}
          <div className="lg:col-span-5">
            <div className="relative bg-[#0D1017]/95 border border-[rgba(200,166,70,0.22)] rounded-2xl p-5 sm:p-6 shadow-[0_24px_60px_-15px_rgba(0,0,0,0.7)] backdrop-blur-xl overflow-hidden">
              
              {/* Subtle Top Gold Ambient Hairline */}
              <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#C8A646] to-transparent opacity-90" />

              {/* Segmented Switcher for Top 4 Physical Trading Items */}
              <div className="grid grid-cols-4 gap-1 p-1 bg-[#06080B] border border-[rgba(244,241,232,0.06)] rounded-xl mb-5">
                {[
                  { id: 'gram', label: 'Gram (24A)' },
                  { id: 'ceyrek', label: 'Çeyrek' },
                  { 
                    id: 'burma', 
                    label: activeCity.id === 'bursa' 
                      ? 'Bursa Burması' 
                      : activeCity.id === 'izmir' 
                      ? 'İzmir Burması' 
                      : activeCity.id === 'ankara' 
                      ? 'Ata / 22A' 
                      : '22A Bilezik' 
                  },
                  { id: 'cumhuriyet', label: 'Cumhuriyet' }
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setActiveTab(tab.id as any);
                      setHoverIndex(null);
                    }}
                    aria-label={`${tab.label} grafiği ve fiyatlarını göster`}
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

              {/* Active Asset Header & Real-Time Change Pill */}
              <div className="flex items-start justify-between gap-3 mb-4">
                <div>
                  <span className="text-[11px] font-mono text-zinc-300 uppercase tracking-wider block">
                    {activeAsset.category === 'bilezik' ? '22 Ayar İşçiliksiz Takı' : 'Fiziki Çarşı Altını'}
                  </span>
                  <h2 className="text-xl sm:text-2xl font-serif font-bold text-white mt-0.5">
                    {activeAsset.name}
                  </h2>
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
              <div className={`grid grid-cols-2 gap-3 p-3.5 sm:p-4 bg-[#06080B] border rounded-xl mb-4 transition-all duration-300 ${
                isFlashing === 'up'
                  ? 'border-emerald-500/60 bg-emerald-500/5'
                  : isFlashing === 'down'
                  ? 'border-rose-500/60 bg-rose-500/5'
                  : 'border-[rgba(244,241,232,0.08)]'
              }`}>
                {/* Buying (Alış) */}
                <div>
                  <div className="text-[11px] font-mono text-zinc-300 uppercase tracking-wider mb-1 font-medium">
                    Sarrafa Satış (Alış)
                  </div>
                  <div className="text-2xl sm:text-[26px] font-bold font-mono text-white tabular-nums tracking-tight">
                    {formatTL(activeAsset.buyingPrice)}
                  </div>
                  <div className="text-[11px] text-zinc-400 mt-1">
                    Bozdururken elinize geçen
                  </div>
                </div>

                {/* Selling (Satış) */}
                <div className="text-right">
                  <div className="text-[11px] font-mono text-[#E2C76A] uppercase tracking-wider mb-1 font-semibold">
                    Sarraftan Alış (Satış)
                  </div>
                  <div className="text-2xl sm:text-[26px] font-bold font-mono text-[#E2C76A] tabular-nums tracking-tight">
                    {formatTL(activeAsset.sellingPrice)}
                  </div>
                  <div className="text-[11px] text-zinc-400 mt-1">
                    Satın alırken ödenen
                  </div>
                </div>
              </div>

              {/* Interactive Graph Section (Added per user request!) */}
              <div className="p-3.5 bg-[#07090D] border border-[rgba(244,241,232,0.07)] rounded-xl mb-4">
                
                {/* Chart Header & Timeframe Filter */}
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-1.5 text-[11px] font-mono">
                    <span className="text-zinc-400">Trend Grafiği:</span>
                    {activeHoverPoint ? (
                      <span className="text-[#E2C76A] font-bold">
                        {formatTL(activeHoverPoint.price)} <span className="text-zinc-500 font-normal">({activeHoverPoint.label})</span>
                      </span>
                    ) : (
                      <span className="text-emerald-400 font-medium">
                        Canlı Akış
                      </span>
                    )}
                  </div>

                  {/* Timeframe Selector (1G, 1H, 1A, 1Y) */}
                  <div className="flex items-center gap-1 bg-[#10141C] p-0.5 rounded-lg border border-zinc-800" role="group" aria-label="Grafik Zaman Dilimi Seçici">
                    {(['1G', '1H', '1A', '1Y'] as Timeframe[]).map((tf) => (
                      <button
                        key={tf}
                        onClick={() => {
                          setTimeframe(tf);
                          setHoverIndex(null);
                        }}
                        aria-label={`${tf} zaman dilimi trend grafiğini yükle`}
                        className={`px-2 py-0.5 text-[10px] font-mono font-semibold rounded transition-colors cursor-pointer ${
                          timeframe === tf
                            ? 'bg-[#C8A646] text-[#080A0D]'
                            : 'text-zinc-400 hover:text-white'
                        }`}
                      >
                        {tf}
                      </button>
                    ))}
                  </div>
                </div>

                {/* SVG Area Chart */}
                <div className="relative h-[95px] w-full">
                  <svg
                    ref={svgRef}
                    viewBox={`0 0 ${width} ${height}`}
                    className="w-full h-full overflow-visible cursor-crosshair select-none"
                    preserveAspectRatio="none"
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                  >
                    <defs>
                      <linearGradient id="heroGoldGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#C8A646" stopOpacity="0.32" />
                        <stop offset="85%" stopColor="#C8A646" stopOpacity="0.02" />
                        <stop offset="100%" stopColor="#C8A646" stopOpacity="0" />
                      </linearGradient>
                      <filter id="goldGlow" x="-20%" y="-20%" width="140%" height="140%">
                        <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#C8A646" floodOpacity="0.4" />
                      </filter>
                    </defs>

                    {/* Horizontal Subtle Reference Grid Lines */}
                    <line x1={padX} y1={padY} x2={width - padX} y2={padY} stroke="rgba(255,255,255,0.05)" strokeDasharray="3 3" />
                    <line x1={padX} y1={height / 2} x2={width - padX} y2={height / 2} stroke="rgba(255,255,255,0.05)" strokeDasharray="3 3" />
                    <line x1={padX} y1={height - padY} x2={width - padX} y2={height - padY} stroke="rgba(255,255,255,0.05)" strokeDasharray="3 3" />

                    {/* Gradient Fill Area */}
                    {areaPath && (
                      <path d={areaPath} fill="url(#heroGoldGradient)" />
                    )}

                    {/* Glowing Trend Line */}
                    {linePath && (
                      <path
                        d={linePath}
                        fill="none"
                        stroke="#E2C76A"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        filter="url(#goldGlow)"
                      />
                    )}

                    {/* Pulsing Latest Real-time Dot */}
                    {pointsCoords.length > 0 && hoverIndex === null && (
                      <g>
                        <circle
                          cx={pointsCoords[pointsCoords.length - 1].x}
                          cy={pointsCoords[pointsCoords.length - 1].y}
                          r="5"
                          className="fill-emerald-400 opacity-40 animate-ping"
                        />
                        <circle
                          cx={pointsCoords[pointsCoords.length - 1].x}
                          cy={pointsCoords[pointsCoords.length - 1].y}
                          r="3"
                          className="fill-emerald-400 stroke-[#080A0D] stroke-2"
                        />
                      </g>
                    )}

                    {/* Interactive Crosshair & Tooltip Indicator */}
                    {activeHoverPoint && (
                      <g>
                        <line
                          x1={activeHoverPoint.x}
                          y1={0}
                          x2={activeHoverPoint.x}
                          y2={height}
                          stroke="#C8A646"
                          strokeWidth="1"
                          strokeDasharray="2 2"
                          opacity="0.8"
                        />
                        <circle
                          cx={activeHoverPoint.x}
                          cy={activeHoverPoint.y}
                          r="4.5"
                          fill="#C8A646"
                          stroke="#FFFFFF"
                          strokeWidth="1.5"
                        />
                      </g>
                    )}
                  </svg>
                </div>

                {/* Min / Max Edge Annotations */}
                <div className="flex items-center justify-between text-[10px] font-mono text-zinc-500 pt-1 border-t border-zinc-800/60 mt-1">
                  <span>En Düşük: <strong className="text-zinc-300">₺{minVal.toFixed(0)}</strong></span>
                  <span>En Yüksek: <strong className="text-zinc-300">₺{maxVal.toFixed(0)}</strong></span>
                </div>
              </div>

              {/* City Arbitrage & Spread Value Card */}
              <div className="p-3 bg-[#11151D] border border-[rgba(244,241,232,0.06)] rounded-xl mb-4 space-y-1 font-mono text-xs">
                <div className="flex items-center justify-between text-zinc-300">
                  <span className="text-zinc-400">{activeCity.name} Çarşı Makası:</span>
                  <strong className="text-white">₺{spreadAmount.toFixed(2)} (%{spreadPct})</strong>
                </div>
                <div className="flex items-center justify-between text-[11px] text-emerald-400 font-semibold pt-1 border-t border-zinc-800/80">
                  <span>Banka Tasarrufunuz:</span>
                  <span>~₺{physicalSavings} / adet avantaj</span>
                </div>
              </div>

              {/* Action Buttons inside Card */}
              <div className="grid grid-cols-2 gap-2.5">
                <button
                  type="button"
                  aria-label={`${activeAsset.name} güncel satış kuruyla hesaplama yap`}
                  onClick={() => openCalculatorWithGold(activeAsset.id)}
                  className="py-2.5 px-3 bg-[#151922] hover:bg-[#1C2230] text-zinc-200 hover:text-[#E2C76A] border border-[rgba(244,241,232,0.1)] rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Calculator className="w-3.5 h-3.5 text-[#C8A646]" aria-hidden="true" />
                  <span>Bu Kurla Hesapla</span>
                </button>

                <button
                  type="button"
                  aria-label={`${activeAsset.name} için detaylı teknik grafiği aç`}
                  onClick={() => setSelectedItem(activeAsset)}
                  className="py-2.5 px-3 bg-[#C8A646]/15 hover:bg-[#C8A646]/25 text-[#E2C76A] border border-[#C8A646]/35 rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <BarChart2 className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Detaylı İncele</span>
                </button>
              </div>

            </div>
          </div>

        </div>

        {/* Sleek Global Currency & Parity Ribbon (Zero Clutter) */}
        <div className="mt-9 p-3 sm:p-4 bg-[#0A0D12] border border-[rgba(244,241,232,0.06)] rounded-xl flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
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
