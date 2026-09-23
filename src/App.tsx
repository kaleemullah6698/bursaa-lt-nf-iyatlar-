/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef, lazy, Suspense } from 'react';
import { GoldProvider, useGold } from './context/GoldContext';
import { ErrorBoundary } from './components/ErrorBoundary';
import { Header } from './components/Header';
import { LiveTickerMarquee } from './components/LiveTickerMarquee';
import { UltraEngineStatusBar } from './components/UltraEngineStatusBar';
import { Breadcrumbs } from './components/Breadcrumbs';
import { Footer } from './components/Footer';
import { MobileBottomNav } from './components/MobileBottomNav';
import { 
  PageRoute, 
  ROUTE_TITLES, 
  ROUTE_META_DESCRIPTIONS, 
  getRouteFromPath, 
  sanitizeHashToPath, 
  navigate,
  PAGE_PATHS 
} from './utils/router';

// Code-Split Standalone Premium Pages for Instant Initial Load & 0ms Route Switching
const HomePage = lazy(() => import('./pages/HomePage').then(m => ({ default: m.HomePage })));
const ChartTerminalPage = lazy(() => import('./pages/ChartTerminalPage').then(m => ({ default: m.ChartTerminalPage })));
const GoldTypesPage = lazy(() => import('./pages/GoldTypesPage').then(m => ({ default: m.GoldTypesPage })));
const PortfolioPage = lazy(() => import('./pages/PortfolioPage').then(m => ({ default: m.PortfolioPage })));
const CalculatorPage = lazy(() => import('./pages/CalculatorPage').then(m => ({ default: m.CalculatorPage })));
const BursadaAltinPage = lazy(() => import('./pages/BursadaAltinPage').then(m => ({ default: m.BursadaAltinPage })));
const JewelersPage = lazy(() => import('./pages/JewelersPage').then(m => ({ default: m.JewelersPage })));
const FaqPage = lazy(() => import('./pages/FaqPage').then(m => ({ default: m.FaqPage })));

// Lazy Interactive Modals
const GoldDetailModal = lazy(() =>
  import('./components/GoldDetailModal').then(m => ({ default: m.GoldDetailModal }))
);
const PriceAlertModal = lazy(() =>
  import('./components/PriceAlertModal').then(m => ({ default: m.PriceAlertModal }))
);
const CommandPalette = lazy(() =>
  import('./components/CommandPalette').then(m => ({ default: m.CommandPalette }))
);

const MainContent: React.FC = () => {
  const [activePage, setActivePage] = useState<PageRoute>('fiyatlar');
  const [alertModalOpen, setAlertModalOpen] = useState(false);
  const { items, selectedItem, setSelectedItem } = useGold();

  const itemsRef = useRef(items);
  useEffect(() => {
    itemsRef.current = items;
  }, [items]);

  // Synchronize HTML5 Path-based Routing without hash
  useEffect(() => {
    // 1. Immediately upgrade any lingering hash (e.g. /#/altin-turleri) to clean path (/altin-turleri)
    sanitizeHashToPath();

    const handleLocationChange = () => {
      const pathname = window.location.pathname;
      const { page, slug } = getRouteFromPath(pathname);
      
      setActivePage(page);

      if (slug) {
        const found = itemsRef.current.find(i => i.slug === slug || i.id === slug);
        if (found) {
          setSelectedItem(found);
        }
      }

      // Update document title and meta description
      const title = ROUTE_TITLES[page] || ROUTE_TITLES['fiyatlar'];
      document.title = title;

      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute('content', ROUTE_META_DESCRIPTIONS[page] || ROUTE_META_DESCRIPTIONS['fiyatlar']);
      }
    };

    handleLocationChange();
    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, [setSelectedItem]);

  // Keyboard shortcut ESC to close modals
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setAlertModalOpen(false);
        setSelectedItem(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setSelectedItem]);

  return (
    <div id="top" className="min-h-screen bg-[#080A0D] text-[#F4F1E8] flex flex-col antialiased selection:bg-[#C8A646]/20 selection:text-[#E2C76A] pb-14 md:pb-0">
      {/* 1. Header with Active Page Highlight & Clean Paths */}
      <Header 
        activePage={activePage}
        onOpenAlertModal={() => setAlertModalOpen(true)} 
      />

      {/* 2. Real-Time Ticker Ribbon with Fixed Height (Zero CLS) */}
      <LiveTickerMarquee />

      {/* 3. Ultra Engine Telemetry Bar (Zero CLS) */}
      <UltraEngineStatusBar />

      {/* 4. Page Breadcrumbs Navigation with Clean Semantic Links */}
      <Breadcrumbs 
        activePage={activePage}
        currentItem={selectedItem} 
        onReset={() => setSelectedItem(null)} 
      />

      {/* 5. Main Independent Page Routing Container */}
      <main className="flex-1">
        <Suspense 
          fallback={
            <div className="min-h-[500px] flex items-center justify-center">
              <div className="flex items-center gap-2 text-xs font-mono text-[#E2C76A]">
                <span className="w-2.5 h-2.5 rounded-full bg-[#C8A646] animate-ping" />
                <span>Sayfa Yükleniyor...</span>
              </div>
            </div>
          }
        >
          {activePage === 'fiyatlar' && (
            <HomePage 
              onOpenAlertModal={() => setAlertModalOpen(true)} 
            />
          )}

          {activePage === 'grafik' && (
            <ChartTerminalPage />
          )}

          {activePage === 'altin-turleri' && (
            <GoldTypesPage />
          )}

          {activePage === 'portfoy' && (
            <PortfolioPage />
          )}

          {activePage === 'hesaplama' && (
            <CalculatorPage />
          )}

          {activePage === 'bursada-altin' && (
            <BursadaAltinPage />
          )}

          {activePage === 'kuyumcular' && (
            <JewelersPage />
          )}

          {activePage === 'sss' && (
            <FaqPage />
          )}
        </Suspense>
      </main>

      {/* 6. Footer with Clean Semantic Paths */}
      <Footer />

      {/* 7. Mobile Bottom App Bar with Tab Switching */}
      <MobileBottomNav 
        activePage={activePage}
        onOpenAlertModal={() => setAlertModalOpen(true)} 
      />

      {/* 8. Code-Split Lazy Modals */}
      <Suspense fallback={null}>
        {selectedItem && <GoldDetailModal />}
        {alertModalOpen && (
          <PriceAlertModal
            isOpen={alertModalOpen}
            onClose={() => setAlertModalOpen(false)}
          />
        )}
        <CommandPalette />
      </Suspense>
    </div>
  );
};

export function App() {
  return (
    <ErrorBoundary>
      <GoldProvider>
        <MainContent />
      </GoldProvider>
    </ErrorBoundary>
  );
}

export default App;
