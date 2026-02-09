import { WeightUnit } from './common';

export type CaffeineSource =
  | 'coffee'
  | 'espresso'
  | 'green-tea'
  | 'black-tea'
  | 'energy-drink'
  | 'pre-workout'
  | 'cola'
  | 'dark-chocolate';

export type SensitivityLevel = 'low' | 'normal' | 'high';

export interface CaffeineSourceInput {
  source: CaffeineSource;
  servings: number;
}

export interface CaffeineFormValues {
  weight: number;
  weightUnit: WeightUnit;
  sources: CaffeineSourceInput[];
  sensitivityLevel: SensitivityLevel;
  preWorkoutTiming: boolean;
}

export interface CaffeineSourceBreakdown {
  source: string;
  caffeineMg: number;
  servings: number;
}

export interface CaffeineResult {
  totalDailyCaffeine: number;
  safeDailyLimit: number;
  isOverLimit: boolean;
  percentOfLimit: number;
  preWorkoutDose: number;
  halfLifeHours: number;
  clearanceTime: string;
  recommendation: string;
  sourceBreakdown: CaffeineSourceBreakdown[];
}
