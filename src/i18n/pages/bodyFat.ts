import 'server-only';

import type { SupportedLocale } from '@/i18n/config';

export type BodyFatMetaCopy = {
  title: string;
  description: string;
  keywords: string;
  ogAlt: string;
};

const META: Record<SupportedLocale, BodyFatMetaCopy> = {
  en: {
    title: 'Body Fat Calculator | HealthCheck',
    description:
      'Estimate body fat percentage with Navy, BMI, or manual methods and compare fat vs lean mass.',
    keywords:
      'body fat calculator, body fat percentage, navy method, body composition, fat mass, lean mass',
    ogAlt: 'Body Fat Calculator',
  },
  es: {
    title: 'Calculadora de grasa corporal | HealthCheck',
    description:
      'Estima tu porcentaje de grasa corporal con método Navy, BMI o entrada manual, y compara grasa vs masa magra.',
    keywords: 'calculadora grasa corporal, porcentaje de grasa, método navy, composición corporal',
    ogAlt: 'Calculadora de grasa corporal',
  },
  fr: {
    title: 'Calculateur de masse grasse | HealthCheck',
    description:
      'Estimez votre pourcentage de masse grasse avec la méthode Navy, IMC ou saisie manuelle, et comparez masse grasse et masse maigre.',
    keywords:
      'calculateur masse grasse, pourcentage masse grasse, méthode navy, composition corporelle',
    ogAlt: 'Calculateur de masse grasse',
  },
  de: {
    title: 'Körperfett-Rechner | HealthCheck',
    description:
      'Schätzen Sie Ihren Körperfettanteil mit Navy-, BMI- oder manueller Methode und vergleichen Sie Fett- und Magermasse.',
    keywords:
      'Körperfett Rechner, Körperfettanteil, Navy Methode, Körperzusammensetzung, Fettmasse',
    ogAlt: 'Körperfett-Rechner',
  },
  pt: {
    title: 'Calculadora de gordura corporal | HealthCheck',
    description:
      'Estime seu percentual de gordura corporal com método Navy, IMC ou entrada manual e compare gordura e massa magra.',
    keywords:
      'calculadora gordura corporal, percentual de gordura, método navy, composição corporal',
    ogAlt: 'Calculadora de gordura corporal',
  },
  zh: {
    title: '体脂率计算器 | HealthCheck',
    description: '使用 Navy、BMI 或手动方式估算体脂率，并比较脂肪量与瘦体重。',
    keywords: '体脂率计算器, 体脂百分比, navy 方法, 体成分, 脂肪量, 瘦体重',
    ogAlt: '体脂率计算器',
  },
};

export function getBodyFatMetaCopy(locale: SupportedLocale): BodyFatMetaCopy {
  return META[locale] ?? META.en;
}
