import React from 'react';
import { ShieldCheck, Truck, Users, Award, CheckCircle2, Sparkles, Zap, Clock, Star } from 'lucide-react';
import { BUSINESS_CONFIG } from '../config/businessConfig';

export default function About() {
  const stats = [
    { label: "Availability", value: "24/7/365", sub: "Round-the-clock dispatch", icon: Clock, color: "text-amber-400" },
    { label: "Response Time", value: "Fastest Arrival Time", sub: "Across metro corridors", icon: Zap, color: "text-blue-400" },
    { label: "Active Mobile Units", value: "65+ Vans", sub: "Fully equipped custom rigs", icon: Truck, color: "text-emerald-400" },
    { label: "Satisfied Drivers", value: "14,850+", sub: "Verified 5-star ratings", icon: Star, color: "text-amber-400" }
  ];

  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-950 relative overflow-hidden">
      
      {/* Background Animated Ambient Lights */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/3 right-10 w-96 h-96 bg-blue-600/10 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-amber-500/10 rounded-full filter blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto space-y-16 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column Image Collage with Rainbow Border & Animations */}
          <div className="lg:col-span-6 relative group">
            
            {/* Outer Rainbow Animated Border Container */}
            <div className="rainbow-glow-border p-[2px] rounded-3xl animate-float shadow-[0_0_40px_rgba(59,130,246,0.35)] transition-transform duration-500 hover:scale-[1.02]">
              
              <div className="relative rounded-[22px] overflow-hidden bg-slate-900 border border-slate-800">
                
                {/* Service Van Image */}
                <img
                  src="https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=1200&q=80"
                  alt={`${BUSINESS_CONFIG.companyName} roadside technician servicing vehicle`}
                  className="w-full h-[400px] sm:h-[460px] object-cover group-hover:scale-110 transition-transform duration-700 filter brightness-105 contrast-105"
                />

                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>

                {/* Animated Light Shimmer Streak */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

                {/* Live Radar Dispatch Dot Tag */}
                <div className="absolute top-4 left-4 bg-slate-950/90 backdrop-blur-md border border-slate-700 text-white text-xs font-black uppercase tracking-wider px-3.5 py-1.5 rounded-full flex items-center gap-2 shadow-lg">
                  <span className="flex h-2.5 w-2.5 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                  </span>
                  <span>LIVE DISPATCH READY</span>
                </div>

              </div>
            </div>

            {/* Overlapping Fleet Badge with Floating Bounce & Glow */}
            <div className="absolute -bottom-6 -right-2 sm:right-6 z-20 rainbow-glow-border p-[1.5px] rounded-2xl shadow-[0_0_25px_rgba(245,158,11,0.4)] animate-float" style={{ animationDelay: '1s' }}>
              <div className="bg-slate-950/95 backdrop-blur-md p-4 rounded-[14px] border border-slate-800 max-w-xs space-y-1.5">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl text-white shadow-md animate-pulse">
                    <Truck className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-heading font-black text-white text-sm sm:text-base tracking-tight rainbow-text">
                      CUSTOM MOBILE UNITS
                    </h4>
                    <span className="text-[11px] text-amber-400 font-bold block">
                      Italian Touchless Changers Onboard
                    </span>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column Text Story */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-black uppercase tracking-widest px-4 py-1.5 rounded-full shadow-inner">
              <Sparkles className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '4s' }} />
              <span>America's Premier Mobile Tire Service</span>
            </div>

            <h2 className="font-heading text-3xl sm:text-5xl font-black uppercase tracking-tight text-white leading-tight drop-shadow-md">
              REDEFINING ROADSIDE <br />
              <span className="text-blue-500 drop-shadow-[0_0_20px_rgba(59,130,246,0.5)]">ASSISTANCE ACROSS AMERICA</span>
            </h2>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-normal">
              Founded with a mission to eliminate dangerous, stressful tow truck delays, <strong className="text-white font-black">{BUSINESS_CONFIG.companyName}</strong> built a fleet of state-of-the-art mobile service units capable of mounting, balancing, patching, and replacing tires directly at roadside locations.
            </p>

            <p className="text-slate-300 text-sm leading-relaxed font-normal">
              We employ ASE-certified mechanics equipped with high-amperage jump packs, non-destructive lockout tools, precision torque wrenches, and fresh battery inventory. Whether you're stranded on an interstate highway shoulder or parked in your home driveway, our team delivers fast, safe, and professional roadside relief.
            </p>

            <div className="space-y-2.5 pt-2 text-xs sm:text-sm font-semibold text-slate-200">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Fully Licensed, Insured & Highway Safety Certified</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>State-of-the-Art Mobile Balancing & Touchless Tire Mounting</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Transparent Upfront Flat Rates — No Hidden Surprises</span>
              </div>
            </div>
          </div>

        </div>

        {/* Stats Trust Bar with Rainbow Glow Effects */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6">
          {stats.map((st, idx) => {
            const Icon = st.icon;
            const delays = ['0s', '0.5s', '1s', '1.5s'];
            return (
              <div 
                key={idx} 
                style={{ animationDelay: delays[idx] }}
                className="rainbow-glow-border p-[1.5px] rounded-2xl animate-float shadow-[0_0_20px_rgba(59,130,246,0.2)] hover:scale-105 transition-all duration-300"
              >
                <div className="bg-slate-950/90 backdrop-blur-md p-5 rounded-[14px] text-center space-y-1 h-full flex flex-col justify-center items-center">
                  <div className="flex items-center justify-center gap-1.5 mb-1">
                    <Icon className={`w-4 h-4 ${st.color} animate-pulse`} />
                    <span className="font-bold text-xs text-slate-300 uppercase tracking-wider">{st.label}</span>
                  </div>
                  <span className="font-heading font-black text-2xl sm:text-4xl rainbow-text block drop-shadow-md">
                    {st.value}
                  </span>
                  <span className="text-[11px] text-slate-400 font-medium block">{st.sub}</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

