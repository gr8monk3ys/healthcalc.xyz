import type { LeanBodyMassResult } from '@/types/leanBodyMass';
import { convertWeight } from '@/utils/conversions';

interface LeanBodyMassInputs {
  gender: 'male' | 'female';
  weightKg: number;
  heightCm: number;
  bodyFatPercentage?: number;
}

export function calculateLeanBodyMass({
  gender,
  weightKg,
  heightCm,
  bodyFatPercentage,
}: LeanBodyMassInputs): LeanBodyMassResult {
  if (weightKg <= 0 || heightCm <= 0) {
    throw new Error('Height and weight must be greater than 0');
  }

  let leanMassKg: number;
  let formula = 'Boer';

  if (bodyFatPercentage !== undefined) {
    leanMassKg = weightKg * (1 - bodyFatPercentage / 100);
    formula = 'Body Fat Percentage';
  } else {
    // Boer formula
    leanMassKg =
      gender === 'male'
        ? 0.407 * weightKg + 0.267 * heightCm - 19.2
        : 0.252 * weightKg + 0.473 * heightCm - 48.3;
  }

  const fatMassKg = Math.max(weightKg - leanMassKg, 0);

  return {
    leanMassKg: Math.round(leanMassKg * 10) / 10,
    leanMassLb: Math.round(convertWeight(leanMassKg, 'kg', 'lb') * 10) / 10,
    fatMassKg: Math.round(fatMassKg * 10) / 10,
    bodyFatPercentage,
    formula,
  };
}
