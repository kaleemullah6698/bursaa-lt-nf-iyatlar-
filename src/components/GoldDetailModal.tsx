import React, { useState } from 'react';
import { useGold } from '../context/GoldContext';
import { formatTL, formatNumber, formatUSD } from '../data/goldData';
import { 
  X, 
  ArrowUpRight, 
  ArrowDownRight, 
  Calculator, 
  CheckCircle2, 
  ShieldCheck, 
  TrendingUp, 
  Clock, 
  Info,
  Building,
  Share2,
  Copy,
  Check
} from 'lucide-react';

export const GoldDetailModal: React.FC = () => {
  const { selectedItem, setSelectedItem, openCalculatorWithGold } = useGold();
  const [copied, setCopied] = useState(false);
  const [calcQuantity, setCalcQuantity] = useState(1);

  if (!selectedItem) return null;

  const isPositive = selectedItem.changeRate >= 0;
  const spread = Math.round((selectedItem.sellingPrice - selectedItem.buyingPrice) * 100) / 100;
  const isOnsOrUSD = selectedItem.id === 'ons-altin' || selectedItem.id === 'usd-try';

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Sparkline coordinates
  const minPrice = Math.min(...selectedItem.sparkline);
  const maxPrice = Math.max(...selectedItem.sparkline);
  const range = maxPrice - minPrice || 1;
  const points = selectedItem.sparkline.map((val, idx) => {
    const x = (idx / (selectedItem.sparkline.length - 1)) * 100;
    const y = 80 - ((val - minPrice) / range) * 60;
    return `${x},${y}`;
  }).join(' ');

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-4xl bg-[#0C0F14] border border-[#C9A227]/30 rounded-sm shadow-2xl overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top gold bar accent */}
        <div className="h-1 bg-gradient-to-r from-[#8C701B] via-[#E3C766] to-[#8C701B]" />

        {/* Modal Header */}
        <div className="p-6 sm:p-8 border-b border-[rgba(244,241,232,0.08)] flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-[#A5A8AE] mb-1.5">
              <span className="text-[#C8A646] font-semibold uppercase tracking-wider text-[11px]">Bursa Serbest Piyasa Raporu</span>
              <span aria-hidden="true" className="text-[#A5A8AE]/40">·</span>
              <span>{selectedItem.source}</span>
            </div>
            
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#F4F1E8]">
              Bursa {selectedItem.name} Fiyatları
            </h2>
            <p className="text-xs sm:text-sm text-[#A5A8AE] mt-1">
              {selectedItem.description}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyLink}
              className="p-2 text-[#A5A8AE] hover:text-[#F4F1E8] bg-white/5 hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
              title="Bağlantıyı Kopyala"
            >
              {copied ? <Check className="w-4 h-4 text-[#3FA97A]" /> : <Copy className="w-4 h-4" />}
            </button>
            <button
              onClick={() => setSelectedItem(null)}
              className="p-2 text-[#A5A8AE] hover:text-[#F4F1E8] bg-white/5 hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
              aria-label="Kapat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-8 max-h-[75vh] overflow-y-auto">
          
          {/* Key Rates Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-[#11151C] border border-white/8 p-4 rounded-sm">
              <span className="text-[11px] uppercase tracking-wider text-[#9FA3AA] font-semibold block">
                Alış Fiyatı (Kuyumcu Alışı)
              </span>
              <div className="font-mono text-2xl font-bold text-[#F5F1E8] tabular-nums mt-1">
                {selectedItem.id === 'ons-altin' ? formatUSD(selectedItem.buyingPrice) : formatTL(selectedItem.buyingPrice)}
              </div>
              <span className="text-[11px] text-[#666C77] mt-1 block">
                Bursa Kapalı Çarşı serbest piyasa
              </span>
            </div>

            <div className="bg-[#11151C] border border-[#C9A227]/30 p-4 rounded-sm">
              <span className="text-[11px] uppercase tracking-wider text-[#C9A227] font-semibold block">
                Satış Fiyatı (Kuyumcu Satışı)
              </span>
              <div className="font-mono text-2xl font-bold text-[#E3C766] tabular-nums mt-1">
                {selectedItem.id === 'ons-altin' ? formatUSD(selectedItem.sellingPrice) : formatTL(selectedItem.sellingPrice)}
              </div>
              <span className="text-[11px] text-[#666C77] mt-1 block">
                Bozdurma öncesi güncel satış kotasyonu
              </span>
            </div>

            <div className="bg-[#11151C] border border-white/8 p-4 rounded-sm">
              <div className="flex items-center justify-between">
                <span className="text-[11px] uppercase tracking-wider text-[#9FA3AA] font-semibold block">
                  Günlük Değişim
                </span>
                <span className={`text-xs font-mono font-semibold flex items-center gap-0.5 ${isPositive ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {isPositive ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
                  %{Math.abs(selectedItem.changeRate).toFixed(2)}
                </span>
              </div>
              <div className="font-mono text-xl font-bold text-[#F5F1E8] tabular-nums mt-1">
                {isPositive ? '+' : ''}{selectedItem.id === 'ons-altin' ? `$${selectedItem.changeAmount.toFixed(2)}` : formatTL(selectedItem.changeAmount)}
              </div>
              <span className="text-[11px] text-[#666C77] mt-1 block">
                Makas: <strong className="text-[#9FA3AA] font-mono">{selectedItem.id === 'ons-altin' ? `$${spread.toFixed(2)}` : formatTL(spread)}</strong>
              </span>
            </div>
          </div>

          {/* Sparkline Visual Chart */}
          <div className="bg-[#0E1218] border border-white/8 p-5 rounded-sm">
            <div className="flex items-center justify-between mb-4 text-xs">
              <div className="flex items-center gap-2 text-[#9FA3AA]">
                <TrendingUp className="w-4 h-4 text-[#C9A227]" />
                <span className="font-semibold text-[#F5F1E8]">Son 7 Günlük Fiyat Eğilimi (Bursa Kapalı Çarşı)</span>
              </div>
              <div className="text-[#666C77] font-mono">
                En Düşük: {selectedItem.id === 'ons-altin' ? `$${minPrice}` : formatTL(minPrice)} · En Yüksek: {selectedItem.id === 'ons-altin' ? `$${maxPrice}` : formatTL(maxPrice)}
              </div>
            </div>

            <div className="h-28 w-full relative">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 100 80" preserveAspectRatio="none">
                <polyline
                  fill="none"
                  stroke="#C9A227"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  points={points}
                />
              </svg>
            </div>
          </div>

          {/* Technical Specifications */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#0E1218] border border-white/8 p-5 rounded-sm">
              <h3 className="text-sm font-semibold text-[#F5F1E8] mb-3 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#C9A227]" />
                <span>Teknik Özellikler ve Standartlar</span>
              </h3>
              
              <div className="space-y-2 text-xs divide-y divide-white/5">
                <div className="flex justify-between py-1.5">
                  <span className="text-[#666C77]">Altın Ayarı:</span>
                  <span className="text-[#F5F1E8] font-medium">{selectedItem.karat > 0 ? `${selectedItem.karat} Ayar (${selectedItem.purity * 1000} Milyem)` : 'Standart'}</span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span className="text-[#666C77]">Brüt Ağırlık:</span>
                  <span className="text-[#F5F1E8] font-medium">{selectedItem.weightGram > 0 ? `${formatNumber(selectedItem.weightGram, 3)} Gram` : 'Referans'}</span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span className="text-[#666C77]">Saf Has Altın Karşılığı:</span>
                  <span className="text-[#E3C766] font-mono font-medium">
                    {selectedItem.weightGram > 0 ? `${formatNumber(selectedItem.weightGram * selectedItem.purity, 3)} Gram` : 'Hesaplanamaz'}
                  </span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span className="text-[#666C77]">Bursa Likidite Durumu:</span>
                  <span className="text-emerald-400 font-medium">Çok Yüksek (Anında Nakde Çevrilir)</span>
                </div>
              </div>
            </div>

            {/* Bursa Tips */}
            <div className="bg-[#0E1218] border border-white/8 p-5 rounded-sm">
              <h3 className="text-sm font-semibold text-[#F5F1E8] mb-3 flex items-center gap-2">
                <Building className="w-4 h-4 text-[#C9A227]" />
                <span>Bursa Kapalı Çarşı Alışveriş Tavsiyesi</span>
              </h3>
              
              <p className="text-xs text-[#9FA3AA] leading-relaxed mb-3">
                {selectedItem.historicalTips}
              </p>

              <div className="space-y-1.5">
                {selectedItem.features.map((feat, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-[#9FA3AA]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#C9A227] shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Calc for this item */}
          {!isOnsOrUSD && (
            <div className="bg-[#12161E] border border-[#C9A227]/30 p-5 rounded-sm flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h4 className="text-sm font-semibold text-[#F5F1E8]">
                  Bu Altını Bursa Kurlarıyla Hesaplayın
                </h4>
                <p className="text-xs text-[#9FA3AA] mt-0.5">
                  Farklı adet ve bütçeler için anlık kar/zarar ve nakit karşılığını görün.
                </p>
              </div>

              <button
                onClick={() => {
                  const id = selectedItem.id;
                  setSelectedItem(null);
                  openCalculatorWithGold(id);
                }}
                className="px-5 py-2.5 bg-[#C9A227] hover:bg-[#D8B133] text-black font-semibold text-xs rounded-sm transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap shadow-md"
              >
                <Calculator className="w-4 h-4" />
                <span>Hesaplama Aracına Aktar</span>
              </button>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-[#090B0E] border-t border-white/8 flex items-center justify-between text-xs text-[#666C77]">
          <span>Veriler gösterge niteliğindedir. Yatırım tavsiyesi değildir.</span>
          <button
            onClick={() => setSelectedItem(null)}
            className="text-[#9FA3AA] hover:text-[#F5F1E8] cursor-pointer"
          >
            Pencereyi Kapat
          </button>
        </div>

      </div>
    </div>
  );
};
