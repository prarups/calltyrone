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
    <section id="home" className="relative flex items-center justify-center pt-6 pb-10 overflow-hidden bg-slate-950">
      
      {/* Background Auto-Sliding Carousel Layer - High Visibility & Vibrant Contrast */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {heroSlides.map((slide, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              idx === currentSlide ? 'opacity-70 scale-105 transition-transform duration-10000' : 'opacity-0 scale-100'
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
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/40"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/80 to-slate-950/40"></div>
      </div>

      {/* Hero Content Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          
          {/* Left Column: Compact Headline & CTAs */}
          <div className="lg:col-span-7 space-y-4 text-left">
            
            {/* Live Dispatch Pill */}
            <div className="inline-flex items-center gap-2 bg-slate-950/90 border border-blue-500/60 rounded-full px-3.5 py-1 backdrop-blur-md shadow-lg">
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              <span className="text-[11px] font-black uppercase tracking-wider text-slate-100">
                24/7 Mobile Dispatch Active In Your Area
              </span>
            </div>

            {/* Main Headline with Drop Shadow */}
            <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white uppercase leading-[1.08] drop-shadow-2xl">
              24/7 MOBILE TIRE & <br />
              <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-amber-400 bg-clip-text text-transparent drop-shadow-lg">
                ROADSIDE ASSISTANCE
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-xs sm:text-sm text-slate-200 max-w-xl font-normal leading-relaxed drop-shadow-md">
              Stranded on the highway, at home, or at work? <strong className="text-white font-bold underline decoration-blue-500/60">Call Tyrone LLC</strong> comes directly to your location with certified technicians, brand new tires, computerized balancers, and commercial jump packs.
            </p>

            {/* Feature Checkmarks */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-semibold text-slate-100 pt-0.5 drop-shadow">
              <div className="flex items-center gap-2 bg-slate-950/70 px-2.5 py-1.5 rounded-lg border border-slate-800/80 backdrop-blur-sm">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                <span>15-30 Min Average Arrival</span>
              </div>
              <div className="flex items-center gap-2 bg-slate-950/70 px-2.5 py-1.5 rounded-lg border border-slate-800/80 backdrop-blur-sm">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                <span>No Tow Truck Required</span>
              </div>
              <div className="flex items-center gap-2 bg-slate-950/70 px-2.5 py-1.5 rounded-lg border border-slate-800/80 backdrop-blur-sm">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                <span>On-Site Mounting & Patching</span>
              </div>
              <div className="flex items-center gap-2 bg-slate-950/70 px-2.5 py-1.5 rounded-lg border border-slate-800/80 backdrop-blur-sm">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                <span>Real-Time Driver GPS Tracking</span>
              </div>
            </div>

            {/* Call To Actions */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              
              {/* Primary Request Button */}
              <button
                onClick={() => {
                  const el = document.getElementById('services');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                  else if (onRequestService) onRequestService();
                }}
                className="flex items-center justify-center gap-2.5 bg-gradient-to-r from-blue-600 via-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-black text-xs sm:text-sm px-6 py-3.5 rounded-xl shadow-xl shadow-blue-950 hover:shadow-blue-600/50 transition-all transform hover:-translate-y-0.5 active:translate-y-0 uppercase tracking-wider group cursor-pointer"
              >
                <Navigation className="w-4 h-4 group-hover:rotate-12 transition-transform shrink-0" />
                <span>Request Roadside Service</span>
                <ArrowRight className="w-4 h-4 text-blue-200 group-hover:translate-x-1 transition-transform shrink-0" />
              </button>

              {/* Secondary Call Button */}
              <a
                href={`tel:${BUSINESS_CONFIG.phoneRaw}`}
                className="flex items-center justify-center gap-2.5 bg-slate-950/90 hover:bg-slate-900 border border-slate-700 text-white font-black text-xs sm:text-sm px-6 py-3.5 rounded-xl shadow-lg transition-all hover:border-blue-500/60 group backdrop-blur-md"
              >
                <PhoneCall className="w-4 h-4 text-blue-500 group-hover:scale-110 transition-transform shrink-0" />
                <span>Call {BUSINESS_CONFIG.phone}</span>
              </a>

            </div>

            {/* Quick Motion Control Bar */}
            <div className="pt-2 flex items-center justify-between gap-4 border-t border-slate-800/90">
              <div className="flex items-center gap-2 bg-slate-950/90 backdrop-blur-md border border-slate-800 rounded-full px-3 py-0.5 text-xs shadow-lg">
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
                      className={`h-1.5 rounded-full transition-all ${
                        idx === currentSlide ? 'w-5 bg-blue-500' : 'w-1.5 bg-slate-700 hover:bg-slate-500'
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

          {/* Right Column: Hero Image Showcase with Vibrant Glow Aura */}
          <div className="lg:col-span-5 relative">
            <div className="relative group animate-float">
              
              {/* Colorful Glowing Aura Backplate */}
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-indigo-500 to-amber-500 rounded-3xl blur-lg opacity-70 group-hover:opacity-100 transition-opacity duration-500"></div>

              {/* Main Image Frame Container */}
              <div className="relative rounded-2xl overflow-hidden border border-blue-400/50 shadow-2xl bg-slate-950/60 backdrop-blur-xl p-1.5">
                
                {/* Floating Top Badge */}
                <div className="absolute top-4 left-4 z-10 bg-slate-950/90 backdrop-blur-md border border-blue-500/50 text-white text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-lg flex items-center gap-1.5 shadow-2xl">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span>Call Tyrone On-Site Unit</span>
                </div>

                {/* Floating Bottom Badge */}
                <div className="absolute bottom-4 right-4 z-10 bg-slate-950/90 backdrop-blur-md border border-amber-500/50 text-amber-300 text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-lg flex items-center gap-1.5 shadow-2xl">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                  <span>50-Mile Atlanta Radius</span>
                </div>

                {/* Bright Crisp Image */}
                <img 
                  src="/images/homepage.png" 
                  alt="Call Tyrone 24/7 Roadside Service" 
                  className="w-full max-w-md mx-auto h-auto max-h-[360px] object-contain rounded-xl group-hover:scale-[1.02] transition-transform duration-500 ease-out shadow-lg block"
                />

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
