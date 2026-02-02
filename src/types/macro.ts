/**
 * Types for the Macro Calculator
 *
 * Defines interfaces for form values, calculation results,
 * and macro distribution presets.
 */

import { ActivityLevel, Gender, HeightUnit, WeightUnit } from './common';

/**
 * Dietary goal types for macro distribution
 */
export type MacroGoal = 'weight_loss' | 'maintenance' | 'muscle_gain' | 'custom';

/**
 * Macro ratio preset configuration
 */
export interface MacroRatioPreset {
  id: MacroGoal;
  name: string;
  description: string;
  proteinPercent: number;
  carbsPercent: number;
  fatPercent: number;
}

/**
 * Individual macronutrient breakdown
 */
export interface MacroBreakdown {
  /** Grams of the macronutrient */
  grams: number;
  /** Calories from this macronutrient */
  calories: number;
  /** Percentage of total calories */
  percentage: number;
}

/**
 * Form values for the Macro Calculator
 */
export interface MacroFormValues {
  gender: Gender;
  age: number;
  heightUnit: HeightUnit;
  heightCm: number;
  heightFt: number;
  heightIn: number;
  weightUnit: WeightUnit;
  weightKg: number;
  weightLb: number;
  activityLevel: ActivityLevel;
  goal: MacroGoal;
  /** Custom protein percentage (only used when goal is 'custom') */
  customProteinPercent?: number;
  /** Custom carbs percentage (only used when goal is 'custom') */
  customCarbsPercent?: number;
  /** Custom fat percentage (only used when goal is 'custom') */
  customFatPercent?: number;
  /** Calorie adjustment from TDEE (negative for deficit, positive for surplus) */
  calorieAdjustment?: number;
}

/**
 * Result of the Macro Calculator
 */
export interface MacroResult {
  /** Basal Metabolic Rate in calories */
  bmr: number;
  /** Total Daily Energy Expenditure in calories */
  tdee: number;
  /** Target daily calories (TDEE adjusted for goal) */
  targetCalories: number;
  /** Protein breakdown */
  protein: MacroBreakdown;
  /** Carbohydrates breakdown */
  carbs: MacroBreakdown;
  /** Fat breakdown */
  fat: MacroBreakdown;
  /** The goal used for calculation */
  goal: MacroGoal;
  /** Per-meal breakdown (3 meals) */
  perMeal: {
    protein: number;
    carbs: number;
    fat: number;
    calories: number;
  };
}

/**
 * Input parameters for macro calculation
 */
export interface MacroCalculationInput {
  /** Target daily calories */
  targetCalories: number;
  /** Protein percentage (0-100) */
  proteinPercent: number;
  /** Carbohydrates percentage (0-100) */
  carbsPercent: number;
  /** Fat percentage (0-100) */
  fatPercent: number;
}
