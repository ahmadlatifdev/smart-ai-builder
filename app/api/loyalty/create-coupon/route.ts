import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { customerEmail } = await req.json();

  try {
    const couponCode = `LOYAL-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

    const res = await fetch(`${process.env.WC_API_URL}/wp-json/wc/v3/coupons`, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${Buffer.from(`${process.env.WC_CONSUMER_KEY}:${process.env.WC_CONSUMER_SECRET}`).toString('base64')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        code: couponCode,
        discount_type: 'percent',
        amount: '10',
        email_restrictions: [customerEmail],
        usage_limit: 1,
        individual_use: true,
        description: 'Thank you for your order! Enjoy 10% off next time.',
      }),
    });

    if (!res.ok) throw new Error('WooCommerce coupon creation failed');
    const data = await res.json();

    return NextResponse.json({ success: true, couponCode: data.code });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: 'Failed to create loyalty coupon' });
  }
}
