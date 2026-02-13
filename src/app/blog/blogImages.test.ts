/**
 * @vitest-environment node
 */
import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';

const BLOG_DIR = path.join(process.cwd(), 'src', 'app', 'blog');
const PUBLIC_DIR = path.join(process.cwd(), 'public');
const BLOG_IMAGE_PATTERN = /\/images\/blog\/[a-z0-9-]+\.(?:jpg|jpeg|png|webp)/gi;

function listContentFiles(dir: string): string[] {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files: string[] = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...listContentFiles(fullPath));
      continue;
    }
    if (entry.isFile() && entry.name === 'content.tsx') {
      files.push(fullPath);
    }
  }

  return files;
}

describe('Blog header images', () => {
  it('ensures every referenced /images/blog asset exists in public/images/blog', () => {
    const contentFiles = listContentFiles(BLOG_DIR);
    const referencedImages = new Set<string>();

    for (const filePath of contentFiles) {
      const source = fs.readFileSync(filePath, 'utf8');
      const matches = source.match(BLOG_IMAGE_PATTERN) ?? [];
      for (const imagePath of matches) {
        referencedImages.add(imagePath);
      }
    }

    const missingImages = Array.from(referencedImages).filter(imagePath => {
      const diskPath = path.join(PUBLIC_DIR, imagePath.replace(/^\//, ''));
      return !fs.existsSync(diskPath);
    });

    expect(missingImages).toEqual([]);
  });
});
