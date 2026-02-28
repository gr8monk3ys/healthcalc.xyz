import { NextRequest, NextResponse } from 'next/server';
import { track } from '@vercel/analytics/server';

const EMBEDDABLE_CALCULATORS = new Set(['bmi', 'tdee', 'body-fat', 'calorie-deficit']);
const ALLOWED_ACTIONS = new Set(['view', 'calculate']);

interface EmbedAnalyticsPayload {
  calculator?: unknown;
  action?: unknown;
  referrer?: unknown;
}

function parseReferrerHost(referrer: unknown): string {
  if (typeof referrer !== 'string' || referrer.length === 0) {
    return 'unknown';
  }

  try {
    return new URL(referrer).hostname.toLowerCase();
  } catch {
    return 'unknown';
  }
}

function normalizeCalculator(value: unknown): string | null {
  if (typeof value !== 'string') return null;
  return EMBEDDABLE_CALCULATORS.has(value) ? value : null;
}

function normalizeAction(value: unknown): 'view' | 'calculate' | null {
  if (typeof value !== 'string') return null;
  return ALLOWED_ACTIONS.has(value) ? (value as 'view' | 'calculate') : null;
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  let payload: EmbedAnalyticsPayload | null = null;

  try {
    payload = (await request.json()) as EmbedAnalyticsPayload;
  } catch {
    return new NextResponse(null, { status: 204 });
  }

  const calculator = normalizeCalculator(payload?.calculator);
  const action = normalizeAction(payload?.action);
  if (!calculator || !action) {
    return new NextResponse(null, { status: 204 });
  }

  const referrerHost = parseReferrerHost(payload?.referrer);
  const eventName = action === 'calculate' ? 'embed_widget_calculate' : 'embed_widget_view';

  try {
    await track(
      eventName,
      {
        calculator,
        referrer_host: referrerHost,
      },
      { request: { headers: request.headers } }
    );
  } catch {
    // Ignore analytics failures.
  }

  return new NextResponse(null, { status: 204 });
}
