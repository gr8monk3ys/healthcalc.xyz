import { ActivityLevel, Gender } from '@/types/common';
import { MacroGoal } from '@/types/macro';
import { BodyFatMethod } from '@/types/bodyFat';
import { calculateBMI, getBMICategory } from '@/utils/calculators/bmi';
import { calculateBMR, calculateTDEE, getActivityMultiplier } from '@/utils/calculators/tdee';
import { calculateCalorieDeficit } from '@/utils/calculators/calorieDeficit';
import { calculateBodyFat, getBodyFatCategory } from '@/utils/calculators/bodyFat';
import { calculateMacros, calculateTargetCalories } from '@/utils/calculators/macro';
import { calculateFitnessAge } from '@/utils/calculators/fitnessAge';
import { getMacroPreset, validateMacroDistribution } from '@/constants/macro';

export type ShareCalculatorSlug =
  | 'bmi'
  | 'tdee'
  | 'calorie-deficit'
  | 'body-fat'
  | 'macro'
  | 'fitness-age';

const SHARE_VERSION = 1 as const;

const SHARE_CALCULATORS: ReadonlyArray<ShareCalculatorSlug> = [
  'bmi',
  'tdee',
  'calorie-deficit',
  'body-fat',
  'macro',
  'fitness-age',
];

const ACTIVITY_LEVELS: ReadonlyArray<ActivityLevel> = [
  'sedentary',
  'lightly_active',
  'moderately_active',
  'very_active',
  'extremely_active',
];

const BODY_FAT_METHODS: ReadonlyArray<BodyFatMethod> = ['navy', 'bmi', 'manual'];

const MACRO_GOALS: ReadonlyArray<MacroGoal> = [
  'weight_loss',
  'maintenance',
  'muscle_gain',
  'custom',
];

interface BaseSharedInputs {
  age: number;
  gender: Gender;
}

export interface SharedBmiInputs extends BaseSharedInputs {
  heightCm: number;
  weightKg: number;
}

export interface SharedTdeeInputs extends BaseSharedInputs {
  heightCm: number;
  weightKg: number;
  activityLevel: ActivityLevel;
}

export interface SharedCalorieDeficitInputs extends BaseSharedInputs {
  heightCm: number;
  weightKg: number;
  goalWeightKg: number;
  activityLevel: ActivityLevel;
  deficitLevel: 'mild' | 'moderate' | 'aggressive';
}

export interface SharedBodyFatInputs extends BaseSharedInputs {
  heightCm: number;
  weightKg: number;
  method: BodyFatMethod;
  waistCm?: number;
  neckCm?: number;
  hipsCm?: number;
  bodyFatPercentage?: number;
}

export interface SharedMacroInputs extends BaseSharedInputs {
  heightCm: number;
  weightKg: number;
  activityLevel: ActivityLevel;
  goal: MacroGoal;
  customProteinPercent?: number;
  customCarbsPercent?: number;
  customFatPercent?: number;
}

export interface SharedFitnessAgeInputs extends BaseSharedInputs {
  vo2Max: number;
  restingHeartRate: number;
  bmi: number;
  bodyFatPercentage: number;
  weeklyTrainingDays: number;
  balanceScore: 1 | 2 | 3 | 4 | 5;
  flexibilityScore: 1 | 2 | 3 | 4 | 5;
}

export interface SharedResultInputMap {
  bmi: SharedBmiInputs;
  tdee: SharedTdeeInputs;
  'calorie-deficit': SharedCalorieDeficitInputs;
  'body-fat': SharedBodyFatInputs;
  macro: SharedMacroInputs;
  'fitness-age': SharedFitnessAgeInputs;
}

export type SharedResultPayload<C extends ShareCalculatorSlug = ShareCalculatorSlug> =
  C extends ShareCalculatorSlug
    ? {
        v: typeof SHARE_VERSION;
        c: C;
        i: SharedResultInputMap[C];
      }
    : never;

export type ShareResultContext =
  | { calculator: 'bmi'; inputs: SharedBmiInputs }
  | { calculator: 'tdee'; inputs: SharedTdeeInputs }
  | { calculator: 'calorie-deficit'; inputs: SharedCalorieDeficitInputs }
  | { calculator: 'body-fat'; inputs: SharedBodyFatInputs }
  | { calculator: 'macro'; inputs: SharedMacroInputs }
  | { calculator: 'fitness-age'; inputs: SharedFitnessAgeInputs };

export interface SharedResultSummary {
  calculator: ShareCalculatorSlug;
  title: string;
  description: string;
  primaryValue: string;
  secondaryValue: string;
  detail: string;
  accentColor: string;
}

export function isSupportedShareCalculator(value: string): value is ShareCalculatorSlug {
  return SHARE_CALCULATORS.includes(value as ShareCalculatorSlug);
}

function roundToOne(value: number): number {
  return Math.round(value * 10) / 10;
}

function isFiniteNumber(value: unknown): value is number {
  return typeof value === 'number' && Number.isFinite(value);
}

function isGender(value: unknown): value is Gender {
  return value === 'male' || value === 'female';
}

function isActivityLevel(value: unknown): value is ActivityLevel {
  return ACTIVITY_LEVELS.includes(value as ActivityLevel);
}

function isBodyFatMethod(value: unknown): value is BodyFatMethod {
  return BODY_FAT_METHODS.includes(value as BodyFatMethod);
}

function isMacroGoal(value: unknown): value is MacroGoal {
  return MACRO_GOALS.includes(value as MacroGoal);
}

function isInRange(value: number, min: number, max: number): boolean {
  return value >= min && value <= max;
}

function isScoreValue(value: unknown): value is 1 | 2 | 3 | 4 | 5 {
  return isFiniteNumber(value) && Number.isInteger(value) && isInRange(value, 1, 5);
}

function encodeToBase64Url(json: string): string {
  if (typeof Buffer !== 'undefined') {
    const base64 = Buffer.from(json, 'utf8').toString('base64');
    return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
  }

  const encoded = new TextEncoder().encode(json);
  let binary = '';
  encoded.forEach(byte => {
    binary += String.fromCharCode(byte);
  });

  const base64 = btoa(binary);
  return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
}

function decodeFromBase64Url(token: string): string | null {
  try {
    if (typeof Buffer !== 'undefined') {
      const padded = token.replace(/-/g, '+').replace(/_/g, '/');
      const withPadding = `${padded}${'='.repeat((4 - (padded.length % 4 || 4)) % 4)}`;
      return Buffer.from(withPadding, 'base64').toString('utf8');
    }

    const padded = token.replace(/-/g, '+').replace(/_/g, '/');
    const withPadding = `${padded}${'='.repeat((4 - (padded.length % 4 || 4)) % 4)}`;
    const binary = atob(withPadding);

    const bytes = new Uint8Array(binary.length);
    for (let index = 0; index < binary.length; index += 1) {
      bytes[index] = binary.charCodeAt(index);
    }

    return new TextDecoder().decode(bytes);
  } catch {
    return null;
  }
}

function validateBaseInputs(input: unknown): input is BaseSharedInputs {
  if (!input || typeof input !== 'object') return false;
  const candidate = input as Record<string, unknown>;

  return (
    isFiniteNumber(candidate.age) &&
    isInRange(candidate.age, 1, 120) &&
    Number.isInteger(candidate.age) &&
    isGender(candidate.gender)
  );
}

function validateBmiInputs(input: unknown): input is SharedBmiInputs {
  if (!input || typeof input !== 'object') return false;
  const candidate = input as Record<string, unknown>;

  return (
    validateBaseInputs(candidate) &&
    isFiniteNumber(candidate.heightCm) &&
    isFiniteNumber(candidate.weightKg) &&
    isInRange(candidate.heightCm, 50, 260) &&
    isInRange(candidate.weightKg, 20, 350)
  );
}

function validateTdeeInputs(input: unknown): input is SharedTdeeInputs {
  if (!input || typeof input !== 'object') return false;
  const candidate = input as Record<string, unknown>;
  if (!validateBmiInputs(candidate)) return false;

  return isActivityLevel(candidate.activityLevel);
}

function validateCalorieDeficitInputs(input: unknown): input is SharedCalorieDeficitInputs {
  if (!input || typeof input !== 'object') return false;
  const candidate = input as Record<string, unknown>;
  if (!validateTdeeInputs(candidate)) return false;

  return (
    isFiniteNumber(candidate.goalWeightKg) &&
    isInRange(candidate.goalWeightKg, 20, 350) &&
    candidate.goalWeightKg < (candidate.weightKg as number) &&
    ['mild', 'moderate', 'aggressive'].includes(String(candidate.deficitLevel))
  );
}

function validateBodyFatInputs(input: unknown): input is SharedBodyFatInputs {
  if (!input || typeof input !== 'object') return false;
  const candidate = input as Record<string, unknown>;
  if (!validateBmiInputs(candidate)) return false;

  if (!isBodyFatMethod(candidate.method)) return false;

  if (candidate.method === 'navy') {
    if (!isFiniteNumber(candidate.waistCm) || !isFiniteNumber(candidate.neckCm)) return false;
    if (!isInRange(candidate.waistCm, 30, 200) || !isInRange(candidate.neckCm, 15, 80))
      return false;

    if (candidate.gender === 'female') {
      if (!isFiniteNumber(candidate.hipsCm) || !isInRange(candidate.hipsCm, 40, 220)) return false;
    }
  }

  if (candidate.method === 'manual') {
    if (!isFiniteNumber(candidate.bodyFatPercentage)) return false;
    if (!isInRange(candidate.bodyFatPercentage, 2, 60)) return false;
  }

  return true;
}

function validateMacroInputs(input: unknown): input is SharedMacroInputs {
  if (!input || typeof input !== 'object') return false;
  const candidate = input as Record<string, unknown>;
  if (!validateTdeeInputs(candidate)) return false;

  if (!isMacroGoal(candidate.goal)) return false;

  if (candidate.goal === 'custom') {
    if (
      !isFiniteNumber(candidate.customProteinPercent) ||
      !isFiniteNumber(candidate.customCarbsPercent) ||
      !isFiniteNumber(candidate.customFatPercent)
    ) {
      return false;
    }

    const validation = validateMacroDistribution(
      candidate.customProteinPercent,
      candidate.customCarbsPercent,
      candidate.customFatPercent
    );

    return validation.isValid;
  }

  return true;
}

function validateFitnessAgeInputs(input: unknown): input is SharedFitnessAgeInputs {
  if (!input || typeof input !== 'object') return false;
  const candidate = input as Record<string, unknown>;
  if (!validateBaseInputs(candidate)) return false;

  return (
    isInRange(candidate.age as number, 14, 95) &&
    isFiniteNumber(candidate.vo2Max) &&
    isInRange(candidate.vo2Max, 10, 85) &&
    isFiniteNumber(candidate.restingHeartRate) &&
    isInRange(candidate.restingHeartRate, 35, 130) &&
    isFiniteNumber(candidate.bmi) &&
    isInRange(candidate.bmi, 12, 60) &&
    isFiniteNumber(candidate.bodyFatPercentage) &&
    isInRange(candidate.bodyFatPercentage, 3, 65) &&
    isFiniteNumber(candidate.weeklyTrainingDays) &&
    Number.isInteger(candidate.weeklyTrainingDays) &&
    isInRange(candidate.weeklyTrainingDays, 0, 7) &&
    isScoreValue(candidate.balanceScore) &&
    isScoreValue(candidate.flexibilityScore)
  );
}

function validatePayloadShape(payload: unknown): payload is SharedResultPayload {
  if (!payload || typeof payload !== 'object') return false;

  const candidate = payload as Record<string, unknown>;
  if (candidate.v !== SHARE_VERSION) return false;
  if (!isSupportedShareCalculator(String(candidate.c))) return false;

  switch (candidate.c) {
    case 'bmi':
      return validateBmiInputs(candidate.i);
    case 'tdee':
      return validateTdeeInputs(candidate.i);
    case 'calorie-deficit':
      return validateCalorieDeficitInputs(candidate.i);
    case 'body-fat':
      return validateBodyFatInputs(candidate.i);
    case 'macro':
      return validateMacroInputs(candidate.i);
    case 'fitness-age':
      return validateFitnessAgeInputs(candidate.i);
    default:
      return false;
  }
}

export function encodeSharedResultToken(payload: SharedResultPayload): string {
  return encodeToBase64Url(JSON.stringify(payload));
}

export function buildSharedResultToken(context: ShareResultContext): string {
  return encodeSharedResultToken({
    v: SHARE_VERSION,
    c: context.calculator,
    i: context.inputs,
  } as SharedResultPayload);
}

export function decodeSharedResultToken(
  token: string | null | undefined
): SharedResultPayload | null {
  if (!token || typeof token !== 'string') {
    return null;
  }

  const decoded = decodeFromBase64Url(token);
  if (!decoded) return null;

  try {
    const parsed = JSON.parse(decoded);
    if (!validatePayloadShape(parsed)) {
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

export function decodeSharedResultFromSearchParams(
  searchParams: Pick<URLSearchParams, 'get'>,
  expectedCalculator?: ShareCalculatorSlug
): SharedResultPayload | null {
  const token = searchParams.get('r');
  const payload = decodeSharedResultToken(token);

  if (!payload) {
    return null;
  }

  if (expectedCalculator && payload.c !== expectedCalculator) {
    return null;
  }

  return payload;
}

function formatGender(gender: Gender): string {
  return gender === 'male' ? 'male' : 'female';
}

function buildBmiSummary(input: SharedBmiInputs): SharedResultSummary {
  const bmi = roundToOne(calculateBMI(input.heightCm, input.weightKg));
  const category = getBMICategory(bmi).name;

  return {
    calculator: 'bmi',
    title: `BMI ${bmi.toFixed(1)} (${category})`,
    description: `Shared BMI result for a ${input.age}-year-old ${formatGender(input.gender)} profile.`,
    primaryValue: bmi.toFixed(1),
    secondaryValue: category,
    detail: `${input.heightCm} cm • ${roundToOne(input.weightKg)} kg`,
    accentColor:
      category === 'Normal' ? '#10B981' : category === 'Underweight' ? '#3B82F6' : '#F59E0B',
  };
}

function buildTdeeSummary(input: SharedTdeeInputs): SharedResultSummary {
  const activityMultiplier = getActivityMultiplier(input.activityLevel);
  const bmr = Math.round(calculateBMR(input.gender, input.age, input.weightKg, input.heightCm));
  const tdee = Math.round(calculateTDEE(bmr, activityMultiplier));

  return {
    calculator: 'tdee',
    title: `TDEE ${tdee.toLocaleString()} kcal/day`,
    description: `Shared TDEE result for a ${input.age}-year-old ${formatGender(input.gender)} profile.`,
    primaryValue: `${tdee.toLocaleString()} kcal/day`,
    secondaryValue: `BMR ${bmr.toLocaleString()} kcal/day`,
    detail: `${input.heightCm} cm • ${roundToOne(input.weightKg)} kg • ${input.activityLevel.replace('_', ' ')}`,
    accentColor: '#4F46E5',
  };
}

function buildCalorieDeficitSummary(input: SharedCalorieDeficitInputs): SharedResultSummary {
  const result = calculateCalorieDeficit({
    gender: input.gender,
    age: input.age,
    heightCm: input.heightCm,
    weightKg: input.weightKg,
    goalWeightKg: input.goalWeightKg,
    activityLevel: input.activityLevel,
    deficitLevel: input.deficitLevel,
  });

  return {
    calculator: 'calorie-deficit',
    title: `Target ${result.dailyCalorieTarget.toLocaleString()} kcal/day`,
    description: `Shared calorie-deficit plan with ~${result.estimatedWeeks} week timeline.`,
    primaryValue: `${result.dailyCalorieTarget.toLocaleString()} kcal/day`,
    secondaryValue: `~${result.estimatedWeeks} weeks to goal`,
    detail: `${roundToOne(input.weightKg)} kg → ${roundToOne(input.goalWeightKg)} kg (${input.deficitLevel})`,
    accentColor: '#7C3AED',
  };
}

function buildBodyFatSummary(input: SharedBodyFatInputs): SharedResultSummary {
  const bmi = calculateBMI(input.heightCm, input.weightKg);
  const bodyFat = roundToOne(
    calculateBodyFat(input.method, {
      gender: input.gender,
      age: input.age,
      heightCm: input.heightCm,
      weightKg: input.weightKg,
      bmi,
      waistCm: input.waistCm,
      neckCm: input.neckCm,
      hipsCm: input.hipsCm,
      bodyFatPercentage: input.bodyFatPercentage,
    })
  );

  const category = getBodyFatCategory(input.gender, bodyFat).name;

  return {
    calculator: 'body-fat',
    title: `Body Fat ${bodyFat.toFixed(1)}% (${category})`,
    description: `Shared body fat result for a ${input.age}-year-old ${formatGender(input.gender)} profile.`,
    primaryValue: `${bodyFat.toFixed(1)}%`,
    secondaryValue: category,
    detail: `${input.method.toUpperCase()} method • ${input.heightCm} cm • ${roundToOne(input.weightKg)} kg`,
    accentColor: category === 'Athletic' || category === 'Fitness' ? '#10B981' : '#F59E0B',
  };
}

function buildMacroSummary(input: SharedMacroInputs): SharedResultSummary {
  const bmr = calculateBMR(input.gender, input.age, input.weightKg, input.heightCm);
  const tdee = calculateTDEE(bmr, getActivityMultiplier(input.activityLevel));
  const targetCalories = calculateTargetCalories(Math.round(tdee), input.goal);

  let proteinPercent: number;
  let carbsPercent: number;
  let fatPercent: number;

  if (input.goal === 'custom') {
    proteinPercent = input.customProteinPercent ?? 30;
    carbsPercent = input.customCarbsPercent ?? 40;
    fatPercent = input.customFatPercent ?? 30;
  } else {
    const preset = getMacroPreset(input.goal);
    proteinPercent = preset.proteinPercent;
    carbsPercent = preset.carbsPercent;
    fatPercent = preset.fatPercent;
  }

  const macros = calculateMacros({
    targetCalories,
    proteinPercent,
    carbsPercent,
    fatPercent,
  });

  return {
    calculator: 'macro',
    title: `Macros at ${targetCalories.toLocaleString()} kcal/day`,
    description: `Shared macro targets for ${input.goal.replace('_', ' ')}.`,
    primaryValue: `${macros.protein.grams}g P • ${macros.carbs.grams}g C • ${macros.fat.grams}g F`,
    secondaryValue: `${proteinPercent}/${carbsPercent}/${fatPercent} split`,
    detail: `${input.activityLevel.replace('_', ' ')} • ${roundToOne(input.weightKg)} kg`,
    accentColor: '#059669',
  };
}

function formatFitnessAgeClassification(value: 'younger' | 'aligned' | 'older'): string {
  if (value === 'younger') return 'Younger';
  if (value === 'older') return 'Older';
  return 'Aligned';
}

function getFitnessAgeAccentColor(classification: 'younger' | 'aligned' | 'older'): string {
  if (classification === 'younger') return '#10B981';
  if (classification === 'older') return '#F97316';
  return '#4F46E5';
}

function buildFitnessAgeSummary(input: SharedFitnessAgeInputs): SharedResultSummary {
  const result = calculateFitnessAge({
    age: input.age,
    gender: input.gender,
    vo2Max: input.vo2Max,
    restingHeartRate: input.restingHeartRate,
    bmi: input.bmi,
    bodyFatPercentage: input.bodyFatPercentage,
    weeklyTrainingDays: input.weeklyTrainingDays,
    balanceScore: input.balanceScore,
    flexibilityScore: input.flexibilityScore,
  });

  return {
    calculator: 'fitness-age',
    title: `Fitness Age ${result.fitnessAge.toFixed(1)} (${formatFitnessAgeClassification(result.classification)})`,
    description: `Shared fitness-age result for a ${input.age}-year-old ${formatGender(input.gender)} profile.`,
    primaryValue: `${result.fitnessAge.toFixed(1)} years`,
    secondaryValue: `${result.ageGap >= 0 ? '+' : ''}${result.ageGap.toFixed(1)} year age gap`,
    detail: `VO2 ${roundToOne(input.vo2Max)} • RHR ${Math.round(input.restingHeartRate)} bpm • ${result.confidenceLabel} confidence`,
    accentColor: getFitnessAgeAccentColor(result.classification),
  };
}

export function buildSharedResultSummary(payload: SharedResultPayload): SharedResultSummary {
  switch (payload.c) {
    case 'bmi':
      return buildBmiSummary(payload.i);
    case 'tdee':
      return buildTdeeSummary(payload.i);
    case 'calorie-deficit':
      return buildCalorieDeficitSummary(payload.i);
    case 'body-fat':
      return buildBodyFatSummary(payload.i);
    case 'macro':
      return buildMacroSummary(payload.i);
    case 'fitness-age':
      return buildFitnessAgeSummary(payload.i);
    default:
      return {
        calculator: 'bmi',
        title: 'Shared result',
        description: 'Shared calculator result',
        primaryValue: 'Result',
        secondaryValue: 'HealthCheck',
        detail: 'healthcalc.xyz',
        accentColor: '#4F46E5',
      };
  }
}
