import React, { useState, useEffect } from 'react';
import { MapPin, Navigation, Car, Phone, User, Disc, CheckCircle2, ShieldCheck, X } from 'lucide-react';
import { BUSINESS_CONFIG } from '../config/businessConfig';

export default function ServiceRequestForm({ preselectedService, onRequestSubmitted, onCancel, onClose, isModal = false }) {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    location: '',
    locationUrl: '',
    vehicleYear: '2022',
    vehicleMakeModel: '',
    serviceId: preselectedService || 'flat-tire-change',
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
      alert("Geolocation is not supported by your browser");
      return;
    }

    setIsLocating(true);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        const mapsUrl = `https://maps.google.com/?q=${latitude.toFixed(6)},${longitude.toFixed(6)}`;

        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );
          if (response.ok) {
            const data = await response.json();
            const address = data.display_name || `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`;
            setFormData(prev => ({ 
              ...prev, 
              location: address,
              locationUrl: mapsUrl 
            }));
          } else {
            setFormData(prev => ({
              ...prev,
              location: `GPS: ${latitude.toFixed(4)}, ${longitude.toFixed(4)}`,
              locationUrl: mapsUrl
            }));
          }
        } catch (err) {
          setFormData(prev => ({
            ...prev,
            location: `GPS: ${latitude.toFixed(4)}, ${longitude.toFixed(4)}`,
            locationUrl: mapsUrl
          }));
        } finally {
          setIsLocating(false);
        }
      },
      (error) => {
        console.warn("Geolocation permission error or timeout:", error);
        setFormData(prev => ({
          ...prev,
          location: 'Atlanta, GA (Current Location)',
          locationUrl: 'https://maps.google.com/?q=Atlanta,GA'
        }));
        setIsLocating(false);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const selectedServiceObj = BUSINESS_CONFIG.services.find(s => s.id === formData.serviceId);
    const serviceTitle = selectedServiceObj ? selectedServiceObj.title : 'Roadside Assistance';
    const mapsUrl = formData.locationUrl || `https://maps.google.com/?q=${encodeURIComponent(formData.location)}`;

    const waMessage = 
`🚨 *CALL TYRONE 24/7 SERVICE REQUEST*
---------------------------------------
👤 *Name:* ${formData.fullName}
📞 *Phone:* ${formData.phone}
📍 *Location:* ${formData.location}
🗺️ *Live Maps Link:* ${mapsUrl}
🔧 *Service:* ${serviceTitle}
🚗 *Vehicle:* ${formData.vehicleMakeModel}
${formData.notes ? `📝 *Notes:* ${formData.notes}` : ''}
---------------------------------------
*Request Time:* ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;

    const targetPhone = BUSINESS_CONFIG.whatsappPhoneRaw || BUSINESS_CONFIG.phoneRaw.replace(/[^0-9]/g, '');
    const waUrl = `https://wa.me/${targetPhone}?text=${encodeURIComponent(waMessage)}`;

    window.open(waUrl, '_blank');

    setTimeout(() => {
      const generatedId = `MTP-${Math.floor(10000 + Math.random() * 90000)}`;
      const newRequest = {
        id: generatedId,
        type: 'whatsapp',
        customerName: formData.fullName || 'Customer',
        phone: formData.phone || BUSINESS_CONFIG.phone,
        location: formData.location || 'Current Location',
        locationUrl: mapsUrl,
        vehicle: `${formData.vehicleYear} ${formData.vehicleMakeModel || 'Vehicle'}`,
        serviceName: serviceTitle,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        status: 'WhatsApp Dispatched'
      };

      setSubmittedRequest(newRequest);
      setIsSubmitting(false);
      if (onRequestSubmitted) {
        onRequestSubmitted(newRequest);
      }
    }, 400);
  };

  const handleCloseAction = onCancel || onClose;

  return (
    <div id="request-service" className="max-w-xl mx-auto relative w-full my-3 px-2 sm:px-0">
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
              Enter details for instant technician dispatch (15-30 min average ETA)
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
                REQUEST SENT VIA WHATSAPP!
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                Thank you, <strong className="text-white font-bold">{submittedRequest.customerName}</strong>. Your request for <strong className="text-blue-400 font-bold">{submittedRequest.serviceName}</strong> has been opened in WhatsApp to send directly to our dispatch team at <strong className="text-white font-bold">{BUSINESS_CONFIG.phone}</strong>.
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

            {/* Single Prominent WhatsApp Dispatch Action Button */}
            <div className="pt-2 space-y-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-sm sm:text-base py-3.5 px-4 rounded-xl shadow-xl uppercase tracking-wider transition-all cursor-pointer hover:shadow-emerald-900/40"
              >
                <svg className="w-5 h-5 fill-current shrink-0" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                </svg>
                <span>💬 Send Service Request via WhatsApp</span>
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

