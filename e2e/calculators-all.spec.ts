import { test, expect } from '@playwright/test';
import { CALCULATOR_CATALOG } from '../src/constants/calculatorCatalog';

/**
 * Smoke-level E2E coverage for every calculator in the catalog.
 * Verifies each route loads without a crash, has a visible h1, and is not a
 * 404/500 page. Interaction-level tests live in the individual spec files.
 */

for (const { slug } of CALCULATOR_CATALOG) {
  test(`/${slug} loads without error`, async ({ page }) => {
    test.setTimeout(180_000);
    await page.goto(`/${slug}`, { waitUntil: 'domcontentloaded', timeout: 120_000 });

    // Must not be a 404 or 500 page
    await expect(page).not.toHaveTitle(/404|not found|500|error/i);

    // Must have a visible primary heading
    await expect(page.locator('h1').first()).toBeVisible({ timeout: 30_000 });
  });
}
