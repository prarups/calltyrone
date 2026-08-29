import React, { useState, useEffect } from 'react';
import { MapPin, Navigation, Car, Phone, User, Disc, Clock, CheckCircle2, ArrowRight, ShieldCheck } from 'lucide-react';
import { BUSINESS_CONFIG } from '../config/businessConfig';

export default function ServiceRequestForm({ preselectedService, onRequestSubmitted, onOpenTracking }) {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    location: '',
    vehicleYear: '2022',
    vehicleMakeModel: '',
    serviceId: preselectedService || 'mobile-tire-change',
    tireSize: '',
    urgency: 'immediate',
    notes: ''
  });

  const [isLocating, setIsLocating] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedRequest, setSubmittedRequest] = useState(null);

  useEffect(() => {
    if (preselectedService) {
      setFormData(prev => ({ ...prev, serviceId: preselectedService }));
    }
  }, [preselectedService]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleDetectLocation = () => {
    setIsLocating(true);
    setTimeout(() => {
      setFormData(prev => ({
        ...prev,
        location: '4800 Airport Fwy, Fort Worth, TX 76117 (Interstate 820 Exit 22A)'
      }));
      setIsLocating(false);
    }, 800);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const generatedId = `MTP-${Math.floor(10000 + Math.random() * 90000)}`;
      const newRequest = {
        id: generatedId,
        customerName: formData.fullName || 'Customer',
        phone: formData.phone || BUSINESS_CONFIG.phone,
        location: formData.location || 'Current GPS Location',
        vehicle: `${formData.vehicleYear} ${formData.vehicleMakeModel || 'Vehicle'}`,
        serviceName: BUSINESS_CONFIG.services.find(s => s.id === formData.serviceId)?.title || 'Mobile Service',
        tireSize: formData.tireSize,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        status: 'Technician Assigned',
        etaMinutes: 14,
        distanceMiles: 2.4,
        technician: BUSINESS_CONFIG.demoTechnician
      };

      setSubmittedRequest(newRequest);
      setIsSubmitting(false);
      if (onRequestSubmitted) {
        onRequestSubmitted(newRequest);
      }
    }, 1100);
  };

  const isTireService = ['mobile-tire-change', 'flat-tire-repair', 'tire-replacement', 'tire-delivery'].includes(formData.serviceId);

  return (
    <section id="request-service" className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-950 border-y border-slate-800 relative overflow-hidden">
      
      {/* High-Visibility Background Image Layer */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img
          src="https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=2000&q=80"
          alt="Roadside emergency service technician repairing tire background"
          className="w-full h-full object-cover opacity-50 filter brightness-105 contrast-110 saturate-110"
        />
        {/* Soft Vignette Overlay for Crisp Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/40"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/60 to-slate-950/30"></div>
      </div>

      <div className="max-w-4xl mx-auto space-y-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 bg-slate-950/90 border border-red-500/60 text-red-400 text-xs font-black uppercase tracking-wider px-4 py-1.5 rounded-full shadow-2xl backdrop-blur-md">
            <Navigation className="w-3.5 h-3.5" />
            <span>24/7 Mobile Dispatch Engine</span>
          </div>

          <h2 className="font-heading text-3xl sm:text-5xl font-black uppercase tracking-tight text-white drop-shadow-2xl">
            REQUEST MOBILE <span className="bg-gradient-to-r from-red-500 via-red-400 to-amber-400 bg-clip-text text-transparent">ROADSIDE ASSISTANCE</span>
          </h2>

          <p className="text-slate-200 text-xs sm:text-sm max-w-xl mx-auto font-medium drop-shadow-md">
            Provide your breakdown location & vehicle details. Our system assigns the nearest active service unit with live GPS map telemetry.
          </p>
        </div>

        {/* Confirmation State vs Main Form */}
        {submittedRequest ? (
          /* Confirmation Screen */
          <div className="glass-panel p-6 sm:p-10 rounded-2xl border-2 border-emerald-500/60 shadow-2xl text-center space-y-6 animate-in zoom-in-95 duration-300 backdrop-blur-xl">
            <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/40 animate-bounce">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-1">
              <span className="bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider">
                Service Request Confirmed
              </span>
              <h3 className="font-heading text-3xl font-black text-white">
                SERVICE REQUEST #{submittedRequest.id}
              </h3>
              <p className="text-slate-300 text-sm">
                Master Technician <strong className="text-white font-bold">{submittedRequest.technician.name}</strong> (Unit #408) has been dispatched!
              </p>
            </div>

            {/* Request Summary Box */}
            <div className="bg-slate-950/90 p-5 rounded-xl border border-slate-800 text-left grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
              <div>
                <span className="text-slate-500 block text-[10px] uppercase font-black">Requested Service</span>
                <span className="text-white font-bold text-base">{submittedRequest.serviceName}</span>
              </div>

              <div>
                <span className="text-slate-500 block text-[10px] uppercase font-black">Estimated Arrival</span>
                <span className="text-amber-400 font-black text-base">~{submittedRequest.etaMinutes} Minutes ({submittedRequest.distanceMiles} miles away)</span>
              </div>

              <div>
                <span className="text-slate-500 block text-[10px] uppercase font-black">Target Location</span>
                <span className="text-slate-200 font-medium">{submittedRequest.location}</span>
              </div>

              <div>
                <span className="text-slate-500 block text-[10px] uppercase font-black">Vehicle</span>
                <span className="text-slate-200 font-medium">{submittedRequest.vehicle}</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                onClick={() => onOpenTracking(submittedRequest)}
                className="w-full sm:w-auto flex items-center justify-center gap-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-sm px-8 py-3.5 rounded-xl shadow-xl shadow-amber-950/50 uppercase tracking-wider transition-all transform hover:-translate-y-0.5"
              >
                <Navigation className="w-5 h-5 shrink-0" />
                <span>Track Technician Live On Map</span>
                <ArrowRight className="w-4 h-4 shrink-0" />
              </button>

              <button
                onClick={() => setSubmittedRequest(null)}
                className="w-full sm:w-auto px-6 py-3.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs rounded-xl border border-slate-700 uppercase tracking-wider"
              >
                Submit New Request
              </button>
            </div>
          </div>
        ) : (
          /* Main Form */
          <form onSubmit={handleSubmit} className="glass-panel p-6 sm:p-8 rounded-2xl border border-slate-800/80 shadow-2xl space-y-5 backdrop-blur-xl bg-slate-950/85">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              
              {/* Customer Name */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-red-500 shrink-0" />
                  Your Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="fullName"
                  required
                  placeholder="e.g. David Miller"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full bg-slate-950/90 border border-slate-800 focus:border-red-500 focus:ring-1 focus:ring-red-500 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition-all"
                />
              </div>

              {/* Phone Number */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-red-500 shrink-0" />
                  Callback Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  required
                  placeholder="(555) 000-0000"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full bg-slate-950/90 border border-slate-800 focus:border-red-500 focus:ring-1 focus:ring-red-500 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition-all"
                />
              </div>

              {/* Location Input with GPS button */}
              <div className="md:col-span-2 space-y-1.5">
                <div className="flex items-center justify-between gap-2">
                  <label className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-red-500 shrink-0" />
                    Current Breakdown Location / Address <span className="text-red-500">*</span>
                  </label>
                  <button
                    type="button"
                    onClick={handleDetectLocation}
                    disabled={isLocating}
                    className="text-[11px] font-black text-amber-400 hover:text-amber-300 flex items-center gap-1 cursor-pointer shrink-0"
                  >
                    <Navigation className="w-3 h-3 animate-spin-slow" />
                    <span>{isLocating ? 'Detecting...' : '📍 Detect My Location'}</span>
                  </button>
                </div>
                <input
                  type="text"
                  name="location"
                  required
                  placeholder="Street address, highway exit number, or landmark (e.g. I-35W Exit 42)"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full bg-slate-950/90 border border-slate-800 focus:border-red-500 focus:ring-1 focus:ring-red-500 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition-all"
                />
              </div>

              {/* Service Required Dropdown */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
                  <Disc className="w-3.5 h-3.5 text-red-500 shrink-0" />
                  Select Required Service <span className="text-red-500">*</span>
                </label>
                <select
                  name="serviceId"
                  value={formData.serviceId}
                  onChange={handleChange}
                  className="w-full bg-slate-950/90 border border-slate-800 focus:border-red-500 focus:ring-1 focus:ring-red-500 rounded-xl px-4 py-3 text-sm text-white outline-none transition-all"
                >
                  {BUSINESS_CONFIG.services.map(s => (
                    <option key={s.id} value={s.id}>
                      {s.title} ({s.startingPrice})
                    </option>
                  ))}
                </select>
              </div>

              {/* Urgency Selection */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-red-500 shrink-0" />
                  Service Urgency <span className="text-red-500">*</span>
                </label>
                <select
                  name="urgency"
                  value={formData.urgency}
                  onChange={handleChange}
                  className="w-full bg-slate-950/90 border border-slate-800 focus:border-red-500 focus:ring-1 focus:ring-red-500 rounded-xl px-4 py-3 text-sm text-white outline-none transition-all"
                >
                  <option value="immediate">🚨 Immediate Emergency Dispatch (15-30 Min)</option>
                  <option value="scheduled">📅 Schedule Service For Later Today</option>
                </select>
              </div>

              {/* Vehicle Specs */}
              <div className="md:col-span-2 space-y-1.5">
                <label className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
                  <Car className="w-3.5 h-3.5 text-red-500 shrink-0" />
                  Vehicle Year, Make & Model <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  <input
                    type="text"
                    name="vehicleYear"
                    placeholder="Year (2022)"
                    value={formData.vehicleYear}
                    onChange={handleChange}
                    className="bg-slate-950/90 border border-slate-800 focus:border-red-500 focus:ring-1 focus:ring-red-500 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 outline-none"
                  />
                  <input
                    type="text"
                    name="vehicleMakeModel"
                    required
                    placeholder="Make & Model (e.g. Ford F-150 / Tesla Y)"
                    value={formData.vehicleMakeModel}
                    onChange={handleChange}
                    className="sm:col-span-2 bg-slate-950/90 border border-slate-800 focus:border-red-500 focus:ring-1 focus:ring-red-500 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 outline-none"
                  />
                </div>
              </div>

              {/* Conditional Tire Size Input */}
              {isTireService && (
                <div className="md:col-span-2 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
                      <Disc className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      Tire Size (Printed on Sidewall)
                    </label>
                    <span className="text-[10px] text-slate-400">Optional e.g. 225/65R17</span>
                  </div>
                  <input
                    type="text"
                    name="tireSize"
                    placeholder="e.g. 225/65R17 or 275/55R20"
                    value={formData.tireSize}
                    onChange={handleChange}
                    className="w-full bg-slate-950/90 border border-slate-800 focus:border-red-500 focus:ring-1 focus:ring-red-500 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 outline-none"
                  />
                </div>
              )}

              {/* Notes */}
              <div className="md:col-span-2 space-y-1.5">
                <label className="text-xs font-bold text-slate-200 uppercase tracking-wider">
                  Breakdown Notes / Safety Hazards (Optional)
                </label>
                <textarea
                  name="notes"
                  rows="2"
                  placeholder="e.g. Parked on left shoulder near highway exit 22, hazard lights on."
                  value={formData.notes}
                  onChange={handleChange}
                  className="w-full bg-slate-950/90 border border-slate-800 focus:border-red-500 focus:ring-1 focus:ring-red-500 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 outline-none resize-none"
                ></textarea>
              </div>

            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-red-600 via-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-black text-sm sm:text-base py-4 rounded-xl shadow-2xl shadow-red-950 hover:shadow-red-600/50 uppercase tracking-wider transition-all transform active:scale-98"
              >
                {isSubmitting ? (
                  <>
                    <Navigation className="w-5 h-5 animate-spin shrink-0" />
                    <span>LOCATING NEAREST SERVICE UNIT...</span>
                  </>
                ) : (
                  <>
                    <Navigation className="w-5 h-5 shrink-0" />
                    <span>DISPATCH MOBILE TECHNICIAN NOW</span>
                  </>
                )}
              </button>

              <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mt-3 text-[11px] text-slate-300 font-medium">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Upfront Rate Guarantee
                </span>
                <span className="hidden sm:inline">•</span>
                <span>No Credit Card Upfront</span>
                <span className="hidden sm:inline">•</span>
                <span>Instant GPS Map Tracking</span>
              </div>
            </div>

          </form>
        )}

      </div>
    </section>
  );
}
