import { ActivityOption } from '@/types/bodyFatBurn';

// MET values based on the Compendium of Physical Activities
export const ACTIVITIES: ActivityOption[] = [
  {
    id: 'walking',
    name: 'Walking',
    met: 3.5, // Base MET value, will be adjusted by speed
    speedUnit: 'mph',
    speedRange: {
      min: 2.0,
      max: 4.5,
      step: 0.1,
    },
  },
  {
    id: 'running',
    name: 'Running/Jogging',
    met: 8.0, // Base MET value, will be adjusted by speed
    speedUnit: 'mph',
    speedRange: {
      min: 5.0,
      max: 10.0,
      step: 0.1,
    },
  },
  {
    id: 'cycling',
    name: 'Cycling',
    met: 6.0, // Base MET value, will be adjusted by speed
    speedUnit: 'mph',
    speedRange: {
      min: 10.0,
      max: 20.0,
      step: 0.5,
    },
  },
  {
    id: 'swimming',
    name: 'Swimming',
    met: 7.0, // Base MET value, will be adjusted by speed
    speedUnit: 'mph',
    speedRange: {
      min: 1.0,
      max: 3.0,
      step: 0.1,
    },
  },
  {
    id: 'elliptical',
    name: 'Elliptical Trainer',
    met: 5.0, // Base MET value, will be adjusted by level
    speedUnit: 'level',
    speedRange: {
      min: 1,
      max: 10,
      step: 1,
    },
  },
  {
    id: 'stairMaster',
    name: 'Stair Master',
    met: 6.0, // Base MET value, will be adjusted by level
    speedUnit: 'level',
    speedRange: {
      min: 1,
      max: 10,
      step: 1,
    },
  },
  {
    id: 'rowing',
    name: 'Rowing Machine',
    met: 7.0, // Base MET value, will be adjusted by intensity
    speedUnit: 'intensity',
    speedRange: {
      min: 1,
      max: 10,
      step: 1,
    },
  },
  {
    id: 'hiking',
    name: 'Hiking',
    met: 5.3, // Base MET value, will be adjusted by grade
    speedUnit: 'grade (%)',
    speedRange: {
      min: 0,
      max: 15,
      step: 1,
    },
  },
  {
    id: 'weightTraining',
    name: 'Weight Training',
    met: 3.5, // Base MET value, will be adjusted by intensity
    speedUnit: 'intensity',
    speedRange: {
      min: 1,
      max: 10,
      step: 1,
    },
  },
  {
    id: 'yoga',
    name: 'Yoga',
    met: 2.5, // Base MET value, will be adjusted by intensity
    speedUnit: 'intensity',
    speedRange: {
      min: 1,
      max: 5,
      step: 1,
    },
  },
];

// Duration range in minutes
export const DURATION_RANGE = {
  min: 5,
  max: 120,
  step: 5,
};

// Frequency range in times per week
export const FREQUENCY_RANGE = {
  min: 1,
  max: 7,
  step: 1,
};

// Burn goal range in pounds
export const BURN_GOAL_RANGE = {
  min: 1,
  max: 50,
  step: 1,
};

// Mifflin-St Jeor formula constants
export const MIFFLIN_ST_JEOR = {
  MALE: {
    CONSTANT: 5,
    WEIGHT_MULTIPLIER: 10,
    HEIGHT_MULTIPLIER: 6.25,
    AGE_MULTIPLIER: 5,
  },
  FEMALE: {
    CONSTANT: -161,
    WEIGHT_MULTIPLIER: 10,
    HEIGHT_MULTIPLIER: 6.25,
    AGE_MULTIPLIER: 5,
  },
};

// Calories per pound of fat
export const CALORIES_PER_POUND_FAT = 3500;

// Speed adjustment factors for MET values
export const SPEED_ADJUSTMENT_FACTORS = {
  walking: 0.3, // MET increases by 0.3 per mph
  running: 0.8, // MET increases by 0.8 per mph
  cycling: 0.2, // MET increases by 0.2 per mph
  swimming: 1.5, // MET increases by 1.5 per mph
  elliptical: 0.5, // MET increases by 0.5 per level
  stairMaster: 0.6, // MET increases by 0.6 per level
  rowing: 0.7, // MET increases by 0.7 per intensity
  hiking: 0.3, // MET increases by 0.3 per grade %
  weightTraining: 0.4, // MET increases by 0.4 per intensity
  yoga: 0.5, // MET increases by 0.5 per intensity
};
