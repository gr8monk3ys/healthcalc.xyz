export interface ClientErrorReport {
  message: string;
  name?: string;
  digest?: string;
  stack?: string;
  source?: string;
  url?: string;
  userAgent?: string;
  timestamp: string;
}

function trim(value: string | undefined, maxLength: number): string | undefined {
  if (!value) return undefined;
  const normalized = value.trim();
  if (!normalized) return undefined;
  return normalized.slice(0, maxLength);
}

export function buildClientErrorReport(
  error: Error & { digest?: string },
  source: string
): ClientErrorReport {
  return {
    message: trim(error.message, 500) ?? 'Unknown client error',
    name: trim(error.name, 120),
    digest: trim(error.digest, 120),
    stack: trim(error.stack, 4000),
    source: trim(source, 120),
    url: typeof window !== 'undefined' ? trim(window.location.href, 1000) : undefined,
    userAgent: typeof window !== 'undefined' ? trim(window.navigator.userAgent, 500) : undefined,
    timestamp: new Date().toISOString(),
  };
}

export function sendClientErrorReport(report: ClientErrorReport): void {
  if (typeof window === 'undefined') return;

  const body = JSON.stringify(report);

  try {
    if (typeof window.navigator.sendBeacon === 'function') {
      const payload = new Blob([body], { type: 'application/json' });
      if (window.navigator.sendBeacon('/api/client-errors', payload)) {
        return;
      }
    }
  } catch {
    // Ignore beacon failures and fall back to fetch.
  }

  void fetch('/api/client-errors', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body,
    keepalive: true,
  }).catch(() => {
    // Ignore telemetry transport failures.
  });
}
