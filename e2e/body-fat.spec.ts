import { test, expect } from '@playwright/test';
import { gotoCalculator } from './helpers';

test.describe('Body Fat Calculator', () => {
  test.beforeEach(async ({ page }, testInfo) => {
    testInfo.setTimeout(90_000);
    await gotoCalculator(page, '/body-fat');
  });

  test('page renders the calculator form', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /Enter Your Details/i })).toBeVisible();
    await expect(page.getByLabel('Age', { exact: true })).toBeVisible();
    await expect(page.getByLabel('Height', { exact: true })).toBeVisible();
    await expect(page.getByLabel('Weight', { exact: true })).toBeVisible();
    await expect(page.getByRole('radio', { name: 'Male', exact: true })).toBeVisible();
    await expect(page.getByRole('radio', { name: 'Female', exact: true })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Calculate', exact: true })).toBeVisible();
  });

  test('calculates body fat using Navy method for a male', async ({ page }) => {
    await page.getByRole('radio', { name: 'Male', exact: true }).check();
    await page.getByLabel('Age', { exact: true }).fill('30');
    await page.getByLabel('Height', { exact: true }).fill('175');
    await page.getByLabel('Weight', { exact: true }).fill('80');
    await page.getByLabel('Waist Circumference (cm)').fill('85');
    await page.getByLabel('Neck Circumference (cm)').fill('38');

    await page.getByRole('button', { name: 'Calculate', exact: true }).click();

    await expect(page.getByRole('heading', { name: /Your Body Fat Results/i })).toBeVisible();
    await expect(page.getByText(/%/).first()).toBeVisible();
  });

  test('shows hip measurement field for female with Navy method', async ({ page }) => {
    await page.getByRole('radio', { name: 'Female', exact: true }).check();
    await expect(page.getByLabel('Hip Circumference (cm)')).toBeVisible();
  });

  test('calculates body fat for a female using Navy method', async ({ page }) => {
    await page.getByRole('radio', { name: 'Female', exact: true }).check();
    await page.getByLabel('Age', { exact: true }).fill('28');
    await page.getByLabel('Height', { exact: true }).fill('163');
    await page.getByLabel('Weight', { exact: true }).fill('60');
    await page.getByLabel('Waist Circumference (cm)').fill('72');
    await page.getByLabel('Neck Circumference (cm)').fill('33');
    await page.getByLabel('Hip Circumference (cm)').fill('96');

    await page.getByRole('button', { name: 'Calculate', exact: true }).click();

    await expect(page.getByRole('heading', { name: /Your Body Fat Results/i })).toBeVisible();
    await expect(page.getByText('Body Fat Percentage').first()).toBeVisible();
  });

  test('shows validation errors when form is submitted empty', async ({ page }) => {
    await page.getByRole('button', { name: 'Calculate', exact: true }).click();
    await expect(page.getByText(/Age is required/i)).toBeVisible();
    await expect(page.getByText(/Height is required/i)).toBeVisible();
    await expect(page.getByText(/Weight is required/i)).toBeVisible();
  });

  test('switching to BMI method hides Navy-specific fields', async ({ page }) => {
    await expect(page.getByLabel('Waist Circumference (cm)')).toBeVisible();
    await page.getByLabel('Calculation Method').selectOption('bmi');
    await expect(page.getByLabel('Waist Circumference (cm)')).not.toBeVisible();
    await expect(page.getByLabel('Neck Circumference (cm)')).not.toBeVisible();
  });
});
