export const supportedLocales = ['en', 'es', 'fr', 'de', 'pt', 'zh'] as const;

export type SupportedLocale = (typeof supportedLocales)[number];

export const defaultLocale: SupportedLocale = 'en';
export const localeCookieName = 'hc_locale';

const supportedLocaleSet = new Set<string>(supportedLocales);

export const localeLabels: Record<SupportedLocale, string> = {
  en: 'English',
  es: 'Español',
  fr: 'Français',
  de: 'Deutsch',
  pt: 'Português',
  zh: '中文',
};

export const localeToHtmlLang: Record<SupportedLocale, string> = {
  en: 'en',
  es: 'es',
  fr: 'fr',
  de: 'de',
  pt: 'pt-BR',
  zh: 'zh-CN',
};

// Open Graph locale strings (used for og:locale).
export const localeToOpenGraphLocale: Record<SupportedLocale, string> = {
  en: 'en_US',
  es: 'es_ES',
  fr: 'fr_FR',
  de: 'de_DE',
  pt: 'pt_BR',
  zh: 'zh_CN',
};

export function isSupportedLocale(locale: string | null | undefined): locale is SupportedLocale {
  if (!locale) return false;
  return supportedLocaleSet.has(locale.toLowerCase());
}

export function normalizeLocale(rawLocale: string | null | undefined): SupportedLocale | null {
  if (!rawLocale) return null;

  const locale = rawLocale.trim().toLowerCase().replace('_', '-');
  if (!locale) return null;

  if (isSupportedLocale(locale)) {
    return locale;
  }

  if (locale.startsWith('es')) return 'es';
  if (locale.startsWith('fr')) return 'fr';
  if (locale.startsWith('de')) return 'de';
  if (locale.startsWith('pt')) return 'pt';
  if (locale.startsWith('zh')) return 'zh';
  if (locale.startsWith('en')) return 'en';

  return null;
}

export function getLocaleFromAcceptLanguage(
  acceptLanguageHeader: string | null | undefined
): SupportedLocale {
  if (!acceptLanguageHeader) return defaultLocale;

  const parts = acceptLanguageHeader.split(',');
  for (const part of parts) {
    const candidate = part.split(';')[0]?.trim();
    const normalized = normalizeLocale(candidate);
    if (normalized) {
      return normalized;
    }
  }

  return defaultLocale;
}

export function getLocaleFromPathname(pathname: string): SupportedLocale | null {
  const firstSegment = pathname.split('/').filter(Boolean)[0];
  return normalizeLocale(firstSegment);
}

export function stripLocaleFromPathname(pathname: string): string {
  const locale = getLocaleFromPathname(pathname);
  if (!locale) return pathname;

  const suffix = pathname.slice(`/${locale}`.length);
  return suffix || '/';
}

export function prefixPathWithLocale(pathname: string, locale: SupportedLocale): string {
  const normalizedPath = pathname.startsWith('/') ? pathname : `/${pathname}`;
  const pathWithoutLocale = stripLocaleFromPathname(normalizedPath);

  if (locale === defaultLocale) {
    return pathWithoutLocale;
  }

  return pathWithoutLocale === '/' ? `/${locale}` : `/${locale}${pathWithoutLocale}`;
}

export function isLocalizablePath(pathname: string): boolean {
  if (!pathname.startsWith('/')) return false;
  if (pathname.startsWith('/api') || pathname.startsWith('/trpc')) return false;
  if (pathname.startsWith('/_next')) return false;
  // Keep auth routes unprefixed to avoid extra auth provider configuration.
  if (pathname === '/sign-in' || pathname.startsWith('/sign-in/')) return false;
  if (pathname === '/sign-up' || pathname.startsWith('/sign-up/')) return false;
  if (/\.[a-z0-9]+$/i.test(pathname)) return false;
  return true;
}
