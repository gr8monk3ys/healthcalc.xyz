import { Gender } from './common';

/**
 * WHR calculation result
 */
export interface WHRResult {
  whr: number;
  category: string;
  color: string;
  description: string;
  healthRisk: string;
}

/**
 * Form data for WHR calculation
 */
export interface WHRFormData {
  gender: Gender;
  waist: number;
  hips: number;
}

/**
 * WHR risk category
 */
export interface WHRCategory {
  name: string;
  color: string;
  description: string;
  healthRisk: string;
  ranges: {
    male: {
      min: number;
      max?: number;
    };
    female: {
      min: number;
      max?: number;
    };
  };
}
