import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useGold } from '../context/GoldContext';
import { Search, Sparkles, ArrowRight, X, TrendingUp, TrendingDown, Calculator, Briefcase, BarChart2 } from 'lucide-react';
import { formatTL } from '../data/goldData';

export const CommandPalette: React.FC = () => {
  const { 
    commandPaletteOpen, 
    setCommandPaletteOpen, 
    items, 
    setSelectedItem, 
    openCalculatorWithGold 
  } = useGold();

  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (commandPaletteOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [commandPaletteOpen]);

  // Fast search
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items.slice(0, 8);
    return items.filter(i => 
      i.name.toLowerCase().includes(q) ||
      (i.symbolCode && i.symbolCode.toLowerCase().includes(q)) ||
      (i.subtitle && i.subtitle.toLowerCase().includes(q))
    );
  }, [items, query]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev + 1) % Math.max(1, filtered.length));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev - 1 + filtered.length) % Math.max(1, filtered.length));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const target = filtered[selectedIndex];
      if (target) {
        setSelectedItem(target);
        setCommandPaletteOpen(false);
      }
    } else if (e.key === 'Escape') {
      e.preventDefault();
      setCommandPaletteOpen(false);
    }
  };

  if (!commandPaletteOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-start justify-center pt-16 sm:pt-24 p-4 animate-in fade-in duration-100"
      onClick={() => setCommandPaletteOpen(false)}
    >
      <div 
        className="w-full max-w-xl bg-[#101318] border border-[rgba(244,241,232,0.15)] rounded-2xl shadow-2xl overflow-hidden text-white"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDown}
      >
        {/* Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-[rgba(244,241,232,0.08)] bg-[#0C0F14]">
          <Search className="w-5 h-5 text-[#C8A646] mr-3 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Altın türü ara... (Örn: Çeyrek, Gram, 22 Ayar, Ons)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent text-sm text-white placeholder-zinc-500 focus:outline-none"
          />
          <kbd className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-mono text-zinc-400 bg-[#14181E] border border-[rgba(244,241,232,0.1)] rounded">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div className="max-h-[380px] overflow-y-auto p-2 divide-y divide-[rgba(244,241,232,0.04)] scrollbar-none font-sans">
          {filtered.length === 0 ? (
            <div className="p-8 text-center text-xs text-[#A5A8AE]">
              "{query}" ile eşleşen altın enstrümanı bulunamadı.
            </div>
          ) : (
            filtered.map((item, idx) => {
              const isUp = item.changeRate >= 0;
              const isSelected = idx === selectedIndex;

              return (
                <div
                  key={item.id}
                  onClick={() => {
                    setSelectedItem(item);
                    setCommandPaletteOpen(false);
                  }}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-colors ${
                    isSelected ? 'bg-[#1C232E] text-[#E2C76A]' : 'hover:bg-[#14181E] text-[#F4F1E8]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-full bg-[#14181E] border border-zinc-700 flex items-center justify-center text-xs font-mono font-bold text-[#E2C76A]">
                      {item.symbolCode ? item.symbolCode.slice(0, 2) : 'AU'}
                    </div>
                    <div>
                      <div className="text-sm font-semibold flex items-center gap-2">
                        <span>{item.name}</span>
                        {item.symbolCode && (
                          <span className="text-[10px] font-mono text-[#A5A8AE] px-1.5 py-0.5 bg-black/40 rounded">
                            {item.symbolCode}
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-[#A5A8AE]">
                        Alış: {formatTL(item.buyingPrice)} · Satış: {formatTL(item.sellingPrice)}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 font-mono text-xs">
                    <span className={`inline-flex items-center gap-0.5 font-semibold ${isUp ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {isUp ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                      {item.changeRate > 0 ? '+' : ''}{item.changeRate.toFixed(2)}%
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-zinc-500" />
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer info */}
        <div className="bg-[#0A0D12] px-4 py-2.5 border-t border-[rgba(244,241,232,0.06)] flex items-center justify-between text-[11px] text-[#A5A8AE] font-mono">
          <div className="flex items-center gap-3">
            <span>↑↓ ile Gezin</span>
            <span>↵ Seç</span>
            <span>ESC Çık</span>
          </div>
          <span className="text-[#C8A646]">ULTRA FAST PRO MAX ENGINE</span>
        </div>
      </div>
    </div>
  );
};
