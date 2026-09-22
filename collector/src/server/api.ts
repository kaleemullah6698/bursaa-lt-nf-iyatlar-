import express, { Request, Response } from 'express';
import { DatabaseService } from '../db/database';
import { CollectionEngine } from '../engine';
import { TaskScheduler } from '../scheduler/scheduler';
import { DataScope, GoldInstrument } from '../types';

export function createCollectorServer(
  db: DatabaseService,
  engine: CollectionEngine,
  scheduler: TaskScheduler
): express.Express {
  const app = express();
  app.use(express.json());

  // CORS headers for web consumption
  app.use((_req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  });

  /**
   * 1. Health Endpoint (Section 17)
   */
  app.get('/health', async (_req: Request, res: Response) => {
    try {
      const latestReport = await db.getLatestRunReport();
      const isSourceHealthy = engine.getSourceHealth();
      const latestPrices = await db.getLatestPrices();

      const lastRunTime = latestReport ? new Date(latestReport.endTime).getTime() : 0;
      const dataAgeSeconds = lastRunTime ? Math.floor((Date.now() - lastRunTime) / 1000) : null;

      let status: 'healthy' | 'degraded' | 'unhealthy' = 'healthy';
      if (!isSourceHealthy) {
        status = 'degraded';
      }
      if (dataAgeSeconds !== null && dataAgeSeconds > 3600) {
        // Data older than 1 hour
        status = 'degraded';
      }
      if (latestPrices.length === 0) {
        status = 'unhealthy';
      }

      res.status(status === 'unhealthy' ? 503 : 200).json({
        status,
        timestamp: new Date().toISOString(),
        isSourceHealthy,
        dataAgeSeconds,
        latestPricesAvailable: latestPrices.length > 0,
        scheduler: scheduler.getStatus(),
        uptimeSeconds: Math.floor(process.uptime())
      });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      res.status(500).json({ status: 'unhealthy', error: msg });
    }
  });

  /**
   * 2. Detailed Data Status (Section 17)
   */
  app.get('/data-status', async (_req: Request, res: Response) => {
    try {
      const latestReport = await db.getLatestRunReport();
      const totalRecords = await db.getTotalRecordCount();
      const latestPrices = await db.getLatestPrices();

      const bursaPrices = latestPrices.filter(p => p.dataScope === 'bursa-retail');
      const referencePrices = latestPrices.filter(p => p.dataScope === 'reference-market');

      res.json({
        service: 'Bursa Gold Price Automated Data Engine',
        version: '1.0.0',
        environment: process.env.NODE_ENV || 'production',
        totalHistoricalRecords: totalRecords,
        latestRunReport: latestReport,
        currentInstrumentCount: {
          bursaRetail: bursaPrices.length,
          referenceMarket: referencePrices.length,
          total: latestPrices.length
        },
        supportedInstruments: Array.from(new Set(latestPrices.map(p => p.instrument))),
        sourceHealth: {
          primaryHealthy: engine.getSourceHealth(),
          lastCheck: engine.getLastHealthCheck()
        }
      });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      res.status(500).json({ error: msg });
    }
  });

  /**
   * 3. Clean Internal API for Website Consumption (Section 19 & 20)
   */
  app.get('/api/gold-prices', async (req: Request, res: Response) => {
    try {
      const requestedScope = (req.query.scope as DataScope | 'all') || 'bursa-retail';
      let prices = await db.getLatestPrices();

      if (requestedScope && requestedScope !== 'all') {
        const filtered = prices.filter(p => p.dataScope === requestedScope);
        // Fallback to reference if specific scope not available
        if (filtered.length > 0) {
          prices = filtered;
        }
      }

      if (prices.length === 0) {
        return res.status(503).json({
          error: 'No validated gold price data available yet. Collection cycle in progress.',
          updatedAt: new Date().toISOString()
        });
      }

      const primarySource = prices[0]?.source || 'Bursa & Kapalıçarşı Piyasa Verisi';
      const actualScope = prices[0]?.dataScope || requestedScope;
      const latestTimestamp = prices.reduce((max, p) => p.timestamp > max ? p.timestamp : max, prices[0].timestamp);

      res.json({
        updatedAt: latestTimestamp,
        source: primarySource,
        dataScope: actualScope,
        itemCount: prices.length,
        disclaimer: 'Veriler gösterge niteliğinde serbest piyasa ve kuyumcu kurlarıdır. Doğrulanmış otomatik sistem tarafından yayınlanmıştır.',
        prices: prices.map(p => ({
          instrument: p.instrument,
          displayName: p.displayName,
          buy: p.buy,
          sell: p.sell,
          spread: Math.round((p.sell - p.buy) * 100) / 100,
          change: p.change,
          changePercent: p.changePercent,
          currency: p.currency,
          source: p.source,
          sourceType: p.sourceType,
          dataScope: p.dataScope,
          timestamp: p.timestamp,
          sourceUpdatedAt: p.sourceUpdatedAt
        }))
      });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      res.status(500).json({ error: msg });
    }
  });

  /**
   * 4. Historical Data Endpoint for Charts (Section 11)
   */
  app.get('/api/gold-prices/history', async (req: Request, res: Response) => {
    try {
      const instrument = (req.query.instrument as GoldInstrument) || 'gram-altin';
      const limit = parseInt(req.query.limit as string, 10) || 50;

      const history = await db.getHistoricalPrices(instrument, Math.min(limit, 500));
      res.json({
        instrument,
        count: history.length,
        observations: history.map(h => ({
          timestamp: h.timestamp,
          buy: h.buy,
          sell: h.sell,
          change: h.change,
          source: h.source,
          dataScope: h.dataScope
        }))
      });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      res.status(500).json({ error: msg });
    }
  });

  /**
   * 5. Manual trigger to force immediate collection cycle
   */
  app.post('/api/collector/trigger', async (_req: Request, res: Response) => {
    try {
      const report = await engine.executeCycle();
      res.json({ message: 'Collection cycle triggered successfully', report });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      res.status(500).json({ error: msg });
    }
  });

  return app;
}
