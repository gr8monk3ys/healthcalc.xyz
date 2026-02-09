import { WeightUnit } from './common';

/**
 * FFMI calculation category
 */
export interface FFMICategory {
  name: string;
  color: string;
  description: string;
  range: {
    min: number;
    max?: number;
  };
}

/**
 * FFMI calculation result
 */
export interface FFMIResult {
  ffmi: number;
  adjustedFFMI: number;
  leanMass: number;
  fatMass: number;
  category: string;
  categoryColor: string;
  isNatural: boolean;
  naturalLimit: string;
  weightUnit: WeightUnit;
}

/**
 * Form data for FFMI calculation
 */
export interface FFMIFormData {
  weight: number;
  weightUnit: WeightUnit;
  heightCm: number;
  heightFt: number;
  heightIn: number;
  bodyFatPercentage: number;
  useMetric: boolean;
}
