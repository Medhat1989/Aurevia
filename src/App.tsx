import React, { useState } from 'react';
import { Navigation } from './components/Navigation';
import { HeroSection } from './components/HeroSection';
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
import { AiConciergeWidget } from './components/AiConciergeWidget';
import { LegalModal } from './components/LegalModal';
import { CookieConsent } from './components/CookieConsent';
import { VideoMotionBackground } from './components/VideoMotionBackground';
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
    <div className="min-h-screen bg-[#12141C] text-[#F3F0E7] selection:bg-[#B68A4E]/30 selection:text-[#F3F0E7] relative">
      {/* Cinematic Video Motion Background (Parallax & Velocity Linked to Scroll) */}
      <VideoMotionBackground />

      {/* Top Bar Navigation */}
      <Navigation
        currentSection={currentSection}
        onNavigate={scrollToSection}
        onRequestQuote={handleRequestQuote}
      />

      {/* Main Content Sections */}
      <main>
        {/* 1. Hero with Itinerary Estimator */}
        <HeroSection
          onRequestQuote={() => handleRequestQuote('Jet Charter')}
          onViewFleet={() => scrollToSection('fleet')}
          onConfigureCharter={handleConfigureCharter}
        />

        {/* 2. Positioning & How It Works Teasers */}
        <HomeIntroSection
          onNavigate={scrollToSection}
          onRequestQuote={handleRequestQuote}
        />

        {/* 3. Fleet Page Section with Spec Modals */}
        <FleetSection onCharterAircraft={handleCharterAircraft} />

        {/* 4. Membership with Distinct Jubilee Black Card 3D Tilt */}
        <MembershipSection onSelectTier={handleSelectTier} />

        {/* 5. Concierge Services (Security, Hotels, Yachts, Villas, Helicopters, Cars) */}
        <ConciergeSection onRequestService={(type) => handleRequestQuote(type)} />

        {/* 6. Special Missions (Serious tone: NGO, Medevac, Government) */}
        <SpecialMissionsSection onRequestMission={(missionType) => handleRequestQuote(missionType)} />

        {/* 7. The Journal Magazine & In-App Headless CMS */}
        <JournalSection />

        {/* 8. About Section with Live Multi-Region Operations Hub Clocks */}
        <AboutSection />

        {/* 9. FAQ Section */}
        <FAQSection />

        {/* 10. Contact / Request a Quote Form */}
        <ContactQuoteSection
          initialServiceType={quotePrefill.serviceType}
          initialOrigin={quotePrefill.origin}
          initialDestination={quotePrefill.destination}
          initialDate={quotePrefill.date}
          initialPassengers={quotePrefill.passengers}
          initialAircraft={quotePrefill.preferredAircraft}
        />
      </main>

      {/* Footer */}
      <Footer
        onNavigate={scrollToSection}
        onRequestQuote={handleRequestQuote}
        onOpenLegal={handleOpenLegal}
      />

      {/* Site-Wide AI Flight Concierge (Bottom Corner Widget) */}
      <AiConciergeWidget
        onOpenQuoteWithDetails={({ origin, destination, serviceType }) => {
          setQuotePrefill((prev) => ({
            ...prev,
            origin: origin || prev.origin,
            destination: destination || prev.destination,
            serviceType: serviceType || prev.serviceType
          }));
          scrollToSection('contact');
        }}
      />

      {/* GDPR Cookie Consent */}
      <CookieConsent onOpenPrivacy={() => handleOpenLegal('privacy')} />

      {/* Legal Dialog (Privacy / Terms) */}
      {legalModalOpen && (
        <LegalModal
          initialTab={legalTab}
          onClose={() => setLegalModalOpen(false)}
        />
      )}
    </div>
  );
}
