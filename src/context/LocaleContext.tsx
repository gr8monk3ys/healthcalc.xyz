'use client';

import React, { createContext, useCallback, useContext, useMemo } from 'react';
import {
  defaultLocale,
  normalizeLocale,
  prefixPathWithLocale,
  type SupportedLocale,
} from '@/i18n/config';
import { getMessage, type MessageKey } from '@/i18n/messages';

interface LocaleContextValue {
  locale: SupportedLocale;
  setLocale: (nextLocale: SupportedLocale) => void;
  localizePath: (path: string) => string;
  t: (key: MessageKey) => string;
}

const LocaleContext = createContext<LocaleContextValue | undefined>(undefined);

interface LocaleProviderProps {
  children: React.ReactNode;
  initialLocale?: SupportedLocale;
}

export function LocaleProvider({
  children,
  initialLocale = defaultLocale,
}: LocaleProviderProps): React.JSX.Element {
  const locale = useMemo(() => normalizeLocale(initialLocale) ?? defaultLocale, [initialLocale]);

  const localizePath = useCallback(
    (path: string): string => {
      if (!path.startsWith('/')) return path;
      return prefixPathWithLocale(path, locale);
    },
    [locale]
  );

  const setLocale = useCallback((nextLocale: SupportedLocale): void => {
    if (typeof window === 'undefined') return;
    const localizedPath = prefixPathWithLocale(window.location.pathname, nextLocale);
    const search = window.location.search ?? '';
    const hash = window.location.hash ?? '';
    window.location.assign(`${localizedPath}${search}${hash}`);
  }, []);

  const t = useCallback(
    (key: MessageKey): string => {
      return getMessage(locale, key);
    },
    [locale]
  );

  const value = useMemo<LocaleContextValue>(
    () => ({
      locale,
      setLocale,
      localizePath,
      t,
    }),
    [locale, localizePath, setLocale, t]
  );

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale(): LocaleContextValue {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error('useLocale must be used within a LocaleProvider');
  }
  return context;
}
