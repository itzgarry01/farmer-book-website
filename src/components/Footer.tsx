'use client';

import React from 'react';
import { BookOpen, ShieldCheck, Heart, Phone } from 'lucide-react';

export default function Footer({ onBuyClick }: { onBuyClick: () => void }) {
  return (
    <footer className="bg-stone-900 text-stone-300 pt-16 pb-24 border-t border-stone-800 font-gurmukhi">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-stone-800">
          
          {/* Identity Column */}
          <div className="md:col-span-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-farm-700 flex items-center justify-center text-white">
                <BookOpen className="w-5 h-5 text-amber-300" />
              </div>
              <div>
                <span className="font-black text-xl text-white">
                  ਕਿਸਾਨ ਦੀ ਫਸਲ ਗਾਈਡ
                </span>
                <span className="block text-xs text-amber-400 font-semibold font-sans">
                  40-Page Master Visual Agricultural Handbook
                </span>
              </div>
            </div>

            <p className="text-stone-400 text-xs sm:text-sm leading-relaxed mb-4">
              ਪੰਜਾਬ ਦੇ ਕਿਸਾਨਾਂ ਨੂੰ ਆਤਮ-ਨਿਰਭਰ, ਕਰਜ਼ਾ-ਮੁਕਤ ਅਤੇ ਵੱਧ ਮੁਨਾਫ਼ੇ ਵਾਲੀ ਖੇਤੀ ਵੱਲ ਤੋਰਨ ਲਈ ਇਹ ਡਿਜੀਟਲ ਹੈਂਡਬੁੱਕ ਤਿਆਰ ਕੀਤੀ ਗਈ ਹੈ। ਹਰ ਵਿਸ਼ੇ ਨੂੰ ਵਿਗਿਆਨਕ ਅਤੇ ਪ੍ਰੈਕਟੀਕਲ ਤਰੀਕੇ ਨਾਲ ਰੰਗਦਾਰ ਚਿੱਤਰਾਂ ਰਾਹੀਂ ਸਮਝਾਇਆ ਗਿਆ ਹੈ।
            </p>

            <div className="flex items-center gap-2 text-xs text-stone-400">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>100% ਸੁਰੱਖਿਅਤ ਡਿਜੀਟਲ ਡਾਊਨਲੋਡ ਗਾਰੰਟੀ</span>
            </div>
          </div>

          {/* Quick Links & Legal Policies */}
          <div className="md:col-span-3">
            <h4 className="text-white font-bold text-sm mb-4 uppercase tracking-wider">
              ਜ਼ਰੂਰੀ ਲਿੰਕ ਤੇ ਨੀਤੀਆਂ
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-stone-400">
              <li><a href="#preview" className="hover:text-amber-400 transition-colors">ਕਿਤਾਬ ਦੇ ਨਮੂਨਾ ਪੰਨੇ</a></li>
              <li><a href="#chapters" className="hover:text-amber-400 transition-colors">ਵਿਸ਼ਾ ਸੂਚੀ (Table of Contents)</a></li>
              <li><a href="#benefits" className="hover:text-amber-400 transition-colors">ਖਰਚਾ ਬੱਚਤ ਕੈਲਕੁਲੇਟਰ</a></li>
              <li><a href="#faq" className="hover:text-amber-400 transition-colors">ਸਵਾਲ-ਜਵਾਬ (FAQ)</a></li>
              <li className="pt-2 border-t border-stone-800"><a href="https://agristack-website.vercel.app/terms.html" target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 transition-colors">Terms &amp; Conditions</a></li>
              <li><a href="https://agristack-website.vercel.app/refund.html" target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 transition-colors">Refund &amp; Cancellation</a></li>
              <li><a href="https://agristack-website.vercel.app/shipping.html" target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 transition-colors">Digital Delivery Policy</a></li>
              <li><a href="https://agristack-website.vercel.app/contact.html" target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 transition-colors">Contact Merchant</a></li>
            </ul>
          </div>

          {/* Support & Helpline */}
          <div className="md:col-span-4">
            <h4 className="text-white font-bold text-sm mb-4 uppercase tracking-wider">
              ਕਿਸਾਨ ਸਹਾਇਤਾ ਹੈਲਪਲਾਈਨ
            </h4>
            <div className="bg-stone-800/80 rounded-2xl p-4 border border-stone-700/80 mb-4">
              <p className="text-xs text-stone-300 leading-relaxed mb-3">
                ਜੇਕਰ ਕਿਤਾਬ ਖਰੀਦਣ ਜਾਂ ਡਾਊਨਲੋਡ ਕਰਨ ਵਿੱਚ ਕੋਈ ਵੀ ਸਹਾਇਤਾ ਚਾਹੀਦੀ ਹੈ, ਤਾਂ ਸਾਡੀ ਟੀਮ ਨਾਲ ਸੰਪਰਕ ਕਰੋ:
              </p>
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs sm:text-sm">
                <Phone className="w-4 h-4" />
                <span>WhatsApp Helpline: +91 70099 80800</span>
              </div>
            </div>

            <button
              onClick={onBuyClick}
              className="w-full bg-amber-500 hover:bg-amber-400 text-stone-950 font-black text-xs sm:text-sm py-2.5 px-4 rounded-xl shadow transition-all active:scale-95"
            >
              ਹੁਣੇ ਕਿਤਾਬ ਡਾਊਨਲੋਡ ਕਰੋ (₹25)
            </button>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <div>
            © {new Date().getFullYear()} ਕਿਸਾਨ ਦੀ ਫਸਲ ਗਾਈਡ (Kisan Di Fasal Guide). All Rights Reserved.
          </div>
          <div className="flex items-center gap-1 text-stone-400">
            <span>ਪੰਜਾਬ ਦੇ ਕਿਸਾਨਾਂ ਲਈ ਪਿਆਰ ਨਾਲ ਬਣਾਈ ਗਈ</span>
            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500 inline" />
          </div>
        </div>

      </div>
    </footer>
  );
}

