# Live Debugging Guide - Next.js 16 + Turbopack

## Server Status
- **Next.js Version**: 16.0.1 (Turbopack enabled)
- **Dev Server**: http://localhost:3000
- **Network**: http://172.16.0.9:3000
- **Ready Time**: 3.3s

## ✅ Completed Migrations

### 1. Next.js 16 Upgrade
- Updated from 15.2.0 → 16.0.1
- Updated React 19 (stable)
- Updated eslint-config-next@16

### 2. Middleware → Proxy Migration
- **File**: `src/middleware.ts` → `src/proxy.ts`
- **Function**: `middleware()` → `proxy()`
- **Status**: ✅ Working
- **Learn More**: https://nextjs.org/docs/messages/middleware-to-proxy

### 3. CSS Import Order Fix
- **Issue**: `@import` must precede all rules
- **Fix**: Moved `@import '../styles/animations.css'` to top of globals.css
- **Status**: ✅ Fixed

### 4. Security Vulnerabilities
- **Before**: 6 vulnerabilities (4 moderate, 2 critical)
- **After**: 0 vulnerabilities
- **Updated**: vite@7.2.2, vitest@4.0.8, esbuild@0.25.12

## 🎯 Console Error Monitoring

### Known Warnings (Non-blocking)
1. **Sentry DSN not configured** - Expected in dev, requires env var
2. **Node engine mismatch** - Using v20.12.2 (recommended: v20.19.0+)

### Pages to Test
Test each calculator for console errors:

**Working Calculators (6):**
- [ ] http://localhost:3000/bmi
- [ ] http://localhost:3000/tdee
- [ ] http://localhost:3000/body-fat
- [ ] http://localhost:3000/body-fat-burn
- [ ] http://localhost:3000/absi
- [ ] http://localhost:3000/whr

**Placeholder Pages (4):**
- [ ] http://localhost:3000/calorie-deficit
- [ ] http://localhost:3000/weight-management
- [ ] http://localhost:3000/maximum-fat-loss
- [ ] http://localhost:3000/conversions

**Other Pages:**
- [ ] http://localhost:3000/ (homepage)
- [ ] http://localhost:3000/blog
- [ ] http://localhost:3000/about
- [ ] http://localhost:3000/search

### Common Issues to Check

#### 1. Hydration Errors
**Symptoms**: "Text content did not match", "Hydration failed"
**Causes**:
- Server/client rendering mismatch
- Date/time differences
- localStorage access during SSR

#### 2. Missing Dependencies
**Symptoms**: "Cannot find module", "Module not found"
**Fix**: Check imports, run `npm install`

#### 3. Type Errors
**Symptoms**: TypeScript warnings in console
**Fix**: Run `npm run type-check`

#### 4. Performance Warnings
**Symptoms**: "Slow component render", "Large bundle"
**Monitor**: Turbopack build output

## 🔧 Debugging Tools

### Browser DevTools
```javascript
// In browser console, enable verbose logging:
localStorage.debug = '*'

// Check for hydration mismatches:
window.__NEXT_DATA__

// Monitor client-side routing:
window.next.router
```

### Next.js 16 Features

#### Turbopack Benefits
- Faster builds (~7.3s production)
- Faster HMR (hot module replacement)
- Better error messages
- Improved tree-shaking

#### Proxy vs Middleware
- Same functionality
- Better naming (proxy is clearer)
- Future-proof for Next.js roadmap

### Server-Side Logs
Monitor the dev server output:
```bash
npm run dev 2>&1 | grep -i "error\|warn\|failed"
```

### Client-Side Error Capture
Add to browser console:
```javascript
window.addEventListener('error', (e) => {
  console.error('Global error:', e.error);
});

window.addEventListener('unhandledrejection', (e) => {
  console.error('Unhandled promise rejection:', e.reason);
});
```

## 📊 Performance Monitoring

### Turbopack Build Stats
```
Production Build: 7.3s
Pages Generated: 21/21
Largest Route: /weight-management (244 kB)
Smallest Route: /_not-found (219 kB)
```

### Key Metrics to Watch
- **FCP** (First Contentful Paint): < 1.8s
- **LCP** (Largest Contentful Paint): < 2.5s
- **CLS** (Cumulative Layout Shift): < 0.1
- **FID** (First Input Delay): < 100ms

## 🐛 Error Resolution Steps

### Step 1: Identify Error Type
1. Browser console errors
2. Server terminal errors
3. Network errors (DevTools Network tab)
4. Hydration errors (React DevTools)

### Step 2: Categorize
- **Critical**: Breaks functionality
- **Warning**: Works but needs attention
- **Info**: FYI, no action needed

### Step 3: Fix Priority
1. Fix critical errors first
2. Address warnings that affect UX
3. Optimize performance issues
4. Clean up info messages

### Step 4: Test
```bash
# After each fix:
npm run type-check  # TypeScript
npm run lint        # ESLint
npm test            # Vitest (537 tests)
npm run build       # Production build
```

## 🚀 Next Steps

### Immediate Actions
1. **Open each calculator page** - Check browser console
2. **Test all forms** - Submit and check for errors
3. **Monitor network tab** - Check failed requests
4. **Test dark mode** - Toggle and verify

### MCP Tools Available
- **Next.js MCP**: Route inspection, performance monitoring
- **Sentry MCP**: Production error tracking (requires setup)
- **Socket MCP**: Dependency security scanning

## 📝 Error Log Template

```markdown
### Error: [Brief Description]
**Page**: http://localhost:3000/[route]
**Type**: [Console Error / Network / Hydration / TypeScript]
**Severity**: [Critical / Warning / Info]

**Error Message**:
```
[Paste error here]
```

**Reproduction Steps**:
1.
2.
3.

**Fix Applied**:
-

**Status**: [Fixed / In Progress / Needs Investigation]
```

## 🎯 Success Criteria

- [ ] Zero console errors on all pages
- [ ] All 537 tests passing
- [ ] Production build successful
- [ ] All forms functional
- [ ] Dark mode working
- [ ] No hydration errors
- [ ] All network requests successful
- [ ] Performance metrics within targets

---

**Status**: Dev server ready at http://localhost:3000
**Next**: Open browser and start testing pages
