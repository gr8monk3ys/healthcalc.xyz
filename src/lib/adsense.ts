const DEFAULT_ADSENSE_PUBLISHER_ID = 'ca-pub-4505962980988232';
const ADSENSE_PUBLISHER_ID_PATTERN = /^ca-pub-\d{16}$/;
const AUTOMATED_BROWSER_PATTERN = /\b(?:HeadlessChrome|PhantomJS|Playwright|puppeteer)\b/i;

interface NavigatorLike {
  userAgent?: string;
  webdriver?: boolean;
}

function normalizePublisherId(value: string | undefined): string {
  return value?.trim() ?? '';
}

function isValidAdSensePublisherId(value: string | undefined): boolean {
  return ADSENSE_PUBLISHER_ID_PATTERN.test(normalizePublisherId(value));
}

export function getAdSensePublisherId(): string {
  const configured = normalizePublisherId(process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID);
  if (isValidAdSensePublisherId(configured)) {
    return configured;
  }

  return DEFAULT_ADSENSE_PUBLISHER_ID;
}

export function getAdSenseScriptSrc(): string {
  return `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${encodeURIComponent(getAdSensePublisherId())}`;
}

export function isAutomatedBrowser(navigatorLike: NavigatorLike | undefined): boolean {
  if (!navigatorLike) return false;
  return (
    navigatorLike.webdriver === true ||
    AUTOMATED_BROWSER_PATTERN.test(navigatorLike.userAgent ?? '')
  );
}

export function shouldLoadAdSense(target: Window | undefined = globalThis.window): boolean {
  if (!target) return true;
  return !isAutomatedBrowser(target.navigator);
}
