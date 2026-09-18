function has(value: string | undefined): boolean {
  return Boolean(value?.trim());
}

function isGaMeasurementId(value: string | undefined): boolean {
  if (!value) return false;
  return /^G-[A-Z0-9]+$/i.test(value.trim());
}

export function hasConfiguredBrowserSentryDsn(): boolean {
  return has(process.env.NEXT_PUBLIC_SENTRY_DSN);
}

export function hasConfiguredAnySentryDsn(): boolean {
  return hasConfiguredBrowserSentryDsn() || has(process.env.SENTRY_DSN);
}

/**
 * Where Sentry is allowed to report from.
 *
 * The `vivance` Sentry org shares ONE error quota across all nine projects and
 * that quota is exhausted: since 2026-09-13 every error envelope comes back
 * `429 error_usage_exceeded`, so nothing in the fleet can report. Of the 8,432
 * error events in the 30 days before that, 3,060 — 36% — carried
 * `environment:development`: laptop runs filing into the production quota.
 * Per-DSN rate limits are not available on this plan, so this gate is the only
 * control there is.
 *
 * `VERCEL_ENV` is "production" | "preview" | "development" on Vercel and
 * UNDEFINED anywhere else — including `next dev` AND a local
 * `next build && next start`. `NODE_ENV` cannot make this distinction: it is
 * "production" for a local production build, which is why the existing
 * `NODE_ENV === 'development'` guards never caught that case.
 *
 * Escape hatches, both opt-in:
 *   NEXT_PUBLIC_SENTRY_FORCE_ENABLE=1   report from a local build on purpose
 *   NEXT_PUBLIC_SENTRY_FORCE_DISABLE=1  silence a deployed environment
 */
export function sentryEnvironment(): string {
  return (process.env.NEXT_PUBLIC_VERCEL_ENV ?? process.env.VERCEL_ENV ?? '').trim();
}

/** The value events are tagged with, so production and preview stay apart. */
export function sentryEnvironmentTag(): string {
  return sentryEnvironment() || process.env.NODE_ENV || 'development';
}

/** True only on a deployed Vercel app (or when deliberately forced on). */
export function isDeployedSentryEnvironment(): boolean {
  if (process.env.NEXT_PUBLIC_SENTRY_FORCE_DISABLE === '1') return false;
  if (process.env.NEXT_PUBLIC_SENTRY_FORCE_ENABLE === '1') return true;

  const environment = sentryEnvironment();
  return environment === 'production' || environment === 'preview';
}

/** A DSN is necessary but not sufficient: the app also has to be deployed. */
export function shouldReportToSentry(dsn: string | undefined): boolean {
  return has(dsn) && isDeployedSentryEnvironment();
}

export function hasConfiguredAnalyticsProvider(): boolean {
  return (
    isGaMeasurementId(process.env.NEXT_PUBLIC_GA_ID) ||
    has(process.env.VERCEL_ENV) ||
    has(process.env.VERCEL)
  );
}
