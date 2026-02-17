/**
 * Types for Diabetes Risk Assessment & A1C Calculator
 *
 * Scientific References:
 * - ADA Type 2 Diabetes Risk Test (2023)
 * - Nathan et al. (2008): ADAG Study - A1C to eAG conversion
 * - WHO Diabetes Diagnostic Criteria (2019)
 */

export type DiabetesMode = 'risk-assessment' | 'a1c-converter';
export type RiskLevel = 'low' | 'moderate' | 'high' | 'very-high';

export type EthnicityRisk =
  | 'standard'
  | 'african-american'
  | 'hispanic'
  | 'asian'
  | 'native-american'
  | 'pacific-islander';

export interface DiabetesRiskFormValues {
  age: number;
  gender: 'male' | 'female';
  bmi: number;
  waistCircumference?: number; // cm
  familyHistory: boolean;
  highBloodPressure: boolean;
  physicallyActive: boolean;
  ethnicity: EthnicityRisk;
  gestationalDiabetes?: boolean;
  polycysticOvary?: boolean;
}

export interface A1CFormValues {
  a1cPercentage: number;
}

export interface DiabetesRiskResult {
  riskScore: number;
  riskLevel: RiskLevel;
  riskPercentage: number;
  riskFactors: string[];
  protectiveFactors: string[];
  recommendations: string[];
}

export interface A1CResult {
  a1cPercentage: number;
  estimatedAverageGlucose: { mgdl: number; mmol: number };
  category: string;
  interpretation: string;
}
