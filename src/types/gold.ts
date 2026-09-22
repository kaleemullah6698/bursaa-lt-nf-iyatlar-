export type GoldCategory = 'yatirim' | 'ziynet' | 'bilezik' | 'ons_doviz' | 'emtia';

export interface GoldPriceItem {
  id: string;
  slug: string;
  symbolCode?: string; // e.g. "GOLD (TL/GR)", "22B", "XAU/USD"
  name: string;
  subtitle?: string; // e.g. "Spot Gold (TL/GR)", "22 Karat Bracelet Gram/TL"
  shortName: string;
  badgeType?: '1g' | 'B' | 'oz' | 'S_dollar' | 'S_euro' | 'republic' | 'half' | 'quarter' | 'ata' | 'silver' | 'custom';
  currency?: 'TRY' | 'USD' | 'EUR';
  category: GoldCategory;
  karat: number; // e.g. 24, 22, 18, 14
  weightGram: number; // e.g. 1.00 for gram, 1.75 for çeyrek, 7.216 for cumhuriyet
  purity: number; // e.g. 0.995 for 24k, 0.916 for 22k
  buyingPrice: number; // Alış
  sellingPrice: number; // Satış
  changeRate: number; // Daily change % e.g. 0.10
  changeAmount: number; // Daily change TL/USD e.g. 5.97
  dayLow: number;
  dayHigh: number;
  previousClose: number;
  lastUpdate: string;
  source: string;
  description: string;
  sparkline: number[]; // Trend points
  features: string[];
  historicalTips: string;
}

export interface BursaJewelerHub {
  id: string;
  name: string;
  district: string;
  address: string;
  area: string;
  workingHours: string;
  description: string;
  storeCount: string;
  specialty: string;
  phone?: string;
  hasWeekendOpen: boolean;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface PriceAlert {
  id: string;
  goldId: string;
  targetPrice: number;
  condition: 'above' | 'below';
  createdAt: string;
  active: boolean;
}

export interface PortfolioItem {
  id: string;
  goldId: string;
  amount: number;
  buyPrice: number;
  buyDate: string;
  notes?: string;
}

export interface PortfolioSummary {
  totalCost: number;
  currentValue: number;
  totalProfitTL: number;
  totalProfitPercent: number;
}


export interface CandleDataPoint {
  date: string;
  label: string; // e.g. "09/18"
  timestamp: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface TickerInfo {
  symbol: string;
  name: string;
  currency: string;
  currentPrice: number;
  openPrice: number;
  closePrice: number;
  highPrice: number;
  lowPrice: number;
  changeAmount: number;
  changePercent: number;
  volume: number;
  candles: CandleDataPoint[];
}

