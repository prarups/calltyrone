import React, { useState } from 'react';
import { MapPin, Car, Phone, User, Disc, CheckCircle2, ShieldCheck, X, Calendar, Clock, Zap } from 'lucide-react';
import { BUSINESS_CONFIG } from '../config/businessConfig';

const getTodayDateString = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const getCurrentTimeString = () => {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  return `${hours}:${minutes}`;
};

export default function ServiceRequestForm({ preselectedService, onRequestSubmitted, onCancel, onClose, isModal: _isModal = false }) {
  const [serviceTiming, setServiceTiming] = useState('asap'); // 'asap' | 'scheduled'
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    location: '',
    locationUrl: '',
    vehicleYear: '2022',
    vehicleMakeModel: '',
    serviceId: preselectedService || 'flat-tire-change',
    bookingDate: getTodayDateString(),
    bookingTime: getCurrentTimeString(),
    notes: ''
  });

  const [prevPreselectedService, setPrevPreselectedService] = useState(preselectedService);
  if (preselectedService && preselectedService !== prevPreselectedService) {
    setPrevPreselectedService(preselectedService);
    setFormData(prev => ({ ...prev, serviceId: preselectedService }));
  }

  const [isLocating, setIsLocating] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedRequest, setSubmittedRequest] = useState(null);

  const formatPhoneNumber = (value) => {
    if (!value) return value;
    if (value.startsWith('+')) return value;
    const digits = value.replace(/\D/g, '');
    // If 10 digits starting with Indian mobile prefixes (6,7,8,9), format cleanly
    if (digits.length === 10 && ['6', '7', '8', '9'].includes(digits[0])) {
      return `+91 ${digits.slice(0, 5)} ${digits.slice(5)}`;
    }
    if (digits.length <= 3) return digits;
    if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
    if (digits.length <= 10) return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
    return value;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'phone') {
      setFormData(prev => ({ ...prev, phone: formatPhoneNumber(value) }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleDetectLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser. Please type your breakdown location manually.");
      return;
    }

    setIsLocating(true);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        const liveMapsUrl = `https://maps.google.com/?q=${latitude.toFixed(6)},${longitude.toFixed(6)}`;

        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`,
            { headers: { 'Accept-Language': 'en' } }
          );
          if (response.ok) {
            const data = await response.json();
            const address = data.display_name || `GPS (${latitude.toFixed(5)}, ${longitude.toFixed(5)})`;
            setFormData(prev => ({ 
              ...prev, 
              location: address,
              locationUrl: liveMapsUrl 
            }));
          } else {
            setFormData(prev => ({
              ...prev,
              location: `GPS (${latitude.toFixed(5)}, ${longitude.toFixed(5)})`,
              locationUrl: liveMapsUrl
            }));
          }
        } catch {
          setFormData(prev => ({
            ...prev,
            location: `GPS (${latitude.toFixed(5)}, ${longitude.toFixed(5)})`,
            locationUrl: liveMapsUrl
          }));
        } finally {
          setIsLocating(false);
        }
      },
      (error) => {
        console.warn("Geolocation permission error or timeout:", error);
        let errorMsg = "Could not fetch GPS location automatically.";
        if (error.code === 1) {
          errorMsg = "Location permission denied by browser. Please allow location access or type your address manually.";
        } else if (error.code === 2) {
          errorMsg = "GPS signal unavailable. Please type your location manually.";
        } else if (error.code === 3) {
          errorMsg = "GPS request timed out. Please try tapping GPS Detect again or type manually.";
        }
        alert(errorMsg);
        setIsLocating(false);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const selectedServiceObj = BUSINESS_CONFIG.services.find(s => s.id === formData.serviceId);
    const serviceTitle = selectedServiceObj ? selectedServiceObj.title : 'Roadside Assistance';
    
    // Build real Google Maps URL from user input or GPS coordinates
    const userLocation = formData.location.trim();
    const mapsUrl = formData.locationUrl || `https://maps.google.com/?q=${encodeURIComponent(userLocation)}`;

    const targetEmail = BUSINESS_CONFIG.dispatchEmail || BUSINESS_CONFIG.email || 'info@mobiletireplus.com';

    const isAsap = serviceTiming === 'asap';
    const emailPayload = {
      _subject: `🚨 NEW SERVICE DISPATCH: ${isAsap ? '[⚡ IMMEDIATE ASAP] ' : '[📅 SCHEDULED] '}${serviceTitle} - ${formData.fullName}`,
      _captcha: "false",
      _template: "table",
      "Dispatch Priority": isAsap ? "⚡ IMMEDIATE DISPATCH (VENTANE / RIGHT NOW)" : "📅 SCHEDULED APPOINTMENT",
      "Customer Name": formData.fullName,
      "Phone Number": formData.phone,
      "Booking Date": isAsap ? `${getTodayDateString()} (Today - Right Now)` : formData.bookingDate,
      "Booking Time": isAsap ? "Immediate / ASAP (Fastest Arrival)" : formData.bookingTime,
      "Service Requested": serviceTitle,
      "Vehicle Info": `${formData.vehicleYear} ${formData.vehicleMakeModel || ''}`.trim(),
      "Breakdown Location": userLocation,
      "Google Maps GPS Link": mapsUrl,
      "Additional Notes": formData.notes || 'None provided',
      "Submitted Time": new Date().toLocaleString()
    };

    try {
      await fetch(`https://formsubmit.co/ajax/${targetEmail}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(emailPayload)
      });
    } catch (error) {
      console.warn("FormSubmit email dispatch background error:", error);
    }

    const generatedId = `MTP-${Math.floor(10000 + Math.random() * 90000)}`;
    const newRequest = {
      id: generatedId,
      type: 'email',
      customerName: formData.fullName || 'Customer',
      phone: formData.phone || BUSINESS_CONFIG.phone,
      location: formData.location || 'Current Location',
      locationUrl: mapsUrl,
      vehicle: `${formData.vehicleYear} ${formData.vehicleMakeModel || 'Vehicle'}`,
      serviceName: serviceTitle,
      serviceTiming: isAsap ? 'Immediate (ASAP)' : 'Scheduled',
      bookingDate: isAsap ? getTodayDateString() : formData.bookingDate,
      bookingTime: isAsap ? 'Immediate / ASAP' : formData.bookingTime,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: isAsap ? 'Dispatched (Priority ASAP)' : 'Scheduled Appointment'
    };

    setSubmittedRequest(newRequest);
    setIsSubmitting(false);
    if (onRequestSubmitted) {
      onRequestSubmitted(newRequest);
    }
  };

  const handleCloseAction = onCancel || onClose;

  return (
    <div id="request-service" className="max-w-xl mx-auto relative w-full my-3 px-2 sm:px-0 scroll-mt-24">
      <div className="bg-slate-900 border border-slate-800 p-5 sm:p-6 rounded-2xl shadow-2xl space-y-3.5 relative overflow-hidden backdrop-blur-xl">
        
        {/* Compact Header */}
        <div className="flex items-start justify-between gap-3 border-b border-slate-800 pb-3">
          <div>
            <span className="text-[10px] sm:text-xs font-black uppercase text-blue-400 bg-blue-500/10 border border-blue-500/30 px-2.5 py-0.5 rounded-full inline-block mb-1">
              24/7 Rapid Dispatch
            </span>
            <h3 className="font-heading text-xl sm:text-2xl font-black uppercase text-white tracking-tight">
              Request Service
            </h3>
            <p className="text-slate-300 text-xs mt-0.5">
              Enter details for instant technician dispatch (Fastest Arrival Time)
            </p>
          </div>

          {handleCloseAction && (
            <button
              type="button"
              onClick={handleCloseAction}
              className="p-1.5 text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-full border border-slate-700 transition-all cursor-pointer shrink-0"
              aria-label="Close form"
              title="Close"
            >
              <X className="w-4.5 h-4.5" />
            </button>
          )}
        </div>

        {submittedRequest ? (
          /* Clean & Simple Message Sent Screen */
          <div className="py-6 text-center space-y-4 animate-in fade-in duration-200">
            <div className="w-14 h-14 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/40 shadow-lg shadow-emerald-950/50">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-1.5 max-w-md mx-auto">
              <h4 className="font-heading text-xl sm:text-2xl font-black text-white uppercase tracking-tight">
                {submittedRequest.serviceTiming === 'Immediate (ASAP)'
                  ? '⚡ IMMEDIATE SERVICE DISPATCHED!'
                  : '📅 SERVICE APPOINTMENT SCHEDULED!'}
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                {submittedRequest.serviceTiming === 'Immediate (ASAP)' ? (
                  <>
                    Thank you, <strong className="text-white font-bold">{submittedRequest.customerName}</strong>. Your request for <strong className="text-blue-400 font-bold">{submittedRequest.serviceName}</strong> has been prioritized for <strong className="text-amber-400 font-bold">IMMEDIATE DISPATCH (ASAP)</strong>. A technician will call you at <strong className="text-white font-bold">{submittedRequest.phone}</strong> within 5-15 minutes.
                  </>
                ) : (
                  <>
                    Thank you, <strong className="text-white font-bold">{submittedRequest.customerName}</strong>. Your request for <strong className="text-blue-400 font-bold">{submittedRequest.serviceName}</strong> scheduled on <strong className="text-amber-400 font-bold">{submittedRequest.bookingDate}</strong> at <strong className="text-amber-400 font-bold">{submittedRequest.bookingTime}</strong> has been saved. A dispatch representative will call you at <strong className="text-white font-bold">{submittedRequest.phone}</strong> to confirm your slot.
                  </>
                )}
              </p>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-2.5 max-w-md mx-auto">
              <a
                href={`tel:${BUSINESS_CONFIG.phoneRaw}`}
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-black text-xs sm:text-sm py-2.5 px-5 rounded-xl uppercase tracking-wider transition-all shadow-md"
              >
                <Phone className="w-4 h-4" />
                <span>Call Dispatch ({BUSINESS_CONFIG.phone})</span>
              </a>
              
              {handleCloseAction && (
                <button
                  type="button"
                  onClick={handleCloseAction}
                  className="w-full sm:w-auto py-2.5 px-5 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs sm:text-sm rounded-xl uppercase tracking-wider cursor-pointer border border-slate-700 transition-all"
                >
                  Done / Close
                </button>
              )}
            </div>
          </div>
        ) : (
          /* Simple & Easy Form */
          <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-3.5">
            
            {/* Name & Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-blue-400" /> Full Name *
                </label>
                <input
                  type="text"
                  name="fullName"
                  required
                  placeholder="e.g. David Miller"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full bg-slate-950 border border-slate-800 focus:border-blue-500 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 outline-none transition-colors"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-blue-400" /> Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  required
                  placeholder="(404) 000-0000"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full bg-slate-950 border border-slate-800 focus:border-blue-500 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 outline-none transition-colors"
                />
              </div>
            </div>

            {/* Location */}
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-blue-400" /> Breakdown Location *
                </label>
                <button
                  type="button"
                  onClick={handleDetectLocation}
                  disabled={isLocating}
                  className="text-xs font-bold text-amber-400 hover:underline cursor-pointer"
                >
                  {isLocating ? 'Locating...' : '📍 GPS Detect'}
                </button>
              </div>
              <input
                type="text"
                name="location"
                required
                placeholder="Street address or highway exit (e.g. I-35 Exit 42)"
                value={formData.location}
                onChange={handleChange}
                className="w-full bg-slate-950 border border-slate-800 focus:border-blue-500 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 outline-none transition-colors"
              />
            </div>

            {/* Service & Vehicle */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                  <Disc className="w-3.5 h-3.5 text-blue-400" /> Required Service *
                </label>
                <select
                  name="serviceId"
                  value={formData.serviceId}
                  onChange={handleChange}
                  className="w-full bg-slate-950 border border-slate-800 focus:border-blue-500 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white outline-none transition-colors"
                >
                  {BUSINESS_CONFIG.services.map(s => (
                    <option key={s.id} value={s.id}>
                      {s.title} ({s.startingPrice})
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                  <Car className="w-3.5 h-3.5 text-blue-400" /> Vehicle Model *
                </label>
                <input
                  type="text"
                  name="vehicleMakeModel"
                  required
                  placeholder="e.g. 2022 Ford F-150"
                  value={formData.vehicleMakeModel}
                  onChange={handleChange}
                  className="w-full bg-slate-950 border border-slate-800 focus:border-blue-500 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 outline-none transition-colors"
                />
              </div>
            </div>

            {/* Service Timing Toggle: Immediate / ASAP vs Schedule for Later */}
            <div className="space-y-2 pt-0.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-blue-400" /> When do you need service? *
                </label>
                {serviceTiming === 'asap' && (
                  <span className="text-[10px] font-bold text-amber-400 bg-amber-500/10 border border-amber-500/30 px-2 py-0.5 rounded-full flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping inline-block"></span>
                    Fastest Arrival
                  </span>
                )}
              </div>

              <div className="grid grid-cols-2 gap-2 p-1 bg-slate-950 border border-slate-800 rounded-xl">
                <button
                  type="button"
                  onClick={() => setServiceTiming('asap')}
                  className={`flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    serviceTiming === 'asap'
                      ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-black shadow-md'
                      : 'text-slate-400 hover:text-white hover:bg-slate-900'
                  }`}
                >
                  <Zap className="w-3.5 h-3.5 shrink-0" />
                  <span>Immediate / ASAP</span>
                </button>

                <button
                  type="button"
                  onClick={() => setServiceTiming('scheduled')}
                  className={`flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    serviceTiming === 'scheduled'
                      ? 'bg-blue-600 text-white font-black shadow-md'
                      : 'text-slate-400 hover:text-white hover:bg-slate-900'
                  }`}
                >
                  <Calendar className="w-3.5 h-3.5 shrink-0" />
                  <span>Schedule for Later</span>
                </button>
              </div>

              {serviceTiming === 'asap' ? (
                <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-2.5 flex items-center gap-2.5 text-xs text-amber-300 animate-in fade-in duration-200">
                  <Zap className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>
                    <strong>Emergency Dispatch:</strong> Nearest mobile technician will be alerted and dispatched immediately for the fastest arrival time!
                  </span>
                </div>
              ) : (
                /* Booking Date & Time inputs */
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 animate-in fade-in duration-200">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-blue-400" /> Booking Date *
                    </label>
                    <input
                      type="date"
                      name="bookingDate"
                      required
                      min={getTodayDateString()}
                      value={formData.bookingDate}
                      onChange={handleChange}
                      className="w-full bg-slate-950 border border-slate-800 focus:border-blue-500 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 outline-none transition-colors [color-scheme:dark]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-blue-400" /> Preferred Time *
                    </label>
                    <input
                      type="time"
                      name="bookingTime"
                      required
                      value={formData.bookingTime}
                      onChange={handleChange}
                      className="w-full bg-slate-950 border border-slate-800 focus:border-blue-500 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 outline-none transition-colors [color-scheme:dark]"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Notes */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-200">Notes / Hazards (Optional)</label>
              <input
                type="text"
                name="notes"
                placeholder="e.g. Parked on shoulder, hazard lights on"
                value={formData.notes}
                onChange={handleChange}
                className="w-full bg-slate-950 border border-slate-800 focus:border-blue-500 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 outline-none transition-colors"
              />
            </div>

            {/* Submit Request Action Button */}
            <div className="pt-2 space-y-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full flex items-center justify-center gap-2.5 font-black text-sm sm:text-base py-3.5 px-4 rounded-xl shadow-xl uppercase tracking-wider transition-all cursor-pointer disabled:opacity-50 ${
                  serviceTiming === 'asap'
                    ? 'bg-gradient-to-r from-amber-500 via-amber-600 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 shadow-amber-950/40'
                    : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-blue-900/40'
                }`}
              >
                {serviceTiming === 'asap' ? (
                  <>
                    <Zap className="w-5 h-5 shrink-0 fill-current" />
                    <span>{isSubmitting ? 'Dispatching Immediately...' : 'Request Immediate Service (ASAP)'}</span>
                  </>
                ) : (
                  <>
                    <Calendar className="w-5 h-5 shrink-0" />
                    <span>{isSubmitting ? 'Scheduling Service...' : 'Schedule Service Request'}</span>
                  </>
                )}
              </button>

              {handleCloseAction && (
                <button
                  type="button"
                  onClick={handleCloseAction}
                  className="w-full py-2 px-3.5 rounded-xl border border-slate-800 bg-slate-950 hover:bg-slate-800 text-slate-400 hover:text-slate-200 font-bold text-xs uppercase tracking-wider transition-all cursor-pointer text-center"
                >
                  Cancel
                </button>
              )}
            </div>

            <div className="text-center pt-1 text-[10px] text-slate-400 font-medium space-y-1">
              <div className="flex items-center justify-center gap-1">
                <ShieldCheck className="w-3 h-3 text-emerald-400 inline" /> Distance-based pricing • Instant upfront quote • No Credit Card Upfront
              </div>
              <div className="text-amber-300 font-semibold text-[10px]">
                Note: After-hour fees will be added for calls between 6:00 PM and 6:00 AM.
              </div>
            </div>

          </form>
        )}

      </div>
    </div>
  );
}

