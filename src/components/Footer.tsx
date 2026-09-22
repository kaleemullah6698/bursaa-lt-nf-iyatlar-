import React from 'react';
import { ArrowUp, Bookmark } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#050709] border-t border-[rgba(244,241,232,0.08)] pt-12 pb-16">
      <div className="max-w-[1180px] mx-auto px-4 sm:px-6">
        {/* CTA Banner matching user's HTML */}
        <div className="bg-gradient-to-r from-[#14181E] via-[#1A2028] to-[#14181E] border border-[rgba(200,166,70,0.25)] rounded-3xl p-8 sm:p-10 mb-14 text-center relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#C8A646]/10 rounded-full blur-[90px] pointer-events-none" />
          
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-serif text-[#F4F1E8] font-semibold tracking-tight mb-3">
              Fiyatlar cebinizde
            </h2>
            <p className="text-sm sm:text-base text-[#A5A8AE] leading-relaxed mb-6">
              Bursa altın fiyatlarını anlık takip etmek için bu sayfayı yer işaretlerinize ekleyin. Hafta içi gün boyunca veriler otomatik güncellenir.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <a
                href="#fiyatlar"
                className="px-6 py-2.5 bg-[#C8A646] text-[#080A0D] font-semibold text-sm rounded-xl hover:bg-[#E2C76A] transition-colors shadow-lg"
              >
                Canlı Fiyatlara Dön
              </a>
              <button
                type="button"
                onClick={() => {
                  alert('Sayfayı sık kullanılanlara eklemek için klavyenizden CTRL + D (veya Mac için CMD + D) tuşlarına basabilirsiniz.');
                }}
                className="px-5 py-2.5 bg-[#101318] border border-[rgba(244,241,232,0.12)] text-[#F4F1E8] font-medium text-sm rounded-xl hover:border-[#C8A646]/40 hover:text-[#E2C76A] transition-colors flex items-center gap-2"
              >
                <Bookmark className="w-4 h-4 text-[#C8A646]" />
                <span>Yer İşaretlerine Ekle</span>
              </button>
            </div>
          </div>
        </div>

        {/* 3-Column Footer Grid matching user's HTML */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand Info */}
          <div className="md:col-span-2">
            <div className="font-serif text-lg font-semibold text-[#F4F1E8] mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#C8A646]" />
              Bursa Altın Fiyatları
            </div>
            <p className="text-sm text-[#A5A8AE] max-w-sm leading-relaxed mb-4">
              Bursa Kapalıçarşı ve serbest piyasa altın kurlarının güvenilir, şeffaf ve anlık takip platformu.
            </p>
            <div className="text-xs text-[#A5A8AE]/80">
              Veri Akışı: Spot Altın (PAXG/XAU) & Serbest Piyasa USD/TRY
            </div>
          </div>

          {/* Sayfalar */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#F4F1E8] mb-4">
              Sayfalar
            </h4>
            <ul className="space-y-2 text-sm text-[#A5A8AE]">
              <li>
                <a href="#fiyatlar" className="hover:text-[#E2C76A] transition-colors">
                  Canlı Fiyatlar
                </a>
              </li>
              <li>
                <a href="#grafik" className="hover:text-[#E2C76A] transition-colors">
                  Mum Grafik Ekranı
                </a>
              </li>
              <li>
                <a href="#altin-turleri" className="hover:text-[#E2C76A] transition-colors">
                  Altın Türleri
                </a>
              </li>
              <li>
                <a href="#altin-hesaplama" className="hover:text-[#E2C76A] transition-colors">
                  Altın Hesaplama
                </a>
              </li>
              <li>
                <a href="#bursada-altin" className="hover:text-[#E2C76A] transition-colors">
                  Bursa'da Altın
                </a>
              </li>
              <li>
                <a href="#sss" className="hover:text-[#E2C76A] transition-colors">
                  Sıkça Sorulan Sorular
                </a>
              </li>
            </ul>
          </div>

          {/* Yasal & İletişim */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#F4F1E8] mb-4">
              Yasal & İletişim
            </h4>
            <ul className="space-y-2 text-sm text-[#A5A8AE]">
              <li>
                <a href="#disclaimer" className="hover:text-[#E2C76A] transition-colors">
                  Yasal Uyarı
                </a>
              </li>
              <li>
                <a href="mailto:info@bursaaltinfiyatlari.com" className="hover:text-[#E2C76A] transition-colors">
                  İletişim
                </a>
              </li>
              <li>
                <a href="#disclaimer" className="hover:text-[#E2C76A] transition-colors">
                  Gizlilik Politikası
                </a>
              </li>
              <li>
                <button
                  type="button"
                  onClick={scrollToTop}
                  className="inline-flex items-center gap-1.5 text-xs text-[#C8A646] hover:text-[#E2C76A] transition-colors mt-2"
                >
                  <ArrowUp className="w-3.5 h-3.5" />
                  Başa Dön
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal Disclaimer Box matching user's HTML */}
        <div id="disclaimer" className="pt-8 border-t border-[rgba(244,241,232,0.06)] text-xs text-[#A5A8AE] leading-relaxed">
          <p>
            <strong>Yasal Uyarı:</strong> Bu sayfada yer alan tüm veriler, grafikler ve hesaplamalar yalnızca genel bilgilendirme amacıyla sunulmaktadır. Burada yer alan hiçbir bilgi yatırım tavsiyesi, alım-satım önerisi veya finansal danışmanlık niteliği taşımaz. Fiziki altın alım ve satım işlemlerinizde nihai kararı vermeden önce yetkili kuyumcunuzla veya finansal danışmanınızla görüşmeniz önerilir.
          </p>
          <p className="mt-4 text-[#A5A8AE]/70 font-mono text-[11px]">
            © 2026 Bursa Altın Fiyatları. Tüm hakları saklıdır.
          </p>
        </div>
      </div>
    </footer>
  );
};
