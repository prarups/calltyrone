import React from 'react';
import { DollarSign, CheckCircle2, ArrowRight, ShieldAlert } from 'lucide-react';
import { BUSINESS_CONFIG } from '../config/businessConfig';

export default function Pricing({ onRequestService }) {
  return (
    <section id="pricing" className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-900 border-y border-slate-800 relative overflow-hidden">
      
      {/* Background Section Image Layer */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img
          src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=2000&q=80"
          alt="Transparent pricing vehicle background"
          className="w-full h-full object-cover opacity-20 filter brightness-110 contrast-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/90 to-slate-900"></div>
      </div>

      <div className="max-w-7xl mx-auto space-y-12 relative z-10">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 bg-blue-600/10 border border-blue-500/30 text-blue-400 text-xs font-black uppercase tracking-wider px-3.5 py-1 rounded-full">
            <DollarSign className="w-3.5 h-3.5" />
            <span>Transparent Upfront Estimates</span>
          </div>

          <h2 className="font-heading text-3xl sm:text-5xl font-black uppercase tracking-tight text-white drop-shadow-md">
            HONEST SERVICE <span className="text-blue-500">PRICING</span>
          </h2>

          <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto">
            No hidden call-out surprises. We provide clear estimates before dispatching a technician to your vehicle.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {BUSINESS_CONFIG.pricingTiers.map((tier, idx) => (
            <div key={idx} className="glass-panel p-6 rounded-2xl border border-slate-800 hover:border-blue-500/50 transition-all flex flex-col justify-between space-y-6 relative group">
              
              {/* Badge */}
              <div className="absolute -top-3 right-4 bg-blue-600 text-white text-[10px] font-black uppercase tracking-wider px-3 py-0.5 rounded-full shadow-md">
                {tier.badge}
              </div>

              <div className="space-y-4">
                <h3 className="font-heading text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
                  {tier.name}
                </h3>

                <div className="flex items-baseline gap-1">
                  <span className="font-heading font-black text-4xl text-amber-400">{tier.price}</span>
                  <span className="text-xs text-slate-400 font-medium">/ {tier.period}</span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">{tier.desc}</p>

                <ul className="space-y-2 text-xs text-slate-300 pt-2 border-t border-slate-800">
                  {tier.includes.map((inc, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                      <span>{inc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={onRequestService}
                className="w-full flex items-center justify-center gap-2 bg-slate-900 hover:bg-blue-600 text-slate-200 hover:text-white border border-slate-700 hover:border-blue-500 font-extrabold text-xs py-3 rounded-xl uppercase tracking-wider transition-all"
              >
                <span>Get Instant Quote</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

            </div>
          ))}
        </div>

        {/* Pricing Disclaimer Box */}
        <div className="glass-panel p-4 rounded-xl border border-slate-800 text-xs text-slate-400 space-y-1 text-center max-w-4xl mx-auto">
          <p className="font-bold text-slate-300 flex items-center justify-center gap-1.5">
            <ShieldAlert className="w-4 h-4 text-amber-400" />
            <span>Pricing Disclaimer & Itemization:</span>
          </p>
          <p>
            * Prices shown above represent base starting rates for standard passenger cars during regular hours. Final pricing may vary based on exact vehicle make/model, OEM tire specifications, location distance from metro hubs, and late-night emergency hours. You will receive an exact quote before technician dispatch.
          </p>
        </div>

      </div>
    </section>
  );
}
