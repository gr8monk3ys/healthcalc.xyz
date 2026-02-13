'use client';

import React from 'react';
import { localeLabels, supportedLocales, type SupportedLocale } from '@/i18n/config';
import { useLocale } from '@/context/LocaleContext';

export default function LanguageSwitcher(): React.JSX.Element {
  const { locale, setLocale, t } = useLocale();

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
        value={locale}
        onChange={event => setLocale(event.target.value as SupportedLocale)}
        className="ui-select min-h-9 elevated-pill rounded-full px-3 py-1 text-sm"
        aria-label={t('language.label')}
      >
        {supportedLocales.map(item => (
          <option key={item} value={item}>
            {localeLabels[item]}
          </option>
        ))}
      </select>
    </label>
  );
}
