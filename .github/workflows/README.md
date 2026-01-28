# GitHub Actions and Repo Automation

## Overview

This repository uses GitHub Actions for application CI plus a set of organization-managed security and hygiene workflows. The app itself is Bun-first, so local verification and pre-commit hooks should be run with Bun.

## Main Workflows

### `ci.yml`

Runs the application test pipeline for pushes and pull requests:

- Prettier check
- ESLint with zero warnings
- TypeScript type-check
- Vitest suite
- Production build
- Lighthouse on pull requests
- Security audit

### Organization Workflows

These workflows are kept in sync with org standards and run on pushes, pull requests, and manual dispatch:

- `org-ci-tests.yml`
- `org-gitleaks.yml`
- `org-osv.yml`
- `org-precommit.yml`
- `org-trivy.yml`
- `org-trufflehog.yml`
- `security-baseline.yml`
- `semgrep.yml`

### CodeQL

GitHub default CodeQL is enabled at the repository level. `org-codeql.yml` intentionally does not upload SARIF results; it serves as a pass-through status check so the repo does not generate duplicate CodeQL uploads from two different workflows.

## Dependency Automation

- Dependabot manages npm and GitHub Actions updates.
- GitHub Actions are pinned by commit SHA.
- `eslint` semver-major updates are ignored for now because ESLint 10 currently breaks the repo's React lint stack.

## Local Verification

Run these before pushing:

```bash
bun run format:check
bun run lint
bun run type-check
bun run test -- --run
bun run build
```

## Secrets

Optional production-facing secrets commonly used by workflows and deployments:

- `NEXT_PUBLIC_GA_ID`
- `NEXT_PUBLIC_SENTRY_DSN`
- `SENTRY_ORG`
- `SENTRY_PROJECT`
- `SENTRY_AUTH_TOKEN`
- `CODECOV_TOKEN`

## Troubleshooting

### Formatting or pre-commit failures

```bash
bun run format
```

### Lint failures

```bash
bun run lint:fix
```

### Test failures

```bash
bun run test -- --run
```

### Build failures

```bash
bun run build
```

## Best Practices

1. **Always run quality checks locally before pushing**
2. **Keep dependencies up to date** (`npm update`)
3. **Review security audit results** regularly
4. **Monitor Lighthouse scores** in PRs
5. **Maintain high test coverage** (>80%)
6. **Use meaningful commit messages** for better CI logs
7. **Create small, focused PRs** for faster reviews

## Additional Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Next.js Deployment Guide](https://nextjs.org/docs/deployment)
- [Vercel Documentation](https://vercel.com/docs)
- [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci)
- [Codecov Documentation](https://docs.codecov.com/)
