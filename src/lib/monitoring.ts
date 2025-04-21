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

export function hasConfiguredAnalyticsProvider(): boolean {
  return (
    isGaMeasurementId(process.env.NEXT_PUBLIC_GA_ID) ||
    has(process.env.VERCEL_ENV) ||
    has(process.env.VERCEL)
  );
}
