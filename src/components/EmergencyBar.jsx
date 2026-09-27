import React from 'react';
import { PhoneCall, ShieldAlert, Zap, Disc, CheckCircle2 } from 'lucide-react';
import { BUSINESS_CONFIG } from '../config/businessConfig';

export default function EmergencyBar() {
  const tickerItems = (
    <div className="flex items-center gap-6 sm:gap-10 font-extrabold uppercase tracking-wider text-[11px] sm:text-xs whitespace-nowrap shrink-0 pr-6 sm:pr-10">
      <span className="flex items-center gap-2 text-yellow-300 font-black">
        <ShieldAlert className="w-4 h-4 text-yellow-300 shrink-0 animate-pulse" />
        24/7 FAST ROADSIDE ASSISTANCE — WE COME DIRECTLY TO YOU
      </span>
      <span className="text-blue-400 font-black">•</span>
      <span className="flex items-center gap-2 text-white">
        <Zap className="w-4 h-4 text-amber-400 shrink-0 animate-pulse" />
        Average Arrival Time: <strong className="text-yellow-300 underline font-black">{BUSINESS_CONFIG.dispatchTime}</strong>
      </span>
      <span className="text-blue-400 font-black">•</span>
      <a
        href={`tel:${BUSINESS_CONFIG.phoneRaw}`}
        className="inline-flex items-center gap-1.5 bg-yellow-400 hover:bg-yellow-300 text-slate-950 font-black px-3 py-0.5 rounded-full transition-transform hover:scale-105 shadow-md cursor-pointer"
      >
        <PhoneCall className="w-3.5 h-3.5 text-slate-950 shrink-0" />
        <span>DISPATCH: {BUSINESS_CONFIG.phone}</span>
      </a>
      <span className="text-blue-400 font-black">•</span>
      <span className="flex items-center gap-2 text-slate-200">
        <Disc className="w-3.5 h-3.5 text-blue-400 shrink-0" />
        Flat Tire Change $99 • Jump Start $99 • Fuel Delivery $99 • Lockout $99 • Mount & Balance $35
      </span>
      <span className="text-blue-400 font-black">•</span>
      <span className="flex items-center gap-2 text-emerald-300">
        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
        50-Mile Atlanta Metro Service Radius • No Hidden Fees
      </span>
      <span className="text-blue-400 font-black">•</span>
    </div>
  );

  return (
    <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-950 border-b border-blue-500/30 text-white py-2 shadow-2xl relative z-50 overflow-hidden">
      <div className="relative w-full overflow-hidden flex">
        <div className="animate-marquee flex items-center">
          {tickerItems}
          {tickerItems}
        </div>
      </div>
    </div>
  );
}
