import { NextResponse } from 'next/server';

const getBase = () =>
 process.env.PAYPAL_ENV === 'live'
  ? 'https://api.paypal.com'
  : 'https://api.sandbox.paypal.com';

async function getAccessToken() {
 const id =
  process.env.PAYPAL_CLIENT_ID ||
  process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;

 const secret = process.env.PAYPAL_CLIENT_SECRET;

 if (!id || !secret) {
  throw new Error('Missing PayPal credentials');
 }

 const res = await fetch(`${getBase()}/v1/oauth2/token`, {
  method: 'POST',
  headers: {
   Authorization: `Basic ${Buffer.from(`${id}:${secret}`).toString(
    'base64'
   )}`,
   'Content-Type': 'application/x-www-form-urlencoded',
  },
  body: 'grant_type=client_credentials',
 });

 if (!res.ok) {
  throw new Error('Failed to fetch access token');
 }

 const data = await res.json();
 return data.access_token;
}

export async function POST(request: Request) {
 try {
  const transmission_id =
   request.headers.get('paypal-transmission-id') ||
   request.headers.get('paypal-transmission_id') ||
   '';

  const transmission_time =
   request.headers.get('paypal-transmission-time') || '';

  const cert_url =
   request.headers.get('paypal-cert-url') || '';

  const auth_algo =
   request.headers.get('paypal-auth-algo') || '';

  const transmission_sig =
   request.headers.get('paypal-transmission-sig') || '';

  const webhook_id = process.env.PAYPAL_WEBHOOK_ID || '';

  const webhookEvent = await request.json();

  const token = await getAccessToken();

  // Verifica a assinatura do Webhook
  const response = await fetch(
   `${getBase()}/v1/notifications/verify-webhook-signature`,
   {
    method: 'POST',
    headers: {
     Authorization: `Bearer ${token}`,
     'Content-Type': 'application/json',
    },
    body: JSON.stringify({
     transmission_id,
     transmission_time,
     cert_url,
     auth_algo,
     transmission_sig,
     webhook_id,
     webhook_event: webhookEvent,
    }),
   }
  );

  const verification = await response.json();

  if (!response.ok) {
   console.error('❌ Error verifying PayPal webhook:', verification);

   return NextResponse.json(
    {
     error: 'Error verifying PayPal webhook',
     details: verification,
    },
    { status: 500 }
   );
  }

  if (
   verification.verification_status !== 'SUCCESS' &&
   verification.verification_status !== 'VERIFIED'
  ) {
   return NextResponse.json(
    {
     verified: false,
     details: verification,
    },
    { status: 400 }
   );
  }

  // -----------------------------
  // Trata os eventos do PayPal
  // -----------------------------
  switch (webhookEvent.event_type) {
   case 'PAYMENT.CAPTURE.COMPLETED':
    console.log('✅ Payment completed:', webhookEvent.resource.id);
    // Atualizar reserva como paga
    break;

   case 'CHECKOUT.ORDER.APPROVED':
    console.log('✅ Order approved:', webhookEvent.resource.id);
    break;

   case 'PAYMENT.CAPTURE.DENIED':
    console.log('❌ Payment denied:', webhookEvent.resource.id);
    break;

   default:
    console.log('ℹ️ Unhandled event:', webhookEvent.event_type);
  }

  return NextResponse.json({
   success: true,
   verified: true,
   event: webhookEvent.event_type,
  });
 } catch (error: any) {
  console.error('❌ PayPal Webhook Error:', error);

  return NextResponse.json(
   {
    error: 'PayPal webhook error',
    details: error.message,
   },
   { status: 500 }
  );
 }
}

export async function GET() {
 return NextResponse.json({
  message: 'PayPal webhook API is working!',
  timestamp: new Date().toISOString(),
 });
}