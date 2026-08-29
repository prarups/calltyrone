import React, { useState } from 'react';
import ServiceCard from './ServiceCard';
import { BUSINESS_CONFIG } from '../config/businessConfig';
import { ShieldCheck, Disc, Zap, Truck, Wrench } from 'lucide-react';

export default function Services({ onSelectService }) {
  const [filter, setFilter] = useState('all');

  const filteredServices = BUSINESS_CONFIG.services.filter(s => {
    if (filter === 'tires') return ['mobile-tire-change', 'flat-tire-repair', 'tire-replacement', 'tire-delivery'].includes(s.id);
    if (filter === 'battery_lockout') return ['battery-jumpstart', 'battery-replacement', 'lockout-service'].includes(s.id);
    if (filter === 'towing_fuel') return ['fuel-delivery', 'mobile-oil-change', 'towing-service'].includes(s.id);
    return true;
  });

  return (
    <section id="services" className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-950 relative overflow-hidden">
      
      {/* Background Section Image Layer */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img
          src="https://images.unsplash.com/photo-1586191582056-8a192138942b?auto=format&fit=crop&w=2000&q=80"
          alt="Mobile tire service background"
          className="w-full h-full object-cover opacity-20 filter brightness-110 contrast-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/90 to-slate-950"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-transparent to-slate-950"></div>
      </div>

      <div className="max-w-7xl mx-auto space-y-10 relative z-10">
        
        {/* Section Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 bg-red-600/10 border border-red-500/30 text-red-400 text-xs font-black uppercase tracking-wider px-3.5 py-1 rounded-full">
            <Wrench className="w-3.5 h-3.5" />
            <span>24/7 Mobile Service Catalog</span>
          </div>

          <h2 className="font-heading text-3xl sm:text-5xl font-black uppercase tracking-tight text-white drop-shadow-lg">
            COMPREHENSIVE <span className="text-red-500">ROADSIDE SERVICES</span>
          </h2>

          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto font-normal">
            Every service vehicle in our fleet is a fully equipped mobile repair shop manned by certified technicians. We bring state-of-the-art tools directly to your breakdown spot.
          </p>

          {/* Service Filters */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all uppercase tracking-wider border ${
                filter === 'all' 
                  ? 'bg-red-600 text-white border-red-500 shadow-md shadow-red-900/40' 
                  : 'bg-slate-900/90 text-slate-300 border-slate-800 hover:border-slate-700 backdrop-blur-sm'
              }`}
            >
              All 10 Services
            </button>

            <button
              onClick={() => setFilter('tires')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all uppercase tracking-wider border ${
                filter === 'tires' 
                  ? 'bg-red-600 text-white border-red-500 shadow-md shadow-red-900/40' 
                  : 'bg-slate-900/90 text-slate-300 border-slate-800 hover:border-slate-700 backdrop-blur-sm'
              }`}
            >
              <Disc className="w-3.5 h-3.5" />
              <span>Tire Services (4)</span>
            </button>

            <button
              onClick={() => setFilter('battery_lockout')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all uppercase tracking-wider border ${
                filter === 'battery_lockout' 
                  ? 'bg-red-600 text-white border-red-500 shadow-md shadow-red-900/40' 
                  : 'bg-slate-900/90 text-slate-300 border-slate-800 hover:border-slate-700 backdrop-blur-sm'
              }`}
            >
              <Zap className="w-3.5 h-3.5" />
              <span>Battery & Lockouts (3)</span>
            </button>

            <button
              onClick={() => setFilter('towing_fuel')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all uppercase tracking-wider border ${
                filter === 'towing_fuel' 
                  ? 'bg-red-600 text-white border-red-500 shadow-md shadow-red-900/40' 
                  : 'bg-slate-900/90 text-slate-300 border-slate-800 hover:border-slate-700 backdrop-blur-sm'
              }`}
            >
              <Truck className="w-3.5 h-3.5" />
              <span>Towing & Fuel (3)</span>
            </button>
          </div>

        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map(service => (
            <ServiceCard 
              key={service.id} 
              service={service} 
              onSelectService={onSelectService}
            />
          ))}
        </div>

        {/* Bottom Banner Note */}
        <div className="glass-panel p-6 rounded-2xl border border-slate-800 text-center flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-left">
            <div className="p-3 bg-red-600/20 text-red-400 rounded-xl border border-red-500/30">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-heading text-lg font-bold text-white">Don't See Your Exact Roadside Need?</h4>
              <p className="text-xs text-slate-300">Call our master dispatch center. We accommodate specialized commercial fleets, RVs, and custom lug patterns.</p>
            </div>
          </div>
          <a
            href={`tel:${BUSINESS_CONFIG.phoneRaw}`}
            className="bg-red-600 hover:bg-red-700 text-white text-xs font-black uppercase tracking-wider px-6 py-3 rounded-xl shrink-0 transition-all shadow-md"
          >
            Call Dispatch Custom Unit
          </a>
        </div>

      </div>
    </section>
  );
}
