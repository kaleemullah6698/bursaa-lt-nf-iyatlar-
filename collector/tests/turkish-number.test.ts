import { parseTurkishNumber } from '../src/validation/turkish-number';

export function runTurkishNumberTests(): { passed: number; failed: number } {
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

  console.log('\n--- Running Turkish Number Parsing Tests ---');

  // Test 1: Standard Turkish dotted thousand with comma decimal
  try {
    const val1 = parseTurkishNumber('5.432,15');
    assert('Parses standard Turkish "5.432,15" into 5432.15', val1 === 5432.15, `got ${val1}`);
  } catch (e: any) {
    assert('Parses standard Turkish "5.432,15"', false, e.message);
  }

  // Test 2: With currency symbol ₺
  try {
    const val2 = parseTurkishNumber('₺5.432,15');
    assert('Parses currency with ₺ symbol "₺5.432,15" into 5432.15', val2 === 5432.15, `got ${val2}`);
  } catch (e: any) {
    assert('Parses currency with ₺ symbol', false, e.message);
  }

  // Test 3: With TL suffix and spaces
  try {
    const val3 = parseTurkishNumber('5.432,15 TL');
    assert('Parses "5.432,15 TL" with suffix into 5432.15', val3 === 5432.15, `got ${val3}`);
  } catch (e: any) {
    assert('Parses "5.432,15 TL"', false, e.message);
  }

  // Test 4: Space as thousands separator
  try {
    const val4 = parseTurkishNumber('5 432,15');
    assert('Parses space separated "5 432,15" into 5432.15', val4 === 5432.15, `got ${val4}`);
  } catch (e: any) {
    assert('Parses space separated', false, e.message);
  }

  // Test 5: US standard comma thousands and dot decimal
  try {
    const val5 = parseTurkishNumber('5,432.15');
    assert('Parses US standard "5,432.15" into 5432.15', val5 === 5432.15, `got ${val5}`);
  } catch (e: any) {
    assert('Parses US standard', false, e.message);
  }

  // Test 6: Non-breaking space (\u00A0)
  try {
    const val6 = parseTurkishNumber('6\u00A0772,68');
    assert('Handles non-breaking space "6\\u00A0772,68" into 6772.68', val6 === 6772.68, `got ${val6}`);
  } catch (e: any) {
    assert('Handles non-breaking space', false, e.message);
  }

  // Test 7: Plain integer
  try {
    const val7 = parseTurkishNumber(10918);
    assert('Handles raw number 10918', val7 === 10918, `got ${val7}`);
  } catch (e: any) {
    assert('Handles raw number', false, e.message);
  }

  // Test 8: Rejects invalid strings
  try {
    parseTurkishNumber('invalid-price-text');
    assert('Rejects non-numeric string', false, 'Should have thrown');
  } catch {
    assert('Rejects non-numeric string gracefully', true);
  }

  return { passed, failed };
}
