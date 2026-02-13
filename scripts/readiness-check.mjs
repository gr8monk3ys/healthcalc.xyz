const explicitBaseUrl = process.env.READINESS_BASE_URL || process.env.SMOKE_BASE_URL;
const baseUrl = explicitBaseUrl || 'http://127.0.0.1:3000';
const healthUrl = `${baseUrl.replace(/\/$/, '')}/api/health`;

try {
  const response = await fetch(healthUrl, {
    redirect: 'follow',
    headers: { Accept: 'application/json' },
  });
  const contentType = response.headers.get('content-type') || '';

  if (!contentType.toLowerCase().includes('application/json')) {
    const responseText = await response.text();
    const preview = responseText.replace(/\s+/g, ' ').slice(0, 220);

    console.error('Readiness check failed.');
    console.error(`URL: ${healthUrl}`);
    console.error(`Status: ${response.status}`);
    console.error(`Expected JSON but received "${contentType || 'unknown'}".`);
    if (response.status === 404) {
      console.error('Hint: /api/health is not deployed on this environment yet.');
    }
    console.error(`Body preview: ${preview || '<empty>'}`);
    process.exit(1);
  }

  const payload = await response.json();
  const failingChecks =
    payload && payload.checks
      ? Object.entries(payload.checks)
          .filter(([, value]) => value === false)
          .map(([key]) => key)
      : [];

  if (!response.ok || !payload.ok) {
    console.error('Readiness check failed.');
    console.error(`URL: ${healthUrl}`);
    console.error(`Status: ${response.status}`);
    if (failingChecks.length > 0) {
      console.error(`Failing checks: ${failingChecks.join(', ')}`);
    }
    console.error(JSON.stringify(payload, null, 2));
    process.exit(1);
  }

  console.log('Readiness check passed.');
  console.log(`URL: ${healthUrl}`);
  if (Array.isArray(payload.warnings) && payload.warnings.length > 0) {
    console.log('Warnings:');
    for (const warning of payload.warnings) {
      console.log(`- ${warning}`);
    }
  }
  console.log(JSON.stringify(payload, null, 2));
} catch (error) {
  console.error('Readiness check failed with network error.');
  console.error(error instanceof Error ? error.message : String(error));
  if (!explicitBaseUrl) {
    console.error(
      'Hint: default target is http://127.0.0.1:3000. Start the app or set READINESS_BASE_URL.'
    );
  }
  process.exit(1);
}
