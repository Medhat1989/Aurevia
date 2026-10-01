import React, { useState } from 'react';
import { CONCIERGE_SERVICES, ConciergeService } from '../data/aureviaData';
import { Shield, Building2, Anchor, Home, Compass, Car, ArrowRight, Check, Clock, X } from 'lucide-react';

interface ConciergeSectionProps {
  onRequestService: (serviceType: string) => void;
}

export const ConciergeSection: React.FC<ConciergeSectionProps> = ({ onRequestService }) => {
  const [activeModalService, setActiveModalService] = useState<ConciergeService | null>(null);

  const getServiceIcon = (id: string) => {
    switch (id) {
      case 'security-detail':
        return <Shield className="w-5 h-5 text-[#B68A4E]" />;
      case 'luxury-hotels':
        return <Building2 className="w-5 h-5 text-[#B68A4E]" />;
      case 'yachts':
        return <Anchor className="w-5 h-5 text-[#B68A4E]" />;
      case 'villas':
        return <Home className="w-5 h-5 text-[#B68A4E]" />;
      case 'helicopters':
        return <Compass className="w-5 h-5 text-[#B68A4E]" />;
      case 'luxury-cars':
        return <Car className="w-5 h-5 text-[#B68A4E]" />;
      default:
        return <Shield className="w-5 h-5 text-[#B68A4E]" />;
    }
  };

  return (
    <section id="concierge" className="py-24 bg-[#12141C] relative border-b border-[#1E2436]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="flex items-center gap-3 text-xs tracking-[0.25em] text-[#D8B683] uppercase font-medium mb-3">
            <span className="w-8 h-[1px] bg-[#B68A4E]/60 inline-block" />
            <span>Lifestyle & Mobility Integration</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-[#F3F0E7] font-normal tracking-tight">
            An unbroken continuum of service.
          </h2>
          <p className="text-sm sm:text-base text-[#F3F0E7]/70 mt-3 font-light leading-relaxed">
            Private aviation is only the central axis. Aurevia orchestrates executive protection, maritime charters, 
            presidential hotel suites, private estates, and chauffeured mobility so your transit remains uninterrupted 
            from departure doorstep to final arrival.
          </p>
        </div>

        {/* 6 Concierge Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CONCIERGE_SERVICES.map((service) => (
            <div
              key={service.id}
              className="bg-[#1E2436]/40 hover:bg-[#1E2436]/70 border border-[#1E2436] hover:border-[#B68A4E]/40 rounded-xl p-6 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-[#1E2436]">
                  <div className="p-2.5 rounded bg-[#12141C] border border-[#1E2436]">
                    {getServiceIcon(service.id)}
                  </div>
                  <span className="text-[10px] uppercase tracking-wider text-[#F3F0E7]/50 font-mono flex items-center gap-1">
                    <Clock className="w-3 h-3 text-[#B68A4E]" />
                    {service.typicalLeadTime}
                  </span>
                </div>

                <h3 className="font-display text-xl text-[#F3F0E7] mt-4 group-hover:text-[#D8B683] transition-colors">
                  {service.name}
                </h3>

                <p className="text-xs text-[#F3F0E7]/70 mt-2 font-light leading-relaxed min-h-[44px]">
                  {service.shortDesc}
                </p>

                <div className="mt-4 pt-3 border-t border-[#1E2436]/60 space-y-1.5">
                  {service.capabilities.slice(0, 2).map((cap, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-[11px] text-[#F3F0E7]/80">
                      <Check className="w-3 h-3 text-[#B68A4E] shrink-0 mt-0.5" />
                      <span className="font-light line-clamp-1">{cap}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-[#1E2436] flex items-center justify-between gap-3 mt-4">
                <button
                  onClick={() => setActiveModalService(service)}
                  className="text-xs text-[#F3F0E7]/85 hover:text-[#D8B683] transition-colors cursor-pointer py-1.5 px-3.5 rounded-lg btn-glass-liquid shadow-sm"
                >
                  Full Brief
                </button>

                <button
                  onClick={() => onRequestService(service.serviceTypeKey)}
                  className="px-4 py-2 btn-glass-liquid-brass text-xs uppercase tracking-wider font-medium rounded-lg cursor-pointer inline-flex items-center gap-1.5 shadow-md"
                >
                  <span>Request Service</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Service Detail Modal */}
      {activeModalService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0A0A0A]/85 backdrop-blur-md">
          <div className="relative w-full max-w-xl bg-[#12141C] border border-[#B68A4E]/40 rounded-2xl p-6 sm:p-8 shadow-2xl">
            <button
              onClick={() => setActiveModalService(null)}
              className="absolute top-4 right-4 p-2 rounded-full btn-glass-liquid text-[#F3F0E7] cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-[#1E2436] rounded border border-[#B68A4E]/30">
                  {getServiceIcon(activeModalService.id)}
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-[0.25em] text-[#D8B683] font-medium block">
                    Concierge Specification
                  </span>
                  <h3 className="font-display text-2xl text-[#F3F0E7]">
                    {activeModalService.name}
                  </h3>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-[#F3F0E7]/80 leading-relaxed font-light">
                {activeModalService.fullDesc}
              </p>

              <div>
                <h4 className="text-xs uppercase tracking-wider text-[#D8B683] font-medium mb-3">
                  Scope of Capabilities & Logistics
                </h4>
                <div className="space-y-2">
                  {activeModalService.capabilities.map((cap, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs text-[#F3F0E7]/90 bg-[#1E2436]/40 p-2.5 rounded border border-[#1E2436]">
                      <Check className="w-3.5 h-3.5 text-[#B68A4E] shrink-0 mt-0.5" />
                      <span className="font-light">{cap}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-[#1E2436] flex items-center justify-between">
                <span className="text-xs text-[#F3F0E7]/60 font-mono">
                  Lead time: {activeModalService.typicalLeadTime}
                </span>

                <button
                  onClick={() => {
                    const key = activeModalService.serviceTypeKey;
                    setActiveModalService(null);
                    onRequestService(key);
                  }}
                  className="px-7 py-3 btn-glass-liquid-brass font-medium text-xs tracking-wider uppercase rounded-lg cursor-pointer shadow-lg"
                >
                  Configure Service Request
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
