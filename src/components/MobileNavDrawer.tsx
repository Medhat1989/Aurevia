import React from 'react';
import { X, Phone, Compass, Shield, Award, BookOpen, Send, Sparkles } from 'lucide-react';
import { BRAND } from '../data/aureviaData';
import heroLogoImg from '../assets/images/aurevia_hero_logo.png';

interface MobileNavDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (sectionId: string) => void;
  onRequestQuote: () => void;
}

export const MobileNavDrawer: React.FC<MobileNavDrawerProps> = ({
  isOpen,
  onClose,
  onNavigate,
  onRequestQuote
}) => {
  if (!isOpen) return null;

  const links = [
    { id: 'home', label: 'Overview & Hangar', icon: Compass, sub: 'Return to flight deck' },
    { id: 'fleet', label: 'Aircraft Network', icon: Send, sub: 'Light, Heavy, Ultra-Long & Heli' },
    { id: 'membership', label: 'Jubilee Membership', icon: Award, sub: 'Black Card private access' },
    { id: 'concierge', label: 'Lifestyle Concierge', icon: Sparkles, sub: 'Yachts, Security, Helicopters' },
    { id: 'missions', label: 'Special Missions', icon: Shield, sub: 'Government & Medevac protocols' },
    { id: 'journal', label: 'The Journal', icon: BookOpen, sub: 'Global aviation chronicles' },
    { id: 'about', label: 'Valletta Dispatch Desk', icon: Compass, sub: 'Operations & Global Hubs' },
    { id: 'contact', label: 'Instant Flight Charter', icon: Phone, sub: 'Request custom itinerary' }
  ];

  const handleLink = (id: string) => {
    onNavigate(id);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-end">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/85 backdrop-blur-xl transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Luxury Slide-up Mobile Drawer */}
      <div className="relative z-10 w-full max-h-[92vh] overflow-y-auto bg-gradient-to-b from-[#141824] via-[#0E1017] to-[#0A0B0E] border-t border-[#D8B683]/30 rounded-t-[32px] p-6 shadow-2xl flex flex-col">
        {/* Drawer Pull Handle */}
        <div className="w-12 h-1 bg-[#D8B683]/40 rounded-full mx-auto mb-5" />

        {/* Top Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <img
              src={heroLogoImg}
              alt="Aurevia Logo"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = 'https://i.ibb.co/fVPpmNTf/Gemini-Generated-Image-1c30d61c30d61c30-removebg-preview.png';
              }}
              className="h-9 object-contain filter drop-shadow"
            />
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#F3F0E7] hover:text-[#D8B683] hover:border-[#D8B683]/40 transition-colors"
            aria-label="Close menu"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Navigation Items */}
        <div className="py-4 space-y-2">
          {links.map((link) => {
            const Icon = link.icon;
            return (
              <button
                key={link.id}
                onClick={() => handleLink(link.id)}
                className="w-full flex items-center justify-between p-3 rounded-xl bg-white/[0.02] hover:bg-[#D8B683]/10 border border-white/5 hover:border-[#D8B683]/30 transition-all text-left group"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-8 h-8 rounded-lg bg-[#1E2436]/60 border border-[#D8B683]/20 flex items-center justify-center text-[#D8B683] group-hover:scale-110 transition-transform">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-sans text-sm tracking-wider font-medium text-[#F3F0E7] group-hover:text-[#D8B683] transition-colors block">
                      {link.label}
                    </span>
                    <span className="text-[10px] text-[#F3F0E7]/50 block">
                      {link.sub}
                    </span>
                  </div>
                </div>
                <span className="text-[#D8B683] opacity-0 group-hover:opacity-100 transition-opacity text-xs font-mono">
                  →
                </span>
              </button>
            );
          })}
        </div>

        {/* Valletta 24/7 Operations Quick Call Box */}
        <div className="mt-2 p-4 rounded-2xl bg-gradient-to-r from-[#1E2436]/40 via-[#141824] to-[#1E2436]/40 border border-[#D8B683]/20">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[10px] font-mono tracking-[0.2em] text-[#D8B683] uppercase">
                  Valletta Desk Live
                </span>
              </div>
              <p className="text-xs text-[#F3F0E7]/80 mt-1">
                Direct Charter & Mission Dispatch
              </p>
            </div>
            <a
              href="tel:+35677302834"
              className="px-3 py-1.5 rounded-full bg-[#B68A4E]/20 border border-[#D8B683]/40 text-[#D8B683] text-xs font-mono tracking-wider flex items-center gap-1.5 hover:bg-[#B68A4E] hover:text-[#12141C] transition-colors"
            >
              <Phone className="w-3 h-3" />
              <span>CALL</span>
            </a>
          </div>
        </div>

        {/* Bottom Fast Action */}
        <div className="mt-4 pt-3 border-t border-white/5 flex gap-3">
          <button
            onClick={() => {
              onClose();
              onRequestQuote();
            }}
            className="flex-1 py-3 rounded-full bg-gradient-to-r from-[#B68A4E] to-[#D8B683] text-[#12141C] font-semibold text-xs tracking-[0.18em] uppercase shadow-lg shadow-[#B68A4E]/20 hover:brightness-110 active:scale-95 transition-all text-center"
          >
            REQUEST CHARTER QUOTE
          </button>
        </div>
      </div>
    </div>
  );
};
