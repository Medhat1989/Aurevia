import React, { useState, useEffect } from 'react';
import { GLOBAL_HUBS, BRAND } from '../data/aureviaData';
import { Clock, ShieldCheck, MapPin, Award } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const [hubTimes, setHubTimes] = useState<{ [city: string]: string }>({});

  useEffect(() => {
    const updateTimes = () => {
      const times: { [city: string]: string } = {};
      GLOBAL_HUBS.forEach((hub) => {
        try {
          times[hub.city] = new Intl.DateTimeFormat('en-GB', {
            timeZone: hub.timeZone,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
          }).format(new Date());
        } catch {
          times[hub.city] = '--:--:--';
        }
      });
      setHubTimes(times);
    };

    updateTimes();
    const interval = setInterval(updateTimes, 1000);
    return () => clearInterval(interval);
  }, []);

  const leadership = [
    {
      name: 'Henri de Vaud',
      role: 'Co-Founder & Head of Flight Operations',
      background: '28 years in international aeronautical dispatch and high-altitude operations. Former senior director at European private aviation registry.',
      station: 'Malta HQ · Flight Ops'
    },
    {
      name: 'Marc Vance',
      role: 'Managing Partner',
      background: 'Architect of Aurevia’s sovereign client program and the Jubilee black card register. Specializes in diplomatic protocol and multi-jurisdictional logistics.',
      station: 'Malta Desk · Sovereign Services'
    },
    {
      name: 'Elena Rossi',
      role: 'Director of Concierge & Maritime Logistics',
      background: 'Oversees global lifestyle integration, chartered superyacht contracts across the Mediterranean, and discreet estate acquisitions.',
      station: 'Malta Desk · Maritime & Concierge'
    }
  ];

  return (
    <section id="about" className="py-24 bg-[#12141C]/80 backdrop-blur-md relative border-b border-[#1E2436]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="scroll-reveal-subtle reveal-delay-75 flex items-center gap-3 text-xs tracking-[0.25em] text-[#D8B683] uppercase font-medium mb-3">
            <span className="w-8 h-[1px] bg-[#B68A4E]/60 inline-block" />
            <span>The Organization</span>
          </div>
          <h2 className="scroll-reveal-header reveal-delay-150 font-display text-3xl sm:text-4xl lg:text-5xl text-[#F3F0E7] font-normal tracking-tight">
            Precision, restraint, and an absolute respect for time.
          </h2>
          <p className="scroll-reveal reveal-delay-200 text-sm sm:text-base text-[#F3F0E7]/70 mt-3 font-light leading-relaxed">
            Founded in Malta in 2014, Aurevia was conceived to liberate principals from the structural friction 
            of standard commercial and broker models. We do not sell flight hours as a commodity; we engineer certainty.
          </p>
        </div>

        {/* Maltese Operations Headquarters with Timezone Clock */}
        <div className="space-y-6">
          <div className="scroll-reveal-header flex items-center justify-between pb-3 border-b border-[#1E2436]">
            <div>
              <span className="scroll-reveal-subtle text-[10px] uppercase tracking-[0.25em] text-[#D8B683] font-medium block">
                Continuous Global Dispatch
              </span>
              <h3 className="font-display text-2xl text-[#F3F0E7]">
                Maltese Operations Headquarters
              </h3>
            </div>
            <div className="flex items-center gap-2 text-xs text-emerald-400 font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse inline-block" />
              <span>Operations Desk Active (24/7/365)</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Main Maltese Headquarters Card */}
            <div className="lg:col-span-8 p-6 sm:p-8 bg-[#1E2436]/40 border border-[#1E2436] rounded-xl space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-lg bg-[#B68A4E]/10 border border-[#B68A4E]/30 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-[#B68A4E]" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-display text-2xl text-[#F3F0E7] font-medium">
                        Valletta
                      </span>
                      <span className="text-[11px] uppercase tracking-wider text-[#D8B683] px-2.5 py-0.5 rounded-full bg-[#12141C] border border-[#1E2436]">
                        Republic of Malta (EU)
                      </span>
                    </div>
                    <span className="text-xs text-[#F3F0E7]/60 block font-light mt-0.5">
                      Sole Corporate Headquarters & 24/7 Worldwide Flight Operations Desk
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center justify-between py-3 px-4 bg-[#12141C] rounded-lg border border-[#1E2436]">
                  <span className="text-[10px] uppercase tracking-wider text-[#F3F0E7]/50 flex items-center gap-1.5 font-sans">
                    <Clock className="w-3.5 h-3.5 text-[#B68A4E]" />
                    Station Time (CET)
                  </span>
                  <span className="font-mono text-base font-semibold text-[#F3F0E7] tracking-wider">
                    {hubTimes['Valletta'] || '--:--:--'}
                  </span>
                </div>

                <div className="flex items-center justify-between py-3 px-4 bg-[#12141C] rounded-lg border border-[#1E2436]">
                  <span className="text-[10px] uppercase tracking-wider text-[#F3F0E7]/50 flex items-center gap-1.5 font-sans">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    Data & Aircraft Privacy
                  </span>
                  <span className="font-mono text-xs text-emerald-400 font-medium">
                    Maltese Civil Aviation Authority
                  </span>
                </div>
              </div>

              <div className="pt-4 border-t border-[#1E2436] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-[#F3F0E7]/70">
                <p className="font-light">
                  <strong className="text-[#F3F0E7] font-medium">Physical Address:</strong> Republic Street 58, Valletta VLT 1115, Malta
                </p>
                <span className="text-[#D8B683] font-mono text-[11px]">Direct Line: +356 7730 2834</span>
              </div>
            </div>

            {/* Centralized Focus Card */}
            <div className="lg:col-span-4 p-6 sm:p-8 bg-[#1E2436]/25 border border-[#1E2436] rounded-xl flex flex-col justify-between space-y-4">
              <div>
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#D8B683] font-medium block mb-2">
                  Operational Architecture
                </span>
                <h4 className="font-display text-xl text-[#F3F0E7]">
                  Single-Desk Discipline
                </h4>
                <p className="text-xs text-[#F3F0E7]/70 font-light mt-2.5 leading-relaxed">
                  By centralizing flight planning, diplomatic slot management, and provider vetting exclusively through our Maltese office, we eliminate the re-brokering handoffs and delays common to multi-city brokerages.
                </p>
              </div>

              <div className="pt-4 border-t border-[#1E2436] flex items-center gap-2 text-xs text-emerald-400 font-mono">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Duty Dispatchers Active 24/7/365</span>
              </div>
            </div>
          </div>
        </div>

        {/* Founding Brief & Philosophy */}
        <div className="scroll-reveal grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#1E2436]/30 border border-[#1E2436] rounded-2xl p-8 lg:p-12">
          <div className="lg:col-span-5 space-y-4">
            <span className="scroll-reveal-subtle text-[10px] uppercase tracking-[0.25em] text-[#D8B683] font-medium block">
              The Founding Brief · Malta, 2014
            </span>
            <blockquote className="scroll-reveal-header reveal-delay-100 font-display text-2xl sm:text-3xl text-[#F3F0E7] italic font-light leading-snug">
              “{BRAND.foundingQuote}”
            </blockquote>
          </div>

          <div className="scroll-reveal reveal-delay-150 lg:col-span-7 space-y-4 text-xs sm:text-sm text-[#F3F0E7]/80 font-light leading-relaxed border-t lg:border-t-0 lg:border-l border-[#1E2436] pt-6 lg:pt-0 lg:pl-8">
            <p>
              In 2014, private aviation had grown bloated with layers of re-brokering, hidden repositioning fees, 
              and impersonal call centers. Aurevia was founded on a contrarian premise: return private flight to 
              what it was always meant to be—an effortless extension of a principal’s daily schedule.
            </p>
            <p>
              Rather than operating a fleet, we have a network of providers and vetted air carriers worldwide. 
              Whether you require a light jet at Malta at dawn or an ultra-long-range flagship out of Singapore at midnight, 
              our flight directors move with singular purpose.
            </p>
          </div>
        </div>

        {/* Leadership Bios */}
        <div className="space-y-8">
          <div>
            <span className="scroll-reveal-subtle text-[10px] uppercase tracking-[0.25em] text-[#D8B683] font-medium block">
              Senior Leadership
            </span>
            <h3 className="scroll-reveal-header reveal-delay-100 font-display text-2xl sm:text-3xl text-[#F3F0E7] mt-1">
              Flight Directors & Principals
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {leadership.map((leader, i) => (
              <div
                key={i}
                className={`scroll-reveal reveal-delay-${(i + 1) * 100} p-6 rounded-xl bg-[#1E2436]/40 border border-[#1E2436] space-y-3`}
              >
                <div className="flex items-center justify-between pb-3 border-b border-[#1E2436]">
                  <span className="text-xs uppercase tracking-wider text-[#D8B683] font-medium">
                    {leader.station}
                  </span>
                  <Award className="w-4 h-4 text-[#B68A4E]" />
                </div>
                <h4 className="font-display text-xl text-[#F3F0E7] font-medium">
                  {leader.name}
                </h4>
                <p className="text-xs text-[#B68A4E] font-medium">
                  {leader.role}
                </p>
                <p className="text-xs text-[#F3F0E7]/70 font-light leading-relaxed pt-1">
                  {leader.background}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
