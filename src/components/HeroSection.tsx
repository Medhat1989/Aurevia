import React, { useState } from 'react';
import heroJetSunset from '../assets/images/hero_sunset_gulfstream_1790877788736.jpg';
import { QuickQuoteEstimator } from './QuickQuoteEstimator';
import { BRAND } from '../data/aureviaData';
import { ArrowRight, Globe, Shield, Clock, Sparkles } from 'lucide-react';

interface HeroSectionProps {
  onRequestQuote: () => void;
  onViewFleet: () => void;
  onConfigureCharter: (details: {
    origin: string;
    destination: string;
    date: string;
    passengers: number;
    recommendedClass: string;
  }) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onRequestQuote,
  onViewFleet,
  onConfigureCharter
}) => {
  const [currentSloganIdx, setCurrentSloganIdx] = useState(0);

  const sloganOptions = [
    BRAND.primarySlogan,
    ...BRAND.secondarySlogans.slice(0, 4)
  ];

  return (
    <section id="home" className="relative min-h-screen pt-28 pb-16 flex flex-col justify-between overflow-hidden">
      {/* Background Photography with Measured Scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroJetSunset}
          alt="Aurevia executive private jet parked on tarmac during sunset"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center scale-100 animate-fade-in"
        />
        {/* Measured dark luxury gradient overlay (60-30-10 color discipline) */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#12141C] via-[#12141C]/80 to-[#12141C]/50" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#12141C]/40 to-[#12141C]/90" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-8 sm:pt-16">
        <div className="max-w-3xl space-y-6">
          {/* Eyebrow */}
          <div className="scroll-reveal-subtle reveal-delay-100 flex items-center gap-3 text-xs tracking-[0.28em] text-[#D8B683] uppercase font-medium">
            <span className="w-8 h-[1px] bg-[#B68A4E] inline-block" />
            <span>Private charter, without compromise</span>
          </div>

          {/* Primary Headline with text-wrap: balance */}
          <div className="scroll-reveal-header reveal-delay-150 space-y-2">
            <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl text-[#F3F0E7] font-normal tracking-tight leading-[1.08] [text-wrap:balance]">
              {sloganOptions[currentSloganIdx]}
            </h1>

            {/* Campaign Slogan Switcher (Quiet interactive control) */}
            <div className="pt-1 flex items-center gap-2 text-xs text-[#F3F0E7]/60">
              <span className="text-[10px] uppercase tracking-wider text-[#D8B683]">Mantra:</span>
              <div className="flex items-center gap-1.5 flex-wrap">
                {sloganOptions.map((s, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentSloganIdx(idx)}
                    className={`text-[11px] px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                      currentSloganIdx === idx
                        ? 'text-[#F3F0E7] btn-glass-liquid-brass font-medium'
                        : 'text-[#F3F0E7]/60 hover:text-[#F3F0E7] btn-glass-liquid'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Subhead */}
          <p className="scroll-reveal reveal-delay-200 text-sm sm:text-base lg:text-lg text-[#F3F0E7]/80 font-light leading-relaxed max-w-2xl">
            Aurevia arranges private flights for people who measure time in minutes, not hours. 
            One call, and the aircraft, crew, and route are already moving.
          </p>

          {/* Primary & Secondary CTAs */}
          <div className="scroll-reveal reveal-delay-250 pt-2 flex flex-wrap items-center gap-4">
            <button
              onClick={onRequestQuote}
              className="px-7 py-3.5 btn-glass-liquid-brass font-medium text-xs tracking-wider uppercase rounded-lg cursor-pointer inline-flex items-center gap-2 shadow-lg"
            >
              <span>Request a Quote</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onViewFleet}
              className="px-7 py-3.5 btn-glass-liquid text-[#F3F0E7] font-medium text-xs tracking-wider uppercase rounded-lg cursor-pointer"
            >
              View the Fleet
            </button>
          </div>

          {/* Side Note Quote */}
          <div className="scroll-reveal reveal-delay-300 pt-4 flex items-center gap-3 text-xs text-[#F3F0E7]/60 font-light max-w-xl border-l border-[#B68A4E]/50 pl-4 py-1">
            <Globe className="w-4 h-4 text-[#B68A4E] shrink-0" />
            <span>
              Based in Malta, flying six continents. Every itinerary built from scratch, confirmed within the hour.
            </span>
          </div>
        </div>

        {/* Quick Quote Estimator Integration */}
        <div className="scroll-reveal reveal-delay-350 mt-14 max-w-5xl">
          <QuickQuoteEstimator onConfigureCharter={onConfigureCharter} />
        </div>
      </div>

      {/* Trust & Guarantee Indicators */}
      <div className="scroll-reveal reveal-delay-400 relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-12 pt-6 border-t border-[#F3F0E7]/10 flex flex-wrap items-center justify-between text-xs text-[#F3F0E7]/60 gap-4">
        <div className="flex items-center gap-2">
          <Clock className="w-3.5 h-3.5 text-[#B68A4E]" />
          <span>Average Quote Turnaround: 38 Minutes</span>
        </div>
        <div className="flex items-center gap-2">
          <Shield className="w-3.5 h-3.5 text-[#B68A4E]" />
          <span>Part 135 / European AOC Vetted Operators</span>
        </div>
        <div className="flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-[#B68A4E]" />
          <span>Zero Repositioning Markups for Members</span>
        </div>
      </div>
    </section>
  );
};
