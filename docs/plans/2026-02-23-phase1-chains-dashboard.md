# Phase 1: Calculator Chains & Health Dashboard — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Complete the calculator chains feature by adding discoverability entry points and E2E test coverage so users can find, start, and complete guided workflows.

**Architecture:** All chain/dashboard components and state management are already built. This plan adds three discovery surfaces (homepage section, calculator-page suggestions, dedicated /chains page), updates the E2E test suite, and verifies the full flow.

**Tech Stack:** Next.js 16, React 19, TypeScript, Vitest, Playwright

---

## What Already Works

Before starting, understand these existing pieces — **do not rebuild them**:

- `src/constants/calculatorChains.ts` — 4 chains, `getChainById()`, `getChainsForCalculator()`, `getChainCalculatorSlugs()`
- `src/hooks/useChainState.ts` — sessionStorage-backed chain state (`startChain`, `advanceStep`, `exitChain`, `getPrefillData`)
- `src/hooks/useChainPrefill.ts` — convenience wrapper per calculator page
- `src/components/chains/ChainSelector.tsx` — renders chain cards with "Start →" buttons
- `src/components/chains/ChainProgressBar.tsx` — renders step pills with ✓/current/upcoming states
- `src/components/chains/ChainContinueButton.tsx` — "Continue to next step" CTA after results
- `src/components/calculators/CalculatorPageLayout.tsx:274-295` — already renders `ChainProgressBar` and `ChainContinueButton` when `isCurrentChainStep && showResultsCapture`
- All 12 chain calculator `page.client.tsx` files — already have `useChainPrefill` and `chainResultData`
- `src/app/(default)/saved-results/page.client.tsx` — already renders `HealthDashboard` with Dashboard/All Results tabs
- `src/components/dashboard/` — `HealthDashboard`, `MetricCard`, `TrendChart`, `QuickActions` (all complete)
- Tests: 22 passing in `calculatorChains.test.ts`, `calculatorMetrics.test.ts`, `useChainState.test.ts`

---

### Task 1: Add "Guided Workflows" section to homepage

**Files:**

- Modify: `src/app/(default)/page.tsx`

**Step 1: Write the failing test**

No unit test needed — this is a server component rendering static content. We'll verify with the E2E test in Task 4.

**Step 2: Add the GuidedWorkflows section to the homepage**

Insert a new section below the existing calculator cards grid but above the "Why Choose HealthCheck" section. This is a server component, so import the chain data directly (no hooks):

```tsx
import { CALCULATOR_CHAINS } from '@/constants/calculatorChains';
```

Add a section with the following structure:

```tsx
{
  /* Guided Workflows */
}
<section className="my-16">
  <div className="text-center mb-8">
    <h2 className="text-2xl font-bold mb-2">Guided Health Workflows</h2>
    <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
      Follow step-by-step workflows that connect multiple calculators. Enter your details once and
      get a complete health picture.
    </p>
  </div>
  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
    {CALCULATOR_CHAINS.map(chain => (
      <Link
        key={chain.id}
        href={`/chains?start=${chain.id}`}
        className="glass-panel rounded-xl p-5 transition-all hover:-translate-y-0.5 hover:shadow-lg block"
      >
        <h3 className="font-semibold text-lg">{chain.name}</h3>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{chain.description}</p>
        <div className="mt-3 flex items-center gap-2">
          <span className="rounded-full bg-[var(--accent)] px-2 py-0.5 text-xs font-medium text-white">
            {chain.steps.length} steps
          </span>
          <span className="text-xs text-[var(--accent)] font-medium">Get started &rarr;</span>
        </div>
      </Link>
    ))}
  </div>
</section>;
```

**Step 3: Run the dev server and visually verify**

Run: `bun run dev`
Check: `http://localhost:3000` — the "Guided Health Workflows" section appears with 4 chain cards.

**Step 4: Commit**

```bash
git add src/app/(default)/page.tsx
git commit -m "feat: add guided workflows section to homepage"
```

---

### Task 2: Create dedicated /chains page

**Files:**

- Create: `src/app/(default)/chains/page.tsx`
- Create: `src/app/(default)/chains/layout.tsx`
- Create: `src/app/(default)/chains/page.client.tsx`

**Step 1: Create the layout with SEO metadata**

`src/app/(default)/chains/layout.tsx`:

```tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Guided Health Workflows | HealthCheck',
  description:
    'Follow step-by-step health assessment workflows. Connect multiple calculators to get a complete picture of your body composition, nutrition needs, and fitness level.',
  openGraph: {
    title: 'Guided Health Workflows | HealthCheck',
    description:
      'Follow step-by-step health assessment workflows. Connect multiple calculators to get a complete picture.',
  },
};

export default function ChainsLayout({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement {
  return <>{children}</>;
}
```

**Step 2: Create the server page**

`src/app/(default)/chains/page.tsx`:

```tsx
import ChainsPageClient from './page.client';

export default function ChainsPage(): React.ReactElement {
  return <ChainsPageClient />;
}
```

**Step 3: Create the client page**

`src/app/(default)/chains/page.client.tsx`:

```tsx
'use client';

import React, { useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Breadcrumb from '@/components/Breadcrumb';
import ChainSelector from '@/components/chains/ChainSelector';
import { CALCULATOR_CHAINS, getChainById } from '@/constants/calculatorChains';
import { useChainState } from '@/hooks/useChainState';

export default function ChainsPageClient(): React.JSX.Element {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { startChain } = useChainState();

  // Auto-start a chain if ?start=chain-id is present
  useEffect(() => {
    const chainId = searchParams.get('start');
    if (!chainId) return;

    const chain = getChainById(chainId);
    if (!chain) return;

    const firstSlug = startChain(chainId);
    if (firstSlug) {
      router.replace(`/${firstSlug}`);
    }
  }, [searchParams, startChain, router]);

  return (
    <div className="mx-auto max-w-4xl">
      <Breadcrumb />
      <h1 className="mb-2 text-3xl font-bold">Guided Health Workflows</h1>
      <p className="mb-8 text-gray-600 dark:text-gray-400">
        Follow a step-by-step workflow to get a complete health assessment. Enter your details once
        and they carry forward to each calculator automatically.
      </p>

      <ChainSelector chains={CALCULATOR_CHAINS} />

      <div className="mt-12 glass-panel rounded-xl p-6">
        <h2 className="text-lg font-semibold mb-2">How it works</h2>
        <ol className="list-decimal list-inside space-y-2 text-sm text-gray-600 dark:text-gray-400">
          <li>Choose a workflow that matches your goal</li>
          <li>Complete each calculator in sequence — your inputs carry forward automatically</li>
          <li>View your results on the Health Dashboard when you finish</li>
        </ol>
      </div>
    </div>
  );
}
```

**Step 4: Run the dev server and verify**

Run: `bun run dev`
Check: `http://localhost:3000/chains` — shows 4 chain cards + "How it works" section.
Check: `http://localhost:3000/chains?start=weight-loss-journey` — auto-redirects to `/bmi`.

**Step 5: Commit**

```bash
git add src/app/(default)/chains/
git commit -m "feat: add /chains page for guided workflow discovery"
```

---

### Task 3: Add chain suggestions to calculator pages (when NOT in a chain)

**Files:**

- Modify: `src/components/calculators/CalculatorPageLayout.tsx`

**Step 1: Understand the current behavior**

Currently, `CalculatorPageLayout` shows chain components only when `isCurrentChainStep` is true (user is already in a chain). When the user visits a calculator directly (no active chain), they see no indication that chains exist. We need to show a subtle "Try a guided workflow" prompt.

**Step 2: Add a ChainSuggestion section**

In `src/components/calculators/CalculatorPageLayout.tsx`, import `getChainsForCalculator`:

```tsx
import { getChainById, getChainsForCalculator } from '@/constants/calculatorChains';
```

Inside `CalculatorPageLayoutContent`, after the existing `isCurrentChainStep` logic, compute available chains:

```tsx
const availableChains = !isInChain ? getChainsForCalculator(calculatorSlug) : [];
```

Then, after the `RelatedCalculators` component (around line 319), render:

```tsx
{
  availableChains.length > 0 && (
    <div className="my-8">
      <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide opacity-60">
        Guided Workflows
      </h3>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {availableChains.map(chain => (
          <Link
            key={chain.id}
            href={`/chains?start=${chain.id}`}
            className="glass-panel rounded-xl p-4 transition-all hover:-translate-y-0.5 hover:shadow-lg block"
          >
            <p className="font-medium text-sm">{chain.name}</p>
            <p className="mt-1 text-xs opacity-60">{chain.description}</p>
            <p className="mt-2 text-xs text-[var(--accent)] font-medium">
              {chain.steps.length} steps &middot; Start workflow &rarr;
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
```

Also add `import Link from 'next/link'` if not already imported (it is already imported).

**Step 3: Verify**

Run: `bun run dev`
Check: `http://localhost:3000/bmi` — should show "Guided Workflows" section with 2 chains (Weight Loss Journey and Body Composition Deep Dive).
Check: `http://localhost:3000/tdee` — should show 2 chains (Weight Loss Journey and Nutrition Planning).
Check: Start a chain from BMI — chain progress bar should appear, and the "Guided Workflows" section should NOT appear (because `isInChain` is true).

**Step 4: Commit**

```bash
git add src/components/calculators/CalculatorPageLayout.tsx
git commit -m "feat: show chain suggestions on calculator pages when not in a chain"
```

---

### Task 4: Add E2E test for chain flow

**Files:**

- Create: `e2e/chains.spec.ts`

**Step 1: Write the E2E test**

```typescript
import { test, expect } from '@playwright/test';

test.describe('Calculator Chains', () => {
  test('chains page renders all 4 chains', async ({ page }) => {
    await page.goto('/chains');
    await expect(page.getByRole('heading', { name: 'Guided Health Workflows' })).toBeVisible();
    // 4 chain cards should be visible
    await expect(page.getByText('Weight Loss Journey')).toBeVisible();
    await expect(page.getByText('Body Composition Deep Dive')).toBeVisible();
    await expect(page.getByText('Fitness Baseline')).toBeVisible();
    await expect(page.getByText('Nutrition Planning')).toBeVisible();
  });

  test('starting a chain navigates to first calculator', async ({ page }) => {
    await page.goto('/chains');
    // Click the Weight Loss Journey chain
    await page.getByText('Weight Loss Journey').click();
    // Should navigate to /bmi (first step)
    await expect(page).toHaveURL('/bmi');
    // Chain progress bar should be visible
    await expect(page.getByText('Weight Loss Journey')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Exit guided workflow' })).toBeVisible();
  });

  test('chain auto-start via query param', async ({ page }) => {
    await page.goto('/chains?start=fitness-baseline');
    // Should redirect to /max-heart-rate (first step of Fitness Baseline)
    await expect(page).toHaveURL('/max-heart-rate');
  });

  test('homepage shows guided workflows section', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { name: 'Guided Health Workflows' })).toBeVisible();
  });

  test('calculator page shows chain suggestions when not in chain', async ({ page }) => {
    await page.goto('/bmi');
    // Should see "Guided Workflows" section with chains that include BMI
    await expect(page.getByText('Weight Loss Journey')).toBeVisible();
    await expect(page.getByText('Body Composition Deep Dive')).toBeVisible();
  });

  test('exiting a chain removes progress bar', async ({ page }) => {
    // Start the chain
    await page.goto('/chains?start=fitness-baseline');
    await expect(page).toHaveURL('/max-heart-rate');
    // Exit the chain
    await page.getByRole('button', { name: 'Exit guided workflow' }).click();
    // Progress bar should be gone
    await expect(page.getByRole('button', { name: 'Exit guided workflow' })).not.toBeVisible();
  });
});
```

**Step 2: Run the E2E test**

Run: `bun run build && bun run test:e2e -- e2e/chains.spec.ts`
Expected: All tests pass.

**Step 3: Commit**

```bash
git add e2e/chains.spec.ts
git commit -m "test: add E2E tests for calculator chain flow"
```

---

### Task 5: Add /chains to sitemap and navigation

**Files:**

- Modify: `src/app/(default)/sitemap.ts`

**Step 1: Verify current sitemap**

Read `src/app/(default)/sitemap.ts` and find where static pages are listed. Add `/chains` to the static page entries with `changeFrequency: 'weekly'` and `priority: 0.7`.

**Step 2: Add to sitemap**

Find the array of static page URLs and add:

```typescript
{
  url: `${baseUrl}/chains`,
  lastModified: now,
  changeFrequency: 'weekly' as const,
  priority: 0.7,
},
```

**Step 3: Run type-check and build**

Run: `bun run type-check`
Run: `bun run build`
Expected: Both pass without errors.

**Step 4: Commit**

```bash
git add src/app/(default)/sitemap.ts
git commit -m "feat: add /chains to XML sitemap"
```

---

### Task 6: Run full test suite and verify

**Step 1: Run unit tests**

Run: `bun run test -- --run`
Expected: All tests pass (including the existing 22 chain/metrics tests).

**Step 2: Run type-check**

Run: `bun run type-check`
Expected: No errors.

**Step 3: Run lint**

Run: `bun run lint`
Expected: No errors.

**Step 4: Build**

Run: `bun run build`
Expected: Build succeeds. The `/chains` page should appear in the build output.

**Step 5: Run E2E tests**

Run: `bun run test:e2e`
Expected: All E2E tests pass, including the new chain tests.

**Step 6: Final commit (if any fixes needed)**

If any fixes were needed during verification, commit them:

```bash
git add -A
git commit -m "fix: address issues found during chain feature verification"
```

---

## Summary

| Task | What                                  | Files                      | Type   |
| ---- | ------------------------------------- | -------------------------- | ------ |
| 1    | Homepage chain entry points           | `page.tsx`                 | Modify |
| 2    | Dedicated `/chains` page              | 3 new files                | Create |
| 3    | Chain suggestions on calculator pages | `CalculatorPageLayout.tsx` | Modify |
| 4    | E2E test coverage                     | `chains.spec.ts`           | Create |
| 5    | Sitemap entry for /chains             | `sitemap.ts`               | Modify |
| 6    | Full verification pass                | —                          | Verify |
