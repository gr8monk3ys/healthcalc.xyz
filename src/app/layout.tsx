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
import { Analytics } from '@vercel/analytics/react';
import PWAInit from '@/components/PWAInit';
import Script from 'next/script';
import { ClerkProvider } from '@clerk/nextjs';
import { clerkEnabled } from '@/utils/auth';

function LayoutProviders({ children }: { children: ReactNode }): React.JSX.Element {
  const inner = (
    <DarkModeProvider>
      <UnitSystemProvider>
        <PreferencesProvider>
          <AuthProvider>
            <SavedResultsProvider>{children}</SavedResultsProvider>
          </AuthProvider>
        </PreferencesProvider>
      </UnitSystemProvider>
    </DarkModeProvider>
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
  metadataBase: new URL('https://www.heathcheck.info'),
  openGraph: {
    title: 'HealthCheck - Health and Fitness Calculators',
    description:
      'Your go-to resource for health and fitness calculators. Calculate body fat, BMI, calorie needs, and more.',
    url: 'https://www.heathcheck.info',
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
  category: 'health',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Core Web Vitals optimizations */}
        <link rel="preconnect" href="https://www.heathcheck.info" />
        <link rel="dns-prefetch" href="https://www.heathcheck.info" />

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

        {/* Google Analytics Script - loaded after page is interactive for better performance */}

        {/* Google AdSense Script */}
        {process.env.NODE_ENV === 'production' && (
          <script
            async
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4505962980988232"
            crossOrigin="anonymous"
          />
        )}
      </head>
      <body>
        <LayoutProviders>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow container mx-auto px-4 py-8">{children}</main>
            <Footer />
          </div>

          {/* Analytics component for tracking */}
          <Analytics />

          {/* PWA initialization and service worker registration */}
          <PWAInit />

          {/* Global structured data for organization and website */}
          <GlobalStructuredData />

          {/* Google Analytics - loaded after page is interactive for better performance */}
          {process.env.NODE_ENV === 'production' && process.env.NEXT_PUBLIC_GA_ID && (
            <>
              <Script
                src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
                strategy="afterInteractive"
              />
              <Script id="google-analytics" strategy="afterInteractive">
                {`
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
                `}
              </Script>
            </>
          )}
        </LayoutProviders>
      </body>
    </html>
  );
}
