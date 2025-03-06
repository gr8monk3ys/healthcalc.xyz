import { Gender, UnitSystem } from './common';

export interface BodyFatBurnFormData {
  gender: Gender;
  age: number;
  weight: number;
  height: number;
  unitSystem: UnitSystem;
  activity: string;
  speed: number;
  duration: number;
  frequency: number;
  burnGoal: number;
}

export interface BodyFatBurnResult {
  restingEnergyExpenditure: number;
  activityEnergyExpenditure: number;
  totalEnergyExpenditure: number;
  timeToReachGoal: {
    weeks: number;
    days: number;
  };
  distancePerSession: number;
}

export interface ActivityOption {
  id: string;
  name: string;
  met: number;
  speedUnit: string;
  speedRange: {
    min: number;
    max: number;
    step: number;
  };
}
