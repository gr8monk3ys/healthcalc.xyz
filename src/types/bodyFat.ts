import { Gender, HeightUnit, WeightUnit } from './common';

export type BodyFatMethod = 
  | 'navy'
  | 'skinfold3'
  | 'skinfold4'
  | 'skinfold7'
  | 'bmi'
  | 'manual';

export interface BodyFatFormValues {
  gender: Gender;
  age: number;
  method: BodyFatMethod;
  heightUnit: HeightUnit;
  heightCm: number;
  heightFt: number;
  heightIn: number;
  weightUnit: WeightUnit;
  weightKg: number;
  weightLb: number;
  waistCm: number;
  waistIn: number;
  neckCm: number;
  neckIn: number;
  hipsCm: number; // For women
  hipsIn: number; // For women
  bodyFatPercentage: number; // For manual entry
  // Skinfold measurements
  skinfoldTriceps?: number;
  skinfoldChest?: number;
  skinfoldAbdomen?: number;
  skinfoldSuprailiac?: number;
  skinfoldThigh?: number;
  skinfoldSubscapular?: number;
  skinfoldAxilla?: number;
}

export interface BodyFatResult {
  bodyFatPercentage: number;
  category: string;
  color: string;
  leanMass: number;
  fatMass: number;
  healthyRange: {
    min: number;
    max: number;
  };
}

export interface BodyFatCategory {
  name: string;
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
  color: string;
  description: string;
}

export interface BodyFatMethodInfo {
  id: BodyFatMethod;
  name: string;
  description: string;
  accuracy: 'low' | 'medium' | 'high';
  requiredMeasurements: string[];
}
