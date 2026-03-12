type BrowserSentryModule = typeof import('@sentry/nextjs');

const BROWSER_SENTRY_DSN = process.env.NEXT_PUBLIC_SENTRY_DSN?.trim();

let browserSentryPromise: Promise<BrowserSentryModule | null> | null = null;

export function shouldEnableBrowserSentry(): boolean {
  return Boolean(BROWSER_SENTRY_DSN);
}

function getBrowserSentryModule(): Promise<BrowserSentryModule | null> {
  if (!shouldEnableBrowserSentry()) {
    return Promise.resolve(null);
  }

  if (!browserSentryPromise) {
    browserSentryPromise = import('@sentry/nextjs')
      .then(Sentry => {
        Sentry.init({
          dsn: BROWSER_SENTRY_DSN,
          tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,
          debug: false,
          environment: process.env.NODE_ENV,
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
              !process.env.NEXT_PUBLIC_SENTRY_DEV_ENABLED
            ) {
              return null;
            }

            return event;
          },
        });

        return Sentry;
      })
      .catch(() => null);
  }

  return browserSentryPromise;
}

export async function registerBrowserSentry(): Promise<BrowserSentryModule | null> {
  return getBrowserSentryModule();
}

if (shouldEnableBrowserSentry()) {
  void registerBrowserSentry();
}

export function onRouterTransitionStart(...args: unknown[]): void {
  void registerBrowserSentry().then(Sentry => {
    if (!Sentry) {
      return;
    }

    const captureRouterTransitionStart = Sentry.captureRouterTransitionStart as
      | ((...params: unknown[]) => void)
      | undefined;

    captureRouterTransitionStart?.(...args);
  });
}
