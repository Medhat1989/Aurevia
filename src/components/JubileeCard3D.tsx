import React, { useState, useRef } from 'react';
import { AureviaLogo } from './AureviaLogo';
import { Sparkles, Shield, Compass, Key, ArrowRight } from 'lucide-react';

interface JubileeCard3DProps {
  onRequestInvite: () => void;
}

export const JubileeCard3D: React.FC<JubileeCard3DProps> = ({ onRequestInvite }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [shinePos, setShinePos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rX = ((y - centerY) / centerY) * -12; // tilt angle
    const rY = ((x - centerX) / centerX) * 14;

    setRotateX(rX);
    setRotateY(rY);
    setShinePos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100
    });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
    setShinePos({ x: 50, y: 50 });
  };

  return (
    <div className="relative overflow-hidden rounded-2xl bg-[#0A0A0A] border border-[#B68A4E]/30 p-8 lg:p-12 shadow-2xl">
      {/* Background ambient lighting */}
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-[#B68A4E]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-[#1E2436]/40 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        {/* Left Editorial Narrative */}
        <div className="lg:col-span-6 space-y-6">
          <div className="flex items-center gap-3 text-xs tracking-[0.25em] text-[#D8B683] uppercase font-medium">
            <span className="w-8 h-[1px] bg-[#B68A4E]/60 inline-block" />
            <span>The Black Card Tier</span>
            <span className="text-[#B68A4E]/60">·</span>
            <span>By Invitation Only</span>
          </div>

          <h3 className="font-display text-3xl sm:text-4xl text-[#F3F0E7] font-normal tracking-tight">
            Aurevia Jubilee
          </h3>

          <p className="text-sm sm:text-base text-[#F3F0E7]/80 leading-relaxed font-light">
            Created for principals whose movements cannot be bounded by schedules or notice windows.
            Jubilee represents total global sovereignty: guaranteed aircraft dispatch on zero notice, an assigned 
            personal lifestyle manager, and confidential execution across private aviation, chartered superyachts, 
            and sovereign diplomatic estates.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="flex items-start gap-3">
              <Key className="w-4 h-4 text-[#D8B683] shrink-0 mt-1" />
              <div>
                <p className="text-xs uppercase tracking-wider text-[#D8B683] font-medium">Zero Notice Dispatch</p>
                <p className="text-xs text-[#F3F0E7]/60 mt-0.5">Aircraft wheels-up protocol with no minimum advance call.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Compass className="w-4 h-4 text-[#D8B683] shrink-0 mt-1" />
              <div>
                <p className="text-xs uppercase tracking-wider text-[#D8B683] font-medium">Global Lifestyle Desk</p>
                <p className="text-xs text-[#F3F0E7]/60 mt-0.5">Yachts, private islands, and executive close protection.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Shield className="w-4 h-4 text-[#D8B683] shrink-0 mt-1" />
              <div>
                <p className="text-xs uppercase tracking-wider text-[#D8B683] font-medium">Sovereign Discretion</p>
                <p className="text-xs text-[#F3F0E7]/60 mt-0.5">Confidential passenger manifests & VIP tarmac escort.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Sparkles className="w-4 h-4 text-[#D8B683] shrink-0 mt-1" />
              <div>
                <p className="text-xs uppercase tracking-wider text-[#D8B683] font-medium">Bespoke Foil Card</p>
                <p className="text-xs text-[#F3F0E7]/60 mt-0.5">Laser-engraved titanium card with individual registry.</p>
              </div>
            </div>
          </div>

          <div className="pt-4 flex flex-wrap items-center gap-4">
            <button
              onClick={onRequestInvite}
              className="px-7 py-3.5 btn-glass-liquid-brass font-medium text-xs tracking-wider uppercase rounded-lg shadow-xl inline-flex items-center gap-2 group cursor-pointer"
            >
              <span>Request Jubilee Invitation</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
            <span className="text-xs text-[#F3F0E7]/50 italic">
              Strictly limited to 100 members globally per cycle.
            </span>
          </div>
        </div>

        {/* Right 3D Interactive Card Showcase */}
        <div className="lg:col-span-6 flex justify-center items-center py-6 perspective-1000">
          <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={handleMouseLeave}
            style={{
              transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${isHovered ? 1.04 : 1}, ${isHovered ? 1.04 : 1}, 1)`,
              transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
            className="w-full max-w-[420px] aspect-[1.586/1] rounded-2xl p-7 relative cursor-pointer select-none transition-shadow duration-500 overflow-hidden"
          >
            {/* Metallic gunmetal card body */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#1c1d24] via-[#0a0a0d] to-[#121319] border border-[#B68A4E]/40 rounded-2xl shadow-2xl" />

            {/* Micro hairline texture */}
            <div 
              className="absolute inset-0 opacity-15 pointer-events-none"
              style={{
                backgroundImage: 'repeating-linear-gradient(45deg, #B68A4E 0, #B68A4E 1px, transparent 0, transparent 8px)'
              }}
            />

            {/* Foil light reflection glare */}
            <div
              className="absolute inset-0 pointer-events-none opacity-40 transition-opacity duration-300"
              style={{
                background: `radial-gradient(circle at ${shinePos.x}% ${shinePos.y}%, rgba(216, 182, 131, 0.6) 0%, rgba(182, 138, 78, 0.15) 35%, transparent 70%)`
              }}
            />

            {/* Card Content Elements */}
            <div className="relative z-20 h-full flex flex-col justify-between">
              {/* Header: Monogram + EMV Chip + Sovereign Mark */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <AureviaLogo variant="brass-foil" size="md" showWordmark={true} />
                </div>
                
                {/* Simulated metallic foil EMV smart chip */}
                <div className="w-11 h-8 rounded bg-gradient-to-br from-[#D8B683] via-[#B68A4E] to-[#87602D] p-[1px] shadow-sm">
                  <div className="w-full h-full bg-[#1A1A1A] rounded-[3px] p-1 flex flex-col justify-between">
                    <div className="w-full h-[1px] bg-[#D8B683]/60" />
                    <div className="w-1/2 h-[1px] bg-[#D8B683]/60" />
                    <div className="w-full h-[1px] bg-[#D8B683]/60" />
                  </div>
                </div>
              </div>

              {/* Center: Card Number & Discreet Security Code */}
              <div className="space-y-1">
                <p className="text-[10px] tracking-[0.3em] uppercase text-[#D8B683]/80 font-mono">
                  MEMBER REGISTER 001
                </p>
                <p className="font-mono text-base tracking-[0.25em] text-[#F3F0E7] drop-shadow-sm font-medium">
                  ••••  ••••  ••••  8849
                </p>
              </div>

              {/* Footer: Principal Name & Jubilee Seal */}
              <div className="flex items-end justify-between border-t border-[#B68A4E]/25 pt-3">
                <div>
                  <p className="text-[8px] tracking-[0.25em] uppercase text-[#D8B683]/70 font-sans">
                    PRINCIPAL CARDHOLDER
                  </p>
                  <p className="text-xs uppercase tracking-widest text-[#F3F0E7] font-medium font-sans mt-0.5">
                    SOVEREIGN INVITEE
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-[8px] tracking-[0.25em] uppercase text-[#D8B683]/70 font-sans">
                    STATUS
                  </p>
                  <p className="text-xs uppercase tracking-widest text-[#D8B683] font-medium font-sans mt-0.5">
                    JUBILEE PERPETUAL
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
