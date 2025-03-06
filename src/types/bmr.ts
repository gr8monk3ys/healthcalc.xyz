import type { Gender } from '@/types/common';

export interface BMRResult {
  gender: Gender;
  age: number;
  heightCm: number;
  weightKg: number;
  formulaId: string;
  formulaName: string;
  bmr: number;
  bodyFatPercentage?: number;
}
