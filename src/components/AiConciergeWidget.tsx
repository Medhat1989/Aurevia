import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, PhoneCall, ShieldCheck, Sparkles, User, UserCheck, ArrowUpRight } from 'lucide-react';
import { BRAND, FLEET_DATA, MEMBERSHIP_TIERS } from '../data/aureviaData';

interface Message {
  id: string;
  sender: 'ai' | 'user' | 'system';
  text: string;
  isUrgentEscalation?: boolean;
  timestamp: string;
}

interface AiConciergeWidgetProps {
  onOpenQuoteWithDetails?: (details: { origin?: string; destination?: string; serviceType?: string }) => void;
}

export const AiConciergeWidget: React.FC<AiConciergeWidgetProps> = ({ onOpenQuoteWithDetails }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'ai',
      text: 'Good day. I am the Aurevia Autonomous Flight Concierge. I can assist with aircraft recommendations, verified flight ranges, membership tier comparisons, or configure your charter itinerary. If your request is time-critical or requires medical evacuation, I will connect you immediately to our duty flight director.',
      timestamp: 'Just now'
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const quickPrompts = [
    'Recommend aircraft: Geneva to Dubai',
    'Compare Gold vs Jubilee Black Card',
    'Emergency Medevac launch time?',
    'What is included in charter pricing?'
  ];

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setLoading(true);

    const isUrgent =
      /medevac|emergency|ambulance|hospital|urgent|evac|sos|critical|accident/i.test(query);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: query })
      });

      if (response.ok) {
        const data = await response.json();
        setMessages((prev) => [
          ...prev,
          {
            id: `ai-${Date.now()}`,
            sender: 'ai',
            text: data.reply,
            isUrgentEscalation: data.isUrgentEscalation || isUrgent,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ]);
        setLoading(false);
        return;
      }
    } catch {
      // fallback if server API is unavailable
    }

    // High quality client-side fallback grounded in Aurevia data
    setTimeout(() => {
      let reply = '';
      let escalate = isUrgent;

      if (isUrgent) {
        reply =
          'CRITICAL NOTICE: For emergency medical evacuation or urgent life-critical transport, our aeromedical operations desk in Geneva is on active standby with wheels-up readiness within 60 minutes. Please bypass automated chat and call our 24/7 priority line directly or initiate encrypted WhatsApp dispatch.';
        escalate = true;
      } else if (/geneva.*dubai|dubai.*geneva/i.test(query)) {
        reply =
          'Geneva (LSGG) to Dubai (DWC) is approximately 2,680 nautical miles (~5h 40m). For this corridor, we recommend a Midsize Jet (such as the Praetor 500, up to 8 passengers) or a Super-Midsize/Heavy jet (Challenger 3500 or Falcon 900LX) for maximum baggage volume and full lie-flat berthing.';
      } else if (/jubilee|black card/i.test(query)) {
        reply =
          'The Aurevia Jubilee tier is by invitation only, strictly limited to 100 principals globally. It guarantees aircraft availability worldwide with zero notice required, includes an assigned personal lifestyle manager, unlimited integrated concierge (superyachts, private villas, close protection), and confidential manifest protocol. Standard pricing is not published.';
      } else if (/gold|tier|membership/i.test(query)) {
        reply =
          'Aurevia membership offers five ascending tiers: Bronze (priority quotes, empty legs), Silver (24h guaranteed availability, complimentary chauffeur), Gold (12-month fixed hourly rates, 12h guarantee, lifestyle desk access), Diamond (6h guarantee, transatlantic repositioning waivers), and Jubilee (invite-only, zero notice). Would you like to select a tier?';
      } else if (/price|quote|cost|included/i.test(query)) {
        reply =
          'Every Aurevia quote is fully inclusive: aircraft charter, certified two-pilot flight crew, bespoke VIP catering, landing/handling fees, and passenger taxes. There are no hidden fees or fuel surcharges. Quotes are returned within 60 minutes of request.';
      } else {
        reply =
          'Understood. Aurevia coordinates private jet charter across all cabin sizes (Light to Ultra-Long-Range flagships), as well as point-to-point helicopters, superyachts, and special missions. Would you like me to pre-fill an itinerary for our dispatchers?';
      }

      setMessages((prev) => [
        ...prev,
        {
          id: `ai-${Date.now()}`,
          sender: 'ai',
          text: reply,
          isUrgentEscalation: escalate,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
      setLoading(false);
    }, 700);
  };

  const handleEscalateToHuman = () => {
    setMessages((prev) => [
      ...prev,
      {
        id: `sys-${Date.now()}`,
        sender: 'system',
        text: `Handoff activated: Routing your conversation to the Duty Flight Director at ${BRAND.phoneDisplay}. You can also proceed directly to WhatsApp.`,
        timestamp: 'Just now'
      }
    ]);
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <div className="fixed bottom-6 right-6 z-40">
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-2.5 px-5 py-3.5 btn-glass-liquid-brass rounded-full shadow-2xl transition-all duration-300 group cursor-pointer"
            aria-label="Open Aurevia AI Concierge"
          >
            <div className="relative">
              <Sparkles className="w-4 h-4 text-[#F3F0E7]" />
              <span className="w-2 h-2 rounded-full bg-emerald-400 absolute -top-0.5 -right-0.5 animate-pulse" />
            </div>
            <span className="text-xs uppercase tracking-wider font-semibold text-[#F3F0E7]">
              AI Concierge Desk
            </span>
          </button>
        )}
      </div>

      {/* Floating Chat Modal */}
      {isOpen && (
        <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[420px] h-[580px] max-h-[85vh] bg-[#12141C] border border-[#B68A4E]/40 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-fade-in">
          {/* Header */}
          <div className="p-4 bg-[#1E2436] border-b border-[#1E2436] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 rounded-md bg-[#12141C] border border-[#B68A4E]/40">
                <Sparkles className="w-4 h-4 text-[#D8B683]" />
              </div>
              <div>
                <h4 className="font-display text-sm text-[#F3F0E7] font-medium leading-none">
                  Aurevia Flight Concierge
                </h4>
                <div className="flex items-center gap-1.5 mt-1 text-[10px] text-emerald-400 font-sans">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block animate-pulse" />
                  <span>AI Assistant · Verified Fleet Knowledge</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={handleEscalateToHuman}
                title="Handoff to Human Flight Director"
                className="p-1.5 rounded-lg btn-glass-liquid text-[#F3F0E7]/80 hover:text-[#D8B683] transition-colors cursor-pointer text-[10px] uppercase tracking-wider"
              >
                <UserCheck className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg btn-glass-liquid text-[#F3F0E7]/80 hover:text-[#F3F0E7] transition-colors cursor-pointer"
                aria-label="Close concierge chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* AI Disclosure Ribbon */}
          <div className="bg-[#12141C] px-3.5 py-1.5 border-b border-[#1E2436] flex items-center justify-between text-[10px] text-[#F3F0E7]/50 font-light">
            <span>Automated AI Assistant · Human handoff available 24/7</span>
            <a
              href={`tel:${BRAND.phone}`}
              className="text-[#D8B683] hover:underline font-mono"
            >
              {BRAND.phoneDisplay}
            </a>
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-[#0D0F16]">
            {messages.map((m) => {
              if (m.sender === 'system') {
                return (
                  <div
                    key={m.id}
                    className="p-3 rounded-lg bg-[#1E2436]/60 border border-[#B68A4E]/30 text-xs text-[#D8B683] space-y-2"
                  >
                    <p>{m.text}</p>
                    <div className="flex items-center gap-2">
                      <a
                        href={`tel:${BRAND.phone}`}
                        className="px-3 py-1.5 btn-glass-liquid-brass text-[#F3F0E7] rounded-lg text-[10px] uppercase tracking-wider font-semibold inline-flex items-center gap-1 cursor-pointer"
                      >
                        <PhoneCall className="w-3 h-3" />
                        Call Duty Desk
                      </a>
                      <a
                        href={BRAND.whatsappUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="px-3 py-1.5 btn-glass-liquid-emerald text-white rounded-lg text-[10px] uppercase tracking-wider font-medium inline-flex items-center gap-1 cursor-pointer"
                      >
                        WhatsApp
                      </a>
                    </div>
                  </div>
                );
              }

              const isUser = m.sender === 'user';
              return (
                <div
                  key={m.id}
                  className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl p-3 text-xs leading-relaxed font-light ${
                      isUser
                        ? 'bg-[#B68A4E] text-[#0A0A0A] font-normal rounded-tr-none'
                        : 'bg-[#1E2436] text-[#F3F0E7] border border-[#1E2436] rounded-tl-none'
                    }`}
                  >
                    {m.text}

                    {/* Urgent Escalation Action Box */}
                    {m.isUrgentEscalation && (
                      <div className="mt-3 pt-2.5 border-t border-rose-500/40 space-y-2">
                        <div className="flex items-center gap-1.5 text-[10px] uppercase font-semibold text-rose-300">
                          <ShieldCheck className="w-3.5 h-3.5" />
                          <span>Direct Emergency Escalation</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <a
                            href={`tel:${BRAND.phone}`}
                            className="px-3 py-1.5 btn-glass-liquid-rose text-white rounded-lg text-[10px] uppercase tracking-wider font-semibold inline-flex items-center gap-1 cursor-pointer shadow-md"
                          >
                            <PhoneCall className="w-3 h-3" />
                            Call {BRAND.phoneDisplay}
                          </a>
                          <a
                            href={BRAND.whatsappUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="px-3 py-1.5 btn-glass-liquid-emerald text-white rounded-lg text-[10px] uppercase tracking-wider font-semibold inline-flex items-center gap-1 cursor-pointer shadow-md"
                          >
                            WhatsApp SOS
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                  <span className="text-[9px] text-[#F3F0E7]/40 mt-1 px-1">
                    {m.timestamp}
                  </span>
                </div>
              );
            })}

            {loading && (
              <div className="flex items-center gap-1.5 text-xs text-[#D8B683] p-2 bg-[#1E2436]/40 rounded-lg w-fit">
                <span className="w-1.5 h-1.5 rounded-full bg-[#B68A4E] animate-bounce" />
                <span className="w-1.5 h-1.5 rounded-full bg-[#B68A4E] animate-bounce [animation-delay:0.2s]" />
                <span className="w-1.5 h-1.5 rounded-full bg-[#B68A4E] animate-bounce [animation-delay:0.4s]" />
                <span className="text-[10px] uppercase tracking-wider ml-1 text-[#F3F0E7]/60">
                  Consulting flight network...
                </span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts Chips */}
          <div className="p-2.5 bg-[#12141C] border-t border-[#1E2436] flex items-center gap-1.5 overflow-x-auto scrollbar-none">
            {quickPrompts.map((prompt, i) => (
              <button
                key={i}
                onClick={() => handleSendMessage(prompt)}
                className="text-[10px] px-3 py-1.5 rounded-lg btn-glass-liquid text-[#F3F0E7]/80 hover:text-[#D8B683] transition-colors whitespace-nowrap cursor-pointer shadow-sm"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <div className="p-3 bg-[#12141C] border-t border-[#1E2436]">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                placeholder="Ask route, fleet, or pricing questions..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 bg-[#1E2436] border border-[#1E2436] focus:border-[#B68A4E] rounded-lg py-2 px-3 text-xs text-[#F3F0E7] placeholder-[#F3F0E7]/40 outline-none"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="p-2.5 btn-glass-liquid-brass disabled:opacity-40 text-[#F3F0E7] rounded-lg transition-colors cursor-pointer shadow-md"
                aria-label="Send message"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
