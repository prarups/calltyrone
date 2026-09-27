import React, { useState, useEffect } from 'react';
import { Navigation, MapPin, Truck, CheckCircle2, Shield, ArrowRight } from 'lucide-react';
import { BUSINESS_CONFIG } from '../config/businessConfig';

export default function HowItWorks({ onRequestService }) {
  const [activeStep, setActiveStep] = useState(0);

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

  // Auto-flow animation: cycles 01 -> 02 -> 03 -> 04 -> 05 -> 01 every 2.5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [steps.length]);

  return (
    <section id="how-it-works" className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-900 border-y border-slate-800 relative overflow-hidden">
      
      {/* Background Section Image Layer */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img
          src="https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=2000&q=80"
          alt="How it works roadside assistance vehicle background"
          className="w-full h-full object-cover opacity-20 filter brightness-110 contrast-110"
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
            HOW CALL <span className="text-blue-500">TYRONE WORKS</span>
          </h2>

          <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto">
            From emergency breakdown to driving away safely in 5 simple steps.
          </p>
        </div>

        {/* Step Flow Progress Bar Indicator */}
        <div className="max-w-3xl mx-auto hidden md:flex items-center justify-between relative px-6">
          <div className="absolute left-8 right-8 top-1/2 -translate-y-1/2 h-1 bg-slate-800 -z-10 rounded-full"></div>
          <div 
            className="absolute left-8 top-1/2 -translate-y-1/2 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-amber-400 -z-10 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${(activeStep / (steps.length - 1)) * 82 + 8}%` }}
          ></div>

          {steps.map((s, idx) => (
            <button
              key={idx}
              onClick={() => setActiveStep(idx)}
              className={`w-10 h-10 rounded-full font-black text-xs flex items-center justify-center transition-all cursor-pointer border-2 ${
                idx === activeStep 
                  ? 'bg-blue-600 text-white border-blue-400 scale-125 shadow-lg shadow-blue-900/80 ring-4 ring-blue-500/30' 
                  : idx < activeStep 
                  ? 'bg-slate-900 text-blue-400 border-blue-500/60' 
                  : 'bg-slate-950 text-slate-500 border-slate-800'
              }`}
            >
              {s.num}
            </button>
          ))}
        </div>

        {/* Workflow Steps Grid with Flow Animation */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            const isActive = idx === activeStep;

            return (
              <div 
                key={idx} 
                onClick={() => setActiveStep(idx)}
                className={`p-6 rounded-2xl relative flex flex-col justify-between transition-all duration-500 cursor-pointer overflow-hidden ${
                  isActive 
                    ? 'glass-panel border-2 border-blue-500 shadow-2xl shadow-blue-950/80 scale-[1.03] bg-slate-900/95 z-20' 
                    : 'glass-panel border border-slate-800/80 opacity-75 hover:opacity-100 hover:border-slate-700 hover:scale-[1.01]'
                }`}
              >
                
                {/* Active Step Glow Backplate */}
                {isActive && (
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-indigo-500 to-amber-400 rounded-2xl blur-md opacity-60 animate-pulse"></div>
                )}

                <div className="relative z-10 space-y-4 flex flex-col h-full justify-between">
                  {/* Step Header */}
                  <div className="flex items-center justify-between">
                    <span className={`font-heading font-black text-3xl transition-colors ${
                      isActive ? 'text-blue-400 drop-shadow-md' : 'text-slate-500'
                    }`}>
                      {step.num}
                    </span>
                    <span className={`text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase transition-all ${
                      isActive 
                        ? 'bg-blue-950 border border-blue-500/60 text-blue-300 flex items-center gap-1.5 shadow-md' 
                        : 'bg-slate-950 border border-slate-800 text-slate-400'
                    }`}>
                      {isActive && (
                        <span className="relative flex h-2 w-2 shrink-0">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                        </span>
                      )}
                      <span>{step.badge}</span>
                    </span>
                  </div>

                  {/* Step Icon */}
                  <div className={`w-13 h-13 rounded-2xl flex items-center justify-center transition-all ${
                    isActive 
                      ? 'bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-xl shadow-blue-950/80 scale-110 border border-blue-400/50' 
                      : 'bg-slate-950 border border-slate-800 text-slate-400'
                  }`}>
                    <Icon className={`w-6 h-6 shrink-0 ${isActive ? 'animate-bounce text-white' : ''}`} />
                  </div>

                  {/* Step Text */}
                  <div className="space-y-1.5 flex-1">
                    <h3 className={`font-heading text-lg font-black transition-colors ${
                      isActive ? 'text-white' : 'text-slate-300'
                    }`}>
                      {step.title}
                    </h3>
                    <p className={`text-xs leading-relaxed font-normal transition-colors ${
                      isActive ? 'text-slate-200 font-medium' : 'text-slate-400'
                    }`}>
                      {step.desc}
                    </p>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* Bottom Callout CTA */}
        <div className="text-center pt-4">
          <button
            onClick={onRequestService}
            className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-extrabold text-sm px-8 py-3.5 rounded-xl shadow-xl shadow-blue-950/60 uppercase tracking-wide transition-all transform hover:-translate-y-0.5 cursor-pointer"
          >
            <span>Start Service Request Now</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
}
