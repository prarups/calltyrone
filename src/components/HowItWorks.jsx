import React from 'react';
import { Navigation, MapPin, Truck, CheckCircle2, Shield, ArrowRight } from 'lucide-react';
import { BUSINESS_CONFIG } from '../config/businessConfig';

export default function HowItWorks({ onRequestService }) {
  const steps = [
    {
      num: "01",
      title: "Request or Call",
      desc: "Submit your current location and vehicle details via our instant request form or call our 24/7 emergency hotline.",
      icon: Navigation,
      badge: "30 Seconds"
    },
    {
      num: "02",
      title: "Automated GPS Dispatch",
      desc: "Our dispatch system matches your job to the nearest mobile service van equipped with your specific tire size or tools.",
      icon: MapPin,
      badge: "Instant Match"
    },
    {
      num: "03",
      title: "Track Technician Live",
      desc: "Watch your assigned technician travel towards your location on our real-time map with live ETA & driver profile.",
      icon: Truck,
      badge: "Live Telemetry"
    },
    {
      num: "04",
      title: "On-Site Repair Service",
      desc: "Certified technician arrives, sets up safety perimeter strobes, and performs tire change, patch, battery replacement, or unlock.",
      icon: CheckCircle2,
      badge: "15-20 Min Work"
    },
    {
      num: "05",
      title: "Get Back On The Road",
      desc: "Drive away safely with full lug nut torque verification, digital invoice, and nationwide service warranty.",
      icon: Shield,
      badge: "Guaranteed"
    }
  ];

  return (
    <section id="how-it-works" className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-900 border-y border-slate-800 relative overflow-hidden">
      
      {/* Background Section Image Layer */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img
          src="https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=2000&q=80"
          alt="How it works roadside assistance vehicle background"
          className="w-full h-full object-cover opacity-20 filter brightness-105 contrast-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/90 to-slate-900"></div>
      </div>

      <div className="max-w-7xl mx-auto space-y-12 relative z-10">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 bg-blue-600/10 border border-blue-500/30 text-blue-400 text-xs font-black uppercase tracking-wider px-3.5 py-1 rounded-full">
            <span>Seamless 5-Step Process</span>
          </div>

          <h2 className="font-heading text-3xl sm:text-5xl font-black uppercase tracking-tight text-white drop-shadow-md">
            HOW MOBILE TIRE <span className="text-blue-500">PLUS WORKS</span>
          </h2>

          <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto">
            From emergency breakdown to driving away safely in 5 simple steps.
          </p>
        </div>

        {/* Workflow Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div key={idx} className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4 relative flex flex-col justify-between hover:border-blue-500/50 transition-all group">
                
                {/* Step Header */}
                <div className="flex items-center justify-between">
                  <span className="font-heading font-black text-3xl text-blue-500/80 group-hover:text-blue-400 transition-colors">
                    {step.num}
                  </span>
                  <span className="bg-slate-950 border border-slate-800 text-slate-300 text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase">
                    {step.badge}
                  </span>
                </div>

                {/* Step Icon */}
                <div className="w-12 h-12 rounded-xl bg-blue-600/10 border border-blue-500/30 text-blue-400 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <Icon className="w-6 h-6" />
                </div>

                {/* Step Text */}
                <div className="space-y-1.5 flex-1">
                  <h3 className="font-heading text-lg font-bold text-white">{step.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed font-normal">{step.desc}</p>
                </div>

              </div>
            );
          })}
        </div>

        {/* Bottom Callout CTA */}
        <div className="text-center pt-4">
          <button
            onClick={onRequestService}
            className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-extrabold text-sm px-8 py-3.5 rounded-xl shadow-xl shadow-blue-950/60 uppercase tracking-wide transition-all transform hover:-translate-y-0.5"
          >
            <span>Start Service Request Now</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
}
