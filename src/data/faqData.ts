import { FAQItem } from '../types/gold';

export const BURSA_GOLD_FAQS: FAQItem[] = [
  {
    id: 'bursa-altin-fiyatlari-nasil-belirlenir',
    question: 'Bursa altın fiyatları nasıl belirlenir ve neden değişir?',
    answer: 'Bursa altın fiyatları iki temel küresel göstergeye dayanır: Uluslararası ons altın fiyatı (XAU/USD) ve serbest piyasa Dolar/TL kuru. Formül: [Ons Fiyatı / 31.1034768] * Dolar Kuru ile 24 ayar saf gram altın hesaplanır. Bunun üzerine Bursa Tarihi Kapalı Çarşı ve Bursa Kuyumcular Odası piyasasının fiziki arz-talep dengesi, nakliye, sigorta ve darphane basım maliyetleri eklenerek yerel alış-satış tabelaları teşekkül eder.',
    category: 'Piyasa Mekanizması'
  },
  {
    id: 'bursa-kapalicarsi-vs-banka',
    question: 'Bursa Kapalı Çarşı altın fiyatları ile banka fiyatları arasında neden fark var?',
    answer: 'Bankalar altın alım-satımında binde 2 Kambiyo Muamele Vergisi (BSMV) ve mesai saatleri dışı koruma marjı uyguladığından alış-satış makas aralığını 80-150 TL civarında açabilir. Bursa Kapalı Çarşı serbest piyasasında ise fiziki altın rekabetçi ve dar makasla (genellikle 15-30 TL) işlem görür. Ayrıca Kapalı Çarşı\'dan aldığınız altını fiziki olarak elinizde tutabilir ve istediğiniz kuyumcuda anında nakde çevirebilirsiniz.',
    category: 'Karşılaştırma'
  },
  {
    id: 'bursa-kuyumculari-kacta-aciliyor-kapaniyor',
    question: 'Bursa kuyumcuları saat kaçta açılıyor ve kapanıyor? Pazar günleri açık mı?',
    answer: 'Bursa Tarihi Kapalı Çarşı ve Bedesten kuyumcuları hafta içi ve Cumartesi günleri sabah 09:00\'da açılır, akşam 18:30 - 19:00 saatleri arasında kapanır. Pazar günleri Tarihi Kapalı Çarşı kapalıdır. Ancak Nilüfer FSM Bulvarı, AVM\'ler ve Bursa Kuyumcular Odası tarafından ilan edilen nöbetçi kuyumcular pazar günleri de hizmet vermektedir.',
    category: 'Bursa Rehberi'
  },
  {
    id: 'eski-tarihli-yeni-tarihli-ceyrek-farki',
    question: 'Eski tarihli çeyrek altın ile yeni tarihli çeyrek altın arasında ne fark vardır?',
    answer: 'Eski tarihli ve yeni tarihli çeyrek altınların gramajı (1.754 gram) ve ayarı (22 ayar - 0.916 saflık) birebir aynıdır. Aralarındaki tek fark üzerindeki basım yılıdır. Bursa piyasasında düğün hediyesi için yeni tarihli tercih edildiğinden, eski tarihli çeyrek satışta yaklaşık 40 - 60 TL daha ucuza verilir. Yatırım ve birikim yapacak Bursalı vatandaşların eski tarihli çeyrek tercih etmesi maliyet avantajı sağlar.',
    category: 'Ürün Bilgisi'
  },
  {
    id: 'en-karli-altin-hangisi',
    question: 'Bursa\'da yatırım için hangi altın türünü almak en mantıklıdır?',
    answer: 'Yatırım için en karlı altın türleri işçilik maliyeti olmayan ürünlerdir: 1) 24 Ayar Blisterli Gram Külçe Altın (Dar makas, sıfır işçilik), 2) Cumhuriyet / Ata Lira (Uzun vadeli saklama için standart ve likit), 3) 22 Ayar Düz İşçiliksiz Ray/Burma Bilezik. Taşlı yüzükler, fantezi setler veya kolyelerde satarken %15-25 işçilik kaybı yaşanır.',
    category: 'Yatırım Tavsiyeleri'
  },
  {
    id: 'kuyumcuda-altin-bozdururken-nelere-dikkat-edilmeli',
    question: 'Bursa\'da altın bozdururken zarar etmemek için nelere dikkat edilmelidir?',
    answer: 'Altınınızı bozdururken: 1) Tabeladaki "ALIŞ" fiyatını baz alınız (kuyumcu sizden alış fiyatından alır), 2) Hassas terazi tartımını izleyiniz, 3) Kulplu çeyrek/yarım altınlarda pirinç kulbun ağırlığının (yaklaşık 0.10 - 0.15 gr) düşüldüğünü biliniz, 4) Anlık canlı Bursa serbest piyasa alış fiyatını sitemiz üzerinden kontrol ederek gidiniz.',
    category: 'Alış-Satış İpuçları'
  },
  {
    id: 'altin-alis-satis-makasi-nedir',
    question: 'Altın alış ve satış fiyatı arasındaki makas (spread) nedir?',
    answer: 'Alış ve satış fiyatı arasındaki farka "makas aralığı" (spread) denir. Kuyumcu veya sarraf sizden altını alırken "Alış" fiyatı uygular, size satarken "Satış" fiyatı uygular. Bu aradaki fark esnafın işletme maliyetini, sermaye riskini ve kar marjını oluşturur. Bursa Altın Fiyatları platformumuzda her altın türünün anlık makas aralığını şeffafça görebilirsiniz.',
    category: 'Finansal Kavramlar'
  }
];
