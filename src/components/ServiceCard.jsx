import React, { useState } from 'react';
import { Clock, Disc, Wrench, CircleDot, Truck, Zap, BatteryCharging, Key, Fuel, Droplet, ShieldAlert, CheckCircle2, ArrowRight } from 'lucide-react';

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

  const handleImageError = () => {
    // If specific image fails, fallback to default high-definition roadside image
    setImgSrc(DEFAULT_FALLBACK_IMAGE);
  };

  return (
    <div className="glass-panel rounded-2xl overflow-hidden border border-slate-800 hover:border-red-500/50 transition-all duration-300 group flex flex-col justify-between hover:shadow-2xl hover:shadow-red-950/30">
      
      {/* Service Image with overlay badges */}
      <div className="relative h-48 sm:h-52 overflow-hidden bg-slate-950">
        <img
          src={imgSrc}
          alt={service.title}
          onError={handleImageError}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-105 contrast-105 saturate-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent"></div>

        {/* Popular Badge */}
        {service.popular && (
          <div className="absolute top-3 right-3 bg-red-600 text-white text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md shadow-lg">
            High Demand
          </div>
        )}

        {/* Response Time Badge */}
        <div className="absolute bottom-3 left-3 bg-slate-950/90 backdrop-blur-md border border-slate-800 text-slate-100 text-xs font-bold px-3 py-1 rounded-lg flex items-center gap-1.5 shadow-md">
          <Clock className="w-3.5 h-3.5 text-amber-400" />
          <span>{service.estimatedEta}</span>
        </div>

        {/* Icon Floating Badge */}
        <div className="absolute top-3 left-3 w-10 h-10 rounded-xl bg-slate-950/90 backdrop-blur-md border border-slate-700 text-red-500 flex items-center justify-center shadow-lg group-hover:bg-red-600 group-hover:text-white transition-colors">
          <IconComponent className="w-5 h-5" />
        </div>
      </div>

      {/* Card Content Body */}
      <div className="p-5 sm:p-6 space-y-4 flex-1 flex flex-col justify-between">
        
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="font-heading text-xl font-bold text-white group-hover:text-red-400 transition-colors">
              {service.title}
            </h3>
            <span className="text-amber-400 font-heading font-black text-lg">
              {service.startingPrice}
            </span>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
            {service.shortDesc}
          </p>

          {/* Feature List */}
          <ul className="space-y-1.5 pt-2 text-xs text-slate-300">
            {service.features.map((feat, idx) => (
              <li key={idx} className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-red-500 shrink-0" />
                <span>{feat}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Action Button */}
        <div className="pt-4 border-t border-slate-800/80">
          <button
            onClick={() => onSelectService(service.id)}
            className="w-full flex items-center justify-center gap-2 bg-slate-900 hover:bg-gradient-to-r hover:from-red-600 hover:to-red-700 text-slate-200 hover:text-white border border-slate-800 hover:border-red-500 text-xs font-extrabold uppercase tracking-wider py-3 rounded-xl transition-all shadow-md group-hover:shadow-red-900/40"
          >
            <span>Get Help Now</span>
            <ArrowRight className="w-4 h-4 text-red-500 group-hover:text-white group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

      </div>

    </div>
  );
}
