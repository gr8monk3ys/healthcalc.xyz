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

/**
 * What Sentry may attach to an event, pinned to the v10 defaults.
 *
 * @sentry/nextjs 11 replaced `sendDefaultPii` with `dataCollection` and made
 * the unset default permissive: user IP, cookies, unscrubbed headers and full
 * request/response bodies. On a health calculator those bodies and query
 * strings are people's measurements, so every `init` passes this explicitly
 * instead of inheriting the new default.
 *
 * `urlQueryParams` is off rather than a deny list: a shared result's `?r=` token
 * encodes age, sex, height and weight, `?q=` is typed search text, and deny terms
 * match by substring, so denying `r` would mean every key containing an r.
 */
const SENTRY_PII_KEY_DENYLIST = ['forwarded', '-ip', 'remote-', 'via', '-user'];

export const sentryDataCollection = {
  userInfo: false,
  cookies: false,
  httpHeaders: {
    request: { deny: SENTRY_PII_KEY_DENYLIST },
    response: { deny: SENTRY_PII_KEY_DENYLIST },
  },
  httpBodies: [],
  urlQueryParams: false,
  genAI: { inputs: false, outputs: false },
  databaseQueryData: false,
  queues: false,
  graphQL: { document: false, variables: false },
};

const FILTERED = '[Filtered]';
// `r=` and `q=` anywhere in a string, also when the URL around them is percent-encoded.
const SENSITIVE_QUERY_PARAM = /(%(?:25)*(?:3F|26)|\b)(r|q)(%(?:25)*3D|=)[^&#\s"'<>]*/gi;
// A result token with no `r=` in front of it: base64url JSON always starts `eyJ`.
const BARE_RESULT_TOKEN = /\beyJ[\w-]{16,}/g;

function scrubText(text: string): string {
  return text
    .replace(SENSITIVE_QUERY_PARAM, `$1$2$3${FILTERED}`)
    .replace(BARE_RESULT_TOKEN, FILTERED);
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  if (typeof value !== 'object' || value === null) return false;
  const prototype = Object.getPrototypeOf(value);
  return prototype === Object.prototype || prototype === null;
}

function scrubValue(value: unknown, seen: WeakMap<object, unknown>): unknown {
  if (typeof value === 'string') return scrubText(value);

  if (Array.isArray(value)) {
    if (seen.has(value)) return seen.get(value);
    const copy: unknown[] = [];
    seen.set(value, copy);
    for (const item of value) copy.push(scrubValue(item, seen));
    return copy;
  }

  if (isPlainObject(value)) {
    if (seen.has(value)) return seen.get(value);
    const copy: Record<string, unknown> = {};
    seen.set(value, copy);
    for (const [key, item] of Object.entries(value)) {
      // SDK bookkeeping, never sent: it holds live scopes and is read back after this hook.
      copy[key] = key === 'sdkProcessingMetadata' ? item : scrubValue(item, seen);
    }
    return copy;
  }

  return value;
}

/**
 * `urlQueryParams: false` covers the URLs the SDK collects itself. It does not
 * reach free text (exception messages, console breadcrumbs) or what the server
 * copies raw (`http.target`, the `referer` header), so every string in an outgoing
 * event goes through here. Use as both `beforeSend` and `beforeSendTransaction`:
 * `beforeSend` never sees transactions.
 */
export function scrubSentryEvent<T>(event: T): T {
  return scrubValue(event, new WeakMap()) as T;
}

/**
 * Whether this visitor said yes to analytics in the cookie banner. Performance
 * traces record how someone moves through the site, so they wait for that yes;
 * error reports do not. Reads what CookieConsent stores, because instrumentation
 * runs outside React and must not pull the banner into its bundle.
 */
export function hasAnalyticsConsent(): boolean {
  try {
    const stored = window.localStorage.getItem('cookie-consent');
    return stored !== null && JSON.parse(stored)?.analytics === true;
  } catch {
    return false;
  }
}

/**
 * v11 streams spans by default, which lifts the per-transaction span cap.
 * The org quota is shared and already exhausted (see above), so keep the
 * transaction model until someone decides to spend more on tracing.
 */
export const sentryTraceLifecycle = 'static' as const;

export function hasConfiguredAnalyticsProvider(): boolean {
  return (
    isGaMeasurementId(process.env.NEXT_PUBLIC_GA_ID) ||
    has(process.env.VERCEL_ENV) ||
    has(process.env.VERCEL)
  );
}
