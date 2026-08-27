# HealthCalc

Free health and fitness calculators at [healthcalc.xyz](https://healthcalc.xyz): BMI, body fat,
TDEE, calorie deficit, heart-rate zones and about sixty more, plus a blog. Next.js 16, React 19,
TypeScript, Tailwind.

The engineering decision that matters: every calculator is a pure function in
`src/utils/calculators/` with a colocated test file that asserts against hand-computed reference
values, not against the function's own output. `src/utils/calculators/tdee.test.ts` is the model:
each case writes out the Mifflin-St Jeor arithmetic (`(10 × 70) + (6.25 × 175) − (5 × 30) + 5 =
1648.75`) and checks the result to one decimal place. `calculateBMR` and `calculateTDEE` from that
module are the only BMR/TDEE implementations; calorie-deficit, weight-management and fat-loss
calculators import them rather than re-deriving. 56 calculator test files, 1,949 unit tests, all
run in CI alongside a Playwright smoke test that loads every calculator route from the catalog.

![HealthCalc home page](docs/screenshot.png)

## How it fits together

- `src/constants/calculatorCatalog.ts` lists every calculator (slug, title, category, hub) and is
  the single source for routes, hub pages and the generated `/sitemap.xml`.
- Each calculator is `src/app/(default)/<slug>/` (client page + metadata layout) with a JSON API
  mirror at `/api/<slug>`, and can be embedded via `/api/embed/<slug>`.
- Results are saved to `localStorage`; signed-in users (Supabase magic link) sync them to Postgres
  under row-level security.
- `src/proxy.ts` handles canonical-host redirects, security headers, and sends any locale-prefixed
  URL back to the English page. Only English ships.

## Run

Requires [Bun](https://bun.sh) 1.2+.

```bash
bun install
bun run dev          # http://localhost:3000
```

The site runs with no environment variables. `.env.example` documents the optional ones
(Supabase, Resend, Postgres, Sentry, analytics).

## Test

```bash
bun run validate            # prettier + eslint + tsc + vitest
bun run test -- --run       # unit tests only
bun run build && bun run start
bun run smoke               # Playwright: every calculator route renders (needs `npx playwright install chromium`)
bun run test:e2e            # full Playwright suite
```

CI (`.github/workflows/ci.yml`) runs all of the above on every push and pull request.

## License

[GPL-3.0](LICENSE).
