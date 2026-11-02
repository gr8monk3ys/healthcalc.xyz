import React from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { render } from '@testing-library/react';
import { CookieConsentProvider } from './CookieConsent';

const route = vi.hoisted(() => ({ pathname: '/bmi' }));

vi.mock('next/navigation', () => ({
  usePathname: () => route.pathname,
}));

vi.mock('@/context/LocaleContext', () => ({
  useLocale: () => ({ t: (key: string) => key }),
}));

const TOKEN = 'eyJ2IjoxLCJjIjoiYm1pIn0';

function storeConsent(analytics: boolean): void {
  localStorage.setItem(
    'cookie-consent',
    JSON.stringify({ essential: true, analytics, advertising: false, tcfVersion: '2.2' })
  );
}

const provider = (
  <CookieConsentProvider>
    <div />
  </CookieConsentProvider>
);

describe('Google Analytics loading', () => {
  const nativeFetch = window.fetch;
  const nativeBeacon = navigator.sendBeacon;
  // jsdom does not run the inline script that defines the real gtag.
  const gtag = vi.fn();

  beforeEach(() => {
    vi.stubEnv('NODE_ENV', 'production');
    vi.stubEnv('NEXT_PUBLIC_GA_ID', 'G-TEST123');
    vi.stubGlobal(
      'ResizeObserver',
      class {
        observe(): void {}
        disconnect(): void {}
      }
    );
    gtag.mockClear();
    (window as unknown as { gtag?: unknown }).gtag = gtag;
    localStorage.clear();
    route.pathname = '/bmi';
    window.history.pushState({}, '', `/bmi?r=${TOKEN}`);
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
    document.head.querySelectorAll('script').forEach(script => script.remove());
    delete (window as unknown as { gtag?: unknown }).gtag;
    window.fetch = nativeFetch;
    navigator.sendBeacon = nativeBeacon;
    window.history.pushState({}, '', '/');
  });

  it('loads nothing when no choice has been made', () => {
    render(provider);

    expect(document.querySelector('script[src*="googletagmanager"]')).toBeNull();
    expect(gtag).not.toHaveBeenCalled();
  });

  it('loads nothing when analytics was rejected', () => {
    storeConsent(false);
    render(provider);

    expect(document.querySelector('script[src*="googletagmanager"]')).toBeNull();
    expect(gtag).not.toHaveBeenCalled();
  });

  it('gives gtag the path only, before its first config command', () => {
    storeConsent(true);
    render(provider);

    expect(document.querySelector('script[src*="googletagmanager"]')).not.toBeNull();
    expect(gtag.mock.calls[0]).toEqual([
      'set',
      { page_location: `${window.location.origin}/bmi`, page_referrer: '' },
    ]);
    expect(gtag.mock.calls[1]).toEqual(['config', 'G-TEST123']);
    expect(JSON.stringify(gtag.mock.calls)).not.toContain(TOKEN);
  });

  it('keeps page_location current across client-side navigation, without the query', () => {
    storeConsent(true);
    const { rerender } = render(provider);
    gtag.mockClear();

    route.pathname = '/tdee';
    window.history.pushState({}, '', `/tdee?r=${TOKEN}`);
    rerender(
      <CookieConsentProvider>
        <div />
      </CookieConsentProvider>
    );

    expect(gtag).toHaveBeenCalledWith('set', {
      page_location: `${window.location.origin}/tdee`,
    });
    expect(JSON.stringify(gtag.mock.calls)).not.toContain(TOKEN);
  });
});
