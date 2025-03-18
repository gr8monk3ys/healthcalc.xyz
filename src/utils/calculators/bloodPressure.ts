import {
  BLOOD_PRESSURE_CATEGORIES,
  BLOOD_PRESSURE_CATEGORY_PRIORITY,
} from '@/constants/bloodPressure';
import type { BloodPressureResult } from '@/types/bloodPressure';

export function getBloodPressureCategory(systolic: number, diastolic: number) {
  const isCrisis = systolic >= 180 || diastolic >= 120;
  if (isCrisis) {
    return BLOOD_PRESSURE_CATEGORIES.crisis;
  }

  const isStage2 = systolic >= 140 || diastolic >= 90;
  if (isStage2) {
    return BLOOD_PRESSURE_CATEGORIES.stage2;
  }

  const isStage1 = systolic >= 130 || diastolic >= 80;
  if (isStage1) {
    return BLOOD_PRESSURE_CATEGORIES.stage1;
  }

  const isElevated = systolic >= 120 && systolic <= 129 && diastolic < 80;
  if (isElevated) {
    return BLOOD_PRESSURE_CATEGORIES.elevated;
  }

  return BLOOD_PRESSURE_CATEGORIES.normal;
}

export function calculateBloodPressure(systolic: number, diastolic: number): BloodPressureResult {
  const category = getBloodPressureCategory(systolic, diastolic);

  return {
    systolic,
    diastolic,
    categoryId: category.id,
    categoryLabel: category.label,
    range: category.range,
    description: category.description,
    status: category.status,
  };
}

function _getBloodPressureCategoryPriority() {
  return BLOOD_PRESSURE_CATEGORY_PRIORITY.slice();
}
