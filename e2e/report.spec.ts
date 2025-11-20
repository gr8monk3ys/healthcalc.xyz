import { expect, test } from '@playwright/test';

const SAVED_RESULTS_STORAGE_KEY = 'healthcheck-saved-results-by-user';

test.describe('Printable Health Report', () => {
  test('shows empty state when there are no saved results', async ({ page }) => {
    await page.goto('/report');

    await expect(page.getByRole('heading', { name: /printable health report/i })).toBeVisible();
    await expect(page.getByText(/no saved data yet/i)).toBeVisible();
    await expect(page.getByRole('button', { name: /download pdf/i })).toBeDisabled();
  });

  test('renders estimated percentile column for saved metrics', async ({ page }) => {
    await page.addInitScript(
      ([storageKey]) => {
        const seeded = {
          guest: [
            {
              id: 'seed-bmi-1',
              calculatorType: 'bmi',
              calculatorName: 'BMI Calculator',
              date: new Date('2026-01-18T10:00:00.000Z').toISOString(),
              data: { bmi: 24.2, category: 'Normal', healthyWeightRange: { min: 60, max: 76 } },
            },
          ],
        };

        window.localStorage.setItem(storageKey, JSON.stringify(seeded));
      },
      [SAVED_RESULTS_STORAGE_KEY] as const
    );

    await page.goto('/report');

    await expect(page.getByRole('heading', { name: /printable health report/i })).toBeVisible();
    await expect(page.getByRole('columnheader', { name: /percentile \(est\.\)/i })).toBeVisible();
    const bmiRow = page.getByRole('row', { name: /\bbmi\b/i });
    await expect(bmiRow).toBeVisible();
    await expect(bmiRow.locator('td').nth(3)).toHaveText(/\d+(st|nd|rd|th)/i);
  });
});
