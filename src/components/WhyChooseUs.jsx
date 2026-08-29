import React from 'react';
import { ShieldCheck, Clock, MapPin, Award, DollarSign, Car } from 'lucide-react';
import { BUSINESS_CONFIG } from '../config/businessConfig';

export default function WhyChooseUs() {
  const reasons = [
    {
      title: "24/7/365 Emergency Dispatch",
      desc: "Rain, snow, dark night or holiday weekend — our master dispatch center operates 24 hours a day to keep American drivers safe.",
      icon: Clock,
      color: "text-red-500"
    },
    {
      title: "We Come Directly To You",
      desc: "Forget towing fees and long tire shop waiting rooms. Our custom high-roof service vans bring mounting & repair equipment right to your location.",
      icon: MapPin,
      color: "text-amber-500"
    },
    {
      title: "Upfront & Honest Pricing",
      desc: "Transparent flat rates quoted before technician dispatch. No hidden mileage surcharges, call-out surprises, or pressure sales.",
      icon: DollarSign,
      color: "text-green-500"
    },
    {
      title: "ASE Certified Technicians",
      desc: "Experienced, background-checked master roadside mechanics trained in luxury vehicles, commercial trucks, and EV high-voltage safety.",
      icon: Award,
      color: "text-blue-500"
    },
    {
      title: "All Makes, Models & EVs",
      desc: "Equipped with specialized puck adapters for Tesla, Rivian, and Lucid EVs, as well as low-profile sports car jack extensions.",
      icon: Car,
      color: "text-purple-500"
    },
    {
      title: "100% Satisfaction Guarantee",
      desc: "Every tire patch, replacement, and torque spec check is backed by our nationwide service warranty and 5-star customer promise.",
      icon: ShieldCheck,
      color: "text-red-500"
    }
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-900 border-t border-slate-800 relative overflow-hidden">
      
      {/* Background Section Image Layer */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img
          src="https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=2000&q=80"
          alt="High tech service equipment background"
          className="w-full h-full object-cover opacity-20 filter brightness-110 contrast-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/90 to-slate-900"></div>
      </div>

      <div className="max-w-7xl mx-auto space-y-12 relative z-10">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 bg-red-600/10 border border-red-500/30 text-red-400 text-xs font-black uppercase tracking-wider px-3.5 py-1 rounded-full">
            <span>Built On Speed & Safety</span>
          </div>

          <h2 className="font-heading text-3xl sm:text-5xl font-black uppercase tracking-tight text-white drop-shadow-md">
            WHY DRIVERS CHOOSE <span className="text-red-500">MOBILE TIRE PLUS</span>
          </h2>

          <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto">
            The modern alternative to legacy tow trucks and long tire shop delays.
          </p>
        </div>

        {/* Reasons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((reason, idx) => {
            const Icon = reason.icon;
            return (
              <div key={idx} className="glass-panel p-6 rounded-2xl border border-slate-800 hover:border-red-500/40 transition-all space-y-4">
                <div className={`w-12 h-12 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center ${reason.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-heading text-xl font-bold text-white">{reason.title}</h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-normal">{reason.desc}</p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
