import React, { useState } from 'react';
import { AureviaLogo } from './AureviaLogo';
import { BRAND, GLOBAL_HUBS } from '../data/aureviaData';
import { ArrowRight, Phone, Mail, Check, Shield } from 'lucide-react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  onRequestQuote: (serviceType?: string) => void;
  onOpenLegal: (tab: 'privacy' | 'terms') => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onRequestQuote,
  onOpenLegal
}) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setNewsletterSubscribed(true);
      setNewsletterEmail('');
    }
  };

  return (
    <footer className="bg-[#0B0C11] text-[#F3F0E7] border-t border-[#1E2436] pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Footer Marquee CTA: "Tell us where you're headed." */}
        <div className="p-8 sm:p-12 rounded-2xl bg-gradient-to-r from-[#1E2436]/60 via-[#12141C] to-[#1E2436]/40 border border-[#B68A4E]/30 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#D8B683] font-medium block">
              Direct Route Planning
            </span>
            <h3 className="font-display text-3xl sm:text-4xl text-[#F3F0E7] font-normal tracking-tight">
              Tell us where you’re headed.
            </h3>
            <p className="text-xs sm:text-sm text-[#F3F0E7]/70 font-light max-w-lg">
              One call or submission, and the aircraft, crew, and route are already moving. 
              Confirmed within the hour.
            </p>
          </div>

          <button
            onClick={() => onRequestQuote()}
            className="px-8 py-4 btn-glass-liquid-brass font-medium text-xs tracking-wider uppercase rounded-lg cursor-pointer whitespace-nowrap inline-flex items-center gap-2 shadow-xl"
          >
            <span>Request Itinerary</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Multi-Column Nav Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand & Mission column */}
          <div className="lg:col-span-2 space-y-4">
            <AureviaLogo variant="default" size="md" />
            <p className="text-xs text-[#F3F0E7]/70 font-light leading-relaxed max-w-sm">
              Private aviation and lifestyle concierge group based in Geneva. Connecting you to what matters through 
              sovereign flight charter, special missions, and worldwide luxury concierge.
            </p>

            <div className="space-y-1 text-xs text-[#F3F0E7]/60 pt-2 font-mono">
              <p>Direct: <a href={`tel:${BRAND.phone}`} className="text-[#D8B683] hover:underline">{BRAND.phoneDisplay}</a></p>
              <p>Email: <a href={`mailto:${BRAND.email}`} className="text-[#D8B683] hover:underline">{BRAND.email}</a></p>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-[10px] uppercase tracking-[0.25em] text-[#D8B683] font-medium">
              Aviation & Fleet
            </h4>
            <ul className="space-y-2 text-xs text-[#F3F0E7]/70 font-light">
              <li>
                <button onClick={() => onNavigate('fleet')} className="hover:text-[#F3F0E7] transition-colors cursor-pointer">
                  Light & Midsize Jets
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('fleet')} className="hover:text-[#F3F0E7] transition-colors cursor-pointer">
                  Heavy & Ultra-Long-Range
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('fleet')} className="hover:text-[#F3F0E7] transition-colors cursor-pointer">
                  Executive Helicopters
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('membership')} className="hover:text-[#F3F0E7] transition-colors cursor-pointer">
                  Membership Program
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('membership')} className="text-[#D8B683] hover:underline transition-colors cursor-pointer">
                  Jubilee Black Card
                </button>
              </li>
            </ul>
          </div>

          {/* Concierge & Missions */}
          <div className="space-y-3">
            <h4 className="text-[10px] uppercase tracking-[0.25em] text-[#D8B683] font-medium">
              Specialized Services
            </h4>
            <ul className="space-y-2 text-xs text-[#F3F0E7]/70 font-light">
              <li>
                <button onClick={() => onNavigate('concierge')} className="hover:text-[#F3F0E7] transition-colors cursor-pointer">
                  Executive Close Protection
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('concierge')} className="hover:text-[#F3F0E7] transition-colors cursor-pointer">
                  Superyacht Charter
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('concierge')} className="hover:text-[#F3F0E7] transition-colors cursor-pointer">
                  Private Villa Portfolios
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('missions')} className="hover:text-[#F3F0E7] transition-colors cursor-pointer">
                  Emergency Medevac (60m)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('missions')} className="hover:text-[#F3F0E7] transition-colors cursor-pointer">
                  NGO & Relief Transport
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('missions')} className="hover:text-[#F3F0E7] transition-colors cursor-pointer">
                  Diplomatic Delegations
                </button>
              </li>
            </ul>
          </div>

          {/* Magazine & Newsletter */}
          <div className="space-y-4">
            <h4 className="text-[10px] uppercase tracking-[0.25em] text-[#D8B683] font-medium">
              The Journal
            </h4>
            <p className="text-xs text-[#F3F0E7]/60 font-light">
              Receive our monthly editorial digest covering aeronautical design, sovereign routes, and private aviation policy.
            </p>

            {newsletterSubscribed ? (
              <div className="p-2.5 rounded bg-[#1E2436] text-[#D8B683] text-xs flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5" />
                <span>Subscription Confirmed.</span>
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    required
                    placeholder="principal@office.com"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    className="w-full bg-[#12141C] border border-[#1E2436] focus:border-[#B68A4E] rounded py-2 px-3 text-xs text-[#F3F0E7] placeholder-[#F3F0E7]/30 outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2.5 btn-glass-liquid text-[#F3F0E7] text-[11px] uppercase tracking-wider font-medium rounded-lg transition-colors cursor-pointer shadow-sm"
                >
                  Subscribe to Monthly
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Global Hubs Line */}
        <div className="pt-8 border-t border-[#1E2436] flex flex-wrap items-center justify-between text-xs text-[#F3F0E7]/60 gap-4">
          <div className="flex flex-wrap items-center gap-6">
            {GLOBAL_HUBS.map((hub) => (
              <span key={hub.city} className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#B68A4E]" />
                <strong className="text-[#F3F0E7] font-medium">{hub.city} Desk:</strong> {hub.address}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-4 text-xs">
            <button
              onClick={() => onOpenLegal('privacy')}
              className="hover:text-[#D8B683] transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <span>·</span>
            <button
              onClick={() => onOpenLegal('terms')}
              className="hover:text-[#D8B683] transition-colors cursor-pointer"
            >
              Terms of Service
            </button>
            <span>·</span>
            <button
              onClick={() => onNavigate('faq')}
              className="hover:text-[#D8B683] transition-colors cursor-pointer"
            >
              FAQ
            </button>
          </div>
        </div>

        {/* Quiet Copyright notice */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#F3F0E7]/40 pt-4 border-t border-[#1E2436]/50">
          <span>© {new Date().getFullYear()} Aurevia Aviation SA. Geneva, Switzerland. All rights reserved.</span>
          <span className="font-light italic mt-1 sm:mt-0">
            Aurevia arranges charter transport as an authorized agent for Part 135 & AOC air carriers.
          </span>
        </div>
      </div>
    </footer>
  );
};
