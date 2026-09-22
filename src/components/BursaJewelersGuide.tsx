import React, { useState } from 'react';
import { BURSA_JEWELER_HUBS } from '../data/bursaJewelers';
import { 
  Building2, 
  MapPin, 
  Clock, 
  Phone, 
  Store, 
  CheckCircle2, 
  Search,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';

export const BursaJewelersGuide: React.FC = () => {
  const [selectedDistrict, setSelectedDistrict] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const districts = ['all', 'Osmangazi (Heykel)', 'Osmangazi (Merkez)', 'Nilüfer', 'İnegöl'];

  const filteredHubs = BURSA_JEWELER_HUBS.filter(hub => {
    if (selectedDistrict !== 'all' && !hub.district.includes(selectedDistrict)) return false;
    if (!searchTerm.trim()) return true;
    const q = searchTerm.toLowerCase();
    return (
      hub.name.toLowerCase().includes(q) ||
      hub.area.toLowerCase().includes(q) ||
      hub.district.toLowerCase().includes(q) ||
      hub.specialty.toLowerCase().includes(q)
    );
  });

  return (
    <section id="bursa-kuyumculari" className="py-16 border-b border-white/5 bg-[#080A0D]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-2 text-xs text-[#9FA3AA] mb-2">
              <span className="text-[#C9A227] font-semibold uppercase tracking-wider text-[11px]">Bursa Yerel Rehberi</span>
              <span aria-hidden="true" className="text-[#666C77]">·</span>
              <span>Kuyumcular Çarşısı & Sarraflar</span>
            </div>
            <h2 className="font-cinzel text-2xl sm:text-3xl font-bold text-[#F5F1E8]">
              Bursa Kuyumcuları ve Kapalı Çarşı Merkezleri
            </h2>
            <p className="text-sm text-[#9FA3AA] mt-1.5 max-w-2xl">
              Bursa'da altın bozdurabileceğiniz, yatırımlık külçe veya 22 ayar bilezik satın alabileceğiniz başlıca tarihi ve modern kuyumcu lokasyonları ve çalışma saatleri.
            </p>
          </div>

          {/* District filter */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-xs text-[#666C77] mr-1">Bölge:</span>
            {districts.map(d => (
              <button
                key={d}
                onClick={() => setSelectedDistrict(d)}
                className={`px-3 py-1.5 text-xs font-medium rounded-sm transition-all cursor-pointer ${
                  selectedDistrict === d
                    ? 'bg-[#C9A227] text-black font-semibold'
                    : 'bg-[#111419] text-[#9FA3AA] hover:text-[#F5F1E8] border border-white/5'
                }`}
              >
                {d === 'all' ? 'Tüm Bursa' : d}
              </button>
            ))}
          </div>
        </div>

        {/* Hubs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredHubs.map(hub => (
            <div
              key={hub.id}
              className="bg-[#0D1015] border border-white/8 hover:border-[#C9A227]/40 rounded-sm p-6 flex flex-col justify-between transition-all group"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div>
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-[#C9A227]">
                      {hub.district}
                    </span>
                    <h3 className="font-semibold text-base text-[#F5F1E8] group-hover:text-[#E3C766] transition-colors mt-0.5">
                      {hub.name}
                    </h3>
                  </div>
                  <div className="p-2 bg-white/5 rounded-xs text-[#9FA3AA]">
                    <Store className="w-4 h-4" />
                  </div>
                </div>

                <p className="text-xs text-[#9FA3AA] leading-relaxed mb-4">
                  {hub.description}
                </p>

                <div className="space-y-2.5 text-xs border-t border-white/5 pt-3">
                  <div className="flex items-start gap-2 text-[#9FA3AA]">
                    <MapPin className="w-3.5 h-3.5 text-[#C9A227] shrink-0 mt-0.5" />
                    <span>{hub.address}</span>
                  </div>

                  <div className="flex items-start gap-2 text-[#9FA3AA]">
                    <Clock className="w-3.5 h-3.5 text-[#C9A227] shrink-0 mt-0.5" />
                    <span>{hub.workingHours}</span>
                  </div>

                  <div className="flex items-start gap-2 text-[#9FA3AA]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>Uzmanlık:</strong> {hub.specialty}</span>
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-white/5 flex items-center justify-between text-xs text-[#666C77]">
                <span className="font-medium text-[#F5F1E8]">{hub.storeCount}</span>
                {hub.phone && (
                  <a 
                    href={`tel:${hub.phone.replace(/[^0-9]/g, '')}`}
                    className="text-[#C9A227] hover:underline flex items-center gap-1"
                  >
                    <Phone className="w-3 h-3" />
                    <span>İletişim</span>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Local Guild Information Notice */}
        <div className="mt-10 bg-[#0E1217] border border-white/8 rounded-sm p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-6 h-6 text-[#C9A227] shrink-0" />
            <div>
              <h4 className="text-sm font-semibold text-[#F5F1E8]">
                Bursa Kuyumcular Odası ve Tüketici Hakları Güvencesi
              </h4>
              <p className="text-xs text-[#9FA3AA] mt-0.5">
                Bursa Kuyumcular Odası'na kayıtlı esnaflardan yapacağınız tüm altın alışverişlerinde ayar garantisi ve tüketici hakem heyeti denetimi bulunmaktadır.
              </p>
            </div>
          </div>
          <a
            href="tel:02242214480"
            className="px-4 py-2 bg-[#171D25] hover:bg-[#1F2633] border border-white/10 text-xs text-[#F5F1E8] rounded-sm transition-colors whitespace-nowrap"
          >
            Oda İle İletişime Geç
          </a>
        </div>

      </div>
    </section>
  );
};
