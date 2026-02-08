'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import DarkModeToggle from '@/components/ui/DarkModeToggle';
import UnitToggle from '@/components/ui/UnitToggle';
import { usePreferences } from '@/context/PreferencesContext';
import AuthControls from '@/components/AuthControls';

const quickLinks = [
  { name: 'Calculators', path: '/calculators' },
  { name: 'Blog', path: '/blog' },
  { name: 'Learn', path: '/learn' },
  { name: 'Saved', path: '/saved-results' },
];

export default function Header(): React.JSX.Element {
  const pathname = usePathname();
  const { preferences } = usePreferences();
  const { darkMode } = preferences;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <header
      className={`py-4 border-b border-gray-200 ${darkMode ? 'bg-gray-900 text-white border-gray-800' : 'bg-white shadow-sm'}`}
    >
      <div className="container mx-auto flex items-center justify-between gap-4 px-4">
        <Link
          href="/"
          className="text-2xl font-bold text-accent transition-transform duration-300 hover:scale-[1.02]"
        >
          HealthCheck
        </Link>

        <nav aria-label="Primary quick links" className="hidden lg:flex items-center gap-2">
          {quickLinks.map(link => (
            <Link
              key={link.path}
              href={link.path}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                pathname === link.path ? 'bg-accent text-white shadow-lg' : 'hover:bg-accent/10'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center space-x-3">
          <DarkModeToggle />
          <UnitToggle />
          <div className="hidden lg:block">
            <AuthControls />
          </div>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(prev => !prev)}
            className={`lg:hidden p-2 rounded-lg transition-colors ${
              darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
            }`}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
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

      {mobileMenuOpen && (
        <nav
          aria-label="Mobile navigation"
          className={`lg:hidden border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}
        >
          <div className="container mx-auto px-4 py-4 space-y-2">
            {quickLinks.map(link => (
              <Link
                key={link.path}
                href={link.path}
                className={`block rounded-lg px-4 py-3 text-sm font-medium transition-all ${
                  pathname === link.path
                    ? 'bg-accent text-white'
                    : darkMode
                      ? 'hover:bg-gray-800'
                      : 'hover:bg-accent/10'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <div className={`pt-4 border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
              <AuthControls />
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}
