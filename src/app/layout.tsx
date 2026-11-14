import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://farmer-helper-tool.vercel.app'),
  title: 'ਕਿਸਾਨ ਦੀ ਫਸਲ ਗਾਈਡ — 40 ਪੰਨੇ ਸੰਪੂਰਨ ਡਿਜੀਟਲ ਖੇਤੀਬਾੜੀ ਹੈਂਡਬੁੱਕ | Official Book',
  description: 'ਵੱਧ ਝਾੜ • ਘੱਟ ਖਰਚਾ • ਸਿਹਤਮੰਦ ਫਸਲ — ਪੰਜਾਬ ਦੇ ਕਿਸਾਨਾਂ ਲਈ ਬੀਜ ਤੋਂ ਮੰਡੀ ਤੱਕ 40 ਰੰਗਦਾਰ ਵਿਜ਼ੂਅਲ ਪੰਨਿਆਂ ਵਿੱਚ ਪੂਰੀ ਜਾਣਕਾਰੀ। ਤੁਰੰਤ ਡਾਊਨਲੋਡ ਕਰੋ।',
  keywords: ['Kisan Di Fasal Guide', 'Punjab Agriculture Book', 'PAU farming guide', 'Wheat Paddy Mustard Cotton Potato Guide Punjabi', 'ਕਿਸਾਨ ਦੀ ਫਸਲ ਗਾਈਡ'],
  openGraph: {
    title: 'ਕਿਸਾਨ ਦੀ ਫਸਲ ਗਾਈਡ — 40 ਪੰਨੇ ਸੰਪੂਰਨ ਡਿਜੀਟਲ ਖੇਤੀਬਾੜੀ ਹੈਂਡਬੁੱਕ',
    description: '40 ਰੰਗਦਾਰ ਵਿਜ਼ੂਅਲ ਪੰਨਿਆਂ ਵਿੱਚ ਬੀਜ ਤੋਂ ਮੰਡੀ ਤੱਕ ਦੀ ਪੂਰੀ ਵਿਗਿਆਨਕ ਜਾਣਕਾਰੀ। ਹੁਣੇ ਡਾਊਨਲੋਡ ਕਰੋ।',
    images: [
      {
        url: '/images/book_cover.jpg',
        width: 1200,
        height: 1700,
        alt: 'ਕਿਸਾਨ ਦੀ ਫਸਲ ਗਾਈਡ ਕਵਰ',
      },
    ],
    locale: 'pa_IN',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pa" className="scroll-smooth">
      <body className="min-h-screen bg-stone-50 text-slate-800 antialiased selection:bg-amber-200 selection:text-emerald-950">
        {children}
        <Script src="https://sdk.cashfree.com/js/v3/cashfree.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}

