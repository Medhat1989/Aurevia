import React, { useState, useEffect, useRef } from 'react';
import hangarJetImg from '../assets/images/aurevia_hangar_jet_1791574370985.jpg';
import heroLogoImg from '../assets/images/aurevia_hero_logo.png';
import { TurbineButton } from './TurbineButton';
import { MobileNavDrawer } from './MobileNavDrawer';
import { ChevronDown, Send, Shield, Plane } from 'lucide-react';

interface HeroSectionProps {
  onRequestQuote: () => void;
  onViewFleet: () => void;
  onConfigureCharter: (details: {
    origin: string;
    destination: string;
    date: string;
    passengers: number;
    recommendedClass: string;
  }) => void;
  onNavigateSection?: (sectionId: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onRequestQuote,
  onViewFleet,
  onConfigureCharter: _onConfigureCharter,
  onNavigateSection
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [navDrawerOpen, setNavDrawerOpen] = useState(false);
  const [activeButton, setActiveButton] = useState<string | null>(null);

  // Parallax tracking states
  const [tilt, setTilt] = useState({ x: 0, y: 0, rotX: 0, rotY: 0 });
  const [scrollParallax, setScrollParallax] = useState({ y: 0, progress: 0 });
  const [scrollDistance, setScrollDistance] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollTimeoutRef = useRef<number | null>(null);

  // 1. Scroll Parallax & Gold-Leaf Metallic Animation: creates deep optical depth and metallic reflection as the user scrolls
  useEffect(() => {
    let ticking = false;

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (sectionRef.current) {
            const rect = sectionRef.current.getBoundingClientRect();
            const scrolledDistance = Math.max(0, -rect.top);
            // Subtle 26% scroll translation rate creates recessed hangar perspective
            const parallaxY = scrolledDistance * 0.26;
            const progress = Math.min(1, scrolledDistance / (rect.height || 700));
            setScrollParallax({ y: parallaxY, progress });
            setScrollDistance(scrolledDistance);

            // Trigger gold-leaf animation sweep on scroll
            if (scrolledDistance > 4) {
              setIsScrolling(true);
              if (scrollTimeoutRef.current !== null) {
                window.clearTimeout(scrollTimeoutRef.current);
              }
              scrollTimeoutRef.current = window.setTimeout(() => {
                setIsScrolling(false);
              }, 950);
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true, capture: true });
    onScroll();

    return () => {
      window.removeEventListener('scroll', onScroll, { capture: true });
      if (scrollTimeoutRef.current !== null) {
        window.clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  // 2. Gyroscope / Device Tilt Parallax for mobile smartphones & tablets
  useEffect(() => {
    const handleOrientation = (e: DeviceOrientationEvent) => {
      if (e.gamma === null && e.beta === null) return;

      // gamma is left/right tilt [-90, 90]. Normalized to ±30° natural hand range
      const gamma = Math.max(-30, Math.min(30, e.gamma ?? 0));
      const normGamma = gamma / 30; // -1 to 1

      // beta is front/back tilt [-180, 180]. Typical handheld smartphone posture is ~45°
      const rawBeta = e.beta ?? 45;
      const diffBeta = Math.max(-30, Math.min(30, rawBeta - 45));
      const normBeta = diffBeta / 30; // -1 to 1

      setTilt({
        x: normGamma * 18,       // subtle horizontal translation (px)
        y: normBeta * 14,        // subtle vertical translation (px)
        rotX: -normBeta * 2.2,   // subtle 3D pitch tilt (deg)
        rotY: normGamma * 2.2    // subtle 3D yaw tilt (deg)
      });
    };

    window.addEventListener('deviceorientation', handleOrientation, { passive: true });

    return () => {
      window.removeEventListener('deviceorientation', handleOrientation);
    };
  }, []);

  // 3. Pointer / Mouse Tilt Parallax fallback (for desktop, cursor interaction, and touch drag)
  const handlePointerMove = (e: React.PointerEvent<HTMLElement>) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const normX = ((e.clientX - rect.left) / rect.width) * 2 - 1; // -1 to 1
    const normY = ((e.clientY - rect.top) / rect.height) * 2 - 1; // -1 to 1

    setTilt({
      x: normX * 16,
      y: normY * 12,
      rotX: -normY * 2.4,
      rotY: normX * 2.4
    });
  };

  const handlePointerLeave = () => {
    setTilt({ x: 0, y: 0, rotX: 0, rotY: 0 });
  };

  const handleNav = (id: string) => {
    setActiveButton(id);
    if (onNavigateSection) {
      onNavigateSection(id);
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
    setTimeout(() => setActiveButton(null), 800);
  };

  const handleBookFlight = () => {
    setActiveButton('quick-estimator');
    const el = document.getElementById('quick-estimator');
    if (el) {
      if (onNavigateSection) {
        onNavigateSection('quick-estimator');
      } else {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      onRequestQuote();
    }
    setTimeout(() => setActiveButton(null), 800);
  };

  const handleScrollExplore = () => {
    const nextSection = document.getElementById('quick-estimator') || document.getElementById('fleet');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollBy({ top: window.innerHeight * 0.85, behavior: 'smooth' });
    }
  };

  return (
    <section 
      ref={sectionRef}
      id="home" 
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="relative w-full min-h-[100dvh] h-[100dvh] flex flex-col justify-between overflow-hidden bg-[#0A0B0E] select-none"
    >
      {/* 1. Cinematic Hangar Studio Background with Aircraft & Parallax Depth */}
      <div 
        className="absolute inset-0 z-0 overflow-hidden"
        style={{ perspective: '1100px' }}
      >
        {/* Parallax Aircraft Layer: moves with device tilt and scroll offset */}
        <div
          className="absolute -inset-[5%] w-[110%] h-[110%] transition-transform duration-300 ease-out will-change-transform"
          style={{
            transform: `translate3d(${tilt.x}px, ${scrollParallax.y + tilt.y}px, 0) scale(${1.04 + scrollParallax.progress * 0.03}) rotateX(${tilt.rotX}deg) rotateY(${tilt.rotY}deg)`,
            transformStyle: 'preserve-3d',
          }}
        >
          {/* Photorealistic 9:16 Render: Jet Black Private Aircraft with Open Door & Illuminated Stairs */}
          <img
            src={hangarJetImg}
            alt="Aurevia Jet Black Private Aircraft in Cinematic Hangar"
            className="w-full h-full object-cover object-center filter brightness-[0.92] contrast-[1.08]"
          />

          {/* Warm Golden Interior Spill on Hangar Ground (Anchored to cabin door) */}
          <div className="absolute bottom-[28%] left-[45%] w-48 h-32 bg-[#D8B683]/20 rounded-full blur-2xl pointer-events-none" />
        </div>

        {/* Realistic Moody Overhead Spotlighting Over Hangar (Differential ambient depth layer) */}
        <div 
          className="absolute inset-0 pointer-events-none transition-transform duration-500 ease-out"
          style={{
            background: `
              radial-gradient(ellipse 65% 55% at 50% 12%, rgba(216, 182, 131, 0.16) 0%, rgba(255, 255, 255, 0.08) 35%, transparent 75%),
              linear-gradient(180deg, rgba(10, 11, 14, 0.75) 0%, rgba(10, 11, 14, 0.15) 30%, rgba(10, 11, 14, 0.2) 65%, rgba(10, 11, 14, 0.95) 100%)
            `,
            transform: `translate3d(${tilt.x * 0.35}px, ${scrollParallax.y * 0.15 + tilt.y * 0.35}px, 0)`
          }}
        />

        {/* Studio Cone Spotlight Overhead Beams */}
        <div 
          className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[650px] h-[75%] pointer-events-none opacity-45 mix-blend-screen transition-transform duration-500 ease-out"
          style={{
            transform: `translate3d(calc(-50% + ${tilt.x * 0.4}px), ${scrollParallax.y * 0.1 + tilt.y * 0.3}px, 0)`
          }}
        >
          <div 
            className="w-full h-full"
            style={{
              background: 'conic-gradient(from 170deg at 50% 0%, transparent 0deg, rgba(216,182,131,0.18) 10deg, rgba(255,255,255,0.22) 15deg, rgba(216,182,131,0.18) 20deg, transparent 30deg)',
              filter: 'blur(32px)'
            }}
          />
        </div>

        {/* Vignette border & dark contrast depth */}
        <div className="absolute inset-0 ring-1 ring-inset ring-white/5 pointer-events-none" />
      </div>

      {/* 2. Top Bar: Minimalist Navigation */}
      <header className="relative z-30 w-full pt-4 px-5 sm:px-7 flex items-center justify-between">
        {/* Left: Brand Logo */}
        <div 
          onClick={() => handleNav('home')}
          className="flex items-center gap-2 cursor-pointer group"
        >
          <img
            src={heroLogoImg}
            alt="Aurevia Logo"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = 'https://i.ibb.co/fVPpmNTf/Gemini-Generated-Image-1c30d61c30d61c30-removebg-preview.png';
            }}
            className="h-8 sm:h-9 object-contain filter drop-shadow-[0_2px_10px_rgba(216,182,131,0.35)] group-hover:scale-105 transition-transform"
          />
        </div>

        {/* Right: Sleek Minimalist Hamburger Menu Icon */}
        <button
          onClick={() => setNavDrawerOpen(true)}
          className="relative w-10 h-10 rounded-full bg-[#121520]/60 backdrop-blur-md border border-white/10 flex flex-col items-center justify-center gap-1.5 cursor-pointer hover:border-[#D8B683]/60 hover:bg-[#1E2436]/80 transition-all duration-300 group shadow-[0_4px_14px_rgba(0,0,0,0.6)]"
          aria-label="Open mobile menu"
        >
          <span className="w-4 h-[1.5px] bg-[#F3F0E7] group-hover:bg-[#D8B683] transition-colors rounded-full" />
          <span className="w-4 h-[1.5px] bg-[#F3F0E7] group-hover:bg-[#D8B683] transition-colors rounded-full" />
        </button>
      </header>

      {/* 3. Center Stage: Featured Insignia Logo & Aircraft Focus */}
      <div className="relative z-10 w-full flex-1 flex flex-col justify-between items-center px-3 sm:px-4 pointer-events-none pt-2 pb-1">
        {/* Featured Hero Logo Centered in Overhead Spotlight */}
        <div className="text-center pt-2 sm:pt-3 flex flex-col items-center">
          <div className="relative pointer-events-auto">
            {/* Ambient golden radiance behind the logo */}
            <div className="absolute -inset-6 bg-gradient-to-r from-[#B68A4E]/0 via-[#D8B683]/25 to-[#B68A4E]/0 blur-2xl rounded-full pointer-events-none" />
            <img
              src={heroLogoImg}
              alt="Aurevia Aviation"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = 'https://i.ibb.co/fVPpmNTf/Gemini-Generated-Image-1c30d61c30d61c30-removebg-preview.png';
              }}
              className="relative w-48 sm:w-60 md:w-72 max-h-24 sm:max-h-32 object-contain filter drop-shadow-[0_6px_28px_rgba(216,182,131,0.5)] hover:scale-105 transition-transform duration-500 cursor-pointer"
              onClick={() => handleNav('home')}
            />
          </div>

          {/* Slogan: Bold typography and 2x size with subtle gold-leaf metallic texture animation triggered by scroll */}
          <div className="group relative mt-2 sm:mt-3 pointer-events-auto cursor-default flex flex-col items-center select-none px-2 sm:px-4">
            {/* Ambient golden radiance responding to scroll & hover */}
            <div
              className={`absolute -inset-4 bg-gradient-to-r from-transparent via-[#D8B683]/25 to-transparent blur-xl rounded-full pointer-events-none transition-all duration-700 ${
                isScrolling || scrollDistance > 8 ? 'opacity-90 scale-105' : 'opacity-40 group-hover:opacity-85'
              }`}
            />

            <div className="relative overflow-hidden inline-block px-2 py-0.5">
              <p
                style={{
                  backgroundPosition: `${(scrollDistance * 0.4) % 260}% 50%`,
                }}
                className={`gold-leaf-metallic-text text-[20px] sm:text-2xl md:text-[28px] font-bold tracking-[0.05em] sm:tracking-[0.1em] group-hover:tracking-[0.08em] sm:group-hover:tracking-[0.14em] text-center leading-tight transition-all duration-300 ${
                  isScrolling ? 'drop-shadow-[0_0_24px_rgba(216,182,131,0.85)]' : ''
                }`}
              >
                Connect you to what matters.
              </p>

              {/* Scroll-triggered subtle gold-leaf metallic light sweep */}
              <div
                className={`absolute inset-0 pointer-events-none overflow-hidden transition-opacity duration-500 ${
                  isScrolling || scrollDistance > 15 ? 'opacity-100' : 'opacity-0 group-hover:opacity-80'
                }`}
                aria-hidden="true"
              >
                <div
                  className={`w-1/2 h-full bg-gradient-to-r from-transparent via-white/35 to-transparent transform -skew-x-20 ${
                    isScrolling ? 'gold-leaf-sweep-active' : ''
                  }`}
                />
              </div>
            </div>

            {/* Expanding gold accent line on hover & reacting to scroll */}
            <span
              className={`mt-1.5 h-[2px] bg-gradient-to-r from-transparent via-[#D8B683] to-transparent transition-all duration-500 ease-out ${
                isScrolling || scrollDistance > 12
                  ? 'w-36 sm:w-52 via-[#FFE6A3] shadow-[0_0_12px_rgba(216,182,131,0.85)]'
                  : 'w-12 group-hover:w-44 sm:group-hover:w-60 via-[#D8B683]/60 group-hover:via-[#D8B683]'
              }`}
            />
          </div>
        </div>

        {/* Visual clearance zone: The Jet Black Aircraft with warm cabin & stairs occupies center stage */}
        <div className="w-full flex-1 min-h-[20px] sm:min-h-[35px] pointer-events-none" aria-hidden="true" />

        {/* Transparent Liquid Glass Buttons Under Aircraft - Elevated above the Book Now circle */}
        <div className="w-full max-w-[390px] mx-auto pointer-events-auto px-1 sm:px-2 mb-14 sm:mb-18 md:mb-20 relative z-20">
          <div className="relative rounded-2xl bg-white/[0.02] backdrop-blur-xl border border-white/10 p-1.5 shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.15),0_16px_36px_rgba(0,0,0,0.6)]">
            {/* Integrated Transparent Liquid Glass Buttons */}
            <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
              {/* Button 1: Book Flight */}
              <button
                type="button"
                onClick={handleBookFlight}
                className={`group relative overflow-hidden flex flex-col items-center justify-center py-2.5 px-1.5 rounded-xl transition-all duration-300 cursor-pointer text-center ${
                  activeButton === 'quick-estimator'
                    ? 'bg-[#D8B683]/20 border border-[#D8B683] shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.4),0_0_20px_rgba(216,182,131,0.5)]'
                    : 'bg-white/[0.04] hover:bg-white/[0.08] active:bg-white/[0.12] border border-white/15 hover:border-[#D8B683]/60 shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.25),0_4px_16px_rgba(0,0,0,0.4)]'
                }`}
                title="Book Flight & Route Estimator"
              >
                {/* Liquid Glass Specular Highlight Sheen */}
                <div className="absolute top-0 left-0 right-0 h-[45%] bg-gradient-to-b from-white/20 via-white/5 to-transparent pointer-events-none rounded-t-xl" />

                <Send className="relative z-10 w-3.5 h-3.5 text-[#D8B683] group-hover:scale-110 group-hover:translate-x-0.5 transition-transform drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]" />
                <span className="relative z-10 mt-1 text-[10px] sm:text-[11px] font-mono font-medium tracking-wider text-[#F3F0E7] group-hover:text-[#D8B683] leading-tight drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]">
                  Book Flight
                </span>
                <span className="relative z-10 text-[8px] font-mono tracking-tight text-[#F3F0E7]/50 group-hover:text-[#D8B683]/80">
                  Instant Quote
                </span>
              </button>

              {/* Button 2: Special Missions */}
              <button
                type="button"
                onClick={() => handleNav('missions')}
                className={`group relative overflow-hidden flex flex-col items-center justify-center py-2.5 px-1.5 rounded-xl transition-all duration-300 cursor-pointer text-center ${
                  activeButton === 'missions'
                    ? 'bg-[#D8B683]/20 border border-[#D8B683] shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.4),0_0_20px_rgba(216,182,131,0.5)]'
                    : 'bg-white/[0.04] hover:bg-white/[0.08] active:bg-white/[0.12] border border-white/15 hover:border-[#D8B683]/60 shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.25),0_4px_16px_rgba(0,0,0,0.4)]'
                }`}
                title="Special Operations, Medevac & Government"
              >
                {/* Liquid Glass Specular Highlight Sheen */}
                <div className="absolute top-0 left-0 right-0 h-[45%] bg-gradient-to-b from-white/20 via-white/5 to-transparent pointer-events-none rounded-t-xl" />

                <Shield className="relative z-10 w-3.5 h-3.5 text-[#D8B683] group-hover:scale-110 transition-transform drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]" />
                <span className="relative z-10 mt-1 text-[10px] sm:text-[11px] font-mono font-medium tracking-wider text-[#F3F0E7] group-hover:text-[#D8B683] leading-tight drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]">
                  Special Missions
                </span>
                <span className="relative z-10 text-[8px] font-mono tracking-tight text-[#F3F0E7]/50 group-hover:text-[#D8B683]/80">
                  Gov & Medevac
                </span>
              </button>

              {/* Button 3: Aircraft Network */}
              <button
                type="button"
                onClick={() => handleNav('fleet')}
                className={`group relative overflow-hidden flex flex-col items-center justify-center py-2.5 px-1.5 rounded-xl transition-all duration-300 cursor-pointer text-center ${
                  activeButton === 'fleet'
                    ? 'bg-[#D8B683]/20 border border-[#D8B683] shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.4),0_0_20px_rgba(216,182,131,0.5)]'
                    : 'bg-white/[0.04] hover:bg-white/[0.08] active:bg-white/[0.12] border border-white/15 hover:border-[#D8B683]/60 shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.25),0_4px_16px_rgba(0,0,0,0.4)]'
                }`}
                title="Curated Private Fleet & Aircraft Specifications"
              >
                {/* Liquid Glass Specular Highlight Sheen */}
                <div className="absolute top-0 left-0 right-0 h-[45%] bg-gradient-to-b from-white/20 via-white/5 to-transparent pointer-events-none rounded-t-xl" />

                <Plane className="relative z-10 w-3.5 h-3.5 text-[#D8B683] group-hover:scale-110 transition-transform drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]" />
                <span className="relative z-10 mt-1 text-[10px] sm:text-[11px] font-mono font-medium tracking-wider text-[#F3F0E7] group-hover:text-[#D8B683] leading-tight drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]">
                  Aircraft Network
                </span>
                <span className="relative z-10 text-[8px] font-mono tracking-tight text-[#F3F0E7]/50 group-hover:text-[#D8B683]/80">
                  Fleet Specs
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Bottom CTA: Surrounded by Smooth, Dark Fluid Satin Curves */}
      <div className="relative z-20 w-full flex flex-col items-center">
        {/* Fluid Satin Curved Container (SVG Fluid Bezier Mask with Metallic Highlights) */}
        <div className="relative w-full">
          {/* Smooth Dark Fluid Satin Curves Background SVG */}
          <div className="w-full overflow-hidden leading-none">
            <svg 
              viewBox="0 0 400 90" 
              className="w-full h-16 sm:h-20 text-[#0E1017] drop-shadow-[0_-12px_24px_rgba(0,0,0,0.9)]" 
              preserveAspectRatio="none"
            >
              <defs>
                {/* Metallic satin gold highlight on top edge */}
                <linearGradient id="satinCurveRim" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#1E2436" stopOpacity="0.2" />
                  <stop offset="35%" stopColor="#B68A4E" stopOpacity="0.6" />
                  <stop offset="50%" stopColor="#F3E5C8" stopOpacity="0.95" />
                  <stop offset="65%" stopColor="#B68A4E" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#1E2436" stopOpacity="0.2" />
                </linearGradient>

                {/* Satin dark fluid gradient */}
                <linearGradient id="fluidSatinFill" x1="50%" y1="0%" x2="50%" y2="100%">
                  <stop offset="0%" stopColor="#141824" stopOpacity="0.98" />
                  <stop offset="45%" stopColor="#0E1017" stopOpacity="1" />
                  <stop offset="100%" stopColor="#08090C" stopOpacity="1" />
                </linearGradient>
              </defs>

              {/* Fluid curve path cradling the center turbine button */}
              <path 
                d="M 0,55 C 80,55 120,75 155,75 C 175,75 185,25 200,25 C 215,25 225,75 245,75 C 280,75 320,55 400,55 L 400,90 L 0,90 Z" 
                fill="url(#fluidSatinFill)"
              />
              {/* Highlight rim trace */}
              <path 
                d="M 0,55 C 80,55 120,75 155,75 C 175,75 185,25 200,25 C 215,25 225,75 245,75 C 280,75 320,55 400,55" 
                fill="none" 
                stroke="url(#satinCurveRim)" 
                strokeWidth="1.2"
              />
            </svg>
          </div>

          {/* Anchored Circular Metallic Turbine-Engine "Book Now" Button */}
          <div className="absolute -top-11 sm:-top-13 left-1/2 -translate-x-1/2 z-30 pointer-events-auto">
            <TurbineButton 
              onClick={onRequestQuote} 
              label="BOOK NOW"
              size="lg"
            />
          </div>
        </div>

        {/* Dock Bottom Tray with Subtle "Scroll to Explore" Overlay */}
        <div className="w-full bg-[#08090C] pb-3 pt-1 px-4 flex flex-col items-center justify-center">
          <button
            type="button"
            onClick={handleScrollExplore}
            className="group flex flex-col items-center gap-1 cursor-pointer focus:outline-none"
            aria-label="Scroll to Explore"
          >
            <span className="text-[10px] tracking-[0.28em] font-mono text-[#F3F0E7]/60 group-hover:text-[#D8B683] transition-colors uppercase">
              Scroll to Explore
            </span>
            <ChevronDown className="w-3.5 h-3.5 text-[#D8B683]/70 group-hover:text-[#D8B683] animate-bounce -mt-0.5" />
          </button>
        </div>
      </div>

      {/* 5. Mobile Navigation Slide-Over Drawer */}
      <MobileNavDrawer
        isOpen={navDrawerOpen}
        onClose={() => setNavDrawerOpen(false)}
        onNavigate={handleNav}
        onRequestQuote={onRequestQuote}
      />
    </section>
  );
};
