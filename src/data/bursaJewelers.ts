import { BursaJewelerHub } from '../types/gold';

export const BURSA_JEWELER_HUBS: BursaJewelerHub[] = [
  {
    id: 'bursa-kapalicarsi-bedesten',
    name: 'Tarihi Kapalı Çarşı & Bedesten',
    district: 'Osmangazi (Heykel)',
    area: 'Tarihi Hanlar Bölgesi, Ulu Cami Arkası',
    address: 'Nalbantoğlu Mah., Kapalı Çarşı Cad., 16010 Osmangazi/Bursa',
    workingHours: 'Hafta içi: 09:00 - 18:30 | Cumartesi: 09:00 - 19:00 | Pazar: Kapalı',
    description: 'Bursa\'da altın ve mücevher ticaretinin yüzyıllardır kalbi olan UNESCO tescilli Tarihi Hanlar bölgesidir. Bursa\'da serbest piyasa altın fiyatlarının fiilen belirlendiği toptan ve perakende ana merkezdir.',
    storeCount: '180+ Kuyumcu & Sarraf',
    specialty: 'Gram altın, külçe, 22 ayar geleneksel Bursa burma bilezikleri, toptan ziynet alım-satımı',
    phone: '0224 221 44 80 (Bursa Kuyumcular Odası)',
    hasWeekendOpen: true
  },
  {
    id: 'bursa-kuyumcular-carsisi',
    name: 'Bursa Kuyumcular Çarşısı (Ulu Cami Girişi)',
    district: 'Osmangazi (Merkez)',
    area: 'Bakırcılar Çarşısı & Koza Han Bağlantısı',
    address: 'Şehreküstü Mah., Kuyumcular Çarşısı Sk., Osmangazi/Bursa',
    workingHours: '09:00 - 18:30 (Pazartesi - Cumartesi)',
    description: 'Kapalı Çarşı\'ya bitişik konumda yer alan yoğun sarraf koridorudur. Yatırımlık altın bozdurma ve fiziki külçe alımlarında en dar makas aralıklarının sunulduğu öncelikli lokasyondur.',
    storeCount: '90+ Sarraf Dükkanı',
    specialty: 'Cumhuriyet altını, Ata lira, Reşat altın, fiziki külçe alım-satımı ve döviz',
    hasWeekendOpen: true
  },
  {
    id: 'fsm-bulvari-kuyumculari',
    name: 'Fatih Sultan Mehmet (FSM) Bulvarı Kuyumcuları',
    district: 'Nilüfer',
    area: 'İhsaniye - FSM Bulvarı Prestij Aksı',
    address: 'Fatih Sultan Mehmet Bulvarı, 16130 Nilüfer/Bursa',
    workingHours: '10:00 - 20:00 (Pazar günleri nöbetçi açık mağazalar bulunmaktadır)',
    description: 'Bursa Nilüfer bölgesinin modern mücevherat ve perakende altın merkezidir. Butik pırlanta, 14 ve 18 ayar özel tasarım takılar ile 24 ayar yatırımlık altın satışı yapılır.',
    storeCount: '45+ Butik Kuyumcu & Mücevher Mağazası',
    specialty: 'Modern mücevherat, pırlanta, nişan/düğün setleri, lisanslı külçe altın',
    hasWeekendOpen: true
  },
  {
    id: 'altiparmak-ve-sehirekustu',
    name: 'Altıparmak & Şehreküstü Sarrafları',
    district: 'Osmangazi',
    area: 'Altıparmak Caddesi ve Kent Meydanı Hattı',
    address: 'Altıparmak Cad. No: 42-120, Osmangazi/Bursa',
    workingHours: '09:00 - 19:00 (Pazartesi - Cumartesi)',
    description: 'Şehir içi ulaşımın kesişim noktasında yer alan, güvenilir kurumsal sarraf ve kuyum mağazalarının yer aldığı merkezi aks.',
    storeCount: '35+ Sarraf',
    specialty: 'Çeyrek ve yarım altın bozdurma, 22 ayar bilezik, alyans çeşitleri',
    hasWeekendOpen: true
  },
  {
    id: 'inegol-kapalicarsi',
    name: 'İnegöl Kapalı Çarşı & Sarraflar Çarşısı',
    district: 'İnegöl',
    area: 'İnegöl Tarihi Merkez Çarşısı',
    address: 'Cuma Mah., Atatürk Bulvarı Kapalı Çarşı İçi, İnegöl/Bursa',
    workingHours: '09:00 - 18:30 (Pazartesi - Cumartesi)',
    description: 'Bursa\'nın en büyük sanayi ve ihracat ilçesi olan İnegöl\'ün yerel altın borsası ve takı alışverişi merkezi.',
    storeCount: '40+ Kuyumcu',
    specialty: 'Düğün takı setleri, 22 ayar burma ve has altın alım-satımı',
    hasWeekendOpen: false
  }
];

export const BURSA_BUYING_RULES = [
  {
    title: 'Ayar ve TSE Damgasını Kontrol Edin',
    description: 'Bursa kuyumcularından aldığınız tüm ürünlerde (bilezik, kolye vb.) ürünün iç kısmında patent damgası (916, 750, 585 veya 995) ve üretici firma mührü yer almalıdır.'
  },
  {
    title: 'Yatırım İçin "İşçiliksiz" Modelleri Tercih Edin',
    description: 'Birikim ve tasarruf amacıyla altın alıyorsanız, 24 ayar sertifikalı gram külçe veya işçilik maliyeti olmayan düz 22 ayar ray/burma bilezikleri tercih ediniz. Fantezi ve taşlı modellerde bozdururken %15-%25 işçilik kaybı yaşanır.'
  },
  {
    title: 'Tarihi Kapalı Çarşı\'da Alış-Satış Makasını Kıyaslayın',
    description: 'Bursa Kapalı Çarşı\'da birkaç farklı sarraftan anlık alış ve satış kotasyonu sorarak en dar makas aralığını sunan güvenilir esnafı seçebilirsiniz. Toptan ve yüksek gramajlı alımlarda pazarlık marjı doğabilir.'
  },
  {
    title: 'Fatura, Sertifika ve Garanti Belgesi İsteyin',
    description: 'Külçe altınlarda rafineri sertifikasını (Nadir, İAR, Troy vb.), ziynet ve mücevherlerde ise gramaj ve ayarın açıkça belirtildiği kaşeli faturayı mutlaka muhafaza ediniz.'
  },
  {
    title: 'Eski vs Yeni Tarihli Çeyrek Ayrımını Bilin',
    description: 'Bursa piyasasında eski tarihli çeyrek altın ile yeni tarihli çeyrek altın arasında içerik (ayar ve gramaj) açısından hiçbir fark yoktur. Ancak piyasa teamülü olarak satışta 40-60 TL indirimli satılır. Yatırım için eski tarihli talep etmek maliyet avantajı sağlar.'
  },
  {
    title: 'Hassas Terazi Ölçümünü Gözünüzle Teyit Edin',
    description: 'Alışveriş esnasında terazinin kalibre ve sıfırlandığını, tartılan gramajın faturaya birebir yansıdığını gözlemleyiniz.'
  }
];
