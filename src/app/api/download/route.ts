import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  // Redirect to the static asset served directly via Edge CDN
  // This bypasses Vercel's 4.5MB serverless function response limit for 53MB PDF
  const bookUrl = new URL('/book/Kisan_Di_Fasal_Guide_Pages_1-40.pdf', req.url);
  return NextResponse.redirect(bookUrl, 307);
}


