/**
 * Maximum Fat Loss Calculator Types
 */

import { Gender, ActivityLevel } from './common';

export interface MaximumFatLossFormData {
  gender: Gender;
  age: number;
  heightCm: number;
  weightKg: number;
  activityLevel: ActivityLevel;
  bodyFatPercentage: number;
}

export interface MaximumFatLossResult {
  tdee: number;
  bmr: number;
  currentWeightKg: number;
  bodyFatPercentage: number;
  fatMassKg: number;
  leanMassKg: number;
  fatMassLbs: number;
  leanMassLbs: number;
  maximumDeficit: number; // Maximum safe daily deficit based on body fat
  minimumCalories: number; // TDEE - maximum deficit
  expectedWeeklyFatLoss: number; // kg per week
  expectedWeeklyFatLossLbs: number; // lbs per week
  proteinRecommendation: number; // grams per day
  warnings: string[];
  recommendations: {
    minimumProtein: number; // g per day (based on lean mass)
    optimalProtein: number; // g per day (higher for muscle preservation)
    waterLiters: number;
    sleepHours: number;
    strengthTrainingDays: number;
  };
  projections: {
    weeks: number;
    projectedWeightKg: number;
    projectedBodyFatPercentage: number;
    adjustedDeficit: number;
  }[];
}

// Constants based on research
export const MAX_FAT_OXIDATION_RATE = {
  conservative: 22, // kcal per lb of body fat per day (Alpert 2005)
  moderate: 26.5, // kcal per lb of body fat per day (average)
  aggressive: 31, // kcal per lb of body fat per day (upper limit)
};

export const SAFE_BODY_FAT_MINIMUMS = {
  male: 5, // Minimum safe body fat % for males
  female: 12, // Minimum safe body fat % for females
};
