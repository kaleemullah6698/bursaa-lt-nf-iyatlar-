import React, { useState } from 'react';
import { useGold } from '../context/GoldContext';
import { formatTL, formatNumber } from '../data/goldData';
import { BURSA_BUYING_RULES } from '../data/bursaJewelers';
import { 
  Building2, 
  Scale, 
  TrendingUp, 
  Coins, 
  BadgeCheck, 
  AlertCircle,
  HelpCircle,
  Clock,
  Layers
} from 'lucide-react';

export const BursaMarketAnalysis: React.FC = () => {
  const { items, marketStatus } = useGold();

  const gramAltin = items.find(i => i.slug === 'gram-altin') || items[0];
  const ceyrekAltin = items.find(i => i.slug === 'ceyrek-altin') || items[1];
  const cumhuriyetAltini = items.find(i => i.slug === 'cumhuriyet-altini') || items[5];
  const bilezik = items.find(i => i.slug === '22-ayar-bilezik') || items[6];
  const onsAltin = items.find(i => i.slug === 'ons-altin') || items[12];
  const dolarKuru = items.find(i => i.slug === 'dolar-kuru') || items[13];

  const gramSpread = Math.round((gramAltin.sellingPrice - gramAltin.buyingPrice) * 100) / 100;
  const ceyrekSpread = Math.round((ceyrekAltin.sellingPrice - ceyrekAltin.buyingPrice) * 100) / 100;

  const [activeTab, setActiveTab] = useState<'genel' | 'makas' | 'kurallar'>('genel');

  return (
    <section id="bursa-rehberi" className="py-16 border-b border-white/5 bg-[#090B0E]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section 8: Bugün Bursa'da Altın Fiyatları */}
        <div className="mb-14">
          <div className="flex items-center gap-2 text-xs text-[#9FA3AA] mb-2">
            <span className="text-[#C9A227] font-semibold uppercase tracking-wider text-[11px]">Günlük Piyasa Değerlendirmesi</span>
            <span aria-hidden="true" className="text-[#666C77]">·</span>
            <span>Bursa Kapalı Çarşı Dinamikleri</span>
          </div>
          
          <h2 className="font-cinzel text-2xl sm:text-3xl lg:text-4xl font-bold text-[#F5F1E8] mb-4">
            Bugün Bursa'da Altın Fiyatları
          </h2>

          {/* Dynamic Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Main Editorial Text */}
            <div className="lg:col-span-8 space-y-4 text-sm text-[#9FA3AA] leading-relaxed">
              <p>
                Bursa Kapalı Çarşı ve kuyumcular serbest piyasasında bugün işlem gören 24 ayar <strong className="text-[#F5F1E8]">Gram Altın</strong> alışta <span className="text-[#F5F1E8] font-mono font-medium">{formatTL(gramAltin.buyingPrice)}</span>, satışta ise <span className="text-[#E3C766] font-mono font-medium">{formatTL(gramAltin.sellingPrice)}</span> seviyelerinden el değiştirmektedir. Geleneksel düğün ve yatırım aracı olan <strong className="text-[#F5F1E8]">Yeni Çeyrek Altın</strong> ise Bursa sarraflarında <span className="text-[#F5F1E8] font-mono font-medium">{formatTL(ceyrekAltin.buyingPrice)}</span> alış ve <span className="text-[#E3C766] font-mono font-medium">{formatTL(ceyrekAltin.sellingPrice)}</span> satış fiyatıyla alıcı bulmaktadır.
              </p>

              <p>
                Bursa altın piyasası fiyatlaması; Londra Külçe Piyasası Birliği (LBMA) nezdindeki uluslararası <strong className="text-[#F5F1E8]">Ons Altın</strong> (<span className="font-mono text-[#F5F1E8]">${formatNumber(onsAltin.sellingPrice, 2)}</span>) ve serbest piyasa <strong className="text-[#F5F1E8]">Dolar/TL</strong> kuru (<span className="font-mono text-[#F5F1E8]">{formatNumber(dolarKuru.sellingPrice, 2)} TL</span>) bileşkesi üzerinden matematiksel olarak hesaplanmaktadır.
              </p>

              <div className="bg-[#111419] border-l-2 border-[#C9A227] p-4 my-4 rounded-r-sm">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-[#F5F1E8] mb-1">
                  Gram Altın Fiyat Formülü (Bursa Serbest Piyasa)
                </h3>
                <p className="font-mono text-xs text-[#E3C766]">
                  Gram Altın (TL) = (Ons Fiyatı / 31.1034768) × Dolar/TL Kuru × Saflık Oranı (0.995)
                </p>
                <p className="text-[11px] text-[#666C77] mt-1">
                  Bu teorik has altın tutarının üzerine Bursa Kapalı Çarşı fiziki külçe nakliye, sigorta ve rafineri döküm masrafı eklenmektedir.
                </p>
              </div>

              <p>
                Bursa yerel piyasasında özellikle Tarihi Kapalı Çarşı (Bedesten ve Bakırcılar Çarşısı) bölgesinde fiziki altın arzı ve talebi doğrudan fiyat makasını etkilemektedir. İlkbahar ve yaz aylarında artan düğün merasimleri, fındık/tarım hasat gelirlerinin birikime dönüşmesi ve sanayi şehri olan Bursa'daki tasarruf alışkanlıkları ziynet altınlarına olan yerel ilgiyi canlı tutmaktadır.
              </p>
            </div>

            {/* Live Market Summary Snapshot Card */}
            <div className="lg:col-span-4 bg-[#0E1217] border border-white/8 rounded-sm p-5 space-y-4">
              <div className="border-b border-white/5 pb-3">
                <span className="text-[11px] uppercase tracking-wider text-[#C9A227] font-semibold block">
                  Bursa Piyasa Özeti
                </span>
                <span className="text-xs text-[#666C77]">
                  {marketStatus.statusText} · {marketStatus.turkeyTimeStr}
                </span>
              </div>

              <div className="space-y-3 text-xs">
                <div className="flex justify-between items-center py-1 border-b border-white/5">
                  <span className="text-[#9FA3AA]">Gram Altın Makası:</span>
                  <span className="font-mono font-medium text-[#F5F1E8]">{formatTL(gramSpread)}</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-white/5">
                  <span className="text-[#9FA3AA]">Çeyrek Altın Makası:</span>
                  <span className="font-mono font-medium text-[#F5F1E8]">{formatTL(ceyrekSpread)}</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-white/5">
                  <span className="text-[#9FA3AA]">22 Ayar Bilezik (Gr):</span>
                  <span className="font-mono font-medium text-[#F5F1E8]">{formatTL(bilezik.sellingPrice)}</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-white/5">
                  <span className="text-[#9FA3AA]">Cumhuriyet Altını:</span>
                  <span className="font-mono font-medium text-[#E3C766]">{formatTL(cumhuriyetAltini.sellingPrice)}</span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-[#9FA3AA]">Küresel Ons ($):</span>
                  <span className="font-mono font-medium text-[#F5F1E8]">${formatNumber(onsAltin.sellingPrice, 2)}</span>
                </div>
              </div>

              <div className="pt-2 text-[11px] text-[#666C77] leading-relaxed">
                * Kapalı Çarşı tabelaları gün içinde küresel dalgalanmalara bağlı olarak anlık revize edilir.
              </div>
            </div>

          </div>
        </div>

        {/* Section 9: Bursa Specific Topics with interactive selector */}
        <div className="pt-10 border-t border-white/5">
          <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-[#F5F1E8]">
                Bursa Altın Piyasası Rehberi & Bilgilendirme
              </h3>
              <p className="text-xs text-[#9FA3AA] mt-1">
                Bursa'da altın alırken ve satarken bilmeniz gereken temel dinamikler.
              </p>
            </div>

            {/* Segmented interactive tabs */}
            <div className="flex items-center gap-1 p-1 bg-[#111419] border border-white/8 rounded-sm self-start sm:self-auto">
              <button
                onClick={() => setActiveTab('genel')}
                className={`px-3 py-1.5 text-xs font-medium rounded-sm transition-all cursor-pointer ${
                  activeTab === 'genel' ? 'bg-[#C9A227] text-black font-semibold' : 'text-[#9FA3AA] hover:text-[#F5F1E8]'
                }`}
              >
                Neden Değişir?
              </button>
              <button
                onClick={() => setActiveTab('makas')}
                className={`px-3 py-1.5 text-xs font-medium rounded-sm transition-all cursor-pointer ${
                  activeTab === 'makas' ? 'bg-[#C9A227] text-black font-semibold' : 'text-[#9FA3AA] hover:text-[#F5F1E8]'
                }`}
              >
                Kuyumcu vs Banka Makası
              </button>
              <button
                onClick={() => setActiveTab('kurallar')}
                className={`px-3 py-1.5 text-xs font-medium rounded-sm transition-all cursor-pointer ${
                  activeTab === 'kurallar' ? 'bg-[#C9A227] text-black font-semibold' : 'text-[#9FA3AA] hover:text-[#F5F1E8]'
                }`}
              >
                6 Altın Kural
              </button>
            </div>
          </div>

          {/* Tab 1: Why prices change */}
          {activeTab === 'genel' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 animate-in fade-in duration-200">
              <div className="bg-[#0E1217] border border-white/8 p-5 rounded-sm">
                <div className="p-2 bg-[#C9A227]/10 w-fit rounded-xs text-[#C9A227] mb-3">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <h4 className="font-semibold text-sm text-[#F5F1E8] mb-2">
                  Ons Altın ve Küresel Enflasyon
                </h4>
                <p className="text-xs text-[#9FA3AA] leading-relaxed">
                  ABD Merkez Bankası (Fed) faiz kararları, küresel jeopolitik gerginlikler ve küresel enflasyon beklentileri ons altını yönlendirir. Ons yükseldiğinde Bursa'daki altın fiyatları doğrudan yukarı yönlü tepki verir.
                </p>
              </div>

              <div className="bg-[#0E1217] border border-white/8 p-5 rounded-sm">
                <div className="p-2 bg-[#C9A227]/10 w-fit rounded-xs text-[#C9A227] mb-3">
                  <Coins className="w-5 h-5" />
                </div>
                <h4 className="font-semibold text-sm text-[#F5F1E8] mb-2">
                  Dolar / TL Kuru Etkisi
                </h4>
                <p className="text-xs text-[#9FA3AA] leading-relaxed">
                  Altın Türkiye'ye dolar cinsinden ithal edilir. Dolayısıyla ons altın yerinde saysa bile serbest piyasada Dolar/TL'nin değer kazanması, Bursa kuyumcularındaki gram ve çeyrek altın fiyatlarını anında yukarı çeker.
                </p>
              </div>

              <div className="bg-[#0E1217] border border-white/8 p-5 rounded-sm">
                <div className="p-2 bg-[#C9A227]/10 w-fit rounded-xs text-[#C9A227] mb-3">
                  <Building2 className="w-5 h-5" />
                </div>
                <h4 className="font-semibold text-sm text-[#F5F1E8] mb-2">
                  Yerel Fiziki Talep & Darphane Arzı
                </h4>
                <p className="text-xs text-[#9FA3AA] leading-relaxed">
                  Bursa Kapalı Çarşı'da düğün mevsimlerinde fiziki çeyrek veya cumhuriyet altınında talep yoğunluğu yaşandığında, darphane basım primi ve toptancı makası geçici olarak 20-50 TL civarında genişleyebilir.
                </p>
              </div>
            </div>
          )}

          {/* Tab 2: Kuyumcu vs Banka */}
          {activeTab === 'makas' && (
            <div className="bg-[#0E1217] border border-white/8 p-6 rounded-sm animate-in fade-in duration-200">
              <h4 className="font-semibold text-base text-[#F5F1E8] mb-3">
                Bursa Kuyumcuları ile Banka Altın Hesabı Karşılaştırması
              </h4>
              <p className="text-xs text-[#9FA3AA] mb-4 leading-relaxed">
                Tasarruf sahiplerinin en sık sorduğu soru: "Altını bankadan mı almalıyım yoksa Bursa Kapalı Çarşı'dan fiziki mi almalıyım?"
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="bg-[#12161D] border border-emerald-500/20 p-4 rounded-sm">
                  <div className="flex items-center gap-2 text-emerald-400 font-semibold mb-2">
                    <BadgeCheck className="w-4 h-4" />
                    <span>Bursa Kapalı Çarşı (Fiziki Altın) Avantajları</span>
                  </div>
                  <ul className="space-y-2 text-[#9FA3AA]">
                    <li>• Alış-satış makas farkı genellikle 15 - 30 TL aralığındadır (Daha düşük maliyet).</li>
                    <li>• Fiziki olarak elinizdedir; banka sistemik risklerinden veya binde 2 kambiyo vergisinden muaftır.</li>
                    <li>• Bursa genelindeki yüzlerce kuyumcuda anında nakde çevrilebilir.</li>
                  </ul>
                </div>

                <div className="bg-[#12161D] border border-white/10 p-4 rounded-sm">
                  <div className="flex items-center gap-2 text-[#9FA3AA] font-semibold mb-2">
                    <Scale className="w-4 h-4 text-[#C9A227]" />
                    <span>Banka Altın Hesapları Özellikleri</span>
                  </div>
                  <ul className="space-y-2 text-[#666C77]">
                    <li>• Mobil bankacılıkla 7/24 alım imkanı bulunur ancak mesai dışı makas 100-150 TL'ye çıkabilir.</li>
                    <li>• Kaybolma veya çalınma riski yoktur; ancak fiziki çekimde bankalar ek teslim komisyonu uygular.</li>
                    <li>• Kambiyo Muamele Vergisi (BSMV) alım anında tahakkuk eder.</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Tab 3: 6 Altın Kural */}
          {activeTab === 'kurallar' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 animate-in fade-in duration-200">
              {BURSA_BUYING_RULES.map((rule, idx) => (
                <div key={idx} className="bg-[#0E1217] border border-white/8 p-4 rounded-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-5 h-5 rounded-full bg-[#C9A227]/20 text-[#C9A227] text-xs font-bold flex items-center justify-center font-mono">
                      {idx + 1}
                    </span>
                    <h5 className="font-semibold text-xs text-[#F5F1E8]">
                      {rule.title}
                    </h5>
                  </div>
                  <p className="text-[11px] text-[#9FA3AA] leading-relaxed">
                    {rule.description}
                  </p>
                </div>
              ))}
            </div>
          )}

        </div>

      </div>
    </section>
  );
};
