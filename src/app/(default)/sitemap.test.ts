import { describe, expect, it } from 'vitest';
import type { Metadata } from 'next';

import sitemap from './sitemap';
import * as bmiResult from './bmi/results/[resultSlug]/page';
import * as bodyFatResult from './body-fat/results/[resultSlug]/page';
import * as calorieDeficitResult from './calorie-deficit/results/[resultSlug]/page';
import * as macroResult from './macro/results/[resultSlug]/page';
import * as tdeeResult from './tdee/results/[resultSlug]/page';

interface ResultRouteModule {
  generateStaticParams: () => { resultSlug: string }[];
  generateMetadata: (props: { params: Promise<{ resultSlug: string }> }) => Promise<Metadata>;
}

const RESULT_ROUTES: Record<string, ResultRouteModule> = {
  bmi: bmiResult,
  'body-fat': bodyFatResult,
  'calorie-deficit': calorieDeficitResult,
  macro: macroResult,
  tdee: tdeeResult,
};

describe('sitemap', () => {
  it('lists no programmatic /*/results/* pages', () => {
    const resultUrls = sitemap()
      .map(entry => new URL(entry.url).pathname)
      .filter(path => path.includes('/results/'));
    expect(resultUrls).toEqual([]);
  });
});

describe.each(Object.entries(RESULT_ROUTES))('/%s/results/[resultSlug] metadata', (_, route) => {
  it('is noindex but followable for every generated slug', async () => {
    const slugs = route.generateStaticParams();
    expect(slugs.length).toBeGreaterThan(0);

    for (const params of slugs) {
      const metadata = await route.generateMetadata({ params: Promise.resolve(params) });
      expect(metadata.robots, params.resultSlug).toEqual({ index: false, follow: true });
    }
  });
});
