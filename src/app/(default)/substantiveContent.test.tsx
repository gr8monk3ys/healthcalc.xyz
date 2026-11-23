import type { ReactElement } from 'react';
import { render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { CALCULATOR_HUBS } from '@/constants/calculatorCatalog';
import CalculatorHubPage from './calculators/[hub]/page';
import LearnIndex from './learn/page';
import BodyCompositionGuide from './learn/body-composition-guide/page';
import CalorieBasicsGuide from './learn/calorie-basics/page';
import HeartRateTrainingGuide from './learn/heart-rate-training/page';
import MacroPlanningGuide from './learn/macro-planning/page';
import PregnancyHealthGuide from './learn/pregnancy-health/page';
import WalkingRunningEnergyGuide from './learn/walking-running-energy/page';

vi.mock('@/components/Breadcrumb', () => ({ default: () => null }));

// Indexed pages below these counts read as thin content to AdSense reviewers.
const MIN_GUIDE_WORDS = 800;
const MIN_HUB_WORDS = 450;

function wordCount(element: ReactElement): number {
  const { container } = render(element);
  return (container.textContent ?? '').split(/\s+/).filter(Boolean).length;
}

describe('learn guides carry substantive content', () => {
  it.each([
    ['/learn/body-composition-guide', BodyCompositionGuide],
    ['/learn/calorie-basics', CalorieBasicsGuide],
    ['/learn/heart-rate-training', HeartRateTrainingGuide],
    ['/learn/macro-planning', MacroPlanningGuide],
    ['/learn/pregnancy-health', PregnancyHealthGuide],
    ['/learn/walking-running-energy', WalkingRunningEnergyGuide],
  ])('%s', (_, Page) => {
    expect(wordCount(<Page />)).toBeGreaterThanOrEqual(MIN_GUIDE_WORDS);
  });
});

describe('index pages carry substantive content', () => {
  it('/learn', () => {
    expect(wordCount(<LearnIndex />)).toBeGreaterThanOrEqual(MIN_HUB_WORDS);
  });

  it.each(CALCULATOR_HUBS.map(hub => hub.slug))('/calculators/%s', async slug => {
    const page = await CalculatorHubPage({ params: Promise.resolve({ hub: slug }) });
    expect(wordCount(page)).toBeGreaterThanOrEqual(MIN_HUB_WORDS);
  });
});
