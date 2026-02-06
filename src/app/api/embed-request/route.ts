import { NextResponse } from 'next/server';

const CONVERTKIT_API_KEY = process.env.CONVERTKIT_API_KEY;
const CONVERTKIT_FORM_ID = process.env.CONVERTKIT_FORM_ID;

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const { name, email, website, calculator, calculatorSlug, notes } = payload || {};

    if (!email) {
      return NextResponse.json({ ok: false, error: 'Email is required' }, { status: 400 });
    }

    if (CONVERTKIT_API_KEY && CONVERTKIT_FORM_ID) {
      const response = await fetch(
        `https://api.convertkit.com/v3/forms/${CONVERTKIT_FORM_ID}/subscribe`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            api_key: CONVERTKIT_API_KEY,
            email,
            first_name: name,
            fields: {
              website,
              calculator,
              calculatorSlug,
              notes,
              source: 'embed-request',
            },
          }),
        }
      );

      if (!response.ok) {
        const errorBody = await response.text();
        console.error('[embed-request] ConvertKit error', errorBody);
        return NextResponse.json({ ok: false }, { status: 502 });
      }
    } else {
      console.warn('[embed-request] Missing ConvertKit config. Payload:', payload);
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('[embed-request] failed', error);
    return NextResponse.json({ ok: false }, { status: 400 });
  }
}
