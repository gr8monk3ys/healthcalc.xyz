import type { Metadata } from 'next';
import { describe, expect, it } from 'vitest';
import { CALCULATOR_HUBS } from '@/constants/calculatorCatalog';
import { metadata as aboutMetadata } from './about/page';
import { metadata as blogMetadata } from './blog/page';
import { generateMetadata as generateHubMetadata } from './calculators/[hub]/page';
import { metadata as ketoMetadata } from './keto-calculator/layout';
import { metadata as searchMetadata } from './search/page';

describe('canonical and robots metadata', () => {
  it.each<[string, Metadata]>([
    ['/about', aboutMetadata],
    ['/blog', blogMetadata],
    ['/keto-calculator', ketoMetadata],
  ])('%s declares a self canonical', (_route, metadata) => {
    expect(metadata.alternates?.canonical).toBe('./');
  });

  it.each(CALCULATOR_HUBS.map(hub => hub.slug))(
    '/calculators/%s declares a self canonical',
    async hub => {
      const metadata = await generateHubMetadata({ params: Promise.resolve({ hub }) });

      expect(metadata.alternates?.canonical).toBe('./');
    }
  );

  it('/search is noindex and not canonicalised', () => {
    expect(searchMetadata.robots).toMatchObject({ index: false, follow: true });
    expect(searchMetadata.alternates?.canonical).toBeUndefined();
  });
});
