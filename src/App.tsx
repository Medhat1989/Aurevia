import React, { useState } from 'react';
import { Navigation } from './components/Navigation';
import { HeroSection } from './components/HeroSection';
import { QuickQuoteEstimator } from './components/QuickQuoteEstimator';
import { HomeIntroSection } from './components/HomeIntroSection';
import { FleetSection } from './components/FleetSection';
import { MembershipSection } from './components/MembershipSection';
import { ConciergeSection } from './components/ConciergeSection';
import { SpecialMissionsSection } from './components/SpecialMissionsSection';
import { JournalSection } from './components/JournalSection';
import { AboutSection } from './components/AboutSection';
import { FAQSection } from './components/FAQSection';
import { ContactQuoteSection } from './components/ContactQuoteSection';
import { Footer } from './components/Footer';
import { LegalModal } from './components/LegalModal';
import { CookieConsent } from './components/CookieConsent';
import { VideoMotionBackground } from './components/VideoMotionBackground';
import { SmartphoneEnclosure } from './components/SmartphoneEnclosure';
import { useScrollRevealObserver } from './hooks/useScrollRevealObserver';

export default function App() {
  useScrollRevealObserver();
  const [currentSection, setCurrentSection] = useState('home');
  const [legalModalOpen, setLegalModalOpen] = useState(false);
  const [legalTab, setLegalTab] = useState<'privacy' | 'terms'>('privacy');

  // Preloaded booking/quote state passed into ContactQuoteSection
  const [quotePrefill, setQuotePrefill] = useState<{
    serviceType: string;
    origin?: string;
    destination?: string;
    date?: string;
    passengers?: number;
    preferredAircraft?: string;
  }>({
    serviceType: 'Jet Charter'
  });

  const scrollToSection = (sectionId: string) => {
    setCurrentSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleRequestQuote = (serviceType: string = 'Jet Charter') => {
    setQuotePrefill((prev) => ({
      ...prev,
      serviceType
    }));
    scrollToSection('contact');
  };

  const handleCharterAircraft = (aircraftName: string) => {
    setQuotePrefill((prev) => ({
      ...prev,
      serviceType: 'Jet Charter',
      preferredAircraft: aircraftName
    }));
    scrollToSection('contact');
  };

  const handleSelectTier = (tierName: string) => {
    setQuotePrefill((prev) => ({
      ...prev,
      serviceType: 'Jet Charter',
      preferredAircraft: `Membership Inquiry: ${tierName} Tier`
    }));
    scrollToSection('contact');
  };

  const handleConfigureCharter = (details: {
    origin: string;
    destination: string;
    date: string;
    passengers: number;
    recommendedClass: string;
  }) => {
    setQuotePrefill({
      serviceType: 'Jet Charter',
      origin: details.origin,
      destination: details.destination,
      date: details.date,
      passengers: details.passengers,
      preferredAircraft: details.recommendedClass
    });
    scrollToSection('contact');
  };

  const handleOpenLegal = (tab: 'privacy' | 'terms') => {
    setLegalTab(tab);
    setLegalModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#08090C] text-[#F3F0E7] selection:bg-[#B68A4E]/30 selection:text-[#F3F0E7] relative">
      {/* Background Ambience */}
      <VideoMotionBackground />

      {/* Flagship 9:16 Smartphone Showcase Enclosure */}
      <SmartphoneEnclosure>
        {/* Top Sticky Navigation with AEROLIGHT brand & hamburger icon */}
        <Navigation
          currentSection={currentSection}
          onNavigate={scrollToSection}
          onRequestQuote={handleRequestQuote}
        />

        {/* Main Content Sections inside the 9:16 mobile canvas */}
        <main className="w-full flex flex-col">
          {/* 1. Hero: Ultra-Luxury Mobile Web UI for AUREVIA (9:16 Aspect Ratio) */}
          <HeroSection
            onRequestQuote={() => handleRequestQuote('Jet Charter')}
            onViewFleet={() => scrollToSection('fleet')}
            onConfigureCharter={handleConfigureCharter}
            onNavigateSection={scrollToSection}
          />

          {/* 2. Instant Flight Route Estimator (Directly under the hero dock) */}
          <section id="quick-estimator" className="px-4 py-8 bg-[#0E1017] border-y border-[#1E2436]/60">
            <div className="max-w-xl mx-auto">
              <QuickQuoteEstimator onConfigureCharter={handleConfigureCharter} />
            </div>
          </section>

          {/* 3. Positioning & How It Works Teasers */}
          <HomeIntroSection
            onNavigate={scrollToSection}
            onRequestQuote={handleRequestQuote}
          />

          {/* 4. Fleet Page Section with Spec Modals */}
          <FleetSection onCharterAircraft={handleCharterAircraft} />

          {/* 5. Membership with Distinct Jubilee Black Card 3D Tilt */}
          <MembershipSection onSelectTier={handleSelectTier} />

          {/* 6. Concierge Services (Security, Hotels, Yachts, Villas, Helicopters, Cars) */}
          <ConciergeSection onRequestService={(type) => handleRequestQuote(type)} />

          {/* 7. Special Missions (Serious tone: NGO, Medevac, Government) */}
          <SpecialMissionsSection onRequestMission={(missionType) => handleRequestQuote(missionType)} />

          {/* 8. The Journal Magazine & In-App Headless CMS */}
          <JournalSection />

          {/* 9. About Section with Live Multi-Region Operations Hub Clocks */}
          <AboutSection />

          {/* 10. FAQ Section */}
          <FAQSection />

          {/* 11. Contact / Request a Quote Form */}
          <ContactQuoteSection
            initialServiceType={quotePrefill.serviceType}
            initialOrigin={quotePrefill.origin}
            initialDestination={quotePrefill.destination}
            initialDate={quotePrefill.date}
            initialPassengers={quotePrefill.passengers}
            initialAircraft={quotePrefill.preferredAircraft}
          />

          {/* 12. Footer */}
          <Footer
            onNavigate={scrollToSection}
            onRequestQuote={handleRequestQuote}
            onOpenLegal={handleOpenLegal}
          />
        </main>

        {/* GDPR Cookie Consent */}
        <CookieConsent onOpenPrivacy={() => handleOpenLegal('privacy')} />

        {/* Legal Dialog (Privacy / Terms) */}
        {legalModalOpen && (
          <LegalModal
            initialTab={legalTab}
            onClose={() => setLegalModalOpen(false)}
          />
        )}
      </SmartphoneEnclosure>
    </div>
  );
}
