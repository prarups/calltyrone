import React from 'react';
import { PhoneCall, Navigation, Activity } from 'lucide-react';
import { BUSINESS_CONFIG } from '../config/businessConfig';

export default function MobileActionBar({ onRequestService, onOpenTracking, activeRequestId }) {
  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-slate-950/95 backdrop-blur-xl border-t border-slate-800 p-2.5 shadow-2xl">
      <div className="grid grid-cols-3 gap-2 max-w-md mx-auto">
        
        {/* Call Hotline */}
        <a
          href={`tel:${BUSINESS_CONFIG.phoneRaw}`}
          className="flex flex-col items-center justify-center py-2 px-2 rounded-xl bg-slate-900 border border-blue-500/40 text-blue-400 active:scale-95 transition-transform"
        >
          <PhoneCall className="w-5 h-5 text-blue-500 mb-0.5 animate-pulse" />
          <span className="text-[10px] font-black uppercase tracking-wider text-white">Call 24/7</span>
        </a>

        {/* Track Service */}
        <button
          onClick={onOpenTracking}
          className="flex flex-col items-center justify-center py-2 px-2 rounded-xl bg-slate-900 border border-amber-500/40 text-amber-300 active:scale-95 transition-transform"
        >
          <Activity className="w-5 h-5 text-amber-400 mb-0.5" />
          <span className="text-[10px] font-black uppercase tracking-wider text-amber-300">
            {activeRequestId ? `Track #${activeRequestId.slice(-4)}` : 'Track Service'}
          </span>
        </button>

        {/* Request Service */}
        <button
          onClick={onRequestService}
          className="flex flex-col items-center justify-center py-2 px-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-900/40 active:scale-95 transition-transform"
        >
          <Navigation className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] font-black uppercase tracking-wider">Request Tech</span>
        </button>

      </div>
    </div>
  );
}
