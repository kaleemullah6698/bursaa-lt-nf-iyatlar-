import React, { useState, useMemo, useRef } from 'react';
import { Database, ChevronDown, TrendingUp, TrendingDown, RefreshCw, BarChart2, Activity, Maximize2 } from 'lucide-react';
import { getTickerData, SUPPORTED_TICKERS } from '../data/chartData';
import { CandleDataPoint } from '../types/gold';

export const FinancialTerminalChart: React.FC = () => {
  const [selectedTicker, setSelectedTicker] = useState<string>('TRY=X');
  const [timeframe, setTimeframe] = useState<'1G' | '1H' | '1A' | '3A' | '1Y'>('1H');
  const [chartType, setChartType] = useState<'candle' | 'line'>('candle');
  const [showIndicators, setShowIndicators] = useState<boolean>(true);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [hoveredCandle, setHoveredCandle] = useState<CandleDataPoint | null>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(null);
  const [tickerDropdownOpen, setTickerDropdownOpen] = useState<boolean>(false);
  const [refreshNotification, setRefreshNotification] = useState<string | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);

  // Load ticker data
  const tickerData = useMemo(() => {
    return getTickerData(selectedTicker, timeframe);
  }, [selectedTicker, timeframe]);

  const candles = tickerData.candles;

  // Active displayed candle (hovered or latest)
  const activeCandle = hoveredCandle || candles[candles.length - 1];

  // Manual data fetch simulation
  const handleFetchData = () => {
    setIsRefreshing(true);
    setRefreshNotification('Piyasa verileri alınıyor...');
    setTimeout(() => {
      setIsRefreshing(false);
      setRefreshNotification('Veriler güncellendi (Altınkaynak / TCMB / Spot)');
      setTimeout(() => setRefreshNotification(null), 3500);
    }, 800);
  };

  // Dimensions for SVG plotting
  const svgWidth = 840;
  const svgHeight = 360;
  const padding = { top: 25, right: 30, bottom: 45, left: 65 };
  const innerWidth = svgWidth - padding.left - padding.right;
  const innerHeight = svgHeight - padding.top - padding.bottom;

  // Calculate scales
  const allHighs = candles.map(c => c.high);
  const allLows = candles.map(c => c.low);
  const minVal = Math.min(...allLows);
  const maxVal = Math.max(...allHighs);
  const range = maxVal - minVal || 0.01;
  const buffer = range * 0.12;
  const yMin = minVal - buffer;
  const yMax = maxVal + buffer;
  const yRange = yMax - yMin;

  const getY = (val: number) => {
    return padding.top + innerHeight - ((val - yMin) / yRange) * innerHeight;
  };

  const getX = (index: number) => {
    if (candles.length === 1) return padding.left + innerWidth / 2;
    return padding.left + (index / (candles.length - 1)) * innerWidth;
  };

  // Generate 5-6 nice y-axis tick lines matching the screenshot (e.g. 48.60, 48.65, 48.70, etc.)
  const yTicks = useMemo(() => {
    const ticks: number[] = [];
    const count = 6;
    for (let i = 0; i <= count; i++) {
      const val = yMin + (i / count) * yRange;
      ticks.push(val);
    }
    return ticks;
  }, [yMin, yRange]);

  // Candle width based on candle count
  const candleBarWidth = Math.max(8, Math.min(36, (innerWidth / candles.length) * 0.58));

  // Compute Simple Moving Average (SMA 5) for indicator
  const smaPoints = useMemo(() => {
    const period = Math.min(5, Math.floor(candles.length / 2));
    if (period < 2) return [];
    const pts: { x: number; y: number }[] = [];
    for (let i = period - 1; i < candles.length; i++) {
      let sum = 0;
      for (let j = 0; j < period; j++) {
        sum += candles[i - j].close;
      }
      const avg = sum / period;
      pts.push({ x: getX(i), y: getY(avg) });
    }
    return pts;
  }, [candles, innerWidth, innerHeight, yMin, yRange]);

  // Area chart path
  const linePath = useMemo(() => {
    if (candles.length === 0) return '';
    return candles.reduce((acc, c, i) => {
      const x = getX(i);
      const y = getY(c.close);
      return i === 0 ? `M ${x} ${y}` : `${acc} L ${x} ${y}`;
    }, '');
  }, [candles, yMin, yRange]);

  const areaPath = useMemo(() => {
    if (!linePath) return '';
    const lastX = getX(candles.length - 1);
    const firstX = getX(0);
    const bottomY = padding.top + innerHeight;
    return `${linePath} L ${lastX} ${bottomY} L ${firstX} ${bottomY} Z`;
  }, [linePath, candles]);

  // Format currency value based on magnitude
  const formatPrice = (p: number) => {
    if (p < 100) return p.toFixed(2);
    return new Intl.NumberFormat('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(p);
  };

  const isUp = tickerData.changeAmount >= 0;

  // Handle mouse move for interactive crosshair
  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    // Convert mouseX to SVG coordinate space
    const scaleX = svgWidth / rect.width;
    const scaleY = svgHeight / rect.height;
    const svgMouseX = mouseX * scaleX;
    const svgMouseY = mouseY * scaleY;

    if (svgMouseX >= padding.left && svgMouseX <= padding.left + innerWidth) {
      const relX = (svgMouseX - padding.left) / innerWidth;
      const index = Math.round(relX * (candles.length - 1));
      const clampedIndex = Math.max(0, Math.min(candles.length - 1, index));
      setHoveredCandle(candles[clampedIndex]);
      setMousePos({ x: svgMouseX, y: svgMouseY });
    } else {
      setHoveredCandle(null);
      setMousePos(null);
    }
  };

  const handleMouseLeave = () => {
    setHoveredCandle(null);
    setMousePos(null);
  };

  return (
    <section id="grafik" className="py-8 bg-[#080A0D] border-y border-[rgba(244,241,232,0.06)] relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/3 w-[500px] h-[300px] bg-[#C8A646]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-[1180px] mx-auto px-4 sm:px-6">
        {/* Section Title Header */}
        <div className="mb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#C8A646] mb-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C8A646] animate-pulse"></span>
              Profesyonel Finans Terminali
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif text-[#F4F1E8] font-semibold tracking-tight">
              Bursa Canlı Piyasa & Mum Grafik Ekranı
            </h2>
            <p className="text-sm text-[#A5A8AE] mt-1 max-w-2xl">
              Anlık OHLC (Açılış, En Yüksek, En Düşük, Kapanış) mum ve çizgi grafik hareketlerini interaktif takip edin.
            </p>
          </div>

          {/* Timeframe & View Mode Toggles */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="bg-[#101318] p-1 rounded-lg border border-[rgba(244,241,232,0.08)] flex items-center gap-1 text-xs">
              {(['1G', '1H', '1A', '3A', '1Y'] as const).map(tf => (
                <button
                  key={tf}
                  onClick={() => setTimeframe(tf)}
                  className={`px-2.5 py-1 rounded font-medium transition-colors ${
                    timeframe === tf
                      ? 'bg-[#C8A646] text-[#080A0D] font-semibold'
                      : 'text-[#A5A8AE] hover:text-[#F4F1E8]'
                  }`}
                >
                  {tf}
                </button>
              ))}
            </div>

            <div className="bg-[#101318] p-1 rounded-lg border border-[rgba(244,241,232,0.08)] flex items-center gap-1 text-xs">
              <button
                onClick={() => setChartType('candle')}
                className={`px-2.5 py-1 rounded font-medium flex items-center gap-1 transition-colors ${
                  chartType === 'candle'
                    ? 'bg-[#1C222B] text-[#E2C76A] border border-[rgba(200,166,70,0.3)]'
                    : 'text-[#A5A8AE] hover:text-[#F4F1E8]'
                }`}
                title="Mum Grafik"
              >
                <BarChart2 className="w-3.5 h-3.5" />
                <span>Mum</span>
              </button>
              <button
                onClick={() => setChartType('line')}
                className={`px-2.5 py-1 rounded font-medium flex items-center gap-1 transition-colors ${
                  chartType === 'line'
                    ? 'bg-[#1C222B] text-[#E2C76A] border border-[rgba(200,166,70,0.3)]'
                    : 'text-[#A5A8AE] hover:text-[#F4F1E8]'
                }`}
                title="Çizgi Grafik"
              >
                <Activity className="w-3.5 h-3.5" />
                <span>Çizgi</span>
              </button>
            </div>
          </div>
        </div>

        {/* The Main Terminal Container - Crafted to match image.png */}
        <div
          ref={containerRef}
          className="bg-[#0D1015] border border-[rgba(244,241,232,0.1)] rounded-2xl overflow-hidden shadow-2xl relative"
        >
          {/* Top Bar matching image.png */}
          <div className="bg-[#090C0F] px-4 py-3 border-b border-[rgba(244,241,232,0.06)] flex flex-wrap items-center justify-between gap-3">
            {/* "Verileri getir" Dropdown Button */}
            <div className="relative">
              <button
                onClick={() => setTickerDropdownOpen(!tickerDropdownOpen)}
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-[#A5A8AE] hover:text-[#F4F1E8] transition-colors py-1 px-2.5 rounded-md hover:bg-[#14181E] border border-transparent hover:border-[rgba(244,241,232,0.08)]"
              >
                <Database className={`w-4 h-4 text-[#C8A646] ${isRefreshing ? 'animate-spin' : ''}`} />
                <span>Verileri getir</span>
                <ChevronDown className="w-3.5 h-3.5 text-[#A5A8AE]" />
              </button>

              {/* Dropdown Menu */}
              {tickerDropdownOpen && (
                <div className="absolute top-full left-0 mt-1.5 w-64 bg-[#14181E] border border-[rgba(244,241,232,0.12)] rounded-xl shadow-2xl py-2 z-50">
                  <div className="px-3 py-1.5 text-[11px] font-semibold text-[#A5A8AE] uppercase tracking-wider border-b border-[rgba(244,241,232,0.06)]">
                    Enstrüman Seçin
                  </div>
                  {Object.entries(SUPPORTED_TICKERS).map(([symbol, item]) => (
                    <button
                      key={symbol}
                      onClick={() => {
                        setSelectedTicker(symbol);
                        setTickerDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between transition-colors ${
                        selectedTicker === symbol
                          ? 'bg-[#C8A646]/15 text-[#E2C76A] font-semibold'
                          : 'text-[#F4F1E8] hover:bg-[#1C222B]'
                      }`}
                    >
                      <div>
                        <span className="font-mono font-bold mr-2 text-white">{symbol}</span>
                        <span className="text-[11px] text-[#A5A8AE]">{item.name}</span>
                      </div>
                      <span className="font-mono text-[11px] text-[#C8A646]">{item.currency}{item.basePrice}</span>
                    </button>
                  ))}
                  <div className="p-2 border-t border-[rgba(244,241,232,0.06)]">
                    <button
                      onClick={() => {
                        handleFetchData();
                        setTickerDropdownOpen(false);
                      }}
                      className="w-full text-center py-1.5 bg-[#C8A646] text-[#080A0D] text-xs font-semibold rounded-lg hover:bg-[#E2C76A] transition-colors flex items-center justify-center gap-1.5"
                    >
                      <RefreshCw className="w-3 h-3" />
                      Anlık Yenile
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Ticker Pills */}
            <div className="hidden sm:flex items-center gap-1.5">
              {Object.keys(SUPPORTED_TICKERS).slice(0, 4).map(sym => (
                <button
                  key={sym}
                  onClick={() => setSelectedTicker(sym)}
                  className={`px-2.5 py-1 text-xs rounded font-mono transition-colors ${
                    selectedTicker === sym
                      ? 'bg-[#1C222B] text-[#E2C76A] border border-[#C8A646]/40 font-semibold'
                      : 'text-[#A5A8AE] hover:text-white'
                  }`}
                >
                  {sym}
                </button>
              ))}
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-2 text-xs">
              <button
                onClick={() => setShowIndicators(!showIndicators)}
                className={`px-2.5 py-1 rounded transition-colors ${
                  showIndicators ? 'text-[#E2C76A] bg-[#C8A646]/10' : 'text-[#A5A8AE]'
                }`}
                title="Hareketli Ortalama (SMA)"
              >
                SMA 5
              </button>
              <button
                onClick={handleFetchData}
                disabled={isRefreshing}
                className="p-1.5 rounded hover:bg-[#14181E] text-[#A5A8AE] hover:text-[#C8A646] transition-colors"
                title="Yenile"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-[#C8A646]' : ''}`} />
              </button>
            </div>
          </div>

          {/* Real-Time Price & OHLC Header - Directly matching image.png */}
          <div className="px-5 py-4 border-b border-[rgba(244,241,232,0.06)] bg-[#0C0F14] flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Left: Ticker, Date, Big Price */}
            <div>
              <div className="flex items-center gap-3">
                <span className="font-mono font-bold text-sm tracking-wider text-white">
                  {selectedTicker}
                </span>
                <span className="text-xs font-mono text-[#A5A8AE]">
                  {activeCandle.date}
                </span>
                <span className="text-[11px] text-[#A5A8AE] hidden sm:inline">
                  {tickerData.name}
                </span>
              </div>

              {/* Big Price with +0.03(0.06%) format */}
              <div className="flex items-baseline gap-2.5 mt-1">
                <span className="text-3xl sm:text-4xl font-mono font-bold tracking-tight text-[#EF4444]">
                  {formatPrice(activeCandle.close)}
                </span>
                <span
                  className={`inline-flex items-center font-mono text-sm sm:text-base font-semibold ${
                    isUp ? 'text-[#3FA97A]' : 'text-[#EF4444]'
                  }`}
                >
                  {isUp ? '+' : ''}{tickerData.changeAmount.toFixed(2)}
                  ({isUp ? '+' : ''}{tickerData.changePercent.toFixed(2)}%)
                </span>
              </div>
            </div>

            {/* Right: OHLC Grid matching image.png */}
            {/* Aç, Kapat, Yüksek, Düşük, Hacim */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-mono">
              <div>
                <span className="text-[#A5A8AE] block text-[11px]">Aç</span>
                <span className="text-white font-medium num">{formatPrice(activeCandle.open)}</span>
              </div>
              <div>
                <span className="text-[#A5A8AE] block text-[11px]">Kapat</span>
                <span className="text-white font-medium num">{formatPrice(activeCandle.close)}</span>
              </div>
              <div>
                <span className="text-[#A5A8AE] block text-[11px]">Yüksek</span>
                <span className="text-white font-medium num">{formatPrice(activeCandle.high)}</span>
              </div>
              <div>
                <span className="text-[#A5A8AE] block text-[11px]">Düşük</span>
                <span className="text-white font-medium num">{formatPrice(activeCandle.low)}</span>
              </div>
              <div>
                <span className="text-[#A5A8AE] block text-[11px]">Hacim</span>
                <span className="text-white font-medium num">
                  {activeCandle.volume ? (activeCandle.volume / 1000).toFixed(1) + 'K' : '0,0'}
                </span>
              </div>
            </div>
          </div>

          {/* Toast Notification for Fetch */}
          {refreshNotification && (
            <div className="absolute top-16 right-4 z-20 bg-[#1C222B] border border-[#C8A646]/40 text-[#E2C76A] text-xs px-3 py-1.5 rounded-lg shadow-xl animate-fade-in flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#3FA97A] animate-ping" />
              {refreshNotification}
            </div>
          )}

          {/* Chart Canvas Area */}
          <div className="relative p-2 sm:p-4 bg-[#090C0F] terminal-grid select-none">
            <svg
              viewBox={`0 0 ${svgWidth} ${svgHeight}`}
              className="w-full h-[320px] sm:h-[380px] overflow-visible"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <defs>
                {/* Area Gradient */}
                <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#C8A646" stopOpacity="0.32" />
                  <stop offset="100%" stopColor="#C8A646" stopOpacity="0.0" />
                </linearGradient>

                {/* Candle Glow */}
                <filter id="glowGreen" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Horizontal Grid Lines with Price Labels on the Left matching image.png */}
              {yTicks.map((val, idx) => {
                const y = getY(val);
                return (
                  <g key={idx}>
                    {/* Dashed Horizontal Line */}
                    <line
                      x1={padding.left}
                      y1={y}
                      x2={padding.left + innerWidth}
                      y2={y}
                      stroke="rgba(244, 241, 232, 0.08)"
                      strokeWidth="1"
                      strokeDasharray="4 4"
                    />
                    {/* Price Label on the left margin */}
                    <text
                      x={padding.left - 10}
                      y={y + 4}
                      fill="#A5A8AE"
                      fontSize="11"
                      fontFamily="JetBrains Mono, monospace"
                      textAnchor="end"
                    >
                      {formatPrice(val)}
                    </text>
                  </g>
                );
              })}

              {/* Area Chart Mode */}
              {chartType === 'line' && (
                <>
                  <path d={areaPath} fill="url(#areaGradient)" />
                  <path
                    d={linePath}
                    fill="none"
                    stroke="#E2C76A"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  {candles.map((c, i) => (
                    <circle
                      key={i}
                      cx={getX(i)}
                      cy={getY(c.close)}
                      r={hoveredCandle === c ? 5 : 2.5}
                      fill="#C8A646"
                      stroke="#080A0D"
                      strokeWidth="1.5"
                    />
                  ))}
                </>
              )}

              {/* Candlestick Chart Mode - Crafted to match image.png exactly */}
              {chartType === 'candle' && (
                <g>
                  {candles.map((c, idx) => {
                    const cx = getX(idx);
                    const openY = getY(c.open);
                    const closeY = getY(c.close);
                    const highY = getY(c.high);
                    const lowY = getY(c.low);

                    const isBullish = c.close >= c.open;
                    // Colors: Green for bullish (#3FA97A / #22C55E), Red for bearish (#EF4444 / #C9605F)
                    const candleColor = isBullish ? '#22C55E' : '#EF4444';

                    const topBodyY = Math.min(openY, closeY);
                    const bodyHeight = Math.max(3, Math.abs(closeY - openY));

                    return (
                      <g key={idx} className="transition-opacity duration-150">
                        {/* Vertical Center Wick Line (from Low to High) */}
                        <line
                          x1={cx}
                          y1={highY}
                          x2={cx}
                          y2={lowY}
                          stroke={candleColor}
                          strokeWidth="1.5"
                        />

                        {/* Candlestick Body: Solid horizontal bar box matching the screenshot! */}
                        <rect
                          x={cx - candleBarWidth / 2}
                          y={topBodyY}
                          width={candleBarWidth}
                          height={bodyHeight}
                          fill={candleColor}
                          rx="1.5"
                          filter={hoveredCandle === c ? 'url(#glowGreen)' : undefined}
                          opacity={hoveredCandle && hoveredCandle !== c ? 0.75 : 1}
                        />

                        {/* Horizontal accent edge markers for exact open & close lines */}
                        <line
                          x1={cx - candleBarWidth / 2}
                          y1={openY}
                          x2={cx + candleBarWidth / 2}
                          y2={openY}
                          stroke={candleColor}
                          strokeWidth="2"
                        />
                        <line
                          x1={cx - candleBarWidth / 2}
                          y1={closeY}
                          x2={cx + candleBarWidth / 2}
                          y2={closeY}
                          stroke={candleColor}
                          strokeWidth="2"
                        />
                      </g>
                    );
                  })}
                </g>
              )}

              {/* SMA Indicator Line */}
              {showIndicators && smaPoints.length > 1 && (
                <path
                  d={smaPoints.reduce((acc, pt, i) => (i === 0 ? `M ${pt.x} ${pt.y}` : `${acc} L ${pt.x} ${pt.y}`), '')}
                  fill="none"
                  stroke="#38BDF8"
                  strokeWidth="1.6"
                  strokeDasharray="2 2"
                  opacity="0.85"
                />
              )}

              {/* X-Axis Date Labels matching image.png (e.g. 09/18, 09/21, 09/22) */}
              {candles.map((c, idx) => {
                const cx = getX(idx);
                return (
                  <g key={`x-${idx}`}>
                    <line
                      x1={cx}
                      y1={padding.top + innerHeight}
                      x2={cx}
                      y2={padding.top + innerHeight + 6}
                      stroke="rgba(244, 241, 232, 0.2)"
                    />
                    <text
                      x={cx}
                      y={padding.top + innerHeight + 22}
                      fill="#A5A8AE"
                      fontSize="11"
                      fontFamily="JetBrains Mono, monospace"
                      textAnchor="middle"
                    >
                      {c.label}
                    </text>
                  </g>
                );
              })}

              {/* Interactive Crosshair (dashed lines) */}
              {mousePos && hoveredCandle && (
                <g pointerEvents="none">
                  {/* Vertical Crosshair */}
                  <line
                    x1={mousePos.x}
                    y1={padding.top}
                    x2={mousePos.x}
                    y2={padding.top + innerHeight}
                    stroke="rgba(226, 199, 106, 0.5)"
                    strokeWidth="1"
                    strokeDasharray="3 3"
                  />
                  {/* Horizontal Crosshair */}
                  <line
                    x1={padding.left}
                    y1={mousePos.y}
                    x2={padding.left + innerWidth}
                    y2={mousePos.y}
                    stroke="rgba(226, 199, 106, 0.5)"
                    strokeWidth="1"
                    strokeDasharray="3 3"
                  />
                  {/* Target Circle on close */}
                  <circle
                    cx={mousePos.x}
                    cy={getY(hoveredCandle.close)}
                    r="4"
                    fill="#E2C76A"
                    stroke="#080A0D"
                    strokeWidth="2"
                  />
                </g>
              )}
            </svg>

            {/* Floating Crosshair Hover Card */}
            {hoveredCandle && mousePos && (
              <div
                className="absolute pointer-events-none bg-[#14181E]/95 backdrop-blur-md border border-[rgba(200,166,70,0.3)] rounded-lg p-2.5 shadow-2xl text-[11px] font-mono z-30"
                style={{
                  left: Math.min(Math.max(10, mousePos.x * 0.8), 620),
                  top: 20
                }}
              >
                <div className="text-[#C8A646] font-bold border-b border-[rgba(244,241,232,0.1)] pb-1 mb-1.5 flex items-center justify-between gap-4">
                  <span>{hoveredCandle.date}</span>
                  <span className={hoveredCandle.close >= hoveredCandle.open ? 'text-[#3FA97A]' : 'text-[#EF4444]'}>
                    {hoveredCandle.close >= hoveredCandle.open ? 'Yükseliş' : 'Düşüş'}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-x-3 gap-y-0.5 text-[#F4F1E8]">
                  <span className="text-[#A5A8AE]">Aç:</span>
                  <span className="text-right num">{formatPrice(hoveredCandle.open)}</span>
                  <span className="text-[#A5A8AE]">Kapat:</span>
                  <span className="text-right font-bold num">{formatPrice(hoveredCandle.close)}</span>
                  <span className="text-[#A5A8AE]">Yüksek:</span>
                  <span className="text-right text-[#3FA97A] num">{formatPrice(hoveredCandle.high)}</span>
                  <span className="text-[#A5A8AE]">Düşük:</span>
                  <span className="text-right text-[#EF4444] num">{formatPrice(hoveredCandle.low)}</span>
                  <span className="text-[#A5A8AE]">Hacim:</span>
                  <span className="text-right num">{hoveredCandle.volume ? (hoveredCandle.volume / 1000).toFixed(1) + 'K' : '0,0'}</span>
                </div>
              </div>
            )}
          </div>

          {/* Footer Bar of Terminal */}
          <div className="bg-[#090C0F] px-4 py-2.5 border-t border-[rgba(244,241,232,0.06)] flex flex-wrap items-center justify-between text-[11px] text-[#A5A8AE]">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#3FA97A]" />
                Veri Akışı: <strong>Canlı Serbest Piyasa (TCMB & Kapalı Çarşı)</strong>
              </span>
              <span className="hidden md:inline">|</span>
              <span className="hidden md:inline">Gecikme: ~0.4s</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-[#C8A646]">Destek: {formatPrice(tickerData.lowPrice)}</span>
              <span className="text-[#E2C76A]">Direnç: {formatPrice(tickerData.highPrice)}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
