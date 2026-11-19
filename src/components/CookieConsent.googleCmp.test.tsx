/**
 * @vitest-environment jsdom
 */
import { render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('next/navigation', () => ({ usePathname: () => '/' }));

async function renderAdvertisingConsent(): Promise<string | null> {
  vi.resetModules();
  const { CookieConsentProvider, useCookieConsent } = await import('./CookieConsent');
  const { LocaleProvider } = await import('@/context/LocaleContext');

  function Probe() {
    return <output data-testid="advertising">{String(useCookieConsent().advertising)}</output>;
  }

  render(
    <LocaleProvider initialLocale="en">
      <CookieConsentProvider>
        <Probe />
      </CookieConsentProvider>
    </LocaleProvider>
  );
  return screen.getByTestId('advertising').textContent;
}

describe('advertising consent', () => {
  beforeEach(() => {
    vi.stubGlobal(
      'ResizeObserver',
      class {
        observe(): void {}
        disconnect(): void {}
      }
    );
    localStorage.clear();
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
  });

  it('is withheld by default until the visitor opts in', async () => {
    vi.stubEnv('NEXT_PUBLIC_ADSENSE_GOOGLE_CMP', '');

    expect(await renderAdvertisingConsent()).toBe('false');
  });

  it("is left to Google's consent message when that is switched on", async () => {
    vi.stubEnv('NEXT_PUBLIC_ADSENSE_GOOGLE_CMP', '1');

    expect(await renderAdvertisingConsent()).toBe('true');
  });
});
