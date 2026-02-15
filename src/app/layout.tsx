import './globals.css';
import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import GlobalStructuredData from '@/components/GlobalStructuredData';
import Preconnect from '@/components/Preconnect';
import React, { ReactNode } from 'react';
import { DarkModeProvider } from '@/context/DarkModeContext';
import { UnitSystemProvider } from '@/context/UnitSystemContext';
import { PreferencesProvider } from '@/context/PreferencesContext';
import { SavedResultsProvider } from '@/context/SavedResultsContext';
import { AuthProvider } from '@/context/AuthContext';
import PWAInit from '@/components/PWAInit';
import { ClerkProvider } from '@clerk/nextjs';
import { clerkEnabled } from '@/utils/auth';
import { CookieConsentProvider } from '@/components/CookieConsent';
import AutoPageTranslator from '@/components/AutoPageTranslator';
import SkipToMainLink from '@/components/SkipToMainLink';
import { LocaleProvider } from '@/context/LocaleContext';
import { getAdSenseScriptSrc } from '@/lib/adsense';
import { getPublicSiteUrl } from '@/lib/site';
import VercelAnalyticsGate from '@/components/VercelAnalyticsGate';
import { Plus_Jakarta_Sans, Sora } from 'next/font/google';

const siteUrl = getPublicSiteUrl();
const adSenseScriptSrc = getAdSenseScriptSrc();
const bodyFont = Plus_Jakarta_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-body',
});
const headingFont = Sora({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-heading',
});

function LayoutProviders({ children }: { children: ReactNode }): React.JSX.Element {
  const inner = (
    <LocaleProvider>
      <DarkModeProvider>
        <UnitSystemProvider>
          <PreferencesProvider>
            <AuthProvider>
              <SavedResultsProvider>
                <CookieConsentProvider>
                  <AutoPageTranslator />
                  {children}
                </CookieConsentProvider>
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
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Core Web Vitals optimizations */}
        <link rel="preconnect" href={siteUrl} />
        <link rel="dns-prefetch" href={siteUrl} />

        {/* PWA and app settings */}
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#4f46e5" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />

        {/* Mobile web app settings - updated for modern standards */}
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="HealthCheck" />

        {/* Preconnect to external domains for better performance */}
        <Preconnect
          domains={[
            'https://www.googletagmanager.com',
            'https://www.google.com',
            'https://stats.g.doubleclick.net',
          ]}
        />

        {/* Keep AdSense loader visible in page source for crawler verification.
            Ad rendering remains gated by cookie consent in AdUnit. */}
        <script async src={adSenseScriptSrc} crossOrigin="anonymous" data-hc-adsense="1" />
      </head>
      <body className={`${bodyFont.variable} ${headingFont.variable}`}>
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

          {/* PWA initialization and service worker registration */}
          <PWAInit />

          {/* Global structured data for organization and website */}
          <GlobalStructuredData />
        </LayoutProviders>
      </body>
    </html>
  );
}
