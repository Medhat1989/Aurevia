import React, { useState, useEffect } from 'react';
import { Smartphone, Maximize2, Minimize2, Sparkles, Compass } from 'lucide-react';

interface SmartphoneEnclosureProps {
  children: React.ReactNode;
}

export const SmartphoneEnclosure: React.FC<SmartphoneEnclosureProps> = ({ children }) => {
  // Check if we are on a mobile-sized viewport
  const [isMobileScreen, setIsMobileScreen] = useState(false);
  const [deviceFrameEnabled, setDeviceFrameEnabled] = useState(true);

  useEffect(() => {
    const checkWidth = () => {
      // If screen is narrow (smartphone/tablet), default to native full screen
      setIsMobileScreen(window.innerWidth < 768);
    };
    checkWidth();
    window.addEventListener('resize', checkWidth);
    return () => window.removeEventListener('resize', checkWidth);
  }, []);

  // If user is natively on a smartphone/small screen, render edge-to-edge
  if (isMobileScreen || !deviceFrameEnabled) {
    return (
      <div className="w-full min-h-screen bg-[#0A0B0E] relative">
        {/* Toggle back to frame if on larger screen and frame disabled */}
        {!isMobileScreen && (
          <div className="fixed top-3 right-4 z-50">
            <button
              onClick={() => setDeviceFrameEnabled(true)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#141824]/80 backdrop-blur-md border border-[#D8B683]/40 text-[#D8B683] text-xs font-mono tracking-wider shadow-xl hover:bg-[#1E2436] transition-all cursor-pointer"
              title="Switch to 9:16 Smartphone Showcase"
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>9:16 PHONE FRAME</span>
            </button>
          </div>
        )}
        {children}
      </div>
    );
  }

  // Desktop / Tablet Showcase: Cinematic Hangar Studio Presentation with 9:16 Smartphone Screen
  return (
    <div className="min-h-screen w-full bg-[#08090C] text-[#F3F0E7] flex flex-col items-center justify-center relative overflow-x-hidden py-8 px-4 select-none">
      {/* Studio Background Spotlight & Moody Atmospheric Radiance */}
      <div 
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background: `
            radial-gradient(circle 600px at 50% 30%, rgba(216, 182, 131, 0.08) 0%, rgba(20, 24, 36, 0.4) 40%, #08090C 90%),
            linear-gradient(180deg, #0A0B0E 0%, #060709 100%)
          `
        }}
      />

      {/* Studio Floor Grid / Reflection Line */}
      <div className="fixed bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-black via-black/60 to-transparent pointer-events-none z-0" />

      {/* Top Presentation Bar */}
      <header className="relative z-20 mb-5 flex items-center justify-between w-full max-w-[430px] px-2 text-xs">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#D8B683] animate-pulse" />
          <span className="font-mono text-[11px] tracking-[0.25em] text-[#D8B683] uppercase">
            AUREVIA · 9:16 MOBILE UI
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setDeviceFrameEnabled(false)}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/5 border border-white/10 hover:border-[#D8B683]/40 text-[#F3F0E7]/70 hover:text-[#D8B683] text-[10px] font-mono tracking-wider transition-colors cursor-pointer"
            title="Expand to Full Width"
          >
            <Maximize2 className="w-3 h-3" />
            <span>FULL VIEW</span>
          </button>
        </div>
      </header>

      {/* Modern Flagship Smartphone Device Bezel (Vertical 9:16 Aspect Ratio) */}
      <div className="relative z-10 w-full max-w-[395px] sm:max-w-[415px] aspect-[9/16] max-h-[880px] rounded-[52px] p-[10px] bg-gradient-to-b from-[#2E3344] via-[#12141C] to-[#1E2230] shadow-[0_25px_70px_rgba(0,0,0,0.95),0_0_40px_rgba(216,182,131,0.12)] border border-[#D8B683]/30 flex flex-col">
        
        {/* Outer Titanium Chamfer Highlight */}
        <div className="absolute inset-0 rounded-[52px] ring-1 ring-inset ring-white/15 pointer-events-none" />

        {/* Smartphone Side Buttons (Hardware styling) */}
        <div className="absolute -left-[14px] top-28 w-[3.5px] h-11 bg-[#2C3142] rounded-l-md" />
        <div className="absolute -left-[14px] top-44 w-[3.5px] h-11 bg-[#2C3142] rounded-l-md" />
        <div className="absolute -right-[14px] top-32 w-[3.5px] h-16 bg-[#2C3142] rounded-r-md" />

        {/* Phone Glass Inner Container */}
        <div className="relative w-full h-full rounded-[44px] overflow-hidden bg-[#0A0B0E] flex flex-col border border-black shadow-inner">
          
          {/* Top Status Bar: Clock, Dynamic Island, Signals */}
          <div className="absolute top-0 left-0 right-0 z-40 h-10 px-6 flex items-center justify-between text-[11px] font-medium text-white/80 pointer-events-none select-none">
            {/* Clock */}
            <span className="font-mono text-[11px] tracking-tight">9:41</span>

            {/* Dynamic Island / Sensor Pill */}
            <div className="w-24 h-[22px] bg-black rounded-full flex items-center justify-end px-2.5 gap-1.5 shadow-[0_2px_4px_rgba(0,0,0,0.8)] border border-white/5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#181a20] border border-white/10" />
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/70" />
            </div>

            {/* Icons: 5G & Battery */}
            <div className="flex items-center gap-1.5 font-mono text-[10px]">
              <span className="text-[9px]">5G</span>
              <div className="w-4 h-2 rounded-[2px] border border-white/70 p-[1px] flex items-center">
                <div className="w-2.5 h-full bg-white rounded-[1px]" />
              </div>
            </div>
          </div>

          {/* Scrollable Screen Content Container (Smooth touch-like scrolling inside 9:16 frame) */}
          <div className="w-full h-full overflow-y-auto overflow-x-hidden no-scrollbar scroll-smooth flex flex-col relative pt-0">
            {children}

            {/* Home Indicator Bar anchored at bottom of screen */}
            <div className="sticky bottom-1.5 left-0 right-0 z-40 flex justify-center pointer-events-none pb-1">
              <div className="w-32 h-1 bg-white/30 backdrop-blur-md rounded-full shadow-md" />
            </div>
          </div>

          {/* Screen Glare Highlight */}
          <div 
            className="absolute top-0 right-0 w-full h-40 pointer-events-none opacity-20"
            style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.4) 0%, transparent 60%)'
            }}
          />
        </div>
      </div>

      {/* Bottom Subtitle / Info */}
      <footer className="relative z-20 mt-4 text-center">
        <p className="text-[10px] font-mono tracking-[0.2em] text-[#F3F0E7]/40 uppercase">
          Aurevia Private Aviation · 9:16 Flagship Mobile Showcase
        </p>
      </footer>
    </div>
  );
};
