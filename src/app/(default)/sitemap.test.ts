import { describe, expect, it } from 'vitest';
import type { Metadata } from 'next';

import { BLOG_REGISTRY } from '@/lib/blog/registry';
import sitemap from './sitemap';
import * as bmiResult from './bmi/results/[resultSlug]/page';
import * as bodyFatResult from './body-fat/results/[resultSlug]/page';
import * as calorieDeficitResult from './calorie-deficit/results/[resultSlug]/page';
import * as macroResult from './macro/results/[resultSlug]/page';
import * as tdeeResult from './tdee/results/[resultSlug]/page';
import { metadata as dashboardMetadata } from './dashboard/layout';
import { metadata as reportMetadata } from './report/layout';
import { metadata as savedResultsMetadata } from './saved-results/layout';

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

const BASE_URL = 'https://www.healthcalc.xyz';

describe('sitemap', () => {
  it('lists no programmatic /*/results/* pages', () => {
    const resultUrls = sitemap()
      .map(entry => new URL(entry.url).pathname)
      .filter(path => path.includes('/results/'));
    expect(resultUrls).toEqual([]);
  });

  it('lists every registered blog post exactly once', () => {
    const blogUrls = sitemap()
      .map(entry => entry.url)
      .filter(url => url.startsWith(`${BASE_URL}/blog/`));

    expect(blogUrls.sort()).toEqual(
      BLOG_REGISTRY.map(post => `${BASE_URL}/blog/${post.slug}`).sort()
    );
  });

  it("uses each post's registry date as lastModified", () => {
    const byUrl = new Map(sitemap().map(entry => [entry.url, entry]));

    for (const post of BLOG_REGISTRY) {
      const lastModified = byUrl.get(`${BASE_URL}/blog/${post.slug}`)?.lastModified;

      expect(lastModified, post.slug).toBeInstanceOf(Date);
      expect(
        (lastModified as Date).toLocaleDateString('en-US', {
          timeZone: 'UTC',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }),
        post.slug
      ).toBe(post.date);
    }
  });

  it('only sets lastModified where a real modification date exists', () => {
    const undated = sitemap().filter(
      entry => !entry.url.startsWith(`${BASE_URL}/blog/`) && entry.lastModified !== undefined
    );
    expect(undated.map(entry => entry.url)).toEqual([]);
  });

  it('lists no pages that only show per-visitor saved data', () => {
    const paths = sitemap().map(entry => new URL(entry.url).pathname);
    for (const path of PER_VISITOR_PAGES) {
      expect(paths).not.toContain(path);
    }
  });
});

const PER_VISITOR_PAGES = ['/dashboard', '/report', '/saved-results'];

describe('per-visitor pages', () => {
  it.each([
    ['/dashboard', dashboardMetadata],
    ['/report', reportMetadata],
    ['/saved-results', savedResultsMetadata],
  ])('%s is noindex but followable', (_, metadata) => {
    expect(metadata.robots).toEqual({ index: false, follow: true });
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
