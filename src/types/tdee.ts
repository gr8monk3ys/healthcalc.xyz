import { ActivityLevel, Gender, HeightUnit, WeightUnit } from './common';

export interface TDEEFormValues {
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
}

export interface TDEEResult {
  bmr: number;
  tdee: number;
  activityMultiplier: number;
  weightGoals: {
    maintain: number;
    mildLoss: number;
    moderateLoss: number;
    extremeLoss: number;
    mildGain: number;
    moderateGain: number;
    extremeGain: number;
  };
}

export interface TDEEFormula {
  id: string;
  name: string;
  description: string;
  calculate: (gender: Gender, age: number, weightKg: number, heightCm: number) => number;
}

export interface ActivityMultiplier {
  level: ActivityLevel;
  value: number;
  label: string;
  description: string;
}
