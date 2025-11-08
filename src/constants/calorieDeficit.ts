/**
 * Constants for Calorie Deficit Calculator
 */

import { DeficitOption } from '@/types/calorieDeficit';

// Deficit level options
export const DEFICIT_OPTIONS: DeficitOption[] = [
  {
    level: 'mild',
    label: 'Mild Deficit (Slow & Steady)',
    description: '250-500 calorie deficit per day. Lose 0.25-0.5 kg (0.5-1 lb) per week.',
    dailyDeficit: 375, // midpoint
    weeklyWeightLoss: 0.375, // kg
    safetyRating: 'safe',
  },
  {
    level: 'moderate',
    label: 'Moderate Deficit (Balanced)',
    description: '500-750 calorie deficit per day. Lose 0.5-0.75 kg (1-1.5 lbs) per week.',
    dailyDeficit: 625, // midpoint
    weeklyWeightLoss: 0.625, // kg
    safetyRating: 'safe',
  },
  {
    level: 'aggressive',
    label: 'Aggressive Deficit (Fast Results)',
    description: '750-1000 calorie deficit per day. Lose 0.75-1 kg (1.5-2 lbs) per week.',
    dailyDeficit: 875, // midpoint
    weeklyWeightLoss: 0.875, // kg
    safetyRating: 'moderate',
  },
];

// Minimum safe calorie intakes (general guidelines)
export const MIN_CALORIES = {
  male: 1500,
  female: 1200,
};

// Maximum safe weekly weight loss (kg)
export const MAX_WEEKLY_LOSS = {
  safe: 1.0, // 1 kg per week
  aggressive: 1.5, // 1.5 kg per week (requires medical supervision)
};

// Calorie equivalents
export const CALORIES_PER_KG_FAT = 7700; // More accurate than old 3500 cal/lb rule

// Protein recommendations (grams per kg body weight)
export const PROTEIN_PER_KG = {
  sedentary: 1.6,
  active: 2.0,
  veryActive: 2.2,
};

// Water intake (liters per kg body weight)
export const WATER_PER_KG = 0.033;

// Weight loss projection parameters
export const PROJECTION_PARAMS = {
  maxWeeks: 52, // Project up to 1 year
  metabolicAdaptation: 0.95, // 5% slowdown over time
  plateauWeeks: [12, 24, 36], // Expected plateau weeks
};
