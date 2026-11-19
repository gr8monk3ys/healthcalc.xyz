/**
 * @vitest-environment node
 */
import fs from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { metadata } from './layout';

describe('/keto-calculator metadata', () => {
  it('sets an og:image and twitter image that exist in public/', () => {
    const ogImages = [metadata.openGraph?.images ?? []].flat();
    const twitterImages = [metadata.twitter?.images ?? []].flat();
    const urls = [...ogImages, ...twitterImages].map(image =>
      typeof image === 'object' && 'url' in image ? String(image.url) : String(image)
    );

    expect(ogImages).toHaveLength(1);
    expect(twitterImages).toHaveLength(1);
    for (const url of urls) {
      expect(fs.existsSync(path.join(process.cwd(), 'public', url)), url).toBe(true);
    }
  });
});
