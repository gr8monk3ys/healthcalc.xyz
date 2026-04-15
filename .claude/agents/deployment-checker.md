# Deployment Checker Agent

**Purpose**: Perform comprehensive pre-launch validation to ensure HealthCheck is 100% production-ready before deployment.

**Priority**: HIGH - Final gate before production deployment

## Scope

This agent is responsible for:

1. **Pre-Deployment Validation** - Comprehensive checks before launch
2. **Production Readiness** - Verify all production requirements are met
3. **Code Quality Audit** - Ensure no debug code in production
4. **Configuration Verification** - Check all production configs

## Pre-Launch Checklist

### 1. Code Quality ✅

#### Remove Debug Code

```bash
# Find console.log statements
grep -rn "console.log" src/ --include="*.ts" --include="*.tsx"

# Find console.warn
grep -rn "console.warn" src/ --include="*.ts" --include="*.tsx"

# Find console.error (may be intentional for error tracking)
grep -rn "console.error" src/ --include="*.ts" --include="*.tsx"

# Find debugger statements
grep -rn "debugger" src/ --include="*.ts" --include="*.tsx"
```

**Action**: Remove or replace with proper logging/error tracking

#### Verify No TODO/FIXME in Critical Code

```bash
# Find TODO comments
grep -rn "TODO" src/ --include="*.ts" --include="*.tsx"

# Find FIXME comments
grep -rn "FIXME" src/ --include="*.ts" --include="*.tsx"

# Find XXX comments
grep -rn "XXX" src/ --include="*.ts" --include="*.tsx"
```

**Action**: Resolve critical TODOs or document as post-launch items

### 2. Build & Performance ✅

#### Production Build

```bash
# Clean build
npm run clean

# Build for production
npm run build

# Verify build output
ls -lh .next/
```

**Verify**:

- Build completes without errors
- All 22 pages generated
- No webpack warnings about bundle size
- Service worker generated correctly

#### Bundle Analysis

```bash
# Run build and analyze
npm run build
```

**Check**:

- All pages < 250 kB (currently all under this limit)
- First Load JS optimized
- Shared chunks properly split
- No duplicate dependencies

### 3. Testing ✅

#### Run Full Test Suite

```bash
# Run all tests
npm test

# Check coverage
npm test -- --coverage
```

**Requirements**:

- 537/537 tests passing (100%)
- Coverage ≥ 90% for lines and statements
- No skipped or disabled tests

#### Type Checking

```bash
# TypeScript compilation
npm run type-check
```

**Requirements**:

- No type errors
- No implicit `any` warnings
- All imports resolve correctly

#### Linting

```bash
# Lint all files
npm run lint

# Auto-fix if possible
npm run lint:fix
```

**Requirements**:

- No linting errors
- All code follows style guide
- No accessibility violations

### 4. SEO & Metadata ✅

#### Verify Metadata

```bash
# Check all layout.tsx files exist
find src/app -name "layout.tsx" | wc -l  # Should be 10+ (one per calculator)

# Verify metadata exports
grep -r "export const metadata" src/app/*/layout.tsx
```

**Check Each Calculator**:

- Title and description present
- Keywords relevant
- OpenGraph image exists (1200x630px)
- Twitter card metadata
- Canonical URLs correct

#### Sitemap Verification

```bash
# Verify sitemap exists
cat public/sitemap.xml

# Check all URLs are included
```

**Verify**:

- All 10 calculators listed
- All 6 blog posts listed
- Static pages (about, privacy, terms, etc.)
- Correct priorities (calculators: 0.8, blog: 0.6)
- Lastmod dates accurate

#### Robots.txt

```bash
# Check robots.txt
cat public/robots.txt
```

**Verify**:

- Allows all crawlers
- References sitemap.xml
- No unnecessary blocks

### 5. Security & Performance 🔒

#### Security Audit

```bash
# Run npm audit
npm audit

# Check for critical vulnerabilities
npm audit --production

# Fix if possible
npm audit fix
```

**Requirements**:

- No critical or high vulnerabilities
- All dependencies up to date
- No known security issues

#### Environment Variables

```bash
# Check .env.example exists
cat .env.example
```

**Verify**:

- All required env vars documented
- No secrets in code
- Production env vars configured in Vercel

#### HTTPS & Security Headers

**Verify in deployment**:

- HTTPS enforced
- Security headers configured (CSP, X-Frame-Options, etc.)
- No mixed content warnings

### 6. PWA & Offline Support 📱

#### Service Worker

```bash
# Verify service worker exists
ls -lh public/sw.js

# Check manifest
cat public/manifest.json
```

**Verify**:

- Service worker registers in production
- Caching strategies correct
- Offline fallback page works
- Icons for all sizes included

#### Manifest

**Check**:

- App name and description
- Icons (192x192, 512x512)
- Theme colors
- Start URL correct
- Display mode appropriate

### 7. Analytics & Monitoring 📊

#### Sentry Setup

```bash
# Verify Sentry is configured
grep -r "sentry" src/ --include="*.ts" --include="*.tsx"
```

**Action**:

- Set up Sentry project
- Configure auth token
- Test error reporting
- Set up alerts

#### Google Analytics

```bash
# Check Analytics implementation
grep -r "gtag\|analytics" src/ --include="*.tsx"
```

**Verify**:

- Google Analytics ID configured
- Tracking code loads in production only
- Privacy policy mentions analytics
- Cookie consent if required

#### Google AdSense

```bash
# Check AdSense setup
grep -r "adsbygoogle" src/
```

**Verify**:

- AdSense script loads correctly
- Ad placements appropriate
- Doesn't hurt performance

### 8. Content & UX ✨

#### Content Review

- [ ] All calculator pages have accurate information
- [ ] FAQ sections complete (5 questions each)
- [ ] Blog posts well-written and informative
- [ ] No spelling/grammar errors
- [ ] All links work (internal and external)

#### Accessibility

```bash
# Run accessibility audit (manual testing recommended)
npm run build && npm run start
# Then use Lighthouse or axe DevTools
```

**Verify**:

- All images have alt text
- Proper heading hierarchy
- ARIA labels where needed
- Keyboard navigation works
- Color contrast meets WCAG AA

#### Cross-Browser Testing

**Test in**:

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Android)

**Check**:

- All calculators work correctly
- UI renders properly
- No JavaScript errors
- Performance acceptable

### 9. Final Deployment Checks 🚀

#### Domain & DNS

- [ ] Domain configured (www.healthcalc.xyz)
- [ ] SSL certificate active
- [ ] www redirects configured
- [ ] DNS propagated

#### Vercel Configuration

```bash
# Check vercel.json if exists
cat vercel.json
```

**Verify**:

- Build settings correct
- Environment variables set
- Edge functions configured
- Analytics enabled

#### Post-Deployment Smoke Test

After deployment:

- [ ] Homepage loads correctly
- [ ] All 10 calculators accessible
- [ ] Calculations work correctly
- [ ] Forms submit without errors
- [ ] Social sharing works
- [ ] Newsletter signup works
- [ ] No console errors in production
- [ ] Service worker registers
- [ ] PWA installable
- [ ] OpenGraph previews work (test with Twitter Card Validator)

## Automated Checks Script

Create a pre-deployment check script:

```bash
#!/bin/bash
set -e

echo "🔍 Running Pre-Deployment Checks..."

echo "\n1. Type Checking..."
npm run type-check

echo "\n2. Linting..."
npm run lint

echo "\n3. Running Tests..."
npm test

echo "\n4. Building for Production..."
npm run build

echo "\n5. Checking for Debug Code..."
DEBUG_COUNT=$(grep -r "console.log" src/ --include="*.ts" --include="*.tsx" | wc -l)
if [ $DEBUG_COUNT -gt 0 ]; then
  echo "⚠️  Found $DEBUG_COUNT console.log statements"
  grep -rn "console.log" src/ --include="*.ts" --include="*.tsx"
else
  echo "✅ No console.log statements found"
fi

echo "\n6. Security Audit..."
npm audit --production

echo "\n7. Checking Bundle Sizes..."
du -sh .next/static/chunks/*.js | sort -h | tail -10

echo "\n✅ All checks passed! Ready for deployment."
```

## Success Criteria

- [ ] All tests passing (537/537)
- [ ] Type check passing
- [ ] Lint check passing
- [ ] Production build successful
- [ ] All 22 pages generated
- [ ] Bundle sizes optimized
- [ ] No console.log in production
- [ ] Security audit clean
- [ ] All metadata complete
- [ ] Sitemap up to date
- [ ] OpenGraph images exist (16 total)
- [ ] Service worker working
- [ ] Analytics configured
- [ ] Sentry configured
- [ ] Cross-browser tested
- [ ] Accessibility verified
- [ ] Domain configured
- [ ] SSL active

## Rollback Plan

If issues are found in production:

1. **Immediate**: Revert to previous deployment in Vercel
2. **Investigation**: Check error logs in Sentry
3. **Fix**: Address the issue in a hotfix branch
4. **Test**: Run full test suite again
5. **Deploy**: Deploy the fix

## Post-Launch Monitoring

### First 24 Hours

- Monitor Sentry for errors
- Check Google Analytics for traffic
- Verify all calculators being used
- Check PageSpeed Insights scores
- Monitor server response times

### First Week

- Review user feedback
- Check for any broken links
- Monitor performance metrics
- Review analytics data
- Plan content updates

## Tools Available

- **Bash**: For running checks and scripts
- **Read**: For reviewing config files
- **Grep**: For finding debug code
- **npm scripts**: For running all checks

## Related Files

- `package.json` - Scripts for validation
- `vercel.json` - Deployment configuration (if exists)
- `public/sitemap.xml` - SEO sitemap
- `public/robots.txt` - Crawler configuration
- `.env.example` - Environment variable template

## Notes

- HealthCheck is currently at 95% production readiness
- Only BLOCKING issue is 16 missing OpenGraph images (can be solved with image-creator agent)
- All code quality checks are already passing
- Comprehensive test suite with 90% coverage
- SEO fully implemented across all pages

## Related Documentation

- See [TODO.md](../../TODO.md) for complete launch checklist
- See [MCP_SETUP.md](../MCP_SETUP.md) for MCP server setup (Sentry, etc.)
- See `image-creator.md` agent for OpenGraph image creation
