import React, { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';

interface TurbineButtonProps {
  onClick: () => void;
  label?: string;
  size?: 'md' | 'lg';
  className?: string;
}

export const TurbineButton: React.FC<TurbineButtonProps> = ({
  onClick,
  label = 'BOOK NOW',
  size = 'lg',
  className = ''
}) => {
  const [isHovered, setIsHovered] = useState(false);

  // Number of turbine fan blades
  const bladeCount = 18;
  const blades = Array.from({ length: bladeCount }, (_, i) => (i * 360) / bladeCount);

  const dimensionClasses = size === 'lg' ? 'w-24 h-24 sm:w-28 sm:h-28' : 'w-20 h-20 sm:w-22 sm:h-22';

  return (
    <div className={`relative inline-flex flex-col items-center group select-none ${className}`}>
      {/* Outer ambient golden turbine exhaust glow */}
      <div 
        className={`absolute -inset-4 rounded-full bg-gradient-to-r from-[#B68A4E]/20 via-[#D8B683]/30 to-[#B68A4E]/20 blur-xl transition-all duration-700 pointer-events-none ${
          isHovered ? 'opacity-100 scale-110' : 'opacity-40 scale-100'
        }`}
      />

      {/* Main Turbine Circular Button */}
      <button
        type="button"
        onClick={onClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`relative ${dimensionClasses} rounded-full p-[3px] cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#D8B683]/50 transition-transform duration-500 ease-out active:scale-95 group-hover:scale-105`}
        aria-label={label}
      >
        {/* Outer Brushed Titanium / Brass Beveled Ring */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#1E2436] via-[#D8B683]/60 to-[#12141C] p-[2px] shadow-[0_10px_25px_rgba(0,0,0,0.8),inset_0_1px_2px_rgba(255,255,255,0.4)]">
          {/* Inner Machined Bezel with Radial Notches */}
          <div className="w-full h-full rounded-full bg-gradient-to-b from-[#1E212D] via-[#0E1017] to-[#0A0B0E] p-[3px] relative flex items-center justify-center overflow-hidden">
            
            {/* Concentric Engine Cowl Rings */}
            <div className="absolute inset-1 rounded-full border border-[#D8B683]/20 pointer-events-none" />
            <div className="absolute inset-2 rounded-full border border-white/10 pointer-events-none" />

            {/* Rotating Turbine Blades Fan */}
            <div 
              className={`absolute inset-2 transition-transform duration-1000 ease-linear ${
                isHovered ? 'animate-[spin_4s_linear_infinite]' : 'animate-[spin_20s_linear_infinite]'
              }`}
            >
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <defs>
                  <linearGradient id="bladeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#4A5268" />
                    <stop offset="50%" stopColor="#282D3C" />
                    <stop offset="100%" stopColor="#12151F" />
                  </linearGradient>
                  <linearGradient id="bladeEdge" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#D8B683" stopOpacity="0.8" />
                    <stop offset="50%" stopColor="#B68A4E" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#1E2436" stopOpacity="0.1" />
                  </linearGradient>
                </defs>
                {blades.map((deg, idx) => (
                  <g key={idx} transform={`rotate(${deg} 50 50)`}>
                    {/* Curved aerofoil blade */}
                    <path
                      d="M 50 14 C 54 22, 53 34, 50 42 C 48 34, 47 22, 50 14 Z"
                      fill="url(#bladeGrad)"
                      stroke="url(#bladeEdge)"
                      strokeWidth="0.75"
                    />
                  </g>
                ))}
              </svg>
            </div>

            {/* Turbine Intake Backlit Core / Afterburner Warm Radiance */}
            <div className="absolute inset-5 rounded-full bg-radial from-[#D8B683]/30 via-[#B68A4E]/10 to-transparent blur-[2px] pointer-events-none" />

            {/* Central Polished Spinner Cone with Spiral / Aurevia Insignia */}
            <div className="relative z-10 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-gradient-to-tr from-[#0F1118] via-[#2A3042] to-[#12141C] border border-[#D8B683]/50 shadow-[0_4px_12px_rgba(0,0,0,0.9),inset_0_1px_3px_rgba(255,255,255,0.3)] flex flex-col items-center justify-center">
              {/* Spinner Spiral Detail */}
              <div className="absolute inset-0 rounded-full flex items-center justify-center opacity-70">
                <svg viewBox="0 0 40 40" className="w-7 h-7 animate-[spin_6s_linear_infinite]">
                  <path
                    d="M 20 6 C 26 12, 26 22, 20 28 C 15 22, 17 12, 20 6"
                    fill="none"
                    stroke="#D8B683"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                  />
                  <circle cx="20" cy="20" r="2.5" fill="#F3F0E7" />
                </svg>
              </div>

              {/* Center Micro Badge */}
              <div className="relative z-20 flex flex-col items-center justify-center">
                <span className="font-mono text-[9px] sm:text-[10px] tracking-[0.2em] font-bold text-[#F3F0E7] uppercase drop-shadow">
                  {label === 'BOOK NOW' ? 'BOOK' : label}
                </span>
                <span className="text-[7px] tracking-[0.22em] text-[#D8B683] font-semibold uppercase -mt-0.5">
                  NOW
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Flight Indicator Arrow on Hover */}
        <div 
          className={`absolute -top-1.5 -right-1.5 w-6 h-6 rounded-full bg-[#B68A4E] text-[#12141C] flex items-center justify-center shadow-lg transition-all duration-300 ${
            isHovered ? 'scale-110 rotate-45' : 'scale-90'
          }`}
        >
          <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
        </div>
      </button>
    </div>
  );
};
