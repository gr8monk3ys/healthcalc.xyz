import type { WaistToHeightRatioResult } from '@/types/waistToHeightRatio';

export function calculateWaistToHeightRatio(
  waistCm: number,
  heightCm: number
): WaistToHeightRatioResult {
  if (waistCm <= 0 || heightCm <= 0) {
    throw new Error('Measurements must be greater than 0');
  }

  const ratio = waistCm / heightCm;

  if (ratio < 0.4) {
    return {
      ratio,
      category: 'Below typical range',
      guidance: 'Consider discussing healthy weight goals with a professional if needed.',
    };
  }

  if (ratio < 0.5) {
    return {
      ratio,
      category: 'Lower risk range',
      guidance: 'Keep focusing on balanced nutrition, movement, and sleep.',
    };
  }

  if (ratio < 0.6) {
    return {
      ratio,
      category: 'Increased risk range',
      guidance: 'Aiming for a waist less than half your height can lower health risks.',
    };
  }

  return {
    ratio,
    category: 'Higher risk range',
    guidance: 'Consider lifestyle changes and professional guidance to reduce central fat.',
  };
}
