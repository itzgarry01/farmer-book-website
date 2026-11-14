'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Eye, Sparkles, CheckCircle2, Download } from 'lucide-react';

interface BookPreviewProps {
  onBuyClick: () => void;
}

const PREVIEW_PAGES = [
  {
    page: 1,
    title: 'ਮੁੱਖ ਕਵਰ — ਕਿਸਾਨ ਦੀ ਫਸਲ ਗਾਈਡ',
    desc: 'ਵੱਧ ਝਾੜ, ਘੱਟ ਖਰਚਾ, ਸਿਹਤਮੰਦ ਫਸਲ — ਬੀਜ ਤੋਂ ਮੰਡੀ ਤੱਕ ਸੰਪੂਰਨ ਹੈਂਡਬੁੱਕ',
    file: '/previews/page_01.jpg',
  },
  {
    page: 2,
    title: 'ਪੰਨਾ 2 — ਫਸਲ ਦੀ ਪੂਰੀ ਪ੍ਰਕਿਰਿਆ',
    desc: 'ਖੇਤ ਦੀ ਤਿਆਰੀ, ਮਿੱਟੀ ਜਾਂਚ ਤੋਂ ਲੈ ਕੇ ਕਟਾਈ ਅਤੇ ਮੰਡੀ ਤੱਕ 6 ਮੁੱਖ ਪੜਾਅ',
    file: '/previews/page_02.jpg',
  },
  {
    page: 4,
    title: 'ਪੰਨਾ 4 — ਚੰਗੀ ਮਿੱਟੀ ਦੀ ਪਛਾਣ',
    desc: 'ਮਿੱਟੀ ਦੀ ਦਾਣੇਦਾਰ ਬਣਤਰ, ਕੇਂਚੂਏ, ਜੈਵਿਕ ਮਾਦਾ ਅਤੇ pH ਮੁੱਲ ਸੰਤੁਲਨ',
    file: '/previews/page_04.jpg',
  },
  {
    page: 13,
    title: 'ਪੰਨਾ 13 — ਮਿੱਟੀ ਦੀ ਸਿਹਤ ਸੁਧਾਰਨ ਦੇ ਤਰੀਕੇ',
    desc: 'ਜੈਵਿਕ ਖਾਦ, ਹਰੀ ਖਾਦ (ਸਣ/ਢੈਂਚਾ), ਫਸਲ ਚੱਕਰ, ਪਰਾਲੀ ਸੰਭਾਲ ਅਤੇ NPK',
    file: '/previews/page_13.jpg',
  },
  {
    page: 14,
    title: 'ਪੰਨਾ 14 — ਮਿੱਟੀ ਦੀ ਉਪਜਾਊਤਾ ਕਿਵੇਂ ਬਣਾਈ ਰੱਖੀਏ',
    desc: 'ਕੰਪੋਸਟ, ਵਰਮੀ ਕੰਪੋਸਟ, ਜੈਵ ਖਾਦ ਅਤੇ ਫਸਲੀ ਰਹਿੰਦ-ਖੂੰਹਦ ਦੀ ਵਿਗਿਆਨਕ ਵਰਤੋਂ',
    file: '/previews/page_14.jpg',
  },
  {
    page: 15,
    title: 'ਪੰਨਾ 15 — ਮਿੱਟੀ ਦੀ ਸਿਹਤ ਅਤੇ ਲੈਬ ਜਾਂਚ',
    desc: 'ਖੇਤ ਵਿੱਚੋਂ ਨਮੂਨਾ ਲੈਣ ਦਾ ਸਹੀ ਤਰੀਕਾ, ਲੈਬ ਰਿਪੋਰਟ ਅਤੇ ਖਾਦਾਂ ਦੀ ਸਿਫ਼ਾਰਸ਼',
    file: '/previews/page_15.jpg',
  },
  {
    page: 18,
    title: 'ਪੰਨਾ 18 — ਝੋਨਾ: ਨਰਸਰੀ, ਪਨੀਰੀ ਅਤੇ DSR',
    desc: 'ਪਨੀਰੀ ਦੀ ਤਿਆਰੀ, ਕੱਦੂ ਕਰਕੇ ਲਵਾਈ ਅਤੇ ਸਿੱਧੀ ਬਿਜਾਈ (DSR) ਪਾਣੀ ਬਚਤ',
    file: '/previews/page_18.jpg',
  },
  {
    page: 24,
    title: 'ਪੰਨਾ 24 — ਮੱਕੀ: ਪੋਸ਼ਣ ਅਤੇ ਸਿੰਚਾਈ',
    desc: 'ਵੱਟਾਂ ਉੱਪਰ ਬਿਜਾਈ, ਗੋਡੇ-ਗੋਡੇ ਮੱਕੀ ਦੀ ਖੁਰਾਕ ਅਤੇ ਛੱਲੀ ਬਣਨ ਵੇਲੇ ਪਾਣੀ',
    file: '/previews/page_24.jpg',
  },
  {
    page: 30,
    title: 'ਪੰਨਾ 30 — ਕਪਾਹ: ਕਰੋ ਅਤੇ ਨਾ ਕਰੋ',
    desc: 'ਗੁਲਾਬੀ ਸੁੰਡੀ ਅਤੇ ਚਿੱਟੀ ਮੱਖੀ ਦੀ ਰੋਕਥਾਮ, ਸਹੀ ਤੁੜਾਈ ਅਤੇ ਸਪਰੇਅ ਨਿਯਮ',
    file: '/previews/page_30.jpg',
  },
];

export default function BookPreviewCarousel({ onBuyClick }: BookPreviewProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevPage = () => {
    setCurrentIndex((prev) => (prev === 0 ? PREVIEW_PAGES.length - 1 : prev - 1));
  };

  const nextPage = () => {
    setCurrentIndex((prev) => (prev === PREVIEW_PAGES.length - 1 ? 0 : prev + 1));
  };

  const current = PREVIEW_PAGES[currentIndex];

  return (
    <section id="preview" className="py-16 sm:py-20 bg-stone-100 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 bg-amber-100 border border-amber-300 text-amber-900 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
            <Eye className="w-3.5 h-3.5 text-amber-700" />
            <span>ਖਰੀਦਣ ਤੋਂ ਪਹਿਲਾਂ ਕਿਤਾਬ ਦੇ ਅੰਦਰ ਝਾਤ ਮਾਰੋ</span>
          </div>
          <h2 className="font-gurmukhi font-black text-2xl sm:text-3xl md:text-4xl text-farm-950 mb-3">
            ਅਸਲ ਰੰਗਦਾਰ ਵਿਜ਼ੂਅਲ ਪੰਨਿਆਂ ਦੀ ਝਲਕ
          </h2>
          <p className="font-gurmukhi text-stone-600 text-sm sm:text-base leading-relaxed">
            ਕਿਤਾਬ ਦਾ ਹਰ ਇੱਕ ਪੰਨਾ ਵਿਗਿਆਨਕ ਚਿੱਤਰਾਂ, ਇਨਫੋਗ੍ਰਾਫਿਕਸ, ਕਰੋ / ਨਾ ਕਰੋ ਸੁਝਾਵਾਂ ਅਤੇ ਸੌਖੀ ਪੰਜਾਬੀ ਬੋਲੀ ਨਾਲ ਤਿਆਰ ਕੀਤਾ ਗਿਆ ਹੈ। ਹੇਠਾਂ ਦਿੱਤੇ ਨਮੂਨੇ ਵੇਖੋ:
          </p>
        </div>

        {/* Interactive Viewer Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white rounded-3xl p-5 sm:p-8 shadow-xl border border-stone-200">
          
          {/* Left: Big Preview Image Canvas */}
          <div className="lg:col-span-7 flex flex-col items-center">
            <div className="relative w-full max-w-[460px] aspect-[1/1.414] rounded-2xl overflow-hidden shadow-2xl border-4 border-stone-100 bg-stone-200">
              <Image
                src={current.file}
                alt={current.title}
                fill
                className="object-contain"
                priority
              />

              {/* Prev / Next Floating Arrows */}
              <button
                onClick={prevPage}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center backdrop-blur-sm transition-transform active:scale-90"
                aria-label="Previous page"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <button
                onClick={nextPage}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center backdrop-blur-sm transition-transform active:scale-90"
                aria-label="Next page"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Page Number Badge */}
              <div className="absolute top-3 left-3 bg-farm-800 text-white font-black text-xs px-3 py-1 rounded-full shadow">
                ਪੰਨਾ {current.page}
              </div>
            </div>

            <div className="text-xs text-stone-500 font-semibold mt-3">
              Page {currentIndex + 1} of {PREVIEW_PAGES.length} Preview Samples
            </div>
          </div>

          {/* Right: Page Description & Thumbnail Selector */}
          <div className="lg:col-span-5 flex flex-col justify-between h-full">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-2.5 py-1 rounded border border-amber-200">
                ਚੁਣਿਆ ਹੋਇਆ ਪੰਨਾ
              </span>
              <h3 className="font-gurmukhi font-black text-xl sm:text-2xl text-stone-900 mt-2 mb-2">
                {current.title}
              </h3>
              <p className="font-gurmukhi text-stone-700 text-sm leading-relaxed mb-6">
                {current.desc}
              </p>

              {/* Quality Highlights */}
              <div className="space-y-2.5 bg-stone-50 border border-stone-200 rounded-xl p-4 mb-6">
                <div className="flex items-center gap-2 text-xs font-semibold text-stone-800 font-gurmukhi">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>3D ਵਿਜ਼ੂਅਲ ਚਿੱਤਰਾਂ ਨਾਲ ਹਰ ਕਦਮ ਸਪਸ਼ਟ ਸਮਝਾਇਆ ਗਿਆ</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-stone-800 font-gurmukhi">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>'ਕਰੋ' ਅਤੇ 'ਨਾ ਕਰੋ' ਦੇ ਵਿਸ਼ੇਸ਼ ਬਾਕਸ ਨਾਲ ਗਲਤੀਆਂ ਤੋਂ ਬਚਾਅ</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-stone-800 font-gurmukhi">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>ਹਰ ਪੰਨੇ ਦੇ ਹੇਠਾਂ ਵਿਸ਼ੇਸ਼ 'ਯਾਦ ਰੱਖੋ' ਨੁਕਤਾ</span>
                </div>
              </div>

              {/* Thumbnail Strip */}
              <div className="mb-6">
                <div className="text-xs font-bold text-stone-600 mb-2 font-gurmukhi">
                  ਹੋਰ ਨਮੂਨੇ ਚੁਣੋ (Click to View):
                </div>
                <div className="grid grid-cols-5 gap-2">
                  {PREVIEW_PAGES.slice(0, 5).map((p, idx) => (
                    <button
                      key={p.page}
                      onClick={() => setCurrentIndex(idx)}
                      className={`relative aspect-[1/1.4] rounded-lg overflow-hidden border-2 transition-all ${
                        currentIndex === idx
                          ? 'border-farm-600 ring-2 ring-farm-600/30 scale-105'
                          : 'border-stone-200 opacity-60 hover:opacity-100'
                      }`}
                    >
                      <Image src={p.file} alt={p.title} fill className="object-cover" />
                      <div className="absolute inset-0 bg-black/20 flex items-center justify-center text-[10px] text-white font-bold">
                        P{p.page}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* CTA inside Preview */}
            <div className="pt-4 border-t border-stone-200">
              <button
                onClick={onBuyClick}
                className="w-full flex items-center justify-center gap-2 bg-farm-700 hover:bg-farm-800 text-white font-gurmukhi font-black text-sm py-3 px-5 rounded-xl shadow-md transition-all active:scale-[0.99]"
              >
                <Download className="w-4 h-4 text-amber-300" />
                <span>ਸਾਰੇ 40 ਪੰਨੇ ਅਨਲਾਕ ਕਰੋ — ਸਿਰਫ਼ ₹199</span>
              </button>
              <div className="text-[11px] text-stone-500 text-center mt-2 font-gurmukhi">
                ਤੁਰੰਤ PDF ਡਾਊਨਲੋਡ • ਕੋਈ ਉਡੀਕ ਨਹੀਂ • ਲਾਈਫਟਾਈਮ ਵਰਤੋਂ
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

