'use client';

import React from 'react';
import { 
  Sprout, 
  FlaskConical, 
  Droplets, 
  Wheat, 
  Layers, 
  ShieldAlert, 
  Apple, 
  Check
} from 'lucide-react';

const MODULES = [
  {
    icon: FlaskConical,
    title: "ਭਾਗ 1: ਮਿੱਟੀ ਦੀ ਸਿਹਤ ਅਤੇ ਲੈਬ ਜਾਂਚ (Soil Science)",
    pages: "ਪੰਨਾ 1 – 5",
    topics: [
      "ਚੰਗੀ ਅਤੇ ਉਪਜਾਊ ਮਿੱਟੀ ਦੀਆਂ 6 ਮੁੱਖ ਨਿਸ਼ਾਨੀਆਂ",
      "ਮਿੱਟੀ ਵਿੱਚ ਜੈਵਿਕ ਮਾਦਾ (Organic Matter) ਵਧਾਉਣ ਦੇ ਤਰੀਕੇ",
      "ਖੇਤ ਵਿੱਚੋਂ ਸਹੀ ਢੰਗ ਨਾਲ ਮਿੱਟੀ ਦਾ ਨਮੂਨਾ ਕਿਵੇਂ ਲੈਣਾ ਹੈ",
      "ਲੈਬ ਰਿਪੋਰਟ ਅਤੇ pH ਮੁੱਲ (6.5 – 7.5) ਦੀ ਸਹੀ ਪੜ੍ਹਤ"
    ]
  },
  {
    icon: Layers,
    title: "ਭਾਗ 2: N-P-K ਖੁਰਾਕ ਅਤੇ 4R ਖਾਦ ਸਿਧਾਂਤ",
    pages: "ਪੰਨਾ 6 – 7",
    topics: [
      "ਨਾਈਟ੍ਰੋਜਨ (N), ਫਾਸਫੋਰਸ (P) ਅਤੇ ਪੋਟਾਸ਼ (K) ਦਾ ਸਹੀ ਸੰਤੁਲਨ",
      "ਜਿੰਕ, ਲੋਹਾ ਅਤੇ ਗੰਧਕ (ਸੁੱਖਮ ਤੱਤਾਂ) ਦੀ ਘਾਟ ਦੇ ਲੱਛਣ",
      "4R ਸਿਧਾਂਤ: ਸਹੀ ਖਾਦ, ਸਹੀ ਮਾਤਰਾ, ਸਹੀ ਸਮਾਂ ਅਤੇ ਸਹੀ ਥਾਂ",
      "ਬੇਲੋੜੀ ਯੂਰੀਆ ਦੀ ਵਰਤੋਂ ਰੋਕ ਕੇ ਪੈਸੇ ਦੀ ਵੱਡੀ ਬਚਤ"
    ]
  },
  {
    icon: Droplets,
    title: "ਭਾਗ 3: ਸਮਾਰਟ ਸਿੰਚਾਈ ਅਤੇ ਬੀਜ ਚੋਣ",
    pages: "ਪੰਨਾ 8 – 10",
    topics: [
      "ਘੱਟ ਪਾਣੀ ਵਿੱਚ ਫਸਲ ਦਾ ਵੱਧ ਝਾੜ ਲੈਣ ਦੀਆਂ ਤਕਨੀਕਾਂ",
      "ਤਸਦੀਕਸ਼ੁਦਾ ਬੀਜ ਦੀ ਪਰਖ ਅਤੇ ਜਰਮੀਨੇਸ਼ਨ ਟੈਸਟ",
      "ਬੀਜ ਦੀ ਸੋਧ (Seed Treatment) ਉੱਲੀਨਾਸ਼ਕ ਦਵਾਈਆਂ ਨਾਲ",
      "ਫਸਲ ਚੱਕਰ (Crop Rotation) ਰਾਹੀਂ ਮਿੱਟੀ ਦੀ ਉਪਜਾਊਤਾ ਬਚਾਉਣਾ"
    ]
  },
  {
    icon: Wheat,
    title: "ਭਾਗ 4: ਕਣਕ ਦੀ ਸੰਪੂਰਨ ਵਿਗਿਆਨਕ ਖੇਤੀ",
    pages: "ਪੰਨਾ 11 – 16",
    topics: [
      "ਸੁਪਰ ਸੀਡਰ ਅਤੇ ਹੈਪੀ ਸੀਡਰ ਨਾਲ ਬਿਜਾਈ ਦੇ ਨਿਯਮ",
      "ਕਣਕ ਵਿੱਚ ਯੂਰੀਆ ਪਾਉਣ ਦੇ 3 ਅਹਿਮ ਪੜਾਅ",
      "ਕਰਾਊਨ ਰੂਟ (CRI) ਅਤੇ ਗੁੱਲੀ-ਡੰਡੇ (ਨਦੀਨ) ਦੀ ਸਹੀ ਰੋਕਥਾਮ",
      "ਪੀਲੀ ਕੁੰਗੀ (Yellow Rust) ਦੀ ਸ਼ੁਰੂਆਤੀ ਪਛਾਣ ਅਤੇ ਕਟਾਈ ਚੈੱਕਲਿਸਟ"
    ]
  },
  {
    icon: Sprout,
    title: "ਭਾਗ 5: ਝੋਨਾ, ਬਾਸਮਤੀ ਅਤੇ ਸਿੱਧੀ ਬਿਜਾਈ (DSR)",
    pages: "ਪੰਨਾ 17 – 22",
    topics: [
      "ਘੱਟ ਸਮੇਂ ਵਾਲੀਆਂ ਕਿਸਮਾਂ (PR ਸੀਰੀਜ਼) ਦੀ ਚੋਣ",
      "ਸਿਹਤਮੰਦ ਪਨੀਰੀ ਤਿਆਰ ਕਰਨਾ ਅਤੇ ਕੱਦੂ ਕਰਕੇ ਲਵਾਈ",
      "ਤਰ-ਵੱਤਰ DSR ਸਿੱਧੀ ਬਿਜਾਈ ਨਾਲ 35% ਪਾਣੀ ਦੀ ਬਚਤ",
      "ਖਹਿਰਾ ਰੋਗ, ਤਣਾ ਛੇਦਕ ਅਤੇ ਸ਼ੀਥ ਬਲਾਈਟ ਦੀ ਪਛਾਣ"
    ]
  },
  {
    icon: Layers,
    title: "ਭਾਗ 6: ਨਕਦੀ ਫਸਲਾਂ: ਮੱਕੀ, ਕਪਾਹ, ਆਲੂ ਅਤੇ ਗੰਨਾ",
    pages: "ਪੰਨਾ 23 – 36",
    topics: [
      "ਮੱਕੀ ਦੀ ਵੱਟਾਂ ਉੱਤੇ ਬਿਜਾਈ ਅਤੇ ਫਾਲ ਆਰਮੀਵਰਮ ਦੀ ਰੋਕਥਾਮ",
      "ਕਪਾਹ ਵਿੱਚ ਚਿੱਟੀ ਮੱਖੀ ਅਤੇ ਗੁਲਾਬੀ ਸੁੰਡੀ ਸਕਾਊਟਿੰਗ",
      "ਆਲੂਆਂ ਵਿੱਚ ਮਿੱਟੀ ਚੜ੍ਹਾਉਣਾ (Earthing-up) ਅਤੇ ਪਿਛੇਤਾ ਝੁਲਸਾ ਰੋਗ",
      "ਗੰਨੇ ਦੀ ਖਾਈ ਵਿਧੀ (Trench Sowing) ਅਤੇ ਪਰਾਲੀ ਮਲਚਿੰਗ"
    ]
  },
  {
    icon: Apple,
    title: "ਭਾਗ 7: ਤੇਲ ਬੀਜ, ਦਾਲਾਂ, ਹਰਾ ਚਾਰਾ ਅਤੇ ਸਬਜ਼ੀਆਂ",
    pages: "ਪੰਨਾ 37 – 45",
    topics: [
      "ਸਰੋਂ/ਰਾਇਆ ਵਿੱਚ ਚੇਪਾ (Aphid) ਰੋਕਥਾਮ ਅਤੇ ਤੇਲ ਦੀ ਮਾਤਰਾ",
      "ਮੂੰਗੀ ਅਤੇ ਛੋਲਿਆਂ ਦੀਆਂ ਜੜ੍ਹਾਂ ਵਿੱਚ ਰਾਈਜ਼ੋਬੀਅਮ ਗੰਢਾਂ",
      "ਬਰਸੀਮ ਦੀਆਂ ਲਗਾਤਾਰ ਵੱਧ ਕਟਾਈਆਂ ਲੈਣ ਦਾ ਰਾਜ਼",
      "ਟਮਾਟਰ, ਮਿਰਚ, ਪਿਆਜ਼ ਅਤੇ ਕਿੰਨੂ ਦੇ ਬਾਗਾਂ ਦੀ ਦੇਖਭਾਲ"
    ]
  },
  {
    icon: ShieldAlert,
    title: "ਭਾਗ 8: ਕੀੜੇ ਰੋਕਥਾਮ (IPM), ਸਪਰੇਅ ਸੁਰੱਖਿਆ ਤੇ ਮੰਡੀ",
    pages: "ਪੰਨਾ 46 – 40",
    topics: [
      "ਪੱਤਿਆਂ ਦੇ ਰੰਗ ਤੋਂ ਖੁਰਾਕ ਦੀ ਘਾਟ ਪਛਾਣਨ ਦਾ ਚਾਰਟ",
      "ਪੀਲੇ ਚਿਪਕਵੇਂ ਟਰੈਪ (Yellow Traps) ਅਤੇ ਮਿੱਤਰ ਕੀੜਿਆਂ ਦੀ ਸੰਭਾਲ",
      "ਸਪਰੇਅ ਕਰਦੇ ਸਮੇਂ ਮਾਸਕ, ਦਸਤਾਨੇ ਅਤੇ ਸੁਰੱਖਿਆ ਕਿੱਟ (PPE)",
      "ਦਾਣਿਆਂ ਵਿੱਚ ਨਮੀ ਮਾਪਣਾ, ਗੁਦਾਮ ਸਟੋਰੇਜ ਅਤੇ ਮੰਡੀ ਵਿੱਚ ਵੇਚਣਾ"
    ]
  }
];

export default function ChapterBreakdown() {
  return (
    <section id="chapters" className="py-16 sm:py-24 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 bg-farm-100 border border-farm-300 text-farm-900 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
            <span>ਸੰਪੂਰਨ ਵਿਸ਼ਾ ਸੂਚੀ</span>
          </div>
          <h2 className="font-gurmukhi font-black text-2xl sm:text-3xl md:text-4xl text-farm-950 mb-4">
            ਕਿਤਾਬ ਦੇ 40 ਪੰਨਿਆਂ ਵਿੱਚ ਕੀ-ਕੀ ਸ਼ਾਮਲ ਹੈ?
          </h2>
          <p className="font-gurmukhi text-stone-600 text-sm sm:text-base leading-relaxed">
            ਕਿਸਾਨਾਂ ਦੀਆਂ ਰੋਜ਼ਾਨਾ ਲੋੜਾਂ ਨੂੰ ਧਿਆਨ ਵਿੱਚ ਰੱਖ ਕੇ 8 ਮੁੱਖ ਭਾਗਾਂ ਵਿੱਚ ਸਾਰੀ ਖੇਤੀ ਜਾਣਕਾਰੀ ਵੰਡੀ ਗਈ ਹੈ:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {MODULES.map((mod, idx) => {
            const Icon = mod.icon;
            return (
              <div 
                key={idx}
                className="bg-stone-50/80 hover:bg-white border border-stone-200 hover:border-farm-400 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-farm-100 text-farm-800 flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-black text-amber-800 bg-amber-100 border border-amber-200 px-2 py-0.5 rounded-full font-gurmukhi">
                      {mod.pages}
                    </span>
                  </div>

                  <h3 className="font-gurmukhi font-black text-base text-stone-900 mb-3 leading-snug">
                    {mod.title}
                  </h3>

                  <ul className="space-y-2 mb-4">
                    {mod.topics.map((t, tIdx) => (
                      <li key={tIdx} className="flex items-start gap-2 text-xs text-stone-700 font-gurmukhi leading-relaxed">
                        <Check className="w-3.5 h-3.5 text-farm-700 flex-shrink-0 mt-0.5" />
                        <span>{t}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-3 border-t border-stone-200/60 text-[11px] font-bold text-farm-800 font-gurmukhi">
                  ✓ 100% ਪ੍ਰੈਕਟੀਕਲ ਜਾਣਕਾਰੀ
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
