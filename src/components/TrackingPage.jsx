import React, { useState, useEffect } from 'react';
import { Navigation, Clock, MapPin, Share2, RefreshCw, XCircle, PhoneCall, CheckCircle2, AlertTriangle, ShieldCheck, ArrowLeft, Copy, Check, Search } from 'lucide-react';
import TrackingMap from './TrackingMap';
import StatusTimeline, { LIFECYCLE_STAGES } from './StatusTimeline';
import TechnicianCard from './TechnicianCard';
import { BUSINESS_CONFIG } from '../config/businessConfig';

// Preset demo request code preserved for future re-enablement:
/*
const DEMO_PRESET_REQUEST = {
  id: 'MTP-28491',
  customerName: 'David Miller',
  phone: BUSINESS_CONFIG.phone,
  location: '4800 Airport Fwy, Fort Worth, TX 76117',
  vehicle: '2022 Ford F-150 SuperCrew',
  serviceName: 'Flat Tire Change',
  tireSize: '275/55R20',
  timestamp: '10:42 AM',
  status: 'Technician On The Way',
  etaMinutes: 12,
  distanceMiles: 2.4,
  technician: BUSINESS_CONFIG.demoTechnician
};
*/

export default function TrackingPage({ requestData, onBackToHome }) {
  const [requestIdInput, setRequestIdInput] = useState(requestData?.id || '');
  const [activeRequest, setActiveRequest] = useState(requestData || null);

  const [activeStageIndex, setActiveStageIndex] = useState(2); // 2 = Technician On The Way
  const [techProgress, setTechProgress] = useState(45); // 45% along route
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [cancelReason, setCancelReason] = useState('Passerby assisted me');
  const [isCancelled, setIsCancelled] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Periodic automatic progress animation to simulate real-time movement
  useEffect(() => {
    if (!activeRequest || isCancelled || activeStageIndex >= 5) return;

    const interval = setInterval(() => {
      setTechProgress((prev) => {
        if (prev >= 92) {
          setActiveStageIndex(3); // Arriving Soon
          return 95;
        }
        return prev + 1.5;
      });

      setActiveRequest((prev) => ({
        ...prev,
        etaMinutes: Math.max(2, (prev?.etaMinutes || 12) - 0.2)
      }));
    }, 4000);

    return () => clearInterval(interval);
  }, [isCancelled, activeStageIndex, activeRequest]);

  const handleStageSelect = (idx) => {
    setActiveStageIndex(idx);
    if (idx === 0) setTechProgress(5);
    else if (idx === 1) setTechProgress(20);
    else if (idx === 2) setTechProgress(50);
    else if (idx === 3) setTechProgress(85);
    else if (idx === 4) setTechProgress(98);
    else if (idx === 5) setTechProgress(100);
  };

  const handleShareTracking = () => {
    if (!activeRequest) return;
    navigator.clipboard?.writeText?.(window.location.origin + `?track=${activeRequest.id}`);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleConfirmCancel = () => {
    setIsCancelled(true);
    setShowCancelModal(false);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!requestIdInput.trim()) return;

    setIsCancelled(false);
    setActiveRequest({
      id: requestIdInput.trim().toUpperCase(),
      customerName: 'Verified Customer',
      phone: BUSINESS_CONFIG.phone,
      location: '4800 Airport Fwy, Fort Worth, TX 76117',
      vehicle: '2023 Chevrolet Tahoe',
      serviceName: 'Flat Tire Change',
      timestamp: 'Just now',
      status: 'Technician Assigned',
      etaMinutes: 15,
      distanceMiles: 3.1,
      technician: BUSINESS_CONFIG.demoTechnician
    });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10 px-4 sm:px-6 lg:px-8 space-y-8 relative overflow-hidden">
      
      {/* Background Layer */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img
          src="https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&w=2000&q=80"
          alt="GPS map tracking telemetry background"
          className="w-full h-full object-cover opacity-15 filter brightness-110 contrast-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/90 to-slate-950"></div>
      </div>

      <div className="max-w-7xl mx-auto space-y-8 relative z-10">
        
        {/* Top Header Navigation */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-6">
          <div className="flex items-center gap-3">
            <button
              onClick={onBackToHome}
              className="p-2.5 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white rounded-xl border border-slate-800 transition-all flex items-center gap-2 cursor-pointer shadow-md"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-wider hidden sm:inline">Main Menu</span>
            </button>

            <div>
              <div className="flex items-center gap-2">
                <span className="bg-blue-600/20 border border-blue-500/40 text-blue-400 text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-wider">
                  Live Dispatch Tracking
                </span>
                {activeRequest && (
                  <span className="text-xs text-slate-400 font-mono">ID: #{activeRequest.id}</span>
                )}
              </div>
              <h1 className="font-heading text-2xl sm:text-3xl font-black uppercase text-white tracking-tight">
                REAL-TIME <span className="text-blue-500">SERVICE TRACKER</span>
              </h1>
            </div>
          </div>

          {/* Request ID Lookup Field */}
          <form onSubmit={handleSearchSubmit} className="flex items-center gap-2 w-full sm:w-auto">
            <input
              type="text"
              value={requestIdInput}
              onChange={(e) => setRequestIdInput(e.target.value)}
              placeholder="Enter Request # (e.g. MTP-12345)"
              className="bg-slate-900 border border-slate-800 focus:border-blue-500 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 outline-none w-full sm:w-56"
            />
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-2 rounded-xl transition-all uppercase tracking-wider shrink-0 cursor-pointer"
            >
              Track
            </button>
          </form>

        </div>

        {!activeRequest ? (
          /* Empty Lookup State */
          <div className="glass-panel p-8 sm:p-12 rounded-2xl border border-slate-800 text-center max-w-xl mx-auto space-y-5 my-8">
            <div className="p-4 bg-blue-600/10 text-blue-400 rounded-full w-16 h-16 mx-auto flex items-center justify-center border border-blue-500/30">
              <Search className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <h3 className="font-heading text-2xl font-black text-white uppercase">Track Active Request</h3>
              <p className="text-xs text-slate-300 max-w-md mx-auto">
                Enter your Service Request ID to view live GPS map telemetry, driver profile, and updated arrival ETA.
              </p>
            </div>

            <form onSubmit={handleSearchSubmit} className="flex items-center gap-2 pt-2">
              <input
                type="text"
                required
                value={requestIdInput}
                onChange={(e) => setRequestIdInput(e.target.value)}
                placeholder="Enter Request # (e.g. MTP-92841)"
                className="w-full bg-slate-950 border border-slate-800 focus:border-blue-500 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-500 outline-none"
              />
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-black px-6 py-3 rounded-xl uppercase tracking-wider shrink-0 transition-all cursor-pointer shadow-md"
              >
                Search
              </button>
            </form>
          </div>
        ) : (
          <>
            {/* Cancelled Banner State */}
            {isCancelled && (
              <div className="bg-amber-950/70 border border-amber-500 text-white p-5 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 animate-in fade-in duration-300">
                <div className="flex items-center gap-3">
                  <XCircle className="w-8 h-8 text-amber-400 shrink-0" />
                  <div>
                    <h3 className="font-bold text-lg">Service Request Cancelled</h3>
                    <p className="text-xs text-slate-300">Reason: {cancelReason}. Technician unit #408 has been released from your location.</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsCancelled(false)}
                  className="bg-slate-900 border border-slate-700 text-xs font-bold px-4 py-2 rounded-xl hover:bg-slate-800 cursor-pointer"
                >
                  Re-Activate Request
                </button>
              </div>
            )}

            {/* Live Metrics Header Summary Bar */}
            {!isCancelled && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                
                {/* ETA */}
                <div className="glass-panel p-4 rounded-xl border border-slate-800 flex items-center gap-3">
                  <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
                    <Clock className="w-6 h-6 animate-pulse" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Estimated Arrival</span>
                    <span className="font-heading font-black text-2xl text-amber-400">
                      {activeStageIndex >= 5 ? 'ARRIVED' : `${Math.round(activeRequest.etaMinutes || 14)} MIN`}
                    </span>
                  </div>
                </div>

                {/* Distance */}
                <div className="glass-panel p-4 rounded-xl border border-slate-800 flex items-center gap-3">
                  <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/30 text-blue-400">
                    <Navigation className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Distance Remaining</span>
                    <span className="font-heading font-black text-2xl text-white">
                      {activeStageIndex >= 5 ? 'On Site' : `${activeRequest.distanceMiles || 2.4} MILES`}
                    </span>
                  </div>
                </div>

                {/* Customer Location */}
                <div className="glass-panel p-4 rounded-xl border border-slate-800 flex items-center gap-3">
                  <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/30 text-blue-400">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div className="overflow-hidden">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Target Location</span>
                    <span className="font-bold text-xs text-slate-200 truncate block">{activeRequest.location}</span>
                  </div>
                </div>

                {/* Status Badge */}
                <div className="glass-panel p-4 rounded-xl border border-slate-800 flex items-center gap-3">
                  <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Status</span>
                    <span className="font-bold text-xs text-emerald-400 block">{LIFECYCLE_STAGES[activeStageIndex]?.label || 'Dispatched'}</span>
                  </div>
                </div>

              </div>
            )}

            {/* Interactive Timeline Lifecycle Progression */}
            <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-heading text-lg font-bold text-white uppercase flex items-center gap-2">
                  <RefreshCw className="w-4 h-4 text-blue-500 animate-spin-slow" />
                  <span>Dispatch Progress Lifecycle</span>
                </h3>
                <span className="text-xs text-slate-400">Click stages to simulate simulation</span>
              </div>

              <StatusTimeline 
                activeStageIndex={activeStageIndex} 
                onSelectStage={handleStageSelect} 
              />
            </div>

            {/* Main Grid: Interactive Map Telemetry vs Driver Details */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Map Column */}
              <div className="lg:col-span-2 space-y-6">
                <TrackingMap progressPercent={techProgress} activeStageIndex={activeStageIndex} />
              </div>

              {/* Driver & Action Sidebar */}
              <div className="space-y-6">
                
                {/* Technician Profile Card */}
                <TechnicianCard technician={activeRequest.technician || BUSINESS_CONFIG.demoTechnician} />

                {/* Dispatch Support Actions */}
                <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-3">
                  <h4 className="font-heading text-xs font-black uppercase text-slate-400 tracking-wider">Telemetry Controls</h4>
                  
                  <button
                    onClick={handleShareTracking}
                    className="w-full flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-bold text-white py-3 rounded-xl transition-all cursor-pointer"
                  >
                    {copiedLink ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4 text-blue-400" />}
                    <span>{copiedLink ? 'Tracking Link Copied!' : 'Share Live GPS Tracking Link'}</span>
                  </button>

                  <button
                    onClick={() => setShowCancelModal(true)}
                    className="w-full flex items-center justify-center gap-2 bg-slate-900 hover:bg-rose-950/40 border border-slate-800 hover:border-rose-800/60 text-xs font-bold text-slate-400 hover:text-rose-400 py-3 rounded-xl transition-all cursor-pointer"
                  >
                    <XCircle className="w-4 h-4" />
                    <span>Cancel Service Request</span>
                  </button>
                </div>

              </div>

            </div>
          </>
        )}

      </div>

      {/* Cancel Confirmation Modal */}
      {showCancelModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="glass-panel p-6 rounded-2xl border border-slate-800 max-w-md w-full space-y-4 animate-in zoom-in-95 duration-200">
            <div className="flex items-center gap-3 text-rose-500">
              <AlertTriangle className="w-6 h-6" />
              <h3 className="font-heading text-lg font-bold text-white">Cancel Roadside Request?</h3>
            </div>
            
            <p className="text-xs text-slate-300 leading-relaxed">
              Technician Marcus Vance is currently 2.4 miles away. Are you sure you want to release this vehicle unit?
            </p>

            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-400 uppercase">Reason for cancellation</label>
              <select
                value={cancelReason}
                onChange={(e) => setCancelReason(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 text-xs text-white rounded-xl p-2.5 outline-none"
              >
                <option value="Passerby assisted me">Passerby assisted me</option>
                <option value="Wait time too long">Wait time too long</option>
                <option value="Managed to start vehicle">Managed to start vehicle</option>
                <option value="Accidental request">Accidental request</option>
              </select>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setShowCancelModal(false)}
                className="px-4 py-2 text-xs font-bold text-slate-400 hover:text-white bg-slate-900 rounded-xl"
              >
                Keep Request Active
              </button>
              <button
                onClick={handleConfirmCancel}
                className="px-4 py-2 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-xl"
              >
                Confirm Cancel
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
