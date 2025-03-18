import type { AdjustedBodyWeightResult } from '@/types/adjustedBodyWeight';
import { convertWeight } from '@/utils/conversions';

interface AdjustedBodyWeightInputs {
  gender: 'male' | 'female';
  heightCm: number;
  weightKg: number;
}

function calculateDevineIBW(gender: 'male' | 'female', heightCm: number): number {
  const heightIn = heightCm / 2.54;
  const inchesOver = heightIn - 60;
  const base = gender === 'male' ? 50 : 45.5;
  return base + 2.3 * inchesOver;
}

export function calculateAdjustedBodyWeight({
  gender,
  heightCm,
  weightKg,
}: AdjustedBodyWeightInputs): AdjustedBodyWeightResult {
  if (heightCm <= 0 || weightKg <= 0) {
    throw new Error('Height and weight must be greater than 0');
  }

  const idealBodyWeightKg = calculateDevineIBW(gender, heightCm);
  const adjustedBodyWeightKg = idealBodyWeightKg + 0.4 * (weightKg - idealBodyWeightKg);

  return {
    idealBodyWeightKg: Math.round(idealBodyWeightKg * 10) / 10,
    idealBodyWeightLb: Math.round(convertWeight(idealBodyWeightKg, 'kg', 'lb') * 10) / 10,
    adjustedBodyWeightKg: Math.round(adjustedBodyWeightKg * 10) / 10,
    adjustedBodyWeightLb: Math.round(convertWeight(adjustedBodyWeightKg, 'kg', 'lb') * 10) / 10,
    formula: 'Devine + 40% correction',
  };
}
