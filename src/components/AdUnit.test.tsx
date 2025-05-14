import { afterAll, beforeEach, describe, expect, it, vi } from 'vitest';
import { render, waitFor } from '@testing-library/react';

vi.mock('@/components/CookieConsent', () => ({
  useCookieConsent: () => ({
    analytics: false,
    advertising: true,
    openConsentBanner: vi.fn(),
  }),
}));

vi.mock('@/utils/logger', () => ({
  createLogger: () => ({
    logError: vi.fn(),
    logWarn: vi.fn(),
    logInfo: vi.fn(),
  }),
}));

import AdUnit from './AdUnit';

describe('AdUnit', () => {
  const webdriverDescriptor = Object.getOwnPropertyDescriptor(window.navigator, 'webdriver');

  beforeEach(() => {
    delete (window as Window & { adsbygoogle?: Array<Record<string, never>> }).adsbygoogle;
    Object.defineProperty(window.navigator, 'webdriver', {
      configurable: true,
      value: false,
    });
  });

  it('queues an ad request before the AdSense script is ready', async () => {
    const { container } = render(<AdUnit slot="1234567890" />);

    await waitFor(() => {
      expect(
        (window as Window & { adsbygoogle?: Array<Record<string, never>> }).adsbygoogle
      ).toHaveLength(1);
    });

    expect(container.querySelector('ins.adsbygoogle')).toBeInTheDocument();
  });

  it('suppresses ad loading in automated browsers', async () => {
    Object.defineProperty(window.navigator, 'webdriver', {
      configurable: true,
      value: true,
    });

    const { container } = render(<AdUnit slot="1234567890" />);

    await waitFor(() => {
      expect(
        (window as Window & { adsbygoogle?: Array<Record<string, never>> }).adsbygoogle
      ).toBeUndefined();
    });

    expect(container.querySelector('ins.adsbygoogle')).not.toBeInTheDocument();
  });

  afterAll(() => {
    if (webdriverDescriptor) {
      Object.defineProperty(window.navigator, 'webdriver', webdriverDescriptor);
      return;
    }

    Reflect.deleteProperty(window.navigator, 'webdriver');
  });
});
