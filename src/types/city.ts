export type CityId = 'bursa' | 'ankara' | 'istanbul' | 'izmir';

export interface CityFaq {
  question: string;
  answer: string;
}

export interface CityHubInfo {
  name: string;
  type: string;
  jewelersCount: number;
  highlight: string;
  metroInfo: string;
}

export interface CityEditorialPoint {
  title: string;
  desc: string;
}

export interface CityConfig {
  id: CityId;
  name: string;
  slug: string; // e.g. 'bursa-altin-fiyatlari', 'ankara-altin-fiyatlari'
  shortCode: string;
  marketName: string;
  tableTitle: string;
  chamberName: string;
  workingHours: string;
  spreadModifier: number; // local OTC spread factor
  pricePremiumTL: number; // local spot difference relative to baseline
  localHighlight: string;
  districts: string[];
  description: string;
  tradingVolume24h: string;
  activeJewelersCount: number;
  heroKicker: string;
  heroTitle: string;
  heroSubtitle: string;
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string;
  geoRegion: string; // e.g. TR-16, TR-06
  geoPlacename: string;
  geoPosition: string; // latitude;longitude
  address: string;
  phone: string;
  postalCode: string;
  faqs: CityFaq[];
  editorialTitle: string;
  editorialSubtitle: string;
  editorialPoints: CityEditorialPoint[];
  keyHubs: CityHubInfo[];
}
