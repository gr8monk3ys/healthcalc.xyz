import { test, expect } from '@playwright/test';

/**
 * Smoke-level E2E coverage for every calculator.
 * Verifies each route loads without a crash, has a visible h1, and is not a
 * 404/500 page. Interaction-level tests live in the individual spec files.
 */

const CALCULATOR_SLUGS = [
  // Body Composition
  'bmi',
  'body-fat',
  'body-frame-size',
  'army-body-fat',
  'absi',
  'whr',
  'waist-to-height-ratio',
  'ideal-weight',
  'adjusted-body-weight',
  'body-surface-area',
  'lean-body-mass',
  'ffmi',
  'body-recomposition',
  'body-shape-calculator',
  // Energy Expenditure & Metabolism
  'tdee',
  'calorie',
  'bmr',
  // Weight Management
  'calorie-deficit',
  'weight-management',
  'maximum-fat-loss',
  'body-fat-burn',
  // Nutrition & Macros
  'macro',
  'carb-intake',
  'fat-intake',
  'protein',
  'intermittent-fasting',
  'keto-calculator',
  'glp1-calculator',
  // Performance & Training
  'one-rep-max',
  'heart-rate-zones',
  'target-heart-rate',
  'max-heart-rate',
  'vo2-max',
  'running-pace',
  'calories-burned',
  'calories-burned-walking',
  'calories-burned-running',
  'calories-burned-cycling',
  'calories-burned-swimming',
  'steps-to-calories',
  'acft-calculator',
  // Wellness & Recovery
  'water-intake',
  'sleep',
  'caffeine-calculator',
  'life-expectancy-calculator',
  'substance-impact-calculator',
  // Pregnancy & Fertility
  'pregnancy-due-date',
  'due-date-by-conception',
  'pregnancy-weight-gain',
  'ovulation',
  // Health & Vitals
  'blood-pressure',
  'resting-heart-rate',
  'diabetes-risk-calculator',
  // Utilities
  'conversions',
  'age',
  'steps-to-miles',
];

for (const slug of CALCULATOR_SLUGS) {
  test(`/${slug} loads without error`, async ({ page }) => {
    test.setTimeout(180_000);
    await page.goto(`/${slug}`, { waitUntil: 'domcontentloaded', timeout: 120_000 });

    // Must not be a 404 or 500 page
    await expect(page).not.toHaveTitle(/404|not found|500|error/i);

    // Must have a visible primary heading
    await expect(page.locator('h1').first()).toBeVisible({ timeout: 30_000 });
  });
}
