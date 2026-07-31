import { NextResponse } from 'next/server';

const getBase = () =>
  process.env.PAYPAL_ENV === 'live'
    ? 'https://api.paypal.com'
    : 'https://api.sandbox.paypal.com';

async function getAccessToken() {
  const id = process.env.PAYPAL_CLIENT_ID || process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
  const secret = process.env.PAYPAL_CLIENT_SECRET;

  if (!id || !secret) {
    throw new Error('Missing PayPal credentials (PAYPAL_CLIENT_ID / PAYPAL_CLIENT_SECRET)');
  }

  const res = await fetch(`${getBase()}/v1/oauth2/token`, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${Buffer.from(`${id}:${secret}`).toString('base64')}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
  });

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`Failed to fetch access token: ${res.status} ${text}`);
  }

  const data = await res.json();
  return data.access_token as string;
}

export async function POST(request: Request) {
  try {
    const { orderID } = await request.json();

    if (!orderID) return NextResponse.json({ error: 'Missing orderID' }, { status: 400 });

    const token = await getAccessToken();

    const res = await fetch(`${getBase()}/v2/checkout/orders/${encodeURIComponent(orderID)}/capture`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    const data = await res.json();

    if (!res.ok) {
      console.error('❌ Error capturing PayPal order:', data);
      return NextResponse.json({ error: 'Error capturing PayPal order', details: data }, { status: 500 });
    }

    return NextResponse.json({ success: true, capture: data });
  } catch (error: any) {
    console.error('❌ Error capturing PayPal order:', error);
    return NextResponse.json({ error: 'Error capturing PayPal order', details: error?.message || String(error) }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ message: 'capture-paypal-order API is working!', timestamp: new Date().toISOString() });
}