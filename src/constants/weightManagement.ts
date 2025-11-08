/**
 * Weight Management Constants
 */

import { DietTypeOption } from '@/types/weightManagement';

// Calorie constants
export const CALORIES_PER_KG_FAT = 7700; // More accurate than old 3500 cal/lb
export const CALORIES_PER_KG_MUSCLE = 1100; // Approximate for muscle gain

// Safety limits
export const MIN_CALORIES = {
  male: 1500,
  female: 1200,
};

export const MAX_CALORIES = {
  male: 4500,
  female: 3500,
};

// Weight change limits (kg per week)
export const SAFE_WEIGHT_LOSS_MAX = 1.0; // 1 kg/week
export const SAFE_WEIGHT_LOSS_MIN = 0.25; // 0.25 kg/week
export const SAFE_WEIGHT_GAIN_MAX = 0.5; // 0.5 kg/week
export const SAFE_WEIGHT_GAIN_MIN = 0.1; // 0.1 kg/week

// Minimum timeline (weeks)
export const MIN_TIMELINE_WEEKS = 4;

// Macronutrient calories per gram
export const CALORIES_PER_GRAM = {
  protein: 4,
  carbs: 4,
  fat: 9,
};

// Diet type configurations
export const DIET_TYPES: DietTypeOption[] = [
  {
    type: 'balanced',
    label: 'Balanced Diet',
    description: 'Well-rounded macronutrient distribution suitable for most people',
    proteinPercentage: 30,
    carbsPercentage: 40,
    fatPercentage: 30,
    bestFor: [
      'General health and fitness',
      'Sustainable long-term eating',
      'Most beginners',
      'Athletes with moderate training',
    ],
  },
  {
    type: 'low-carb',
    label: 'Low-Carb Diet',
    description: 'Reduced carbohydrates with increased protein and fat',
    proteinPercentage: 40,
    carbsPercentage: 25,
    fatPercentage: 35,
    bestFor: [
      'Blood sugar management',
      'Appetite control',
      'Insulin resistance',
      'Those who feel better with fewer carbs',
    ],
  },
  {
    type: 'high-protein',
    label: 'High-Protein Diet',
    description: 'Elevated protein for muscle preservation and satiety',
    proteinPercentage: 40,
    carbsPercentage: 30,
    fatPercentage: 30,
    bestFor: [
      'Muscle building or preservation',
      'Weight loss with strength training',
      'Increased satiety',
      'Active individuals',
    ],
  },
  {
    type: 'keto',
    label: 'Ketogenic Diet',
    description: 'Very low carb, high fat diet for ketosis',
    proteinPercentage: 30,
    carbsPercentage: 5,
    fatPercentage: 65,
    bestFor: [
      'Metabolic health',
      'Appetite suppression',
      'Neurological conditions',
      'Experienced dieters only',
    ],
  },
];

// Metabolic adaptation parameters
export const ADAPTATION_PARAMS = {
  weightLossSlowdown: 0.05, // 5% slowdown per 10% body weight lost
  weightGainSlowdown: 0.03, // 3% difficulty increase per 5% body weight gained
};

// Recommendation parameters
export const RECOMMENDATION_PARAMS = {
  baseWaterLiters: 2.5,
  waterPerKgBodyWeight: 0.033, // 33ml per kg
  sleepHoursMin: 7,
  sleepHoursRecommended: 8,
  exerciseDaysPerWeek: {
    sedentary: 2,
    light: 3,
    moderate: 4,
    active: 5,
    veryActive: 6,
  },
};
