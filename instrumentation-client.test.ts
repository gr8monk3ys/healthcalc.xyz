/**
 * @vitest-environment node
 */
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

function flushPromises(): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, 0));
}

describe('client instrumentation', () => {
  beforeEach(() => {
    vi.resetModules();
    vi.unstubAllEnvs();
  });

  afterEach(() => {
    vi.unmock('@sentry/nextjs');
    vi.unstubAllEnvs();
  });

  it('skips browser Sentry when the public DSN is absent', async () => {
    const init = vi.fn();
    const captureRouterTransitionStart = vi.fn();
    const sentryFactory = vi.fn(() => ({
      init,
      captureRouterTransitionStart,
    }));

    vi.doMock('@sentry/nextjs', sentryFactory);

    const instrumentationClient = await import('./instrumentation-client');
    await instrumentationClient.registerBrowserSentry();

    instrumentationClient.onRouterTransitionStart('/bmi');
    await flushPromises();

    expect(instrumentationClient.shouldEnableBrowserSentry()).toBe(false);
    expect(sentryFactory).not.toHaveBeenCalled();
    expect(init).not.toHaveBeenCalled();
    expect(captureRouterTransitionStart).not.toHaveBeenCalled();
  });

  it('skips browser Sentry on a local production build, DSN or not', async () => {
    // The case that exhausted the shared org error quota: `next build &&
    // next start` on a laptop has NODE_ENV 'production' and no VERCEL_ENV, so
    // every NODE_ENV-based guard in this file used to pass.
    vi.stubEnv('NEXT_PUBLIC_SENTRY_DSN', 'https://public@example.ingest.sentry.io/1');
    vi.stubEnv('NODE_ENV', 'production');

    const init = vi.fn();
    const sentryFactory = vi.fn(() => ({ init, captureRouterTransitionStart: vi.fn() }));
    vi.doMock('@sentry/nextjs', sentryFactory);

    const instrumentationClient = await import('./instrumentation-client');
    await instrumentationClient.registerBrowserSentry();

    expect(instrumentationClient.shouldEnableBrowserSentry()).toBe(false);
    expect(sentryFactory).not.toHaveBeenCalled();
    expect(init).not.toHaveBeenCalled();
  });

  it('initializes browser Sentry once on a deployed environment', async () => {
    vi.stubEnv('NEXT_PUBLIC_SENTRY_DSN', 'https://public@example.ingest.sentry.io/1');
    vi.stubEnv('NEXT_PUBLIC_VERCEL_ENV', 'production');

    const init = vi.fn();
    const captureRouterTransitionStart = vi.fn();
    const sentryFactory = vi.fn(() => ({
      init,
      captureRouterTransitionStart,
    }));

    vi.doMock('@sentry/nextjs', sentryFactory);

    const instrumentationClient = await import('./instrumentation-client');
    await instrumentationClient.registerBrowserSentry();

    expect(instrumentationClient.shouldEnableBrowserSentry()).toBe(true);
    expect(sentryFactory).toHaveBeenCalledTimes(1);
    expect(init).toHaveBeenCalledTimes(1);
    expect(init).toHaveBeenCalledWith(
      expect.objectContaining({
        dsn: 'https://public@example.ingest.sentry.io/1',
        debug: false,
        environment: 'production',
        tracesSampleRate: 1,
      })
    );

    await instrumentationClient.registerBrowserSentry();
    expect(init).toHaveBeenCalledTimes(1);

    instrumentationClient.onRouterTransitionStart('/body-fat');
    await flushPromises();

    expect(captureRouterTransitionStart).toHaveBeenCalledTimes(1);
    expect(captureRouterTransitionStart).toHaveBeenCalledWith('/body-fat');
  });

  it('initializes on a preview deploy, tagged apart from production', async () => {
    vi.stubEnv('NEXT_PUBLIC_SENTRY_DSN', 'https://public@example.ingest.sentry.io/1');
    vi.stubEnv('NEXT_PUBLIC_VERCEL_ENV', 'preview');

    const init = vi.fn();
    vi.doMock('@sentry/nextjs', () => ({ init, captureRouterTransitionStart: vi.fn() }));

    const instrumentationClient = await import('./instrumentation-client');
    await instrumentationClient.registerBrowserSentry();

    expect(instrumentationClient.shouldEnableBrowserSentry()).toBe(true);
    expect(init).toHaveBeenCalledWith(expect.objectContaining({ environment: 'preview' }));
  });

  it('can be forced on locally for deliberate testing', async () => {
    vi.stubEnv('NEXT_PUBLIC_SENTRY_DSN', 'https://public@example.ingest.sentry.io/1');
    vi.stubEnv('NEXT_PUBLIC_SENTRY_FORCE_ENABLE', '1');

    const init = vi.fn();
    vi.doMock('@sentry/nextjs', () => ({ init, captureRouterTransitionStart: vi.fn() }));

    const instrumentationClient = await import('./instrumentation-client');
    await instrumentationClient.registerBrowserSentry();

    expect(instrumentationClient.shouldEnableBrowserSentry()).toBe(true);
    expect(init).toHaveBeenCalledTimes(1);
  });

  it('can be forced off on a deploy, which beats everything else', async () => {
    vi.stubEnv('NEXT_PUBLIC_SENTRY_DSN', 'https://public@example.ingest.sentry.io/1');
    vi.stubEnv('NEXT_PUBLIC_VERCEL_ENV', 'production');
    vi.stubEnv('NEXT_PUBLIC_SENTRY_FORCE_ENABLE', '1');
    vi.stubEnv('NEXT_PUBLIC_SENTRY_FORCE_DISABLE', '1');

    const init = vi.fn();
    vi.doMock('@sentry/nextjs', () => ({ init, captureRouterTransitionStart: vi.fn() }));

    const instrumentationClient = await import('./instrumentation-client');
    await instrumentationClient.registerBrowserSentry();

    expect(instrumentationClient.shouldEnableBrowserSentry()).toBe(false);
    expect(init).not.toHaveBeenCalled();
  });
});
