import type { MaxHeartRateResult } from '@/types/maxHeartRate';

export function calculateMaxHeartRate(age: number): MaxHeartRateResult {
  if (age <= 0) {
    throw new Error('Age must be greater than 0');
  }

  const traditional = 220 - age;
  const tanaka = Math.round(208 - 0.7 * age);

  return {
    age,
    traditional,
    tanaka,
  };
}
