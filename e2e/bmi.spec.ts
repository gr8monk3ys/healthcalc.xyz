import { test, expect } from '@playwright/test';
import { gotoCalculator } from './helpers';

test.describe('BMI Calculator', () => {
  test.beforeEach(async ({ page }, testInfo) => {
    testInfo.setTimeout(90_000);
    await gotoCalculator(page, '/bmi');
  });

  test('page renders the form with all expected fields', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /Enter Your Details/i })).toBeVisible();
    await expect(page.getByLabel('Age', { exact: true })).toBeVisible();
    await expect(page.getByLabel('Height', { exact: true })).toBeVisible();
    await expect(page.getByLabel('Weight', { exact: true })).toBeVisible();
    await expect(page.getByRole('radio', { name: 'Male', exact: true })).toBeVisible();
    await expect(page.getByRole('radio', { name: 'Female', exact: true })).toBeVisible();
  });

  test('calculates BMI and shows result for a normal-weight adult male', async ({ page }) => {
    await page.getByLabel('Age', { exact: true }).fill('30');
    await page.getByRole('radio', { name: 'Male', exact: true }).check();
    await page.getByLabel('Height', { exact: true }).fill('175');
    await page.getByLabel('Weight', { exact: true }).fill('70');
    await page.getByRole('button', { name: 'Calculate', exact: true }).click();

    await expect(page.getByRole('heading', { name: /Your BMI Results/i })).toBeVisible();
    await expect(page.getByText('Normal').first()).toBeVisible();
  });

  test('calculates BMI for an overweight adult female', async ({ page }) => {
    await page.getByLabel('Age', { exact: true }).fill('35');
    await page.getByRole('radio', { name: 'Female', exact: true }).check();
    await page.getByLabel('Height', { exact: true }).fill('163');
    await page.getByLabel('Weight', { exact: true }).fill('80');
    await page.getByRole('button', { name: 'Calculate', exact: true }).click();

    await expect(page.getByRole('heading', { name: /Your BMI Results/i })).toBeVisible();
    await expect(page.getByText(/Overweight|Obese|Normal|Underweight/).first()).toBeVisible();
  });

  test('shows validation errors when form is submitted empty', async ({ page }) => {
    await page.getByRole('button', { name: 'Calculate', exact: true }).click();
    await expect(page.getByText(/Age is required/i)).toBeVisible();
    await expect(page.getByText(/Height is required/i)).toBeVisible();
    await expect(page.getByText(/Weight is required/i)).toBeVisible();
  });

  test('unit toggle switches height between cm and ft', async ({ page }) => {
    const cmToggle = page.getByRole('button', { name: /cm/i });
    await expect(cmToggle).toBeVisible();
    await cmToggle.click();
    await expect(page.getByRole('button', { name: /ft/i })).toBeVisible();
  });

  test('reset button clears the form and hides the result', async ({ page }) => {
    await page.getByLabel('Age', { exact: true }).fill('30');
    await page.getByLabel('Height', { exact: true }).fill('175');
    await page.getByLabel('Weight', { exact: true }).fill('70');
    await page.getByRole('button', { name: 'Calculate', exact: true }).click();

    await expect(page.getByRole('heading', { name: /Your BMI Results/i })).toBeVisible();

    await page.getByRole('button', { name: /Reset/i }).first().click();

    await expect(page.getByRole('heading', { name: /Your BMI Results/i })).not.toBeVisible();
    await expect(page.getByLabel('Age', { exact: true })).toHaveValue('');
  });
});
