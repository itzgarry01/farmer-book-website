'use client';

import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  X, 
  Download, 
  ShieldCheck, 
  CheckCircle2, 
  Smartphone, 
  QrCode, 
  CreditCard, 
  Sparkles,
  ArrowRight,
  Share2,
  FileText
} from 'lucide-react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CheckoutModal({ isOpen, onClose }: CheckoutModalProps) {
  const [step, setStep] = useState<'form' | 'payment' | 'success'>('form');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'qr'>('upi');
  const [loading, setLoading] = useState(false);
  const [orderData, setOrderData] = useState<any>(null);

  if (!isOpen) return null;

  const triggerConfetti = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const handleProceedToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      alert('ਕਿਰਪਾ ਕਰਕੇ ਆਪਣਾ ਨਾਮ ਅਤੇ ਮੋਬਾਈਲ ਨੰਬਰ ਭਰੋ।');
      return;
    }
    setStep('payment');
  };

  const handleCompletePayment = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          phone,
          email,
          amount: 25,
          paymentMethod
        })
      });

      const data = await res.json();
      if (data.success) {
        if (data.paymentSessionId && typeof (window as any).Cashfree !== 'undefined') {
          const cashfree = (window as any).Cashfree({ mode: "production" });
          cashfree.checkout({
            paymentSessionId: data.paymentSessionId,
            redirectTarget: "_modal"
          }).then((result: any) => {
            if (result.error) {
              console.warn("Cashfree checkout error/dismiss:", result.error);
            }
            if (result.paymentDetails) {
              setOrderData(data);
              setStep('success');
              triggerConfetti();
            }
          });
        } else {
          setOrderData(data);
          setStep('success');
          triggerConfetti();
        }
      } else {
        alert(data.error || 'ਭੁਗਤਾਨ ਵਿੱਚ ਕੋਈ ਸਮੱਸਿਆ ਆਈ।');
      }
    } catch (err) {
      alert('ਕੁਨੈਕਸ਼ਨ ਗਲਤੀ। ਕਿਰਪਾ ਕਰਕੇ ਦੁਬਾਰਾ ਕੋਸ਼ਿਸ਼ ਕਰੋ।');
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = '/book/Kisan_Di_Fasal_Guide_Pages_1-40.pdf';
    link.download = 'ਕਿਸਾਨ_ਦੀ_ਫਸਲ_ਗਾਈਡ_Kisan_Di_Fasal_Guide.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      
      <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden border border-stone-200 relative">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 flex items-center justify-center transition-colors z-20"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Ribbon */}
        <div className="bg-gradient-to-r from-farm-800 to-farm-700 text-white p-5 pr-12">
          <div className="inline-flex items-center gap-1.5 bg-amber-400 text-amber-950 font-black text-[10px] px-2.5 py-0.5 rounded-full uppercase mb-1">
            <span>ਸੁਰੱਖਿਅਤ ਡਿਜੀਟਲ ਖਰੀਦ</span>
          </div>
          <h3 className="font-gurmukhi font-black text-xl text-white">
            ਕਿਸਾਨ ਦੀ ਫਸਲ ਗਾਈਡ (40 ਪੰਨੇ)
          </h3>
          <p className="text-xs text-amber-200 font-medium">
            HD Color PDF • Instant Download • Lifetime Access
          </p>
        </div>

        {/* Step 1: Customer Form */}
        {step === 'form' && (
          <form onSubmit={handleProceedToPayment} className="p-6">
            
            {/* Price pill */}
            <div className="flex items-center justify-between p-3.5 bg-stone-50 border border-stone-200 rounded-xl mb-5">
              <span className="text-xs text-stone-600 font-gurmukhi font-bold">
                ਕੁੱਲ ਭੁਗਤਾਨ (Total Payable):
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-xs text-stone-400 line-through">₹499</span>
                <span className="text-2xl font-black text-farm-900">₹25</span>
              </div>
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1 font-gurmukhi">
                  ਤੁਹਾਡਾ ਪੂਰਾ ਨਾਮ (Full Name) *
                </label>
                <input
                  type="text"
                  required
                  placeholder="ਉਦਾਹਰਣ: ਗੁਰਪ੍ਰੀਤ ਸਿੰਘ"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-farm-600 font-gurmukhi"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1 font-gurmukhi">
                  ਮੋਬਾਈਲ / WhatsApp ਨੰਬਰ *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="ਉਦਾਹਰਣ: 9876543210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-farm-600 font-sans"
                />
                <span className="text-[11px] text-stone-500 font-gurmukhi mt-1 block">
                  (ਕਿਤਾਬ ਦਾ ਡਾਊਨਲੋਡ ਲਿੰਕ ਇਸ ਵਟਸਐਪ ਨੰਬਰ ਉੱਤੇ ਵੀ ਭੇਜਿਆ ਜਾਵੇਗਾ)
                </span>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1 font-gurmukhi">
                  ਈਮੇਲ ਪਤਾ (Email - Optional)
                </label>
                <input
                  type="email"
                  placeholder="yourname@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-farm-600 font-sans"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-farm-700 hover:bg-farm-800 text-white font-gurmukhi font-black text-base py-3 px-6 rounded-xl shadow-lg shadow-farm-900/20 transition-all active:scale-[0.98]"
            >
              <span>ਅੱਗੇ ਵਧੋ — ਭੁਗਤਾਨ ਚੁਣੋ (Proceed to Pay)</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-center gap-2 text-[11px] text-stone-500 font-medium text-center mt-3">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>100% ਸੁਰੱਖਿਅਤ ਅਤੇ ਪ੍ਰਮਾਣਿਤ ਭੁਗਤਾਨ ਗੇਟਵੇ</span>
            </div>

          </form>
        )}

        {/* Step 2: Payment Selector */}
        {step === 'payment' && (
          <div className="p-6">
            
            <div className="text-center mb-4">
              <div className="text-xs text-stone-500 font-gurmukhi">ਭੁਗਤਾਨ ਕਰਨ ਵਾਲੇ: <strong>{name}</strong> ({phone})</div>
              <div className="text-2xl font-black text-farm-900 mt-1">₹25 ਦਾ ਭੁਗਤਾਨ ਕਰੋ</div>
            </div>

            {/* Payment Method Selector */}
            <div className="grid grid-cols-3 gap-2 mb-5">
              <button
                type="button"
                onClick={() => setPaymentMethod('upi')}
                className={`p-3 rounded-xl border text-center transition-all ${
                  paymentMethod === 'upi'
                    ? 'border-farm-600 bg-farm-50 text-farm-900 font-bold'
                    : 'border-stone-200 text-stone-600'
                }`}
              >
                <Smartphone className="w-5 h-5 mx-auto mb-1 text-farm-700" />
                <span className="text-xs block">UPI Apps</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('qr')}
                className={`p-3 rounded-xl border text-center transition-all ${
                  paymentMethod === 'qr'
                    ? 'border-farm-600 bg-farm-50 text-farm-900 font-bold'
                    : 'border-stone-200 text-stone-600'
                }`}
              >
                <QrCode className="w-5 h-5 mx-auto mb-1 text-amber-700" />
                <span className="text-xs block">UPI QR Scan</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('card')}
                className={`p-3 rounded-xl border text-center transition-all ${
                  paymentMethod === 'card'
                    ? 'border-farm-600 bg-farm-50 text-farm-900 font-bold'
                    : 'border-stone-200 text-stone-600'
                }`}
              >
                <CreditCard className="w-5 h-5 mx-auto mb-1 text-blue-700" />
                <span className="text-xs block">Card / NetBanking</span>
              </button>
            </div>

            {/* Simulated UPI / QR Interface */}
            {paymentMethod === 'qr' && (
              <div className="bg-stone-50 border border-stone-200 rounded-2xl p-4 text-center mb-5">
                <div className="w-36 h-36 mx-auto bg-white border border-stone-300 rounded-xl p-2 flex items-center justify-center shadow-inner mb-2">
                  <div className="text-center">
                    <QrCode className="w-24 h-24 mx-auto text-stone-800" />
                    <span className="text-[10px] font-mono text-stone-500">Scan via GPay/PhonePe</span>
                  </div>
                </div>
                <div className="text-xs font-bold text-stone-700 font-gurmukhi">
                  ਕਿਸੇ ਵੀ UPI ਐਪ ਨਾਲ ਸਕੈਨ ਕਰਕੇ ₹25 ਪੇਅ ਕਰੋ
                </div>
              </div>
            )}

            {paymentMethod === 'upi' && (
              <div className="space-y-2 mb-5">
                <div className="p-3 border border-stone-200 rounded-xl flex items-center justify-between bg-stone-50">
                  <span className="text-xs font-bold text-stone-800 font-gurmukhi">Google Pay / PhonePe / Paytm</span>
                  <span className="text-[11px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">ਸਿੱਧਾ ਭੁਗਤਾਨ</span>
                </div>
                <div className="text-xs text-stone-500 text-center font-gurmukhi">
                  ਬਟਨ ਦਬਾਉਣ ਉੱਤੇ ਤੁਹਾਡੀ UPI ਐਪ ਵਿੱਚ ਰਿਕਵੈਸਟ ਖੁੱਲ੍ਹੇਗੀ।
                </div>
              </div>
            )}

            {paymentMethod === 'card' && (
              <div className="p-4 border border-stone-200 rounded-xl bg-stone-50 mb-5 text-center text-xs text-stone-600 font-gurmukhi">
                ਸਾਰੇ ਡੈਬਿਟ ਕਾਰਡ, ਕ੍ਰੈਡਿਟ ਕਾਰਡ ਅਤੇ ਇੰਟਰਨੈੱਟ ਬੈਂਕਿੰਗ ਸਮਰਥਿਤ ਹਨ।
              </div>
            )}

            {/* Pay Button */}
            <button
              onClick={handleCompletePayment}
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-farm-700 via-farm-600 to-farm-700 hover:from-farm-800 hover:to-farm-800 text-white font-gurmukhi font-black text-base py-3.5 px-6 rounded-xl shadow-lg transition-all active:scale-[0.98] disabled:opacity-50"
            >
              {loading ? (
                <span>ਭੁਗਤਾਨ ਦੀ ਪੁਸ਼ਟੀ ਹੋ ਰਹੀ ਹੈ...</span>
              ) : (
                <>
                  <CheckCircle2 className="w-5 h-5 text-amber-300" />
                  <span>₹25 ਦਾ ਭੁਗਤਾਨ ਕਰੋ ਅਤੇ ਕਿਤਾਬ ਲਵੋ</span>
                </>
              )}
            </button>

            <button
              onClick={() => setStep('form')}
              className="w-full text-center text-xs text-stone-500 font-gurmukhi font-semibold mt-3 hover:underline"
            >
              ← ਵਾਪਸ ਜਾਓ (Edit details)
            </button>

          </div>
        )}

        {/* Step 3: Success & Instant PDF Download */}
        {step === 'success' && orderData && (
          <div className="p-6 text-center">
            
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-3">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <h3 className="font-gurmukhi font-black text-2xl text-farm-950 mb-1">
              ਵਧਾਈਆਂ! ਭੁਗਤਾਨ ਸਫਲ ਰਿਹਾ
            </h3>
            <p className="text-xs text-stone-600 font-gurmukhi mb-4">
              ਤੁਹਾਡਾ ਆਰਡਰ ਨੰਬਰ: <strong className="font-mono text-farm-900">{orderData.orderId}</strong>
            </p>

            {/* Big Download Button */}
            <div className="bg-emerald-50 border-2 border-emerald-300 rounded-2xl p-5 mb-5 shadow-sm">
              <div className="text-xs font-bold text-emerald-900 font-gurmukhi mb-2">
                ਤੁਹਾਡੀ 40 ਪੰਨਿਆਂ ਦੀ ਰੰਗਦਾਰ ਕਿਤਾਬ ਡਾਊਨਲੋਡ ਲਈ ਤਿਆਰ ਹੈ:
              </div>

              <button
                onClick={handleDownload}
                className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-farm-700 to-farm-800 hover:from-farm-800 hover:to-farm-900 text-white font-gurmukhi font-black text-lg py-4 px-6 rounded-xl shadow-xl transition-all active:scale-[0.97] animate-pulse-subtle border-2 border-amber-300"
              >
                <Download className="w-6 h-6 text-amber-300 animate-bounce" />
                <span>ਹੁਣੇ PDF ਡਾਊਨਲੋਡ ਕਰੋ (53 MB)</span>
              </button>

              <div className="text-[11px] text-stone-500 font-gurmukhi mt-2">
                ਕਲਿੱਕ ਕਰਨ ਉੱਤੇ ਪੂਰੀ ਕਿਤਾਬ ਦੀ PDF ਤੁਹਾਡੇ ਫੋਨ/ਕੰਪਿਊਟਰ ਵਿੱਚ ਸੇਵ ਹੋ ਜਾਵੇਗੀ।
              </div>
            </div>

            {/* WhatsApp note */}
            <div className="text-xs text-stone-600 font-gurmukhi bg-stone-50 p-3 rounded-xl border border-stone-200 mb-4">
              ਅਸੀਂ ਇਹ ਡਾਊਨਲੋਡ ਲਿੰਕ ਤੁਹਾਡੇ ਵਟਸਐਪ ਨੰਬਰ <strong>{phone}</strong> ਉੱਪਰ ਵੀ ਭੇਜ ਦਿੱਤਾ ਹੈ।
            </div>

            <button
              onClick={onClose}
              className="text-xs text-stone-500 hover:text-stone-800 font-gurmukhi font-semibold underline"
            >
              ਬੰਦ ਕਰੋ (Close)
            </button>

          </div>
        )}

      </div>

    </div>
  );
}
