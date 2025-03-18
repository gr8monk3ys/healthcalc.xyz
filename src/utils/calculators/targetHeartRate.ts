import type { TargetHeartRateResult } from '@/types/targetHeartRate';

interface TargetHeartRateInputs {
  age: number;
  intensityMin: number;
  intensityMax: number;
  restingHeartRate?: number;
}

export function calculateTargetHeartRate({
  age,
  intensityMin,
  intensityMax,
  restingHeartRate,
}: TargetHeartRateInputs): TargetHeartRateResult {
  if (age <= 0) {
    throw new Error('Age must be greater than 0');
  }

  const maxHeartRate = 220 - age;
  const minFraction = intensityMin / 100;
  const maxFraction = intensityMax / 100;

  let targetMin: number;
  let targetMax: number;
  let method = 'Percent of max heart rate';

  if (restingHeartRate) {
    const reserve = maxHeartRate - restingHeartRate;
    targetMin = reserve * minFraction + restingHeartRate;
    targetMax = reserve * maxFraction + restingHeartRate;
    method = 'Karvonen (heart rate reserve)';
  } else {
    targetMin = maxHeartRate * minFraction;
    targetMax = maxHeartRate * maxFraction;
  }

  return {
    maxHeartRate,
    restingHeartRate,
    intensityMin,
    intensityMax,
    targetMin: Math.round(targetMin),
    targetMax: Math.round(targetMax),
    method,
  };
}
