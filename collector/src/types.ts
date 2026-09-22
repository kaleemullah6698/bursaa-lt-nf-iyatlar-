/**
 * Types and interfaces for the Bursa & Turkish Gold Price Data Collection System
 */

export type GoldInstrument =
  | 'gram-altin'
  | 'ceyrek-altin'
  | 'eski-ceyrek'
  | 'yarim-altin'
  | 'tam-altin'
  | 'cumhuriyet-altini'
  | 'ata-altin'
  | '22-ayar-bilezik'
  | '18-ayar-altin'
  | '14-ayar-altin'
  | 'gremse-altin'
  | 'resat-altin'
  | 'hamit-altin'
  | 'has-altin'
  | 'ons-altin';

export type DataScope = 'bursa' | 'turkiye' | 'reference-market' | 'bursa-retail';

export type SourceType = 'api' | 'scraper' | 'feed';

export interface NormalizedGoldRecord {
  instrument: GoldInstrument;
  displayName: string;
  buy: number;
  sell: number;
  change: number;
  changePercent: number;
  currency: 'TRY' | 'USD';
  timestamp: string; // ISO 8601 UTC
  sourceUpdatedAt?: string; // Original timestamp from provider
  source: string; // e.g. "Altinkaynak Public Feed", "Bursa Kuyumcular Birlik"
  sourceType: SourceType;
  dataScope: DataScope;
  rawPayloadSnippet?: Record<string, unknown>;
}

export interface ValidationRule {
  minPrice: number;
  maxPrice: number;
  maxAllowedDailyChangePct: number; // e.g. 25% max single-day swing
  currency: 'TRY' | 'USD';
}

export interface ValidationFailure {
  instrument: string;
  field: string;
  message: string;
  rejectedValue: unknown;
}

export interface ValidationResult {
  isValid: boolean;
  acceptedRecords: NormalizedGoldRecord[];
  rejectedRecords: Array<{
    record: Partial<NormalizedGoldRecord>;
    reasons: ValidationFailure[];
  }>;
}

export interface SourceAdapter {
  readonly name: string;
  readonly sourceType: SourceType;
  readonly defaultDataScope: DataScope;
  fetchPrices(): Promise<NormalizedGoldRecord[]>;
  isAvailable(): Promise<boolean>;
}

export interface CollectionRunReport {
  runId: string;
  startTime: string;
  endTime: string;
  durationMs: number;
  source: string;
  sourceType: SourceType;
  dataScope: DataScope;
  httpStatus?: number;
  recordsFound: number;
  recordsAccepted: number;
  recordsRejected: number;
  rejections: Array<{
    instrument: string;
    reason: string;
  }>;
  status: 'SUCCESS' | 'PARTIAL' | 'FAILED';
  errorMessage?: string;
}

export interface HealthStatus {
  status: 'healthy' | 'degraded' | 'unhealthy';
  lastSuccessfulRun?: string;
  lastRunStatus?: string;
  dataAgeSeconds?: number;
  totalRecordsInDb: number;
  latestPricesCount: number;
  sourcesHealthy: Record<string, boolean>;
  version: string;
  environment: string;
}
