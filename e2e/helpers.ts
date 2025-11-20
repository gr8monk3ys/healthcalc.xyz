import { expect, type Page } from '@playwright/test';

/**
 * Wait until React has hydrated the calculator form on the current page.
 *
 * Calculator pages are client components; clicks dispatched before hydration
 * are silently lost (the submit handler isn't attached yet), which makes
 * interaction tests flaky under dev-server load. Every calculator form
 * rendered through CalculatorForm carries `data-calculator-form="1"`.
 */
export async function waitForReactHydration(page: Page): Promise<void> {
  await page.waitForFunction(() => {
    const form = document.querySelector('[data-calculator-form="1"]');
    if (!form) return false;

    return Object.keys(form).some(key => key.startsWith('__reactProps$'));
  });
}

/**
 * Navigate to a calculator page and wait until its form is interactive.
 * Generous timeouts keep runs stable when the dev server compiles on demand.
 */
export async function gotoCalculator(page: Page, path: string): Promise<void> {
  await page.goto(path, { waitUntil: 'domcontentloaded', timeout: 60_000 });
  await expect(page.getByRole('heading', { name: /Enter Your Details/i })).toBeVisible({
    timeout: 45_000,
  });
  await waitForReactHydration(page);
}
