import React, { useState } from 'react';
import { MapPin, Search, CheckCircle2, Compass, Truck, Sparkles, Navigation, ShieldAlert } from 'lucide-react';
import { BUSINESS_CONFIG } from '../config/businessConfig';

export default function ServiceAreas({ onRequestService }) {
  const [zipInput, setZipInput] = useState('');
  const [searchResult, setSearchResult] = useState(null);

  const quickZipPresets = [
    { city: 'Atlanta Downtown', zip: '30303' },
    { city: 'Alpharetta / Milton', zip: '30004' },
    { city: 'Marietta / Cobb', zip: '30062' },
    { city: 'Stockbridge / Henry', zip: '30281' },
    { city: 'Lawrenceville / Gwinnett', zip: '30043' },
    { city: 'Decatur / DeKalb', zip: '30030' },
  ];

  const runZipCheck = (zipCode) => {
    const cleanZip = zipCode.trim().replace(/\D/g, '');
    if (!cleanZip) return;

    if (cleanZip.length !== 5) {
      setSearchResult({
        covered: false,
        zip: cleanZip,
        message: "Invalid ZIP Code format. Please enter a 5-digit US ZIP code.",
        units: "Example Atlanta ZIPs: 30303, 30004, 30062, 30281",
        eta: "50-Mile Greater Atlanta Service Radius Only"
      });
      return;
    }

    const isCovered = BUSINESS_CONFIG.supportedZipCodes
      ? BUSINESS_CONFIG.supportedZipCodes.includes(cleanZip)
      : ["300", "301", "302", "303", "305", "306"].includes(cleanZip.substring(0, 3));

    const matchedZone = BUSINESS_CONFIG.serviceAreas.find(zone => 
      zone.zipPrefixes.some(p => cleanZip.startsWith(p))
    );

    if (isCovered) {
      const unitsCount = matchedZone ? matchedZone.units : 14;
      const zoneName = matchedZone ? matchedZone.name : `Greater Atlanta Service Area (${cleanZip})`;
      
      setSearchResult({
        covered: true,
        zip: cleanZip,
        zoneName: zoneName,
        message: `GUARANTEED 24/7 COVERAGE FOR ZIP ${cleanZip}`,
        subtext: `Call Tyrone provides rapid mobile dispatch service across ${zoneName}.`,
        units: `${unitsCount} active mobile units currently patrolling this sector`,
        eta: "Fastest arrival time dispatch guarantee"
      });
    } else {
      setSearchResult({
        covered: false,
        zip: cleanZip,
        message: `OUTSIDE SERVICE RADIUS: ZIP ${cleanZip}`,
        subtext: `ZIP code ${cleanZip} is currently outside our 165 verified Greater Atlanta service areas.`,
        units: "No standard mobile units stationed in this distant area",
        eta: `Call dispatch hotline ${BUSINESS_CONFIG.phone} for custom highway dispatch inquiries`
      });
    }
  };

  const handleZipCheck = (e) => {
    e.preventDefault();
    runZipCheck(zipInput);
  };

  const handlePresetClick = (zipCode) => {
    setZipInput(zipCode);
    runZipCheck(zipCode);
  };

  return (
    <section id="service-areas" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-950 relative overflow-hidden">
      
      {/* Background Section Glows & Image Layer */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img
          src="https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&w=2000&q=80"
          alt="USA Metro highway map service area background"
          className="w-full h-full object-cover opacity-15 filter brightness-110 contrast-125"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/90 to-slate-950"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-transparent to-slate-950"></div>
        
        {/* Animated Radial Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl animate-pulse pointer-events-none"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
      </div>

      <div className="max-w-7xl mx-auto space-y-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600/20 via-indigo-600/20 to-blue-600/20 border border-blue-500/40 text-blue-400 text-xs font-black uppercase tracking-widest px-4 py-1.5 rounded-full shadow-lg shadow-blue-950/50">
            <MapPin className="w-4 h-4 text-blue-400 animate-bounce" />
            <span>50-Mile Greater Atlanta Service Radius</span>
          </div>

          <h2 className="font-heading text-3xl sm:text-5xl font-black uppercase tracking-tight text-white drop-shadow-md">
            ATLANTA METRO & <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-blue-500">50-MILE RADIUS COVERAGE</span>
          </h2>

          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            We operate heavy-duty mobile service fleets servicing Greater Atlanta and all surrounding cities within a 50-mile radius with 24/7 rapid dispatch.
          </p>
        </div>

        {/* Colorful Animated ZIP Code Checker Box */}
        <div className="max-w-3xl mx-auto relative group">
          
          {/* Animated Gradient Border Overlay */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 via-indigo-500 to-amber-500 rounded-3xl blur opacity-30 group-hover:opacity-60 transition duration-500"></div>

          <div className="relative bg-slate-900/90 border border-slate-800 p-6 sm:p-8 rounded-3xl backdrop-blur-xl shadow-2xl space-y-6">
            
            <div className="text-center space-y-1.5">
              <div className="inline-flex items-center gap-1.5 text-amber-400 text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Instant Service Checker</span>
              </div>
              <h3 className="font-heading text-xl sm:text-2xl font-black text-white uppercase tracking-tight">
                Check Immediate Service Availability
              </h3>
              <p className="text-xs text-slate-300">
                Enter your 5-digit Atlanta / Georgia ZIP code below for instant dispatch feasibility.
              </p>
            </div>

            {/* Input Form */}
            <form onSubmit={handleZipCheck} className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="w-5 h-5 text-blue-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  maxLength={5}
                  value={zipInput}
                  onChange={(e) => setZipInput(e.target.value)}
                  placeholder="Enter 5-digit ZIP code (e.g. 30301 or 30004)"
                  className="w-full bg-slate-950 border border-slate-700/80 focus:border-blue-500 rounded-2xl pl-12 pr-4 py-3.5 text-sm text-white placeholder-slate-500 outline-none transition-all shadow-inner focus:ring-2 focus:ring-blue-500/20 font-bold"
                />
              </div>
              <button
                type="submit"
                className="bg-gradient-to-r from-blue-600 via-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-black text-xs sm:text-sm px-8 py-3.5 rounded-2xl uppercase tracking-wider transition-all shadow-xl shadow-blue-950 hover:shadow-blue-600/40 cursor-pointer shrink-0"
              >
                Verify ZIP Coverage
              </button>
            </form>

            {/* Quick Click Preset ZIPs */}
            <div className="pt-1 space-y-2">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block text-center sm:text-left">
                Popular Greater Atlanta Service ZIPs:
              </span>
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                {quickZipPresets.map((preset, pIdx) => (
                  <button
                    key={pIdx}
                    type="button"
                    onClick={() => handlePresetClick(preset.zip)}
                    className="bg-slate-950/80 hover:bg-blue-600/20 border border-slate-800 hover:border-blue-500/50 text-slate-300 hover:text-white text-xs font-semibold px-3 py-1.5 rounded-xl transition-all cursor-pointer flex items-center gap-1.5"
                  >
                    <MapPin className="w-3 h-3 text-blue-400" />
                    <span>{preset.city} ({preset.zip})</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Colorful Animated Result Card */}
            {searchResult && (
              <div className={`p-5 rounded-2xl border text-left space-y-3 animate-in fade-in zoom-in-95 duration-300 shadow-2xl ${
                searchResult.covered 
                  ? 'bg-gradient-to-r from-emerald-950/90 via-slate-900 to-emerald-950/90 border-emerald-500/60 text-emerald-200 shadow-emerald-950/50' 
                  : 'bg-gradient-to-r from-rose-950/90 via-slate-900 to-rose-950/90 border-rose-500/60 text-rose-200 shadow-rose-950/50'
              }`}>
                <div className="flex items-start gap-3 font-black text-base sm:text-lg">
                  {searchResult.covered ? (
                    <div className="p-2 bg-emerald-500/20 text-emerald-400 rounded-xl border border-emerald-500/40 shrink-0">
                      <CheckCircle2 className="w-6 h-6 animate-pulse" />
                    </div>
                  ) : (
                    <div className="p-2 bg-rose-500/20 text-rose-400 rounded-xl border border-rose-500/40 shrink-0">
                      <ShieldAlert className="w-6 h-6 animate-pulse" />
                    </div>
                  )}
                  <div className="space-y-1">
                    <span className="block tracking-tight uppercase">
                      {searchResult.message}
                    </span>
                    <p className="text-xs text-slate-300 font-normal">
                      {searchResult.subtext}
                    </p>
                  </div>
                </div>

                <div className="text-xs space-y-1.5 text-slate-200 pl-11 border-t border-slate-800/80 pt-3">
                  <div className="flex items-center gap-2 font-semibold">
                    <Truck className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>{searchResult.units}</span>
                  </div>
                  <div className="flex items-center gap-2 font-semibold">
                    <Compass className="w-4 h-4 text-blue-400 shrink-0" />
                    <span>{searchResult.eta}</span>
                  </div>
                </div>

                {searchResult.covered && (
                  <div className="pt-2 pl-11">
                    <button
                      onClick={() => {
                        const el = document.getElementById('request-service');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                        else if (onRequestService) onRequestService();
                      }}
                      className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-black text-xs sm:text-sm px-6 py-2.5 rounded-xl uppercase tracking-wider shadow-lg transition-all cursor-pointer flex items-center gap-2"
                    >
                      <Navigation className="w-4 h-4" />
                      <span>Request Immediate Dispatch For ZIP {searchResult.zip}</span>
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Coverage Cards Grid with Animated Radar Lights */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {BUSINESS_CONFIG.serviceAreas.map((area, idx) => (
            <div key={idx} className="group relative bg-slate-900/80 border border-slate-800 hover:border-blue-500/50 p-6 rounded-3xl transition-all duration-300 hover:shadow-2xl hover:shadow-blue-950/40 space-y-4 overflow-hidden backdrop-blur-xl">
              
              {/* Top Accent Line */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-amber-500 opacity-60 group-hover:opacity-100 transition-opacity"></div>

              <div className="flex items-center justify-between">
                <h4 className="font-heading font-black text-lg text-white group-hover:text-blue-400 transition-colors uppercase tracking-tight">
                  {area.name}
                </h4>
                <span className="bg-blue-600/20 text-blue-400 border border-blue-500/40 text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                  {area.state}
                </span>
              </div>

              {/* Radar Status Indicator */}
              <div className="flex items-center justify-between bg-slate-950/90 border border-slate-800 px-3.5 py-2 rounded-2xl">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                  </span>
                  <span className="text-xs font-bold text-slate-200">Active Mobile Units</span>
                </div>
                <span className="text-xs font-black text-amber-400">{area.units} Fleet Vans</span>
              </div>

              {/* Popular Cities Pills */}
              <div className="space-y-2">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                  Popular Cities Covered:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {area.popularCities.map((city, cIdx) => (
                    <span 
                      key={cIdx} 
                      className="bg-slate-950 border border-slate-800 hover:border-blue-500/40 text-slate-300 hover:text-white text-xs px-2.5 py-1 rounded-xl transition-all hover:shadow-sm"
                    >
                      {city}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
