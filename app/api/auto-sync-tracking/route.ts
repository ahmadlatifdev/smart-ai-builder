import { NextResponse } from 'next/server';

async function fetchSupplierTracking(orderId: string) {
  const res = await fetch(`${process.env.SUPPLIER_TRACKING_URL}/${orderId}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${process.env.SUPPLIER_API_KEY}`,
      'Content-Type': 'application/json',
    }
  });
  const data = await res.json();
  return data.trackingNumber;
}

export async function POST(req: Request) {
  const { orderId, wcOrderId } = await req.json();

  try {
    const trackingNumber = await fetchSupplierTracking(orderId);

    const res = await fetch(`${process.env.WC_API_URL}/wp-json/wc/v3/orders/${wcOrderId}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Basic ${Buffer.from(`${process.env.WC_CONSUMER_KEY}:${process.env.WC_CONSUMER_SECRET}`).toString('base64')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        meta_data: [
          { key: '_tracking_number', value: trackingNumber },
        ],
      }),
    });

    if (!res.ok) throw new Error('WooCommerce update failed');
    const data = await res.json();
    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: 'Failed to sync tracking' });
  }
}
