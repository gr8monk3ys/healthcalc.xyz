# HealthCheck Production Rollout Runbook

Last updated: 2026-02-13 01:03 PST
Owner: Release Engineering
Status: `HARDENING_IN_PROGRESS` (production deployed, smoke checks pass, readiness still red)

## Current Snapshot

- Latest production deployment: `https://healthcalc-o5hisnykn-gr8monk3ys-projects.vercel.app`
- Quality gates passed locally:
  - `npm run format:check`
  - `npm run lint`
  - `npm run type-check`
  - `npm run test -- --run` (80 files, 1587 tests)
  - `npm run build`
- Production submission persistence env vars set:
  - `SUBMISSIONS_DB_DRIVER=postgres`
  - `SUBMISSIONS_PERSISTENCE_STRICT=true`
  - `SUBMISSIONS_RETENTION_DAYS=365`
- Production host env vars set:
  - `NEXT_PUBLIC_CANONICAL_HOST=www.healthcalc.xyz`
  - `NEXT_PUBLIC_SITE_URL=https://www.healthcalc.xyz`
- Still missing in production (blocks readiness and launch):
  - `RESEND_API_KEY`
  - `RESEND_AUDIENCE_ID`
  - `CONTACT_EMAIL`
- Still recommended before launch:
  - `NEXT_PUBLIC_GA_ID`
  - `NEXT_PUBLIC_SENTRY_DSN`
  - `NEXT_PUBLIC_ADSENSE_SLOT_CONTENT` (and/or other ad slot vars)
  - Clerk live keys (`pk_live_*`, `sk_live_*`) if auth should stay enabled

## DNS Cutover Status

Resolved on 2026-02-12: `healthcalc.xyz` and `www.healthcalc.xyz` are routed to Vercel.

Observed:

- `vercel domains inspect healthcalc.xyz` now shows expected nameservers (`ns1.vercel-dns.com`, `ns2.vercel-dns.com`)
- Public `healthcalc.xyz` and `www.healthcalc.xyz` now serve the deployed app

Verification completed:

- `vercel domains inspect healthcalc.xyz` has no configuration warning
- `vercel domains inspect www.healthcalc.xyz` has no configuration warning
- Public smoke checks pass on both:
  - `SMOKE_BASE_URL=https://healthcalc.xyz npm run smoke`
  - `SMOKE_BASE_URL=https://www.healthcalc.xyz npm run smoke`

## Pre-Cutover Execution

1. Run code quality + build gates:

```bash
npm run format:check
npm run lint
npm run type-check
npm run test -- --run
npm run build
```

2. Deploy a fresh preview:

```bash
vercel deploy --yes
```

3. Run protected preview smoke checks (deployment protection bypass via CLI auth):

```bash
PREVIEW_URL="https://healthcalc-9mg1o49z0-gr8monk3ys-projects.vercel.app"
for path in / /blog /calculators /bmi /body-fat /tdee /search?q=bmi /privacy /terms /disclaimer /saved-results /sign-in /sign-up; do
  vercel curl "$path" --deployment "$PREVIEW_URL" -- --silent --show-error --output /dev/null --write-out "$path -> %{http_code}\n"
done
```

4. Verify production env vars before cutover:

```bash
vercel env ls production | rg "SUBMISSIONS_|NEXT_PUBLIC_SITE_URL|NEXT_PUBLIC_CANONICAL_HOST|DATABASE_URL|RESEND|CONTACT_EMAIL|RESEND_FROM_EMAIL" -n
```

5. Run submissions migration against production DB config:

```bash
vercel env pull .env.production.tmp --environment=production
set -a
source .env.production.tmp
set +a
npm run migrate:submissions
rm -f .env.production.tmp
```

## Production Cutover

1. Deploy production:

```bash
vercel deploy --prod --yes
```

2. Record both new and previous production deployment URLs:

```bash
vercel ls --yes
```

3. Confirm aliases on the new deployment:

```bash
vercel inspect <new-production-deployment-url>
```

4. Run post-cutover smoke on the canonical public host:

```bash
SMOKE_BASE_URL=https://www.healthcalc.xyz npm run smoke
```

5. Run readiness gate:

```bash
READINESS_BASE_URL=https://www.healthcalc.xyz npm run readiness
```

6. API sanity check (non-destructive validation path):

```bash
curl -s -o /dev/null -w "%{http_code}\n" \
  -X POST "https://www.healthcalc.xyz/api/newsletter" \
  -H "content-type: application/json" \
  -H "origin: https://www.healthcalc.xyz" \
  --data '{"email":"not-an-email"}'
```

Expected:

- `400` if request reaches app validation normally.
- `403` if CSRF/origin mismatch.
- `503` may be expected for newsletter/contact when no provider is configured in production.
- If `npm run readiness` reports HTML/404 instead of JSON, deploy production again to publish `/api/health`.

## Final Hardening Pass

Automated hardening completed:

- Added blog image asset existence test (`src/app/blog/blogImages.test.ts`)
- Hardened CSP for Clerk and ad-network endpoints (`next.config.js`)
- Added auth safety gate: Clerk is automatically disabled in production when test keys are used (`src/utils/auth.ts`)
- Added richer health diagnostics (`src/app/api/health/route.ts`) including analytics, Sentry, AdSense slot and Clerk key checks
- Added stricter affiliate prebuild checks (`scripts/check-affiliate-links.js`)

Run this full gate before launch:

```bash
npm run format:check
npm run lint
npm run type-check
npm run test -- --run
npm run build
SMOKE_BASE_URL=https://www.healthcalc.xyz npm run smoke
READINESS_BASE_URL=https://www.healthcalc.xyz npm run readiness
```

Manual owner tasks before launch:

1. Configure Resend envs in Vercel production (`RESEND_API_KEY`, `RESEND_AUDIENCE_ID`, `CONTACT_EMAIL`, optional `RESEND_FROM_EMAIL`).
2. Replace remaining placeholder direct partner links in `src/constants/affiliates.ts` with tracked affiliate URLs.
3. Set AdSense slot envs (`NEXT_PUBLIC_ADSENSE_SLOT_*`) to activate ad inventory.
4. Set Clerk live keys or intentionally remove Clerk env vars to keep auth disabled.
5. Configure observability (`NEXT_PUBLIC_GA_ID`, `NEXT_PUBLIC_SENTRY_DSN`).

## Rollback Plan

Rollback triggers:

- Smoke failures on homepage marker or unexpected host redirects
- Any critical API 5xx spike after deploy
- Submission persistence errors causing strict-mode 503s beyond expected baseline

Immediate rollback:

```bash
vercel rollback <previous-ready-production-deployment-url> --yes
```

Then verify:

```bash
SMOKE_BASE_URL=https://www.healthcalc.xyz npm run smoke
```

Emergency mitigation (if rollback is blocked and persistence is failing):

```bash
printf 'false' | vercel env add SUBMISSIONS_PERSISTENCE_STRICT production --force --yes
vercel deploy --prod --yes
```

Return strict mode to `true` after root cause is fixed.

## Notes

- `scripts/smoke-check.mjs` now fails on cross-host redirects and missing homepage marker (`HealthCheck`) to avoid false green checks against parked domains.
- For protected Vercel deployment URLs, use `vercel curl ... --deployment <url>` instead of direct `curl`.
