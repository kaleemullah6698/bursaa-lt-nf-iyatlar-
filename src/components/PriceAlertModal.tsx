import React, { useState } from 'react';
import { useGold } from '../context/GoldContext';
import { formatTL } from '../data/goldData';
import { Bell, X, Trash2, CheckCircle, AlertTriangle } from 'lucide-react';

interface PriceAlertModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PriceAlertModal: React.FC<PriceAlertModalProps> = ({ isOpen, onClose }) => {
  const { items, alerts, addAlert, removeAlert } = useGold();

  const [selectedGoldId, setSelectedGoldId] = useState<string>('gram-altin');
  const [targetPrice, setTargetPrice] = useState<number>(3450);
  const [condition, setCondition] = useState<'above' | 'below'>('above');
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const selectableItems = items.filter(i => i.category !== 'ons_doviz');
  const currentGold = items.find(i => i.id === selectedGoldId) || selectableItems[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!targetPrice || targetPrice <= 0) return;

    addAlert(selectedGoldId, targetPrice, condition);
    setSuccessMsg(`${currentGold.name} için fiyat alarmı başarıyla kaydedildi.`);
    setTimeout(() => setSuccessMsg(null), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-lg bg-[#0E1217] border border-[#C9A227]/30 rounded-sm shadow-2xl p-6 sm:p-7"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-[rgba(244,241,232,0.08)]">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-[#C8A646]/10 rounded-xl text-[#C8A646]">
              <Bell className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-semibold text-[#F4F1E8]">
                Bursa Altın Fiyat Alarmı
              </h3>
              <p className="text-xs text-[#A5A8AE]">
                Hedeflediğiniz fiyata ulaşıldığında anında haberdar olun.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-[#9FA3AA] hover:text-[#F5F1E8] rounded-sm cursor-pointer"
            aria-label="Kapat"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          {successMsg && (
            <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs rounded-sm flex items-center gap-2">
              <CheckCircle className="w-4 h-4 shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-[#9FA3AA] uppercase tracking-wider mb-1.5">
              Altın Türü
            </label>
            <select
              value={selectedGoldId}
              onChange={(e) => {
                setSelectedGoldId(e.target.value);
                const g = items.find(i => i.id === e.target.value);
                if (g) setTargetPrice(Math.round(g.sellingPrice * 1.01));
              }}
              className="w-full bg-[#12161D] border border-white/10 focus:border-[#C9A227] text-xs text-[#F5F1E8] px-3.5 py-2.5 rounded-sm outline-none cursor-pointer"
            >
              {selectableItems.map(gold => (
                <option key={gold.id} value={gold.id}>
                  {gold.name} (Şu an: {formatTL(gold.sellingPrice)})
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-[#9FA3AA] uppercase tracking-wider mb-1.5">
                Koşul
              </label>
              <select
                value={condition}
                onChange={(e) => setCondition(e.target.value as 'above' | 'below')}
                className="w-full bg-[#12161D] border border-white/10 focus:border-[#C9A227] text-xs text-[#F5F1E8] px-3 py-2.5 rounded-sm outline-none cursor-pointer"
              >
                <option value="above">Fiyat Üzerine Çıkınca (≥)</option>
                <option value="below">Fiyat Altına İnince (≤)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#9FA3AA] uppercase tracking-wider mb-1.5">
                Hedef Fiyat (TL)
              </label>
              <input
                type="number"
                step="5"
                value={targetPrice}
                onChange={(e) => setTargetPrice(parseFloat(e.target.value) || 0)}
                className="w-full bg-[#12161D] border border-white/10 focus:border-[#C9A227] text-xs font-mono text-[#F5F1E8] px-3 py-2.5 rounded-sm outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 bg-[#C9A227] hover:bg-[#D8B133] text-black font-semibold text-xs rounded-sm transition-all cursor-pointer shadow-md shadow-[#C9A227]/10"
          >
            Alarmı Kaydet
          </button>
        </form>

        {/* Existing Alerts List */}
        <div className="mt-6 pt-5 border-t border-white/8">
          <h4 className="text-xs font-semibold text-[#9FA3AA] uppercase tracking-wider mb-3">
            Kayıtlı Fiyat Alarmlarınız ({alerts.length})
          </h4>

          {alerts.length === 0 ? (
            <p className="text-xs text-[#666C77] italic py-2">
              Henüz tanımlanmış bir fiyat alarmı bulunmuyor.
            </p>
          ) : (
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {alerts.map(a => {
                const g = items.find(i => i.id === a.goldId);
                return (
                  <div key={a.id} className="flex items-center justify-between p-2.5 bg-[#12161D] border border-white/5 rounded-xs text-xs">
                    <div>
                      <span className="text-[#F5F1E8] font-medium">{g?.name || a.goldId}</span>
                      <span className="text-[#9FA3AA] ml-1.5">
                        {a.condition === 'above' ? '≥' : '≤'} {formatTL(a.targetPrice)}
                      </span>
                    </div>
                    <button
                      onClick={() => removeAlert(a.id)}
                      className="text-[#666C77] hover:text-rose-400 p-1 cursor-pointer transition-colors"
                      title="Sil"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
