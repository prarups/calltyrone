import React, { useState } from 'react';
import { 
  ArrowLeft, BatteryCharging, CheckCircle2, ShieldCheck, Zap, Phone, 
  MapPin, Car, User, Clock, Calendar, Search, AlertTriangle, Wrench
} from 'lucide-react';
import { BUSINESS_CONFIG } from '../config/businessConfig';
import { BATTERY_CATALOG, BATTERY_CATEGORIES } from '../config/batteryConfig';

const getTodayDateString = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const generateBatteryRequestId = () => `BAT-${Date.now().toString().slice(-5)}`;

const getCurrentTimeString = () => {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  return `${hours}:${minutes}`;
};

export default function BatteryServicePage({ onBackToHome, onRequestSubmitted }) {
  const [selectedBatteryId, setSelectedBatteryId] = useState('b-48-h6'); // Default popular 48-H6
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [serviceTiming, setServiceTiming] = useState('asap'); // 'asap' | 'scheduled'

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    location: '',
    locationUrl: '',
    vehicleYear: '2022',
    vehicleMakeModel: '',
    bookingDate: getTodayDateString(),
    bookingTime: getCurrentTimeString(),
    notes: ''
  });

  const [isLocating, setIsLocating] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedRequest, setSubmittedRequest] = useState(null);

  const selectedBattery = BATTERY_CATALOG.find(b => b.id === selectedBatteryId) || BATTERY_CATALOG[0];

  const calculateTotal = () => {
    return selectedBattery.price.toFixed(2);
  };

  const filteredBatteries = BATTERY_CATALOG.filter(b => {
    const matchesCategory = activeCategory === 'all' || b.category === activeCategory;
    const matchesSearch = b.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          b.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          b.priceDisplay.includes(searchQuery);
    return matchesCategory && matchesSearch;
  });

  const formatPhoneNumber = (value) => {
    if (!value) return value;
    if (value.startsWith('+')) return value;
    const digits = value.replace(/\D/g, '');
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
            setFormData(prev => ({ ...prev, location: address, locationUrl: liveMapsUrl }));
          } else {
            setFormData(prev => ({ ...prev, location: `GPS (${latitude.toFixed(5)}, ${longitude.toFixed(5)})`, locationUrl: liveMapsUrl }));
          }
        } catch {
          setFormData(prev => ({ ...prev, location: `GPS (${latitude.toFixed(5)}, ${longitude.toFixed(5)})`, locationUrl: liveMapsUrl }));
        } finally {
          setIsLocating(false);
        }
      },
      (error) => {
        console.warn("Geolocation permission error:", error);
        alert("GPS location unavailable. Please type your location manually.");
        setIsLocating(false);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 }
    );
  };

  const handleSelectBatteryCard = (id) => {
    setSelectedBatteryId(id);
    const formElement = document.getElementById('battery-request-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const isAsap = serviceTiming === 'asap';
    const userLocation = formData.location.trim();
    const mapsUrl = formData.locationUrl || `https://maps.google.com/?q=${encodeURIComponent(userLocation)}`;
    const targetEmail = BUSINESS_CONFIG.dispatchEmail || BUSINESS_CONFIG.email || 'info@mobiletireplus.com';

    const emailPayload = {
      _subject: `🔋 BATTERY REPLACEMENT DISPATCH: [${selectedBattery.name} - $${calculateTotal()}] - ${formData.fullName}`,
      _captcha: "false",
      _template: "table",
      "Service Requested": "Mobile Battery Replacement & Delivery",
      "Selected Battery Type": `${selectedBattery.name} (${selectedBattery.priceDisplay})`,
      "Total Estimated Base Price": `$${calculateTotal()}`,
      "Dispatch Priority": isAsap ? "⚡ IMMEDIATE DISPATCH (ASAP)" : "📅 SCHEDULED APPOINTMENT",
      "Customer Name": formData.fullName,
      "Phone Number": formData.phone,
      "Booking Date": isAsap ? `${getTodayDateString()} (Today - Right Now)` : formData.bookingDate,
      "Booking Time": isAsap ? "Immediate / ASAP" : formData.bookingTime,
      "Vehicle Info": `${formData.vehicleYear} ${formData.vehicleMakeModel || ''}`.trim(),
      "Breakdown Location": userLocation,
      "Google Maps GPS Link": mapsUrl,
      "Additional Notes / Symptoms": formData.notes || 'None provided',
      "Submitted Time": new Date().toLocaleString()
    };

    try {
      await fetch(`https://formsubmit.co/ajax/${targetEmail}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify(emailPayload)
      });
    } catch (err) {
      console.warn("Battery FormSubmit error:", err);
    }

    const generatedId = generateBatteryRequestId();
    const newRequest = {
      id: generatedId,
      type: 'battery',
      customerName: formData.fullName || 'Customer',
      phone: formData.phone || BUSINESS_CONFIG.phone,
      location: formData.location || 'Current Location',
      locationUrl: mapsUrl,
      vehicle: `${formData.vehicleYear} ${formData.vehicleMakeModel || 'Vehicle'}`,
      serviceName: `Battery Replacement (${selectedBattery.name})`,
      batteryName: selectedBattery.name,
      totalPrice: `$${calculateTotal()}`,
      serviceTiming: isAsap ? 'Immediate (ASAP)' : 'Scheduled',
      bookingDate: isAsap ? getTodayDateString() : formData.bookingDate,
      bookingTime: isAsap ? 'Immediate / ASAP' : formData.bookingTime,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: isAsap ? 'Battery Technician Dispatched' : 'Appointment Confirmed'
    };

    setSubmittedRequest(newRequest);
    setIsSubmitting(false);
    if (onRequestSubmitted) {
      onRequestSubmitted(newRequest);
    }
  };

  return (
    <div className="bg-slate-950 min-h-screen text-slate-100 pb-20 pt-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Navigation Breadcrumb / Back button */}
        <div className="flex items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <button
            onClick={onBackToHome}
            className="flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-800 px-3.5 py-2 rounded-xl transition-all cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-blue-400" />
            <span>Back to Main Services</span>
          </button>

          <a
            href={`tel:${BUSINESS_CONFIG.phoneRaw}`}
            className="flex items-center gap-1.5 text-xs font-black bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 px-3.5 py-2 rounded-xl uppercase tracking-wider shadow-md hover:from-amber-400 hover:to-amber-500 transition-all"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>Call Battery Hotline: {BUSINESS_CONFIG.phone}</span>
          </a>
        </div>

        {/* Hero Section for Battery Service */}
        <div className="relative rounded-3xl overflow-hidden border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-900/90 to-blue-950/40 p-6 sm:p-10 shadow-2xl space-y-6">
          <div className="max-w-3xl space-y-3">
            <span className="inline-flex items-center gap-2 text-xs font-black uppercase text-amber-400 bg-amber-500/10 border border-amber-500/30 px-3 py-1 rounded-full">
              <BatteryCharging className="w-3.5 h-3.5 text-amber-400" />
              24/7 Mobile Battery Replacement Service
            </span>

            <h1 className="font-heading text-3xl sm:text-5xl font-black uppercase tracking-tight text-white leading-tight">
              ON-SITE CAR BATTERY DELIVERY & <span className="bg-gradient-to-r from-amber-400 to-yellow-300 bg-clip-text text-transparent">INSTALLATION</span>
            </h1>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Car won't start or battery dead? Don't pay for a tow truck. Call Tyrone delivers fresh, brand-new OEM, AGM, and Auxiliary batteries directly to your driveway, workplace, or highway shoulder with certified diagnostic testing and professional installation.
            </p>
          </div>

          {/* Value Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3 flex items-center gap-2.5">
              <Zap className="w-4 h-4 text-amber-400 shrink-0" />
              <span className="text-xs font-bold text-slate-200">Fastest Mobile Dispatch</span>
            </div>
            <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3 flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span className="text-xs font-bold text-slate-200">Free On-Site Testing</span>
            </div>
            <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3 flex items-center gap-2.5">
              <Wrench className="w-4 h-4 text-blue-400 shrink-0" />
              <span className="text-xs font-bold text-slate-200">Professional Installation</span>
            </div>
            <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3 flex items-center gap-2.5">
              <ShieldCheck className="w-4 h-4 text-indigo-400 shrink-0" />
              <span className="text-xs font-bold text-slate-200">Full Nationwide Warranty</span>
            </div>
          </div>
        </div>

        {/* Main 2-Column Grid: Left = Inventory Selector, Right = Dedicated Request Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column (7 cols): Battery Inventory Catalog & Search */}
          <div className="lg:col-span-7 space-y-6">
            
            <div className="glass-panel p-5 sm:p-6 rounded-2xl border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
                <div>
                  <h2 className="font-heading text-xl font-bold text-white uppercase">
                    Select Your Battery Type ({BATTERY_CATALOG.length} Available)
                  </h2>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Select the battery model that matches your vehicle specifications.
                  </p>
                </div>
                <div className="text-xs font-black text-amber-400 bg-amber-500/10 border border-amber-500/30 px-2.5 py-1 rounded-lg shrink-0">
                  Selected: {selectedBattery.name} ({selectedBattery.priceDisplay})
                </div>
              </div>

              {/* Search Box */}
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search group size (e.g. 48-H6, 35, 24F, AGM, AUX, 65)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 focus:border-blue-500 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 outline-none transition-colors"
                />
              </div>

              {/* Category Pills */}
              <div className="flex flex-wrap items-center gap-1.5">
                {BATTERY_CATEGORIES.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all uppercase tracking-wider cursor-pointer border ${
                      activeCategory === cat.id
                        ? 'bg-blue-600 text-white border-blue-500 shadow-md'
                        : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white hover:border-slate-700'
                    }`}
                  >
                    {cat.name} ({cat.count})
                  </button>
                ))}
              </div>

              {/* Interactive Radio List / Grid of Batteries */}
              <div className="max-h-[580px] overflow-y-auto space-y-2 pr-1 custom-scrollbar">
                {filteredBatteries.map((battery) => {
                  const isSelected = selectedBatteryId === battery.id;
                  return (
                    <div
                      key={battery.id}
                      onClick={() => handleSelectBatteryCard(battery.id)}
                      className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                        isSelected
                          ? 'bg-blue-600/15 border-blue-500 shadow-md shadow-blue-950/40 text-white'
                          : 'bg-slate-950/80 hover:bg-slate-900 border-slate-800/80 text-slate-300'
                      }`}
                    >
                      <div className="flex items-center gap-3 overflow-hidden">
                        {/* Custom Radio Button */}
                        <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 transition-all ${
                          isSelected ? 'border-blue-400 bg-blue-600' : 'border-slate-600 bg-slate-900'
                        }`}>
                          {isSelected && <div className="w-2 h-2 rounded-full bg-white"></div>}
                        </div>

                        <div className="space-y-0.5 overflow-hidden">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-heading font-black text-sm sm:text-base text-white tracking-wide">
                              {battery.name}
                            </span>
                            {battery.category === 'agm' && (
                              <span className="text-[9px] font-black uppercase text-indigo-300 bg-indigo-500/20 border border-indigo-500/30 px-1.5 py-0.2 rounded">
                                AGM Tech
                              </span>
                            )}
                            {battery.category === 'dual' && (
                              <span className="text-[9px] font-black uppercase text-amber-300 bg-amber-500/20 border border-amber-500/30 px-1.5 py-0.2 rounded">
                                Dual Pair
                              </span>
                            )}
                            {battery.category === 'aux' && (
                              <span className="text-[9px] font-black uppercase text-emerald-300 bg-emerald-500/20 border border-emerald-500/30 px-1.5 py-0.2 rounded">
                                Auxiliary
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-slate-400 truncate max-w-sm">
                            {battery.desc}
                          </p>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <span className={`font-heading font-black text-base sm:text-lg block ${
                          isSelected ? 'text-amber-400' : 'text-slate-200'
                        }`}>
                          {battery.priceDisplay}
                        </span>
                        <span className="text-[9px] font-bold text-slate-500 uppercase">
                          Installed On-Site
                        </span>
                      </div>
                    </div>
                  );
                })}

                {filteredBatteries.length === 0 && (
                  <div className="text-center py-8 text-slate-400 space-y-2">
                    <AlertTriangle className="w-6 h-6 mx-auto text-amber-400" />
                    <p className="text-xs">No battery model found matching "{searchQuery}".</p>
                    <button
                      onClick={() => { setSearchQuery(''); setActiveCategory('all'); }}
                      className="text-xs text-blue-400 hover:underline font-bold"
                    >
                      Clear search filter
                    </button>
                  </div>
                )}
              </div>

            </div>

          </div>

          {/* Right Column (5 cols): Dedicated Battery Replacement Request Form */}
          <div id="battery-request-form" className="lg:col-span-5 scroll-mt-24">
            <div className="bg-slate-900 border border-slate-800 p-5 sm:p-6 rounded-2xl shadow-2xl space-y-4 relative overflow-hidden backdrop-blur-xl">
              
              {/* Form Header */}
              <div className="border-b border-slate-800 pb-3">
                <span className="text-[10px] font-black uppercase text-amber-400 bg-amber-500/10 border border-amber-500/30 px-2.5 py-0.5 rounded-full inline-block mb-1">
                  On-Site Installation Dispatch
                </span>
                <h3 className="font-heading text-xl sm:text-2xl font-black uppercase text-white tracking-tight">
                  Request Battery Service
                </h3>
                <p className="text-slate-300 text-xs mt-0.5">
                  Technician brings the selected battery directly to your car.
                </p>
              </div>

              {submittedRequest ? (
                /* Success Screen */
                <div className="py-6 text-center space-y-4 animate-in fade-in duration-200">
                  <div className="w-14 h-14 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/40 shadow-lg shadow-emerald-950/50">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>

                  <div className="space-y-1.5 max-w-md mx-auto">
                    <h4 className="font-heading text-xl font-black text-white uppercase tracking-tight">
                      BATTERY DISPATCH CONFIRMED!
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                      Thank you, <strong className="text-white font-bold">{submittedRequest.customerName}</strong>. Your mobile request for <strong className="text-amber-400 font-bold">{submittedRequest.batteryName} ({submittedRequest.totalPrice})</strong> has been emailed directly to our mobile battery unit. A technician will call you at <strong className="text-white font-bold">{submittedRequest.phone}</strong> within 5-15 minutes.
                    </p>
                  </div>

                  <div className="pt-2 flex flex-col gap-2">
                    <a
                      href={`tel:${BUSINESS_CONFIG.phoneRaw}`}
                      className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-black text-xs sm:text-sm py-3 px-4 rounded-xl uppercase tracking-wider transition-all shadow-md"
                    >
                      <Phone className="w-4 h-4" />
                      <span>Call Dispatch ({BUSINESS_CONFIG.phone})</span>
                    </a>
                    <button
                      onClick={() => setSubmittedRequest(null)}
                      className="w-full py-2.5 px-4 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs rounded-xl uppercase tracking-wider cursor-pointer border border-slate-700 transition-all"
                    >
                      Book Another Battery
                    </button>
                  </div>
                </div>
              ) : (
                /* The Battery Form */
                <form onSubmit={handleSubmit} className="space-y-3.5">
                  
                  {/* Selected Battery Overview Box */}
                  <div className="p-3 bg-slate-950 border border-blue-500/40 rounded-xl flex items-center justify-between gap-3">
                    <div className="space-y-0.5">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Chosen Battery:</span>
                      <strong className="text-sm font-heading font-black text-white">{selectedBattery.name}</strong>
                    </div>
                    <div className="text-right">
                      <span className="text-base font-heading font-black text-amber-400 block">{selectedBattery.priceDisplay}</span>
                      <span className="text-[10px] text-emerald-400 font-semibold">Testing & Install Included</span>
                    </div>
                  </div>

                  {/* Timing Toggle: Immediate vs Scheduled */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-200 flex items-center justify-between">
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-blue-400" /> Installation Timing *
                      </span>
                      {serviceTiming === 'asap' && (
                        <span className="text-[10px] font-bold text-amber-400 bg-amber-500/10 border border-amber-500/30 px-2 py-0.5 rounded-full flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping inline-block"></span>
                          Fastest Arrival
                        </span>
                      )}
                    </label>

                    <div className="grid grid-cols-2 gap-2 p-1 bg-slate-950 border border-slate-800 rounded-xl">
                      <button
                        type="button"
                        onClick={() => setServiceTiming('asap')}
                        className={`flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
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
                        className={`flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                          serviceTiming === 'scheduled'
                            ? 'bg-blue-600 text-white font-black shadow-md'
                            : 'text-slate-400 hover:text-white hover:bg-slate-900'
                        }`}
                      >
                        <Calendar className="w-3.5 h-3.5 shrink-0" />
                        <span>Schedule for Later</span>
                      </button>
                    </div>

                    {serviceTiming === 'scheduled' && (
                      <div className="grid grid-cols-2 gap-2.5 pt-1 animate-in fade-in duration-200">
                        <div className="space-y-1">
                          <label className="text-[11px] font-bold text-slate-300">Date *</label>
                          <input
                            type="date"
                            name="bookingDate"
                            required
                            min={getTodayDateString()}
                            value={formData.bookingDate}
                            onChange={handleChange}
                            className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-2 text-xs text-white outline-none [color-scheme:dark]"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[11px] font-bold text-slate-300">Preferred Time *</label>
                          <input
                            type="time"
                            name="bookingTime"
                            required
                            value={formData.bookingTime}
                            onChange={handleChange}
                            className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-2 text-xs text-white outline-none [color-scheme:dark]"
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Customer Name & Phone */}
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
                        className="w-full bg-slate-950 border border-slate-800 focus:border-blue-500 rounded-xl px-3 py-2 text-xs sm:text-sm text-white placeholder-slate-500 outline-none"
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
                        className="w-full bg-slate-950 border border-slate-800 focus:border-blue-500 rounded-xl px-3 py-2 text-xs sm:text-sm text-white placeholder-slate-500 outline-none"
                      />
                    </div>
                  </div>

                  {/* Location with GPS Detect */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-blue-400" /> Vehicle Location *
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
                      placeholder="Home address, parking lot, or landmark"
                      value={formData.location}
                      onChange={handleChange}
                      className="w-full bg-slate-950 border border-slate-800 focus:border-blue-500 rounded-xl px-3 py-2 text-xs sm:text-sm text-white placeholder-slate-500 outline-none"
                    />
                  </div>

                  {/* Vehicle Year & Make / Model */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                      <Car className="w-3.5 h-3.5 text-blue-400" /> Vehicle Year, Make & Model *
                    </label>
                    <input
                      type="text"
                      name="vehicleMakeModel"
                      required
                      placeholder="e.g. 2021 Jeep Grand Cherokee or 2019 Toyota RAV4"
                      value={formData.vehicleMakeModel}
                      onChange={handleChange}
                      className="w-full bg-slate-950 border border-slate-800 focus:border-blue-500 rounded-xl px-3 py-2 text-xs sm:text-sm text-white placeholder-slate-500 outline-none"
                    />
                  </div>

                  {/* Notes / Symptoms */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-200">Notes / Symptoms (Optional)</label>
                    <input
                      type="text"
                      name="notes"
                      placeholder="e.g. Rapid clicking, dead after parked 2 weeks"
                      value={formData.notes}
                      onChange={handleChange}
                      className="w-full bg-slate-950 border border-slate-800 focus:border-blue-500 rounded-xl px-3 py-2 text-xs sm:text-sm text-white placeholder-slate-500 outline-none"
                    />
                  </div>

                  {/* Total Estimate Summary */}
                  <div className="p-3 bg-slate-950/90 rounded-xl border border-slate-800 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Estimated Total:</span>
                      <span className="text-xs text-slate-300">Base battery + mobile install</span>
                    </div>
                    <div className="text-right">
                      <span className="font-heading font-black text-xl text-amber-400">${calculateTotal()}</span>
                      <span className="text-[9px] text-slate-400 block">+ distance mileage quote</span>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2.5 bg-gradient-to-r from-amber-500 via-amber-600 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-sm sm:text-base py-3.5 px-4 rounded-xl shadow-xl uppercase tracking-wider transition-all cursor-pointer shadow-amber-950/40 disabled:opacity-50"
                  >
                    <Zap className="w-5 h-5 shrink-0 fill-current" />
                    <span>
                      {isSubmitting 
                        ? 'Dispatching Mobile Unit...' 
                        : serviceTiming === 'asap' 
                          ? `Dispatch Battery Unit Now ($${calculateTotal()})`
                          : `Schedule Battery Installation ($${calculateTotal()})`
                      }
                    </span>
                  </button>

                  <div className="text-center pt-1 text-[10px] text-slate-400 font-medium space-y-1">
                    <div className="flex items-center justify-center gap-1">
                      <ShieldCheck className="w-3 h-3 text-emerald-400 inline" /> No credit card required upfront • Free old battery recycling
                    </div>
                  </div>

                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
