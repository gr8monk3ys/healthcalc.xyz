/**
 * Types for Calorie Deficit Calculator
 */

import { Gender, ActivityLevel } from './common';

export interface CalorieDeficitFormData {
  gender: Gender;
  age: number;
  heightCm: number;
  weightKg: number;
  activityLevel: ActivityLevel;
  goalWeightKg: number;
  deficitLevel: 'mild' | 'moderate' | 'aggressive';
}

export interface CalorieDeficitResult {
  // Current metrics
  tdee: number;
  bmr: number;

  // Target metrics
  goalWeightKg: number;
  weightToLose: number;

  // Calorie deficit info
  deficitLevel: 'mild' | 'moderate' | 'aggressive';
  dailyDeficit: number;
  dailyCalorieTarget: number;
  weeklyWeightLoss: number; // kg per week

  // Timeline
  estimatedWeeks: number;
  estimatedDays: number;
  targetDate: Date;

  // Safety warnings
  warnings: string[];

  // Recommendations
  recommendations: {
    minCalories: number;
    maxDeficit: number;
    proteinGrams: number;
    waterLiters: number;
  };

  // Weekly projections (for graph)
  weeklyProjections: Array<{
    week: number;
    projectedWeight: number;
    cumulativeWeightLoss: number;
  }>;
}

export interface DeficitOption {
  level: 'mild' | 'moderate' | 'aggressive';
  label: string;
  description: string;
  dailyDeficit: number;
  weeklyWeightLoss: number; // kg
  safetyRating: 'safe' | 'moderate' | 'caution';
}
