'use client';

import React, { useState } from 'react';
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

export default function HomePage() {
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const handleOpenCheckout = () => {
    setIsCheckoutOpen(true);
  };

  const handleCloseCheckout = () => {
    setIsCheckoutOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 text-slate-800">
      {/* Navbar with Sticky Announcement Ribbon */}
      <Navbar onBuyClick={handleOpenCheckout} />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Hero Section with 3D Book Cover & CTA */}
        <Hero onBuyClick={handleOpenCheckout} />

        {/* Interactive "Look Inside" Preview Carousel with Real Page Spreads */}
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
      <CheckoutModal isOpen={isCheckoutOpen} onClose={handleCloseCheckout} />

      {/* Footer */}
      <Footer onBuyClick={handleOpenCheckout} />
    </div>
  );
}

