/**
 * @vitest-environment node
 */
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const TERM = 'zzcanaryterm7q';

describe('server instrumentation', () => {
  const init = vi.fn();
  const captureException = vi.fn();

  beforeEach(() => {
    vi.resetModules();
    vi.unstubAllEnvs();
    init.mockClear();
    captureException.mockClear();
    vi.doMock('@sentry/nextjs', () => ({ init, captureException }));
    vi.stubEnv('SENTRY_DSN', 'https://public@example.ingest.sentry.io/1');
    vi.stubEnv('VERCEL_ENV', 'production');
  });

  afterEach(() => {
    vi.doUnmock('@sentry/nextjs');
    vi.unstubAllEnvs();
  });

  it.each(['nodejs', 'edge'])('scrubs errors and transactions on the %s runtime', async runtime => {
    vi.stubEnv('NEXT_RUNTIME', runtime);

    const { register } = await import('./instrumentation');
    await register();

    const options = init.mock.calls[0][0];
    const event = { request: { url: `https://www.healthcalc.xyz/search?q=${TERM}` } };

    expect(options.dataCollection.urlQueryParams).toBe(false);
    expect(JSON.stringify(options.beforeSend(event, {}))).not.toContain(TERM);
    expect(JSON.stringify(options.beforeSendTransaction(event, {}))).not.toContain(TERM);
  });

  it('reports a request error with the method and path only', async () => {
    const { onRequestError } = await import('./instrumentation');
    const error = new Error('boom');

    await onRequestError(error, { method: 'GET', path: `/search?q=${TERM}` });

    expect(captureException).toHaveBeenCalledWith(error, {
      contexts: { nextjs: { request: { method: 'GET', path: '/search' } } },
    });
  });
});
