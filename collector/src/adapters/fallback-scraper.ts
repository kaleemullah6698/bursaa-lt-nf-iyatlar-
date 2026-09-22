import { BaseSourceAdapter } from './base';
import { NormalizedGoldRecord, SourceType, DataScope, GoldInstrument } from '../types';
import { parseTurkishNumber } from '../validation/turkish-number';

export class FallbackWebScraperAdapter extends BaseSourceAdapter {
  readonly name = 'Fallback Turkish Financial Web Scraper';
  readonly sourceType: SourceType = 'scraper';
  readonly defaultDataScope: DataScope = 'reference-market';
  private readonly targetUrl: string;

  constructor(targetUrl: string = 'https://finans.truncgil.com/v4/today.json') {
    super();
    this.targetUrl = targetUrl;
  }

  public async isAvailable(): Promise<boolean> {
    try {
      const res = await fetch(this.targetUrl, { method: 'HEAD', signal: AbortSignal.timeout(3000) });
      return res.ok;
    } catch {
      return false;
    }
  }

  public async fetchPrices(): Promise<NormalizedGoldRecord[]> {
    this.log('info', 'Executing fallback data collection', { targetUrl: this.targetUrl });

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000);

    let data: Record<string, unknown>;
    try {
      const response = await fetch(this.targetUrl, {
        headers: {
          'Accept': 'application/json',
          'User-Agent': 'BursaGoldDataCollector/1.0 (Fallback Engine)'
        },
        signal: controller.signal
      });

      if (!response.ok) {
        throw new Error(`Fallback HTTP ${response.status}: ${response.statusText}`);
      }

      data = await response.json();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      this.log('warn', 'Fallback data source failed to respond', { error: msg });
      throw new Error(`FallbackWebScraperAdapter fetch failed: ${msg}`);
    } finally {
      clearTimeout(timeoutId);
    }

    // Source change detection
    if (!data || typeof data !== 'object') {
      throw new Error('Structure change detected: Fallback payload is not a valid JSON object');
    }

    const records: NormalizedGoldRecord[] = [];
    const timestamp = new Date().toISOString();

    // Mapping for common Turkish finance JSON structure
    const keysMapping: Array<{ key: string; instrument: GoldInstrument; name: string }> = [
      { key: 'gram-altin', instrument: 'gram-altin', name: 'Gram Altın' },
      { key: 'ceyrek-altin', instrument: 'ceyrek-altin', name: 'Çeyrek Altın' },
      { key: 'yarim-altin', instrument: 'yarim-altin', name: 'Yarım Altın' },
      { key: 'tam-altin', instrument: 'tam-altin', name: 'Tam Altın' },
      { key: 'cumhuriyet-altini', instrument: 'cumhuriyet-altini', name: 'Cumhuriyet Altını' },
      { key: 'ata-altin', instrument: 'ata-altin', name: 'Ata Altın' },
      { key: '22-ayar-bilezik', instrument: '22-ayar-bilezik', name: '22 Ayar Bilezik' },
      { key: 'ons', instrument: 'ons-altin', name: 'Ons Altın ($)' }
    ];

    for (const item of keysMapping) {
      const entry = data[item.key] as Record<string, unknown> | undefined;
      if (!entry) continue;

      const rawBuy = entry['Alış'] || entry['Buying'] || entry['alis'] || entry['buy'];
      const rawSell = entry['Satış'] || entry['Selling'] || entry['satis'] || entry['sell'];
      const rawChange = entry['Değişim'] || entry['Change'] || entry['degisim'] || 0;

      if (rawBuy !== undefined && rawSell !== undefined) {
        try {
          const buy = parseTurkishNumber(String(rawBuy));
          const sell = parseTurkishNumber(String(rawSell));
          const changePercent = parseTurkishNumber(String(rawChange));

          records.push({
            instrument: item.instrument,
            displayName: item.name,
            buy,
            sell,
            change: Math.round((sell - buy) * 100) / 100,
            changePercent,
            currency: item.instrument === 'ons-altin' ? 'USD' : 'TRY',
            timestamp,
            source: 'Yedek Finans Veri Akışı',
            sourceType: this.sourceType,
            dataScope: this.defaultDataScope,
            rawPayloadSnippet: { key: item.key, rawBuy, rawSell }
          });
        } catch (err: unknown) {
          this.log('warn', `Failed parsing fallback item ${item.key}`, {
            error: err instanceof Error ? err.message : String(err)
          });
        }
      }
    }

    if (records.length === 0) {
      throw new Error('Structure change detected: No valid gold instruments found in fallback payload');
    }

    return records;
  }
}
