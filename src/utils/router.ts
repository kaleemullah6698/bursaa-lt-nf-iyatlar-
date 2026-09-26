/**
 * Clean HTML5 Browser History Routing Utilities
 * Google SEO Compliant Hyphenated URLs:
 * Hub: '/'
 * City Pages: '/bursa-altin-fiyatlari', '/ankara-altin-fiyatlari', '/istanbul-altin-fiyatlari', '/izmir-altin-fiyatlari'
 * Submodules: '/grafik', '/altin-turleri', '/portfoy', '/hesaplama', '/kuyumcular', '/bursada-altin', '/sss'
 */

import { CityId } from '../types/city';
import { CITIES, CITY_BY_SLUG } from '../data/cities';

export type PageRoute = 
  | 'fiyatlar'
  | 'grafik'
  | 'altin-turleri'
  | 'portfoy'
  | 'hesaplama'
  | 'bursada-altin'
  | 'kuyumcular'
  | 'sss';

export interface RouteResolution {
  page: PageRoute;
  cityId?: CityId;
  slug?: string;
  isCityHub?: boolean;
}

export const ROUTE_MAP: Record<string, PageRoute> = {
  '/': 'fiyatlar',
  '/fiyatlar': 'fiyatlar',
  '/grafik': 'grafik',
  '/altin-turleri': 'altin-turleri',
  '/portfoy': 'portfoy',
  '/hesaplama': 'hesaplama',
  '/bursada-altin': 'bursada-altin',
  '/kuyumcular': 'kuyumcular',
  '/sss': 'sss'
};

export const PAGE_PATHS: Record<PageRoute, string> = {
  'fiyatlar': '/',
  'grafik': '/grafik',
  'altin-turleri': '/altin-turleri',
  'portfoy': '/portfoy',
  'hesaplama': '/hesaplama',
  'bursada-altin': '/bursada-altin',
  'kuyumcular': '/kuyumcular',
  'sss': '/sss'
};

// Friendly aliases for direct navigation
export const CITY_SLUG_MAP: Record<string, CityId> = {
  'bursa-altin-fiyatlari': 'bursa',
  'ankara-altin-fiyatlari': 'ankara',
  'istanbul-altin-fiyatlari': 'istanbul',
  'izmir-altin-fiyatlari': 'izmir',
  // Short path aliases
  'bursa': 'bursa',
  'ankara': 'ankara',
  'istanbul': 'istanbul',
  'izmir': 'izmir'
};

export const CITY_CANONICAL_PATHS: Record<CityId, string> = {
  'bursa': '/bursa-altin-fiyatlari',
  'ankara': '/ankara-altin-fiyatlari',
  'istanbul': '/istanbul-altin-fiyatlari',
  'izmir': '/izmir-altin-fiyatlari'
};

export const ROUTE_TITLES: Record<PageRoute, string> = {
  'fiyatlar': 'Bursa Altın Fiyatları Canlı | Kapalı Çarşı Anlık Kurlar 2026',
  'grafik': 'Grafik Terminali | Altın Teknik Analiz & Canlı Mum Grafikler 2026',
  'altin-turleri': 'Altın Türleri Ansiklopedisi | Darphane, Külçe ve Has Ağırlıklar 2026',
  'portfoy': 'Altın Portföy Yönetim İstasyonu | Kâr & Zarar Takibi 2026',
  'hesaplama': 'Altın Hesaplama & Zekat Terminali (80.18g Nisap) | 2026 Kurları',
  'bursada-altin': "Tarihi Kapalı Çarşı & Sarraflar Rehberi | Banka Makas Analizi 2026",
  'kuyumcular': 'Kuyumcular & Sarraflar Rehberi | Çalışma Saatleri & Ulaşım 2026',
  'sss': 'Sıkça Sorulan Sorular (SSS) | Serbest Piyasa Altın Bilgi Bankası 2026'
};

export const ROUTE_META_DESCRIPTIONS: Record<PageRoute, string> = {
  'fiyatlar': 'Bursa, Ankara, İstanbul ve İzmir serbest piyasa canlı altın fiyatları. Gram altın, çeyrek, 22 ayar bilezik anlık alış satış kurları ve canlı piyasa motoru.',
  'grafik': 'Kapalı Çarşı ve serbest piyasa altın fiyatları teknik analiz grafik terminali. 1D, 1W, 1M, 1Y mum grafikler, EMA, RSI ve osilatör indikatörleri.',
  'altin-turleri': 'Kapalı Çarşı ve T.C. Darphane altın türleri kataloğu. 24A, 22A, 18A, 14A ayar, milyem saflık oranları ve miligram has altın ağırlıkları.',
  'portfoy': 'Fiziki altın ve ziynet birikimleriniz için yerel portföy yöneticisi. Anlık net kâr/zarar, alış maliyeti ve varlık dağılımı analizi.',
  'hesaplama': 'Serbest piyasa canlı kurlarıyla altın çevirici, 80.18g nisap miktarına göre Diyanet uyumlu altın zekatı ve düğün takı bütçesi hesaplayıcısı.',
  'bursada-altin': 'Tarihi Kapalı Çarşı ve Bedesten altın piyasası rehberi. Banka makas farkları, fiziki teslimat ve kuyumcu işlem dinamikleri.',
  'kuyumcular': 'Kuyumcular Odası resmi çalışma saatleri, Osmangazi, Çankaya, Beyazıt, Konak kuyumcuları ve nöbetçi sarraflar rehberi.',
  'sss': 'Serbest piyasa altın kotasyonları, eski-yeni tarih farkı, 22 ayar bilezik işçilik kesintisi ve Kapalı Çarşı hakkında sıkça sorulan sorular.'
};

/**
 * Normalizes pathname from window.location and resolves city / page / slug
 */
export function getRouteFromPath(pathname: string): RouteResolution {
  const clean = pathname.replace(/\/+$/, '') || '/';
  const bareSlug = clean.replace(/^\//, '').toLowerCase();

  // 1. Check if it's the root hub
  if (clean === '/') {
    return { page: 'fiyatlar', isCityHub: true };
  }

  // 2. Check if it's a dedicated city SEO URL (e.g. /ankara-altin-fiyatlari or /ankara)
  if (CITY_SLUG_MAP[bareSlug]) {
    return { 
      page: 'fiyatlar', 
      cityId: CITY_SLUG_MAP[bareSlug],
      isCityHub: false 
    };
  }

  // 3. Check exact route map
  if (ROUTE_MAP[clean]) {
    return { page: ROUTE_MAP[clean] };
  }

  // 4. Check if it's an instrument slug like '/gram-altin' or '/ceyrek-altin'
  if (bareSlug) {
    return { page: 'fiyatlar', slug: bareSlug };
  }

  return { page: 'fiyatlar', isCityHub: true };
}

/**
 * Dispatches a client-side route change without hash and with clean browser history
 */
export function navigate(to: string, options?: { replace?: boolean; smoothScroll?: boolean }) {
  const cleanPath = to.startsWith('/') ? to : `/${to}`;

  if (typeof window !== 'undefined') {
    if (options?.replace) {
      window.history.replaceState({}, '', cleanPath);
    } else {
      window.history.pushState({}, '', cleanPath);
    }

    // Dispatch popstate event so all listeners update synchronously
    window.dispatchEvent(new PopStateEvent('popstate'));

    if (options?.smoothScroll !== false) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
}

/**
 * Converts any lingering legacy hash like '#/altin-turleri' to clean HTML5 path '/altin-turleri'
 */
export function sanitizeHashToPath(): string | null {
  if (typeof window === 'undefined') return null;
  const hash = window.location.hash;
  if (!hash) return null;

  const raw = hash.replace(/^#\/?/, '').trim();
  if (!raw) {
    window.history.replaceState({}, '', '/');
    return '/';
  }

  const targetPath = raw.startsWith('/') ? raw : `/${raw}`;
  window.history.replaceState({}, '', targetPath);
  return targetPath;
}
