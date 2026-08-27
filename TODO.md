# TODO

> Open nice-to-haves. Completed items are removed rather than archived here
> (git history has them). Security and infrastructure work is tracked as
> GitHub issues, not in this file.

## Code quality

- [ ] Finish migrating calculators to `useCalculatorForm` /
      `useCalculatorFormWithState` — roughly a third still hand-roll form
      state. `BMICalculatorClient.tsx` (custom reducer, largest calculator
      component) is the priority.
- [ ] Split oversized components; the largest ten all exceed the project's
      component-size guideline. `src/components/Search.tsx` should shed its
      i18n strings (→ `src/i18n/`) and scoring algorithm (→ `src/utils/`).
- [ ] Standardize API error envelopes: `client-errors` returns `{ ok: false }`
      while other routes return `{ success: false }`.
- [ ] Strengthen weak calculator tests with reference values (see
      `caloriesBurned.test.ts`, `vo2Max.test.ts` history for the pattern to
      avoid; `tdee.test.ts` is the model).
- [ ] Add tests for `src/proxy.ts` (redirects, locale routing, security
      headers).

## Product decisions needed

- [ ] **i18n: commit or remove.** `(localized)/[locale]/` holds ~136 stub
      re-export pages for six locales while `src/proxy.ts` 302-redirects all
      non-English paths to English. Either ship translations or delete the
      mirror tree and `src/i18n/pages/` until they're real.
- [ ] **Blog content format.** 60+ posts live as 900–1,300-line TSX files,
      type-checked on every build and requiring a deploy per edit. Evaluate
      MDX or a content layer.

## Operations

- [ ] Configure `SENTRY_AUTH_TOKEN`, `SENTRY_ORG`, `SENTRY_PROJECT` in Vercel
      for sourcemap upload and release tracking.
