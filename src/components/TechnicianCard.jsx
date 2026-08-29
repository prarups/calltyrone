import React, { useState } from 'react';
import { Phone, MessageSquare, Star, Truck, ShieldCheck, Wrench, Check, Send, X } from 'lucide-react';
import { BUSINESS_CONFIG } from '../config/businessConfig';

export default function TechnicianCard({ technician = BUSINESS_CONFIG.demoTechnician }) {
  const [showMsgModal, setShowMsgModal] = useState(false);
  const [msgText, setMsgText] = useState('');
  const [msgSent, setMsgSent] = useState(false);

  const handleSendMessage = (e) => {
    e.preventDefault();
    setMsgSent(true);
    setTimeout(() => {
      setMsgSent(false);
      setShowMsgModal(false);
      setMsgText('');
    }, 1500);
  };

  return (
    <div className="glass-panel p-5 sm:p-6 rounded-2xl border border-slate-800 shadow-xl space-y-5">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <h4 className="font-heading text-base font-bold text-white uppercase tracking-wider flex items-center gap-2">
          <Truck className="w-5 h-5 text-blue-500" />
          Assigned Mobile Technician
        </h4>
        <span className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[11px] font-extrabold px-2.5 py-0.5 rounded-full flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
          Active On Dispatch
        </span>
      </div>

      {/* Driver Info Profile */}
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
        
        {/* Driver Photo */}
        <div className="relative shrink-0">
          <img
            src={technician.photo}
            alt={technician.name}
            className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover border-2 border-blue-500/60 shadow-lg"
          />
          <div className="absolute -bottom-2 -right-1 bg-amber-500 text-slate-950 text-[10px] font-black px-1.5 py-0.5 rounded shadow">
            ASE CERT
          </div>
        </div>

        {/* Driver Details */}
        <div className="space-y-1.5 text-center sm:text-left flex-1">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
            <h3 className="font-heading text-xl font-bold text-white">{technician.name}</h3>
            <div className="flex items-center justify-center sm:justify-start gap-1 text-amber-400 font-bold text-xs">
              <Star className="w-4 h-4 fill-amber-400" />
              <span>{technician.rating}</span>
            </div>
          </div>

          <p className="text-xs text-slate-400 font-medium">{technician.role}</p>

          {/* Van & Unit Info */}
          <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 text-xs space-y-1 mt-2">
            <div className="flex items-center justify-between text-slate-300">
              <span className="text-slate-500">Service Vehicle:</span>
              <span className="font-bold text-white">{technician.vehicle}</span>
            </div>
            <div className="flex items-center justify-between text-slate-300">
              <span className="text-slate-500">Fleet Unit / Tag:</span>
              <span className="font-mono text-amber-400 font-bold">{technician.unit} ({technician.licensePlate})</span>
            </div>
          </div>
        </div>

      </div>

      {/* Equipment Badges */}
      <div className="space-y-1.5 pt-1">
        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Onboard Equipment</span>
        <div className="flex flex-wrap gap-1.5">
          {technician.equipment.map((eq, i) => (
            <span key={i} className="bg-slate-900 border border-slate-800 text-slate-300 text-[11px] font-medium px-2 py-0.5 rounded-md">
              ✓ {eq}
            </span>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-3 pt-2">
        <a
          href={`tel:${BUSINESS_CONFIG.phoneRaw}`}
          className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs py-3 rounded-xl shadow-md transition-all uppercase tracking-wider"
        >
          <Phone className="w-4 h-4" />
          <span>Call Technician</span>
        </a>

        <button
          onClick={() => setShowMsgModal(true)}
          className="flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 font-bold text-xs py-3 rounded-xl transition-all uppercase tracking-wider"
        >
          <MessageSquare className="w-4 h-4 text-amber-400" />
          <span>Message Driver</span>
        </button>
      </div>

      {/* Direct Message Modal */}
      {showMsgModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 space-y-4 relative shadow-2xl animate-in zoom-in-95 duration-200">
            <button
              onClick={() => setShowMsgModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h4 className="font-heading font-bold text-lg text-white flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-amber-400" />
              Message Driver ({technician.name})
            </h4>

            {msgSent ? (
              <div className="bg-green-500/20 border border-green-500/40 text-green-300 p-4 rounded-xl text-center text-sm font-bold flex items-center justify-center gap-2">
                <Check className="w-5 h-5 text-green-400" />
                <span>Message dispatched to driver's dashboard!</span>
              </div>
            ) : (
              <form onSubmit={handleSendMessage} className="space-y-3">
                <p className="text-xs text-slate-400">
                  Send a quick location note or update directly to Technician {technician.name}.
                </p>
                <textarea
                  required
                  rows="3"
                  value={msgText}
                  onChange={(e) => setMsgText(e.target.value)}
                  placeholder="e.g. I am parked near the gas station entrance next to pump 4."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-white focus:border-amber-400 outline-none"
                ></textarea>
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold text-xs py-3 rounded-xl uppercase tracking-wider flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message To Unit #408</span>
                </button>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
