import { AgeCategory, Gender, HeightUnit, WeightUnit } from './common';

export interface BMIFormValues {
  category: AgeCategory;
  gender: Gender;
  age: number;
  heightUnit: HeightUnit;
  heightCm: number;
  heightFt: number;
  heightIn: number;
  weightUnit: WeightUnit;
  weightKg: number;
  weightLb: number;
}

export interface BMIResult {
  bmi: number;
  category: string;
  color: string;
  healthyWeightRange: {
    min: number;
    max: number;
  };
  percentile?: number; // For children
}

export interface BMICategory {
  name: string;
  range: {
    min: number;
    max?: number;
  };
  color: string;
}

export interface BMIPercentileCategory {
  name: string;
  range: {
    min: number;
    max?: number;
  };
  color: string;
}
