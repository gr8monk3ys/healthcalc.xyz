import { afterEach, describe, expect, it, vi } from 'vitest';
import {
  getAdSensePublisherId,
  getAdSenseScriptSrc,
  isAutomatedBrowser,
  shouldLoadAdSense,
} from './adsense';

describe('adsense helpers', () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it('detects webdriver-driven browsers', () => {
    expect(isAutomatedBrowser({ webdriver: true, userAgent: 'Chrome' })).toBe(true);
  });

  it('detects headless user agents', () => {
    expect(isAutomatedBrowser({ userAgent: 'Mozilla/5.0 HeadlessChrome/145.0.0.0' })).toBe(true);
  });

  it('allows normal browsers', () => {
    expect(
      isAutomatedBrowser({
        webdriver: false,
        userAgent:
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 14_0) AppleWebKit/537.36 Chrome/145.0.0.0 Safari/537.36',
      })
    ).toBe(false);
  });

  it('uses valid configured publisher IDs and falls back for invalid ones', () => {
    vi.stubEnv('NEXT_PUBLIC_ADSENSE_PUBLISHER_ID', ' ca-pub-1234567890123456 ');
    expect(getAdSensePublisherId()).toBe('ca-pub-1234567890123456');
    expect(getAdSenseScriptSrc()).toContain('client=ca-pub-1234567890123456');

    vi.stubEnv('NEXT_PUBLIC_ADSENSE_PUBLISHER_ID', 'invalid-publisher');
    expect(getAdSensePublisherId()).toBe('ca-pub-4505962980988232');
    expect(getAdSenseScriptSrc()).toContain('client=ca-pub-4505962980988232');
  });

  it('skips loading AdSense in automated browsers and allows non-browser contexts', () => {
    expect(shouldLoadAdSense(undefined)).toBe(true);
    expect(
      shouldLoadAdSense({
        navigator: {
          webdriver: true,
          userAgent: 'Mozilla/5.0 Playwright',
        },
      } as Window)
    ).toBe(false);
  });
});
