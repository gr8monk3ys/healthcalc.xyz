import {
  WATER_INTAKE_ACTIVITY_OPTIONS,
  WATER_INTAKE_BASE_ML_PER_KG,
  WaterIntakeActivity,
} from '@/constants/waterIntake';
import type { WaterIntakeResult } from '@/types/waterIntake';
import type { WeightUnit } from '@/types/common';

const ML_PER_OUNCE = 29.5735;

export function calculateWaterIntake(
  weightKg: number,
  activityLevel: WaterIntakeActivity,
  weightUnit: WeightUnit
): WaterIntakeResult {
  const activity = WATER_INTAKE_ACTIVITY_OPTIONS.find(option => option.value === activityLevel);
  const adjustment = activity ? activity.additionalMl : 0;
  const totalMl = weightKg * WATER_INTAKE_BASE_ML_PER_KG + adjustment;

  const liters = totalMl / 1000;
  const ounces = totalMl / ML_PER_OUNCE;
  const cups = ounces / 8;

  return {
    weightKg: Number(weightKg.toFixed(1)),
    activityLevel,
    totalMl: Math.round(totalMl),
    liters: Number(liters.toFixed(2)),
    ounces: Number(ounces.toFixed(0)),
    cups: Number(cups.toFixed(1)),
    weightUnit,
  };
}
