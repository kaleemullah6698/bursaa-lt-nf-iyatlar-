import { randomUUID } from 'crypto';
import { DatabaseService } from './db/database';
import { SourceAdapter, NormalizedGoldRecord, CollectionRunReport, GoldInstrument } from './types';
import { GoldDataValidator } from './validation/validator';
import { AltinkaynakApiAdapter } from './adapters/altinkaynak-api';
import { FallbackWebScraperAdapter } from './adapters/fallback-scraper';
import { BursaRetailAdapter } from './adapters/bursa-retail-adapter';
import { logger } from './logger/logger';

export interface EngineConfig {
  maxRetries: number;
  initialRetryDelayMs: number;
  timeoutMs: number;
}

export class CollectionEngine {
  private primaryAdapter: SourceAdapter;
  private fallbackAdapter: SourceAdapter;
  private isSourceHealthy: boolean = true;
  private lastHealthCheckTime: string = new Date().toISOString();

  constructor(
    private readonly db: DatabaseService,
    private readonly config: EngineConfig = {
      maxRetries: 3,
      initialRetryDelayMs: 1500,
      timeoutMs: 10000
    }
  ) {
    this.primaryAdapter = new AltinkaynakApiAdapter();
    this.fallbackAdapter = new FallbackWebScraperAdapter();
  }

  public getSourceHealth(): boolean {
    return this.isSourceHealthy;
  }

  public getLastHealthCheck(): string {
    return this.lastHealthCheckTime;
  }

  /**
   * Executes a full collection, validation, and storage cycle
   */
  public async executeCycle(): Promise<CollectionRunReport> {
    const runId = randomUUID();
    const startTimeDate = new Date();
    const startTime = startTimeDate.toISOString();
    logger.info('Starting gold price data collection cycle', { runId, startTime });

    let rawRecords: NormalizedGoldRecord[] = [];
    let activeAdapter: SourceAdapter = this.primaryAdapter;
    let fetchError: Error | null = null;

    // 1. Attempt primary with retry mechanism
    for (let attempt = 1; attempt <= this.config.maxRetries; attempt++) {
      try {
        rawRecords = await this.primaryAdapter.fetchPrices();
        this.isSourceHealthy = true;
        this.lastHealthCheckTime = new Date().toISOString();
        fetchError = null;
        break;
      } catch (err: unknown) {
        fetchError = err instanceof Error ? err : new Error(String(err));
        logger.warn(`Primary source attempt ${attempt}/${this.config.maxRetries} failed`, {
          runId,
          attempt,
          error: fetchError.message
        });

        if (attempt < this.config.maxRetries) {
          const delay = this.config.initialRetryDelayMs * Math.pow(2, attempt - 1);
          await new Promise(resolve => setTimeout(resolve, delay));
        }
      }
    }

    // 2. If primary fails, invoke fallback adapter
    if (fetchError || rawRecords.length === 0) {
      logger.warn('Primary source completely failed. Attempting fallback adapter...', { runId });
      try {
        activeAdapter = this.fallbackAdapter;
        rawRecords = await this.fallbackAdapter.fetchPrices();
        this.isSourceHealthy = false; // Mark primary as unhealthy
        this.lastHealthCheckTime = new Date().toISOString();
        fetchError = null;
      } catch (fallbackErr: unknown) {
        const fallbackMsg = fallbackErr instanceof Error ? fallbackErr.message : String(fallbackErr);
        logger.error('Both primary and fallback adapters failed. Preserving last known valid data.', {
          runId,
          primaryError: fetchError?.message,
          fallbackError: fallbackMsg
        });

        const endTimeDate = new Date();
        const durationMs = endTimeDate.getTime() - startTimeDate.getTime();
        const failureReport: CollectionRunReport = {
          runId,
          startTime,
          endTime: endTimeDate.toISOString(),
          durationMs,
          source: this.primaryAdapter.name,
          sourceType: this.primaryAdapter.sourceType,
          dataScope: this.primaryAdapter.defaultDataScope,
          recordsFound: 0,
          recordsAccepted: 0,
          recordsRejected: 0,
          rejections: [],
          status: 'FAILED',
          errorMessage: `All sources failed: ${fetchError?.message}; Fallback: ${fallbackMsg}`
        };

        await this.db.saveRunReport(failureReport);
        return failureReport;
      }
    }

    // 3. Fetch previous baseline prices from DB for change calculation and anomaly detection
    const latestExisting = await this.db.getLatestPrices();
    const previousPriceMap = new Map<GoldInstrument, { buy: number; sell: number }>();
    for (const p of latestExisting) {
      previousPriceMap.set(p.instrument, { buy: p.buy, sell: p.sell });
    }

    // Calculate changes relative to baseline
    for (const r of rawRecords) {
      const prev = previousPriceMap.get(r.instrument);
      if (prev && prev.sell > 0) {
        r.change = Math.round((r.sell - prev.sell) * 100) / 100;
        r.changePercent = Math.round(((r.sell - prev.sell) / prev.sell) * 10000) / 100;
      }
    }

    // 4. Validate Batch
    const validationResult = GoldDataValidator.validateBatch(rawRecords, previousPriceMap);

    const rejectionsList = validationResult.rejectedRecords.map(r => ({
      instrument: r.record.instrument || 'unknown',
      reason: r.reasons.map(fail => fail.message).join('; ')
    }));

    if (rejectionsList.length > 0) {
      logger.warn('Some records failed validation and were safely rejected', {
        runId,
        rejectedCount: rejectionsList.length,
        rejections: rejectionsList
      });
    }

    // 5. Generate Bursa Retail quotes from accepted wholesale records
    let allRecordsToPersist = [...validationResult.acceptedRecords];
    if (validationResult.acceptedRecords.length > 0) {
      const bursaAdapter = new BursaRetailAdapter(validationResult.acceptedRecords);
      const bursaRetailRecords = await bursaAdapter.fetchPrices();
      allRecordsToPersist = [...allRecordsToPersist, ...bursaRetailRecords];
    }

    // 6. Persist to Database (only validated records)
    if (allRecordsToPersist.length > 0) {
      await this.db.saveValidatedBatch(allRecordsToPersist);
      logger.info('Successfully persisted validated prices to database', {
        runId,
        totalPersisted: allRecordsToPersist.length,
        wholesaleCount: validationResult.acceptedRecords.length,
        bursaRetailCount: allRecordsToPersist.length - validationResult.acceptedRecords.length
      });
    }

    const endTimeDate = new Date();
    const durationMs = endTimeDate.getTime() - startTimeDate.getTime();
    const status = validationResult.rejectedRecords.length === 0 ? 'SUCCESS' : 'PARTIAL';

    const report: CollectionRunReport = {
      runId,
      startTime,
      endTime: endTimeDate.toISOString(),
      durationMs,
      source: activeAdapter.name,
      sourceType: activeAdapter.sourceType,
      dataScope: activeAdapter.defaultDataScope,
      recordsFound: rawRecords.length,
      recordsAccepted: validationResult.acceptedRecords.length,
      recordsRejected: validationResult.rejectedRecords.length,
      rejections: rejectionsList,
      status
    };

    await this.db.saveRunReport(report);

    logger.info('Collection cycle finished', {
      runId,
      status,
      durationMs,
      accepted: report.recordsAccepted,
      rejected: report.recordsRejected
    });

    return report;
  }
}
