# GitHub Actions CI/CD Pipeline

## Overview

This repository uses GitHub Actions for continuous integration and deployment. The pipeline automatically runs quality checks, tests, and builds on every push and pull request.

## Workflows

### 1. CI/CD Pipeline (`ci.yml`)

**Triggers:**
- Push to `master` or `main` branch
- Pull requests targeting `master` or `main`

**Jobs:**

#### Quality Checks
Runs on Node.js 18.x and 20.x to ensure compatibility.

- **Format Check**: Verifies code formatting with Prettier
- **Linting**: Runs ESLint to catch code quality issues
- **Type Checking**: Validates TypeScript types
- **Tests**: Runs all unit tests with coverage reporting
- **Build**: Ensures the project builds successfully
- **Bundle Size Check**: Reports the size of the production bundle

#### Lighthouse Performance Check
Runs on pull requests only.

- Builds the project locally
- Runs Lighthouse CI on key pages (home, BMI, TDEE)
- Uploads performance reports as artifacts
- Provides performance metrics for review

#### Security Audit
- Runs npm audit to check for security vulnerabilities
- Reports high-severity issues
- Continues even if vulnerabilities are found (non-blocking)

## Required Secrets

To fully utilize the CI/CD pipeline, configure these secrets in your GitHub repository settings:

### Codecov (Optional - for test coverage reports)
- **`CODECOV_TOKEN`**: Token from [codecov.io](https://codecov.io)
  - Sign up at codecov.io
  - Add your repository
  - Copy the upload token
  - Add as repository secret

### Google Analytics (Optional - for production builds)
- **`NEXT_PUBLIC_GA_ID`**: Your Google Analytics Measurement ID
  - Format: `G-XXXXXXXXXX`
  - Get from Google Analytics Admin panel
  - Add as repository secret

### Sentry (Optional - for error monitoring)
- **`NEXT_PUBLIC_SENTRY_DSN`**: Your Sentry DSN
  - Get from Sentry project settings
  - Format: `https://[key]@[org].ingest.sentry.io/[project-id]`
  - Add as repository secret
- **`SENTRY_ORG`**: Your Sentry organization slug
- **`SENTRY_PROJECT`**: Your Sentry project name
- **`SENTRY_AUTH_TOKEN`**: Sentry auth token for source map uploads
  - Generate in Sentry Settings > Auth Tokens
  - Needs `project:write` permission

## Setting Up GitHub Secrets

1. Go to your GitHub repository
2. Navigate to **Settings** > **Secrets and variables** > **Actions**
3. Click **New repository secret**
4. Add each secret name and value
5. Click **Add secret**

## Vercel Deployment

This project uses Vercel for deployment. Vercel automatically:
- Deploys on push to `master`/`main` (production)
- Creates preview deployments for pull requests
- Builds using the same configuration as local builds

### Connecting Vercel

1. Go to [vercel.com](https://vercel.com)
2. Import your GitHub repository
3. Configure environment variables:
   - `NEXT_PUBLIC_GA_ID`
   - `NEXT_PUBLIC_SENTRY_DSN`
   - `SENTRY_ORG`
   - `SENTRY_PROJECT`
   - `SENTRY_AUTH_TOKEN`
4. Deploy!

Vercel will automatically:
- Run builds on every commit
- Deploy to production on merge to main
- Create preview URLs for PRs
- Run health checks

## Local Testing

Before pushing, run the same checks locally:

```bash
# Run all quality checks
npm run validate

# This runs:
# - npm run format:check
# - npm run lint
# - npm run type-check

# Run tests
npm test -- --run

# Build the project
npm run build
```

## Workflow Status

You can view the status of workflows:
- In the **Actions** tab of your GitHub repository
- On pull request pages (status checks)
- Via status badges (add to README.md)

### Status Badge

Add this to your README.md:

```markdown
![CI/CD Pipeline](https://github.com/YOUR_USERNAME/heathcheck.info/actions/workflows/ci.yml/badge.svg)
```

## Troubleshooting

### Build Failures

**Format check fails:**
```bash
npm run format
```

**Linting fails:**
```bash
npm run lint:fix
```

**Type check fails:**
- Fix TypeScript errors in your IDE
- Run `npm run type-check` to verify

**Tests fail:**
- Run `npm test` locally to debug
- Check test output in GitHub Actions logs

**Build fails:**
- Check for missing environment variables
- Verify all dependencies are in package.json
- Run `npm run build` locally

### Performance Issues

If Lighthouse scores are low:
- Check the Lighthouse report artifacts
- Review performance recommendations
- Optimize images, code splitting, lazy loading
- Reduce bundle size

### Security Vulnerabilities

If security audit fails:
```bash
# Review vulnerabilities
npm audit

# Fix automatically (if possible)
npm audit fix

# For production dependencies only
npm audit --production
```

## Customization

### Adjust Node.js Versions

Edit `.github/workflows/ci.yml`:

```yaml
strategy:
  matrix:
    node-version: [18.x, 20.x, 22.x]  # Add or remove versions
```

### Skip Lighthouse on Some PRs

Add this to PR description:
```
[skip lighthouse]
```

Then update the workflow to check for this flag.

### Change Test Coverage Threshold

Add to `package.json`:

```json
{
  "jest": {
    "coverageThreshold": {
      "global": {
        "branches": 80,
        "functions": 80,
        "lines": 80,
        "statements": 80
      }
    }
  }
}
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
