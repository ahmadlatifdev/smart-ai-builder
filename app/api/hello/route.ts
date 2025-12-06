import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

export async function GET() {
  return NextResponse.json(
    {
      ok: true,
      message: 'Smart AI Builder API hello endpoint is live on Railway.',
    },
    { status: 200 },
  );
}
