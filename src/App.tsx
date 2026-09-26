/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef, lazy, Suspense } from 'react';
import { GoldProvider, useGold } from './context/GoldContext';
import { ErrorBoundary } from './components/ErrorBoundary';
import { Header } from './components/Header';
import { LiveTickerMarquee } from './components/LiveTickerMarquee';
import { Breadcrumbs } from './components/Breadcrumbs';
import { Footer } from './components/Footer';
import { MobileBottomNav } from './components/MobileBottomNav';
import { 
  PageRoute, 
  ROUTE_TITLES, 
  ROUTE_META_DESCRIPTIONS, 
  getRouteFromPath, 
  sanitizeHashToPath, 
  PAGE_PATHS 
} from './utils/router';
import { updateDocumentSeo } from './utils/seo';
import { CITY_BY_ID } from './data/cities';

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
  const { items, selectedItem, setSelectedItem, activeCity, setActiveCityId } = useGold();

  const itemsRef = useRef(items);
  useEffect(() => {
    itemsRef.current = items;
  }, [items]);

  const activeCityRef = useRef(activeCity);
  useEffect(() => {
    activeCityRef.current = activeCity;
  }, [activeCity]);

  // Synchronize HTML5 Path-based Routing without hash & Dynamic City SEO
  useEffect(() => {
    // 1. Immediately upgrade any lingering hash (e.g. /#/altin-turleri) to clean path (/altin-turleri)
    sanitizeHashToPath();

    const handleLocationChange = () => {
      const pathname = window.location.pathname;
      const { page, cityId, slug, isCityHub } = getRouteFromPath(pathname);
      
      setActivePage(page);

      let effectiveCity = activeCityRef.current;
      if (cityId) {
        setActiveCityId(cityId);
        const matched = CITY_BY_ID[cityId];
        if (matched) {
          effectiveCity = matched;
        }
      }

      if (slug) {
        const found = itemsRef.current.find(i => i.slug === slug || i.id === slug);
        if (found) {
          setSelectedItem(found);
        }
      }

      // 2. Comprehensive Google SEO & Social Meta Synchronization
      if (page === 'fiyatlar') {
        const canonicalPath = isCityHub ? '/' : `/${effectiveCity.slug}`;
        updateDocumentSeo({
          title: effectiveCity.seoTitle,
          description: effectiveCity.seoDescription,
          keywords: effectiveCity.seoKeywords,
          canonicalPath,
          city: effectiveCity
        });
      } else {
        updateDocumentSeo({
          title: ROUTE_TITLES[page] || ROUTE_TITLES['fiyatlar'],
          description: ROUTE_META_DESCRIPTIONS[page] || ROUTE_META_DESCRIPTIONS['fiyatlar'],
          canonicalPath: PAGE_PATHS[page] || pathname,
          city: effectiveCity
        });
      }
    };

    handleLocationChange();
    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, [setSelectedItem, setActiveCityId]);

  // Re-run SEO update when activeCity changes within context
  useEffect(() => {
    if (activePage === 'fiyatlar') {
      const isHub = window.location.pathname === '/';
      updateDocumentSeo({
        title: activeCity.seoTitle,
        description: activeCity.seoDescription,
        keywords: activeCity.seoKeywords,
        canonicalPath: isHub ? '/' : `/${activeCity.slug}`,
        city: activeCity
      });
    }
  }, [activeCity, activePage]);

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

      {/* 3. Page Breadcrumbs Navigation for Subpages (Clean & Uncluttered) */}
      {(activePage !== 'fiyatlar' || selectedItem) && (
        <Breadcrumbs 
          activePage={activePage}
          currentItem={selectedItem} 
          onReset={() => setSelectedItem(null)} 
        />
      )}

      {/* 4. Main Independent Page Routing Container */}
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

      {/* 5. Footer with Clean Semantic Paths */}
      <Footer />

      {/* 6. Mobile Bottom App Bar with Tab Switching */}
      <MobileBottomNav 
        activePage={activePage}
        onOpenAlertModal={() => setAlertModalOpen(true)} 
      />

      {/* 7. Code-Split Lazy Modals */}
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
