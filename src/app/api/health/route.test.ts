/**
 * @vitest-environment jsdom
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
    expect(body.ok).toBe(true);
    expect(body.environment).toBe('production');
    expect(body.checks.newsletterProviderConfigured).toBe(true);
    expect(body.checks.contactProviderConfigured).toBe(true);
    expect(body.checks.persistenceDatabaseConfigured).toBe(true);
    expect(body.checks.persistenceStrictModeEnabled).toBe(true);
    expect(body.checks.clerkConfigurationValid).toBe(true);
    expect(body.warnings).toEqual(
      expect.arrayContaining([
        'Google Analytics is not configured.',
        'Sentry browser DSN is not configured.',
        'AdSense slots are not configured.',
      ])
    );
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
    expect(body.ok).toBe(false);
    expect(body.checks.newsletterProviderConfigured).toBe(false);
    expect(body.checks.contactProviderConfigured).toBe(false);
  });

  it('returns 503 when Clerk production keys are misconfigured', async () => {
    vi.stubEnv('NODE_ENV', 'production');
    vi.stubEnv('NEXT_PUBLIC_SITE_URL', 'https://www.healthcalc.xyz');
    vi.stubEnv('NEXT_PUBLIC_CANONICAL_HOST', 'www.healthcalc.xyz');
    vi.stubEnv('SUBMISSIONS_DB_DRIVER', 'postgres');
    vi.stubEnv('DATABASE_URL', 'postgres://user:pass@localhost:5432/db');
    vi.stubEnv('SUBMISSIONS_PERSISTENCE_STRICT', 'true');
    vi.stubEnv('RESEND_API_KEY', 're_test_123');
    vi.stubEnv('RESEND_AUDIENCE_ID', 'aud_123');
    vi.stubEnv('NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY', 'pk_test_demo');
    vi.stubEnv('CLERK_SECRET_KEY', 'sk_test_demo');

    const response = await runHealthCheck();
    const body = await response.json();

    expect(response.status).toBe(503);
    expect(body.ok).toBe(false);
    expect(body.checks.clerkProductionKeysValid).toBe(false);
    expect(body.checks.clerkConfigurationValid).toBe(false);
  });
});
