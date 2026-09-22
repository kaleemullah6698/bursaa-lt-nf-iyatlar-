import { BaseSourceAdapter } from './base';
import { NormalizedGoldRecord, SourceType, DataScope, GoldInstrument } from '../types';
import { parseTurkishNumber } from '../validation/turkish-number';

interface AltinkaynakItem {
  Alis: string;
  Satis: string;
  Kod: string;
  Aciklama: string;
  GuncellenmeZamani: string;
}

const INSTRUMENT_CODE_MAP: Record<string, { instrument: GoldInstrument; displayName: string }> = {
  'GA': { instrument: 'gram-altin', displayName: 'Gram Altın (24 Ayar)' },
  'PGA': { instrument: 'gram-altin', displayName: 'Gram Altın (Paketli)' },
  'PC': { instrument: 'ceyrek-altin', displayName: 'Çeyrek Altın (Yeni)' },
  'EC': { instrument: 'eski-ceyrek', displayName: 'Çeyrek Altın (Eski)' },
  'PY': { instrument: 'yarim-altin', displayName: 'Yarım Altın' },
  'PT': { instrument: 'tam-altin', displayName: 'Tam Altın (Teklik)' },
  'PA': { instrument: 'cumhuriyet-altini', displayName: 'Cumhuriyet Altını (Ata)' },
  'A_T': { instrument: 'ata-altin', displayName: 'Ata Altın' },
  'PB': { instrument: '22-ayar-bilezik', displayName: '22 Ayar Bilezik' },
  'P18': { instrument: '18-ayar-altin', displayName: '18 Ayar Altın' },
  'P14': { instrument: '14-ayar-altin', displayName: '14 Ayar Altın' },
  'PG': { instrument: 'gremse-altin', displayName: 'Gremse Altın' },
  'PR': { instrument: 'resat-altin', displayName: 'Reşat Altın' },
  'PH': { instrument: 'hamit-altin', displayName: 'Hamit Altın' },
  'HH_T': { instrument: 'has-altin', displayName: 'Has Altın (Külçe)' },
  'XAUUSD': { instrument: 'ons-altin', displayName: 'Ons Altın ($)' }
};

export class AltinkaynakApiAdapter extends BaseSourceAdapter {
  readonly name = 'Altinkaynak Public JSON API';
  readonly sourceType: SourceType = 'api';
  readonly defaultDataScope: DataScope = 'reference-market';
  private readonly endpointUrl: string;

  constructor(endpointUrl: string = 'https://static.altinkaynak.com/public/Gold') {
    super();
    this.endpointUrl = endpointUrl;
  }

  public async isAvailable(): Promise<boolean> {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 4000);
      const res = await fetch(this.endpointUrl, {
        method: 'HEAD',
        signal: controller.signal
      });
      clearTimeout(timeoutId);
      return res.ok;
    } catch {
      return false;
    }
  }

  public async fetchPrices(): Promise<NormalizedGoldRecord[]> {
    this.log('info', 'Fetching live prices from Altinkaynak public endpoint', { url: this.endpointUrl });

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);

    let rawData: AltinkaynakItem[];
    try {
      const response = await fetch(this.endpointUrl, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'User-Agent': 'BursaGoldDataCollector/1.0 (Automated Financial Data Engine)'
        },
        signal: controller.signal
      });

      if (!response.ok) {
        throw new Error(`HTTP Error ${response.status} from Altinkaynak: ${response.statusText}`);
      }

      rawData = await response.json();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      this.log('error', 'Failed to retrieve data from Altinkaynak API', { error: msg });
      throw new Error(`AltinkaynakApiAdapter fetch failed: ${msg}`);
    } finally {
      clearTimeout(timeoutId);
    }

    if (!Array.isArray(rawData) || rawData.length === 0) {
      throw new Error('Altinkaynak API returned an empty or invalid array');
    }

    const records: NormalizedGoldRecord[] = [];
    const seenInstruments = new Set<string>();

    for (const item of rawData) {
      if (!item.Kod || !item.Alis || !item.Satis) {
        continue;
      }

      const mapping = INSTRUMENT_CODE_MAP[item.Kod.trim()];
      if (!mapping) {
        continue; // Skip silver or internal bank codes
      }

      // If we already added this instrument (e.g. GA vs PGA), prefer standard GA or first seen
      if (seenInstruments.has(mapping.instrument)) {
        continue;
      }

      try {
        const buy = parseTurkishNumber(item.Alis);
        const sell = parseTurkishNumber(item.Satis);
        const isUSD = mapping.instrument === 'ons-altin';

        // Parse provider update time e.g. "23.09.2026 00:51:20" (DD.MM.YYYY HH:mm:ss)
        let sourceUpdatedAt: string | undefined;
        if (item.GuncellenmeZamani) {
          const parts = item.GuncellenmeZamani.split(' ');
          if (parts.length === 2) {
            const dateParts = parts[0].split('.');
            if (dateParts.length === 3) {
              const isoStr = `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}T${parts[1]}+03:00`;
              sourceUpdatedAt = new Date(isoStr).toISOString();
            }
          }
        }

        const record: NormalizedGoldRecord = {
          instrument: mapping.instrument,
          displayName: mapping.displayName,
          buy,
          sell,
          change: 0, // Will be computed against previous baseline if not in raw payload
          changePercent: 0,
          currency: isUSD ? 'USD' : 'TRY',
          timestamp: new Date().toISOString(),
          sourceUpdatedAt,
          source: 'Altınkaynak Serbest Piyasa Göstergesi',
          sourceType: this.sourceType,
          dataScope: this.defaultDataScope,
          rawPayloadSnippet: {
            Kod: item.Kod,
            Aciklama: item.Aciklama,
            AlisRaw: item.Alis,
            SatisRaw: item.Satis
          }
        };

        records.push(record);
        seenInstruments.add(mapping.instrument);
      } catch (parseError: unknown) {
        this.log('warn', `Failed to parse price for code ${item.Kod}`, {
          raw: item,
          error: parseError instanceof Error ? parseError.message : String(parseError)
        });
      }
    }

    this.log('info', `Successfully parsed ${records.length} instruments from Altinkaynak`);
    return records;
  }
}
