/**
 * Weight Management Calculator Types
 */

import { Gender, ActivityLevel } from './common';

export type GoalType = 'lose' | 'gain' | 'maintain';
export type DietType = 'balanced' | 'low-carb' | 'high-protein' | 'keto';

export interface WeightManagementFormData {
  gender: Gender;
  age: number;
  heightCm: number;
  weightKg: number;
  activityLevel: ActivityLevel;
  goalWeightKg: number;
  goalType: GoalType;
  targetDate: Date;
  dietType: DietType;
}

export interface MacronutrientBreakdown {
  proteinGrams: number;
  proteinPercentage: number;
  carbsGrams: number;
  carbsPercentage: number;
  fatGrams: number;
  fatPercentage: number;
  proteinCalories: number;
  carbsCalories: number;
  fatCalories: number;
}

export interface WeightManagementResult {
  tdee: number;
  bmr: number;
  currentWeightKg: number;
  goalWeightKg: number;
  weightToChange: number; // Positive for gain, negative for loss
  goalType: GoalType;
  targetDate: Date;
  daysToGoal: number;
  weeksToGoal: number;
  dailyCalorieTarget: number;
  dailyCalorieChange: number; // Deficit or surplus
  weeklyWeightChange: number; // kg per week
  isGoalRealistic: boolean;
  adjustedTargetDate?: Date; // If goal needed adjustment for safety
  warnings: string[];
  macros: MacronutrientBreakdown;
  dietType: DietType;
  recommendations: {
    minCalories: number;
    maxCalories: number;
    waterLiters: number;
    sleepHours: number;
    exerciseDays: number;
  };
  weeklyProjections: Array<{
    week: number;
    date: Date;
    projectedWeight: number;
    cumulativeWeightChange: number;
    dailyCalories: number;
  }>;
}

export interface DietTypeOption {
  type: DietType;
  label: string;
  description: string;
  proteinPercentage: number;
  carbsPercentage: number;
  fatPercentage: number;
  bestFor: string[];
}
