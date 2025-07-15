import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import BlogIndexClient from '@/components/BlogIndexClient';
import { BLOG_REGISTRY as BLOG_POSTS } from '@/lib/blog/registry';
import {
  defaultLocale,
  isSupportedLocale,
  prefixPathWithLocale,
  type SupportedLocale,
} from '@/i18n/config';

interface LocalizedBlogPageProps {
  params: Promise<{ locale: string }>;
}

type BlogPageCopy = {
  metaTitle: string;
  metaDescription: string;
  pageTitle: string;
  pageDescription: string;
  articlesNote?: string;
  rssLabel: string;
  calculatorsTitle: string;
  calculatorsBody: string;
  calculatorCards: Array<{ href: string; title: string; description: string }>;
  viewAllCalculators: string;
};

const COPY: Record<SupportedLocale, BlogPageCopy> = {
  en: {
    metaTitle: 'Health & Fitness Blog | HealthCheck',
    metaDescription:
      'Explore articles on weight management, body composition, nutrition, and fitness to help you make informed decisions about your health.',
    pageTitle: 'Health & Fitness Blog',
    pageDescription:
      'Explore evidence-based articles on weight management, body composition, nutrition, and fitness to help you make informed decisions about your health.',
    rssLabel: 'RSS Feed',
    calculatorsTitle: 'Looking for Our Calculators?',
    calculatorsBody:
      'Our health and fitness calculators can help you track and plan your fitness journey with precision.',
    calculatorCards: [
      {
        href: '/body-fat',
        title: 'Body Fat Calculator',
        description: 'Calculate your body fat percentage using various methods',
      },
      {
        href: '/body-fat-burn',
        title: 'Body Fat Burn Calculator',
        description: 'Calculate calories burned during activities and weight loss timeline',
      },
      {
        href: '/tdee',
        title: 'TDEE Calculator',
        description: 'Calculate your Total Daily Energy Expenditure',
      },
      {
        href: '/calorie-deficit',
        title: 'Calorie Deficit Calculator',
        description: 'Discover how long to reach your goal weight',
      },
    ],
    viewAllCalculators: 'View all calculators →',
  },
  es: {
    metaTitle: 'Blog de salud y fitness | HealthCheck',
    metaDescription:
      'Explora artículos sobre control de peso, composición corporal, nutrición y fitness para tomar decisiones informadas sobre tu salud.',
    pageTitle: 'Blog de salud y fitness',
    pageDescription:
      'Explora artículos basados en evidencia sobre control de peso, composición corporal, nutrición y fitness para tomar decisiones informadas sobre tu salud.',
    articlesNote: 'Los artículos se publican actualmente en inglés.',
    rssLabel: 'RSS',
    calculatorsTitle: '¿Buscas nuestras calculadoras?',
    calculatorsBody:
      'Nuestras calculadoras de salud y fitness te ayudan a seguir y planificar tu progreso con precisión.',
    calculatorCards: [
      {
        href: '/body-fat',
        title: 'Calculadora de grasa corporal',
        description: 'Calcula tu porcentaje de grasa corporal con varios métodos',
      },
      {
        href: '/body-fat-burn',
        title: 'Calculadora de quema de grasa',
        description: 'Calcula calorías quemadas en actividades y tu cronograma de pérdida de peso',
      },
      {
        href: '/tdee',
        title: 'Calculadora de TDEE',
        description: 'Calcula tu gasto energético diario total',
      },
      {
        href: '/calorie-deficit',
        title: 'Calculadora de déficit calórico',
        description: 'Descubre cuánto tiempo necesitas para alcanzar tu peso objetivo',
      },
    ],
    viewAllCalculators: 'Ver todas las calculadoras →',
  },
  fr: {
    metaTitle: 'Blog santé et fitness | HealthCheck',
    metaDescription:
      'Découvrez des articles sur la gestion du poids, la composition corporelle, la nutrition et le fitness pour vous aider à prendre des décisions éclairées.',
    pageTitle: 'Blog santé et fitness',
    pageDescription:
      'Découvrez des articles fondés sur des preuves sur la gestion du poids, la composition corporelle, la nutrition et le fitness pour vous aider à prendre des décisions éclairées.',
    articlesNote: 'Les articles sont actuellement publiés en anglais.',
    rssLabel: 'RSS',
    calculatorsTitle: 'Vous cherchez nos calculateurs ?',
    calculatorsBody:
      'Nos calculateurs santé et fitness peuvent vous aider à suivre et planifier votre parcours avec précision.',
    calculatorCards: [
      {
        href: '/body-fat',
        title: 'Calculateur de masse grasse',
        description: 'Calculez votre pourcentage de masse grasse avec plusieurs méthodes',
      },
      {
        href: '/body-fat-burn',
        title: 'Calculateur de combustion des graisses',
        description:
          'Calculez les calories brûlées et une estimation de votre timeline de perte de poids',
      },
      {
        href: '/tdee',
        title: 'Calculateur TDEE',
        description: 'Calculez votre dépense énergétique quotidienne totale',
      },
      {
        href: '/calorie-deficit',
        title: 'Calculateur de déficit calorique',
        description: 'Estimez le temps nécessaire pour atteindre votre objectif',
      },
    ],
    viewAllCalculators: 'Voir tous les calculateurs →',
  },
  de: {
    metaTitle: 'Gesundheits- und Fitness-Blog | HealthCheck',
    metaDescription:
      'Lesen Sie Artikel zu Gewichtsmanagement, Körperzusammensetzung, Ernährung und Fitness, um fundierte Entscheidungen für Ihre Gesundheit zu treffen.',
    pageTitle: 'Gesundheits- und Fitness-Blog',
    pageDescription:
      'Lesen Sie evidenzbasierte Artikel zu Gewichtsmanagement, Körperzusammensetzung, Ernährung und Fitness, um fundierte Entscheidungen für Ihre Gesundheit zu treffen.',
    articlesNote: 'Artikel sind derzeit auf Englisch verfügbar.',
    rssLabel: 'RSS',
    calculatorsTitle: 'Suchen Sie unsere Rechner?',
    calculatorsBody:
      'Unsere Gesundheits- und Fitnessrechner helfen Ihnen, Ihren Fortschritt präzise zu verfolgen und zu planen.',
    calculatorCards: [
      {
        href: '/body-fat',
        title: 'Körperfett-Rechner',
        description: 'Berechnen Sie Ihren Körperfettanteil mit verschiedenen Methoden',
      },
      {
        href: '/body-fat-burn',
        title: 'Fettverbrennung-Rechner',
        description: 'Berechnen Sie verbrannte Kalorien und eine Gewichtsverlust-Timeline',
      },
      {
        href: '/tdee',
        title: 'TDEE-Rechner',
        description: 'Berechnen Sie Ihren täglichen Gesamtenergieverbrauch',
      },
      {
        href: '/calorie-deficit',
        title: 'Kaloriendefizit-Rechner',
        description: 'Schätzen Sie, wie lange Sie bis zum Zielgewicht brauchen',
      },
    ],
    viewAllCalculators: 'Alle Rechner ansehen →',
  },
  pt: {
    metaTitle: 'Blog de saúde e fitness | HealthCheck',
    metaDescription:
      'Explore artigos sobre controle de peso, composição corporal, nutrição e fitness para tomar decisões mais informadas sobre sua saúde.',
    pageTitle: 'Blog de saúde e fitness',
    pageDescription:
      'Explore artigos baseados em evidências sobre controle de peso, composição corporal, nutrição e fitness para tomar decisões mais informadas sobre sua saúde.',
    articlesNote: 'Os artigos são publicados atualmente em inglês.',
    rssLabel: 'RSS',
    calculatorsTitle: 'Procurando nossas calculadoras?',
    calculatorsBody:
      'Nossas calculadoras de saúde e fitness ajudam você a acompanhar e planejar sua jornada com precisão.',
    calculatorCards: [
      {
        href: '/body-fat',
        title: 'Calculadora de gordura corporal',
        description: 'Calcule seu percentual de gordura corporal com vários métodos',
      },
      {
        href: '/body-fat-burn',
        title: 'Calculadora de queima de gordura',
        description: 'Calcule calorias queimadas e uma linha do tempo de perda de peso',
      },
      {
        href: '/tdee',
        title: 'Calculadora de TDEE',
        description: 'Calcule seu gasto energético diário total',
      },
      {
        href: '/calorie-deficit',
        title: 'Calculadora de déficit calórico',
        description: 'Descubra quanto tempo falta para atingir seu peso-alvo',
      },
    ],
    viewAllCalculators: 'Ver todas as calculadoras →',
  },
  zh: {
    metaTitle: '健康与健身博客 | HealthCheck',
    metaDescription: '浏览关于体重管理、体成分、营养与健身的文章，帮助你做出更明智的健康决策。',
    pageTitle: '健康与健身博客',
    pageDescription: '浏览基于证据的体重管理、体成分、营养与健身文章，帮助你做出更明智的健康决策。',
    articlesNote: '文章目前以英文发布。',
    rssLabel: 'RSS',
    calculatorsTitle: '想用我们的计算器？',
    calculatorsBody: '我们的健康与健身计算器可以帮助你更精准地跟踪并规划你的进展。',
    calculatorCards: [
      {
        href: '/body-fat',
        title: '体脂计算器',
        description: '使用多种方法估算体脂率',
      },
      {
        href: '/body-fat-burn',
        title: '脂肪燃烧计算器',
        description: '计算活动消耗的热量与减脂时间规划',
      },
      {
        href: '/tdee',
        title: 'TDEE 计算器',
        description: '计算每日总能量消耗',
      },
      {
        href: '/calorie-deficit',
        title: '热量缺口计算器',
        description: '估算达到目标体重所需时间',
      },
    ],
    viewAllCalculators: '查看全部计算器 →',
  },
};

export async function generateMetadata({ params }: LocalizedBlogPageProps): Promise<Metadata> {
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

export default async function LocalizedBlogPage({ params }: LocalizedBlogPageProps) {
  const { locale: rawLocale } = await params;
  if (!isSupportedLocale(rawLocale)) {
    notFound();
  }

  const locale = rawLocale as SupportedLocale;
  if (locale === defaultLocale) {
    redirect('/blog');
  }

  const copy = COPY[locale] ?? COPY.en;

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold">{copy.pageTitle}</h1>
        </div>
        <Link
          href="/feed.xml"
          className="text-sm text-accent hover:underline flex items-center gap-2"
        >
          <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" aria-hidden="true">
            <path d="M4.26 17.74a2.26 2.26 0 1 1 0 4.52 2.26 2.26 0 0 1 0-4.52zM2 22h2.26C4.26 14.56 9.44 9.38 16.88 9.38V7.12C8.18 7.12 2 13.3 2 22zM2 22h2.26c0-5.64 4.58-10.22 10.22-10.22v-2.26C6.9 9.52 2 15.42 2 22z" />
          </svg>
          {copy.rssLabel}
        </Link>
      </div>

      <p className="text-gray-600 mb-4">{copy.pageDescription}</p>
      {copy.articlesNote && <p className="text-sm text-gray-500 mb-8">{copy.articlesNote}</p>}

      <BlogIndexClient posts={BLOG_POSTS} />

      <div className="mt-12 neumorph p-6 rounded-lg">
        <h2 className="text-xl font-bold mb-4">{copy.calculatorsTitle}</h2>
        <p className="mb-4">{copy.calculatorsBody}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {copy.calculatorCards.map(card => (
            <Link
              key={card.href}
              href={prefixPathWithLocale(card.href, locale)}
              className="neumorph p-4 rounded-lg hover:shadow-neumorph-inset transition-all"
            >
              <h3 className="font-semibold">{card.title}</h3>
              <p className="text-sm text-gray-600">{card.description}</p>
            </Link>
          ))}
        </div>
        <div className="mt-4">
          <Link href={prefixPathWithLocale('/', locale)} className="text-accent hover:underline">
            {copy.viewAllCalculators}
          </Link>
        </div>
      </div>
    </div>
  );
}
