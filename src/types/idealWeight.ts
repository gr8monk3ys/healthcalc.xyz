import type { IdealWeightFormulaId } from '@/constants/idealWeight';
import type { Gender } from '@/types/common';

export interface IdealWeightFormulaResult {
  id: IdealWeightFormulaId;
  label: string;
  weightKg: number;
  weightLb: number;
}

export interface IdealWeightResult {
  gender: Gender;
  heightCm: number;
  heightIn: number;
  formulas: IdealWeightFormulaResult[];
  averageKg: number;
  averageLb: number;
  rangeKg: { min: number; max: number };
  rangeLb: { min: number; max: number };
}
