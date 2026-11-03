import React from 'react';
import { TriangleAlert, Phone, MessageCircle } from 'lucide-react';
import { BUSINESS_CONFIG } from '../config/businessConfig';

/**
 * Shown when an online request could not be delivered, so the customer can
 * still reach dispatch immediately and the lead is not lost.
 */
export default function FormErrorNotice({ message, whatsappText = 'Hi, I need roadside assistance.' }) {
  if (!message) return null;

  const whatsappUrl = `https://wa.me/${BUSINESS_CONFIG.whatsappPhoneRaw}?text=${encodeURIComponent(whatsappText)}`;

  return (
    <div role="alert" className="bg-red-950/60 border border-red-500/40 rounded-xl p-3.5 space-y-2.5">
      <div className="flex items-start gap-2 text-red-200">
        <TriangleAlert className="w-4 h-4 shrink-0 mt-0.5 text-red-400" />
        <p className="text-xs sm:text-sm leading-relaxed">
          <strong className="text-white">Your request could not be sent online.</strong>{' '}
          {message} Please call or WhatsApp us now so we can help you right away.
        </p>
      </div>
      <div className="flex flex-col sm:flex-row gap-2">
        <a
          href={`tel:${BUSINESS_CONFIG.phoneRaw}`}
          className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-black text-xs py-2.5 px-3 rounded-lg uppercase tracking-wider transition-all"
        >
          <Phone className="w-4 h-4" />
          <span>Call {BUSINESS_CONFIG.phone}</span>
        </a>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs py-2.5 px-3 rounded-lg uppercase tracking-wider transition-all"
        >
          <MessageCircle className="w-4 h-4" />
          <span>WhatsApp Us</span>
        </a>
      </div>
    </div>
  );
}
