import React, { useState } from 'react';
import { MapPin, Navigation, Clock, Store, ShieldCheck, Compass, ExternalLink } from 'lucide-react';

export const BursaGeoHubs: React.FC = () => {
  const [activeDistrict, setActiveDistrict] = useState<string>('osmangazi');

  const districts = [
    {
      id: 'osmangazi',
      name: 'Osmangazi (Kapalı Çarşı & Bedesten)',
      subtitle: 'Bursa Altın Piyasasının Kalbi',
      badge: 'Ana Merkez · 140+ Sarraf',
      coords: '40.1885° K, 29.0610° D',
      address: 'Tarihi Kapalı Çarşı, Bedesten ve Sarraflar Çarşısı, Osmangazi / Bursa',
      workingHours: 'Hafta içi 09:00 - 18:30 | Cumartesi 09:00 - 15:30',
      description:
        'Osmanlı döneminden günümüze Bursa’nın altın ve kıymetli maden ticaretinin merkezidir. Ulu Cami, Koza Han ve Bakırcılar Çarşısı arasında yer alır. Rafineri külçeler, toptan has altın ve darphane sikkelerinde Bursa’nın en dar makas aralığı bu çarşıda oluşur.',
      features: [
        'Bursa Kuyumcular Odası piyasa referans fiyatı burada belirlenir',
        'Has altın ve dökümcü takas masaları yer alır',
        'Eski tarihli ve yeni tarihli çeyrek altın çeşitliliği en yüksektir',
        'Toplu alımlarda ve düğün takılarında pazarlık esnekliği mevcuttur'
      ],
      mapQuery: 'Bursa+Kapalı+Çarşı+Kuyumcular'
    },
    {
      id: 'nilufer',
      name: 'Nilüfer (FSM Bulvarı & Özlüce)',
      subtitle: 'Modern Mücevherat & Pırlanta Noktaları',
      badge: 'Modern Takı · 45+ Mağaza',
      coords: '40.2140° K, 28.9850° D',
      address: 'Fatih Sultan Mehmet Bulvarı ve Ahmet Taner Kışlalı Cd. Özlüce, Nilüfer / Bursa',
      workingHours: 'Haftanın 7 Günü 10:00 - 20:00 (AVM & Bulvar Mağazaları)',
      description:
        'Bursa’nın modern yüzü Nilüfer’de FSM Bulvarı, Özlüce ve Sur Yapı Marka / Korupark bölgelerinde yoğunlaşan kurumsal mücevherat mağazalarıdır. Pırlanta, 18 ve 14 ayar özel tasarım takılarda öncüdür.',
      features: [
        'Akşam 20:00’ye kadar açık mağazalar ve hafta sonu tam gün hizmet',
        'Uluslararası HRD ve GIA sertifikalı pırlantalı ürünler',
        'Kredi kartına taksitli altın ve ziynet alım imkanları',
        'Geniş otopark ve modern konforlu alışveriş ortamı'
      ],
      mapQuery: 'FSM+Bulvarı+Kuyumcular+Bursa'
    },
    {
      id: 'yildirim',
      name: 'Yıldırım (Setbaşı & Davutkadı)',
      subtitle: 'Geleneksel Sarraflar & Çeyrek Ticareti',
      badge: 'Yerel Esnaf · 30+ Sarraf',
      coords: '40.1820° K, 29.0740° D',
      address: 'Setbaşı Köprüsü civarı, Namazgah ve Davutkadı, Yıldırım / Bursa',
      workingHours: 'Hafta içi ve Cumartesi 09:00 - 19:00',
      description:
        'Bursa’nın köklü yerleşimlerinden Yıldırım ilçesinde Setbaşı ve Namazgah caddeleri üzerinde konumlanan sarraflardır. Mahalle esnafı güveniyle küçük tasarruf sahiplerine hızlı ve güvenli fiziki altın bozdurma imkanı sağlar.',
      features: [
        'Hızlı çeyrek, yarım ve gram altın bozdurma işlemleri',
        'Yıllardır aynı noktada hizmet veren güvenilir aile sarrafları',
        'İşçiliksiz 22 ayar ajda ve burma bilezik temini'
      ],
      mapQuery: 'Setbaşı+Kuyumcular+Bursa'
    },
    {
      id: 'inegol',
      name: 'İnegöl (Tarihi Saraçlar Çarşısı)',
      subtitle: 'Güney Marmara Düğün Takı Merkezi',
      badge: 'Bölgesel Merkez · 35+ Mağaza',
      coords: '40.0780° K, 29.5130° D',
      address: 'Cuma Mahallesi, Saraçlar ve Kuyumcular Çarşısı, İnegöl / Bursa',
      workingHours: 'Hafta içi ve Cumartesi 09:00 - 19:00',
      description:
        'Mobilya başkenti İnegöl’de çeyiz ve düğün alışverişlerinin vazgeçilmez durağıdır. Yüksek hacimli düğün takı setleri, Trabzon hasırları ve mega bileziklerde zengin model seçeneği sunar.',
      features: [
        'Mobilya çeyiz alışverişiyle entegre toplu altın setleri',
        'Geniş 22 ayar mega bilezik ve kordon çeşitleri',
        'Kırsal ve sanayi yatırımcılarının yoğun altın birikim noktası'
      ],
      mapQuery: 'İnegöl+Kuyumcular+Çarşısı'
    }
  ];

  const current = districts.find(d => d.id === activeDistrict) || districts[0];

  return (
    <section id="bursa-kuyumculari" className="py-12 bg-[#080A0D] border-t border-[rgba(244,241,232,0.06)]">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#C8A646]/10 text-[#E2C76A] text-xs font-semibold uppercase tracking-wider mb-2 border border-[#C8A646]/20">
              <Compass className="w-3.5 h-3.5" />
              GEO / Bursa Yerel Altın Merkezleri Rehberi
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif text-[#F4F1E8] font-bold tracking-tight">
              Bursa Kuyumcu Çarşıları & Bölgesel Fiyat Rehberi
            </h2>
            <p className="text-sm text-[#A5A8AE] mt-1.5 max-w-2xl">
              Osmangazi Kapalı Çarşı'dan Nilüfer FSM Bulvarı'na kadar Bursa'nın altın ticareti yapılan tüm resmi sarraf merkezleri ve çalışma detayları.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-[#A5A8AE] font-mono bg-[#14181E] px-3.5 py-2 rounded-xl border border-[rgba(244,241,232,0.08)] shrink-0">
            <MapPin className="w-3.5 h-3.5 text-[#C8A646]" />
            <span>Koordinat: TR-16 (Bursa Merkez)</span>
          </div>
        </div>

        {/* District Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-6 scrollbar-none">
          {districts.map(d => (
            <button
              key={d.id}
              onClick={() => setActiveDistrict(d.id)}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap flex items-center gap-2 ${
                activeDistrict === d.id
                  ? 'bg-[#C8A646] text-[#080A0D] shadow-lg font-bold'
                  : 'bg-[#14181E] text-[#A5A8AE] hover:text-white border border-[rgba(244,241,232,0.06)]'
              }`}
            >
              <Store className="w-3.5 h-3.5" />
              <span>{d.name.split(' ')[0]}</span>
              <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                activeDistrict === d.id ? 'bg-black/20 text-[#080A0D]' : 'bg-[#080A0D] text-[#A5A8AE]'
              }`}>
                {d.badge.split('·')[1]?.trim() || ''}
              </span>
            </button>
          ))}
        </div>

        {/* District Detail Hub Card */}
        <div className="bg-[#101318] border border-[rgba(244,241,232,0.08)] rounded-3xl p-6 sm:p-8 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left: Overview & Features */}
            <div className="lg:col-span-7 space-y-5">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="px-2.5 py-1 rounded-full bg-[#C8A646]/20 text-[#E2C76A] font-mono text-xs font-bold border border-[#C8A646]/30">
                  {current.badge}
                </span>
                <span className="text-xs text-[#A5A8AE] font-mono flex items-center gap-1">
                  <Navigation className="w-3 h-3 text-[#C8A646]" />
                  {current.coords}
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-serif font-bold text-white">
                {current.name}
              </h3>

              <p className="text-sm text-[#A5A8AE] leading-relaxed">
                {current.description}
              </p>

              {/* Key Features */}
              <div className="space-y-2.5 pt-2">
                <div className="text-xs font-mono font-semibold uppercase tracking-wider text-[#C8A646]">
                  Bölgesel Avantajlar & İşlem İpuçları
                </div>
                {current.features.map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-zinc-200">
                    <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Address, Hours & Navigation Map Link */}
            <div className="lg:col-span-5 bg-[#14181E] border border-[rgba(244,241,232,0.08)] rounded-2xl p-6 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div>
                  <span className="text-xs text-[#A5A8AE] uppercase tracking-wider block mb-1 font-mono">
                    Açık Adres
                  </span>
                  <div className="text-sm text-white font-medium flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-[#C8A646] shrink-0 mt-1" />
                    <span>{current.address}</span>
                  </div>
                </div>

                <div>
                  <span className="text-xs text-[#A5A8AE] uppercase tracking-wider block mb-1 font-mono">
                    Çalışma & İşlem Saatleri
                  </span>
                  <div className="text-sm text-[#E2C76A] font-mono font-medium flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#C8A646] shrink-0" />
                    <span>{current.workingHours}</span>
                  </div>
                </div>

                <div className="p-3.5 bg-[#0C0F14] rounded-xl border border-[rgba(244,241,232,0.06)] text-xs text-[#A5A8AE]">
                  <strong className="text-white block mb-1">Pazarlık & Fiş Hatırlatması:</strong>
                  Bursa sarraflarında bilezik ve takı alırken işçilik bedelini mutlaka ayrı sorunuz; külçe ve sikke alırken güncel alış/satış makasını teyit ediniz.
                </div>
              </div>

              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(current.mapQuery)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-xl bg-[#C8A646] hover:bg-[#E2C76A] text-[#080A0D] font-bold text-xs sm:text-sm transition-colors flex items-center justify-center gap-2 shadow-lg"
              >
                <Navigation className="w-4 h-4" />
                <span>Google Haritalar'da Yol Tarifi Al</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-80" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
