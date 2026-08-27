# HealthCalc

Free health and fitness calculators at [healthcalc.xyz](https://healthcalc.xyz): BMI, body fat,
TDEE, calorie deficit, waist-to-hip ratio and sixty-odd more, plus a blog. Built with Next.js,
TypeScript, and TailwindCSS.

![HealthCalc home page](public/images/dashboard.png)

## What it does

- Over 60 calculators, listed in `src/constants/calculatorCatalog.ts` (the single source of truth
  for routes, sitemap and hub pages). Calculations run client-side; each calculator also has a JSON
  API route under `/api/<slug>`.
- Saved results: stored in `localStorage` for anonymous visitors, synced to Postgres (via Supabase
  auth with magic-link sign-in) when signed in.
- Embeddable calculator widgets (`/api/embed/<calculator>`) and per-page OpenGraph images.
- Newsletter and contact forms backed by Resend, with submissions persisted to Postgres or SQLite.
- PWA manifest, offline page, dynamic sitemap, Schema.org structured data.
- Locale-prefixed routes (`/es/...`, `/fr/...`, ...) exist but currently redirect to English;
  translations are not shipped yet.

## Tech stack

Next.js (App Router), React, TypeScript, TailwindCSS, Vitest, Playwright, Supabase, `pg` /
`node:sqlite`, Sentry, Vercel Analytics.

## Getting started

Prerequisites: [Bun](https://bun.sh) 1.2+ (package manager and runtime). Node.js 20.19+ is
recommended for tooling compatibility.

```bash
git clone https://github.com/gr8monk3ys/healthcalc.xyz.git
cd healthcalc.xyz
bun install
cp .env.example .env.local   # optional: analytics, Sentry, Supabase, Resend, DB settings
bun run dev                  # http://localhost:3000
```

Production build:

```bash
bun run build
bun run start
```

## Scripts

| Command                     | What it does                                           |
| --------------------------- | ------------------------------------------------------ |
| `bun run dev`               | Development server on port 3000                        |
| `bun run build`             | Production build                                       |
| `bun run start`             | Serve the production build                             |
| `bun run lint`              | ESLint (`--max-warnings 0`)                            |
| `bun run format:check`      | Prettier check (`format` to write)                     |
| `bun run type-check`        | `tsc --noEmit`                                         |
| `bun run test -- --run`     | Vitest unit tests                                      |
| `bun run test:e2e`          | Playwright end-to-end tests (`npx playwright install`) |
| `bun run smoke`             | Playwright smoke tests for all calculator routes       |
| `bun run validate`          | format:check + lint + type-check + test                |
| `bun run create:calculator` | Scaffold a new calculator                              |

## Configuration

Everything is optional; the site runs with no environment variables. See `.env.example` for the
full list.

- **Submissions**: `SUBMISSIONS_DB_DRIVER=postgres` with `SUBMISSIONS_POSTGRES_URL` (or
  `DATABASE_URL`) in production; `sqlite` for local development. `SUBMISSIONS_PERSISTENCE_STRICT`
  and `SUBMISSIONS_RETENTION_DAYS` control failure handling and retention.
- **Email (Resend)**: `RESEND_API_KEY`, `RESEND_AUDIENCE_ID` (newsletter), `RESEND_FROM_EMAIL`,
  `CONTACT_EMAIL`.
- **Auth and saved results**: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, and
  `SAVED_RESULTS_POSTGRES_URL`. Row Level Security keeps each user's rows private.
- **Observability**: `NEXT_PUBLIC_GA_ID` ([setup guide](docs/google-analytics-setup.md)),
  `NEXT_PUBLIC_SENTRY_DSN` / `SENTRY_DSN` ([setup guide](docs/sentry-setup.md)). Vercel Analytics
  loads only after analytics consent. Without a browser Sentry DSN, client errors go to
  `/api/client-errors` and the server log.
- **Canonical host**: `NEXT_PUBLIC_CANONICAL_HOST` / `NEXT_PUBLIC_SITE_URL`; `src/proxy.ts`
  redirects old hosts and normalises `www`.

Vercel preview deployments only issue TLS certificates for the base preview host; do not add
`www.` to a preview URL.

## Project layout

```
src/
├── app/(default)/       # English routes: calculators, blog, API, static pages
├── app/(localized)/     # Locale-prefixed mirrors (redirect to English for now)
├── components/          # UI primitives and per-calculator components
├── constants/           # Calculator catalog, affiliates, per-calculator constants
├── hooks/               # useCalculatorForm, useCalculatorUnits, saved results
├── i18n/                # Messages and locale helpers
├── lib/                 # blog registry, db layer, supabase clients
├── utils/calculators/   # Pure calculation functions with tests
└── proxy.ts             # Middleware: redirects, locale routing, security headers
e2e/                     # Playwright specs
docs/                    # Setup guides and partner notes
supabase/, migrations/   # Database schema
```

See [CLAUDE.md](CLAUDE.md) for the architecture notes and the steps to add a calculator or blog
post.

## CI

`.github/workflows/ci.yml` runs format, lint, type-check, unit tests, build, a server smoke check
and the Playwright suite on every push and pull request. Security scanning (CodeQL, Semgrep,
Trivy, OSV, gitleaks, TruffleHog) runs from the shared `org-*.yml` workflows.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md).

## License

[GPL-3.0](LICENSE).
