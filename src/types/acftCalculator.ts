/**
 * Types for ACFT (Army Combat Fitness Test) Score Calculator
 *
 * Scientific References:
 * - U.S. Army ACFT Standards (FM 7-22, 2022)
 * - Army Regulation 350-1: Army Training and Leader Development
 */

export type ACFTEvent =
  | 'deadlift'
  | 'standingPowerThrow'
  | 'handReleasePushups'
  | 'sprintDragCarry'
  | 'plank'
  | 'twoMileRun';

export type ACFTAgeGroup =
  | '17-21'
  | '22-26'
  | '27-31'
  | '32-36'
  | '37-41'
  | '42-46'
  | '47-51'
  | '52-56'
  | '57-61'
  | '62+';

export interface ACFTFormValues {
  gender: 'male' | 'female';
  ageGroup: ACFTAgeGroup;
  deadliftWeight: number; // lbs, 3 rep max
  standingPowerThrow: number; // meters
  handReleasePushups: number; // reps
  sprintDragCarryTime: number; // seconds
  plankTime: number; // seconds
  twoMileRunTime: number; // seconds
}

export interface ACFTEventScore {
  event: ACFTEvent;
  eventName: string;
  rawValue: number;
  rawDisplay: string;
  points: number; // 0-100
  passing: boolean;
  category: string;
}

export interface ACFTResult {
  totalScore: number;
  eventScores: ACFTEventScore[];
  passing: boolean;
  minimumPassingMet: boolean;
  overallCategory: string;
  strengths: string[];
  weaknesses: string[];
  recommendations: string[];
}
