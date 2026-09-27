import React, { useState, useEffect } from 'react';
import { Disc, PhoneCall, Navigation, Menu, X, Activity, ChevronRight } from 'lucide-react';
import { BUSINESS_CONFIG } from '../config/businessConfig';

export default function Navbar({ onNavigateSection, onOpenTracking, onRequestService, activeSection, activeRequestId }) {
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
    { name: 'How It Works', id: 'how-it-works' },
    { name: 'Service Areas', id: 'service-areas' },
    { name: 'About', id: 'about' },
    { name: 'Pricing', id: 'pricing' },
    { name: 'Reviews', id: 'reviews' },
    { name: 'FAQ', id: 'faq' },
    { name: 'Contact', id: 'contact' },
  ];

  const handleLinkClick = (id) => {
    setMobileMenuOpen(false);
    onNavigateSection(id);
  };

  return (
    <header className={`sticky top-0 z-40 transition-all duration-300 ${
      isScrolled 
        ? 'glass-nav shadow-2xl border-b border-slate-800/90 py-2.5' 
        : 'bg-slate-950/95 py-3.5 border-b border-slate-800/50'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          
          {/* Brand Logo */}
          <button
            onClick={() => handleLinkClick('home')}
            className="flex items-center gap-3.5 group text-left focus:outline-none shrink-0 cursor-pointer"
          >
            {/* Circular Styled Logo Container */}
            <div className="relative flex items-center justify-center shrink-0">
              {/* Circular Glowing Aura */}
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-indigo-500 to-amber-400 rounded-full blur-sm opacity-70 group-hover:opacity-100 transition-opacity duration-300"></div>

              {/* Circular Ring Frame */}
              <div className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-full p-[2px] bg-gradient-to-tr from-blue-500 via-indigo-500 to-amber-400 shadow-xl flex items-center justify-center bg-slate-950">
                <div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center overflow-hidden p-0.5 border border-slate-800">
                  <img 
                    src={BUSINESS_CONFIG.logo} 
                    alt={BUSINESS_CONFIG.name} 
                    className="w-full h-full object-cover rounded-full group-hover:scale-110 transition-transform duration-300"
                    onError={(e) => { e.target.style.display = 'none'; }}
                  />
                </div>
              </div>

              {/* Live Active Status Pulse Badge */}
              <span className="absolute -bottom-0.5 -right-0.5 flex h-3.5 w-3.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-slate-950"></span>
              </span>
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-heading font-black text-xl sm:text-2xl tracking-tight text-white uppercase leading-none group-hover:text-blue-400 transition-colors">
                  CALL <span className="text-blue-500">TYRONE</span>
                </span>
                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white border border-blue-400/40 text-[9px] sm:text-[10px] font-black px-1.5 py-0.5 rounded-full uppercase tracking-wider shadow-sm">
                  24/7
                </span>
              </div>
              <span className="text-[10px] text-slate-400 font-bold tracking-widest uppercase mt-0.5 hidden sm:block">
                Mobile Tire & Roadside Dispatch
              </span>
            </div>
          </button>

          {/* Desktop Nav Links */}
          <nav className="hidden xl:flex items-center gap-5">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className={`text-xs font-bold uppercase tracking-wider transition-all hover:text-blue-400 py-1 ${
                  activeSection === link.id
                    ? 'text-blue-500 font-black border-b-2 border-blue-500'
                    : 'text-slate-300'
                }`}
              >
                {link.name}
              </button>
            ))}
          </nav>

          {/* Right Action CTAs */}
          <div className="hidden lg:flex items-center gap-2.5 shrink-0">
            
            {/* Live Track Service Button (Disabled as requested) */}
            {/*
            <button
              onClick={onOpenTracking}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all border ${
                activeRequestId
                  ? 'bg-amber-500/15 text-amber-300 border-amber-500/50 shadow-lg shadow-amber-950/40 animate-pulse'
                  : 'bg-slate-900 hover:bg-slate-800 text-slate-200 border-slate-700'
              }`}
            >
              <Activity className="w-3.5 h-3.5 text-amber-400" />
              <span>{activeRequestId ? `Track #${activeRequestId}` : 'Track Service'}</span>
            </button>
            */}

            {/* Direct Call Button */}
            <a
              href={`tel:${BUSINESS_CONFIG.phoneRaw}`}
              className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-slate-100 border border-slate-700 px-3.5 py-2 rounded-xl text-xs font-black transition-all hover:border-blue-500/50 shadow-md"
            >
              <PhoneCall className="w-3.5 h-3.5 text-blue-500" />
              <span>{BUSINESS_CONFIG.phone}</span>
            </a>

            {/* Request Service CTA */}
            <button
              onClick={onRequestService}
              className="flex items-center gap-2 bg-gradient-to-r from-blue-600 via-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider shadow-lg shadow-blue-900/50 hover:shadow-blue-600/40 transition-all transform active:scale-95"
            >
              <Navigation className="w-3.5 h-3.5" />
              <span>Request Tech</span>
            </button>
          </div>

          {/* Mobile Actions Right */}
          <div className="flex items-center gap-2 xl:hidden">
            {/* Mobile Track Button (Disabled as requested) */}
            {/*
            <button
              onClick={onOpenTracking}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-black bg-slate-900 text-amber-400 border border-amber-500/40"
            >
              <Activity className="w-3.5 h-3.5 text-amber-400" />
              <span>Track</span>
            </button>
            */}

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-200 hover:text-white bg-slate-900 rounded-lg border border-slate-800 focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-blue-500" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-slate-950/98 backdrop-blur-2xl border-b border-slate-800 px-4 pt-4 pb-6 mt-2 space-y-4 shadow-2xl animate-in slide-in-from-top-4 duration-200">
          
          <div className="grid grid-cols-2 gap-2 pb-4 border-b border-slate-800">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className="flex items-center justify-between py-2.5 px-3 text-left text-xs font-bold uppercase tracking-wider text-slate-200 hover:bg-slate-900 rounded-xl hover:text-blue-400 transition-colors border border-transparent hover:border-slate-800"
              >
                <span>{link.name}</span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
              </button>
            ))}
          </div>

          <div className="flex flex-col gap-2.5 pt-1">
            {/* Mobile Drawer Track Button (Disabled as requested) */}
            {/*
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenTracking();
              }}
              className="w-full flex items-center justify-center gap-2 bg-amber-500/10 border border-amber-500/40 text-amber-300 py-3 rounded-xl font-black text-xs uppercase tracking-wider shadow-md"
            >
              <Activity className="w-4 h-4 text-amber-400" />
              <span>{activeRequestId ? `Track Active Request (#${activeRequestId})` : 'Live GPS Service Tracking'}</span>
            </button>
            */}

            <a
              href={`tel:${BUSINESS_CONFIG.phoneRaw}`}
              className="w-full flex items-center justify-center gap-2 bg-slate-900 border border-slate-700 text-white py-3 rounded-xl font-black text-xs uppercase tracking-wider"
            >
              <PhoneCall className="w-4 h-4 text-blue-500" />
              <span>Call Emergency Hotline ({BUSINESS_CONFIG.phone})</span>
            </a>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onRequestService();
              }}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3.5 rounded-xl font-black text-xs uppercase tracking-wider shadow-xl shadow-blue-900/50"
            >
              <Navigation className="w-4 h-4" />
              <span>Request Roadside Assistance Now</span>
            </button>
          </div>

        </div>
      )}
    </header>
  );
}
