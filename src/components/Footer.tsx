'use client';

import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-primary p-6 border-t border-gray-200">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link href="/" className="text-xl font-bold text-accent">
              HealthCheck
            </Link>
            <p className="text-sm mt-2">Your go-to resource for health and fitness calculators</p>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Calculators</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/bmi" className="text-sm hover:text-accent">
                  BMI Calculator
                </Link>
              </li>
              <li>
                <Link href="/body-fat" className="text-sm hover:text-accent">
                  Body Fat Calculator
                </Link>
              </li>
              <li>
                <Link href="/calorie-deficit" className="text-sm hover:text-accent">
                  Calorie Deficit Calculator
                </Link>
              </li>
              <li>
                <Link href="/tdee" className="text-sm hover:text-accent">
                  TDEE Calculator
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-sm hover:text-accent">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm hover:text-accent">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-sm hover:text-accent">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy" className="text-sm hover:text-accent">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm hover:text-accent">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/disclaimer" className="text-sm hover:text-accent">
                  Disclaimer
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200 text-center text-sm text-gray-600">
          &copy; {new Date().getFullYear()} HealthCheck. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
