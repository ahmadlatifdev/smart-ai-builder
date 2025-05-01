import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { name, image, price, description } = await req.json();

  try {
    const res = await fetch(`${process.env.WC_API_URL}/wp-json/wc/v3/products`, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${Buffer.from(`${process.env.WC_CONSUMER_KEY}:${process.env.WC_CONSUMER_SECRET}`).toString('base64')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        regular_price: price,
        description,
        images: [{ src: image }],
      }),
    });

    if (!res.ok) throw new Error('WooCommerce push failed');
    const data = await res.json();
    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: 'Failed to push product to WooCommerce' });
  }
}
