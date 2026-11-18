/**
 * @vitest-environment node
 */
import fs from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { CALCULATOR_CATALOG } from '@/constants/calculatorCatalog';
import { generateMetadata } from './page';

const APP_DIR = path.join(process.cwd(), 'src/app/(default)');

describe('/calculator/[slug] metadata', () => {
  it.each(CALCULATOR_CATALOG.map(calculator => calculator.slug))(
    'canonicalises %s to its real calculator route',
    async slug => {
      const metadata = await generateMetadata({ params: Promise.resolve({ slug }) });

      expect(metadata.alternates?.canonical).toBe(`/${slug}`);
      expect(fs.existsSync(path.join(APP_DIR, slug, 'page.tsx'))).toBe(true);
    }
  );
});
