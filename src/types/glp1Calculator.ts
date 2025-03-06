/**
 * Types for GLP-1 / Semaglutide Calorie & Protein Calculator
 *
 * Scientific References:
 * - Wilding et al. (2021): STEP 1 Trial - Semaglutide 2.4mg weight management
 * - Jastreboff et al. (2022): SURMOUNT-1 Trial - Tirzepatide weight management
 * - Mechanick et al. (2023): AACE/ACE position statement on GLP-1 nutrition
 * - Heymsfield et al. (2023): Muscle mass preservation on GLP-1 agonists
 */

import { Gender, ActivityLevel } from './common';

export type GLP1Medication = 'semaglutide' | 'tirzepatide' | 'liraglutide';
export type GLP1Goal = 'weight-loss' | 'maintenance' | 'muscle-preservation';

export interface GLP1FormValues {
  weight: number; // kg
  height: number; // cm
  age: number;
  gender: Gender;
  medication: GLP1Medication;
  activityLevel: ActivityLevel;
  goal: GLP1Goal;
  currentCalories?: number;
}

export interface GLP1Result {
  adjustedCalories: number;
  proteinMinGrams: number;
  proteinMaxGrams: number;
  proteinPercentage: number;
  fatGrams: number;
  carbGrams: number;
  fiberMinGrams: number;
  hydrationLiters: number;
  expectedWeightLossPerWeek: { min: number; max: number };
  nutrientPriorities: string[];
  warnings: string[];
  bmr: number;
  tdee: number;
}
