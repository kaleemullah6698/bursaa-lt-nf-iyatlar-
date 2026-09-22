import { NormalizedGoldRecord, ValidationResult, ValidationFailure, ValidationRule, GoldInstrument } from '../types';

export const INSTRUMENT_VALIDATION_RULES: Record<GoldInstrument, ValidationRule> = {
  'gram-altin': { minPrice: 1500, maxPrice: 18000, maxAllowedDailyChangePct: 20, currency: 'TRY' },
  'has-altin': { minPrice: 1500, maxPrice: 18000, maxAllowedDailyChangePct: 20, currency: 'TRY' },
  'ceyrek-altin': { minPrice: 2500, maxPrice: 35000, maxAllowedDailyChangePct: 20, currency: 'TRY' },
  'eski-ceyrek': { minPrice: 2500, maxPrice: 35000, maxAllowedDailyChangePct: 20, currency: 'TRY' },
  'yarim-altin': { minPrice: 5000, maxPrice: 70000, maxAllowedDailyChangePct: 20, currency: 'TRY' },
  'tam-altin': { minPrice: 10000, maxPrice: 140000, maxAllowedDailyChangePct: 20, currency: 'TRY' },
  'cumhuriyet-altini': { minPrice: 10000, maxPrice: 160000, maxAllowedDailyChangePct: 20, currency: 'TRY' },
  'ata-altin': { minPrice: 10000, maxPrice: 160000, maxAllowedDailyChangePct: 20, currency: 'TRY' },
  '22-ayar-bilezik': { minPrice: 1400, maxPrice: 17000, maxAllowedDailyChangePct: 20, currency: 'TRY' },
  '18-ayar-altin': { minPrice: 1000, maxPrice: 14000, maxAllowedDailyChangePct: 20, currency: 'TRY' },
  '14-ayar-altin': { minPrice: 800, maxPrice: 12000, maxAllowedDailyChangePct: 20, currency: 'TRY' },
  'gremse-altin': { minPrice: 25000, maxPrice: 350000, maxAllowedDailyChangePct: 20, currency: 'TRY' },
  'resat-altin': { minPrice: 10000, maxPrice: 160000, maxAllowedDailyChangePct: 20, currency: 'TRY' },
  'hamit-altin': { minPrice: 10000, maxPrice: 160000, maxAllowedDailyChangePct: 20, currency: 'TRY' },
  'ons-altin': { minPrice: 1500, maxPrice: 7000, maxAllowedDailyChangePct: 15, currency: 'USD' }
};

export class GoldDataValidator {
  /**
   * Validates a batch of normalized records before they are committed to database.
   * Compares against known historical bounds and prior prices if available.
   */
  public static validateBatch(
    records: NormalizedGoldRecord[],
    previousPrices?: Map<GoldInstrument, { buy: number; sell: number }>
  ): ValidationResult {
    const acceptedRecords: NormalizedGoldRecord[] = [];
    const rejectedRecords: Array<{
      record: Partial<NormalizedGoldRecord>;
      reasons: ValidationFailure[];
    }> = [];

    for (const record of records) {
      const failures = this.validateSingleRecord(record, previousPrices?.get(record.instrument));

      if (failures.length === 0) {
        acceptedRecords.push(record);
      } else {
        rejectedRecords.push({
          record,
          reasons: failures
        });
      }
    }

    return {
      isValid: rejectedRecords.length === 0,
      acceptedRecords,
      rejectedRecords
    };
  }

  /**
   * Validates an individual gold record
   */
  public static validateSingleRecord(
    record: NormalizedGoldRecord,
    previousPrice?: { buy: number; sell: number }
  ): ValidationFailure[] {
    const failures: ValidationFailure[] = [];

    // 1. Mandatory presence check
    if (!record.instrument) {
      failures.push({
        instrument: 'unknown',
        field: 'instrument',
        message: 'Instrument slug is missing',
        rejectedValue: record.instrument
      });
      return failures;
    }

    const rule = INSTRUMENT_VALIDATION_RULES[record.instrument];
    if (!rule) {
      failures.push({
        instrument: record.instrument,
        field: 'instrument',
        message: `Unknown instrument: "${record.instrument}". No validation rules defined.`,
        rejectedValue: record.instrument
      });
      return failures;
    }

    // 2. Numeric and positivity checks
    if (typeof record.buy !== 'number' || isNaN(record.buy) || record.buy <= 0) {
      failures.push({
        instrument: record.instrument,
        field: 'buy',
        message: `Buy price must be a positive number, got ${record.buy}`,
        rejectedValue: record.buy
      });
    }

    if (typeof record.sell !== 'number' || isNaN(record.sell) || record.sell <= 0) {
      failures.push({
        instrument: record.instrument,
        field: 'sell',
        message: `Sell price must be a positive number, got ${record.sell}`,
        rejectedValue: record.sell
      });
    }

    // If basic numeric check failed, return early
    if (failures.length > 0) return failures;

    // 3. Absolute bounds check
    if (record.buy < rule.minPrice || record.buy > rule.maxPrice) {
      failures.push({
        instrument: record.instrument,
        field: 'buy',
        message: `Buy price ${record.buy} ${rule.currency} is out of safe range [${rule.minPrice}, ${rule.maxPrice}]`,
        rejectedValue: record.buy
      });
    }

    if (record.sell < rule.minPrice || record.sell > rule.maxPrice) {
      failures.push({
        instrument: record.instrument,
        field: 'sell',
        message: `Sell price ${record.sell} ${rule.currency} is out of safe range [${rule.minPrice}, ${rule.maxPrice}]`,
        rejectedValue: record.sell
      });
    }

    // 4. Buy / Sell relationship check
    // In market mechanics, the selling price (ask) must be >= buying price (bid)
    if (record.buy > record.sell) {
      failures.push({
        instrument: record.instrument,
        field: 'buy_sell_relationship',
        message: `Inverted quotes detected: Buy price (${record.buy}) cannot exceed Sell price (${record.sell})`,
        rejectedValue: { buy: record.buy, sell: record.sell }
      });
    }

    // 5. Spread percentage check
    // Spread should not exceed 35% of the sell price in normal precious metals trading
    const spread = record.sell - record.buy;
    const spreadPct = (spread / record.sell) * 100;
    if (spreadPct > 35) {
      failures.push({
        instrument: record.instrument,
        field: 'spread',
        message: `Abnormally large spread: ${spread.toFixed(2)} (${spreadPct.toFixed(1)}% of price)`,
        rejectedValue: spread
      });
    }

    // 6. Sudden spike / anomaly detector (relative to previous record if available)
    if (previousPrice && previousPrice.sell > 0) {
      const pctChangeFromPrev = Math.abs((record.sell - previousPrice.sell) / previousPrice.sell) * 100;
      if (pctChangeFromPrev > rule.maxAllowedDailyChangePct) {
        failures.push({
          instrument: record.instrument,
          field: 'anomaly_spike',
          message: `Sudden price jump of ${pctChangeFromPrev.toFixed(2)}% exceeds max allowed swing of ${rule.maxAllowedDailyChangePct}% (Previous: ${previousPrice.sell}, Current: ${record.sell})`,
          rejectedValue: record.sell
        });
      }
    }

    // 7. Timestamp sanity check
    if (!record.timestamp) {
      failures.push({
        instrument: record.instrument,
        field: 'timestamp',
        message: 'Timestamp is missing',
        rejectedValue: record.timestamp
      });
    } else {
      const tsDate = new Date(record.timestamp);
      if (isNaN(tsDate.getTime())) {
        failures.push({
          instrument: record.instrument,
          field: 'timestamp',
          message: 'Invalid ISO timestamp string',
          rejectedValue: record.timestamp
        });
      } else {
        const now = Date.now();
        // Cannot be more than 1 hour in the future
        if (tsDate.getTime() > now + 3600000) {
          failures.push({
            instrument: record.instrument,
            field: 'timestamp',
            message: 'Timestamp is significantly in the future',
            rejectedValue: record.timestamp
          });
        }
      }
    }

    // 8. Source Attribution check
    if (!record.source || record.source.trim().length === 0) {
      failures.push({
        instrument: record.instrument,
        field: 'source',
        message: 'Source attribution is mandatory',
        rejectedValue: record.source
      });
    }

    return failures;
  }
}
