import React, { useState } from 'react';
import { Plane, Calendar, Users, ArrowRight, Clock, ShieldCheck, MapPin } from 'lucide-react';

interface QuickQuoteEstimatorProps {
  onConfigureCharter: (details: {
    origin: string;
    destination: string;
    date: string;
    passengers: number;
    recommendedClass: string;
  }) => void;
}

const PRESET_ROUTES = [
  { from: 'Malta Luqa (LMML)', to: 'Nice Côte d’Azur (LFMN)', distNm: 620, time: '1h 35m', rec: 'Light Jet' },
  { from: 'Malta Luqa (LMML)', to: 'Dubai Al Maktoum (DWC)', distNm: 2210, time: '4h 50m', rec: 'Midsize Jet' },
  { from: 'London Luton (EGGW)', to: 'Zurich Kloten (LSZH)', distNm: 460, time: '1h 15m', rec: 'Light Jet' },
  { from: 'Paris Le Bourget (LFPB)', to: 'New York Teterboro (KTEB)', distNm: 3150, time: '7h 45m', rec: 'Heavy Jet' },
  { from: 'Geneva (LSGG)', to: 'Courchevel Altiport (LFLJ)', distNm: 60, time: '30 min', rec: 'Executive Helicopter' },
  { from: 'New York (KTEB)', to: 'Miami Opa-locka (KOPF)', distNm: 950, time: '2h 35m', rec: 'Midsize Jet' }
];

export const QuickQuoteEstimator: React.FC<QuickQuoteEstimatorProps> = ({ onConfigureCharter }) => {
  const [selectedRouteIdx, setSelectedRouteIdx] = useState(0);
  const [customOrigin, setCustomOrigin] = useState('');
  const [customDestination, setCustomDestination] = useState('');
  const [date, setDate] = useState('2026-10-15');
  const [passengers, setPassengers] = useState(4);
  const [isCustom, setIsCustom] = useState(false);

  const activeRoute = PRESET_ROUTES[selectedRouteIdx];

  const handlePresetSelect = (idx: number) => {
    setSelectedRouteIdx(idx);
    setIsCustom(false);
  };

  const handleProceed = () => {
    const origin = isCustom ? customOrigin || 'Malta Luqa (LMML)' : activeRoute.from;
    const destination = isCustom ? customDestination || 'Nice (LFMN)' : activeRoute.to;
    const recommendedClass = isCustom ? (passengers > 8 ? 'Heavy Jet' : passengers > 5 ? 'Midsize Jet' : 'Light Jet') : activeRoute.rec;

    onConfigureCharter({
      origin,
      destination,
      date,
      passengers,
      recommendedClass
    });
  };

  return (
    <div className="w-full bg-[#1E2436]/70 backdrop-blur-xl border border-[#B68A4E]/25 rounded-2xl p-5 sm:p-7 shadow-2xl">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-[#F3F0E7]/10">
        <div>
          <span className="text-[11px] uppercase tracking-[0.2em] text-[#D8B683] font-medium block">
            Instant Route & Flight Calculator
          </span>
          <h4 className="font-display text-lg text-[#F3F0E7] mt-0.5">
            Configure Your Itinerary
          </h4>
        </div>

        {/* Quick Route Buttons */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          {PRESET_ROUTES.slice(0, 4).map((r, i) => (
            <button
              key={i}
              type="button"
              onClick={() => handlePresetSelect(i)}
              className={`text-[11px] px-3.5 py-1.5 rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                !isCustom && selectedRouteIdx === i
                  ? 'btn-glass-liquid-brass text-[#F3F0E7] font-medium'
                  : 'btn-glass-liquid text-[#F3F0E7]/70 hover:text-[#F3F0E7]'
              }`}
            >
              {r.from.split(' ')[0]} → {r.to.split(' ')[0]}
            </button>
          ))}
          <button
            type="button"
            onClick={() => setIsCustom(true)}
            className={`text-[11px] px-3.5 py-1.5 rounded-lg transition-all whitespace-nowrap cursor-pointer ${
              isCustom
                ? 'btn-glass-liquid-brass text-[#F3F0E7] font-medium'
                : 'btn-glass-liquid text-[#F3F0E7]/70 hover:text-[#F3F0E7]'
            }`}
          >
            Custom Route
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-5 items-end">
        {/* Origin */}
        <div>
          <label className="block text-[10px] uppercase tracking-wider text-[#F3F0E7]/60 mb-1.5 font-medium">
            Departure Airport
          </label>
          {isCustom ? (
            <div className="relative">
              <MapPin className="w-4 h-4 text-[#B68A4E] absolute left-3 top-3 pointer-events-none" />
              <input
                type="text"
                placeholder="e.g. Zurich (LSZH)"
                value={customOrigin}
                onChange={(e) => setCustomOrigin(e.target.value)}
                className="w-full bg-[#12141C] border border-[#1E2436] focus:border-[#B68A4E] rounded py-2.5 pl-9 pr-3 text-xs text-[#F3F0E7] placeholder-[#F3F0E7]/30 outline-none"
              />
            </div>
          ) : (
            <div className="w-full bg-[#12141C] border border-[#1E2436] rounded py-2.5 px-3 text-xs text-[#F3F0E7] font-medium flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-[#B68A4E] shrink-0" />
              <span className="truncate">{activeRoute.from}</span>
            </div>
          )}
        </div>

        {/* Destination */}
        <div>
          <label className="block text-[10px] uppercase tracking-wider text-[#F3F0E7]/60 mb-1.5 font-medium">
            Arrival Airport
          </label>
          {isCustom ? (
            <div className="relative">
              <MapPin className="w-4 h-4 text-[#B68A4E] absolute left-3 top-3 pointer-events-none" />
              <input
                type="text"
                placeholder="e.g. London Farnborough (EGLF)"
                value={customDestination}
                onChange={(e) => setCustomDestination(e.target.value)}
                className="w-full bg-[#12141C] border border-[#1E2436] focus:border-[#B68A4E] rounded py-2.5 pl-9 pr-3 text-xs text-[#F3F0E7] placeholder-[#F3F0E7]/30 outline-none"
              />
            </div>
          ) : (
            <div className="w-full bg-[#12141C] border border-[#1E2436] rounded py-2.5 px-3 text-xs text-[#F3F0E7] font-medium flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-[#B68A4E] shrink-0" />
              <span className="truncate">{activeRoute.to}</span>
            </div>
          )}
        </div>

        {/* Date & Pax */}
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block text-[10px] uppercase tracking-wider text-[#F3F0E7]/60 mb-1.5 font-medium">
              Flight Date
            </label>
            <div className="relative">
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full bg-[#12141C] border border-[#1E2436] focus:border-[#B68A4E] rounded py-2.5 px-2 text-xs text-[#F3F0E7] outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] uppercase tracking-wider text-[#F3F0E7]/60 mb-1.5 font-medium">
              Passengers
            </label>
            <select
              value={passengers}
              onChange={(e) => setPassengers(Number(e.target.value))}
              className="w-full bg-[#12141C] border border-[#1E2436] focus:border-[#B68A4E] rounded py-2.5 px-2 text-xs text-[#F3F0E7] outline-none cursor-pointer"
            >
              {[1, 2, 4, 6, 8, 10, 12, 16].map((p) => (
                <option key={p} value={p}>
                  {p} Pax
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Action button */}
        <div>
          <button
            type="button"
            onClick={handleProceed}
            className="w-full py-2.5 btn-glass-liquid-brass font-medium text-xs tracking-wider uppercase rounded-lg cursor-pointer flex items-center justify-center gap-2 shadow-lg"
          >
            <span>Proceed to Quote</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Flight Profile Result Bar */}
      {!isCustom && (
        <div className="mt-4 pt-3.5 border-t border-[#F3F0E7]/5 flex flex-wrap items-center justify-between text-xs text-[#F3F0E7]/70 gap-3">
          <div className="flex items-center gap-6">
            <span className="inline-flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#B68A4E]" />
              Estimated Flight Time: <strong className="text-[#F3F0E7]">{activeRoute.time}</strong>
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Plane className="w-3.5 h-3.5 text-[#B68A4E]" />
              Distance: <strong className="text-[#F3F0E7]">{activeRoute.distNm} NM</strong>
            </span>
            <span className="hidden sm:inline-flex items-center gap-1.5">
              Recommended Fleet: <strong className="text-[#D8B683]">{activeRoute.rec}</strong>
            </span>
          </div>
          <div className="flex items-center gap-1 text-[11px] text-[#B68A4E]">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Guaranteed Dispatch Within 60 Minutes</span>
          </div>
        </div>
      )}
    </div>
  );
};
