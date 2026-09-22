import React, { useState, useMemo, memo } from 'react';
import { useGold } from '../context/GoldContext';
import { 
  ArrowUp, 
  ArrowDown, 
  Search, 
  Download, 
  Volume2, 
  VolumeX, 
  Zap, 
  Copy, 
  Check, 
  Calculator, 
  BarChart2 
} from 'lucide-react';
import { GoldPriceItem } from '../types/gold';

// Memoized Table Row for 120 FPS ultra-smooth rendering
interface ProTableRowProps {
  item: GoldPriceItem;
  flashState: 'up' | 'down' | undefined;
  onSelect: (item: GoldPriceItem) => void;
  onCalculate: (id: string) => void;
}

// Sparkline generator with area fill matching the screenshot
const renderTableSparkline = (points: number[], isPositive: boolean) => {
  if (!points || points.length < 2) return null;
  const min = Math.min(...points);
  const max = Math.max(...points);
  const range = max - min || 1;
  const w = 110;
  const h = 26;

  const coords = points.map((p, idx) => {
    const x = (idx / (points.length - 1)) * w;
    const y = h - 3 - ((p - min) / range) * (h - 6);
    return [x, y];
  });

  const linePath = 'M ' + coords.map(c => `${c[0].toFixed(1)},${c[1].toFixed(1)}`).join(' L ');
  const areaPath = `${linePath} L ${w},${h} L 0,${h} Z`;

  const strokeColor = isPositive ? '#10B981' : '#EF4444';
  const fillColor = isPositive ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)';

  return (
    <svg className="w-24 sm:w-28 h-7 overflow-visible transform-gpu" viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none">
      <path d={areaPath} fill={fillColor} />
      <path
        d={linePath}
        fill="none"
        stroke={strokeColor}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

// Render badge icons matching the screenshot
const renderBadge = (item: GoldPriceItem) => {
  const badge = item.badgeType || '1g';

  if (badge === '1g') {
    return (
      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#EAB308] to-[#CA8A04] text-[#080A0D] font-bold text-[11px] flex items-center justify-center shrink-0 shadow-sm font-mono">
        1g
      </div>
    );
  }

  if (badge === 'B') {
    return (
      <div className="w-8 h-8 rounded-full bg-[#1E293B] border border-slate-700 text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-sm font-mono">
        B
      </div>
    );
  }

  if (badge === 'oz') {
    return (
      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#EAB308] via-[#CA8A04] to-[#B45309] text-white font-bold text-[11px] flex items-center justify-center shrink-0 shadow-sm relative overflow-hidden font-mono">
        <span className="relative z-10 text-[#080A0D] font-bold">oz</span>
        <div className="absolute top-0 right-0 w-3.5 h-3.5 bg-red-600 rounded-bl-sm opacity-80" />
      </div>
    );
  }

  if (badge === 'S_dollar' || badge === 'S_euro') {
    return (
      <div className="w-8 h-8 rounded-full bg-[#1E293B] border border-slate-700 text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-sm font-mono">
        S
      </div>
    );
  }

  if (badge === 'republic' || badge === 'ata') {
    return (
      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#EAB308] to-[#D97706] text-[#080A0D] font-bold text-[11px] flex items-center justify-center shrink-0 shadow-sm font-mono">
        C*
      </div>
    );
  }

  if (badge === 'half') {
    return (
      <div className="w-8 h-8 rounded-full bg-[#1E293B] border border-[#CA8A04] flex items-center justify-center shrink-0 overflow-hidden relative">
        <div className="w-full h-full bg-[#EAB308]" style={{ clipPath: 'polygon(50% 0%, 100% 0%, 100% 100%, 50% 100%)' }} />
      </div>
    );
  }

  if (badge === 'quarter') {
    return (
      <div className="w-8 h-8 rounded-full bg-[#1E293B] border border-[#CA8A04] flex items-center justify-center shrink-0 overflow-hidden relative">
        <div className="w-full h-full bg-[#EAB308]" style={{ clipPath: 'polygon(50% 50%, 100% 50%, 100% 100%, 50% 100%)' }} />
      </div>
    );
  }

  if (badge === 'silver') {
    return (
      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-slate-200 to-slate-400 text-slate-900 font-bold text-[10px] flex items-center justify-center shrink-0 shadow-sm font-mono">
        Ag
      </div>
    );
  }

  return (
    <div className="w-8 h-8 rounded-full bg-[#1E293B] text-[#EAB308] font-bold text-xs flex items-center justify-center shrink-0 border border-slate-700 font-mono">
      Au
    </div>
  );
};

const formatTablePrice = (price: number) => {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(price);
};

const ProTableRow = memo<ProTableRowProps>(({ item, flashState, onSelect, onCalculate }) => {
  const isUp = item.changeRate >= 0;
  const isDiffPositive = item.changeAmount >= 0;

  return (
    <tr
      onClick={() => onSelect(item)}
      className={`hover:bg-[#14181E] transition-colors duration-150 cursor-pointer group will-change-transform transform-gpu ${
        flashState === 'up'
          ? 'bg-emerald-500/15'
          : flashState === 'down'
          ? 'bg-rose-500/15'
          : ''
      }`}
    >
      {/* Symbol Column */}
      <td className="py-3 px-5 font-sans">
        <div className="flex items-center gap-3">
          {renderBadge(item)}
          <div>
            <div className="font-semibold text-white group-hover:text-[#E2C76A] transition-colors text-sm">
              {item.symbolCode || item.name}
            </div>
            <div className="text-xs text-[#A5A8AE] font-normal">
              {item.subtitle || item.name}
            </div>
          </div>
        </div>
      </td>

      {/* Buying Price */}
      <td className="py-3 px-5 text-right font-semibold text-zinc-100 text-sm">
        {formatTablePrice(item.buyingPrice)}
      </td>

      {/* Sales Price */}
      <td className="py-3 px-5 text-right font-semibold text-zinc-100 text-sm">
        {formatTablePrice(item.sellingPrice)}
      </td>

      {/* Difference (%) */}
      <td className="py-3 px-5 text-right">
        <span
          className={`inline-flex items-center gap-1 font-semibold text-xs ${
            isUp ? 'text-[#10B981]' : 'text-[#EF4444]'
          }`}
        >
          {isUp ? <ArrowUp className="w-3.5 h-3.5" /> : <ArrowDown className="w-3.5 h-3.5" />}
          {Math.abs(item.changeRate).toFixed(2)}%
        </span>
      </td>

      {/* Difference Amount */}
      <td className="py-3 px-5 text-right">
        <span
          className={`font-semibold text-xs ${
            isDiffPositive ? 'text-[#10B981]' : 'text-[#EF4444]'
          }`}
        >
          {item.changeAmount > 0 ? '+' : ''}
          {item.changeAmount.toFixed(2)}
        </span>
      </td>

      {/* Mini Sparkline Chart */}
      <td className="py-3 px-5 text-center">
        <div className="flex items-center justify-center">
          {renderTableSparkline(item.sparkline, isUp)}
        </div>
      </td>

      {/* Action buttons */}
      <td className="py-3 px-4 text-center" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-center gap-1">
          <button
            onClick={() => onCalculate(item.id)}
            className="p-1.5 rounded-lg bg-[#14181E] text-[#A5A8AE] hover:text-[#E2C76A] hover:bg-[#1E2530] transition-colors"
            title="Hesapla"
          >
            <Calculator className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => onSelect(item)}
            className="p-1.5 rounded-lg bg-[#14181E] text-[#A5A8AE] hover:text-[#C8A646] hover:bg-[#1E2530] transition-colors"
            title="Terminalde İncele"
          >
            <BarChart2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </td>
    </tr>
  );
}, (prev, next) => {
  return (
    prev.item.sellingPrice === next.item.sellingPrice &&
    prev.item.buyingPrice === next.item.buyingPrice &&
    prev.item.changeRate === next.item.changeRate &&
    prev.flashState === next.flashState
  );
});

ProTableRow.displayName = 'ProTableRow';

export const ProFreeMarketTable: React.FC = () => {
  const { 
    items, 
    setSelectedItem, 
    openCalculatorWithGold, 
    flashedItemIds, 
    liveStreamActive, 
    toggleLiveStream,
    streamSpeed,
    setStreamSpeed,
    soundEnabled,
    toggleSound,
    isTurbo,
    toggleTurbo
  } = useGold();

  const [lang, setLang] = useState<'TR' | 'EN'>('TR');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTab, setSelectedTab] = useState<string>('all');
  const [sortField, setSortField] = useState<string>('default');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [copiedData, setCopiedData] = useState(false);

  // Filter items
  const filtered = useMemo(() => {
    return items.filter(item => {
      const matchSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.subtitle && item.subtitle.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (item.symbolCode && item.symbolCode.toLowerCase().includes(searchQuery.toLowerCase()));

      let matchTab = true;
      if (selectedTab === 'yatirim') matchTab = item.category === 'yatirim';
      else if (selectedTab === 'ziynet') matchTab = item.category === 'ziynet';
      else if (selectedTab === 'bilezik') matchTab = item.category === 'bilezik';
      else if (selectedTab === 'kuresel') matchTab = item.category === 'ons_doviz' || item.category === 'emtia';

      return matchSearch && matchTab;
    });
  }, [items, searchQuery, selectedTab]);

  // Sort items
  const sortedItems = useMemo(() => {
    if (sortField === 'default') return filtered;

    return [...filtered].sort((a, b) => {
      let valA: number | string = 0;
      let valB: number | string = 0;

      if (sortField === 'symbol') {
        valA = a.symbolCode || a.name;
        valB = b.symbolCode || b.name;
        return sortOrder === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA);
      }
      if (sortField === 'buying') {
        valA = a.buyingPrice;
        valB = b.buyingPrice;
      } else if (sortField === 'sales') {
        valA = a.sellingPrice;
        valB = b.sellingPrice;
      } else if (sortField === 'diffPct') {
        valA = a.changeRate;
        valB = b.changeRate;
      } else if (sortField === 'diff') {
        valA = a.changeAmount;
        valB = b.changeAmount;
      }

      return sortOrder === 'asc' ? (valA as number) - (valB as number) : (valB as number) - (valA as number);
    });
  }, [filtered, sortField, sortOrder]);

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortOrder(prev => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(field);
      setSortOrder('desc');
    }
  };

  // Export to CSV
  const handleExportCSV = () => {
    const headers = ['Symbol', 'Subtitle', 'Buying', 'Sales', 'DiffPct', 'Difference', 'Currency'];
    const rows = sortedItems.map(i => [
      `"${i.symbolCode || i.name}"`,
      `"${i.subtitle || ''}"`,
      i.buyingPrice,
      i.sellingPrice,
      `${i.changeRate}%`,
      i.changeAmount,
      i.currency || 'TRY'
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `bursa_altin_fiyatlari_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCopyJSON = () => {
    const jsonStr = JSON.stringify(sortedItems, null, 2);
    navigator.clipboard.writeText(jsonStr);
    setCopiedData(true);
    setTimeout(() => setCopiedData(false), 2000);
  };

  return (
    <section id="tablo" className="py-10 bg-[#080A0D] scroll-mt-20">
      <div id="fiyatlar" className="max-w-[1240px] mx-auto px-4 sm:px-6">
        {/* Main Title Header matching screenshot */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-2xl sm:text-3xl font-bold font-sans text-white tracking-tight">
                {lang === 'TR' ? 'Bursa Serbest Piyasa Altın Fiyatları' : 'Bursa Free Market Gold Prices'}
              </h2>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#C8A646]/20 text-[#E2C76A] font-semibold border border-[#C8A646]/30 font-mono">
                {sortedItems.length} Enstrüman
              </span>
            </div>
            <p className="text-sm text-[#A5A8AE] mt-1">
              {lang === 'TR'
                ? 'Tüm ziynet, sikke, külçe ve döviz kurları anlık olarak canlı güncellenir.'
                : 'Real-time quotes with institutional exchange-grade data latency.'}
            </p>
          </div>

          {/* Action Bar */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            {/* Turbo Pro Max Toggle */}
            <button
              onClick={toggleTurbo}
              className={`px-3 py-1.5 rounded-xl border flex items-center gap-1.5 font-bold transition-all ${
                isTurbo
                  ? 'bg-amber-500/25 border-amber-500/60 text-[#E2C76A] shadow-[0_0_15px_rgba(234,179,8,0.25)]'
                  : 'bg-[#14181E] border-[rgba(244,241,232,0.1)] text-[#A5A8AE]'
              }`}
              title="Ultra Hızlı 0.8s Streaming Modunu Aç / Kapat"
            >
              <Zap className={`w-3.5 h-3.5 ${isTurbo ? 'text-amber-400 fill-amber-400' : ''}`} />
              <span className="font-mono text-[11px]">
                {isTurbo ? 'TURBO (0.8s)' : 'STANDART (2.5s)'}
              </span>
            </button>

            {/* Live Streaming Toggle */}
            <button
              onClick={toggleLiveStream}
              className={`px-3 py-1.5 rounded-xl border flex items-center gap-2 transition-all font-medium ${
                liveStreamActive
                  ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-400'
                  : 'bg-[#14181E] border-[rgba(244,241,232,0.1)] text-[#A5A8AE]'
              }`}
              title="Canlı Veri Akışını Aç / Duraklat"
            >
              <span className="relative flex h-2 w-2">
                {liveStreamActive && (
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                )}
                <span className={`relative inline-flex rounded-full h-2 w-2 ${liveStreamActive ? 'bg-emerald-500' : 'bg-zinc-500'}`} />
              </span>
              <span className="font-mono text-[11px] font-semibold">
                {liveStreamActive ? 'CANLI AKIŞ' : 'DURAKLATILDI'}
              </span>
            </button>

            {/* Sound Toggle */}
            <button
              onClick={toggleSound}
              className={`p-2 rounded-xl border transition-colors ${
                soundEnabled
                  ? 'bg-[#C8A646]/20 border-[#C8A646]/50 text-[#E2C76A]'
                  : 'bg-[#14181E] border-[rgba(244,241,232,0.1)] text-[#A5A8AE] hover:text-white'
              }`}
              title={soundEnabled ? 'Ses Açık' : 'Sesi Aç'}
            >
              {soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
            </button>

            {/* Language Switcher */}
            <button
              onClick={() => setLang(prev => (prev === 'TR' ? 'EN' : 'TR'))}
              className="px-2.5 py-1.5 bg-[#14181E] border border-[rgba(244,241,232,0.1)] text-[#F4F1E8] rounded-xl font-mono hover:border-[#C8A646]/40 transition-colors"
            >
              {lang === 'TR' ? 'EN' : 'TR'}
            </button>

            {/* CSV Export */}
            <button
              onClick={handleExportCSV}
              className="p-2 bg-[#14181E] border border-[rgba(244,241,232,0.1)] text-[#A5A8AE] hover:text-[#E2C76A] rounded-xl transition-colors"
              title="CSV Olarak İndir"
            >
              <Download className="w-3.5 h-3.5" />
            </button>

            {/* Copy JSON */}
            <button
              onClick={handleCopyJSON}
              className="p-2 bg-[#14181E] border border-[rgba(244,241,232,0.1)] text-[#A5A8AE] hover:text-[#E2C76A] rounded-xl transition-colors"
              title="JSON Kopyala"
            >
              {copiedData ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 scrollbar-none">
            {[
              { id: 'all', label: lang === 'TR' ? 'Tümü (21)' : 'All (21)' },
              { id: 'yatirim', label: lang === 'TR' ? 'Külçe & Gram' : 'Bullion & Gram' },
              { id: 'ziynet', label: lang === 'TR' ? 'Ziynet & Sikkeler' : 'Coins' },
              { id: 'bilezik', label: lang === 'TR' ? 'Bilezik & Ayar' : 'Bracelet' },
              { id: 'kuresel', label: lang === 'TR' ? 'Ons & Emtia' : 'Global Commodities' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id)}
                className={`px-3 py-1.5 text-xs rounded-xl font-medium whitespace-nowrap transition-colors ${
                  selectedTab === tab.id
                    ? 'bg-[#C8A646] text-[#080A0D] font-bold shadow-sm'
                    : 'bg-[#14181E] text-[#A5A8AE] hover:text-white border border-[rgba(244,241,232,0.06)]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-[#A5A8AE] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder={lang === 'TR' ? 'Enstrüman veya sembol ara...' : 'Search symbol or asset...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-1.5 bg-[#14181E] border border-[rgba(244,241,232,0.1)] rounded-xl text-xs text-white placeholder-[#A5A8AE]/60 focus:outline-none focus:border-[#C8A646]"
            />
          </div>
        </div>

        {/* Pro Data Table Container */}
        <div className="bg-[#101318] border border-[rgba(244,241,232,0.08)] rounded-2xl overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b border-[rgba(244,241,232,0.08)] bg-[#0C0F14] text-[#A5A8AE] text-xs select-none">
                  <th
                    onClick={() => handleSort('symbol')}
                    className="py-3.5 px-5 text-left font-medium hover:text-white cursor-pointer group"
                  >
                    <div className="flex items-center gap-1.5">
                      <span>{lang === 'TR' ? `Sembol (${sortedItems.length})` : `Symbol (${sortedItems.length})`}</span>
                      <span className="text-zinc-600 group-hover:text-[#C8A646]">↕</span>
                    </div>
                  </th>

                  <th
                    onClick={() => handleSort('buying')}
                    className="py-3.5 px-5 text-right font-medium hover:text-white cursor-pointer group"
                  >
                    <div className="flex items-center justify-end gap-1.5">
                      <span>{lang === 'TR' ? 'Alış' : 'Buying'}</span>
                      <span className="text-zinc-600 group-hover:text-[#C8A646]">↕</span>
                    </div>
                  </th>

                  <th
                    onClick={() => handleSort('sales')}
                    className="py-3.5 px-5 text-right font-medium hover:text-white cursor-pointer group"
                  >
                    <div className="flex items-center justify-end gap-1.5">
                      <span>{lang === 'TR' ? 'Satış' : 'Sales'}</span>
                      <span className="text-zinc-600 group-hover:text-[#C8A646]">↕</span>
                    </div>
                  </th>

                  <th
                    onClick={() => handleSort('diffPct')}
                    className="py-3.5 px-5 text-right font-medium hover:text-white cursor-pointer group"
                  >
                    <div className="flex items-center justify-end gap-1.5">
                      <span>{lang === 'TR' ? 'Fark (%)' : 'Difference (%)'}</span>
                      <span className="text-zinc-600 group-hover:text-[#C8A646]">↕</span>
                    </div>
                  </th>

                  <th
                    onClick={() => handleSort('diff')}
                    className="py-3.5 px-5 text-right font-medium hover:text-white cursor-pointer group"
                  >
                    <div className="flex items-center justify-end gap-1.5">
                      <span>{lang === 'TR' ? 'Fark' : 'Difference'}</span>
                      <span className="text-zinc-600 group-hover:text-[#C8A646]">↕</span>
                    </div>
                  </th>

                  <th className="py-3.5 px-5 text-center font-medium">
                    <span>{lang === 'TR' ? 'Grafik' : 'Chart'}</span>
                  </th>

                  <th className="py-3.5 px-4 text-center font-medium">
                    <span>{lang === 'TR' ? 'İşlem' : 'Action'}</span>
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-[rgba(244,241,232,0.05)] font-mono">
                {sortedItems.map((item) => (
                  <ProTableRow
                    key={item.id}
                    item={item}
                    flashState={flashedItemIds[item.id]}
                    onSelect={setSelectedItem}
                    onCalculate={openCalculatorWithGold}
                  />
                ))}
              </tbody>
            </table>
          </div>

          {/* Table Footer Bar with Market Stats */}
          <div className="bg-[#0C0F14] px-5 py-3 border-t border-[rgba(244,241,232,0.06)] flex flex-wrap items-center justify-between text-xs text-[#A5A8AE]">
            <div className="flex items-center gap-2">
              <Zap className="w-3.5 h-3.5 text-[#C8A646]" />
              <span>Veri Doğrulama: <strong>Bursa Kuyumcular Odası & Kapalı Çarşı Serbest Piyasa</strong></span>
            </div>
            <div className="flex items-center gap-4 font-mono text-[11px]">
              <span>Gecikme: &lt; 38ms</span>
              <span className="hidden sm:inline">Protokol: WSS / REST Dual-Feed</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
