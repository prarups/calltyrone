import React, { useState } from 'react';
import { PhoneCall, Mail, MapPin, Send, CheckCircle2 } from 'lucide-react';
import { BUSINESS_CONFIG } from '../config/businessConfig';

export default function Contact({ onOpenDownloadGuide }) {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });

  const formatPhoneNumber = (value) => {
    if (!value) return value;
    const digits = value.replace(/\D/g, '');
    if (digits.length <= 3) return digits;
    if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setForm({ name: '', email: '', phone: '', message: '' });
    }, 3000);
  };

  const handleWhatsAppSubmit = (e) => {
    const formElement = e.currentTarget.closest('form');
    if (formElement && !formElement.checkValidity()) {
      formElement.reportValidity();
      return;
    }

    const waMessage = 
`💼 *CORPORATE FLEET & NON-EMERGENCY INQUIRY*
---------------------------------------
👤 *Name:* ${form.name}
📧 *Email:* ${form.email}
📞 *Phone:* ${form.phone || 'Not Provided'}
📝 *Message:* ${form.message}
---------------------------------------
*Call Tyrone LLC Operations Inquiry*`;

    const cleanPhone = BUSINESS_CONFIG.phoneRaw.replace(/[^0-9]/g, '');
    const waUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(waMessage)}`;

    window.open(waUrl, '_blank');
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setForm({ name: '', email: '', phone: '', message: '' });
    }, 3000);
  };

  return (
    <section id="contact" className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-950 relative overflow-hidden">
      
      {/* Background Section Image Layer */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img
          src="https://images.unsplash.com/photo-1527018601619-a508a2be00ed?auto=format&fit=crop&w=2000&q=80"
          alt="Contact dispatch center background"
          className="w-full h-full object-cover opacity-20 filter brightness-110 contrast-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/90 to-slate-950"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-transparent to-slate-950"></div>
      </div>

      <div className="max-w-7xl mx-auto space-y-12 relative z-10">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 bg-blue-600/10 border border-blue-500/30 text-blue-400 text-xs font-black uppercase tracking-wider px-3.5 py-1 rounded-full">
            <Mail className="w-3.5 h-3.5" />
            <span>24/7 Headquarters & Fleet Inquiries</span>
          </div>

          <h2 className="font-heading text-3xl sm:text-5xl font-black uppercase tracking-tight text-white drop-shadow-md">
            CONTACT <span className="text-blue-500">MOBILE TIRE PLUS</span>
          </h2>

          <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto">
            Need emergency dispatch? Call hotline immediately. For corporate fleet contracts or non-emergency inquiries, drop us a line.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Company Info Cards */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Phone Card */}
            <div className="glass-panel p-5 rounded-2xl border border-slate-800 flex items-start gap-4">
              <div className="p-3 bg-blue-600/20 text-blue-400 rounded-xl border border-blue-500/30 shrink-0">
                <PhoneCall className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">24/7 Emergency Dispatch</span>
                <a href={`tel:${BUSINESS_CONFIG.phoneRaw}`} className="font-heading font-black text-2xl text-yellow-300 hover:underline">
                  {BUSINESS_CONFIG.phone}
                </a>
                <p className="text-xs text-slate-400">Toll-Free Backup: {BUSINESS_CONFIG.altPhone}</p>
              </div>
            </div>

            {/* Email Card */}
            <div className="glass-panel p-5 rounded-2xl border border-slate-800 flex items-start gap-4">
              <div className="p-3 bg-indigo-600/20 text-indigo-400 rounded-xl border border-indigo-500/30 shrink-0">
                <Mail className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Email Dispatch Center</span>
                <span className="font-bold text-sm text-white block">{BUSINESS_CONFIG.email}</span>
                <p className="text-xs text-slate-400">Customer Support: {BUSINESS_CONFIG.supportEmail}</p>
              </div>
            </div>

            {/* HQ Address Card */}
            <div className="glass-panel p-5 rounded-2xl border border-slate-800 flex items-start gap-4">
              <div className="p-3 bg-amber-600/20 text-amber-400 rounded-xl border border-amber-500/30 shrink-0">
                <MapPin className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">National Operations HQ</span>
                <span className="font-bold text-sm text-white block">{BUSINESS_CONFIG.address.fullAddress}</span>
                <span className="text-xs text-slate-400 block">Operating Hours: {BUSINESS_CONFIG.hours}</span>
              </div>
            </div>

            {/* Download Guide Banner Button */}
            <div className="glass-panel-accent p-5 rounded-2xl flex items-center justify-between gap-4">
              <div className="space-y-0.5">
                <h4 className="font-heading font-bold text-white text-sm">Download Emergency Guide</h4>
                <p className="text-xs text-slate-300">Free glovebox safety & tire sidewall guide PDF.</p>
              </div>
              <button
                onClick={onOpenDownloadGuide}
                className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl shrink-0 uppercase tracking-wider transition-all shadow"
              >
                Download Guide
              </button>
            </div>

          </div>

          {/* Right Column: General / Fleet Contact Form */}
          <div className="lg:col-span-7">
            <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-2xl space-y-6">
              
              <div className="space-y-1 border-b border-slate-800 pb-3">
                <h3 className="font-heading text-xl font-bold text-white uppercase tracking-wider">
                  Corporate Fleet & Non-Emergency Inquiry
                </h3>
                <p className="text-xs text-slate-400">
                  Interested in mobile commercial fleet tire maintenance contracts? Send a message to operations.
                </p>
              </div>

              {submitted ? (
                <div className="bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 p-6 rounded-xl text-center space-y-2">
                  <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
                  <h4 className="font-bold text-lg">Inquiry Received</h4>
                  <p className="text-xs text-slate-300">Our operations supervisor will respond to your email within 2 business hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-300 uppercase">Your Name</label>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="John Doe"
                        className="w-full bg-slate-950 border border-slate-800 focus:border-blue-500 rounded-xl px-4 py-3 text-xs text-white outline-none"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-300 uppercase">Email Address</label>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="john@company.com"
                        className="w-full bg-slate-950 border border-slate-800 focus:border-blue-500 rounded-xl px-4 py-3 text-xs text-white outline-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-300 uppercase">Phone Number</label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: formatPhoneNumber(e.target.value) })}
                      placeholder="(404) 000-0000"
                      className="w-full bg-slate-950 border border-slate-800 focus:border-blue-500 rounded-xl px-4 py-3 text-xs text-white outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-300 uppercase">Message / Fleet Requirements</label>
                    <textarea
                      required
                      rows="3"
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Details regarding your vehicle fleet or service inquiry..."
                      className="w-full bg-slate-950 border border-slate-800 focus:border-blue-500 rounded-xl px-4 py-3 text-xs text-white outline-none resize-none"
                    ></textarea>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    {/* Button 1: Normal Submit */}
                    <button
                      type="submit"
                      className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-extrabold text-xs py-3.5 px-4 rounded-xl uppercase tracking-wider shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer"
                    >
                      <Send className="w-4 h-4" />
                      <span>📨 Direct Message</span>
                    </button>

                    {/* Button 2: Send via WhatsApp */}
                    <button
                      type="button"
                      onClick={handleWhatsAppSubmit}
                      className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs py-3.5 px-4 rounded-xl uppercase tracking-wider shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer"
                    >
                      <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24">
                        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                      </svg>
                      <span>💬 Send via WhatsApp</span>
                    </button>
                  </div>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
