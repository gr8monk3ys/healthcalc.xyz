import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import Breadcrumb from '@/components/Breadcrumb';
import { CALCULATOR_HUBS, getCalculatorsForHub } from '@/constants/calculatorCatalog';
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

const HUB_COPY: Record<SupportedLocale, Record<string, { title: string; description: string }>> = {
  en: {
    'weight-loss': {
      title: 'Weight Loss & Management',
      description: 'Plan sustainable fat loss with calorie, activity, and timeline tools.',
    },
    'body-composition': {
      title: 'Body Composition',
      description:
        'Understand body fat, shape, and healthy weight ranges with science-backed metrics.',
    },
    'metabolism-energy': {
      title: 'Metabolism & Energy',
      description: 'Calculate calories burned at rest and across daily activity.',
    },
    nutrition: {
      title: 'Nutrition & Macros',
      description: 'Set protein and macro targets for weight loss, maintenance, or muscle gain.',
    },
    performance: {
      title: 'Performance & Training',
      description: 'Optimize workouts with pacing, heart rate, and strength tools.',
    },
    'wellness-recovery': {
      title: 'Wellness & Recovery',
      description: 'Support hydration and sleep with daily recovery targets.',
    },
    pregnancy: {
      title: 'Pregnancy & Fertility',
      description: 'Track due dates and ovulation windows with confidence.',
    },
    'health-vitals': {
      title: 'Health & Vitals',
      description: 'Monitor key vitals like blood pressure with clear categories.',
    },
    utilities: {
      title: 'Utilities',
      description: 'Quick conversions for weight, height, and fitness-related units.',
    },
  },
  es: {
    'weight-loss': {
      title: 'Pérdida de peso y control',
      description:
        'Planifica una pérdida de grasa sostenible con herramientas de calorías, actividad y plazos.',
    },
    'body-composition': {
      title: 'Composición corporal',
      description:
        'Entiende la grasa corporal, la forma y los rangos de peso saludable con métricas basadas en ciencia.',
    },
    'metabolism-energy': {
      title: 'Metabolismo y energía',
      description: 'Calcula las calorías que quemas en reposo y a lo largo del día.',
    },
    nutrition: {
      title: 'Nutrición y macros',
      description:
        'Define objetivos de proteína y macronutrientes para perder grasa, mantener o ganar músculo.',
    },
    performance: {
      title: 'Rendimiento y entrenamiento',
      description:
        'Optimiza tus entrenamientos con herramientas de ritmo, frecuencia cardíaca y fuerza.',
    },
    'wellness-recovery': {
      title: 'Bienestar y recuperación',
      description: 'Apoya tu hidratación y sueño con objetivos diarios de recuperación.',
    },
    pregnancy: {
      title: 'Embarazo y fertilidad',
      description: 'Sigue la fecha de parto y la ventana de ovulación con confianza.',
    },
    'health-vitals': {
      title: 'Salud y signos vitales',
      description: 'Monitorea indicadores clave como la presión arterial con categorías claras.',
    },
    utilities: {
      title: 'Utilidades',
      description: 'Conversiones rápidas de peso, altura y unidades relacionadas con fitness.',
    },
  },
  fr: {
    'weight-loss': {
      title: 'Perte de poids et gestion',
      description:
        'Planifiez une perte de graisse durable avec des outils de calories, d’activité et de calendrier.',
    },
    'body-composition': {
      title: 'Composition corporelle',
      description:
        'Comprenez la masse grasse, la silhouette et des plages de poids santé avec des métriques fondées sur la science.',
    },
    'metabolism-energy': {
      title: 'Métabolisme et énergie',
      description: 'Calculez les calories brûlées au repos et au quotidien.',
    },
    nutrition: {
      title: 'Nutrition et macros',
      description:
        'Fixez des objectifs de protéines et de macros pour perdre, maintenir ou prendre du muscle.',
    },
    performance: {
      title: 'Performance et entraînement',
      description: 'Optimisez vos séances avec des outils de rythme, fréquence cardiaque et force.',
    },
    'wellness-recovery': {
      title: 'Bien-être et récupération',
      description:
        'Soutenez l’hydratation et le sommeil avec des objectifs de récupération quotidiens.',
    },
    pregnancy: {
      title: 'Grossesse et fertilité',
      description: 'Suivez la date d’accouchement et les fenêtres d’ovulation en toute confiance.',
    },
    'health-vitals': {
      title: 'Santé et signes vitaux',
      description:
        'Surveillez des paramètres clés comme la tension artérielle avec des catégories claires.',
    },
    utilities: {
      title: 'Outils',
      description:
        'Conversions rapides pour le poids, la taille et d’autres unités liées au fitness.',
    },
  },
  de: {
    'weight-loss': {
      title: 'Abnehmen & Gewichtsmanagement',
      description:
        'Planen Sie nachhaltigen Fettverlust mit Tools für Kalorien, Aktivität und Zeitplan.',
    },
    'body-composition': {
      title: 'Körperzusammensetzung',
      description:
        'Verstehen Sie Körperfett, Körperform und gesunde Gewichtsbereiche mit wissenschaftlich fundierten Kennzahlen.',
    },
    'metabolism-energy': {
      title: 'Stoffwechsel & Energie',
      description: 'Berechnen Sie Kalorienverbrauch in Ruhe und im Alltag.',
    },
    nutrition: {
      title: 'Ernährung & Makros',
      description: 'Setzen Sie Protein- und Makroziele für Abnehmen, Erhalt oder Muskelaufbau.',
    },
    performance: {
      title: 'Leistung & Training',
      description: 'Optimieren Sie Workouts mit Pace-, Herzfrequenz- und Kraft-Tools.',
    },
    'wellness-recovery': {
      title: 'Wohlbefinden & Regeneration',
      description: 'Unterstützen Sie Hydration und Schlaf mit täglichen Erholungszielen.',
    },
    pregnancy: {
      title: 'Schwangerschaft & Fruchtbarkeit',
      description: 'Verfolgen Sie Geburtstermine und Ovulationsfenster mit Zuversicht.',
    },
    'health-vitals': {
      title: 'Gesundheit & Vitalwerte',
      description: 'Behalten Sie wichtige Werte wie Blutdruck mit klaren Kategorien im Blick.',
    },
    utilities: {
      title: 'Hilfsmittel',
      description: 'Schnelle Umrechnungen für Gewicht, Größe und fitnessbezogene Einheiten.',
    },
  },
  pt: {
    'weight-loss': {
      title: 'Emagrecimento e controle',
      description:
        'Planeje uma perda de gordura sustentável com ferramentas de calorias, atividade e cronograma.',
    },
    'body-composition': {
      title: 'Composição corporal',
      description:
        'Entenda gordura corporal, formato e faixas de peso saudável com métricas baseadas em ciência.',
    },
    'metabolism-energy': {
      title: 'Metabolismo e energia',
      description: 'Calcule as calorias queimadas em repouso e ao longo do dia.',
    },
    nutrition: {
      title: 'Nutrição e macros',
      description: 'Defina metas de proteína e macros para emagrecer, manter ou ganhar músculo.',
    },
    performance: {
      title: 'Performance e treino',
      description: 'Otimize treinos com ferramentas de ritmo, frequência cardíaca e força.',
    },
    'wellness-recovery': {
      title: 'Bem-estar e recuperação',
      description: 'Apoie hidratação e sono com metas diárias de recuperação.',
    },
    pregnancy: {
      title: 'Gravidez e fertilidade',
      description: 'Acompanhe a data prevista e a janela de ovulação com confiança.',
    },
    'health-vitals': {
      title: 'Saúde e sinais vitais',
      description: 'Monitore sinais importantes como pressão arterial com categorias claras.',
    },
    utilities: {
      title: 'Utilitários',
      description: 'Conversões rápidas de peso, altura e unidades relacionadas ao fitness.',
    },
  },
  zh: {
    'weight-loss': {
      title: '减脂与体重管理',
      description: '用热量、活动与时间规划工具制定可持续的减脂计划。',
    },
    'body-composition': {
      title: '体成分',
      description: '通过科学指标了解体脂、体型与健康体重范围。',
    },
    'metabolism-energy': {
      title: '代谢与能量',
      description: '计算静息以及日常活动中的热量消耗。',
    },
    nutrition: {
      title: '营养与宏量营养素',
      description: '为减脂、维持或增肌设定蛋白质与宏量营养素目标。',
    },
    performance: {
      title: '训练表现',
      description: '用配速、心率与力量工具优化训练。',
    },
    'wellness-recovery': {
      title: '健康与恢复',
      description: '通过每日恢复目标支持补水与睡眠。',
    },
    pregnancy: {
      title: '孕期与生育',
      description: '更有把握地跟踪预产期与排卵窗口。',
    },
    'health-vitals': {
      title: '健康与生命体征',
      description: '用清晰的分类监测血压等关键指标。',
    },
    utilities: {
      title: '工具',
      description: '快速换算体重、身高以及与健身相关的单位。',
    },
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
  const hubCopy = HUB_COPY[locale] ?? HUB_COPY.en;

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <Breadcrumb customItems={[{ name: copy.breadcrumbCalculators, path: '/calculators' }]} />

      <h1 className="text-3xl md:text-4xl font-bold mb-2">{copy.pageTitle}</h1>
      <p className="text-gray-600 mb-8">{copy.pageSubtitle}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {CALCULATOR_HUBS.map(hub => {
          const localizedHub = hubCopy[hub.slug] ?? {
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
