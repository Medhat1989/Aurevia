import React, { useState } from 'react';
import { FLEET_DATA, Aircraft } from '../data/aureviaData';
import { Users, Compass, Gauge, Luggage, ArrowUpRight } from 'lucide-react';
import { AircraftDetailModal } from './AircraftDetailModal';

interface FleetSectionProps {
  onCharterAircraft: (aircraftName: string) => void;
}

export const FleetSection: React.FC<FleetSectionProps> = ({ onCharterAircraft }) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedAircraft, setSelectedAircraft] = useState<Aircraft | null>(null);

  const categories = ['All', 'Light', 'Midsize', 'Super-Midsize', 'Heavy', 'Ultra-Long-Range', 'Helicopter'];

  const filteredFleet = activeCategory === 'All'
    ? FLEET_DATA
    : FLEET_DATA.filter((a) => a.category === activeCategory);

  return (
    <section id="fleet" className="py-24 bg-[#12141C] relative border-b border-[#1E2436]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="scroll-reveal-subtle reveal-delay-75 flex items-center gap-3 text-xs tracking-[0.25em] text-[#D8B683] uppercase font-medium mb-3">
            <span className="w-8 h-[1px] bg-[#B68A4E]/60 inline-block" />
            <span>Vetted Global Network</span>
          </div>
          <h2 className="scroll-reveal-header reveal-delay-150 font-display text-3xl sm:text-4xl lg:text-5xl text-[#F3F0E7] font-normal tracking-tight">
            A fleet configured around your calendar.
          </h2>
          <p className="scroll-reveal reveal-delay-200 text-sm sm:text-base text-[#F3F0E7]/70 mt-3 font-light leading-relaxed">
            From short alpine hops to nonstop transpacific crossings. Sourced from an audited network 
            of over 3,500 ARGUS Platinum and Wyvern-certified aircraft, ready for dispatch worldwide.
          </p>
        </div>

        {/* Category Filters (Clean Segmented Buttons) */}
        <div className="scroll-reveal reveal-delay-250 flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 text-xs font-medium rounded-lg transition-all whitespace-nowrap cursor-pointer uppercase tracking-wider ${
                activeCategory === cat
                  ? 'btn-glass-liquid-brass text-[#F3F0E7] shadow-md'
                  : 'btn-glass-liquid text-[#F3F0E7]/70 hover:text-[#F3F0E7]'
              }`}
            >
              {cat === 'All' ? 'Complete Fleet' : `${cat} Jets`}
            </button>
          ))}
        </div>

        {/* Fleet Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredFleet.map((aircraft, idx) => (
            <div
              key={aircraft.id}
              className={`scroll-reveal reveal-delay-${((idx % 3) + 1) * 100} group bg-[#1E2436]/40 hover:bg-[#1E2436]/70 border border-[#1E2436] hover:border-[#B68A4E]/40 rounded-xl overflow-hidden transition-all duration-300 flex flex-col justify-between`}
            >
              {/* Image Container with measured Scrim */}
              <div className="relative h-56 w-full overflow-hidden bg-[#0A0A0A]">
                <img
                  src={aircraft.image}
                  alt={aircraft.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#12141C] via-transparent to-black/20" />
                
                {/* Category badge */}
                <div className="absolute top-3 left-3 text-[10px] uppercase tracking-widest text-[#D8B683] bg-[#12141C]/80 backdrop-blur-sm px-2.5 py-1 rounded border border-[#B68A4E]/30 font-medium">
                  {aircraft.category}
                </div>

                <div className="absolute bottom-3 left-4 right-4">
                  <h3 className="font-display text-xl text-[#F3F0E7] font-medium group-hover:text-[#D8B683] transition-colors">
                    {aircraft.name}
                  </h3>
                </div>
              </div>

              {/* Specs & Description */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <p className="text-xs text-[#F3F0E7]/70 line-clamp-2 font-light">
                  {aircraft.tagline}
                </p>

                {/* Key Spec Badges */}
                <div className="grid grid-cols-3 gap-2 py-3 border-y border-[#1E2436] text-[11px]">
                  <div className="space-y-0.5">
                    <span className="text-[#F3F0E7]/50 block text-[9px] uppercase tracking-wider">Capacity</span>
                    <span className="text-[#F3F0E7] font-medium flex items-center gap-1">
                      <Users className="w-3 h-3 text-[#B68A4E]" />
                      {aircraft.passengers} Pax
                    </span>
                  </div>

                  <div className="space-y-0.5">
                    <span className="text-[#F3F0E7]/50 block text-[9px] uppercase tracking-wider">Range</span>
                    <span className="text-[#F3F0E7] font-medium flex items-center gap-1">
                      <Compass className="w-3 h-3 text-[#B68A4E]" />
                      {aircraft.rangeNm} NM
                    </span>
                  </div>

                  <div className="space-y-0.5">
                    <span className="text-[#F3F0E7]/50 block text-[9px] uppercase tracking-wider">Speed</span>
                    <span className="text-[#F3F0E7] font-medium flex items-center gap-1">
                      <Gauge className="w-3 h-3 text-[#B68A4E]" />
                      {aircraft.cruiseSpeedKts} kts
                    </span>
                  </div>
                </div>

                {/* Typical route teaser */}
                <div className="text-[11px] text-[#F3F0E7]/60">
                  <span className="text-[#D8B683]">Typical: </span>
                  {aircraft.typicalRoutes[0]}
                </div>

                {/* Card Actions */}
                <div className="pt-2 flex items-center justify-between gap-3">
                  <button
                    onClick={() => setSelectedAircraft(aircraft)}
                    className="text-xs text-[#F3F0E7]/85 hover:text-[#D8B683] transition-colors py-1.5 px-3 rounded-lg btn-glass-liquid inline-flex items-center gap-1 cursor-pointer shadow-sm"
                  >
                    <span>View Specifications</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => onCharterAircraft(aircraft.name)}
                    className="px-4 py-1.5 btn-glass-liquid-brass text-xs uppercase tracking-wider font-medium rounded-lg cursor-pointer"
                  >
                    Charter
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Alpine & Helicopter Cross-link callout */}
        <div className="mt-12 p-6 rounded-xl bg-[#1E2436]/40 border border-[#B68A4E]/25 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="space-y-1">
            <h4 className="font-display text-lg text-[#F3F0E7]">
              Need direct alpine altiport or yacht helideck access?
            </h4>
            <p className="text-xs text-[#F3F0E7]/70 font-light">
              Our twin-engine Airbus ACH145 and Leonardo AW139 helicopters provide point-to-point transfers into Courchevel, St. Moritz, Monaco, and private yacht decks.
            </p>
          </div>
          <button
            onClick={() => onCharterAircraft('Helicopter Transfer')}
            className="px-6 py-3 btn-glass-liquid-brass font-medium text-xs tracking-wider uppercase rounded-lg whitespace-nowrap cursor-pointer shadow-lg"
          >
            Request Helicopter Transfer
          </button>
        </div>
      </div>

      {/* Detail Modal */}
      <AircraftDetailModal
        aircraft={selectedAircraft}
        onClose={() => setSelectedAircraft(null)}
        onCharter={(name) => onCharterAircraft(name)}
      />
    </section>
  );
};
