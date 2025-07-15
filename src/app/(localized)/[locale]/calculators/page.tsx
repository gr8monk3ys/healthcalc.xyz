import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import Breadcrumb from '@/components/Breadcrumb';
import { CALCULATOR_HUBS, getCalculatorsForHub } from '@/constants/calculatorCatalog';
import { getLocalizedCalculatorHub } from '@/i18n/calculatorHubs';
import {
  defaultLocale,
  isSupportedLocale,
  prefixPathWithLocale,
  type SupportedLocale,
} from '@/i18n/config';

interface LocalizedCalculatorCategoriesProps {
  params: Promise<{ locale: string }>;
}

const PAGE_COPY: Record<
  SupportedLocale,
  {
    metaTitle: string;
    metaDescription: string;
    breadcrumbCalculators: string;
    pageTitle: string;
    pageSubtitle: string;
    viewCalculators: string;
  }
> = {
  en: {
    metaTitle: 'Calculator Categories | HealthCheck',
    metaDescription:
      'Browse HealthCheck calculator categories for weight loss, body composition, nutrition, performance, wellness, pregnancy, and more.',
    breadcrumbCalculators: 'Calculators',
    pageTitle: 'Calculator Categories',
    pageSubtitle: 'Explore calculators by category to find the exact tool you need faster.',
    viewCalculators: 'View calculators →',
  },
  es: {
    metaTitle: 'Categorías de calculadoras | HealthCheck',
    metaDescription:
      'Explora categorías de calculadoras de HealthCheck: pérdida de peso, composición corporal, nutrición, rendimiento, bienestar, embarazo y más.',
    breadcrumbCalculators: 'Calculadoras',
    pageTitle: 'Categorías de calculadoras',
    pageSubtitle:
      'Explora calculadoras por categoría para encontrar la herramienta exacta más rápido.',
    viewCalculators: 'Ver calculadoras →',
  },
  fr: {
    metaTitle: 'Catégories de calculateurs | HealthCheck',
    metaDescription:
      'Parcourez les catégories de calculateurs HealthCheck : perte de poids, composition corporelle, nutrition, performance, bien-être, grossesse et plus.',
    breadcrumbCalculators: 'Calculateurs',
    pageTitle: 'Catégories de calculateurs',
    pageSubtitle:
      'Explorez les calculateurs par catégorie pour trouver plus vite l’outil dont vous avez besoin.',
    viewCalculators: 'Voir les calculateurs →',
  },
  de: {
    metaTitle: 'Rechner-Kategorien | HealthCheck',
    metaDescription:
      'Durchsuchen Sie HealthCheck-Rechner-Kategorien für Abnehmen, Körperzusammensetzung, Ernährung, Training, Regeneration, Schwangerschaft und mehr.',
    breadcrumbCalculators: 'Rechner',
    pageTitle: 'Rechner-Kategorien',
    pageSubtitle: 'Entdecken Sie Rechner nach Kategorie, um schneller das passende Tool zu finden.',
    viewCalculators: 'Rechner ansehen →',
  },
  pt: {
    metaTitle: 'Categorias de calculadoras | HealthCheck',
    metaDescription:
      'Navegue pelas categorias de calculadoras da HealthCheck: emagrecimento, composição corporal, nutrição, performance, bem-estar, gravidez e mais.',
    breadcrumbCalculators: 'Calculadoras',
    pageTitle: 'Categorias de calculadoras',
    pageSubtitle:
      'Explore calculadoras por categoria para encontrar a ferramenta certa mais rápido.',
    viewCalculators: 'Ver calculadoras →',
  },
  zh: {
    metaTitle: '计算器分类 | HealthCheck',
    metaDescription:
      '浏览 HealthCheck 的计算器分类：减脂与体重管理、体成分、营养、训练表现、恢复、孕期等。',
    breadcrumbCalculators: '计算器',
    pageTitle: '计算器分类',
    pageSubtitle: '按类别浏览计算器，更快找到你需要的工具。',
    viewCalculators: '查看计算器 →',
  },
};

export async function generateMetadata({
  params,
}: LocalizedCalculatorCategoriesProps): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  if (!isSupportedLocale(rawLocale)) return {};
  const locale = rawLocale as SupportedLocale;
  if (locale === defaultLocale) return {};

  const copy = PAGE_COPY[locale] ?? PAGE_COPY.en;
  return {
    title: copy.metaTitle,
    description: copy.metaDescription,
    alternates: {
      canonical: './',
    },
    openGraph: {
      title: copy.metaTitle,
      description: copy.metaDescription,
      url: './',
    },
  };
}

export default async function CalculatorCategoriesPage({
  params,
}: LocalizedCalculatorCategoriesProps) {
  const { locale: rawLocale } = await params;
  if (!isSupportedLocale(rawLocale)) {
    notFound();
  }

  const locale = rawLocale as SupportedLocale;
  if (locale === defaultLocale) {
    redirect('/calculators');
  }

  const copy = PAGE_COPY[locale] ?? PAGE_COPY.en;

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <Breadcrumb customItems={[{ name: copy.breadcrumbCalculators, path: '/calculators' }]} />

      <h1 className="text-3xl md:text-4xl font-bold mb-2">{copy.pageTitle}</h1>
      <p className="text-gray-600 mb-8">{copy.pageSubtitle}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {CALCULATOR_HUBS.map(hub => {
          const localizedHub = getLocalizedCalculatorHub(locale, hub.slug) ?? {
            title: hub.title,
            description: hub.description,
          };
          const count = getCalculatorsForHub(hub.slug).length;
          const href = prefixPathWithLocale(`/calculators/${hub.slug}`, locale);

          return (
            <Link
              key={hub.slug}
              href={href}
              className="neumorph rounded-xl p-6 transition-all hover:shadow-neumorph-inset"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-xl font-semibold mb-2">{localizedHub.title}</h2>
                  <p className="text-sm text-gray-600">{localizedHub.description}</p>
                </div>
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-accent/10 text-accent font-semibold">
                  {count}
                </span>
              </div>
              <div className="text-sm text-accent font-medium mt-4">{copy.viewCalculators}</div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
