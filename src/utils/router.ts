/**
 * Clean HTML5 Browser History Routing Utilities
 * Root URL: '/'
 * Subpages: '/grafik', '/altin-turleri', '/portfoy', '/hesaplama', '/bursada-altin', '/kuyumcular', '/sss'
 * Zero hash '#' in the URL.
 */

export type PageRoute = 
  | 'fiyatlar'
  | 'grafik'
  | 'altin-turleri'
  | 'portfoy'
  | 'hesaplama'
  | 'bursada-altin'
  | 'kuyumcular'
  | 'sss';

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

export const ROUTE_TITLES: Record<PageRoute, string> = {
  'fiyatlar': 'Bursa Altın Fiyatları Canlı | Kapalı Çarşı Anlık Kurlar 2026',
  'grafik': 'Grafik Terminali | Bursa Altın Teknik Analiz & Mum Grafikler',
  'altin-turleri': 'Altın Türleri Ansiklopedisi | Bursa Darphane Has Ağırlıklar',
  'portfoy': 'Altın Portföy Yönetim İstasyonu | Kâr & Zarar Takibi',
  'hesaplama': 'Altın Hesaplama & Zekat Terminali (80.18g Nisap) | Bursa',
  'bursada-altin': "Bursa'da Altın & Kapalı Çarşı Rehberi | Banka Makas Analizi",
  'kuyumcular': 'Bursa Kuyumcular Rehberi | Osmangazi, Nilüfer & Çalışma Saatleri',
  'sss': 'Sıkça Sorulan Sorular (SSS) | Bursa Altın Piyasası Bilgi Bankası'
};

export const ROUTE_META_DESCRIPTIONS: Record<PageRoute, string> = {
  'fiyatlar': 'Bursa Kapalı Çarşı serbest piyasa canlı altın fiyatları. Gram altın, çeyrek altın, 22 ayar bilezik anlık alış satış kurları ve canlı piyasa verileri.',
  'grafik': 'Bursa Kapalı Çarşı altın fiyatları teknik analiz grafik terminali. 1D, 1W, 1M, 1Y mum grafikler, EMA, RSI ve osilatör indikatörleri.',
  'altin-turleri': 'Bursa Kapalı Çarşı ve Darphane altın türleri kataloğu. 24A, 22A, 18A, 14A ayar, milyem saflık oranları ve miligram has altın ağırlıkları.',
  'portfoy': 'Fiziki altın ve ziynet birikimleriniz için yerel portföy yöneticisi. Anlık net kâr/zarar, alış maliyeti ve getiri analizi.',
  'hesaplama': 'Bursa Kapalı Çarşı kurlarıyla altın çevirici, 80.18g nisap miktarına göre Diyanet uyumlu altın zekatı ve düğün takı bütçesi hesaplama.',
  'bursada-altin': 'Bursa Tarihi Kapalı Çarşı ve Bedesten altın piyasası rehberi. Banka makas farkları, fiziki teslimat ve kuyumcu işlem dinamikleri.',
  'kuyumcular': 'Bursa Kuyumcular Odası resmi çalışma saatleri, Osmangazi, Nilüfer, Yıldırım kuyumcuları ve nöbetçi sarraflar rehberi.',
  'sss': 'Bursa altın piyasası, eski-yeni tarih farkı, 22 ayar bilezik işçilik kaybı ve Kapalı Çarşı serbest piyasası hakkında sıkça sorulan sorular.'
};

/**
 * Normalizes pathname from window.location
 */
export function getRouteFromPath(pathname: string): { page: PageRoute; slug?: string } {
  const clean = pathname.replace(/\/+$/, '') || '/';

  if (ROUTE_MAP[clean]) {
    return { page: ROUTE_MAP[clean] };
  }

  // Check if it's an instrument slug like '/gram-altin' or '/ceyrek-altin'
  const slug = clean.replace(/^\//, '');
  if (slug) {
    return { page: 'fiyatlar', slug };
  }

  return { page: 'fiyatlar' };
}

/**
 * Dispatches a client-side route change without hash
 */
export function navigate(to: string, options?: { replace?: boolean; smoothScroll?: boolean }) {
  const cleanPath = to.startsWith('/') ? to : `/${to}`;

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
