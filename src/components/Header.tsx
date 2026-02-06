'use client';

import React from 'react';
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

export default function Header() {
  const pathname = usePathname();
  const { preferences } = usePreferences();
  const { darkMode } = preferences;

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
          <AuthControls />
        </div>
      </div>
    </header>
  );
}
