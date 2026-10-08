import React, { useState, useEffect } from 'react';
import { AureviaLogo } from './AureviaLogo';
import { Menu, X, Phone, MessageSquare } from 'lucide-react';
import { BRAND } from '../data/aureviaData';

interface NavigationProps {
  currentSection: string;
  onNavigate: (sectionId: string) => void;
  onRequestQuote: (serviceType?: string) => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  currentSection,
  onNavigate,
  onRequestQuote
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'fleet', label: 'Aircraft Network' },
    { id: 'membership', label: 'Membership' },
    { id: 'concierge', label: 'Concierge' },
    { id: 'missions', label: 'Special Missions' },
    { id: 'journal', label: 'The Journal' },
    { id: 'about', label: 'About' }
  ];

  const handleLinkClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#12141C]/90 backdrop-blur-md border-b border-[#1E2436] py-3.5'
            : 'bg-transparent border-b border-[#F3F0E7]/10 py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Zone 1: Brand emblem mark */}
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick('home');
              }}
              className="flex items-center cursor-pointer group focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#B68A4E]"
            >
              <AureviaLogo variant="default" size="md" />
            </a>

            {/* Zone 2: 4-6 clean text navigation links */}
            <nav className="hidden lg:flex items-center gap-7">
              {navLinks.map((link) => {
                const isActive = currentSection === link.id;
                return (
                  <button
                    key={link.id}
                    onClick={() => handleLinkClick(link.id)}
                    className={`text-xs uppercase tracking-[0.16em] transition-colors relative py-1 cursor-pointer font-medium ${
                      isActive
                        ? 'text-[#D8B683]'
                        : 'text-[#F3F0E7]/70 hover:text-[#F3F0E7]'
                    }`}
                  >
                    <span>{link.label}</span>
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-[1px] bg-[#B68A4E]" />
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Zone 3: 1-2 primary actions */}
            <div className="flex items-center gap-3 sm:gap-4">
              <a
                href={BRAND.whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="hidden sm:inline-flex items-center gap-1.5 text-xs text-[#F3F0E7]/80 hover:text-[#D8B683] transition-colors tracking-wide py-1.5 px-3 rounded-lg btn-glass-liquid"
                title="Immediate WhatsApp Dispatch"
              >
                <MessageSquare className="w-3.5 h-3.5 text-[#D8B683]" />
                <span className="hidden xl:inline font-medium">Urgent WhatsApp</span>
              </a>

              <a
                href={`tel:${BRAND.phone}`}
                className="hidden md:inline-flex items-center gap-1.5 text-xs text-[#F3F0E7]/90 hover:text-[#D8B683] transition-colors tracking-wide font-mono py-1.5 px-3 rounded-lg btn-glass-liquid"
              >
                <Phone className="w-3.5 h-3.5 text-[#D8B683]" />
                <span>{BRAND.phoneDisplay}</span>
              </a>

              <button
                onClick={() => onRequestQuote()}
                className="px-4 py-2 sm:px-5 sm:py-2.5 btn-glass-liquid-brass font-medium text-xs tracking-wider uppercase rounded-lg cursor-pointer whitespace-nowrap"
              >
                Request a Quote
              </button>

              {/* Mobile menu trigger */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 text-[#F3F0E7]/80 hover:text-[#F3F0E7] focus:outline-none btn-glass-liquid rounded-lg"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#12141C]/95 backdrop-blur-xl pt-24 px-6 flex flex-col justify-between pb-10 lg:hidden">
          <div className="space-y-6">
            <p className="text-[10px] tracking-[0.25em] uppercase text-[#B68A4E] font-medium">
              Navigation Index
            </p>
            <div className="flex flex-col space-y-4">
              {[
                { id: 'home', label: 'Home' },
                ...navLinks,
                { id: 'faq', label: 'FAQ' },
                { id: 'contact', label: 'Contact & Dispatch' }
              ].map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link.id)}
                  className="text-left font-display text-2xl text-[#F3F0E7] hover:text-[#D8B683] transition-colors py-1 cursor-pointer"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-8 border-t border-[#1E2436] space-y-4">
            <div className="flex items-center justify-between text-xs text-[#F3F0E7]/70">
              <span>Operations Dispatch</span>
              <a href={`tel:${BRAND.phone}`} className="text-[#D8B683] font-mono">
                {BRAND.phoneDisplay}
              </a>
            </div>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onRequestQuote();
              }}
              className="w-full py-3.5 btn-glass-liquid-brass font-medium text-xs tracking-wider uppercase rounded-lg text-center cursor-pointer"
            >
              Request a Private Flight Quote
            </button>
          </div>
        </div>
      )}
    </>
  );
};
