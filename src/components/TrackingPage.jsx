import React, { useState, useEffect } from 'react';
import { Navigation, Clock, MapPin, Share2, RefreshCw, XCircle, PhoneCall, CheckCircle2, AlertTriangle, ShieldCheck, ArrowLeft, Copy, Check } from 'lucide-react';
import TrackingMap from './TrackingMap';
import StatusTimeline, { LIFECYCLE_STAGES } from './StatusTimeline';
import TechnicianCard from './TechnicianCard';
import { BUSINESS_CONFIG } from '../config/businessConfig';

export default function TrackingPage({ requestData, onBackToHome }) {
  const [requestIdInput, setRequestIdInput] = useState(requestData?.id || 'MTP-28491');
  const [activeRequest, setActiveRequest] = useState(requestData || {
    id: 'MTP-28491',
    customerName: 'David Miller',
    phone: '(555) 382-9102',
    location: '4800 Airport Fwy, Fort Worth, TX 76117',
    vehicle: '2022 Ford F-150 SuperCrew',
    serviceName: 'Mobile Tire Change & Pressure Tuning',
    tireSize: '275/55R20',
    timestamp: '10:42 AM',
    status: 'Technician On The Way',
    etaMinutes: 12,
    distanceMiles: 2.4,
    technician: BUSINESS_CONFIG.demoTechnician
  });

  const [activeStageIndex, setActiveStageIndex] = useState(2); // 2 = Technician On The Way
  const [techProgress, setTechProgress] = useState(45); // 45% along route
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [cancelReason, setCancelReason] = useState('Passerby assisted me');
  const [isCancelled, setIsCancelled] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Periodic automatic progress animation to simulate real-time movement
  useEffect(() => {
    if (isCancelled || activeStageIndex >= 5) return;

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
        etaMinutes: Math.max(2, Math.floor(prev.etaMinutes - 0.2)),
        distanceMiles: Math.max(0.3, parseFloat((prev.distanceMiles - 0.05).toFixed(1)))
      }));
    }, 4000);

    return () => clearInterval(interval);
  }, [isCancelled, activeStageIndex]);

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
    setIsCancelled(false);
    setActiveRequest({
      id: requestIdInput.toUpperCase(),
      customerName: 'Verified Driver',
      phone: '(555) 019-2831',
      location: 'Interstate 35W Mile Marker 42, Fort Worth, TX',
      vehicle: '2023 Chevrolet Tahoe',
      serviceName: 'Flat Tire Repair & Vulcanize',
      timestamp: 'Just now',
      status: 'Technician Assigned',
      etaMinutes: 15,
      distanceMiles: 3.1,
      technician: BUSINESS_CONFIG.demoTechnician
    });
    setActiveStageIndex(2);
    setTechProgress(40);
  };

  return (
    <section className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 bg-slate-950 text-white relative">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Top Header Navigation */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          
          <div className="flex items-center gap-3">
            <button
              onClick={onBackToHome}
              className="p-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-xl text-slate-300 hover:text-white transition-colors"
              title="Return to Home"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>

            <div>
              <div className="flex items-center gap-2">
                <span className="bg-red-600/20 border border-red-500/40 text-red-400 text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-wider">
                  Live Dispatch Tracking
                </span>
                <span className="text-xs text-slate-400 font-mono">ID: #{activeRequest.id}</span>
              </div>
              <h1 className="font-heading text-2xl sm:text-3xl font-black uppercase text-white tracking-tight">
                REAL-TIME <span className="text-red-500">SERVICE TRACKER</span>
              </h1>
            </div>
          </div>

          {/* Request ID Lookup Field */}
          <form onSubmit={handleSearchSubmit} className="flex items-center gap-2 w-full sm:w-auto">
            <input
              type="text"
              value={requestIdInput}
              onChange={(e) => setRequestIdInput(e.target.value)}
              placeholder="Enter Request # (e.g. MTP-28491)"
              className="bg-slate-900 border border-slate-800 focus:border-red-500 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 outline-none w-full sm:w-56"
            />
            <button
              type="submit"
              className="bg-red-600 hover:bg-red-700 text-white text-xs font-bold px-4 py-2 rounded-xl transition-all uppercase tracking-wider shrink-0"
            >
              Track
            </button>
          </form>

        </div>

        {/* Cancelled Banner State */}
        {isCancelled && (
          <div className="bg-red-950/70 border border-red-500 text-white p-5 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 animate-in fade-in duration-300">
            <div className="flex items-center gap-3">
              <XCircle className="w-8 h-8 text-red-400 shrink-0" />
              <div>
                <h3 className="font-bold text-lg">Service Request Cancelled</h3>
                <p className="text-xs text-slate-300">Reason: {cancelReason}. Technician unit #408 has been released from your location.</p>
              </div>
            </div>
            <button
              onClick={() => setIsCancelled(false)}
              className="bg-slate-900 border border-slate-700 text-xs font-bold px-4 py-2 rounded-xl hover:bg-slate-800"
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
                  {activeStageIndex >= 5 ? 'ARRIVED' : `${activeRequest.etaMinutes} MIN`}
                </span>
              </div>
            </div>

            {/* Distance */}
            <div className="glass-panel p-4 rounded-xl border border-slate-800 flex items-center gap-3">
              <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400">
                <Navigation className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Distance Remaining</span>
                <span className="font-heading font-black text-2xl text-white">
                  {activeStageIndex >= 5 ? 'On Site' : `${activeRequest.distanceMiles} MILES`}
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

            {/* Service Type */}
            <div className="glass-panel p-4 rounded-xl border border-slate-800 flex items-center gap-3">
              <div className="p-3 rounded-xl bg-green-500/10 border border-green-500/30 text-green-400">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Vehicle & Service</span>
                <span className="font-bold text-xs text-white block">{activeRequest.serviceName}</span>
                <span className="text-[11px] text-slate-400">{activeRequest.vehicle}</span>
              </div>
            </div>

          </div>
        )}

        {/* Lifecycle Status Progress Bar */}
        <StatusTimeline 
          currentStageIndex={activeStageIndex}
          onSelectStage={handleStageSelect}
        />

        {/* Main Grid: Left Map + Right Technician & Controls */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Column: Interactive Map */}
          <div className="lg:col-span-8 space-y-4">
            <TrackingMap 
              techProgress={techProgress}
              activeStageIndex={activeStageIndex}
              onRefreshLocation={() => {
                setTechProgress(prev => Math.min(prev + 1, 95));
              }}
            />

            {/* Map Action Quick Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 glass-panel p-3.5 rounded-xl border border-slate-800 text-xs">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setTechProgress(prev => Math.min(prev + 5, 95))}
                  className="flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-700 px-3 py-1.5 rounded-lg font-bold text-slate-200"
                >
                  <RefreshCw className="w-3.5 h-3.5 text-amber-400" />
                  <span>Refresh Location</span>
                </button>

                <button
                  onClick={handleShareTracking}
                  className="flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-700 px-3 py-1.5 rounded-lg font-bold text-slate-200"
                >
                  {copiedLink ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Share2 className="w-3.5 h-3.5 text-blue-400" />}
                  <span>{copiedLink ? 'Link Copied!' : 'Share Tracking Link'}</span>
                </button>
              </div>

              <button
                onClick={() => setShowCancelModal(true)}
                className="flex items-center gap-1.5 text-red-400 hover:text-red-300 font-bold px-3 py-1.5 rounded-lg hover:bg-red-950/40 transition-colors ml-auto"
              >
                <XCircle className="w-4 h-4" />
                <span>Cancel Request</span>
              </button>
            </div>
          </div>

          {/* Right Column: Technician Card & Emergency Hotline */}
          <div className="lg:col-span-4 space-y-6">
            <TechnicianCard technician={activeRequest.technician} />

            {/* Hotline Help Box */}
            <div className="glass-panel-danger p-5 rounded-2xl space-y-3">
              <h4 className="font-heading text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <PhoneCall className="w-4 h-4 text-red-500" />
                24/7 Dispatch Control Center
              </h4>
              <p className="text-xs text-slate-300">
                Need to add extra breakdown details or speak with dispatch supervision immediately?
              </p>
              <a
                href={`tel:${BUSINESS_CONFIG.phoneRaw}`}
                className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold text-xs py-3 rounded-xl uppercase tracking-wider transition-all shadow-md"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Call Hotline ({BUSINESS_CONFIG.phone})</span>
              </a>
            </div>
          </div>

        </div>

      </div>

      {/* Cancellation Confirmation Modal */}
      {showCancelModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 space-y-5 relative shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="w-12 h-12 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center border border-red-500/40">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <div className="space-y-1">
              <h3 className="font-heading text-xl font-bold text-white">Cancel Roadside Service Request?</h3>
              <p className="text-xs text-slate-400">
                Technician Marcus is currently en route to your breakdown location (ETA {activeRequest.etaMinutes} mins).
              </p>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">Select Cancellation Reason:</label>
              <select
                value={cancelReason}
                onChange={(e) => setCancelReason(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 text-sm text-white rounded-xl p-3 outline-none"
              >
                <option value="Passerby assisted me">Passerby / Friend assisted with spare tire</option>
                <option value="Found spare tire in trunk">Found spare tire in my vehicle trunk</option>
                <option value="Vehicle started working">Vehicle started working again</option>
                <option value="Too long wait time">Wait time longer than expected</option>
                <option value="Requested by mistake">Requested service by mistake</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => setShowCancelModal(false)}
                className="w-full bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs py-3 rounded-xl uppercase tracking-wider"
              >
                Keep Request
              </button>
              <button
                onClick={handleConfirmCancel}
                className="w-full bg-red-600 hover:bg-red-700 text-white font-bold text-xs py-3 rounded-xl uppercase tracking-wider shadow-md"
              >
                Confirm Cancel
              </button>
            </div>
          </div>
        </div>
      )}

    </section>
  );
}
