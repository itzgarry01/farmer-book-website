'use client';

import React from 'react';
import { BookOpen, ShieldCheck, Zap, Download } from 'lucide-react';

interface NavbarProps {
  onBuyClick: () => void;
}

export default function Navbar({ onBuyClick }: NavbarProps) {
  return (
    <>
      {/* Top Banner Ribbon */}
      <div className="bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 text-amber-950 font-bold text-xs py-2 px-4 text-center shadow-inner">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 flex-wrap">
          <span className="bg-amber-950 text-white text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider">
            ਨਵੀਂ ਪੇਸ਼ਕਸ਼
          </span>
          <span className="font-gurmukhi text-xs sm:text-sm">
            ਅੱਜ ਹੀ 60% ਛੋਟ ਉੱਤੇ ਪ੍ਰਾਪਤ ਕਰੋ — ਸਿਰਫ਼ <span className="underline font-black text-amber-950">₹199</span> (ਅਸਲ ਮੁੱਲ ₹499) • ਤੁਰੰਤ PDF ਡਾਊਨਲੋਡ!
          </span>
        </div>
      </div>

      {/* Main Sticky Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 py-3 flex items-center justify-between">
          
          {/* Logo & Identity */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-xl bg-farm-700 flex items-center justify-center text-white shadow-md shadow-farm-800/20 group-hover:scale-105 transition-transform">
              <BookOpen className="w-6 h-6 text-amber-300" />
            </div>
            <div>
              <div className="font-gurmukhi font-black text-lg sm:text-xl text-farm-900 leading-tight">
                ਕਿਸਾਨ ਦੀ ਫਸਲ ਗਾਈਡ
              </div>
              <div className="text-[11px] font-semibold text-stone-500 flex items-center gap-1">
                <span>40 ਪੰਨੇ ਮਾਸਟਰ ਡਿਜੀਟਲ ਹੈਂਡਬੁੱਕ</span>
                <span className="text-amber-500">★</span>
                <span>HD Color PDF</span>
              </div>
            </div>
          </a>

          {/* Navigation Links (Desktop) */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-semibold text-stone-700 font-gurmukhi">
            <a href="#preview" className="hover:text-farm-700 transition-colors">
              ਕਿਤਾਬ ਦੇ ਨਮੂਨੇ
            </a>
            <a href="#chapters" className="hover:text-farm-700 transition-colors">
              ਵਿਸ਼ੇ ਸੂਚੀ
            </a>
            <a href="#benefits" className="hover:text-farm-700 transition-colors">
              ਮੁੱਖ ਫਾਇਦੇ
            </a>
            <a href="#reviews" className="hover:text-farm-700 transition-colors">
              ਕਿਸਾਨਾਂ ਦੀ ਰਾਏ
            </a>
            <a href="#faq" className="hover:text-farm-700 transition-colors">
              ਸਵਾਲ-ਜਵਾਬ
            </a>
          </nav>

          {/* Action CTA Button */}
          <div className="flex items-center gap-3">
            <button
              onClick={onBuyClick}
              className="flex items-center gap-2 bg-gradient-to-r from-farm-700 to-farm-800 hover:from-farm-800 hover:to-farm-900 text-white font-gurmukhi font-bold text-xs sm:text-sm px-4 py-2.5 rounded-xl shadow-md shadow-farm-900/20 hover:shadow-lg transition-all active:scale-95 border border-farm-600/50"
            >
              <Download className="w-4 h-4 text-amber-300" />
              <span>ਹੁਣੇ ਖਰੀਦੋ (₹199)</span>
            </button>
          </div>

        </div>
      </header>
    </>
  );
}
