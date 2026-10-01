import React from 'react';
import { X, Users, Compass, Gauge, Luggage, Wifi, Shield, ArrowRight } from 'lucide-react';
import { Aircraft } from '../data/aureviaData';

interface AircraftDetailModalProps {
  aircraft: Aircraft | null;
  onClose: () => void;
  onCharter: (aircraftName: string) => void;
}

export const AircraftDetailModal: React.FC<AircraftDetailModalProps> = ({
  aircraft,
  onClose,
  onCharter
}) => {
  if (!aircraft) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-[#0A0A0A]/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-3xl bg-[#12141C] border border-[#B68A4E]/40 rounded-2xl overflow-hidden shadow-2xl">
        {/* Header Image with Scrim */}
        <div className="relative h-64 sm:h-80 w-full overflow-hidden">
          <img
            src={aircraft.image}
            alt={aircraft.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#12141C] via-[#12141C]/40 to-transparent" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2.5 rounded-full btn-glass-liquid text-[#F3F0E7] cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Title overlay */}
          <div className="absolute bottom-5 left-6 right-6">
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#D8B683] font-medium block">
              {aircraft.category} Fleet Detail
            </span>
            <h3 className="font-display text-2xl sm:text-3xl text-[#F3F0E7] mt-0.5">
              {aircraft.name}
            </h3>
            <p className="text-xs sm:text-sm text-[#F3F0E7]/80 mt-1 max-w-xl font-light">
              {aircraft.tagline}
            </p>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Key Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-4 border-y border-[#1E2436]">
            <div className="p-3 bg-[#1E2436]/40 rounded border border-[#1E2436]">
              <span className="text-[10px] uppercase tracking-wider text-[#F3F0E7]/60 block">Passengers</span>
              <div className="flex items-center gap-1.5 mt-1">
                <Users className="w-4 h-4 text-[#B68A4E]" />
                <span className="font-display text-lg text-[#F3F0E7] font-semibold">{aircraft.passengers} Max</span>
              </div>
            </div>

            <div className="p-3 bg-[#1E2436]/40 rounded border border-[#1E2436]">
              <span className="text-[10px] uppercase tracking-wider text-[#F3F0E7]/60 block">Nautical Range</span>
              <div className="flex items-center gap-1.5 mt-1">
                <Compass className="w-4 h-4 text-[#B68A4E]" />
                <span className="font-display text-lg text-[#F3F0E7] font-semibold">{aircraft.rangeNm.toLocaleString()} NM</span>
              </div>
            </div>

            <div className="p-3 bg-[#1E2436]/40 rounded border border-[#1E2436]">
              <span className="text-[10px] uppercase tracking-wider text-[#F3F0E7]/60 block">Cruise Speed</span>
              <div className="flex items-center gap-1.5 mt-1">
                <Gauge className="w-4 h-4 text-[#B68A4E]" />
                <span className="font-display text-lg text-[#F3F0E7] font-semibold">{aircraft.cruiseSpeedKts} KTAS</span>
              </div>
            </div>

            <div className="p-3 bg-[#1E2436]/40 rounded border border-[#1E2436]">
              <span className="text-[10px] uppercase tracking-wider text-[#F3F0E7]/60 block">Baggage Volume</span>
              <div className="flex items-center gap-1.5 mt-1">
                <Luggage className="w-4 h-4 text-[#B68A4E]" />
                <span className="font-display text-lg text-[#F3F0E7] font-semibold">{aircraft.baggageCuFt} cu ft</span>
              </div>
            </div>
          </div>

          {/* Description & Engineering Highlights */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-wider text-[#D8B683] font-medium">
              Cabin Architecture & Operational Profile
            </h4>
            <p className="text-xs sm:text-sm text-[#F3F0E7]/80 leading-relaxed font-light">
              {aircraft.description}
            </p>
          </div>

          {/* Technical Specs Breakdown */}
          <div>
            <h4 className="text-xs uppercase tracking-wider text-[#D8B683] font-medium mb-3">
              Performance & Cabin Invariants
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {aircraft.specs.map((s, idx) => (
                <div key={idx} className="flex justify-between py-1.5 px-3 bg-[#1E2436]/20 rounded border border-[#1E2436]/60">
                  <span className="text-[#F3F0E7]/60">{s.label}</span>
                  <span className="text-[#F3F0E7] font-medium text-right">{s.value}</span>
                </div>
              ))}
              <div className="flex justify-between py-1.5 px-3 bg-[#1E2436]/20 rounded border border-[#1E2436]/60">
                <span className="text-[#F3F0E7]/60">Cabin Ceiling</span>
                <span className="text-[#F3F0E7] font-medium">{aircraft.cabinHeightFt}</span>
              </div>
              <div className="flex justify-between py-1.5 px-3 bg-[#1E2436]/20 rounded border border-[#1E2436]/60">
                <span className="text-[#F3F0E7]/60">Connectivity</span>
                <span className="text-[#F3F0E7] font-medium flex items-center gap-1">
                  <Wifi className="w-3 h-3 text-[#B68A4E]" />
                  {aircraft.wifi}
                </span>
              </div>
            </div>
          </div>

          {/* Typical Routes */}
          <div>
            <h4 className="text-xs uppercase tracking-wider text-[#D8B683] font-medium mb-2">
              Verified Nonstop City Pairs
            </h4>
            <div className="flex flex-wrap gap-2">
              {aircraft.typicalRoutes.map((route, i) => (
                <span
                  key={i}
                  className="text-xs py-1 px-3 bg-[#1E2436] text-[#F3F0E7]/90 rounded border border-[#B68A4E]/20"
                >
                  {route}
                </span>
              ))}
            </div>
          </div>

          {/* Action Row */}
          <div className="pt-4 border-t border-[#1E2436] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs text-[#F3F0E7]/60">
              <Shield className="w-4 h-4 text-[#B68A4E]" />
              <span>Audited under ARGUS Platinum & Wyvern Wingman standards</span>
            </div>

            <button
              onClick={() => {
                onClose();
                onCharter(aircraft.name);
              }}
              className="w-full sm:w-auto px-7 py-3.5 btn-glass-liquid-brass font-medium text-xs tracking-wider uppercase rounded-lg cursor-pointer inline-flex items-center justify-center gap-2 shadow-lg"
            >
              <span>Charter This Aircraft</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
