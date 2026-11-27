'use client';

import React, { useState, useEffect } from 'react';
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
  FileText,
  Lock,
  Loader2
} from 'lucide-react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialOrderData?: any;
}

export default function CheckoutModal({ isOpen, onClose, initialOrderData }: CheckoutModalProps) {
  const [step, setStep] = useState<'form' | 'payment' | 'success'>('form');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [orderData, setOrderData] = useState<any>(initialOrderData || null);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (initialOrderData) {
      setOrderData(initialOrderData);
      setStep('success');
      triggerConfetti();
    } else {
      setStep('form');
      setOrderData(null);
    }
  }, [initialOrderData]);

  if (!isOpen) return null;

  const handleCloseModal = () => {
    setStep('form');
    setOrderData(null);
    setName('');
    setPhone('');
    setEmail('');
    setErrorMessage('');
    onClose();
  };

  const triggerConfetti = () => {
    confetti({
      particleCount: 90,
      spread: 75,
      origin: { y: 0.6 }
    });
  };

  const handleStartPayment = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setErrorMessage('');

    if (!name.trim() || !phone.trim()) {
      setErrorMessage('ਕਿਰਪਾ ਕਰਕੇ ਆਪਣਾ ਪੂਰਾ ਨਾਮ ਅਤੇ ਮੋਬਾਈਲ ਨੰਬਰ ਭਰੋ।');
      return;
    }

    const cleanPhone = phone.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      setErrorMessage('ਕਿਰਪਾ ਕਰਕੇ ਸਹੀ 10-ਅੰਕਾਂ ਵਾਲਾ ਮੋਬਾਈਲ ਨੰਬਰ ਭਰੋ।');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          phone: cleanPhone,
          email: email.trim(),
          amount: 22
        })
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'ਭੁਗਤਾਨ ਆਰਡਰ ਬਣਾਉਣ ਵਿੱਚ ਗਲਤੀ ਹੋਈ।');
      }

      setOrderData(data);

      // Launch Cashfree SDK if available
      if (typeof window !== 'undefined' && (window as any).Cashfree && data.paymentSessionId) {
        const cashfree = (window as any).Cashfree({ mode: 'production' });

        cashfree.checkout({
          paymentSessionId: data.paymentSessionId,
          redirectTarget: '_modal'
        }).then(async (result: any) => {
          if (result && result.error) {
            console.warn('Cashfree notice:', result.error);
          }
          // Check order status
          await verifyAndComplete(data.orderId);
        });
      } else {
        // Fallback: poll or verify
        await verifyAndComplete(data.orderId);
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'ਕੁਨੈਕਸ਼ਨ ਗਲਤੀ। ਕਿਰਪਾ ਕਰਕੇ ਦੁਬਾਰਾ ਕੋਸ਼ਿਸ਼ ਕਰੋ।');
    } finally {
      setLoading(false);
    }
  };

  const verifyAndComplete = async (orderId: string) => {
    try {
      const vRes = await fetch(`/api/verify-order?order_id=${orderId}`);
      const vData = await vRes.json();
      if (vData.isPaid) {
        setOrderData((prev: any) => ({ ...prev, ...vData }));
        setStep('success');
        triggerConfetti();
      }
    } catch (e) {
      console.error('Verify error:', e);
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      
      <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden border border-stone-200 relative">
        
        {/* Close Button */}
        <button
          onClick={handleCloseModal}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 flex items-center justify-center transition-colors z-20"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Ribbon */}
        <div className="bg-gradient-to-r from-farm-800 to-farm-700 text-white p-5 pr-12">
          <div className="inline-flex items-center gap-1.5 bg-amber-400 text-amber-950 font-black text-[10px] px-2.5 py-0.5 rounded-full uppercase mb-1">
            <Lock className="w-3 h-3" />
            <span>ਸੁਰੱਖਿਅਤ ਡਿਜੀਟਲ ਖਰੀਦ • Cashfree Verified</span>
          </div>
          <h3 className="font-gurmukhi font-black text-xl text-white">
            ਕਿਸਾਨ ਦੀ ਫਸਲ ਗਾਈਡ (40 ਪੰਨੇ ਸੰਪੂਰਨ ਕਿਤਾਬ)
          </h3>
          <p className="text-xs text-amber-200 font-medium">
            HD Color PDF • Instant Download • Lifetime Mobile Access
          </p>
        </div>

        {/* Step 1: Form & Direct Checkout */}
        {step !== 'success' && (
          <form onSubmit={handleStartPayment} className="p-6">
            
            {/* Price Banner */}
            <div className="flex items-center justify-between p-3.5 bg-emerald-50/80 border-2 border-emerald-300 rounded-2xl mb-5">
              <div>
                <span className="text-xs text-stone-600 font-gurmukhi font-bold block">
                  ਕੁੱਲ ਭੁਗਤਾਨ (Payable Amount):
                </span>
                <span className="text-[11px] text-emerald-800 font-gurmukhi">
                  ★ ਵਿਸ਼ੇਸ਼ ਸੀਮਤ ਸਮਾਂ ਲਾਂਚ ਆਫਰ
                </span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-xs text-stone-400 line-through">₹499</span>
                <span className="text-3xl font-black text-farm-900">₹22</span>
              </div>
            </div>

            {errorMessage && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 font-gurmukhi">
                {errorMessage}
              </div>
            )}

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
                  ਮੋਬਾਈਲ / WhatsApp ਨੰਬਰ (Phone Number) *
                </label>
                <input
                  type="tel"
                  required
                  maxLength={10}
                  placeholder="ਉਦਾਹਰਣ: 9876543210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-farm-600 font-sans tracking-wider"
                />
                <span className="text-[11px] text-stone-500 font-gurmukhi mt-1 block">
                  (ਕਿਤਾਬ ਦਾ ਡਾਊਨਲੋਡ ਲਿੰਕ ਇਸ ਵਟਸਐਪ ਨੰਬਰ ਉੱਤੇ ਵੀ ਮਿਲੇਗਾ)
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

            {/* Supported Payment Badges */}
            <div className="bg-stone-50 border border-stone-200 rounded-xl p-3 mb-5">
              <div className="text-[11px] font-bold text-stone-600 font-gurmukhi mb-2 text-center">
                ਸਾਰੇ ਭੁਗਤਾਨ ਤਰੀਕੇ ਸਮਰਥਿਤ ਹਨ:
              </div>
              <div className="flex items-center justify-around gap-2 text-[11px] font-semibold text-stone-700">
                <span className="flex items-center gap-1">
                  <Smartphone className="w-3.5 h-3.5 text-farm-700" />
                  Google Pay
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Smartphone className="w-3.5 h-3.5 text-purple-700" />
                  PhonePe
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <QrCode className="w-3.5 h-3.5 text-amber-700" />
                  Paytm / QR
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <CreditCard className="w-3.5 h-3.5 text-blue-700" />
                  Cards
                </span>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2.5 bg-gradient-to-r from-farm-700 via-farm-600 to-farm-700 hover:from-farm-800 hover:to-farm-800 text-white font-gurmukhi font-black text-base py-3.5 px-6 rounded-xl shadow-lg shadow-farm-900/25 transition-all active:scale-[0.98] disabled:opacity-60 border border-farm-500/50"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin text-amber-300" />
                  <span>ਕੈਸ਼ਫ੍ਰੀ ਗੇਟਵੇ ਖੁੱਲ੍ਹ ਰਿਹਾ ਹੈ...</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-5 h-5 text-amber-300" />
                  <span>₹22 ਦਾ ਭੁਗਤਾਨ ਕਰੋ (Pay ₹22 via UPI/Card)</span>
                </>
              )}
            </button>

            <div className="flex items-center justify-center gap-2 text-[11px] text-stone-500 font-medium text-center mt-3">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>100% ਸੁਰੱਖਿਅਤ 256-bit SSL ਇਨਕ੍ਰਿਪਟਡ ਭੁਗਤਾਨ</span>
            </div>

          </form>
        )}

        {/* Step 2: Success & Instant PDF Download */}
        {step === 'success' && (
          <div className="p-6 text-center">
            
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-3">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <h3 className="font-gurmukhi font-black text-2xl text-farm-950 mb-1">
              ਵਧਾਈਆਂ! ਭੁਗਤਾਨ ਸਫਲ ਰਿਹਾ
            </h3>
            {orderData?.orderId && (
              <p className="text-xs text-stone-600 font-gurmukhi mb-4">
                ਤੁਹਾਡਾ ਆਰਡਰ ਨੰਬਰ: <strong className="font-mono text-farm-900">{orderData.orderId}</strong>
              </p>
            )}

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
                ਕਲਿੱਕ ਕਰਨ ਉੱਤੇ ਪੂਰੀ ਕਿਤਾਬ ਦੀ HD PDF ਤੁਹਾਡੇ ਫੋਨ/ਕੰਪਿਊਟਰ ਵਿੱਚ ਸੇਵ ਹੋ ਜਾਵੇਗੀ।
              </div>
            </div>

            {/* WhatsApp note */}
            <div className="text-xs text-stone-600 font-gurmukhi bg-stone-50 p-3 rounded-xl border border-stone-200 mb-4">
              ਡਾਊਨਲੋਡ ਲਿੰਕ ਤੁਹਾਡੇ ਮੋਬਾਈਲ/ਵਟਸਐਪ ਨੰਬਰ <strong>{phone || orderData?.customer?.customer_phone || ''}</strong> ਉੱਪਰ ਵੀ ਭੇਜ ਦਿੱਤਾ ਗਿਆ ਹੈ।
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-4">
              <button
                type="button"
                onClick={() => {
                  setStep('form');
                  setName('');
                  setPhone('');
                  setEmail('');
                  setOrderData(null);
                }}
                className="w-full sm:w-auto text-xs bg-stone-100 hover:bg-stone-200 text-stone-700 font-gurmukhi font-bold py-2.5 px-4 rounded-xl border border-stone-300 transition-colors"
              >
                + ਦੂਜੀ ਕਾਪੀ ਖਰੀਦੋ / ਨਵਾਂ ਆਰਡਰ (New Order)
              </button>

              <button
                type="button"
                onClick={handleCloseModal}
                className="w-full sm:w-auto text-xs text-stone-500 hover:text-stone-800 font-gurmukhi font-semibold underline py-2.5 px-3"
              >
                ਬੰਦ ਕਰੋ (Close)
              </button>
            </div>

          </div>
        )}

      </div>

    </div>
  );
}
