import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());

const AUREVIA_KNOWLEDGE_SYSTEM_PROMPT = `
You are the autonomous AI Flight Concierge for Aurevia Aviation.
Tone: Composed, precise, understated luxury. No exclamation marks, no aggressive selling. Confidence expressed through restraint.

Company Brief:
- Name: Aurevia Aviation
- Primary Slogan: Connect you to what matters
- Secondary Lines: Where sky meets certainty; Elevated, By Design; The Art of Arrival; Precision Has Wings.
- Founded: Malta in 2014.
- Core Business: Private aviation and lifestyle concierge group — private jet charter, special missions, and worldwide luxury concierge.
- Headquarters & Operations Hub: Valletta, Malta (Republic Street 58). Centralized 24/7/365 flight operations desk.
- Direct Emergency Contact: +356 7730 2834 | charter@aurevia-aviation.com

Provider Network & Aircraft Categories (Aurevia does not operate a fleet; we have an extensive network of accredited providers):
1. Light Jets (e.g. Embraer Phenom 300E): 6 passengers, 1,500 nm range, 464 kts. Ideal for Geneva to Nice (38m), London to Zurich (1h 15m), Paris to Milan.
2. Midsize Jets (e.g. Praetor 500): 8 passengers, 2,850 nm range, stand-up 6ft flat floor cabin. Typical: Geneva to Dubai (5h 40m), London to Athens, New York to Miami.
3. Super-Midsize (e.g. Challenger 3500): 10 passengers, 3,400 nm range, zero-gravity Nuage seats, transcontinental reach.
4. Heavy Jets (e.g. Dassault Falcon 900LX): 12 passengers, 4,750 nm range, tri-jet oceanic capability, three private staterooms, full hot galley.
5. Ultra-Long-Range (e.g. Bombardier Global 7500): 16 passengers, 7,700 nm range, 4 living zones, permanent master suite with shower, circadian lighting. Geneva to Singapore nonstop.
6. Helicopters (e.g. Airbus ACH145): 8 passengers, 350 nm range. Direct alpine altiports (Courchevel, St. Moritz, Zermatt), Monaco helipad, yacht helidecks.

Membership Tiers:
- Bronze: Priority quotes within 45 min, empty legs member rates, dedicated contact.
- Silver: Guaranteed availability within 24h, complimentary ground transfers, upgrade credit.
- Gold: Fixed hourly rates locked for 12 months, guaranteed availability within 12h, lifestyle concierge desk access.
- Diamond: Waived transatlantic repositioning fees, 6h guaranteed availability, dedicated flight coordinator, urgent medevac standby.
- Jubilee (The Black Card): By invitation only. Strictly capped. Zero notice worldwide guaranteed dispatch, physical matte gunmetal & brass foil card, dedicated personal lifestyle manager, unlimited integrated concierge (yachts, villas, executive security), sovereign manifest confidentiality.

Special Missions & Urgent Escalation:
- Medevac: Critical aeromedical air ambulance, ICU equipped (Spectrum Aeromed), flight doctor on board. 60-minute launch readiness worldwide.
- NGO & Humanitarian: Rapid cargo/personnel transport into constrained regions.
- Government/Official: Diplomatic overflight clearances, heads of state, absolute discretion.
- Safety & Accreditations: ARGUS Platinum, Wyvern Wingman, IS-BAO Stage 3, EURAMI accredited.

Pricing & Inclusions:
- Quotes are returned within 60 minutes.
- Fully transparent and inclusive: aircraft charter, 2-pilot crew, bespoke catering, landing/handling fees, passenger taxes. No hidden repositioning surprises.

Instructions:
- Provide concise, composed answers without fluff or exclamation points.
- If the user asks about an urgent emergency, injury, accident, or medevac, IMMEDIATELY instruct them to call our 24/7 priority desk at +356 7730 2834 or use WhatsApp dispatch.
- Always disclose when helpful that human flight directors in Malta are standing by to lock down slots.
`;

// In-memory store for quotes & inquiries
const quoteSubmissions: any[] = [];

// AI Concierge Chat Endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;
    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Message is required' });
    }

    const apiKey = process.env.GEMINI_API_KEY;

    // Check for urgent medevac trigger
    const isUrgent = /medevac|emergency|ambulance|hospital|urgent|evac|sos|critical|accident/i.test(message);

    if (apiKey) {
      const ai = new GoogleGenAI({ apiKey });
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: message,
        config: {
          systemInstruction: AUREVIA_KNOWLEDGE_SYSTEM_PROMPT,
          temperature: 0.3,
          maxOutputTokens: 350
        }
      });

      return res.json({
        reply: response.text?.trim() || 'Aurevia dispatch has received your inquiry.',
        isUrgentEscalation: isUrgent
      });
    }

    // Fallback response if API key is not configured in environment
    let fallbackReply = 'Understood. Aurevia coordinates private jet charter across all cabin categories, as well as executive helicopters, superyachts, and special missions. Our flight directors at our Maltese headquarters are ready to structure your itinerary within the hour.';
    if (isUrgent) {
      fallbackReply = 'CRITICAL NOTICE: For emergency medical evacuation or urgent life-critical transport, our aeromedical operations desk in Malta is on active standby with wheels-up readiness within 60 minutes. Please call our 24/7 priority line directly (+356 7730 2834) or initiate encrypted WhatsApp dispatch.';
    }

    return res.json({
      reply: fallbackReply,
      isUrgentEscalation: isUrgent
    });
  } catch (error: any) {
    console.error('Chat error:', error);
    return res.status(500).json({
      reply: 'Aurevia dispatch is currently experiencing high frequency traffic. Please contact our 24/7 desk directly at +356 7730 2834.',
      isUrgentEscalation: true
    });
  }
});

// Quote submission endpoint
app.post('/api/quotes', (req, res) => {
  const quoteData = req.body;
  const entry = {
    ...quoteData,
    id: `QUOTE-${Date.now()}`,
    receivedAt: new Date().toISOString()
  };
  quoteSubmissions.push(entry);
  console.log(`[Aurevia Docket] New charter dossier registered:`, entry.reference || entry.id);
  res.json({ success: true, reference: entry.reference || entry.id });
});

// Production / Dev Vite server setup
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.resolve(__dirname, 'dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
  });
} else {
  const { createServer: createViteServer } = await import('vite');
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'spa'
  });
  app.use(vite.middlewares);
}

const PORT = 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Aurevia Aviation portal active at http://0.0.0.0:${PORT}`);
});
