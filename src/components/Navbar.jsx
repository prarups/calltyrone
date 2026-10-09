import React, { useState, useEffect } from 'react';
import { PhoneCall, Menu, X, ChevronRight, Calendar } from 'lucide-react';
import { BUSINESS_CONFIG } from '../config/businessConfig';

export default function Navbar({ onNavigateSection, onRequestService, onOpenBatteryService, activeSection, currentView }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', id: 'home' },
    { name: 'Services', id: 'services' },
    { name: 'Batteries', id: 'battery-service' },
    { name: 'How It Works', id: 'how-it-works' },
    { name: 'Areas', id: 'service-areas' },
    { name: 'About', id: 'about' },
    { name: 'Pricing', id: 'pricing' },
    { name: 'Reviews', id: 'reviews' },
    { name: 'FAQ', id: 'faq' },
    { name: 'Contact', id: 'contact' },
  ];

  const handleLinkClick = (id) => {
    setMobileMenuOpen(false);
    if (id === 'battery-service' && onOpenBatteryService) {
      onOpenBatteryService();
      return;
    }
    onNavigateSection(id);
  };

  return (
    <header className={`sticky top-0 z-40 transition-all duration-300 ${
      isScrolled 
        ? 'glass-nav shadow-lg border-b border-slate-800/90 py-2' 
        : 'bg-slate-950/95 py-2.5 border-b border-slate-800/60'
    }`}>
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-2 sm:gap-4 flex-nowrap">
          
          {/* Brand Logo - Compact Single Line */}
          <button
            onClick={() => handleLinkClick('home')}
            className="flex items-center gap-2 sm:gap-2.5 group text-left focus:outline-none shrink-0 cursor-pointer whitespace-nowrap"
          >
            <div className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-full p-[1.5px] bg-gradient-to-tr from-blue-500 via-indigo-500 to-amber-400 shadow flex items-center justify-center bg-slate-950 shrink-0">
              <div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center overflow-hidden p-0.5 border border-slate-800">
                <img 
                  src={BUSINESS_CONFIG.logo} 
                  alt={BUSINESS_CONFIG.name} 
                  className="w-full h-full object-cover rounded-full"
                  onError={(e) => { e.target.style.display = 'none'; }}
                />
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <span className="font-heading font-black text-lg sm:text-xl tracking-tight text-white uppercase leading-none group-hover:text-blue-400 transition-colors whitespace-nowrap">
                CALL <span className="text-blue-500">TYRONE</span>
              </span>
              <span className="bg-blue-600/30 text-blue-300 border border-blue-500/40 text-[9px] font-black px-1.5 py-0.5 rounded uppercase tracking-wider whitespace-nowrap">
                24/7
              </span>
            </div>
          </button>

          {/* Desktop Nav Links - Single Line Compact */}
          <nav className="hidden xl:flex items-center gap-1 flex-nowrap shrink-0">
            {navLinks.map((link) => {
              const isActive = currentView === 'battery-service' 
                ? link.id === 'battery-service' 
                : (currentView === 'main' && activeSection === link.id);
              const isBattery = link.id === 'battery-service';

              return (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link.id)}
                  className={`text-xs font-bold uppercase tracking-wider transition-all px-2.5 py-1 rounded-md whitespace-nowrap cursor-pointer shrink-0 ${
                    isActive
                      ? 'text-blue-400 bg-blue-600/15 border border-blue-500/30'
                      : isBattery
                        ? 'text-amber-400 hover:text-amber-300 hover:bg-amber-500/10'
                        : 'text-slate-300 hover:text-white hover:bg-slate-900/80'
                  }`}
                >
                  {link.name}
                </button>
              );
            })}
          </nav>

          {/* Desktop Right Action CTAs - Small Single Line */}
          <div className="hidden xl:flex items-center gap-2 shrink-0 flex-nowrap">
            {/* Phone Button */}
            <a
              href={`tel:${BUSINESS_CONFIG.phoneRaw}`}
              className="flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700/80 px-2.5 py-1 rounded-md text-xs font-bold transition-all whitespace-nowrap shrink-0 cursor-pointer"
            >
              <PhoneCall className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>{BUSINESS_CONFIG.phone}</span>
            </a>

            {/* Book Now Button */}
            <button
              onClick={onRequestService}
              className="flex items-center gap-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black px-3 py-1 rounded-md text-xs uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap shrink-0 shadow-sm"
            >
              <Calendar className="w-3.5 h-3.5 stroke-[2.5] shrink-0" />
              <span>Book Now</span>
            </button>
          </div>

          {/* Mobile Right Actions - Small Single Line */}
          <div className="flex items-center gap-2 xl:hidden shrink-0 flex-nowrap">
            {/* Small Single-Line Book Now Button */}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onRequestService();
              }}
              className="flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-black bg-amber-500 hover:bg-amber-400 text-slate-950 uppercase tracking-wider active:scale-95 transition-all cursor-pointer whitespace-nowrap shrink-0 shadow-sm"
              aria-label="Book Now"
            >
              <Calendar className="w-3 h-3 stroke-[2.5] text-slate-950 shrink-0" />
              <span>Book Now</span>
            </button>

            {/* Compact Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 text-slate-200 hover:text-white bg-slate-900 hover:bg-slate-800 rounded-md border border-slate-800 focus:outline-none cursor-pointer shrink-0 transition-all active:scale-95"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-blue-400" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu - Clean Single-Line Items */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-slate-950/98 backdrop-blur-2xl border-b border-slate-800 px-4 pt-3 pb-5 mt-2 space-y-3 shadow-2xl animate-in slide-in-from-top-2 duration-150">
          
          <div className="grid grid-cols-2 gap-1.5 pb-3 border-b border-slate-800">
            {navLinks.map((link) => {
              const isActive = currentView === 'battery-service' 
                ? link.id === 'battery-service' 
                : (currentView === 'main' && activeSection === link.id);

              return (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link.id)}
                  className={`flex items-center justify-between py-2 px-2.5 text-left text-xs font-bold uppercase tracking-wider rounded-lg transition-all border cursor-pointer whitespace-nowrap ${
                    isActive
                      ? 'bg-blue-600/20 text-blue-400 border-blue-500/40'
                      : link.id === 'battery-service'
                        ? 'bg-amber-500/10 text-amber-300 border-amber-500/30'
                        : 'text-slate-200 hover:text-white bg-slate-900/60 hover:bg-slate-800 rounded-lg border-slate-850'
                  }`}
                >
                  <span className="truncate">{link.name}</span>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                </button>
              );
            })}
          </div>

          <div className="flex flex-col gap-2 pt-0.5">
            <a
              href={`tel:${BUSINESS_CONFIG.phoneRaw}`}
              className="w-full flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-white py-2 px-3 rounded-lg font-bold text-xs uppercase tracking-wider whitespace-nowrap"
            >
              <PhoneCall className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Call ({BUSINESS_CONFIG.phone})</span>
            </a>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onRequestService();
              }}
              className="w-full flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 text-slate-950 py-2.5 px-3 rounded-lg font-black text-xs uppercase tracking-wider shadow-md whitespace-nowrap cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5 stroke-[2.5] shrink-0" />
              <span>Book Appointment Now</span>
            </button>
          </div>

        </div>
      )}
    </header>
  );
}
