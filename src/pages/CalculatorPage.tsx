import React, { useState, useMemo } from 'react';
import { GoldCalculator } from '../components/GoldCalculator';
import { ZakatWeddingCalculator } from '../components/ZakatWeddingCalculator';
import { useGold } from '../context/GoldContext';
import { Link } from '../components/Link';
import { formatTL } from '../data/goldData';
import { 
  Calculator, 
  Coins, 
  Heart, 
  Scale, 
  HelpCircle, 
  Info, 
  Sparkles, 
  ArrowRight, 
  Briefcase, 
  Table, 
  MapPin,
  TrendingUp,
  ShieldCheck,
  Flame,
  ArrowDownRight,
  Landmark,
  CheckCircle2
} from 'lucide-react';

export const CalculatorPage: React.FC = () => {
  const { items } = useGold();
  const [activeTab, setActiveTab] = useState<'convert' | 'zakat' | 'wedding' | 'hurda' | 'arbitraj'>('convert');

  // Scrap / Hurda Calculator State
  const [hurdaGrams, setHurdaGrams] = useState<number>(25);
  const [hurdaKarat, setHurdaKarat] = useState<'22' | '18' | '14'>('22');

  // Arbitrage / Bank Spread Calculator State
  const [arbitrageGrams, setArbitrageGrams] = useState<number>(50);

  const gramItem = items.find(i => i.id === 'gram-altin') || items[0];
  const bilezikItem = items.find(i => i.id === '22-ayar-bilezik') || items[1];

  // Hurda calculation
  const hurdaResult = useMemo(() => {
    const purePrice = gramItem.buyingPrice;
    let purity = 0.916; // 22K
    if (hurdaKarat === '18') purity = 0.750;
    if (hurdaKarat === '14') purity = 0.585;

    const hasGramEquivalent = hurdaGrams * purity;
    // Sarraf fire deduction is typically 0.5% - 1% on melt
    const fireLoss = hasGramEquivalent * 0.006;
    const netHasGrams = hasGramEquivalent - fireLoss;
    const totalCash = netHasGrams * purePrice;

    return {
      hasGramEquivalent,
      fireLoss,
      netHasGrams,
      totalCash
    };
  }, [hurdaGrams, hurdaKarat, gramItem]);

  // Arbitrage calculation
  const arbitrageResult = useMemo(() => {
    const charsiBuyPrice = gramItem.buyingPrice;
    // Typical Turkish banks pay ~2.8% to 3.5% less on buy quotes due to wider spreads
    const estimatedBankBuyPrice = charsiBuyPrice * 0.972;
    
    const charsiTotal = arbitrageGrams * charsiBuyPrice;
    const bankTotal = arbitrageGrams * estimatedBankBuyPrice;
    const netSaving = charsiTotal - bankTotal;

    return {
      charsiBuyPrice,
      estimatedBankBuyPrice,
      charsiTotal,
      bankTotal,
      netSaving
    };
  }, [arbitrageGrams, gramItem]);

  return (
    <div className="min-h-screen bg-[#080A0D] py-8 sm:py-12">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        
        {/* Page Hero Header */}
        <div className="mb-10 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-[#E2C76A] uppercase tracking-wider mb-3">
            <Calculator className="w-4 h-4 text-[#C8A646]" />
            <span>Bursa Kapalı Çarşı Finansal Hesaplama Masası</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#F4F1E8] tracking-tight mb-4 text-balance">
            Bursa Altın Hesaplama & Planlama Terminali
          </h1>

          <p className="text-sm sm:text-base text-[#A5A8AE] leading-relaxed">
            Canlı serbest piyasa kurlarıyla gram-TL çevirisi yapın, Diyanet 80.18 gram nisap sınırına göre altın zekatınızı hesaplayın, düğün takı sepetinizi bütçeleyin veya eski bileziğinizi hurda fire kesintisiz nakde dönüştürün.
          </p>

          {/* Clean Semantic Interlinks */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 mt-6 font-mono text-xs">
            <Link 
              to="/" 
              className="px-3.5 py-2 rounded-xl bg-[#101318] border border-[rgba(244,241,232,0.1)] text-[#A5A8AE] hover:text-[#E2C76A] hover:border-[#C8A646]/40 transition-colors flex items-center gap-1.5"
            >
              <Table className="w-3.5 h-3.5 text-[#C8A646]" />
              <span>Canlı Piyasa Fiyatları</span>
            </Link>
            <Link 
              to="/altin-turleri" 
              className="px-3.5 py-2 rounded-xl bg-[#101318] border border-[rgba(244,241,232,0.1)] text-[#A5A8AE] hover:text-[#E2C76A] hover:border-[#C8A646]/40 transition-colors flex items-center gap-1.5"
            >
              <Coins className="w-3.5 h-3.5 text-[#C8A646]" />
              <span>Ayar & Milyem Ansiklopedisi</span>
            </Link>
            <Link 
              to="/kuyumcular" 
              className="px-3.5 py-2 rounded-xl bg-[#101318] border border-[rgba(244,241,232,0.1)] text-[#A5A8AE] hover:text-[#E2C76A] hover:border-[#C8A646]/40 transition-colors flex items-center gap-1.5"
            >
              <MapPin className="w-3.5 h-3.5 text-[#C8A646]" />
              <span>Bursa Sarraflar Listesi</span>
            </Link>
          </div>
        </div>

        {/* 5-Option FinTech Tab Switcher */}
        <div className="flex items-center justify-center gap-2 max-w-4xl mx-auto mb-10 p-1.5 bg-[#0E1117] border border-[rgba(244,241,232,0.08)] rounded-2xl overflow-x-auto shadow-lg">
          <button
            onClick={() => setActiveTab('convert')}
            className={`flex-1 py-2.5 px-3 text-xs font-semibold rounded-xl transition-all whitespace-nowrap flex items-center justify-center gap-1.5 cursor-pointer ${
              activeTab === 'convert'
                ? 'bg-[#C8A646] text-[#080A0D] shadow-md font-bold'
                : 'text-[#A5A8AE] hover:text-white hover:bg-[#141820]'
            }`}
          >
            <Calculator className="w-3.5 h-3.5" />
            <span>Canlı Çevirici</span>
          </button>

          <button
            onClick={() => setActiveTab('zakat')}
            className={`flex-1 py-2.5 px-3 text-xs font-semibold rounded-xl transition-all whitespace-nowrap flex items-center justify-center gap-1.5 cursor-pointer ${
              activeTab === 'zakat'
                ? 'bg-[#C8A646] text-[#080A0D] shadow-md font-bold'
                : 'text-[#A5A8AE] hover:text-white hover:bg-[#141820]'
            }`}
          >
            <Scale className="w-3.5 h-3.5" />
            <span>Zekat & 80.18g Nisap</span>
          </button>

          <button
            onClick={() => setActiveTab('wedding')}
            className={`flex-1 py-2.5 px-3 text-xs font-semibold rounded-xl transition-all whitespace-nowrap flex items-center justify-center gap-1.5 cursor-pointer ${
              activeTab === 'wedding'
                ? 'bg-[#C8A646] text-[#080A0D] shadow-md font-bold'
                : 'text-[#A5A8AE] hover:text-white hover:bg-[#141820]'
            }`}
          >
            <Heart className="w-3.5 h-3.5" />
            <span>Düğün Takı Bütçesi</span>
          </button>

          <button
            onClick={() => setActiveTab('hurda')}
            className={`flex-1 py-2.5 px-3 text-xs font-semibold rounded-xl transition-all whitespace-nowrap flex items-center justify-center gap-1.5 cursor-pointer ${
              activeTab === 'hurda'
                ? 'bg-[#C8A646] text-[#080A0D] shadow-md font-bold'
                : 'text-[#A5A8AE] hover:text-white hover:bg-[#141820]'
            }`}
          >
            <Flame className="w-3.5 h-3.5" />
            <span>Eski Bilezik / Hurda Fire</span>
          </button>

          <button
            onClick={() => setActiveTab('arbitraj')}
            className={`flex-1 py-2.5 px-3 text-xs font-semibold rounded-xl transition-all whitespace-nowrap flex items-center justify-center gap-1.5 cursor-pointer ${
              activeTab === 'arbitraj'
                ? 'bg-[#C8A646] text-[#080A0D] shadow-md font-bold'
                : 'text-[#A5A8AE] hover:text-white hover:bg-[#141820]'
            }`}
          >
            <Landmark className="w-3.5 h-3.5" />
            <span>Banka vs Çarşı Tasarrufu</span>
          </button>
        </div>

        {/* Tab 1: Live Converter */}
        {activeTab === 'convert' && (
          <div className="mb-14">
            <GoldCalculator />
          </div>
        )}

        {/* Tab 2 & 3: Zakat & Wedding Calculator */}
        {(activeTab === 'zakat' || activeTab === 'wedding') && (
          <div className="mb-14">
            <ZakatWeddingCalculator />
          </div>
        )}

        {/* Tab 4: Hurda Bilezik & Fire Dönüşüm Hesaplayıcı (Solves real user pain!) */}
        {activeTab === 'hurda' && (
          <div className="mb-14 bg-[#0E1117] border border-[rgba(200,166,70,0.25)] rounded-2xl p-6 sm:p-8 max-w-4xl mx-auto shadow-2xl">
            <div className="flex items-center gap-2 text-xs font-mono text-[#E2C76A] uppercase tracking-wider mb-2">
              <Flame className="w-4 h-4 text-[#C8A646]" />
              <span>Bursa Sarrafları Hurda Bozdurma Standardı</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-white mb-2">
              Eski / Kırık 22 Ayar Bilezik Hurda Bozdurma Hesaplayıcı
            </h2>
            <p className="text-xs sm:text-sm text-[#A5A8AE] leading-relaxed mb-6">
              Eski veya hasarlı altın takılarınızı Bursa Kapalı Çarşı sarrafına götürdüğünüzde işçilik bedeli düşülür ve net has altın (24 ayar) karşılığı ödenir.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Inputs */}
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-mono text-zinc-300 uppercase tracking-wider mb-2">
                    Altın Ağırlığı (Gram)
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="1000"
                    step="0.1"
                    value={hurdaGrams}
                    onChange={(e) => setHurdaGrams(Math.max(0.1, Number(e.target.value)))}
                    className="w-full px-4 py-3 bg-[#07090C] border border-[rgba(244,241,232,0.12)] rounded-xl text-lg font-mono font-bold text-white focus:outline-none focus:border-[#C8A646]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-zinc-300 uppercase tracking-wider mb-2">
                    Takının Ayarı
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: '22', label: '22 Ayar (.916)', desc: 'Bilezik, Trabzon' },
                      { id: '18', label: '18 Ayar (.750)', desc: 'Pırlantalı Takı' },
                      { id: '14', label: '14 Ayar (.585)', desc: 'Zincir, Küpe' }
                    ].map(k => (
                      <button
                        key={k.id}
                        type="button"
                        onClick={() => setHurdaKarat(k.id as any)}
                        className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                          hurdaKarat === k.id
                            ? 'bg-[#C8A646]/20 border-[#C8A646] text-[#E2C76A]'
                            : 'bg-[#07090C] border-[rgba(244,241,232,0.06)] text-zinc-400 hover:text-white'
                        }`}
                      >
                        <div className="text-xs font-bold">{k.label}</div>
                        <div className="text-[10px] text-zinc-500 truncate mt-0.5">{k.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-3 bg-[#07090C] rounded-xl border border-[rgba(244,241,232,0.06)] text-xs text-zinc-400 space-y-1 font-mono">
                  <div className="flex justify-between">
                    <span>Referans 24A Has Alış:</span>
                    <strong className="text-white font-semibold">{formatTL(gramItem.buyingPrice)}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Tahmini Çarşı Fire Payı:</span>
                    <span className="text-amber-400 font-semibold">%0.60 (Bursa Standardı)</span>
                  </div>
                </div>
              </div>

              {/* Output Display */}
              <div className="bg-[#07090C] border border-[rgba(200,166,70,0.3)] rounded-2xl p-6 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider block mb-1">
                    Kapalı Çarşı Sarrafı Nakit Ödemesi
                  </span>
                  <div className="text-3xl sm:text-4xl font-mono font-bold text-[#E2C76A] tabular-nums mb-3">
                    {formatTL(hurdaResult.totalCash)}
                  </div>

                  <div className="space-y-2 pt-3 border-t border-zinc-800 text-xs font-mono">
                    <div className="flex justify-between text-zinc-300">
                      <span>Saf Has Altın Karşılığı:</span>
                      <strong className="text-white">{hurdaResult.hasGramEquivalent.toFixed(2)} gram 24A</strong>
                    </div>
                    <div className="flex justify-between text-zinc-400">
                      <span>Döküm / Eritme Firesi:</span>
                      <span className="text-rose-400">-{hurdaResult.fireLoss.toFixed(2)} gram</span>
                    </div>
                    <div className="flex justify-between text-emerald-400 font-bold pt-1 border-t border-zinc-900">
                      <span>Net Teslim Alacağınız:</span>
                      <span>{hurdaResult.netHasGrams.toFixed(2)} gram Has</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-zinc-800 flex items-center justify-between text-xs">
                  <span className="text-zinc-400">Bursa sarrafında hemen bozdur:</span>
                  <Link
                    to="/kuyumcular"
                    className="text-[#C8A646] hover:text-[#E2C76A] font-bold flex items-center gap-1"
                  >
                    <span>Kuyumcuları Gör</span>
                    <span>→</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 5: Banka vs Kapalı Çarşı Makas Tasarrufu Hesaplayıcı (Direct ROI proof!) */}
        {activeTab === 'arbitraj' && (
          <div className="mb-14 bg-[#0E1117] border border-[rgba(200,166,70,0.25)] rounded-2xl p-6 sm:p-8 max-w-4xl mx-auto shadow-2xl">
            <div className="flex items-center gap-2 text-xs font-mono text-[#E2C76A] uppercase tracking-wider mb-2">
              <Landmark className="w-4 h-4 text-[#C8A646]" />
              <span>Fiziki Altın Arbitraj Hesaplayıcı</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-white mb-2">
              Banka Uygulaması Yerine Bursa Kapalı Çarşı'da Bozdurursanız Ne Kadar Kazanırsınız?
            </h2>
            <p className="text-xs sm:text-sm text-[#A5A8AE] leading-relaxed mb-6">
              Bankalar mobil uygulamalarda %2.5 - %3.5 arasında geniş alım-satım makası ve komisyon keser. Kapalı Çarşı sarraflarında ise makas binde 2 seviyesindedir.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center mb-6">
              <div className="md:col-span-5 space-y-4">
                <label className="block text-xs font-mono text-zinc-300 uppercase tracking-wider">
                  Bozdurulacak Altın Miktarı (Gram)
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min="5"
                    max="500"
                    step="5"
                    value={arbitrageGrams}
                    onChange={(e) => setArbitrageGrams(Number(e.target.value))}
                    className="w-full accent-[#C8A646] cursor-pointer"
                  />
                  <span className="text-lg font-mono font-bold text-white w-20 text-right shrink-0">
                    {arbitrageGrams} gr
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 pt-2">
                  {[20, 50, 100].map(amt => (
                    <button
                      key={amt}
                      type="button"
                      onClick={() => setArbitrageGrams(amt)}
                      className={`py-1.5 rounded-lg text-xs font-mono font-semibold border cursor-pointer ${
                        arbitrageGrams === amt
                          ? 'bg-[#C8A646] text-[#080A0D] border-[#C8A646]'
                          : 'bg-[#07090C] border-zinc-800 text-zinc-400 hover:text-white'
                      }`}
                    >
                      {amt} Gram
                    </button>
                  ))}
                </div>
              </div>

              <div className="md:col-span-7 bg-[#07090C] border border-emerald-500/30 rounded-2xl p-6">
                <div className="flex items-center justify-between text-xs font-mono text-zinc-400 mb-4 pb-3 border-b border-zinc-800">
                  <span>İşlem: {arbitrageGrams} Gram 24A Has Altın Bozdurma</span>
                  <span className="text-emerald-400 font-bold">Kapalı Çarşı Avantajı</span>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-5 font-mono">
                  <div className="p-3 bg-[#12161E] rounded-xl border border-zinc-800">
                    <div className="text-[10px] text-zinc-400 uppercase">Kapalı Çarşı Sarrafı</div>
                    <div className="text-xl font-bold text-emerald-400 mt-1">
                      {formatTL(arbitrageResult.charsiTotal)}
                    </div>
                    <div className="text-[10px] text-zinc-500 mt-0.5">₺{arbitrageResult.charsiBuyPrice.toFixed(0)} / gr</div>
                  </div>

                  <div className="p-3 bg-[#12161E] rounded-xl border border-zinc-800">
                    <div className="text-[10px] text-zinc-400 uppercase">Mobil Banka Hesabı</div>
                    <div className="text-xl font-bold text-zinc-300 mt-1">
                      {formatTL(arbitrageResult.bankTotal)}
                    </div>
                    <div className="text-[10px] text-zinc-500 mt-0.5">₺{arbitrageResult.estimatedBankBuyPrice.toFixed(0)} / gr</div>
                  </div>
                </div>

                <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl flex items-center justify-between font-mono">
                  <div>
                    <span className="text-xs text-emerald-300 block">Cebinizde Kalan Net Ekstra Para:</span>
                    <strong className="text-2xl font-bold text-emerald-400">
                      +{formatTL(arbitrageResult.netSaving)}
                    </strong>
                  </div>
                  <CheckCircle2 className="w-8 h-8 text-emerald-400" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Informative Guidance Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="p-6 bg-[#0E1117] border border-[rgba(244,241,232,0.08)] rounded-2xl">
            <div className="flex items-center gap-2 text-base font-serif font-bold text-[#E2C76A] mb-3">
              <Scale className="w-5 h-5 text-[#C8A646]" />
              <span>Altın Zekatı Nisap Miktarı (80.18 Gram) Nedir?</span>
            </div>
            <p className="text-xs text-[#A5A8AE] leading-relaxed mb-3">
              İslam fıkhına ve Diyanet İşleri Başkanlığı Din İşleri Yüksek Kurulu ölçütlerine göre altın nisap miktarı <strong>80.18 gram</strong> has altındır.
            </p>
            <p className="text-xs text-[#A5A8AE] leading-relaxed">
              Borçlar ve temel ihtiyaçlar haricinde bu miktara veya üzerinde birikime sahip olup üzerinden 1 hicri yıl geçen Müslümanların, birikimlerinin <strong>1/40'ını (%2.5)</strong> zekat olarak vermesi farzdır. Takı amaçlı kullanılan kadın ziynet eşyaları hakkında mezheplerin farklı içtihatları mevcuttur (Hanefi mezhebinde ziynet de zekata tabidir).
            </p>
          </div>

          <div className="p-6 bg-[#0E1117] border border-[rgba(244,241,232,0.08)] rounded-2xl">
            <div className="flex items-center gap-2 text-base font-serif font-bold text-[#E2C76A] mb-3">
              <Coins className="w-5 h-5 text-[#C8A646]" />
              <span>Bursa 22 Ayar Bilezikte İşçilik Kaybı Nasıl Sıfırlanır?</span>
            </div>
            <p className="text-xs text-[#A5A8AE] leading-relaxed mb-3">
              Bursa Kapalı Çarşı'da en çok satılan yatırım bilezikleri "Bursa Burması" ve "Ajda Bilezik"tir. Bu modellerde alış ile satış arasındaki işçilik makası %1 ile %2 arasındadır.
            </p>
            <p className="text-xs text-[#A5A8AE] leading-relaxed">
              Özel taşlı, mineli veya tasarım fantezi bileziklerde ise işçilik maliyeti %15 ila %25'lere çıkabilir ve satarken sadece gram has altın değeri ödenir. Yatırım amaçlı alımlarda daima işçiliksiz şarnelli modeller tercih edilmelidir.
            </p>
          </div>
        </div>

        {/* Cross-Link Hub */}
        <div className="p-6 bg-gradient-to-r from-[#12161E] via-[#161B24] to-[#12161E] border border-[rgba(200,166,70,0.22)] rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="text-base font-serif font-bold text-white mb-1">
              Hesapladığınız Varlıkları Portföyünüze Eklemek İster Misiniz?
            </h4>
            <p className="text-xs text-[#A5A8AE]">
              Altın varlıklarınızı kaydederek anlık kâr/zararınızı ve toplam birikim değerinizi banka gizliliğinde takip edin.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <Link
              to="/portfoy"
              className="px-5 py-2.5 bg-[#C8A646] hover:bg-[#E2C76A] text-[#080A0D] font-bold text-xs rounded-xl transition-colors flex items-center gap-2"
            >
              <span>Portföyümü Aç</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link
              to="/kuyumcular"
              className="px-4 py-2.5 bg-[#07090C] border border-[rgba(244,241,232,0.12)] text-[#F4F1E8] hover:text-[#E2C76A] hover:border-[#C8A646]/40 text-xs font-semibold rounded-xl transition-colors flex items-center gap-1.5"
            >
              <MapPin className="w-3.5 h-3.5 text-[#C8A646]" />
              <span>Bursa Sarrafları</span>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};
