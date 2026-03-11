import { NextRequest, NextResponse } from 'next/server';
import type { ClientErrorReport } from '@/lib/clientErrorReporting';
import { createLogger } from '@/utils/logger';
import { rateLimit } from '@/utils/rateLimit';
import { verifyCsrf } from '@/utils/csrf';

const logger = createLogger({ route: 'api/client-errors' });

function trim(value: unknown, maxLength: number): string | undefined {
  if (typeof value !== 'string') return undefined;
  const normalized = value.trim();
  if (!normalized) return undefined;
  return normalized.slice(0, maxLength);
}

function normalizeUrl(value: unknown): string | undefined {
  if (typeof value !== 'string') return undefined;

  try {
    const url = new URL(value);
    return trim(`${url.origin}${url.pathname}${url.search}`, 1000);
  } catch {
    return trim(value, 1000);
  }
}

function sanitizeReport(
  payload: unknown,
  fallbackUserAgent: string | null
): ClientErrorReport | null {
  if (!payload || typeof payload !== 'object') {
    return null;
  }

  const report = payload as Partial<ClientErrorReport>;
  const message = trim(report.message, 500);

  if (!message) {
    return null;
  }

  return {
    message,
    name: trim(report.name, 120),
    digest: trim(report.digest, 120),
    stack: trim(report.stack, 4000),
    source: trim(report.source, 120),
    url: normalizeUrl(report.url),
    userAgent: trim(report.userAgent, 500) ?? trim(fallbackUserAgent, 500),
    timestamp: trim(report.timestamp, 120) ?? new Date().toISOString(),
  };
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  const limit = rateLimit(request, {
    limit: 20,
    windowMs: 60_000,
    routeKey: 'client-errors',
  });

  if (!limit.success) {
    return NextResponse.json(
      { ok: false, error: 'Too many error reports' },
      { status: 429, headers: limit.headers }
    );
  }

  if (!verifyCsrf(request)) {
    return NextResponse.json(
      { ok: false, error: 'Invalid origin' },
      { status: 403, headers: limit.headers }
    );
  }

  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: 'Invalid JSON body' },
      { status: 400, headers: limit.headers }
    );
  }

  const report = sanitizeReport(payload, request.headers.get('user-agent'));

  if (!report) {
    return NextResponse.json(
      { ok: false, error: 'Invalid error payload' },
      { status: 400, headers: limit.headers }
    );
  }

  logger.error('Client error report received', {
    ...report,
    path: request.nextUrl.pathname,
  });

  return new NextResponse(null, { status: 204, headers: limit.headers });
}
