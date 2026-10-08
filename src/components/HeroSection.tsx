import React, { useState } from 'react';
import heroAircraft from '../assets/images/hero_aircraft_clean_1791495340081.jpg';
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
      {/* Background Image: Clean Luxury Private Jet */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src={heroAircraft}
          alt="Aurevia Luxury Private Jet"
          className="w-full h-full object-cover object-center scale-105 filter brightness-[0.85] contrast-[1.05] transition-transform duration-1000 ease-out"
        />

        {/* Measured dark luxury gradient overlay preserving text legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#12141C] via-[#12141C]/50 to-[#12141C]/30" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#12141C]/30 to-[#12141C]/70" />
        {/* Soft liquid brass ambient radiance accentuating the private jet */}
        <div className="absolute top-0 right-0 w-2/3 h-2/3 bg-gradient-to-b from-[#B68A4E]/10 via-[#B68A4E]/5 to-transparent blur-3xl pointer-events-none" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-8 sm:pt-14">
        <div className="max-w-3xl space-y-7">
          {/* Company Name in Cove Sans Font Typography with Hover Effect */}
          <div className="scroll-reveal-header reveal-delay-120 pt-1">
            <div 
              className="group relative inline-block cursor-pointer select-none transition-all duration-500"
              title="Aurevia Aviation — Hover to illuminate"
            >
              {/* Radial backdrop bloom on hover */}
              <div 
                className="absolute -inset-x-8 -inset-y-4 bg-gradient-to-r from-[#B68A4E]/0 via-[#B68A4E]/25 to-[#B68A4E]/0 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" 
              />

              <div className="relative flex items-center gap-3 sm:gap-4 flex-wrap">
                {/* Cove Sans Font Typography with Interactive Hover Kerning & Micro-Elevations */}
                <span className="font-cove font-medium tracking-[0.12em] sm:tracking-[0.18em] text-4xl sm:text-6xl lg:text-7xl uppercase text-[#F3F0E7] transition-all duration-700 ease-out group-hover:tracking-[0.16em] sm:group-hover:tracking-[0.22em] group-hover:text-white drop-shadow-md group-hover:drop-shadow-[0_0_35px_rgba(216,182,131,0.6)] flex items-center">
                  {'AUREVIA'.split('').map((char, i) => (
                    <span 
                      key={i} 
                      className="inline-block transition-transform duration-300 ease-out group-hover:-translate-y-1 hover:!text-[#D8B683]"
                      style={{ transitionDelay: `${i * 25}ms` }}
                    >
                      {char}
                    </span>
                  ))}
                </span>

                {/* Modern Aviation Designation Badge */}
                <div className="flex items-center gap-2 border-l border-[#B68A4E]/50 pl-3 sm:pl-4 transition-all duration-300 group-hover:border-[#D8B683]">
                  <span className="font-mono text-xs sm:text-sm tracking-[0.35em] text-[#D8B683] uppercase font-medium group-hover:text-[#F3F0E7]">
                    Aviation
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 group-hover:scale-125 transition-transform" title="Valletta Desk Active" />
                </div>
              </div>

              {/* Modern Shimmer Bar on Open & Hover */}
              <div className="relative mt-2 h-[2px] w-full overflow-hidden bg-gradient-to-r from-[#1E2436]/0 via-[#1E2436] to-[#1E2436]/0">
                <div className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-[#D8B683] to-transparent opacity-40 group-hover:opacity-100 transition-opacity duration-300 animate-shimmer-sweep" />
              </div>
            </div>
          </div>

          {/* Primary Slogan Headline: "Connect you to what matters" */}
          <div className="scroll-reveal-header reveal-delay-150 space-y-3">
            <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl text-[#F3F0E7] font-normal tracking-tight leading-[1.12] [text-wrap:balance]">
              {sloganOptions[currentSloganIdx]}
            </h1>

            {/* Campaign Slogan Switcher (Quiet interactive control) */}
            <div className="pt-1 flex items-center gap-2 text-xs text-[#F3F0E7]/60">
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
              View Aircraft Network
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
        <div className="flex items-center gap-2 text-[#D8B683]/80">
          <span className="w-1.5 h-1.5 rounded-full bg-[#B68A4E] inline-block" />
          <span className="font-mono text-[11px] tracking-wider uppercase">Kinetic Sky · Scroll to Navigate</span>
        </div>
      </div>
    </section>
  );
};
