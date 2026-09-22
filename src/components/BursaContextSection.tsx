import React from 'react';
import { MapPin, Building, ShieldCheck, Award } from 'lucide-react';

export const BursaContextSection: React.FC = () => {
  return (
    <>
      {/* BURSA CONTEXT */}
      <section id="bursada-altin" aria-labelledby="bursaTitle" className="py-12 bg-[#080A0D]">
        <div className="max-w-[1180px] mx-auto px-4 sm:px-6">
          <div className="mb-8">
            <span className="text-xs uppercase tracking-[0.16em] text-[#C8A646] font-semibold mb-2 block">
              Yerel Bağlam
            </span>
            <h2 id="bursaTitle" className="text-2xl sm:text-3xl font-serif text-[#F4F1E8] font-semibold tracking-tight">
              Bursa'da Altın Fiyatlarını Takip Etmek
            </h2>
            <p className="text-sm sm:text-base text-[#A5A8AE] mt-2 max-w-2xl">
              Bursa'da altın piyasasının işleyişi, kuyumcu uygulamaları ve doğru bilgiye ulaşma rehberi.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Online Fiyat ile Kuyumcu Fiyatı */}
            <div className="bg-[#14181E] border border-[rgba(244,241,232,0.08)] rounded-2xl p-6 sm:p-8">
              <h3 className="font-serif text-xl font-semibold text-[#F4F1E8] mb-3 flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#C8A646]" />
                Online Fiyat ile Kuyumcu Fiyatı
              </h3>
              <div className="space-y-3.5 text-sm text-[#A5A8AE] leading-relaxed">
                <p>
                  İnternette gördüğünüz altın fiyatları genellikle spot piyasa veya büyük toptancı kurlarına dayanır. Bursa'daki bir kuyumcudan fiziki altın alırken veya satarken karşılaşacağınız fiyat; kuyumcunun kira, personel, sigorta ve güvenlik gibi işletme giderlerinin yanı sıra anlık piyasa oynaklığına karşı aldığı koruma marjını da içerir.
                </p>
                <p>
                  Özellikle düğün sezonlarında veya ekonomik belirsizlik dönemlerinde kuyumcular arasındaki fiyat farkı 50–150 TL'ye kadar çıkabilir. Bu nedenle büyük tutarlı alımlarda birden fazla kuyumcudan teklif almak tasarruf sağlayabilir.
                </p>
              </div>
            </div>

            {/* Şeffaf Hesaplama Yaklaşımı */}
            <div className="bg-[#14181E] border border-[rgba(244,241,232,0.08)] rounded-2xl p-6 sm:p-8">
              <h3 className="font-serif text-xl font-semibold text-[#F4F1E8] mb-3 flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#E2C76A]" />
                Şeffaf Hesaplama Yaklaşımı
              </h3>
              <div className="space-y-3.5 text-sm text-[#A5A8AE] leading-relaxed">
                <p>
                  Bu platformda çeyrek, yarım ve tam altın fiyatları; gram altın fiyatı ile her bir ürünün standart saf altın içeriği çarpılarak hesaplanır. Örneğin bir çeyrek altın yaklaşık 1,604 gram saf altın içerir. Bu yöntem, piyasadaki saf altın değerini şeffaf bir şekilde yansıtır.
                </p>
                <p>
                  Kuyumcular ise bu teorik değere basım masrafı, dağıtım maliyeti ve kendi kâr marjlarını ekler. Sayfamızdaki fiyatları "referans taban fiyat" olarak değerlendirmeniz, kuyumcu tekliflerini karşılaştırmanızı kolaylaştırır.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SEO ARTICLE */}
      <article className="py-12 bg-[#0E1217] border-t border-[rgba(244,241,232,0.06)]" aria-labelledby="artTitle">
        <div className="max-w-[1180px] mx-auto px-4 sm:px-6">
          <div className="max-w-3xl">
            <h2 id="artTitle" className="text-2xl sm:text-3xl font-serif text-[#F4F1E8] font-semibold tracking-tight mb-6">
              Bursa Altın Fiyatları Hakkında
            </h2>

            <div className="space-y-4 text-sm sm:text-base text-[#A5A8AE] leading-relaxed">
              <p>
                Bursa, Türkiye'nin sanayi ve ticaret merkezlerinden biri olarak canlı bir altın piyasasına ev sahipliği yapar. Kentte hem geleneksel düğün ve hediyeleşme kültürü hem de tasarruf amaçlı altın alımı oldukça yaygındır. Tarihi Kapalıçarşı ve çevresindeki kuyumcular, yüzyıllardır kentin finansal nabzını tutan önemli merkezler arasındadır.
              </p>
              <p>
                Altın fiyatlarını etkileyen faktörlerin başında küresel piyasalardaki ons altın fiyatı ve yurt içindeki döviz kurları gelir. Küresel piyasalarda dolar cinsinden işlem gören ons altın, Türkiye'de gram altın fiyatının temel belirleyicisidir. Ons altın fiyatındaki bir yükseliş veya dolar/TL kurundaki bir artış, Bursa'daki altın fiyatlarına doğrudan ve hızla yansır.
              </p>
              <p>
                Bursa'da en çok talep gören altın türleri arasında gram altın, çeyrek altın ve 22 ayar bilezik ilk sıralarda yer alır. Gram altın, işçilik maliyetinin düşük olması nedeniyle özellikle yatırım ve birikim amacıyla tercih edilirken; çeyrek altın düğün, nişan ve sünnet gibi geleneksel kutlamalarda en popüler hediye seçeneğidir. 22 ayar bilezik ise hem takı olarak kullanılabilmesi hem de değerini koruması bakımından Bursa'da yaygın bir birikim aracıdır.
              </p>
              <p>
                Altın alımında dikkat edilmesi gereken en önemli hususlardan biri, ürünün ayar damgasının ve sertifikasının bulunmasıdır. Güvenilir kuyumculardan alışveriş yapmak, fatura veya fiş talep etmek ve mümkünse paketli, sertifikalı ürünleri tercih etmek alıcıyı olası risklere karşı korur. Ayrıca alım ve satım fiyatları arasındaki makas aralığını kontrol etmek, özellikle kısa vadeli alım-satım düşünenler için maliyeti düşürmenin anahtarıdır.
              </p>
              <p>
                Bu sayfada sunulan canlı fiyatlar, piyasadaki hareketliliği anbean takip etmenizi sağlamak amacıyla otomatik olarak yenilenir. Hem birikim yaparken hem de sevdiklerinize altın alırken güncel verilerden haberdar olmak, doğru zamanda doğru kararı vermenize yardımcı olur.
              </p>
            </div>
          </div>
        </div>
      </article>
    </>
  );
};
