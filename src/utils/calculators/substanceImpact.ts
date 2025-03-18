/**
 * Alcohol & Smoking Impact Calculator
 *
 * Scientific References:
 * - CDC Alcohol & Tobacco Use data (2023)
 * - USDA Dietary Guidelines for Americans (2020-2025)
 * - Jha et al. (2013): 21st-Century Hazards of Smoking - NEJM
 * - GBD 2019 Alcohol/Tobacco Collaborators - Lancet
 * - WHO Global Status Report on Alcohol and Health (2018)
 *
 * Methodology: Calculates caloric, financial, and lifespan impact of
 * alcohol and tobacco consumption using epidemiological data.
 */

import { SubstanceImpactFormValues, SubstanceImpactResult } from '@/types/substanceImpact';
import {
  ALCOHOL_CALORIES,
  ALCOHOL_LIFESPAN_IMPACT,
  CIGARETTES_PER_PACK,
  SMOKING_LIFESPAN_IMPACT,
  MAX_SMOKING_LIFESPAN_REDUCTION,
  SMOKING_RECOVERY_TIMELINE,
  ALCOHOL_RECOVERY_TIMELINE,
} from '@/constants/substanceImpact';

/**
 * Calculate alcohol and smoking health/financial impact
 */
export function calculateSubstanceImpact(values: SubstanceImpactFormValues): SubstanceImpactResult {
  if (values.age <= 0 || values.age > 120) throw new Error('Age must be between 1 and 120');

  const result: SubstanceImpactResult = {
    totalLifespanImpact: 0,
    totalFinancialCostPerYear: 0,
    totalLifetimeCost: 0,
    healthRecoveryTimeline: [],
    recommendations: [],
  };

  const remainingYears = Math.max(0, 80 - values.age);

  // --- Alcohol calculations ---
  if ((values.mode === 'alcohol' || values.mode === 'both') && values.alcohol) {
    const { type, drinksPerWeek, yearsOfDrinking, avgDrinkCost } = values.alcohol;

    if (drinksPerWeek < 0) throw new Error('Drinks per week must be non-negative');
    if (yearsOfDrinking < 0) throw new Error('Years of drinking must be non-negative');

    const caloriesPerDrink = ALCOHOL_CALORIES[type];
    const weeklyCalories = drinksPerWeek * caloriesPerDrink;
    const yearlyCalories = weeklyCalories * 52;

    result.alcoholCaloriesPerWeek = Math.round(weeklyCalories);
    result.alcoholCaloriesPerYear = Math.round(yearlyCalories);
    result.alcoholEquivalentFatLbs = Math.round((yearlyCalories / 3500) * 10) / 10;

    // Lifespan impact based on drinking level
    let lifespanImpact = 0;
    if (drinksPerWeek > ALCOHOL_LIFESPAN_IMPACT.threshold.moderate) {
      lifespanImpact = ALCOHOL_LIFESPAN_IMPACT.heavy * yearsOfDrinking;
    } else if (drinksPerWeek > ALCOHOL_LIFESPAN_IMPACT.threshold.light) {
      lifespanImpact = ALCOHOL_LIFESPAN_IMPACT.moderate * yearsOfDrinking;
    }
    // Cap at -10 years
    lifespanImpact = Math.max(-10, lifespanImpact);
    result.alcoholLifespanImpactYears = Math.round(lifespanImpact * 10) / 10;

    // Financial cost
    const yearlyDrinkCost = drinksPerWeek * avgDrinkCost * 52;
    result.alcoholFinancialCostPerYear = Math.round(yearlyDrinkCost);
    result.alcoholLifetimeCost = Math.round(yearlyDrinkCost * remainingYears);

    result.totalLifespanImpact += lifespanImpact;
    result.totalFinancialCostPerYear += result.alcoholFinancialCostPerYear;

    // Recovery timeline
    if (drinksPerWeek > ALCOHOL_LIFESPAN_IMPACT.threshold.light) {
      result.healthRecoveryTimeline.push(...ALCOHOL_RECOVERY_TIMELINE);
    }

    // Recommendations
    if (drinksPerWeek > ALCOHOL_LIFESPAN_IMPACT.threshold.moderate) {
      result.recommendations.push(
        'Reducing alcohol to moderate levels (7-14 drinks/week) could significantly improve health outcomes.'
      );
      result.recommendations.push(
        'Heavy drinking is linked to liver disease, cardiovascular problems, and increased cancer risk.'
      );
    } else if (drinksPerWeek > ALCOHOL_LIFESPAN_IMPACT.threshold.light) {
      result.recommendations.push(
        'Consider reducing to light drinking (under 7 drinks per week) for optimal health.'
      );
    }
  }

  // --- Smoking calculations ---
  if ((values.mode === 'smoking' || values.mode === 'both') && values.smoking) {
    const { type, perDay, yearsOfSmoking, costPerPack } = values.smoking;

    if (perDay < 0) throw new Error('Cigarettes per day must be non-negative');
    if (yearsOfSmoking < 0) throw new Error('Years of smoking must be non-negative');

    // Lifespan impact
    const yearlyImpact = SMOKING_LIFESPAN_IMPACT[type] * (perDay >= 10 ? 1 : perDay / 10);
    let lifespanImpact = yearlyImpact * yearsOfSmoking;
    lifespanImpact = Math.max(-MAX_SMOKING_LIFESPAN_REDUCTION, lifespanImpact);
    result.smokingLifespanImpactYears = Math.round(lifespanImpact * 10) / 10;

    // Cigarettes smoked
    if (type === 'cigarettes') {
      result.cigarettesSmoked = Math.round(perDay * 365 * yearsOfSmoking);
    }

    // Financial cost
    const packsPerDay = type === 'cigarettes' ? perDay / CIGARETTES_PER_PACK : 0;
    const dailyCost =
      type === 'cigarettes'
        ? packsPerDay * costPerPack
        : type === 'vaping'
          ? costPerPack / 7 // costPerPack = weekly pod/liquid cost
          : (perDay * costPerPack) / CIGARETTES_PER_PACK; // cigars
    const yearlyCost = dailyCost * 365;
    result.smokingFinancialCostPerYear = Math.round(yearlyCost);
    result.smokingLifetimeCost = Math.round(yearlyCost * remainingYears);

    result.totalLifespanImpact += lifespanImpact;
    result.totalFinancialCostPerYear += result.smokingFinancialCostPerYear;

    // Recovery timeline
    if (perDay > 0) {
      result.healthRecoveryTimeline.push(...SMOKING_RECOVERY_TIMELINE);
    }

    // Recommendations
    if (type === 'cigarettes' && perDay > 0) {
      result.recommendations.push(
        'Quitting smoking is the single most impactful change for your health and longevity.'
      );
      if (perDay >= 20) {
        result.recommendations.push(
          'At a pack or more per day, life expectancy reduction can exceed 10 years.'
        );
      }
    } else if (type === 'vaping' && perDay > 0) {
      result.recommendations.push(
        'While less harmful than cigarettes, vaping still carries health risks. Consider a cessation plan.'
      );
    }
  }

  // Round totals
  result.totalLifespanImpact = Math.round(result.totalLifespanImpact * 10) / 10;
  result.totalLifetimeCost = result.totalFinancialCostPerYear * remainingYears;

  if (result.recommendations.length === 0) {
    result.recommendations.push(
      'Your current substance use appears to be within low-risk levels. Maintain healthy habits!'
    );
  }

  return result;
}
