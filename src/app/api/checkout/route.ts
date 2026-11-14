import { NextRequest, NextResponse } from 'next/server';

const CASHFREE_APP_ID = process.env.CASHFREE_APP_ID || '';
const CASHFREE_SECRET_KEY = process.env.CASHFREE_SECRET_KEY || '';
const CASHFREE_API_VERSION = process.env.CASHFREE_API_VERSION || '2023-08-01';
const CASHFREE_BASE_URL = 'https://api.cashfree.com/pg';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, phone, email } = body;

    if (!name || !phone) {
      return NextResponse.json({ error: 'ਨਾਮ ਅਤੇ ਮੋਬਾਈਲ ਨੰਬਰ ਭਰਨਾ ਜ਼ਰੂਰੀ ਹੈ (Name and Phone are required)' }, { status: 400 });
    }

    let cleanPhone = String(phone).replace(/\D/g, '');
    if (cleanPhone.length > 10 && cleanPhone.startsWith('91')) {
      cleanPhone = cleanPhone.slice(2);
    }
    if (cleanPhone.length !== 10) {
      cleanPhone = cleanPhone.padEnd(10, '0').slice(0, 10);
      if (cleanPhone.length < 10) cleanPhone = '9876543210';
    }

    const orderId = `kisan_${Date.now()}_${Math.floor(100 + Math.random() * 900)}`;
    const host = req.headers.get('host') || 'localhost:3000';
    const protocol = host.includes('localhost') ? 'http' : 'https';
    const origin = `${protocol}://${host}`;
    const returnUrl = `${origin}/?order_id={order_id}`;

    const customerEmail = (email && email.includes('@')) ? email.trim() : `farmer${cleanPhone}@gmail.com`;

    const payload = {
      order_id: orderId,
      order_amount: 25.00,
      order_currency: 'INR',
      customer_details: {
        customer_id: `cust_${cleanPhone}`,
        customer_name: name.trim().slice(0, 50),
        customer_email: customerEmail,
        customer_phone: cleanPhone
      },
      order_meta: {
        return_url: returnUrl
      },
      order_note: 'ਕਿਸਾਨ ਦੀ ਫਸਲ ਗਾਈਡ 40 ਪੰਨੇ ਈ-ਬੁੱਕ'
    };

    const cfRes = await fetch(`${CASHFREE_BASE_URL}/orders`, {
      method: 'POST',
      headers: {
        'x-client-id': CASHFREE_APP_ID,
        'x-client-secret': CASHFREE_SECRET_KEY,
        'x-api-version': CASHFREE_API_VERSION,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    const cfData = await cfRes.json();

    if (!cfRes.ok || !cfData.payment_session_id) {
      console.error('Cashfree order error:', cfData);
      return NextResponse.json({
        error: cfData.message || 'ਕੈਸ਼ਫ੍ਰੀ ਭੁਗਤਾਨ ਆਰਡਰ ਬਣਾਉਣ ਵਿੱਚ ਸਮੱਸਿਆ ਆਈ (Cashfree order creation failed)',
        details: cfData
      }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      orderId: cfData.order_id,
      cfOrderId: cfData.cf_order_id,
      paymentSessionId: cfData.payment_session_id,
      amount: 25,
      customer: { name, phone: cleanPhone, email: customerEmail }
    });
  } catch (err: any) {
    console.error('Checkout API error:', err);
    return NextResponse.json({ error: err.message || 'Checkout failed' }, { status: 500 });
  }
}
