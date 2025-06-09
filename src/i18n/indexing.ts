import 'server-only';

import { defaultLocale, normalizeLocale, supportedLocales, type SupportedLocale } from './config';

let cached: SupportedLocale[] | null = null;

/**
 * Returns locales that are safe to index (fully translated) for SEO.
 *
 * Configure via `I18N_INDEXABLE_LOCALES` (comma-separated). Defaults to `en`.
 */
function getIndexableLocales(): SupportedLocale[] {
  if (cached) return cached;

  const raw = (process.env.I18N_INDEXABLE_LOCALES ?? '').trim();
  if (!raw) {
    cached = [defaultLocale];
    return cached;
  }

  const tokens = raw
    .split(',')
    .map(token => token.trim())
    .filter(Boolean)
    .map(token => normalizeLocale(token))
    .filter((locale): locale is SupportedLocale => Boolean(locale));

  const set = new Set<SupportedLocale>();
  set.add(defaultLocale);

  for (const locale of tokens) {
    if (supportedLocales.includes(locale)) {
      set.add(locale);
    }
  }

  cached = Array.from(set);
  return cached;
}

export function isLocaleIndexable(locale: SupportedLocale): boolean {
  return getIndexableLocales().includes(locale);
}
