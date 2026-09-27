import React, { useState } from 'react';
import { useGold } from '../context/GoldContext';
import { HelpCircle, ChevronDown } from 'lucide-react';

export const CityFaqSection: React.FC = () => {
  const { activeCity } = useGold();
  const [openIdx, setOpenIdx] = useState<number | null>(0); // First open by default

  const toggle = (idx: number) => {
    setOpenIdx(prev => (prev === idx ? null : idx));
  };

  if (!activeCity.faqs || activeCity.faqs.length === 0) return null;

  return (
    <section className="py-12 bg-[#080A0D] border-t border-[rgba(244,241,232,0.06)]" aria-labelledby="cityFaqTitle">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="max-w-3xl mb-8">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-[#E2C76A] uppercase tracking-wider mb-2">
            <HelpCircle className="w-3.5 h-3.5 text-[#C8A646]" />
            <span>Sıkça Sorulan Sorular (SSS)</span>
          </div>
          <h2 id="cityFaqTitle" className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
            {activeCity.name} Altın Piyasası Hakkında Merak Edilenler
          </h2>
          <p className="text-sm text-[#A5A8AE] mt-2">
            {activeCity.name} serbest piyasası, {activeCity.marketName} uygulamaları ve fiziki altın alımına dair temel sorular.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-3 max-w-4xl" itemScope itemType="https://schema.org/FAQPage">
          {activeCity.faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                itemScope
                itemProp="mainEntity"
                itemType="https://schema.org/Question"
                className="bg-[#10141C] border border-[rgba(244,241,232,0.08)] rounded-xl overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  id={`faq-btn-${idx}`}
                  onClick={() => toggle(idx)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#C8A646]"
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${idx}`}
                >
                  <span itemProp="name" className="text-sm sm:text-base font-serif font-bold text-white">
                    {faq.question}
                  </span>
                  <ChevronDown
                    aria-hidden="true"
                    className={`w-4 h-4 text-[#C8A646] shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div
                    id={`faq-answer-${idx}`}
                    role="region"
                    aria-labelledby={`faq-btn-${idx}`}
                    itemScope
                    itemProp="acceptedAnswer"
                    itemType="https://schema.org/Answer"
                    className="px-4 pb-4 sm:px-5 sm:pb-5 pt-0 text-xs sm:text-sm text-zinc-300 leading-relaxed border-t border-[rgba(244,241,232,0.04)]"
                  >
                    <p itemProp="text" className="pt-3">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
