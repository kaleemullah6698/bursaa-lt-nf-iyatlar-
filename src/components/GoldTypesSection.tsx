import React from 'react';
import { useGold } from '../context/GoldContext';
import { ShieldCheck, ChevronRight } from 'lucide-react';

export const GoldTypesSection: React.FC = () => {
  const { items, setSelectedItem, openCalculatorWithGold } = useGold();

  const goldTypes = [
    {
      slug: 'gram-altin',
      name: 'Gram Altın (24 Ayar)',
      desc: 'Küresel spot piyasadan canlı hesaplanan saf altın değeri.',
      pureWeight: '1.00g Saf Altın (0.995)',
      id: 'gram-altin'
    },
    {
      slug: 'ceyrek-altin',
      name: 'Çeyrek Altın',
      desc: 'Standart saf altın ağırlığı üzerinden hesaplanan teorik değer; işçilik dahil değildir.',
      pureWeight: '≈ 1.604g Saf Altın (22 Ayar)',
      id: 'ceyrek-altin'
    },
    {
      slug: 'yarim-altin',
      name: 'Yarım Altın',
      desc: 'Standart saf altın ağırlığı üzerinden hesaplanan teorik değer; işçilik dahil değildir.',
      pureWeight: '≈ 3.208g Saf Altın (22 Ayar)',
      id: 'yarim-altin'
    },
    {
      slug: 'tam-altin',
      name: 'Tam Altın',
      desc: 'Standart saf altın ağırlığı üzerinden hesaplanan teorik değer; işçilik dahil değildir.',
      pureWeight: '≈ 6.417g Saf Altın (22 Ayar)',
      id: 'tam-altin'
    },
    {
      slug: 'cumhuriyet-altini',
      name: 'Cumhuriyet Altını',
      desc: 'Darphane tarafından basılan resmi devlet ziynet altını; saf altın karşılığı üzerinden hesaplanır.',
      pureWeight: '≈ 6.60g Saf Altın (22 Ayar)',
      id: 'cumhuriyet-altini'
    },
    {
      slug: 'ata-altin',
      name: 'Ata Altın',
      desc: 'Bursa Kapalı Çarşı sarraflarında yoğun talep gören, 22 ayar standart cumhuriyet altını.',
      pureWeight: '≈ 6.60g Saf Altın (22 Ayar)',
      id: 'ata-altin'
    },
    {
      slug: '22-ayar-bilezik',
      name: '22 Ayar Bilezik',
      desc: 'Ayarlı bilezik fiyatı; 0,916 saflık katsayısıyla gram altından türetilir.',
      pureWeight: 'Gram Başına (0.916 Saflık)',
      id: '22-ayar-bilezik'
    },
    {
      slug: 'ayar-14',
      name: '14 Ayar Altın',
      desc: 'Takı ve fantezi kuyumculuk ürünleri için kullanılan gram bazlı piyasa referans kuru.',
      pureWeight: 'Gram Başına (0.585 Saflık)',
      id: '14-ayar-altin'
    }
  ];

  const formatTL = (val: number) => {
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'TRY',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(val);
  };

  return (
    <section id="altin-turleri" aria-labelledby="typesTitle" className="py-12 bg-[#080A0D]">
      <div className="max-w-[1180px] mx-auto px-4 sm:px-6">
        {/* Section Head matching user's HTML */}
        <div className="mb-8">
          <span className="text-xs uppercase tracking-[0.16em] text-[#C8A646] font-semibold mb-2 block">
            Rehber
          </span>
          <h2 id="typesTitle" className="text-2xl sm:text-3xl font-serif text-[#F4F1E8] font-semibold tracking-tight">
            Altın Türleri ve Standartları
          </h2>
          <p className="text-sm sm:text-base text-[#A5A8AE] mt-2 max-w-2xl">
            En çok işlem gören altın çeşitleri ve saf altın karşılıklarıyla hesaplanan güncel satış değerleri.
          </p>
        </div>

        {/* 8 Cards Grid matching user's HTML types-grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {goldTypes.map((type) => {
            const item = items.find(i => i.id === type.id || i.slug === type.slug) || items[0];
            const sellPrice = item ? item.sellingPrice : 0;

            return (
              <div
                key={type.slug}
                onClick={() => setSelectedItem(item)}
                className="bg-[#14181E] border border-[rgba(244,241,232,0.08)] rounded-2xl p-5 hover:border-[#C8A646]/40 transition-all cursor-pointer group flex flex-col justify-between hover:-translate-y-0.5 shadow-md"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-serif font-semibold text-base text-[#F4F1E8] group-hover:text-[#E2C76A] transition-colors">
                      {type.name}
                    </h3>
                    <ChevronRight className="w-4 h-4 text-[#A5A8AE] opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <p className="text-xs text-[#A5A8AE] leading-relaxed mb-4 min-h-[42px]">
                    {type.desc}
                  </p>
                </div>

                <div className="border-t border-[rgba(244,241,232,0.06)] pt-3.5 mt-2">
                  <div className="text-[11px] text-[#A5A8AE] font-mono mb-1">
                    {type.pureWeight}
                  </div>
                  <div className="text-lg font-mono font-bold text-[#E2C76A]">
                    <span className="text-[11px] block font-sans text-[#A5A8AE] font-normal uppercase tracking-wider mb-0.5">
                      Satış (hesaplanan)
                    </span>
                    {formatTL(sellPrice)}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
