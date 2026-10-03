import React, { useState } from 'react';
import { MEMBERSHIP_TIERS, MembershipTier } from '../data/aureviaData';
import { JubileeCard3D } from './JubileeCard3D';
import { Check, Shield, Clock, ArrowRight, X } from 'lucide-react';

interface MembershipSectionProps {
  onSelectTier: (tierName: string) => void;
}

export const MembershipSection: React.FC<MembershipSectionProps> = ({ onSelectTier }) => {
  const [activeTierDetail, setActiveTierDetail] = useState<MembershipTier | null>(null);
  const [inviteModalOpen, setInviteModalOpen] = useState(false);
  const [inviteSubmitted, setInviteSubmitted] = useState(false);
  const [inviteForm, setInviteForm] = useState({
    name: '',
    email: '',
    phone: '',
    notes: ''
  });

  const standardTiers = MEMBERSHIP_TIERS.filter((t) => !t.isInviteOnly);

  const handleInviteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setInviteSubmitted(true);
  };

  return (
    <section id="membership" className="py-24 bg-[#12141C] relative border-b border-[#1E2436]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="scroll-reveal-subtle reveal-delay-75 flex items-center gap-3 text-xs tracking-[0.25em] text-[#D8B683] uppercase font-medium mb-3">
            <span className="w-8 h-[1px] bg-[#B68A4E]/60 inline-block" />
            <span>The Aurevia Register</span>
          </div>
          <h2 className="scroll-reveal-header reveal-delay-150 font-display text-3xl sm:text-4xl lg:text-5xl text-[#F3F0E7] font-normal tracking-tight">
            Elevated membership. Built on guaranteed access.
          </h2>
          <p className="scroll-reveal reveal-delay-200 text-sm sm:text-base text-[#F3F0E7]/70 mt-3 font-light leading-relaxed">
            Unlike fractional ownership models that tie capital to depreciating hulls, an Aurevia membership 
            guarantees immediate access across the global operator network with transparent hourly rates and 
            white-glove lifestyle management.
          </p>
        </div>

        {/* DISTINCT JUBILEE BLACK CARD HERO MOMENT */}
        <div className="scroll-reveal reveal-delay-250">
          <JubileeCard3D onRequestInvite={() => setInviteModalOpen(true)} />
        </div>

        {/* FOUR STANDARD TIERS COMPARISON */}
        <div className="space-y-8">
          <div className="border-t border-[#1E2436] pt-12 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="scroll-reveal-subtle text-[11px] uppercase tracking-[0.25em] text-[#D8B683] font-medium block">
                Progressive Flight Tiers
              </span>
              <h3 className="scroll-reveal-header reveal-delay-100 font-display text-2xl sm:text-3xl text-[#F3F0E7] mt-1">
                Bronze through Diamond
              </h3>
            </div>
            <p className="scroll-reveal reveal-delay-150 text-xs text-[#F3F0E7]/60 max-w-md font-light">
              Structured around flight frequency, guaranteed dispatch windows, and repositioning fee waivers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {standardTiers.map((tier, idx) => (
              <div
                key={tier.id}
                className={`scroll-reveal reveal-delay-${(idx + 1) * 100} bg-[#1E2436]/40 hover:bg-[#1E2436]/70 border border-[#1E2436] hover:border-[#B68A4E]/40 rounded-xl p-6 transition-all duration-300 flex flex-col justify-between`}
              >
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-[#1E2436]">
                    <span className="text-[10px] uppercase tracking-widest text-[#D8B683] font-medium">
                      {tier.eyebrow}
                    </span>
                    <span className="text-[11px] text-[#F3F0E7]/60 font-mono flex items-center gap-1">
                      <Clock className="w-3 h-3 text-[#B68A4E]" />
                      {tier.availabilityWindow}
                    </span>
                  </div>

                  <h4 className="font-display text-2xl text-[#F3F0E7] mt-3">
                    {tier.name}
                  </h4>

                  <p className="text-xs text-[#F3F0E7]/70 mt-2 font-light leading-relaxed min-h-[48px]">
                    {tier.description}
                  </p>

                  <div className="mt-6 space-y-2.5">
                    {tier.features.map((feature, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-[#F3F0E7]/80">
                        <Check className="w-3.5 h-3.5 text-[#B68A4E] shrink-0 mt-0.5" />
                        <span className="font-light">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-8">
                  <button
                    onClick={() => onSelectTier(tier.name)}
                    className="w-full py-3 btn-glass-liquid hover:border-[#B68A4E]/60 text-[#F3F0E7] hover:text-[#D8B683] text-xs uppercase tracking-wider font-medium rounded-lg cursor-pointer shadow-md transition-all"
                  >
                    Select {tier.name} Tier
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Jubilee Private Invitation Modal */}
      {inviteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0A0A0A]/85 backdrop-blur-md">
          <div className="relative w-full max-w-lg bg-[#12141C] border border-[#B68A4E]/50 rounded-2xl p-6 sm:p-8 shadow-2xl">
            <button
              onClick={() => {
                setInviteModalOpen(false);
                setInviteSubmitted(false);
              }}
              className="absolute top-4 right-4 p-2 rounded-full btn-glass-liquid text-[#F3F0E7] cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {inviteSubmitted ? (
              <div className="text-center py-8 space-y-4">
                <div className="w-12 h-12 mx-auto rounded-full bg-[#B68A4E]/20 border border-[#B68A4E] flex items-center justify-center">
                  <Shield className="w-6 h-6 text-[#D8B683]" />
                </div>
                <h3 className="font-display text-2xl text-[#F3F0E7]">
                  Dossier Received
                </h3>
                <p className="text-xs sm:text-sm text-[#F3F0E7]/70 font-light leading-relaxed max-w-sm mx-auto">
                  Your confidential inquiry has been routed directly to the Managing Partner in Malta. An executive liaison will initiate discreet contact within two business hours.
                </p>
                <button
                  onClick={() => {
                    setInviteModalOpen(false);
                    setInviteSubmitted(false);
                  }}
                  className="px-7 py-3 btn-glass-liquid-brass text-xs uppercase tracking-wider font-medium rounded-lg cursor-pointer"
                >
                  Return to Overview
                </button>
              </div>
            ) : (
              <form onSubmit={handleInviteSubmit} className="space-y-4">
                <div>
                  <span className="text-[10px] tracking-[0.25em] uppercase text-[#D8B683] font-medium block">
                    Confidential Registry
                  </span>
                  <h3 className="font-display text-2xl text-[#F3F0E7] mt-1">
                    Request Jubilee Invitation
                  </h3>
                  <p className="text-xs text-[#F3F0E7]/70 mt-1 font-light">
                    Membership is strictly capped to protect zero-notice availability invariants for current principals.
                  </p>
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-[#F3F0E7]/60 mb-1">
                    Full Name & Title
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Lord / Ambassador / Dr. / Ms."
                    value={inviteForm.name}
                    onChange={(e) => setInviteForm({ ...inviteForm, name: e.target.value })}
                    className="w-full bg-[#1E2436] border border-[#1E2436] focus:border-[#B68A4E] rounded py-2 px-3 text-xs text-[#F3F0E7] outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-[#F3F0E7]/60 mb-1">
                      Direct Email
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="principal@office.com"
                      value={inviteForm.email}
                      onChange={(e) => setInviteForm({ ...inviteForm, email: e.target.value })}
                      className="w-full bg-[#1E2436] border border-[#1E2436] focus:border-[#B68A4E] rounded py-2 px-3 text-xs text-[#F3F0E7] outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-[#F3F0E7]/60 mb-1">
                      Direct Phone / Signal
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+41 22 000 0000"
                      value={inviteForm.phone}
                      onChange={(e) => setInviteForm({ ...inviteForm, phone: e.target.value })}
                      className="w-full bg-[#1E2436] border border-[#1E2436] focus:border-[#B68A4E] rounded py-2 px-3 text-xs text-[#F3F0E7] outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-[#F3F0E7]/60 mb-1">
                    Flight Profile / Primary Corridors
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Typical annual flight hours, core international city pairs, or specific security requirements..."
                    value={inviteForm.notes}
                    onChange={(e) => setInviteForm({ ...inviteForm, notes: e.target.value })}
                    className="w-full bg-[#1E2436] border border-[#1E2436] focus:border-[#B68A4E] rounded py-2 px-3 text-xs text-[#F3F0E7] outline-none resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 btn-glass-liquid-brass font-medium text-xs tracking-wider uppercase rounded-lg cursor-pointer shadow-lg"
                >
                  Submit Dossier to Managing Partner
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
