import React, { useState, useEffect } from 'react';
import { BRAND } from '../data/aureviaData';
import { Clock, Phone, MessageSquare, Send, CheckCircle2, ShieldCheck, ArrowRight, Plane, MapPin } from 'lucide-react';

interface ContactQuoteSectionProps {
  initialServiceType?: string;
  initialOrigin?: string;
  initialDestination?: string;
  initialDate?: string;
  initialPassengers?: number;
  initialAircraft?: string;
}

export const ContactQuoteSection: React.FC<ContactQuoteSectionProps> = ({
  initialServiceType = 'Jet Charter',
  initialOrigin = '',
  initialDestination = '',
  initialDate = '',
  initialPassengers = 4,
  initialAircraft = ''
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    departure: initialOrigin || '',
    destination: initialDestination || '',
    date: initialDate || '',
    time: '10:00',
    returnDate: '',
    passengers: initialPassengers || 4,
    serviceType: initialServiceType || 'Jet Charter',
    preferredAircraft: initialAircraft || '',
    isUrgentSameDay: false,
    message: ''
  });

  const [submittedReference, setSubmittedReference] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (initialServiceType) {
      setFormData((prev) => ({ ...prev, serviceType: initialServiceType }));
    }
  }, [initialServiceType]);

  useEffect(() => {
    if (initialOrigin || initialDestination) {
      setFormData((prev) => ({
        ...prev,
        departure: initialOrigin || prev.departure,
        destination: initialDestination || prev.destination,
        date: initialDate || prev.date,
        passengers: initialPassengers || prev.passengers,
        preferredAircraft: initialAircraft || prev.preferredAircraft
      }));
    }
  }, [initialOrigin, initialDestination, initialDate, initialPassengers, initialAircraft]);

  const serviceOptions = [
    'Jet Charter',
    'Helicopter',
    'Yacht',
    'Villa',
    'Car Service',
    'Security',
    'Medevac',
    'Government',
    'Other'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const refCode = `AV-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

    try {
      // Send to server API if available
      await fetch('/api/quotes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, reference: refCode })
      }).catch(() => {});
    } catch {
      // proceed gracefully
    }

    setTimeout(() => {
      setSubmitting(false);
      setSubmittedReference(refCode);
    }, 600);
  };

  const handleReset = () => {
    setSubmittedReference(null);
    setFormData({
      name: '',
      email: '',
      phone: '',
      departure: '',
      destination: '',
      date: '',
      time: '10:00',
      returnDate: '',
      passengers: 4,
      serviceType: 'Jet Charter',
      preferredAircraft: '',
      isUrgentSameDay: false,
      message: ''
    });
  };

  return (
    <section id="contact" className="py-24 bg-[#12141C]/80 backdrop-blur-md relative border-b border-[#1E2436]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="scroll-reveal-subtle reveal-delay-75 flex items-center gap-3 text-xs tracking-[0.25em] text-[#D8B683] uppercase font-medium mb-3">
            <span className="w-8 h-[1px] bg-[#B68A4E]/60 inline-block" />
            <span>Flight Desk & Concierge Dispatch</span>
          </div>
          <h2 className="scroll-reveal-header reveal-delay-150 font-display text-3xl sm:text-4xl lg:text-5xl text-[#F3F0E7] font-normal tracking-tight">
            Tell us where you’re headed.
          </h2>
          <p className="scroll-reveal reveal-delay-200 text-sm sm:text-base text-[#F3F0E7]/70 mt-3 font-light leading-relaxed">
            Every itinerary is built from scratch by senior dispatchers at our Maltese headquarters. 
            Options returned within 60 minutes with transparent, all-inclusive pricing.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Form Container */}
          <div className="scroll-reveal reveal-delay-250 lg:col-span-8 bg-[#1E2436]/40 border border-[#1E2436] rounded-2xl p-6 sm:p-10 shadow-2xl">
            {submittedReference ? (
              <div className="py-12 text-center space-y-6 animate-fade-in">
                <div className="w-16 h-16 mx-auto rounded-full bg-[#B68A4E]/20 border border-[#B68A4E] flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8 text-[#D8B683]" />
                </div>

                <div className="space-y-2">
                  <span className="text-[10px] uppercase tracking-[0.25em] text-[#D8B683] font-medium block">
                    Itinerary Docket Transmitted
                  </span>
                  <h3 className="font-display text-3xl text-[#F3F0E7]">
                    Charter Dossier Confirmed
                  </h3>
                  <p className="font-mono text-sm text-[#B68A4E] bg-[#12141C] inline-block py-1 px-4 rounded border border-[#1E2436]">
                    Reference: {submittedReference}
                  </p>
                </div>

                <p className="text-xs sm:text-sm text-[#F3F0E7]/70 font-light max-w-md mx-auto leading-relaxed">
                  Our duty flight coordinator is currently reviewing operator availability, airport slots, 
                  and customs requirements for your route. You will receive tailored aircraft options with fixed pricing within 60 minutes.
                </p>

                <div className="pt-4 flex flex-wrap justify-center gap-4">
                  <a
                    href={`https://wa.me/35677302834?text=Hello%20Aurevia,%20referencing%20dossier%20${submittedReference}.`}
                    target="_blank"
                    rel="noreferrer"
                    className="px-6 py-3 btn-glass-liquid text-[#F3F0E7] rounded-lg text-xs uppercase tracking-wider font-medium inline-flex items-center gap-2 shadow-sm"
                  >
                    <MessageSquare className="w-4 h-4 text-[#D8B683]" />
                    <span>Track on WhatsApp</span>
                  </a>

                  <button
                    onClick={handleReset}
                    className="px-6 py-3 btn-glass-liquid-brass rounded-lg text-xs uppercase tracking-wider font-medium transition-colors cursor-pointer shadow-lg"
                  >
                    Submit Another Route
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Urgent Same-Day Banner Checkbox */}
                <div className="p-3.5 rounded-lg bg-[#12141C] border border-[#B68A4E]/30 flex items-center justify-between">
                  <label className="flex items-center gap-3 cursor-pointer text-xs text-[#F3F0E7]">
                    <input
                      type="checkbox"
                      checked={formData.isUrgentSameDay}
                      onChange={(e) => setFormData({ ...formData, isUrgentSameDay: e.target.checked })}
                      className="w-4 h-4 accent-[#B68A4E] rounded cursor-pointer"
                    />
                    <span className="font-medium text-[#D8B683]">
                      Urgent Same-Day Dispatch (Wheels up within 2 hours)
                    </span>
                  </label>
                  <span className="text-[10px] uppercase tracking-wider text-[#F3F0E7]/50 font-mono hidden sm:inline">
                    Priority Queue
                  </span>
                </div>

                {/* Personal Details */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-[#F3F0E7]/60 mb-1.5 font-medium">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Principal or Office Manager"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-[#12141C] border border-[#1E2436] focus:border-[#B68A4E] rounded-lg py-2.5 px-3 text-xs text-[#F3F0E7] placeholder-[#F3F0E7]/30 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-[#F3F0E7]/60 mb-1.5 font-medium">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="dispatch@office.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-[#12141C] border border-[#1E2436] focus:border-[#B68A4E] rounded-lg py-2.5 px-3 text-xs text-[#F3F0E7] placeholder-[#F3F0E7]/30 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-[#F3F0E7]/60 mb-1.5 font-medium">
                      Direct Phone / Mobile *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+356 7730 2834"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-[#12141C] border border-[#1E2436] focus:border-[#B68A4E] rounded-lg py-2.5 px-3 text-xs text-[#F3F0E7] placeholder-[#F3F0E7]/30 outline-none"
                    />
                  </div>
                </div>

                {/* Route: Origin & Destination */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-[#F3F0E7]/60 mb-1.5 font-medium">
                      Departure City / Airport *
                    </label>
                    <div className="relative">
                      <MapPin className="w-3.5 h-3.5 text-[#B68A4E] absolute left-3 top-3 pointer-events-none" />
                      <input
                        type="text"
                        required
                        placeholder="e.g. Malta Luqa (LMML)"
                        value={formData.departure}
                        onChange={(e) => setFormData({ ...formData, departure: e.target.value })}
                        className="w-full bg-[#12141C] border border-[#1E2436] focus:border-[#B68A4E] rounded-lg py-2.5 pl-9 pr-3 text-xs text-[#F3F0E7] placeholder-[#F3F0E7]/30 outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-[#F3F0E7]/60 mb-1.5 font-medium">
                      Destination City / Airport *
                    </label>
                    <div className="relative">
                      <MapPin className="w-3.5 h-3.5 text-[#B68A4E] absolute left-3 top-3 pointer-events-none" />
                      <input
                        type="text"
                        required
                        placeholder="e.g. Nice Côte d'Azur (LFMN) or Zurich (LSZH)"
                        value={formData.destination}
                        onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                        className="w-full bg-[#12141C] border border-[#1E2436] focus:border-[#B68A4E] rounded-lg py-2.5 pl-9 pr-3 text-xs text-[#F3F0E7] placeholder-[#F3F0E7]/30 outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Timing & Passengers */}
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-[#F3F0E7]/60 mb-1.5 font-medium">
                      Departure Date *
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full bg-[#12141C] border border-[#1E2436] focus:border-[#B68A4E] rounded-lg py-2.5 px-3 text-xs text-[#F3F0E7] outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-[#F3F0E7]/60 mb-1.5 font-medium">
                      Target Time (Local)
                    </label>
                    <input
                      type="time"
                      value={formData.time}
                      onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                      className="w-full bg-[#12141C] border border-[#1E2436] focus:border-[#B68A4E] rounded-lg py-2.5 px-3 text-xs text-[#F3F0E7] outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-[#F3F0E7]/60 mb-1.5 font-medium">
                      Return Date (Optional)
                    </label>
                    <input
                      type="date"
                      value={formData.returnDate}
                      onChange={(e) => setFormData({ ...formData, returnDate: e.target.value })}
                      className="w-full bg-[#12141C] border border-[#1E2436] focus:border-[#B68A4E] rounded-lg py-2.5 px-3 text-xs text-[#F3F0E7] outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-[#F3F0E7]/60 mb-1.5 font-medium">
                      Passenger Count
                    </label>
                    <select
                      value={formData.passengers}
                      onChange={(e) => setFormData({ ...formData, passengers: Number(e.target.value) })}
                      className="w-full bg-[#12141C] border border-[#1E2436] focus:border-[#B68A4E] rounded-lg py-2.5 px-3 text-xs text-[#F3F0E7] outline-none cursor-pointer"
                    >
                      {[1, 2, 4, 6, 8, 10, 12, 14, 16, 20].map((num) => (
                        <option key={num} value={num}>
                          {num} {num === 1 ? 'Passenger' : 'Passengers'}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Service Type & Preferred Aircraft */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-[#F3F0E7]/60 mb-1.5 font-medium">
                      Service Classification *
                    </label>
                    <select
                      value={formData.serviceType}
                      onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                      className="w-full bg-[#12141C] border border-[#1E2436] focus:border-[#B68A4E] rounded-lg py-2.5 px-3 text-xs text-[#F3F0E7] outline-none cursor-pointer"
                    >
                      {serviceOptions.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-[#F3F0E7]/60 mb-1.5 font-medium">
                      Preferred Aircraft / Equipment (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Bombardier Global 7500 or Light Jet"
                      value={formData.preferredAircraft}
                      onChange={(e) => setFormData({ ...formData, preferredAircraft: e.target.value })}
                      className="w-full bg-[#12141C] border border-[#1E2436] focus:border-[#B68A4E] rounded-lg py-2.5 px-3 text-xs text-[#F3F0E7] placeholder-[#F3F0E7]/30 outline-none"
                    />
                  </div>
                </div>

                {/* Additional Instructions / Manifest Notes */}
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-[#F3F0E7]/60 mb-1.5 font-medium">
                    Special In-Flight Requirements & Concierge Notes
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Specific dietary catering, onboard pets, customs pre-clearance, ground security escort, or onward yacht transfer..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-[#12141C] border border-[#1E2436] focus:border-[#B68A4E] rounded-lg py-2.5 px-3 text-xs text-[#F3F0E7] placeholder-[#F3F0E7]/30 outline-none resize-none"
                  />
                </div>

                {/* Submission CTA */}
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-2 text-xs text-[#F3F0E7]/60">
                    <Clock className="w-4 h-4 text-[#B68A4E]" />
                    <span>Response Commitment: Guaranteed quote within 60 minutes</span>
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full sm:w-auto px-8 py-3.5 btn-glass-liquid-brass disabled:opacity-50 font-medium text-xs tracking-wider uppercase rounded-lg cursor-pointer inline-flex items-center justify-center gap-2 shadow-xl"
                  >
                    <span>{submitting ? 'Transmitting Itinerary...' : 'Request Binding Quote'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Right Direct Communications & Hubs Information */}
          <div className="lg:col-span-4 space-y-6">
            {/* Urgent Direct Contact */}
            <div className="p-6 rounded-2xl bg-[#1E2436]/40 border border-[#1E2436] space-y-4">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#D8B683] font-medium block">
                Immediate Dispatch
              </span>
              <h4 className="font-display text-xl text-[#F3F0E7]">
                Prefer Direct Voice or Signal?
              </h4>
              <p className="text-xs text-[#F3F0E7]/70 font-light leading-relaxed">
                For urgent departures within 12 hours or medical air ambulance coordination, contact the duty flight coordinator directly:
              </p>

              <div className="space-y-3 pt-2">
                <a
                  href={`tel:${BRAND.phone}`}
                  className="flex items-center gap-3 p-3.5 rounded-xl btn-glass-liquid hover:border-[#D8B683]/50 transition-all shadow-md group cursor-pointer"
                >
                  <Phone className="w-4 h-4 text-[#D8B683] shrink-0" />
                  <div>
                    <span className="text-[9px] uppercase tracking-wider text-[#F3F0E7]/60 block font-medium">Direct Telephone</span>
                    <span className="font-mono text-xs sm:text-sm text-[#F3F0E7] font-semibold">{BRAND.phoneDisplay}</span>
                  </div>
                </a>

                <a
                  href={BRAND.whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 p-3.5 rounded-xl btn-glass-liquid-emerald hover:border-emerald-400/60 transition-all shadow-md group cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4 text-emerald-200 shrink-0" />
                  <div>
                    <span className="text-[9px] uppercase tracking-wider text-emerald-100/70 block font-medium">WhatsApp Priority</span>
                    <span className="text-xs text-white font-medium">Instant encrypted chat</span>
                  </div>
                </a>
              </div>
            </div>

            {/* Response Commitment & Privacy Guarantees */}
            <div className="p-6 rounded-2xl bg-[#1E2436]/20 border border-[#1E2436] space-y-3 text-xs text-[#F3F0E7]/75 font-light">
              <div className="flex items-center gap-2 text-[#D8B683] font-medium">
                <ShieldCheck className="w-4 h-4" />
                <span className="uppercase tracking-wider text-[11px]">Manifest Confidentiality</span>
              </div>
              <p>
                Passenger manifests and travel itineraries are protected under strict Maltese and EU data banking privacy standards. 
                We never publicize client identities or tail numbers.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
