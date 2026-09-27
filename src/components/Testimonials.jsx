import React, { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote, CheckCircle2 } from 'lucide-react';
import { BUSINESS_CONFIG } from '../config/businessConfig';

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const reviews = BUSINESS_CONFIG.testimonials;

  // Auto-slide reviews continuously every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % reviews.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [reviews.length]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  return (
    <section id="reviews" className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-950 relative overflow-hidden">
      
      {/* Background Section Image Layer */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img
          src="https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=2000&q=80"
          alt="Night roadside assistance testimonials background"
          className="w-full h-full object-cover opacity-20 filter brightness-110 contrast-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/90 to-slate-950"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-transparent to-slate-950"></div>
      </div>

      <div className="max-w-7xl mx-auto space-y-12 relative z-10">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 bg-blue-600/10 border border-blue-500/30 text-blue-400 text-xs font-black uppercase tracking-wider px-3.5 py-1 rounded-full">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>14,850+ Verified 5-Star Reviews</span>
          </div>

          <h2 className="font-heading text-3xl sm:text-5xl font-black uppercase tracking-tight text-white drop-shadow-md">
            WHAT DRIVERS SAY ABOUT <span className="text-blue-500">CALL TYRONE</span>
          </h2>

          <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto">
            Real feedback from drivers saved on highway shoulders, home driveways, and office parking lots.
          </p>
        </div>

        {/* Reviews Carousel Container */}
        <div 
          className="max-w-4xl mx-auto relative"
          onMouseEnter={() => setIsPlaying(false)}
          onMouseLeave={() => setIsPlaying(true)}
        >
          
          <div className="glass-panel p-6 sm:p-10 rounded-2xl border border-slate-800 shadow-2xl relative space-y-6">
            <Quote className="w-12 h-12 text-blue-500/20 absolute top-6 right-6 pointer-events-none" />

            {/* Rating Stars */}
            <div className="flex items-center gap-1.5">
              {[...Array(reviews[currentIndex].rating)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
              ))}
              <span className="text-xs font-bold text-slate-400 ml-2">
                {reviews[currentIndex].service} • Verified Customer
              </span>
            </div>

            {/* Comment Quote */}
            <p className="text-base sm:text-lg text-slate-200 font-normal leading-relaxed italic min-h-[72px]">
              "{reviews[currentIndex].comment}"
            </p>

            {/* Author Profile */}
            <div className="flex items-center justify-between border-t border-slate-800/80 pt-4">
              <div className="flex items-center gap-4">
                <img
                  src={reviews[currentIndex].avatar}
                  alt={reviews[currentIndex].name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-blue-500/60 shadow"
                />
                <div>
                  <h4 className="font-heading font-bold text-white text-base flex items-center gap-1.5">
                    {reviews[currentIndex].name}
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  </h4>
                  <p className="text-xs text-slate-400">
                    {reviews[currentIndex].vehicle} • {reviews[currentIndex].location}
                  </p>
                </div>
              </div>

              <span className="text-xs text-slate-500 hidden sm:block">
                {reviews[currentIndex].date}
              </span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between mt-4 px-2">
            <div className="flex items-center gap-2">
              {reviews.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`w-3 h-3 rounded-full transition-all cursor-pointer ${
                    idx === currentIndex ? 'bg-blue-500 w-8' : 'bg-slate-800 hover:bg-slate-700'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                className="p-2.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-xl text-slate-300 hover:text-white transition-colors"
                aria-label="Previous Review"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                onClick={handleNext}
                className="p-2.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-xl text-slate-300 hover:text-white transition-colors"
                aria-label="Next Review"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
