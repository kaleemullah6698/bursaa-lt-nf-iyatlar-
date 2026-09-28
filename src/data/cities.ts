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
        answer: "Bursa Kapalı Çarşı'da fiziki altın elden teslim alınır ve serbest piyasa arz-talep dengesine göre belirlenir. Bankalar ise kaydi altın alım-satımında %2.5 ila %5 arasında geniş makas ve kambiyo giderleri uygular. 100 gram altın alımında Kapalı Çarşı sarraflarından işlem yapmak ortalama ₺14.000 - ₺18.500 arasında doğrudan tasarruf sağlar."
      },
      {
        question: "Bursa'da gram ve çeyrek altın fiyatları gün içinde ne sıklıkla güncellenir?",
        answer: "Bursa Sarraflar Masası kotasyonları Borsa İstanbul Kıymetli Madenler Piyasası ve küresel ons altın paritesine bağlı olarak saniyelik güncellenir. Platformumuzdaki canlı WSS/REST motoru her 2.5 saniyede bir Osmangazi Kapalı Çarşı serbest piyasa referans kurlarını yeniler."
      },
      {
        question: "Bursa Kapalı Çarşı kuyumcuları saat kaçta açılıyor ve kapanıyor?",
        answer: "Bursa Tarihi Kapalı Çarşı ve Bedesten sarrafları hafta içi (Pazartesi-Cuma) 09:00 - 18:30 saatleri arasında tam seans, Cumartesi günleri ise 09:00 - 15:30 saatleri arasında yarım seans açıktır. Pazar günleri ise BKO onaylı nöbetçi kuyumcular hizmet verir."
      },
      {
        question: "Bursa'da yatırım için en çok hangi altın türü tercih edilir?",
        answer: "Bursa'da işçilik kaybı olmayan 24 ayar sertifikalı has gram külçe (IAR / Nadir Gold) ile asgari işçilikli 22 ayar geleneksel Bursa burma bilezik ve T.C. Darphane üretimi Cumhuriyet / Ata lira en yüksek likiditeye sahip yatırım araçlarıdır."
      },
      {
        question: "Bursa Tarihi Kapalı Çarşı'ya toplu taşıma, metro ve araçla nasıl gidilir?",
        answer: "Bursaray 1 ve 2 No'lu hatları kullanarak Şehreküstü İstasyonu'nda inip 3 dakikada Tahtakale / Kapalı Çarşı aksına ulaşabilirsiniz. Otobüs Terminali'nden 38 No'lu hat, Mudanya'dan F/1 hattı direkt Heykel bölgesine gelir. Araçla gelenler için Hanlar Bölgesi araç trafiğine kapalı olduğundan Cemal Nadir Katlı Otoparkı veya Zafer Plaza otoparkı önerilir."
      },
      {
        question: "22 ayar Bursa Burması bozdururken işçilik kaybı ne kadardır?",
        answer: "Bursa Burması el işçiliği minimum tutulan bir yatırımlık ziynet modelidir. Standart burma bileziklerde gram başına düşen işçilik kaybı yalnızca ₺25 - ₺40 bandındadır; bu da bozdururken değerini neredeyse 22 ayar has karşılığı üzerinden korumasını sağlar."
      },
      {
        question: "Bursa'da pazar günleri açık nöbetçi kuyumcu var mıdır?",
        answer: "Evet, Bursa Kuyumcular Odası (BKO) her hafta sonu pazar günü Osmangazi, Nilüfer (FSM / Özlüce) ve Yıldırım ilçelerinde belirli sarrafları nöbetçi olarak belirler. Acil altın alım-satımı veya hediye takı ihtiyaçları için nöbetçi sarraflar hizmet vermektedir."
      },
      {
        question: "Bursa Kuyumcular Odası (BKO) ayarevi vatandaşa açık mıdır?",
        answer: "Evet, Osmangazi Bedesten mevkiinde bulunan Bursa Kuyumcular Odası Ayarevi, şüpheli veya faturasız altınların milyem saflığını ve gramaj hassasiyetini resmi kalibreli X-Ray spektrometre cihazlarıyla test edip doğrulamaktadır."
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
    ],
    routes: [
      {
        origin: 'Nilüfer (FSM Bulvarı / Özlüce / Ataevler)',
        destination: 'Tarihi Kapalı Çarşı (Osmangazi)',
        distanceKm: 14.2,
        durationMin: 22,
        transitOptions: 'Bursaray 2 No\'lu Hat / Taksi',
        notes: 'Şehreküstü istasyonunda inip Tahtakale / Uzun Çarşı kapısından direkt giriş yapılır. İzmir Yolu üzerinden taksi ortalama 20-25 dakika sürer.'
      },
      {
        origin: 'Bursa Şehirlerarası Otobüs Terminali',
        destination: 'Kapalı Çarşı & Kuyumcular Caddesi',
        distanceKm: 10.8,
        durationMin: 18,
        transitOptions: 'BURULAŞ 38 / 38-D Otobüs / Terminal Taksi',
        notes: 'İstanbul Yolu aksından Heykel / Kent Meydanı güzergahı. Şehirlerarası gelen yatırımcıların en çok kullandığı doğrudan bağlantı.'
      },
      {
        origin: 'Mudanya & Güzelyalı BUDO / İDO İskelesi',
        destination: 'Tarihi Kapalı Çarşı Sarraflar Masası',
        distanceKm: 27.5,
        durationMin: 35,
        transitOptions: 'BURULAŞ F/1 / F/3 veya Taksi + Bursaray',
        notes: 'İstanbul deniz otobüsleriyle fiziki teslimatlı külçe altın almaya gelen yatırımcılar için ana arter. Emek Bursaray aktarması ile 35 dakikada ulaşılır.'
      },
      {
        origin: 'Bursa Yenişehir Havalimanı (YEI)',
        destination: 'Tarihi Kapalı Çarşı & Bedesten',
        distanceKm: 52.0,
        durationMin: 45,
        transitOptions: 'Havalimanı Taksi / 80 No\'lu Otobüs',
        notes: 'Doğu ve Karadeniz seferleriyle gelen sarrafiye esnafı için D-200 karayolu üzerinden direkt şehir merkezine bağlanır.'
      },
      {
        origin: 'Yıldırım (Setbaşı / Namazgah / Yeşilyayla)',
        destination: 'Kapalı Çarşı & Sarraflar Caddesi',
        distanceKm: 1.4,
        durationMin: 6,
        transitOptions: 'T1 İpekböceği Tramvayı / Yaya',
        notes: 'Tarihi İpekböceği tramvayı ile Çarşı durağında inilir veya Setbaşı Köprüsü üzerinden 8 dakikalık nostaljik yürüyüşle varılır.'
      }
    ],
    practicalTips: [
      {
        title: '22 Ayar Bursa Burmasında Düşük İşçilik Kuralı',
        summary: 'Bursa sarraflarında standart burma bilezik alırken gram başı işçilik maliyetinin ₺25–₺40 aralığını aşmamasına özen gösterin. Yatırım amacıyla alınan bileziklerde fantezi taş ve kilit yerine düz burma en yüksek geri dönüşü sağlar.',
        category: 'iscilik'
      },
      {
        title: 'Bursa Kuyumcular Odası (BKO) Ayarevi Denetimi',
        summary: 'Kapalı Çarşı ve Bedesten\'deki tüm sarraflar BKO resmi damgası ve mühürlü terazi taşır. Yüksek meblağlı altın alımlarında Bedesten mevkiindeki BKO Ayarevi\'nde ücretsiz spektrometre saflık doğrulaması talep edebilirsiniz.',
        category: 'guvenlik'
      },
      {
        title: 'Eski Tarih - Yeni Tarih Çeyrek Altın Gerçeği',
        summary: 'Bursa piyasasında eski tarihli ve yeni tarihli çeyrek altınların 1.605 gram has altın içeriği tamamen aynıdır. Sarraflarda alım-satım farkı en fazla ₺15–₺25 olmalıdır; daha yüksek kesinti teklif eden yerlerden kaçının.',
        category: 'tasarruf'
      },
      {
        title: 'Araç Parkı ve Hanlar Bölgesi Yaya Erişimi',
        summary: 'Tarihi Hanlar Bölgesi ve Kapalı Çarşı bütünüyle araç trafiğine kapalıdır. Özel aracınızla gelirken Cemal Nadir Katlı Otoparkı veya Zafer Plaza yeraltı otoparkını tercih ederek 2 dakikalık yaya mesafesiyle sarraflara ulaşabilirsiniz.',
        category: 'ulasim'
      },
      {
        title: 'Hafta Sonu ve Pazar Günü Nöbetçi Sarraflar',
        summary: 'Kapalı Çarşı pazar günleri dinlenmeye çekilir. Ancak düğün veya acil nakit ihtiyaçları için Bursa Kuyumcular Odası web sitesinde her hafta yayınlanan Nilüfer FSM ve Osmangazi nöbetçi kuyumcuları hizmet vermektedir.',
        category: 'guvenlik'
      }
    ],
    spreadExamples: [
      {
        goldType: '50 Gram 24 Ayar Has Külçe Altın',
        amount: 50,
        unit: 'gram',
        bankTotalTL: 172500,
        bursaBazaarTotalTL: 164800,
        savingsTL: 7700
      },
      {
        goldType: '100 Gram 24 Ayar Has Külçe Altın',
        amount: 100,
        unit: 'gram',
        bankTotalTL: 345000,
        bursaBazaarTotalTL: 329600,
        savingsTL: 15400
      },
      {
        goldType: '250 Gram Toptan Külçe Altın',
        amount: 250,
        unit: 'gram',
        bankTotalTL: 862500,
        bursaBazaarTotalTL: 824000,
        savingsTL: 38500
      },
      {
        goldType: '10 Adet T.C. Darphane Çeyrek Altın',
        amount: 10,
        unit: 'adet',
        bankTotalTL: 57400,
        bursaBazaarTotalTL: 54900,
        savingsTL: 2500
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
      },
      {
        question: "Ulus Anafartalar Kuyumcular Çarşısı'na metro ve toplu taşımayla nasıl gidilir?",
        answer: "M1-M2-M3 Kızılay-Batıkent metrosunu kullanarak Ulus İstasyonu'nda inebilir, Atatürk Heykeli yönünden Anafartalar Caddesi'ne 4 dakikalık yürüyüşle ulaşabilirsiniz. AŞTİ'den Ankaray ile Maltepe durağı veya direkt otobüs hatları mevcuttur."
      },
      {
        question: "Ankara'da Ata Lira (Cumhuriyet altını) alırken nelere dikkat edilmeli?",
        answer: "Ata Lira alırken kulpsuz ve orijinal T.C. Darphane damgalı olmasına, ağırlığının 7.216 gram (has altın 6.615g) gelmesine dikkat edilmelidir. Güvenilir sarraflardan faturalı veya sertifikalı temin edilmesi tavsiye edilir."
      },
      {
        question: "Ankara'da pazar günleri açık nöbetçi kuyumcu var mıdır?",
        answer: "Evet, Ankara Kuyumcular ve Saatçiler Odası (AKSO) her hafta Çankaya (Kızılay/Tunalı), Keçiören ve Yenimahalle ilçelerinde nöbetçi kuyumcu listesini yayınlamaktadır."
      },
      {
        question: "Ulus ve Kızılay sarrafları arasında fiyat makası farkı var mıdır?",
        answer: "Kızılay cadde sarrafları perakende vitrin maliyetleri sebebiyle çeyrek ve gramda bir miktar perakende marjı uygulayabilir; Ulus Anafartalar toptancı sarraflarında ise gram başına ₺8 - ₺15 daha avantajlı serbest piyasa alış-satış makası bulunur."
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
    ],
    routes: [
      {
        origin: 'Kızılay & Çankaya (Atatürk Bulvarı / Tunalı)',
        destination: 'Ulus Anafartalar Kuyumcular Çarşısı',
        distanceKm: 4.8,
        durationMin: 12,
        transitOptions: 'M1-M2-M3 Metrosu / Kızılay-Ulus Taksi',
        notes: 'Ulus metro istasyonundan çıkıp Heykel meydanını geçerek Anafartalar Caddesi sarraflar aksına 4 dakikada varılır.'
      },
      {
        origin: 'Çayyolu & Ümitköy (Eskişehir Yolu Aksı)',
        destination: 'Ulus Anafartalar Sarraflar Masası',
        distanceKm: 19.5,
        durationMin: 25,
        transitOptions: 'M2 Çayyolu Metrosu / Doğrudan Taksi',
        notes: 'Eskişehir Yolu üzerinden Dumlupınar Bulvarı taksiyle 20-25 dk sürer. Metro ile Kızılay aktarmasız direkt Ulus\'a ulaşır.'
      },
      {
        origin: 'Ankara Şehirlerarası Otobüs Terminali (AŞTİ)',
        destination: 'Ulus Sarraflar Çarşısı & Samanpazarı',
        distanceKm: 7.8,
        durationMin: 14,
        transitOptions: 'Ankaray + Metro Aktarması veya Terminal Taksi',
        notes: 'Mevlana Bulvarı ve Konya Yolu aksından Ulus meydanına kesintisiz erişim. Şehirlerarası gelen altın tüccarlarının ana güzergahı.'
      },
      {
        origin: 'Ankara Esenboğa Havalimanı (ESB)',
        destination: 'Ulus Anafartalar Kuyumcular Caddesi',
        distanceKm: 26.5,
        durationMin: 28,
        transitOptions: 'HAVAŞ / BelkoAir Otobüs veya Havalimanı Taksi',
        notes: 'Özal Bulvarı (Protokol Yolu) üzerinden Ulus Atatürk Meydanı durağına direkt ulaşım.'
      },
      {
        origin: 'Keçiören & Etlik Şehir Hastanesi',
        destination: 'Anafartalar Kuyumcular Çarşısı',
        distanceKm: 8.2,
        durationMin: 15,
        transitOptions: 'M4 Keçiören Metrosu / Fatih Caddesi Taksi',
        notes: 'AKM istasyonu aktarmasıyla veya Bentderesi güzergahı üzerinden Ulus toptancı sarraflarına hızlı geçiş.'
      }
    ],
    practicalTips: [
      {
        title: 'Başkentte Ata Lira (Cumhuriyet Altını) Ağırlığı',
        summary: 'Ankara yatırımcısının birinci tercihi T.C. Darphane basımı Ata Lira\'dır. Kulpsuz ve orijinal darphane mühürlü sikkeler tercih edilmelidir.',
        category: 'tasarruf'
      },
      {
        title: 'Ulus Anafartalar vs Kızılay Makas Farkı',
        summary: 'Kızılay cadde sarrafları perakende vitrini iken Ulus Anafartalar toptancı sarraflardan oluşur. Yüksek montanlı külçe alımlarında Anafartalar daha dar makas sunar.',
        category: 'tasarruf'
      },
      {
        title: 'Ankara Kuyumcular Odası (AKSO) Güvencesi',
        summary: 'Anafartalar Çarşısı esnafı AKSO onaylı resmi mühürlü terazi kullanır. Şüpheli durumlarda oda merkezinde spektrometre testi talep edebilirsiniz.',
        category: 'guvenlik'
      },
      {
        title: 'Ulus Tarihi Bölge Araç Parkı Çözümü',
        summary: 'Anafartalar ve Çıkrıkçılar Yokuşu yoğun araç trafiğindedir. Aracınızı Ulus 100. Yıl veya Gençlik Parkı otoparkına bırakıp yürümek en hızlı yöntemdir.',
        category: 'ulasim'
      },
      {
        title: 'Hafta Sonu Cumartesi Seansı & Nöbetçi Çarşılar',
        summary: 'Anafartalar Çarşısı cumartesi 16:00\'da kapanır. Hafta sonu acil ihtiyaçlar için Kızılay ve Tunalı Hilmi sarrafları 19:30\'a kadar hizmet verir.',
        category: 'guvenlik'
      }
    ],
    spreadExamples: [
      {
        goldType: '50 Gram 24 Ayar Has Külçe Altın',
        amount: 50,
        unit: 'gram',
        bankTotalTL: 172500,
        bursaBazaarTotalTL: 165200,
        savingsTL: 7300
      },
      {
        goldType: '100 Gram 24 Ayar Has Külçe Altın',
        amount: 100,
        unit: 'gram',
        bankTotalTL: 345000,
        bursaBazaarTotalTL: 330100,
        savingsTL: 14900
      },
      {
        goldType: '250 Gram Toptan Külçe Altın',
        amount: 250,
        unit: 'gram',
        bankTotalTL: 862500,
        bursaBazaarTotalTL: 825000,
        savingsTL: 37500
      },
      {
        goldType: '10 Adet T.C. Darphane Ata Lira',
        amount: 10,
        unit: 'adet',
        bankTotalTL: 235000,
        bursaBazaarTotalTL: 226500,
        savingsTL: 8500
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
      },
      {
        question: "Kapalıçarşı ve Tahtakale'ye toplu taşıma veya metro ile nasıl gidilir?",
        answer: "T1 Kabataş-Bağcılar tramvayı ile Beyazıt-Kapalıçarşı durağında inerek Nuruosmaniye veya Çarşı kapısından direkt girebilirsiniz. M2 Yenikapı-Hacıosman metrosu Vezneciler durağı da 4 dakika yürüme mesafesindedir."
      },
      {
        question: "Tahtakale Ayaklı Borsası'nda işlem yaparken güvenlik nasıl sağlanır?",
        answer: "Tarihi Yarımada'da fiziki altın alımı yaparken faturalı, Borsa İstanbul damgalı külçeleri tercih edin. Kalpakçılar Caddesi ve Nuruosmaniye aksında özel güvenlik, polis noktaları ve banka vezneleri mevcuttur."
      },
      {
        question: "İstanbul'da pazar günleri açık kuyumcu nerede bulunur?",
        answer: "Kapalıçarşı pazar günleri kapalıdır; ancak Kadıköy Tarihi Çarşı, Bakırköy İstasyon Caddesi, Nişantaşı ve AVM içi kurumsal sarraf mağazaları pazar günleri de hizmet vermektedir."
      },
      {
        question: "Has altın külçesi alırken hangi rafineri sertifikaları geçerlidir?",
        answer: "Türkiye ve dünyada en yüksek likiditeye sahip olan sertifikalar Borsa İstanbul Kıymetli Madenler Borsası ve LBMA kayıtlı İstanbul Altın Rafinerisi (İAR) ile Nadir Gold sertifikalı hologramlı blister paketlerdir."
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
    ],
    routes: [
      {
        origin: 'Kadıköy & Üsküdar (Anadolu Yakası Merkez)',
        destination: 'Tarihi Kapalıçarşı (Beyazıt Girişi)',
        distanceKm: 8.5,
        durationMin: 20,
        transitOptions: 'Marmaray (Sirkeci aktarma / T1 Tramvay) veya Vapur',
        notes: 'Vapurla Eminönü\'ne geçip T1 Beyazıt tramvayına binmek veya Marmaray ile Sirkeci\'den aktarmak Boğaz köprü trafiğinden tamamen kurtarır.'
      },
      {
        origin: 'Kuyumcukent (Bahçelievler / Yenibosna)',
        destination: 'Kapalıçarşı & Tahtakale Sarraflar Aksı',
        distanceKm: 15.8,
        durationMin: 24,
        transitOptions: 'M9 / M1A Metrosu veya E-5 Karayolu Taksi',
        notes: 'İstanbul atölyeleri ile çarşı toptancıları arasındaki ana altın sevkiyat koridoru.'
      },
      {
        origin: 'İstanbul Havalimanı (IST)',
        destination: 'Kapalıçarşı & Nuruosmaniye',
        distanceKm: 42.0,
        durationMin: 38,
        transitOptions: 'M11 Havalimanı Metrosu / İST-12 Havaist / Taksi',
        notes: 'Kuzey Marmara Otoyolu ve Hasdal bağlantısıyla doğrudan Tarihi Yarımada sarrafiye merkezine ulaşım.'
      },
      {
        origin: 'Sabiha Gökçen Havalimanı (SAW)',
        destination: 'Kapalıçarşı & Tahtakale Ayaklı Borsa',
        distanceKm: 44.5,
        durationMin: 45,
        transitOptions: 'M4 Metrosu + Ayrılık Çeşmesi Marmaray Aktarması',
        notes: 'Anadolu yakasından gelen yurt içi ve yurt dışı yatırımcılar için kesintisiz raylı sistem köprüsü.'
      },
      {
        origin: 'Levent & Maslak (Finans ve İş Kuleleri)',
        destination: 'Kapalıçarşı & Vezneciler',
        distanceKm: 11.2,
        durationMin: 22,
        transitOptions: 'M2 Hacıosman-Yenikapı Metrosu',
        notes: 'Vezneciler-İstanbul Üniversitesi istasyonunda inildiğinde Kapalıçarşı Çarşıkapı girişine yalnızca 3 dakikalık yürüyüş kalır.'
      }
    ],
    practicalTips: [
      {
        title: 'Tahtakale Ayaklı Borsası Likidite Saatleri',
        summary: 'Türkiye\'nin en dar alım-satım makasları saat 10:00 - 16:30 arası Londra ve New York seanslarının açık olduğu saatlerde gerçekleşir.',
        category: 'tasarruf'
      },
      {
        title: 'Sertifikalı Rafineri Külçesi Standartları',
        summary: 'İstanbul\'da has külçe alırken Borsa İstanbul ve LBMA onaylı Türk rafinerilerinin (İAR, Nadir Gold) hologramlı blister paketlerini tercih edin.',
        category: 'guvenlik'
      },
      {
        title: 'Tarihi Kapalıçarşı Giriş Kapıları ve Güvenlik',
        summary: 'Kalpakçılar Caddesi ve Nuruosmaniye kapılarında fiziki altın/nakit transferleri için resmi güvenlik ve X-Ray noktaları bulunur.',
        category: 'guvenlik'
      },
      {
        title: 'Kuyumcukent vs Kapalıçarşı Ayrımı',
        summary: 'Mücevher ve atölye imalatı için Kuyumcukent toptan; külçe, ons arbitrajı ve sikke altın için Tahtakale/Kapalıçarşı merkezdir.',
        category: 'iscilik'
      },
      {
        title: 'Marmaray ve Tramvay ile Sıfır Trafik Erişimi',
        summary: 'Tarihi Yarımada araç trafiğine kapalıdır. Aracınızı Yenikapı İDO otoparkına bırakıp Marmaray veya M2 ile 5 dakikada çarşıya ulaşabilirsiniz.',
        category: 'ulasim'
      }
    ],
    spreadExamples: [
      {
        goldType: '50 Gram 24 Ayar Has Külçe Altın',
        amount: 50,
        unit: 'gram',
        bankTotalTL: 172500,
        bursaBazaarTotalTL: 164500,
        savingsTL: 8000
      },
      {
        goldType: '100 Gram 24 Ayar Has Külçe Altın',
        amount: 100,
        unit: 'gram',
        bankTotalTL: 345000,
        bursaBazaarTotalTL: 329000,
        savingsTL: 16000
      },
      {
        goldType: '250 Gram Toptan Külçe Altın',
        amount: 250,
        unit: 'gram',
        bankTotalTL: 862500,
        bursaBazaarTotalTL: 822500,
        savingsTL: 40000
      },
      {
        goldType: '10 Adet T.C. Darphane Çeyrek Altın',
        amount: 10,
        unit: 'adet',
        bankTotalTL: 57400,
        bursaBazaarTotalTL: 54800,
        savingsTL: 2600
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
      },
      {
        question: "Tarihi Kemeraltı Kuyumcular Çarşısı'na vapur, metro ve tramvayla nasıl gidilir?",
        answer: "Karşıyaka ve Bostanlı'dan İZDENİZ Konak vapuruna binip Konak İskelesi'nden 4 dakikada varabilirsiniz. Metro kullananlar Çankaya veya Konak istasyonlarında, tramvay kullananlar ise Gazi Bulvarı durağında inebilir."
      },
      {
        question: "22 ayar İzmir Burması bozdururken işçilik kesintisi ne kadardır?",
        answer: "Standart İzmir burma bileziklerde işçilik kaybı gram başına ₺30 - ₺45 aralığındadır. Geniş hasır veya fantezi modeller yerine düz burgulu modeller bozdururken minimum değer kaybı yaşatır."
      },
      {
        question: "İzmir'de pazar günleri açık nöbetçi kuyumcu var mıdır?",
        answer: "Evet, İzmir Kuyumcular Odası (İZKO) her pazar Konak, Karşıyaka Çarşı ve Alsancak bölgelerinde resmi nöbetçi kuyumcu listesini ilan etmektedir."
      },
      {
        question: "Kemeraltı'nda has külçe altın alırken hangi sertifikalar aranmalıdır?",
        answer: "Borsa İstanbul ve LBMA sertifikalı İstanbul Altın Rafinerisi (İAR) veya Nadir Gold orijinal hologramlı blister paketleri Ege Bölgesi'nde en kolay ve kesintisiz nakde dönen standarttır."
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
    ],
    routes: [
      {
        origin: 'Karşıyaka & Bostanlı İskelesi',
        destination: 'Tarihi Kemeraltı Kuyumcular Sokağı',
        distanceKm: 12.0,
        durationMin: 16,
        transitOptions: 'İZDENİZ Konak Vapuru (Trafiksiz Körfez Geçişi)',
        notes: 'Konak vapur iskelesinden inip Tarihi Saat Kulesi\'ni geçerek Anafartalar Caddesi ve Kuyumcular Sokağı\'na 4 dakikada yürünür.'
      },
      {
        origin: 'Bornova (Küçükpark / Ege Üniversitesi)',
        destination: 'Kemeraltı & Çankaya Sarraflar Masası',
        distanceKm: 9.5,
        durationMin: 15,
        transitOptions: 'İzmir Metrosu (Çankaya İstasyonu Doğrudan Çıkış)',
        notes: 'Çankaya istasyonunda inildiğinde Fevzipaşa Bulvarı ve Kemeraltı sarraflar kapısına 90 metre mesafede olunur.'
      },
      {
        origin: 'Alsancak & Kordon (Liman Aksı)',
        destination: 'Kemeraltı Kuyumcular Çarşısı',
        distanceKm: 3.2,
        durationMin: 8,
        transitOptions: 'Konak Tramvayı / Gazi Bulvarı Taksi',
        notes: 'Gazi Bulvarı tramvay durağında inilerek Havra Sokağı toptancı sarraflarına hızlıca bağlanılır.'
      },
      {
        origin: 'İzmir Adnan Menderes Havalimanı (ADB)',
        destination: 'Kemeraltı Konak Sarraflar Çarşısı',
        distanceKm: 17.5,
        durationMin: 24,
        transitOptions: 'İZBAN Banliyö (Hilal aktarmalı) veya Havalimanı Taksi',
        notes: 'Gaziemir ve Akçay Caddesi üzerinden Konak Tüneli bağlantısıyla doğrudan çarşı girişine varış.'
      },
      {
        origin: 'Buca & Gaziemir Yatırım Havzası',
        destination: 'Kemeraltı Sarraflar Masası',
        distanceKm: 8.8,
        durationMin: 18,
        transitOptions: 'İZBAN Şirinyer Aktarma veya Yeşillik Caddesi Taksi',
        notes: 'Eşrefpaşa güzergahından İkiçeşmelik aksına inilerek toptan sarraflar bölgesine doğrudan erişim.'
      }
    ],
    practicalTips: [
      {
        title: '22 Ayar İzmir Burmasında Bölgesel Standart',
        summary: 'Ege düğünlerinin simgesi olan İzmir Burması çift burgu modeliyle tanınır; Kemeraltı sarraflarında gram başı işçilik ₺30–₺45 bandında tutulmalıdır.',
        category: 'iscilik'
      },
      {
        title: 'Çankaya Metro İstasyonu Doğrudan Çarşı Çıkışı',
        summary: 'Çankaya metro istasyonundan çıktığınızda doğrudan Kuyumcular Çarşısı ve Fevzipaşa Bulvarı sarraflar aksına 90 metre mesafede olursunuz.',
        category: 'ulasim'
      },
      {
        title: 'Havra Sokağı ve İkiçeşmelik Toptancı Sarrafları',
        summary: 'Perakende vitrinler yerine Kemeraltı iç aksındaki toptancı sarraflarda külçe alımlarında toptan borsa ekranı geçerlidir.',
        category: 'tasarruf'
      },
      {
        title: 'İZKO (İzmir Kuyumcular Odası) Referansı',
        summary: 'İZKO tavsiye listesi perakende tavan fiyatıdır; yüksek meblağlı altın bozdururken sarraflardan anlık serbest piyasa kotasyonu isteyin.',
        category: 'guvenlik'
      },
      {
        title: 'Konak Katlı Otopark Kolaylığı',
        summary: 'Kemeraltı tamamen yayalaştırılmıştır; aracınızı Konak Katlı Otoparkı veya Çankaya katlı otoparkına park edip yürümek en zahmetsiz yoldur.',
        category: 'ulasim'
      }
    ],
    spreadExamples: [
      {
        goldType: '50 Gram 24 Ayar Has Külçe Altın',
        amount: 50,
        unit: 'gram',
        bankTotalTL: 172500,
        bursaBazaarTotalTL: 165000,
        savingsTL: 7500
      },
      {
        goldType: '100 Gram 24 Ayar Has Külçe Altın',
        amount: 100,
        unit: 'gram',
        bankTotalTL: 345000,
        bursaBazaarTotalTL: 330000,
        savingsTL: 15000
      },
      {
        goldType: '250 Gram Toptan Külçe Altın',
        amount: 250,
        unit: 'gram',
        bankTotalTL: 862500,
        bursaBazaarTotalTL: 824500,
        savingsTL: 38000
      },
      {
        goldType: '10 Adet T.C. Darphane Çeyrek Altın',
        amount: 10,
        unit: 'adet',
        bankTotalTL: 57400,
        bursaBazaarTotalTL: 54950,
        savingsTL: 2450
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
