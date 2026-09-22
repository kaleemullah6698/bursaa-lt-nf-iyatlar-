import dotenv from 'dotenv';
dotenv.config();

import { DatabaseService } from './db/database';
import { CollectionEngine } from './engine';

async function main() {
  console.log('--- Bursa Gold Collector: One-Off Collection Run ---');
  const db = new DatabaseService(process.env.DATABASE_URL);
  await db.init();

  const engine = new CollectionEngine(db);
  const report = await engine.executeCycle();

  console.log('\nRun Execution Summary:');
  console.log(`Status:            ${report.status}`);
  console.log(`Duration:          ${report.durationMs}ms`);
  console.log(`Source:            ${report.source} (${report.dataScope})`);
  console.log(`Records Found:     ${report.recordsFound}`);
  console.log(`Records Accepted:  ${report.recordsAccepted}`);
  console.log(`Records Rejected:  ${report.recordsRejected}`);

  if (report.rejections.length > 0) {
    console.log('\nRejections Detail:');
    report.rejections.forEach(r => console.log(`  - [${r.instrument}]: ${r.reason}`));
  }

  const latest = await db.getLatestPrices();
  console.log(`\nCurrent Validated Prices in DB (${latest.length} items):`);
  latest.forEach(item => {
    const spread = (item.sell - item.buy).toFixed(2);
    console.log(`  ${item.instrument.padEnd(18)} Alış: ${String(item.buy).padStart(8)} | Satış: ${String(item.sell).padStart(8)} | Makas: ${spread.padStart(6)} ${item.currency} [${item.dataScope}]`);
  });

  await db.close();
  process.exit(report.status === 'FAILED' ? 1 : 0);
}

main().catch(err => {
  console.error('Fatal execution error:', err);
  process.exit(1);
});
