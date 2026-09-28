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
  'fiyatlar': 'Bursa Altın Fiyatları Canlı | Kapalı Çarşı Kurları',
  'grafik': 'Altın Grafik Terminali | Canlı Teknik Analiz 2026',
  'altin-turleri': 'Altın Türleri Ansiklopedisi | Gramaj ve Ayar Rehberi',
  'portfoy': 'Altın Portföy Takibi | Anlık Kâr & Zarar Hesaplama',
  'hesaplama': 'Altın Hesaplama & Zekat Terminali | 80.18g Nisap',
  'bursada-altin': "Bursa'da Altın & Kapalı Çarşı | Banka Makas Analizi",
  'kuyumcular': 'Bursa Kuyumcular Rehberi | Çalışma Saatleri & Adres',
  'sss': 'Altın Rehberi & SSS | Kapalı Çarşı Bilgi Bankası'
};

export const ROUTE_META_DESCRIPTIONS: Record<PageRoute, string> = {
  'fiyatlar': 'Bursa Kapalı Çarşı canlı altın fiyatları: 24 ayar gram, çeyrek, 22 ayar bilezik ve ata altın anlık alış-satış kurları, piyasa farkları ve canlı takip motoru.',
  'grafik': 'Canlı altın mum grafikleri, TradingView derinlik analizi, EMA ve RSI göstergeleri. Gram, çeyrek ve ons altın teknik fiyat hareketlerini anlık inceleyin.',
  'altin-turleri': 'Darphane ve Kapalı Çarşı altın türleri kataloğu. 24, 22, 18, 14 ayar altın saflık dereceleri, milyem oranları, gram ağırlıkları ve yatırım özellikleri.',
  'portfoy': 'Fiziki altın ve ziynet birikimlerinizi kaydedin; anlık canlı kurlarla net kâr-zararınızı, ortalama alış maliyetinizi ve portföy getirinizi ücretsiz izleyin.',
  'hesaplama': 'Canlı serbest piyasa kurlarıyla altın çevirici, 80.18 gram nisap sınırına göre Diyanet uyumlu altın zekat hesabı ve düğün takı bütçesi planlayıcısı.',
  'bursada-altin': 'Tarihi Bursa Kapalı Çarşı ve Bedesten altın piyasası analizi. Banka alım-satım makas farkları, fiziki teslimat avantajları ve sarrafiye alım rehberi.',
  'kuyumcular': 'Bursa Kapalı Çarşı, Osmangazi ve Nilüfer kuyumcuları listesi. Resmi çalışma saatleri, nöbetçi sarraflar, telefon numaraları ve çarşı ulaşım krokisi.',
  'sss': 'Altın alım satımında sıkça sorulan sorular: Eski-yeni tarih farkı, 22 ayar bilezik işçilik kesintisi, sahte altın kontrolü ve serbest piyasa kuralları.'
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
