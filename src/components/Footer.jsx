import React from 'react';
import { Disc, PhoneCall, MapPin } from 'lucide-react';
import { BUSINESS_CONFIG } from '../config/businessConfig';

export default function Footer({ onRequestService, onOpenTracking, onOpenDownloadGuide }) {
  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-slate-400 pt-12 pb-24 lg:pb-12 text-xs relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Top Emergency CTA Strip inside Footer */}
        <div className="bg-gradient-to-r from-blue-700 via-indigo-600 to-amber-600 rounded-2xl p-6 sm:p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-1 text-center md:text-left">
            <h3 className="font-heading text-2xl sm:text-3xl font-black uppercase tracking-tight">
              STRANDED ON THE ROAD? CALL TYRONE NOW!
            </h3>
            <p className="text-xs sm:text-sm text-blue-100 font-medium">
              24/7 Mobile Tire Change, Flat Repair, Battery Jump-Start & Lockout Assistance across major USA cities.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <a
              href={`tel:${BUSINESS_CONFIG.phoneRaw}`}
              className="bg-slate-950 hover:bg-slate-900 text-yellow-300 font-black text-sm px-6 py-3.5 rounded-xl border border-white/20 transition-all flex items-center gap-2 shadow-lg"
            >
              <PhoneCall className="w-4 h-4 text-yellow-300" />
              <span>{BUSINESS_CONFIG.phone}</span>
            </a>

            <button
              onClick={onRequestService}
              className="bg-white hover:bg-slate-100 text-slate-950 font-black text-xs px-6 py-3.5 rounded-xl uppercase tracking-wider transition-all shadow-lg"
            >
              Request Service Now
            </button>
          </div>
        </div>

        {/* Main Footer Links Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 border-b border-slate-800/80 pb-10">
          
          {/* Col 1: Brand & Tagline */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3.5">
              <div className="relative w-11 h-11 rounded-full p-[2px] bg-gradient-to-tr from-blue-500 via-indigo-500 to-amber-400 shadow-xl flex items-center justify-center bg-slate-950 shrink-0">
                <div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center overflow-hidden p-0.5 border border-slate-800">
                  <img 
                    src={BUSINESS_CONFIG.logo} 
                    alt={BUSINESS_CONFIG.name} 
                    className="w-full h-full object-cover rounded-full"
                    onError={(e) => { e.target.style.display = 'none'; }}
                  />
                </div>
              </div>
              <span className="font-heading font-black text-xl text-white uppercase tracking-tight">
                CALL <span className="text-blue-500">TYRONE</span>
              </span>
            </div>

            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              {BUSINESS_CONFIG.shortDescription}
            </p>

            <div className="pt-2 space-y-1">
              <p className="text-slate-300 font-bold flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-blue-500" />
                <span>{BUSINESS_CONFIG.address.fullAddress}</span>
              </p>
              <p className="text-slate-400">Dispatch Email: {BUSINESS_CONFIG.email}</p>
            </div>
          </div>

          {/* Col 2: Services */}
          <div className="space-y-3">
            <h4 className="font-heading text-sm font-bold text-white uppercase tracking-wider">Tire Services</h4>
            <ul className="space-y-2 text-slate-400">
              <li><a href="#services" className="hover:text-blue-400">Mobile Tire Change</a></li>
              <li><a href="#services" className="hover:text-blue-400">Flat Tire Patch & Repair</a></li>
              <li><a href="#services" className="hover:text-blue-400">On-Site Tire Replacement</a></li>
              <li><a href="#services" className="hover:text-blue-400">Emergency Tire Delivery</a></li>
              <li><a href="#services" className="hover:text-blue-400">TPMS Sensor Recalibration</a></li>
            </ul>
          </div>

          {/* Col 3: Roadside & Battery */}
          <div className="space-y-3">
            <h4 className="font-heading text-sm font-bold text-white uppercase tracking-wider">Roadside & Battery</h4>
            <ul className="space-y-2 text-slate-400">
              <li><a href="#services" className="hover:text-blue-400">Battery Jump-Start (12V/24V)</a></li>
              <li><a href="#services" className="hover:text-blue-400">Mobile Battery Replacement</a></li>
              <li><a href="#services" className="hover:text-blue-400">Damage-Free Lockout Entry</a></li>
              <li><a href="#services" className="hover:text-blue-400">Fuel & Diesel Delivery</a></li>
              <li><a href="#services" className="hover:text-blue-400">Flatbed Towing & Recovery</a></li>
            </ul>
          </div>

          {/* Col 4: Navigation & Tools */}
          <div className="space-y-3">
            <h4 className="font-heading text-sm font-bold text-white uppercase tracking-wider">Quick Navigation</h4>
            <ul className="space-y-2 text-slate-400">
              {/* <li><button onClick={onOpenTracking} className="hover:text-amber-400 font-bold text-amber-500">📍 Real-Time Service Tracking</button></li> */}
              <li><button onClick={onOpenDownloadGuide} className="hover:text-blue-400 text-left">📄 Download Emergency Guide</button></li>
              <li><a href="#service-areas" className="hover:text-blue-400">USA Service Areas</a></li>
              <li><a href="#pricing" className="hover:text-blue-400">Pricing & Estimates</a></li>
              <li><a href="#reviews" className="hover:text-blue-400">Customer Testimonials</a></li>
              <li><a href="#faq" className="hover:text-blue-400">Roadside FAQ</a></li>
            </ul>
          </div>

        </div>

        {/* Bottom Copyright & Disclaimer */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-slate-400 border-t border-slate-900 pt-6">
          <p>© {new Date().getFullYear()} Call Tyrone LLC. All rights reserved. 24/7 Mobile Tire & Roadside Assistance USA.</p>
          <div className="flex items-center gap-4">
            <a href="#home" className="hover:text-slate-300">Privacy Policy</a>
            <span>•</span>
            <a href="#home" className="hover:text-slate-300">Terms of Service</a>
            <span>•</span>
            <a href="#home" className="hover:text-slate-300">Roadside Disclaimer</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
