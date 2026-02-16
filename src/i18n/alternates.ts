import {
  defaultLocale,
  localeToHtmlLang,
  prefixPathWithLocale,
  stripLocaleFromPathname,
  supportedLocales,
  type SupportedLocale,
} from '@/i18n/config';

export function buildLanguageAlternates(
  pathname: string,
  canonicalLocale?: SupportedLocale
): {
  canonical: string;
  languages: Record<string, string>;
} {
  const normalizedPathname = pathname.startsWith('/') ? pathname : `/${pathname}`;
  const basePath = stripLocaleFromPathname(normalizedPathname);
  const canonical =
    canonicalLocale === undefined ? basePath : prefixPathWithLocale(basePath, canonicalLocale);

  const languages: Record<string, string> = {};
  for (const locale of supportedLocales) {
    languages[localeToHtmlLang[locale]] = prefixPathWithLocale(basePath, locale);
  }
  languages['x-default'] = prefixPathWithLocale(basePath, defaultLocale);

  return { canonical, languages };
}
