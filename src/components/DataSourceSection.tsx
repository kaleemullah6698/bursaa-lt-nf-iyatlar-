import React from 'react';
import { useGold } from '../context/GoldContext';
import { Database, RefreshCw, Cpu, ShieldCheck } from 'lucide-react';

export const DataSourceSection: React.FC = () => {
  const { lastRefreshTime } = useGold();

  const formattedDate = new Intl.DateTimeFormat('tr-TR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  }).format(lastRefreshTime);

  return (
    <section aria-labelledby="srcTitle" className="py-12 bg-[#0E1217] border-t border-[rgba(244,241,232,0.06)]">
      <div className="max-w-[1180px] mx-auto px-4 sm:px-6">
        {/* Section Head matching user's HTML */}
        <div className="mb-8">
          <span className="text-xs uppercase tracking-[0.16em] text-[#C8A646] font-semibold mb-2 block">
            Şeffaflık
          </span>
          <h2 id="srcTitle" className="text-2xl sm:text-3xl font-serif text-[#F4F1E8] font-semibold tracking-tight">
            Veri Kaynağı ve Güncelleme
          </h2>
          <p className="text-sm sm:text-base text-[#A5A8AE] mt-2 max-w-2xl">
            Bu sayfadaki fiyatların nasıl elde edildiği ve güncellendiği hakkında teknik ve operasyonel bilgiler.
          </p>
        </div>

        {/* 4 Cards Grid matching user's src-grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-[#14181E] border border-[rgba(244,241,232,0.08)] rounded-xl p-5">
            <div className="text-[11px] uppercase tracking-wider text-[#A5A8AE] font-mono mb-1.5 flex items-center gap-1.5">
              <Database className="w-3.5 h-3.5 text-[#C8A646]" />
              <span>Kaynak</span>
            </div>
            <div className="text-sm font-semibold text-[#F4F1E8]">
              Küresel Spot Altın (PAXG / XAU) & Serbest Piyasa USD/TRY
            </div>
          </div>

          <div className="bg-[#14181E] border border-[rgba(244,241,232,0.08)] rounded-xl p-5">
            <div className="text-[11px] uppercase tracking-wider text-[#A5A8AE] font-mono mb-1.5 flex items-center gap-1.5">
              <RefreshCw className="w-3.5 h-3.5 text-[#3FA97A]" />
              <span>Son Başarılı Güncelleme</span>
            </div>
            <div className="text-sm font-semibold font-mono text-[#F4F1E8]">
              {formattedDate}
            </div>
          </div>

          <div className="bg-[#14181E] border border-[rgba(244,241,232,0.08)] rounded-xl p-5">
            <div className="text-[11px] uppercase tracking-wider text-[#A5A8AE] font-mono mb-1.5 flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5 text-[#E2C76A]" />
              <span>Güncelleme Sıklığı</span>
            </div>
            <div className="text-sm font-semibold text-[#F4F1E8]">
              Otomatik · Her ~45 saniyede bir
            </div>
          </div>

          <div className="bg-[#14181E] border border-[rgba(244,241,232,0.08)] rounded-xl p-5">
            <div className="text-[11px] uppercase tracking-wider text-[#A5A8AE] font-mono mb-1.5 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#38BDF8]" />
              <span>Kapsam</span>
            </div>
            <div className="text-sm font-semibold text-[#F4F1E8]">
              Bursa ili için referans perakende altın fiyatları
            </div>
          </div>
        </div>

        {/* Formula Card matching user's HTML */}
        <div className="bg-[#14181E] border border-[rgba(244,241,232,0.08)] rounded-2xl p-6 sm:p-7">
          <h3 className="font-serif text-lg font-semibold text-[#F4F1E8] mb-2 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#C8A646]" />
            Hesaplama Yöntemi
          </h3>
          <p className="text-sm text-[#A5A8AE] leading-relaxed">
            Gram altın fiyatı, küresel spot ons altın fiyatının 31,1035'e bölünmesi ve anlık serbest piyasa Dolar/TL kuru ile çarpılmasıyla hesaplanır:{' '}
            <code className="bg-[#101318] text-[#E2C76A] font-mono text-xs px-2 py-0.5 rounded border border-[#C8A646]/30">
              Gram = (Ons USD / 31,1035) × USD/TRY
            </code>
            . Çeyrek, yarım ve tam altın değerleri ise ilgili ürünün Darphane standartlarındaki saf altın ağırlığı üzerinden türetilir.
          </p>
        </div>
      </div>
    </section>
  );
};
