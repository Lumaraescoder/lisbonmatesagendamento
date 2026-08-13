import { NextResponse } from 'next/server';
import { calculateBookingAmount } from '@/utils/bookingPricing';
import { DEMO_EXPERIENCES_LISTINGS, DEMO_STAY_LISTINGS } from '@/data/listings';

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

function calculateAmount(bookingData: any) {
 const adults = Math.max(0, Math.floor(Number(bookingData?.adults || 0)));
 const children = Math.max(0, Math.floor(Number(bookingData?.children || 0)));
 const payableGuests = adults + children;
 const hours = Math.min(6, Math.max(1, Math.floor(Number(bookingData?.hours || 1))));

 if (payableGuests < 1) {
  throw new Error('At least one adult or child is required');
 }

 const bookingDate = String(bookingData?.date || '');
 if (!/^\d{4}-\d{2}-\d{2}$/.test(bookingDate)) {
  throw new Error('A valid reservation date is required');
 }
 const [year, month, day] = bookingDate.split('-').map(Number);
 const selectedDate = new Date(year, month - 1, day);
 const today = new Date();
 today.setHours(0, 0, 0, 0);
 if (
  selectedDate.getFullYear() !== year ||
  selectedDate.getMonth() !== month - 1 ||
  selectedDate.getDate() !== day ||
  selectedDate < today
 ) {
  throw new Error('The reservation date must be today or later');
 }

 const listingId = String(bookingData?.listingId || '');
 const listing = [...DEMO_EXPERIENCES_LISTINGS, ...DEMO_STAY_LISTINGS]
  .find((item) => item.id === listingId || item.href?.endsWith(`/${listingId}`));

 if (!listing) {
  throw new Error('A valid tour is required to calculate the booking total');
 }

 return calculateBookingAmount({ price: listing.price, adults, children, hours });
}

function limitText(value: string, max: number) {
 return value.length > max ? value.slice(0, max) : value;
}

export async function POST(request: Request) {
 try {
  const { bookingData } = await request.json();
  const origin = new URL(request.url).origin;
  const amount = calculateAmount(bookingData);
  const adults = Math.max(0, Math.floor(Number(bookingData?.adults || 0)));
  const children = Math.max(0, Math.floor(Number(bookingData?.children || 0)));
  const infants = Math.max(0, Math.floor(Number(bookingData?.infants || 0)));
  const hours = Math.min(6, Math.max(1, Math.floor(Number(bookingData?.hours || 1))));
  const compactBooking = [
   bookingData?.listingId || 'no-listing',
   bookingData?.date || 'no-date',
   bookingData?.time || 'no-time',
   `${adults}a${children}c${infants}i`,
   `${hours}h`,
  ].join('|');

  const token = await getAccessToken();

  const res = await fetch(`${getBase()}/v2/checkout/orders`, {
   method: 'POST',
   headers: {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
   },
   body: JSON.stringify({
    intent: 'CAPTURE',
    application_context: {
     return_url: `${origin}/checkout?paypal=success`,
     cancel_url: `${origin}/checkout?paypal=cancel`,
     shipping_preference: 'NO_SHIPPING',
     user_action: 'PAY_NOW',
    },
    purchase_units: [
     {
      amount: {
       currency_code: 'EUR',
       value: amount.toFixed(2),
      },
      description: limitText(bookingData?.tourTitle || 'Tour Booking', 127),
      custom_id: limitText(compactBooking, 127),
     },
    ],
   }),
  });

  const order = await res.json();

  if (!res.ok) {
   console.error('❌ Error creating PayPal order:', order);
   return NextResponse.json({ error: 'Error creating PayPal order', details: order }, { status: 500 });
  }

  // Return the `id` field that PayPal SDK expects when createOrder resolves.
  return NextResponse.json({ success: true, id: order.id, amount, currency: 'EUR', paypalOrder: order });
 } catch (error: any) {
  console.error('❌ Error creating PayPal order:', error);
  const message = error?.message || String(error);
  const status = message.includes('required') || message.includes('calculate') ? 400 : 500;
  return NextResponse.json(
   { error: 'Error creating PayPal order', details: message },
   { status }
  );
 }
}

export async function GET() {
 return NextResponse.json({ message: 'create-paypal-order API is working!', timestamp: new Date().toISOString() });
}
