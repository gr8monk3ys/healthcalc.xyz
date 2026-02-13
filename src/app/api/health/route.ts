import { NextResponse } from 'next/server';
import { getPublicSiteUrl, getPublicSiteHost } from '@/lib/site';
import { isSubmissionPersistenceStrictModeEnabled } from '@/lib/db/submissions';
import { getClerkEnvState } from '@/utils/auth';

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
  clerkPublishableKeyConfigured: boolean;
  clerkSecretKeyConfigured: boolean;
  clerkProductionKeysValid: boolean;
  clerkConfigurationValid: boolean;
}

interface HealthResponse {
  ok: boolean;
  timestamp: string;
  environment: string;
  checks: HealthChecks;
  warnings: string[];
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
  const clerkState = getClerkEnvState();
  const clerkConfigurationValid =
    (!clerkState.publishableKeyConfigured && !clerkState.secretKeyConfigured) ||
    (clerkState.publishableKeyConfigured &&
      clerkState.secretKeyConfigured &&
      clerkState.productionKeysValid);

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
    clerkPublishableKeyConfigured: clerkState.publishableKeyConfigured,
    clerkSecretKeyConfigured: clerkState.secretKeyConfigured,
    clerkProductionKeysValid: clerkState.productionKeysValid,
    clerkConfigurationValid,
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
  if (checks.clerkPublishableKeyConfigured && !checks.clerkSecretKeyConfigured) {
    warnings.push('Clerk publishable key is set but CLERK_SECRET_KEY is missing.');
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
    checks.contactProviderConfigured &&
    checks.clerkConfigurationValid
  );
}

export async function GET(): Promise<NextResponse<HealthResponse>> {
  const checks = createHealthChecks();
  const warnings = createWarnings(checks);
  const ok = isHealthy(checks);
  const payload: HealthResponse = {
    ok,
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'unknown',
    checks,
    warnings,
  };

  return NextResponse.json(payload, {
    status: ok ? 200 : 503,
    headers: {
      'Cache-Control': 'no-store',
      'X-Health-Host': getPublicSiteHost(),
      'X-Health-Site-Url': getPublicSiteUrl(),
    },
  });
}
