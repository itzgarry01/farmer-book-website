'use client';

import React, { useEffect, useState } from 'react';
import { Download, Sparkles } from 'lucide-react';

export default function StickyBuyBar({ onBuyClick }: { onBuyClick: () => void }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 450) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t-2 border-emerald-400 p-3 sm:p-4 shadow-2xl transition-all duration-300 animate-in slide-in-from-bottom-5">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 px-2 sm:px-6">
        
        {/* Book Mini Info */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-farm-800 text-white font-black text-xs flex items-center justify-center flex-shrink-0 shadow">
            40 P
          </div>
          <div>
            <div className="font-gurmukhi font-black text-xs sm:text-sm text-stone-900 leading-tight">
              ਕਿਸਾਨ ਦੀ ਫਸਲ ਗਾਈਡ (ਸੰਪੂਰਨ ਹੈਂਡਬੁੱਕ)
            </div>
            <div className="flex items-baseline gap-2 text-xs">
              <span className="font-black text-farm-900 text-sm sm:text-base">₹25</span>
              <span className="text-stone-400 line-through text-[11px]">₹499</span>
              <span className="text-[10px] bg-amber-100 text-amber-800 font-bold px-1.5 py-0.2 rounded font-gurmukhi">
                95% ਛੋਟ
              </span>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <button
          onClick={onBuyClick}
          className="flex items-center gap-2 bg-gradient-to-r from-farm-700 to-farm-800 hover:from-farm-800 hover:to-farm-900 text-white font-gurmukhi font-black text-xs sm:text-sm py-2.5 px-4 sm:px-6 rounded-xl shadow-lg transition-all active:scale-95 whitespace-nowrap border border-farm-500/50"
        >
          <Download className="w-4 h-4 text-amber-300" />
          <span>ਹੁਣੇ ਡਾਊਨਲੋਡ ਕਰੋ (₹25)</span>
        </button>

      </div>
    </div>
  );
}

