import type { PregnancyWeightGainResult } from '@/types/pregnancyWeightGain';
import { convertWeight } from '@/utils/conversions';
import { calculateBMI } from '@/utils/calculators/bmi';

interface PregnancyWeightGainInputs {
  heightCm: number;
  weightKg: number;
}

export function calculatePregnancyWeightGain({
  heightCm,
  weightKg,
}: PregnancyWeightGainInputs): PregnancyWeightGainResult {
  const bmi = calculateBMI(heightCm, weightKg);

  let category = 'Normal weight';
  let totalGainLb = { min: 25, max: 35 };
  let weeklyGainLb = { min: 0.8, max: 1.0 };

  if (bmi < 18.5) {
    category = 'Underweight';
    totalGainLb = { min: 28, max: 40 };
    weeklyGainLb = { min: 1.0, max: 1.3 };
  } else if (bmi >= 25 && bmi < 30) {
    category = 'Overweight';
    totalGainLb = { min: 15, max: 25 };
    weeklyGainLb = { min: 0.5, max: 0.7 };
  } else if (bmi >= 30) {
    category = 'Obese';
    totalGainLb = { min: 11, max: 20 };
    weeklyGainLb = { min: 0.4, max: 0.6 };
  }

  const minKg = convertWeight(totalGainLb.min, 'lb', 'kg');
  const maxKg = convertWeight(totalGainLb.max, 'lb', 'kg');
  const minWeeklyKg = convertWeight(weeklyGainLb.min, 'lb', 'kg');
  const maxWeeklyKg = convertWeight(weeklyGainLb.max, 'lb', 'kg');

  return {
    bmi: Math.round(bmi * 10) / 10,
    category,
    totalGain: {
      minLb: totalGainLb.min,
      maxLb: totalGainLb.max,
      minKg: Math.round(minKg * 10) / 10,
      maxKg: Math.round(maxKg * 10) / 10,
    },
    weeklyGain: {
      minLb: weeklyGainLb.min,
      maxLb: weeklyGainLb.max,
      minKg: Math.round(minWeeklyKg * 10) / 10,
      maxKg: Math.round(maxWeeklyKg * 10) / 10,
    },
  };
}
