'use client';

import React, { useState } from 'react';
import { XCircle, CheckCircle, Calculator } from 'lucide-react';

export default function ValueComparison({ onBuyClick }: { onBuyClick: () => void }) {
  const [acres, setAcres] = useState(10);
  const estimatedSavings = acres * 8000;

  return (
    <section id="benefits" className="py-16 sm:py-24 bg-gradient-to-b from-stone-50 via-stone-100 to-stone-50 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 bg-farm-100 border border-farm-300 text-farm-900 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
            <span>ਅੰਦਾਜ਼ਾ ਬਨਾਮ ਵਿਗਿਆਨ</span>
          </div>
          <h2 className="font-gurmukhi font-black text-2xl sm:text-3xl md:text-4xl text-farm-950 mb-3">
            ਅੰਦਾਜ਼ੇ ਵਾਲੀ ਖੇਤੀ ਬਨਾਮ ਵਿਗਿਆਨਕ ਕਿਸਾਨ ਗਾਈਡ
          </h2>
          <p className="font-gurmukhi text-stone-600 text-sm sm:text-base leading-relaxed">
            ਵੇਖੋ ਕਿ ਕਿਵੇਂ ਸਿਰਫ਼ ਸਹੀ ਜਾਣਕਾਰੀ ਨਾਲ ਤੁਸੀਂ ਆਪਣੇ ਹਰ ਏਕੜ ਦੀ ਬੱਚਤ ਅਤੇ ਝਾੜ ਵਿੱਚ ਵੱਡਾ ਫ਼ਰਕ ਪਾ ਸਕਦੇ ਹੋ:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-16">
          
          <div className="bg-white border-2 border-red-200 rounded-3xl p-6 sm:p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-red-100">
              <div className="w-10 h-10 rounded-full bg-red-100 text-red-600 flex items-center justify-center font-bold text-lg">
                ✕
              </div>
              <div>
                <h3 className="font-gurmukhi font-black text-lg text-red-950">
                  ਪੁਰਾਣਾ ਅੰਦਾਜ਼ੇ ਵਾਲਾ ਤਰੀਕਾ
                </h3>
                <p className="text-xs text-red-700 font-semibold font-gurmukhi">
                  (ਵੱਧ ਖਰਚਾ • ਘੱਟ ਮੁਨਾਫ਼ਾ • ਮਿੱਟੀ ਖਰਾਬ)
                </p>
              </div>
            </div>

            <ul className="space-y-4">
              {[
                { label: "ਮਿੱਟੀ ਦੀ ਪਰਖ:", desc: "ਬਿਨਾਂ ਜਾਂਚ ਕੀਤੇ ਦੁਕਾਨਦਾਰ ਦੇ ਕਹਿਣ ਉੱਤੇ ਧੜਾ-ਧੜ ਖਾਦਾਂ ਪਾਉਣਾ" },
                { label: "ਖਾਦ ਦਾ ਖਰਚਾ:", desc: "ਲੋੜ ਤੋਂ ਵੱਧ ਯੂਰੀਆ ਪਾ ਕੇ ਬਿਮਾਰੀਆਂ ਅਤੇ ਕੀੜਿਆਂ ਨੂੰ ਸੱਦਾ ਦੇਣਾ" },
                { label: "ਸਪਰੇਆਂ ਦੀ ਵਰਤੋਂ:", desc: "ਸਮੱਸਿਆ ਦੀ ਪਛਾਣ ਕੀਤੇ ਬਿਨਾਂ ਮਹਿੰਗੀਆਂ ਜ਼ਹਿਰਾਂ ਦਾ ਬੇਲੋੜਾ ਛਿੜਕਾਅ" },
                { label: "ਪਾਣੀ ਦੀ ਵਰਤੋਂ:", desc: "ਹਰ ਵੇਲੇ ਖੇਤ ਵਿੱਚ ਪਾਣੀ ਭਰ ਕੇ ਰੱਖਣਾ, ਜਿਸ ਨਾਲ ਜੜ੍ਹਾਂ ਗਲਦੀਆਂ ਹਨ" },
                { label: "ਕੁੱਲ ਨਤੀਜਾ:", desc: "ਖਰਚਾ ਅਸਮਾਨੀ, ਪਰ ਫਸਲ ਦਾ ਝਾੜ ਔਸਤ ਜਾਂ ਘੱਟ" }
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <div className="text-xs sm:text-sm text-stone-700 font-gurmukhi leading-relaxed">
                    <strong className="text-red-900">{item.label}</strong> {item.desc}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white border-2 border-emerald-300 rounded-3xl p-6 sm:p-8 shadow-md relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-emerald-600 text-white text-[10px] font-black uppercase px-4 py-1 rounded-bl-xl font-gurmukhi">
              ਸਿਫ਼ਾਰਸ਼ੀ ਤਰੀਕਾ
            </div>

            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-emerald-100">
              <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-lg">
                ✓
              </div>
              <div>
                <h3 className="font-gurmukhi font-black text-lg text-emerald-950">
                  ਕਿਸਾਨ ਦੀ ਫਸਲ ਗਾਈਡ ਤਰੀਕਾ
                </h3>
                <p className="text-xs text-emerald-700 font-semibold font-gurmukhi">
                  (ਵੱਧ ਝਾੜ • 40% ਘੱਟ ਖਰਚਾ • ਉਪਜਾਊ ਮਿੱਟੀ)
                </p>
              </div>
            </div>

            <ul className="space-y-4">
              {[
                { label: "ਮਿੱਟੀ ਦੀ ਪਰਖ:", desc: "ਲੈਬ ਜਾਂਚ ਅਨੁਸਾਰ ਸਿਰਫ਼ ਓਹੀ ਖਾਦ ਪਾਉਣੀ ਜਿਸਦੀ ਮਿੱਟੀ ਨੂੰ ਲੋੜ ਹੈ" },
                { label: "ਖਾਦ ਦਾ ਖਰਚਾ:", desc: "4R ਸਿਧਾਂਤ ਅਤੇ ਸਪਲਿਟ ਖੁਰਾਕ ਨਾਲ 30% ਤੱਕ ਖਾਦ ਦੇ ਪੈਸੇ ਦੀ ਬੱਚਤ" },
                { label: "ਸਪਰੇਆਂ ਦੀ ਵਰਤੋਂ:", desc: "ਤਸਵੀਰਾਂ ਵੇਖ ਕੇ ਸਹੀ ਬਿਮਾਰੀ/ਕੀੜੇ ਦੀ ਪਛਾਣ ਕਰਕੇ ਹੀ ਸਹੀ ਦਵਾਈ ਪਾਉਣੀ" },
                { label: "ਪਾਣੀ ਦੀ ਵਰਤੋਂ:", desc: "ਤਰ-ਵੱਤਰ ਅਤੇ ਸਹੀ ਸਟੇਜ ਉੱਤੇ ਪਾਣੀ ਦੇ ਕੇ ਪਾਣੀ ਅਤੇ ਬਿਜਲੀ ਦੋਵਾਂ ਦੀ ਬੱਚਤ" },
                { label: "ਕੁੱਲ ਨਤੀਜਾ:", desc: "ਸਿਹਤਮੰਦ ਫਸਲ, ਭਾਰੇ ਦਾਣੇ ਅਤੇ ਹਰ ਏਕੜ ਉੱਤੇ ਵੱਡਾ ਮੁਨਾਫ਼ਾ" }
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <div className="text-xs sm:text-sm text-stone-700 font-gurmukhi leading-relaxed">
                    <strong className="text-emerald-950">{item.label}</strong> {item.desc}
                  </div>
                </li>
              ))}
            </ul>
          </div>

        </div>

        <div className="max-w-4xl mx-auto bg-gradient-to-r from-farm-900 via-farm-800 to-farm-900 text-white rounded-3xl p-6 sm:p-10 shadow-xl border border-farm-700">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 bg-amber-400 text-amber-950 text-xs font-black px-3 py-1 rounded-full uppercase mb-3">
                <Calculator className="w-3.5 h-3.5" />
                <span>ਆਪਣੀ ਬੱਚਤ ਦਾ ਅੰਦਾਜ਼ਾ ਲਗਾਓ</span>
              </div>
              <h3 className="font-gurmukhi font-black text-2xl sm:text-3xl mb-2">
                ਤੁਹਾਡੀ ਖੇਤੀ ਵਿੱਚ ਸੰਭਾਵਿਤ ਬੱਚਤ
              </h3>
              <p className="font-gurmukhi text-stone-300 text-sm leading-relaxed mb-5">
                ਸਹੀ ਖਾਦ, ਸਪਰੇਅ ਬਚਤ ਅਤੇ ਝਾੜ ਵਾਧੇ ਨਾਲ ਪ੍ਰਤੀ ਏਕੜ ਔਸਤਨ ₹8,000 ਦੀ ਬੱਚਤ ਹੁੰਦੀ ਹੈ।
              </p>

              <div className="space-y-2">
                <div className="flex justify-between text-xs font-semibold font-gurmukhi text-amber-200">
                  <span>ਤੁਹਾਡੀ ਜ਼ਮੀਨ: <strong className="text-white text-sm">{acres} ਏਕੜ</strong></span>
                  <span>(1 ਤੋਂ 50 ਏਕੜ)</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="50"
                  value={acres}
                  onChange={(e) => setAcres(Number(e.target.value))}
                  className="w-full accent-amber-400 cursor-pointer h-2 bg-farm-950 rounded-lg"
                />
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 text-center flex-shrink-0 min-w-[260px]">
              <div className="text-xs text-amber-300 font-bold uppercase tracking-wider mb-1">
                ਸਾਲਾਨਾ ਸੰਭਾਵਿਤ ਮੁਨਾਫ਼ਾ / ਬੱਚਤ
              </div>
              <div className="text-4xl sm:text-5xl font-black text-amber-300 mb-2">
                ₹{estimatedSavings.toLocaleString('en-IN')}
              </div>
              <div className="text-[11px] text-stone-300 font-gurmukhi mb-4">
                (ਸਿਰਫ਼ ₹25 ਦੀ ਕਿਤਾਬ ਤੁਹਾਡੇ ਹਜ਼ਾਰਾਂ ਰੁਪਏ ਬਚਾ ਸਕਦੀ ਹੈ)
              </div>
              <button
                onClick={onBuyClick}
                className="w-full bg-amber-400 hover:bg-amber-300 text-amber-950 font-gurmukhi font-black text-sm py-2.5 px-4 rounded-xl shadow transition-all active:scale-95"
              >
                ਹੁਣੇ ਕਿਤਾਬ ਪ੍ਰਾਪਤ ਕਰੋ (₹25)
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
