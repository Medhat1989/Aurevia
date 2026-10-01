import React, { useState, useEffect } from 'react';
import { ShieldCheck } from 'lucide-react';

interface CookieConsentProps {
  onOpenPrivacy: () => void;
}

export const CookieConsent: React.FC<CookieConsentProps> = ({ onOpenPrivacy }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('aurevia_cookie_consent');
    if (!consent) {
      const timer = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('aurevia_cookie_consent', 'accepted');
    setVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('aurevia_cookie_consent', 'declined');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 left-4 z-40 max-w-sm sm:max-w-md bg-[#12141C]/95 backdrop-blur-md border border-[#B68A4E]/30 rounded-xl p-4 sm:p-5 shadow-2xl animate-fade-in text-xs text-[#F3F0E7]/80 space-y-3">
      <div className="flex items-center gap-2 text-[#D8B683] font-medium">
        <ShieldCheck className="w-4 h-4 text-[#B68A4E]" />
        <span className="uppercase tracking-wider text-[11px]">Confidentiality & Cookies</span>
      </div>

      <p className="font-light leading-relaxed">
        Aurevia uses strictly essential technical cookies to ensure seamless dispatch tracking and authenticated concierge preferences in compliance with Swiss and EU data protection standards.
      </p>

      <div className="flex items-center justify-between gap-3 pt-1">
        <button
          onClick={onOpenPrivacy}
          className="text-[#D8B683] hover:underline text-[11px] cursor-pointer"
        >
          Privacy Disclosure
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={handleDecline}
            className="px-3.5 py-1.5 btn-glass-liquid text-[#F3F0E7]/75 hover:text-[#F3F0E7] text-[11px] rounded-lg transition-colors cursor-pointer"
          >
            Essential Only
          </button>
          <button
            onClick={handleAccept}
            className="px-4 py-1.5 btn-glass-liquid-brass font-medium text-[11px] uppercase tracking-wider rounded-lg transition-colors cursor-pointer shadow-md"
          >
            Acknowledge
          </button>
        </div>
      </div>
    </div>
  );
};
