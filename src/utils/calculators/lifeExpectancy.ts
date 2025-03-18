/**
 * Life Expectancy / Longevity Calculator
 *
 * Scientific References:
 * - CDC National Vital Statistics Reports (2023): US life expectancy 76.4 (M), 81.2 (F)
 * - Li et al. (2018): Impact of Healthy Lifestyle Factors on Life Expectancy - Circulation
 * - Jha et al. (2013): 21st-Century Hazards of Smoking - NEJM
 * - GBD 2019 Risk Factors Collaborators - Lancet
 * - Holt-Lunstad et al. (2010): Social relationships and mortality risk - PLoS Medicine
 *
 * Methodology: Additive model based on baseline life expectancy with
 * lifestyle factor adjustments derived from epidemiological studies.
 */

import {
  LifeExpectancyFormValues,
  LifeExpectancyResult,
  SmokingStatus,
  AlcoholIntake,
  ExerciseFrequency,
  DietQuality,
  StressLevel,
  SocialConnection,
} from '@/types/lifeExpectancy';

const BASE_LIFE_EXPECTANCY = { male: 76.3, female: 81.2 };

const SMOKING_IMPACT: Record<SmokingStatus, number> = {
  never: 0,
  former: -2,
  'current-light': -7,
  'current-heavy': -13,
};

const ALCOHOL_IMPACT: Record<AlcoholIntake, number> = {
  none: 0,
  light: 1,
  moderate: 0,
  heavy: -5,
};

const EXERCISE_IMPACT: Record<ExerciseFrequency, number> = {
  sedentary: -3,
  light: 0,
  moderate: 3,
  active: 5,
  'very-active': 4,
};

const DIET_IMPACT: Record<DietQuality, number> = {
  poor: -4,
  average: 0,
  good: 2,
  excellent: 4,
};

const STRESS_IMPACT: Record<StressLevel, number> = {
  low: 1,
  moderate: 0,
  high: -2,
  'very-high': -4,
};

const SOCIAL_IMPACT: Record<SocialConnection, number> = {
  isolated: -3,
  some: 0,
  strong: 2,
};

const BMI_IMPACT: Array<{ min: number; max: number; years: number }> = [
  { min: 0, max: 18.4, years: -2 },
  { min: 18.5, max: 24.9, years: 0 },
  { min: 25, max: 29.9, years: -1 },
  { min: 30, max: 34.9, years: -3 },
  { min: 35, max: 39.9, years: -5 },
  { min: 40, max: 100, years: -8 },
];

const SLEEP_IMPACT = (hours: number): number => {
  if (hours < 6) return -2;
  if (hours <= 7) return -1;
  if (hours <= 9) return 0;
  return -1;
};

const CHRONIC_CONDITION_IMPACT: Record<string, number> = {
  diabetes: -6,
  'heart-disease': -8,
  cancer: -5,
  copd: -6,
  'kidney-disease': -5,
  hypertension: -3,
  depression: -2,
};

const FAMILY_HISTORY_BONUS = 3;

/**
 * Calculate life expectancy based on lifestyle factors
 */
export function calculateLifeExpectancy(values: LifeExpectancyFormValues): LifeExpectancyResult {
  if (values.age <= 0 || values.age > 120) throw new Error('Age must be between 1 and 120');
  if (values.bmi <= 0 || values.bmi > 100) throw new Error('BMI must be between 1 and 100');

  const baseline = BASE_LIFE_EXPECTANCY[values.gender];
  const positiveFactors: Array<{ factor: string; yearsAdded: number }> = [];
  const negativeFactors: Array<{ factor: string; yearsLost: number }> = [];

  // Smoking
  const smokingYears = SMOKING_IMPACT[values.smokingStatus];
  if (smokingYears < 0)
    negativeFactors.push({ factor: 'Smoking', yearsLost: Math.abs(smokingYears) });
  if (smokingYears === 0 && values.age > 25)
    positiveFactors.push({ factor: 'Non-smoker', yearsAdded: 0 });

  // Alcohol
  const alcoholYears = ALCOHOL_IMPACT[values.alcoholIntake];
  if (alcoholYears > 0)
    positiveFactors.push({ factor: 'Light alcohol consumption', yearsAdded: alcoholYears });
  if (alcoholYears < 0)
    negativeFactors.push({
      factor: 'Heavy alcohol consumption',
      yearsLost: Math.abs(alcoholYears),
    });

  // Exercise
  const exerciseYears = EXERCISE_IMPACT[values.exerciseFrequency];
  if (exerciseYears > 0)
    positiveFactors.push({ factor: 'Regular physical activity', yearsAdded: exerciseYears });
  if (exerciseYears < 0)
    negativeFactors.push({ factor: 'Sedentary lifestyle', yearsLost: Math.abs(exerciseYears) });

  // Diet
  const dietYears = DIET_IMPACT[values.dietQuality];
  if (dietYears > 0) positiveFactors.push({ factor: 'High-quality diet', yearsAdded: dietYears });
  if (dietYears < 0)
    negativeFactors.push({ factor: 'Poor diet quality', yearsLost: Math.abs(dietYears) });

  // BMI
  const bmiEntry = BMI_IMPACT.find(r => values.bmi >= r.min && values.bmi <= r.max);
  const bmiYears = bmiEntry?.years ?? 0;
  if (bmiYears < 0)
    negativeFactors.push({
      factor: `BMI of ${values.bmi.toFixed(1)}`,
      yearsLost: Math.abs(bmiYears),
    });
  if (bmiYears === 0) positiveFactors.push({ factor: 'Healthy BMI', yearsAdded: 0 });

  // Sleep
  const sleepYears = SLEEP_IMPACT(values.sleepHours);
  if (sleepYears < 0)
    negativeFactors.push({
      factor: `${values.sleepHours}h sleep per night`,
      yearsLost: Math.abs(sleepYears),
    });

  // Stress
  const stressYears = STRESS_IMPACT[values.stressLevel];
  if (stressYears > 0)
    positiveFactors.push({ factor: 'Low stress levels', yearsAdded: stressYears });
  if (stressYears < 0)
    negativeFactors.push({ factor: 'High stress levels', yearsLost: Math.abs(stressYears) });

  // Social connections
  const socialYears = SOCIAL_IMPACT[values.socialConnections];
  if (socialYears > 0)
    positiveFactors.push({ factor: 'Strong social connections', yearsAdded: socialYears });
  if (socialYears < 0)
    negativeFactors.push({ factor: 'Social isolation', yearsLost: Math.abs(socialYears) });

  // Family history
  let familyBonus = 0;
  if (values.familyHistoryLongevity) {
    familyBonus = FAMILY_HISTORY_BONUS;
    positiveFactors.push({ factor: 'Family history of longevity', yearsAdded: familyBonus });
  }

  // Chronic conditions
  let chronicYears = 0;
  for (const condition of values.chronicConditions) {
    const impact = CHRONIC_CONDITION_IMPACT[condition] ?? -2;
    chronicYears += impact;
    negativeFactors.push({ factor: condition.replace('-', ' '), yearsLost: Math.abs(impact) });
  }

  // Sum up
  const yearsAdded = positiveFactors.reduce((sum, f) => sum + f.yearsAdded, 0);
  const yearsLost = negativeFactors.reduce((sum, f) => sum + f.yearsLost, 0);
  const netEffect =
    smokingYears +
    alcoholYears +
    exerciseYears +
    dietYears +
    bmiYears +
    sleepYears +
    stressYears +
    socialYears +
    familyBonus +
    chronicYears;

  let estimatedLE = baseline + netEffect;
  // Clamp to reasonable bounds
  estimatedLE = Math.max(values.age + 1, Math.min(105, estimatedLE));

  const remainingYears = Math.max(0, estimatedLE - values.age);

  // Health age: how old your body acts
  const healthAge = Math.max(1, Math.round(values.age - netEffect));

  // Percentile rank (simplified: 0-100 based on how you compare)
  const expectedRemaining = baseline - values.age;
  const actualRemaining = estimatedLE - values.age;
  const percentileRank = Math.min(
    99,
    Math.max(1, Math.round(50 + (actualRemaining - expectedRemaining) * 5))
  );

  // Generate recommendations
  const topRecommendations: string[] = [];
  const sortedNegative = [...negativeFactors].sort((a, b) => b.yearsLost - a.yearsLost);
  for (const factor of sortedNegative.slice(0, 3)) {
    if (factor.factor.includes('Smoking'))
      topRecommendations.push(
        'Quitting smoking is the single most impactful change you can make for longevity.'
      );
    else if (factor.factor.includes('Sedentary'))
      topRecommendations.push(
        'Adding 150 minutes of moderate exercise per week could add 3-5 years.'
      );
    else if (factor.factor.includes('diet'))
      topRecommendations.push(
        'Improving diet quality with more fruits, vegetables, and whole grains could add 2-4 years.'
      );
    else if (factor.factor.includes('BMI'))
      topRecommendations.push(
        'Reaching a healthy BMI through diet and exercise could significantly improve your outlook.'
      );
    else if (factor.factor.includes('stress'))
      topRecommendations.push(
        'Stress management through meditation, exercise, or therapy can improve both quality and length of life.'
      );
    else if (factor.factor.includes('isolation'))
      topRecommendations.push(
        'Building social connections has been shown to be as impactful as quitting smoking for longevity.'
      );
    else if (factor.factor.includes('alcohol'))
      topRecommendations.push(
        'Reducing alcohol intake to moderate levels or below can add years to your life.'
      );
    else if (factor.factor.includes('sleep'))
      topRecommendations.push(
        'Aiming for 7-9 hours of quality sleep supports cardiovascular and cognitive health.'
      );
    else topRecommendations.push(`Addressing ${factor.factor} could improve your life expectancy.`);
  }

  if (topRecommendations.length === 0) {
    topRecommendations.push(
      'You are doing well across most lifestyle factors. Maintain your healthy habits!'
    );
  }

  return {
    estimatedLifeExpectancy: Math.round(estimatedLE * 10) / 10,
    baselineLifeExpectancy: baseline,
    yearsAdded,
    yearsLost,
    netEffect: Math.round(netEffect * 10) / 10,
    remainingYears: Math.round(remainingYears * 10) / 10,
    positiveFactors,
    negativeFactors,
    topRecommendations,
    healthAge,
    percentileRank,
  };
}
