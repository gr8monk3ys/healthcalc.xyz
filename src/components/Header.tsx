'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import DarkModeToggle from '@/components/ui/DarkModeToggle';
import UnitToggle from '@/components/ui/UnitToggle';
import { usePreferences } from '@/context/PreferencesContext';

interface MenuItem {
  name: string;
  path: string;
  description: string;
}

const menuItems: MenuItem[] = [
  {
    name: 'Home',
    path: '/',
    description: 'Dashboard of all calculators',
  },
  {
    name: 'Body Fat Calculator',
    path: '/body-fat',
    description: 'Calculate your body fat percentage using various methods',
  },
  {
    name: 'Body Fat Burn Calculator',
    path: '/body-fat-burn',
    description: 'Calculate calories burned during activities and weight loss timeline',
  },
  {
    name: 'Calorie Deficit Calculator',
    path: '/calorie-deficit',
    description: 'Discover how long to reach your goal weight',
  },
  {
    name: 'Weight Management Calculator',
    path: '/weight-management',
    description: 'Plan your weight loss with a target date',
  },
  {
    name: 'Maximum Fat Loss Calculator',
    path: '/maximum-fat-loss',
    description: 'Find optimal calorie intake for maximum fat loss',
  },
  {
    name: 'TDEE Calculator',
    path: '/tdee',
    description: 'Calculate your Total Daily Energy Expenditure',
  },
  {
    name: 'ABSI Calculator',
    path: '/absi',
    description: 'Calculate your A Body Shape Index',
  },
  {
    name: 'BMI Calculator',
    path: '/bmi',
    description: 'Calculate Body Mass Index for adults and children',
  },
  {
    name: 'Waist-to-Hip Ratio',
    path: '/whr',
    description: 'Calculate your Waist-to-Hip Ratio',
  },
  {
    name: 'Measurement Conversions',
    path: '/conversions',
    description: 'Convert between different units of measurement',
  },
  {
    name: 'Blog',
    path: '/blog',
    description: 'Articles about health, fitness, and nutrition',
  },
];

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const { preferences } = usePreferences();
  const { darkMode } = preferences;

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      <header
        className={`py-4 border-b border-gray-200 ${darkMode ? 'bg-gray-900 text-white border-gray-800' : 'bg-white shadow-sm'}`}
      >
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-accent">
            HealthCheck
          </Link>

          <div className="flex items-center space-x-4">
            {/* Rule: Use React Context for global state management */}
            <DarkModeToggle />
            <UnitToggle />

            <button
              onClick={toggleMenu}
              className={`neumorph px-4 py-2 rounded-full flex items-center space-x-1 ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : ''}`}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            >
              <span>Menu</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {menuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </header>

      {menuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={toggleMenu}>
          <div
            className={`fixed right-0 top-0 h-full w-80 ${darkMode ? 'bg-gray-900 text-white' : 'bg-primary'} shadow-lg z-50 p-4 overflow-y-auto`}
            onClick={e => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Calculators</h2>
              <button
                onClick={toggleMenu}
                className={`neumorph p-2 rounded-full ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : ''}`}
                aria-label="Close menu"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
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
              </button>
            </div>

            <nav>
              <ul className="space-y-2">
                {menuItems.map(item => (
                  <li key={item.path}>
                    <Link
                      href={item.path}
                      className={`block p-3 rounded-lg transition-all ${
                        pathname === item.path
                          ? `neumorph-inset text-accent ${darkMode ? 'bg-gray-800' : ''}`
                          : `neumorph hover:shadow-neumorph-inset ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : ''}`
                      }`}
                      onClick={toggleMenu}
                    >
                      <div className="font-medium">{item.name}</div>
                      <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        {item.description}
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
