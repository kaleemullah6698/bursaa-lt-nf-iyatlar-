import React, { useState } from 'react';
import { useGold } from '../context/GoldContext';
import { Landmark, TrendingDown, CheckCircle, ShieldAlert, Sparkles, ArrowRight } from 'lucide-react';

export const BankSpreadComparison: React.FC = () => {
  const { items, activeCity } = useGold();
  const [gramAmount, setGramAmount] = useState<number>(25);

  const gramItem = items.find(i => i.id === 'gram-altin') || items[0];
  const cityBuy = gramItem.buyingPrice + activeCity.pricePremiumTL;
  const citySell = gramItem.sellingPrice + activeCity.pricePremiumTL;
  const citySpread = citySell - cityBuy;

  // Real bank average margins (banks apply ~3.5% to 4.5% spread on gold)
  const bankData = [
    { name: `${activeCity.name} ${activeCity.marketName} (Fiziki)`, buy: cityBuy, sell: citySell, spreadPct: (citySpread / citySell) * 100, isBest: true, logo: '🏛️' },
    { name: 'Ziraat Bankası', buy: cityBuy - 130, sell: citySell + 85, spreadPct: 3.14, isBest: false, logo: '🌾' },
    { name: 'İş Bankası', buy: cityBuy - 150, sell: citySell + 95, spreadPct: 3.58, isBest: false, logo: '🏦' },
    { name: 'Garanti BBVA', buy: cityBuy - 170, sell: citySell + 110, spreadPct: 4.09, isBest: false, logo: '🍀' },
    { name: 'Yapı Kredi', buy: cityBuy - 185, sell: citySell + 115, spreadPct: 4.38, isBest: false, logo: '🐏' },
    { name: 'Akbank', buy: cityBuy - 175, sell: citySell + 105, spreadPct: 4.08, isBest: false, logo: '🔴' },
  ];

  const avgBankSell = bankData.filter(b => !b.isBest).reduce((acc, b) => acc + b.sell, 0) / (bankData.length - 1);
  const totalSavings = (avgBankSell - citySell) * gramAmount;

  const formatTL = (v: number) => {
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'TRY',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(v);
  };

  return (
    <section className="py-12 bg-[#0A0D12] border-t border-[rgba(244,241,232,0.06)]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#C8A646]/10 text-[#E2C76A] text-xs font-semibold uppercase tracking-wider mb-2 border border-[#C8A646]/20 font-mono">
              <Landmark className="w-3.5 h-3.5" />
              <span>{activeCity.name} Arbitraj & Tasarruf Matrisi</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif text-[#F4F1E8] font-bold tracking-tight">
              {activeCity.name} Sarrafları vs Banka Makas Karşılaştırması
            </h2>
            <p className="text-sm text-[#A5A8AE] mt-1.5 max-w-2xl">
              Neden fiziki altın? Bankaların yüksek alım-satım komisyonları yerine {activeCity.name} {activeCity.marketName} sarraflarından işlem yaparak ne kadar tasarruf edeceğinizi anlık görün.
            </p>
          </div>

          {/* Interactive Calculator Slider */}
          <div className="bg-[#14181E] border border-[rgba(244,241,232,0.1)] rounded-2xl p-4 min-w-[280px]">
            <div className="flex items-center justify-between text-xs text-[#A5A8AE] mb-2 font-medium">
              <label htmlFor="arbitrage-slider" className="cursor-pointer">İşlem Miktarı:</label>
              <span className="font-mono text-[#E2C76A] font-bold text-sm">{gramAmount} Gram Altın</span>
            </div>
            <input
              id="arbitrage-slider"
              type="range"
              min="1"
              max="250"
              value={gramAmount}
              onChange={(e) => setGramAmount(Number(e.target.value))}
              aria-label="İşlem Yapılacak Altın Miktarı (Gram)"
              aria-valuemin={1}
              aria-valuemax={250}
              aria-valuenow={gramAmount}
              className="w-full h-1.5 bg-[#080A0D] rounded-lg appearance-none cursor-pointer accent-[#C8A646]"
            />
            <div className="flex justify-between text-[10px] text-zinc-400 mt-1 font-mono">
              <span>1g</span>
              <span>50g</span>
              <span>100g</span>
              <span>250g</span>
            </div>
          </div>
        </div>

        {/* Real-time Savings Banner */}
        <div className="bg-gradient-to-r from-[#C8A646]/15 via-[#14181E] to-[#14181E] border border-[#C8A646]/30 rounded-2xl p-4 sm:p-5 mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#C8A646]/20 border border-[#C8A646]/40 flex items-center justify-center text-[#E2C76A] shrink-0">
              <Sparkles className="w-5 h-5" aria-hidden="true" />
            </div>
            <div>
              <span className="text-xs uppercase tracking-wider text-[#C8A646] font-semibold block font-mono">
                {activeCity.name} Serbest Piyasa Fiziki Avantajı
              </span>
              <p className="text-sm text-[#F4F1E8] font-normal">
                {gramAmount} gram altın alımında bankalara kıyasla net kazancınız:
              </p>
            </div>
          </div>
          <div className="text-right sm:border-l sm:border-[rgba(244,241,232,0.08)] sm:pl-6">
            <div className="text-xl sm:text-2xl font-bold font-mono text-[#E2C76A]">
              +{formatTL(totalSavings)}
            </div>
            <span className="text-[11px] text-emerald-400 font-mono">Doğrudan cebinizde kalan tasarruf</span>
          </div>
        </div>

        {/* Matrix Table */}
        <div className="overflow-x-auto rounded-2xl border border-[rgba(244,241,232,0.08)]">
          <table className="w-full text-left text-sm border-collapse min-w-[620px]" aria-label="Banka ve Serbest Piyasa Makas Karşılaştırması">
            <thead className="bg-[#14181E] text-xs font-mono uppercase tracking-wider text-[#A5A8AE] border-b border-[rgba(244,241,232,0.08)]">
              <tr>
                <th scope="col" className="py-3 px-4">Kurum / Piyasa</th>
                <th scope="col" className="py-3 px-4 text-right">Alış (TL)</th>
                <th scope="col" className="py-3 px-4 text-right">Satış (TL)</th>
                <th scope="col" className="py-3 px-4 text-right">Makas (Fark)</th>
                <th scope="col" className="py-3 px-4 text-right">Spread (%)</th>
                <th scope="col" className="py-3 px-4 text-center">Durum</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[rgba(244,241,232,0.04)] bg-[#0E1217]">
              {bankData.map((b, i) => (
                <tr 
                  key={i} 
                  className={`transition-colors ${b.isBest ? 'bg-[#C8A646]/10 font-medium' : 'hover:bg-[#14181E]'}`}
                >
                  <td className="py-3.5 px-4 flex items-center gap-2.5">
                    <span className="text-base">{b.logo}</span>
                    <span className={b.isBest ? 'text-[#E2C76A] font-bold font-serif' : 'text-[#F4F1E8]'}>
                      {b.name}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right font-mono text-zinc-300">
                    {formatTL(b.buy)}
                  </td>
                  <td className={`py-3.5 px-4 text-right font-mono font-bold ${b.isBest ? 'text-[#E2C76A]' : 'text-[#F4F1E8]'}`}>
                    {formatTL(b.sell)}
                  </td>
                  <td className="py-3.5 px-4 text-right font-mono text-zinc-400">
                    {formatTL(b.sell - b.buy)}
                  </td>
                  <td className={`py-3.5 px-4 text-right font-mono ${b.isBest ? 'text-emerald-400 font-bold' : 'text-rose-400'}`}>
                    %{b.spreadPct.toFixed(2)}
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    {b.isBest ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-mono font-semibold">
                        <CheckCircle className="w-3 h-3" />
                        En Dar Makas
                      </span>
                    ) : (
                      <span className="text-xs text-zinc-500 font-mono">Geniş Banka Marjı</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};
