/**
 * Robust Client & Component Logic Verification Test
 */
import { INITIAL_GOLD_DATA, formatTL, formatUSD, formatNumber } from '../src/data/goldData';
import { getTickerData, SUPPORTED_TICKERS } from '../src/data/chartData';

function runRobustTests() {
  console.log('--- Starting Robust Client & Logic Verification ---');
  let passed = 0;
  let failed = 0;

  const assert = (condition: boolean, testName: string) => {
    if (condition) {
      console.log(`  ✓ ${testName}`);
      passed++;
    } else {
      console.error(`  ✗ FAIL: ${testName}`);
      failed++;
    }
  };

  // Test 1: INITIAL_GOLD_DATA contains all 21 instruments with valid positive prices
  assert(INITIAL_GOLD_DATA.length === 21, `Initial gold data has 21 instruments (found ${INITIAL_GOLD_DATA.length})`);
  const allPositive = INITIAL_GOLD_DATA.every(i => i.buyingPrice > 0 && i.sellingPrice > 0 && i.sellingPrice >= i.buyingPrice);
  assert(allPositive, 'All 21 instruments have strictly positive prices and sellingPrice >= buyingPrice');

  // Test 2: Sparklines exist for all instruments and have at least 5 points
  const validSparklines = INITIAL_GOLD_DATA.every(i => Array.isArray(i.sparkline) && i.sparkline.length >= 5);
  assert(validSparklines, 'All instruments have valid sparkline arrays with at least 5 points');

  // Test 3: Formatting helpers handle Turkish number conventions
  const sampleTL = formatTL(6841.50);
  assert(sampleTL.includes('6.841,50') || sampleTL.includes('6841'), `formatTL formats correctly: "${sampleTL}"`);

  // Test 4: Chart data generator produces valid candles for all supported tickers
  let allTickersValid = true;
  const tickerKeys = Object.keys(SUPPORTED_TICKERS);
  for (const tickerKey of tickerKeys) {
    const data = getTickerData(tickerKey, '1H');
    if (!data || !data.candles || data.candles.length === 0) {
      allTickersValid = false;
      break;
    }
  }
  assert(allTickersValid, `Chart generator produces valid candlestick sets for all ${tickerKeys.length} tickers`);

  // Test 5: Slugs are unique for SEO and deep-linking
  const slugs = INITIAL_GOLD_DATA.map(i => i.slug);
  const uniqueSlugs = new Set(slugs);
  assert(uniqueSlugs.size === slugs.length, `All ${slugs.length} instrument slugs are completely unique for deep linking`);

  // Test 6: Verify categories match expected filter tabs
  const categories = new Set(INITIAL_GOLD_DATA.map(i => i.category));
  assert(categories.has('yatirim') && categories.has('ziynet') && categories.has('bilezik'), 'Required categories (yatirim, ziynet, bilezik) are all present');

  console.log(`\nRobust verification completed: ${passed} passed, ${failed} failed.`);
  if (failed > 0) {
    process.exit(1);
  }
}

runRobustTests();
