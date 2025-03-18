/**
 * ACFT (Army Combat Fitness Test) Score Calculator
 *
 * Scientific References:
 * - U.S. Army ACFT Standards (FM 7-22, 2022)
 * - Army Regulation 350-1: Army Training and Leader Development
 * - ACFT scoring tables effective April 2023
 *
 * Methodology: Converts raw performance values to 0-100 point scores
 * per event using interpolation against official scoring tables.
 * Total score is the sum of all 6 events (0-600).
 */

import { ACFTFormValues, ACFTEventScore, ACFTResult } from '@/types/acftCalculator';

import {
  ScoreBreakpoint,
  DEADLIFT_SCORES_MALE,
  DEADLIFT_SCORES_FEMALE,
  SPT_SCORES_MALE,
  SPT_SCORES_FEMALE,
  HRP_SCORES_MALE,
  HRP_SCORES_FEMALE,
  SDC_SCORES_MALE,
  SDC_SCORES_FEMALE,
  PLANK_SCORES_MALE,
  PLANK_SCORES_FEMALE,
  TMR_SCORES_MALE,
  TMR_SCORES_FEMALE,
  MINIMUM_PASSING_SCORE,
  CATEGORY_THRESHOLDS,
  EVENT_NAMES,
} from '@/constants/acftCalculator';

/**
 * Interpolate score from breakpoint table (higher raw = better)
 */
function interpolateHigherBetter(raw: number, table: ScoreBreakpoint[]): number {
  if (raw >= table[0].raw) return table[0].points;
  if (raw <= table[table.length - 1].raw) return table[table.length - 1].points;

  for (let i = 0; i < table.length - 1; i++) {
    const upper = table[i];
    const lower = table[i + 1];
    if (raw <= upper.raw && raw >= lower.raw) {
      const ratio = (raw - lower.raw) / (upper.raw - lower.raw);
      return Math.round(lower.points + ratio * (upper.points - lower.points));
    }
  }
  return 0;
}

/**
 * Interpolate score from breakpoint table (lower raw = better, e.g. time events)
 */
function interpolateLowerBetter(raw: number, table: ScoreBreakpoint[]): number {
  if (raw <= table[0].raw) return table[0].points;
  if (raw >= table[table.length - 1].raw) return table[table.length - 1].points;

  for (let i = 0; i < table.length - 1; i++) {
    const better = table[i];
    const worse = table[i + 1];
    if (raw >= better.raw && raw <= worse.raw) {
      const ratio = (worse.raw - raw) / (worse.raw - better.raw);
      return Math.round(worse.points + ratio * (better.points - worse.points));
    }
  }
  return 0;
}

/**
 * Format seconds as mm:ss
 */
function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

/**
 * Calculate ACFT score from raw event performances
 */
export function calculateACFT(values: ACFTFormValues): ACFTResult {
  if (values.deadliftWeight < 0) throw new Error('Deadlift weight must be non-negative');
  if (values.standingPowerThrow < 0) throw new Error('Standing power throw must be non-negative');
  if (values.handReleasePushups < 0) throw new Error('Push-up reps must be non-negative');
  if (values.sprintDragCarryTime < 0)
    throw new Error('Sprint-drag-carry time must be non-negative');
  if (values.plankTime < 0) throw new Error('Plank time must be non-negative');
  if (values.twoMileRunTime < 0) throw new Error('Two-mile run time must be non-negative');

  const isMale = values.gender === 'male';

  // Score each event
  const deadliftPoints = interpolateHigherBetter(
    values.deadliftWeight,
    isMale ? DEADLIFT_SCORES_MALE : DEADLIFT_SCORES_FEMALE
  );
  const sptPoints = interpolateHigherBetter(
    values.standingPowerThrow,
    isMale ? SPT_SCORES_MALE : SPT_SCORES_FEMALE
  );
  const hrpPoints = interpolateHigherBetter(
    values.handReleasePushups,
    isMale ? HRP_SCORES_MALE : HRP_SCORES_FEMALE
  );
  const sdcPoints = interpolateLowerBetter(
    values.sprintDragCarryTime,
    isMale ? SDC_SCORES_MALE : SDC_SCORES_FEMALE
  );
  const plankPoints = interpolateHigherBetter(
    values.plankTime,
    isMale ? PLANK_SCORES_MALE : PLANK_SCORES_FEMALE
  );
  const tmrPoints = interpolateLowerBetter(
    values.twoMileRunTime,
    isMale ? TMR_SCORES_MALE : TMR_SCORES_FEMALE
  );

  const eventScores: ACFTEventScore[] = [
    {
      event: 'deadlift',
      eventName: EVENT_NAMES.deadlift,
      rawValue: values.deadliftWeight,
      rawDisplay: `${values.deadliftWeight} lbs`,
      points: deadliftPoints,
      passing: deadliftPoints >= MINIMUM_PASSING_SCORE,
      category: getEventCategory(deadliftPoints),
    },
    {
      event: 'standingPowerThrow',
      eventName: EVENT_NAMES.standingPowerThrow,
      rawValue: values.standingPowerThrow,
      rawDisplay: `${values.standingPowerThrow} m`,
      points: sptPoints,
      passing: sptPoints >= MINIMUM_PASSING_SCORE,
      category: getEventCategory(sptPoints),
    },
    {
      event: 'handReleasePushups',
      eventName: EVENT_NAMES.handReleasePushups,
      rawValue: values.handReleasePushups,
      rawDisplay: `${values.handReleasePushups} reps`,
      points: hrpPoints,
      passing: hrpPoints >= MINIMUM_PASSING_SCORE,
      category: getEventCategory(hrpPoints),
    },
    {
      event: 'sprintDragCarry',
      eventName: EVENT_NAMES.sprintDragCarry,
      rawValue: values.sprintDragCarryTime,
      rawDisplay: formatTime(values.sprintDragCarryTime),
      points: sdcPoints,
      passing: sdcPoints >= MINIMUM_PASSING_SCORE,
      category: getEventCategory(sdcPoints),
    },
    {
      event: 'plank',
      eventName: EVENT_NAMES.plank,
      rawValue: values.plankTime,
      rawDisplay: formatTime(values.plankTime),
      points: plankPoints,
      passing: plankPoints >= MINIMUM_PASSING_SCORE,
      category: getEventCategory(plankPoints),
    },
    {
      event: 'twoMileRun',
      eventName: EVENT_NAMES.twoMileRun,
      rawValue: values.twoMileRunTime,
      rawDisplay: formatTime(values.twoMileRunTime),
      points: tmrPoints,
      passing: tmrPoints >= MINIMUM_PASSING_SCORE,
      category: getEventCategory(tmrPoints),
    },
  ];

  const totalScore = eventScores.reduce((sum, e) => sum + e.points, 0);
  const allPassing = eventScores.every(e => e.passing);
  const minimumPassingMet = allPassing && totalScore >= 360;

  const overallCategory = getOverallCategory(totalScore, allPassing);

  const strengths = eventScores
    .filter(e => e.points >= 80)
    .map(e => `${e.eventName}: ${e.points} points`);
  const weaknesses = eventScores
    .filter(e => e.points < 60)
    .map(e => `${e.eventName}: ${e.points} points`);

  const recommendations: string[] = [];
  for (const event of eventScores) {
    if (event.points < 60) {
      recommendations.push(getEventRecommendation(event.event, event.points));
    }
  }
  if (recommendations.length === 0) {
    recommendations.push(
      'All events meet passing standards. Focus on raising your weakest event to improve overall score.'
    );
  }

  return {
    totalScore,
    eventScores,
    passing: minimumPassingMet,
    minimumPassingMet,
    overallCategory,
    strengths,
    weaknesses,
    recommendations,
  };
}

function getEventCategory(points: number): string {
  if (points >= 90) return 'Gold';
  if (points >= 80) return 'Silver';
  if (points >= 70) return 'Bronze';
  if (points >= 60) return 'Pass';
  return 'Fail';
}

function getOverallCategory(totalScore: number, allPassing: boolean): string {
  if (!allPassing) return 'Fail';
  for (const threshold of CATEGORY_THRESHOLDS) {
    if (totalScore >= threshold.min) return threshold.label;
  }
  return 'Fail';
}

function getEventRecommendation(event: string, points: number): string {
  const deficit = MINIMUM_PASSING_SCORE - points;
  switch (event) {
    case 'deadlift':
      return `Deadlift needs ${deficit} more points. Focus on progressive overload with hex bar deadlifts and Romanian deadlifts.`;
    case 'standingPowerThrow':
      return `Standing Power Throw needs improvement. Practice explosive hip extension with medicine ball throws and power cleans.`;
    case 'handReleasePushups':
      return `Hand Release Push-Ups need work. Build endurance with daily push-up practice and chest/tricep accessory work.`;
    case 'sprintDragCarry':
      return `Sprint-Drag-Carry needs improvement. Practice the full event and work on sled drags, farmer carries, and sprint intervals.`;
    case 'plank':
      return `Plank hold needs improvement. Build core endurance with progressive plank holds and anti-extension exercises.`;
    case 'twoMileRun':
      return `Two-Mile Run needs improvement. Incorporate interval training, tempo runs, and build weekly mileage gradually.`;
    default:
      return `Focus on improving ${event} performance.`;
  }
}
