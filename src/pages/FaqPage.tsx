import React, { useState } from 'react';
import { DataSourceSection } from '../components/DataSourceSection';
import { Link } from '../components/Link';
import { 
  HelpCircle, 
  Coins, 
  Building2, 
  Calculator,
  Table,
  ArrowRight,
  Search,
  ChevronDown,
  ShieldCheck,
  CreditCard,
  FileText,
  BadgeAlert,
  Landmark,
  Phone
} from 'lucide-react';

interface FaqItem {
  id: string;
  category: 'carsi' | 'guvenlik' | 'arbitraj' | 'mevzuat';
  categoryLabel: string;
  question: string;
  answer: string;
  highlight?: string;
}

const FAQ_ITEMS: FaqItem[] = [
  {
    id: '1',
    category: 'carsi',
    categoryLabel: 'Bursa Çarşı Rehberi',
    question: 'Bursa Kapalı Çarşı kuyumcuları saat kaçta açılıyor ve kapanıyor?',
    answer: 'Bursa Tarihi Kapalı Çarşı, Bedesten ve Sarraflar Çarşısı hafta içi her gün 09:00 - 18:30 saatleri arasında tam seans hizmet verir. Cumartesi günleri ise 09:00 - 15:30 saatleri arasında açıktır. Pazar günleri ise Bursa Kuyumcular Odası (BKO) tarafından belirlenen nöbetçi kuyumcular ile AVM mağazaları (Korupark, Sur Yapı Marka, Zafer Plaza) hizmet sunar.',
    highlight: 'Hafta içi 09:00 - 18:30 / Cumartesi 09:00 - 15:30'
  },
  {
    id: '2',
    category: 'carsi',
    categoryLabel: 'Bursa Çarşı Rehberi',
    question: 'Kapalı Çarşı sarraflarında kredi kartı ile altın alınabilir mi?',
    answer: 'Evet, Bursa sarraflarının birçoğunda kredi kartı POS cihazı mevcuttur. Ancak BDDK mevzuatı gereğince ziynet ve külçe altın alımlarında taksit sayısı sınırlıdır (genellikle 3 veya 4 taksit). Ayrıca kartlı alımlarda bankanın uyguladığı POS komisyonu (%2 - %3.5) sarraf tarafından fiyata yansıtılabilir. En avantajlı fiyat daima nakit veya anlık banka havalesiyle alınır.',
    highlight: 'Kredi kartı geçerlidir fakat nakit veya havale %3 daha karlı'
  },
  {
    id: '3',
    category: 'arbitraj',
    categoryLabel: 'Banka Makası & Arbitraj',
    question: 'Bursa Kapalı Çarşı altın fiyatları neden banka uygulamalarından daha avantajlıdır?',
    answer: 'Bankalar dijital altın işlemlerinde mesai saatleri dışında ve volatil dönemlerde alım-satım makasını %3 ila %5 arasına kadar açar. Üstelik bankadan fiziki altın talep ettiğinizde teslimat ücreti ve bekleme süresi uygulanır. Bursa Kapalı Çarşı serbest piyasasında ise fiziki altın anında elden teslim edilir ve rekabetçi sarraf piyasası sayesinde makas aralığı binde 1 ila binde 3 seviyesindedir.',
    highlight: 'Kapalı Çarşı makası bankalardan %90 daha dardır'
  },
  {
    id: '4',
    category: 'guvenlik',
    categoryLabel: 'Sahtecilik & Ayar Güvenliği',
    question: 'Sahte çeyrek veya gram altın nasıl anlaşılır? Nelere dikkat edilmelidir?',
    answer: 'Gerçek altın manyetik değildir; güçlü bir mıknatıs altını çekiyorsa sahtedir. İkincisi ağırlık testidir: Bir çeyrek altın tam 1.754 gram, Cumhuriyet altını 7.216 gram gelmelidir. Üçüncüsü Darphane mührüdür; kabartmaların net ve kenar tırtıklarının kusursuz olması gerekir. Has gram külçe alırken ise mutlaka İAR veya Nadir Gold hologramlı blister paketli ve barkodlu olanlar tercih edilmelidir.',
    highlight: 'Mıknatıs testi + 1.754g hassas terazi tartımı en garantili yöntemdir'
  },
  {
    id: '5',
    category: 'carsi',
    categoryLabel: 'Bursa Çarşı Rehberi',
    question: 'Yeni tarihli çeyrek ile eski tarihli çeyrek arasında fark var mı?',
    answer: 'Gramaj, 22 ayar saflık ve içindeki has altın miktarı bakımından yeni ve eski çeyrek arasında zerre kadar fark yoktur. Ancak piyasa geleneği olarak kuyumcular yeni tarihli çeyreği satarken 20-40 TL daha pahalıya satar. Önemli nokta: Bozdururken (sarrafa satarken) her iki altın da KURUŞU KURUŞUNA AYNI FİYATTAN satın alınır. Yatırım için alıyorsanız eski tarihli almanız daha karlıdır.',
    highlight: 'Bozdururken aynı paradır; yatırım için eski tarihli tercih edin'
  },
  {
    id: '6',
    category: 'mevzuat',
    categoryLabel: 'Düğün, Takı & Vergi Mevzuatı',
    question: 'Kuyumcudan altın alırken kimlik ibrazı (MASAK) sınırı ne kadardır?',
    answer: 'Mali Suçları Araştırma Kurulu (MASAK) mevzuatı gereğince, kuyumcularda belirli tutarı aşan nakit alım-satım işlemlerinde kimlik tespiti ve fotokopisi alınması yasal zorunluluktur. Ayrıca vergi mevzuatı gereğince her kuyumcu satışında fatura veya perakende satış fişi düzenlemekle yükümlüdür.',
    highlight: 'Yüksek montanlı işlemlerde kimlik ve fatura zorunludur'
  },
  {
    id: '7',
    category: 'mevzuat',
    categoryLabel: 'Düğün, Takı & Vergi Mevzuatı',
    question: 'Düğün için takı alırken işçilik kaybı yaşamamak için ne yapılmalıdır?',
    answer: 'Yatırım amacıyla alınacak takılarda kesinlikle 22 ayar Bursa Burması, Ajda bilezik veya düz ray bilezik tercih edilmelidir. Taşlı, mineli, fantezi veya Trabzon hasırı takılarda %15-%25 işçilik kesintisi yapılırken; düz Bursa burmasında işçilik kaybı yalnızca %1 civarındadır.',
    highlight: 'Düz Bursa burması ve Ajda bilezikte işçilik kaybı sadece %1\'dir'
  },
  {
    id: '8',
    category: 'carsi',
    categoryLabel: 'Bursa Çarşı Rehberi',
    question: 'Pazar günü Bursa\'da açık nöbetçi kuyumcuları nereden öğrenebilirim?',
    answer: 'Bursa Kuyumcular Odası her hafta sonu Osmangazi, Nilüfer ve Yıldırım ilçeleri için nöbetçi sarraf listesi yayınlar. Ayrıca FSM Bulvarı, Özlüce bulvarı ve Bursa AVM\'lerinde (Sur Yapı Marka, Zafer Plaza, Korupark) bulunan kurumsal kuyumcu mağazaları pazar günleri de 10:00 - 22:00 saatleri arasında kesintisiz hizmet verir.',
    highlight: 'AVM mağazaları ve resmi BKO nöbetçi listesi her Pazar açıktır'
  }
];

export const FaqPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({
    '1': true,
    '3': true
  });

  const toggleItem = (id: string) => {
    setOpenItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const filteredFaqs = FAQ_ITEMS.filter(faq => {
    const matchesCat = selectedCategory === 'all' || faq.category === selectedCategory;
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#080A0D] py-8 sm:py-12">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        
        {/* Page Hero Header */}
        <div className="mb-10 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-[#E2C76A] uppercase tracking-wider mb-3">
            <HelpCircle className="w-4 h-4 text-[#C8A646]" />
            <span>Bursa Kapalı Çarşı Bilgi Bankası</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#F4F1E8] tracking-tight mb-4 text-balance">
            Bursa Altın Piyasası Sıkça Sorulan Sorular
          </h1>

          <p className="text-sm sm:text-base text-[#A5A8AE] leading-relaxed">
            Bursa Kapalı Çarşı altın fiyatları, banka makas avantajları, eski-yeni tarih farkı, nöbetçi kuyumcular, kredi kartı komisyonları ve sahte altın tespiti hakkında en çok merak edilen konular.
          </p>

          {/* Clean Navigation Interlinks */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 mt-6 font-mono text-xs">
            <Link 
              to="/" 
              className="px-3.5 py-2 rounded-xl bg-[#101318] border border-[rgba(244,241,232,0.1)] text-[#A5A8AE] hover:text-[#E2C76A] hover:border-[#C8A646]/40 transition-colors flex items-center gap-1.5"
            >
              <Table className="w-3.5 h-3.5 text-[#C8A646]" />
              <span>Canlı Altın Tablosu</span>
            </Link>
            <Link 
              to="/hesaplama" 
              className="px-3.5 py-2 rounded-xl bg-[#101318] border border-[rgba(244,241,232,0.1)] text-[#A5A8AE] hover:text-[#E2C76A] hover:border-[#C8A646]/40 transition-colors flex items-center gap-1.5"
            >
              <Calculator className="w-3.5 h-3.5 text-[#C8A646]" />
              <span>Zekat & Makas Hesapla</span>
            </Link>
            <Link 
              to="/kuyumcular" 
              className="px-3.5 py-2 rounded-xl bg-[#101318] border border-[rgba(244,241,232,0.1)] text-[#A5A8AE] hover:text-[#E2C76A] hover:border-[#C8A646]/40 transition-colors flex items-center gap-1.5"
            >
              <Building2 className="w-3.5 h-3.5 text-[#C8A646]" />
              <span>Bursa Kuyumcular Rehberi</span>
            </Link>
          </div>
        </div>

        {/* Search & Category Filter Controls */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            {[
              { id: 'all', label: 'Tüm Sorular' },
              { id: 'carsi', label: 'Kapalı Çarşı İşlem' },
              { id: 'arbitraj', label: 'Banka vs Çarşı' },
              { id: 'guvenlik', label: 'Sahtecilik & Ayar' },
              { id: 'mevzuat', label: 'Düğün & Mevzuat' }
            ].map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-[#C8A646] text-[#080A0D] shadow-md font-bold'
                    : 'bg-[#101318] text-[#A5A8AE] hover:text-white border border-[rgba(244,241,232,0.08)]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Sorularda anında ara..."
              className="w-full pl-9.5 pr-4 py-2 bg-[#101318] border border-[rgba(244,241,232,0.1)] rounded-xl text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#C8A646]/60 transition-colors"
            />
          </div>
        </div>

        {/* Interactive FAQ Accordion List */}
        <div className="space-y-3.5 mb-14">
          {filteredFaqs.map(item => {
            const isOpen = openItems[item.id];
            return (
              <div
                key={item.id}
                className="bg-[#0E1117] border border-[rgba(244,241,232,0.08)] hover:border-[#C8A646]/30 rounded-2xl overflow-hidden transition-all shadow-sm"
              >
                <button
                  type="button"
                  onClick={() => toggleItem(item.id)}
                  className="w-full p-5 sm:p-6 text-left flex items-start justify-between gap-4 cursor-pointer focus:outline-none"
                >
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono text-[#E2C76A] uppercase tracking-wider block">
                      {item.categoryLabel}
                    </span>
                    <h3 className="text-base sm:text-lg font-serif font-bold text-white">
                      {item.question}
                    </h3>
                  </div>
                  <div className={`p-1.5 rounded-lg bg-[#141820] text-zinc-400 transition-transform shrink-0 mt-1 ${isOpen ? 'rotate-180 text-[#E2C76A]' : ''}`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 sm:px-6 sm:pb-6 pt-0 border-t border-[rgba(244,241,232,0.04)] text-xs sm:text-sm text-zinc-300 leading-relaxed space-y-3">
                    <p className="mt-3">{item.answer}</p>
                    {item.highlight && (
                      <div className="p-3 bg-[#07090C] rounded-xl border border-[rgba(200,166,70,0.2)] flex items-center gap-2 font-mono text-xs text-[#E2C76A]">
                        <ShieldCheck className="w-4 h-4 text-[#C8A646] shrink-0" />
                        <span><strong>Özet Tavsiye:</strong> {item.highlight}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Engine Data Methodology */}
        <div className="mb-14">
          <DataSourceSection />
        </div>

        {/* Cross-Link Hub */}
        <div className="p-6 bg-gradient-to-r from-[#12161E] via-[#161B24] to-[#12161E] border border-[rgba(200,166,70,0.22)] rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="text-base font-serif font-bold text-white mb-1">
              Başka Bir Konuda Bilgiye mi İhtiyacınız Var?
            </h4>
            <p className="text-xs text-[#A5A8AE]">
              Bursa Kuyumcular Odası resmi rehberine veya anlık altın hesaplama araçlarımıza göz atabilirsiniz.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <Link
              to="/hesaplama"
              className="px-5 py-2.5 bg-[#C8A646] hover:bg-[#E2C76A] text-[#080A0D] font-bold text-xs rounded-xl transition-colors flex items-center gap-2"
            >
              <span>Hesaplama Terminali</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link
              to="/kuyumcular"
              className="px-4 py-2.5 bg-[#07090C] border border-[rgba(244,241,232,0.12)] text-[#F4F1E8] hover:text-[#E2C76A] hover:border-[#C8A646]/40 text-xs font-semibold rounded-xl transition-colors flex items-center gap-1.5"
            >
              <Building2 className="w-3.5 h-3.5 text-[#C8A646]" />
              <span>Kuyumcular Rehberi</span>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};
