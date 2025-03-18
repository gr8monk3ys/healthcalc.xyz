import { calculateBMR } from '@/utils/calculators/tdee';
import { TDEE_FORMULAS } from '@/constants/tdee';
import type { BMRResult } from '@/types/bmr';
import type { Gender } from '@/types/common';

export function calculateBMRResult(options: {
  gender: Gender;
  age: number;
  heightCm: number;
  weightKg: number;
  formulaId: string;
  bodyFatPercentage?: number;
}): BMRResult {
  const { gender, age, heightCm, weightKg, formulaId, bodyFatPercentage } = options;
  const formula = TDEE_FORMULAS.find(item => item.id === formulaId);
  if (!formula) {
    throw new Error('Formula not found');
  }

  const bmr = calculateBMR(gender, age, weightKg, heightCm, formulaId, bodyFatPercentage);

  return {
    gender,
    age,
    heightCm,
    weightKg,
    formulaId,
    formulaName: formula.name,
    bmr: Math.round(bmr),
    bodyFatPercentage,
  };
}
