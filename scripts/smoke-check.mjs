const baseUrl = process.env.SMOKE_BASE_URL || 'http://127.0.0.1:3000';
const expectedHost = new URL(baseUrl).host;
const homepageMarker = process.env.SMOKE_HOMEPAGE_MARKER || 'HealthCheck';
const allowCrossHostRedirect =
  (process.env.SMOKE_ALLOW_CROSS_HOST_REDIRECT || '').trim().toLowerCase() === 'true';
const paths = [
  '/',
  '/blog',
  '/calculators',
  '/bmi',
  '/body-fat',
  '/tdee',
  '/search?q=bmi',
  '/privacy',
  '/terms',
  '/disclaimer',
  '/saved-results',
  '/sign-in',
  '/sign-up',
];

const failures = [];

for (const path of paths) {
  const url = `${baseUrl}${path}`;
  try {
    const response = await fetch(url, { redirect: 'follow' });
    const finalUrl = response.url || url;
    const finalHost = new URL(finalUrl).host;

    if (!allowCrossHostRedirect && finalHost !== expectedHost) {
      failures.push(`${path} -> redirected to unexpected host ${finalHost} (expected ${expectedHost})`);
      continue;
    }

    if (!response.ok) {
      failures.push(`${path} -> ${response.status}`);
    } else {
      if (path === '/') {
        const html = await response.text();
        if (!html.toLowerCase().includes(homepageMarker.toLowerCase())) {
          failures.push(`${path} -> missing homepage marker "${homepageMarker}" at ${finalUrl}`);
          continue;
        }
      }
      console.log(`✅ ${path} -> ${response.status}`);
    }
  } catch (error) {
    failures.push(
      `${path} -> network error: ${error instanceof Error ? error.message : String(error)}`
    );
  }
}

if (failures.length > 0) {
  console.error('\nSmoke check failed:');
  failures.forEach(f => console.error(`- ${f}`));
  process.exit(1);
}

console.log('\nAll smoke checks passed.');
