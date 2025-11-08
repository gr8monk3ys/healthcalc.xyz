import { Gender, WeightUnit } from './common';

/**
 * ABSI calculation result
 */
export interface ABSIResult {
  absi: number;
  absiZScore: number;
  riskCategory: string;
  color: string;
  bmi: number;
  bmiCategory: string;
  waistHeightRatio: number;
}

/**
 * Form data for ABSI calculation
 */
export interface ABSIFormData {
  gender: Gender;
  age: number;
  height: number;
  heightUnit: 'cm' | 'ft';
  weight: number;
  weightUnit: WeightUnit;
  waist: number;
}

/**
 * ABSI risk category
 */
export interface ABSIRiskCategory {
  name: string;
  color: string;
  description: string;
  zScoreRange: {
    min: number;
    max?: number;
  };
}
