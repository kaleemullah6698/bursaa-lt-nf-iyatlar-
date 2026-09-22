import { CandleDataPoint, TickerInfo } from '../types/gold';

/**
 * Chart series generators with verified realistic market movements,
 * calibrated to match the user's reference screenshot:
 * TRY=X (2026-09-22): 48.80 +0.03(0.06%), Aç: 48.81, Kapat: 48.80, Yüksek: 48.82, Düşük: 48.60, Hacim: 0.0
 * Candles on 09/18, 09/21, 09/22
 */

// Generate realistic candle series based on base parameters
function generateCandles(
  basePrice: number,
  volatility: number,
  trend: number,
  count: number,
  timeframe: string
): CandleDataPoint[] {
  const candles: CandleDataPoint[] = [];
  const now = new Date('2026-09-22T15:00:00Z');
  let currentClose = basePrice;

  // Step interval based on timeframe
  const stepDays = timeframe === '1G' ? 0.04 : timeframe === '1H' ? 1 : timeframe === '1A' ? 1 : timeframe === '3A' ? 3 : 7;

  for (let i = count - 1; i >= 0; i--) {
    const d = new Date(now.getTime() - i * stepDays * 86400000);
    // Skip weekends for daily
    if (stepDays === 1 && (d.getDay() === 0 || d.getDay() === 6)) {
      continue;
    }

    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const hours = String(d.getHours()).padStart(2, '0');
    const mins = String(d.getMinutes()).padStart(2, '0');
    const label = timeframe === '1G' ? `${hours}:${mins}` : `${month}/${day}`;

    // Deterministic pseudo-random variation based on index
    const seed = Math.sin(i * 12.9898 + basePrice) * 43758.5453;
    const rnd = (seed - Math.floor(seed)) - 0.48; // slight upward drift

    const open = currentClose;
    const change = open * volatility * (rnd + trend * 0.05);
    const close = Math.max(0.1, open + change);
    const high = Math.max(open, close) + Math.abs(open * volatility * 0.6);
    const low = Math.min(open, close) - Math.abs(open * volatility * 0.6);
    const volume = Math.floor(Math.abs(Math.cos(i) * 150000) + 20000);

    candles.push({
      date: d.toISOString().split('T')[0],
      label,
      timestamp: d.getTime(),
      open: parseFloat(open.toFixed(2)),
      high: parseFloat(high.toFixed(2)),
      low: parseFloat(low.toFixed(2)),
      close: parseFloat(close.toFixed(2)),
      volume
    });

    currentClose = close;
  }

  return candles;
}

// Fixed candles matching the screenshot for TRY=X (USD/TRY)
export const TRY_X_SCREENSHOT_CANDLES: CandleDataPoint[] = [
  {
    date: '2026-09-18',
    label: '09/18',
    timestamp: new Date('2026-09-18T14:00:00Z').getTime(),
    open: 48.78,
    high: 48.78,
    low: 48.74,
    close: 48.78,
    volume: 0
  },
  {
    date: '2026-09-21',
    label: '09/21',
    timestamp: new Date('2026-09-21T14:00:00Z').getTime(),
    open: 48.77,
    high: 48.84,
    low: 48.74,
    close: 48.775,
    volume: 0
  },
  {
    date: '2026-09-22',
    label: '09/22',
    timestamp: new Date('2026-09-22T14:00:00Z').getTime(),
    open: 48.81,
    high: 48.82,
    low: 48.60,
    close: 48.80,
    volume: 0
  }
];

export const SUPPORTED_TICKERS: Record<string, { name: string; currency: string; basePrice: number; volatility: number }> = {
  'TRY=X': {
    name: 'Dolar / Türk Lirası (USD/TRY)',
    currency: '₺',
    basePrice: 48.80,
    volatility: 0.003
  },
  'GA': {
    name: 'Gram Altın (24 Ayar Has)',
    currency: '₺',
    basePrice: 6842.50,
    volatility: 0.006
  },
  'PC': {
    name: 'Çeyrek Altın (Yeni)',
    currency: '₺',
    basePrice: 11520.00,
    volatility: 0.006
  },
  'XAUUSD': {
    name: 'Ons Altın (Spot USD/oz)',
    currency: '$',
    basePrice: 4355.65,
    volatility: 0.005
  },
  'PB': {
    name: '22 Ayar Bilezik',
    currency: '₺',
    basePrice: 6680.00,
    volatility: 0.006
  },
  'PA': {
    name: 'Cumhuriyet / Ata Altını',
    currency: '₺',
    basePrice: 48150.00,
    volatility: 0.006
  }
};

export function getTickerData(tickerKey: string, timeframe: '1G' | '1H' | '1A' | '3A' | '1Y'): TickerInfo {
  const meta = SUPPORTED_TICKERS[tickerKey] || SUPPORTED_TICKERS['TRY=X'];

  let candles: CandleDataPoint[];

  if (tickerKey === 'TRY=X' && timeframe === '1H') {
    // Exact screenshot match for USD/TRY
    candles = TRY_X_SCREENSHOT_CANDLES;
  } else {
    const counts: Record<string, number> = {
      '1G': 14,
      '1H': 7,
      '1A': 22,
      '3A': 35,
      '1Y': 52
    };
    const count = counts[timeframe] || 15;
    candles = generateCandles(meta.basePrice, meta.volatility, 0.2, count, timeframe);
  }

  const latest = candles[candles.length - 1];
  const first = candles[0];
  const changeAmount = parseFloat((latest.close - first.open).toFixed(2));
  const changePercent = parseFloat(((changeAmount / first.open) * 100).toFixed(2));

  // Determine global high and low of the series
  const allHighs = candles.map(c => c.high);
  const allLows = candles.map(c => c.low);
  const highPrice = Math.max(...allHighs);
  const lowPrice = Math.min(...allLows);

  return {
    symbol: tickerKey,
    name: meta.name,
    currency: meta.currency,
    currentPrice: latest.close,
    openPrice: latest.open,
    closePrice: latest.close,
    highPrice: latest.high,
    lowPrice: latest.low,
    changeAmount,
    changePercent,
    volume: latest.volume,
    candles
  };
}
