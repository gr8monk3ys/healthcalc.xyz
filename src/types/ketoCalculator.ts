import { Gender, ActivityLevel, WeightUnit } from './common';

export type KetoGoal = 'weight-loss' | 'maintenance' | 'muscle-gain';
export type KetoType = 'standard' | 'targeted' | 'cyclical';

export interface KetoFormValues {
  weight: number;
  weightUnit: WeightUnit;
  heightCm: number;
  heightFt: number;
  heightIn: number;
  age: number;
  gender: Gender;
  activityLevel: ActivityLevel;
  bodyFatPercentage?: number;
  goal: KetoGoal;
  ketoType: KetoType;
  useMetric: boolean;
}

export interface KetoResult {
  dailyCalories: number;
  fatGrams: number;
  fatCalories: number;
  fatPercentage: number;
  proteinGrams: number;
  proteinCalories: number;
  proteinPercentage: number;
  netCarbGrams: number;
  netCarbCalories: number;
  netCarbPercentage: number;
  fiberTarget: number;
  tdee: number;
  bmr: number;
  recommendation: string;
  warnings: string[];
}

export interface KetoMacroRatios {
  fat: number;
  protein: number;
  carbs: number;
}
