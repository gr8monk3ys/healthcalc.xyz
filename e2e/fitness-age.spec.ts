import { expect, test, type Page } from '@playwright/test';

function getInputForLabelText(page: Page, text: string) {
  return page.locator(`label:has-text("${text}") input`);
}

function getSelectForLabelText(page: Page, text: string) {
  return page.locator(`label:has-text("${text}") select`);
}

function encodeFitnessAgeShareToken(): string {
  const payload = {
    v: 1,
    c: 'fitness-age',
    i: {
      age: 34,
      gender: 'female',
      vo2Max: 42.3,
      restingHeartRate: 57,
      bmi: 22.8,
      bodyFatPercentage: 24.1,
      weeklyTrainingDays: 4,
      balanceScore: 4,
      flexibilityScore: 3,
    },
  } as const;

  const base64 = Buffer.from(JSON.stringify(payload), 'utf8').toString('base64');
  return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
}

async function waitForFitnessAgeResultUrl(page: Page): Promise<void> {
  const fitnessAgePathPattern = /^\/(?:[a-z]{2}\/)?fitness-age$/i;
  await page.waitForURL(
    url => fitnessAgePathPattern.test(url.pathname) && url.searchParams.has('r'),
    { timeout: 60_000, waitUntil: 'domcontentloaded' }
  );
}

test.describe('Fitness Age Calculator Shared Prefill', () => {
  test('shared result URL pre-fills form fields and auto-renders a result', async ({ page }) => {
    test.slow();
    const token = encodeFitnessAgeShareToken();

    // The share route immediately client-redirects, which can surface net::ERR_ABORTED.
    await page.goto(`/share/fitness-age?r=${encodeURIComponent(token)}`).catch(() => {});
    await waitForFitnessAgeResultUrl(page);
    await expect(page.getByRole('heading', { name: /what's your fitness age\?/i })).toBeVisible({
      timeout: 30_000,
    });

    await expect(getInputForLabelText(page, 'Age')).toHaveValue('34', { timeout: 20_000 });
    await expect(page.getByRole('radio', { name: 'Female', exact: true })).toBeChecked();
    await expect(getInputForLabelText(page, 'VO2 Max (ml/kg/min)')).toHaveValue('42.3');
    await expect(getInputForLabelText(page, 'Resting Heart Rate (bpm)')).toHaveValue('57');
    await expect(getInputForLabelText(page, 'BMI')).toHaveValue('22.8');
    await expect(getInputForLabelText(page, 'Body Fat (%)')).toHaveValue('24.1');
    await expect(getInputForLabelText(page, 'Training Days per Week')).toHaveValue('4');
    await expect(getSelectForLabelText(page, 'Balance Self-Rating (1-5)')).toHaveValue('4');
    await expect(getSelectForLabelText(page, 'Flexibility Self-Rating (1-5)')).toHaveValue('3');

    await expect(page.getByText('Estimated Fitness Age', { exact: true })).toBeVisible();
    await expect(page.getByText(/outside supported ranges/i)).not.toBeVisible();
  });

  test('invalid shared token does not prefill or auto-calculate', async ({ page }) => {
    await page.goto('/fitness-age?r=invalid-token');
    await expect(page.getByRole('heading', { name: /what's your fitness age\?/i })).toBeVisible();

    await expect(getInputForLabelText(page, 'Age')).toHaveValue('');
    await expect(
      page.getByText(
        /Complete the quiz to get your estimated fitness age and a breakdown of what most influences it\./i
      )
    ).toBeVisible();
    await expect(page.getByText('Estimated Fitness Age', { exact: true })).not.toBeVisible();
  });
});
