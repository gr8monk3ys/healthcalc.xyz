'use client';

import React from 'react';
import { defaultLocale, localeLabels, supportedLocales } from '@/i18n/config';
import { useLocale } from '@/context/LocaleContext';

/**
 * Language selector shown in the site header.
 *
 * While translations are incomplete, non-English options are displayed but
 * disabled with a "coming soon" suffix. The middleware also 302-redirects any
 * non-English locale URLs to the English version as a safety net.
 *
 * TODO: Remove the disabled state once translations are complete
 */
export default function LanguageSwitcher(): React.JSX.Element {
  const { t } = useLocale();

  return (
    <label className="inline-flex items-center gap-2">
      <span className="sr-only">{t('language.label')}</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        className="h-4 w-4 text-gray-500"
        fill="none"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 5h12M9 3v2m4 0a17 17 0 01-3 8m2 2h6m-3-3v6m0 0l-3-3m3 3l3-3M5 15l4-8 4 8"
        />
      </svg>
      <select
        value={defaultLocale}
        disabled
        className="ui-select min-h-9 elevated-pill rounded-full px-3 py-1 text-sm opacity-70 cursor-not-allowed"
        aria-label={t('language.label')}
      >
        {supportedLocales.map(item => (
          <option key={item} value={item} disabled={item !== defaultLocale}>
            {localeLabels[item]}
            {item !== defaultLocale ? ' (coming soon)' : ''}
          </option>
        ))}
      </select>
    </label>
  );
}
