'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import DarkModeToggle from '@/components/ui/DarkModeToggle';
import UnitToggle from '@/components/ui/UnitToggle';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { usePreferences } from '@/context/PreferencesContext';
import { useLocale } from '@/context/LocaleContext';
import AuthControls from '@/components/AuthControls';
import { stripLocaleFromPathname } from '@/i18n/config';

export default function Header(): React.JSX.Element {
  const pathname = usePathname();
  const { preferences } = usePreferences();
  const { localizePath, t } = useLocale();
  const { darkMode } = preferences;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const normalizedPathname = stripLocaleFromPathname(pathname);

  const quickLinks = [
    { name: t('header.quick.calculators'), path: '/calculators' },
    { name: t('header.quick.blog'), path: '/blog' },
    { name: t('header.quick.learn'), path: '/learn' },
    { name: t('header.quick.saved'), path: '/saved-results' },
  ];

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-40 px-3 pt-3 md:px-4 md:pt-4">
      <div
        className={`glass-panel rounded-[1.6rem] px-4 py-3 md:px-6 md:py-4 ${darkMode ? 'text-white' : 'text-[var(--foreground)]'}`}
      >
        <div className="container mx-auto flex items-center justify-between gap-4">
          <Link
            href={localizePath('/')}
            className="notranslate inline-flex items-baseline gap-1 text-2xl font-black tracking-tight text-accent transition-transform duration-300 hover:scale-[1.02]"
          >
            <span>Health</span>
            <span className="text-[0.95em] text-accent-dark dark:text-accent-light">Check</span>
          </Link>

          <nav
            aria-label={t('header.quickLinksAria')}
            className="hidden lg:flex items-center gap-2"
          >
            {quickLinks.map(link => (
              <Link
                key={link.path}
                href={localizePath(link.path)}
                aria-current={normalizedPathname === link.path ? 'page' : undefined}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition-all ${
                  normalizedPathname === link.path
                    ? 'bg-accent text-white shadow-lg shadow-accent/30'
                    : 'elevated-pill text-[var(--foreground)] hover:-translate-y-0.5'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center space-x-3">
            <div className="hidden md:block">
              <LanguageSwitcher />
            </div>
            <DarkModeToggle />
            <UnitToggle />
            <div className="hidden lg:block">
              <AuthControls />
            </div>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(prev => !prev)}
              className="lg:hidden elevated-pill p-2 transition-all hover:-translate-y-0.5"
              aria-label={mobileMenuOpen ? t('header.closeMenu') : t('header.openMenu')}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <nav aria-label={t('header.mobileNavAria')} className="lg:hidden px-3 pb-3 md:px-4 md:pb-4">
          <div className="glass-panel mx-auto mt-2 max-w-6xl space-y-2 rounded-2xl p-4">
            <div className="py-1">
              <LanguageSwitcher />
            </div>
            {quickLinks.map(link => (
              <Link
                key={link.path}
                href={localizePath(link.path)}
                aria-current={normalizedPathname === link.path ? 'page' : undefined}
                className={`block rounded-xl px-4 py-3 text-sm font-semibold transition-all ${
                  normalizedPathname === link.path
                    ? 'bg-accent text-white shadow-lg shadow-accent/30'
                    : darkMode
                      ? 'elevated-pill hover:border-accent/60'
                      : 'elevated-pill hover:border-accent/40'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <div className="border-t border-white/30 pt-4 dark:border-indigo-200/10">
              <AuthControls />
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}
