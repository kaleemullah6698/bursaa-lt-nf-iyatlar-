import React from 'react';
import { PortfolioTracker } from '../components/PortfolioTracker';
import { useGold } from '../context/GoldContext';
import { formatTL } from '../data/goldData';
import { Link } from '../components/Link';
import { 
  Briefcase, 
  ShieldCheck, 
  TrendingUp, 
  Lock, 
  PieChart, 
  Coins, 
  ArrowRight,
  Calculator,
  Table,
  BarChart2,
  Download,
  Printer,
  Sparkles,
  Landmark,
  CheckCircle2
} from 'lucide-react';

export const PortfolioPage: React.FC = () => {
  const { portfolio, portfolioSummary, addPortfolioItem } = useGold();

  const handleLoadDemoPortfolio = () => {
    // Adds a typical Bursa household physical gold basket
    addPortfolioItem({
      goldId: 'gram-altin',
      amount: 25,
      buyPrice: 2850,
      notes: 'Bursa Kapalı Çarşı Sarraf Alımı'
    });
    addPortfolioItem({
      goldId: 'ceyrek-altin',
      amount: 6,
      buyPrice: 4600,
      notes: 'Düğün takı birikimi'
    });
    addPortfolioItem({
      goldId: '22-ayar-bilezik',
      amount: 20,
      buyPrice: 2600,
      notes: '22 Ayar Bursa Burma Bilezik'
    });
  };

  return (
    <div className="min-h-screen bg-[#080A0D] py-8 sm:py-12">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        
        {/* Page Hero Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-xs font-mono text-[#E2C76A] uppercase tracking-wider mb-2">
            <Briefcase className="w-4 h-4 text-[#C8A646]" />
            <span>Kişisel Altın & Emtia Portföy İstasyonu</span>
            <span className="text-zinc-600">·</span>
            <span className="text-emerald-400">Zero-Leak Local Storage</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#F4F1E8] tracking-tight text-balance">
                Bursa Altın Portföy Yönetimi
              </h1>
              <p className="text-sm sm:text-base text-[#A5A8AE] mt-2 max-w-2xl leading-relaxed">
                Fiziki altın, külçe ve Bursa burması bilezik varlıklarınızı kaydedin; ortalama maliyetinizi, net kar/zararınızı ve Bursa Kapalı Çarşı anlık nakit bozdurma değerinizi banka gizliliğinde takip edin.
              </p>

              {/* Clean Semantic Interlinks */}
              <div className="flex flex-wrap items-center gap-2.5 mt-4 font-mono text-xs">
                <Link 
                  to="/" 
                  className="px-3.5 py-1.5 rounded-xl bg-[#101318] border border-[rgba(244,241,232,0.1)] text-[#A5A8AE] hover:text-[#E2C76A] hover:border-[#C8A646]/40 transition-colors flex items-center gap-1.5"
                >
                  <Table className="w-3.5 h-3.5 text-[#C8A646]" />
                  <span>Canlı Fiyat Tablosu</span>
                </Link>
                <Link 
                  to="/hesaplama" 
                  className="px-3.5 py-1.5 rounded-xl bg-[#101318] border border-[rgba(244,241,232,0.1)] text-[#A5A8AE] hover:text-[#E2C76A] hover:border-[#C8A646]/40 transition-colors flex items-center gap-1.5"
                >
                  <Calculator className="w-3.5 h-3.5 text-[#C8A646]" />
                  <span>Altın Çevirici & Zekat</span>
                </Link>
                <Link 
                  to="/grafik" 
                  className="px-3.5 py-1.5 rounded-xl bg-[#101318] border border-[rgba(244,241,232,0.1)] text-[#A5A8AE] hover:text-[#E2C76A] hover:border-[#C8A646]/40 transition-colors flex items-center gap-1.5"
                >
                  <BarChart2 className="w-3.5 h-3.5 text-[#C8A646]" />
                  <span>Teknik Mum Grafiği</span>
                </Link>
              </div>
            </div>

            {/* Privacy & Security Guarantee Badge */}
            <div className="p-3.5 bg-[#0E1117] border border-[rgba(244,241,232,0.08)] rounded-xl flex items-center gap-3 text-xs font-mono shrink-0 shadow-sm">
              <Lock className="w-5 h-5 text-emerald-400 shrink-0" />
              <div>
                <div className="text-[10px] text-zinc-500 uppercase font-semibold">Banka Düzeyi Gizlilik</div>
                <div className="font-bold text-white mt-0.5">%100 Cihazınızda Saklanır</div>
              </div>
            </div>
          </div>
        </div>

        {/* Portfolio Top Analytics Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {/* Stat 1: Güncel Portföy Değeri */}
          <div className="p-5 bg-[#0E1117] border border-[rgba(244,241,232,0.08)] rounded-2xl">
            <div className="text-[11px] font-mono text-[#A5A8AE] uppercase tracking-wider mb-1">
              Bursa Çarşı Bozdurma Değeri
            </div>
            <div className="text-2xl sm:text-3xl font-bold font-mono text-white tabular-nums tracking-tight">
              {formatTL(portfolioSummary.currentValue)}
            </div>
            <div className="text-xs text-zinc-400 font-mono mt-1">
              {portfolio.length} Farklı Fiziki Varlık Kalemi
            </div>
          </div>

          {/* Stat 2: Toplam Maliyet */}
          <div className="p-5 bg-[#0E1117] border border-[rgba(244,241,232,0.08)] rounded-2xl">
            <div className="text-[11px] font-mono text-[#A5A8AE] uppercase tracking-wider mb-1">
              Toplam Alış Maliyeti
            </div>
            <div className="text-2xl sm:text-3xl font-bold font-mono text-zinc-300 tabular-nums tracking-tight">
              {formatTL(portfolioSummary.totalCost)}
            </div>
            <div className="text-xs text-zinc-400 font-mono mt-1">
              Geçmiş Satın Alma Bedeli
            </div>
          </div>

          {/* Stat 3: Net Kar / Zarar */}
          <div className="p-5 bg-[#0E1117] border border-[rgba(244,241,232,0.08)] rounded-2xl">
            <div className="text-[11px] font-mono text-[#A5A8AE] uppercase tracking-wider mb-1">
              Net Kâr / Getiri (TL)
            </div>
            <div className={`text-2xl sm:text-3xl font-bold font-mono tabular-nums tracking-tight ${
              portfolioSummary.totalProfitTL >= 0 ? 'text-emerald-400' : 'text-rose-400'
            }`}>
              {portfolioSummary.totalProfitTL >= 0 ? '+' : ''}{formatTL(portfolioSummary.totalProfitTL)}
            </div>
            <div className="text-xs text-zinc-400 font-mono mt-1">
              Enflasyona Karşı Fiziki Kalkan
            </div>
          </div>

          {/* Stat 4: Getiri Yüzdesi */}
          <div className="p-5 bg-[#0E1117] border border-[rgba(244,241,232,0.08)] rounded-2xl">
            <div className="text-[11px] font-mono text-[#A5A8AE] uppercase tracking-wider mb-1">
              Toplam Getiri Oranı
            </div>
            <div className={`text-2xl sm:text-3xl font-bold font-mono tabular-nums tracking-tight ${
              portfolioSummary.totalProfitPercent >= 0 ? 'text-emerald-400' : 'text-rose-400'
            }`}>
              {portfolioSummary.totalProfitPercent >= 0 ? '+' : ''}%{portfolioSummary.totalProfitPercent.toFixed(2)}
            </div>
            <div className="text-xs text-zinc-400 font-mono mt-1">
              Alış Tarihinden İtibaren
            </div>
          </div>
        </div>

        {/* Empty State Demo Loader Pill (If empty) */}
        {portfolio.length === 0 && (
          <div className="mb-8 p-6 bg-gradient-to-r from-[#141923] via-[#0E1117] to-[#141923] border border-[rgba(200,166,70,0.25)] rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-[#E2C76A] uppercase tracking-wider mb-1">
                <Sparkles className="w-3.5 h-3.5 text-[#C8A646]" />
                <span>Hızlı Başlangıç</span>
              </div>
              <h3 className="text-base font-serif font-bold text-white">
                Portföyünüz Henüz Boş mu? Örnek Bursa Portföyüyle Test Edin
              </h3>
              <p className="text-xs text-[#A5A8AE] mt-0.5">
                Tek tıkla 25g Has Altın, 6 Çeyrek ve 20g Bursa Burması ekleyerek getiri analizini canlı görün.
              </p>
            </div>
            <button
              type="button"
              onClick={handleLoadDemoPortfolio}
              className="px-5 py-2.5 bg-[#C8A646] hover:bg-[#E2C76A] text-[#080A0D] font-bold text-xs rounded-xl transition-all shadow-md active:scale-95 shrink-0 cursor-pointer"
            >
              Örnek Portföyü Yükle
            </button>
          </div>
        )}

        {/* Main Interactive Portfolio Tracker Component */}
        <div className="mb-12">
          <PortfolioTracker />
        </div>

        {/* Physical Gold Safe Storage & Vault Advice in Bursa */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="p-6 bg-[#0E1117] border border-[rgba(244,241,232,0.08)] rounded-2xl">
            <div className="flex items-center gap-2 text-base font-serif font-bold text-[#E2C76A] mb-3">
              <Landmark className="w-5 h-5 text-[#C8A646]" />
              <span>Bursa'da Banka Kiralık Kasası vs Ev Kasası</span>
            </div>
            <p className="text-xs text-[#A5A8AE] leading-relaxed mb-3">
              Bursa Heykel ve FSM Bulvarı şubelerinde kiralık kasa yıllık ücretleri bankaya göre değişir. Banka kasaları yangın ve hırsızlığa karşı en yüksek güvenliği sunarken, hafta sonu veya mesai dışı erişim imkanı yoktur.
            </p>
            <p className="text-xs text-[#A5A8AE] leading-relaxed">
              Evde muhafaza edilen altınlar için ise duvara veya zemine gömülü çelik kasalar ve gizli bölmeler tercih edilmelidir. Fiziki külçelerinizi sigorta poliçenize kıymetli maden klozu olarak ekletmeyi değerlendirebilirsiniz.
            </p>
          </div>

          <div className="p-6 bg-[#0E1117] border border-[rgba(244,241,232,0.08)] rounded-2xl">
            <div className="flex items-center gap-2 text-base font-serif font-bold text-[#E2C76A] mb-3">
              <ShieldCheck className="w-5 h-5 text-[#C8A646]" />
              <span>Fiziki Altının Banka Hesabına Göre 3 Üstünlüğü</span>
            </div>
            <div className="space-y-2 text-xs text-zinc-300">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Sıfır Saklama Ücreti:</strong> Bankalardaki hesap işletim masrafı veya kiralık kasa aidatına tabi değildir.</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Mevduat Sigortası Limitinden Bağımsız:</strong> TMSF 650.000 TL garanti limitine takılmaz, mülkiyeti tamamen sizdedir.</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>7/24 Kesintisiz Likidite:</strong> Dijital sistem çökmelerinde dahi Bursa Kapalı Çarşı sarrafında anında nakit TL'ye döner.</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
