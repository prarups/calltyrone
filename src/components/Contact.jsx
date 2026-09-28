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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const targetEmail = BUSINESS_CONFIG.dispatchEmail || BUSINESS_CONFIG.email || 'info@mobiletireplus.com';

    const emailPayload = {
      _subject: `💼 CORPORATE FLEET / CONTACT INQUIRY: ${form.name}`,
      _captcha: "false",
      _template: "table",
      "Sender Name": form.name,
      "Sender Email": form.email,
      "Phone Number": form.phone || 'Not Provided',
      "Message / Inquiry": form.message,
      "Submission Time": new Date().toLocaleString()
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
      console.warn("Contact form FormSubmit error:", error);
    }

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setForm({ name: '', email: '', phone: '', message: '' });
    }, 4000);
  };

  return (
    <section id="contact" className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-950 relative overflow-hidden">
      
      {/* Background Section Image Layer */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img
          src="https://images.unsplash.com/photo-1527018601619-a508a2be00ed?auto=format&fit=crop&w=1000&q=70"
          alt="Contact dispatch center background"
          loading="lazy"
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
            CONTACT <span className="text-blue-500">{BUSINESS_CONFIG.companyName}</span>
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
                  <h4 className="font-bold text-lg">Inquiry Sent via Email!</h4>
                  <p className="text-xs text-slate-300">Your fleet inquiry has been emailed directly to our operations team. We will get back to you shortly.</p>
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

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-black text-sm py-3.5 px-4 rounded-xl uppercase tracking-wider shadow-lg flex items-center justify-center gap-2.5 transition-all cursor-pointer hover:shadow-blue-900/40"
                    >
                      <Send className="w-5 h-5 shrink-0" />
                      <span>Submit Inquiry</span>
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

