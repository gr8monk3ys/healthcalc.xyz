import { test, expect, type Page } from '@playwright/test';

async function gotoPath(page: Page, path: string): Promise<void> {
  await page.goto(path, { waitUntil: 'domcontentloaded', timeout: 90_000 });
}

test.describe('Calculator Chains', () => {
  test('chains page renders all 4 chains', async ({ page }) => {
    test.slow();
    await gotoPath(page, '/chains');
    await expect(
      page.getByRole('heading', { name: 'Guided Health Workflows', exact: true })
    ).toBeVisible();
    await expect(page.getByText('Weight Loss Journey', { exact: true })).toBeVisible();
    await expect(page.getByText('Body Composition Deep Dive', { exact: true })).toBeVisible();
    await expect(page.getByText('Fitness Baseline', { exact: true })).toBeVisible();
    await expect(page.getByText('Nutrition Planning', { exact: true })).toBeVisible();
  });

  test('starting a chain navigates to first calculator', async ({ page }) => {
    test.slow();
    await gotoPath(page, '/chains');
    await page.getByRole('link', { name: /Weight Loss Journey/i }).click();
    await page.waitForURL('**/bmi', { timeout: 90_000, waitUntil: 'domcontentloaded' });
    // Chain progress bar should show the chain name
    await expect(page.getByText('Weight Loss Journey')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Exit guided workflow' })).toBeVisible();
  });

  test('chain auto-start via query param', async ({ page }) => {
    test.slow();
    await gotoPath(page, '/chains?start=fitness-baseline');
    await page.waitForURL('**/max-heart-rate', { timeout: 90_000, waitUntil: 'domcontentloaded' });
  });

  test('homepage shows guided workflows section', async ({ page }) => {
    test.slow();
    await gotoPath(page, '/');
    await expect(
      page.getByRole('heading', { name: 'Guided Health Workflows', exact: true })
    ).toBeVisible();
  });

  test('calculator page shows chain suggestions when not in chain', async ({ page }) => {
    test.slow();
    await gotoPath(page, '/bmi');
    // BMI participates in 2 chains: Weight Loss Journey and Body Composition Deep Dive
    // The "Guided Workflows" heading appears in the chain suggestions section
    await expect(page.getByText('Guided Workflows').first()).toBeVisible();
  });

  test('exiting a chain removes progress bar', async ({ page }) => {
    test.slow();
    await gotoPath(page, '/chains?start=fitness-baseline');
    await page.waitForURL('**/max-heart-rate', { timeout: 90_000, waitUntil: 'domcontentloaded' });
    await expect(page.getByRole('button', { name: 'Exit guided workflow' })).toBeVisible();
    await page.getByRole('button', { name: 'Exit guided workflow' }).click();
    await expect(page.getByRole('button', { name: 'Exit guided workflow' })).not.toBeVisible({
      timeout: 15_000,
    });
  });
});
