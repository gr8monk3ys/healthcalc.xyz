import type { BodyFrameSizeResult } from '@/types/bodyFrameSize';
import { convertHeight, convertLength } from '@/utils/conversions';

interface BodyFrameInputs {
  gender: 'male' | 'female';
  heightCm: number;
  wristCm: number;
}

export function calculateBodyFrameSize({
  gender,
  heightCm,
  wristCm,
}: BodyFrameInputs): BodyFrameSizeResult {
  if (heightCm <= 0 || wristCm <= 0) {
    throw new Error('Height and wrist must be greater than 0');
  }

  const heightIn = convertHeight(heightCm, 'cm', 'in');
  const wristIn = convertLength(wristCm, 'cm', 'in');
  const ratio = heightIn / wristIn;

  let category = 'Medium frame';
  if (gender === 'female') {
    if (ratio > 11) category = 'Small frame';
    else if (ratio < 10.1) category = 'Large frame';
  } else {
    if (ratio > 10.4) category = 'Small frame';
    else if (ratio < 9.6) category = 'Large frame';
  }

  const guidance =
    category === 'Small frame'
      ? 'Smaller bone structure; focus on strength and recovery.'
      : category === 'Large frame'
        ? 'Larger bone structure; body weight ranges can be naturally higher.'
        : 'Average bone structure; use standard weight ranges as a starting point.';

  return {
    ratio: Math.round(ratio * 10) / 10,
    category,
    guidance,
  };
}
