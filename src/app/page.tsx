'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import BookPreviewCarousel from '@/components/BookPreviewCarousel';
import ChapterBreakdown from '@/components/ChapterBreakdown';
import ValueComparison from '@/components/ValueComparison';
import FarmerTestimonials from '@/components/FarmerTestimonials';
import FAQ from '@/components/FAQ';
import StickyBuyBar from '@/components/StickyBuyBar';
import CheckoutModal from '@/components/CheckoutModal';
import Footer from '@/components/Footer';

function ReturnUrlHandler({ onPaymentSuccess }: { onPaymentSuccess: (orderData: any) => void }) {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('order_id');

  useEffect(() => {
    if (orderId) {
      fetch(`/api/verify-order?order_id=${encodeURIComponent(orderId)}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.success && data.isPaid) {
            onPaymentSuccess(data);
            if (typeof window !== 'undefined') {
              window.history.replaceState({}, '', '/');
            }
          }
        })
        .catch((err) => console.error('Verification error:', err));
    }
  }, [orderId, onPaymentSuccess]);

  return null;
}

export default function HomePage() {
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [verifiedOrderData, setVerifiedOrderData] = useState<any>(null);

  const handleOpenCheckout = () => {
    setVerifiedOrderData(null);
    setIsCheckoutOpen(true);
  };

  const handleCloseCheckout = () => {
    setIsCheckoutOpen(false);
    setVerifiedOrderData(null);
  };

  const handlePaymentSuccess = (data: any) => {
    setVerifiedOrderData(data);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 text-slate-800">
      {/* Return URL Handler for Cashfree callback */}
      <Suspense fallback={null}>
        <ReturnUrlHandler onPaymentSuccess={handlePaymentSuccess} />
      </Suspense>

      {/* Navbar with Sticky Announcement Ribbon */}
      <Navbar onBuyClick={handleOpenCheckout} />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Hero Section with 3D Book Cover & CTA */}
        <Hero onBuyClick={handleOpenCheckout} />

        {/* Interactive Look Inside Preview Carousel with Real Page Spreads */}
        <BookPreviewCarousel onBuyClick={handleOpenCheckout} />

        {/* Complete 40-Page Curriculum & Chapter Breakdown */}
        <ChapterBreakdown />

        {/* Value Proposition & Acre Savings Calculator */}
        <ValueComparison onBuyClick={handleOpenCheckout} />

        {/* Verified Punjabi Farmer Reviews & Testimonials */}
        <FarmerTestimonials />

        {/* Frequently Asked Questions */}
        <FAQ />
      </main>

      {/* Sticky Bottom Purchase Bar */}
      <StickyBuyBar onBuyClick={handleOpenCheckout} />

      {/* Checkout & Instant Digital PDF Delivery Modal */}
      <CheckoutModal 
        isOpen={isCheckoutOpen} 
        onClose={handleCloseCheckout} 
        initialOrderData={verifiedOrderData}
      />

      {/* Footer */}
      <Footer onBuyClick={handleOpenCheckout} />
    </div>
  );
}
