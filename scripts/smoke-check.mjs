const baseUrl = process.env.SMOKE_BASE_URL || 'http://127.0.0.1:3000';
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
    if (!response.ok) {
      failures.push(`${path} -> ${response.status}`);
    } else {
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
