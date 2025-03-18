import type { BodySurfaceAreaResult } from '@/types/bodySurfaceArea';

/**
 * Calculates body surface area using the Mosteller formula.
 * BSA (m^2) = sqrt((height_cm * weight_kg) / 3600)
 */
export function calculateBodySurfaceArea(
  heightCm: number,
  weightKg: number
): BodySurfaceAreaResult {
  if (heightCm <= 0 || weightKg <= 0) {
    throw new Error('Height and weight must be greater than 0');
  }

  const bsa = Math.sqrt((heightCm * weightKg) / 3600);

  return {
    bsa: Math.round(bsa * 100) / 100,
  };
}
