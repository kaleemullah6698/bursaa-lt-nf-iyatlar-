import { runTurkishNumberTests } from './turkish-number.test';
import { runValidatorTests } from './validator.test';
import { runAdapterTests } from './adapter.test';

async function main() {
  console.log('====================================================');
  console.log('  Bursa Gold Price Collector - Automated Test Suite ');
  console.log('====================================================');

  const suite1 = runTurkishNumberTests();
  const suite2 = runValidatorTests();
  const suite3 = await runAdapterTests();

  const totalPassed = suite1.passed + suite2.passed + suite3.passed;
  const totalFailed = suite1.failed + suite2.failed + suite3.failed;

  console.log('\n====================================================');
  console.log(`  TEST RESULTS: ${totalPassed} Passed, ${totalFailed} Failed`);
  console.log('====================================================');

  if (totalFailed > 0) {
    console.error('Test suite failed!');
    process.exit(1);
  } else {
    console.log('All automated tests passed successfully!');
    process.exit(0);
  }
}

main().catch(err => {
  console.error('Test execution error:', err);
  process.exit(1);
});
