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

  it('initializes browser Sentry once when the public DSN is configured', async () => {
    vi.stubEnv('NEXT_PUBLIC_SENTRY_DSN', 'https://public@example.ingest.sentry.io/1');

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
        environment: 'test',
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
});
