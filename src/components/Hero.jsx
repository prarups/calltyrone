import React, { useState, useEffect } from 'react';
import { PhoneCall, Navigation, ShieldCheck, Clock, MapPin, Star, Award, CheckCircle2, ArrowRight, Play, Pause, ChevronLeft, ChevronRight } from 'lucide-react';
import { BUSINESS_CONFIG } from '../config/businessConfig';

export default function Hero({ onRequestService, onOpenTracking }) {
  // Vibrant, high-definition authentic USA roadside assistance images
  const heroSlides = [
    {
      url: "https://images.unsplash.com/photo-1578844251758-2f71da64c96f?auto=format&fit=crop&w=2000&q=80",
      caption: "Highway Emergency Flat Tire Change Service"
    },
    {
      url: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=2000&q=80",
      caption: "On-Site Computerized Tire Mounting & Puncture Vulcanize"
    },
    {
      url: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=2000&q=80",
      caption: "24/7 Mobile Service Unit Van Dispatched Directly To You"
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  // Auto-play slideshow timer (5 seconds)
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isPlaying, heroSlides.length]);

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  return (
    <section id="home" className="relative min-h-[90vh] flex items-center justify-center pt-8 pb-16 overflow-hidden bg-slate-950">
      
      {/* Background Auto-Sliding Carousel Layer - High Visibility & Vibrant Contrast */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {heroSlides.map((slide, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              idx === currentSlide ? 'opacity-75 scale-105 transition-transform duration-10000' : 'opacity-0 scale-100'
            }`}
          >
            <img
              src={slide.url}
              alt={slide.caption}
              className="w-full h-full object-cover object-center filter brightness-105 contrast-110 saturate-110"
            />
          </div>
        ))}

        {/* Subtle Vignette Overlays for Crisp Text Visibility without Hiding Photography */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-slate-950/30"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/70 to-slate-950/30"></div>
      </div>

      {/* Hero Content Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Headline & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Live Dispatch Pill */}
            <div className="inline-flex items-center gap-2 bg-slate-950/90 border border-blue-500/60 rounded-full px-4 py-1.5 backdrop-blur-md shadow-2xl">
              <span className="relative flex h-2.5 w-2.5 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-500"></span>
              </span>
              <span className="text-xs font-black uppercase tracking-wider text-slate-100">
                24/7 Mobile Dispatch Active In Your Area
              </span>
            </div>

            {/* Main Headline with Drop Shadow */}
            <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-white uppercase leading-[1.05] drop-shadow-2xl">
              24/7 MOBILE TIRE & <br />
              <span className="bg-gradient-to-r from-blue-500 via-indigo-400 to-amber-400 bg-clip-text text-transparent drop-shadow-lg">
                ROADSIDE ASSISTANCE
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-200 max-w-2xl font-medium leading-relaxed drop-shadow-md">
              Stranded on the highway, at home, or at work? <strong className="text-white font-bold underline decoration-blue-500/60">Mobile Tire Plus</strong> comes directly to your location with certified technicians, brand new tires, computerized balancers, and commercial jump packs.
            </p>

            {/* Feature Checkmarks */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm font-bold text-slate-100 pt-1 drop-shadow">
              <div className="flex items-center gap-2 bg-slate-950/60 px-3 py-1.5 rounded-lg border border-slate-800/80 backdrop-blur-sm">
                <CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0" />
                <span>15-30 Min Average Arrival</span>
              </div>
              <div className="flex items-center gap-2 bg-slate-950/60 px-3 py-1.5 rounded-lg border border-slate-800/80 backdrop-blur-sm">
                <CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0" />
                <span>No Tow Truck Required</span>
              </div>
              <div className="flex items-center gap-2 bg-slate-950/60 px-3 py-1.5 rounded-lg border border-slate-800/80 backdrop-blur-sm">
                <CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0" />
                <span>On-Site Mounting & Patching</span>
              </div>
              <div className="flex items-center gap-2 bg-slate-950/60 px-3 py-1.5 rounded-lg border border-slate-800/80 backdrop-blur-sm">
                <CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0" />
                <span>Real-Time Driver GPS Tracking</span>
              </div>
            </div>

            {/* Call To Actions */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-3">
              
              {/* Primary Request Button */}
              <button
                onClick={onRequestService}
                className="flex items-center justify-center gap-3 bg-gradient-to-r from-blue-600 via-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-black text-sm sm:text-base px-8 py-4 rounded-xl shadow-2xl shadow-blue-950 hover:shadow-blue-600/50 transition-all transform hover:-translate-y-0.5 active:translate-y-0 uppercase tracking-wide group"
              >
                <Navigation className="w-5 h-5 group-hover:rotate-12 transition-transform shrink-0" />
                <span>Request Roadside Service</span>
                <ArrowRight className="w-5 h-5 text-blue-200 group-hover:translate-x-1 transition-transform shrink-0" />
              </button>

              {/* Secondary Call Button */}
              <a
                href={`tel:${BUSINESS_CONFIG.phoneRaw}`}
                className="flex items-center justify-center gap-3 bg-slate-950/90 hover:bg-slate-900 border border-slate-700 text-white font-black text-sm sm:text-base px-7 py-4 rounded-xl shadow-xl transition-all hover:border-blue-500/60 group backdrop-blur-md"
              >
                <PhoneCall className="w-5 h-5 text-blue-500 group-hover:scale-110 transition-transform shrink-0" />
                <span>Call {BUSINESS_CONFIG.phone}</span>
              </a>

            </div>

            {/* Quick Live Tracking Link & Motion Control Bar */}
            <div className="pt-3 flex flex-wrap items-center justify-between gap-4 border-t border-slate-800/90">
              
              <button
                onClick={onOpenTracking}
                className="inline-flex items-center gap-2 text-xs font-black text-amber-400 hover:text-amber-300 underline underline-offset-4 cursor-pointer drop-shadow"
              >
                <span>Already placed a request? Track technician live →</span>
              </button>

              {/* Background Slide Motion Control Bar */}
              <div className="flex items-center gap-2 bg-slate-950/90 backdrop-blur-md border border-slate-800 rounded-full px-3.5 py-1 text-xs shadow-xl">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="p-1 text-slate-400 hover:text-white transition-colors"
                  title={isPlaying ? "Pause background slideshow" : "Play background slideshow"}
                >
                  {isPlaying ? <Pause className="w-3.5 h-3.5 text-amber-400" /> : <Play className="w-3.5 h-3.5 text-emerald-400" />}
                </button>

                <div className="flex items-center gap-1.5">
                  {heroSlides.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentSlide(idx)}
                      className={`h-2 rounded-full transition-all ${
                        idx === currentSlide ? 'w-6 bg-blue-500' : 'w-2 bg-slate-700 hover:bg-slate-500'
                      }`}
                      title={`Go to background slide ${idx + 1}`}
                    />
                  ))}
                </div>

                <div className="flex items-center gap-0.5 ml-1 border-l border-slate-800 pl-1.5">
                  <button
                    onClick={handlePrevSlide}
                    className="p-1 text-slate-400 hover:text-white transition-colors"
                    title="Previous Background Slide"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={handleNextSlide}
                    className="p-1 text-slate-400 hover:text-white transition-colors"
                    title="Next Background Slide"
                  >
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

            </div>

          </div>

          {/* Right Column: Key Trust Card & Quick Status Box */}
          <div className="lg:col-span-5">
            <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-2xl relative space-y-5">
              <div className="inline-block bg-blue-600 text-white text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full shadow-md mb-1">
                100% Mobile On-Site Service
              </div>

              <h3 className="font-heading text-2xl font-black text-white flex items-center gap-2 uppercase tracking-wide">
                <ShieldCheck className="w-6 h-6 text-blue-500 shrink-0" />
                Why American Drivers Trust Us
              </h3>

              <div className="space-y-3.5">
                
                {/* Metric 1 */}
                <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-slate-950/90 border border-slate-800/80">
                  <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-400 shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-sm">24/7 Rapid Dispatch</h4>
                    <p className="text-xs text-slate-400">Technicians on standby 365 days a year across major metro highway corridors.</p>
                  </div>
                </div>

                {/* Metric 2 */}
                <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-slate-950/90 border border-slate-800/80">
                  <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-sm">We Come Directly To You</h4>
                    <p className="text-xs text-slate-400">Home driveway, office garage, shopping center, or highway shoulder.</p>
                  </div>
                </div>

                {/* Metric 3 */}
                <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-slate-950/90 border border-slate-800/80">
                  <div className="p-2.5 rounded-lg bg-emerald-500/10 text-emerald-400 shrink-0">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-sm">ASE Certified Technicians</h4>
                    <p className="text-xs text-slate-400">Equipped with commercial hydraulic jacks, impact tools & computerized balancers.</p>
                  </div>
                </div>

              </div>

              {/* Bottom Rating Bar */}
              <div className="pt-4 border-t border-slate-800 flex items-center justify-between gap-2 text-xs">
                <div className="flex items-center gap-1.5">
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <span className="font-black text-white text-sm">4.9 / 5.0</span>
                </div>
                <span className="text-xs text-slate-400 font-bold">14,850+ Verified Drivers</span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
