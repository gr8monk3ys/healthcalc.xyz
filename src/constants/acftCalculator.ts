/**
 * Constants for ACFT (Army Combat Fitness Test) Score Calculator
 *
 * Scientific References:
 * - U.S. Army ACFT Standards (FM 7-22, 2022)
 * - Army Regulation 350-1: Army Training and Leader Development
 * - ACFT scoring tables effective April 2023
 */

import { ACFTAgeGroup } from '@/types/acftCalculator';

/**
 * Simplified ACFT scoring tables.
 * Each event maps raw performance to points (0-100).
 * We use breakpoint interpolation for efficiency.
 * Values are [rawValue, points] pairs. Points between breakpoints are linearly interpolated.
 */

export interface ScoreBreakpoint {
  raw: number;
  points: number;
}

/** Deadlift 3-Rep Max (lbs) */
export const DEADLIFT_SCORES_MALE: ScoreBreakpoint[] = [
  { raw: 340, points: 100 },
  { raw: 300, points: 90 },
  { raw: 260, points: 80 },
  { raw: 230, points: 70 },
  { raw: 200, points: 60 },
  { raw: 180, points: 50 },
  { raw: 160, points: 40 },
  { raw: 140, points: 30 },
  { raw: 120, points: 20 },
  { raw: 80, points: 0 },
];

export const DEADLIFT_SCORES_FEMALE: ScoreBreakpoint[] = [
  { raw: 210, points: 100 },
  { raw: 190, points: 90 },
  { raw: 170, points: 80 },
  { raw: 150, points: 70 },
  { raw: 130, points: 60 },
  { raw: 120, points: 50 },
  { raw: 110, points: 40 },
  { raw: 100, points: 30 },
  { raw: 80, points: 20 },
  { raw: 60, points: 0 },
];

/** Standing Power Throw (meters) */
export const SPT_SCORES_MALE: ScoreBreakpoint[] = [
  { raw: 12.5, points: 100 },
  { raw: 11.0, points: 90 },
  { raw: 10.0, points: 80 },
  { raw: 9.0, points: 70 },
  { raw: 8.0, points: 60 },
  { raw: 7.0, points: 50 },
  { raw: 6.0, points: 40 },
  { raw: 5.0, points: 30 },
  { raw: 4.0, points: 20 },
  { raw: 3.0, points: 0 },
];

export const SPT_SCORES_FEMALE: ScoreBreakpoint[] = [
  { raw: 8.5, points: 100 },
  { raw: 7.5, points: 90 },
  { raw: 6.5, points: 80 },
  { raw: 5.8, points: 70 },
  { raw: 5.0, points: 60 },
  { raw: 4.5, points: 50 },
  { raw: 4.0, points: 40 },
  { raw: 3.5, points: 30 },
  { raw: 3.0, points: 20 },
  { raw: 2.0, points: 0 },
];

/** Hand Release Push-Ups (reps) */
export const HRP_SCORES_MALE: ScoreBreakpoint[] = [
  { raw: 60, points: 100 },
  { raw: 50, points: 90 },
  { raw: 40, points: 80 },
  { raw: 35, points: 70 },
  { raw: 30, points: 60 },
  { raw: 25, points: 50 },
  { raw: 20, points: 40 },
  { raw: 15, points: 30 },
  { raw: 10, points: 20 },
  { raw: 1, points: 0 },
];

export const HRP_SCORES_FEMALE: ScoreBreakpoint[] = [
  { raw: 60, points: 100 },
  { raw: 45, points: 90 },
  { raw: 35, points: 80 },
  { raw: 28, points: 70 },
  { raw: 20, points: 60 },
  { raw: 15, points: 50 },
  { raw: 12, points: 40 },
  { raw: 10, points: 30 },
  { raw: 5, points: 20 },
  { raw: 1, points: 0 },
];

/** Sprint-Drag-Carry (seconds - lower is better) */
export const SDC_SCORES_MALE: ScoreBreakpoint[] = [
  { raw: 93, points: 100 },
  { raw: 100, points: 90 },
  { raw: 110, points: 80 },
  { raw: 120, points: 70 },
  { raw: 130, points: 60 },
  { raw: 140, points: 50 },
  { raw: 155, points: 40 },
  { raw: 170, points: 30 },
  { raw: 190, points: 20 },
  { raw: 240, points: 0 },
];

export const SDC_SCORES_FEMALE: ScoreBreakpoint[] = [
  { raw: 118, points: 100 },
  { raw: 130, points: 90 },
  { raw: 140, points: 80 },
  { raw: 150, points: 70 },
  { raw: 160, points: 60 },
  { raw: 175, points: 50 },
  { raw: 190, points: 40 },
  { raw: 210, points: 30 },
  { raw: 230, points: 20 },
  { raw: 300, points: 0 },
];

/** Plank (seconds - higher is better) */
export const PLANK_SCORES_MALE: ScoreBreakpoint[] = [
  { raw: 220, points: 100 },
  { raw: 200, points: 90 },
  { raw: 180, points: 80 },
  { raw: 160, points: 70 },
  { raw: 140, points: 60 },
  { raw: 120, points: 50 },
  { raw: 100, points: 40 },
  { raw: 80, points: 30 },
  { raw: 60, points: 20 },
  { raw: 30, points: 0 },
];

export const PLANK_SCORES_FEMALE: ScoreBreakpoint[] = [
  { raw: 220, points: 100 },
  { raw: 200, points: 90 },
  { raw: 180, points: 80 },
  { raw: 160, points: 70 },
  { raw: 140, points: 60 },
  { raw: 120, points: 50 },
  { raw: 100, points: 40 },
  { raw: 80, points: 30 },
  { raw: 60, points: 20 },
  { raw: 30, points: 0 },
];

/** Two-Mile Run (seconds - lower is better) */
export const TMR_SCORES_MALE: ScoreBreakpoint[] = [
  { raw: 780, points: 100 }, // 13:00
  { raw: 840, points: 90 }, // 14:00
  { raw: 900, points: 80 }, // 15:00
  { raw: 960, points: 70 }, // 16:00
  { raw: 1020, points: 60 }, // 17:00
  { raw: 1110, points: 50 }, // 18:30
  { raw: 1200, points: 40 }, // 20:00
  { raw: 1290, points: 30 }, // 21:30
  { raw: 1380, points: 20 }, // 23:00
  { raw: 1500, points: 0 }, // 25:00
];

export const TMR_SCORES_FEMALE: ScoreBreakpoint[] = [
  { raw: 900, points: 100 }, // 15:00
  { raw: 960, points: 90 }, // 16:00
  { raw: 1050, points: 80 }, // 17:30
  { raw: 1110, points: 70 }, // 18:30
  { raw: 1200, points: 60 }, // 20:00
  { raw: 1290, points: 50 }, // 21:30
  { raw: 1380, points: 40 }, // 22:30
  { raw: 1440, points: 30 }, // 24:00
  { raw: 1500, points: 20 }, // 25:00
  { raw: 1620, points: 0 }, // 27:00
];

/** Minimum passing score per event */
export const MINIMUM_PASSING_SCORE = 60;

/** Overall category thresholds */
export const CATEGORY_THRESHOLDS = [
  { min: 540, label: 'Gold' },
  { min: 480, label: 'Silver' },
  { min: 420, label: 'Bronze' },
  { min: 360, label: 'Pass' },
  { min: 0, label: 'Fail' },
];

/** Age group labels */
export const AGE_GROUP_LABELS: Record<ACFTAgeGroup, string> = {
  '17-21': '17-21 years',
  '22-26': '22-26 years',
  '27-31': '27-31 years',
  '32-36': '32-36 years',
  '37-41': '37-41 years',
  '42-46': '42-46 years',
  '47-51': '47-51 years',
  '52-56': '52-56 years',
  '57-61': '57-61 years',
  '62+': '62+ years',
};

/** Event display names */
export const EVENT_NAMES: Record<string, string> = {
  deadlift: '3 Repetition Maximum Deadlift',
  standingPowerThrow: 'Standing Power Throw',
  handReleasePushups: 'Hand Release Push-Ups',
  sprintDragCarry: 'Sprint-Drag-Carry',
  plank: 'Plank',
  twoMileRun: '2-Mile Run',
};
