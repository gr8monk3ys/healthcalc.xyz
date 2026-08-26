import { NextResponse } from 'next/server';
import { createHealthCalcs, createWarnings, isHealthy } from '@/lib/health';

export async function GET(): Promise<NextResponse> {
  const checks = createHealthCalcs();
  const warnings = createWarnings(checks);
  const ok = isHealthy(checks);

  // Log detailed health state for internal monitoring. The public response is
  // intentionally minimal — exposing which providers/keys are configured gives
  // unauthenticated callers reconnaissance value.
  if (warnings.length > 0 || !ok) {
    console.warn('[health]', { ok, checks, warnings });
  }

  return NextResponse.json(
    {
      ok,
      status: ok ? 'ok' : 'degraded',
      timestamp: new Date().toISOString(),
    },
    { status: ok ? 200 : 503, headers: { 'Cache-Control': 'no-store' } }
  );
}
