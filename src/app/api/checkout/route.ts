import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, phone, email, amount = 199, paymentMethod = 'upi' } = body;

    if (!name || !phone) {
      return NextResponse.json({ error: 'ਨਾਮ ਅਤੇ ਮੋਬਾਈਲ ਨੰਬਰ ਭਰਨਾ ਜ਼ਰੂਰੀ ਹੈ (Name and Phone are required)' }, { status: 400 });
    }

    const orderId = 'KISAN-' + Date.now().toString(36).toUpperCase() + '-' + Math.floor(1000 + Math.random() * 9000);
    const purchaseDate = new Date().toISOString();

    return NextResponse.json({
      success: true,
      orderId,
      customer: { name, phone, email },
      amount: Number(amount),
      currency: 'INR',
      status: 'PAID',
      purchaseDate,
      bookTitle: 'ਕਿਸਾਨ ਦੀ ਫਸਲ ਗਾਈਡ (40 ਪੰਨੇ ਸੰਪੂਰਨ ਡਿਜੀਟਲ ਹੈਂਡਬੁੱਕ)',
      downloadUrl: '/api/download',
      message: 'ਭੁਗਤਾਨ ਸਫਲ ਰਿਹਾ! ਤੁਹਾਡੀ ਕਿਤਾਬ ਡਾਊਨਲੋਡ ਲਈ ਤਿਆਰ ਹੈ। (Payment Successful! Your book is ready to download.)',
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Checkout failed' }, { status: 500 });
  }
}

