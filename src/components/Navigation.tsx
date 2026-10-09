import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, MessageSquare } from 'lucide-react';
import { BRAND } from '../data/aureviaData';
import { MobileNavDrawer } from './MobileNavDrawer';
import heroLogoImg from '../assets/images/aurevia_hero_logo.png';

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
      setIsScrolled(window.scrollY > 80);
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
    { id: 'about', label: 'Valletta Desk' }
  ];

  const handleLinkClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Sleek Minimalist Top Navigation */}
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'opacity-100 pointer-events-auto bg-[#0E1017]/90 backdrop-blur-xl border-b border-[#D8B683]/20 py-3 shadow-[0_4px_25px_rgba(0,0,0,0.8)]'
            : 'opacity-0 pointer-events-none py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Top Bar Left: Brand Logo */}
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick('home');
              }}
              className="flex items-center gap-2 cursor-pointer group focus-visible:outline-none"
            >
              <img
                src={heroLogoImg}
                alt="Aurevia Logo"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = 'https://i.ibb.co/fVPpmNTf/Gemini-Generated-Image-1c30d61c30d61c30-removebg-preview.png';
                }}
                className="h-8 object-contain filter drop-shadow-[0_2px_8px_rgba(216,182,131,0.3)] group-hover:scale-105 transition-transform"
              />
            </a>

            {/* Desktop Nav Links */}
            <nav className="hidden lg:flex items-center gap-7">
              {navLinks.map((link) => {
                const isActive = currentSection === link.id;
                return (
                  <button
                    key={link.id}
                    onClick={() => handleLinkClick(link.id)}
                    className={`text-xs uppercase tracking-[0.18em] transition-colors relative py-1 cursor-pointer font-medium ${
                      isActive
                        ? 'text-[#D8B683]'
                        : 'text-[#F3F0E7]/70 hover:text-[#F3F0E7]'
                    }`}
                  >
                    <span>{link.label}</span>
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#B68A4E]" />
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Top Bar Right: Sleek Actions & Hamburger Menu Icon */}
            <div className="flex items-center gap-2.5 sm:gap-3">
              <button
                onClick={() => onRequestQuote()}
                className="hidden sm:inline-flex px-3.5 py-1.5 rounded-full bg-gradient-to-r from-[#B68A4E]/20 to-[#D8B683]/20 border border-[#D8B683]/40 text-[#D8B683] hover:bg-[#B68A4E] hover:text-[#0E1017] transition-all font-mono text-xs tracking-wider uppercase font-semibold cursor-pointer"
              >
                BOOK NOW
              </button>

              {/* Minimalist Hamburger Menu Icon */}
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex flex-col items-center justify-center gap-1.5 text-[#F3F0E7] hover:border-[#D8B683]/50 hover:text-[#D8B683] transition-all cursor-pointer group shadow-sm"
                aria-label="Open navigation menu"
              >
                <span className="w-4 h-[1.5px] bg-current rounded-full transition-transform" />
                <span className="w-4 h-[1.5px] bg-current rounded-full transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Global Mobile Drawer */}
      <MobileNavDrawer
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        onNavigate={handleLinkClick}
        onRequestQuote={() => {
          setMobileMenuOpen(false);
          onRequestQuote();
        }}
      />
    </>
  );
};
