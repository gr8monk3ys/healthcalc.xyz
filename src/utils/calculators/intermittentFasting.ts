/**
 * Intermittent Fasting Calculator
 *
 * Calculates personalized intermittent fasting schedules, eating windows,
 * meal timing, and nutrition targets based on individual metrics and goals.
 *
 * Scientific References:
 * - Mattson et al. (2017): "Impact of Intermittent Fasting on Health and Disease Processes"
 *   Ageing Research Reviews, 39, 46-58
 * - Patterson & Sears (2017): "Metabolic Effects of Intermittent Fasting"
 *   Annual Review of Nutrition, 37, 371-393
 * - Antoni et al. (2018): "Investigation into the acute effects of total and partial energy
 *   restriction on postprandial metabolism among overweight/obese participants"
 *   British Journal of Nutrition, 115(6), 951-959
 */

import { IFFormValues, IFResult, FastingProtocol } from '@/types/intermittentFasting';
import { calculateBMR, calculateTDEE, getActivityMultiplier } from './tdee';
import { convertWeight, heightFtInToCm } from '@/utils/conversions';
import {
  FASTING_PROTOCOLS,
  FASTING_GOALS,
  MIN_CALORIES,
  MAX_CALORIES,
  MACRO_SPLITS,
  FIBER_PER_1000_CAL,
  WATER_PER_KG,
  MEAL_TIMING_OFFSETS,
  WEIGHT_LOSS_PARAMS,
} from '@/constants/intermittentFasting';

/**
 * Parse time string (HH:MM) to minutes since midnight
 */
function timeToMinutes(time: string): number {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
}

/**
 * Convert minutes since midnight to time string (HH:MM)
 */
function minutesToTime(minutes: number): string {
  const normalizedMinutes = ((minutes % 1440) + 1440) % 1440; // Handle wrap-around
  const hours = Math.floor(normalizedMinutes / 60);
  const mins = Math.floor(normalizedMinutes % 60);
  return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
}

/**
 * Format time to 12-hour format with AM/PM
 */
function formatTime12Hour(time: string): string {
  const [hours, minutes] = time.split(':').map(Number);
  const period = hours >= 12 ? 'PM' : 'AM';
  const displayHours = hours === 0 ? 12 : hours > 12 ? hours - 12 : hours;
  return `${displayHours}:${minutes.toString().padStart(2, '0')} ${period}`;
}

/**
 * Calculate eating window based on protocol and wake time
 */
function calculateEatingWindow(
  protocol: FastingProtocol,
  wakeTime: string
): { start: string; end: string } {
  const protocolDetails = FASTING_PROTOCOLS.find(p => p.id === protocol);

  if (!protocolDetails) {
    throw new Error(`Unknown fasting protocol: ${protocol}`);
  }

  const wakeMinutes = timeToMinutes(wakeTime);

  // Special handling for 5:2 and alternate-day (no daily eating window)
  if (protocol === '5:2' || protocol === 'alternate-day') {
    return {
      start: '08:00',
      end: '20:00',
    };
  }

  // Calculate eating window start
  // Most people prefer to start eating 4-6 hours after waking
  const hoursAfterWaking = protocol === 'omad' || protocol === '20:4' ? 6 : 4;
  const windowStartMinutes = wakeMinutes + hoursAfterWaking * 60;

  // Calculate eating window end
  const windowEndMinutes = windowStartMinutes + protocolDetails.eatingHours * 60;

  return {
    start: minutesToTime(windowStartMinutes),
    end: minutesToTime(windowEndMinutes),
  };
}

/**
 * Calculate meal times within eating window
 */
function calculateMealTimes(windowStart: string, windowEnd: string, mealsCount: number): string[] {
  const startMinutes = timeToMinutes(windowStart);
  const endMinutes = timeToMinutes(windowEnd);

  // Handle wrap-around (e.g., 22:00 to 02:00)
  const windowDuration =
    endMinutes >= startMinutes ? endMinutes - startMinutes : 1440 - startMinutes + endMinutes;

  const offsets = MEAL_TIMING_OFFSETS[mealsCount as keyof typeof MEAL_TIMING_OFFSETS] || [0];

  return offsets.map(offset => {
    const mealMinutes = startMinutes + Math.floor(windowDuration * offset);
    return minutesToTime(mealMinutes);
  });
}

/**
 * Calculate macronutrient targets
 */
function calculateMacros(
  dailyCalories: number,
  weightKg: number,
  goal: string
): {
  protein: number;
  fat: number;
  carb: number;
} {
  const goalConfig = FASTING_GOALS[goal as keyof typeof FASTING_GOALS];
  const macroSplit = MACRO_SPLITS[goal as keyof typeof MACRO_SPLITS];

  if (!goalConfig || !macroSplit) {
    throw new Error(`Unknown fasting goal: ${goal}`);
  }

  // Calculate protein in grams (prioritize protein target)
  const proteinGrams = Math.round(weightKg * goalConfig.proteinMultiplier);
  const proteinCalories = proteinGrams * 4;

  // Calculate remaining calories for fat and carbs
  const remainingCalories = dailyCalories - proteinCalories;
  const fatCalories = remainingCalories * (macroSplit.fat / (macroSplit.fat + macroSplit.carb));
  const carbCalories = remainingCalories - fatCalories;

  return {
    protein: proteinGrams,
    fat: Math.round(fatCalories / 9),
    carb: Math.round(carbCalories / 4),
  };
}

/**
 * Generate weight loss projections for weight loss goals
 */
function generateWeightProjections(
  currentWeightKg: number,
  dailyCalories: number,
  tdee: number,
  weeksToProject: number = 12
): Array<{ week: number; projectedWeight: number; cumulativeWeightLoss: number }> {
  const projections = [];
  const dailyDeficit = tdee - dailyCalories;

  if (dailyDeficit <= 0) {
    return []; // No projections for maintenance or surplus
  }

  let weight = currentWeightKg;

  for (let week = 1; week <= weeksToProject; week++) {
    // Account for metabolic adaptation (metabolism slows slightly over time)
    const adaptationFactor = 1 - (1 - WEIGHT_LOSS_PARAMS.metabolicAdaptation) * (week / 52);
    const adjustedDeficit = dailyDeficit * adaptationFactor;

    // Calculate weekly weight loss
    const weeklyWeightLoss = (adjustedDeficit * 7) / WEIGHT_LOSS_PARAMS.caloriesPerKgFat;
    weight -= weeklyWeightLoss;

    projections.push({
      week,
      projectedWeight: Math.round(weight * 10) / 10,
      cumulativeWeightLoss: Math.round((currentWeightKg - weight) * 10) / 10,
    });
  }

  return projections;
}

/**
 * Process Intermittent Fasting calculation
 */
export function processIFCalculation(values: IFFormValues): IFResult {
  // Convert height to cm if needed
  const heightCm = values.useMetric
    ? values.heightCm
    : heightFtInToCm(values.heightFt, values.heightIn);

  // Convert weight to kg if needed
  const weightKg =
    values.weightUnit === 'kg' ? values.weight : convertWeight(values.weight, 'lb', 'kg');

  // Validate inputs
  if (heightCm <= 0 || heightCm > 300) {
    throw new Error('Invalid height value');
  }

  if (weightKg <= 0 || weightKg > 600) {
    throw new Error('Invalid weight value');
  }

  if (values.age <= 0 || values.age > 120) {
    throw new Error('Invalid age value');
  }

  // Calculate BMR and TDEE
  const bmr = calculateBMR(values.gender, values.age, weightKg, heightCm);
  const activityMultiplier = getActivityMultiplier(values.activityLevel);
  const tdee = calculateTDEE(bmr, activityMultiplier);

  // Get goal configuration
  const goalConfig = FASTING_GOALS[values.goal];
  if (!goalConfig) {
    throw new Error(`Unknown fasting goal: ${values.goal}`);
  }

  // Calculate target calories based on goal
  let dailyCalories = Math.round(tdee * (1 + goalConfig.calorieAdjustment));

  // Apply minimum calorie safety limits
  const minCalories = MIN_CALORIES[values.gender];
  if (dailyCalories < minCalories) {
    dailyCalories = minCalories;
  }

  // Apply maximum calorie sanity check
  if (dailyCalories > MAX_CALORIES) {
    dailyCalories = MAX_CALORIES;
  }

  const calorieAdjustment = dailyCalories - tdee;

  // Get protocol details
  const protocolDetails = FASTING_PROTOCOLS.find(p => p.id === values.protocol);
  if (!protocolDetails) {
    throw new Error(`Unknown fasting protocol: ${values.protocol}`);
  }

  // Calculate eating window
  const eatingWindow = calculateEatingWindow(values.protocol, values.wakeTime);

  // Calculate meal distribution
  const mealsInWindow = protocolDetails.mealsRecommended;
  const caloriesPerMeal = Math.round(dailyCalories / mealsInWindow);
  const mealTimes = calculateMealTimes(eatingWindow.start, eatingWindow.end, mealsInWindow);

  // Calculate macronutrient targets
  const macros = calculateMacros(dailyCalories, weightKg, values.goal);

  // Calculate fiber target
  const fiberTarget = Math.round((dailyCalories / 1000) * FIBER_PER_1000_CAL);

  // Calculate water target in liters
  const waterTarget = Math.round((weightKg * WATER_PER_KG) / 100) / 10;

  // Generate weight projections for weight loss goals
  const weeklyProjections =
    values.goal === 'weight-loss'
      ? generateWeightProjections(weightKg, dailyCalories, tdee, 12)
      : undefined;

  // Generate protocol-specific tips
  const tips = generateProtocolTips(values.protocol, values.goal);

  return {
    bmr: Math.round(bmr),
    tdee: Math.round(tdee),
    dailyCalories,
    calorieAdjustment,
    protocol: values.protocol,
    fastingHours: protocolDetails.fastingHours,
    eatingHours: protocolDetails.eatingHours,
    eatingWindowStart: eatingWindow.start,
    eatingWindowEnd: eatingWindow.end,
    mealsInWindow,
    caloriesPerMeal,
    mealTimes,
    proteinTarget: macros.protein,
    fatTarget: macros.fat,
    carbTarget: macros.carb,
    fiberTarget,
    waterTarget,
    protocolDescription: protocolDetails.description,
    benefits: protocolDetails.benefits,
    tips,
    weeklyProjections,
  };
}

/**
 * Generate protocol-specific tips
 */
function generateProtocolTips(protocol: FastingProtocol, goal: string): string[] {
  const baseTips = [
    'Stay well-hydrated during fasting periods with water, black coffee, or unsweetened tea',
    'Break your fast with nutrient-dense whole foods rather than processed options',
    'Listen to your body and adjust timing if needed for your lifestyle',
  ];

  const protocolTips: Record<FastingProtocol, string[]> = {
    '16:8': [
      'Skip breakfast and have your first meal around noon for the easiest transition',
      'Black coffee in the morning can help suppress appetite during the fasting window',
      'This protocol is sustainable long-term and fits most social schedules',
    ],
    '18:6': [
      'Gradually extend from 16:8 if you are new to intermittent fasting',
      'Use the longer fasting window to enhance fat oxidation and autophagy',
      'Plan your eating window around your most active part of the day',
    ],
    '20:4': [
      'Not recommended for beginners - work up to this from 16:8 or 18:6',
      'Ensure you eat enough calories in your 4-hour window to prevent excessive deficit',
      'This protocol requires careful meal planning to meet nutritional needs',
    ],
    omad: [
      'Make your one meal nutrient-dense and large enough to meet calorie needs',
      'Consider supplementation to ensure adequate micronutrient intake',
      'Not suitable for beginners or those with a history of disordered eating',
    ],
    '5:2': [
      'Schedule fasting days on less active days (not workout days)',
      'On fasting days, focus on protein and vegetables to stay satiated',
      'More flexible for social events and weekend activities',
    ],
    'alternate-day': [
      'Expect an adjustment period of 1-2 weeks as your body adapts',
      'Consider modified approach (500-600 calories on fasting days) if full fasting is too difficult',
      'Track your progress closely and adjust if experiencing negative side effects',
    ],
  };

  const goalTips: Record<string, string[]> = {
    'weight-loss': [
      'Track your calorie intake to ensure you are hitting your deficit target',
      'Combine with resistance training to preserve muscle mass during weight loss',
    ],
    maintenance: [
      'Intermittent fasting can help maintain weight effortlessly without calorie counting',
      'Use fasting windows to regulate appetite and prevent overeating',
    ],
    health: [
      'Focus on whole, unprocessed foods during eating windows for maximum health benefits',
      'Consider longer fasting windows (18+ hours) for enhanced autophagy',
    ],
    'muscle-gain': [
      'Time resistance training to occur before or during your eating window',
      'Prioritize protein intake at each meal to support muscle protein synthesis',
    ],
  };

  return [...baseTips, ...protocolTips[protocol], ...(goalTips[goal] || [])];
}

/**
 * Validate intermittent fasting inputs
 */
export function validateIFInputs(values: Partial<IFFormValues>): Record<string, string> {
  const errors: Record<string, string> = {};

  if (!values.age || values.age < 18 || values.age > 120) {
    errors.age = 'Age must be between 18 and 120 years for intermittent fasting';
  }

  if (!values.weight || values.weight <= 0) {
    errors.weight = 'Weight is required';
  }

  if (values.useMetric) {
    if (!values.heightCm || values.heightCm <= 0 || values.heightCm > 300) {
      errors.height = 'Height must be between 1 and 300 cm';
    }
  } else {
    if (!values.heightFt || values.heightFt < 1 || values.heightFt > 10) {
      errors.height = 'Height must be between 1 and 10 feet';
    }
  }

  if (!values.wakeTime || !/^\d{2}:\d{2}$/.test(values.wakeTime)) {
    errors.wakeTime = 'Wake time is required (format: HH:MM)';
  }

  return errors;
}

/**
 * Get formatted eating window with 12-hour times
 */
export function getFormattedEatingWindow(start: string, end: string): string {
  return `${formatTime12Hour(start)} - ${formatTime12Hour(end)}`;
}
