import type { Gender } from '@/types/common';

export interface Vo2MaxResult {
  gender: Gender;
  age: number;
  weightLb: number;
  walkTimeMinutes: number;
  heartRate: number;
  vo2Max: number;
}
