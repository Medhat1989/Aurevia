import React from 'react';
import { SPECIAL_MISSIONS, ACCREDITATIONS, BRAND } from '../data/aureviaData';
import { ShieldAlert, HeartPulse, Building, CheckCircle2, PhoneCall, ArrowRight, ShieldCheck } from 'lucide-react';

interface SpecialMissionsSectionProps {
  onRequestMission: (missionType: string) => void;
}

export const SpecialMissionsSection: React.FC<SpecialMissionsSectionProps> = ({ onRequestMission }) => {
  const getMissionIcon = (id: string) => {
    switch (id) {
      case 'ngo-relief':
        return <Building className="w-5 h-5 text-[#B68A4E]" />;
      case 'medevac':
        return <HeartPulse className="w-5 h-5 text-rose-400" />;
      case 'government-official':
        return <ShieldAlert className="w-5 h-5 text-[#B68A4E]" />;
      default:
        return <ShieldCheck className="w-5 h-5 text-[#B68A4E]" />;
    }
  };

  return (
    <section id="missions" className="py-24 bg-[#0A0A0D] relative border-b border-[#1E2436]">
      {/* Subtle top subtle border glow to delineate serious tone */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <div className="scroll-reveal-subtle reveal-delay-75 flex items-center gap-3 text-xs tracking-[0.25em] text-[#D8B683] uppercase font-medium mb-3">
              <span className="w-8 h-[1px] bg-[#B68A4E]/60 inline-block" />
              <span>Special Operations & Aeromedical</span>
            </div>
            <h2 className="scroll-reveal-header reveal-delay-150 font-display text-3xl sm:text-4xl lg:text-5xl text-[#F3F0E7] font-normal tracking-tight">
              Special Missions. When every minute carries consequence.
            </h2>
            <p className="scroll-reveal reveal-delay-200 text-sm sm:text-base text-[#F3F0E7]/70 mt-3 font-light leading-relaxed">
              Operating outside the commercial sphere. Aurevia coordinates humanitarian airlift, intensive care 
              aeromedical evacuations, and sovereign government delegations under strict compliance and rapid-launch protocols.
            </p>
          </div>

          {/* Urgent Medevac Direct Hotline Banner */}
          <div className="scroll-reveal reveal-delay-250 p-4 sm:p-5 rounded-xl bg-gradient-to-r from-[#1E2436] to-[#12141C] border border-rose-500/30 flex items-center justify-between gap-4 max-w-md w-full">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-full bg-rose-500/20 text-rose-400 border border-rose-500/30 animate-pulse">
                <HeartPulse className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-wider text-rose-300 font-medium block">
                  Critical Care Medevac Desk
                </span>
                <span className="font-mono text-sm sm:text-base text-[#F3F0E7] font-semibold">
                  {BRAND.phoneDisplay}
                </span>
              </div>
            </div>
            <a
              href={`tel:${BRAND.phone}`}
              className="px-4 py-2 btn-glass-liquid-rose text-white text-xs uppercase tracking-wider font-medium rounded-lg inline-flex items-center gap-1.5 whitespace-nowrap shadow-lg"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>24/7 SOS</span>
            </a>
          </div>
        </div>

        {/* 3 Special Mission Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {SPECIAL_MISSIONS.map((mission, idx) => (
            <div
              key={mission.id}
              className={`scroll-reveal reveal-delay-${(idx + 1) * 100} bg-[#12141C] border rounded-xl p-7 flex flex-col justify-between transition-all duration-300 ${
                mission.id === 'medevac'
                  ? 'border-rose-500/40 shadow-lg shadow-rose-950/20'
                  : 'border-[#1E2436] hover:border-[#B68A4E]/40'
              }`}
            >
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-[#1E2436]">
                  <div className="p-2.5 rounded bg-[#1E2436] border border-[#1E2436]">
                    {getMissionIcon(mission.id)}
                  </div>
                  <span className="text-[10px] uppercase tracking-wider text-[#D8B683] font-mono">
                    {mission.responseWindow}
                  </span>
                </div>

                <span className="text-[10px] uppercase tracking-widest text-[#F3F0E7]/50 mt-4 block">
                  {mission.category}
                </span>

                <h3 className="font-display text-xl text-[#F3F0E7] mt-1 font-medium">
                  {mission.title}
                </h3>

                <p className="text-xs text-[#F3F0E7]/70 mt-2.5 font-light leading-relaxed">
                  {mission.description}
                </p>

                <div className="mt-6 space-y-2">
                  <span className="text-[10px] uppercase tracking-wider text-[#B68A4E] font-medium block">
                    Operational Protocols:
                  </span>
                  {mission.keyProtocols.map((protocol, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-[#F3F0E7]/80">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#B68A4E] shrink-0 mt-0.5" />
                      <span className="font-light">{protocol}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-8 border-t border-[#1E2436] mt-6">
                <button
                  onClick={() => onRequestMission(mission.serviceTypeKey)}
                  className={`w-full py-3 text-xs uppercase tracking-wider font-medium rounded-lg cursor-pointer flex items-center justify-center gap-2 shadow-md ${
                    mission.id === 'medevac'
                      ? 'btn-glass-liquid-rose'
                      : 'btn-glass-liquid-brass'
                  }`}
                >
                  <span>Dispatch Priority Inquiry</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Vetting Credentials & Compliance Strip */}
        <div className="p-8 rounded-2xl bg-[#12141C] border border-[#1E2436] space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#1E2436]">
            <div>
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#D8B683] font-medium block">
                Verification & Oversight Framework
              </span>
              <h4 className="font-display text-2xl text-[#F3F0E7] mt-0.5">
                Accreditations & Compliance Architecture
              </h4>
            </div>
            <p className="text-xs text-[#F3F0E7]/60 max-w-sm font-light">
              We operate exclusively through accredited international flight operators meeting unyielding audit benchmarks.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {ACCREDITATIONS.map((acc, idx) => (
              <div key={idx} className="space-y-1.5 p-3 rounded bg-[#1E2436]/30 border border-[#1E2436]/60">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#B68A4E]" />
                  <span className="text-xs font-semibold text-[#F3F0E7]">{acc.code}</span>
                </div>
                <p className="text-[11px] text-[#F3F0E7]/60 font-light leading-relaxed">
                  {acc.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
