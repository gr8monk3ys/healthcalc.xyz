export type BloodPressureCategoryId = 'normal' | 'elevated' | 'stage1' | 'stage2' | 'crisis';

interface BloodPressureCategory {
  id: BloodPressureCategoryId;
  label: string;
  range: string;
  description: string;
  colorClass: string;
  status: 'success' | 'warning' | 'danger' | 'info';
}

export const BLOOD_PRESSURE_CATEGORIES: Record<BloodPressureCategoryId, BloodPressureCategory> = {
  normal: {
    id: 'normal',
    label: 'Normal',
    range: 'Systolic < 120 and diastolic < 80',
    description:
      'Your blood pressure is in the normal range. Maintain healthy habits and monitor regularly.',
    colorClass: 'text-green-600',
    status: 'success',
  },
  elevated: {
    id: 'elevated',
    label: 'Elevated',
    range: 'Systolic 120-129 and diastolic < 80',
    description:
      'Elevated blood pressure can progress to hypertension. Focus on lifestyle improvements and recheck regularly.',
    colorClass: 'text-yellow-600',
    status: 'warning',
  },
  stage1: {
    id: 'stage1',
    label: 'Stage 1 Hypertension',
    range: 'Systolic 130-139 or diastolic 80-89',
    description:
      'Stage 1 hypertension often requires lifestyle changes and a discussion with a healthcare professional.',
    colorClass: 'text-orange-600',
    status: 'warning',
  },
  stage2: {
    id: 'stage2',
    label: 'Stage 2 Hypertension',
    range: 'Systolic 140+ or diastolic 90+',
    description:
      'Stage 2 hypertension warrants medical guidance. Consider contacting a healthcare professional soon.',
    colorClass: 'text-red-600',
    status: 'danger',
  },
  crisis: {
    id: 'crisis',
    label: 'Hypertensive Crisis',
    range: 'Systolic 180+ or diastolic 120+',
    description:
      'This reading may require urgent care. If symptoms are present, seek immediate medical attention.',
    colorClass: 'text-red-700',
    status: 'danger',
  },
};

export const BLOOD_PRESSURE_CATEGORY_PRIORITY: BloodPressureCategoryId[] = [
  'crisis',
  'stage2',
  'stage1',
  'elevated',
  'normal',
];
