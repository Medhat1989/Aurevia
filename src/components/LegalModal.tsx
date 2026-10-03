import React, { useState } from 'react';
import { X, ShieldCheck, FileText } from 'lucide-react';
import { BRAND } from '../data/aureviaData';

interface LegalModalProps {
  initialTab?: 'privacy' | 'terms';
  onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({
  initialTab = 'privacy',
  onClose
}) => {
  const [activeTab, setActiveTab] = useState<'privacy' | 'terms'>(initialTab);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#0A0A0A]/90 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-[#12141C] border border-[#B68A4E]/30 rounded-2xl shadow-2xl my-8 overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="p-6 bg-[#1E2436] border-b border-[#1E2436] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#12141C] rounded border border-[#B68A4E]/40 text-[#B68A4E]">
              {activeTab === 'privacy' ? <ShieldCheck className="w-5 h-5" /> : <FileText className="w-5 h-5" />}
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#D8B683] font-medium block">
                Compliance & Governance
              </span>
              <h3 className="font-display text-xl text-[#F3F0E7]">
                {activeTab === 'privacy' ? 'Privacy Policy & Data Protection' : 'Terms of Service & Charter Conditions'}
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2.5 rounded-full btn-glass-liquid text-[#F3F0E7] cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switcher */}
        <div className="flex border-b border-[#1E2436] bg-[#12141C] px-6 gap-2 pt-2">
          <button
            onClick={() => setActiveTab('privacy')}
            className={`py-2.5 px-4 text-xs uppercase tracking-wider font-medium cursor-pointer rounded-t-lg transition-all ${
              activeTab === 'privacy'
                ? 'btn-glass-liquid-brass text-[#F3F0E7]'
                : 'btn-glass-liquid text-[#F3F0E7]/60 hover:text-[#F3F0E7]'
            }`}
          >
            Privacy Policy (GDPR / FADP)
          </button>
          <button
            onClick={() => setActiveTab('terms')}
            className={`py-2.5 px-4 text-xs uppercase tracking-wider font-medium cursor-pointer rounded-t-lg transition-all ${
              activeTab === 'terms'
                ? 'btn-glass-liquid-brass text-[#F3F0E7]'
                : 'btn-glass-liquid text-[#F3F0E7]/60 hover:text-[#F3F0E7]'
            }`}
          >
            Terms of Charter & Liability
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-xs sm:text-sm text-[#F3F0E7]/80 font-light leading-relaxed">
          {activeTab === 'privacy' ? (
            <div className="space-y-4">
              <p className="text-xs text-[#F3F0E7]/60">
                Effective Date: October 2026 · Registered Entity: Aurevia Aviation Ltd, Valletta, Malta.
              </p>

              <h4 className="font-display text-base text-[#F3F0E7] font-medium pt-2">
                1. Sovereign Data Protection Commitment
              </h4>
              <p>
                Aurevia Aviation operates under the Malta Data Protection Act (Cap. 586) and the General Data 
                Protection Regulation (GDPR - Regulation EU 2016/679). As an aviation concierge handling high-profile 
                principals, we recognize that privacy is a core security invariant.
              </p>

              <h4 className="font-display text-base text-[#F3F0E7] font-medium pt-2">
                2. Information Collected
              </h4>
              <p>
                We only collect data strictly necessary to execute flight manifests, customs clearances, security protocols, 
                and concierge bookings: passenger legal names, passport details, departure/arrival timestamps, dietary 
                specifications, and direct contact numbers.
              </p>

              <h4 className="font-display text-base text-[#F3F0E7] font-medium pt-2">
                3. AI Assistant & Automated Interactions
              </h4>
              <p>
                Our AI Flight Concierge processes inquiries solely to match aircraft specifications and routing feasibility. 
                Chat transcripts are not sold, transmitted to public third-party model training datasets, or publicized.
              </p>

              <h4 className="font-display text-base text-[#F3F0E7] font-medium pt-2">
                4. Confidentiality of Manifests
              </h4>
              <p>
                Flight manifests are transmitted exclusively to certified ground handlers, customs border authorities, 
                and operating flight crews under encrypted transport protocols. No client tail tracking data is released to commercial tracking aggregators where non-disclosure has been formally requested.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-xs text-[#F3F0E7]/60">
                Effective Date: October 2026 · Governing Law: Republic of Malta.
              </p>

              <h4 className="font-display text-base text-[#F3F0E7] font-medium pt-2">
                1. Charter Operational Structure
              </h4>
              <p>
                Aurevia Aviation acts as an authorized charter broker and executive aviation manager on behalf of clients. 
                Flights are performed by licensed air carriers holding valid Air Operator Certificates (AOC) in compliance 
                with EASA, FAA Part 135/121, or equivalent civil aviation authorities.
              </p>

              <h4 className="font-display text-base text-[#F3F0E7] font-medium pt-2">
                2. Price Guarantee & Inclusions
              </h4>
              <p>
                All confirmed quotes include the aircraft hull charter, two-pilot crew, fuel at standard rates, landing 
                fees, and VIP passenger handling. Extraordinary winter de-icing charges and special diplomatic clearances 
                will be communicated immediately and billed at direct operator cost without hidden brokerage markups.
              </p>

              <h4 className="font-display text-base text-[#F3F0E7] font-medium pt-2">
                3. Cancellation & Force Majeure
              </h4>
              <p>
                Standard cancellation policies permit cancellation up to 72 hours prior to scheduled departure for a full 
                credit, subject to operator contract specifics. For Gold, Diamond, and Jubilee members, enhanced flexible cancellation windows apply as specified in their membership bylaws.
              </p>

              <h4 className="font-display text-base text-[#F3F0E7] font-medium pt-2">
                4. Safety Oversight & Weather Diversions
              </h4>
              <p>
                The Pilot-in-Command maintains absolute legal authority regarding flight safety and adverse weather diversions. 
                In the event of an unavoidable weather hold, Aurevia automatically coordinates alternate airfield access or backup operator activation.
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#1E2436] border-t border-[#1E2436] flex items-center justify-between text-xs text-[#F3F0E7]/60">
          <span>Questions regarding compliance: legal@aurevia-aviation.com</span>
          <button
            onClick={onClose}
            className="px-6 py-2.5 btn-glass-liquid-brass text-[#F3F0E7] font-medium text-xs uppercase tracking-wider rounded-lg cursor-pointer shadow-md"
          >
            Acknowledge & Close
          </button>
        </div>
      </div>
    </div>
  );
};
