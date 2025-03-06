import type { BloodPressureCategoryId } from '@/constants/bloodPressure';

export interface BloodPressureResult {
  systolic: number;
  diastolic: number;
  categoryId: BloodPressureCategoryId;
  categoryLabel: string;
  range: string;
  description: string;
  status: 'success' | 'warning' | 'danger' | 'info';
}
