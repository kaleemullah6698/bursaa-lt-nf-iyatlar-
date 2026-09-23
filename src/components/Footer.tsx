import React, { useState } from 'react';
import { ArrowUp, Bookmark, Check, ShieldCheck, MapPin, Clock, Phone, Building2, ExternalLink } from 'lucide-react';
import { Link } from './Link';

export const Footer: React.FC = () => {
  const [bookmarked, setBookmarked] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBookmark = () => {
    setBookmarked(true);
    setTimeout(() => setBookmarked(false), 3000);
  };

  return (
    <footer className="bg-[#050709] border-t border-[rgba(244,241,232,0.08)] pt-16 pb-16 text-[#A5A8AE]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        
        {/* $100M FinTech Interactive Value Banner */}
        <div className="bg-gradient-to-r from-[#12161E] via-[#161B24] to-[#10141C] border border-[rgba(200,166,70,0.22)] rounded-3xl p-8 sm:p-12 mb-16 relative overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.6)]">
          {/* Subtle Ambient Gold Glow */}
          <div className="absolute top-0 right-1/4 w-[450px] h-[450px] bg-[#C8A646]/8 rounded-full blur-[110px] pointer-events-none" />
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <div className="flex items-center gap-2 text-xs font-mono text-[#E2C76A] uppercase tracking-wider mb-2.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Bursa Serbest Piyasa OTC Terminali</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-[#F4F1E8] font-bold tracking-tight mb-3 text-balance">
                Bursa Kapalı Çarşı Canlı Kurları Parmaklarınızın Ucunda
              </h2>
              <p className="text-sm sm:text-base text-[#A5A8AE] leading-relaxed max-w-2xl font-normal">
                Bursa Tarihi Kapalı Çarşı sarrafları ve serbest piyasa altın kurlarını anlık takip edin. Banka makaslarından kurtulup Kapalı Çarşı avantajıyla fiziki altın portföyünüzü yönetin.
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-center">
              <Link
                to="/hesaplama"
                className="px-6 py-3.5 bg-gradient-to-r from-[#C8A646] to-[#B89438] hover:from-[#E2C76A] hover:to-[#C8A646] text-[#080A0D] font-bold text-sm rounded-xl transition-all shadow-[0_4px_20px_rgba(200,166,70,0.3)] text-center active:scale-[0.98]"
              >
                Altın & Zekat Hesapla
              </Link>
              <button
                type="button"
                onClick={handleBookmark}
                className="px-5 py-3.5 bg-[#0C0F14] border border-[rgba(244,241,232,0.12)] text-[#F4F1E8] font-semibold text-sm rounded-xl hover:border-[#C8A646]/50 hover:text-[#E2C76A] transition-all flex items-center justify-center gap-2 active:scale-[0.98]"
              >
                {bookmarked ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span className="text-emerald-400 font-semibold font-mono text-xs">Ctrl+D / ⌘+D İle Kaydedildi</span>
                  </>
                ) : (
                  <>
                    <Bookmark className="w-4 h-4 text-[#C8A646]" />
                    <span>Hızlı Erişim İçin Kaydet</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Hyper-Local Bursa Districts Quick Selector Bar */}
        <div className="mb-14 pb-10 border-b border-[rgba(244,241,232,0.06)]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-[#E2C76A] font-semibold flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#C8A646]" />
                Bursa İlçe & Çarşı Merkezleri
              </span>
              <p className="text-xs text-zinc-400 mt-0.5">
                Bursa genelindeki fiziki kuyumcu, sarraf ve serbest piyasa işlem noktaları
              </p>
            </div>
            <Link
              to="/kuyumcular"
              className="text-xs text-[#C8A646] hover:text-[#E2C76A] font-semibold flex items-center gap-1 transition-colors self-start sm:self-auto"
            >
              <span>Tüm 16+ Bursa Kuyumcularını Listele</span>
              <span>→</span>
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-2.5">
            {[
              { name: 'Kapalı Çarşı', district: 'Osmangazi (Merkez)', tag: 'Toptan & Sarraf' },
              { name: 'Cevahir Bedesteni', district: 'Osmangazi', tag: 'Ata & Külçe' },
              { name: 'Nalbantoğlu / Heykel', district: 'Osmangazi', tag: 'Perakende & Set' },
              { name: 'FSM Bulvarı', district: 'Nilüfer', tag: 'Mücevher & Tasarım' },
              { name: 'Özlüce & Balat', district: 'Nilüfer', tag: 'Modern Kuyumcu' },
              { name: 'İnegöl Çarşısı', district: 'İnegöl', tag: 'Sarraflar Çarşısı' }
            ].map((hub, idx) => (
              <Link
                key={idx}
                to="/kuyumcular"
                className="p-3 rounded-xl bg-[#090C10] border border-[rgba(244,241,232,0.05)] hover:border-[#C8A646]/30 hover:bg-[#0E1218] transition-all group text-left block"
              >
                <div className="text-xs font-bold text-white group-hover:text-[#E2C76A] transition-colors truncate">
                  {hub.name}
                </div>
                <div className="text-[10px] text-zinc-500 truncate mt-0.5">
                  {hub.district}
                </div>
                <div className="text-[9px] font-mono text-[#C8A646]/80 mt-1 uppercase tracking-tight">
                  {hub.tag}
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* 4-Column Deep Topical Authority Site Directory */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 mb-14">
          
          {/* Col 1: Brand & Institutional Bursa Credibility (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <Link to="/" className="flex items-center gap-3 group w-fit">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#222834] via-[#141820] to-[#0A0D12] border border-[#C8A646]/40 p-0.5 flex items-center justify-center font-mono">
                <span className="text-[11px] font-black text-[#E2C76A]">BKÇ</span>
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-lg font-bold text-[#F4F1E8] group-hover:text-white transition-colors">
                  Bursa Altın Fiyatları
                </span>
                <span className="text-[11px] text-zinc-400">
                  Tarihi Kapalı Çarşı & Serbest Piyasa
                </span>
              </div>
            </Link>

            <p className="text-xs leading-relaxed text-[#A5A8AE] pr-4">
              Bursa Tarihi Kapalı Çarşı, Bedesten sarrafları ve serbest piyasa kuyumcularının saniyelik fiziki altın alış-satış kotasyonlarını sunan bağımsız finansal bilgi terminali.
            </p>

            {/* Operating Hours Card */}
            <div className="p-3.5 bg-[#090C10] border border-[rgba(244,241,232,0.06)] rounded-xl text-xs space-y-1.5 font-mono">
              <div className="flex items-center gap-1.5 text-zinc-300 font-semibold">
                <Clock className="w-3.5 h-3.5 text-[#C8A646]" />
                <span>Bursa Sarraflar Seans Saatleri:</span>
              </div>
              <div className="text-[11px] text-zinc-400 flex justify-between">
                <span>Hafta İçi (Pzt-Cum):</span>
                <strong className="text-zinc-200">09:00 - 18:30</strong>
              </div>
              <div className="text-[11px] text-zinc-400 flex justify-between">
                <span>Cumartesi:</span>
                <strong className="text-zinc-200">09:00 - 15:00</strong>
              </div>
              <div className="text-[11px] text-zinc-500 flex justify-between">
                <span>Pazar:</span>
                <span className="text-amber-400/90 font-sans">Nöbetçi Kuyumcular Açık</span>
              </div>
            </div>
          </div>

          {/* Col 2: Kurlar & Piyasa Terminali (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-white flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C8A646]" />
              Piyasa Terminali & Kurlar
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/" className="hover:text-[#E2C76A] transition-colors block">
                  Canlı Fiyat Tablosu (21 Enstrüman)
                </Link>
              </li>
              <li>
                <Link to="/grafik" className="hover:text-[#E2C76A] transition-colors block">
                  Teknik Mum Grafik Terminali
                </Link>
              </li>
              <li>
                <Link to="/altin-turleri" className="hover:text-[#E2C76A] transition-colors block">
                  22 Ayar Bursa Burması Fiyatı & Ayarı
                </Link>
              </li>
              <li>
                <Link to="/altin-turleri" className="hover:text-[#E2C76A] transition-colors block">
                  Has Külçe Altın (24 Ayar .995 - .9999)
                </Link>
              </li>
              <li>
                <Link to="/altin-turleri" className="hover:text-[#E2C76A] transition-colors block">
                  Çeyrek, Yarım, Tam & Ata Altın
                </Link>
              </li>
              <li>
                <Link to="/portfoy" className="hover:text-[#E2C76A] transition-colors block">
                  Portföy Varlık & Kâr/Zarar Takibi
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Hesaplama & Planlama Araçları (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-white flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C8A646]" />
              Hesaplama & Finansal Araçlar
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/hesaplama" className="hover:text-[#E2C76A] transition-colors block">
                  Bursa Düğün & Nişan Takı Sepeti Bütçesi
                </Link>
              </li>
              <li>
                <Link to="/hesaplama" className="hover:text-[#E2C76A] transition-colors block">
                  80.18 Gram Nisap Zekat Hesaplayıcı
                </Link>
              </li>
              <li>
                <Link to="/hesaplama" className="hover:text-[#E2C76A] transition-colors block">
                  Hurda 22 Ayar Bilezik Fire & Dönüşüm
                </Link>
              </li>
              <li>
                <Link to="/bursada-altin" className="hover:text-[#E2C76A] transition-colors block">
                  Banka vs Kapalı Çarşı Makas Tasarrufu
                </Link>
              </li>
              <li>
                <Link to="/kuyumcular" className="hover:text-[#E2C76A] transition-colors block">
                  Kapalı Çarşı Otopark & Metro Ulaşım
                </Link>
              </li>
              <li>
                <Link to="/sss" className="hover:text-[#E2C76A] transition-colors block">
                  Sahte Altın Ayırt Etme Kılavuzu (6 Adım)
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Kurumsal & Doğrulama Standartları (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-white flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C8A646]" />
              Veri & Hukuk
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/bursada-altin" className="hover:text-[#E2C76A] transition-colors block">
                  Tarihi Kapalı Çarşı Kültürü
                </Link>
              </li>
              <li>
                <Link to="/kuyumcular" className="hover:text-[#E2C76A] transition-colors block">
                  Nöbetçi Kuyumcu Sistemi
                </Link>
              </li>
              <li>
                <Link to="/sss" className="hover:text-[#E2C76A] transition-colors block">
                  Sıkça Sorulan Sorular
                </Link>
              </li>
              <li className="text-zinc-500 pt-1">
                Referans: BKO & BIST KMTP
              </li>
              <li className="text-zinc-500">
                Gecikme: ~0.4ms Engine
              </li>
            </ul>
          </div>

        </div>

        {/* Legal Disclaimer, Verification Seal & Back to Top */}
        <div className="pt-8 border-t border-[rgba(244,241,232,0.06)] flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-2 text-zinc-400">
            <ShieldCheck className="w-4 h-4 text-[#C8A646] shrink-0" />
            <span>
              © {new Date().getFullYear()} Bursa Altın Fiyatları. Tüm hakları saklıdır. Veriler bilgilendirme amaçlı olup yatırım tavsiyesi niteliği taşımaz.
            </span>
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-zinc-400 hover:text-white transition-colors py-1 px-3 rounded-lg hover:bg-[#14181E] border border-transparent hover:border-zinc-700/50 text-xs font-mono"
            aria-label="Sayfa Başına Dön"
          >
            <span>Başa Dön</span>
            <ArrowUp className="w-3.5 h-3.5 text-[#C8A646]" />
          </button>
        </div>

      </div>
    </footer>
  );
};
