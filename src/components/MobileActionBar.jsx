import React from 'react';
import { PhoneCall, Calendar } from 'lucide-react';
import { BUSINESS_CONFIG } from '../config/businessConfig';

export default function MobileActionBar({ onRequestService }) {
  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-slate-950/95 backdrop-blur-2xl border-t border-slate-800/90 px-3 py-2.5 shadow-2xl">
      <div className="grid grid-cols-2 gap-2.5 max-w-md mx-auto">
        
        {/* Call Hotline */}
        <a
          href={`tel:${BUSINESS_CONFIG.phoneRaw}`}
          className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-full bg-slate-900/95 border border-slate-700/80 text-white active:scale-95 transition-all shadow-md group cursor-pointer"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <PhoneCall className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
          <span className="text-xs font-black uppercase tracking-wider text-slate-100">Call 24/7</span>
        </a>

        {/* Book Now */}
        <button
          onClick={onRequestService}
          className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-full bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 hover:from-amber-300 hover:to-yellow-400 text-slate-950 font-black shadow-lg shadow-amber-500/25 active:scale-95 transition-all cursor-pointer border border-amber-300/50"
        >
          <Calendar className="w-4 h-4 stroke-[2.5]" />
          <span className="text-xs font-black uppercase tracking-wider">Book Now</span>
        </button>

      </div>
    </div>
  );
}
