import type { Vo2MaxResult } from '@/types/vo2Max';
import type { Gender } from '@/types/common';

const KG_TO_LB = 2.20462;

export function calculateVo2Max(options: {
  gender: Gender;
  age: number;
  weightKg: number;
  walkTimeMinutes: number;
  heartRate: number;
}): Vo2MaxResult {
  const { gender, age, weightKg, walkTimeMinutes, heartRate } = options;
  const weightLb = weightKg * KG_TO_LB;
  const genderValue = gender === 'male' ? 1 : 0;

  const vo2Max =
    132.853 -
    0.0769 * weightLb -
    0.3877 * age +
    6.315 * genderValue -
    3.2649 * walkTimeMinutes -
    0.1565 * heartRate;

  return {
    gender,
    age,
    weightLb: Number(weightLb.toFixed(1)),
    walkTimeMinutes,
    heartRate,
    vo2Max: Number(vo2Max.toFixed(1)),
  };
}
