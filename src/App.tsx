/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { GoldProvider, useGold } from './context/GoldContext';
import { ErrorBoundary } from './components/ErrorBoundary';
import { Header } from './components/Header';
import { LiveTickerMarquee } from './components/LiveTickerMarquee';
import { UltraEngineStatusBar } from './components/UltraEngineStatusBar';
import { Breadcrumbs } from './components/Breadcrumbs';
import { Hero } from './components/Hero';
import { AeoDirectAnswers } from './components/AeoDirectAnswers';
import { FinancialTerminalChart } from './components/FinancialTerminalChart';
import { ProFreeMarketTable } from './components/ProFreeMarketTable';
import { PriceCardsGrid } from './components/PriceCardsGrid';
import { BankSpreadComparison } from './components/BankSpreadComparison';
import { PortfolioTracker } from './components/PortfolioTracker';
import { MarketAnalysisVisuals } from './components/MarketAnalysisVisuals';
import { GoldCalculator } from './components/GoldCalculator';
import { ZakatWeddingCalculator } from './components/ZakatWeddingCalculator';
import { GoldTypesSection } from './components/GoldTypesSection';
import { BursaGeoHubs } from './components/BursaGeoHubs';
import { BursaContextSection } from './components/BursaContextSection';
import { FaqSection } from './components/FaqSection';
import { DataSourceSection } from './components/DataSourceSection';
import { Footer } from './components/Footer';
import { GoldDetailModal } from './components/GoldDetailModal';
import { PriceAlertModal } from './components/PriceAlertModal';
import { MobileBottomNav } from './components/MobileBottomNav';
import { CommandPalette } from './components/CommandPalette';

const MainContent: React.FC = () => {
  const [alertModalOpen, setAlertModalOpen] = useState(false);
  const { items, selectedItem, setSelectedItem } = useGold();

  const itemsRef = useRef(items);
  useEffect(() => {
    itemsRef.current = items;
  }, [items]);

  // Robust URL Hash Navigation (Only responds to actual user hash changes, never in a tick loop)
  useEffect(() => {
    const handleHash = () => {
      try {
        const rawHash = window.location.hash || '';
        const cleanHash = rawHash.replace(/^#\/?/, '').trim();
        if (!cleanHash) return;

        // Check if hash matches a gold instrument slug
        const currentItems = itemsRef.current;
        const matched = currentItems.find(i => i.slug === cleanHash || i.id === cleanHash);
        if (matched) {
          setSelectedItem(matched);
          document.title = `Bursa ${matched.name} Fiyatı Canlı | Kapalı Çarşı Alış Satış Kurları 2026`;
        }
      } catch {
        // Fallback
      }
    };

    // Run once on initial load
    handleHash();

    // Listen only to actual browser hash events
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, [setSelectedItem]);

  // Sync title when modal opens or closes
  useEffect(() => {
    try {
      if (selectedItem) {
        window.history.replaceState(null, '', `#/${selectedItem.slug}`);
        document.title = `Bursa ${selectedItem.name} Fiyatı Canlı | Kapalı Çarşı Kurları 2026`;
      } else {
        const curHash = window.location.hash;
        if (curHash.startsWith('#/gram-') || curHash.startsWith('#/ceyrek-') || curHash.startsWith('#/22-') || curHash.startsWith('#/cumhuriyet-') || curHash.startsWith('#/yarim-')) {
          window.history.replaceState(null, '', window.location.pathname + window.location.search);
          document.title = 'Bursa Altın Fiyatları Canlı | Kapalı Çarşı Anlık Alış Satış Kurları 2026';
        }
      }
    } catch {
      // Fallback
    }
  }, [selectedItem]);

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
      {/* Sticky Header with glowing brand & live status */}
      <Header onOpenAlertModal={() => setAlertModalOpen(true)} />

      {/* Live Ticker Ribbon Streaming Pro Max Data */}
      <LiveTickerMarquee />

      {/* Ultra Fast Pro Max Engine Telemetry Bar (FPS, Latency, Turbo 0.8s mode, Cmd+K) */}
      <UltraEngineStatusBar />

      {/* SEO Breadcrumbs Navigation */}
      <Breadcrumbs currentItem={selectedItem} onReset={() => setSelectedItem(null)} />

      {/* Main Content Flow */}
      <main className="flex-1">
        {/* Hero Section with H1 "Bursa Altın Fiyatları", Lede, Meta stats */}
        <Hero onOpenAlertModal={() => setAlertModalOpen(true)} />

        {/* AEO First: Direct Answers Snippets for AI Overviews & Search Engines */}
        <AeoDirectAnswers />

        {/* Financial Terminal Candlestick Chart with OHLC & Indicators */}
        <FinancialTerminalChart />

        {/* Bursa Free Market Gold Prices Table (Exact Match for Uploaded Screenshot) */}
        <ProFreeMarketTable />

        {/* 4 Flagship Price Cards Grid (Gram, Çeyrek, Yarım, Tam) with live sparklines */}
        <PriceCardsGrid />

        {/* Bank Spread Arbitrage & Savings Matrix */}
        <BankSpreadComparison />

        {/* Million Dollar SaaS Portfolio & Profit/Loss Tracker */}
        <PortfolioTracker />

        {/* Market Analysis Visuals (Piyasa Özeti 4 cards + Makas Grafiği + Ayar Rehberi) */}
        <MarketAnalysisVisuals />

        {/* Interactive Bursa Gold Calculator & Converter */}
        <GoldCalculator />

        {/* Zakat & Wedding Jewelry Planner */}
        <ZakatWeddingCalculator />

        {/* Altın Türleri (8 cards with pure gold weights) */}
        <GoldTypesSection />

        {/* GEO First: Bursa District & Jeweler Hubs Directory (Osmangazi, Nilüfer, Yıldırım, İnegöl) */}
        <BursaGeoHubs />

        {/* Bursa Yerel Bağlam (Online vs Kuyumcu) & Full SEO Article */}
        <BursaContextSection />

        {/* Sıkça Sorulan Sorular (7 FAQ Items with Accordion & Schema.org) */}
        <FaqSection />

        {/* Veri Kaynağı, Güncelleme & Hesaplama Formülü */}
        <DataSourceSection />
      </main>

      {/* Footer with CTA Banner, Links & Financial Disclaimer */}
      <Footer />

      {/* Highly Responsive Mobile Bottom Navigation */}
      <MobileBottomNav onOpenAlertModal={() => setAlertModalOpen(true)} />

      {/* Deep Dive Modal for Individual Gold Pages */}
      <GoldDetailModal />

      {/* Price Alert Modal */}
      <PriceAlertModal
        isOpen={alertModalOpen}
        onClose={() => setAlertModalOpen(false)}
      />

      {/* Ultra-Fast Spotlight Command Palette (Cmd+K / Ctrl+K) */}
      <CommandPalette />
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
