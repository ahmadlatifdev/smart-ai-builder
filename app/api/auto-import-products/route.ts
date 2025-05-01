import { NextResponse } from 'next/server';

async function fetchTopProducts() {
  const res = await fetch(`${process.env.API_BASE_URL}/products/top`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  });
  const data = await res.json();
  return data.products || [];
}

export async function GET() {
  try {
    const topProducts = await fetchTopProducts();

    for (const product of topProducts) {
      await fetch(`${process.env.WC_API_URL}/wp-json/wc/v3/products`, {
        method: 'POST',
        headers: {
          'Authorization': `Basic ${Buffer.from(`${process.env.WC_CONSUMER_KEY}:${process.env.WC_CONSUMER_SECRET}`).toString('base64')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: product.name,
          regular_price: product.price,
          description: product.description,
          images: [{ src: product.image }],
        }),
      });
    }

    return NextResponse.json({ success: true, imported: topProducts.length });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: 'Failed auto-import' });
  }
}
