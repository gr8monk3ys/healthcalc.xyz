/**
 * @vitest-environment jsdom
 */
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

function flushPromises(): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, 0));
}

describe('client instrumentation in a browser', () => {
  beforeEach(() => {
    vi.resetModules();
    vi.unstubAllEnvs();
    vi.stubEnv('NEXT_PUBLIC_SENTRY_DSN', 'https://public@example.ingest.sentry.io/1');
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.useRealTimers();
  });

  it('defers the SDK import past module evaluation and replays errors thrown before init', async () => {
    vi.useFakeTimers();

    const init = vi.fn();
    const captureException = vi.fn();
    const sentryFactory = vi.fn(() => ({ init, captureException }));
    vi.doMock('@sentry/nextjs', sentryFactory);

    // Keep vitest's own window error listener from treating the probes as
    // uncaught test failures.
    window.addEventListener('error', event => event.preventDefault());

    await import('./instrumentation-client');

    // Module evaluation must not start the download.
    expect(sentryFactory).not.toHaveBeenCalled();

    const early = new Error('before init');
    window.dispatchEvent(new ErrorEvent('error', { error: early }));
    window.dispatchEvent(
      new Event('unhandledrejection') as PromiseRejectionEvent & { reason?: unknown }
    );

    await vi.advanceTimersByTimeAsync(1000);
    await vi.runOnlyPendingTimersAsync();

    expect(sentryFactory).toHaveBeenCalledTimes(1);
    expect(init).toHaveBeenCalledTimes(1);
    expect(captureException).toHaveBeenCalledTimes(2);
    expect(captureException).toHaveBeenCalledWith(
      early,
      expect.objectContaining({ mechanism: { type: 'onerror', handled: false } })
    );

    // Once the SDK owns the global handlers the queue must stop listening,
    // otherwise every error would be reported twice.
    window.dispatchEvent(new ErrorEvent('error', { error: new Error('after init') }));
    vi.useRealTimers();
    await flushPromises();
    expect(captureException).toHaveBeenCalledTimes(2);
  });
});
