import 'server-only';

import type { SupportedLocale } from '@/i18n/config';

export type CalorieDeficitMetaCopy = {
  title: string;
  description: string;
  keywords: string;
  ogAlt: string;
};

const META: Record<SupportedLocale, CalorieDeficitMetaCopy> = {
  en: {
    title: 'Calorie Deficit Calculator | HealthCheck',
    description:
      'Estimate your weight-loss timeline using calorie deficit levels and target weight goals.',
    keywords:
      'calorie deficit calculator, weight loss calculator, calorie deficit, weight loss timeline, goal weight calculator',
    ogAlt: 'Calorie Deficit Calculator',
  },
  es: {
    title: 'Calculadora de déficit calórico | HealthCheck',
    description:
      'Estima tu cronograma de pérdida de peso usando niveles de déficit calórico y peso objetivo.',
    keywords:
      'calculadora déficit calórico, calculadora para bajar de peso, cronograma de pérdida de peso',
    ogAlt: 'Calculadora de déficit calórico',
  },
  fr: {
    title: 'Calculateur de déficit calorique | HealthCheck',
    description:
      'Estimez votre calendrier de perte de poids selon votre déficit calorique et votre objectif de poids.',
    keywords:
      'calculateur déficit calorique, calculateur perte de poids, calendrier perte de poids',
    ogAlt: 'Calculateur de déficit calorique',
  },
  de: {
    title: 'Kaloriendefizit-Rechner | HealthCheck',
    description: 'Schätzen Sie Ihren Abnehm-Zeitplan anhand von Kaloriendefizit und Zielgewicht.',
    keywords:
      'Kaloriendefizit Rechner, Abnehmrechner, Gewichtsverlust Zeitplan, Zielgewicht Rechner',
    ogAlt: 'Kaloriendefizit-Rechner',
  },
  pt: {
    title: 'Calculadora de déficit calórico | HealthCheck',
    description:
      'Estime seu cronograma de perda de peso com níveis de déficit calórico e meta de peso.',
    keywords:
      'calculadora déficit calórico, calculadora perda de peso, cronograma de emagrecimento',
    ogAlt: 'Calculadora de déficit calórico',
  },
  zh: {
    title: '热量缺口计算器 | HealthCheck',
    description: '根据热量缺口等级与目标体重，估算你的减重时间线。',
    keywords: '热量缺口计算器, 减重计算器, 减脂时间线, 目标体重',
    ogAlt: '热量缺口计算器',
  },
};

export function getCalorieDeficitMetaCopy(locale: SupportedLocale): CalorieDeficitMetaCopy {
  return META[locale] ?? META.en;
}
