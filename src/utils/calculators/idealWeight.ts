import { IDEAL_WEIGHT_FORMULAS } from '@/constants/idealWeight';
import type { IdealWeightResult } from '@/types/idealWeight';
import type { Gender } from '@/types/common';

const KG_TO_LB = 2.20462;

function cmToInches(cm: number) {
  return cm / 2.54;
}

export function calculateIdealWeight(heightCm: number, gender: Gender): IdealWeightResult {
  const heightIn = cmToInches(heightCm);
  const inchesOverFiveFeet = heightIn - 60;

  const formulas = IDEAL_WEIGHT_FORMULAS.map(formula => {
    const base = gender === 'male' ? formula.maleBase : formula.femaleBase;
    const perInch = gender === 'male' ? formula.malePerInch : formula.femalePerInch;
    const weightKg = Math.max(0, base + perInch * inchesOverFiveFeet);

    return {
      id: formula.id,
      label: formula.label,
      weightKg: Number(weightKg.toFixed(1)),
      weightLb: Number((weightKg * KG_TO_LB).toFixed(1)),
    };
  });

  const weightsKg = formulas.map(item => item.weightKg);
  const minKg = Math.min(...weightsKg);
  const maxKg = Math.max(...weightsKg);
  const averageKg = weightsKg.reduce((sum, value) => sum + value, 0) / weightsKg.length;

  return {
    gender,
    heightCm: Number(heightCm.toFixed(1)),
    heightIn: Number(heightIn.toFixed(1)),
    formulas,
    averageKg: Number(averageKg.toFixed(1)),
    averageLb: Number((averageKg * KG_TO_LB).toFixed(1)),
    rangeKg: { min: minKg, max: maxKg },
    rangeLb: {
      min: Number((minKg * KG_TO_LB).toFixed(1)),
      max: Number((maxKg * KG_TO_LB).toFixed(1)),
    },
  };
}
