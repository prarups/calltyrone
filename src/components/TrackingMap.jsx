import React, { useState } from 'react';
import { MapPin, Truck, RefreshCw, ZoomIn, ZoomOut, Layers, Compass } from 'lucide-react';

export default function TrackingMap({ techProgress, activeStageIndex, onRefreshLocation }) {
  const [mapStyle, setMapStyle] = useState('dark');
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Position calculation along polyline
  const startX = 15;
  const startY = 22;
  const endX = 75;
  const endY = 68;

  const currentX = startX + (endX - startX) * (techProgress / 100);
  const currentY = startY + (endY - startY) * (techProgress / 100);

  const handleRefresh = () => {
    setIsRefreshing(true);
    if (onRefreshLocation) onRefreshLocation();
    setTimeout(() => setIsRefreshing(false), 700);
  };

  return (
    <div className="relative w-full h-[380px] sm:h-[480px] rounded-2xl overflow-hidden border border-slate-800 shadow-2xl bg-slate-950">
      
      {/* Map Surface */}
      <div className={`absolute inset-0 transition-colors duration-500 ${
        mapStyle === 'dark' 
          ? 'bg-slate-950 bg-grid-pattern' 
          : 'bg-slate-900 bg-dot-pattern opacity-90'
      }`}>
        
        {/* SVG Vector Street Grid & Glowing Route Line */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40">
          <path d="M 0,120 Q 200,80 400,180 T 800,240 T 1200,300" stroke="#334155" strokeWidth="18" fill="none" />
          <path d="M 0,120 Q 200,80 400,180 T 800,240 T 1200,300" stroke="#0f172a" strokeWidth="14" fill="none" />
          <path d="M 0,120 Q 200,80 400,180 T 800,240 T 1200,300" stroke="#f59e0b" strokeWidth="2" strokeDasharray="8 6" fill="none" />

          <path d="M 120,0 L 250,500" stroke="#1e293b" strokeWidth="12" fill="none" />
          <path d="M 400,0 L 520,500" stroke="#1e293b" strokeWidth="12" fill="none" />
          <path d="M 680,0 L 720,500" stroke="#1e293b" strokeWidth="12" fill="none" />

          <path 
            d={`M 150,90 C 250,150 450,220 750,330`} 
            stroke="#2563eb" 
            strokeWidth="5" 
            fill="none" 
            strokeLinecap="round"
            className="animate-pulse"
          />
          <path 
            d={`M 150,90 C 250,150 450,220 750,330`} 
            stroke="#f59e0b" 
            strokeWidth="2.5" 
            fill="none" 
            strokeDasharray="6 4"
          />
        </svg>

      </div>

      {/* Top Left GPS Status Badge */}
      <div className="absolute top-3 left-3 z-20 flex items-center gap-2 bg-slate-950/90 backdrop-blur-md border border-slate-800 rounded-xl px-3 py-1.5 shadow-lg">
        <span className="relative flex h-2 w-2 shrink-0">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </span>
        <div className="flex flex-col">
          <span className="text-[9px] uppercase font-black text-slate-400 tracking-wider">Dispatch Status</span>
          <span className="text-[11px] font-bold text-white flex items-center gap-1">
            <Compass className="w-3 h-3 text-blue-500 animate-spin-slow shrink-0" />
            Unit #408 • 34 MPH
          </span>
        </div>
      </div>

      {/* Top Right Controls */}
      <div className="absolute top-3 right-3 z-20 flex items-center gap-1 bg-slate-950/90 backdrop-blur-md border border-slate-800 rounded-xl p-1 shadow-lg">
        <button
          onClick={() => setMapStyle(mapStyle === 'dark' ? 'satellite' : 'dark')}
          className="p-1.5 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
          title="Toggle Map Style"
        >
          <Layers className="w-3.5 h-3.5 text-amber-400" />
        </button>
        <button
          onClick={handleRefresh}
          className={`p-1.5 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors ${isRefreshing ? 'animate-spin text-amber-400' : ''}`}
          title="Refresh GPS Coordinates"
        >
          <RefreshCw className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Customer Location Pin */}
      <div 
        className="absolute z-20 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-700"
        style={{ left: `${endX}%`, top: `${endY}%` }}
      >
        <div className="relative flex flex-col items-center">
          <div className="absolute -inset-3 rounded-full bg-blue-600/30 animate-ping"></div>
          
          <div className="bg-slate-950/95 border border-blue-500 text-white text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded shadow-md mb-1 whitespace-nowrap">
            📍 Breakdown Spot
          </div>
          
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-xl border-2 border-white">
            <MapPin className="w-4 h-4 sm:w-5 sm:h-5 fill-white text-blue-600" />
          </div>
        </div>
      </div>

      {/* Moving Technician Van Marker */}
      <div 
        className="absolute z-30 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-1000 ease-out"
        style={{ left: `${currentX}%`, top: `${currentY}%` }}
      >
        <div className="relative flex flex-col items-center">
          
          <div className="bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 text-[9px] sm:text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded shadow-xl mb-1 flex items-center gap-1 whitespace-nowrap border border-amber-300">
            <Truck className="w-3 h-3 text-slate-950 shrink-0" />
            <span>Tech Marcus (Unit #408)</span>
          </div>

          <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-br from-blue-600 via-indigo-600 to-amber-500 text-white flex items-center justify-center shadow-2xl border-2 border-yellow-400 beacon-pulse cursor-pointer">
            <Truck className="w-5 h-5 sm:w-6 sm:h-6 animate-pulse" />
          </div>

        </div>
      </div>

      {/* Bottom Map Legend */}
      <div className="absolute bottom-3 left-3 z-20 bg-slate-950/90 backdrop-blur-md border border-slate-800 rounded-xl px-3 py-1.5 flex items-center gap-3 text-[10px] font-bold text-slate-300">
        <div className="flex items-center gap-1">
          <div className="w-2.5 h-2.5 rounded-full bg-blue-600 border border-white"></div>
          <span>Customer</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-2.5 h-2.5 rounded-md bg-amber-500 border border-yellow-300"></div>
          <span>Service Van</span>
        </div>
        <div className="flex items-center gap-1 hidden sm:flex">
          <div className="w-3 h-1 bg-blue-500 rounded-full"></div>
          <span>Live Route</span>
        </div>
      </div>

    </div>
  );
}
