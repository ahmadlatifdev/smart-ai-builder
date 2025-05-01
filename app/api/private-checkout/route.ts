import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { productId, quantity } = await req.json();

  try {
    const checkoutLink = `${process.env.WC_STORE_URL}/?add-to-cart=${productId}&quantity=${quantity || 1}`;
    return NextResponse.json({ success: true, checkoutLink });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: 'Failed to generate checkout link' });
  }
}
