import { sentryEnvironmentTag, shouldReportToSentry } from '@/lib/monitoring';

type BrowserSentryModule = typeof import('@sentry/nextjs');

type QueuedError = {
  error: unknown;
  mechanism: 'onerror' | 'onunhandledrejection';
};

const BROWSER_SENTRY_DSN = process.env.NEXT_PUBLIC_SENTRY_DSN?.trim();

// Errors raised before the SDK has loaded. Bounded so a tight error loop on a
// page where the SDK never arrives cannot grow memory without limit.
const PRE_INIT_ERROR_LIMIT = 20;
const preInitErrors: QueuedError[] = [];

let browserSentryPromise: Promise<BrowserSentryModule | null> | null = null;

/**
 * A DSN alone is not enough: the app also has to be a deployed Vercel app.
 *
 * The `beforeSend` below returned null when NODE_ENV was 'development', which
 * covered `next dev` and nothing else — a local `next build && next start`
 * runs with NODE_ENV 'production', so it initialised, sent, and spent the
 * shared org error quota like a real deploy. See src/lib/monitoring.ts for the
 * rule and its escape hatches.
 */
export function shouldEnableBrowserSentry(): boolean {
  return shouldReportToSentry(BROWSER_SENTRY_DSN);
}

function queueError(event: ErrorEvent): void {
  if (preInitErrors.length >= PRE_INIT_ERROR_LIMIT) return;
  preInitErrors.push({ error: event.error ?? event.message, mechanism: 'onerror' });
}

function queueRejection(event: PromiseRejectionEvent): void {
  if (preInitErrors.length >= PRE_INIT_ERROR_LIMIT) return;
  preInitErrors.push({ error: event.reason, mechanism: 'onunhandledrejection' });
}

function flushPreInitErrors(Sentry: BrowserSentryModule): void {
  if (typeof window !== 'undefined') {
    window.removeEventListener('error', queueError);
    window.removeEventListener('unhandledrejection', queueRejection);
  }

  for (const { error, mechanism } of preInitErrors.splice(0)) {
    Sentry.captureException(error, { mechanism: { type: mechanism, handled: false } });
  }
}

function getBrowserSentryModule(): Promise<BrowserSentryModule | null> {
  if (!shouldEnableBrowserSentry()) {
    return Promise.resolve(null);
  }

  if (!browserSentryPromise) {
    // `webpackExports` lets webpack drop the exports this file never touches
    // (Session Replay, replay-canvas, user feedback). Without it the whole
    // namespace is kept alive and Replay alone is ~50 KB gzipped of unused JS.
    browserSentryPromise = import(
      /* webpackExports: ["init", "captureException", "captureRouterTransitionStart"] */
      '@sentry/nextjs'
    )
      .then(Sentry => {
        Sentry.init({
          dsn: BROWSER_SENTRY_DSN,
          tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,
          debug: false,
          // 'production' or 'preview' from Vercel, so the two deployed
          // environments stay distinguishable in the issue stream.
          environment: sentryEnvironmentTag(),
          ignoreErrors: [
            'Script error',
            'Script error.',
            'NetworkError',
            'Network request failed',
            'Failed to fetch',
            'Load failed',
            'ChunkLoadError',
            'Loading chunk',
            'Loading CSS chunk',
          ],
          beforeSend(event) {
            if (
              process.env.NODE_ENV === 'development' &&
              !process.env.NEXT_PUBLIC_SENTRY_DEV_ENABLED &&
              process.env.NEXT_PUBLIC_SENTRY_FORCE_ENABLE !== '1'
            ) {
              return null;
            }

            return event;
          },
        });

        flushPreInitErrors(Sentry);

        return Sentry;
      })
      .catch(() => null);
  }

  return browserSentryPromise;
}

export async function registerBrowserSentry(): Promise<BrowserSentryModule | null> {
  return getBrowserSentryModule();
}

/**
 * Load the SDK after the page has painted and the main thread is idle.
 *
 * The browser SDK is ~150 KB gzipped and nothing on the page depends on it
 * being present at first render; firing the import at module evaluation put
 * its download and parse on the critical path of every route. Errors thrown in
 * the gap are captured by the queue above and replayed once `init` has run.
 */
export function scheduleBrowserSentry(): void {
  if (typeof window === 'undefined' || !shouldEnableBrowserSentry()) return;

  window.addEventListener('error', queueError);
  window.addEventListener('unhandledrejection', queueRejection);

  const start = (): void => {
    void registerBrowserSentry();
  };
  const whenIdle = (): void => {
    if (typeof window.requestIdleCallback === 'function') {
      window.requestIdleCallback(start, { timeout: 5000 });
    } else {
      window.setTimeout(start, 1000);
    }
  };

  if (document.readyState === 'complete') {
    whenIdle();
  } else {
    window.addEventListener('load', whenIdle, { once: true });
  }
}

scheduleBrowserSentry();

export function onRouterTransitionStart(...args: unknown[]): void {
  void registerBrowserSentry().then(Sentry => {
    if (!Sentry) {
      return;
    }

    const captureRouterTransitionStart = Sentry.captureRouterTransitionStart as
      ((...params: unknown[]) => void) | undefined;

    captureRouterTransitionStart?.(...args);
  });
}
