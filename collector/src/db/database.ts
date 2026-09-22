import pg from 'pg';
import { NormalizedGoldRecord, CollectionRunReport, GoldInstrument, DataScope } from '../types';

export interface DatabaseAdapter {
  init(): Promise<void>;
  saveValidatedBatch(records: NormalizedGoldRecord[]): Promise<void>;
  getLatestPrices(scope?: DataScope): Promise<NormalizedGoldRecord[]>;
  getHistoricalPrices(instrument: GoldInstrument, limit?: number): Promise<NormalizedGoldRecord[]>;
  saveRunReport(report: CollectionRunReport): Promise<void>;
  getLatestRunReport(): Promise<CollectionRunReport | null>;
  getTotalRecordCount(): Promise<number>;
  close(): Promise<void>;
}

export class DatabaseService implements DatabaseAdapter {
  private pool: pg.Pool | null = null;
  private isPostgresConnected: boolean = false;

  // In-memory fallback cache when PostgreSQL is not configured
  private memoryHistory: NormalizedGoldRecord[] = [];
  private memoryLatest: Map<string, NormalizedGoldRecord> = new Map();
  private memoryRuns: CollectionRunReport[] = [];

  constructor(private readonly connectionString?: string) {
    if (this.connectionString) {
      this.pool = new pg.Pool({
        connectionString: this.connectionString,
        max: 10,
        idleTimeoutMillis: 30000,
        connectionTimeoutMillis: 4000
      });
    }
  }

  public async init(): Promise<void> {
    if (!this.pool) {
      console.log('[DB] No DATABASE_URL provided. Running with persistent in-memory/embedded storage.');
      return;
    }

    try {
      const client = await this.pool.connect();
      console.log('[DB] Connected successfully to PostgreSQL.');
      
      // Initialize core tables
      await client.query(`
        CREATE TABLE IF NOT EXISTS gold_prices (
            id BIGSERIAL PRIMARY KEY,
            instrument VARCHAR(50) NOT NULL,
            display_name VARCHAR(100) NOT NULL,
            buy_price NUMERIC(14, 4) NOT NULL,
            sell_price NUMERIC(14, 4) NOT NULL,
            price_change NUMERIC(14, 4) DEFAULT 0,
            change_percent NUMERIC(8, 4) DEFAULT 0,
            currency VARCHAR(10) NOT NULL DEFAULT 'TRY',
            source VARCHAR(150) NOT NULL,
            source_type VARCHAR(20) NOT NULL,
            data_scope VARCHAR(30) NOT NULL,
            collected_at TIMESTAMPTZ NOT NULL,
            source_updated_at TIMESTAMPTZ,
            raw_snippet JSONB,
            created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        );

        CREATE INDEX IF NOT EXISTS idx_gold_prices_inst_scope 
            ON gold_prices (instrument, data_scope, collected_at DESC);

        CREATE TABLE IF NOT EXISTS latest_gold_prices (
            instrument VARCHAR(50) NOT NULL,
            data_scope VARCHAR(30) NOT NULL,
            display_name VARCHAR(100) NOT NULL,
            buy_price NUMERIC(14, 4) NOT NULL,
            sell_price NUMERIC(14, 4) NOT NULL,
            price_change NUMERIC(14, 4) DEFAULT 0,
            change_percent NUMERIC(8, 4) DEFAULT 0,
            currency VARCHAR(10) NOT NULL DEFAULT 'TRY',
            source VARCHAR(150) NOT NULL,
            source_type VARCHAR(20) NOT NULL,
            collected_at TIMESTAMPTZ NOT NULL,
            source_updated_at TIMESTAMPTZ,
            updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
            PRIMARY KEY (instrument, data_scope)
        );

        CREATE TABLE IF NOT EXISTS collection_runs (
            run_id VARCHAR(64) PRIMARY KEY,
            start_time TIMESTAMPTZ NOT NULL,
            end_time TIMESTAMPTZ NOT NULL,
            duration_ms INTEGER NOT NULL,
            source VARCHAR(150) NOT NULL,
            source_type VARCHAR(20) NOT NULL,
            data_scope VARCHAR(30) NOT NULL,
            http_status INTEGER,
            records_found INTEGER NOT NULL DEFAULT 0,
            records_accepted INTEGER NOT NULL DEFAULT 0,
            records_rejected INTEGER NOT NULL DEFAULT 0,
            status VARCHAR(20) NOT NULL,
            rejections JSONB,
            error_message TEXT,
            created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        );
      `);

      client.release();
      this.isPostgresConnected = true;
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      console.warn(`[DB] PostgreSQL connection failed (${msg}). Falling back to embedded in-memory storage.`);
      this.isPostgresConnected = false;
    }
  }

  public async saveValidatedBatch(records: NormalizedGoldRecord[]): Promise<void> {
    if (records.length === 0) return;

    if (this.isPostgresConnected && this.pool) {
      const client = await this.pool.connect();
      try {
        await client.query('BEGIN');

        for (const r of records) {
          // 1. Insert into historical append-only table
          await client.query(
            `INSERT INTO gold_prices (
              instrument, display_name, buy_price, sell_price, price_change, change_percent,
              currency, source, source_type, data_scope, collected_at, source_updated_at, raw_snippet
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)`,
            [
              r.instrument, r.displayName, r.buy, r.sell, r.change, r.changePercent,
              r.currency, r.source, r.sourceType, r.dataScope, r.timestamp,
              r.sourceUpdatedAt || null, JSON.stringify(r.rawPayloadSnippet || {})
            ]
          );

          // 2. Upsert into latest_gold_prices
          await client.query(
            `INSERT INTO latest_gold_prices (
              instrument, data_scope, display_name, buy_price, sell_price, price_change,
              change_percent, currency, source, source_type, collected_at, source_updated_at, updated_at
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, NOW())
            ON CONFLICT (instrument, data_scope) DO UPDATE SET
              display_name = EXCLUDED.display_name,
              buy_price = EXCLUDED.buy_price,
              sell_price = EXCLUDED.sell_price,
              price_change = EXCLUDED.price_change,
              change_percent = EXCLUDED.change_percent,
              currency = EXCLUDED.currency,
              source = EXCLUDED.source,
              source_type = EXCLUDED.source_type,
              collected_at = EXCLUDED.collected_at,
              source_updated_at = EXCLUDED.source_updated_at,
              updated_at = NOW()`,
            [
              r.instrument, r.dataScope, r.displayName, r.buy, r.sell, r.change,
              r.changePercent, r.currency, r.source, r.sourceType, r.timestamp,
              r.sourceUpdatedAt || null
            ]
          );
        }

        await client.query('COMMIT');
      } catch (err) {
        await client.query('ROLLBACK');
        throw err;
      } finally {
        client.release();
      }
    } else {
      // Memory fallback
      for (const r of records) {
        this.memoryHistory.push(r);
        const key = `${r.instrument}:${r.dataScope}`;
        this.memoryLatest.set(key, r);
      }
      // Cap memory history at last 10,000 items
      if (this.memoryHistory.length > 10000) {
        this.memoryHistory = this.memoryHistory.slice(-10000);
      }
    }
  }

  public async getLatestPrices(scope?: DataScope): Promise<NormalizedGoldRecord[]> {
    if (this.isPostgresConnected && this.pool) {
      const client = await this.pool.connect();
      try {
        let query = 'SELECT * FROM latest_gold_prices';
        const params: unknown[] = [];
        if (scope) {
          query += ' WHERE data_scope = $1';
          params.push(scope);
        }
        query += ' ORDER BY instrument ASC';

        const res = await client.query(query, params);
        return res.rows.map(row => ({
          instrument: row.instrument,
          displayName: row.display_name,
          buy: parseFloat(row.buy_price),
          sell: parseFloat(row.sell_price),
          change: parseFloat(row.price_change),
          changePercent: parseFloat(row.change_percent),
          currency: row.currency,
          timestamp: row.collected_at.toISOString(),
          sourceUpdatedAt: row.source_updated_at ? row.source_updated_at.toISOString() : undefined,
          source: row.source,
          sourceType: row.source_type,
          dataScope: row.data_scope
        }));
      } finally {
        client.release();
      }
    } else {
      const items = Array.from(this.memoryLatest.values());
      if (scope) {
        return items.filter(i => i.dataScope === scope);
      }
      return items;
    }
  }

  public async getHistoricalPrices(instrument: GoldInstrument, limit: number = 100): Promise<NormalizedGoldRecord[]> {
    if (this.isPostgresConnected && this.pool) {
      const client = await this.pool.connect();
      try {
        const res = await client.query(
          `SELECT * FROM gold_prices 
           WHERE instrument = $1 
           ORDER BY collected_at DESC 
           LIMIT $2`,
          [instrument, limit]
        );
        return res.rows.map(row => ({
          instrument: row.instrument,
          displayName: row.display_name,
          buy: parseFloat(row.buy_price),
          sell: parseFloat(row.sell_price),
          change: parseFloat(row.price_change),
          changePercent: parseFloat(row.change_percent),
          currency: row.currency,
          timestamp: row.collected_at.toISOString(),
          sourceUpdatedAt: row.source_updated_at ? row.source_updated_at.toISOString() : undefined,
          source: row.source,
          sourceType: row.source_type,
          dataScope: row.data_scope
        }));
      } finally {
        client.release();
      }
    } else {
      return this.memoryHistory
        .filter(r => r.instrument === instrument)
        .slice(-limit)
        .reverse();
    }
  }

  public async saveRunReport(report: CollectionRunReport): Promise<void> {
    if (this.isPostgresConnected && this.pool) {
      const client = await this.pool.connect();
      try {
        await client.query(
          `INSERT INTO collection_runs (
            run_id, start_time, end_time, duration_ms, source, source_type,
            data_scope, http_status, records_found, records_accepted,
            records_rejected, status, rejections, error_message
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)`,
          [
            report.runId, report.startTime, report.endTime, report.durationMs,
            report.source, report.sourceType, report.dataScope, report.httpStatus || null,
            report.recordsFound, report.recordsAccepted, report.recordsRejected,
            report.status, JSON.stringify(report.rejections || []), report.errorMessage || null
          ]
        );
      } finally {
        client.release();
      }
    } else {
      this.memoryRuns.unshift(report);
      if (this.memoryRuns.length > 500) {
        this.memoryRuns = this.memoryRuns.slice(0, 500);
      }
    }
  }

  public async getLatestRunReport(): Promise<CollectionRunReport | null> {
    if (this.isPostgresConnected && this.pool) {
      const client = await this.pool.connect();
      try {
        const res = await client.query('SELECT * FROM collection_runs ORDER BY created_at DESC LIMIT 1');
        if (res.rows.length === 0) return null;
        const row = res.rows[0];
        return {
          runId: row.run_id,
          startTime: row.start_time.toISOString(),
          endTime: row.end_time.toISOString(),
          durationMs: row.duration_ms,
          source: row.source,
          sourceType: row.source_type,
          dataScope: row.data_scope,
          httpStatus: row.http_status,
          recordsFound: row.records_found,
          recordsAccepted: row.records_accepted,
          recordsRejected: row.records_rejected,
          status: row.status,
          rejections: row.rejections || [],
          errorMessage: row.error_message
        };
      } finally {
        client.release();
      }
    } else {
      return this.memoryRuns[0] || null;
    }
  }

  public async getTotalRecordCount(): Promise<number> {
    if (this.isPostgresConnected && this.pool) {
      const client = await this.pool.connect();
      try {
        const res = await client.query('SELECT COUNT(*) as count FROM gold_prices');
        return parseInt(res.rows[0].count, 10);
      } finally {
        client.release();
      }
    } else {
      return this.memoryHistory.length;
    }
  }

  public async close(): Promise<void> {
    if (this.pool) {
      await this.pool.end();
    }
  }
}
