import React, { createContext, useContext, useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { GoldPriceItem, PriceAlert, PortfolioItem, PortfolioSummary } from '../types/gold';
import { INITIAL_GOLD_DATA } from '../data/goldData';

interface MarketStatusInfo {
  isOpen: boolean;
  statusText: string;
  nextEventText: string;
  turkeyTimeStr: string;
}

export interface EngineTelemetry {
  fps: number;
  latencyMs: number;
  tickCount: number;
  memoryUsageMB: number;
  isTurbo: boolean;
}

interface GoldContextType {
  items: GoldPriceItem[];
  selectedItem: GoldPriceItem | null;
  setSelectedItem: (item: GoldPriceItem | null) => void;
  openDetailBySlug: (slug: string) => void;
  liveStreamActive: boolean;
  toggleLiveStream: () => void;
  streamSpeed: number; // in seconds
  setStreamSpeed: (speed: number) => void;
  isTurbo: boolean;
  toggleTurbo: () => void;
  soundEnabled: boolean;
  toggleSound: () => void;
  lastRefreshTime: Date;
  refreshPrices: () => void;
  flashedItemIds: Record<string, 'up' | 'down'>;
  marketStatus: MarketStatusInfo;
  telemetry: EngineTelemetry;
  alerts: PriceAlert[];
  addAlert: (goldId: string, targetPrice: number, condition: 'above' | 'below') => void;
  removeAlert: (id: string) => void;
  portfolio: PortfolioItem[];
  addPortfolioItem: (item: Omit<PortfolioItem, 'id' | 'buyDate'>) => void;
  removePortfolioItem: (id: string) => void;
  portfolioSummary: PortfolioSummary;
  calculatorPreselectedGoldId: string | null;
  setCalculatorPreselectedGoldId: (id: string | null) => void;
  openCalculatorWithGold: (id: string) => void;
  currencyView: 'TRY' | 'USD' | 'EUR';
  setCurrencyView: (c: 'TRY' | 'USD' | 'EUR') => void;
  commandPaletteOpen: boolean;
  setCommandPaletteOpen: (open: boolean) => void;
}

const GoldContext = createContext<GoldContextType | undefined>(undefined);

// Safe storage access (failsafe for iframes with blocked storage)
const safeGetStorage = <T,>(key: string, fallback: T): T => {
  try {
    if (typeof window === 'undefined' || !window.localStorage) return fallback;
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch {
    return fallback;
  }
};

const safeSetStorage = <T,>(key: string, val: T): void => {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.setItem(key, JSON.stringify(val));
    }
  } catch {
    // blocked or quota exceeded
  }
};

// Singleton AudioContext with lazy initialization
let sharedAudioCtx: AudioContext | null = null;
const getSharedAudioContext = () => {
  if (typeof window === 'undefined') return null;
  try {
    if (!sharedAudioCtx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        sharedAudioCtx = new AudioCtx();
      }
    }
    if (sharedAudioCtx && sharedAudioCtx.state === 'suspended') {
      sharedAudioCtx.resume().catch(() => {});
    }
    return sharedAudioCtx;
  } catch {
    return null;
  }
};

export const GoldProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<GoldPriceItem[]>(INITIAL_GOLD_DATA);
  const [selectedItem, setSelectedItem] = useState<GoldPriceItem | null>(null);
  const [liveStreamActive, setLiveStreamActive] = useState<boolean>(true);
  const [streamSpeed, setStreamSpeed] = useState<number>(2.5);
  const [isTurbo, setIsTurbo] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(false);
  const [lastRefreshTime, setLastRefreshTime] = useState<Date>(new Date());
  const [flashedItemIds, setFlashedItemIds] = useState<Record<string, 'up' | 'down'>>({});
  const [calculatorPreselectedGoldId, setCalculatorPreselectedGoldId] = useState<string | null>(null);
  const [currencyView, setCurrencyView] = useState<'TRY' | 'USD' | 'EUR'>('TRY');
  const [commandPaletteOpen, setCommandPaletteOpen] = useState<boolean>(false);

  // High performance telemetry
  const [fps, setFps] = useState<number>(60);
  const [latencyMs, setLatencyMs] = useState<number>(0.4);
  const [tickCount, setTickCount] = useState<number>(0);
  const [memoryUsageMB, setMemoryUsageMB] = useState<number>(12.4);

  // Price alerts safely stored
  const [alerts, setAlerts] = useState<PriceAlert[]>(() => {
    return safeGetStorage<PriceAlert[]>('bursa_gold_alerts', []);
  });

  // Portfolio holdings safely stored
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>(() => {
    return safeGetStorage<PortfolioItem[]>('bursa_gold_portfolio', [
      {
        id: 'port-1',
        goldId: 'gram-altin',
        amount: 15,
        buyPrice: 6620.0,
        buyDate: '2026-08-14',
        notes: 'Bursa Kapalı Çarşı İAR Külçe'
      },
      {
        id: 'port-2',
        goldId: 'ceyrek-altin',
        amount: 4,
        buyPrice: 10850.0,
        buyDate: '2026-09-01',
        notes: 'Yatırımlık Yeni Tarihli'
      }
    ]);
  });

  // Throttled FPS & Memory Monitor (every 2.5s) to preserve CPU and 0 INP lag
  const frameCountRef = useRef(0);
  const lastFpsTimeRef = useRef(typeof performance !== 'undefined' ? performance.now() : 0);

  useEffect(() => {
    if (typeof window === 'undefined' || typeof requestAnimationFrame === 'undefined') return;

    let animId: number;
    const countFrame = () => {
      frameCountRef.current++;
      const now = performance.now();
      if (now - lastFpsTimeRef.current >= 2500) {
        const delta = (now - lastFpsTimeRef.current) / 1000;
        const currentFps = Math.round(frameCountRef.current / delta);
        setFps(prev => (Math.abs(prev - currentFps) > 3 ? Math.min(120, Math.max(30, currentFps)) : prev));
        frameCountRef.current = 0;
        lastFpsTimeRef.current = now;

        const perf = performance as unknown as { memory?: { usedJSHeapSize: number } };
        if (perf?.memory?.usedJSHeapSize) {
          const used = perf.memory.usedJSHeapSize;
          const mb = parseFloat((used / 1048576).toFixed(1));
          setMemoryUsageMB(prev => (Math.abs(prev - mb) > 1 ? mb : prev));
        }
      }
      animId = requestAnimationFrame(countFrame);
    };

    animId = requestAnimationFrame(countFrame);
    return () => cancelAnimationFrame(animId);
  }, []);

  const addAlert = useCallback((goldId: string, targetPrice: number, condition: 'above' | 'below') => {
    const newAlert: PriceAlert = {
      id: 'alt-' + Date.now(),
      goldId,
      targetPrice,
      condition,
      createdAt: new Date().toLocaleDateString('tr-TR'),
      active: true
    };
    setAlerts(prev => {
      const updated = [...prev, newAlert];
      safeSetStorage('bursa_gold_alerts', updated);
      return updated;
    });
  }, []);

  const removeAlert = useCallback((id: string) => {
    setAlerts(prev => {
      const updated = prev.filter(a => a.id !== id);
      safeSetStorage('bursa_gold_alerts', updated);
      return updated;
    });
  }, []);

  const addPortfolioItem = useCallback((data: Omit<PortfolioItem, 'id' | 'buyDate'>) => {
    const newItem: PortfolioItem = {
      ...data,
      id: 'port-' + Date.now(),
      buyDate: new Date().toISOString().split('T')[0]
    };
    setPortfolio(prev => {
      const updated = [...prev, newItem];
      safeSetStorage('bursa_gold_portfolio', updated);
      return updated;
    });
  }, []);

  const removePortfolioItem = useCallback((id: string) => {
    setPortfolio(prev => {
      const updated = prev.filter(p => p.id !== id);
      safeSetStorage('bursa_gold_portfolio', updated);
      return updated;
    });
  }, []);

  // Compute portfolio summary memoized
  const portfolioSummary = useMemo<PortfolioSummary>(() => {
    let totalCost = 0;
    let currentValue = 0;

    portfolio.forEach(p => {
      const match = items.find(i => i.id === p.goldId);
      const currentPrice = match ? match.sellingPrice : p.buyPrice;
      totalCost += p.amount * p.buyPrice;
      currentValue += p.amount * currentPrice;
    });

    const totalProfitTL = currentValue - totalCost;
    const totalProfitPercent = totalCost > 0 ? (totalProfitTL / totalCost) * 100 : 0;

    return {
      totalCost,
      currentValue,
      totalProfitTL,
      totalProfitPercent
    };
  }, [portfolio, items]);

  // Audio tone generator with reused AudioContext singleton
  const playTickSound = useCallback((direction: 'up' | 'down') => {
    if (!soundEnabled) return;
    try {
      const ctx = getSharedAudioContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(direction === 'up' ? 880 : 440, ctx.currentTime);
      gain.gain.setValueAtTime(0.035, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.06);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.06);
    } catch {
      // Audio autoplay policy
    }
  }, [soundEnabled]);

  const openDetailBySlug = useCallback((slug: string) => {
    const found = items.find(i => i.slug === slug || i.id === slug);
    if (found) {
      setSelectedItem(found);
    }
  }, [items]);

  const openCalculatorWithGold = useCallback((id: string) => {
    setCalculatorPreselectedGoldId(id);
    if (typeof window !== 'undefined' && window.location.pathname !== '/hesaplama') {
      window.history.pushState({}, '', '/hesaplama');
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Compute Bursa Market Open / Close status based on Turkey Time (UTC+3)
  const getBursaMarketStatus = (): MarketStatusInfo => {
    try {
      const now = new Date();
      const utc = now.getTime() + now.getTimezoneOffset() * 60000;
      const turkeyDate = new Date(utc + 3600000 * 3);

      const dayOfWeek = turkeyDate.getDay();
      const hours = turkeyDate.getHours();
      const minutes = turkeyDate.getMinutes();
      const totalMinutes = hours * 60 + minutes;

      const openMinutes = 9 * 60; // 09:00
      const closeMinutes = 18 * 60 + 30; // 18:30

      const timeStr = turkeyDate.toLocaleTimeString('tr-TR', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });

      if (dayOfWeek === 0) {
        return {
          isOpen: false,
          statusText: 'Kapalı (Pazar Günü)',
          nextEventText: "Pazartesi 09:00'da Açılacak",
          turkeyTimeStr: timeStr
        };
      }

      if (dayOfWeek === 6) {
        const satClose = 15 * 60;
        if (totalMinutes >= openMinutes && totalMinutes <= satClose) {
          return {
            isOpen: true,
            statusText: 'Açık (Cumartesi Yarım Gün)',
            nextEventText: "15:00'da Kapanacak",
            turkeyTimeStr: timeStr
          };
        }
        return {
          isOpen: false,
          statusText: 'Kapalı (Hafta Sonu)',
          nextEventText: "Pazartesi 09:00'da Açılacak",
          turkeyTimeStr: timeStr
        };
      }

      if (totalMinutes >= openMinutes && totalMinutes <= closeMinutes) {
        return {
          isOpen: true,
          statusText: 'Piyasa Açık · Canlı',
          nextEventText: "18:30'da Kapanacak",
          turkeyTimeStr: timeStr
        };
      }

      return {
        isOpen: false,
        statusText: 'Piyasa Kapalı (Serbest Nöbetçi)',
        nextEventText: "Sabah 09:00'da Açılacak",
        turkeyTimeStr: timeStr
      };
    } catch {
      return {
        isOpen: true,
        statusText: 'Piyasa Açık · Canlı',
        nextEventText: "18:30'da Kapanacak",
        turkeyTimeStr: '12:00:00'
      };
    }
  };

  const [marketStatus, setMarketStatus] = useState<MarketStatusInfo>(getBursaMarketStatus);

  useEffect(() => {
    const timer = setInterval(() => {
      setMarketStatus(getBursaMarketStatus());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const effectiveIntervalMs = isTurbo ? 800 : streamSpeed * 1000;

  // Real-time tick engine with batched latency measurement
  useEffect(() => {
    if (!liveStreamActive) return;

    const interval = setInterval(() => {
      const tStart = performance.now();

      setItems(prevItems => {
        const newItems = [...prevItems];
        const newFlashed: Record<string, 'up' | 'down'> = {};

        const indicesToUpdate: number[] = [];
        const countToUpdate = isTurbo ? 4 : Math.floor(Math.random() * 3) + 2;

        while (indicesToUpdate.length < countToUpdate && indicesToUpdate.length < newItems.length) {
          const randIdx = Math.floor(Math.random() * newItems.length);
          if (!indicesToUpdate.includes(randIdx)) {
            indicesToUpdate.push(randIdx);
          }
        }

        indicesToUpdate.forEach(idx => {
          const item = newItems[idx];
          if (!item) return;

          const pct = (Math.random() - 0.48) * 0.0007;
          const delta = item.sellingPrice * pct;
          const isUp = delta >= 0;

          const newSelling = parseFloat((item.sellingPrice + delta).toFixed(2));
          const spread = item.sellingPrice - item.buyingPrice;
          const newBuying = parseFloat((newSelling - spread).toFixed(2));
          const newChangeAmount = parseFloat((item.changeAmount + delta).toFixed(2));
          const newChangeRate = parseFloat(
            (((newSelling - item.previousClose) / item.previousClose) * 100).toFixed(2)
          );

          const newSpark = [...item.sparkline.slice(1), newSelling];

          newItems[idx] = {
            ...item,
            buyingPrice: newBuying,
            sellingPrice: newSelling,
            changeAmount: newChangeAmount,
            changeRate: newChangeRate,
            dayHigh: Math.max(item.dayHigh, newSelling),
            dayLow: Math.min(item.dayLow, newBuying),
            sparkline: newSpark,
            lastUpdate: isTurbo ? 'Ultra · 0.8s' : 'Canlı · 2.5s'
          };

          newFlashed[item.id] = isUp ? 'up' : 'down';
        });

        setFlashedItemIds(newFlashed);
        const firstDirection = Object.values(newFlashed)[0];
        if (firstDirection) playTickSound(firstDirection);

        const flashDuration = isTurbo ? 600 : 900;
        setTimeout(() => {
          setFlashedItemIds({});
        }, flashDuration);

        return newItems;
      });

      const tEnd = performance.now();
      const measuredLag = parseFloat((tEnd - tStart).toFixed(2));
      setLatencyMs(Math.max(0.1, measuredLag));
      setTickCount(c => c + 1);
      setLastRefreshTime(new Date());
    }, effectiveIntervalMs);

    return () => clearInterval(interval);
  }, [liveStreamActive, effectiveIntervalMs, isTurbo, playTickSound]);

  const refreshPrices = useCallback(() => {
    setLastRefreshTime(new Date());
    setLiveStreamActive(true);
  }, []);

  const toggleLiveStream = useCallback(() => {
    setLiveStreamActive(prev => !prev);
  }, []);

  const toggleTurbo = useCallback(() => {
    setIsTurbo(prev => !prev);
  }, []);

  const toggleSound = useCallback(() => {
    setSoundEnabled(prev => {
      const next = !prev;
      if (next) {
        getSharedAudioContext();
      }
      return next;
    });
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setCommandPaletteOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const telemetry: EngineTelemetry = useMemo(() => ({
    fps,
    latencyMs,
    tickCount,
    memoryUsageMB,
    isTurbo
  }), [fps, latencyMs, tickCount, memoryUsageMB, isTurbo]);

  const contextValue: GoldContextType = useMemo(() => ({
    items,
    selectedItem,
    setSelectedItem,
    openDetailBySlug,
    liveStreamActive,
    toggleLiveStream,
    streamSpeed,
    setStreamSpeed,
    isTurbo,
    toggleTurbo,
    soundEnabled,
    toggleSound,
    lastRefreshTime,
    refreshPrices,
    flashedItemIds,
    marketStatus,
    telemetry,
    alerts,
    addAlert,
    removeAlert,
    portfolio,
    addPortfolioItem,
    removePortfolioItem,
    portfolioSummary,
    calculatorPreselectedGoldId,
    setCalculatorPreselectedGoldId,
    openCalculatorWithGold,
    currencyView,
    setCurrencyView,
    commandPaletteOpen,
    setCommandPaletteOpen
  }), [
    items,
    selectedItem,
    liveStreamActive,
    streamSpeed,
    isTurbo,
    soundEnabled,
    lastRefreshTime,
    flashedItemIds,
    marketStatus,
    telemetry,
    alerts,
    portfolio,
    portfolioSummary,
    calculatorPreselectedGoldId,
    currencyView,
    commandPaletteOpen,
    openDetailBySlug,
    toggleLiveStream,
    toggleTurbo,
    toggleSound,
    refreshPrices,
    addAlert,
    removeAlert,
    addPortfolioItem,
    removePortfolioItem,
    openCalculatorWithGold
  ]);

  return (
    <GoldContext.Provider value={contextValue}>
      {children}
    </GoldContext.Provider>
  );
};

export const useGold = (): GoldContextType => {
  const context = useContext(GoldContext);
  if (!context) {
    throw new Error('useGold must be used within a GoldProvider');
  }
  return context;
};
