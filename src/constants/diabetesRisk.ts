/**
 * Constants for Diabetes Risk Assessment & A1C Calculator
 */

import { RiskLevel, EthnicityRisk } from '@/types/diabetesRisk';

export const AGE_RISK_SCORES: Array<{ min: number; max: number; score: number }> = [
  { min: 0, max: 39, score: 0 },
  { min: 40, max: 49, score: 1 },
  { min: 50, max: 59, score: 2 },
  { min: 60, max: 120, score: 3 },
];

export const BMI_RISK_SCORES: Array<{ min: number; max: number; score: number }> = [
  { min: 0, max: 24.9, score: 0 },
  { min: 25, max: 29.9, score: 1 },
  { min: 30, max: 39.9, score: 2 },
  { min: 40, max: 100, score: 3 },
];

export const WAIST_THRESHOLDS = {
  male: { elevated: 94, high: 102 }, // cm
  female: { elevated: 80, high: 88 },
};

export const ETHNICITY_RISK_SCORES: Record<EthnicityRisk, number> = {
  standard: 0,
  'african-american': 1,
  hispanic: 1,
  asian: 1,
  'native-american': 1,
  'pacific-islander': 1,
};

export const RISK_LEVEL_THRESHOLDS: Array<{
  maxScore: number;
  level: RiskLevel;
  percentage: number;
}> = [
  { maxScore: 2, level: 'low', percentage: 5 },
  { maxScore: 4, level: 'moderate', percentage: 17 },
  { maxScore: 6, level: 'high', percentage: 33 },
  { maxScore: 100, level: 'very-high', percentage: 50 },
];

export const RISK_LEVEL_LABELS: Record<RiskLevel, string> = {
  low: 'Low Risk',
  moderate: 'Moderate Risk',
  high: 'High Risk',
  'very-high': 'Very High Risk',
};

export const RISK_LEVEL_COLORS: Record<RiskLevel, string> = {
  low: '#22c55e',
  moderate: '#eab308',
  high: '#f97316',
  'very-high': '#ef4444',
};

export const A1C_CATEGORIES = [
  {
    maxA1C: 5.6,
    category: 'Normal',
    interpretation:
      'Your A1C is in the normal range. Continue healthy habits to maintain this level.',
  },
  {
    maxA1C: 6.4,
    category: 'Prediabetes',
    interpretation:
      'Your A1C indicates prediabetes. Lifestyle changes can often prevent or delay progression to type 2 diabetes.',
  },
  {
    maxA1C: 100,
    category: 'Diabetes',
    interpretation:
      'Your A1C is in the diabetes range. Work with your healthcare provider on a treatment plan.',
  },
];

export const ETHNICITY_LABELS: Record<EthnicityRisk, string> = {
  standard: 'White / Other',
  'african-american': 'African American',
  hispanic: 'Hispanic / Latino',
  asian: 'Asian American',
  'native-american': 'Native American / Alaska Native',
  'pacific-islander': 'Pacific Islander',
};

export const RECOMMENDATIONS = {
  low: [
    'Maintain a healthy weight through balanced diet and regular exercise.',
    'Get at least 150 minutes of moderate physical activity per week.',
    'Schedule routine blood glucose screening every 3 years after age 45.',
  ],
  moderate: [
    'Aim for at least 150 minutes of moderate exercise per week.',
    'Reduce refined carbohydrate and sugar intake.',
    'Monitor blood pressure regularly.',
    'Consider screening for prediabetes with your doctor.',
    'Maintain a healthy weight or aim for 5-7% weight loss if overweight.',
  ],
  high: [
    'Schedule a fasting blood glucose or A1C test with your doctor soon.',
    'Aim for 7% weight loss through diet and increased physical activity.',
    'Follow a Mediterranean or DASH-style eating pattern.',
    'Monitor blood pressure and cholesterol regularly.',
    'Consider joining a diabetes prevention program (DPP).',
  ],
  'very-high': [
    'See your healthcare provider promptly for diabetes screening.',
    'Enroll in a structured diabetes prevention program.',
    'Work with a registered dietitian on a personalized meal plan.',
    'Increase physical activity to at least 150 minutes per week.',
    'Monitor blood pressure, cholesterol, and weight closely.',
    'Discuss medication options with your doctor if lifestyle changes are insufficient.',
  ],
};
