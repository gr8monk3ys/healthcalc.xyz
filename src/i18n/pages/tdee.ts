import 'server-only';

import type { SupportedLocale } from '@/i18n/config';

export type TDEEMetaCopy = {
  title: string;
  description: string;
  keywords: string;
  ogAlt: string;
};

const META: Record<SupportedLocale, TDEEMetaCopy> = {
  en: {
    title: 'TDEE Calculator | HealthCheck',
    description: 'Estimate your TDEE and daily calorie needs based on activity level and goals.',
    keywords:
      'TDEE calculator, total daily energy expenditure, calorie calculator, BMR calculator, daily calorie needs',
    ogAlt: 'TDEE Calculator',
  },
  es: {
    title: 'Calculadora TDEE | HealthCheck',
    description:
      'Estima tu TDEE y tus calorías diarias según tu nivel de actividad y tus objetivos.',
    keywords:
      'calculadora TDEE, gasto energético diario total, calculadora de calorías, calculadora BMR',
    ogAlt: 'Calculadora TDEE',
  },
  fr: {
    title: 'Calculateur TDEE | HealthCheck',
    description:
      'Estimez votre TDEE et vos besoins caloriques quotidiens selon votre activité et vos objectifs.',
    keywords: 'calculateur TDEE, dépense énergétique quotidienne totale, calculateur calories, BMR',
    ogAlt: 'Calculateur TDEE',
  },
  de: {
    title: 'TDEE-Rechner | HealthCheck',
    description:
      'Schätzen Sie Ihren TDEE und Ihren täglichen Kalorienbedarf basierend auf Aktivitätslevel und Ziel.',
    keywords: 'TDEE Rechner, gesamter täglicher Energieverbrauch, Kalorienrechner, BMR Rechner',
    ogAlt: 'TDEE-Rechner',
  },
  pt: {
    title: 'Calculadora TDEE | HealthCheck',
    description:
      'Estime seu TDEE e suas necessidades calóricas diárias com base no nível de atividade e objetivos.',
    keywords: 'calculadora TDEE, gasto energético diário total, calculadora de calorias, BMR',
    ogAlt: 'Calculadora TDEE',
  },
  zh: {
    title: 'TDEE 计算器 | HealthCheck',
    description: '根据活动水平和目标估算你的 TDEE 与每日热量需求。',
    keywords: 'TDEE 计算器, 每日总能量消耗, 热量计算器, BMR 计算器',
    ogAlt: 'TDEE 计算器',
  },
};

export function getTDEEMetaCopy(locale: SupportedLocale): TDEEMetaCopy {
  return META[locale] ?? META.en;
}
