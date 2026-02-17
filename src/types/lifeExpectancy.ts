/**
 * Types for Life Expectancy / Longevity Calculator
 *
 * Scientific References:
 * - CDC National Vital Statistics Reports (2023): US Life Tables
 * - Li et al. (2018): Impact of Healthy Lifestyle Factors - Circulation
 * - WHO Global Health Observatory data (2023)
 */

export type SmokingStatus = 'never' | 'former' | 'current-light' | 'current-heavy';
export type AlcoholIntake = 'none' | 'light' | 'moderate' | 'heavy';
export type ExerciseFrequency = 'sedentary' | 'light' | 'moderate' | 'active' | 'very-active';
export type DietQuality = 'poor' | 'average' | 'good' | 'excellent';
export type SleepQuality = 'poor' | 'fair' | 'good' | 'excellent';
export type StressLevel = 'low' | 'moderate' | 'high' | 'very-high';
export type SocialConnection = 'isolated' | 'some' | 'strong';

export interface LifeExpectancyFormValues {
  age: number;
  gender: 'male' | 'female';
  bmi: number;
  smokingStatus: SmokingStatus;
  alcoholIntake: AlcoholIntake;
  exerciseFrequency: ExerciseFrequency;
  dietQuality: DietQuality;
  sleepHours: number;
  stressLevel: StressLevel;
  familyHistoryLongevity: boolean;
  chronicConditions: string[];
  socialConnections: SocialConnection;
}

export interface LifeExpectancyResult {
  estimatedLifeExpectancy: number;
  baselineLifeExpectancy: number;
  yearsAdded: number;
  yearsLost: number;
  netEffect: number;
  remainingYears: number;
  positiveFactors: Array<{ factor: string; yearsAdded: number }>;
  negativeFactors: Array<{ factor: string; yearsLost: number }>;
  topRecommendations: string[];
  healthAge: number;
  percentileRank: number;
}
