/**
 * Types for Intermittent Fasting Calculator
 */

import { Gender, ActivityLevel, WeightUnit } from './common';

export type FastingProtocol = '16:8' | '18:6' | '20:4' | '5:2' | 'omad' | 'alternate-day';

export type FastingGoal = 'weight-loss' | 'maintenance' | 'health' | 'muscle-gain';

export interface IFFormValues {
  weight: number;
  weightUnit: WeightUnit;
  heightCm: number;
  heightFt: number;
  heightIn: number;
  age: number;
  gender: Gender;
  activityLevel: ActivityLevel;
  protocol: FastingProtocol;
  goal: FastingGoal;
  wakeTime: string;
  useMetric: boolean;
}

export interface IFResult {
  // Energy metrics
  bmr: number;
  tdee: number;
  dailyCalories: number;
  calorieAdjustment: number;

  // Fasting schedule
  protocol: FastingProtocol;
  fastingHours: number;
  eatingHours: number;
  eatingWindowStart: string;
  eatingWindowEnd: string;

  // Meal planning
  mealsInWindow: number;
  caloriesPerMeal: number;
  mealTimes: string[];

  // Nutrition targets
  proteinTarget: number;
  fatTarget: number;
  carbTarget: number;
  fiberTarget: number;
  waterTarget: number;

  // Protocol details
  protocolDescription: string;
  benefits: string[];
  tips: string[];

  // Weekly projections
  weeklyProjections?: Array<{
    week: number;
    projectedWeight: number;
    cumulativeWeightLoss: number;
  }>;
}

export interface FastingProtocolDetails {
  id: FastingProtocol;
  name: string;
  description: string;
  fastingHours: number;
  eatingHours: number;
  mealsRecommended: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  benefits: string[];
  bestFor: string[];
}
