/**
 * Constants for Alcohol & Smoking Impact Calculator
 *
 * Scientific References:
 * - CDC Alcohol & Tobacco data (2023)
 * - USDA Dietary Guidelines for Americans (2020-2025)
 * - Jha et al. (2013): 21st-Century Hazards of Smoking - NEJM
 * - GBD 2019 Alcohol/Tobacco Collaborators - Lancet
 */

import { AlcoholType, SmokingType } from '@/types/substanceImpact';

/** Calories per standard drink by alcohol type */
export const ALCOHOL_CALORIES: Record<AlcoholType, number> = {
  beer: 153,
  wine: 125,
  spirits: 97,
  cocktails: 200,
};

/** Life expectancy impact per year of heavy drinking */
export const ALCOHOL_LIFESPAN_IMPACT = {
  light: 0, // 1-7 drinks/week
  moderate: -0.5, // 8-14 drinks/week
  heavy: -1.5, // 15+ drinks/week
  threshold: {
    light: 7,
    moderate: 14,
  },
};

/** Cigarettes per pack */
export const CIGARETTES_PER_PACK = 20;

/** Life expectancy reduction per year of smoking */
export const SMOKING_LIFESPAN_IMPACT: Record<SmokingType, number> = {
  cigarettes: -0.5, // per year of smoking (10+/day)
  vaping: -0.15, // estimated, less studied
  cigars: -0.3,
};

/** Max lifespan reduction from smoking */
export const MAX_SMOKING_LIFESPAN_REDUCTION = 13;

/** Recovery timeline after quitting smoking */
export const SMOKING_RECOVERY_TIMELINE = [
  { timeframe: '20 minutes', benefit: 'Heart rate and blood pressure begin to drop.' },
  { timeframe: '12 hours', benefit: 'Carbon monoxide levels in blood return to normal.' },
  { timeframe: '2-12 weeks', benefit: 'Circulation improves and lung function increases.' },
  { timeframe: '1-9 months', benefit: 'Coughing and shortness of breath decrease.' },
  {
    timeframe: '1 year',
    benefit: 'Risk of coronary heart disease is about half that of a smoker.',
  },
  { timeframe: '5 years', benefit: 'Stroke risk reduces to that of a non-smoker.' },
  {
    timeframe: '10 years',
    benefit: 'Lung cancer death risk drops to about half that of a smoker.',
  },
  { timeframe: '15 years', benefit: 'Risk of coronary heart disease equals that of a non-smoker.' },
];

/** Recovery timeline after reducing alcohol */
export const ALCOHOL_RECOVERY_TIMELINE = [
  { timeframe: '1 week', benefit: 'Better sleep quality and hydration levels.' },
  { timeframe: '2 weeks', benefit: 'Improved digestion and reduced blood pressure.' },
  { timeframe: '1 month', benefit: 'Liver fat may reduce by up to 15%.' },
  { timeframe: '3 months', benefit: 'Blood pressure and cholesterol levels improve.' },
  { timeframe: '6 months', benefit: 'Reduced risk of liver disease progression.' },
  { timeframe: '1 year', benefit: 'Significant cardiovascular risk reduction.' },
];

export const ALCOHOL_TYPE_LABELS: Record<AlcoholType, string> = {
  beer: 'Beer (12 oz)',
  wine: 'Wine (5 oz)',
  spirits: 'Spirits (1.5 oz)',
  cocktails: 'Cocktails (mixed)',
};

export const SMOKING_TYPE_LABELS: Record<SmokingType, string> = {
  cigarettes: 'Cigarettes',
  vaping: 'Vaping/E-cigarettes',
  cigars: 'Cigars',
};
