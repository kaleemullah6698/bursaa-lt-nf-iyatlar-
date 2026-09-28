import { CityConfig } from '../types/city';

export const CITIES: CityConfig[] = [
  {
    id: 'bursa',
    name: 'Bursa',
    slug: 'bursa-altin-fiyatlari',
    shortCode: 'BKÇ',
    marketName: 'Tarihi Kapalı Çarşı & Bedesten',
    tableTitle: 'Bursa Sarraflar Masası & Kapalı Çarşı',
    chamberName: 'Bursa Kuyumcular Odası (BKO)',
    workingHours: 'Hafta İçi 09:00 - 18:30 / Cmt 09:00 - 15:30',
    spreadModifier: 1.0,
    pricePremiumTL: 0,
    localHighlight: '22A Bursa Burması & Has Külçe',
    districts: ['Osmangazi (Kapalı Çarşı & Bedesten)', 'Nilüfer (FSM & Özlüce)', 'Yıldırım (Setbaşı)', 'İnegöl (Saraçlar)', 'Gemlik'],
    description: 'Bursa Tarihi Kapalı Çarşı ve Osmangazi sarraflar masası fiziki serbest piyasa altın kurları. Banka makaslarından bağımsız, fiziki teslimatlı şeffaf serbest piyasa kotasyonları.',
    tradingVolume24h: '₺142.8M',
    activeJewelersCount: 340,
    heroKicker: 'Tarihi Kapalı Çarşı & Osmangazi Sarraflar Masası',
    heroTitle: 'Bursa Canlı Altın Fiyatları',
    heroSubtitle: 'Bursa Kapalı Çarşı sarrafları, Nilüfer ve İnegöl kuyumcuları serbest piyasa canlı altın kurları. Banka makaslarından bağımsız, fiziki teslimatlı şeffaf serbest piyasa kotasyonları.',
    seoTitle: 'Bursa Altın Fiyatları Canlı | Kapalı Çarşı Kurları',
    seoDescription: 'Bursa Kapalı Çarşı ve Osmangazi sarraflar masası canlı altın kurları: 24 ayar gram, çeyrek, 22 ayar Bursa burması anlık serbest piyasa alış-satış fiyatı.',
    seoKeywords: 'bursa altın fiyatları, bursa kapalı çarşı altın, bursa gram altın, bursa çeyrek altın, bursa 22 ayar bilezik, bursa kuyumcular odası, bursa serbest piyasa altın 2026',
    geoRegion: 'TR-16',
    geoPlacename: 'Bursa, Türkiye',
    geoPosition: '40.1885;29.0610',
    address: 'Nalbantoğlu Mah. Tarihi Kapalı Çarşı Kuyumcular Caddesi No:16, Osmangazi, Bursa',
    phone: '+90 224 221 16 01',
    postalCode: '16010',
    faqs: [
      {
        question: "Bursa Kapalı Çarşı altın fiyatları neden bankalardan daha avantajlıdır?",
        answer: "Bursa Kapalı Çarşı'da fiziki altın elden teslim alınır ve serbest piyasa arz-talep dengesine göre belirlenir. Bankalar ise kaydi altın işlemlerinde %2.5 ila %5 arasında geniş alım-satım makası ve komisyon uygular. Bu nedenle Kapalı Çarşı sarraflarından altın alıp satmak yatırımcı için ciddi tasarruf sağlar."
      },
      {
        question: "Bursa'da gram ve çeyrek altın fiyatları gün içinde ne sıklıkla güncellenir?",
        answer: "Bursa Sarraflar Masası kotasyonları Borsa İstanbul ve küresel spot ons paritesine bağlı olarak saniyelik olarak güncellenir. Sayfamızdaki canlı motor her 2.5 saniyede bir Bursa Kapalı Çarşı referans fiyatlarını yeniler."
      },
      {
        question: "Bursa Kapalı Çarşı kuyumcuları saat kaçta açılıyor ve kapanıyor?",
        answer: "Bursa Kapalı Çarşı ve Bedesten sarrafları hafta içi (Pazartesi-Cuma) 09:00 - 18:30 saatleri arasında tam seans, Cumartesi günleri ise 09:00 - 15:30 saatleri arasında yarım seans çalışır. Pazar günleri nöbetçi kuyumcular hizmet verir."
      },
      {
        question: "Bursa'da yatırım için en çok hangi altın türü tercih edilir?",
        answer: "Bursa'da işçilik kaybı olmayan 24 ayar blister paketli has gram külçe (IAR / Nadir Gold) ile geleneksel 22 ayar Bursa burma bilezik ve Darphane üretimi Cumhuriyet / Ata lira en çok rağbet gören türlerdir."
      }
    ],
    editorialTitle: "Bursa'da Altın Kültürü ve Tarihi Kapalı Çarşı Mirası",
    editorialSubtitle: "1339'dan bugüne İpek Yolu'nun altın takas merkezi ve Osmanlı'nın ilk darphanesinin izleri.",
    editorialPoints: [
      {
        title: "İlk Osmanlı Darphanesi ve Emir Han",
        desc: "Orhan Gazi tarafından kurulan ilk Osmanlı darphanesine ev sahipliği yapan Bursa, asırlardır Anadolu sarrafiyesinin ve fiziki maden takasının başkenti olmuştur."
      },
      {
        title: "Cevahir Bedesteni Güvencesi",
        desc: "Fatih Sultan Mehmet döneminde kalın taş mahzenlerle inşa edilen Cevahir Bedesteni, yangın ve krizlere karşı yüzyıllardır fiziki altının koruma kalesi olmuştur."
      },
      {
        title: "Bursa Burması Geleneği",
        desc: "Bursa sarraflarının el işçiliğiyle ürettiği 22 ayar Bursa Burması, minimum işçilik kaybı ve yüksek likiditesi sayesinde hem düğün takısı hem de birikim aracı olarak güven verir."
      }
    ],
    keyHubs: [
      {
        name: 'Tarihi Kapalı Çarşı & Sarraflar Caddesi',
        type: 'Ana Likidite Merkezi (Osmangazi)',
        jewelersCount: 140,
        highlight: 'En dar alım-satım makası, toptan külçe & darphane sikkeleri',
        metroInfo: 'Bursaray Şehreküstü İstasyonu (3 dk yürüme)'
      },
      {
        name: 'Cevahir Bedesteni',
        type: 'Tarihi Mahzen & Sarrafiye (Osmangazi)',
        jewelersCount: 65,
        highlight: 'Geleneksel 22A Bursa Burması, Trabzon Hasırı ve antika altın',
        metroInfo: 'Ulu Cami yanı, Kapalı Çarşı iç aksı'
      },
      {
        name: 'FSM Bulvarı & Özlüce Aksı',
        type: 'Modern Mücevher & Tasarım (Nilüfer)',
        jewelersCount: 85,
        highlight: 'Akşam 20:30\'a kadar açık mağazalar, pırlanta ve yatırım külçeleri',
        metroInfo: 'FSM ve Özlüce Metro İstasyonları'
      },
      {
        name: 'İnegöl Saraçlar Çarşısı',
        type: 'Bölgesel Sarraflar Merkezi',
        jewelersCount: 50,
        highlight: 'Düğün takı setleri, 22A mega bilezik ve toplu çeyiz iskontosu',
        metroInfo: 'İnegöl Merkez Çarşı Caddesi'
      }
    ]
  },
  {
    id: 'ankara',
    name: 'Ankara',
    slug: 'ankara-altin-fiyatlari',
    shortCode: 'AKÇ',
    marketName: 'Anafartalar Kuyumcular Çarşısı & Ulus',
    tableTitle: 'Ankara Sarraflar Odası & Anafartalar OTC',
    chamberName: 'Ankara Kuyumcular ve Saatçiler Odası (AKSO)',
    workingHours: 'Hafta İçi 09:00 - 18:30 / Cmt 09:30 - 16:00',
    spreadModifier: 0.98,
    pricePremiumTL: 1.5,
    localHighlight: 'Başkent Has Külçe & Darphane Ata Lira',
    districts: ['Ulus (Anafartalar Caddesi & Kuyumcular Çarşısı)', 'Çankaya (Kızılay Kuyumcular Pasajı)', 'Keçiören (Dutluk & Gazino)', 'Yenimahalle (Demetevler & Batıkent)', 'Mamak'],
    description: 'Ankara Ulus Anafartalar Çarşısı, Kızılay ve Çankaya sarrafları serbest piyasa anlık altın kotasyonları. Başkent sarraflar odası referanslı darphane ve has altın kurları.',
    tradingVolume24h: '₺218.4M',
    activeJewelersCount: 520,
    heroKicker: 'Başkent Ulus Anafartalar & Kızılay Kuyumcular Çarşısı',
    heroTitle: 'Ankara Canlı Altın Fiyatları',
    heroSubtitle: 'Ankara Sarraflar Odası, Ulus Anafartalar Kuyumcular Çarşısı ve Kızılay sarrafları anlık serbest piyasa kotasyonları. Darphane Ata lira, külçe ve 22 ayar bilezikte başkentin şeffaf piyasa verileri.',
    seoTitle: 'Ankara Altın Fiyatları Canlı | Anafartalar Kurları',
    seoDescription: 'Ankara Ulus Anafartalar Kuyumcular Çarşısı ve Kızılay canlı altın fiyatları: Has gram, çeyrek, 22 ayar bilezik ve Ata altın serbest piyasa anlık kurları.',
    seoKeywords: 'ankara altın fiyatları, ankara anafartalar kuyumcular çarşısı, ankara kuyumcular odası, ankara gram altın canlı, ankara çeyrek altın, ankara ata altın fiyatı, ulus kuyumcular 2026',
    geoRegion: 'TR-06',
    geoPlacename: 'Ankara, Türkiye',
    geoPosition: '39.9334;32.8597',
    address: 'Anafartalar Caddesi Ulus Kuyumcular Çarşısı No:42, Altındağ, Ankara',
    phone: '+90 312 311 06 06',
    postalCode: '06050',
    faqs: [
      {
        question: "Ankara'da altın alırken en avantajlı piyasa neresidir?",
        answer: "Başkentte toptan kotasyona en yakın ve en dar makaslı altın alım-satım işlemleri tarihi Ulus Anafartalar Kuyumcular Çarşısı ve Çıkrıkçılar Yokuşu bölgesindeki ana toptancı sarraflarda gerçekleşir."
      },
      {
        question: "Ankara Anafartalar Çarşısı sarrafları saat kaçta açılıyor?",
        answer: "Anafartalar Kuyumcular Çarşısı hafta içi sabah 09:00'da açılıp akşam 18:30'a kadar kesintisiz işlem yapar. Cumartesi günleri 09:30 - 16:00 arası aktiftir."
      },
      {
        question: "Ankara'da en çok hangi altın türü talep görür?",
        answer: "Başkent yatırımcısının ve kamu personelinin bir numaralı tercihi T.C. Darphane basımı Ata Lira (Cumhuriyet altını) ile sertifikalı 24 ayar 10g, 20g ve 50g has külçelerdir."
      },
      {
        question: "Ankara Kuyumcular Odası tavsiye kurları ile serbest çarşı fiyatı aynı mıdır?",
        answer: "Kuyumcular odası tavsiye taban fiyatlarını yayınlar; ancak Anafartalar fiziki serbest piyasasında yüksek montanlı işlemlerde sarraflar anlık borsa ekranına göre daha rekabetçi toptan kotasyon sunar."
      }
    ],
    editorialTitle: "Başkent Ankara'da Altın Ticareti ve Anafartalar Dinamikleri",
    editorialSubtitle: "Cumhuriyetin ilk yıllarından bugüne bürokrasinin ve Orta Anadolu'nun güvenli limanı.",
    editorialPoints: [
      {
        title: "Cumhuriyet Başkentinin Ticaret Omurgası",
        desc: "Cumhuriyetin ilanıyla birlikte Ulus Anafartalar Caddesi, Ankara'nın ilk organize kuyumculuk ve finans merkezine dönüştü. Çıkrıkçılar ve Samanpazarı esnafı sermayesini bu çarşıda altına bağladı."
      },
      {
        title: "Darphane Ata Lira Kültürü",
        desc: "Ankara halkı ve bürokrasi çevresi, değerini en saf şekilde koruyan ve düşük işçilik farkı bulunan Darphane mühürlü Ata altınında Türkiye'nin en yüksek işlem hacimlerinden birini üretir."
      },
      {
        title: "Merkez Bankası ve Borsa ile Anlık Arbitraj",
        desc: "Başkent sarrafları doğrudan TCMB ve Borsa İstanbul Kıymetli Madenler Piyasası verilerini referans alarak İç Anadolu'nun toptan altın dağıtımını yönlendirir."
      }
    ],
    keyHubs: [
      {
        name: 'Ulus Anafartalar Kuyumcular Çarşısı',
        type: 'Başkent Ana Sarrafiye Merkezi (Altındağ)',
        jewelersCount: 220,
        highlight: 'Has külçe, Darphane Ata lira toptan takası, en dar spread',
        metroInfo: 'Ulus Metro İstasyonu (4 dk yürüme)'
      },
      {
        name: 'Kızılay Kuyumcular Pasajı & İzmir Caddesi',
        type: 'Çankaya Finans & Perakende Aksı',
        jewelersCount: 140,
        highlight: 'Modern takı, ziynet, pırlanta ve hızlı elden bozdurma',
        metroInfo: 'Kızılay Metro & Ankaray Ortak İstasyonu'
      },
      {
        name: 'Keçiören Dutluk & Gazino Sarrafları',
        type: 'Kuzey Ankara Yatırım Havzası',
        jewelersCount: 90,
        highlight: '22 ayar bilezik, düğün çeyizi ve mahalle sarrafı güveni',
        metroInfo: 'Keçiören Metrosu Dutluk Durağı'
      },
      {
        name: 'Demetevler & Batıkent Çarşısı',
        type: 'Yenimahalle Sarraflar Bölgesi',
        jewelersCount: 70,
        highlight: 'Hızlı çeyrek/yarım temini ve yatırım külçeleri',
        metroInfo: 'Demetevler Metro İstasyonu'
      }
    ]
  },
  {
    id: 'istanbul',
    name: 'İstanbul',
    slug: 'istanbul-altin-fiyatlari',
    shortCode: 'İST',
    marketName: 'Büyük Kapalıçarşı & Kuyumcukent Tahtakale',
    tableTitle: 'Kapalıçarşı Tahtakale Serbest Piyasa OTC',
    chamberName: 'İstanbul Kuyumcular Odası (İKO)',
    workingHours: 'Hafta İçi 08:30 - 19:00 / Cmt 09:00 - 16:30',
    spreadModifier: 0.95,
    pricePremiumTL: -1.0,
    localHighlight: 'Kapalıçarşı Tahtakale Has Külçe & Çeyrek',
    districts: ['Fatih (Beyazıt / Kapalıçarşı / Tahtakale)', 'Bahçelievler (Kuyumcukent Kompleksi)', 'Kadıköy (Tarihi Çarşı & Boğa)', 'Üsküdar (Meydan Kuyumcuları)', 'Bakırköy (İstasyon Caddesi)'],
    description: 'İstanbul Kapalıçarşı, Tahtakale serbest piyasa ve Kuyumcukent toptan ve perakende canlı altın kurları. Türkiye altın piyasasının ana likidite ve fiyat belirleme merkezi.',
    tradingVolume24h: '₺1.42B',
    activeJewelersCount: 2850,
    heroKicker: 'Tarihi Kapalıçarşı, Tahtakale & Kuyumcukent OTC',
    heroTitle: 'İstanbul Canlı Altın Fiyatları',
    heroSubtitle: 'İstanbul Kapalıçarşı, Tahtakale serbest piyasa ve Kuyumcukent toptan altın kurları. Türkiye\'nin kalbinde anlık milyem hesapları, rafineri külçeleri ve en derin piyasa likiditesi.',
    seoTitle: 'İstanbul Altın Fiyatları Canlı | Kapalıçarşı Kurları',
    seoDescription: 'İstanbul Kapalıçarşı, Tahtakale ve Kuyumcukent serbest piyasa canlı altın fiyatları: 24 ayar has külçe, çeyrek ve cumhuriyet anlık toptan alış-satış kurları.',
    seoKeywords: 'istanbul altın fiyatları, kapalıçarşı altın fiyatları canlı, tahtakale serbest piyasa altın, kuyumcukent toptan altın, istanbul gram altın, ata altın istanbul, iko altın fiyatları 2026',
    geoRegion: 'TR-34',
    geoPlacename: 'İstanbul, Türkiye',
    geoPosition: '41.0082;28.9784',
    address: 'Beyazıt Mah. Kalpakçılar Caddesi Kapalıçarşı No:1, Fatih, İstanbul',
    phone: '+90 212 519 00 00',
    postalCode: '34126',
    faqs: [
      {
        question: "İstanbul Kapalıçarşı ve Tahtakale'de altın almanın avantajı nedir?",
        answer: "Kapalıçarşı ve Tahtakale ayaklı borsası Türkiye'nin fiziki altın piyasasının kalbidir. İşlem hacmi milyarlarca lirayı bulduğu için alış-satış arasındaki spread (makas) Türkiye'nin en dar oranına sahiptir."
      },
      {
        question: "Tahtakale piyasası saat kaçta açılıyor ve kapanıyor?",
        answer: "Tahtakale ve Kapalıçarşı serbest piyasa kotasyonları hafta içi 08:30'da başlar ve 19:00'a kadar devam eder. Cumartesi 09:00 - 16:30 arası aktiftir."
      },
      {
        question: "Kuyumcukent ile Kapalıçarşı arasındaki fiyat farkı nasıldır?",
        answer: "Kuyumcukent toptan imalat ve atölye merkezidir; Kapalıçarşı ise fiziki takas ve perakende sarrafiye merkezidir. Her iki merkez de birbirine paralel kotasyonlarla çalışır."
      },
      {
        question: "Kapalıçarşı'da kiloluk külçe altın nasıl alınır?",
        answer: "Kapalıçarşı sarrafları ve yetkili kıymetli maden aracı kuruluşları üzerinden 995.0 veya 999.9 saflıkta LBMA / Borsa İstanbul kayıtlı külçeler banka transferi veya nakit takas ile temin edilir."
      }
    ],
    editorialTitle: "Kapalıçarşı ve Tahtakale: Küresel Altın Ticaretinin Kalbi",
    editorialSubtitle: "1461'den bu yana Doğu ile Batı arasında fiziki altın köprüsü.",
    editorialPoints: [
      {
        title: "565 Yıllık Kesintisiz Ticaret Tapınağı",
        desc: "Fatih Sultan Mehmet tarafından 1461 yılında temelleri atılan Kapalıçarşı, bugün 64 cadde ve 4000'e yakın dükkanıyla dünyanın en eski ve en büyük alışveriş merkezidir."
      },
      {
        title: "Tahtakale Ayaklı Borsası",
        desc: "Türkiye'de serbest piyasa döviz ve altın fiyatlarının gerçek arz-taleple belirlendiği gayriresmi finans merkezi, ekran fiyatlarının ötesinde gerçek likiditeyi yansıtır."
      },
      {
        title: "Kuyumcukent: Dünyanın En Büyük Entegre Kompleksi",
        desc: "Bahçelievler'de kurulu Kuyumcukent, tasarım, döküm, rafineri ve toptan ticareti tek çatı altında toplayarak Türkiye'nin dünya mücevher ihracatında ilk sıralara yerleşmesini sağlar."
      }
    ],
    keyHubs: [
      {
        name: 'Kapalıçarşı & Kalpakçılar Caddesi',
        type: 'Küresel Fiziki Takas Merkezi (Fatih)',
        jewelersCount: 1200,
        highlight: 'Türkiye\'nin en likit serbest piyasa tahtası, toptan külçe & ziynet',
        metroInfo: 'T1 Tramvay Beyazıt & Kapalıçarşı İstasyonu'
      },
      {
        name: 'Bahçelievler Kuyumcukent',
        type: 'Toptan İmalat & Rafineri Kompleksi',
        jewelersCount: 850,
        highlight: 'Rafineri külçeleri, atölye fiyatları ve toptan ihracat kotasyonları',
        metroInfo: 'M9 ve M1A Metrosu / Metrobüs Yenibosna aktarması'
      },
      {
        name: 'Kadıköy Tarihi Çarşı & Altıyol',
        type: 'Anadolu Yakası Ana Sarrafiye Merkezi',
        jewelersCount: 380,
        highlight: 'Hızlı bozdurma, düğün setleri ve Darphane sikkeleri',
        metroInfo: 'M4 Kadıköy Metro ve Vapur İskelesi'
      },
      {
        name: 'Bakırköy İstasyon Caddesi & Çarşı',
        type: 'Batı İstanbul Perakende Merkezi',
        jewelersCount: 220,
        highlight: 'Modern takı, 22 ayar bilezik ve pırlanta mağazaları',
        metroInfo: 'Marmaray Bakırköy İstasyonu'
      }
    ]
  },
  {
    id: 'izmir',
    name: 'İzmir',
    slug: 'izmir-altin-fiyatlari',
    shortCode: 'İKM',
    marketName: 'Tarihi Kemeraltı Çarşısı & Konak',
    tableTitle: 'İzmir Kuyumcular Odası & Kemeraltı OTC',
    chamberName: 'İzmir Kuyumcular Odası (İZKO)',
    workingHours: 'Hafta İçi 09:00 - 18:30 / Cmt 09:00 - 15:30',
    spreadModifier: 1.01,
    pricePremiumTL: 0.5,
    localHighlight: 'Ege Özel 22A İzmir Burması & Çeyrek',
    districts: ['Konak (Tarihi Kemeraltı Çarşısı & Kuyumcular Sokağı)', 'Karşıyaka (Çarşı Caddesi)', 'Bornova (Küçükpark & Çarşı)', 'Alsancak (Kıbrıs Şehitleri)', 'Buca (Heykel & Kasaplar)'],
    description: 'İzmir Tarihi Kemeraltı Çarşısı ve Konak sarraflar masası güncel altın ve döviz fiyatları. Ege bölgesi fiziki altın ticaret ve takas referansı.',
    tradingVolume24h: '₺98.6M',
    activeJewelersCount: 410,
    heroKicker: 'Tarihi Kemeraltı Çarşısı & Konak Kuyumcular Sokağı',
    heroTitle: 'İzmir Canlı Altın Fiyatları',
    heroSubtitle: 'İzmir Kuyumcular Odası, Tarihi Kemeraltı sarrafları ve Karşıyaka çarşısı canlı altın kotasyonları. 22 ayar İzmir burması, cumhuriyet ve gram altında Ege\'nin şeffaf piyasa verileri.',
    seoTitle: 'İzmir Altın Fiyatları Canlı | Kemeraltı Çarşı Kuru',
    seoDescription: 'İzmir Tarihi Kemeraltı Çarşısı ve Konak sarraflar masası canlı altın fiyatları: 24 ayar gram, çeyrek ve 22 ayar İzmir burma bilezik serbest piyasa kurları.',
    seoKeywords: 'izmir altın fiyatları, kemeraltı altın fiyatları, izmir kuyumcular odası, izmir gram altın, kemeraltı sarraflar, izmir 22 ayar bilezik, izmir çeyrek altın canlı 2026',
    geoRegion: 'TR-35',
    geoPlacename: 'İzmir, Türkiye',
    geoPosition: '38.4192;27.1287',
    address: 'Konak Mah. Tarihi Kemeraltı Çarşısı Kuyumcular Caddesi No:28, Konak, İzmir',
    phone: '+90 232 484 35 35',
    postalCode: '35250',
    faqs: [
      {
        question: "İzmir'de altın alıp satmak için en uygun yer neresidir?",
        answer: "Ege'nin en köklü sarrafiye merkezi Tarihi Kemeraltı Çarşısı'dır. Kuyumcular Sokağı ve Havra Sokağı civarındaki toptancı sarraflar en dar alış-satış marjını sunar."
      },
      {
        question: "Tarihi Kemeraltı sarrafları saat kaçta açılıyor?",
        answer: "Kemeraltı kuyumcuları hafta içi sabah 09:00'da kepenk açar ve akşam 18:30'a kadar hizmet verir. Cumartesi 09:00 - 15:30 arası açıktır."
      },
      {
        question: "İzmir Burması bilezik ile diğer bilezikler arasındaki fark nedir?",
        answer: "İzmir Burması, Ege bölgesine özgü özel 22 ayar burgu desenli el işçiliğiyle üretilir. Dayanıklı formu ve kolay bozdurulabilmesi sebebiyle Ege'de düğünlerin vazgeçilmez ziynetidir."
      },
      {
        question: "İzmir Kuyumcular Odası (İZKO) ekran fiyatları neyi ifade eder?",
        answer: "İZKO tavsiye perakende kurlarını belirler. Fiziki çarşıda büyük montanlı alımlarda sarraflar İZKO tavan fiyatının altında toptan kotasyon uygulayabilir."
      }
    ],
    editorialTitle: "Ege'nin İncisi İzmir'de Altın ve 400 Yıllık Kemeraltı Geleneği",
    editorialSubtitle: "Akdeniz ticaret limanından modern Ege finans havzasına uzanan altın mirası.",
    editorialPoints: [
      {
        title: "Tarihi Kemeraltı ve Hanlar Bölgesi",
        desc: "1600'lü yıllardan itibaren deniz ticaretinin zenginleştirdiği Kemeraltı, Kızlarağası Hanı ve Kuyumcular Sokağı ile Ege Bölgesi'nin altın rezervini yönetmiştir."
      },
      {
        title: "İzmir Burması Geleneği",
        desc: "Ege zeybek ve düğün kültürünün asil simgesi olan 22 ayar İzmir Burması, bölgedeki sarrafların kuşaktan kuşağa aktardığı benzersiz usta işçiliğidir."
      },
      {
        title: "Bölgesel Ege Likidite Havzası",
        desc: "Manisa, Aydın, Denizli ve Muğla gibi çevre illerin de altın takas ve külçe ihtiyacını karşılayan Kemeraltı sarrafları, Ege'nin en güvenilir referansıdır."
      }
    ],
    keyHubs: [
      {
        name: 'Tarihi Kemeraltı Kuyumcular Sokağı',
        type: 'Ege Bölgesi Ana Sarrafiye Merkezi (Konak)',
        jewelersCount: 210,
        highlight: 'Toptan külçe, en dar makas, İzmir burması ve Darphane sikkeleri',
        metroInfo: 'İzmir Metrosu Konak & Çankaya İstasyonları'
      },
      {
        name: 'Karşıyaka Çarşı Caddesi',
        type: 'Kuzey İzmir Sarraflar Aksı',
        jewelersCount: 95,
        highlight: 'Modern takı, 22 ayar ziynet ve hızlı altın bozdurma',
        metroInfo: 'Karşıyaka İskele ve İZBAN İstasyonu'
      },
      {
        name: 'Bornova Küçükpark & Meydan',
        type: 'Üniversite ve Doğu İzmir Bölgesi',
        jewelersCount: 60,
        highlight: 'Yatırımlık gram ve çeyrek altın, hediyelik ziynet',
        metroInfo: 'Bornova Metro İstasyonu'
      },
      {
        name: 'Alsancak Kıbrıs Şehitleri',
        type: 'Lüks Mücevherat & Pırlanta',
        jewelersCount: 45,
        highlight: 'Sertifikalı pırlanta, özel tasarım alyans ve VIP hizmet',
        metroInfo: 'Alsancak İZBAN ve Tramvay'
      }
    ]
  }
];

export const DEFAULT_CITY = CITIES[0]; // Bursa

// City helpers
export const CITY_BY_ID = CITIES.reduce((acc, c) => {
  acc[c.id] = c;
  return acc;
}, {} as Record<string, CityConfig>);

export const CITY_BY_SLUG = CITIES.reduce((acc, c) => {
  acc[c.slug] = c;
  return acc;
}, {} as Record<string, CityConfig>);

export const getCityBySlugOrId = (identifier: string): CityConfig | undefined => {
  const clean = identifier.toLowerCase().replace(/^\//, '').replace(/\/$/, '');
  return CITY_BY_SLUG[clean] || CITY_BY_ID[clean];
};
