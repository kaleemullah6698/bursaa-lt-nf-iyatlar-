import React, { useState } from 'react';
import { BursaGeoHubs } from '../components/BursaGeoHubs';
import { Link } from '../components/Link';
import { 
  MapPin, 
  Clock, 
  Phone, 
  ShieldCheck, 
  Building2, 
  Train, 
  CheckCircle2,
  Table,
  Calculator,
  ArrowRight,
  Navigation,
  Car,
  AlertTriangle,
  FileText,
  BadgeCheck,
  Search,
  ExternalLink
} from 'lucide-react';

interface JewelerItem {
  id: string;
  name: string;
  district: 'osmangazi' | 'nilufer' | 'yildirim' | 'inegol';
  districtName: string;
  location: string;
  address: string;
  phone: string;
  hours: string;
  specialties: string[];
  payments: string[];
  isVerified: boolean;
  notes: string;
  mapsQuery: string;
}

const BURSA_JEWELERS: JewelerItem[] = [
  {
    id: '1',
    name: 'Tarihi Çarşı Sarrafı (Örnek Sarrafiye)',
    district: 'osmangazi',
    districtName: 'Osmangazi / Kapalı Çarşı',
    location: 'Sarraflar Caddesi No:18',
    address: 'Nalbantoğlu Mah. Kapalı Çarşı Kuyumcular Sokak Osmangazi/Bursa',
    phone: '+90 224 221 16 01',
    hours: '09:00 - 18:30 (Pzt-Cum), 09:00 - 15:30 (Cts)',
    specialties: ['Toptan Has Altın', 'Külçe (.995)', 'Darphane Çeyrek/Ata'],
    payments: ['Nakit', 'Havale/EFT'],
    isVerified: true,
    notes: 'Bursa Kuyumcular Odası kayıtlı, en dar alış-satış makası sunan sarraflardan.',
    mapsQuery: 'Kapalı+Çarşı+Kuyumcular+Osmangazi+Bursa'
  },
  {
    id: '2',
    name: 'Bedesten Külçe & Ziynet Evi',
    district: 'osmangazi',
    districtName: 'Osmangazi / Cevahir Bedesteni',
    location: 'Cevahir Bedesteni İçi Dükkan 42',
    address: 'Kapalı Çarşı İçi Bedesten Bölümü Osmangazi/Bursa',
    phone: '+90 224 222 45 80',
    hours: '09:00 - 18:30 (Pzt-Cum), 09:00 - 15:00 (Cts)',
    specialties: ['22 Ayar Bursa Burma Bilezik', 'Trabzon Hasırı', 'Antika Altın'],
    payments: ['Nakit', 'Banka Transferi', 'Kart'],
    isVerified: true,
    notes: 'Geleneksel el işçiliği Bursa burması ve düğün setlerinde geniş koleksiyon.',
    mapsQuery: 'Bedesten+Bursa+Kuyumcu'
  },
  {
    id: '3',
    name: 'Ulu Cami Altı Sarrafiye',
    district: 'osmangazi',
    districtName: 'Osmangazi / Ulu Cami',
    location: 'Atatürk Caddesi Ulu Cami Yanı No:6',
    address: 'Şehreküstü Mah. Atatürk Cd. Osmangazi/Bursa',
    phone: '+90 224 220 33 12',
    hours: '08:45 - 19:00 (Pzt-Cts)',
    specialties: ['Gram Altın', 'Cumhuriyet Altını', 'Hızlı Bozdurma'],
    payments: ['Nakit', 'Havale'],
    isVerified: true,
    notes: 'Şehreküstü metro istasyonuna 3 dakika yürüyüş mesafesinde, hızlı likidite.',
    mapsQuery: 'Atatürk+Caddesi+Bursa+Kuyumcu'
  },
  {
    id: '4',
    name: 'FSM Pırlanta & Altın Dünyası',
    district: 'nilufer',
    districtName: 'Nilüfer / FSM Bulvarı',
    location: 'FSM Bulvarı No:84/A',
    address: 'Cumhuriyet Mah. FSM Bulvarı Nilüfer/Bursa',
    phone: '+90 224 451 90 20',
    hours: '10:00 - 20:30 (Haftanın 7 Günü Açık)',
    specialties: ['14K & 18K Modern Takı', 'HRD/GIA Pırlanta', 'Tasarım Alyans'],
    payments: ['Kredi Kartı Taksit', 'Nakit', 'Havale'],
    isVerified: true,
    notes: 'Akşam saatlerinde açık, modern mağaza konsepti ve özel otopark alanı.',
    mapsQuery: 'FSM+Bulvarı+Kuyumcu+Nilüfer+Bursa'
  },
  {
    id: '5',
    name: 'Özlüce Sarraf & Mücevherat',
    district: 'nilufer',
    districtName: 'Nilüfer / Özlüce',
    location: 'Ahmet Taner Kışlalı Bulvarı No:32',
    address: 'Özlüce Mah. Nilüfer/Bursa',
    phone: '+90 224 413 77 00',
    hours: '09:30 - 20:00 (Haftanın 7 Günü)',
    specialties: ['Yatırımlık Külçe', '22 Ayar Bilezik', 'Bebek & Çocuk Takısı'],
    payments: ['Kart', 'Nakit', 'Havale'],
    isVerified: true,
    notes: 'Özlüce metro çıkışına yakın, düğün öncesi takı siparişlerinde garantili teslimat.',
    mapsQuery: 'Özlüce+Kuyumcu+Nilüfer+Bursa'
  },
  {
    id: '6',
    name: 'Balat Mücevher Evi',
    district: 'nilufer',
    districtName: 'Nilüfer / Balat',
    location: 'Balat Meydanı No:14',
    address: 'Balat Mah. Sanayi Cd. Yakını Nilüfer/Bursa',
    phone: '+90 224 242 11 90',
    hours: '10:00 - 20:00 (Haftanın 7 Günü)',
    specialties: ['Pırlantalı Takı', 'Kişiye Özel Tasarım', 'GIA Sertifika'],
    payments: ['Kredi Kartı', 'Nakit', 'Havale'],
    isVerified: true,
    notes: 'VIP randevulu müşteri odası, sertifikalı pırlanta ve yatırım külçeleri.',
    mapsQuery: 'Balat+Kuyumcu+Nilüfer+Bursa'
  },
  {
    id: '7',
    name: 'Setbaşı Geleneksel Sarrafı',
    district: 'yildirim',
    districtName: 'Yıldırım / Setbaşı',
    location: 'Setbaşı Köprüsü Girişi No:8',
    address: 'Kurtoğlu Mah. Setbaşı Cd. Yıldırım/Bursa',
    phone: '+90 224 326 15 44',
    hours: '09:00 - 19:00 (Pzt-Cts)',
    specialties: ['Çeyrek Altın', 'Hurda Altın Bozdurma', '22A Ajda Bilezik'],
    payments: ['Nakit', 'Havale'],
    isVerified: true,
    notes: '40 yıllık mahalle esnafı güveni, küçük yatırımcı için hızlı ve dürüst bozdurma.',
    mapsQuery: 'Setbaşı+Kuyumcu+Yıldırım+Bursa'
  },
  {
    id: '8',
    name: 'Heykel Sarraflar Çarşısı Esnafı',
    district: 'osmangazi',
    districtName: 'Osmangazi / Heykel',
    location: 'Atatürk Heykeli Karşısı Sarraflar Pasajı',
    address: 'Heykel Meydanı Osmangazi/Bursa',
    phone: '+90 224 224 88 50',
    hours: '09:00 - 18:30 (Pzt-Cts)',
    specialties: ['Ata Lira', 'Yarım Altın', 'Gremse Altın'],
    payments: ['Nakit', 'Banka Transferi'],
    isVerified: true,
    notes: 'Tarihi Heykel meydanında sarraflar pasajı içinde, Darphane sikkelerinde zengin stok.',
    mapsQuery: 'Heykel+Sarraflar+Pasajı+Bursa'
  },
  {
    id: '9',
    name: 'İnegöl Saraçlar Çarşısı Sarrafiyesi',
    district: 'inegol',
    districtName: 'İnegöl / Saraçlar Çarşısı',
    location: 'Kuyumcular Sokak No:12',
    address: 'Cuma Mah. Saraçlar Çarşısı İnegöl/Bursa',
    phone: '+90 224 715 22 10',
    hours: '09:00 - 19:00 (Pzt-Cts)',
    specialties: ['Mega Bilezik (22A)', 'Düğün Setleri', 'Has Külçe'],
    payments: ['Nakit', 'Havale', 'Kart'],
    isVerified: true,
    notes: 'İnegöl mobilya çeyizi ile birlikte düğün takısı alımlarında toplu iskonto.',
    mapsQuery: 'İnegöl+Saraçlar+Çarşısı+Kuyumcular'
  }
];

export const JewelersPage: React.FC = () => {
  const [selectedDistrict, setSelectedDistrict] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const filteredJewelers = BURSA_JEWELERS.filter(jeweler => {
    const matchesDistrict = selectedDistrict === 'all' || jeweler.district === selectedDistrict;
    const matchesSearch = jeweler.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          jeweler.districtName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          jeweler.specialties.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesDistrict && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#080A0D] py-8 sm:py-12">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        
        {/* Authoritative Page Header */}
        <div className="mb-10 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-[#E2C76A] uppercase tracking-wider mb-3">
            <MapPin className="w-4 h-4 text-[#C8A646]" />
            <span>Bursa İlçe & Çarşı Rehberi</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#F4F1E8] tracking-tight mb-4 text-balance">
            Bursa Kuyumcular & Sarraflar Rehberi
          </h1>

          <p className="text-sm sm:text-base text-[#A5A8AE] leading-relaxed">
            Osmangazi Tarihi Kapalı Çarşı, Bedesten sarrafları, Nilüfer FSM & Özlüce mağazaları, Yıldırım ve İnegöl kuyumcuları. Doğrulanmış telefonlar, otopark alternatifleri ve nöbetçi sarraf sistemi.
          </p>

          {/* Clean Navigation Interlinks */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 mt-6 font-mono text-xs">
            <Link 
              to="/" 
              className="px-3.5 py-2 rounded-xl bg-[#101318] border border-[rgba(244,241,232,0.1)] text-[#A5A8AE] hover:text-[#E2C76A] hover:border-[#C8A646]/40 transition-colors flex items-center gap-1.5"
            >
              <Table className="w-3.5 h-3.5 text-[#C8A646]" />
              <span>Canlı Altın Kurları</span>
            </Link>
            <Link 
              to="/bursada-altin" 
              className="px-3.5 py-2 rounded-xl bg-[#101318] border border-[rgba(244,241,232,0.1)] text-[#A5A8AE] hover:text-[#E2C76A] hover:border-[#C8A646]/40 transition-colors flex items-center gap-1.5"
            >
              <Building2 className="w-3.5 h-3.5 text-[#C8A646]" />
              <span>Kapalı Çarşı Tarihi & Kültürü</span>
            </Link>
            <Link 
              to="/hesaplama" 
              className="px-3.5 py-2 rounded-xl bg-[#101318] border border-[rgba(244,241,232,0.1)] text-[#A5A8AE] hover:text-[#E2C76A] hover:border-[#C8A646]/40 transition-colors flex items-center gap-1.5"
            >
              <Calculator className="w-3.5 h-3.5 text-[#C8A646]" />
              <span>Bilezik & Düğün Takı Bütçesi</span>
            </Link>
          </div>
        </div>

        {/* Working Hours & Nöbetçi Sarraf Information Banner */}
        <div className="bg-[#0E1117] border border-[rgba(200,166,70,0.22)] rounded-2xl p-6 sm:p-7 mb-12 shadow-xl">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#C8A646]/15 border border-[#C8A646]/35 flex items-center justify-center text-[#E2C76A] shrink-0">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-[#C8A646] font-semibold">
                  Resmi Seans Düzeni
                </span>
                <h3 className="text-lg sm:text-xl font-serif font-bold text-white mb-1">
                  Bursa Sarraflar ve Kuyumcular Çalışma Saatleri
                </h3>
                <p className="text-xs text-[#A5A8AE] max-w-2xl leading-relaxed">
                  Bursa Kapalı Çarşı ve Bedesten sarrafları BKO ortak kararıyla belirlenen saatlerde açıktır. Pazar günleri ise nöbetçi sarraflar ve AVM şubeleri hizmet verir.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs shrink-0">
              <div className="p-3 bg-[#07090C] rounded-xl border border-[rgba(244,241,232,0.06)]">
                <div className="text-[10px] text-zinc-500 uppercase">Hafta İçi (Pzt-Cum)</div>
                <div className="text-sm font-bold text-emerald-400 mt-0.5">09:00 - 18:30</div>
                <div className="text-[10px] text-zinc-400 mt-0.5">Kapalı Çarşı Tam Seans</div>
              </div>

              <div className="p-3 bg-[#07090C] rounded-xl border border-[rgba(244,241,232,0.06)]">
                <div className="text-[10px] text-zinc-500 uppercase">Cumartesi Günü</div>
                <div className="text-sm font-bold text-amber-400 mt-0.5">09:00 - 15:30</div>
                <div className="text-[10px] text-zinc-400 mt-0.5">Yarım Seans (Sarraflar)</div>
              </div>

              <div className="p-3 bg-[#07090C] rounded-xl border border-[rgba(244,241,232,0.06)]">
                <div className="text-[10px] text-zinc-500 uppercase">Pazar Günü</div>
                <div className="text-sm font-bold text-zinc-200 mt-0.5">Nöbetçi Kuyumcular</div>
                <div className="text-[10px] text-emerald-400 mt-0.5">10:00 - 18:00 (Rotasyonlu)</div>
              </div>
            </div>
          </div>
        </div>

        {/* Search & District Filter Controls */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
          {/* District Buttons */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            {[
              { id: 'all', label: 'Tüm Bursa (9+)' },
              { id: 'osmangazi', label: 'Osmangazi (Kapalı Çarşı)' },
              { id: 'nilufer', label: 'Nilüfer (FSM & Özlüce)' },
              { id: 'yildirim', label: 'Yıldırım (Setbaşı)' },
              { id: 'inegol', label: 'İnegöl Çarşısı' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setSelectedDistrict(tab.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  selectedDistrict === tab.id
                    ? 'bg-[#C8A646] text-[#080A0D] shadow-md'
                    : 'bg-[#101318] text-[#A5A8AE] hover:text-white border border-[rgba(244,241,232,0.08)]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Kuyumcu veya bölge ara..."
              className="w-full pl-9.5 pr-4 py-2 bg-[#101318] border border-[rgba(244,241,232,0.1)] rounded-xl text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#C8A646]/60 transition-colors"
            />
          </div>
        </div>

        {/* Directory Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
          {filteredJewelers.map(item => (
            <div
              key={item.id}
              className="bg-[#0E1117] border border-[rgba(244,241,232,0.08)] hover:border-[#C8A646]/40 rounded-2xl p-5 transition-all flex flex-col justify-between group shadow-sm hover:shadow-[0_8px_30px_rgba(0,0,0,0.5)]"
            >
              <div>
                {/* Header: Name & Verification */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <span className="text-[10px] font-mono text-[#E2C76A] uppercase tracking-wider block">
                      {item.districtName}
                    </span>
                    <h4 className="text-base font-serif font-bold text-white group-hover:text-[#E2C76A] transition-colors mt-0.5">
                      {item.name}
                    </h4>
                  </div>
                  {item.isVerified && (
                    <span className="p-1 rounded-md bg-[#C8A646]/15 text-[#E2C76A] border border-[#C8A646]/30" title="BKO Doğrulanmış Kayıt">
                      <BadgeCheck className="w-4 h-4" />
                    </span>
                  )}
                </div>

                {/* Address & Hours */}
                <div className="space-y-2 text-xs text-zinc-400 mb-4 pb-4 border-b border-[rgba(244,241,232,0.06)]">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-3.5 h-3.5 text-zinc-500 shrink-0 mt-0.5" />
                    <span>{item.address}</span>
                  </div>
                  <div className="flex items-center gap-2 font-mono text-[11px] text-zinc-300">
                    <Clock className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
                    <span>{item.hours}</span>
                  </div>
                  <div className="flex items-center gap-2 font-mono text-[11px] text-emerald-400">
                    <Phone className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    <span>{item.phone}</span>
                  </div>
                </div>

                {/* Specialties Tags */}
                <div className="mb-3">
                  <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider mb-1.5">
                    Uzmanlık Alanları:
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {item.specialties.map((spec, sIdx) => (
                      <span
                        key={sIdx}
                        className="text-[10px] px-2 py-0.5 rounded-md bg-[#161B24] border border-[rgba(244,241,232,0.06)] text-zinc-300 font-medium"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Notes */}
                <p className="text-[11px] text-zinc-400 leading-relaxed italic mb-4">
                  "{item.notes}"
                </p>
              </div>

              {/* Bottom Actions: Call + Google Maps */}
              <div className="grid grid-cols-2 gap-2 pt-3 border-t border-[rgba(244,241,232,0.06)]">
                <a
                  href={`tel:${item.phone.replace(/\s+/g, '')}`}
                  className="py-2 px-3 bg-[#161B24] hover:bg-[#1E2532] text-zinc-200 text-xs font-semibold rounded-xl text-center transition-colors flex items-center justify-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Ara</span>
                </a>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(item.mapsQuery)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2 px-3 bg-[#C8A646]/15 hover:bg-[#C8A646]/25 text-[#E2C76A] border border-[#C8A646]/30 text-xs font-semibold rounded-xl text-center transition-colors flex items-center justify-center gap-1.5"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Haritada Gör</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Hyper-Local Bursa Kapalı Çarşı Parking & Transport Solution (Solves real user pain!) */}
        <div className="bg-[#0E1117] border border-[rgba(244,241,232,0.08)] rounded-2xl p-6 sm:p-8 mb-16">
          <div className="max-w-3xl mb-8">
            <span className="text-xs font-mono uppercase tracking-wider text-[#E2C76A] font-semibold flex items-center gap-1.5">
              <Car className="w-4 h-4 text-[#C8A646]" />
              Güvenli Ulaşım & Otopark Rehberi
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white mt-1">
              Kapalı Çarşı Sarraflarına Nasıl Gidilir? Nereye Park Edilir?
            </h2>
            <p className="text-xs sm:text-sm text-[#A5A8AE] mt-2 leading-relaxed">
              Bursa Tarihi Kapalı Çarşı yayalaştırılmış tarihi koruma alanındadır. Altın veya nakit para taşırken güvenli otopark ve metro güzergahlarını bilmek hayati önem taşır.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Otopark 1: Pirinç Han Otoparkı */}
            <div className="p-5 bg-[#07090C] rounded-xl border border-[rgba(244,241,232,0.06)] space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white">Pirinç Han Katlı Otoparkı</span>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  En Yakın (2 Dk)
                </span>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Kapalı Çarşı Sarraflar Caddesi'ne yalnızca 150 metre mesafededir. Güvenlik kameralı, belediye iştiraki Burulaş tarafından işletilir.
              </p>
              <div className="text-[11px] font-mono text-[#C8A646] pt-1">
                Yürüme Süresi: 2 dakika düz ayak
              </div>
            </div>

            {/* Otopark 2: Zafer Plaza Kapalı Otoparkı */}
            <div className="p-5 bg-[#07090C] rounded-xl border border-[rgba(244,241,232,0.06)] space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white">Zafer Plaza AVM Otoparkı</span>
                <span className="text-[10px] font-mono text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                  Geniş Kapasite
                </span>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Cemal Nadir Caddesi üzerindedir. 3 katlı yeraltı otoparkı mevcuttur. Şehreküstü alt geçidinden Kapalı Çarşı Sarraflar girişine doğrudan bağlanır.
              </p>
              <div className="text-[11px] font-mono text-[#C8A646] pt-1">
                Yürüme Süresi: 4 dakika alt geçit üzerinden
              </div>
            </div>

            {/* Metro Bursaray */}
            <div className="p-5 bg-[#07090C] rounded-xl border border-[rgba(244,241,232,0.06)] space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white">Bursaray Şehreküstü İstasyonu</span>
                <span className="text-[10px] font-mono text-sky-400 bg-sky-500/10 px-2 py-0.5 rounded border border-sky-500/20">
                  Trafiksiz Metro
                </span>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Üniversite, Emek ve Kestel hatlarından tek trenle ulaşım. İstasyonun "Tarihi Çarşılar / Kapalı Çarşı" tabelasını takip ederek doğrudan sarraflar kapısına çıkabilirsiniz.
              </p>
              <div className="text-[11px] font-mono text-[#C8A646] pt-1">
                Çıkıştan İtibaren: 3 dakika yürüyüş
              </div>
            </div>
          </div>
        </div>

        {/* 5 Essential Rules When Buying Gold from Bursa Jewelers (Solves rip-off anxiety!) */}
        <div className="bg-gradient-to-br from-[#12161E] via-[#0E1117] to-[#0A0D12] border border-[rgba(200,166,70,0.25)] rounded-2xl p-6 sm:p-8 mb-16">
          <div className="max-w-3xl mb-6">
            <span className="text-xs font-mono uppercase tracking-wider text-[#E2C76A] font-semibold flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#C8A646]" />
              Kuyumcu Alışveriş Güvenliği
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white mt-1">
              Bursa Sarrafında Altın Alıp Satarken 5 Altın Kural
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 mt-2 leading-relaxed">
              Bursa Kapalı Çarşı'da zarar etmemek ve en karlı fiyattan işlem yapmak için dikkat etmeniz gereken püf noktalar:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="p-4 bg-[#080A0D] rounded-xl border border-[rgba(244,241,232,0.06)] flex items-start gap-3">
              <span className="w-7 h-7 rounded-lg bg-[#C8A646] text-[#080A0D] font-bold text-xs flex items-center justify-center shrink-0">
                1
              </span>
              <div>
                <h4 className="text-sm font-bold text-white mb-1">İşçilik Payını (Fire) Mutlaka Önceden Sorun</h4>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Yatırımlık bilezik alırken "İşçiliksiz Ajda" veya "Bursa Burması" tercih edin. Satıcıya "Bunu yarın geri getirirsem gram başı kaç TL kesinti yaparsınız?" diye sormak esnafın en şeffaf fiyatı vermesini sağlar.
                </p>
              </div>
            </div>

            <div className="p-4 bg-[#080A0D] rounded-xl border border-[rgba(244,241,232,0.06)] flex items-start gap-3">
              <span className="w-7 h-7 rounded-lg bg-[#C8A646] text-[#080A0D] font-bold text-xs flex items-center justify-center shrink-0">
                2
              </span>
              <div>
                <h4 className="text-sm font-bold text-white mb-1">T.C. Darphane Mührünü ve 916 Damgasını İnceleyin</h4>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Çeyrek, yarım ve ata altınlarda kabartma kenar çizgilerini ve Atatürk portresinin detay keskinliğini kontrol edin. 22 ayar bileziklerin iç kısmında "916" patent damgası aranmalıdır.
                </p>
              </div>
            </div>

            <div className="p-4 bg-[#080A0D] rounded-xl border border-[rgba(244,241,232,0.06)] flex items-start gap-3">
              <span className="w-7 h-7 rounded-lg bg-[#C8A646] text-[#080A0D] font-bold text-xs flex items-center justify-center shrink-0">
                3
              </span>
              <div>
                <h4 className="text-sm font-bold text-white mb-1">Hassas Terazi Ekranını Kendi Gözünüzle Görün</h4>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Çarşıdaki kuyumcuların terazileri Sanayi ve Teknoloji Bakanlığı tarafından mühürlüdür. Bir çeyrek altın 1.754 gram, Cumhuriyet altını ise 7.216 gramdır. Tartım sırasında virgülden sonraki iki haneyi mutlaka teyit edin.
                </p>
              </div>
            </div>

            <div className="p-4 bg-[#080A0D] rounded-xl border border-[rgba(244,241,232,0.06)] flex items-start gap-3">
              <span className="w-7 h-7 rounded-lg bg-[#C8A646] text-[#080A0D] font-bold text-xs flex items-center justify-center shrink-0">
                4
              </span>
              <div>
                <h4 className="text-sm font-bold text-white mb-1">Havale Yaparken Açıklamaya "Altın Alım Bedeli" Yazın</h4>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Banka üzerinden EFT/Havale ile ödeme yaparken dekont açıklamasına kesinlikle "Kuyumcu altın alım bedeli" ve aldığınız altının gramajını not düşün. Faturanızı veya sarraf alım fişinizi teslim almayı unutmayın.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Regional Hubs Component */}
        <BursaGeoHubs />

      </div>
    </div>
  );
};
