import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound, redirect } from 'next/navigation';
import Breadcrumb from '@/components/Breadcrumb';
import { getLocalizedCalculatorHub } from '@/i18n/calculatorHubs';
import {
  CALCULATOR_HUBS,
  getCalculatorHub,
  getCalculatorsForHub,
} from '@/constants/calculatorCatalog';
import {
  defaultLocale,
  isSupportedLocale,
  prefixPathWithLocale,
  supportedLocales,
  type SupportedLocale,
} from '@/i18n/config';

interface LocalizedCalculatorHubPageProps {
  params: Promise<{
    locale: string;
    hub: string;
  }>;
}

type HubPageCopy = {
  metaFallbackTitle: string;
  metaFallbackDescription: string;
  breadcrumbCalculators: string;
  title: (hubTitle: string) => string;
  metaTitle: (hubTitle: string) => string;
  viewDetails: string;
  browseAllCategories: string;
};

const COPY: Record<SupportedLocale, HubPageCopy> = {
  en: {
    metaFallbackTitle: 'Calculator Category | HealthCheck',
    metaFallbackDescription: 'Browse HealthCheck calculators by category.',
    breadcrumbCalculators: 'Calculators',
    title: hubTitle => `${hubTitle} Calculators`,
    metaTitle: hubTitle => `${hubTitle} Calculators | HealthCheck`,
    viewDetails: 'View details',
    browseAllCategories: 'Browse all categories →',
  },
  es: {
    metaFallbackTitle: 'Categoría de calculadoras | HealthCheck',
    metaFallbackDescription: 'Explora calculadoras de HealthCheck por categoría.',
    breadcrumbCalculators: 'Calculadoras',
    title: hubTitle => `Calculadoras de ${hubTitle}`,
    metaTitle: hubTitle => `Calculadoras de ${hubTitle} | HealthCheck`,
    viewDetails: 'Ver detalles',
    browseAllCategories: 'Ver todas las categorías →',
  },
  fr: {
    metaFallbackTitle: 'Catégorie de calculateurs | HealthCheck',
    metaFallbackDescription: 'Parcourez les calculateurs HealthCheck par catégorie.',
    breadcrumbCalculators: 'Calculateurs',
    title: hubTitle => `Calculateurs de ${hubTitle}`,
    metaTitle: hubTitle => `Calculateurs de ${hubTitle} | HealthCheck`,
    viewDetails: 'Voir les détails',
    browseAllCategories: 'Voir toutes les catégories →',
  },
  de: {
    metaFallbackTitle: 'Rechner-Kategorie | HealthCheck',
    metaFallbackDescription: 'Durchsuchen Sie HealthCheck-Rechner nach Kategorie.',
    breadcrumbCalculators: 'Rechner',
    title: hubTitle => `${hubTitle} Rechner`,
    metaTitle: hubTitle => `${hubTitle} Rechner | HealthCheck`,
    viewDetails: 'Details ansehen',
    browseAllCategories: 'Alle Kategorien ansehen →',
  },
  pt: {
    metaFallbackTitle: 'Categoria de calculadoras | HealthCheck',
    metaFallbackDescription: 'Navegue pelas calculadoras da HealthCheck por categoria.',
    breadcrumbCalculators: 'Calculadoras',
    title: hubTitle => `Calculadoras de ${hubTitle}`,
    metaTitle: hubTitle => `Calculadoras de ${hubTitle} | HealthCheck`,
    viewDetails: 'Ver detalhes',
    browseAllCategories: 'Ver todas as categorias →',
  },
  zh: {
    metaFallbackTitle: '计算器分类 | HealthCheck',
    metaFallbackDescription: '按类别浏览 HealthCheck 计算器。',
    breadcrumbCalculators: '计算器',
    title: hubTitle => `${hubTitle}计算器`,
    metaTitle: hubTitle => `${hubTitle}计算器 | HealthCheck`,
    viewDetails: '查看详情',
    browseAllCategories: '查看全部分类 →',
  },
};

export function generateStaticParams(): Array<{ locale: SupportedLocale; hub: string }> {
  const locales = supportedLocales.filter(locale => locale !== defaultLocale);
  return locales.flatMap(locale => CALCULATOR_HUBS.map(hub => ({ locale, hub: hub.slug })));
}

export async function generateMetadata({
  params,
}: LocalizedCalculatorHubPageProps): Promise<Metadata> {
  const { locale: rawLocale, hub: hubSlug } = await params;
  if (!isSupportedLocale(rawLocale)) return {};

  const locale = rawLocale as SupportedLocale;
  if (locale === defaultLocale) return {};

  const hub = getCalculatorHub(hubSlug);
  const copy = COPY[locale] ?? COPY.en;
  if (!hub) {
    return {
      title: copy.metaFallbackTitle,
      description: copy.metaFallbackDescription,
    };
  }

  const localizedHub = getLocalizedCalculatorHub(locale, hub.slug) ?? {
    title: hub.title,
    description: hub.description,
  };

  return {
    title: copy.metaTitle(localizedHub.title),
    description: localizedHub.description,
    alternates: { canonical: './' },
    openGraph: {
      title: copy.metaTitle(localizedHub.title),
      description: localizedHub.description,
      url: './',
    },
  };
}

export default async function LocalizedCalculatorHubPage({
  params,
}: LocalizedCalculatorHubPageProps) {
  const { locale: rawLocale, hub: hubSlug } = await params;
  if (!isSupportedLocale(rawLocale)) {
    notFound();
  }

  const locale = rawLocale as SupportedLocale;
  if (locale === defaultLocale) {
    redirect(`/calculators/${hubSlug}`);
  }

  const hub = getCalculatorHub(hubSlug);
  if (!hub) {
    notFound();
  }

  const copy = COPY[locale] ?? COPY.en;
  const localizedHub = getLocalizedCalculatorHub(locale, hub.slug) ?? {
    title: hub.title,
    description: hub.description,
  };
  const calculators = getCalculatorsForHub(hub.slug);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <Breadcrumb
        customItems={[
          { name: copy.breadcrumbCalculators, path: '/calculators' },
          { name: localizedHub.title, path: `/calculators/${hub.slug}` },
        ]}
      />

      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">{copy.title(localizedHub.title)}</h1>
        <p className="text-gray-600">{localizedHub.description}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {calculators.map(calculator => (
          <Link
            key={calculator.slug}
            href={prefixPathWithLocale(`/calculator/${calculator.slug}`, locale)}
            className="neumorph rounded-xl p-6 transition-all hover:shadow-neumorph-inset"
          >
            <div className="flex items-start gap-4">
              <div className="w-20 h-20 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                <Image
                  src={calculator.image}
                  alt={calculator.title}
                  width={80}
                  height={80}
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <div className="text-xs uppercase tracking-wide text-gray-500">
                  {calculator.category}
                </div>
                <h2 className="text-lg font-semibold mt-1">{calculator.title}</h2>
                <p className="text-sm text-gray-600 mt-2">{calculator.description}</p>
                <span className="text-sm text-accent font-medium mt-3 inline-flex items-center gap-1">
                  {copy.viewDetails} <span aria-hidden="true">→</span>
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-10">
        <Link
          href={prefixPathWithLocale('/calculators', locale)}
          className="text-accent hover:underline"
        >
          {copy.browseAllCategories}
        </Link>
      </div>
    </div>
  );
}
