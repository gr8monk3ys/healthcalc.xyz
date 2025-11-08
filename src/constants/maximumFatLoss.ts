/**
 * Maximum Fat Loss Constants
 */

// Maximum fat oxidation rates (kcal per lb of body fat per day)
// Based on Alpert S.S. (2005) "A limit on the energy transfer rate from the human fat store in hypophagia"
export const FAT_OXIDATION_RATE_PER_LB = 26.5; // kcal/lb/day (moderate estimate)

// Protein recommendations (grams per kg of lean body mass)
export const PROTEIN_RECOMMENDATIONS = {
  minimum: 1.6, // Minimum for muscle preservation during deficit
  optimal: 2.2, // Optimal for maximum muscle preservation
  maximum: 2.4, // Upper beneficial limit
};

// Safety minimums
export const MIN_BODY_FAT_PERCENTAGE = {
  male: 5,
  female: 12,
};

export const ABSOLUTE_MIN_CALORIES = {
  male: 1500,
  female: 1200,
};

// Water intake recommendations (liters)
export const WATER_INTAKE = {
  base: 2.5,
  perKgBodyWeight: 0.033, // 33ml per kg
};

// Sleep and training recommendations
export const RECOVERY_RECOMMENDATIONS = {
  sleepHoursMinimum: 7,
  sleepHoursOptimal: 8,
  strengthTrainingDaysPerWeek: 3,
};

// Projection parameters
export const PROJECTION_WEEKS = 12; // Default projection timeline
export const CALORIES_PER_KG_FAT = 7700; // kcal per kg of fat
export const CALORIES_PER_LB_FAT = 3500; // kcal per lb of fat
