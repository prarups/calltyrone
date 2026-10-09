import React, { useState, useEffect } from 'react';
import { ShieldCheck, Clock, MapPin, Award, DollarSign, Car, Zap, CheckCircle2, Star, Sparkles } from 'lucide-react';
import { BUSINESS_CONFIG } from '../config/businessConfig';

export default function WhyChooseUs() {
  const [activeIndex, setActiveIndex] = useState(0);

  const stats = [
    { label: "ARRIVAL TIME", value: "FASTEST ARRIVAL TIME", icon: Clock, color: "text-amber-400" },
    { label: "DIRECT DISPATCH", value: "24/7/365", icon: Zap, color: "text-blue-400" },
    { label: "CUSTOMER RATING", value: "4.9 / 5.0 ★", icon: Star, color: "text-amber-400" },
    { label: "SATISFACTION", value: "100% GUARANTEED", icon: ShieldCheck, color: "text-green-400" }
  ];

  const reasons = [
    {
      id: "01",
      title: "24/7/365 Master Emergency Dispatch",
      desc: "Rain, snow, dark night or holiday weekend — our master dispatch center operates 24 hours a day with rapid unit dispatch to keep Atlanta drivers safe.",
      icon: Clock,
      badge: "ALWAYS ACTIVE",
      color: "from-blue-500 to-indigo-600",
      accent: "text-blue-400"
    },
    {
      id: "02",
      title: "We Come Directly To Your Location",
      desc: "Forget expensive towing fees and long tire shop waiting rooms. Our custom high-roof service vans bring mounting & repair equipment right to your car.",
      icon: MapPin,
      badge: "100% ON-SITE",
      color: "from-amber-500 to-orange-600",
      accent: "text-amber-400"
    },
    {
      id: "03",
      title: "Upfront & Transparent Flat Pricing",
      desc: "Honest flat rates quoted before technician dispatch. No hidden mileage surcharges, call-out surprises, or high-pressure sales tactics.",
      icon: DollarSign,
      badge: "NO HIDDEN FEES",
      color: "from-emerald-500 to-teal-600",
      accent: "text-emerald-400"
    },
    {
      id: "04",
      title: "ASE Master Roadside Mechanics",
      desc: "Experienced, background-checked master technicians equipped for luxury vehicles, commercial fleets, and EV high-voltage safety standards.",
      icon: Award,
      badge: "CERTIFIED PROS",
      color: "from-purple-500 to-violet-600",
      accent: "text-purple-400"
    },
    {
      id: "05",
      title: "All Makes, Luxury Cars & EVs",
      desc: "Equipped with specialized rubber jack adapters for Tesla, Rivian, and Lucid EVs, as well as ultra-low profile sports car hydraulic jacks.",
      icon: Car,
      badge: "EV & LUXURY READY",
      color: "from-cyan-500 to-blue-600",
      accent: "text-cyan-400"
    },
    {
      id: "06",
      title: "100% On-Site Satisfaction Guarantee",
      desc: "Every tire patch, replacement, and lug torque specification check is backed by our nationwide service warranty and 5-star customer promise.",
      icon: ShieldCheck,
      badge: "WARRANTY BACKED",
      color: "from-blue-600 to-indigo-700",
      accent: "text-blue-400"
    }
  ];

  // Auto step rotation every 3.5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % reasons.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [reasons.length]);

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-900 border-t border-slate-800 relative overflow-hidden">
      
      {/* Background Section Image & Animated Light Orbs */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img
          src="https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=1000&q=70"
          alt="High tech service background"
          loading="lazy"
          className="w-full h-full object-cover opacity-15 filter brightness-110 contrast-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/90 to-slate-900"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full filter blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto space-y-14 relative z-10">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-black uppercase tracking-widest px-4 py-1.5 rounded-full shadow-inner">
            <Sparkles className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '4s' }} />
            <span>Built On Speed, Safety & Excellence</span>
          </div>

          <h2 className="font-heading text-3xl sm:text-5xl font-black uppercase tracking-tight text-white drop-shadow-lg">
            WHY DRIVERS CHOOSE <span className="text-blue-500 drop-shadow-[0_0_20px_rgba(59,130,246,0.5)]">{BUSINESS_CONFIG.companyName}</span>
          </h2>

          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            The modern, fast, and stress-free alternative to traditional tow trucks and long tire shop waiting rooms.
          </p>
        </div>

        {/* Live Stat Badges Strip with Rainbow Glow & Floating Animations */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            // Stagger float animation delays for dynamic floating rhythm
            const floatDelays = ['0s', '0.7s', '1.4s', '2.1s'];

            return (
              <div 
                key={idx}
                style={{ animationDelay: floatDelays[idx % floatDelays.length] }}
                className="rainbow-glow-border rounded-2xl p-[1.5px] animate-float shadow-[0_0_25px_rgba(59,130,246,0.3)] hover:scale-105 transition-all duration-300"
              >
                <div className="bg-slate-950/95 backdrop-blur-md p-4 rounded-[14px] text-center space-y-1.5 h-full flex flex-col justify-center items-center group relative overflow-hidden">
                  
                  {/* Subtle ambient light overlay */}
                  <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />

                  <div className="flex items-center justify-center gap-1.5 text-[11px] sm:text-xs font-black tracking-wider uppercase">
                    <Icon className="w-4 h-4 rainbow-text animate-pulse group-hover:scale-125 transition-transform" />
                    <span className="rainbow-text drop-shadow">{stat.label}</span>
                  </div>

                  <div className="text-base sm:text-2xl font-black font-heading tracking-tight rainbow-text drop-shadow-[0_0_12px_rgba(255,255,255,0.4)]">
                    {stat.value}
                  </div>
                </div>
              </div>
            );
          })}
        </div>


        {/* Reasons Grid with Auto Cycling Animation */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((reason, idx) => {
            const Icon = reason.icon;
            const isActive = activeIndex === idx;

            return (
              <div
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`cursor-pointer rounded-2xl p-6 transition-all duration-500 relative group overflow-hidden ${
                  isActive
                    ? 'bg-slate-850 border-2 border-blue-500 shadow-[0_0_30px_rgba(59,130,246,0.25)] -translate-y-2'
                    : 'bg-slate-950/60 border border-slate-800 hover:border-slate-700 hover:-translate-y-1 hover:bg-slate-900/80'
                }`}
              >
                {/* Active Highlight Glow Ring / Top Bar */}
                <div 
                  className={`absolute top-0 left-0 right-0 h-1 transition-all duration-500 bg-gradient-to-r ${reason.color} ${
                    isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-60'
                  }`}
                />

                <div className="flex items-start justify-between gap-4 mb-5">
                  {/* Icon Box */}
                  <div 
                    className={`w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-500 relative ${
                      isActive 
                        ? `bg-gradient-to-br ${reason.color} text-white shadow-lg scale-110` 
                        : 'bg-slate-900 border border-slate-800 text-slate-300 group-hover:border-blue-500/40 group-hover:text-blue-400'
                    }`}
                  >
                    <Icon className="w-7 h-7" />
                    {isActive && (
                      <span className="absolute -top-1 -right-1 flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
                      </span>
                    )}
                  </div>

                  {/* ID / Badge */}
                  <div className="flex flex-col items-end gap-1">
                    <span className="text-2xl font-black font-heading text-slate-700 group-hover:text-slate-500 transition-colors">
                      {reason.id}
                    </span>
                    <span className={`text-[10px] font-black tracking-wider uppercase px-2 py-0.5 rounded-md border transition-all ${
                      isActive 
                        ? 'bg-blue-500/20 text-blue-300 border-blue-500/40' 
                        : 'bg-slate-900 text-slate-400 border-slate-800'
                    }`}>
                      {reason.badge}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-2.5">
                  <h3 className={`font-heading text-xl font-bold transition-colors ${
                    isActive ? 'text-white' : 'text-slate-200 group-hover:text-white'
                  }`}>
                    {reason.title}
                  </h3>
                  
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-normal">
                    {reason.desc}
                  </p>
                </div>

                {/* Active Indicator Bottom Edge */}
                {isActive && (
                  <div className="mt-4 pt-3 border-t border-blue-500/20 flex items-center justify-between text-xs text-blue-400 font-semibold animate-fadeIn">
                    <span className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-blue-400" />
                      Active Highlight
                    </span>
                    <span className="text-[10px] text-slate-500 uppercase tracking-widest">Auto-Cycling</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Feature Cycle Navigation Dots */}
        <div className="flex justify-center items-center gap-2 pt-2">
          {reasons.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              aria-label={`Go to reason ${idx + 1}`}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                activeIndex === idx 
                  ? 'w-8 bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)]' 
                  : 'w-2.5 bg-slate-800 hover:bg-slate-600'
              }`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}

