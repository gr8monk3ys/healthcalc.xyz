import React, { ReactNode } from 'react';
import { DarkModeProvider } from '@/context/DarkModeContext';
import { UnitSystemProvider } from '@/context/UnitSystemContext';
import { PreferencesProvider } from '@/context/PreferencesContext';
import { SavedResultsProvider } from '@/context/SavedResultsContext';
import { AuthProvider } from '@/context/AuthContext';
import { ClerkProvider } from '@clerk/nextjs';
import { clerkEnabled } from '@/utils/auth';
import { CookieConsentProvider } from '@/components/CookieConsent';
import { LocaleProvider } from '@/context/LocaleContext';
import { defaultLocale, type SupportedLocale } from '@/i18n/config';

export default function LayoutProviders({
  children,
  initialLocale = defaultLocale,
}: {
  children: ReactNode;
  initialLocale?: SupportedLocale;
}): React.JSX.Element {
  const inner = (
    <LocaleProvider initialLocale={initialLocale}>
      <DarkModeProvider>
        <UnitSystemProvider>
          <PreferencesProvider>
            <AuthProvider>
              <SavedResultsProvider>
                <CookieConsentProvider>{children}</CookieConsentProvider>
              </SavedResultsProvider>
            </AuthProvider>
          </PreferencesProvider>
        </UnitSystemProvider>
      </DarkModeProvider>
    </LocaleProvider>
  );

  if (clerkEnabled) {
    return <ClerkProvider>{inner}</ClerkProvider>;
  }

  return inner;
}
