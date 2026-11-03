import React from 'react';
import { TriangleAlert, Phone } from 'lucide-react';
import { BUSINESS_CONFIG } from '../config/businessConfig';

/**
 * Shown when an online request could not be delivered, so the customer can
 * still reach dispatch immediately via direct phone call.
 */
export default function FormErrorNotice({ message }) {
  if (!message) return null;

  return (
    <div role="alert" className="bg-red-950/60 border border-red-500/40 rounded-xl p-3.5 space-y-2.5">
      <div className="flex items-start gap-2 text-red-200">
        <TriangleAlert className="w-4 h-4 shrink-0 mt-0.5 text-red-400" />
        <p className="text-xs sm:text-sm leading-relaxed">
          <strong className="text-white">Your request could not be sent online.</strong>{' '}
          {message} Please call our 24/7 dispatch hotline directly so we can send a technician immediately.
        </p>
      </div>
      <div>
        <a
          href={`tel:${BUSINESS_CONFIG.phoneRaw}`}
          className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-black text-xs sm:text-sm py-2.5 px-3 rounded-lg uppercase tracking-wider transition-all shadow-md"
        >
          <Phone className="w-4 h-4" />
          <span>Call Dispatch Now ({BUSINESS_CONFIG.phone})</span>
        </a>
      </div>
    </div>
  );
}
