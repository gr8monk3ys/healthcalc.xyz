import {
  defaultLocale,
  localeToHtmlLang,
  stripLocaleFromPathname,
  type SupportedLocale,
} from '@/i18n/config';

/**
 * Build hreflang alternate links for a given pathname.
 *
 * While translations are incomplete, this only emits English alternates so
 * search engines do not index non-English URLs that serve mixed content.
 *
 * TODO: Re-enable multi-locale alternates when translations are complete
 */
export function buildLanguageAlternates(
  pathname: string,
  _canonicalLocale?: SupportedLocale
): {
  canonical: string;
  languages: Record<string, string>;
} {
  const normalizedPathname = pathname.startsWith('/') ? pathname : `/${pathname}`;
  const basePath = stripLocaleFromPathname(normalizedPathname);

  // Canonical always points to the unprefixed English path regardless of the
  // requested locale, since non-English routes are currently redirected.
  const canonical = basePath;

  const languages: Record<string, string> = {
    [localeToHtmlLang[defaultLocale]]: basePath,
    'x-default': basePath,
  };

  return { canonical, languages };
}
