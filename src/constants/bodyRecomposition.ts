import { TrainingExperience, RecompGoal } from '@/types/bodyRecomposition';

export const TRAINING_EXPERIENCE_OPTIONS: Array<{
  value: TrainingExperience;
  label: string;
  description: string;
}> = [
  {
    value: 'beginner',
    label: 'Beginner',
    description: 'Less than 1 year of consistent training',
  },
  {
    value: 'intermediate',
    label: 'Intermediate',
    description: '1-3 years of consistent training',
  },
  {
    value: 'advanced',
    label: 'Advanced',
    description: '3+ years of consistent training',
  },
];

export const RECOMP_GOAL_OPTIONS: Array<{
  value: RecompGoal;
  label: string;
  description: string;
}> = [
  {
    value: 'lose-fat-build-muscle',
    label: 'Lose Fat & Build Muscle',
    description:
      'Balanced recomposition: calorie cycling for simultaneous fat loss and muscle gain',
  },
  {
    value: 'maintain-build-muscle',
    label: 'Maintain & Build Muscle',
    description: 'Lean bulk: slight surplus to maximize muscle growth with minimal fat gain',
  },
  {
    value: 'aggressive-cut',
    label: 'Aggressive Fat Loss',
    description: 'Maximize fat loss while preserving muscle mass',
  },
];

export const BODY_FAT_RANGES = {
  male: {
    essential: { min: 2, max: 5 },
    athletic: { min: 6, max: 13 },
    fitness: { min: 14, max: 17 },
    average: { min: 18, max: 24 },
    obese: { min: 25, max: 100 },
  },
  female: {
    essential: { min: 10, max: 13 },
    athletic: { min: 14, max: 20 },
    fitness: { min: 21, max: 24 },
    average: { min: 25, max: 31 },
    obese: { min: 32, max: 100 },
  },
};

export const CALORIE_CYCLING_INFO = {
  trainingDay: {
    multiplier: 1.1,
    description: 'Higher calories to fuel performance and recovery',
  },
  restDay: {
    multiplier: 0.85,
    description: 'Lower calories to promote fat loss',
  },
};

export const MACRO_TARGETS = {
  protein: {
    gramsPerLb: 1,
    gramsPerKg: 2.2,
    description: 'High protein for muscle preservation and growth',
  },
  fat: {
    percentageOfCalories: 0.25,
    description: 'Essential for hormone production',
  },
  carbs: {
    description: 'Remaining calories, prioritize around training',
  },
};

export const MUSCLE_GAIN_RATES = {
  male: {
    beginner: { min: 1, max: 2 },
    intermediate: { min: 0.5, max: 1 },
    advanced: { min: 0.25, max: 0.5 },
  },
  female: {
    beginner: { min: 0.5, max: 1 },
    intermediate: { min: 0.25, max: 0.5 },
    advanced: { min: 0.125, max: 0.25 },
  },
};

export const RECOMMENDED_TRAINING_FREQUENCY = {
  beginner: { min: 3, max: 4 },
  intermediate: { min: 4, max: 5 },
  advanced: { min: 4, max: 6 },
};

export const FAT_LOSS_GUIDELINES = {
  safe: { min: 0.5, max: 1 }, // lbs per week
  aggressive: { min: 1, max: 2 },
  extreme: { min: 2, max: 3 },
};
