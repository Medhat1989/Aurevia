import React, { useState } from 'react';
import { FAQ_DATA, FAQItem } from '../data/aureviaData';
import { ChevronDown, Search, HelpCircle } from 'lucide-react';

export const FAQSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [openIndices, setOpenIndices] = useState<number[]>([0, 1]);

  const categories = ['All', 'Charter', 'Operations', 'Membership', 'Safety'];

  const toggleAccordion = (idx: number) => {
    if (openIndices.includes(idx)) {
      setOpenIndices(openIndices.filter((i) => i !== idx));
    } else {
      setOpenIndices([...openIndices, idx]);
    }
  };

  const filteredFaqs = FAQ_DATA.filter((item) => {
    const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
    const matchesSearch =
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="faq" className="py-24 bg-[#12141C]/80 backdrop-blur-md relative border-b border-[#1E2436]/60">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto">
          <div className="scroll-reveal-subtle reveal-delay-75 inline-flex items-center gap-2 text-xs tracking-[0.25em] text-[#D8B683] uppercase font-medium mb-3">
            <span className="w-6 h-[1px] bg-[#B68A4E]/60 inline-block" />
            <span>Operational Inquiries</span>
            <span className="w-6 h-[1px] bg-[#B68A4E]/60 inline-block" />
          </div>
          <h2 className="scroll-reveal-header reveal-delay-150 font-display text-3xl sm:text-4xl text-[#F3F0E7] font-normal tracking-tight">
            Frequently Addressed Questions
          </h2>
          <p className="scroll-reveal reveal-delay-200 text-xs sm:text-sm text-[#F3F0E7]/70 mt-2 font-light">
            Clear standards, transparent commitments, and operational certainty.
          </p>
        </div>

        {/* Search and Category Control */}
        <div className="scroll-reveal reveal-delay-250 space-y-4">
          <div className="relative">
            <Search className="w-4 h-4 text-[#B68A4E] absolute left-3.5 top-3.5 pointer-events-none" />
            <input
              type="text"
              placeholder="Search policies, pets, booking lead times, safety..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#1E2436]/60 border border-[#1E2436] focus:border-[#B68A4E] rounded-xl py-3 pl-10 pr-4 text-xs text-[#F3F0E7] placeholder-[#F3F0E7]/40 outline-none"
            />
          </div>

          <div className="flex items-center justify-center gap-2 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 text-xs font-medium rounded-lg cursor-pointer uppercase tracking-wider transition-all ${
                  activeCategory === cat
                    ? 'btn-glass-liquid-brass text-[#F3F0E7] shadow-md font-medium'
                    : 'btn-glass-liquid text-[#F3F0E7]/70 hover:text-[#F3F0E7]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-3">
          {filteredFaqs.length === 0 ? (
            <div className="text-center py-12 text-xs text-[#F3F0E7]/50 font-light">
              No matching inquiries found. Please consult our 24/7 flight desk.
            </div>
          ) : (
            filteredFaqs.map((faq, idx) => {
              const isOpen = openIndices.includes(idx);
              return (
                <div
                  key={idx}
                  className={`scroll-reveal reveal-delay-${((idx % 4) + 1) * 75} bg-[#1E2436]/30 border border-[#1E2436] rounded-xl overflow-hidden transition-colors`}
                >
                  <button
                    onClick={() => toggleAccordion(idx)}
                    className="w-full text-left p-5 flex items-center justify-between gap-4 cursor-pointer focus:outline-none hover:bg-[#1E2436]/40 transition-colors"
                  >
                    <span className="font-display text-base sm:text-lg text-[#F3F0E7] font-medium">
                      {faq.question}
                    </span>
                    <span className={`p-2 rounded-full btn-glass-liquid text-[#D8B683] transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                      <ChevronDown className="w-4 h-4" />
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-[#F3F0E7]/75 font-light leading-relaxed border-t border-[#1E2436]/50">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
};
