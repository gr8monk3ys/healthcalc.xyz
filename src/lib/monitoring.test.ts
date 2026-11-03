/**
 * @vitest-environment node
 */
import { afterEach, describe, expect, it, vi } from 'vitest';

import {
  hasConfiguredAnySentryDsn,
  hasConfiguredBrowserSentryDsn,
  isDeployedSentryEnvironment,
  scrubSentryEvent,
  sentryDataCollection,
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

describe('scrubSentryEvent', () => {
  // A made-up result: age 37, female, 171 cm, 68 kg.
  const TOKEN = Buffer.from(
    JSON.stringify({
      v: 1,
      c: 'bmi',
      i: { age: 37, gender: 'female', heightCm: 171, weightKg: 68 },
    })
  ).toString('base64url');
  const TERM = 'zzcanaryterm7q';
  const URL_WITH_BOTH = `https://www.healthcalc.xyz/bmi?r=${TOKEN}&q=${TERM}`;

  function expectClean(value: unknown): void {
    const text = JSON.stringify(value);
    expect(text).not.toContain(TOKEN);
    expect(text).not.toContain(TOKEN.slice(0, 16));
    expect(text).not.toContain(TERM);
  }

  it('turns off query strings in everything the SDK collects', () => {
    expect(sentryDataCollection.urlQueryParams).toBe(false);
  });

  // Every field a local production build was seen sending these values in, plus
  // the shapes the regex has to handle.
  it.each([
    ['full URL', URL_WITH_BOTH],
    ['relative URL', `/bmi?r=${TOKEN}&q=${TERM}`],
    ['term after another param', `/search?page=2&q=${TERM}`],
    ['query string with no leading ?', `r=${TOKEN}&q=${TERM}`],
    ['term with the RSC param after it', `q=${TERM}&_rsc=abc123`],
    ['text around a URL', `could not load page ${URL_WITH_BOTH} (retrying)`],
    ['quoted in text', `fetch to "/search?q=${TERM}" failed`],
    ['percent-encoded URL', encodeURIComponent(URL_WITH_BOTH)],
    ['double-encoded URL', encodeURIComponent(encodeURIComponent(URL_WITH_BOTH))],
    ['HTML-escaped ampersand', `/x?a=1&amp;q=${TERM}`],
    ['bare token', `bad share token ${TOKEN}`],
  ])('redacts %s', (_name, text) => {
    expectClean(scrubSentryEvent({ message: text }));
  });

  it('reaches every part of an error event', () => {
    const scrubbed = scrubSentryEvent({
      message: URL_WITH_BOTH,
      request: {
        url: URL_WITH_BOTH,
        query_string: `r=${TOKEN}&q=${TERM}`,
        headers: { Referer: URL_WITH_BOTH, referer: URL_WITH_BOTH },
      },
      exception: {
        values: [
          {
            value: `Failed for ${URL_WITH_BOTH}`,
            stacktrace: { frames: [{ filename: URL_WITH_BOTH, abs_path: URL_WITH_BOTH }] },
          },
        ],
      },
      breadcrumbs: [
        {
          category: 'console',
          message: `page is ${URL_WITH_BOTH}`,
          data: { arguments: [URL_WITH_BOTH] },
        },
        { category: 'fetch', data: { url: `/bmi?r=${TOKEN}` } },
        { category: 'navigation', data: { from: `/bmi?r=${TOKEN}`, to: `/search?q=${TERM}` } },
      ],
      contexts: { nextjs: { request: { path: `/bmi?r=${TOKEN}` } } },
      extra: { errorMessage: URL_WITH_BOTH },
    });

    expectClean(scrubbed);
  });

  it('reaches every part of a transaction', () => {
    const scrubbed = scrubSentryEvent({
      type: 'transaction',
      transaction: '/bmi',
      request: { url: URL_WITH_BOTH, headers: { Referer: URL_WITH_BOTH } },
      contexts: {
        trace: {
          data: {
            'url.full': URL_WITH_BOTH,
            'http.target': `/bmi?r=${TOKEN}&q=${TERM}`,
            'http.request.header.referer': [URL_WITH_BOTH],
          },
        },
      },
      spans: [
        {
          description: URL_WITH_BOTH,
          data: { 'url.full': URL_WITH_BOTH, 'url.query': `q=${TERM}&_rsc=abc123` },
        },
      ],
    });

    expectClean(scrubbed);
  });

  it('leaves what is needed to debug alone', () => {
    const event = {
      transaction: '/bmi',
      request: { url: 'https://www.healthcalc.xyz/bmi' },
      exception: {
        values: [{ type: 'TypeError', value: 'for=1 query=2 ref=3 x is not a function' }],
      },
      tags: { 'submissions.driver': 'postgres' },
      extra: { count: 3, ok: true, none: null },
      timestamp: 1798761600.25,
    };

    expect(scrubSentryEvent(event)).toEqual(event);
  });

  it('does not change the event it was given', () => {
    const event = { request: { url: URL_WITH_BOTH } };

    const scrubbed = scrubSentryEvent(event);

    expect(event.request.url).toBe(URL_WITH_BOTH);
    expect(scrubbed.request.url).toBe('https://www.healthcalc.xyz/bmi?r=[Filtered]&q=[Filtered]');
  });

  it('survives a circular reference', () => {
    const event: Record<string, unknown> = { message: URL_WITH_BOTH };
    event.self = event;

    const scrubbed = scrubSentryEvent(event);

    expect(scrubbed.self).toBe(scrubbed);
    expect(scrubbed.message).not.toContain(TOKEN);
  });

  it('passes SDK bookkeeping and class instances through untouched', () => {
    class LiveScope {
      url = URL_WITH_BOTH;
    }
    const scope = new LiveScope();
    const metadata = { capturedSpanScope: scope, note: URL_WITH_BOTH };

    const scrubbed = scrubSentryEvent({ sdkProcessingMetadata: metadata, extra: { scope } });

    expect(scrubbed.sdkProcessingMetadata).toBe(metadata);
    expect(scrubbed.extra.scope).toBe(scope);
  });
});
