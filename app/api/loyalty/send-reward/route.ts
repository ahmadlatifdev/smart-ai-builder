import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { customerEmail, couponCode } = await req.json();

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'noreply@yourstore.com',
        to: customerEmail,
        subject: 'Thank you! Enjoy 10% off your next order!',
        html: `
          <h1>Thank You for Your Order!</h1>
          <p>Here’s your loyalty reward: <strong>${couponCode}</strong></p>
          <p>Use it at checkout to get 10% off your next order!</p>
        `,
      }),
    });

    if (!res.ok) throw new Error('Failed to send loyalty email');
    const data = await res.json();

    return NextResponse.json({ success: true, message: 'Reward email sent.' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: 'Failed to send reward email' });
  }
}
