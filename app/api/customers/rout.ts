import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const res = await fetch(`${process.env.WC_API_URL}/wp-json/wc/v3/orders`, {
      method: 'GET',
      headers: {
        'Authorization': `Basic ${Buffer.from(`${process.env.WC_CONSUMER_KEY}:${process.env.WC_CONSUMER_SECRET}`).toString('base64')}`,
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) throw new Error('WooCommerce fetch failed');
    
    const orders = await res.json();

    const customers = orders.map((order: any) => ({
      name: `${order.billing.first_name} ${order.billing.last_name}`,
      email: order.billing.email,
      phone: order.billing.phone,
      lastProduct: order.line_items[0]?.name || 'N/A',
      status: order.status,
      trackingNumber: order.meta_data.find((meta: any) => meta.key === '_tracking_number')?.value || 'Pending',
    }));

    return NextResponse.json({ success: true, customers });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: 'Failed to fetch customers' });
  }
}
