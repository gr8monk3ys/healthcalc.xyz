/**
 * Constants for GLP-1 / Semaglutide Calorie & Protein Calculator
 */

import { ActivityLevel } from '@/types/common';
import { GLP1Medication, GLP1Goal } from '@/types/glp1Calculator';

export const MEDICATION_INFO: Record<
  GLP1Medication,
  { name: string; brandNames: string[]; appetiteReduction: number; description: string }
> = {
  semaglutide: {
    name: 'Semaglutide',
    brandNames: ['Ozempic', 'Wegovy', 'Rybelsus'],
    appetiteReduction: 0.25, // ~25% calorie reduction
    description: 'GLP-1 receptor agonist. Most commonly prescribed for weight management.',
  },
  tirzepatide: {
    name: 'Tirzepatide',
    brandNames: ['Mounjaro', 'Zepbound'],
    appetiteReduction: 0.3, // ~30% calorie reduction
    description: 'Dual GIP/GLP-1 receptor agonist. May produce greater weight loss.',
  },
  liraglutide: {
    name: 'Liraglutide',
    brandNames: ['Victoza', 'Saxenda'],
    appetiteReduction: 0.2, // ~20% calorie reduction
    description: 'First-generation GLP-1 agonist. Daily injection.',
  },
};

export const ACTIVITY_MULTIPLIERS: Record<ActivityLevel, number> = {
  sedentary: 1.2,
  lightly_active: 1.375,
  moderately_active: 1.55,
  very_active: 1.725,
  extremely_active: 1.9,
};

export const PROTEIN_TARGETS: Record<GLP1Goal, { min: number; max: number }> = {
  'weight-loss': { min: 1.2, max: 1.6 }, // g per kg body weight
  maintenance: { min: 1.0, max: 1.4 },
  'muscle-preservation': { min: 1.4, max: 2.0 },
};

export const MINIMUM_CALORIES = {
  male: 1500,
  female: 1200,
};

export const FIBER_RANGE = { min: 25, max: 35 }; // grams per day

export const NUTRIENT_PRIORITIES = [
  'Protein at every meal (30-40g per meal minimum)',
  'Fiber-rich vegetables and whole grains',
  'Healthy fats from nuts, avocado, olive oil',
  'Calcium and vitamin D supplementation',
  'Iron-rich foods or supplementation',
  'B12 monitoring (especially with reduced food intake)',
  'Adequate hydration (water, not sugary drinks)',
];

export const GLP1_WARNINGS = {
  lowCalorie:
    'Your adjusted calories are at the minimum safe threshold. Monitor energy levels closely and consult your healthcare provider.',
  highProtein:
    'High protein intake is critical on GLP-1 medications to preserve muscle mass during weight loss.',
  hydration:
    'GLP-1 medications can cause nausea and vomiting. Stay well hydrated to prevent dehydration.',
  exercise:
    'Resistance training 2-3 times per week is strongly recommended to preserve muscle mass on GLP-1 therapy.',
  medical:
    "This calculator provides general guidance. Always follow your prescribing physician's recommendations.",
};

export const MEDICATION_LABELS: Record<GLP1Medication, string> = {
  semaglutide: 'Semaglutide (Ozempic/Wegovy)',
  tirzepatide: 'Tirzepatide (Mounjaro/Zepbound)',
  liraglutide: 'Liraglutide (Saxenda/Victoza)',
};

export const GOAL_LABELS: Record<GLP1Goal, string> = {
  'weight-loss': 'Weight Loss',
  maintenance: 'Weight Maintenance',
  'muscle-preservation': 'Muscle Preservation',
};

export const ACTIVITY_LABELS: Record<ActivityLevel, string> = {
  sedentary: 'Sedentary (little or no exercise)',
  lightly_active: 'Lightly Active (1-3 days/week)',
  moderately_active: 'Moderately Active (3-5 days/week)',
  very_active: 'Very Active (6-7 days/week)',
  extremely_active: 'Extremely Active (2x per day)',
};
