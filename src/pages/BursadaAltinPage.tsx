import React from 'react';
import { BursaContextSection } from '../components/BursaContextSection';
import { BankSpreadComparison } from '../components/BankSpreadComparison';
import { Link } from '../components/Link';
import { 
  Building2, 
  ShieldCheck, 
  MapPin, 
  Award, 
  Clock, 
  Coins, 
  CheckCircle2,
  Table,
  ArrowRight,
  Calculator,
  Compass,
  Landmark,
  Scroll,
  Lock,
  Zap,
  TrendingUp,
  Store
} from 'lucide-react';

export const BursadaAltinPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#080A0D] py-8 sm:py-12">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        
        {/* Page Hero Header */}
        <div className="mb-10 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-[#E2C76A] uppercase tracking-wider mb-3">
            <Building2 className="w-4 h-4 text-[#C8A646]" />
            <span>1339'dan Günümüze 700 Yıllık Sarrafiye Mirası</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#F4F1E8] tracking-tight mb-4 text-balance">
            Bursa'da Altın & Tarihi Kapalı Çarşı Kültürü
          </h1>

          <p className="text-sm sm:text-base text-[#A5A8AE] leading-relaxed">
            Osmanlı İmparatorluğu'nun ilk darphanesine ev sahipliği yapan Bursa'da Tarihi Kapalı Çarşı, Bedesten sarraflarının serbest piyasa dinamikleri, banka makas farkları ve fiziki altın güvencesi.
          </p>

          {/* Clean Navigation Interlinks */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 mt-6 font-mono text-xs">
            <Link 
              to="/" 
              className="px-3.5 py-2 rounded-xl bg-[#101318] border border-[rgba(244,241,232,0.1)] text-[#A5A8AE] hover:text-[#E2C76A] hover:border-[#C8A646]/40 transition-colors flex items-center gap-1.5"
            >
              <Table className="w-3.5 h-3.5 text-[#C8A646]" />
              <span>Canlı Kapalı Çarşı Kurları</span>
            </Link>
            <Link 
              to="/kuyumcular" 
              className="px-3.5 py-2 rounded-xl bg-[#101318] border border-[rgba(244,241,232,0.1)] text-[#A5A8AE] hover:text-[#E2C76A] hover:border-[#C8A646]/40 transition-colors flex items-center gap-1.5"
            >
              <MapPin className="w-3.5 h-3.5 text-[#C8A646]" />
              <span>Kuyumcular & Ulaşım</span>
            </Link>
            <Link 
              to="/hesaplama" 
              className="px-3.5 py-2 rounded-xl bg-[#101318] border border-[rgba(244,241,232,0.1)] text-[#A5A8AE] hover:text-[#E2C76A] hover:border-[#C8A646]/40 transition-colors flex items-center gap-1.5"
            >
              <Calculator className="w-3.5 h-3.5 text-[#C8A646]" />
              <span>Makas Tasarrufu Hesapla</span>
            </Link>
          </div>
        </div>

        {/* 4 Pillars of Bursa Physical Gold Supremacy */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          <div className="p-5 bg-[#0E1117] border border-[rgba(244,241,232,0.08)] rounded-2xl">
            <div className="w-10 h-10 rounded-xl bg-[#C8A646]/15 border border-[#C8A646]/35 flex items-center justify-center text-[#E2C76A] mb-3">
              <Building2 className="w-5 h-5" />
            </div>
            <h3 className="text-base font-serif font-bold text-white mb-1">
              Tarihi Kapalı Çarşı
            </h3>
            <p className="text-xs text-[#A5A8AE] leading-relaxed">
              1339'da Orhan Gazi tarafından temelleri atılan, İpek Yolu'nun Anadolu'daki son ve en görkemli sarrafiye merkezi.
            </p>
          </div>

          <div className="p-5 bg-[#0E1117] border border-[rgba(244,241,232,0.08)] rounded-2xl">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/35 flex items-center justify-center text-emerald-400 mb-3">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-serif font-bold text-white mb-1">
              Fiziki Elden Teslim
            </h3>
            <p className="text-xs text-[#A5A8AE] leading-relaxed">
              Bankaların kaydi ekran rakamları yerine kriz anında elinizde tutabileceğiniz gerçek, damgalı fiziki külçe ve sikke.
            </p>
          </div>

          <div className="p-5 bg-[#0E1117] border border-[rgba(244,241,232,0.08)] rounded-2xl">
            <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/35 flex items-center justify-center text-amber-400 mb-3">
              <Coins className="w-5 h-5" />
            </div>
            <h3 className="text-base font-serif font-bold text-white mb-1">
              En Dar Alış-Satış Makası
            </h3>
            <p className="text-xs text-[#A5A8AE] leading-relaxed">
              Banka kurlarındaki %2.5 - %4'lük fahiş marjlara kıyasla binde 1 ila binde 3 seviyesinde rekabetçi serbest piyasa kuru.
            </p>
          </div>

          <div className="p-5 bg-[#0E1117] border border-[rgba(244,241,232,0.08)] rounded-2xl">
            <div className="w-10 h-10 rounded-xl bg-sky-500/15 border border-sky-500/35 flex items-center justify-center text-sky-400 mb-3">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="text-base font-serif font-bold text-white mb-1">
              BKO Garantisi
            </h3>
            <p className="text-xs text-[#A5A8AE] leading-relaxed">
              Bursa Kuyumcular Odası (BKO) tarafından her ay kalibrasyonu denetlenen mühürlü hassas teraziler ve resmi patent damgaları.
            </p>
          </div>
        </div>

        {/* Bank vs Bursa Kapalı Çarşı Spread Comparison Live Engine */}
        <div className="mb-14">
          <BankSpreadComparison />
        </div>

        {/* 700-Year Historical Timeline of Bursa Gold Trading */}
        <div className="bg-[#0E1117] border border-[rgba(244,241,232,0.08)] rounded-2xl p-6 sm:p-8 mb-14">
          <div className="max-w-3xl mb-8">
            <span className="text-xs font-mono uppercase tracking-wider text-[#E2C76A] font-semibold flex items-center gap-1.5">
              <Scroll className="w-4 h-4 text-[#C8A646]" />
              Osmanlı Darphane Tarihi
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white mt-1">
              İlk Osmanlı Altın Sikkesinden Günümüz Serbest Piyasasına
            </h2>
            <p className="text-xs sm:text-sm text-[#A5A8AE] mt-2 leading-relaxed">
              Bursa, yalnızca bir tekstil kenti değil; Osmanlı Devleti'nin para basım merkezi ve finansal başkentidir.
            </p>
          </div>

          <div className="space-y-6 relative before:absolute before:inset-0 before:left-3.5 before:w-0.5 before:bg-[rgba(244,241,232,0.08)]">
            <div className="relative pl-9">
              <span className="absolute left-2 top-1 w-3.5 h-3.5 rounded-full bg-[#C8A646] ring-4 ring-[#080A0D]" />
              <div className="text-xs font-mono text-[#E2C76A] font-bold">1326 - 1339: İlk Darphane ve Emir Han</div>
              <h4 className="text-sm font-bold text-white mt-0.5">Bursa Hisar İçi İlk Osmanlı Sikkesi</h4>
              <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                Orhan Gazi döneminde Bursa'nın fethinin ardından Hisar bölgesinde ilk Osmanlı darphanesi kuruldu. Emir Han (Bey Hanı) inşa edilerek sarrafların ve kervan tüccarlarının altın takası tek bir merkezde toplandı.
              </p>
            </div>

            <div className="relative pl-9">
              <span className="absolute left-2 top-1 w-3.5 h-3.5 rounded-full bg-[#C8A646] ring-4 ring-[#080A0D]" />
              <div className="text-xs font-mono text-[#E2C76A] font-bold">1453: Cevahir Bedesteni'nin İnşası</div>
              <h4 className="text-sm font-bold text-white mt-0.5">Yangına ve Yağmaya Karşı Çelik Kasalar</h4>
              <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                Fatih Sultan Mehmet döneminde kurulan Cevahir Bedesteni, 14 kubbeli kalın taş duvarları ve demir kepenkli mahzenleriyle Bursa sarraflarının kıymetli madenlerini ve yabancı tüccarların rehinlerini muhafaza ettiği güvenli liman oldu.
              </p>
            </div>

            <div className="relative pl-9">
              <span className="absolute left-2 top-1 w-3.5 h-3.5 rounded-full bg-[#C8A646] ring-4 ring-[#080A0D]" />
              <div className="text-xs font-mono text-[#E2C76A] font-bold">1958: Büyük Bursa Kapalı Çarşı Yangını & Yeniden Doğuş</div>
              <h4 className="text-sm font-bold text-white mt-0.5">Modern Sarraflar Çarşısı'nın Temelleri</h4>
              <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                Büyük yangında ahşap çarşılar kül olmasına rağmen, Bedesten'in taş mahzenlerindeki altınlar zarar görmedi. 1960'larda yeniden modern mimariyle inşa edilen Sarraflar Caddesi, bugünkü 140'tan fazla sarraf dükkanına kavuştu.
              </p>
            </div>

            <div className="relative pl-9">
              <span className="absolute left-2 top-1 w-3.5 h-3.5 rounded-full bg-emerald-500 ring-4 ring-[#080A0D]" />
              <div className="text-xs font-mono text-emerald-400 font-bold">2026: Dijital & Fiziki Entegrasyon</div>
              <h4 className="text-sm font-bold text-white mt-0.5">Bursa Altın Fiyatları Terminali</h4>
              <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                Bugün Bursa Kapalı Çarşı, saniyelik Borsa İstanbul ve küresel spot ons paritesiyle entegre olarak Güney Marmara'nın en likit altın takas merkezi konumundadır.
              </p>
            </div>
          </div>
        </div>

        {/* Step-by-Step Guide: How to Buy Physical Gold in Bursa Kapalı Çarşı */}
        <div className="bg-gradient-to-br from-[#12161E] via-[#0E1117] to-[#0A0D12] border border-[rgba(200,166,70,0.25)] rounded-2xl p-6 sm:p-8 mb-14">
          <div className="max-w-3xl mb-8">
            <span className="text-xs font-mono uppercase tracking-wider text-[#E2C76A] font-semibold flex items-center gap-1.5">
              <Compass className="w-4 h-4 text-[#C8A646]" />
              Pratik Çarşı Rehberi
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white mt-1">
              Bursa Kapalı Çarşı'da Adım Adım Fiziki Altın Alışverişi
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 mt-2 leading-relaxed">
              İlk kez Kapalı Çarşı'ya gidecek yatırımcılar için sarraf jargonu, pazarlık kuralları ve güvenlik protokolleri:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="p-5 bg-[#07090C] rounded-xl border border-[rgba(244,241,232,0.06)] space-y-2">
              <div className="w-8 h-8 rounded-lg bg-[#C8A646] text-[#080A0D] font-bold text-sm flex items-center justify-center">
                1
              </div>
              <h4 className="text-sm font-bold text-white">"Toptan / Sarraf Kuru" İsteyin</h4>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Dükkana girdiğinizde vitrin perakende fiyatı yerine "Toplu külçe / sarraf alım kotasyonunuz nedir?" diye sorun. 20 gram ve üzeri alımlarda sarraflar ekran toptan fiyatını uygular.
              </p>
            </div>

            <div className="p-5 bg-[#07090C] rounded-xl border border-[rgba(244,241,232,0.06)] space-y-2">
              <div className="w-8 h-8 rounded-lg bg-[#C8A646] text-[#080A0D] font-bold text-sm flex items-center justify-center">
                2
              </div>
              <h4 className="text-sm font-bold text-white">Nakit vs Havale Limitini Kontrol Edin</h4>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Yüksek montanlı altın alımlarında kuyumcunun kurumsal banka IBAN'ına EFT/Havale yapabilirsiniz. Açıklamaya işlem dekont detayını ve alınan altının adet/gramajını eksiksiz yazdırın.
              </p>
            </div>

            <div className="p-5 bg-[#07090C] rounded-xl border border-[rgba(244,241,232,0.06)] space-y-2">
              <div className="w-8 h-8 rounded-lg bg-[#C8A646] text-[#080A0D] font-bold text-sm flex items-center justify-center">
                3
              </div>
              <h4 className="text-sm font-bold text-white">Külçenin Blister Paketini İnceleyin</h4>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Has gram altın alırken IAR (İstanbul Altın Rafinerisi) veya Nadir Gold sertifikalı mühürlü blister ambalajında olmasına, hologramına ve seri numarasına mutlaka dikkat edin.
              </p>
            </div>
          </div>
        </div>

        {/* Existing In-Depth Cultural & Neighborhood Context */}
        <BursaContextSection />

      </div>
    </div>
  );
};
