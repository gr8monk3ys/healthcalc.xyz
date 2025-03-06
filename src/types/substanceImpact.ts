/**
 * Types for Alcohol & Smoking Impact Calculator
 *
 * Scientific References:
 * - CDC Smoking & Tobacco Use data (2023)
 * - USDA Dietary Guidelines - Alcohol (2020-2025)
 * - Jha et al. (2013): 21st-Century Hazards of Smoking - NEJM
 * - GBD 2019 Alcohol Collaborators: Lancet
 */

export type SubstanceMode = 'alcohol' | 'smoking' | 'both';
export type AlcoholType = 'beer' | 'wine' | 'spirits' | 'cocktails';
export type SmokingType = 'cigarettes' | 'vaping' | 'cigars';

export interface AlcoholInput {
  type: AlcoholType;
  drinksPerWeek: number;
  yearsOfDrinking: number;
  avgDrinkCost: number;
}

export interface SmokingInput {
  type: SmokingType;
  perDay: number;
  yearsOfSmoking: number;
  costPerPack: number;
}

export interface SubstanceImpactFormValues {
  mode: SubstanceMode;
  age: number;
  gender: 'male' | 'female';
  alcohol?: AlcoholInput;
  smoking?: SmokingInput;
}

export interface SubstanceImpactResult {
  alcoholCaloriesPerWeek?: number;
  alcoholCaloriesPerYear?: number;
  alcoholEquivalentFatLbs?: number;
  alcoholLifespanImpactYears?: number;
  alcoholFinancialCostPerYear?: number;
  alcoholLifetimeCost?: number;
  smokingLifespanImpactYears?: number;
  smokingFinancialCostPerYear?: number;
  smokingLifetimeCost?: number;
  cigarettesSmoked?: number;
  totalLifespanImpact: number;
  totalFinancialCostPerYear: number;
  totalLifetimeCost: number;
  healthRecoveryTimeline: Array<{ timeframe: string; benefit: string }>;
  recommendations: string[];
}
