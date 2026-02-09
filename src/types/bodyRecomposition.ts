import { Gender, ActivityLevel, WeightUnit, HeightUnit } from './common';

export type TrainingExperience = 'beginner' | 'intermediate' | 'advanced';
export type RecompGoal = 'lose-fat-build-muscle' | 'maintain-build-muscle' | 'aggressive-cut';

export interface BodyRecompFormValues {
  weight: number;
  weightUnit: WeightUnit;
  heightCm: number;
  heightFt: number;
  heightIn: number;
  heightUnit: HeightUnit;
  age: number;
  gender: Gender;
  activityLevel: ActivityLevel;
  bodyFatPercentage: number;
  trainingExperience: TrainingExperience;
  goal: RecompGoal;
  useMetric: boolean;
}

export interface BodyRecompResult {
  dailyCalories: number;
  proteinGrams: number;
  fatGrams: number;
  carbGrams: number;
  trainingDayCalories: number;
  restDayCalories: number;
  estimatedWeeklyFatLoss: number;
  estimatedMonthlyMuscleGain: number;
  timelineWeeks: number;
  recommendation: string;
}
