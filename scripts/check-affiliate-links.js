const { readFileSync } = require('node:fs');
const { resolve } = require('node:path');

const affiliatesPath = resolve(__dirname, '../src/constants/affiliates.ts');

function extractUrlHosts(source) {
  const urlPattern = /url:\s*'([^']+)'/g;
  const hosts = new Set();
  let match = null;
  while ((match = urlPattern.exec(source)) !== null) {
    try {
      const parsed = new URL(match[1]);
      hosts.add(parsed.hostname);
    } catch {
      // Ignore malformed URLs; TypeScript compile will catch invalid literals.
    }
  }
  return Array.from(hosts).sort();
}

try {
  const contents = readFileSync(affiliatesPath, 'utf8');
  const pendingMarkerMatches = contents.match(/PENDING_DIRECT_PARTNER_URL/g) || [];
  const todoPartnerMatches =
    contents.match(/TODO:\s*Replace with direct partner link once approved\./g) || [];
  const directPartnerHosts = extractUrlHosts(contents).filter(
    host => !host.endsWith('amazon.com') && !host.endsWith('amzn.to')
  );

  const pendingCount = pendingMarkerMatches.length + todoPartnerMatches.length;
  if (pendingCount > 0) {
    console.warn(
      `\n[affiliate-check] ${pendingCount} direct partner links are still pending.\n` +
        '[affiliate-check] Replace placeholder partner links in src/constants/affiliates.ts before launch.\n'
    );
  }

  if (directPartnerHosts.length > 0) {
    console.warn(
      '[affiliate-check] Non-Amazon partner hosts detected (verify affiliate tracking is active):\n' +
        `${directPartnerHosts.map(host => `  - ${host}`).join('\n')}\n`
    );
  }

  const strictMode =
    process.env.AFFILIATE_LINKS_STRICT?.trim().toLowerCase() === 'true' ||
    process.env.AFFILIATE_LINKS_STRICT === '1';

  if (strictMode && pendingCount > 0) {
    console.error(
      '[affiliate-check] Strict mode enabled and unresolved partner link placeholders were found.'
    );
    process.exit(1);
  }
} catch (error) {
  console.warn(
    '[affiliate-check] Unable to read src/constants/affiliates.ts. Skipping affiliate link check.'
  );
}
