import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

const CASHFREE_APP_ID = process.env.CASHFREE_APP_ID || '';
const CASHFREE_SECRET_KEY = process.env.CASHFREE_SECRET_KEY || '';
const CASHFREE_API_VERSION = process.env.CASHFREE_API_VERSION || '2023-08-01';
const CASHFREE_BASE_URL = 'https://api.cashfree.com/pg';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const orderId = searchParams.get('order_id');

    if (!orderId) {
      return NextResponse.json({ error: 'Order ID is required' }, { status: 400 });
    }

    const cfRes = await fetch(`${CASHFREE_BASE_URL}/orders/${orderId}`, {
      method: 'GET',
      headers: {
        'x-client-id': CASHFREE_APP_ID,
        'x-client-secret': CASHFREE_SECRET_KEY,
        'x-api-version': CASHFREE_API_VERSION
      }
    });

    const data = await cfRes.json();

    if (!cfRes.ok) {
      return NextResponse.json({ error: data.message || 'Order fetch failed' }, { status: 400 });
    }

    const isPaid = data.order_status === 'PAID';

    return NextResponse.json({
      success: true,
      isPaid,
      orderStatus: data.order_status,
      orderId: data.order_id,
      cfOrderId: data.cf_order_id,
      orderAmount: data.order_amount,
      customer: data.customer_details,
      downloadUrl: '/book/Kisan_Di_Fasal_Guide_Pages_1-40.pdf'
    });
  } catch (err: any) {
    console.error('Verify order error:', err);
    return NextResponse.json({ error: err.message || 'Verification failed' }, { status: 500 });
  }
}
