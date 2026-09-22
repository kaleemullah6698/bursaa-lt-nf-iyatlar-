import React from 'react';
import { useGold } from '../context/GoldContext';
import { Zap, Activity, Cpu, Gauge, Search, Sparkles } from 'lucide-react';

export const UltraEngineStatusBar: React.FC = () => {
  const { telemetry, isTurbo, toggleTurbo, setCommandPaletteOpen } = useGold();

  return (
    <div className="bg-[#0C0F14] border-b border-[rgba(244,241,232,0.06)] py-1.5 px-4 text-[11px] font-mono select-none overflow-x-auto scrollbar-none">
      <div className="max-w-[1240px] mx-auto flex items-center justify-between gap-4">
        {/* Left Telemetry Cluster */}
        <div className="flex items-center gap-4 text-[#A5A8AE] whitespace-nowrap">
          {/* Turbo Toggle */}
          <button
            onClick={toggleTurbo}
            className={`px-2.5 py-0.5 rounded-md flex items-center gap-1.5 transition-all font-bold ${
              isTurbo
                ? 'bg-amber-500/20 text-[#E2C76A] border border-amber-500/40 shadow-[0_0_10px_rgba(234,179,8,0.2)]'
                : 'bg-[#14181E] text-[#A5A8AE] hover:text-white border border-[rgba(244,241,232,0.08)]'
            }`}
            title="Ultra Hızlı 0.8s Veri Akışını Aç / Kapat"
          >
            <Zap className={`w-3 h-3 ${isTurbo ? 'text-amber-400 fill-amber-400 animate-pulse' : ''}`} />
            <span>TURBO PRO MAX: {isTurbo ? '0.8s AKTİF' : 'STANDART (2.5s)'}</span>
          </button>

          {/* FPS Monitor */}
          <div className="flex items-center gap-1.5 text-zinc-300">
            <Gauge className="w-3 h-3 text-emerald-400" />
            <span>{telemetry.fps} FPS</span>
            <span className="text-[10px] text-emerald-400 font-semibold">(60/120Hz)</span>
          </div>

          {/* Event Loop Latency */}
          <div className="hidden sm:flex items-center gap-1.5 text-zinc-300">
            <Activity className="w-3 h-3 text-cyan-400" />
            <span>Gecikme: {telemetry.latencyMs}ms</span>
          </div>

          {/* Engine Memory */}
          <div className="hidden md:flex items-center gap-1.5 text-zinc-300">
            <Cpu className="w-3 h-3 text-purple-400" />
            <span>Bellek: {telemetry.memoryUsageMB} MB (Zero-Leak)</span>
          </div>
        </div>

        {/* Right Quick Action: Command Palette trigger */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setCommandPaletteOpen(true)}
            className="flex items-center gap-2 px-2.5 py-1 bg-[#14181E] hover:bg-[#1E2530] text-[#A5A8AE] hover:text-[#E2C76A] rounded-lg border border-[rgba(244,241,232,0.08)] transition-colors"
          >
            <Search className="w-3 h-3 text-[#C8A646]" />
            <span className="hidden sm:inline font-sans text-xs">Hızlı Arama</span>
            <kbd className="px-1.5 py-0.2 rounded bg-black/40 text-[10px] text-zinc-400 border border-zinc-700">
              ⌘K
            </kbd>
          </button>
        </div>
      </div>
    </div>
  );
};
