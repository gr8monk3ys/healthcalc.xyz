import { isSubmissionPersistenceStrictModeEnabled } from '@/lib/db/submissions';
import { hasConfiguredAnalyticsProvider, hasConfiguredAnySentryDsn } from '@/lib/monitoring';

export interface HealthCalcs {
  siteUrlConfigured: boolean;
  canonicalHostConfigured: boolean;
  persistenceDriverConfigured: boolean;
  persistenceDatabaseConfigured: boolean;
  persistenceStrictModeEnabled: boolean;
  newsletterProviderConfigured: boolean;
  contactProviderConfigured: boolean;
  embedProviderConfigured: boolean;
  clerkKeysPaired: boolean;
  clerkProductionKeysSafe: boolean;
  analyticsConfigured: boolean;
  sentryDsnConfigured: boolean;
  adsenseSlotsConfigured: boolean;
}

function has(value: string | undefined): boolean {
  return Boolean(value?.trim());
}

function hasConfiguredAdSenseSlot(): boolean {
  return (
    has(process.env.NEXT_PUBLIC_ADSENSE_SLOT_CONTENT) ||
    has(process.env.NEXT_PUBLIC_ADSENSE_SLOT_RESULT) ||
    has(process.env.NEXT_PUBLIC_ADSENSE_SLOT_SIDEBAR) ||
    has(process.env.NEXT_PUBLIC_ADSENSE_SLOT_RESPONSIVE)
  );
}

export function createHealthCalcs(): HealthCalcs {
  const hasMailchimp = has(process.env.MAILCHIMP_API_KEY) && has(process.env.MAILCHIMP_AUDIENCE_ID);
  const hasConvertKit = has(process.env.CONVERTKIT_API_KEY) && has(process.env.CONVERTKIT_FORM_ID);
  const hasResendAudience = has(process.env.RESEND_API_KEY) && has(process.env.RESEND_AUDIENCE_ID);
  const hasResend = has(process.env.RESEND_API_KEY);
  const hasPostgres = has(process.env.DATABASE_URL) || has(process.env.SUBMISSIONS_POSTGRES_URL);
  const dbDriver = (process.env.SUBMISSIONS_DB_DRIVER ?? '').trim().toLowerCase();
  const clerkPublishable = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY?.trim();
  const clerkSecret = process.env.CLERK_SECRET_KEY?.trim();
  const hasClerkPublishable = has(clerkPublishable);
  const hasClerkSecret = has(clerkSecret);
  const isProductionRuntime =
    (process.env.VERCEL_ENV ?? process.env.NODE_ENV ?? '').trim().toLowerCase() === 'production';
  const clerkUsingTestKeys =
    (clerkPublishable?.startsWith('pk_test_') ?? false) ||
    (clerkSecret?.startsWith('sk_test_') ?? false);

  return {
    siteUrlConfigured: has(process.env.NEXT_PUBLIC_SITE_URL),
    canonicalHostConfigured: has(process.env.NEXT_PUBLIC_CANONICAL_HOST),
    persistenceDriverConfigured: dbDriver === 'postgres' || dbDriver === 'sqlite',
    persistenceDatabaseConfigured: dbDriver === 'sqlite' || hasPostgres,
    persistenceStrictModeEnabled: isSubmissionPersistenceStrictModeEnabled(),
    newsletterProviderConfigured: hasMailchimp || hasConvertKit || hasResendAudience,
    contactProviderConfigured: hasResend,
    embedProviderConfigured: hasConvertKit,
    clerkKeysPaired: hasClerkPublishable === hasClerkSecret,
    clerkProductionKeysSafe: !isProductionRuntime || !clerkUsingTestKeys,
    analyticsConfigured: hasConfiguredAnalyticsProvider(),
    sentryDsnConfigured: hasConfiguredAnySentryDsn(),
    adsenseSlotsConfigured: hasConfiguredAdSenseSlot(),
  };
}

export function createWarnings(checks: HealthCalcs): string[] {
  const warnings: string[] = [];

  if (!checks.analyticsConfigured) {
    warnings.push('No analytics provider is configured.');
  }
  if (!checks.sentryDsnConfigured) {
    warnings.push('Sentry DSN is not configured. Browser errors fall back to server logs.');
  }
  if (!checks.adsenseSlotsConfigured) {
    warnings.push('AdSense slots are not configured.');
  }
  if (!checks.clerkKeysPaired) {
    warnings.push('Clerk keys are partially configured.');
  }
  if (!checks.clerkProductionKeysSafe) {
    warnings.push('Clerk test keys are configured in production.');
  }

  return warnings;
}

export function isHealthy(checks: HealthCalcs): boolean {
  return (
    checks.siteUrlConfigured &&
    checks.canonicalHostConfigured &&
    checks.persistenceDriverConfigured &&
    checks.persistenceDatabaseConfigured &&
    checks.newsletterProviderConfigured &&
    checks.contactProviderConfigured &&
    checks.clerkKeysPaired &&
    checks.clerkProductionKeysSafe
  );
}
