import React, { useState, useEffect } from 'react';
import { Clock, Disc, Wrench, CircleDot, Truck, Zap, BatteryCharging, Key, Fuel, Droplet, ShieldAlert, CheckCircle2, ArrowRight, Navigation, Moon } from 'lucide-react';

const ICON_MAP = {
  Disc,
  Wrench,
  CircleDot,
  Truck,
  Zap,
  BatteryCharging,
  Key,
  Fuel,
  Droplet,
  ShieldAlert
};

const DEFAULT_FALLBACK_IMAGE = "https://images.unsplash.com/photo-1578844251758-2f71da64c96f?auto=format&fit=crop&w=1200&q=80";

export default function ServiceCard({ service, onSelectService }) {
  const [imgSrc, setImgSrc] = useState(service.image);
  const IconComponent = ICON_MAP[service.iconName] || Disc;

  useEffect(() => {
    setImgSrc(service.image);
  }, [service.image]);

  const handleImageError = () => {
    // If specific image fails, fallback to default high-definition roadside image
    setImgSrc(DEFAULT_FALLBACK_IMAGE);
  };

  return (
    <div className="hover-rainbow-card rounded-2xl group cursor-pointer transition-all duration-300">
      <div className="glass-panel rounded-[15px] overflow-hidden border border-slate-800/80 group-hover:border-transparent transition-all duration-300 flex flex-col justify-between h-full bg-slate-950/90 backdrop-blur-xl">
        
        {/* Service Image with overlay badges */}
        <div className="relative h-48 sm:h-52 overflow-hidden bg-slate-950">
          <img
            src={imgSrc}
            alt={service.title}
            onError={handleImageError}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 filter brightness-105 contrast-105 saturate-110"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent"></div>

          {/* Popular Badge */}
          {service.popular && (
            <div className="absolute top-3 right-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md shadow-lg border border-blue-400/30 animate-pulse">
              High Demand
            </div>
          )}

          {/* Response Time Badge */}
          <div className="absolute bottom-3 left-3 bg-slate-950/90 backdrop-blur-md border border-slate-800 text-slate-100 text-xs font-bold px-3 py-1 rounded-lg flex items-center gap-1.5 shadow-md group-hover:border-blue-500/50 transition-colors">
            <Clock className="w-3.5 h-3.5 text-amber-400 group-hover:animate-spin" />
            <span>{service.estimatedEta}</span>
          </div>

          {/* Icon Floating Badge */}
          <div className="absolute top-3 left-3 w-10 h-10 rounded-xl bg-slate-950/90 backdrop-blur-md border border-slate-700 text-blue-500 flex items-center justify-center shadow-lg group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-indigo-600 group-hover:text-white group-hover:scale-110 transition-all">
            <IconComponent className="w-5 h-5" />
          </div>
        </div>

        {/* Card Content Body */}
        <div className="p-5 sm:p-6 space-y-4 flex-1 flex flex-col justify-between">
          
          <div className="space-y-2.5">
            <div className="flex items-center justify-between gap-2">
              <h3 className="font-heading text-xl font-bold text-white group-hover:rainbow-text transition-all">
                {service.title}
              </h3>
              <div className="text-right shrink-0">
                <span className="text-amber-400 group-hover:text-emerald-400 font-heading font-black text-lg block transition-colors">
                  {service.startingPrice}
                </span>
                <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold block">
                  BASE + DISTANCE PRICE
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
              {service.shortDesc}
            </p>

            {/* Pricing Structure & After-Hours Badges */}
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-blue-300 bg-blue-950/80 border border-blue-500/30 px-2 py-0.5 rounded-md group-hover:border-blue-400 transition-colors">
                <Navigation className="w-3 h-3 text-blue-400" />
                Distance-Based Pricing
              </span>
              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-300 bg-amber-950/80 border border-amber-500/30 px-2 py-0.5 rounded-md group-hover:border-amber-400 transition-colors" title="After-hours fee applies for dispatches between 6:00 PM and 6:00 AM">
                <Moon className="w-3 h-3 text-amber-400" />
                After-Hours Fee (6PM - 6AM)
              </span>
            </div>

            {/* Feature List */}
            <ul className="space-y-1.5 pt-1 text-xs text-slate-300">
              {service.features.map((feat, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 group-hover:text-emerald-400 shrink-0 transition-colors" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Action Button */}
          <div className="pt-4 border-t border-slate-800/80">
            <button
              onClick={() => onSelectService(service.id)}
              className="w-full flex items-center justify-center gap-2 bg-slate-900 group-hover:rainbow-glow-border group-hover:text-white text-slate-200 border border-slate-800 group-hover:border-transparent text-xs font-extrabold uppercase tracking-wider py-3 rounded-xl transition-all shadow-md group-hover:shadow-[0_0_20px_rgba(59,130,246,0.5)]"
            >
              <span className="relative z-10 group-hover:font-black">Get Help Now</span>
              <ArrowRight className="w-4 h-4 text-blue-500 group-hover:text-white group-hover:translate-x-1.5 transition-transform relative z-10" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );

}
