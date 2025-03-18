import type { StepsToMilesResult } from '@/types/stepsToMiles';
import { convertLength } from '@/utils/conversions';

export function calculateStepsToMiles(
  steps: number,
  strideLength: number,
  strideUnit: 'in' | 'cm'
): StepsToMilesResult {
  if (steps <= 0 || strideLength <= 0) {
    throw new Error('Steps and stride length must be greater than 0');
  }

  const strideInches = strideUnit === 'in' ? strideLength : convertLength(strideLength, 'cm', 'in');
  const totalInches = steps * strideInches;
  const miles = totalInches / 63360;
  const kilometers = miles * 1.60934;

  return {
    steps,
    strideLength,
    strideUnit,
    miles: Math.round(miles * 100) / 100,
    kilometers: Math.round(kilometers * 100) / 100,
  };
}
