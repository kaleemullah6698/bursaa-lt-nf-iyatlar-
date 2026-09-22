import React, { useMemo } from 'react';
import { useGold } from '../context/GoldContext';
import { BarChart2, ShieldCheck, ArrowUpRight, TrendingUp } from 'lucide-react';

interface HeroProps {
  onOpenAlertModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenAlertModal }) => {
  const { items, lastRefreshTime, marketStatus } = useGold();

  const gramItem = items.find(i => i.id === 'gram-altin');
  const onsItem = items.find(i => i.id === 'ons-altin');

  // Sparkline data for background SVG
  const sparkPoints = useMemo(() => {
    if (!gramItem || !gramItem.sparkline || gramItem.sparkline.length < 2) {
      return [3380, 3390, 3405, 3395, 3415, 3425, 3438];
    }
    return gramItem.sparkline;
  }, [gramItem]);

  const { lineD, areaD } = useMemo(() => {
    const min = Math.min(...sparkPoints);
    const max = Math.max(...sparkPoints);
    const range = max - min || 1;
    const w = 600;
    const h = 400;

    const coords = sparkPoints.map((val, i) => {
      const x = (i / (sparkPoints.length - 1)) * w;
      const y = h - 50 - ((val - min) / range) * (h - 120);
      return [x, y];
    });

    const line = 'M ' + coords.map(c => `${c[0].toFixed(1)},${c[1].toFixed(1)}`).join(' L ');
    const area = `${line} L ${w},${h} L 0,${h} Z`;

    return { lineD: line, areaD: area };
  }, [sparkPoints]);

  const formattedDate = useMemo(() => {
    return new Intl.DateTimeFormat('tr-TR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    }).format(lastRefreshTime);
  }, [lastRefreshTime]);

  const onsUsdValue = onsItem ? onsItem.sellingPrice : 4355.65;

  return (
    <div className="relative pt-12 pb-10 sm:pt-20 sm:pb-16 overflow-hidden bg-[#080A0D]">
      {/* Background Radial Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute right-0 top-0 w-[800px] h-[450px] bg-[radial-gradient(ellipse_at_top_right,rgba(200,166,70,0.12),transparent_70%)]" />
        <div className="absolute left-[-100px] bottom-0 w-[500px] h-[350px] bg-[radial-gradient(circle,rgba(200,166,70,0.06),transparent_65%)]" />
      </div>

      {/* Grid Pattern Lines */}
      <div
        className="absolute inset-0 opacity-40 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(244,241,232,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(244,241,232,0.025) 1px, transparent 1px)',
          backgroundSize: '56px 56px',
          maskImage: 'radial-gradient(75% 85% at 50% 10%, #000 30%, transparent 100%)'
        }}
      />

      {/* Background Animated Sparkline SVG matching user's HTML */}
      <svg
        className="absolute right-0 top-0 w-full sm:w-[55%] h-full opacity-40 sm:opacity-55 pointer-events-none"
        viewBox="0 0 600 400"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="heroGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#C8A646" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#C8A646" stopOpacity="0.0" />
          </linearGradient>
        </defs>
        <path d={areaD} fill="url(#heroGradient)" />
        <path
          d={lineD}
          fill="none"
          stroke="#C8A646"
          strokeOpacity="0.55"
          strokeWidth="1.8"
        />
      </svg>

      <div className="max-w-[1180px] mx-auto px-4 sm:px-6 relative z-10">
        {/* Kicker Tag */}
        <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.14em] text-[#C8A646] border border-[#C8A646]/30 rounded-full px-3.5 py-1.5 mb-5 bg-[#C8A646]/5 backdrop-blur-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-[#C8A646] animate-ping" />
          <span>Canlı Piyasa Takibi</span>
        </div>

        {/* H1 Heading with Fraunces Serif and Italic Gold Accent */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-semibold text-[#F4F1E8] tracking-tight leading-[1.08] mb-5 max-w-3xl">
          Bursa <em className="not-italic text-[#E2C76A] font-serif">Altın</em> Fiyatları
        </h1>

        {/* Lede Paragraph */}
        <p className="text-base sm:text-lg text-[#A5A8AE] max-w-2xl leading-relaxed mb-7 font-normal">
          Bursa'da güncel altın alış ve satış fiyatlarını kolayca takip edin. Fiyatlar, küresel spot altın piyasasından alınan verilerle şeffaf bir yöntemle hesaplanır ve otomatik olarak güncellenir.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-3 mb-8">
          <a
            href="#fiyatlar"
            className="px-5 py-2.5 bg-[#C8A646] text-[#080A0D] text-sm font-semibold rounded-xl hover:bg-[#E2C76A] transition-all shadow-[0_0_20px_rgba(200,166,70,0.3)] flex items-center gap-2"
          >
            <span>Canlı Fiyat Tablosu</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
          <a
            href="#grafik"
            className="px-5 py-2.5 bg-[#14181E] border border-[rgba(244,241,232,0.12)] text-[#F4F1E8] text-sm font-medium rounded-xl hover:border-[#C8A646]/50 hover:text-[#E2C76A] transition-colors flex items-center gap-2"
          >
            <BarChart2 className="w-4 h-4 text-[#C8A646]" />
            <span>Mum Grafik Terminali</span>
          </a>
        </div>

        {/* Meta Stats Row matching user's HTML */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-8 pt-5 border-t border-[rgba(244,241,232,0.08)] max-w-3xl">
          <div>
            <div className="text-[11px] uppercase tracking-wider text-[#A5A8AE] font-medium mb-1">
              Son Güncelleme
            </div>
            <div className="text-sm sm:text-base text-[#F4F1E8] font-mono font-medium">
              {formattedDate}
            </div>
          </div>

          <div>
            <div className="text-[11px] uppercase tracking-wider text-[#A5A8AE] font-medium mb-1">
              Veri Durumu
            </div>
            <div className="text-sm sm:text-base text-[#3FA97A] font-medium flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#3FA97A] animate-pulse" />
              <span>{marketStatus.isOpen ? 'Güncel · Canlı' : 'Nöbetçi Kur'}</span>
            </div>
          </div>

          <div>
            <div className="text-[11px] uppercase tracking-wider text-[#A5A8AE] font-medium mb-1">
              Spot Ons / USD
            </div>
            <div className="text-sm sm:text-base text-[#F4F1E8] font-mono font-semibold text-[#E2C76A]">
              ${new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(onsUsdValue)}
            </div>
          </div>

          <div>
            <div className="text-[11px] uppercase tracking-wider text-[#A5A8AE] font-medium mb-1">
              Dolar / TL (TRY=X)
            </div>
            <div className="text-sm sm:text-base text-[#F4F1E8] font-mono font-semibold">
              ₺48,80
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
