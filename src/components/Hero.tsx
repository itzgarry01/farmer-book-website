'use client';

import React from 'react';
import Image from 'next/image';
import { CheckCircle2, ShieldCheck, Download, Eye, Award, Sparkles } from 'lucide-react';

interface HeroProps {
  onBuyClick: () => void;
}

export default function Hero({ onBuyClick }: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-stone-100 via-emerald-50/40 to-stone-100 pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-stone-200">
      
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#15803d_1px,transparent_1px)] [background-size:20px_20px]" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            
            <div className="inline-flex items-center gap-2 bg-emerald-100/80 border border-emerald-300 text-emerald-900 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide uppercase mb-5 shadow-sm">
              <Award className="w-4 h-4 text-emerald-700" />
              <span>ਪੰਜਾਬ ਦੇ ਕਿਸਾਨਾਂ ਲਈ ਨੰਬਰ 1 ਪ੍ਰੈਕਟੀਕਲ ਖੇਤੀਬਾੜੀ ਹੈਂਡਬੁੱਕ</span>
            </div>

            <h1 className="font-gurmukhi font-black text-3xl sm:text-4xl md:text-5xl text-farm-950 leading-[1.2] tracking-tight mb-4">
              ਕਿਸਾਨ ਦੀ ਫਸਲ ਗਾਈਡ
              <span className="block text-2xl sm:text-3xl md:text-4xl text-farm-700 font-extrabold mt-1">
                ਵੱਧ ਝਾੜ • ਘੱਟ ਖਰਚਾ • ਸਿਹਤਮੰਦ ਫਸਲ
              </span>
            </h1>

            <p className="text-base sm:text-lg text-stone-700 font-medium leading-relaxed mb-6 font-gurmukhi">
              ਬੀਜ ਤੋਂ ਮੰਡੀ ਤੱਕ <strong>40 ਉੱਚ-ਗੁਣਵੱਤਾ ਰੰਗਦਾਰ ਵਿਜ਼ੂਅਲ ਪੰਨਿਆਂ</strong> ਵਿੱਚ ਪੂਰੀ ਵਿਗਿਆਨਕ ਅਤੇ ਪ੍ਰੈਕਟੀਕਲ ਜਾਣਕਾਰੀ। ਹਰ ਏਕੜ ਪਿੱਛੇ ਬੇਲੋੜੀ ਖਾਦ ਅਤੇ ਸਪਰੇਅ ਦਾ <span className="text-farm-800 font-bold underline decoration-amber-400">₹8,000 ਤੋਂ ₹15,000</span> ਖਰਚਾ ਬਚਾਓ।
            </p>

            <div className="space-y-3 mb-8 w-full">
              {[
                "100% ਪ੍ਰੈਕਟੀਕਲ ਅਤੇ ਵਿਗਿਆਨਕ ਸਿਫ਼ਾਰਸ਼ਾਂ (PAU ਲੁਧਿਆਣਾ ਅਧਾਰਿਤ)",
                "ਮਿੱਟੀ ਜਾਂਚ, NPK ਖੁਰਾਕ, ਨਦੀਨ ਅਤੇ ਕੀੜੇ-ਬਿਮਾਰੀਆਂ ਦੀ ਰੰਗਦਾਰ ਤਸਵੀਰਾਂ ਨਾਲ ਪਛਾਣ",
                "ਕਣਕ, ਝੋਨਾ, ਮੱਕੀ, ਕਪਾਹ, ਆਲੂ, ਗੰਨਾ ਅਤੇ ਸਬਜ਼ੀਆਂ ਦੀ ਕਦਮ-ਦਰ-ਕਦਮ ਗਾਈਡ",
                "ਤੁਰੰਤ ਡਿਜੀਟਲ PDF ਡਾਊਨਲੋਡ — ਮੋਬਾਈਲ ਉੱਤੇ ਪੜ੍ਹੋ ਜਾਂ A4 ਪ੍ਰਿੰਟ ਕੱਢੋ"
              ].map((point, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm">
                    <CheckCircle2 className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <span className="font-gurmukhi text-sm sm:text-base font-semibold text-stone-800">
                    {point}
                  </span>
                </div>
              ))}
            </div>

            <div className="w-full bg-white border-2 border-emerald-300/80 rounded-2xl p-5 sm:p-6 shadow-warm mb-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200">
                <div>
                  <div className="flex items-baseline gap-3">
                    <span className="text-3xl sm:text-4xl font-black text-farm-900">₹22</span>
                    <span className="text-lg text-stone-400 line-through font-semibold">₹499</span>
                    <span className="bg-amber-100 text-amber-800 border border-amber-300 text-xs font-bold px-2.5 py-0.5 rounded-md">
                      95% ਛੋਟ (ਸਿਰਫ਼ ₹22)
                    </span>
                  </div>
                  <div className="text-xs text-stone-500 font-medium mt-1 font-gurmukhi">
                    ★ ਲਾਂਚ ਆਫਰ — ਸਿਰਫ਼ ਪਹਿਲੇ 1,000 ਕਿਸਾਨਾਂ ਲਈ ਉਪਲਬਧ
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>ਤੁਰੰਤ ਡਾਊਨਲੋਡ ਗਾਰੰਟੀ</span>
                </div>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={onBuyClick}
                  className="flex-1 flex items-center justify-center gap-2.5 bg-gradient-to-r from-farm-700 via-farm-600 to-farm-700 hover:from-farm-800 hover:to-farm-800 text-white font-gurmukhi font-black text-base py-3.5 px-6 rounded-xl shadow-lg shadow-farm-900/25 hover:shadow-xl transition-all active:scale-[0.98] border border-farm-500/50"
                >
                  <Download className="w-5 h-5 text-amber-300 animate-bounce" />
                  <span>ਹੁਣੇ ਡਾਊਨਲੋਡ ਕਰੋ (ਸਿਰਫ਼ ₹22)</span>
                </button>

                <a
                  href="#preview"
                  className="flex items-center justify-center gap-2 bg-stone-100 hover:bg-stone-200 text-stone-800 font-gurmukhi font-bold text-sm py-3.5 px-5 rounded-xl border border-stone-300 transition-colors"
                >
                  <Eye className="w-4 h-4 text-stone-600" />
                  <span>ਨਮੂਨਾ ਪੰਨੇ ਵੇਖੋ</span>
                </a>
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs font-semibold text-stone-500 flex-wrap">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                100% ਸੁਰੱਖਿਅਤ UPI / ਕਾਰਡ
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                ਲਾਈਫਟਾਈਮ ਮੋਬਾਈਲ ਐਕਸੈਸ
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                ਵਟਸਐਪ ਉੱਤੇ ਵੀ ਪ੍ਰਾਪਤ ਕਰੋ
              </span>
            </div>

          </div>

          <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
            <div className="absolute w-72 h-72 bg-amber-300/30 rounded-full blur-3xl pointer-events-none -top-6 -right-6" />
            <div className="absolute w-64 h-64 bg-emerald-400/20 rounded-full blur-2xl pointer-events-none -bottom-8 -left-8" />

            <div className="relative group cursor-pointer" onClick={onBuyClick}>
              <div className="absolute -top-4 -right-2 z-20 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-black text-xs px-3.5 py-1.5 rounded-full shadow-lg border-2 border-white flex items-center gap-1.5 animate-pulse-subtle">
                <Sparkles className="w-3.5 h-3.5 text-yellow-200" />
                <span>40 ਰੰਗਦਾਰ ਪੰਨੇ</span>
              </div>

              <div className="relative rounded-2xl overflow-hidden book-shadow border-4 border-white transition-transform duration-300 group-hover:scale-[1.02] group-hover:-rotate-1">
                <Image
                  src="/images/book_cover.jpg"
                  alt="ਕਿਸਾਨ ਦੀ ਫਸਲ ਗਾਈਡ ਕਿਤਾਬ ਕਵਰ"
                  width={460}
                  height={650}
                  className="w-full max-w-[360px] sm:max-w-[400px] h-auto object-cover rounded-xl"
                  priority
                />

                <div className="absolute inset-0 bg-emerald-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="bg-white/95 text-farm-900 font-gurmukhi font-black text-sm px-4 py-2 rounded-xl shadow-lg border border-emerald-300 flex items-center gap-2">
                    <Eye className="w-4 h-4 text-emerald-600" />
                    ਵੇਰਵਾ ਵੇਖਣ ਲਈ ਕਲਿੱਕ ਕਰੋ
                  </span>
                </div>
              </div>

              <div className="absolute -bottom-4 -left-3 z-20 bg-white border border-stone-200 text-stone-800 font-gurmukhi font-bold text-xs p-2.5 rounded-xl shadow-lg flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-emerald-500 animate-ping" />
                <span>ਤੁਰੰਤ PDF ਡਾਊਨਲੋਡ ਉਪਲਬਧ</span>
              </div>
            </div>

            <p className="text-xs text-stone-500 font-medium text-center mt-7 font-gurmukhi">
              (ਅਸਲ ਕਿਤਾਬ ਦਾ ਕਵਰ — ਪੂਰੀ 40 ਪੰਨਿਆਂ ਦੀ ਰੰਗਦਾਰ ਈ-ਬੁੱਕ)
            </p>

          </div>

        </div>
      </div>
    </section>
  );
}
