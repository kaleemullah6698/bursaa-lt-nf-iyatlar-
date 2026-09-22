import dotenv from 'dotenv';
dotenv.config();

import { DatabaseService } from './db/database';
import { CollectionEngine } from './engine';
import { TaskScheduler } from './scheduler/scheduler';
import { createCollectorServer } from './server/api';
import { logger } from './logger/logger';

async function bootstrap() {
  const port = parseInt(process.env.COLLECTOR_PORT || '4000', 10);
  const intervalSeconds = parseInt(process.env.COLLECTOR_INTERVAL_SECONDS || '300', 10);
  const databaseUrl = process.env.DATABASE_URL;

  logger.info('Starting Bursa Gold Price Automated Collection System', {
    port,
    intervalSeconds,
    databaseConfigured: Boolean(databaseUrl)
  });

  // 1. Initialize DB
  const db = new DatabaseService(databaseUrl);
  await db.init();

  // 2. Initialize Engine
  const engine = new CollectionEngine(db, {
    maxRetries: 3,
    initialRetryDelayMs: 2000,
    timeoutMs: 10000
  });

  // 3. Initialize Scheduler
  const scheduler = new TaskScheduler(engine, {
    intervalSeconds,
    runImmediately: true
  });

  // 4. Create and start HTTP API server
  const app = createCollectorServer(db, engine, scheduler);
  const server = app.listen(port, '0.0.0.0', () => {
    logger.info(`Collector API listening on http://0.0.0.0:${port}`);
    logger.info(`Health check available at http://localhost:${port}/health`);
    logger.info(`Data status available at http://localhost:${port}/data-status`);
    logger.info(`Live prices API available at http://localhost:${port}/api/gold-prices`);
  });

  // 5. Start scheduler
  scheduler.start();

  // Graceful shutdown handling
  const shutdown = async (signal: string) => {
    logger.info(`Received ${signal}. Shutting down gracefully...`);
    scheduler.stop();
    server.close(async () => {
      await db.close();
      logger.info('Service shutdown complete.');
      process.exit(0);
    });
  };

  process.on('SIGINT', () => shutdown('SIGINT'));
  process.on('SIGTERM', () => shutdown('SIGTERM'));
}

bootstrap().catch(err => {
  logger.error('Fatal initialization error', { error: err instanceof Error ? err.message : String(err) });
  process.exit(1);
});
