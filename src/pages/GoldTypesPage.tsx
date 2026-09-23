import React, { useState } from 'react';
import { GoldTypesSection } from '../components/GoldTypesSection';
import { useGold } from '../context/GoldContext';
import { Link } from '../components/Link';
import { 
  Coins, 
  ShieldCheck, 
  Scale, 
  HelpCircle, 
  CheckCircle2, 
  Info, 
  Award,
  Sparkles,
  ArrowRight,
  Calculator,
  BarChart2,
  TrendingUp,
  Table,
  BadgeAlert,
  Flame,
  FileCheck,
  Search
} from 'lucide-react';

export const GoldTypesPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#080A0D] py-8 sm:py-12">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        
        {/* Page Hero Header */}
        <div className="mb-10 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-[#E2C76A] uppercase tracking-wider mb-3">
            <Coins className="w-4 h-4 text-[#C8A646]" />
            <span>T.C. Darphanesi Standartları & BKO Onaylı Kılavuz</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#F4F1E8] tracking-tight mb-4 text-balance">
            Bursa Altın Türleri & Ayar Ansiklopedisi
          </h1>

          <p className="text-sm sm:text-base text-[#A5A8AE] leading-relaxed">
            Türkiye Darphanesi ve Bursa Kapalı Çarşı serbest piyasasında işlem gören tüm ziynet, sikke, külçe ve Bursa burması bileziklerin miligram hassasiyetinde ağırlıkları, milyem saflık oranları ve bozdurma dinamikleri.
          </p>

          {/* Clean Navigation Interlinks */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 mt-6 font-mono text-xs">
            <Link 
              to="/" 
              className="px-3.5 py-2 rounded-xl bg-[#101318] border border-[rgba(244,241,232,0.1)] text-[#A5A8AE] hover:text-[#E2C76A] hover:border-[#C8A646]/40 transition-colors flex items-center gap-1.5"
            >
              <Table className="w-3.5 h-3.5 text-[#C8A646]" />
              <span>Canlı 21 Fiyat Tablosu</span>
            </Link>
            <Link 
              to="/hesaplama" 
              className="px-3.5 py-2 rounded-xl bg-[#101318] border border-[rgba(244,241,232,0.1)] text-[#A5A8AE] hover:text-[#E2C76A] hover:border-[#C8A646]/40 transition-colors flex items-center gap-1.5"
            >
              <Calculator className="w-3.5 h-3.5 text-[#C8A646]" />
              <span>Hurda & Fire Hesapla</span>
            </Link>
            <Link 
              to="/grafik" 
              className="px-3.5 py-2 rounded-xl bg-[#101318] border border-[rgba(244,241,232,0.1)] text-[#A5A8AE] hover:text-[#E2C76A] hover:border-[#C8A646]/40 transition-colors flex items-center gap-1.5"
            >
              <BarChart2 className="w-3.5 h-3.5 text-[#C8A646]" />
              <span>Grafik Terminali</span>
            </Link>
          </div>
        </div>

        {/* Hyper-Local Bursa Feature: Meşhur Bursa Burma Bileziği (Specialty Authority) */}
        <div className="bg-gradient-to-br from-[#141923] via-[#0E1117] to-[#0A0D12] border border-[rgba(200,166,70,0.28)] rounded-2xl p-6 sm:p-8 mb-12 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <div className="flex items-center gap-2 text-xs font-mono text-[#E2C76A] uppercase tracking-wider mb-2.5">
                <Award className="w-4 h-4 text-[#C8A646]" />
                <span>Bursa Sarraflar Çarşısı Tescilli Klasiği</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white mb-3">
                22 Ayar Bursa Burma Bileziği Nedir? Neden En İyi Yatırım Aracıdır?
              </h2>
              <p className="text-xs sm:text-sm text-[#A5A8AE] leading-relaxed mb-4">
                Bursa Kapalı Çarşı sarraflarında yüzyıllardır üretilen <strong>Bursa Burması</strong>, 2 veya 3 altın telin özel el tezgâhında bükülmesiyle imal edilir. Şarnelsiz masif yapısı sayesinde eğilip bükülmez, taşsız ve minesiz olduğu için <strong>işçilik fire kaybı minimumdur (%1 - %1.5)</strong>.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs">
                <div className="p-3 bg-[#07090C] rounded-xl border border-zinc-800">
                  <div className="text-[10px] text-zinc-500 uppercase">Standart Ağırlık</div>
                  <div className="text-white font-bold mt-0.5">15g - 40g Arası</div>
                </div>
                <div className="p-3 bg-[#07090C] rounded-xl border border-zinc-800">
                  <div className="text-[10px] text-zinc-500 uppercase">Milyem Saflığı</div>
                  <div className="text-amber-400 font-bold mt-0.5">916 Milyem (22A)</div>
                </div>
                <div className="p-3 bg-[#07090C] rounded-xl border border-zinc-800">
                  <div className="text-[10px] text-zinc-500 uppercase">Bozdurma Kaybı</div>
                  <div className="text-emerald-400 font-bold mt-0.5">%1.2 (Çok Düşük)</div>
                </div>
                <div className="p-3 bg-[#07090C] rounded-xl border border-zinc-800">
                  <div className="text-[10px] text-zinc-500 uppercase">Likidite Hızı</div>
                  <div className="text-sky-400 font-bold mt-0.5">Anında Nakit</div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 bg-[#07090C] border border-[#C8A646]/30 rounded-xl p-5 text-center">
              <span className="text-[11px] font-mono text-zinc-400 uppercase block mb-1">
                25 Gram Bursa Burması Bugün Ne Kadar?
              </span>
              <div className="text-2xl font-mono font-bold text-[#E2C76A] my-2">
                Hesaplama Aracını Kullan
              </div>
              <p className="text-[11px] text-zinc-400 mb-4">
                İşçilikli veya işçiliksiz tüm gramajların anlık Bursa Kapalı Çarşı değerini görün.
              </p>
              <Link
                to="/hesaplama"
                className="w-full py-2.5 bg-[#C8A646] hover:bg-[#E2C76A] text-[#080A0D] font-bold text-xs rounded-xl transition-colors block text-center"
              >
                Bilezik Değerini Hesapla
              </Link>
            </div>
          </div>
        </div>

        {/* Existing Types Explorer Component */}
        <div className="mb-12">
          <GoldTypesSection />
        </div>

        {/* Ayar & Saflık Karşılaştırma Matrisi */}
        <div className="bg-[#0E1117] border border-[rgba(244,241,232,0.08)] rounded-2xl p-5 sm:p-6 mb-12">
          <div className="flex items-center gap-2 text-base font-serif font-bold text-white mb-4">
            <Scale className="w-5 h-5 text-[#C8A646]" />
            <span>Altın Ayarları & Milyem (Saflık) Referans Tablosu</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead>
                <tr className="border-b border-[rgba(244,241,232,0.08)] text-[#A5A8AE] uppercase tracking-wider text-[11px]">
                  <th className="py-3 px-4">Ayar</th>
                  <th className="py-3 px-4">Milyem Saflık Oranı</th>
                  <th className="py-3 px-4">Saf Altın Yüzdesi</th>
                  <th className="py-3 px-4">Kullanım Alanı</th>
                  <th className="py-3 px-4 text-right">Örnek Ürün</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[rgba(244,241,232,0.04)] text-zinc-300">
                <tr className="hover:bg-[#14181E] transition-colors">
                  <td className="py-3.5 px-4 font-bold text-[#E2C76A]">24 Ayar</td>
                  <td className="py-3.5 px-4">995 - 999.9 Milyem</td>
                  <td className="py-3.5 px-4 text-emerald-400 font-bold">%99.50 - %99.99</td>
                  <td className="py-3.5 px-4 text-zinc-400">Saf Yatırımlık Külçe & Has Gram</td>
                  <td className="py-3.5 px-4 text-right font-sans font-semibold text-white">İAR / Nadir Sertifikalı Külçe</td>
                </tr>
                <tr className="hover:bg-[#14181E] transition-colors">
                  <td className="py-3.5 px-4 font-bold text-[#E2C76A]">22 Ayar</td>
                  <td className="py-3.5 px-4">916 Milyem</td>
                  <td className="py-3.5 px-4 text-emerald-400 font-bold">%91.60</td>
                  <td className="py-3.5 px-4 text-zinc-400">Cumhuriyet, Çeyrek, Yatırımlık Bilezik</td>
                  <td className="py-3.5 px-4 text-right font-sans font-semibold text-white">Bursa Burma Bilezik</td>
                </tr>
                <tr className="hover:bg-[#14181E] transition-colors">
                  <td className="py-3.5 px-4 font-bold text-[#E2C76A]">18 Ayar</td>
                  <td className="py-3.5 px-4">750 Milyem</td>
                  <td className="py-3.5 px-4 text-amber-400 font-bold">%75.00</td>
                  <td className="py-3.5 px-4 text-zinc-400">Pırlantalı Mücevher & Tasarım Takı</td>
                  <td className="py-3.5 px-4 text-right font-sans font-semibold text-white">Pırlanta Tektaş Montür</td>
                </tr>
                <tr className="hover:bg-[#14181E] transition-colors">
                  <td className="py-3.5 px-4 font-bold text-[#E2C76A]">14 Ayar</td>
                  <td className="py-3.5 px-4">585 Milyem</td>
                  <td className="py-3.5 px-4 text-zinc-400 font-bold">%58.50</td>
                  <td className="py-3.5 px-4 text-zinc-400">Zincir, Küpe, Hediyelik Takı Seti</td>
                  <td className="py-3.5 px-4 text-right font-sans font-semibold text-white">Baget Kolye & Küpe</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Eski Tarih vs Yeni Tarih Çeyrek Altın Farkı (Solves user confusion!) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="p-6 bg-[#0E1117] border border-[rgba(244,241,232,0.08)] rounded-2xl">
            <div className="flex items-center gap-2 text-base font-serif font-bold text-[#E2C76A] mb-3">
              <FileCheck className="w-5 h-5 text-[#C8A646]" />
              <span>Yeni Tarihli vs Eski Tarihli Çeyrek Altın Farkı</span>
            </div>
            <p className="text-xs text-[#A5A8AE] leading-relaxed mb-3">
              İçinde bulunduğumuz takvim yılında Darphane tarafından basılan çeyrek altınlara <strong>"Yeni Tarihli"</strong>, önceki yıllara ait olanlara ise <strong>"Eski Tarihli"</strong> denir.
            </p>
            <div className="p-3 bg-[#07090C] rounded-xl border border-zinc-800 text-xs text-zinc-300 space-y-1 font-mono">
              <div className="flex justify-between">
                <span>Alırken Fiyat Farkı:</span>
                <span className="text-amber-400">Yeni tarihli 20 - 40 TL daha pahalıdır</span>
              </div>
              <div className="flex justify-between">
                <span>Satarken (Bozdururken):</span>
                <span className="text-emerald-400 font-bold">FARK YOKTUR! Aynı fiyattan alınır</span>
              </div>
            </div>
            <p className="text-[11px] text-zinc-400 mt-3 leading-relaxed">
              <strong>Yatırım Tavsiyesi:</strong> Düğün takısı hediyesi yapmayacaksanız, kendi birikiminiz için daima <strong>Eski Tarihli</strong> çeyrek tercih edin. Alırken daha az öder, satarken aynı parayı alırsınız!
            </p>
          </div>

          {/* Sahte Altın Tespiti Kılavuzu */}
          <div className="p-6 bg-[#0E1117] border border-[rgba(244,241,232,0.08)] rounded-2xl">
            <div className="flex items-center gap-2 text-base font-serif font-bold text-[#E2C76A] mb-3">
              <BadgeAlert className="w-5 h-5 text-[#C8A646]" />
              <span>Sahte Altın Nasıl Anlaşılır? (4 Basit Test)</span>
            </div>
            <div className="space-y-2.5 text-xs text-zinc-300">
              <div className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-[#C8A646]/20 text-[#E2C76A] font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                  1
                </span>
                <div>
                  <strong>Mıknatıs Testi:</strong> Gerçek altın diamanyetiktir; güçlü bir neodimyum mıknatıs altını kesinlikle çekmez. Çekiyorsa içine demir veya nikel karıştırılmıştır.
                </div>
              </div>
              <div className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-[#C8A646]/20 text-[#E2C76A] font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                  2
                </span>
                <div>
                  <strong>Ses (Çınlama) Testi:</strong> Sert zemin üzerine hafifçe düşürüldüğünde gerçek altın tiz, uzun ve kristal bir "çınnn" sesi verir. Sahte altın donuk "tok" bir ses çıkarır.
                </div>
              </div>
              <div className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-[#C8A646]/20 text-[#E2C76A] font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                  3
                </span>
                <div>
                  <strong>Hassas Ağırlık Testi:</strong> Çeyrek altın tam olarak 1.754 gram, Cumhuriyet altını 7.216 gram gelmelidir. 0.05 gramdan fazla sapma sahtecilik işaretidir.
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
