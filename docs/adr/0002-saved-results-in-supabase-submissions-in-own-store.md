---
status: accepted
date: 2026-11-22
---

# Saved results live in Supabase; submissions live in a driver-selected store

The site keeps two kinds of server data with different needs, so it uses two stores rather than one.

**Saved results** belong to a signed-in visitor and must be private to them. They go in Supabase Postgres (`supabase/migrations/001_saved_results.sql`) behind Supabase magic-link auth, with row-level security so a visitor can only read and write their own rows (`src/lib/db/savedResults.ts`, `src/lib/supabase/`).

**Submissions** (newsletter, contact, embed request) come from anonymous visitors and are written by the server only. They go in a store chosen by `SUBMISSIONS_DB_DRIVER`: Postgres via `pg` in production, `node:sqlite` locally, so development and tests need no database service (`src/lib/db/submissions.ts`, `migrations/postgres/`, `migrations/sqlite/`).

Why: RLS and auth come free from Supabase for the per-user data, while anonymous server-side writes need neither and are cheaper to run and test behind a plain driver switch.

## Consequences

- Schema changes to submissions need a migration in both `migrations/postgres/` and `migrations/sqlite/`.
- Shared results are not stored at all; they are encoded in the link, so they never need either store.
