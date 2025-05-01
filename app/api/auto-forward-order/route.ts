import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { orderId, supplierApiKey } = await req.json();

  try {
    const res = await fetch(`${process.env.SUPPLIER_ORDER_URL}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${supplierApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ orderId }),
    });

    if (!res.ok) throw new Error('Supplier order forward failed');

    const data = await res.json();
    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: 'Failed to forward order' });
  }
}
