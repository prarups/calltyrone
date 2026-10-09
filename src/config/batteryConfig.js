// Complete Battery Inventory & Pricing Catalog for Call Tyrone
// Extracted directly from official battery dispatch spec

export const BATTERY_CATALOG = [
  // Popular & Standard Group Sizes
  { id: "b-35", name: "35", price: 278.00, priceDisplay: "$278.00", category: "standard", desc: "Popular for Honda, Nissan, Subaru, Toyota sedans & crossovers" },
  { id: "b-24f", name: "24F", price: 260.00, priceDisplay: "$260.00", category: "standard", desc: "Common for Toyota Camry, RAV4, Honda Accord, Nissan" },
  { id: "b-51r", name: "51R", price: 265.00, priceDisplay: "$265.00", category: "standard", desc: "Compact group for Honda Civic, CR-V, Fit, Nissan" },
  { id: "b-47-h5", name: "47-H5", price: 271.00, priceDisplay: "$271.00", category: "standard", desc: "European & domestic compact vehicles (Chevy, Ford, VW)" },
  { id: "b-48-h6", name: "48-H6", price: 265.00, priceDisplay: "$265.00", category: "standard", desc: "High demand group for Ford, GM, BMW, Audi, Jeep, Dodge" },
  { id: "b-94r-h7", name: "94R-H7", price: 275.00, priceDisplay: "$275.00", category: "standard", desc: "Large European & American SUVs and trucks (BMW, Ram, Ford)" },
  { id: "b-96r", name: "96R", price: 271.00, priceDisplay: "$271.00", category: "standard", desc: "Popular for Ford Focus, Fusion, Escape, Lincoln" },
  { id: "b-24", name: "24", price: 267.00, priceDisplay: "$267.00", category: "standard", desc: "Universal standard top-post for American & Asian vehicles" },
  { id: "b-25", name: "25", price: 274.00, priceDisplay: "$274.00", category: "standard", desc: "Common for Subaru Outback, Forester, Nissan, Toyota" },
  { id: "b-26", name: "26", price: 230.00, priceDisplay: "$230.00", category: "standard", desc: "Compact American & Asian vehicle replacement" },
  { id: "b-26r", name: "26R", price: 247.00, priceDisplay: "$247.00", category: "standard", desc: "Reverse terminal group for GM and Chrysler compacts" },
  { id: "b-27", name: "27", price: 368.00, priceDisplay: "$368.00", category: "standard", desc: "Heavy-duty large displacement trucks, RVs, commercial" },
  { id: "b-27f", name: "27F", price: 331.00, priceDisplay: "$331.00", category: "standard", desc: "Toyota Tundra, Sequoia, Lexus LX heavy SUV group" },
  { id: "b-34", name: "34", price: 257.00, priceDisplay: "$257.00", category: "standard", desc: "Classic American muscle & Chrysler/Jeep/Dodge group" },
  { id: "b-36r", name: "36R", price: 245.00, priceDisplay: "$245.00", category: "standard", desc: "Ford, Mercury, Lincoln midsize sedans & wagons" },
  { id: "b-40r", name: "40R", price: 250.00, priceDisplay: "$250.00", category: "standard", desc: "Ford small engines and international utility vehicles" },
  { id: "b-42", name: "42", price: 227.00, priceDisplay: "$227.00", category: "standard", desc: "Compact economy group replacement" },
  { id: "b-49-h8", name: "49-H8", price: 299.00, priceDisplay: "$299.00", category: "standard", desc: "Large luxury sedans & SUVs (Mercedes, BMW, Audi, Volvo)" },
  { id: "b-51", name: "51", price: 240.00, priceDisplay: "$240.00", category: "standard", desc: "Standard terminal orientation for compact vehicles" },
  { id: "b-59", name: "59", price: 261.00, priceDisplay: "$261.00", category: "standard", desc: "Ford Crown Victoria, Ranger, Lincoln utility trucks" },
  { id: "b-65", name: "65", price: 270.00, priceDisplay: "$270.00", category: "standard", desc: "Heavy-duty Ford F-150, F-250, Expedition, Explorer, Dodge" },
  { id: "b-75", name: "75", price: 267.00, priceDisplay: "$267.00", category: "standard", desc: "Side-terminal battery for GM / Chevrolet vehicles" },
  { id: "b-78", name: "78", price: 325.00, priceDisplay: "$325.00", category: "standard", desc: "Heavy-duty side terminal for Chevy Silverado, Tahoe, Suburban" },
  { id: "b-79", name: "79", price: 330.00, priceDisplay: "$330.00", category: "standard", desc: "High CCA side-terminal for GM luxury trucks & sedans" },
  { id: "b-85", name: "85", price: 230.00, priceDisplay: "$230.00", category: "standard", desc: "Midsize domestic sedan and crossover replacement" },
  { id: "b-86", name: "86", price: 263.00, priceDisplay: "$263.00", category: "standard", desc: "Jeep Cherokee, Wrangler, and GM crossover applications" },
  { id: "b-90-t5", name: "90/T5", price: 270.00, priceDisplay: "$270.00", category: "standard", desc: "European low-profile group for VW, Audi, Volvo" },
  { id: "b-99r-t4", name: "99R-T4", price: 365.00, priceDisplay: "$365.00", category: "standard", desc: "Specialty Euro compact & smart vehicle replacement" },
  { id: "b-121r", name: "121R", price: 257.00, priceDisplay: "$257.00", category: "standard", desc: "Hyundai, Kia, and compact Asian sedans" },
  { id: "b-124r", name: "124R", price: 290.00, priceDisplay: "$290.00", category: "standard", desc: "Hyundai Genesis, Santa Fe, Kia Sorento SUV group" },
  { id: "b-140r-h4", name: "140R-H4", price: 240.00, priceDisplay: "$240.00", category: "standard", desc: "Subcompact European & Fiat/Alfa applications" },
  { id: "b-151r", name: "151R", price: 263.00, priceDisplay: "$263.00", category: "standard", desc: "Ultra-compact group for Honda Fit, Insight, and hybrids" },
  { id: "b-85b24ls", name: "85B24LS", price: 305.00, priceDisplay: "$305.00", category: "standard", desc: "JIS Japanese import specification battery" },
  { id: "b-s34b20r", name: "S34B20R", price: 300.00, priceDisplay: "$300.00", category: "standard", desc: "Toyota Prius, Aqua & Hybrid 12V auxiliary replacement" },
  { id: "b-s46b24r", name: "S46B24R", price: 340.00, priceDisplay: "$340.00", category: "standard", desc: "Toyota Camry Hybrid, Lexus CT200h hybrid 12V battery" },

  // Premium AGM (Absorbent Glass Mat) Batteries
  { id: "b-agm-35", name: "AGM-35", price: 335.00, priceDisplay: "$335.00", category: "agm", desc: "Deep cycle AGM performance for high-drain Honda, Subaru, Toyota" },
  { id: "b-agm-24f", name: "AGM-24F", price: 325.00, priceDisplay: "$325.00", category: "agm", desc: "Heavy-duty AGM for modern start-stop Asian vehicles" },
  { id: "b-agm-51r", name: "AGM-51R", price: 325.00, priceDisplay: "$325.00", category: "agm", desc: "High vibration resistant AGM for Honda start-stop systems" },
  { id: "b-agm-h4", name: "AGM H4", price: 303.00, priceDisplay: "$303.00", category: "agm", desc: "Compact AGM European start-stop application" },
  { id: "b-agm-h5", name: "AGM-H5", price: 320.00, priceDisplay: "$320.00", category: "agm", desc: "OEM replacement AGM for Chevy, VW, Mini, Fiat" },
  { id: "b-agm-h6", name: "AGM-H6", price: 325.00, priceDisplay: "$325.00", category: "agm", desc: "Most popular European & Domestic AGM (BMW, Ford, Jeep, Audi)" },
  { id: "b-agm-h7", name: "AGM-H7", price: 345.00, priceDisplay: "$345.00", category: "agm", desc: "High-capacity AGM for luxury vehicles & modern start-stop trucks" },
  { id: "b-agm-h8", name: "AGM-H8", price: 367.00, priceDisplay: "$367.00", category: "agm", desc: "Maximum reserve capacity AGM for Mercedes, BMW 5/7 series, Porsche" },
  { id: "b-agm-h9", name: "AGM-H9", price: 395.00, priceDisplay: "$395.00", category: "agm", desc: "Extra-large commercial & luxury SUV AGM (Range Rover, Audi Q7)" },
  { id: "b-agm-124r", name: "AGM-124R", price: 320.00, priceDisplay: "$320.00", category: "agm", desc: "Premium AGM for high-tech Hyundai/Kia start-stop SUVs" },

  // Dual Battery Packages (Diesel Trucks & High Output Fleets)
  { id: "b-2-48-h6", name: "2-48-H6", price: 530.00, priceDisplay: "$530.00", category: "dual", desc: "Dual battery set for heavy-duty Duramax / Powerstroke / Cummins" },
  { id: "b-2-94r-h7", name: "2-94R-H7", price: 550.00, priceDisplay: "$550.00", category: "dual", desc: "Dual 94R-H7 matched package for Ford SuperDuty & Ram HD" },
  { id: "b-2x-65", name: "2x-65", price: 540.00, priceDisplay: "$540.00", category: "dual", desc: "Dual Group 65 commercial matched pair for Ford Powerstroke 6.7L" },
  { id: "b-48-h6-and-94r-h7", name: "48-H6-AND-94R-H7", price: 540.00, priceDisplay: "$540.00", category: "dual", desc: "Staggered primary & secondary dual battery configuration" },
  { id: "b-agm-h6-agm-h7", name: "AGM-H6-AGM-H7", price: 670.00, priceDisplay: "$670.00", category: "dual", desc: "Ultra-heavy-duty dual AGM setup for high-amperage work trucks" },

  // Auxiliary (AUX) & Dual Start-Stop Battery Bundles
  { id: "b-aux-200", name: "AUX-200", price: 210.00, priceDisplay: "$210.00", category: "aux", desc: "Auxiliary backup battery for Mercedes-Benz & modern start-stop" },
  { id: "b-aux-400", name: "AUX - 400", price: 210.00, priceDisplay: "$210.00", category: "aux", desc: "Auxiliary power unit for Jeep Wrangler, Grand Cherokee & Chrysler" },
  { id: "b-agm-h5-aux", name: "AGM-H5 & AUX Batteries", price: 528.93, priceDisplay: "$528.93", category: "aux", desc: "Complete dual primary AGM-H5 + Auxiliary battery replacement" },
  { id: "b-agm-h6-aux", name: "AGM-H6 & AUX Batteries", price: 535.54, priceDisplay: "$535.54", category: "aux", desc: "Primary AGM-H6 + Aux battery bundle for Jeep, Dodge & Euro cars" },
  { id: "b-agm-h7-aux", name: "AGM-H7 & AUX Batteries", price: 559.60, priceDisplay: "$559.60", category: "aux", desc: "Primary AGM-H7 + Aux battery combo for luxury start-stop systems" },
  { id: "b-agm-h8-aux", name: "AGM-H8 & AUX Batteries", price: 572.43, priceDisplay: "$572.43", category: "aux", desc: "Primary AGM-H8 + Aux battery combo for heavy luxury SUVs" },

  // Add-ons & Upgrades
  { id: "b-agm-upgrade", name: "AGM Upgrade", price: 90.00, priceDisplay: "$90.00", category: "addon", desc: "Upgrade any standard lead-acid battery to premium AGM technology" }
];

export const BATTERY_CATEGORIES = [
  { id: "all", name: "All Batteries", count: BATTERY_CATALOG.length },
  { id: "standard", name: "Standard Group Sizes", count: BATTERY_CATALOG.filter(b => b.category === "standard").length },
  { id: "agm", name: "Premium AGM", count: BATTERY_CATALOG.filter(b => b.category === "agm").length },
  { id: "dual", name: "Dual Battery Sets (Trucks)", count: BATTERY_CATALOG.filter(b => b.category === "dual").length },
  { id: "aux", name: "AUX & Start-Stop Bundles", count: BATTERY_CATALOG.filter(b => b.category === "aux").length },
  { id: "addon", name: "Upgrades", count: BATTERY_CATALOG.filter(b => b.category === "addon").length },
];
