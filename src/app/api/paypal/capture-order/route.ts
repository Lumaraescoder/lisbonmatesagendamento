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
  const { amount, bookingData } = await request.json();

  const token = await getAccessToken();

  const res = await fetch(`${getBase()}/v2/checkout/orders`, {
   method: 'POST',
   headers: {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
   },
   body: JSON.stringify({
    intent: 'CAPTURE',
    purchase_units: [
     {
      amount: {
       currency_code: 'EUR',
       value: String(amount),
      },

      description: bookingData?.tourTitle || 'Tour Booking',

      custom_id: JSON.stringify({
       tourTitle: bookingData?.tourTitle || 'No title',
       persons: bookingData?.persons || 1,
       date: bookingData?.date || 'No date',
       time: bookingData?.time || 'No time',
      }),
     },
    ],
   }),
  });

  const data = await res.json();

  if (!res.ok) {
   console.error('❌ Error creating PayPal order:', data);

   return NextResponse.json(
    {
     error: 'Error creating PayPal order',
     details: data,
    },
    { status: 500 }
   );
  }

  return NextResponse.json({
   success: true,
   orderId: data.id,
   paypalOrder: data,
  });
 } catch (error: any) {
  console.error('❌ Error creating PayPal order:', error);

  return NextResponse.json(
   {
    error: 'Error creating PayPal order',
    details: error.message,
   },
   { status: 500 }
  );
 }
}

export async function GET() {
 return NextResponse.json({
  message: 'create-paypal-order API is working!',
  timestamp: new Date().toISOString(),
 });
}