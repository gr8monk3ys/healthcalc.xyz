import '../globals.css';
import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, Sora } from 'next/font/google';
import Script from 'next/script';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { createOrganizationSchema, createWebsiteSchema } from '@/utils/schema';
import React, { ReactNode } from 'react';
import SkipToMainLink from '@/components/SkipToMainLink';
import { getPublicSiteUrl } from '@/lib/site';
import VercelAnalyticsGate from '@/components/VercelAnalyticsGate';
import LayoutProviders from '@/components/LayoutProviders';

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
  fallback: ['Avenir Next', 'Segoe UI', 'sans-serif'],
});

const sora = Sora({
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
  fallback: ['Avenir Next', 'Segoe UI', 'sans-serif'],
});

const siteUrl = getPublicSiteUrl();

const darkModeBootstrapScript = `(function(){try{var d=JSON.parse(localStorage.getItem('dark-mode-preferences'));if(d&&d.darkMode)document.documentElement.classList.add('dark')}catch(e){}})()`;
const organizationSchemaJson = JSON.stringify(createOrganizationSchema()).replace(/</g, '\\u003c');
const websiteSchemaJson = JSON.stringify(createWebsiteSchema()).replace(/</g, '\\u003c');

export const metadata: Metadata = {
  title: 'HealthCheck - Health and Fitness Calculators',
  description:
    'Your go-to resource for health and fitness calculators. Calculate body fat, BMI, calorie needs, and more.',
  keywords: 'health calculator, fitness calculator, weight management, body fat, BMI, TDEE',
  authors: [{ name: 'HealthCheck Team' }],
  creator: 'HealthCheck',
  publisher: 'HealthCheck',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(siteUrl),
  openGraph: {
    title: 'HealthCheck - Health and Fitness Calculators',
    description:
      'Your go-to resource for health and fitness calculators. Calculate body fat, BMI, calorie needs, and more.',
    url: siteUrl,
    siteName: 'HealthCheck',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'HealthCheck - Health and Fitness Calculators',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HealthCheck - Health and Fitness Calculators',
    description:
      'Your go-to resource for health and fitness calculators. Calculate body fat, BMI, calorie needs, and more.',
    images: ['/images/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
  alternates: {
    types: {
      'application/rss+xml': '/feed.xml',
    },
  },
  category: 'health',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${plusJakarta.variable} ${sora.variable}`} suppressHydrationWarning>
      <head>
        {/* Core Web Vitals optimizations */}
        {/* PWA and app settings */}
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#4f46e5" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />

        {/* Mobile web app settings - updated for modern standards */}
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="HealthCheck" />

        {/* Blocking script to apply dark mode before first paint (prevents FOUC) */}
        <Script id="dark-mode-bootstrap" strategy="beforeInteractive">
          {darkModeBootstrapScript}
        </Script>
      </head>
      <body>
        <LayoutProviders>
          <SkipToMainLink />
          <div className="min-h-screen flex flex-col">
            <Header />
            <main id="main-content" className="flex-grow container mx-auto px-4 py-8">
              {children}
            </main>
            <Footer />
          </div>

          {/* Analytics component for tracking */}
          <VercelAnalyticsGate />
        </LayoutProviders>

        {/* Global structured data — SSR so crawlers see it in initial HTML */}
        <Script id="organization-schema" type="application/ld+json">
          {organizationSchemaJson}
        </Script>
        <Script id="website-schema" type="application/ld+json">
          {websiteSchemaJson}
        </Script>
      </body>
    </html>
  );
}
