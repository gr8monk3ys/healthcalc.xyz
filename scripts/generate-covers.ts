/**
 * Renders the 1200x630 cover image for every blog post and calculator from
 * the registry and catalog, so covers cannot go missing or drift from titles.
 *
 *   bun run generate:covers            # all
 *   bun run generate:covers bmi tdee   # only slugs containing these strings
 *
 * Needs a Chromium binary: CHROMIUM_PATH, else Playwright's own.
 */
import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import { chromium } from 'playwright-core';
import { BLOG_REGISTRY } from '../src/lib/blog/registry';
import { CALCULATOR_CATALOG } from '../src/constants/calculatorCatalog';

interface Cover {
  file: string;
  label: string;
  title: string;
}

const covers: Cover[] = [
  ...BLOG_REGISTRY.map(post => ({ file: post.image, label: post.category, title: post.title })),
  ...CALCULATOR_CATALOG.map(item => ({
    file: item.image,
    label: 'Free calculator',
    title: item.title,
  })),
];

const escapeHtml = (text: string): string =>
  text.replace(/[&<>"]/g, ch => `&#${ch.charCodeAt(0)};`);

function titleSize(title: string): number {
  if (title.length > 70) return 60;
  if (title.length > 45) return 72;
  if (title.length > 24) return 88;
  return 112;
}

function html({ label, title }: Cover): string {
  return `<!doctype html><html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Archivo:wght@700;900&display=swap" rel="stylesheet">
<style>
*{box-sizing:border-box;margin:0}
body{width:1200px;height:630px;background:#0b0b0b;color:#fff;font-family:Archivo,sans-serif;padding:60px 72px;display:flex;flex-direction:column}
.brand{display:flex;align-items:center;gap:16px;font-weight:900;font-size:36px;letter-spacing:-.03em}
.label{align-self:flex-start;margin-top:auto;background:#ffd400;color:#0b0b0b;font-weight:900;font-size:24px;padding:4px 12px;text-transform:uppercase;letter-spacing:.02em}
h1{font-weight:900;font-size:${titleSize(title)}px;line-height:1;letter-spacing:-.035em;margin-top:22px;padding-bottom:26px;border-bottom:16px solid #fff;text-wrap:balance}
</style></head><body>
<div class="brand"><svg width="52" height="52" viewBox="0 0 32 32"><rect width="32" height="32" fill="#ffd400"/><rect x="6" y="9" width="20" height="7" fill="#0b0b0b"/><rect x="6" y="20" width="20" height="2.5" fill="#0b0b0b"/></svg>HealthCalc</div>
<div class="label">${escapeHtml(label)}</div>
<h1>${escapeHtml(title)}</h1>
</body></html>`;
}

const filters = process.argv.slice(2);
const selected = covers.filter(
  cover => filters.length === 0 || filters.some(filter => cover.file.includes(filter))
);

const proxyUrl = process.env.HTTPS_PROXY ? new URL(process.env.HTTPS_PROXY) : null;
const browser = await chromium.launch({
  executablePath: process.env.CHROMIUM_PATH,
  proxy: proxyUrl
    ? {
        server: `${proxyUrl.protocol}//${proxyUrl.host}`,
        username: decodeURIComponent(proxyUrl.username),
        password: decodeURIComponent(proxyUrl.password),
      }
    : undefined,
});
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });

for (const cover of selected) {
  const out = path.join('public', cover.file);
  await mkdir(path.dirname(out), { recursive: true });
  await page.setContent(html(cover), { waitUntil: 'load' });
  await page.evaluate(() => document.fonts.ready);
  if (!(await page.evaluate(() => document.fonts.check('900 40px Archivo')))) {
    throw new Error('Archivo did not load; refusing to render covers in a fallback font.');
  }
  await page.screenshot({ path: out, type: 'jpeg', quality: 84 });
}

await browser.close();
console.log(`Rendered ${selected.length} covers.`);
