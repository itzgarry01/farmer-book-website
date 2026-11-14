'use client';

import React from 'react';
import { Star, ShieldCheck, Quote } from 'lucide-react';

const REVIEWS = [
  {
    name: 'ਸ. ਹਰਪ੍ਰੀਤ ਸਿੰਘ ਢਿੱਲੋਂ',
    location: 'ਪਿੰਡ ਸਮਰਾਲਾ, ਜ਼ਿਲ੍ਹਾ ਲੁਧਿਆਣਾ',
    acres: '22 ਏਕੜ ਖੇਤੀ (ਕਣਕ-ਝੋਨਾ)',
    rating: 5,
    quote: 'ਮੈਂ ਪਿਛਲੇ 15 ਸਾਲਾਂ ਤੋਂ ਖੇਤੀ ਕਰ ਰਿਹਾ ਹਾਂ, ਪਰ ਇਸ ਕਿਤਾਬ ਵਿੱਚ ਦਿੱਤੀਆਂ ਰੰਗਦਾਰ ਤਸਵੀਰਾਂ ਨਾਲ ਖਾਦ ਪਾਉਣ ਦੇ ਸਹੀ ਪੜਾਅ ਇੰਨੇ ਸੌਖੇ ਸਮਝ ਆਏ ਕਿ ਮੇਰਾ ਪ੍ਰਤੀ ਏਕੜ 2 ਥੈਲੇ ਯੂਰੀਆ ਬਚ ਗਿਆ। ਕਣਕ ਦਾ ਝਾੜ ਵੀ ਪਿਛਲੇ ਸਾਲ ਨਾਲੋਂ 3 ਕੁਇੰਟਲ ਵੱਧ ਨਿਕਲਿਆ।'
  },
  {
    name: 'ਸ. ਗੁਰਵਿੰਦਰ ਸਿੰਘ ਬਰਾੜ',
    location: 'ਬਾਘਾ ਪੁਰਾਣਾ, ਜ਼ਿਲ੍ਹਾ ਮੋਗਾ',
    acres: '15 ਏਕੜ ਖੇਤੀ (ਕਪਾਹ-ਕਣਕ)',
    rating: 5,
    quote: 'ਨਰਮੇ ਵਿੱਚ ਚਿੱਟੀ ਮੱਖੀ ਅਤੇ ਗੁਲਾਬੀ ਸੁੰਡੀ ਦੀ ਪਛਾਣ ਵਾਸਤੇ ਇਹ ਕਿਤਾਬ ਵਰਦਾਨ ਸਾਬਤ ਹੋਈ। ਪਹਿਲਾਂ ਦੁਕਾਨਦਾਰ ਦੇ ਕਹਿਣ ਉੱਤੇ 4-4 ਬੇਲੋੜੀਆਂ ਸਪਰੇਆਂ ਕਰ ਦਿੰਦੇ ਸੀ। ਇਸ ਕਿਤਾਬ ਦੇ ਨਿਯਮਾਂ ਨਾਲ ਸਿਰਫ਼ ਸਹੀ ਸਮੇਂ ਸਪਰੇਅ ਕੀਤੀ ਅਤੇ ਖਰਚਾ ਅੱਧਾ ਰਹਿ ਗਿਆ।'
  },
  {
    name: 'ਸ. ਬਲਦੇਵ ਸਿੰਘ ਸਿੱਧੂ',
    location: 'ਤਲਵੰਡੀ ਸਾਬੋ, ਜ਼ਿਲ੍ਹਾ ਬਠਿੰਡਾ',
    acres: '30 ਏਕੜ ਖੇਤੀ',
    rating: 5,
    quote: 'ਕਿਤਾਬ ਦੀ ਸਭ ਤੋਂ ਵੱਡੀ ਖੂਬੀ ਇਹ ਹੈ ਕਿ ਇਸ ਵਿੱਚ ਫਾਲਤੂ ਗੱਲਾਂ ਨਹੀਂ ਹਨ। ਹਰ ਪੰਨੇ ਉੱਪਰ ਸਾਫ਼-ਸਾਫ਼ ਚਿੱਤਰ ਬਣਾ ਕੇ ਸਮਝਾਇਆ ਹੈ ਕਿ ਕੀ ਕਰਨਾ ਹੈ ਤੇ ਕੀ ਨਹੀਂ ਕਰਨਾ। ਮੋਬਾਈਲ ਵਿੱਚ PDF ਹਰ ਵੇਲੇ ਨਾਲ ਰਹਿੰਦੀ ਹੈ, ਖੇਤ ਵਿੱਚ ਖੜ੍ਹ ਕੇ ਵੀ ਵੇਖ ਸਕਦੇ ਹਾਂ।'
  },
  {
    name: 'ਸ. ਮਨਜਿੰਦਰ ਸਿੰਘ ਔਲਖ',
    location: 'ਸੁਨਾਮ, ਜ਼ਿਲ੍ਹਾ ਸੰਗਰੂਰ',
    acres: '18 ਏਕੜ ਖੇਤੀ (DSR ਝੋਨਾ)',
    rating: 5,
    quote: 'ਸਿੱਧੀ ਬਿਜਾਈ (DSR) ਵਿੱਚ ਨਦੀਨਾਂ ਦਾ ਬਹੁਤ ਡਰ ਹੁੰਦਾ ਸੀ। ਇਸ ਕਿਤਾਬ ਵਿੱਚ ਦੱਸੇ ਤਰ-ਵੱਤਰ ਤਰੀਕੇ ਅਤੇ ਨਦੀਨਨਾਸ਼ਕ ਦੇ ਸਹੀ ਸਮੇਂ ਨਾਲ ਪਹਿਲੀ ਵਾਰ ਬਿਨਾਂ ਕਿਸੇ ਸਮੱਸਿਆ ਦੇ ਕਾਮਯਾਬ DSR ਹੋਈ। ਪਾਣੀ ਅਤੇ ਡੀਜ਼ਲ ਦੋਵੇਂ ਬਚੇ।'
  }
];

export default function FarmerTestimonials() {
  return (
    <section id="reviews" className="py-16 sm:py-24 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 bg-amber-100 border border-amber-300 text-amber-900 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
            <span>ਪੰਜਾਬ ਦੇ ਕਿਸਾਨਾਂ ਦੀ ਆਵਾਜ਼</span>
          </div>
          <h2 className="font-gurmukhi font-black text-2xl sm:text-3xl md:text-4xl text-farm-950 mb-3">
            10,000+ ਕਿਸਾਨ ਭਰਾਵਾਂ ਦਾ ਭਰੋਸਾ
          </h2>
          <p className="font-gurmukhi text-stone-600 text-sm sm:text-base leading-relaxed">
            ਪੰਜਾਬ ਦੇ ਵੱਖ-ਵੱਖ ਪਿੰਡਾਂ ਵਿੱਚੋਂ ਸਾਡੇ ਕਿਸਾਨ ਭਰਾਵਾਂ ਦੇ ਤਜਰਬੇ ਅਤੇ ਅਸਲ ਨਤੀਜੇ:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {REVIEWS.map((rev, idx) => (
            <div 
              key={idx}
              className="bg-stone-50 border border-stone-200 rounded-3xl p-6 sm:p-7 shadow-sm hover:shadow-md transition-shadow relative flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-amber-500">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 stroke-amber-500" />
                    ))}
                  </div>
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-800 bg-emerald-100 border border-emerald-200 px-2 py-0.5 rounded-full">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                    ਪ੍ਰਮਾਣਿਤ ਖਰੀਦਦਾਰ
                  </span>
                </div>

                <div className="relative mb-6">
                  <Quote className="w-8 h-8 text-stone-200 absolute -top-3 -left-2 -z-0 pointer-events-none" />
                  <p className="font-gurmukhi text-stone-700 text-sm sm:text-[15px] leading-relaxed relative z-10 font-medium">
                    "{rev.quote}"
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-stone-200/80 flex items-center justify-between">
                <div>
                  <div className="font-gurmukhi font-black text-sm sm:text-base text-stone-900">
                    {rev.name}
                  </div>
                  <div className="text-xs text-stone-500 font-gurmukhi">
                    {rev.location}
                  </div>
                </div>
                <div className="text-[11px] font-bold text-farm-800 bg-farm-100 border border-farm-200 px-2.5 py-1 rounded-lg font-gurmukhi">
                  {rev.acres}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
