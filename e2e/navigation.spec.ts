import { test, expect, type Page } from '@playwright/test';

async function gotoPath(page: Page, path: string): Promise<void> {
  await page.goto(path, { waitUntil: 'domcontentloaded', timeout: 90_000 });
}

test.describe('Navigation', () => {
  test('home page loads with main heading', async ({ page }) => {
    test.slow();
    await gotoPath(page, '/');
    await expect(
      page.getByRole('heading', {
        name: /free health calculators/i,
      })
    ).toBeVisible();
  });

  test('/calculators page loads with calculator categories', async ({ page }) => {
    test.slow();
    await gotoPath(page, '/calculators');
    await expect(page.getByRole('heading', { name: /Calculator Categories/i })).toBeVisible();
    await expect(page.getByText('View calculators →').first()).toBeVisible();
  });

  test('/blog page loads with article sections', async ({ page }) => {
    test.slow();
    await gotoPath(page, '/blog');
    await expect(page.getByText('Guides & Research').first()).toBeVisible();
  });

  test('/bmi page loads with the calculator form', async ({ page }) => {
    test.slow();
    await gotoPath(page, '/bmi');
    await expect(page.getByRole('heading', { name: /BMI Calculator/i })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Calculate', exact: true })).toBeVisible();
  });
});
