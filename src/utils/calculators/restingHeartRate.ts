import type { RestingHeartRateResult } from '@/types/restingHeartRate';

export function calculateRestingHeartRate(restingHeartRate: number): RestingHeartRateResult {
  if (restingHeartRate <= 0) {
    throw new Error('Resting heart rate must be greater than 0');
  }

  let category = 'Normal';
  let guidance =
    'Within typical adult range. Maintain cardiovascular fitness with regular activity.';

  if (restingHeartRate < 60) {
    category = 'Athletic / Low';
    guidance =
      'Lower rates are common in well-trained individuals. Monitor for symptoms if concerned.';
  } else if (restingHeartRate >= 80 && restingHeartRate <= 100) {
    category = 'Elevated';
    guidance =
      'Elevated resting rates may improve with cardio training, sleep, and stress management.';
  } else if (restingHeartRate > 100) {
    category = 'High';
    guidance =
      'Consistently high resting heart rates should be discussed with a healthcare professional.';
  }

  return {
    restingHeartRate,
    category,
    guidance,
  };
}
