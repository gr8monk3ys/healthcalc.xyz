import { BodyFatBurnFormData, BodyFatBurnResult } from '@/types/bodyFatBurn';
import {
  ACTIVITIES,
  MIFFLIN_ST_JEOR,
  CALORIES_PER_POUND_FAT,
  SPEED_ADJUSTMENT_FACTORS,
} from '@/constants/bodyFatBurn';
import { convertHeight, convertWeight } from '@/utils/calculators';

export function calculateBodyFatBurn(data: BodyFatBurnFormData): BodyFatBurnResult {
  // Convert measurements to metric if needed
  const weightInKg =
    data.unitSystem === 'imperial' ? convertWeight(data.weight, 'imperial', 'metric') : data.weight;

  const heightInCm =
    data.unitSystem === 'imperial' ? convertHeight(data.height, 'imperial', 'metric') : data.height;

  // Calculate Resting Energy Expenditure (REE) using Mifflin-St Jeor formula
  const constants = data.gender === 'male' ? MIFFLIN_ST_JEOR.MALE : MIFFLIN_ST_JEOR.FEMALE;

  const ree =
    constants.WEIGHT_MULTIPLIER * weightInKg +
    constants.HEIGHT_MULTIPLIER * heightInCm -
    constants.AGE_MULTIPLIER * data.age +
    constants.CONSTANT;

  // Find the selected activity
  const selectedActivity = ACTIVITIES.find(activity => activity.id === data.activity);

  if (!selectedActivity) {
    throw new Error('Invalid activity selected');
  }

  // Calculate adjusted MET value based on speed/intensity
  const speedFactor =
    SPEED_ADJUSTMENT_FACTORS[selectedActivity.id as keyof typeof SPEED_ADJUSTMENT_FACTORS] || 0;
  const baseSpeed = selectedActivity.speedRange.min;
  const speedDifference = data.speed - baseSpeed;
  const adjustedMET = selectedActivity.met + speedDifference * speedFactor;

  // Calculate energy expenditure from activity (calories)
  // Formula: MET * weight in kg * duration in hours
  const durationInHours = data.duration / 60;
  const activityEnergyExpenditure = adjustedMET * weightInKg * durationInHours;

  // Calculate total energy expenditure per session
  const totalEnergyExpenditure = activityEnergyExpenditure;

  // Calculate weekly calorie burn
  const weeklyCalorieBurn = totalEnergyExpenditure * data.frequency;

  // Calculate time to reach goal (in weeks and days)
  const goalCalories = data.burnGoal * CALORIES_PER_POUND_FAT;
  const weeksToGoal = goalCalories / weeklyCalorieBurn;
  const daysToGoal = Math.ceil(weeksToGoal * 7);

  // Calculate distance per session (if applicable)
  // For activities like walking, running, cycling, swimming
  let distancePerSession = 0;

  if (['walking', 'running', 'cycling', 'swimming'].includes(selectedActivity.id)) {
    // Speed in mph * duration in hours = distance in miles
    distancePerSession = data.speed * durationInHours;
  }

  return {
    restingEnergyExpenditure: Math.round(ree),
    activityEnergyExpenditure: Math.round(activityEnergyExpenditure),
    totalEnergyExpenditure: Math.round(totalEnergyExpenditure),
    timeToReachGoal: {
      weeks: Math.floor(weeksToGoal),
      days: daysToGoal,
    },
    distancePerSession: Number(distancePerSession.toFixed(2)),
  };
}
