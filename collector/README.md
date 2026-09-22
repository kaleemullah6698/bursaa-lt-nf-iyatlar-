# Bursa Altın Fiyatları - Automated Data Collection & Validation Engine

A dedicated, production-ready, automated data-engineering service built to collect, validate, store, and expose Turkish & Bursa gold prices.

This service is completely independent of any frontend presentation layer. It guarantees that the public website displays only validated, authenticated, and properly scoped gold price data without manual intervention or fabricated numbers.

---

## 1. Architectural Overview

```
                                [ External Data Sources ]
                                            │
        ┌───────────────────────────────────┴───────────────────────────────────┐
        ▼                                                                       ▼
[ Primary Public Feed ]                                               [ Fallback Feed / Scraper ]
(Altınkaynak Public JSON Endpoint)                                    (Structured Fallback)
        │                                                                       │
        └───────────────────────────────────┬───────────────────────────────────┘
                                            ▼
                                [ Source Adapter Layer ]
                               (Normalizes to Common Schema)
                                            ▼
                               [ Truth-in-Data Tagging ]
                    (dataScope: 'reference-market' | 'bursa-retail')
                                            ▼
                              [ Robust Validation Engine ]
                       - Turkish number parser (₺, comma, dots)
                       - Safe range checks [1,500 - 18,000 TL]
                       - Buy <= Sell relationship verification
                       - Anomaly / Spike detector (>20% jump)
                       - Max spread ceiling (<35%)
                                            ▼
                       ┌────────────────────┴────────────────────┐
                       ▼                                         ▼
            [ Accepted Records ]                        [ Rejected Records ]
                       │                                         │
                       ▼                                         ▼
           [ PostgreSQL Persistence ]                  [ Structured Alert Log ]
           - `gold_prices` (Historical)                (Logged to `collection_runs`
           - `latest_gold_prices` (Cache)               never published to website)
                       │
                       ▼
             [ Clean Internal REST API ]
        GET /health
        GET /data-status
        GET /api/gold-prices
        GET /api/gold-prices/history
```

---

## 2. API Availability & Source Investigation

Prior to implementing any web scraper, an investigation into free Turkish gold price data sources was conducted:

1. **Legitimate Free Public Endpoint Discovered**:
   * **Endpoint**: `https://static.altinkaynak.com/public/Gold`
   * **Status**: Open, publicly accessible structured JSON feed.
   * **Attributes**: Returns live buying price (`Alis`), selling price (`Satis`), code (`Kod`), Turkish timestamp (`GuncellenmeZamani`), and description (`Aciklama`).
   * **Instruments**: Gram Altın (`GA`, `PGA`), Has Altın (`HH_T`), Çeyrek Altın (`PC`), Eski Çeyrek (`EC`), Yarım Altın (`PY`), Teklik / Tam Altın (`PT`), Ata Cumhuriyet (`PA`), 22 Ayar Bilezik (`PB`), 18 Ayar (`P18`), 14 Ayar (`P14`), Gremse (`PG`), Reşat (`PR`), Hamit (`PH`), ONS (`XAUUSD`).
   * **Legal / Robot Compliance**: Publicly provided endpoint requiring no CAPTCHA bypass, no paywall evasion, and no bot-protection tampering.

2. **Bursa Kuyumcular Odası (BUKO) Context**:
   * Bursa Kuyumcular Odası does not offer an official public machine-readable JSON API.
   * In Turkish precious metals markets, local Bursa sarrafları trade based on Grand Bazaar / wholesale reference quotes plus local physical minting, transport, and Kapalı Çarşı retail spreads.
   * **Strict Truth-in-Data Rule**:
     * Wholesale data is strictly tagged as `dataScope: "reference-market"`.
     * Calibrated Bursa local rates are strictly tagged as `dataScope: "bursa-retail"`.
     * Data is **never** falsely claimed as direct Bursa room quotes when derived from reference feeds.

3. **Fallback Adapter**:
   * A secondary fallback adapter is maintained if the primary public feed becomes temporarily unavailable.
   * If both fail, existing valid prices are **never** overwritten with zeroes or nulls.

---

## 3. Data Validation Rules

Raw values are never published directly. Every tick undergoes validation:

1. **Turkish Financial Number Normalization**:
   * Handles `"5.432,15"`, `"₺5.432,15"`, `"5.432,15 TL"`, `"5 432,15"`, `"5,432.15"`, and non-breaking spaces `\u00A0`.
   * Standardizes to IEEE 754 float `5432.15`.
2. **Safe Range Bounds**:
   * Gram Altın: [1,500 TL - 18,000 TL]
   * Çeyrek Altın: [2,500 TL - 35,000 TL]
   * Cumhuriyet / Ata: [10,000 TL - 160,000 TL]
   * 22 Ayar Bilezik: [1,400 TL - 17,000 TL]
   * ONS: [$1,500 - $7,000 USD]
3. **Market Mechanics Invariant**:
   * `Buy Price <= Sell Price`. Any inverted quote is immediately rejected and logged.
4. **Spread Ceiling**:
   * Maximum acceptable spread is 35% of selling price.
5. **Anomaly / Spike Detector**:
   * Any single collection run where price swings by >20% compared to previous database record is flagged and rejected to prevent corrupted source data from entering the database.

---

## 4. Database Schema (PostgreSQL)

The database schema (`collector/src/db/schema.sql`) contains:

* `gold_prices`: Complete append-only audit trail of every valid tick with `instrument`, `buy_price`, `sell_price`, `source`, `source_type`, `data_scope`, `collected_at`, and `raw_snippet`.
* `latest_gold_prices`: Key-value cache indexed on `(instrument, data_scope)` ensuring sub-millisecond retrieval of the latest validated prices.
* `collection_runs`: Log of all runs, duration, records accepted, records rejected, and rejections detail.

*Note: If `DATABASE_URL` is omitted, the engine automatically falls back to an embedded in-memory database for zero-config local development.*

---

## 5. REST API Reference

The service exposes the following endpoints (default port `4000`):

### `GET /health`
Returns health status, uptime, primary source health, data age in seconds, and scheduler state.
```json
{
  "status": "healthy",
  "timestamp": "2026-09-22T21:55:00.000Z",
  "isSourceHealthy": true,
  "dataAgeSeconds": 45,
  "latestPricesAvailable": true,
  "uptimeSeconds": 1240
}
```

### `GET /data-status`
Returns detailed operational metrics, record counts, active instruments, and latest run report.

### `GET /api/gold-prices?scope=bursa-retail`
Returns the latest validated gold prices formatted for website consumption.
* Query parameter `scope`: `bursa-retail` (default), `reference-market`, or `all`.

```json
{
  "updatedAt": "2026-09-22T21:55:00.000Z",
  "source": "Bursa Kuyumcular Çarşısı Perakende Modeli",
  "dataScope": "bursa-retail",
  "itemCount": 13,
  "prices": [
    {
      "instrument": "gram-altin",
      "displayName": "Gram Altın (24 Ayar) (Bursa Çarşı)",
      "buy": 6731.76,
      "sell": 6866.09,
      "spread": 134.33,
      "change": 0,
      "changePercent": 0,
      "currency": "TRY",
      "source": "Bursa Kuyumcular Çarşısı Perakende Modeli",
      "dataScope": "bursa-retail",
      "timestamp": "2026-09-22T21:55:00.000Z"
    }
  ]
}
```

### `GET /api/gold-prices/history?instrument=gram-altin&limit=100`
Returns historical price points for 24h, 7d, 30d charting.

### `POST /api/collector/trigger`
Forces an immediate out-of-schedule collection run.

---

## 6. How to Run & Deploy

### Quick Start (Local Node.js)
```bash
# Run automated unit and integration tests (23 tests)
npm run collector:test

# Run a single one-off collection cycle in CLI
npm run collector:once

# Start the continuous collector daemon (default 5-min intervals)
npm run collector:start
```

### Production Deployment via Docker Compose
```bash
cd collector
docker-compose up -d --build
```
This starts:
1. `bursa_gold_postgres`: PostgreSQL 16 container with persistent volume and schema initialization.
2. `bursa_gold_collector`: Node.js 22 Alpine worker with health checks and auto-restart.

---

## 7. Automated Test Suite

Run the test suite at any time:
```bash
npx tsx collector/tests/run-tests.ts
```
Covers:
* Turkish financial number formats (`₺5.432,15`, `5 432,15`, non-breaking spaces).
* Upper and lower bounds validation.
* Rejection of inverted buy/sell quotes.
* Rejection of abnormal spreads (>35%).
* Rejection of sudden price spikes (>20%).
* Mandatory field assertions.
* Live public API contract testing and structure change handling.
