/**
 * @vitest-environment node
 */
import { afterEach, describe, expect, it, vi } from 'vitest';

import {
  hasConfiguredAnySentryDsn,
  hasConfiguredBrowserSentryDsn,
  isDeployedSentryEnvironment,
  sentryEnvironment,
  sentryEnvironmentTag,
  shouldReportToSentry,
} from './monitoring';

const DSN = 'https://public@example.ingest.sentry.io/1';

function setVercelEnv(value: string | undefined): void {
  // Both spellings: the browser bundle reads the NEXT_PUBLIC_ alias, the
  // server reads the raw one.
  vi.stubEnv('NEXT_PUBLIC_VERCEL_ENV', value as string);
  vi.stubEnv('VERCEL_ENV', value as string);
}

afterEach(() => {
  vi.unstubAllEnvs();
});

describe('the Sentry deployment gate', () => {
  it('stays shut on a local production build', () => {
    // `next build && next start` on a laptop: NODE_ENV is 'production', so
    // every NODE_ENV-based guard passes, and there is no VERCEL_ENV. This is
    // the traffic that exhausted the shared org error quota.
    setVercelEnv(undefined);
    vi.stubEnv('NODE_ENV', 'production');

    expect(isDeployedSentryEnvironment()).toBe(false);
    expect(shouldReportToSentry(DSN)).toBe(false);
  });

  it('stays shut in local development', () => {
    setVercelEnv(undefined);
    vi.stubEnv('NODE_ENV', 'development');

    expect(shouldReportToSentry(DSN)).toBe(false);
  });

  it("stays shut for Vercel's own development environment", () => {
    // `vercel dev` sets VERCEL_ENV=development — still a laptop.
    setVercelEnv('development');

    expect(shouldReportToSentry(DSN)).toBe(false);
  });

  it('opens on a production deploy', () => {
    setVercelEnv('production');

    expect(shouldReportToSentry(DSN)).toBe(true);
    expect(sentryEnvironment()).toBe('production');
    expect(sentryEnvironmentTag()).toBe('production');
  });

  it('opens on a preview deploy, tagged apart from production', () => {
    setVercelEnv('preview');

    expect(shouldReportToSentry(DSN)).toBe(true);
    expect(sentryEnvironmentTag()).toBe('preview');
  });

  it('stays shut without a DSN, deployed or not', () => {
    setVercelEnv('production');

    expect(shouldReportToSentry(undefined)).toBe(false);
    expect(shouldReportToSentry('   ')).toBe(false);
  });

  it('can be forced on locally, and forced off on a deploy', () => {
    setVercelEnv(undefined);
    vi.stubEnv('NEXT_PUBLIC_SENTRY_FORCE_ENABLE', '1');
    expect(shouldReportToSentry(DSN)).toBe(true);

    setVercelEnv('production');
    vi.stubEnv('NEXT_PUBLIC_SENTRY_FORCE_DISABLE', '1');
    expect(shouldReportToSentry(DSN)).toBe(false);
  });

  it('falls back to NODE_ENV for the tag only when forced on locally', () => {
    setVercelEnv(undefined);
    vi.stubEnv('NODE_ENV', 'production');

    expect(sentryEnvironment()).toBe('');
    expect(sentryEnvironmentTag()).toBe('production');
  });
});

describe('DSN configuration helpers', () => {
  it('reports which DSNs are configured, independently of the gate', () => {
    vi.stubEnv('NEXT_PUBLIC_SENTRY_DSN', '');
    vi.stubEnv('SENTRY_DSN', '');
    expect(hasConfiguredBrowserSentryDsn()).toBe(false);
    expect(hasConfiguredAnySentryDsn()).toBe(false);

    vi.stubEnv('SENTRY_DSN', DSN);
    expect(hasConfiguredBrowserSentryDsn()).toBe(false);
    expect(hasConfiguredAnySentryDsn()).toBe(true);

    vi.stubEnv('NEXT_PUBLIC_SENTRY_DSN', DSN);
    expect(hasConfiguredBrowserSentryDsn()).toBe(true);
  });
});
