import type { ArmyBodyFatResult } from '@/types/armyBodyFat';

interface ArmyBodyFatInputs {
  gender: 'male' | 'female';
  heightIn: number;
  waistIn: number;
  neckIn: number;
  hipIn?: number;
}

export function calculateArmyBodyFat({
  gender,
  heightIn,
  waistIn,
  neckIn,
  hipIn,
}: ArmyBodyFatInputs): ArmyBodyFatResult {
  if (heightIn <= 0 || waistIn <= 0 || neckIn <= 0) {
    throw new Error('Measurements must be greater than 0');
  }

  let bodyFat: number;

  if (gender === 'male') {
    bodyFat = 86.01 * Math.log10(waistIn - neckIn) - 70.041 * Math.log10(heightIn) + 36.76;
  } else {
    if (!hipIn) {
      throw new Error('Hip measurement is required for women');
    }
    bodyFat =
      163.205 * Math.log10(waistIn + hipIn - neckIn) - 97.684 * Math.log10(heightIn) - 78.387;
  }

  const rounded = Math.round(bodyFat * 10) / 10;

  let category = 'Healthy range';
  if (rounded < 8) category = 'Very low';
  if (rounded >= 8 && rounded < 18 && gender === 'male') category = 'Fit range';
  if (rounded >= 18 && gender === 'male') category = 'Above average';
  if (rounded >= 21 && gender === 'female') category = 'Fit range';
  if (rounded >= 32 && gender === 'female') category = 'Above average';

  return {
    bodyFatPercentage: rounded,
    category,
    method: 'U.S. Army Circumference',
  };
}
