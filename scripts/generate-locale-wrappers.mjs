import fs from 'node:fs';
import path from 'node:path';

const repoRoot = process.cwd();
const defaultRoot = path.join(repoRoot, 'src', 'app', '(default)');
const localizedRoot = path.join(repoRoot, 'src', 'app', '(localized)', '[locale]');

const EXCLUDED_DIRS = new Set([
  'api',
  'sign-in',
  'sign-up',
  '_not-found',
]);

const EXCLUDED_REL_FILES = new Set([
  // Root layout is locale-specific and is implemented manually.
  'layout.tsx',
  // These are root-level error boundaries for the default tree.
  'error.tsx',
  'global-error.tsx',
  'loading.tsx',
  'not-found.tsx',
  // Custom wrappers needed (locale + dynamic segment).
  path.join('calculator', '[slug]', 'page.tsx'),
  path.join('calculators', '[hub]', 'page.tsx'),
]);

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function toPosix(p) {
  return p.split(path.sep).join('/');
}

function shouldExcludeRelPath(relPath) {
  if (EXCLUDED_REL_FILES.has(relPath)) return true;
  const parts = relPath.split(path.sep);
  return parts.some(part => EXCLUDED_DIRS.has(part));
}

function writeWrapper(destPath, importTarget) {
  const content = `export { default } from '${importTarget}';\nexport * from '${importTarget}';\n`;
  ensureDir(path.dirname(destPath));
  fs.writeFileSync(destPath, content, 'utf8');
}

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (EXCLUDED_DIRS.has(entry.name)) continue;
      walk(full);
      continue;
    }

    if (!entry.isFile()) continue;
    if (entry.name !== 'page.tsx' && entry.name !== 'layout.tsx') continue;

    const rel = path.relative(defaultRoot, full);
    if (shouldExcludeRelPath(rel)) continue;

    const relNoExt = rel.replace(/\.tsx$/, '');
    // Note: "@/app/*" is mapped to the default route group via tsconfig paths.
    const importTarget = `@/app/${toPosix(relNoExt)}`;
    const dest = path.join(localizedRoot, rel);
    writeWrapper(dest, importTarget);
  }
}

ensureDir(localizedRoot);
walk(defaultRoot);

console.log('Generated locale wrappers under:', localizedRoot);
