/**
 * Diabetes Risk Assessment & A1C Calculator
 *
 * Scientific References:
 * - ADA Type 2 Diabetes Risk Test (2023)
 * - Nathan et al. (2008): ADAG Study - Translating the A1C Assay
 *   Formula: eAG (mg/dL) = 28.7 * A1C - 46.7
 * - Tabak et al. (2012): Prediabetes: a high-risk state for diabetes development
 * - WHO Diabetes Diagnostic Criteria
 *
 * Risk Score (0-10+ scale, based on ADA risk test):
 * - Age: 0-3 points
 * - BMI: 0-3 points
 * - Waist: 0-1 point
 * - Family history: 0-1 point
 * - High blood pressure: 0-1 point
 * - Physical inactivity: 0-1 point
 * - Ethnicity: 0-1 point
 * - Gestational diabetes: 0-1 point
 */

import {
  DiabetesRiskFormValues,
  DiabetesRiskResult,
  A1CFormValues,
  A1CResult,
  RiskLevel,
} from '@/types/diabetesRisk';
import {
  AGE_RISK_SCORES,
  BMI_RISK_SCORES,
  WAIST_THRESHOLDS,
  ETHNICITY_RISK_SCORES,
  RISK_LEVEL_THRESHOLDS,
  A1C_CATEGORIES,
  RECOMMENDATIONS,
} from '@/constants/diabetesRisk';

/**
 * Calculate diabetes risk score from form values
 */
export function calculateDiabetesRisk(values: DiabetesRiskFormValues): DiabetesRiskResult {
  if (values.age <= 0 || values.age > 120) throw new Error('Age must be between 1 and 120');
  if (values.bmi <= 0 || values.bmi > 100) throw new Error('BMI must be between 1 and 100');

  let riskScore = 0;
  const riskFactors: string[] = [];
  const protectiveFactors: string[] = [];

  // Age scoring
  const ageEntry = AGE_RISK_SCORES.find(r => values.age >= r.min && values.age <= r.max);
  const ageScore = ageEntry?.score ?? 0;
  riskScore += ageScore;
  if (ageScore > 0) riskFactors.push(`Age ${values.age} (higher risk over 40)`);
  if (ageScore === 0) protectiveFactors.push('Age under 40');

  // BMI scoring
  const bmiEntry = BMI_RISK_SCORES.find(r => values.bmi >= r.min && values.bmi <= r.max);
  const bmiScore = bmiEntry?.score ?? 0;
  riskScore += bmiScore;
  if (bmiScore > 0) riskFactors.push(`BMI of ${values.bmi.toFixed(1)} (overweight or obese range)`);
  if (bmiScore === 0) protectiveFactors.push('Healthy BMI range');

  // Waist circumference
  if (values.waistCircumference) {
    const thresholds = WAIST_THRESHOLDS[values.gender];
    if (values.waistCircumference >= thresholds.high) {
      riskScore += 1;
      riskFactors.push('Elevated waist circumference');
    }
  }

  // Family history
  if (values.familyHistory) {
    riskScore += 1;
    riskFactors.push('Family history of diabetes');
  }

  // Blood pressure
  if (values.highBloodPressure) {
    riskScore += 1;
    riskFactors.push('High blood pressure');
  }

  // Physical activity (protective if active)
  if (!values.physicallyActive) {
    riskScore += 1;
    riskFactors.push('Physical inactivity');
  } else {
    protectiveFactors.push('Regularly physically active');
  }

  // Ethnicity
  const ethnicityScore = ETHNICITY_RISK_SCORES[values.ethnicity];
  riskScore += ethnicityScore;
  if (ethnicityScore > 0) riskFactors.push('Higher-risk ethnic background');

  // Gender-specific factors
  if (values.gender === 'female') {
    if (values.gestationalDiabetes) {
      riskScore += 1;
      riskFactors.push('History of gestational diabetes');
    }
    if (values.polycysticOvary) {
      riskScore += 1;
      riskFactors.push('Polycystic ovary syndrome (PCOS)');
    }
  }

  // Determine risk level
  const levelEntry = RISK_LEVEL_THRESHOLDS.find(r => riskScore <= r.maxScore)!;
  const riskLevel: RiskLevel = levelEntry.level;
  const riskPercentage = levelEntry.percentage;

  // Get recommendations
  const recommendations = RECOMMENDATIONS[riskLevel];

  return {
    riskScore,
    riskLevel,
    riskPercentage,
    riskFactors,
    protectiveFactors,
    recommendations,
  };
}

/**
 * Convert A1C percentage to estimated Average Glucose (eAG)
 * Formula from ADAG study: eAG (mg/dL) = 28.7 * A1C - 46.7
 */
export function convertA1C(values: A1CFormValues): A1CResult {
  const { a1cPercentage } = values;

  if (a1cPercentage < 3 || a1cPercentage > 20) {
    throw new Error('A1C must be between 3% and 20%');
  }

  // ADAG formula
  const eAGmgdl = 28.7 * a1cPercentage - 46.7;
  const eAGmmol = eAGmgdl / 18.0;

  // Determine category
  const categoryEntry = A1C_CATEGORIES.find(c => a1cPercentage <= c.maxA1C)!;

  return {
    a1cPercentage,
    estimatedAverageGlucose: {
      mgdl: Math.round(eAGmgdl),
      mmol: Math.round(eAGmmol * 10) / 10,
    },
    category: categoryEntry.category,
    interpretation: categoryEntry.interpretation,
  };
}
