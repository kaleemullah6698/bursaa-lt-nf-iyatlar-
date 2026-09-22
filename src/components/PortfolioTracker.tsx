import React, { useState } from 'react';
import { useGold } from '../context/GoldContext';
import { Briefcase, Plus, Trash2, TrendingUp, TrendingDown, DollarSign, PieChart, ShieldCheck } from 'lucide-react';

export const PortfolioTracker: React.FC = () => {
  const { items, portfolio, addPortfolioItem, removePortfolioItem, portfolioSummary } = useGold();

  const [isOpenForm, setIsOpenForm] = useState(false);
  const [selectedGoldId, setSelectedGoldId] = useState<string>('gram-altin');
  const [amount, setAmount] = useState<number>(5);
  const [buyPrice, setBuyPrice] = useState<number>(6700);
  const [notes, setNotes] = useState<string>('');

  const formatTL = (v: number) => {
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'TRY',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(v);
  };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (amount <= 0 || buyPrice <= 0) return;
    addPortfolioItem({
      goldId: selectedGoldId,
      amount,
      buyPrice,
      notes: notes.trim() || undefined
    });
    setIsOpenForm(false);
    setNotes('');
  };

  const isProfit = portfolioSummary.totalProfitTL >= 0;

  return (
    <section id="portfoy" className="py-12 bg-[#080A0D]">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#C8A646]/10 text-[#E2C76A] text-xs font-semibold uppercase tracking-wider mb-2 border border-[#C8A646]/20">
              <Briefcase className="w-3.5 h-3.5" />
              Kişisel Varlık Yönetimi (SaaS Pro)
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif text-[#F4F1E8] font-bold tracking-tight">
              Bursa Altın Portföy & Canlı Kâr/Zarar Takibi
            </h2>
            <p className="text-sm text-[#A5A8AE] mt-1.5 max-w-2xl">
              Fiziki altın yatırımlarınızı kaydedin; anlık canlı fiyatlarla toplam portföy değerinizi ve net kârınızı saniyesi saniyesine izleyin.
            </p>
          </div>

          <button
            onClick={() => setIsOpenForm(!isOpenForm)}
            className="px-4 py-2 bg-[#C8A646] hover:bg-[#E2C76A] text-[#080A0D] font-semibold text-xs sm:text-sm rounded-xl transition-colors flex items-center gap-2 shrink-0 shadow-lg"
          >
            <Plus className="w-4 h-4" />
            <span>Yeni Varlık Ekle</span>
          </button>
        </div>

        {/* Portfolio Stats Ribbon */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {/* Total Value */}
          <div className="bg-[#14181E] border border-[rgba(244,241,232,0.08)] rounded-2xl p-5">
            <span className="text-xs uppercase tracking-wider text-[#A5A8AE] font-mono block mb-1">
              Toplam Portföy Değeri
            </span>
            <div className="text-2xl font-bold font-mono text-[#E2C76A]">
              {formatTL(portfolioSummary.currentValue)}
            </div>
            <div className="text-[11px] text-[#A5A8AE] mt-1">
              {portfolio.length} Kalem Altın Varlığı
            </div>
          </div>

          {/* Total Cost */}
          <div className="bg-[#14181E] border border-[rgba(244,241,232,0.08)] rounded-2xl p-5">
            <span className="text-xs uppercase tracking-wider text-[#A5A8AE] font-mono block mb-1">
              Toplam Maliyet Tutarı
            </span>
            <div className="text-2xl font-bold font-mono text-zinc-100">
              {formatTL(portfolioSummary.totalCost)}
            </div>
            <div className="text-[11px] text-[#A5A8AE] mt-1">
              Alış tarihindeki toplam tutar
            </div>
          </div>

          {/* Net Profit / Loss TL */}
          <div className="bg-[#14181E] border border-[rgba(244,241,232,0.08)] rounded-2xl p-5">
            <span className="text-xs uppercase tracking-wider text-[#A5A8AE] font-mono block mb-1">
              Net Kâr / Zarar (TL)
            </span>
            <div className={`text-2xl font-bold font-mono ${isProfit ? 'text-emerald-400' : 'text-rose-400'}`}>
              {isProfit ? '+' : ''}{formatTL(portfolioSummary.totalProfitTL)}
            </div>
            <div className="text-[11px] text-[#A5A8AE] mt-1">
              Canlı kuyumcu satış fiyatına göre
            </div>
          </div>

          {/* Profit % */}
          <div className="bg-[#14181E] border border-[rgba(244,241,232,0.08)] rounded-2xl p-5">
            <span className="text-xs uppercase tracking-wider text-[#A5A8AE] font-mono block mb-1">
              Toplam Getiri Oranı
            </span>
            <div className={`text-2xl font-bold font-mono flex items-center gap-1.5 ${isProfit ? 'text-emerald-400' : 'text-rose-400'}`}>
              {isProfit ? <TrendingUp className="w-5 h-5" /> : <TrendingDown className="w-5 h-5" />}
              {isProfit ? '+' : ''}{portfolioSummary.totalProfitPercent.toFixed(2)}%
            </div>
            <div className="text-[11px] text-[#A5A8AE] mt-1">
              Ağırlıklı getiri performansı
            </div>
          </div>
        </div>

        {/* Add Asset Form Modal / Dropdown */}
        {isOpenForm && (
          <form onSubmit={handleAdd} className="bg-[#101318] border border-[#C8A646]/30 rounded-2xl p-6 mb-8 shadow-2xl animate-in fade-in">
            <h3 className="text-base font-serif font-semibold text-white mb-4">
              Portföye Yeni Altın Kaydı Ekle
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
              <div>
                <label className="block text-xs text-[#A5A8AE] mb-1.5">Altın Türü</label>
                <select
                  value={selectedGoldId}
                  onChange={(e) => {
                    setSelectedGoldId(e.target.value);
                    const it = items.find(i => i.id === e.target.value);
                    if (it) setBuyPrice(it.sellingPrice);
                  }}
                  className="w-full bg-[#14181E] border border-[rgba(244,241,232,0.1)] rounded-xl px-3 py-2 text-xs text-white focus:border-[#C8A646]"
                >
                  {items.map(i => (
                    <option key={i.id} value={i.id}>{i.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs text-[#A5A8AE] mb-1.5">Miktar (Adet / Gram)</label>
                <input
                  type="number"
                  step="any"
                  min="0.1"
                  value={amount}
                  onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
                  className="w-full bg-[#14181E] border border-[rgba(244,241,232,0.1)] rounded-xl px-3 py-2 text-xs text-white font-mono focus:border-[#C8A646]"
                />
              </div>

              <div>
                <label className="block text-xs text-[#A5A8AE] mb-1.5">Alış Fiyatı (TL / Adet)</label>
                <input
                  type="number"
                  step="any"
                  min="1"
                  value={buyPrice}
                  onChange={(e) => setBuyPrice(parseFloat(e.target.value) || 0)}
                  className="w-full bg-[#14181E] border border-[rgba(244,241,232,0.1)] rounded-xl px-3 py-2 text-xs text-white font-mono focus:border-[#C8A646]"
                />
              </div>

              <div>
                <label className="block text-xs text-[#A5A8AE] mb-1.5">Not / Kuyumcu Adı</label>
                <input
                  type="text"
                  placeholder="Örn: Bursa Kapalıçarşı Harem"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full bg-[#14181E] border border-[rgba(244,241,232,0.1)] rounded-xl px-3 py-2 text-xs text-white focus:border-[#C8A646]"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsOpenForm(false)}
                className="px-4 py-2 bg-[#14181E] text-[#A5A8AE] hover:text-white rounded-xl text-xs"
              >
                İptal
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-[#C8A646] text-[#080A0D] font-bold rounded-xl text-xs hover:bg-[#E2C76A]"
              >
                Varlığı Kaydet
              </button>
            </div>
          </form>
        )}

        {/* Holdings List Table */}
        <div className="bg-[#101318] border border-[rgba(244,241,232,0.08)] rounded-2xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b border-[rgba(244,241,232,0.08)] bg-[#0C0F14] text-[#A5A8AE] text-xs">
                  <th className="py-3 px-5 text-left font-medium">Varlık</th>
                  <th className="py-3 px-5 text-right font-medium">Miktar</th>
                  <th className="py-3 px-5 text-right font-medium">Alış Maliyeti</th>
                  <th className="py-3 px-5 text-right font-medium">Güncel Fiyat</th>
                  <th className="py-3 px-5 text-right font-medium">Mevcut Değer</th>
                  <th className="py-3 px-5 text-right font-medium">Net Kâr / Zarar</th>
                  <th className="py-3 px-4 text-center font-medium">Sil</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[rgba(244,241,232,0.05)] font-mono text-xs sm:text-sm">
                {portfolio.map((item) => {
                  const match = items.find(i => i.id === item.goldId) || items[0];
                  const currentPrice = match.sellingPrice;
                  const currentVal = item.amount * currentPrice;
                  const totalCost = item.amount * item.buyPrice;
                  const profitTL = currentVal - totalCost;
                  const profitPct = totalCost > 0 ? (profitTL / totalCost) * 100 : 0;
                  const isItemProfit = profitTL >= 0;

                  return (
                    <tr key={item.id} className="hover:bg-[#14181E] transition-colors">
                      <td className="py-3.5 px-5 font-sans">
                        <div className="font-semibold text-white">{match.name}</div>
                        {item.notes && <div className="text-[11px] text-[#A5A8AE]">{item.notes}</div>}
                      </td>
                      <td className="py-3.5 px-5 text-right font-bold text-zinc-200">
                        {item.amount}
                      </td>
                      <td className="py-3.5 px-5 text-right text-zinc-300">
                        {formatTL(item.buyPrice)}
                      </td>
                      <td className="py-3.5 px-5 text-right font-semibold text-[#E2C76A]">
                        {formatTL(currentPrice)}
                      </td>
                      <td className="py-3.5 px-5 text-right font-bold text-white">
                        {formatTL(currentVal)}
                      </td>
                      <td className="py-3.5 px-5 text-right">
                        <span className={`inline-flex items-center gap-1 font-bold ${isItemProfit ? 'text-emerald-400' : 'text-rose-400'}`}>
                          {isItemProfit ? '+' : ''}{formatTL(profitTL)} ({profitPct.toFixed(2)}%)
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <button
                          onClick={() => removePortfolioItem(item.id)}
                          className="p-1.5 text-zinc-500 hover:text-rose-400 transition-colors rounded-lg hover:bg-rose-500/10"
                          title="Sil"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};
