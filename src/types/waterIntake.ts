import type { WaterIntakeActivity } from '@/constants/waterIntake';
import type { WeightUnit } from '@/types/common';

export interface WaterIntakeResult {
  weightKg: number;
  activityLevel: WaterIntakeActivity;
  totalMl: number;
  liters: number;
  ounces: number;
  cups: number;
  weightUnit: WeightUnit;
}
