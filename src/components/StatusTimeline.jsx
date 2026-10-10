import React from 'react';
import { Navigation } from 'lucide-react';
import { LIFECYCLE_STAGES } from '../config/lifecycleStages';

export default function StatusTimeline({ currentStageIndex, onSelectStage }) {
  return (
    <div className="glass-panel p-5 sm:p-6 rounded-2xl border border-slate-800 shadow-xl space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-heading font-bold text-lg text-white uppercase tracking-wider flex items-center gap-2">
          <Navigation className="w-5 h-5 text-blue-500" />
          Dispatch Status Lifecycle
        </h3>
        <span className="text-xs font-semibold text-amber-400 bg-amber-500/10 border border-amber-500/30 px-2.5 py-1 rounded-full">
          Demo Step Interactive Simulation
        </span>
      </div>

      {/* Progress Line & Steps Container */}
      <div className="relative pt-2 pb-2">
        
        {/* Horizontal Connecting Line (Desktop) */}
        <div className="hidden md:block absolute top-7 left-8 right-8 h-1 bg-slate-800 z-0">
          <div 
            className="h-full bg-gradient-to-r from-blue-600 via-amber-500 to-emerald-500 transition-all duration-700"
            style={{ width: `${(currentStageIndex / (LIFECYCLE_STAGES.length - 1)) * 100}%` }}
          ></div>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-3 relative z-10">
          {LIFECYCLE_STAGES.map((stage, idx) => {
            const Icon = stage.icon;
            const isDone = idx < currentStageIndex;
            const isCurrent = idx === currentStageIndex;

            return (
              <button
                key={stage.id}
                onClick={() => onSelectStage(idx)}
                className={`flex flex-col items-center text-center p-3 rounded-xl transition-all cursor-pointer border ${
                  isCurrent
                    ? 'bg-blue-950/60 border-blue-500 text-white shadow-lg shadow-blue-900/30 ring-2 ring-blue-500/40'
                    : isDone
                    ? 'bg-slate-900/80 border-slate-700 text-slate-200 hover:border-slate-600'
                    : 'bg-slate-950/40 border-slate-900 text-slate-500 opacity-60 hover:opacity-100'
                }`}
              >
                {/* Step Circle Icon */}
                <div className={`w-9 h-9 rounded-full flex items-center justify-center mb-2 transition-transform ${
                  isCurrent
                    ? 'bg-blue-600 text-white animate-pulse scale-110 shadow-md'
                    : isDone
                    ? 'bg-emerald-600 text-white'
                    : 'bg-slate-800 text-slate-500'
                }`}>
                  <Icon className="w-4 h-4" />
                </div>

                {/* Stage Title */}
                <span className={`text-xs font-bold ${isCurrent ? 'text-yellow-300 font-extrabold' : isDone ? 'text-white' : 'text-slate-400'}`}>
                  {stage.label}
                </span>

                {/* Stage Subtext */}
                <span className="text-[10px] text-slate-400 mt-1 line-clamp-2 leading-tight">
                  {stage.desc}
                </span>
              </button>
            );
          })}
        </div>

      </div>
    </div>
  );
}
