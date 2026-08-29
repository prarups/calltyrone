import React from 'react';
import { PhoneCall, ShieldAlert, Zap } from 'lucide-react';
import { BUSINESS_CONFIG } from '../config/businessConfig';

export default function EmergencyBar() {
  return (
    <div className="bg-gradient-to-r from-red-700 via-red-600 to-amber-600 text-white py-2 px-3 sm:px-6 shadow-xl relative z-50 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2 sm:gap-4 text-xs">
        
        {/* Left Status Pulse */}
        <div className="flex items-center gap-2 font-bold tracking-wide">
          <span className="relative flex h-2.5 w-2.5 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-300 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-yellow-400"></span>
          </span>
          <span className="font-extrabold uppercase tracking-wider text-yellow-300 flex items-center gap-1.5 whitespace-nowrap">
            <ShieldAlert className="w-3.5 h-3.5 text-yellow-300 inline shrink-0" />
            24/7 EMERGENCY ROADSIDE ASSISTANCE — WE COME TO YOU
          </span>
        </div>

        {/* Center Tagline - Hidden on Small Screens to Avoid Overlap */}
        <div className="hidden lg:flex items-center gap-2 font-bold text-white/90 whitespace-nowrap">
          <Zap className="w-3.5 h-3.5 text-yellow-300 animate-pulse shrink-0" />
          <span>Average Arrival Time: <strong className="text-white underline font-black">{BUSINESS_CONFIG.dispatchTime}</strong></span>
        </div>

        {/* Right Clickable Phone CTA */}
        <div className="flex items-center gap-2 ml-auto sm:ml-0 shrink-0">
          <a 
            href={`tel:${BUSINESS_CONFIG.phoneRaw}`}
            className="flex items-center gap-1.5 bg-slate-950/50 hover:bg-slate-950/80 border border-white/30 text-white px-2.5 py-1 rounded-full transition-all font-black text-xs shadow-sm group whitespace-nowrap"
          >
            <PhoneCall className="w-3 h-3 text-yellow-300 group-hover:scale-110 transition-transform shrink-0" />
            <span>DISPATCH: <strong className="text-yellow-300 font-black">{BUSINESS_CONFIG.phone}</strong></span>
          </a>
        </div>

      </div>
    </div>
  );
}
