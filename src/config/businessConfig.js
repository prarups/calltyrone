// Centralized Business Configuration for Call Tyrone
// Editable by client for easy maintenance without code changes.

export const BUSINESS_CONFIG = {
  name: "Call Tyrone",
  tagline: "24/7 Mobile Tire & Roadside Assistance — We Come To You",
  shortDescription: "America's trusted 24/7 mobile tire change, flat repair, battery jump-start, lockout & emergency roadside assistance service. Call Tyrone for rapid dispatch directly to your home, workplace, highway, or parking lot.",
  phone: "(800) 555-8473",
  phoneRaw: "+18005558473",
  altPhone: "(888) 927-8473",
  email: "dispatch@calltyrone.com",
  supportEmail: "help@calltyrone.com",
  address: {
    street: "4800 Airport Freeway, Suite 200",
    city: "Fort Worth",
    state: "TX",
    zip: "76117",
    country: "USA",
    fullAddress: "4800 Airport Freeway, Suite 200, Fort Worth, TX 76117"
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
    { name: "Dallas - Fort Worth Metro", state: "TX", zipPrefixes: ["75", "76"], units: 14, popularCities: ["Dallas", "Fort Worth", "Arlington", "Plano", "Frisco", "Irving", "McKinney"] },
    { name: "Greater Houston Metro", state: "TX", zipPrefixes: ["77"], units: 16, popularCities: ["Houston", "The Woodlands", "Sugar Land", "Katy", "Pearland", "Spring"] },
    { name: "Greater Atlanta Metro", state: "GA", zipPrefixes: ["30", "31"], units: 10, popularCities: ["Atlanta", "Marietta", "Alpharetta", "Decatur", "Sandy Springs", "Roswell"] },
    { name: "Greater Phoenix Metro", state: "AZ", zipPrefixes: ["85"], units: 12, popularCities: ["Phoenix", "Scottsdale", "Mesa", "Tempe", "Chandler", "Glendale"] },
    { name: "Greater Los Angeles Metro", state: "CA", zipPrefixes: ["90", "91", "92"], units: 18, popularCities: ["Los Angeles", "Anaheim", "Long Beach", "Pasadena", "Irvine", "Glendale"] },
    { name: "Greater Miami Metro", state: "FL", zipPrefixes: ["33"], units: 11, popularCities: ["Miami", "Fort Lauderdale", "West Palm Beach", "Boca Raton", "Hialeah"] },
    { name: "Greater Chicago Metro", state: "IL", zipPrefixes: ["60"], units: 13, popularCities: ["Chicago", "Naperville", "Evanston", "Schaumburg", "Joliet", "Aurora"] }
  ],

  services: [
    {
      id: "mobile-tire-change",
      title: "Mobile Tire Change",
      shortDesc: "Stranded with a flat spare or blown tire? We swap your damaged tire with your spare wheel right where you are.",
      fullDesc: "Our roadside service vehicles are equipped with heavy-duty commercial hydraulic jacks, impact wrenches, and certified safety equipment. Whether you are on the side of the highway or in your driveway, our technician swaps your flat tire with your spare safely and securely within minutes.",
      startingPrice: "$75",
      estimatedEta: "15-25 min",
      iconName: "Disc",
      image: "https://images.unsplash.com/photo-1578844251758-2f71da64c96f?auto=format&fit=crop&w=1200&q=80",
      features: ["On-site spare tire installation", "Lug nut torque verification to factory spec", "Spare tire pressure check & inflation", "Highway safety perimeter set up"],
      popular: true
    },
    {
      id: "flat-tire-repair",
      title: "Flat Tire Repair",
      shortDesc: "Puncture from a nail or screw? We perform professional high-grade tire patching and plugging on the spot.",
      fullDesc: "No spare tire? No problem. Our mobile technicians carry professional REMA Tip Top vulcanizing patch-plug kits and portable high-cfm air compressors to repair tread punctures on-site without needing to tow your vehicle to a shop.",
      startingPrice: "$65",
      estimatedEta: "15-30 min",
      iconName: "Wrench",
      image: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=1200&q=80",
      features: ["RMA-compliant internal patch/plug", "Bead leak inspection & seal repair", "Valve stem replacement if needed", "High-precision digital pressure check"],
      popular: true
    },
    {
      id: "tire-replacement",
      title: "On-Site Tire Replacement",
      shortDesc: "Don't tow your vehicle to a tire shop. We bring brand new major-brand tires and mount/balance on your vehicle on-site.",
      fullDesc: "We carry top major tire brands (Michelin, Goodyear, Continental, Bridgestone, Pirelli, Hankook). Our custom mobile tire vans feature Italian computerized touchless tire changers and precision wheel balancers right inside the van.",
      startingPrice: "$120",
      estimatedEta: "20-35 min",
      iconName: "CircleDot",
      image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80",
      features: ["Brand new tires matching vehicle spec", "Mobile computerized spin balancing", "TPMS sensor recalibration", "Old tire eco-disposal included"],
      popular: true
    },
    {
      id: "tire-delivery",
      title: "Emergency Tire Delivery",
      shortDesc: "Need a specific tire size delivered directly to your breakdown location? Fast dispatch delivery service.",
      fullDesc: "If you have a blown tire with no spare and need a specific OEM tire size delivered immediately, we pick up your exact tire size from local warehouse inventory and deliver it directly to your vehicle with full installation option.",
      startingPrice: "$85",
      estimatedEta: "20-40 min",
      iconName: "Truck",
      image: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=1200&q=80",
      features: ["All passenger & light truck sizes in stock", "Direct delivery to highway or home", "Optional mounting & installation", "Real-time dispatch updates"],
      popular: false
    },
    {
      id: "battery-jumpstart",
      title: "Battery Jump-Start",
      shortDesc: "Dead battery leaving you stranded? Heavy-duty 12V/24V jump-start service for cars, SUVs, trucks, and hybrids.",
      fullDesc: "We provide high-amperage commercial jump-start power packs capable of starting completely drained batteries on all gas, diesel, and hybrid vehicles without damaging delicate vehicle electronics or ECUs.",
      startingPrice: "$55",
      estimatedEta: "15-20 min",
      iconName: "Zap",
      image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1200&q=80",
      features: ["Reverse-polarity surge protected boost", "Alternator & charging system diagnostic test", "Battery terminal cleaning & anti-corrosion spray", "12V and 24V commercial compatibility"],
      popular: true
    },
    {
      id: "battery-replacement",
      title: "Mobile Battery Replacement",
      shortDesc: "Old battery died completely? We bring a new AGM or flooded battery with full warranty and install it on the spot.",
      fullDesc: "Avoid the auto parts store trip. Our mobile units carry fresh premium AGM and EFB batteries backed by a 3-Year Free Replacement Nationwide Warranty. We code and register the new battery into your vehicle computer.",
      startingPrice: "$145",
      estimatedEta: "20-30 min",
      iconName: "BatteryCharging",
      image: "https://images.unsplash.com/photo-1507136566006-cfc505b114fe?auto=format&fit=crop&w=1200&q=80",
      features: ["Premium AGM/Lead-Acid batteries", "3-Year free replacement warranty", "BMS (Battery Management System) reset", "Free eco recycling of old battery"],
      popular: false
    },
    {
      id: "lockout-service",
      title: "Vehicle Lockout Service",
      shortDesc: "Keys locked inside your car? Non-destructive professional lockout entry by certified roadside locksmiths.",
      fullDesc: "Locked out of your vehicle? Our technicians utilize damage-free specialized air-wedges, rubberized long-reach tools, and precision lockout equipment to safely unlock doors without scratching paint or damaging weather stripping.",
      startingPrice: "$65",
      estimatedEta: "15-25 min",
      iconName: "Key",
      image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80",
      features: ["100% Damage-free guaranteed entry", "All makes & models including luxury vehicles", "Trunk lockout assistance", "Fast priority dispatch"],
      popular: true
    },
    {
      id: "fuel-delivery",
      title: "Emergency Fuel Delivery",
      shortDesc: "Ran out of gas or diesel on the road? We deliver up to 5 gallons of premium gasoline or diesel fuel directly to you.",
      fullDesc: "Ran out of fuel on the freeway or stuck in traffic? Our emergency fuel delivery team delivers fresh 87/93 Octane Gasoline or Ultra-Low Sulfur Diesel straight to your vehicle so you can reach the nearest gas station safely.",
      startingPrice: "$60",
      estimatedEta: "15-25 min",
      iconName: "Fuel",
      image: "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=1200&q=80",
      features: ["Regular, Premium, or Diesel fuel", "Up to 5 gallons delivered to site", "Prime fuel line restarting for diesel", "24/7 highway & neighborhood delivery"],
      popular: false
    },
    {
      id: "mobile-oil-change",
      title: "Mobile Oil & Fluid Change",
      shortDesc: "Convenient full synthetic oil change performed in your driveway or office parking space while you work.",
      fullDesc: "Skip the dirty waiting rooms. We perform zero-spill vacuum oil extraction, oil filter replacement, chassis lubrication, and fluid top-off directly at your home or workplace.",
      startingPrice: "$89",
      estimatedEta: "Scheduled / 30-45 min",
      iconName: "Droplet",
      image: "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1200&q=80",
      features: ["Full Synthetic Mobil 1 / Valvoline oil", "OEM-grade oil filter replacement", "Multi-point safety inspection", "Zero-drip environmental containment"],
      popular: false
    },
    {
      id: "towing-service",
      title: "Flatbed Towing & Winch-Out",
      shortDesc: "Vehicle broke down or stuck in mud/ditch? Safe rollback flatbed towing and emergency winch recovery.",
      fullDesc: "When roadside repairs aren't feasible, our heavy-duty hydraulic flatbed tow trucks transport your car, SUV, truck, or electric vehicle safely to your preferred repair shop or home address.",
      startingPrice: "$95",
      estimatedEta: "20-35 min",
      iconName: "ShieldAlert",
      image: "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1200&q=80",
      features: ["Soft-strap wheel lift towing", "All-wheel-drive & EV friendly flatbed", "Off-road & mud ditch winch recovery", "Transparent mileage rate"],
      popular: true
    }
  ],

  pricingTiers: [
    {
      name: "Tire Emergency Dispatch",
      price: "$75",
      period: "per incident",
      badge: "Most Requested",
      desc: "For roadside tire change with your spare wheel, lug nut service & tire pressure tuning.",
      includes: [
        "15-30 Min Rapid Dispatch",
        "On-site spare tire installation",
        "Lug nut torque spec check",
        "Highway safety perimeter setup",
        "Digital pressure calibration"
      ]
    },
    {
      name: "Flat Repair & Vulcanize",
      price: "$65",
      period: "per tire",
      badge: "Best Value",
      desc: "On-site tire puncture repair, internal plug/patch, bead seal, and inflation.",
      includes: [
        "15-30 Min Rapid Dispatch",
        "RMA internal safety patch/plug",
        "Puncture leak submersion test",
        "Valve stem replacement",
        "No towing needed"
      ]
    },
    {
      name: "Jump Start & Battery Service",
      price: "$55",
      period: "per boost",
      badge: "Instant Service",
      desc: "High-amperage boost, battery health analysis, and charging diagnostic.",
      includes: [
        "15-20 Min Rapid Dispatch",
        "Heavy-duty surge protected boost",
        "Alternator health check",
        "Terminal corrosion cleaning",
        "All vehicle types supported"
      ]
    },
    {
      name: "Lockout & Fuel Emergency",
      price: "$60",
      period: "starting rate",
      badge: "24/7 Priority",
      desc: "Damage-free door unlocking or emergency delivery of up to 5 gallons of fuel.",
      includes: [
        "15-25 Min Rapid Dispatch",
        "100% Damage-free unlock guarantee",
        "Up to 5 Gal Gasoline or Diesel",
        "Trunk entry assistance",
        "No hidden call-out fees"
      ]
    }
  ],

  testimonials: [
    {
      id: 1,
      name: "David Miller",
      location: "Dallas, TX",
      vehicle: "2022 Ford F-150 SuperCrew",
      rating: 5,
      date: "2 days ago",
      service: "Mobile Tire Change",
      comment: "Blew a tire on I-35 West during rush hour in Fort Worth. Technician Marcus from Call Tyrone arrived in 14 minutes flat! Swapped my spare in under 10 minutes and checked my tire pressure. Lifesavers!",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"
    },
    {
      id: 2,
      name: "Sarah Jenkins",
      location: "Atlanta, GA",
      vehicle: "2023 Tesla Model Y",
      rating: 5,
      date: "1 week ago",
      service: "On-Site Tire Replacement",
      comment: "Tesla tires don't come with a spare, so when I got a sidewall cut near Buckhead I called Call Tyrone. They dispatched a van with my exact Michelin tire, mounted and balanced it in my office parking space!",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
    },
    {
      id: 3,
      name: "Marcus Vance",
      location: "Phoenix, AZ",
      vehicle: "2021 Chevrolet Tahoe",
      rating: 5,
      date: "3 days ago",
      service: "Battery Replacement",
      comment: "Stuck in 105-degree heat at a shopping plaza with a dead battery. Call Tyrone tech arrived with a brand new AGM battery, installed it, reset the computer, and got my family back on the road in 20 mins!",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80"
    },
    {
      id: 4,
      name: "Elena Rodriguez",
      location: "Houston, TX",
      vehicle: "2020 Honda Accord",
      rating: 5,
      date: "5 days ago",
      service: "Lockout Service",
      comment: "Accidentally locked my keys and purse in the car late at night. Called Call Tyrone emergency hotline and tech Alex unlocked the car in 2 minutes without a single scratch. Highly recommended!",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80"
    }
  ],

  faqs: [
    {
      q: "How fast will a Call Tyrone technician arrive at my location?",
      a: "Our average emergency arrival time is between 15 to 30 minutes across all active metro service zones. Once you submit a service request, our automated dispatch assigns the nearest active service vehicle, and you receive real-time GPS tracking of your technician."
    },
    {
      q: "What if I do not have a spare tire?",
      a: "No problem! We specialize in on-site tire puncture repairs (patch/plug) and mobile new tire delivery. Our mobile service vans carry computerized mounting and balancing machines, allowing us to bring and install a brand new tire directly at your vehicle location."
    },
    {
      q: "How does the real-time tracking work?",
      a: "As soon as your service request is confirmed, you receive a unique Service Request ID (e.g. TYR-28491). You can track your technician in real time on our interactive map view, seeing their exact van location, distance remaining, driver photo, vehicle unit number, and updated ETA."
    },
    {
      q: "Are your prices transparent with no hidden fees?",
      a: "Yes! Call Tyrone provides upfront pricing estimates before dispatching a technician. What we quote is what you pay. There are no hidden mileage surcharges or surprise call-out fees."
    },
    {
      q: "Do you service electric vehicles (EVs) like Tesla, Rivian, and Lucid?",
      a: "Yes! All Call Tyrone technicians are trained and certified in low-profile EV tires, puck-jacking points for battery protection, specialized torque specifications, and high-amperage low-voltage battery service."
    },
    {
      q: "What payment methods do you accept roadside?",
      a: "Our technicians carry mobile chip/tap card readers. We accept all major Credit/Debit cards (Visa, MasterCard, American Express, Discover), Apple Pay, Google Pay, and fleet cards. Cash is also accepted."
    },
    {
      q: "Can you help me if I'm stranded on a busy highway shoulder?",
      a: "Yes. Safety is our top priority. Our service vans are equipped with high-visibility amber strobe lights, reflective safety cones, and traffic perimeter equipment to establish a safe roadside work zone."
    },
    {
      q: "What information do I need to request service?",
      a: "You simply need your current location/address, vehicle Year/Make/Model, phone number, and tire size (printed on your tire sidewall e.g. 225/65R17) if requesting tire replacement."
    }
  ],

  demoTechnician: {
    name: "Marcus Vance",
    role: "Lead Master Roadside Technician",
    photo: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80",
    rating: "4.98 ★ (1,420+ Services Completed)",
    phone: "(800) 555-8473",
    unit: "Call Tyrone Unit #408",
    vehicle: "2024 Ford Transit High-Roof Custom Service Van",
    licensePlate: "TX-TYR408",
    equipment: ["Touchless Tire Changer", "Spin Balancer", "5000lb Hydraulic Jack", "Commercial Jump Pack", "Patch/Plug Kit"]
  }
};
