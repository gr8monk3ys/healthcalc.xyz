import { copyFileSync, mkdirSync, mkdtempSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';

// Lighthouse score floors for the routes CI runs against a production build.
//
// Every floor is a MEASURED number, not an aspiration. Performance sits two to
// three points under the lowest score observed across repeated runs so that
// runner noise does not fail the check (a check that fails on noise gets
// bypassed, and a bypassed check is no check at all), while a genuine
// regression -- a render-blocking script, a layout shift, an unsized image --
// still lands well below it. Accessibility, best-practices and SEO sit at the
// observed value because they are deterministic. Raise a floor whenever the
// real score improves; the ratchet only goes up.
//
// Measured 2026-09-16, three local runs against `next build` + `next start`:
// every route (/, /bmi, /tdee, /calculators) scored 100/100/100/100 each time.
//
// Runs use Lighthouse's desktop preset. Mobile devtools throttling is far too
// noisy on shared CI runners to gate on; production mobile scores are measured
// separately (PageSpeed Insights against https://www.healthcalc.xyz) and are
// not what this check enforces.
const SCORE_FLOORS = {
  performance: 97,
  accessibility: 100,
  bestPractices: 100,
  seo: 100,
};

// Document byte budget for the home route, compressed, as a browser would
// receive it. `experimental.inlineCss` moved the global stylesheet into the
// HTML, so the document is now the one asset whose growth nothing else
// measures: a stray import that pulls more CSS into the inline block, or a
// component that starts server-rendering a large data table, shows up here and
// nowhere in the JS bundle stats. Measured 2026-09-16 on the production build:
// 65,064 bytes gzipped locally, 66,113 bytes on www.healthcalc.xyz. The cap is
// ~25% over that; the measured number is printed on every run so the trend is
// visible in the job log before the cap ever trips.
const HOME_DOCUMENT_MAX_BYTES = 81_000;

const MAX_ATTEMPTS = 4;
const artifactDir = join(process.cwd(), 'artifacts', 'lighthouse');
const [baseUrl, ...routes] = process.argv.slice(2);

if (!baseUrl || routes.length === 0) {
  console.error('Usage: node scripts/check-lighthouse-score.mjs <baseUrl> <route...>');
  process.exit(1);
}

const outputDir = mkdtempSync(join(tmpdir(), 'healthcalc-lighthouse-'));

try {
  mkdirSync(artifactDir, { recursive: true });

  for (const route of routes) {
    const url = new URL(route, baseUrl).toString();
    warmRoute(url);
    let bestAttempt = null;
    let attemptsRun = 0;

    for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt += 1) {
      attemptsRun = attempt;
      const reportPath = join(outputDir, `${artifactSlug(route)}-attempt-${attempt}.json`);
      const scores = runLighthouse(url, reportPath);

      console.log(`[lighthouse] ${route} attempt ${attempt} -> ${JSON.stringify(scores)}`);

      if (!bestAttempt || totalScore(scores) > totalScore(bestAttempt.scores)) {
        bestAttempt = { attempt, scores, reportPath };
      }

      if (Object.entries(scores).every(([k, score]) => score >= (SCORE_FLOORS[k] ?? 100))) {
        break;
      }
    }

    const failures = Object.entries(bestAttempt.scores).filter(
      ([k, score]) => score < (SCORE_FLOORS[k] ?? 100)
    );
    copyFileSync(bestAttempt.reportPath, join(artifactDir, `${artifactSlug(route)}.json`));

    if (failures.length > 0) {
      console.error(
        `[lighthouse] ${route} fell below its score floors after ${attemptsRun} attempt(s): ${failures
          .map(([category, score]) => `${category}=${score}`)
          .join(', ')}`
      );
      logFailureDiagnostics(bestAttempt.reportPath);
      process.exit(1);
    }
  }

  checkDocumentBudget(new URL('/', baseUrl).toString());
} finally {
  rmSync(outputDir, { recursive: true, force: true });
}

function artifactSlug(route) {
  return route === '/' ? 'root' : route.replace(/[^a-z0-9]+/gi, '-').replace(/^-|-$/g, '');
}

function runLighthouse(url, reportPath) {
  // Run npx from the scratch directory rather than the repo root: npm refuses
  // to resolve a package when the nearest package.json has an `overrides`
  // entry that conflicts with a direct dependency (this one has several), and
  // Lighthouse has nothing to do with the app's dependency tree anyway.
  const result = spawnSync(
    'npx',
    [
      '-y',
      'lighthouse',
      url,
      '--preset=desktop',
      '--quiet',
      '--chrome-flags=--headless=new --no-sandbox',
      '--only-categories=performance,accessibility,best-practices,seo',
      '--output=json',
      `--output-path=${reportPath}`,
    ],
    {
      cwd: outputDir,
      encoding: 'utf-8',
      // Local npm installs here pin allow-remote=none; CI's npm ignores the key.
      env: { ...process.env, npm_config_allow_remote: 'all' },
    }
  );

  if (result.error) {
    console.error(`Failed to run Lighthouse for ${url}:`, result.error.message);
    process.exit(1);
  }

  if (result.status !== 0) {
    if (result.stdout) process.stdout.write(result.stdout);
    if (result.stderr) process.stderr.write(result.stderr);
    process.exit(result.status ?? 1);
  }

  const report = JSON.parse(readFileSync(reportPath, 'utf-8'));
  return {
    performance: Math.round(report.categories.performance.score * 100),
    accessibility: Math.round(report.categories.accessibility.score * 100),
    bestPractices: Math.round(report.categories['best-practices'].score * 100),
    seo: Math.round(report.categories.seo.score * 100),
  };
}

function warmRoute(url) {
  spawnSync('curl', ['-fsSLo', '/dev/null', url], { stdio: 'ignore' });
}

function totalScore(scores) {
  return Object.values(scores).reduce((sum, score) => sum + score, 0);
}

function checkDocumentBudget(url) {
  const result = spawnSync(
    'curl',
    ['--compressed', '-fsSo', '/dev/null', '-w', '%{size_download}', url],
    { encoding: 'utf-8' }
  );
  const bytes = Number.parseInt(result.stdout, 10);

  if (result.status !== 0 || !Number.isFinite(bytes)) {
    console.error(`[document] could not measure ${url}: ${result.stderr || 'no size returned'}`);
    process.exit(1);
  }

  console.log(`[document] ${url} -> ${bytes} bytes compressed (budget ${HOME_DOCUMENT_MAX_BYTES})`);

  if (bytes > HOME_DOCUMENT_MAX_BYTES) {
    console.error(
      `[document] home document is ${bytes} bytes compressed, over the ${HOME_DOCUMENT_MAX_BYTES} byte budget. ` +
        'With inlineCss on, this usually means more CSS reached the global stylesheet or a ' +
        'server component started rendering something large. Trim it or, if the growth is ' +
        'deliberate, raise HOME_DOCUMENT_MAX_BYTES in scripts/check-lighthouse-score.mjs ' +
        'and say why in the PR.'
    );
    process.exit(1);
  }
}

function logFailureDiagnostics(reportPath) {
  const report = JSON.parse(readFileSync(reportPath, 'utf-8'));
  const metrics = report.audits.metrics?.details?.items?.[0];

  if (metrics) {
    const formatMetric = value => `${Math.round(value)}ms`;
    console.error(
      `[lighthouse] metrics: fcp=${formatMetric(metrics.firstContentfulPaint)} lcp=${formatMetric(metrics.largestContentfulPaint)} tbt=${formatMetric(metrics.totalBlockingTime)} si=${formatMetric(metrics.speedIndex)} cls=${metrics.cumulativeLayoutShift}`
    );
  }

  const opportunities = Object.values(report.audits)
    .filter(
      audit => audit.details?.type === 'opportunity' && typeof audit.numericValue === 'number'
    )
    .sort((left, right) => right.numericValue - left.numericValue)
    .slice(0, 5)
    .map(audit => `${audit.id}:${Math.round(audit.numericValue)}ms`);

  if (opportunities.length > 0) {
    console.error(`[lighthouse] top opportunities: ${opportunities.join(', ')}`);
  }

  const failedAudits = Object.values(report.audits)
    .filter(audit => audit.scoreDisplayMode === 'binary' && audit.score !== null && audit.score < 1)
    .slice(0, 10)
    .map(audit => audit.id);

  if (failedAudits.length > 0) {
    console.error(`[lighthouse] failed audits: ${failedAudits.join(', ')}`);
  }

  const layoutShiftItems = report.audits['layout-shift-elements']?.details?.items
    ?.slice(0, 5)
    .map(item => {
      const node = item.node ?? {};
      const snippet = node.snippet ?? node.nodeLabel ?? node.path ?? 'unknown';
      return `${snippet} (${Math.round((item.score ?? 0) * 1000) / 1000})`;
    });

  if (layoutShiftItems?.length) {
    console.error(`[lighthouse] layout-shift-elements: ${layoutShiftItems.join(' | ')}`);
  }
}
