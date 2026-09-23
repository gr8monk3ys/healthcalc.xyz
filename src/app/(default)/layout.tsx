import '../globals.css';
import type { Metadata } from 'next';
import Script from 'next/script';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { createOrganizationSchema, createWebsiteSchema } from '@/utils/schema';
import React, { ReactNode } from 'react';
import SkipToMainLink from '@/components/SkipToMainLink';
import { getPublicSiteUrl } from '@/lib/site';
import VercelAnalyticsGate from '@/components/VercelAnalyticsGate';
import LayoutProviders from '@/components/LayoutProviders';
// ~/code/ui theme fonts (Fraunces / Instrument Sans / IBM Plex Mono),
// wired the same way as lscaturchio.xyz's root layout.
import { fontVariables } from '@/lib/fonts';

const siteUrl = getPublicSiteUrl();

const darkModeBootstrapScript = `(function(){try{var d=JSON.parse(localStorage.getItem('dark-mode-preferences'));if(d&&d.darkMode){document.documentElement.classList.add('dark');var m=document.querySelector('meta[name="theme-color"]');if(m)m.setAttribute('content','#111318')}}catch(e){}})()`;
const organizationSchemaJson = JSON.stringify(createOrganizationSchema()).replace(/</g, '\\u003c');
const websiteSchemaJson = JSON.stringify(createWebsiteSchema()).replace(/</g, '\\u003c');

export const metadata: Metadata = {
  title: 'HealthCalc - Health and Fitness Calculators',
  description:
    'Your go-to resource for health and fitness calculators. Calculate body fat, BMI, calorie needs, and more.',
  keywords: 'health calculator, fitness calculator, weight management, body fat, BMI, TDEE',
  authors: [{ name: 'HealthCalc Team' }],
  creator: 'HealthCalc',
  publisher: 'HealthCalc',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(siteUrl),
  openGraph: {
    title: 'HealthCalc - Health and Fitness Calculators',
    description:
      'Your go-to resource for health and fitness calculators. Calculate body fat, BMI, calorie needs, and more.',
    url: siteUrl,
    siteName: 'HealthCalc',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'HealthCalc - Health and Fitness Calculators',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HealthCalc - Health and Fitness Calculators',
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
    <html lang="en" className={fontVariables} suppressHydrationWarning>
      <head>
        {/* Core Web Vitals optimizations */}
        {/* PWA and app settings */}
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#f9f8f5" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />

        {/* Mobile web app settings - updated for modern standards */}
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="HealthCalc" />

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
            {/*
              No loading.tsx for this segment on purpose. Every route here is
              prerendered, and a loading boundary makes Next ship the spinner
              first with the real page hidden at the end of the HTML, swapped in
              by script. That swap is a race against first paint and produced a
              0.32 layout shift on the footer (min-h-screen flex column pins it
              to the first screen while the fallback is up). Without the
              boundary the page content is in the server HTML directly.
            */}
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
