import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import {
  defaultLocale,
  isSupportedLocale,
  prefixPathWithLocale,
  type SupportedLocale,
} from '@/i18n/config';

interface LocalizedLearnProps {
  params: Promise<{ locale: string }>;
}

type GuideCopy = {
  slug: string;
  title: string;
  description: string;
};

type LearnCopy = {
  metaTitle: string;
  metaDescription: string;
  pageTitle: string;
  pageSubtitle: string;
  guides: GuideCopy[];
};

const COPY: Record<SupportedLocale, LearnCopy> = {
  en: {
    metaTitle: 'Health Guides | HealthCheck',
    metaDescription:
      'Quick guides that explain key health metrics and link to the right calculators.',
    pageTitle: 'Health Guides',
    pageSubtitle:
      'Quick educational hubs that explain each metric and point you to the right calculators.',
    guides: [
      {
        slug: 'calorie-basics',
        title: 'Calorie Basics',
        description: 'How calories work for maintenance, loss, and gain.',
      },
      {
        slug: 'macro-planning',
        title: 'Macro Planning',
        description: 'Set carb, fat, and protein targets that align with your goals.',
      },
      {
        slug: 'heart-rate-training',
        title: 'Heart Rate Training',
        description: 'Use zones and max heart rate to train smarter.',
      },
      {
        slug: 'body-composition-guide',
        title: 'Body Composition Guide',
        description: 'Understand BMI, body fat, and lean mass together.',
      },
      {
        slug: 'walking-running-energy',
        title: 'Walking & Running Energy',
        description: 'Estimate calories burned from walking or running.',
      },
      {
        slug: 'pregnancy-health',
        title: 'Pregnancy Health',
        description: 'Key calculators for due dates and weight gain guidance.',
      },
    ],
  },
  es: {
    metaTitle: 'Guías de salud | HealthCheck',
    metaDescription:
      'Guías rápidas que explican métricas clave y te llevan a las calculadoras correctas.',
    pageTitle: 'Guías de salud',
    pageSubtitle:
      'Hubs educativos rápidos que explican cada métrica y te indican las calculadoras adecuadas. (Las guías actualmente están disponibles en inglés.)',
    guides: [
      {
        slug: 'calorie-basics',
        title: 'Conceptos básicos de calorías',
        description: 'Cómo funcionan las calorías para mantener, perder y ganar peso.',
      },
      {
        slug: 'macro-planning',
        title: 'Planificación de macros',
        description:
          'Define objetivos de carbohidratos, grasas y proteínas que se alineen con tus metas.',
      },
      {
        slug: 'heart-rate-training',
        title: 'Entrenamiento por frecuencia cardíaca',
        description: 'Usa zonas y frecuencia cardíaca máxima para entrenar mejor.',
      },
      {
        slug: 'body-composition-guide',
        title: 'Guía de composición corporal',
        description: 'Entiende IMC, grasa corporal y masa magra en conjunto.',
      },
      {
        slug: 'walking-running-energy',
        title: 'Energía al caminar y correr',
        description: 'Estima las calorías quemadas al caminar o correr.',
      },
      {
        slug: 'pregnancy-health',
        title: 'Salud en el embarazo',
        description: 'Calculadoras clave para fecha de parto y guía de aumento de peso.',
      },
    ],
  },
  fr: {
    metaTitle: 'Guides santé | HealthCheck',
    metaDescription:
      'Des guides rapides qui expliquent les métriques clés et renvoient vers les bons calculateurs.',
    pageTitle: 'Guides santé',
    pageSubtitle:
      'Des hubs éducatifs rapides qui expliquent chaque métrique et vous orientent vers les bons calculateurs. (Guides actuellement disponibles en anglais.)',
    guides: [
      {
        slug: 'calorie-basics',
        title: 'Bases des calories',
        description: 'Comment fonctionnent les calories pour maintien, perte et prise de poids.',
      },
      {
        slug: 'macro-planning',
        title: 'Planification des macros',
        description:
          'Définissez des objectifs de glucides, lipides et protéines alignés sur vos objectifs.',
      },
      {
        slug: 'heart-rate-training',
        title: 'Entraînement par fréquence cardiaque',
        description: 'Utilisez les zones et la fréquence cardiaque max pour vous entraîner mieux.',
      },
      {
        slug: 'body-composition-guide',
        title: 'Guide de composition corporelle',
        description: 'Comprendre IMC, masse grasse et masse maigre ensemble.',
      },
      {
        slug: 'walking-running-energy',
        title: 'Énergie marche et course',
        description: 'Estimez les calories brûlées en marchant ou en courant.',
      },
      {
        slug: 'pregnancy-health',
        title: 'Santé pendant la grossesse',
        description: 'Calculateurs clés pour dates et prise de poids.',
      },
    ],
  },
  de: {
    metaTitle: 'Gesundheits-Guides | HealthCheck',
    metaDescription:
      'Kurze Guides, die wichtige Gesundheitskennzahlen erklären und zu den passenden Rechnern führen.',
    pageTitle: 'Gesundheits-Guides',
    pageSubtitle:
      'Kurze Lern-Hubs, die jede Kennzahl erklären und zu den passenden Rechnern führen. (Guides derzeit auf Englisch verfügbar.)',
    guides: [
      {
        slug: 'calorie-basics',
        title: 'Kalorien-Grundlagen',
        description: 'Wie Kalorien für Erhalt, Abnehmen und Zunehmen funktionieren.',
      },
      {
        slug: 'macro-planning',
        title: 'Makro-Planung',
        description: 'Setzen Sie Ziele für Kohlenhydrate, Fett und Protein passend zu Ihrem Ziel.',
      },
      {
        slug: 'heart-rate-training',
        title: 'Herzfrequenz-Training',
        description: 'Nutzen Sie Zonen und maximale Herzfrequenz, um smarter zu trainieren.',
      },
      {
        slug: 'body-composition-guide',
        title: 'Guide zur Körperzusammensetzung',
        description: 'BMI, Körperfett und fettfreie Masse gemeinsam verstehen.',
      },
      {
        slug: 'walking-running-energy',
        title: 'Energie beim Gehen und Laufen',
        description: 'Schätzen Sie verbrannte Kalorien beim Gehen oder Laufen.',
      },
      {
        slug: 'pregnancy-health',
        title: 'Gesundheit in der Schwangerschaft',
        description: 'Wichtige Rechner für Geburtstermine und Gewichtszunahme.',
      },
    ],
  },
  pt: {
    metaTitle: 'Guias de saúde | HealthCheck',
    metaDescription:
      'Guias rápidos que explicam métricas importantes e apontam para as calculadoras certas.',
    pageTitle: 'Guias de saúde',
    pageSubtitle:
      'Hubs educativos rápidos que explicam cada métrica e indicam as calculadoras certas. (Guias disponíveis no momento em inglês.)',
    guides: [
      {
        slug: 'calorie-basics',
        title: 'Noções básicas de calorias',
        description: 'Como as calorias funcionam para manter, perder e ganhar peso.',
      },
      {
        slug: 'macro-planning',
        title: 'Planejamento de macros',
        description:
          'Defina metas de carboidratos, gorduras e proteínas alinhadas aos seus objetivos.',
      },
      {
        slug: 'heart-rate-training',
        title: 'Treino por frequência cardíaca',
        description: 'Use zonas e frequência cardíaca máxima para treinar melhor.',
      },
      {
        slug: 'body-composition-guide',
        title: 'Guia de composição corporal',
        description: 'Entenda IMC, gordura corporal e massa magra em conjunto.',
      },
      {
        slug: 'walking-running-energy',
        title: 'Energia ao caminhar e correr',
        description: 'Estime as calorias queimadas ao caminhar ou correr.',
      },
      {
        slug: 'pregnancy-health',
        title: 'Saúde na gravidez',
        description: 'Calculadoras essenciais para datas e ganho de peso.',
      },
    ],
  },
  zh: {
    metaTitle: '健康指南 | HealthCheck',
    metaDescription: '快速指南，解释关键健康指标并引导你使用合适的计算器。',
    pageTitle: '健康指南',
    pageSubtitle: '快速学习中心，解释各项指标并指向合适的计算器。（指南目前以英文提供。）',
    guides: [
      {
        slug: 'calorie-basics',
        title: '热量基础',
        description: '了解热量在维持、减脂与增重中的作用。',
      },
      {
        slug: 'macro-planning',
        title: '宏量营养规划',
        description: '设定符合目标的碳水、脂肪与蛋白质摄入。',
      },
      {
        slug: 'heart-rate-training',
        title: '心率训练',
        description: '使用心率区间与最大心率更聪明地训练。',
      },
      {
        slug: 'body-composition-guide',
        title: '体成分指南',
        description: '综合理解 BMI、体脂与瘦体重。',
      },
      {
        slug: 'walking-running-energy',
        title: '步行与跑步能量',
        description: '估算步行或跑步消耗的热量。',
      },
      {
        slug: 'pregnancy-health',
        title: '孕期健康',
        description: '预产期与孕期体重增长等关键计算器指南。',
      },
    ],
  },
};

export async function generateMetadata({ params }: LocalizedLearnProps): Promise<Metadata> {
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

export default async function LearnIndexPage({ params }: LocalizedLearnProps) {
  const { locale: rawLocale } = await params;
  if (!isSupportedLocale(rawLocale)) {
    notFound();
  }

  const locale = rawLocale as SupportedLocale;
  if (locale === defaultLocale) {
    redirect('/learn');
  }

  const copy = COPY[locale] ?? COPY.en;

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">{copy.pageTitle}</h1>
      <p className="text-gray-600 mb-8">{copy.pageSubtitle}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {copy.guides.map(guide => (
          <Link
            key={guide.slug}
            href={prefixPathWithLocale(`/learn/${guide.slug}`, locale)}
            className="neumorph p-5 rounded-lg hover:shadow-neumorph-inset transition-all"
          >
            <h2 className="text-lg font-semibold text-accent">{guide.title}</h2>
            <p className="text-sm text-gray-600 mt-2">{guide.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
