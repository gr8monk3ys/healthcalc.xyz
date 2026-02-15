import '../../globals.css';
import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import GlobalStructuredData from '@/components/GlobalStructuredData';
import Preconnect from '@/components/Preconnect';
import React, { ReactNode } from 'react';
import PWAInit from '@/components/PWAInit';
import SkipToMainLink from '@/components/SkipToMainLink';
import { getAdSenseScriptSrc } from '@/lib/adsense';
import { getPublicSiteUrl } from '@/lib/site';
import VercelAnalyticsGate from '@/components/VercelAnalyticsGate';
import { Plus_Jakarta_Sans, Sora } from 'next/font/google';
import LayoutProviders from '@/components/LayoutProviders';
import {
  defaultLocale,
  isSupportedLocale,
  localeToHtmlLang,
  localeToOpenGraphLocale,
  type SupportedLocale,
} from '@/i18n/config';
import { isLocaleIndexable } from '@/i18n/indexing';
import { notFound, redirect } from 'next/navigation';

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

interface LocalizedLayoutProps {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}

export function generateStaticParams(): Array<{ locale: SupportedLocale }> {
  // Only generate non-default locale roots (e.g. "/es", "/fr").
  return (Object.keys(localeToHtmlLang) as SupportedLocale[])
    .filter(locale => locale !== defaultLocale)
    .map(locale => ({ locale }));
}

export async function generateMetadata({ params }: LocalizedLayoutProps): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale: SupportedLocale | null = isSupportedLocale(rawLocale) ? rawLocale : null;

  // Default locale should never be served with an explicit prefix.
  if (!locale || locale === defaultLocale) {
    return {};
  }

  const indexable = isLocaleIndexable(locale);

  const localizedMeta: Record<
    SupportedLocale,
    { title: string; description: string; keywords: string; ogAlt: string }
  > = {
    en: {
      title: 'HealthCheck - Health and Fitness Calculators',
      description:
        'Your go-to resource for health and fitness calculators. Calculate body fat, BMI, calorie needs, and more.',
      keywords: 'health calculator, fitness calculator, weight management, body fat, BMI, TDEE',
      ogAlt: 'HealthCheck - Health and Fitness Calculators',
    },
    es: {
      title: 'HealthCheck - Calculadoras de salud y fitness',
      description:
        'Tu recurso de confianza para calculadoras de salud y fitness. Calcula grasa corporal, IMC, calorías diarias y más.',
      keywords:
        'calculadora de salud, calculadora fitness, control de peso, grasa corporal, IMC, TDEE',
      ogAlt: 'HealthCheck - Calculadoras de salud y fitness',
    },
    fr: {
      title: 'HealthCheck - Calculateurs santé et fitness',
      description:
        'Votre référence pour les calculateurs santé et fitness. Calculez la masse grasse, l’IMC, vos calories quotidiennes et plus encore.',
      keywords: 'calculateur santé, calculateur fitness, gestion du poids, masse grasse, IMC, TDEE',
      ogAlt: 'HealthCheck - Calculateurs santé et fitness',
    },
    de: {
      title: 'HealthCheck - Gesundheits- und Fitnessrechner',
      description:
        'Ihre Anlaufstelle für Gesundheits- und Fitnessrechner. Berechnen Sie Körperfett, BMI, Kalorienbedarf und mehr.',
      keywords: 'gesundheitsrechner, fitnessrechner, gewichtsmanagement, körperfett, BMI, TDEE',
      ogAlt: 'HealthCheck - Gesundheits- und Fitnessrechner',
    },
    pt: {
      title: 'HealthCheck - Calculadoras de saúde e fitness',
      description:
        'Seu recurso principal para calculadoras de saúde e fitness. Calcule gordura corporal, IMC, calorias diárias e muito mais.',
      keywords:
        'calculadora de saúde, calculadora fitness, controle de peso, gordura corporal, IMC, TDEE',
      ogAlt: 'HealthCheck - Calculadoras de saúde e fitness',
    },
    zh: {
      title: 'HealthCheck - 健康与健身计算器',
      description: '你的健康与健身计算器平台。计算体脂、BMI、每日热量需求等。',
      keywords: '健康计算器, 健身计算器, 体重管理, 体脂, BMI, TDEE',
      ogAlt: 'HealthCheck - 健康与健身计算器',
    },
  };

  const meta = localizedMeta[locale] ?? localizedMeta.en;

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
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
      title: meta.title,
      description: meta.description,
      url: siteUrl,
      siteName: 'HealthCheck',
      images: [
        {
          url: '/images/og-image.jpg',
          width: 1200,
          height: 630,
          alt: meta.ogAlt,
        },
      ],
      locale: localeToOpenGraphLocale[locale],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: meta.title,
      description: meta.description,
      images: ['/images/og-image.jpg'],
    },
    robots: indexable
      ? {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
          },
        }
      : {
          index: false,
          follow: true,
          googleBot: {
            index: false,
            follow: true,
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
}

export default async function RootLayout({ children, params }: LocalizedLayoutProps) {
  const { locale: rawLocale } = await params;
  if (!isSupportedLocale(rawLocale)) {
    notFound();
  }

  const locale = rawLocale as SupportedLocale;
  if (locale === defaultLocale) {
    redirect('/');
  }

  return (
    <html lang={localeToHtmlLang[locale]} suppressHydrationWarning>
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
        <LayoutProviders initialLocale={locale}>
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
