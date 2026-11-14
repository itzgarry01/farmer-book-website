'use client';

import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

const FAQS = [
  {
    q: "ਮੈਨੂੰ ਇਹ ਕਿਤਾਬ ਕਿਵੇਂ ਅਤੇ ਕਦੋਂ ਮਿਲੇਗੀ?",
    a: "ਜਿਵੇਂ ਹੀ ਤੁਸੀਂ ₹25 ਦਾ ਭੁਗਤਾਨ (Payment) ਪੂਰਾ ਕਰੋਗੇ, ਉਸੇ ਵੇਲੇ ਸਕ੍ਰੀਨ ਉੱਪਰ ਡਾਇਰੈਕਟ ਡਾਊਨਲੋਡ ਬਟਨ ਆ ਜਾਵੇਗਾ। ਇਸ ਤੋਂ ਇਲਾਵਾ ਤੁਹਾਡੇ ਦਿੱਤੇ ਹੋਏ ਮੋਬਾਈਲ ਨੰਬਰ (WhatsApp) ਅਤੇ ਈਮੇਲ ਉੱਪਰ ਵੀ ਡਾਊਨਲੋਡ ਲਿੰਕ ਤੁਰੰਤ ਭੇਜਿਆ ਜਾਵੇਗਾ।"
  },
  {
    q: "ਕੀ ਮੈਂ ਇਸ ਕਿਤਾਬ ਨੂੰ ਆਪਣੇ ਮੋਬਾਈਲ ਵਿੱਚ ਪੜ੍ਹ ਸਕਦਾ ਹਾਂ?",
    a: "ਹਾਂਜੀ, ਬਿਲਕੁਲ! ਇਹ ਕਿਤਾਬ ਹਾਈ-ਡੈਫੀਨੇਸ਼ਨ (HD) PDF ਫਾਰਮੈਟ ਵਿੱਚ ਹੈ। ਤੁਸੀਂ ਇਸਨੂੰ ਕਿਸੇ ਵੀ ਐਂਡਰਾਇਡ ਮੋਬਾਈਲ, ਆਈਫੋਨ, ਟੈਬਲੇਟ ਜਾਂ ਕੰਪਿਊਟਰ ਉੱਪਰ ਬਹੁਤ ਆਸਾਨੀ ਨਾਲ ਅਤੇ ਸਾਫ਼-ਸਾਫ਼ ਜ਼ੂਮ ਕਰਕੇ ਪੜ੍ਹ ਸਕਦੇ ਹੋ।"
  },
  {
    q: "ਕੀ ਮੈਂ ਇਸ ਕਿਤਾਬ ਦਾ ਪ੍ਰਿੰਟ (ਕਾਪੀ) ਕੱਢ ਸਕਦਾ ਹਾਂ?",
    a: "ਹਾਂਜੀ! ਇਹ ਕਿਤਾਬ ਸਟੈਂਡਰਡ A4 ਸਾਈਜ਼ ਵਿੱਚ ਪ੍ਰਿੰਟ-ਰੈਡੀ ਤਿਆਰ ਕੀਤੀ ਗਈ ਹੈ। ਤੁਸੀਂ ਕਿਸੇ ਵੀ ਫੋਟੋਸਟੇਟ ਜਾਂ ਕਲਰ ਪ੍ਰਿੰਟਰ ਵਾਲੀ ਦੁਕਾਨ ਤੋਂ ਇਸਦੀ ਸੋਹਣੀ ਕਲਰ ਕਾਪੀ ਜਾਂ ਬੁੱਕਲੈੱਟ ਤਿਆਰ ਕਰਵਾ ਸਕਦੇ ਹੋ।"
  },
  {
    q: "ਭੁਗਤਾਨ (Payment) ਕਿਵੇਂ ਕਰਨਾ ਹੈ?",
    a: "ਤੁਸੀਂ Google Pay, PhonePe, Paytm, BHIM UPI ਜਾਂ ਕਿਸੇ ਵੀ ਬੈਂਕ ਦੇ ਡੈਬਿਟ/ਕ੍ਰੈਡਿਟ ਕਾਰਡ ਰਾਹੀਂ 100% ਸੁਰੱਖਿਅਤ ਢੰਗ ਨਾਲ ਭੁਗਤਾਨ ਕਰ ਸਕਦੇ ਹੋ।"
  },
  {
    q: "ਕੀ ਮੈਨੂੰ ਹਰ ਸਾਲ ਨਵੇਂ ਪੈਸੇ ਦੇਣੇ ਪੈਣਗੇ?",
    a: "ਨਹੀਂ, ਬਿਲਕੁਲ ਨਹੀਂ! ਇਹ ਇੱਕ ਵਾਰ ਦੀ ਖਰੀਦ (One-time payment) ਹੈ। ਕਿਤਾਬ ਦੀ PDF ਤੁਹਾਡੇ ਕੋਲ ਲਾਈਫਟਾਈਮ ਹਮੇਸ਼ਾ ਲਈ ਸੁਰੱਖਿਅਤ ਰਹੇਗੀ।"
  },
  {
    q: "ਜੇਕਰ ਮੈਨੂੰ ਡਾਊਨਲੋਡ ਕਰਨ ਵਿੱਚ ਕੋਈ ਮੁਸ਼ਕਲ ਆਵੇ ਤਾਂ ਮੈਂ ਕੀ ਕਰਾਂ?",
    a: "ਤੁਹਾਨੂੰ ਚਿੰਤਾ ਕਰਨ ਦੀ ਕੋਈ ਲੋੜ ਨਹੀਂ ਹੈ। ਸਾਡੀ ਕਿਸਾਨ ਹੈਲਪਲਾਈਨ ਟੀਮ ਵਟਸਐਪ ਉੱਤੇ ਉਪਲਬਧ ਹੈ। ਤੁਹਾਨੂੰ ਤੁਰੰਤ ਵਟਸਐਪ ਉੱਤੇ PDF ਫਾਈਲ ਭੇਜ ਦਿੱਤੀ ਜਾਵੇਗੀ।"
  }
];

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-16 sm:py-24 bg-stone-50 border-b border-stone-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-1.5 bg-farm-100 border border-farm-300 text-farm-900 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
            <HelpCircle className="w-3.5 h-3.5 text-farm-700" />
            <span>ਤੁਹਾਡੇ ਸਵਾਲਾਂ ਦੇ ਜਵਾਬ</span>
          </div>
          <h2 className="font-gurmukhi font-black text-2xl sm:text-3xl md:text-4xl text-farm-950 mb-3">
            ਅਕਸਰ ਪੁੱਛੇ ਜਾਣ ਵਾਲੇ ਸਵਾਲ (FAQ)
          </h2>
          <p className="font-gurmukhi text-stone-600 text-sm sm:text-base">
            ਜੇਕਰ ਤੁਹਾਡੇ ਮਨ ਵਿੱਚ ਕੋਈ ਵੀ ਸਵਾਲ ਹੈ, ਤਾਂ ਹੇਠਾਂ ਦਿੱਤੇ ਜਵਾਬ ਜ਼ਰੂਰ ਪੜ੍ਹੋ:
          </p>
        </div>

        <div className="space-y-3.5">
          {FAQS.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-sm transition-all"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full flex items-center justify-between p-5 text-left font-gurmukhi font-bold text-base sm:text-lg text-stone-900 hover:text-farm-800 transition-colors"
                >
                  <span>{faq.q}</span>
                  <div className={`w-7 h-7 rounded-full bg-stone-100 flex items-center justify-center flex-shrink-0 transition-transform ${isOpen ? 'rotate-180 bg-farm-100 text-farm-800' : 'text-stone-500'}`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-sm sm:text-base text-stone-600 font-gurmukhi leading-relaxed border-t border-stone-100">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
