import React from 'react';
import { ArrowRight, Plane, Clock, ShieldCheck, Compass, Sparkles, HeartPulse, BookOpen } from 'lucide-react';
import conciergeYacht from '../assets/images/concierge_yacht_helicopter_1790872712698.jpg';
import specialMissionsImg from '../assets/images/special_missions_clean_1791495372402.jpg';
import { BRAND, INITIAL_JOURNAL_ARTICLES } from '../data/aureviaData';

interface HomeIntroSectionProps {
  onNavigate: (sectionId: string) => void;
  onRequestQuote: (serviceType?: string) => void;
}

export const HomeIntroSection: React.FC<HomeIntroSectionProps> = ({
  onNavigate,
  onRequestQuote
}) => {
  const steps = [
    {
      num: '01',
      title: 'Tell us the trip',
      desc: 'Departure, destination, and timing, sent by call, encrypted message, or direct quote desk. No rigid schedules or fixed hubs.'
    },
    {
      num: '02',
      title: 'We source the aircraft',
      desc: 'Our dispatch team checks live availability across 3,500+ vetted operators globally, returning tailored options within the hour.'
    },
    {
      num: '03',
      title: 'You fly',
      desc: 'Ground transport, customs pre-clearance, and bespoke onboard dining are orchestrated in advance. You arrive directly steps from the stairs.'
    }
  ];

  return (
    <div className="text-[#F3F0E7]">
      {/* Positioning Section */}
      <section className="py-24 border-b border-[#1E2436]/60 bg-[#12141C]/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 space-y-4">
              <div className="scroll-reveal-subtle reveal-delay-75 flex items-center gap-3 text-xs tracking-[0.25em] text-[#D8B683] uppercase font-medium">
                <span className="w-8 h-[1px] bg-[#B68A4E]/60 inline-block" />
                <span>The Aurevia Paradigm</span>
              </div>
              <h2 className="scroll-reveal-header reveal-delay-150 font-display text-3xl sm:text-4xl lg:text-5xl text-[#F3F0E7] font-normal tracking-tight leading-tight">
                Aviation built around your calendar, not an airline’s.
              </h2>
            </div>

            <div className="lg:col-span-7 space-y-6 text-sm sm:text-base text-[#F3F0E7]/80 font-light leading-relaxed">
              <p className="scroll-reveal reveal-delay-200">
                Commercial travel asks you to plan around it. Aurevia works the other way — we find the aircraft, 
                the slot, and the route that fit the day you already have. We have an extensive network of accredited 
                providers across the globe, so you are never limited to one operator or one home base.
              </p>
              <p className="scroll-reveal reveal-delay-250">
                Whether connecting Malta to Singapore overnight or positioning an air ambulance into an austere 
                field, every detail is engineered with quiet competence. No queues, no commercial terminals, and no compromise.
              </p>
            </div>
          </div>

          {/* 3 Steps: How It Works */}
          <div className="mt-20 pt-16 border-t border-[#1E2436]">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <span className="scroll-reveal-subtle text-[10px] uppercase tracking-[0.25em] text-[#D8B683] font-medium block">
                The Execution Workflow
              </span>
              <h3 className="scroll-reveal-header reveal-delay-100 font-display text-2xl sm:text-3xl text-[#F3F0E7] mt-1">
                How It Works
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {steps.map((step, idx) => (
                <div
                  key={idx}
                  className={`scroll-reveal reveal-delay-${(idx + 1) * 100} p-8 rounded-xl bg-[#1E2436]/40 border border-[#1E2436] space-y-4 relative group hover:border-[#B68A4E]/40 transition-colors`}
                >
                  <div className="font-mono text-3xl font-light text-[#B68A4E]/60 group-hover:text-[#D8B683] transition-colors">
                    {step.num}.
                  </div>
                  <h4 className="font-display text-xl text-[#F3F0E7]">
                    {step.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-[#F3F0E7]/70 font-light leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services Preview Teaser */}
      <section className="py-20 border-b border-[#1E2436]/60 bg-[#171A24]/70 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="scroll-reveal-subtle text-[10px] uppercase tracking-[0.25em] text-[#D8B683] font-medium block">
                Beyond the Runway
              </span>
              <h3 className="scroll-reveal-header reveal-delay-100 font-display text-3xl text-[#F3F0E7] mt-1">
                Concierge & Special Missions
              </h3>
            </div>
            <p className="scroll-reveal reveal-delay-150 text-xs text-[#F3F0E7]/60 max-w-md font-light">
              From close protection to intensive-care aeromedical evacuation and chartered superyachts.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Concierge Teaser Card */}
            <div
              onClick={() => onNavigate('concierge')}
              className="scroll-reveal reveal-delay-150 group cursor-pointer rounded-2xl overflow-hidden border border-[#1E2436] hover:border-[#B68A4E]/40 bg-[#1E2436]/30 transition-all duration-300"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={conciergeYacht}
                  alt="Aurevia luxury concierge, yachts, and helicopters"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#12141C] via-[#12141C]/50 to-transparent" />
                <div className="absolute top-4 left-4 text-[10px] uppercase tracking-wider text-[#D8B683] bg-[#12141C]/80 px-2.5 py-1 rounded border border-[#B68A4E]/30 font-medium">
                  Lifestyle Integration
                </div>
              </div>
              <div className="p-6 space-y-2">
                <h4 className="font-display text-2xl text-[#F3F0E7] group-hover:text-[#D8B683] transition-colors">
                  Concierge Services
                </h4>
                <p className="text-xs text-[#F3F0E7]/70 font-light leading-relaxed">
                  Armored security details, partner palace hotels, Mediterranean superyacht charters, private estates, and twin-engine helicopter transfers.
                </p>
                <div className="pt-2 text-xs text-[#B68A4E] font-medium inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  <span>Explore Concierge Portfolio</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>

            {/* Special Missions Teaser Card */}
            <div
              onClick={() => onNavigate('missions')}
              className="scroll-reveal reveal-delay-250 group cursor-pointer rounded-2xl overflow-hidden border border-[#1E2436] hover:border-rose-500/40 bg-[#1E2436]/30 transition-all duration-300"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={specialMissionsImg}
                  alt="Aurevia Special Missions, Medevac, and Government Flights"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#12141C] via-[#12141C]/50 to-transparent" />
                <div className="absolute top-4 left-4 text-[10px] uppercase tracking-wider text-rose-300 bg-[#12141C]/80 px-2.5 py-1 rounded border border-rose-500/30 font-medium">
                  High Readiness
                </div>
              </div>
              <div className="p-6 space-y-2">
                <h4 className="font-display text-2xl text-[#F3F0E7] group-hover:text-rose-300 transition-colors">
                  Special Missions & Medevac
                </h4>
                <p className="text-xs text-[#F3F0E7]/70 font-light leading-relaxed">
                  ICU-equipped aeromedical evacuation with 60-minute launch readiness, NGO crisis transport into constrained airfields, and sovereign diplomatic flights.
                </p>
                <div className="pt-2 text-xs text-rose-400 font-medium inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  <span>View Special Missions</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Membership Teaser Highlighting Jubilee */}
      <section className="py-20 border-b border-[#1E2436]/60 bg-[#0E1017]/75 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="scroll-reveal p-8 sm:p-12 rounded-2xl bg-gradient-to-br from-[#1E2436]/60 to-[#12141C] border border-[#B68A4E]/30 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="space-y-3 max-w-2xl">
              <span className="scroll-reveal-subtle text-[10px] uppercase tracking-[0.25em] text-[#D8B683] font-medium block">
                The Sovereign Tier
              </span>
              <h3 className="scroll-reveal-header reveal-delay-100 font-display text-3xl sm:text-4xl text-[#F3F0E7]">
                Aurevia Jubilee. By Invitation Only.
              </h3>
              <p className="scroll-reveal reveal-delay-150 text-xs sm:text-sm text-[#F3F0E7]/75 font-light leading-relaxed">
                Guaranteed aircraft availability with zero advance notice. Unlimited global lifestyle management, 
                confidential manifest handling, and private invitations to sovereign events.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0">
              <button
                onClick={() => onNavigate('membership')}
                className="px-7 py-3.5 btn-glass-liquid-brass text-[#F3F0E7] font-medium text-xs tracking-wider uppercase rounded-lg cursor-pointer shadow-xl inline-flex items-center gap-2"
              >
                <span>Explore Membership Tiers</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Quote / Principle Band */}
      <section className="py-20 bg-[#12141C]/75 backdrop-blur-md border-b border-[#1E2436]/60 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <span className="scroll-reveal-subtle text-[10px] uppercase tracking-[0.25em] text-[#D8B683] font-medium block">
            Guiding Principle
          </span>
          <blockquote className="scroll-reveal-header reveal-delay-100 font-display text-2xl sm:text-4xl text-[#F3F0E7] italic font-light max-w-3xl mx-auto leading-relaxed">
            “{BRAND.foundingQuote}”
          </blockquote>
          <p className="scroll-reveal-subtle reveal-delay-200 text-xs uppercase tracking-widest text-[#F3F0E7]/50 pt-2 font-mono">
            Aurevia Founding Brief · Malta, 2014
          </p>
        </div>
      </section>

      {/* Journal Teaser */}
      <section className="py-20 border-b border-[#1E2436]/60 bg-[#12141C]/75 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="flex items-center justify-between">
            <div>
              <span className="scroll-reveal-subtle text-[10px] uppercase tracking-[0.25em] text-[#D8B683] font-medium block">
                Editorial
              </span>
              <h3 className="scroll-reveal-header reveal-delay-100 font-display text-2xl sm:text-3xl text-[#F3F0E7] mt-1">
                From The Journal
              </h3>
            </div>
            <button
              onClick={() => onNavigate('journal')}
              className="px-4 py-2 btn-glass-liquid text-[#D8B683] hover:text-[#F3F0E7] uppercase tracking-wider font-medium text-xs rounded-lg inline-flex items-center gap-1.5 cursor-pointer shadow-sm"
            >
              <span>View All Essays</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {INITIAL_JOURNAL_ARTICLES.slice(0, 3).map((article, idx) => (
              <div
                key={article.id}
                onClick={() => onNavigate('journal')}
                className={`scroll-reveal reveal-delay-${(idx + 1) * 100} group cursor-pointer space-y-3`}
              >
                <div className="relative h-48 w-full overflow-hidden rounded-lg bg-[#0A0A0A]">
                  <img
                    src={article.featuredImage}
                    alt={article.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                <div className="flex items-center gap-2 text-[11px] text-[#D8B683] font-medium">
                  <span>{article.category}</span>
                  <span className="text-[#F3F0E7]/30">·</span>
                  <span className="text-[#F3F0E7]/60">{article.date}</span>
                </div>

                <h4 className="font-display text-lg text-[#F3F0E7] group-hover:text-[#D8B683] transition-colors leading-snug">
                  {article.title}
                </h4>

                <p className="text-xs text-[#F3F0E7]/70 font-light line-clamp-2">
                  {article.excerpt}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
