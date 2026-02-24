import { test, expect, type Page } from '@playwright/test';

async function waitForReactHydration(page: Page): Promise<void> {
  await page.waitForFunction(() => {
    const form = document.querySelector('[data-calculator-form="1"]');
    if (!form) return false;

    return Object.keys(form).some(key => key.startsWith('__reactProps$'));
  });
}

test.describe('TDEE Calculator', () => {
  test.beforeEach(async ({ page }, testInfo) => {
    testInfo.setTimeout(90_000);
    await page.goto('/tdee', { waitUntil: 'domcontentloaded', timeout: 60_000 });
    await expect(page.getByRole('heading', { name: /Enter Your Details/i })).toBeVisible({
      timeout: 45_000,
    });
    await waitForReactHydration(page);
  });

  test('page renders the form with all expected fields', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /Enter Your Details/i })).toBeVisible();
    await expect(page.getByLabel('Age', { exact: true })).toBeVisible();
    await expect(page.getByLabel('Height', { exact: true })).toBeVisible();
    await expect(page.getByLabel('Weight', { exact: true })).toBeVisible();
    await expect(page.getByRole('radio', { name: 'Male', exact: true })).toBeVisible();
    await expect(page.getByRole('radio', { name: 'Female', exact: true })).toBeVisible();
    await expect(page.getByLabel('Activity Level')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Calculate', exact: true })).toBeVisible();
  });

  test('activity level select contains expected options', async ({ page }) => {
    const select = page.getByLabel('Activity Level');
    await expect(select.getByRole('option', { name: 'Sedentary' })).toBeAttached();
    await expect(select.getByRole('option', { name: 'Lightly Active' })).toBeAttached();
    await expect(select.getByRole('option', { name: 'Moderately Active' })).toBeAttached();
    await expect(select.getByRole('option', { name: 'Very Active' })).toBeAttached();
    await expect(select.getByRole('option', { name: 'Extremely Active' })).toBeAttached();
  });

  test('calculates TDEE and shows BMR and calorie targets for a sedentary male', async ({
    page,
  }) => {
    await page.getByLabel('Age', { exact: true }).fill('30');
    await page.getByRole('radio', { name: 'Male', exact: true }).check();
    await page.getByLabel('Height', { exact: true }).fill('175');
    await page.getByLabel('Weight', { exact: true }).fill('70');
    await page.getByLabel('Activity Level').selectOption('sedentary');

    await page.getByRole('button', { name: 'Calculate', exact: true }).click();

    await expect(page.getByRole('heading', { name: /Your TDEE Results/i })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Basal Metabolic Rate (BMR)' })).toBeVisible();
    await expect(
      page.getByRole('heading', { name: 'Total Daily Energy Expenditure', exact: true })
    ).toBeVisible();
    await expect(page.getByText('Daily Calorie Targets').first()).toBeVisible();
    await expect(page.getByText(/calories\/day/).first()).toBeVisible();
  });

  test('calculates TDEE for a moderately active female', async ({ page }) => {
    await page.getByLabel('Age', { exact: true }).fill('28');
    await page.getByRole('radio', { name: 'Female', exact: true }).check();
    await page.getByLabel('Height', { exact: true }).fill('163');
    await page.getByLabel('Weight', { exact: true }).fill('60');
    await page.getByLabel('Activity Level').selectOption('moderately_active');

    await page.getByRole('button', { name: 'Calculate', exact: true }).click();

    await expect(page.getByRole('heading', { name: /Your TDEE Results/i })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Basal Metabolic Rate (BMR)' })).toBeVisible();
  });

  test('shows validation errors when submitted empty', async ({ page }) => {
    await page.getByRole('button', { name: 'Calculate', exact: true }).click();
    await expect(page.getByText(/Age is required/i)).toBeVisible();
    await expect(page.getByText(/Height is required/i)).toBeVisible();
    await expect(page.getByText(/Weight is required/i)).toBeVisible();
  });

  test('Reset button clears the form and hides the result', async ({ page }) => {
    await page.getByLabel('Age', { exact: true }).fill('30');
    await page.getByLabel('Height', { exact: true }).fill('175');
    await page.getByLabel('Weight', { exact: true }).fill('70');
    await page.getByRole('button', { name: 'Calculate', exact: true }).click();

    await expect(page.getByRole('heading', { name: /Your TDEE Results/i })).toBeVisible();

    await page.getByRole('button', { name: /Reset/i }).first().click();

    await expect(page.getByRole('heading', { name: /Your TDEE Results/i })).not.toBeVisible();
    await expect(page.getByLabel('Age', { exact: true })).toHaveValue('');
  });
});
