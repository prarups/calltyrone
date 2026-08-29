import React, { useState } from 'react';
import { Download, FileText, CheckCircle2, X } from 'lucide-react';
import { BUSINESS_CONFIG } from '../config/businessConfig';

export default function DownloadGuideModal({ isOpen, onClose }) {
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadComplete, setDownloadComplete] = useState(false);

  if (!isOpen) return null;

  const handleDownload = () => {
    setIsDownloading(true);

    setTimeout(() => {
      const guideText = `================================================================
CALL TYRONE - 24/7 ROADSIDE EMERGENCY PREPARATION GUIDE
================================================================

Emergency Dispatch Hotline: ${BUSINESS_CONFIG.phone}
Alternative Dispatch: ${BUSINESS_CONFIG.altPhone}
Dispatch Email: ${BUSINESS_CONFIG.email}
Website: https://calltyrone.com

----------------------------------------------------------------
1. IMMEDIATE HIGHWAY SAFETY CHECKLIST
----------------------------------------------------------------
• Pull vehicle as far onto the right shoulder or emergency lane as possible.
• Turn on hazard flasher lights immediately.
• Stay inside vehicle with seatbelt buckled if traffic is passing closely.
• If exiting vehicle, step out from passenger-side door away from traffic.
• Note highway exit markers, nearest mile marker, or cross streets.

----------------------------------------------------------------
2. CALL TYRONE SERVICES OFFERED 24/7
----------------------------------------------------------------
1. Mobile Tire Change (Spare Swapping)
2. On-Site Flat Puncture Repair (Internal Patch/Plug)
3. On-Site Brand New Tire Delivery & Computerized Mounting
4. Heavy Duty 12V/24V Battery Jump-Start & Diagnostic
5. On-Site AGM Battery Replacement with 3-Year Warranty
6. Non-Destructive Vehicle Lockout Entry
7. Emergency Fuel & Diesel Delivery (Up to 5 Gallons)
8. Mobile Synthetic Oil Change at Home or Workplace
9. Flatbed Rollback Towing & Mud Winch-Out

----------------------------------------------------------------
3. HOW TO FIND YOUR EXACT TIRE SIZE
----------------------------------------------------------------
Look at the outer sidewall of your tire. You will see a string like:
Example: P 225 / 65 R 17 102H
• 225 = Tire width in millimeters
• 65  = Aspect ratio percentage
• 17  = Wheel diameter in inches

----------------------------------------------------------------
4. ACTIVE USA METRO SERVICE COVERAGE
----------------------------------------------------------------
• Dallas-Fort Worth Metro (TX)
• Greater Houston Metro (TX)
• Greater Atlanta Metro (GA)
• Greater Phoenix Metro (AZ)
• Greater Los Angeles Metro (CA)
• Greater Miami Metro (FL)
• Greater Chicago Metro (IL)

================================================================
KEEP THIS GUIDE IN YOUR GLOVEBOX FOR 24/7 ROADSIDE RELIEF
================================================================`;

      const blob = new Blob([guideText], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'Call_Tyrone_Emergency_Roadside_Guide.txt';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      setIsDownloading(false);
      setDownloadComplete(true);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 sm:p-8 space-y-6 relative shadow-2xl animate-in zoom-in-95 duration-200 text-white">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3">
          <div className="p-3 bg-red-600/20 text-red-400 rounded-xl border border-red-500/30">
            <FileText className="w-7 h-7" />
          </div>
          <div>
            <h3 className="font-heading text-xl font-bold uppercase text-white">
              Download Emergency Guide
            </h3>
            <p className="text-xs text-slate-400">
              Free Roadside Safety & Tire Sidewall Guide by Call Tyrone.
            </p>
          </div>
        </div>

        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2 text-xs text-slate-300">
          <p className="font-bold text-white">Included In This Guide:</p>
          <ul className="space-y-1 text-slate-400">
            <li className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-red-500" />
              <span>Step-by-step highway breakdown safety protocol</span>
            </li>
            <li className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-red-500" />
              <span>How to read tire sidewalls & OEM speed ratings</span>
            </li>
            <li className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-red-500" />
              <span>Direct priority dispatch telephone hotlines</span>
            </li>
            <li className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-red-500" />
              <span>EV jacking points & high-voltage safety instructions</span>
            </li>
          </ul>
        </div>

        {downloadComplete ? (
          <div className="bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 p-4 rounded-xl text-center text-xs font-bold space-y-2">
            <div className="flex items-center justify-center gap-2 text-sm">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <span>Emergency Guide Downloaded Successfully!</span>
            </div>
            <p className="text-slate-400 font-normal">
              Keep file `Call_Tyrone_Emergency_Roadside_Guide.txt` saved on your mobile phone or print for your glovebox.
            </p>
          </div>
        ) : (
          <button
            onClick={handleDownload}
            disabled={isDownloading}
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-black text-xs py-4 rounded-xl uppercase tracking-wider shadow-lg shadow-red-900/50"
          >
            {isDownloading ? (
              <span>GENERATING DOCUMENT...</span>
            ) : (
              <>
                <Download className="w-4 h-4" />
                <span>Download Emergency Roadside Guide</span>
              </>
            )}
          </button>
        )}

      </div>
    </div>
  );
}
