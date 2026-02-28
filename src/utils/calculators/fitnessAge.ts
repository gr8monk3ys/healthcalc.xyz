import { Gender } from '@/types/common';

export interface FitnessAgeInput {
  age: number;
  gender: Gender;
  vo2Max: number;
  restingHeartRate: number;
  bmi: number;
  bodyFatPercentage: number;
  weeklyTrainingDays: number;
  balanceScore: 1 | 2 | 3 | 4 | 5;
  flexibilityScore: 1 | 2 | 3 | 4 | 5;
}

export interface FitnessAgeComponentBreakdown {
  aerobicAdjustment: number;
  heartRateAdjustment: number;
  trainingAdjustment: number;
  mobilityAdjustment: number;
  bmiPenalty: number;
  bodyFatPenalty: number;
}

export interface FitnessAgeResult {
  fitnessAge: number;
  ageGap: number;
  classification: 'younger' | 'aligned' | 'older';
  summary: string;
  confidenceLabel: 'low' | 'medium' | 'high';
  components: FitnessAgeComponentBreakdown;
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

function roundToOne(value: number): number {
  return Math.round(value * 10) / 10;
}

function getExpectedVo2(age: number, gender: Gender): number {
  const base = gender === 'male' ? 45 : 38;
  const annualDecline = gender === 'male' ? 0.34 : 0.31;
  return clamp(base - Math.max(age - 20, 0) * annualDecline, 19, 48);
}

function getIdealBodyFat(gender: Gender): number {
  return gender === 'male' ? 16 : 24;
}

function getBmiPenalty(bmi: number): number {
  if (bmi >= 18.5 && bmi <= 24.9) return 0;
  if (bmi < 18.5) {
    return roundToOne((18.5 - bmi) * 0.9);
  }

  if (bmi < 30) {
    return roundToOne((bmi - 24.9) * 0.9);
  }

  return roundToOne((bmi - 24.9) * 1.25);
}

function getBodyFatPenalty(bodyFatPercentage: number, gender: Gender): number {
  const ideal = getIdealBodyFat(gender);
  const above = Math.max(0, bodyFatPercentage - ideal);
  const below = Math.max(0, ideal - bodyFatPercentage - 4);
  return roundToOne(above * 0.4 + below * 0.25);
}

function getClassification(ageGap: number): FitnessAgeResult['classification'] {
  if (ageGap >= 2) return 'younger';
  if (ageGap <= -2) return 'older';
  return 'aligned';
}

function getConfidenceLabel(input: FitnessAgeInput): FitnessAgeResult['confidenceLabel'] {
  if (input.weeklyTrainingDays >= 4 && input.balanceScore >= 3 && input.flexibilityScore >= 3) {
    return 'high';
  }

  if (input.weeklyTrainingDays >= 2) return 'medium';
  return 'low';
}

function buildSummary(classification: FitnessAgeResult['classification'], ageGap: number): string {
  const magnitude = Math.abs(ageGap);

  if (classification === 'younger') {
    return `Your fitness profile trends about ${magnitude.toFixed(1)} years younger than your chronological age.`;
  }

  if (classification === 'older') {
    return `Your fitness profile trends about ${magnitude.toFixed(1)} years older than your chronological age.`;
  }

  return 'Your fitness profile is closely aligned with your chronological age.';
}

export function calculateFitnessAge(input: FitnessAgeInput): FitnessAgeResult {
  const expectedVo2 = getExpectedVo2(input.age, input.gender);
  const aerobicAdjustment = clamp((input.vo2Max - expectedVo2) / 1.9, -12, 12);
  const heartRateAdjustment = clamp((72 - input.restingHeartRate) / 2.8, -9, 9);
  const trainingAdjustment = clamp((input.weeklyTrainingDays - 2) * 0.9, -3, 5);
  const mobilityAdjustment = clamp(
    ((input.balanceScore + input.flexibilityScore) / 2 - 3) * 1.15,
    -2.5,
    2.5
  );
  const bmiPenalty = getBmiPenalty(input.bmi);
  const bodyFatPenalty = getBodyFatPenalty(input.bodyFatPercentage, input.gender);

  const rawFitnessAge =
    input.age -
    aerobicAdjustment -
    heartRateAdjustment -
    trainingAdjustment -
    mobilityAdjustment +
    bmiPenalty +
    bodyFatPenalty;

  const fitnessAge = roundToOne(clamp(rawFitnessAge, 12, 95));
  const ageGap = roundToOne(input.age - fitnessAge);
  const classification = getClassification(ageGap);

  return {
    fitnessAge,
    ageGap,
    classification,
    summary: buildSummary(classification, ageGap),
    confidenceLabel: getConfidenceLabel(input),
    components: {
      aerobicAdjustment: roundToOne(aerobicAdjustment),
      heartRateAdjustment: roundToOne(heartRateAdjustment),
      trainingAdjustment: roundToOne(trainingAdjustment),
      mobilityAdjustment: roundToOne(mobilityAdjustment),
      bmiPenalty: roundToOne(bmiPenalty),
      bodyFatPenalty: roundToOne(bodyFatPenalty),
    },
  };
}
