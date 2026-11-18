'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import DarkModeToggle from '@/components/ui/DarkModeToggle';
import UnitToggle from '@/components/ui/UnitToggle';
import Logo from '@/components/Logo';
import { useLocale } from '@/context/LocaleContext';
import { stripLocaleFromPathname } from '@/i18n/config';

const AuthControls = dynamic(() => import('@/components/AuthControls'), {
  ssr: false,
  loading: () => (
    <Link
      href="/saved-results"
      className="elevated-pill inline-flex items-center px-4 py-2 text-sm"
    >
      Account
    </Link>
  ),
});

const navLinkClass =
  'inline-flex h-full items-center px-3 text-sm font-bold text-ink hover:text-mark aria-[current=page]:shadow-[inset_0_-4px_0_var(--mark)]';

export default function Header(): React.JSX.Element {
  const pathname = usePathname();
  const { localizePath, t } = useLocale();
  const [openMenuPathname, setOpenMenuPathname] = useState<string | null>(null);
  const mobileMenuOpen = openMenuPathname === pathname;
  const normalizedPathname = stripLocaleFromPathname(pathname);

  const quickLinks = [
    { name: t('header.quick.calculators'), path: '/calculators' },
    { name: t('header.quick.blog'), path: '/blog' },
    { name: t('header.quick.learn'), path: '/learn' },
    { name: t('header.quick.saved'), path: '/saved-results' },
  ];

  return (
    <header className="site-header sticky top-0 z-40">
      <div className="container mx-auto flex h-16 items-stretch justify-between gap-4 px-4">
        <Link href={localizePath('/')} className="inline-flex items-center text-ink">
          <Logo className="text-xl sm:text-2xl" />
        </Link>

        <nav aria-label={t('header.quickLinksAria')} className="hidden items-stretch lg:flex">
          {quickLinks.map(link => (
            <Link
              key={link.path}
              href={localizePath(link.path)}
              aria-current={normalizedPathname === link.path ? 'page' : undefined}
              className={navLinkClass}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <DarkModeToggle />
          <UnitToggle className="hidden sm:flex" />
          <div className="hidden lg:block">
            <AuthControls />
          </div>
          <button
            type="button"
            onClick={() => {
              setOpenMenuPathname(prev => (prev === pathname ? null : pathname));
            }}
            className="elevated-pill inline-flex p-2 lg:hidden"
            aria-label={mobileMenuOpen ? t('header.closeMenu') : t('header.openMenu')}
            aria-expanded={mobileMenuOpen}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
              strokeLinecap="square"
              aria-hidden="true"
            >
              <path d={mobileMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'} />
            </svg>
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <nav
          aria-label={t('header.mobileNavAria')}
          className="max-h-[calc(100dvh-4rem)] overflow-y-auto overscroll-contain border-t border-ink/30 px-4 pb-4 lg:hidden"
        >
          {quickLinks.map(link => (
            <Link
              key={link.path}
              href={localizePath(link.path)}
              onClick={() => {
                setOpenMenuPathname(null);
              }}
              aria-current={normalizedPathname === link.path ? 'page' : undefined}
              className="flex min-h-12 items-center border-b border-ink/30 text-base font-bold text-ink aria-[current=page]:text-mark"
            >
              {link.name}
            </Link>
          ))}
          <div className="py-4 sm:hidden">
            <UnitToggle />
          </div>
          <div className="pt-2">
            <AuthControls />
          </div>
        </nav>
      )}
    </header>
  );
}
