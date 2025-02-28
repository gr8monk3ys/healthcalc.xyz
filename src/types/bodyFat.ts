import { Gender, WeightUnit } from './common';

/**
 * Body fat calculation methods
 */
export type BodyFatMethod = 'navy' | 'bmi' | 'manual';

/**
 * Body fat category
 */
export interface BodyFatCategory {
  name: string;
  color: string;
  description: string;
  ranges: {
    male: {
      min: number;
      max?: number;
    };
    female: {
      min: number;
      max?: number;
    };
  };
}

/**
 * Body fat calculation result
 */
export interface BodyFatResult {
  bodyFatPercentage: number;
  category: string;
  color: string;
  fatMass: number;
  leanMass: number;
  healthyRange: {
    min: number;
    max: number;
  };
}

/**
 * Form data for body fat calculation
 */
export interface BodyFatFormData {
  gender: Gender;
  age: number;
  height: number;
  heightUnit: 'cm' | 'ft';
  weight: number;
  weightUnit: WeightUnit;
  method: BodyFatMethod;
  waist?: number;
  neck?: number;
  hips?: number;
  bodyFatPercentage?: number;
}
