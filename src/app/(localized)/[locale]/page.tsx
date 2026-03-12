import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import CalculatorCard from '@/components/CalculatorCard';
import {
  defaultLocale,
  isSupportedLocale,
  prefixPathWithLocale,
  type SupportedLocale,
} from '@/i18n/config';

const HOME_METADATA: Record<
  SupportedLocale,
  { title: string; description: string; keywords: string }
> = {
  en: {
    title: 'HealthCheck - Free Body Fat, BMI, TDEE Calculators',
    description:
      'Free, accurate calculators for body fat percentage, BMI, TDEE, calorie deficit, and more. Evidence-based tools to help you achieve your health goals.',
    keywords:
      'body fat calculator, BMI calculator, TDEE calculator, calorie deficit calculator, weight loss calculator, fitness calculators, health calculators, waist-to-hip ratio, ABSI calculator',
  },
  es: {
    title: 'HealthCheck - Calculadoras gratis de grasa corporal, IMC y TDEE',
    description:
      'Calculadoras gratuitas y precisas para porcentaje de grasa corporal, IMC, TDEE, déficit calórico y más. Herramientas basadas en evidencia para ayudarte a alcanzar tus objetivos de salud.',
    keywords:
      'calculadora de grasa corporal, calculadora IMC, calculadora TDEE, calculadora de déficit calórico, calculadora para bajar de peso, calculadoras fitness, calculadoras de salud, relación cintura-cadera, calculadora ABSI',
  },
  fr: {
    title: 'HealthCheck - Calculateurs gratuits masse grasse, IMC et TDEE',
    description:
      'Des calculateurs gratuits et précis pour le pourcentage de masse grasse, l’IMC, le TDEE, le déficit calorique et plus. Des outils fondés sur des preuves pour atteindre vos objectifs.',
    keywords:
      'calculateur masse grasse, calculateur IMC, calculateur TDEE, calculateur déficit calorique, perte de poids, calculateurs fitness, calculateurs santé, ratio taille-hanches, calculateur ABSI',
  },
  de: {
    title: 'HealthCheck - Kostenlose Körperfett-, BMI- und TDEE-Rechner',
    description:
      'Kostenlose, präzise Rechner für Körperfettanteil, BMI, TDEE, Kaloriendefizit und mehr. Evidenzbasierte Tools für Ihre Gesundheitsziele.',
    keywords:
      'Körperfett-Rechner, BMI-Rechner, TDEE-Rechner, Kaloriendefizit-Rechner, Abnehmrechner, Fitnessrechner, Gesundheitsrechner, Taille-Hüft-Verhältnis, ABSI-Rechner',
  },
  pt: {
    title: 'HealthCheck - Calculadoras gratuitas de gordura corporal, IMC e TDEE',
    description:
      'Calculadoras gratuitas e precisas para percentual de gordura corporal, IMC, TDEE, déficit calórico e mais. Ferramentas baseadas em evidências para ajudar você a atingir suas metas.',
    keywords:
      'calculadora de gordura corporal, calculadora IMC, calculadora TDEE, calculadora de déficit calórico, calculadora de emagrecimento, calculadoras fitness, calculadoras de saúde, relação cintura-quadril, calculadora ABSI',
  },
  zh: {
    title: 'HealthCheck - 免费体脂、BMI、TDEE 计算器',
    description:
      '免费且准确的体脂率、BMI、TDEE、热量缺口等计算器。基于证据的工具，帮助你实现健康目标。',
    keywords:
      '体脂计算器, BMI 计算器, TDEE 计算器, 热量缺口计算器, 减脂计算器, 健身计算器, 健康计算器, 腰臀比, ABSI 计算器',
  },
};

const HOME_UI_COPY: Record<
  SupportedLocale,
  {
    platformLabel: string;
    heroTitle: string;
    heroBody: string;
    ctaCalculators: string;
    ctaBlog: string;
    searchPlaceholder: string;
    popularTitle: string;
    popularBody: string;
    viewAllCategories: string;
    blogTitle: string;
    blogBody: string;
    readArticle: string;
    exploreAllBlog: string;
  }
> = {
  en: {
    platformLabel: 'HealthCheck Platform',
    heroTitle: 'Smarter health calculators with a cleaner, faster experience',
    heroBody:
      'Explore modern tools for body composition, calorie planning, and performance goals — now with improved visuals, stronger interactions, and easier navigation.',
    ctaCalculators: 'Browse calculators',
    ctaBlog: 'Read the blog',
    searchPlaceholder: 'Search calculators, guides, and blog posts…',
    popularTitle: 'Most popular calculators',
    popularBody: 'Quickly jump into the tools users rely on most.',
    viewAllCategories: 'View all categories →',
    blogTitle: 'From the blog',
    blogBody: 'Evidence-based explainers and practical guides.',
    readArticle: 'Read article →',
    exploreAllBlog: 'Explore all blog articles',
  },
  es: {
    platformLabel: 'Plataforma HealthCheck',
    heroTitle: 'Calculadoras de salud más inteligentes con una experiencia más limpia y rápida',
    heroBody:
      'Explora herramientas modernas para composición corporal, planificación de calorías y objetivos de rendimiento, ahora con mejores visuales, interacciones más sólidas y navegación más fácil.',
    ctaCalculators: 'Explorar calculadoras',
    ctaBlog: 'Leer el blog',
    searchPlaceholder: 'Busca calculadoras, guías y artículos del blog…',
    popularTitle: 'Calculadoras más populares',
    popularBody: 'Accede rápido a las herramientas en las que más confían los usuarios.',
    viewAllCategories: 'Ver todas las categorías →',
    blogTitle: 'Del blog',
    blogBody:
      'Explicaciones basadas en evidencia y guías prácticas. (Los artículos están disponibles por ahora en inglés.)',
    readArticle: 'Leer artículo →',
    exploreAllBlog: 'Explorar todos los artículos del blog',
  },
  fr: {
    platformLabel: 'Plateforme HealthCheck',
    heroTitle:
      'Des calculateurs santé plus intelligents, avec une expérience plus fluide et plus rapide',
    heroBody:
      'Découvrez des outils modernes pour la composition corporelle, la planification des calories et les objectifs de performance — avec des visuels améliorés, de meilleures interactions et une navigation plus simple.',
    ctaCalculators: 'Parcourir les calculateurs',
    ctaBlog: 'Lire le blog',
    searchPlaceholder: 'Rechercher des calculateurs, guides et articles de blog…',
    popularTitle: 'Calculateurs les plus populaires',
    popularBody: 'Accédez rapidement aux outils les plus utilisés.',
    viewAllCategories: 'Voir toutes les catégories →',
    blogTitle: 'Du blog',
    blogBody:
      'Explications fondées sur des preuves et guides pratiques. (Articles actuellement disponibles en anglais.)',
    readArticle: 'Lire l’article →',
    exploreAllBlog: 'Voir tous les articles du blog',
  },
  de: {
    platformLabel: 'HealthCheck Plattform',
    heroTitle: 'Intelligentere Gesundheitsrechner mit einem klareren, schnelleren Erlebnis',
    heroBody:
      'Entdecken Sie moderne Tools für Körperzusammensetzung, Kalorienplanung und Leistungsziele — jetzt mit besseren Visuals, stärkeren Interaktionen und einfacher Navigation.',
    ctaCalculators: 'Rechner entdecken',
    ctaBlog: 'Blog lesen',
    searchPlaceholder: 'Rechner, Guides und Blogartikel suchen…',
    popularTitle: 'Beliebteste Rechner',
    popularBody: 'Schnell zu den Tools, die Nutzer am häufigsten verwenden.',
    viewAllCategories: 'Alle Kategorien ansehen →',
    blogTitle: 'Aus dem Blog',
    blogBody:
      'Evidenzbasierte Erklärungen und praktische Guides. (Artikel derzeit auf Englisch verfügbar.)',
    readArticle: 'Artikel lesen →',
    exploreAllBlog: 'Alle Blogartikel entdecken',
  },
  pt: {
    platformLabel: 'Plataforma HealthCheck',
    heroTitle: 'Calculadoras de saúde mais inteligentes, com uma experiência mais limpa e rápida',
    heroBody:
      'Explore ferramentas modernas para composição corporal, planejamento de calorias e metas de performance — agora com visuais melhores, interações mais fortes e navegação mais fácil.',
    ctaCalculators: 'Ver calculadoras',
    ctaBlog: 'Ler o blog',
    searchPlaceholder: 'Pesquisar calculadoras, guias e posts do blog…',
    popularTitle: 'Calculadoras mais populares',
    popularBody: 'Acesse rapidamente as ferramentas que os usuários mais utilizam.',
    viewAllCategories: 'Ver todas as categorias →',
    blogTitle: 'Do blog',
    blogBody:
      'Explicações baseadas em evidências e guias práticos. (Artigos disponíveis no momento em inglês.)',
    readArticle: 'Ler artigo →',
    exploreAllBlog: 'Explorar todos os artigos do blog',
  },
  zh: {
    platformLabel: 'HealthCheck 平台',
    heroTitle: '更聪明的健康计算器，更清爽、更快速的体验',
    heroBody:
      '探索用于体成分、热量规划和运动表现目标的现代工具，现在拥有更好的视觉、更强的交互和更便捷的导航。',
    ctaCalculators: '浏览计算器',
    ctaBlog: '阅读博客',
    searchPlaceholder: '搜索计算器、指南和博客文章…',
    popularTitle: '最受欢迎的计算器',
    popularBody: '快速进入用户最常用的工具。',
    viewAllCategories: '查看全部分类 →',
    blogTitle: '来自博客',
    blogBody: '基于证据的解释与实用指南。（文章目前以英文提供。）',
    readArticle: '阅读文章 →',
    exploreAllBlog: '浏览所有博客文章',
  },
};

const FEATURED_CALCULATORS_COPY: Record<
  SupportedLocale,
  Array<{ title: string; description: string }>
> = {
  en: [
    {
      title: 'Body Fat Calculator',
      description:
        'Calculate your body fat percentage using various methods including Navy, skinfold, and BMI.',
    },
    {
      title: 'Calorie Deficit Calculator',
      description: 'Estimate your daily calorie target for sustainable fat loss.',
    },
    {
      title: 'TDEE Calculator',
      description: 'Calculate your Total Daily Energy Expenditure to maintain your current weight.',
    },
    {
      title: 'BMI Calculator',
      description:
        'Calculate Body Mass Index for adults and children with age-appropriate insights.',
    },
    {
      title: 'Heart Rate Zones',
      description: 'Generate personalized training zones for endurance and cardio sessions.',
    },
    {
      title: 'Measurement Conversions',
      description: 'Convert weight, height, temperature, and more in one place.',
    },
  ],
  es: [
    {
      title: 'Calculadora de grasa corporal',
      description:
        'Calcula tu porcentaje de grasa corporal con varios métodos, incluido el método Navy, pliegues cutáneos e IMC.',
    },
    {
      title: 'Calculadora de déficit calórico',
      description: 'Estima tu objetivo diario de calorías para una pérdida de grasa sostenible.',
    },
    {
      title: 'Calculadora de TDEE',
      description: 'Calcula tu gasto energético diario total para mantener tu peso actual.',
    },
    {
      title: 'Calculadora de IMC',
      description:
        'Calcula el Índice de Masa Corporal para adultos y niños con información según la edad.',
    },
    {
      title: 'Zonas de frecuencia cardíaca',
      description:
        'Genera zonas de entrenamiento personalizadas para sesiones de resistencia y cardio.',
    },
    {
      title: 'Conversiones de medidas',
      description: 'Convierte peso, altura, temperatura y más en un solo lugar.',
    },
  ],
  fr: [
    {
      title: 'Calculateur de masse grasse',
      description:
        'Estimez votre pourcentage de masse grasse avec plusieurs méthodes, dont Navy, plis cutanés et IMC.',
    },
    {
      title: 'Calculateur de déficit calorique',
      description: 'Estimez votre objectif calorique quotidien pour une perte de graisse durable.',
    },
    {
      title: 'Calculateur TDEE',
      description:
        'Calculez votre dépense énergétique quotidienne totale pour maintenir votre poids actuel.',
    },
    {
      title: 'Calculateur IMC',
      description:
        'Calculez l’indice de masse corporelle pour adultes et enfants, avec des informations adaptées à l’âge.',
    },
    {
      title: 'Zones de fréquence cardiaque',
      description: 'Générez des zones d’entraînement personnalisées pour l’endurance et le cardio.',
    },
    {
      title: 'Conversions de mesures',
      description: 'Convertissez poids, taille, température et plus, au même endroit.',
    },
  ],
  de: [
    {
      title: 'Körperfett-Rechner',
      description:
        'Berechnen Sie Ihren Körperfettanteil mit verschiedenen Methoden, darunter Navy, Hautfalten und BMI.',
    },
    {
      title: 'Kaloriendefizit-Rechner',
      description: 'Schätzen Sie Ihr tägliches Kalorienziel für nachhaltigen Fettverlust.',
    },
    {
      title: 'TDEE-Rechner',
      description: 'Berechnen Sie Ihren täglichen Gesamtenergieverbrauch zur Gewichtserhaltung.',
    },
    {
      title: 'BMI-Rechner',
      description:
        'Berechnen Sie den Body-Mass-Index für Erwachsene und Kinder mit altersgerechten Hinweisen.',
    },
    {
      title: 'Herzfrequenz-Zonen',
      description:
        'Erstellen Sie personalisierte Trainingszonen für Ausdauer- und Cardio-Einheiten.',
    },
    {
      title: 'Einheiten-Umrechnungen',
      description: 'Wandeln Sie Gewicht, Größe, Temperatur und mehr an einem Ort um.',
    },
  ],
  pt: [
    {
      title: 'Calculadora de gordura corporal',
      description:
        'Calcule seu percentual de gordura corporal com vários métodos, incluindo Navy, dobras cutâneas e IMC.',
    },
    {
      title: 'Calculadora de déficit calórico',
      description: 'Estime sua meta diária de calorias para uma perda de gordura sustentável.',
    },
    {
      title: 'Calculadora de TDEE',
      description: 'Calcule seu gasto energético diário total para manter o peso atual.',
    },
    {
      title: 'Calculadora de IMC',
      description:
        'Calcule o Índice de Massa Corporal para adultos e crianças, com insights adequados à idade.',
    },
    {
      title: 'Zonas de frequência cardíaca',
      description: 'Gere zonas de treino personalizadas para sessões de resistência e cardio.',
    },
    {
      title: 'Conversões de medidas',
      description: 'Converta peso, altura, temperatura e mais em um só lugar.',
    },
  ],
  zh: [
    {
      title: '体脂计算器',
      description: '通过多种方法估算体脂率，包括 Navy 法、皮脂夹法和 BMI 法。',
    },
    {
      title: '热量缺口计算器',
      description: '估算可持续减脂的每日目标热量。',
    },
    {
      title: 'TDEE 计算器',
      description: '计算维持当前体重所需的每日总能量消耗。',
    },
    {
      title: 'BMI 计算器',
      description: '为成人和儿童计算 BMI，并提供适龄解读。',
    },
    {
      title: '心率区间',
      description: '生成适用于耐力与有氧训练的个性化心率区间。',
    },
    {
      title: '单位换算',
      description: '在同一页面换算体重、身高、温度等。',
    },
  ],
};

interface LocalizedHomeProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: LocalizedHomeProps): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  if (!isSupportedLocale(rawLocale)) return {};

  const locale = rawLocale as SupportedLocale;
  if (locale === defaultLocale) return {};

  const meta = HOME_METADATA[locale] ?? HOME_METADATA.en;

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: './',
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: './',
      siteName: 'HealthCheck',
      type: 'website',
    },
  };
}

const featuredIcons = {
  bodyFat: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-8 w-8"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
      />
    </svg>
  ),
  calorieDeficit: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-8 w-8"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M13 10V3L4 14h7v7l9-11h-7z"
      />
    </svg>
  ),
  tdee: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-8 w-8"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
      />
    </svg>
  ),
  bmi: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-8 w-8"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
      />
    </svg>
  ),
  heartRateZones: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-8 w-8"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
      />
    </svg>
  ),
  conversions: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-8 w-8"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
      />
    </svg>
  ),
};

export default async function LocalizedHome({ params }: LocalizedHomeProps) {
  const { locale: rawLocale } = await params;
  if (!isSupportedLocale(rawLocale)) {
    notFound();
  }

  const locale = rawLocale as SupportedLocale;
  if (locale === defaultLocale) {
    redirect('/');
  }

  const copy = HOME_UI_COPY[locale] ?? HOME_UI_COPY.en;
  const featured = FEATURED_CALCULATORS_COPY[locale] ?? FEATURED_CALCULATORS_COPY.en;

  const featuredCalculators = [
    {
      title: featured[0]!.title,
      description: featured[0]!.description,
      path: '/body-fat',
      icon: featuredIcons.bodyFat,
    },
    {
      title: featured[1]!.title,
      description: featured[1]!.description,
      path: '/calorie-deficit',
      icon: featuredIcons.calorieDeficit,
    },
    {
      title: featured[2]!.title,
      description: featured[2]!.description,
      path: '/tdee',
      icon: featuredIcons.tdee,
    },
    {
      title: featured[3]!.title,
      description: featured[3]!.description,
      path: '/bmi',
      icon: featuredIcons.bmi,
    },
    {
      title: featured[4]!.title,
      description: featured[4]!.description,
      path: '/heart-rate-zones',
      icon: featuredIcons.heartRateZones,
    },
    {
      title: featured[5]!.title,
      description: featured[5]!.description,
      path: '/conversions',
      icon: featuredIcons.conversions,
    },
  ];

  const calculatorsHref = prefixPathWithLocale('/calculators', locale);
  const blogHref = prefixPathWithLocale('/blog', locale);
  const searchHref = prefixPathWithLocale('/search', locale);

  return (
    <div className="space-y-14 md:space-y-20">
      <section className="glass-panel-strong relative overflow-hidden rounded-[2rem] px-6 py-14 md:px-12">
        <div className="absolute -left-12 top-8 h-44 w-44 rounded-full border-8 border-white/30" />
        <div className="absolute right-[-4.5rem] top-[-4rem] h-52 w-52 rounded-full bg-gradient-to-br from-white/45 via-indigo-100/20 to-transparent blur-2xl" />
        <div className="absolute bottom-[-5rem] right-14 h-52 w-52 rounded-full bg-gradient-to-tr from-indigo-400/20 to-transparent blur-2xl" />

        <div className="relative mx-auto max-w-6xl">
          <p className="animate-fade-in text-sm font-semibold uppercase tracking-[0.24em] text-accent/90">
            {copy.platformLabel}
          </p>
          <h1 className="mt-4 animate-slide-in-up text-4xl font-extrabold leading-tight text-slate-900 dark:text-white md:text-6xl">
            {copy.heroTitle}
          </h1>
          <p className="mt-5 max-w-3xl text-lg text-slate-700 dark:text-slate-200">
            {copy.heroBody}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href={calculatorsHref}
              className="rounded-full bg-accent px-6 py-3 font-semibold text-white shadow-xl shadow-accent/30 transition-all hover:-translate-y-0.5 hover:bg-accent-dark"
            >
              {copy.ctaCalculators}
            </Link>
            <Link
              href={blogHref}
              className="elevated-pill rounded-full px-6 py-3 font-semibold text-accent transition-all hover:-translate-y-0.5 hover:border-accent/45"
            >
              {copy.ctaBlog}
            </Link>
          </div>

          <Link
            href={searchHref}
            className="glass-panel mt-8 block rounded-2xl p-3 transition-all hover:-translate-y-0.5 hover:border-accent/40"
          >
            <div className="flex items-center gap-3 rounded-xl border border-white/50 bg-white/35 px-4 py-3 dark:border-indigo-200/10 dark:bg-indigo-100/5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-accent"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-4.35-4.35M10.8 18a7.2 7.2 0 100-14.4 7.2 7.2 0 000 14.4z"
                />
              </svg>
              <span className="text-slate-500 dark:text-slate-300">{copy.searchPlaceholder}</span>
            </div>
          </Link>
        </div>
      </section>

      <section>
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
              {copy.popularTitle}
            </h2>
            <p className="text-slate-600 dark:text-slate-300">{copy.popularBody}</p>
          </div>
          <Link
            href={calculatorsHref}
            className="text-sm font-semibold text-accent hover:underline"
          >
            {copy.viewAllCategories}
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featuredCalculators.map(calculator => (
            <CalculatorCard
              key={calculator.path}
              title={calculator.title}
              description={calculator.description}
              path={calculator.path}
              icon={calculator.icon}
            />
          ))}
        </div>
      </section>

      <section className="glass-panel rounded-3xl p-8">
        <div className="mb-6 text-center">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white">{copy.blogTitle}</h2>
          <p className="text-slate-600 dark:text-slate-300">{copy.blogBody}</p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {[
            {
              href: '/blog/calorie-deficit-myths',
              category: 'Weight Management',
              title: '5 Myths About Calorie Deficits Debunked',
              excerpt:
                'Discover why weight loss is not always linear and how to set realistic expectations.',
            },
            {
              href: '/blog/tdee-explained',
              category: 'Energy Expenditure',
              title: 'TDEE Explained: How Many Calories Do You Really Need?',
              excerpt: 'Understand each TDEE component and how it impacts your nutrition strategy.',
            },
            {
              href: '/blog/measuring-body-fat',
              category: 'Measurement Methods',
              title: 'The Pros and Cons of Different Body Fat Measurement Methods',
              excerpt:
                'Compare practical and clinical body fat methods by accuracy and convenience.',
            },
          ].map(post => (
            <Link
              key={post.href}
              href={prefixPathWithLocale(post.href, locale)}
              className="group rounded-2xl border border-white/45 bg-[linear-gradient(180deg,rgba(255,255,255,0.74),rgba(229,233,255,0.7))] p-5 transition-all hover:-translate-y-1 hover:border-accent/35 hover:shadow-[0_14px_30px_rgba(66,72,182,0.22)] dark:border-indigo-200/10 dark:bg-[linear-gradient(180deg,rgba(28,32,69,0.82),rgba(17,20,49,0.74))]"
            >
              <span className="inline-flex rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
                {post.category}
              </span>
              <h3 className="mt-3 text-lg font-bold tracking-tight text-slate-900 dark:text-white">
                {post.title}
              </h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{post.excerpt}</p>
              <p className="mt-4 text-sm font-semibold text-accent">{copy.readArticle}</p>
            </Link>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link
            href={blogHref}
            className="elevated-pill inline-flex rounded-full px-6 py-3 font-semibold text-accent transition-all hover:-translate-y-0.5 hover:border-accent/40"
          >
            {copy.exploreAllBlog}
          </Link>
        </div>
      </section>
    </div>
  );
}
