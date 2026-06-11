import { test, expect } from '@playwright/test';
import { BLOG_REGISTRY } from '../src/lib/blog/registry';

/**
 * Smoke test for every information page: all blog posts from the registry
 * plus the static/content pages. Mirrors calculators-all.spec.ts — each page
 * must respond without a 4xx/5xx and render a visible h1.
 *
 * BLOG_REGISTRY is the single source of truth for posts, so a post added to
 * the registry without working content fails here automatically.
 */

const STATIC_PAGES = [
  '/about',
  '/contact',
  '/privacy',
  '/terms',
  '/disclaimer',
  '/embed-terms',
  '/calculator-widgets',
  '/calculators',
  '/blog',
  '/chains',
  '/search',
] as const;

test.describe('Blog posts', () => {
  for (const post of BLOG_REGISTRY) {
    test(`/blog/${post.slug} renders`, async ({ page }) => {
      const response = await page.goto(`/blog/${post.slug}`);

      expect(response, `no response for /blog/${post.slug}`).not.toBeNull();
      expect(response!.status(), `status for /blog/${post.slug}`).toBeLessThan(400);
      await expect(page.locator('h1').first()).toBeVisible();
    });
  }
});

test.describe('Static pages', () => {
  for (const path of STATIC_PAGES) {
    test(`${path} renders`, async ({ page }) => {
      const response = await page.goto(path);

      expect(response, `no response for ${path}`).not.toBeNull();
      expect(response!.status(), `status for ${path}`).toBeLessThan(400);
      await expect(page.locator('h1').first()).toBeVisible();
    });
  }
});
