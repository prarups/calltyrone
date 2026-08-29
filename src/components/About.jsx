import React from 'react';
import { ShieldCheck, Truck, Users, Award, CheckCircle2 } from 'lucide-react';
import { BUSINESS_CONFIG } from '../config/businessConfig';

export default function About() {
  const stats = [
    { label: "Availability", value: "24/7/365", sub: "Round-the-clock dispatch" },
    { label: "Avg Response Time", value: "15-30 Min", sub: "Across metro corridors" },
    { label: "Active Mobile Units", value: "65+ Vans", sub: "Fully equipped custom rigs" },
    { label: "Satisfied Drivers", value: "14,850+", sub: "Verified 5-star ratings" }
  ];

  return (
    <section id="about" className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-950 relative overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-12">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column Image Collage */}
          <div className="lg:col-span-6 relative">
            <div className="relative z-10 rounded-2xl overflow-hidden border-2 border-slate-800 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=1200&q=80"
                alt="Mobile Tire Plus roadside technician servicing vehicle"
                className="w-full h-[400px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
            </div>

            {/* Overlapping Fleet Badge */}
            <div className="absolute -bottom-6 -right-2 sm:right-6 z-20 glass-panel p-4 rounded-2xl border border-red-500/40 shadow-2xl max-w-xs space-y-2">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-red-600 rounded-lg text-white">
                  <Truck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-heading font-black text-white text-base">CUSTOM MOBILE UNITS</h4>
                  <span className="text-[11px] text-amber-400 font-bold">Italian Touchless Changers Onboard</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column Text Story */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 bg-red-600/10 border border-red-500/30 text-red-400 text-xs font-black uppercase tracking-wider px-3.5 py-1 rounded-full">
              <span>America's Premier Mobile Tire Service</span>
            </div>

            <h2 className="font-heading text-3xl sm:text-5xl font-black uppercase tracking-tight text-white leading-tight">
              REDEFINING ROADSIDE <br />
              <span className="text-red-500">ASSISTANCE ACROSS AMERICA</span>
            </h2>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-normal">
              Founded with a mission to eliminate dangerous, stressful tow truck delays, <strong className="text-white font-semibold">Mobile Tire Plus</strong> built a fleet of state-of-the-art mobile service units capable of mounting, balancing, patching, and replacing tires directly at roadside locations.
            </p>

            <p className="text-slate-300 text-sm leading-relaxed font-normal">
              We employ ASE-certified mechanics equipped with high-amperage jump packs, non-destructive lockout tools, precision torque wrenches, and fresh battery inventory. Whether you're stranded on an interstate highway shoulder or parked in your home driveway, our team delivers fast, safe, and professional roadside relief.
            </p>

            <div className="space-y-2 pt-2 text-xs sm:text-sm font-semibold text-slate-200">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-red-500" />
                <span>Fully Licensed, Insured & Highway Safety Certified</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-red-500" />
                <span>State-of-the-Art Mobile Balancing & Touchless Tire Mounting</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-red-500" />
                <span>Transparent Upfront Flat Rates — No Surprises</span>
              </div>
            </div>
          </div>

        </div>

        {/* Stats Trust Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8">
          {stats.map((st, idx) => (
            <div key={idx} className="glass-panel p-5 rounded-2xl border border-slate-800 text-center space-y-1">
              <span className="font-heading font-black text-3xl sm:text-4xl text-amber-400 block">{st.value}</span>
              <span className="font-bold text-xs text-white uppercase tracking-wider block">{st.label}</span>
              <span className="text-[11px] text-slate-400 block">{st.sub}</span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
