/**
 * @vitest-environment node
 */
import { afterEach, describe, expect, it, vi } from 'vitest';

async function runHealthCheck() {
  vi.resetModules();
  const route = await import('./route');
  return route.GET();
}

describe('GET /api/health', () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it('returns 200 when required production checks pass', async () => {
    vi.stubEnv('NODE_ENV', 'production');
    vi.stubEnv('NEXT_PUBLIC_SITE_URL', 'https://www.healthcalc.xyz');
    vi.stubEnv('NEXT_PUBLIC_CANONICAL_HOST', 'www.healthcalc.xyz');
    vi.stubEnv('SUBMISSIONS_DB_DRIVER', 'postgres');
    vi.stubEnv('DATABASE_URL', 'postgres://user:pass@localhost:5432/db');
    vi.stubEnv('SUBMISSIONS_PERSISTENCE_STRICT', 'true');
    vi.stubEnv('RESEND_API_KEY', 're_test_123');
    vi.stubEnv('RESEND_AUDIENCE_ID', 'aud_123');
    vi.stubEnv('CONTACT_EMAIL', 'info@healthcalc.xyz');
    vi.stubEnv('NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY', '');
    vi.stubEnv('CLERK_SECRET_KEY', '');

    const response = await runHealthCheck();
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.status).toBe('ok');
    expect(body.timestamp).toBeDefined();
  });

  it('returns 503 when newsletter/contact providers are not configured', async () => {
    vi.stubEnv('NODE_ENV', 'production');
    vi.stubEnv('NEXT_PUBLIC_SITE_URL', 'https://www.healthcalc.xyz');
    vi.stubEnv('NEXT_PUBLIC_CANONICAL_HOST', 'www.healthcalc.xyz');
    vi.stubEnv('SUBMISSIONS_DB_DRIVER', 'postgres');
    vi.stubEnv('DATABASE_URL', 'postgres://user:pass@localhost:5432/db');
    vi.stubEnv('SUBMISSIONS_PERSISTENCE_STRICT', 'true');
    vi.stubEnv('RESEND_API_KEY', '');
    vi.stubEnv('RESEND_AUDIENCE_ID', '');
    vi.stubEnv('MAILCHIMP_API_KEY', '');
    vi.stubEnv('MAILCHIMP_AUDIENCE_ID', '');
    vi.stubEnv('CONVERTKIT_API_KEY', '');
    vi.stubEnv('CONVERTKIT_FORM_ID', '');

    const response = await runHealthCheck();
    const body = await response.json();

    expect(response.status).toBe(503);
    expect(body.status).toBe('degraded');
  });

  it('returns 200 when all core checks pass without optional integrations', async () => {
    vi.stubEnv('NODE_ENV', 'production');
    vi.stubEnv('NEXT_PUBLIC_SITE_URL', 'https://www.healthcalc.xyz');
    vi.stubEnv('NEXT_PUBLIC_CANONICAL_HOST', 'www.healthcalc.xyz');
    vi.stubEnv('SUBMISSIONS_DB_DRIVER', 'postgres');
    vi.stubEnv('DATABASE_URL', 'postgres://user:pass@localhost:5432/db');
    vi.stubEnv('SUBMISSIONS_PERSISTENCE_STRICT', 'true');
    vi.stubEnv('RESEND_API_KEY', 're_test_123');
    vi.stubEnv('RESEND_AUDIENCE_ID', 'aud_123');

    const response = await runHealthCheck();
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.status).toBe('ok');
  });

  it('does not expose configuration details in the public response', async () => {
    vi.stubEnv('NODE_ENV', 'production');
    vi.stubEnv('SUBMISSIONS_DB_DRIVER', 'postgres');
    vi.stubEnv('DATABASE_URL', 'postgres://user:pass@localhost:5432/db');

    const response = await runHealthCheck();
    const body = await response.json();

    expect(body.checks).toBeUndefined();
    expect(body.warnings).toBeUndefined();
    expect(Object.keys(body).sort()).toEqual(['ok', 'status', 'timestamp']);
  });

  it('treats Vercel Analytics as a valid analytics provider', async () => {
    vi.stubEnv('VERCEL_ENV', 'production');
    vi.resetModules();
    const { createHealthChecks, createWarnings } = await import('@/lib/health');

    const checks = createHealthChecks();

    expect(checks.analyticsConfigured).toBe(true);
    expect(createWarnings(checks)).not.toContain('No analytics provider is configured.');
  });

  it('accepts a server-only Sentry DSN for observability checks', async () => {
    vi.stubEnv('SENTRY_DSN', 'https://secret@example.ingest.sentry.io/123');
    vi.resetModules();
    const { createHealthChecks, createWarnings } = await import('@/lib/health');

    const checks = createHealthChecks();

    expect(checks.sentryDsnConfigured).toBe(true);
    expect(createWarnings(checks)).not.toContain(
      'Sentry DSN is not configured. Browser errors fall back to server logs.'
    );
  });
});
