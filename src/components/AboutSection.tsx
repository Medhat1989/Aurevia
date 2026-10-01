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
      background: '28 years in international aeronautical dispatch and high-altitude operations. Former senior director at Swiss private aviation registry.',
      station: 'Geneva HQ'
    },
    {
      name: 'Marc Vance',
      role: 'Managing Partner',
      background: 'Architect of Aurevia’s sovereign client program and the Jubilee black card register. Specializes in diplomatic protocol and multi-jurisdictional logistics.',
      station: 'Dubai & Geneva'
    },
    {
      name: 'Elena Rossi',
      role: 'Director of Concierge & Maritime Logistics',
      background: 'Oversees global lifestyle integration, chartered superyacht contracts across the Mediterranean, and discreet estate acquisitions.',
      station: 'Monaco & New York'
    }
  ];

  return (
    <section id="about" className="py-24 bg-[#12141C] relative border-b border-[#1E2436]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="flex items-center gap-3 text-xs tracking-[0.25em] text-[#D8B683] uppercase font-medium mb-3">
            <span className="w-8 h-[1px] bg-[#B68A4E]/60 inline-block" />
            <span>The Organization</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-[#F3F0E7] font-normal tracking-tight">
            Precision, restraint, and an absolute respect for time.
          </h2>
          <p className="text-sm sm:text-base text-[#F3F0E7]/70 mt-3 font-light leading-relaxed">
            Founded in Geneva in 2014, Aurevia was conceived to liberate principals from the structural friction 
            of standard commercial and broker models. We do not sell flight hours as a commodity; we engineer certainty.
          </p>
        </div>

        {/* Multi-Region Live Operations Hubs with Timezone Clocks */}
        <div className="space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-[#1E2436]">
            <div>
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#D8B683] font-medium block">
                Continuous Global Dispatch
              </span>
              <h3 className="font-display text-2xl text-[#F3F0E7]">
                Operational Desks
              </h3>
            </div>
            <div className="flex items-center gap-2 text-xs text-emerald-400 font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse inline-block" />
              <span>All Desks Active (24/7/365)</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {GLOBAL_HUBS.map((hub) => (
              <div
                key={hub.city}
                className="p-6 bg-[#1E2436]/40 border border-[#1E2436] rounded-xl space-y-4"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[#B68A4E]" />
                    <span className="font-display text-xl text-[#F3F0E7] font-medium">
                      {hub.city}
                    </span>
                  </div>
                  <span className="text-[10px] uppercase tracking-wider text-[#D8B683]">
                    {hub.country}
                  </span>
                </div>

                <div className="flex items-center justify-between py-3 px-3.5 bg-[#12141C] rounded border border-[#1E2436]">
                  <span className="text-[10px] uppercase tracking-wider text-[#F3F0E7]/50 flex items-center gap-1.5 font-sans">
                    <Clock className="w-3.5 h-3.5 text-[#B68A4E]" />
                    Local Station Time
                  </span>
                  <span className="font-mono text-base font-semibold text-[#F3F0E7] tracking-wider">
                    {hubTimes[hub.city] || '--:--:--'}
                  </span>
                </div>

                <div className="space-y-1 text-xs text-[#F3F0E7]/60">
                  <p className="font-medium text-[#F3F0E7]/80">{hub.role}</p>
                  <p className="font-light">{hub.address}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Founding Brief & Philosophy */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#1E2436]/30 border border-[#1E2436] rounded-2xl p-8 lg:p-12">
          <div className="lg:col-span-5 space-y-4">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#D8B683] font-medium block">
              The Founding Brief · Geneva, 2014
            </span>
            <blockquote className="font-display text-2xl sm:text-3xl text-[#F3F0E7] italic font-light leading-snug">
              “{BRAND.foundingQuote}”
            </blockquote>
          </div>

          <div className="lg:col-span-7 space-y-4 text-xs sm:text-sm text-[#F3F0E7]/80 font-light leading-relaxed border-t lg:border-t-0 lg:border-l border-[#1E2436] pt-6 lg:pt-0 lg:pl-8">
            <p>
              In 2014, private aviation had grown bloated with layers of re-brokering, hidden repositioning fees, 
              and impersonal call centers. Aurevia was founded on a contrarian premise: return private flight to 
              what it was always meant to be—an effortless extension of a principal’s daily schedule.
            </p>
            <p>
              Rather than maintaining a rigid localized fleet that restricts client routes, we created an independent 
              sovereign flight desk integrated with the world’s most rigorously audited Part 135 and AOC operators. 
              Whether you require a light jet at Geneva at dawn or an ultra-long-range flagship out of Singapore at midnight, 
              our flight directors move with singular purpose.
            </p>
          </div>
        </div>

        {/* Leadership Bios */}
        <div className="space-y-8">
          <div>
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#D8B683] font-medium block">
              Senior Leadership
            </span>
            <h3 className="font-display text-2xl sm:text-3xl text-[#F3F0E7] mt-1">
              Flight Directors & Principals
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {leadership.map((leader, i) => (
              <div
                key={i}
                className="p-6 rounded-xl bg-[#1E2436]/40 border border-[#1E2436] space-y-3"
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
