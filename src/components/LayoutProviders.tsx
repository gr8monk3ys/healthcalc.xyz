import React, { ReactNode } from 'react';
import { PreferencesProvider } from '@/context/PreferencesContext';
import { CookieConsentProvider } from '@/components/CookieConsent';
import { LocaleProvider } from '@/context/LocaleContext';
import { defaultLocale, type SupportedLocale } from '@/i18n/config';
import { LOCALE_MESSAGES } from '@/i18n/messages.locales';

export default function LayoutProviders({
  children,
  initialLocale = defaultLocale,
}: {
  children: ReactNode;
  initialLocale?: SupportedLocale;
}): React.JSX.Element {
  return (
    <LocaleProvider
      initialLocale={initialLocale}
      messages={initialLocale === 'en' ? undefined : LOCALE_MESSAGES[initialLocale]}
    >
      <PreferencesProvider>
        <CookieConsentProvider>{children}</CookieConsentProvider>
      </PreferencesProvider>
    </LocaleProvider>
  );
}
