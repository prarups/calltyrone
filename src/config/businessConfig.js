// Centralized Business Configuration for Call Tyrone LLC
// Editable by client for easy maintenance without code changes.

export const BUSINESS_CONFIG = {
  name: "Call Tyrone LLC",
  logo: "/images/logo.png",
  tagline: "24/7 Mobile Tire & Roadside Assistance — 50-Mile Atlanta Radius",
  shortDescription: "America's trusted 24/7 mobile tire change, flat repair, battery jump-start, lockout & emergency roadside assistance service across Greater Atlanta and all surrounding areas within a 50-mile radius. Call Tyrone LLC for rapid dispatch.",
  phone: "(404) 482-2246",
  phoneRaw: "+14044822246",
  altPhone: "(404) 482-2246",
  whatsappPhoneRaw: "14044822246", // Client USA WhatsApp target (404) 482-2246
  email: "info@mobiletireplus.com",
  supportEmail: "info@mobiletireplus.com",
  website: "https://calltyrone.com",
  domain: "calltyrone.com",
  serverUrl: "https://api.calltyrone.com",
  cdnUrl: "https://cdn.calltyrone.com",
  serverHost: "us-east-1.aws.calltyrone.com",
  address: {
    street: "Mobile Dispatch HQ (Peachtree St NE)",
    city: "Atlanta",
    state: "GA",
    zip: "30303",
    country: "USA",
    fullAddress: "100% Mobile Service Dispatch HQ — Atlanta, GA (50-Mile Radius Service Coverage)"
  },
  hours: "24 Hours / 7 Days a Week / 365 Days a Year",
  dispatchTime: "15 - 30 Minutes Average Response",
  serviceRadiusMiles: 50,
  rating: 4.9,
  totalReviewsCount: "14,850+",
  yearsInBusiness: "12+ Years",
  unitsActive: "65+ Mobile Service Units",
  
  socials: {
    facebook: "https://facebook.com/calltyrone",
    instagram: "https://instagram.com/calltyrone",
    tiktok: "https://tiktok.com/@calltyrone",
    googleBusiness: "https://g.page/calltyrone",
    yelp: "https://yelp.com/biz/call-tyrone"
  },

  serviceAreas: [
    { 
      name: "Greater Atlanta Central Metro", 
      state: "GA", 
      zipPrefixes: ["30", "31", "39"], 
      units: 24, 
      popularCities: ["Atlanta", "Buckhead", "Decatur", "Midtown", "Downtown Atlanta", "Sandy Springs", "East Point"] 
    },
    { 
      name: "North Atlanta Suburbs (50-Mile Zone)", 
      state: "GA", 
      zipPrefixes: ["30"], 
      units: 18, 
      popularCities: ["Marietta", "Alpharetta", "Roswell", "Dunwoody", "Cumming", "Johns Creek", "Suwanee", "Milton", "Canton"] 
    },
    { 
      name: "East & South Metro (50-Mile Zone)", 
      state: "GA", 
      zipPrefixes: ["30", "31"], 
      units: 16, 
      popularCities: ["Lawrenceville", "Duluth", "Norcross", "Smyrna", "McDonough", "Newnan", "Douglasville", "Peachtree City"] 
    }
  ],

  services: [
    {
      id: "flat-tire-change",
      title: "Flat Tire Change",
      shortDesc: "Stranded with a flat spare or blown tire? We swap your damaged tire with your spare wheel right where you are.",
      fullDesc: "Our roadside service vehicles are equipped with heavy-duty commercial hydraulic jacks, impact wrenches, and certified safety equipment. Whether you are on I-85/I-75/I-285 or in your driveway, our technician swaps your flat tire with your spare safely within minutes.",
      startingPrice: "$99",
      estimatedEta: "15-25 min",
      iconName: "Disc",
      image: "/images/FlatTireChange.png",
      features: ["On-site spare tire installation", "Lug nut torque verification to factory spec", "Spare tire pressure check & inflation", "Highway safety perimeter set up"],
      popular: true
    },
    {
      id: "jump-start",
      title: "Jump Start",
      shortDesc: "Dead battery leaving you stranded? Heavy-duty 12V/24V jump-start service for cars, SUVs, trucks, and hybrids.",
      fullDesc: "We provide high-amperage commercial jump-start power packs capable of starting completely drained batteries on all gas, diesel, and hybrid vehicles without damaging delicate vehicle electronics or ECUs.",
      startingPrice: "$99",
      estimatedEta: "15-20 min",
      iconName: "Zap",
      image: "/images/jumpstart.png",
      features: ["Reverse-polarity surge protected boost", "Alternator & charging system diagnostic test", "Battery terminal cleaning & anti-corrosion spray", "12V and 24V commercial compatibility"],
      popular: true
    },
    {
      id: "fuel-delivery",
      title: "Fuel Delivery",
      shortDesc: "Ran out of gas or diesel on the road? We deliver premium gasoline or diesel fuel directly to you.",
      fullDesc: "Ran out of fuel on the freeway or stuck in traffic? Our emergency fuel delivery team delivers fresh 87/93 Octane Gasoline or Ultra-Low Sulfur Diesel straight to your vehicle so you can reach the nearest gas station safely.",
      startingPrice: "$99",
      estimatedEta: "15-25 min",
      iconName: "Fuel",
      image: "/images/FuelDelivery.png",
      features: ["Regular, Premium, or Diesel fuel", "Up to 5 gallons delivered to site", "Prime fuel line restarting for diesel", "24/7 highway & neighborhood delivery"],
      popular: true
    },
    {
      id: "lockout-service",
      title: "Lockout Service",
      shortDesc: "Keys locked inside your car? Non-destructive professional lockout entry by certified roadside locksmiths.",
      fullDesc: "Locked out of your vehicle? Our technicians utilize damage-free specialized air-wedges, rubberized long-reach tools, and precision lockout equipment to safely unlock doors without scratching paint or damaging weather stripping.",
      startingPrice: "$99",
      estimatedEta: "15-25 min",
      iconName: "Key",
      image: "/images/LockoutService.png",
      features: ["100% Damage-free guaranteed entry", "All makes & models including luxury vehicles", "Trunk lockout assistance", "Fast priority dispatch"],
      popular: true
    },
    {
      id: "mount-and-balance",
      title: "Mount & Balance",
      shortDesc: "Professional on-site tire mounting and computerized wheel balancing brought right to your vehicle.",
      fullDesc: "No need to drive to a shop. Our mobile vans feature Italian computerized touchless tire changers and precision spin wheel balancers directly on-site.",
      startingPrice: "$35 per tire",
      estimatedEta: "20-35 min",
      iconName: "CircleDot",
      image: "/images/MountBalance.png",
      features: ["Mobile computerized spin balancing", "Touchless rim mounting technology", "TPMS sensor recalibration", "Precision torque verification"],
      popular: true
    },
    {
      id: "mobile-call-off",
      title: "One-Time Mobile Call-Off",
      shortDesc: "Standard base dispatch fee for mobile unit response, site arrival, and roadside assessment.",
      fullDesc: "Covers rapid mobile dispatch to your exact breakdown location, site safety evaluation, and complete vehicle assessment.",
      startingPrice: "$50",
      estimatedEta: "15-30 min",
      iconName: "Truck",
      image: "/images/mobile-call-off.png",
      features: ["Direct unit dispatch to your location", "On-site vehicle diagnostic inspection", "Safety hazard perimeter setup", "Applicable toward full repair service"],
      popular: true
    }
  ],

  pricingTiers: [
    {
      name: "Flat Tire Change",
      price: "$99",
      period: "per incident",
      badge: "Most Requested",
      desc: "Roadside tire change with your spare wheel, lug nut torque verification & tire pressure tuning.",
      includes: [
        "15-30 Min Rapid Dispatch",
        "On-site spare tire installation",
        "Lug nut torque spec check",
        "Highway safety perimeter setup",
        "Digital pressure calibration"
      ]
    },
    {
      name: "Jump Start",
      price: "$99",
      period: "per boost",
      badge: "Fastest Response",
      desc: "High-amperage commercial boost, battery health analysis, and alternator charging diagnostic.",
      includes: [
        "15-20 Min Rapid Dispatch",
        "Heavy-duty surge protected boost",
        "Alternator health check",
        "Terminal corrosion cleaning",
        "All vehicle types supported"
      ]
    },
    {
      name: "Fuel Delivery",
      price: "$99",
      period: "per service",
      badge: "24/7 Dispatch",
      desc: "Emergency roadside delivery of premium gasoline or diesel directly to your stranded location.",
      includes: [
        "15-25 Min Rapid Dispatch",
        "Regular, Premium, or Diesel fuel",
        "Up to 5 gallons delivered to site",
        "Prime fuel line restarting for diesel",
        "24/7 highway & neighborhood delivery"
      ]
    },
    {
      name: "Lockout Service",
      price: "$99",
      period: "per entry",
      badge: "100% Damage-Free",
      desc: "Non-destructive vehicle door & trunk unlocking by certified mobile locksmith technicians.",
      includes: [
        "15-25 Min Rapid Dispatch",
        "100% Damage-free unlock guarantee",
        "All makes & models supported",
        "Trunk lockout entry assistance",
        "Certified mobile locksmith"
      ]
    },
    {
      name: "Mount & Balance",
      price: "$35",
      period: "per tire",
      badge: "Mobile Shop",
      desc: "On-site computerized tire mounting and spin balancing brought directly to your location.",
      includes: [
        "Touchless rim mounting",
        "Computerized spin balancing",
        "TPMS sensor check & reset",
        "Factory precision torque spec",
        "No shop visit required"
      ]
    },
    {
      name: "One-Time Mobile Call-Off",
      price: "$50",
      period: "one-time fee",
      badge: "Base Dispatch",
      desc: "Standard base dispatch fee for mobile unit response, site arrival, and roadside assessment.",
      includes: [
        "Immediate unit dispatch",
        "On-site vehicle diagnostic inspection",
        "Safety hazard perimeter setup",
        "Transparent upfront pricing",
        "Credited toward repair service"
      ]
    }
  ],

  testimonials: [
    {
      id: 1,
      name: "David Miller",
      location: "Atlanta, GA",
      vehicle: "2022 Ford F-150 SuperCrew",
      rating: 5,
      date: "2 days ago",
      service: "Flat Tire Change",
      comment: "Blew a tire on I-85 North during rush hour in Downtown Atlanta. Technician Marcus from Call Tyrone LLC arrived in 14 minutes flat! Swapped my spare in under 10 minutes and checked my tire pressure. Lifesavers!",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"
    },
    {
      id: 2,
      name: "Sarah Jenkins",
      location: "Alpharetta, GA",
      vehicle: "2023 Tesla Model Y",
      rating: 5,
      date: "1 week ago",
      service: "Mount & Balance",
      comment: "Tesla tires don't come with a spare, so when I had a flat near Buckhead I called Call Tyrone LLC. They dispatched a van, mounted and balanced my tire right in my office parking space!",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
    },
    {
      id: 3,
      name: "Marcus Vance",
      location: "Marietta, GA",
      vehicle: "2021 Chevrolet Tahoe",
      rating: 5,
      date: "3 days ago",
      service: "Jump Start",
      comment: "Stuck in summer heat at a shopping plaza with a dead battery. Call Tyrone LLC tech arrived with a heavy duty jump pack, tested the alternator, and got my family back on the road in 15 mins!",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80"
    },
    {
      id: 4,
      name: "Elena Rodriguez",
      location: "Decatur, GA",
      vehicle: "2020 Honda Accord",
      rating: 5,
      date: "5 days ago",
      service: "Lockout Service",
      comment: "Accidentally locked my keys and purse in the car late at night. Called Call Tyrone LLC emergency hotline at (404) 482-2246 and tech Alex unlocked the car in 2 minutes without a single scratch. Highly recommended!",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80"
    }
  ],

  faqs: [
    {
      q: "How fast will a Call Tyrone LLC technician arrive at my location?",
      a: "Our average emergency arrival time is between 15 to 30 minutes across Atlanta and all surrounding cities within our 50-mile service radius. Once you submit a request, our automated dispatch assigns the nearest active service unit."
    },
    {
      q: "What areas are covered in the 50-mile Atlanta radius?",
      a: "We service Greater Atlanta, Marietta, Alpharetta, Decatur, Sandy Springs, Roswell, Lawrenceville, Duluth, Smyrna, Cumming, Kennesaw, Woodstock, McDonough, Newnan, Douglasville, and all surrounding Georgia highways & suburbs."
    },
    {
      q: "What if I do not have a spare tire?",
      a: "No problem! We offer on-site Mount & Balance ($35/tire), tire patch repairs, and mobile tire services directly at your location."
    },
    {
      q: "What is the One-Time Mobile Call-Off fee ($50)?",
      a: "The $50 One-Time Mobile Call-Off fee covers immediate unit dispatch to your breakdown site and initial on-site safety/diagnostic evaluation. If you proceed with repair service, this fee is credited toward your service total."
    },
    {
      q: "Are your prices transparent with no hidden fees?",
      a: "Yes! Call Tyrone LLC provides upfront pricing estimates ($99 Flat Tire Change, Jump Start, Fuel Delivery, Lockout Service; $35 per tire Mount & Balance; $50 Call-Off Fee). What we quote is what you pay."
    },
    {
      q: "Do you service electric vehicles (EVs) like Tesla, Rivian, and Lucid?",
      a: "Yes! All Call Tyrone LLC technicians are trained and certified in low-profile EV tires, puck-jacking points for battery protection, specialized torque specifications, and high-amperage low-voltage battery service."
    },
    {
      q: "What payment methods do you accept roadside?",
      a: "Our technicians carry mobile chip/tap card readers. We accept all major Credit/Debit cards (Visa, MasterCard, American Express, Discover), Apple Pay, Google Pay, and fleet cards. Cash is also accepted."
    },
    {
      q: "What information do I need to request service?",
      a: "You simply need your current location/address, vehicle Year/Make/Model, phone number (404-482-2246 for quick callback), and service needed."
    }
  ],

  demoTechnician: {
    name: "Marcus Vance",
    role: "Lead Master Roadside Technician",
    photo: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80",
    rating: "4.98 ★ (1,420+ Services Completed)",
    phone: "(404) 482-2246",
    unit: "Call Tyrone LLC Unit #408",
    vehicle: "2024 Ford Transit High-Roof Custom Service Van",
    licensePlate: "GA-TYR408",
    equipment: ["Touchless Tire Changer", "Spin Balancer", "5000lb Hydraulic Jack", "Commercial Jump Pack", "Patch/Plug Kit"]
  }
};
