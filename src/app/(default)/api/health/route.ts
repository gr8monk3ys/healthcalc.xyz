import { NextResponse } from 'next/server';
import { isSubmissionPersistenceStrictModeEnabled } from '@/lib/db/submissions';

interface HealthChecks {
  siteUrlConfigured: boolean;
  canonicalHostConfigured: boolean;
  persistenceDriverConfigured: boolean;
  persistenceDatabaseConfigured: boolean;
  persistenceStrictModeEnabled: boolean;
  newsletterProviderConfigured: boolean;
  contactProviderConfigured: boolean;
  embedProviderConfigured: boolean;
  analyticsConfigured: boolean;
  sentryDsnConfigured: boolean;
  adsenseSlotsConfigured: boolean;
}

function has(value: string | undefined): boolean {
  return Boolean(value?.trim());
}

function isGaMeasurementId(value: string | undefined): boolean {
  if (!value) return false;
  return /^G-[A-Z0-9]+$/i.test(value.trim());
}

function hasConfiguredAdSenseSlot(): boolean {
  return (
    has(process.env.NEXT_PUBLIC_ADSENSE_SLOT_CONTENT) ||
    has(process.env.NEXT_PUBLIC_ADSENSE_SLOT_RESULT) ||
    has(process.env.NEXT_PUBLIC_ADSENSE_SLOT_SIDEBAR) ||
    has(process.env.NEXT_PUBLIC_ADSENSE_SLOT_RESPONSIVE)
  );
}

function createHealthChecks(): HealthChecks {
  const hasMailchimp = has(process.env.MAILCHIMP_API_KEY) && has(process.env.MAILCHIMP_AUDIENCE_ID);
  const hasConvertKit = has(process.env.CONVERTKIT_API_KEY) && has(process.env.CONVERTKIT_FORM_ID);
  const hasResendAudience = has(process.env.RESEND_API_KEY) && has(process.env.RESEND_AUDIENCE_ID);
  const hasResend = has(process.env.RESEND_API_KEY);
  const hasPostgres = has(process.env.DATABASE_URL) || has(process.env.SUBMISSIONS_POSTGRES_URL);
  const dbDriver = (process.env.SUBMISSIONS_DB_DRIVER ?? '').trim().toLowerCase();

  return {
    siteUrlConfigured: has(process.env.NEXT_PUBLIC_SITE_URL),
    canonicalHostConfigured: has(process.env.NEXT_PUBLIC_CANONICAL_HOST),
    persistenceDriverConfigured: dbDriver === 'postgres' || dbDriver === 'sqlite',
    persistenceDatabaseConfigured: dbDriver === 'sqlite' || hasPostgres,
    persistenceStrictModeEnabled: isSubmissionPersistenceStrictModeEnabled(),
    newsletterProviderConfigured: hasMailchimp || hasConvertKit || hasResendAudience,
    contactProviderConfigured: hasResend,
    embedProviderConfigured: hasConvertKit,
    analyticsConfigured: isGaMeasurementId(process.env.NEXT_PUBLIC_GA_ID),
    sentryDsnConfigured: has(process.env.NEXT_PUBLIC_SENTRY_DSN),
    adsenseSlotsConfigured: hasConfiguredAdSenseSlot(),
  };
}

function createWarnings(checks: HealthChecks): string[] {
  const warnings: string[] = [];

  if (!checks.analyticsConfigured) {
    warnings.push('Google Analytics is not configured.');
  }
  if (!checks.sentryDsnConfigured) {
    warnings.push('Sentry browser DSN is not configured.');
  }
  if (!checks.adsenseSlotsConfigured) {
    warnings.push('AdSense slots are not configured.');
  }

  return warnings;
}

function isHealthy(checks: HealthChecks): boolean {
  return (
    checks.siteUrlConfigured &&
    checks.canonicalHostConfigured &&
    checks.persistenceDriverConfigured &&
    checks.persistenceDatabaseConfigured &&
    checks.newsletterProviderConfigured &&
    checks.contactProviderConfigured
  );
}

export async function GET(): Promise<NextResponse> {
  const checks = createHealthChecks();
  const warnings = createWarnings(checks);
  const ok = isHealthy(checks);

  // Log detailed health state for internal monitoring; never expose to caller.
  if (warnings.length > 0 || !ok) {
    console.warn('[health]', { ok, checks, warnings });
  }

  return NextResponse.json(
    { status: ok ? 'ok' : 'degraded', timestamp: new Date().toISOString() },
    { status: ok ? 200 : 503, headers: { 'Cache-Control': 'no-store' } }
  );
}
