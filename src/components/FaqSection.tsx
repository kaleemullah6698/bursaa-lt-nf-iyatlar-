import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FAQ {
  q: string;
  a: string;
}

const FAQ_ITEMS: FAQ[] = [
  {
    q: 'Bursa altın fiyatları ne kadar?',
    a: 'Güncel fiyatlar sayfadaki canlı fiyat bölümünde listelenir. Fiyatlar, küresel spot altın verisinden hesaplanır ve kuyumcudan kuyumcuya küçük farklılıklar gösterebilir.'
  },
  {
    q: "Bursa'da gram altın fiyatı nasıl takip edilir?",
    a: 'Gram altın fiyatı bu sayfada otomatik olarak güncellenir. Sayfayı yenilemeden fiyat değişimlerini dakikalar içinde görebilirsiniz.'
  },
  {
    q: 'Çeyrek altın alış ve satış fiyatı neden farklıdır?',
    a: 'Kuyumcular alım-satım arasında makas (spread) uygular. Bu fark, işletme maliyetlerini ve fiyat dalgalanma riskini karşılar.'
  },
  {
    q: 'Bursa kuyumcu fiyatları ile internet fiyatları neden farklı olabilir?',
    a: 'İnternette görülen fiyatlar genellikle referans niteliğindedir. İşçilik, ürün kalitesi, kuyumcunun kendi fiyat politikası ve anlık piyasa koşulları nihai fiyatı etkiler.'
  },
  {
    q: 'Altın fiyatları gün içinde değişir mi?',
    a: 'Evet. Altın fiyatları küresel piyasalarda hafta içi sürekli işlem görür; döviz kurları ve ons fiyatındaki hareketler gün içinde fiyatları değiştirir.'
  },
  {
    q: 'Fiyatlar ne sıklıkla güncelleniyor?',
    a: 'Fiyatlar yaklaşık 45 saniyede bir otomatik olarak yeniden alınır. Son başarılı güncelleme zamanı sayfada görüntülenir.'
  },
  {
    q: 'Gösterilen fiyatlar yatırım tavsiyesi midir?',
    a: 'Hayır. Bu sayfadaki tüm bilgiler yalnızca bilgilendirme amaçlıdır ve yatırım tavsiyesi değildir.'
  }
];

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="sss" aria-labelledby="faqTitle" className="py-12 bg-[#080A0D]">
      <div className="max-w-[1180px] mx-auto px-4 sm:px-6">
        {/* Section Head matching user's HTML */}
        <div className="mb-8">
          <span className="text-xs uppercase tracking-[0.16em] text-[#C8A646] font-semibold mb-2 block">
            Yardım
          </span>
          <h2 id="faqTitle" className="text-2xl sm:text-3xl font-serif text-[#F4F1E8] font-semibold tracking-tight">
            Sıkça Sorulan Sorular
          </h2>
          <p className="text-sm sm:text-base text-[#A5A8AE] mt-2 max-w-2xl">
            Bursa altın fiyatları ve piyasa işleyişi hakkında merak edilenler.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="max-w-3xl space-y-3" id="faqList">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-[#14181E] border border-[rgba(244,241,232,0.08)] rounded-xl overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full py-4 px-5 text-left flex items-center justify-between gap-4 focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="font-serif font-semibold text-sm sm:text-base text-[#F4F1E8]">
                    {item.q}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#C8A646] transition-transform duration-200 shrink-0 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-sm text-[#A5A8AE] leading-relaxed border-t border-[rgba(244,241,232,0.04)]">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
