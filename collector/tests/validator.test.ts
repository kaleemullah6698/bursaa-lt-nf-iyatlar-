import { GoldDataValidator } from '../src/validation/validator';
import { NormalizedGoldRecord, GoldInstrument } from '../src/types';

export function runValidatorTests(): { passed: number; failed: number } {
  let passed = 0;
  let failed = 0;

  function assert(name: string, condition: boolean, details?: string) {
    if (condition) {
      passed++;
      console.log(`  ✓ ${name}`);
    } else {
      failed++;
      console.error(`  ✗ ${name} ${details ? `(${details})` : ''}`);
    }
  }

  console.log('\n--- Running Gold Data Validator Tests ---');

  const createRecord = (overrides: Partial<NormalizedGoldRecord> = {}): NormalizedGoldRecord => ({
    instrument: 'gram-altin',
    displayName: 'Gram Altın',
    buy: 6738.81,
    sell: 6852.06,
    change: 0,
    changePercent: 0,
    currency: 'TRY',
    timestamp: new Date().toISOString(),
    source: 'Altınkaynak Serbest Piyasa',
    sourceType: 'api',
    dataScope: 'reference-market',
    ...overrides
  });

  // Test 1: Valid record passes
  const valid = createRecord();
  const res1 = GoldDataValidator.validateSingleRecord(valid);
  assert('Valid Gram Altın record passes with 0 failures', res1.length === 0, JSON.stringify(res1));

  // Test 2: Reject price out of range (Section 6 example: Gram Altın = 40 TRY)
  const lowPrice = createRecord({ buy: 40, sell: 42 });
  const res2 = GoldDataValidator.validateSingleRecord(lowPrice);
  assert('Rejects suspiciously low price (40 TRY)', res2.some(f => f.field === 'buy' || f.field === 'sell'));

  // Test 3: Reject excessively high price
  const highPrice = createRecord({ buy: 999999, sell: 1000000 });
  const res3 = GoldDataValidator.validateSingleRecord(highPrice);
  assert('Rejects suspiciously high price (1,000,000 TRY)', res3.some(f => f.field === 'buy' || f.field === 'sell'));

  // Test 4: Reject inverted quotes (Buy > Sell)
  const inverted = createRecord({ buy: 6900, sell: 6700 });
  const res4 = GoldDataValidator.validateSingleRecord(inverted);
  assert('Rejects inverted quote where Buy > Sell', res4.some(f => f.field === 'buy_sell_relationship'));

  // Test 5: Reject abnormal spread
  const wideSpread = createRecord({ buy: 3000, sell: 6800 });
  const res5 = GoldDataValidator.validateSingleRecord(wideSpread);
  assert('Rejects abnormally large spread (>35%)', res5.some(f => f.field === 'spread'));

  // Test 6: Detect sudden anomaly spike relative to previous baseline (>20%)
  const prevPrice = { buy: 6700, sell: 6800 };
  const spikedRecord = createRecord({ buy: 8900, sell: 9100 }); // +33%
  const res6 = GoldDataValidator.validateSingleRecord(spikedRecord, prevPrice);
  assert('Flags abnormal single-day price spike (+33%)', res6.some(f => f.field === 'anomaly_spike'));

  // Test 7: Reject missing source
  const noSource = createRecord({ source: '' });
  const res7 = GoldDataValidator.validateSingleRecord(noSource);
  assert('Rejects record with missing source attribution', res7.some(f => f.field === 'source'));

  // Test 8: Batch validation accepts good and isolates bad
  const batchRes = GoldDataValidator.validateBatch([valid, lowPrice, inverted]);
  assert('Batch validator accepts 1 record and rejects 2 records', 
    batchRes.acceptedRecords.length === 1 && batchRes.rejectedRecords.length === 2,
    `accepted: ${batchRes.acceptedRecords.length}, rejected: ${batchRes.rejectedRecords.length}`
  );

  return { passed, failed };
}
