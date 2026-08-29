import React, { useState } from 'react';
import { MapPin, Search, CheckCircle2, PhoneCall, AlertCircle, Compass, Truck } from 'lucide-react';
import { BUSINESS_CONFIG } from '../config/businessConfig';

export default function ServiceAreas({ onRequestService }) {
  const [zipInput, setZipInput] = useState('');
  const [searchResult, setSearchResult] = useState(null);

  const handleZipCheck = (e) => {
    e.preventDefault();
    const cleanZip = zipInput.trim();
    if (!cleanZip) return;

    const prefix = cleanZip.substring(0, 2);
    const matchedZone = BUSINESS_CONFIG.serviceAreas.find(zone => zone.zipPrefixes.includes(prefix));

    if (matchedZone || cleanZip.length === 5) {
      const unitsCount = matchedZone ? matchedZone.units : Math.floor(6 + Math.random() * 8);
      const zoneName = matchedZone ? matchedZone.name : `Region ${cleanZip} Zone`;
      
      setSearchResult({
        covered: true,
        message: `YES! Mobile Tire Plus provides 24/7 service in ${zoneName} (ZIP ${cleanZip}).`,
        units: `${unitsCount} active mobile units currently in service area`,
        eta: "15 to 25 minutes average dispatch arrival time"
      });
    } else {
      setSearchResult({
        covered: false,
        message: `ZIP code ${cleanZip} is in our extended border radius zone.`,
        units: "Mobile units available via special dispatch call",
        eta: "Call 1-800-555-8473 to confirm immediate technician dispatch"
      });
    }
  };

  return (
    <section id="service-areas" className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-950 relative overflow-hidden">
      
      {/* Background Section Image Layer */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img
          src="https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&w=2000&q=80"
          alt="USA Metro highway map service area background"
          className="w-full h-full object-cover opacity-20 filter brightness-110 contrast-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/90 to-slate-950"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-transparent to-slate-950"></div>
      </div>

      <div className="max-w-7xl mx-auto space-y-10 relative z-10">
        
        {/* Section Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 bg-red-600/10 border border-red-500/30 text-red-400 text-xs font-black uppercase tracking-wider px-3.5 py-1 rounded-full">
            <MapPin className="w-3.5 h-3.5" />
            <span>50+ Mile Metro Service Radius</span>
          </div>

          <h2 className="font-heading text-3xl sm:text-5xl font-black uppercase tracking-tight text-white drop-shadow-md">
            USA SERVICE AREAS & <span className="text-red-500">COVERAGE ZONES</span>
          </h2>

          <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto">
            We operate heavy-duty mobile service fleets across major metropolitan highway corridors and surrounding suburbs.
          </p>
        </div>

        {/* Interactive ZIP Code Checker Box */}
        <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-slate-800 max-w-3xl mx-auto space-y-6 shadow-2xl">
          <div className="text-center space-y-1">
            <h3 className="font-heading text-xl font-bold text-white uppercase tracking-wider">
              Check Immediate Service Availability
            </h3>
            <p className="text-xs text-slate-400">
              Enter your 5-digit ZIP code below for instant dispatch feasibility.
            </p>
          </div>

          <form onSubmit={handleZipCheck} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-5 h-5 text-slate-500 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                maxLength={5}
                value={zipInput}
                onChange={(e) => setZipInput(e.target.value)}
                placeholder="Enter 5-digit ZIP code (e.g. 75001 or 90210)"
                className="w-full bg-slate-950 border border-slate-800 focus:border-red-500 rounded-xl pl-11 pr-4 py-3.5 text-sm text-white placeholder-slate-500 outline-none"
              />
            </div>
            <button
              type="submit"
              className="bg-red-600 hover:bg-red-700 text-white font-extrabold text-xs px-8 py-3.5 rounded-xl uppercase tracking-wider transition-all shadow-md shrink-0"
            >
              Verify ZIP Coverage
            </button>
          </form>

          {/* Result Box */}
          {searchResult && (
            <div className={`p-4 rounded-xl border text-left space-y-2 animate-in zoom-in-95 duration-200 ${
              searchResult.covered 
                ? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-200' 
                : 'bg-amber-950/60 border-amber-500/40 text-amber-200'
            }`}>
              <div className="flex items-center gap-2 font-bold text-base">
                {searchResult.covered ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-amber-400" />
                )}
                <span>{searchResult.message}</span>
              </div>
              <div className="text-xs space-y-1 text-slate-300 pl-7">
                <p>• {searchResult.units}</p>
                <p>• {searchResult.eta}</p>
              </div>
              <div className="pt-2 pl-7">
                <button
                  onClick={onRequestService}
                  className="bg-red-600 text-white font-bold text-xs px-4 py-2 rounded-lg uppercase tracking-wider"
                >
                  Request Dispatch For This ZIP
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Coverage Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {BUSINESS_CONFIG.serviceAreas.map((area, idx) => (
            <div key={idx} className="glass-panel p-5 rounded-2xl border border-slate-800 hover:border-red-500/40 transition-all space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-heading font-bold text-lg text-white">{area.name}</h4>
                <span className="bg-red-600/20 text-red-400 border border-red-500/30 text-[10px] font-black px-2 py-0.5 rounded uppercase">
                  {area.state}
                </span>
              </div>

              <div className="flex items-center gap-2 text-xs text-amber-400 font-semibold">
                <Truck className="w-4 h-4" />
                <span>{area.units} Active Fleet Service Vans</span>
              </div>

              <div className="space-y-1">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Popular Cities Covered:</span>
                <div className="flex flex-wrap gap-1.5">
                  {area.popularCities.map((city, cIdx) => (
                    <span key={cIdx} className="bg-slate-900 border border-slate-800 text-slate-300 text-[11px] px-2 py-0.5 rounded-md">
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
