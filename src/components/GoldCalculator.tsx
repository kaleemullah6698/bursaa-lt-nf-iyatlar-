import React, { useState, useEffect } from 'react';
import { useGold } from '../context/GoldContext';
import { Calculator, ArrowRightLeft, Sparkles, AlertCircle, CheckCircle } from 'lucide-react';

export const GoldCalculator: React.FC = () => {
  const { items, calculatorPreselectedGoldId, setCalculatorPreselectedGoldId } = useGold();

  const [selectedGoldId, setSelectedGoldId] = useState<string>('gram-altin');
  const [direction, setDirection] = useState<'buy' | 'sell'>('buy'); // buy: user buys from jeweler (sellingPrice), sell: user sells to jeweler (buyingPrice)
  const [amount, setAmount] = useState<number>(1);
  const [customPrice, setCustomPrice] = useState<number | null>(null);

  // Sync when preselection changes
  useEffect(() => {
    if (calculatorPreselectedGoldId) {
      setSelectedGoldId(calculatorPreselectedGoldId);
      setCalculatorPreselectedGoldId(null);
    }
  }, [calculatorPreselectedGoldId, setCalculatorPreselectedGoldId]);

  const currentItem = items.find(i => i.id === selectedGoldId) || items[0];

  const unitPrice = direction === 'buy' ? currentItem.sellingPrice : currentItem.buyingPrice;
  const effectivePrice = customPrice !== null ? customPrice : unitPrice;
  const totalVal = amount * effectivePrice;
  const otherVal = amount * (direction === 'buy' ? currentItem.buyingPrice : currentItem.sellingPrice);
  const spreadCost = Math.abs(totalVal - otherVal);

  const formatTL = (val: number) => {
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'TRY',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(val);
  };

  const quickAmounts = [1, 2, 5, 10, 20, 50, 100];

  return (
    <section id="altin-hesaplama" aria-labelledby="calcTitle" className="py-12 bg-[#0E1217] border-y border-[rgba(244,241,232,0.06)]">
      <div className="max-w-[1180px] mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="mb-8">
          <span className="text-xs uppercase tracking-[0.16em] text-[#C8A646] font-semibold mb-2 block">
            Hesaplama Aracı
          </span>
          <h2 id="calcTitle" className="text-2xl sm:text-3xl font-serif text-[#F4F1E8] font-semibold tracking-tight">
            Bursa Altın Çevirici & Hesap Makinesi
          </h2>
          <p className="text-sm sm:text-base text-[#A5A8AE] mt-2 max-w-2xl">
            Bursa Kapalı Çarşı ve kuyumcu kurlarıyla anlık bozdurma veya satın alma tutarını net hesaplayın.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-[#14181E] border border-[rgba(244,241,232,0.08)] rounded-3xl p-6 sm:p-8 shadow-2xl">
          {/* Controls Column (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Direction Toggle */}
            <div className="grid grid-cols-2 p-1.5 bg-[#0D1015] rounded-xl border border-[rgba(244,241,232,0.08)]">
              <button
                type="button"
                onClick={() => setDirection('buy')}
                className={`py-2.5 text-xs sm:text-sm font-semibold rounded-lg transition-all ${
                  direction === 'buy'
                    ? 'bg-[#C8A646] text-[#080A0D] shadow-md'
                    : 'text-[#A5A8AE] hover:text-[#F4F1E8]'
                }`}
              >
                Altın Satın Alacağım (Kuyumcu Satış)
              </button>
              <button
                type="button"
                onClick={() => setDirection('sell')}
                className={`py-2.5 text-xs sm:text-sm font-semibold rounded-lg transition-all ${
                  direction === 'sell'
                    ? 'bg-[#3FA97A] text-[#080A0D] shadow-md'
                    : 'text-[#A5A8AE] hover:text-[#F4F1E8]'
                }`}
              >
                Altın Bozduracağım (Kuyumcu Alış)
              </button>
            </div>

            {/* Gold Instrument Selector */}
            <div>
              <label className="block text-xs uppercase tracking-wider text-[#A5A8AE] mb-2 font-medium">
                Altın Türü Seçiniz
              </label>
              <select
                value={selectedGoldId}
                onChange={(e) => {
                  setSelectedGoldId(e.target.value);
                  setCustomPrice(null);
                }}
                className="w-full bg-[#101318] border border-[rgba(244,241,232,0.12)] rounded-xl px-4 py-3 text-sm text-[#F4F1E8] focus:outline-none focus:border-[#C8A646] transition-colors"
              >
                {items.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name} — Satış: ₺{item.sellingPrice.toFixed(2)} | Alış: ₺{item.buyingPrice.toFixed(2)}
                  </option>
                ))}
              </select>
            </div>

            {/* Quantity Input */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs uppercase tracking-wider text-[#A5A8AE] font-medium">
                  Miktar ({currentItem.id.includes('bilezik') || currentItem.id.includes('gram') ? 'Gram' : 'Adet'})
                </label>
                <span className="text-xs text-[#C8A646]">
                  Birim Fiyat: {formatTL(effectivePrice)}
                </span>
              </div>
              <div className="relative">
                <input
                  type="number"
                  min="0.1"
                  step="any"
                  value={amount || ''}
                  onChange={(e) => setAmount(Math.max(0, parseFloat(e.target.value) || 0))}
                  placeholder="Miktar giriniz..."
                  className="w-full bg-[#101318] border border-[rgba(244,241,232,0.12)] rounded-xl px-4 py-3 text-lg font-mono text-[#F4F1E8] focus:outline-none focus:border-[#C8A646] transition-colors"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-mono text-[#A5A8AE]">
                  {currentItem.id.includes('bilezik') || currentItem.id.includes('gram') ? 'GRAM' : 'ADET'}
                </span>
              </div>

              {/* Quick Amount Buttons */}
              <div className="flex flex-wrap items-center gap-2 mt-3">
                <span className="text-xs text-[#A5A8AE]">Hızlı Miktar:</span>
                {quickAmounts.map((q) => (
                  <button
                    key={q}
                    type="button"
                    onClick={() => setAmount(q)}
                    className={`px-2.5 py-1 text-xs rounded-lg font-mono transition-colors ${
                      amount === q
                        ? 'bg-[#C8A646] text-[#080A0D] font-bold'
                        : 'bg-[#101318] text-[#A5A8AE] hover:text-[#F4F1E8] border border-[rgba(244,241,232,0.06)]'
                    }`}
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Result Card Column (5 cols) */}
          <div className="lg:col-span-5 bg-gradient-to-b from-[#101318] to-[#0A0D11] border border-[rgba(244,241,232,0.08)] rounded-2xl p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-[rgba(244,241,232,0.08)] pb-3 mb-4">
                <span className="text-xs uppercase tracking-wider text-[#A5A8AE]">Hesaplama Özeti</span>
                <span className={`text-xs px-2 py-0.5 rounded font-medium ${
                  direction === 'buy' ? 'bg-[#C8A646]/10 text-[#E2C76A]' : 'bg-[#3FA97A]/10 text-[#3FA97A]'
                }`}>
                  {direction === 'buy' ? 'Alışveriş Tutarı' : 'Eline Geçecek Nakit'}
                </span>
              </div>

              <div className="space-y-3 mb-6">
                <div className="text-xs text-[#A5A8AE]">
                  Seçilen: <strong className="text-[#F4F1E8]">{currentItem.name}</strong>
                </div>
                <div className="text-xs text-[#A5A8AE]">
                  Miktar: <strong className="text-[#F4F1E8]">{amount} {currentItem.id.includes('bilezik') || currentItem.id.includes('gram') ? 'Gram' : 'Adet'}</strong>
                </div>
                <div className="text-xs text-[#A5A8AE]">
                  Kullanılan Kur:{' '}
                  <strong className="text-[#E2C76A] font-mono">
                    {formatTL(effectivePrice)}
                  </strong>
                </div>
              </div>

              {/* Huge Total Result */}
              <div className="bg-[#14181E] border border-[#C8A646]/20 rounded-xl p-4 mb-4">
                <span className="text-[11px] uppercase tracking-wider text-[#A5A8AE] block mb-1">
                  {direction === 'buy' ? 'Toplam Ödenecek Tutar' : 'Toplam Bozdurma Bedeli'}
                </span>
                <div className="text-3xl font-bold font-mono text-[#E2C76A] tracking-tight">
                  {formatTL(totalVal)}
                </div>
              </div>

              {/* Makas / Spread Difference */}
              <div className="text-xs text-[#A5A8AE] space-y-1.5 pt-2">
                <div className="flex items-center justify-between">
                  <span>Kuyumcu Alış/Satış Makas Payı:</span>
                  <span className="font-mono text-[#F4F1E8]">₺{spreadCost.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between text-[11px]">
                  <span>{direction === 'buy' ? 'Aynı an bozdurulursa kayıp:' : 'Bugün geri alınırsa fark:'}</span>
                  <span className="text-[#C9605F] font-mono">-%{((spreadCost / totalVal) * 100).toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[rgba(244,241,232,0.06)] text-[11px] text-[#A5A8AE] flex items-center gap-1.5">
              <CheckCircle className="w-3.5 h-3.5 text-[#3FA97A] shrink-0" />
              <span>Bursa kuyumcularında işçiliksiz altınlarda bu fiyatlar baz alınır.</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
