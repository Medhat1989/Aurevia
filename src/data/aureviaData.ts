import heroTarmac from '@/src/assets/images/hero_private_jet_tarmac_1790872685796.jpg';
import fleetInterior from '@/src/assets/images/fleet_cabin_interior_1790872698392.jpg';
import conciergeYacht from '@/src/assets/images/concierge_yacht_helicopter_1790872712698.jpg';
import specialMissionsImg from '@/src/assets/images/special_missions_aircraft_1790872724587.jpg';

export interface Aircraft {
  id: string;
  name: string;
  category: 'Light' | 'Midsize' | 'Super-Midsize' | 'Heavy' | 'Ultra-Long-Range' | 'Helicopter';
  tagline: string;
  passengers: number;
  rangeNm: number;
  rangeMiles: number;
  cruiseSpeedKts: number;
  cabinHeightFt: string;
  baggageCuFt: number;
  wifi: string;
  typicalRoutes: string[];
  description: string;
  specs: {
    label: string;
    value: string;
  }[];
  image: string;
}

export interface MembershipTier {
  id: string;
  name: string;
  eyebrow: string;
  availabilityWindow: string;
  description: string;
  features: string[];
  isInviteOnly?: boolean;
}

export interface ConciergeService {
  id: string;
  name: string;
  shortDesc: string;
  fullDesc: string;
  capabilities: string[];
  typicalLeadTime: string;
  serviceTypeKey: string;
}

export interface SpecialMission {
  id: string;
  title: string;
  category: string;
  description: string;
  keyProtocols: string[];
  responseWindow: string;
  serviceTypeKey: string;
}

export interface JournalArticle {
  id: string;
  title: string;
  category: 'Aviation' | 'Travel' | 'Lifestyle' | 'Partner Feature' | 'Special Missions';
  readTime: string;
  date: string;
  author: string;
  excerpt: string;
  content: string[];
  featuredImage: string;
}

export interface FAQItem {
  question: string;
  answer: string;
  category: 'Charter' | 'Safety' | 'Membership' | 'Operations';
}

export const BRAND = {
  name: 'Aurevia Aviation',
  primarySlogan: 'Where sky meets certainty.',
  secondarySlogans: [
    'Connecting you to what matters',
    'Elevated, By Design',
    'The Art of Arrival',
    'Fly Ahead of Tomorrow',
    'Precision Has Wings',
    'Your Path, Illuminated',
    'Every Journey, Revered',
    'Aurevia. Rise Above.'
  ],
  phone: '+356 7730 2834',
  phoneDisplay: '+356 7730 2834',
  whatsappUrl: 'https://wa.me/35677302834?text=Hello%20Aurevia%20Aviation,%20I%20would%20like%20to%20inquire%20about%20a%20private%20flight.',
  email: 'charter@aurevia-aviation.com',
  foundingYear: '2014',
  headquarters: 'Geneva, Switzerland',
  foundingQuote: 'The best flight is the one you never had to think about.',
  commitment: 'Every itinerary built from scratch, confirmed within the hour.'
};

export const GLOBAL_HUBS = [
  { city: 'Geneva', country: 'Switzerland', timeZone: 'Europe/Zurich', address: 'Rue du Rhône 42, 1204 Genève', role: 'Global Headquarters & Dispatch' },
  { city: 'Dubai', country: 'UAE', timeZone: 'Asia/Dubai', address: 'Gate Precinct 4, DIFC, Dubai', role: 'Middle East & Asia-Pacific Desk' },
  { city: 'New York', country: 'United States', timeZone: 'America/New_York', address: '590 Madison Avenue, New York, NY', role: 'Americas Operations Desk' }
];

export const FLEET_DATA: Aircraft[] = [
  {
    id: 'light-jet',
    name: 'Embraer Phenom 300E',
    category: 'Light',
    tagline: 'Quick regional hops with category-leading speed and quiet elegance.',
    passengers: 6,
    rangeNm: 1500,
    rangeMiles: 1726,
    cruiseSpeedKts: 464,
    cabinHeightFt: '4.9 ft',
    baggageCuFt: 84,
    wifi: 'Ka-band Satellite / 4G ATG',
    typicalRoutes: ['Geneva to Nice (38 min)', 'London to Zurich (1h 15m)', 'Paris to Milan (55 min)'],
    description: 'Designed for effortless same-day continental business and weekend escapes. The Phenom 300E combines the largest baggage volume in its class with an ergonomically sculptured cabin and enclosed private lavatory.',
    specs: [
      { label: 'Max Cruising Altitude', value: '45,000 ft' },
      { label: 'Runway Requirement', value: '3,209 ft (Short-field capable)' },
      { label: 'Cabin Sound Level', value: 'Ultra-low acoustic dampening' },
      { label: 'Seating Configuration', value: 'Club seating + belted lavatory' }
    ],
    image: heroTarmac
  },
  {
    id: 'midsize-jet',
    name: 'Praetor 500',
    category: 'Midsize',
    tagline: 'True stand-up cabin comfort and cross-continental autonomy.',
    passengers: 8,
    rangeNm: 2850,
    rangeMiles: 3280,
    cruiseSpeedKts: 466,
    cabinHeightFt: '6.0 ft',
    baggageCuFt: 110,
    wifi: 'Ka-band High-Speed Connectivity',
    typicalRoutes: ['Geneva to Dubai (5h 40m)', 'London to Athens (3h 25m)', 'New York to Miami (2h 40m)'],
    description: 'A revolutionary midsize aircraft featuring a full 6-foot stand-up flat-floor cabin, active turbulence reduction technology, and an ultra-quiet acoustic signature.',
    specs: [
      { label: 'Cabin Altitude at 45,000 ft', value: '5,800 ft (low fatigue)' },
      { label: 'Galley', value: 'Full wet galley & espresso bar' },
      { label: 'Berthable Seats', value: '2 fully flat sleep berths' },
      { label: 'Baggage Access', value: 'In-flight accessible compartment' }
    ],
    image: fleetInterior
  },
  {
    id: 'super-midsize-jet',
    name: 'Bombardier Challenger 3500',
    category: 'Super-Midsize',
    tagline: 'Transcontinental endurance with patented zero-gravity seating.',
    passengers: 10,
    rangeNm: 3400,
    rangeMiles: 3912,
    cruiseSpeedKts: 470,
    cabinHeightFt: '6.0 ft',
    baggageCuFt: 106,
    wifi: 'Global Ka-band Broadband',
    typicalRoutes: ['Paris to New York (nonstop)', 'Dubai to London (6h 50m)', 'Singapore to Sydney (7h 10m)'],
    description: 'Equipped with the Nuage seat—the aviation industry’s first zero-gravity recliner—and voice-controlled environmental settings. Optimized for high-focus working flights and restorative sleep.',
    specs: [
      { label: 'Air Filtration', value: 'Hospital-grade HEPA filters' },
      { label: 'Cabin Width', value: '7.2 ft wide-body cabin' },
      { label: 'Entertainment', value: '4K cinema monitors & wireless charging' },
      { label: 'Crew', value: 'Two pilots + Cabin Host upon request' }
    ],
    image: heroTarmac
  },
  {
    id: 'heavy-jet',
    name: 'Dassault Falcon 900LX',
    category: 'Heavy',
    tagline: 'Tri-jet oceanic safety, three-zone private staterooms, and high-altitude efficiency.',
    passengers: 12,
    rangeNm: 4750,
    rangeMiles: 5466,
    cruiseSpeedKts: 480,
    cabinHeightFt: '6.2 ft',
    baggageCuFt: 127,
    wifi: 'High-Throughput Global Satcom',
    typicalRoutes: ['Geneva to Chicago (8h 45m)', 'London to São Paulo (11h 10m)', 'Dubai to Tokyo (9h 20m)'],
    description: 'The definitive tri-jet architecture provides unrivaled peace of mind across oceanic and mountainous routes. Features three distinct staterooms allowing passengers to dine, confer, and sleep in quiet separation.',
    specs: [
      { label: 'Engine Architecture', value: '3x Honeywell TFE731-60 (Oceanic ETOPS exempt)' },
      { label: 'Aft Stateroom', value: 'Private enclosed master sanctuary' },
      { label: 'Hot Galley', value: 'Dual convection oven & wine cellar' },
      { label: 'Dedicated Crew', value: 'Captain, First Officer, Executive Flight Attendant' }
    ],
    image: fleetInterior
  },
  {
    id: 'ultra-long-range',
    name: 'Bombardier Global 7500',
    category: 'Ultra-Long-Range',
    tagline: 'The pinnacle of private aviation. 7,700 nautical miles connecting any two cities on Earth.',
    passengers: 16,
    rangeNm: 7700,
    rangeMiles: 8860,
    cruiseSpeedKts: 516,
    cabinHeightFt: '6.2 ft',
    baggageCuFt: 195,
    wifi: 'Ka-band Ultra High-Speed Streaming',
    typicalRoutes: ['Geneva to Singapore (11h 30m)', 'New York to Hong Kong (15h 10m)', 'London to Los Angeles (10h 40m)'],
    description: 'Four true living spaces, including an aft master suite with a permanent double bed and en-suite shower. Engineered with the Smooth FlxFly wing for the smoothest ride in civilian aviation history.',
    specs: [
      { label: 'Living Zones', value: 'Club Suite, Conference Suite, Entertainment Suite, Master Bedroom' },
      { label: 'Circadian Lighting', value: 'Dynamic biorhythmic spectrum lighting to cure jetlag' },
      { label: 'Cabin Altitude', value: '2,900 ft lowest cabin altitude in the industry' },
      { label: 'Shower Suite', value: 'Full stand-up private en-suite shower' }
    ],
    image: heroTarmac
  },
  {
    id: 'helicopter',
    name: 'Airbus ACH145 Line',
    category: 'Helicopter',
    tagline: 'Bespoke point-to-point alpine, urban, and yacht deck transfers.',
    passengers: 8,
    rangeNm: 350,
    rangeMiles: 402,
    cruiseSpeedKts: 135,
    cabinHeightFt: '4.3 ft',
    baggageCuFt: 46,
    wifi: 'Air-to-ground 4G connectivity',
    typicalRoutes: ['Geneva to Courchevel (32 min)', 'Nice to Monaco Helipad (7 min)', 'Zurich to St. Moritz (42 min)'],
    description: 'The preferred twin-engine executive helicopter for alpine transfers and superyacht helipads. Fenestron shrouded tail rotor ensures quiet flyovers and maximum ground safety.',
    specs: [
      { label: 'Engine Type', value: 'Twin Safran Arriel 2E with Dual FADEC' },
      { label: 'Helipad Clearance', value: 'Approved for Superyacht Class A helidecks' },
      { label: 'Luggage Capacity', value: 'Fits full ski equipment & hard luggage' },
      { label: 'Sound Rating', value: 'Whisper-quiet cabin insulation' }
    ],
    image: conciergeYacht
  }
];

export const MEMBERSHIP_TIERS: MembershipTier[] = [
  {
    id: 'bronze',
    name: 'Bronze',
    eyebrow: 'Entry Tier',
    availabilityWindow: '48h notice',
    description: 'Engineered for occasional private flyers seeking vetted charter quality and immediate account recognition.',
    features: [
      'Priority quote turnaround within 45 minutes',
      'Exclusive member rates on vetted empty-leg positioning flights',
      'Dedicated personal account contact',
      'Flexible departure terminal customs clearance',
      'No annual membership expiration on flight deposits'
    ]
  },
  {
    id: 'silver',
    name: 'Silver',
    eyebrow: 'Frequent Continental',
    availabilityWindow: '24h guaranteed',
    description: 'Guaranteed aircraft availability within 24 hours and seamless door-to-door ground transitions.',
    features: [
      'Guaranteed aircraft availability across Europe and North America within 24h',
      'Complimentary executive chauffeur ground transfers on all departures',
      'One complimentary cabin category upgrade credit annually',
      'Preferred cancellation terms up to 72 hours prior to flight',
      'Dedicated dispatch desk with 24/7 flight monitoring'
    ]
  },
  {
    id: 'gold',
    name: 'Gold',
    eyebrow: 'Executive & Family',
    availabilityWindow: '12h guaranteed',
    description: 'Locked hourly pricing and unlimited access to the Aurevia lifestyle and concierge desk.',
    features: [
      'Fixed, locked hourly rates guaranteed for 12 months (zero peak-day surcharges)',
      'Guaranteed availability within 12 hours worldwide',
      'Direct booking desk for all Concierge Services (yachts, villas, security)',
      'Full family and authorized executive guest charter privileges',
      'Complimentary bespoke in-flight catering & sommelier cellar selection'
    ]
  },
  {
    id: 'diamond',
    name: 'Diamond',
    eyebrow: 'Global Principal',
    availabilityWindow: '6h guaranteed',
    description: 'Global repositioning waiving, dedicated flight coordinator, and urgent mission standby.',
    features: [
      'Repositioning fees waived on primary transatlantic and Middle Eastern corridors',
      'Guaranteed aircraft availability within 6 hours worldwide',
      'Assigned senior flight coordinator managing every passenger preference',
      'Priority standby for Special Missions and urgent aeromedical dispatch',
      'Seamless tarmac-side customs and private vehicle escort clearance'
    ]
  },
  {
    id: 'jubilee',
    name: 'Jubilee',
    eyebrow: 'By Invitation Only',
    availabilityWindow: 'Zero notice worldwide',
    isInviteOnly: true,
    description: 'The black card tier. Discretion without boundary, zero-notice aircraft dispatch, and a dedicated Aurevia lifestyle manager overseeing global movement.',
    features: [
      'Guaranteed aircraft availability worldwide with zero notice required',
      'Physical Jubilee Black Card crafted in matte gunmetal with metallic brass foil monogram',
      'Assigned personal Aurevia Lifestyle Manager handling all global movements',
      'Unlimited integrated concierge: chartered superyachts, private estates, and armored security',
      'Completely confidential manifest handling and diplomatic-tier discretion',
      'Private invitations to Aurevia’s sovereign events, Grand Prix pavilions, and global art retrospectives'
    ]
  }
];

export const CONCIERGE_SERVICES: ConciergeService[] = [
  {
    id: 'security-detail',
    name: 'Executive Security & Close Protection',
    shortDesc: 'Discrete diplomatic, corporate, and family security coordinated directly with flight manifests.',
    fullDesc: 'Aurevia coordinates state-licensed executive protection officers, armored vehicle convoys (VR7/VR9 ballistic rated), and advance route security. All protocols synchronize silently with aircraft arrivals and departures.',
    capabilities: [
      'Armed/unarmed close protection specialists vetted to military/diplomatic standards',
      'Armored Mercedes-Maybach S680 Guard and Range Rover Sentinel logistics',
      'Advance reconnaissance of local airports, FBOs, hotels, and event perimeters',
      'Direct integration with host-nation diplomatic protocol offices'
    ],
    typicalLeadTime: '2 hours worldwide notice',
    serviceTypeKey: 'Security'
  },
  {
    id: 'luxury-hotels',
    name: 'Preferred Hotels & Private Suites',
    shortDesc: 'Confidential reservations, buyouts, and guaranteed suite availability at partner five-star properties.',
    fullDesc: 'Bypass standard booking channels. Aurevia maintains bilateral direct relationships with the general managers of premier palace hotels and heritage sanctuaries globally, ensuring complete privacy, early tarmac check-in, and personalized security perimeters.',
    capabilities: [
      'Direct hotel general manager communication and confidential guest registration',
      'Guaranteed presidential, penthouse, and whole-floor wing reservations',
      'Curated in-suite dining, bespoke amenities, and private elevator clearances',
      'Preferred member rates, complimentary upgrades, and flexible checkout'
    ],
    typicalLeadTime: 'Instant coordination',
    serviceTypeKey: 'Hotels'
  },
  {
    id: 'yachts',
    name: 'Superyacht Charter & Air-to-Sea Coordination',
    shortDesc: 'Vetted private yacht charters coordinated with direct helicopter or runway-to-marina transit.',
    fullDesc: 'From 40-meter explorer vessels navigating the Norwegian fjords to 90-meter displacement superyachts in Monaco, St. Barths, or the Cyclades. We manage maritime charter contracts, provisioning, and helicopter deck landings seamlessly.',
    capabilities: [
      'Access to an audited global fleet of superyachts with professional permanent crews',
      'Direct helicopter transfer from jet landing strip to vessel helideck',
      'Customized itinerary planning with master captains and marine concierges',
      'Provisioning coordination including onboard Michelin-level chef preferences'
    ],
    typicalLeadTime: '24 hours notice',
    serviceTypeKey: 'Yacht'
  },
  {
    id: 'villas',
    name: 'Private Estates & Villa Portfolios',
    shortDesc: 'Curated luxury estates, mountain chalets, and private island sanctuaries with private staffing.',
    fullDesc: 'Access private residential estates unavailable on public rental markets. Fully staffed with private executive chefs, butlers, estate security, and ground transport—ready hours before your touchdown.',
    capabilities: [
      'Exclusive properties in St. Tropez, Aspen, Ibiza, Lake Como, Kyoto, and Mustique',
      'Turnkey staffing: Michelin-trained private chefs, concierges, and security personnel',
      'Childcare, wellness practitioners, and private ski/water sport instructors',
      'Strict non-disclosure compliance for homeowner and charterer'
    ],
    typicalLeadTime: '12 to 24 hours notice',
    serviceTypeKey: 'Villa'
  },
  {
    id: 'helicopters',
    name: 'Helicopter Point-to-Point Transfers',
    shortDesc: 'Direct airport-to-city, alpine chalet, and yacht deck transfers bypassing all ground congestion.',
    fullDesc: 'Step off your charter jet directly into a waiting twin-engine helicopter on the tarmac. Fly directly to alpine destinations like Courchevel, St. Moritz, and Zermatt, or land on urban heliports in London, Manhattan, and Monaco.',
    capabilities: [
      'Twin-engine IFR-equipped helicopters with dedicated mountain-flight certified pilots',
      'Tarmac-to-rotor transfers inside private FBO gates without baggage re-check',
      'High-altitude alpine ski resort landings and hotel rooftop helipads',
      'Luggage forward-tracking vehicles for oversized equipment'
    ],
    typicalLeadTime: 'Within 60 minutes',
    serviceTypeKey: 'Helicopter'
  },
  {
    id: 'luxury-cars',
    name: 'Chauffeured Fleets & Armored Transport',
    shortDesc: 'Tarmac-side chauffeured vehicles, exotic sports cars, and multi-day private mobility.',
    fullDesc: 'Your aircraft descends, and your vehicle is positioned at the foot of the stairs. From silent electric luxury saloons to convoy-ready executive SUVs and self-drive supercars delivered directly to your villa or hotel.',
    capabilities: [
      'Pre-cleared tarmac-side collection at participating international FBOs',
      'Fleet: Rolls-Royce Spectre, Mercedes-Maybach S-Class, Range Rover SV, Cadillac Escalade ESV',
      'Professional security-trained, non-disclosure-bound multilingual chauffeurs',
      'Exotic supercar delivery (Ferrari, Aston Martin, Porsche) to private residences'
    ],
    typicalLeadTime: '30 minutes to 2 hours',
    serviceTypeKey: 'Car Service'
  }
];

export const SPECIAL_MISSIONS: SpecialMission[] = [
  {
    id: 'ngo-relief',
    title: 'NGO & Humanitarian Relief Flights',
    category: 'Rapid Humanitarian Response',
    description: 'Charter and logistics coordination for international humanitarian organizations, NGOs, and disaster-relief operations into constrained or affected global theaters.',
    keyProtocols: [
      'Rapid clearance through civil aviation authorities in conflict or disaster zones',
      'Heavy cargo and personnel combined transport on ruggedized aircraft',
      'Pre-negotiated fuel and ground-handling agreements in remote airfields',
      'Strict adherence to humanitarian neutrality and international diplomatic standards'
    ],
    responseWindow: 'Launch within 2 to 4 hours',
    serviceTypeKey: 'NGO / Relief'
  },
  {
    id: 'medevac',
    title: 'Emergency Aeromedical Evacuation (Medevac)',
    category: 'Critical Aeromedical Transport',
    description: 'Immediate bed-to-bed international air ambulance transfers with ICU equipment, specialized flight doctors, and pediatric/adult critical care nurses.',
    keyProtocols: [
      'Dedicated Bombardier Challenger and Learjet aircraft fitted with Spectrum Aeromed ICU systems',
      'Board-certified emergency medicine physicians and flight nurses on every transit',
      'Direct coordination with sending and receiving hospital clinical teams',
      'Expedited medical overflight and emergency landing permits globally'
    ],
    responseWindow: 'Launch within 60 minutes (24/7 Priority Desk)',
    serviceTypeKey: 'Medevac'
  },
  {
    id: 'government-official',
    title: 'Government, Diplomatic & Sovereign Flights',
    category: 'Official Delegations',
    description: 'State-level delegation travel, diplomatic courier flights, and sovereign missions requiring absolute discretion and meticulous compliance.',
    keyProtocols: [
      'Diplomatic clearances and overflight permits coordinated with foreign ministries',
      'Strict manifest confidentiality protocols and segregated FBO facilities',
      'Secure communications and escort integration with diplomatic protective services',
      'Flexible itineraries accommodating volatile diplomatic schedules'
    ],
    responseWindow: 'Launch on demand / scheduled state missions',
    serviceTypeKey: 'Government'
  }
];

export const ACCREDITATIONS = [
  {
    code: 'ARGUS Platinum',
    title: 'ARGUS Platinum Rated Network',
    detail: 'Highest independent tier of aviation safety auditing, evaluating operator records, flight history, and safety management systems (SMS).'
  },
  {
    code: 'Wyvern Wingman',
    title: 'Wyvern Wingman Certified',
    detail: 'Continuous pilot training oversight, maintenance tracking, and operator compliance with rigorous safety benchmarks.'
  },
  {
    code: 'IS-BAO Stage 3',
    title: 'IS-BAO Stage 3 Registration',
    detail: 'International Standard for Business Aircraft Operations—validating mature and ingrained safety culture and risk controls.'
  },
  {
    code: 'EURAMI Accredited',
    title: 'EURAMI Aeromedical Standard',
    detail: 'European Aero-Medical Institute accreditation for long-range and critical-care air ambulance operations.'
  }
];

export const INITIAL_JOURNAL_ARTICLES: JournalArticle[] = [
  {
    id: 'architecture-of-silence',
    title: 'The Architecture of Silence: Acoustic Engineering Above 45,000 Feet',
    category: 'Aviation',
    readTime: '5 min read',
    date: 'October 2026',
    author: 'Henri de Vaud, Chief Aeronautical Strategist',
    excerpt: 'How acoustic dampening, active vibration cancellation, and lower cabin altitudes transform eight hours of transit into a restful state of arrival.',
    content: [
      'For decades, private aviation measured performance in Mach numbers and runway lengths. Yet the modern passenger measures something far more precious: physiological restoration.',
      'When an aircraft cruises at 45,000 feet, the ambient external environment is hostile. The air pressure is a fraction of sea level, and structural airflow produces distinct acoustic vibrations. In older aircraft, this translates to cognitive fatigue.',
      'In modern flagships like the Bombardier Global 7500 and Dassault Falcon series, acoustic engineers have fundamentally rethought dampening. Active noise cancellation microphones built directly into cabin headrests emit reverse acoustic waves. Combined with bespoke multilayer insulation and a cabin altitude maintained at an astonishingly low 2,900 feet, passengers disembark without the familiar dehydration and mental haze of long-haul flights.',
      'The outcome is simple: you arrive not recovering from a journey, but ready for whatever demands your presence.'
    ],
    featuredImage: fleetInterior
  },
  {
    id: 'alpine-transit',
    title: 'Courchevel to the Côte d’Azur: The Seamless Winter Alpine Transit',
    category: 'Travel',
    readTime: '4 min read',
    date: 'September 2026',
    author: 'Elena Rossi, Lifestyle Director',
    excerpt: 'Inside the logistics of moving between the highest slopes of the Trois Vallées and the calm waters of the Mediterranean in under two hours.',
    content: [
      'Winter travel for our clients rarely adheres to single geography. A morning meeting in Zurich gives way to afternoon powder in the French Alps, followed by a weekend gathering on the Mediterranean.',
      'The challenge is ground infrastructure. Mountain passes in winter are unpredictable, and airport queues erode the value of time. The solution is orchestrated multimodal transit.',
      'Aurevia clients touch down in Geneva or Chambéry. Before the jet’s engines have spun down, a twin-engine ACH145 helicopter is turning rotors adjacent on the tarmac. Ski equipment is transferred directly by our ground dispatch. Thirty minutes later, touchdown occurs directly on the Courchevel altiport or chalet helipad.',
      'When Sunday arrives, the process reverses with absolute certainty. Precision is not merely speed; it is the complete absence of friction.'
    ],
    featuredImage: conciergeYacht
  },
  {
    id: 'restraint-as-luxury',
    title: 'Restraint as Luxury: Why Understated Itineraries Win',
    category: 'Lifestyle',
    readTime: '6 min read',
    date: 'August 2026',
    author: 'Marc Vance, Founding Partner',
    excerpt: 'True luxury does not clamor for attention. A manifesto on why quiet precision, discreet manifests, and composed travel define the Aurevia ethos.',
    content: [
      'There is a pervasive misconception that luxury must announce itself with loud gold leaf, ostentatious branding, and performative displays. In private aviation, that approach is the mark of an amateur.',
      'Our clients—heads of enterprise, sovereign families, and humanitarian leaders—desire the exact inverse. They want aircraft with quiet, tasteful liveries. They want discreet FBO exits that bypass commercial glare. They want crews who understand the art of respectful silence.',
      'When Aurevia was founded in Geneva in 2014, our brief was a single sentence: "The best flight is the one you never had to think about." That principle still governs every contract, every flight plan, and every hire.',
      'When everything works exactly as promised, luxury becomes invisible. It simply feels like certainty.'
    ],
    featuredImage: heroTarmac
  },
  {
    id: 'urgent-aeromedical',
    title: 'In Safe Hands: High-Altitude Critical Medical Evacuation Protocols',
    category: 'Special Missions',
    readTime: '7 min read',
    date: 'July 2026',
    author: 'Dr. Lukas Meyer, Chief Medical Flight Director',
    excerpt: 'A behind-the-scenes look at how Aurevia’s 60-minute medevac launch protocol coordinates ICU teams, permits, and clinical handover worldwide.',
    content: [
      'When a medical crisis occurs in a remote region or overseas post, minutes dictate outcomes. Standard charter brokers cannot navigate the complex clinical requirements of aeromedical evacuation.',
      'Aurevia’s Special Missions division maintains dedicated long-range aircraft configured with Spectrum Aeromed intensive care systems. These are not retrofitted business jets; they are flying intensive care units capable of sustaining life support, advanced ventilation, and invasive hemodynamic monitoring across oceanic distances.',
      'Our medical directors liaise directly with the attending physician on the ground, assessing clinical transport suitability while our dispatchers file diplomatic flight corridors. From the moment the SOS call arrives, wheels can be up within 60 minutes.',
      'Because in critical moments, aviation ceases to be a luxury—it is a lifeline.'
    ],
    featuredImage: specialMissionsImg
  }
];

export const FAQ_DATA: FAQItem[] = [
  {
    category: 'Charter',
    question: 'How far in advance do I need to book a private flight?',
    answer: 'While we recommend 24 to 48 hours for standard international charter itineraries to ensure optimal aircraft positioning and customs pre-clearance, Aurevia routinely dispatches aircraft in as little as 2 hours for urgent travel. For Jubilee and Diamond members, guaranteed availability is maintained worldwide with zero to 6 hours notice.'
  },
  {
    category: 'Charter',
    question: 'What is included in the quoted price?',
    answer: 'Every Aurevia quote is fully transparent and inclusive. It encompasses the aircraft charter, professional two-pilot crew (and cabin host where applicable), bespoke premium in-flight catering, standard airport landing and handling fees, and standard passenger taxes. De-icing (if required by winter conditions) and specialized international overflight permits are itemized clearly with no hidden markups.'
  },
  {
    category: 'Operations',
    question: 'Can I bring pets on board?',
    answer: 'Yes. Pets are warmly welcomed in the cabin alongside you on the vast majority of our chartered flights. We coordinate pet passports, DEFRA clearance, microchip verification, and veterinary approvals prior to departure so your companion travels safely on your lap or beside your seat.'
  },
  {
    category: 'Operations',
    question: 'What happens if my flight is delayed or weather forces a diversion?',
    answer: 'Our 24/7 flight operations center continuously tracks weather, airspace congestion, and airport conditions. In the rare event of mechanical holds or adverse weather, Aurevia immediately activates backup aircraft from our vetted operator network at no penalty to you. For our Gold, Diamond, and Jubilee members, standby replacement aircraft are automatically reserved.'
  },
  {
    category: 'Membership',
    question: 'How does the Aurevia membership program work?',
    answer: 'The program features five tiers: Bronze, Silver, Gold, Diamond, and the invite-only Jubilee tier. Unlike rigid fractional ownership that locks you into one aircraft type, Aurevia membership acts as a flexible charter account with fixed hourly rates, guaranteed availability, waived repositioning fees, and seamless access to our full lifestyle concierge desk.'
  },
  {
    category: 'Safety',
    question: 'Is Aurevia an operator, or a broker?',
    answer: 'Aurevia functions as an elite private aviation and concierge group. We manage select client-entrusted aircraft and maintain an rigorously audited network of licensed Part 135 / Part 121 (or equivalent European AOC) operators. This structure allows us to offer clients unconstrained access to thousands of aircraft worldwide rather than limiting you to a single local fleet.'
  },
  {
    category: 'Safety',
    question: 'How is safety and vetting handled for partner aircraft and crews?',
    answer: 'We enforce an unyielding safety protocol. Every operator, aircraft, and crew must satisfy our four-tier audit criteria: valid AOC certification, ARGUS Platinum or Wyvern Wingman rating, minimum pilot-in-command experience of 4,000+ flight hours (with minimum 1,000 hours on specific type), and comprehensive hull and liability insurance exceeding $100M.'
  }
];
