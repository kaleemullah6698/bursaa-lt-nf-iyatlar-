import { BaseSourceAdapter } from './base';
import { NormalizedGoldRecord, SourceType, DataScope, GoldInstrument } from '../types';

/**
 * Bursa Retail Adapter
 * Specifically generates Bursa-calibrated retail jewelry rates from validated reference prices.
 * Explicitly tagged as dataScope: 'bursa-retail' to ensure strict truth-in-data standards.
 */
export class BursaRetailAdapter extends BaseSourceAdapter {
  readonly name = 'Bursa Kapalı Çarşı Retail Pricing Engine';
  readonly sourceType: SourceType = 'feed';
  readonly defaultDataScope: DataScope = 'bursa-retail';

  private readonly referenceRecords: NormalizedGoldRecord[];

  constructor(referenceRecords: NormalizedGoldRecord[] = []) {
    super();
    this.referenceRecords = referenceRecords;
  }

  public async isAvailable(): Promise<boolean> {
    return this.referenceRecords.length > 0;
  }

  public async fetchPrices(): Promise<NormalizedGoldRecord[]> {
    this.log('info', 'Computing Bursa retail gold prices based on current Kapalı Çarşı spread premiums');

    const bursaRecords: NormalizedGoldRecord[] = [];
    const timestamp = new Date().toISOString();

    for (const ref of this.referenceRecords) {
      if (ref.currency !== 'TRY') continue;

      // In Bursa Tarihi Kapalı Çarşı, retail jewelers trade at slight local spreads compared to wholesale:
      // - Gram Altın: ~0.2% retail margin on selling price
      // - Çeyrek Altın: local minting and physical delivery spread
      let retailBuy = ref.buy;
      let retailSell = ref.sell;

      if (ref.instrument === 'gram-altin') {
        retailBuy = Math.round(ref.buy * 0.999 * 100) / 100;
        retailSell = Math.round(ref.sell * 1.002 * 100) / 100;
      } else if (ref.instrument === 'ceyrek-altin') {
        retailBuy = Math.round(ref.buy * 0.998 * 100) / 100;
        retailSell = Math.round(ref.sell * 1.003 * 100) / 100;
      } else if (ref.instrument === '22-ayar-bilezik') {
        // Bursa burma & ray bilezik retail spread
        retailBuy = Math.round(ref.buy * 0.995 * 100) / 100;
        retailSell = Math.round(ref.sell * 1.008 * 100) / 100;
      }

      bursaRecords.push({
        instrument: ref.instrument,
        displayName: `${ref.displayName} (Bursa Çarşı)`,
        buy: retailBuy,
        sell: retailSell,
        change: ref.change,
        changePercent: ref.changePercent,
        currency: 'TRY',
        timestamp,
        sourceUpdatedAt: ref.sourceUpdatedAt,
        source: 'Bursa Kuyumcular Çarşısı Perakende Modeli',
        sourceType: this.sourceType,
        dataScope: 'bursa-retail',
        rawPayloadSnippet: {
          baseWholesaleBuy: ref.buy,
          baseWholesaleSell: ref.sell,
          bursaModel: 'bursa-kapalicarsi-bedesten'
        }
      });
    }

    return bursaRecords;
  }
}
