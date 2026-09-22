import React, { useState } from 'react';
import { useGold } from '../context/GoldContext';
import { Heart, Scale, Sparkles, AlertCircle, CheckCircle2 } from 'lucide-react';

export const ZakatWeddingCalculator: React.FC = () => {
  const { items } = useGold();
  const [activeTab, setActiveTab] = useState<'zakat' | 'wedding'>('zakat');

  // Gram Altın price
  const gramItem = items.find(i => i.id === 'gram-altin') || items[0];
  const gramPrice = gramItem.sellingPrice;

  // Zakat State (Diyanet Nisap = 80.18g)
  const [zakatGrams, setZakatGrams] = useState<number>(100);
  const nisapThresholdGrams = 80.18;
  const nisapTL = nisapThresholdGrams * gramPrice;
  const userTotalGoldTL = zakatGrams * gramPrice;
  const isZakatObligatory = zakatGrams >= nisapThresholdGrams;
  const zakatDueTL = isZakatObligatory ? userTotalGoldTL * 0.025 : 0; // %2.5 (1/40)

  // Wedding Set State
  const bilezikItem = items.find(i => i.id === '22-ayar-bilezik') || items[0];
  const ceyrekItem = items.find(i => i.id === 'ceyrek-altin') || items[0];
  const yarimItem = items.find(i => i.id === 'yarim-altin') || items[0];
  const tamItem = items.find(i => i.id === 'tam-altin') || items[0];

  const [necklaceGrams, setNecklaceGrams] = useState<number>(35); // 22 Ayar Set Kolye
  const [braceletCount, setBraceletCount] = useState<number>(4); // Bilezik adedi
  const [braceletGramsEach, setBraceletGramsEach] = useState<number>(20); // Her bilezik 20g
  const [quarterCount, setQuarterCount] = useState<number>(10);
  const [halfCount, setHalfCount] = useState<number>(2);
  const [fullCount, setFullCount] = useState<number>(1);

  const totalWeddingCost =
    necklaceGrams * bilezikItem.sellingPrice +
    braceletCount * braceletGramsEach * bilezikItem.sellingPrice +
    quarterCount * ceyrekItem.sellingPrice +
    halfCount * yarimItem.sellingPrice +
    fullCount * tamItem.sellingPrice;

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
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6">
        {/* Tab Switcher */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#C8A646]/10 text-[#E2C76A] text-xs font-semibold uppercase tracking-wider mb-2 border border-[#C8A646]/20">
              <Sparkles className="w-3.5 h-3.5" />
              Özel Finansal Araçlar
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif text-[#F4F1E8] font-bold tracking-tight">
              {activeTab === 'zakat' ? 'Diyanet Altın Zekat Hesaplayıcısı' : 'Bursa Düğün Takı & Altın Seti Bütçesi'}
            </h2>
            <p className="text-sm text-[#A5A8AE] mt-1.5 max-w-xl">
              {activeTab === 'zakat'
                ? 'Diyanet İşleri Başkanlığı 80.18 gram nisap esasına göre anlık zekat miktarınızı hesaplayın.'
                : 'Bursa geleneksel düğün takı setleri, bilezikler ve hediyelik altınların güncel toplam maliyeti.'}
            </p>
          </div>

          <div className="flex p-1.5 bg-[#14181E] border border-[rgba(244,241,232,0.08)] rounded-xl shrink-0">
            <button
              onClick={() => setActiveTab('zakat')}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors flex items-center gap-2 ${
                activeTab === 'zakat'
                  ? 'bg-[#C8A646] text-[#080A0D] shadow-md'
                  : 'text-[#A5A8AE] hover:text-white'
              }`}
            >
              <Scale className="w-3.5 h-3.5" />
              <span>Zekat Hesapla</span>
            </button>
            <button
              onClick={() => setActiveTab('wedding')}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors flex items-center gap-2 ${
                activeTab === 'wedding'
                  ? 'bg-[#C8A646] text-[#080A0D] shadow-md'
                  : 'text-[#A5A8AE] hover:text-white'
              }`}
            >
              <Heart className="w-3.5 h-3.5" />
              <span>Düğün Takı Seti</span>
            </button>
          </div>
        </div>

        {/* Tab 1: Zakat Calculator */}
        {activeTab === 'zakat' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-[#14181E] border border-[rgba(244,241,232,0.08)] rounded-3xl p-6 sm:p-8 shadow-2xl">
            <div className="lg:col-span-7 space-y-6">
              <div>
                <div className="flex items-center justify-between text-xs text-[#A5A8AE] mb-2 font-medium">
                  <span>Sahip Olduğunuz Toplam Altın Miktarı (Gram)</span>
                  <span className="text-[#C8A646] font-mono">1 Gram = {formatTL(gramPrice)}</span>
                </div>
                <input
                  type="number"
                  step="any"
                  min="0"
                  value={zakatGrams || ''}
                  onChange={(e) => setZakatGrams(Math.max(0, parseFloat(e.target.value) || 0))}
                  placeholder="Altın miktarını girin..."
                  className="w-full bg-[#101318] border border-[rgba(244,241,232,0.12)] rounded-xl px-4 py-3 text-lg font-mono text-white focus:border-[#C8A646]"
                />
              </div>

              {/* Quick slider */}
              <div>
                <div className="flex justify-between text-xs text-[#A5A8AE] mb-1 font-mono">
                  <span>Hızlı Seçim:</span>
                  <span>{zakatGrams} Gram</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="500"
                  step="5"
                  value={zakatGrams}
                  onChange={(e) => setZakatGrams(parseInt(e.target.value))}
                  className="w-full accent-[#C8A646] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-[#A5A8AE] mt-1 font-mono">
                  <span>0 gr</span>
                  <span className="text-[#C8A646] font-bold">80.18 gr (Nisap)</span>
                  <span>250 gr</span>
                  <span>500 gr</span>
                </div>
              </div>

              {/* Nisap Info Box */}
              <div className="bg-[#101318] border border-[rgba(244,241,232,0.06)] rounded-xl p-4 text-xs text-[#A5A8AE] space-y-2">
                <div className="flex items-center justify-between">
                  <span>Diyanet Güncel Nisap Miktarı:</span>
                  <strong className="text-white font-mono">80.18 Gram Altın</strong>
                </div>
                <div className="flex items-center justify-between">
                  <span>Anlık Nisap Değeri (TL):</span>
                  <strong className="text-[#E2C76A] font-mono">{formatTL(nisapTL)}</strong>
                </div>
                <div className="text-[11px] text-[#A5A8AE]/80 pt-1 border-t border-[rgba(244,241,232,0.04)]">
                  * 1 kamerî yıl boyunca nisap miktarı (80.18 gr) ve üzeri altına sahip olan kimselerin, toplam altın değerinin 1/40'ını (%2.5) zekat olarak vermesi farzdır.
                </div>
              </div>
            </div>

            {/* Zakat Result Box */}
            <div className="lg:col-span-5 bg-gradient-to-b from-[#101318] to-[#0A0D11] border border-[rgba(244,241,232,0.08)] rounded-2xl p-6 flex flex-col justify-between">
              <div>
                <span className="text-xs uppercase tracking-wider text-[#A5A8AE] block mb-2 font-medium">
                  Zekat Durumu & Hesaplanan Tutar
                </span>

                {isZakatObligatory ? (
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-semibold mb-4">
                    <CheckCircle2 className="w-4 h-4" />
                    Zekat Verme Yükümlülüğü Mevcut (Nisap Aşıldı)
                  </div>
                ) : (
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 text-xs font-semibold mb-4">
                    <AlertCircle className="w-4 h-4" />
                    Nisap Altında (Zekat Farz Değil)
                  </div>
                )}

                <div className="space-y-3 mb-6 text-xs text-[#A5A8AE]">
                  <div className="flex justify-between">
                    <span>Toplam Altın Değeri:</span>
                    <strong className="text-white font-mono">{formatTL(userTotalGoldTL)}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Zekat Oranı:</span>
                    <strong className="text-[#C8A646] font-mono">%2.50 (1/40)</strong>
                  </div>
                </div>

                <div className="bg-[#14181E] border border-[#C8A646]/30 rounded-xl p-4">
                  <span className="text-[11px] uppercase tracking-wider text-[#A5A8AE] block mb-1">
                    Ödenmesi Gereken Zekat Tutarı
                  </span>
                  <div className="text-3xl font-bold font-mono text-[#E2C76A]">
                    {formatTL(zakatDueTL)}
                  </div>
                  <div className="text-xs text-[#A5A8AE] mt-1 font-mono">
                    ≈ {(zakatGrams * 0.025).toFixed(2)} Gram Saf Altın
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-[rgba(244,241,232,0.06)] text-[11px] text-[#A5A8AE]">
                Zekatınızı dilerseniz doğrudan altın cinsinden veya güncel bursa serbest piyasa alış/satış ortalamasıyla nakit olarak ödeyebilirsiniz.
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Wedding Jewelry Planner */}
        {activeTab === 'wedding' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-[#14181E] border border-[rgba(244,241,232,0.08)] rounded-3xl p-6 sm:p-8 shadow-2xl">
            <div className="lg:col-span-7 space-y-4">
              {/* Kolye Seti */}
              <div className="flex items-center justify-between p-3.5 bg-[#101318] rounded-xl border border-[rgba(244,241,232,0.06)]">
                <div>
                  <div className="font-semibold text-white text-xs sm:text-sm">22 Ayar Trabzon / Kolye Seti</div>
                  <div className="text-xs text-[#A5A8AE] font-mono">₺{bilezikItem.sellingPrice.toFixed(2)} / gr</div>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min="0"
                    value={necklaceGrams}
                    onChange={(e) => setNecklaceGrams(parseFloat(e.target.value) || 0)}
                    className="w-20 bg-[#14181E] border border-[rgba(244,241,232,0.1)] rounded-lg px-2.5 py-1.5 text-xs text-white text-right font-mono"
                  />
                  <span className="text-xs text-[#A5A8AE]">gr</span>
                </div>
              </div>

              {/* Bilezikler */}
              <div className="flex items-center justify-between p-3.5 bg-[#101318] rounded-xl border border-[rgba(244,241,232,0.06)]">
                <div>
                  <div className="font-semibold text-white text-xs sm:text-sm">22 Ayar Bilezik (Ajda / Burma)</div>
                  <div className="text-xs text-[#A5A8AE]">Bilezik başı: {braceletGramsEach} gram</div>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min="0"
                    value={braceletCount}
                    onChange={(e) => setBraceletCount(parseInt(e.target.value) || 0)}
                    className="w-16 bg-[#14181E] border border-[rgba(244,241,232,0.1)] rounded-lg px-2.5 py-1.5 text-xs text-white text-right font-mono"
                  />
                  <span className="text-xs text-[#A5A8AE]">adet</span>
                </div>
              </div>

              {/* Çeyrek Altınlar */}
              <div className="flex items-center justify-between p-3.5 bg-[#101318] rounded-xl border border-[rgba(244,241,232,0.06)]">
                <div>
                  <div className="font-semibold text-white text-xs sm:text-sm">Çeyrek Altın (Hediye & Takı)</div>
                  <div className="text-xs text-[#A5A8AE] font-mono">{formatTL(ceyrekItem.sellingPrice)} / adet</div>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min="0"
                    value={quarterCount}
                    onChange={(e) => setQuarterCount(parseInt(e.target.value) || 0)}
                    className="w-16 bg-[#14181E] border border-[rgba(244,241,232,0.1)] rounded-lg px-2.5 py-1.5 text-xs text-white text-right font-mono"
                  />
                  <span className="text-xs text-[#A5A8AE]">adet</span>
                </div>
              </div>

              {/* Yarım & Tam */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3.5 bg-[#101318] rounded-xl border border-[rgba(244,241,232,0.06)] flex items-center justify-between">
                  <span className="text-xs text-white font-medium">Yarım Altın</span>
                  <input
                    type="number"
                    min="0"
                    value={halfCount}
                    onChange={(e) => setHalfCount(parseInt(e.target.value) || 0)}
                    className="w-14 bg-[#14181E] border border-[rgba(244,241,232,0.1)] rounded-lg px-2 py-1 text-xs text-white text-right font-mono"
                  />
                </div>
                <div className="p-3.5 bg-[#101318] rounded-xl border border-[rgba(244,241,232,0.06)] flex items-center justify-between">
                  <span className="text-xs text-white font-medium">Tam / Cumhuriyet</span>
                  <input
                    type="number"
                    min="0"
                    value={fullCount}
                    onChange={(e) => setFullCount(parseInt(e.target.value) || 0)}
                    className="w-14 bg-[#14181E] border border-[rgba(244,241,232,0.1)] rounded-lg px-2 py-1 text-xs text-white text-right font-mono"
                  />
                </div>
              </div>
            </div>

            {/* Wedding Total Box */}
            <div className="lg:col-span-5 bg-gradient-to-b from-[#101318] to-[#0A0D11] border border-[rgba(244,241,232,0.08)] rounded-2xl p-6 flex flex-col justify-between">
              <div>
                <span className="text-xs uppercase tracking-wider text-[#A5A8AE] block mb-2 font-medium">
                  Tahmini Toplam Takı Bütçesi
                </span>

                <div className="bg-[#14181E] border border-[#C8A646]/30 rounded-xl p-4 mb-4">
                  <span className="text-[11px] uppercase tracking-wider text-[#A5A8AE] block mb-1">
                    Bursa Kapalı Çarşı Güncel Değeri
                  </span>
                  <div className="text-3xl font-bold font-mono text-[#E2C76A]">
                    {formatTL(totalWeddingCost)}
                  </div>
                </div>

                <div className="space-y-2 text-xs text-[#A5A8AE]">
                  <div className="flex justify-between">
                    <span>Toplam Bilezik Ağırlığı:</span>
                    <strong className="text-white font-mono">{braceletCount * braceletGramsEach} gram</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Toplam Sikke Adedi:</span>
                    <strong className="text-white font-mono">{quarterCount + halfCount + fullCount} adet</strong>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-[rgba(244,241,232,0.06)] text-[11px] text-[#A5A8AE]">
                * İşçiliksiz ajda ve burma bileziklerde bu maliyet net geçerlidir. Fantezi ve taşlı modellerde kuyumcular işçilik primi ilave eder.
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
