import React, { useState } from 'react';
import { useGold } from '../context/GoldContext';
import { ArrowUp, ArrowDown, Search, Calculator, BarChart2 } from 'lucide-react';
import { GoldCategory, GoldPriceItem } from '../types/gold';

export const PriceTable: React.FC = () => {
  const { items, setSelectedItem, openCalculatorWithGold, flashedItemIds } = useGold();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories: { key: string; label: string }[] = [
    { key: 'all', label: 'Tüm Kurlar' },
    { key: 'yatirim', label: 'Yatırımlık Altınlar' },
    { key: 'ziynet', label: 'Ziynet Altınları' },
    { key: 'bilezik', label: 'Bilezik & Ayar' },
    { key: 'ons_doviz', label: 'Ons & Döviz' }
  ];

  const filteredItems = items.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.shortName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const formatTL = (val: number, isCurrency: boolean = true) => {
    if (val < 100) return val.toFixed(2);
    if (!isCurrency) return val.toFixed(2);
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'TRY',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(val);
  };

  const formatPct = (val: number) => {
    return new Intl.NumberFormat('tr-TR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
      signDisplay: 'always'
    }).format(val);
  };

  return (
    <section aria-labelledby="tblTitle" className="py-10 bg-[#080A0D]">
      <div className="max-w-[1180px] mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="mb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs uppercase tracking-[0.16em] text-[#C8A646] font-semibold mb-2 block">
              Detaylı Liste
            </span>
            <h2 id="tblTitle" className="text-2xl sm:text-3xl font-serif text-[#F4F1E8] font-semibold tracking-tight">
              Bursa Altın Fiyatları — Güncel Liste
            </h2>
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-[#A5A8AE] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Altın türü ara..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-[#101318] border border-[rgba(244,241,232,0.1)] rounded-xl text-xs text-[#F4F1E8] placeholder-[#A5A8AE]/60 focus:outline-none focus:border-[#C8A646]"
            />
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-4 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setSelectedCategory(cat.key)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                selectedCategory === cat.key
                  ? 'bg-[#C8A646] text-[#080A0D] font-semibold shadow-sm'
                  : 'bg-[#14181E] text-[#A5A8AE] hover:text-[#F4F1E8] border border-[rgba(244,241,232,0.06)]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Table Container matching user's HTML tbl-wrap */}
        <div className="border border-[rgba(244,241,232,0.08)] rounded-2xl overflow-hidden bg-[#14181E] shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <caption className="sr-only">
                Bursa altın fiyatları güncel liste: alış, satış, değişim ve güncelleme zamanı
              </caption>
              <thead>
                <tr className="bg-[#101318] border-b border-[rgba(244,241,232,0.08)]">
                  <th scope="col" className="text-left py-3.5 px-5 text-xs font-medium text-[#A5A8AE] uppercase tracking-wider">
                    Altın Türü
                  </th>
                  <th scope="col" className="text-right py-3.5 px-5 text-xs font-medium text-[#A5A8AE] uppercase tracking-wider">
                    Alış
                  </th>
                  <th scope="col" className="text-right py-3.5 px-5 text-xs font-medium text-[#A5A8AE] uppercase tracking-wider">
                    Satış
                  </th>
                  <th scope="col" className="text-right py-3.5 px-5 text-xs font-medium text-[#A5A8AE] uppercase tracking-wider hidden sm:table-cell">
                    Makas (Fark)
                  </th>
                  <th scope="col" className="text-right py-3.5 px-5 text-xs font-medium text-[#A5A8AE] uppercase tracking-wider">
                    Değişim (24s)
                  </th>
                  <th scope="col" className="text-right py-3.5 px-5 text-xs font-medium text-[#A5A8AE] uppercase tracking-wider hidden md:table-cell">
                    Güncelleme
                  </th>
                  <th scope="col" className="text-center py-3.5 px-4 text-xs font-medium text-[#A5A8AE] uppercase tracking-wider">
                    İşlem
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[rgba(244,241,232,0.05)]">
                {filteredItems.map((item) => {
                  const isUp = item.changeRate >= 0;
                  const spread = item.sellingPrice - item.buyingPrice;
                  const isFlashed = flashedItemIds[item.id];

                  return (
                    <tr
                      key={item.id}
                      onClick={() => setSelectedItem(item)}
                      className={`hover:bg-[#C8A646]/5 transition-colors cursor-pointer group ${
                        isFlashed ? 'bg-[#C8A646]/10' : ''
                      }`}
                    >
                      {/* Name */}
                      <td className="py-4 px-5">
                        <div className="font-medium text-[#F4F1E8] group-hover:text-[#E2C76A] transition-colors">
                          {item.name}
                        </div>
                        <div className="text-[11px] text-[#A5A8AE]">
                          {item.karat > 0 ? `${item.karat} Ayar · ` : ''}{item.weightGram ? `${item.weightGram}g · ` : ''}
                          {item.id.includes('ceyrek') || item.id.includes('yarim') || item.id.includes('tam') ? (
                            <span className="text-[#C8A646]/80">hesaplanan değer</span>
                          ) : (
                            <span>serbest piyasa</span>
                          )}
                        </div>
                      </td>

                      {/* Buy */}
                      <td className="py-4 px-5 text-right font-mono font-medium text-[#F4F1E8]">
                        {formatTL(item.buyingPrice)}
                      </td>

                      {/* Sell */}
                      <td className="py-4 px-5 text-right font-mono font-semibold text-[#E2C76A]">
                        {formatTL(item.sellingPrice)}
                      </td>

                      {/* Spread */}
                      <td className="py-4 px-5 text-right font-mono text-xs text-[#A5A8AE] hidden sm:table-cell">
                        ₺{spread.toFixed(2)}
                      </td>

                      {/* Change */}
                      <td className="py-4 px-5 text-right">
                        <span
                          className={`inline-flex items-center gap-1 font-mono font-semibold px-2 py-0.5 rounded-full text-xs ${
                            isUp
                              ? 'text-[#3FA97A] bg-[#3FA97A]/10'
                              : 'text-[#C9605F] bg-[#C9605F]/10'
                          }`}
                        >
                          {isUp ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
                          %{formatPct(item.changeRate)}
                        </span>
                      </td>

                      {/* Update Time */}
                      <td className="py-4 px-5 text-right text-xs text-[#A5A8AE] font-mono hidden md:table-cell">
                        {item.lastUpdate}
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-4 text-center" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-center gap-1.5">
                          <button
                            onClick={() => openCalculatorWithGold(item.id)}
                            className="p-1.5 rounded-lg bg-[#101318] text-[#A5A8AE] hover:text-[#E2C76A] hover:bg-[#1C222B] transition-colors"
                            title="Bu altınla hesaplama yap"
                          >
                            <Calculator className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => setSelectedItem(item)}
                            className="p-1.5 rounded-lg bg-[#101318] text-[#A5A8AE] hover:text-[#C8A646] hover:bg-[#1C222B] transition-colors"
                            title="Grafikte ve detayda gör"
                          >
                            <BarChart2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Table Note matching user's HTML */}
          <div className="py-3 px-5 text-xs text-[#A5A8AE] border-t border-[rgba(244,241,232,0.08)] bg-[#101318]">
            Not: Çeyrek, yarım, tam, Cumhuriyet ve Ata fiyatları saf altın karşılığı üzerinden hesaplanan teorik değerlerdir; işçilik ve kuyumcu makası dahil değildir. Nihai fiyat için kuyumcunuzu doğrulayın.
          </div>
        </div>
      </div>
    </section>
  );
};
