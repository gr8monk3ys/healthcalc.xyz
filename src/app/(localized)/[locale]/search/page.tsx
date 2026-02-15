import React from 'react';
import type { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import { SearchPage } from '@/components/Search';
import StructuredData from '@/components/StructuredData';
import { getPublicSiteUrl } from '@/lib/site';
import {
  defaultLocale,
  isSupportedLocale,
  prefixPathWithLocale,
  type SupportedLocale,
} from '@/i18n/config';

interface LocalizedSearchProps {
  params: Promise<{ locale: string }>;
}

type SearchCopy = {
  metaTitle: string;
  metaDescription: string;
  crumbHome: string;
  crumbSearch: string;
};

const COPY: Record<SupportedLocale, SearchCopy> = {
  en: {
    metaTitle: 'Search | HealthCheck',
    metaDescription:
      'Search for health and fitness calculators, articles, and information on HealthCheck.',
    crumbHome: 'Home',
    crumbSearch: 'Search',
  },
  es: {
    metaTitle: 'Buscar | HealthCheck',
    metaDescription:
      'Busca calculadoras de salud y fitness, artículos e información en HealthCheck.',
    crumbHome: 'Inicio',
    crumbSearch: 'Buscar',
  },
  fr: {
    metaTitle: 'Rechercher | HealthCheck',
    metaDescription:
      'Recherchez des calculateurs santé et fitness, des articles et des informations sur HealthCheck.',
    crumbHome: 'Accueil',
    crumbSearch: 'Recherche',
  },
  de: {
    metaTitle: 'Suche | HealthCheck',
    metaDescription:
      'Suchen Sie nach Gesundheits- und Fitnessrechnern, Artikeln und Informationen auf HealthCheck.',
    crumbHome: 'Startseite',
    crumbSearch: 'Suche',
  },
  pt: {
    metaTitle: 'Buscar | HealthCheck',
    metaDescription:
      'Pesquise calculadoras de saúde e fitness, artigos e informações na HealthCheck.',
    crumbHome: 'Início',
    crumbSearch: 'Busca',
  },
  zh: {
    metaTitle: '搜索 | HealthCheck',
    metaDescription: '在 HealthCheck 上搜索健康与健身计算器、文章与信息内容。',
    crumbHome: '首页',
    crumbSearch: '搜索',
  },
};

export async function generateMetadata({ params }: LocalizedSearchProps): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  if (!isSupportedLocale(rawLocale)) return {};

  const locale = rawLocale as SupportedLocale;
  if (locale === defaultLocale) return {};

  const copy = COPY[locale] ?? COPY.en;
  return {
    title: copy.metaTitle,
    description: copy.metaDescription,
    alternates: { canonical: './' },
    openGraph: { title: copy.metaTitle, description: copy.metaDescription, url: './' },
  };
}

export default async function LocalizedSearchPage({ params }: LocalizedSearchProps) {
  const { locale: rawLocale } = await params;
  if (!isSupportedLocale(rawLocale)) {
    notFound();
  }

  const locale = rawLocale as SupportedLocale;
  if (locale === defaultLocale) {
    redirect('/search');
  }

  const siteUrl = getPublicSiteUrl();
  const copy = COPY[locale] ?? COPY.en;
  const localizedHomeUrl = `${siteUrl}${prefixPathWithLocale('/', locale)}`;
  const localizedSearchUrl = `${siteUrl}${prefixPathWithLocale('/search', locale)}`;

  return (
    <>
      <SearchPage />

      {/* Structured data for breadcrumb */}
      <StructuredData
        data={{
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              name: copy.crumbHome,
              item: localizedHomeUrl,
            },
            {
              '@type': 'ListItem',
              position: 2,
              name: copy.crumbSearch,
              item: localizedSearchUrl,
            },
          ],
        }}
      />

      {/* Structured data for search action */}
      <StructuredData
        data={{
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          url: localizedHomeUrl,
          potentialAction: {
            '@type': 'SearchAction',
            target: {
              '@type': 'EntryPoint',
              urlTemplate: `${localizedSearchUrl}?q={search_term_string}`,
            },
            'query-input': 'required name=search_term_string',
          },
        }}
      />
    </>
  );
}
