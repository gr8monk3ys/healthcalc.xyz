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
});
