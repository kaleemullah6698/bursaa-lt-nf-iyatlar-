-- ==============================================================================
-- Schema for Bursa & Türkiye Gold Price Collection Engine
-- PostgreSQL 14+
-- ==============================================================================

-- 1. Full historical log of all collected and validated price observations
CREATE TABLE IF NOT EXISTS gold_prices (
    id BIGSERIAL PRIMARY KEY,
    instrument VARCHAR(50) NOT NULL,
    display_name VARCHAR(100) NOT NULL,
    buy_price NUMERIC(14, 4) NOT NULL,
    sell_price NUMERIC(14, 4) NOT NULL,
    price_change NUMERIC(14, 4) DEFAULT 0,
    change_percent NUMERIC(8, 4) DEFAULT 0,
    currency VARCHAR(10) NOT NULL DEFAULT 'TRY',
    source VARCHAR(150) NOT NULL,
    source_type VARCHAR(20) NOT NULL, -- 'api', 'scraper', 'feed'
    data_scope VARCHAR(30) NOT NULL, -- 'bursa', 'turkiye', 'reference-market', 'bursa-retail'
    collected_at TIMESTAMPTZ NOT NULL,
    source_updated_at TIMESTAMPTZ,
    raw_snippet JSONB,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes for fast analytics, chart rendering and filtering
CREATE INDEX IF NOT EXISTS idx_gold_prices_instrument_collected 
    ON gold_prices (instrument, collected_at DESC);

CREATE INDEX IF NOT EXISTS idx_gold_prices_source 
    ON gold_prices (source);

CREATE INDEX IF NOT EXISTS idx_gold_prices_data_scope 
    ON gold_prices (data_scope);

CREATE INDEX IF NOT EXISTS idx_gold_prices_collected_at 
    ON gold_prices (collected_at DESC);


-- 2. Fast Current State Cache Table (One row per instrument + data_scope)
-- Guarantees sub-millisecond retrieval of the latest validated prices for the frontend
CREATE TABLE IF NOT EXISTS latest_gold_prices (
    instrument VARCHAR(50) NOT NULL,
    data_scope VARCHAR(30) NOT NULL,
    display_name VARCHAR(100) NOT NULL,
    buy_price NUMERIC(14, 4) NOT NULL,
    sell_price NUMERIC(14, 4) NOT NULL,
    spread NUMERIC(14, 4) GENERATED ALWAYS AS (sell_price - buy_price) STORED,
    price_change NUMERIC(14, 4) DEFAULT 0,
    change_percent NUMERIC(8, 4) DEFAULT 0,
    currency VARCHAR(10) NOT NULL DEFAULT 'TRY',
    source VARCHAR(150) NOT NULL,
    source_type VARCHAR(20) NOT NULL,
    collected_at TIMESTAMPTZ NOT NULL,
    source_updated_at TIMESTAMPTZ,
    is_stale BOOLEAN NOT NULL DEFAULT FALSE,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    PRIMARY KEY (instrument, data_scope)
);

CREATE INDEX IF NOT EXISTS idx_latest_gold_prices_scope 
    ON latest_gold_prices (data_scope);


-- 3. Audit log of all collection runs (for health monitoring, latency, SLA checks)
CREATE TABLE IF NOT EXISTS collection_runs (
    run_id UUID PRIMARY KEY,
    start_time TIMESTAMPTZ NOT NULL,
    end_time TIMESTAMPTZ NOT NULL,
    duration_ms INTEGER NOT NULL,
    source VARCHAR(150) NOT NULL,
    source_type VARCHAR(20) NOT NULL,
    data_scope VARCHAR(30) NOT NULL,
    http_status INTEGER,
    records_found INTEGER NOT NULL DEFAULT 0,
    records_accepted INTEGER NOT NULL DEFAULT 0,
    records_rejected INTEGER NOT NULL DEFAULT 0,
    status VARCHAR(20) NOT NULL, -- 'SUCCESS', 'PARTIAL', 'FAILED'
    rejections JSONB,
    error_message TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_collection_runs_created_at 
    ON collection_runs (created_at DESC);
