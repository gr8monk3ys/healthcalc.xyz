/**
 * Types for Body Shape / Somatotype Calculator
 *
 * Scientific References:
 * - Heath & Carter (1967): Somatotype methodology
 * - Singh (2007): Body shape and health risk assessment
 * - WHO waist-hip ratio classification (2008)
 */

export type BodyShape = 'apple' | 'pear' | 'hourglass' | 'rectangle' | 'inverted-triangle';
export type Somatotype =
  | 'ectomorph'
  | 'mesomorph'
  | 'endomorph'
  | 'ecto-mesomorph'
  | 'meso-endomorph'
  | 'ecto-endomorph';

export interface BodyShapeFormValues {
  gender: 'male' | 'female';
  bust: number; // cm
  waist: number; // cm
  hips: number; // cm
  height: number; // cm
  weight: number; // kg
  wristCircumference?: number; // cm
  shoulderWidth?: number; // cm
}

export interface BodyShapeResult {
  bodyShape: BodyShape;
  shapeDescription: string;
  somatotype: Somatotype;
  somatotypeDescription: string;
  bustToWaistRatio: number;
  waistToHipRatio: number;
  bustToHipRatio: number;
  healthImplications: string[];
  exerciseRecommendations: string[];
  nutritionTips: string[];
}
