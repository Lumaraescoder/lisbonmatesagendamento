import { NextResponse } from 'next/server';

const getBase = () => process.env.PAYPAL_ENV === 'live' ? 'https://api.paypal.com' : 'https://api.sandbox.paypal.com';

export async function GET() {
 try {
  const id = process.env.PAYPAL_CLIENT_ID || process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
  const secret = process.env.PAYPAL_CLIENT_SECRET;
  if (!id || !secret) {
   return NextResponse.json({ ok: false, error: 'Missing PAYPAL_CLIENT_ID or PAYPAL_CLIENT_SECRET in env' }, { status: 500 });
  }

  const url = `${getBase()}/v1/oauth2/token`;
  const res = await fetch(url, {
   method: 'POST',
   headers: {
    Authorization: `Basic ${Buffer.from(id + ':' + secret).toString('base64')}`,
    'Content-Type': 'application/x-www-form-urlencoded',
   },
   body: 'grant_type=client_credentials',
  });

  const text = await res.text();
  let body: any = text;
  try { body = JSON.parse(text); } catch (e) { }

  if (!res.ok) {
   return NextResponse.json({ ok: false, status: res.status, body }, { status: 500 });
  }

  return NextResponse.json({ ok: true, status: res.status, body });
 } catch (err: any) {
  return NextResponse.json({ ok: false, error: err.message || String(err) }, { status: 500 });
 }
}

// keep Node runtime
