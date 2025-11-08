# Sentry Error Monitoring Setup Guide

This guide will help you set up Sentry error monitoring for HealthCheck.

## Prerequisites

- Sentry account (free tier available at [sentry.io](https://sentry.io))
- Access to your project's environment variables

## Quick Setup (5 minutes)

### 1. Create a Sentry Project

1. Go to [sentry.io](https://sentry.io) and sign up or log in
2. Create a new project:
   - Select **Next.js** as the platform
   - Name your project (e.g., "healthcheck")
   - Click "Create Project"

### 2. Get Your Sentry DSN

After creating the project, you'll see a **DSN** (Data Source Name). It looks like:
```
https://[key]@[organization].ingest.sentry.io/[project-id]
```

Copy this DSN - you'll need it in the next step.

### 3. Configure Environment Variables

Add the following to your `.env.local` file (create it if it doesn't exist):

```bash
# Sentry Error Monitoring
NEXT_PUBLIC_SENTRY_DSN=https://your-key@your-org.ingest.sentry.io/your-project-id

# Optional: For source map uploads (get from Sentry settings)
SENTRY_ORG=your-organization-slug
SENTRY_PROJECT=your-project-name
SENTRY_AUTH_TOKEN=your-auth-token
```

Replace the placeholder values with your actual Sentry credentials.

### 4. Test the Setup

Start your development server:
```bash
npm run dev
```

Trigger a test error by adding this to any page:
```typescript
<button onClick={() => { throw new Error('Sentry test error!'); }}>
  Test Sentry
</button>
```

Click the button and check your Sentry dashboard - you should see the error within a few seconds!

## Production Setup

### 1. Generate an Auth Token (for source map uploads)

1. Go to Sentry Settings > Account > API > Auth Tokens
2. Click "Create New Token"
3. Give it a name (e.g., "HealthCheck Production")
4. Select scopes:
   - `project:read`
   - `project:releases`
   - `org:read`
5. Copy the token and add it to your production environment variables

### 2. Configure Vercel (or your hosting platform)

Add these environment variables to your production deployment:

```bash
NEXT_PUBLIC_SENTRY_DSN=https://your-key@your-org.ingest.sentry.io/your-project-id
SENTRY_ORG=your-organization-slug
SENTRY_PROJECT=your-project-name
SENTRY_AUTH_TOKEN=your-production-auth-token
```

### 3. Deploy

Build and deploy your application:
```bash
npm run build
```

Source maps will be automatically uploaded to Sentry during the build process.

## Features Enabled

### ✅ Client-Side Error Tracking
- JavaScript errors in the browser
- React component errors
- Network request failures
- Session replay on errors (privacy-safe)

### ✅ Server-Side Error Tracking
- API route errors
- Server component errors
- Build-time errors

### ✅ Performance Monitoring
- 10% sample rate in production (configurable)
- Page load times
- API response times

### ✅ Session Replay
- 10% of sessions recorded in production
- 100% of error sessions recorded
- Privacy: All text and media masked by default

## Configuration Options

### Adjust Sample Rates

Edit `instrumentation.ts` or `instrumentation-client.ts`:

```typescript
tracesSampleRate: 0.1,  // 10% of transactions
replaysSessionSampleRate: 0.1,  // 10% of sessions
replaysOnErrorSampleRate: 1.0,  // 100% of error sessions
```

### Enable Development Tracking

By default, Sentry is disabled in development to avoid noise. To enable:

```bash
NEXT_PUBLIC_SENTRY_DEV_ENABLED=true
```

### Ignore Specific Errors

Edit the `ignoreErrors` array in `instrumentation-client.ts`:

```typescript
ignoreErrors: [
  'Script error',
  'Network request failed',
  // Add custom patterns here
  /your-custom-pattern/i,
],
```

## Testing Sentry Integration

### Test Client-Side Errors

Add a test button to any page:
```typescript
<button onClick={() => { throw new Error('Test client error'); }}>
  Test Client Error
</button>
```

### Test Server-Side Errors

Create an API route that throws an error:
```typescript
// app/api/test-error/route.ts
export async function GET() {
  throw new Error('Test server error');
}
```

Then visit `/api/test-error` in your browser.

## Troubleshooting

### Errors Not Appearing in Sentry

1. **Check DSN**: Verify your `NEXT_PUBLIC_SENTRY_DSN` is correct
2. **Check Console**: Look for Sentry initialization warnings
3. **Check Environment**: Sentry is disabled by default in development
4. **Check Filters**: Make sure your error isn't being filtered by `ignoreErrors`

### Build Warnings

If you see warnings about missing auth tokens during build:
- This is normal if you haven't set up source map uploads
- Source maps improve error debugging but aren't required
- Add `SENTRY_AUTH_TOKEN` to enable source map uploads

### Source Maps Not Uploading

1. Verify `SENTRY_AUTH_TOKEN` is set
2. Verify `SENTRY_ORG` and `SENTRY_PROJECT` match your Sentry project
3. Check build logs for upload errors
4. Ensure your auth token has the right permissions

## Best Practices

### 1. Use Breadcrumbs

Add custom breadcrumbs for better debugging:
```typescript
import * as Sentry from '@sentry/nextjs';

Sentry.addBreadcrumb({
  category: 'calculator',
  message: 'BMI calculation started',
  level: 'info',
});
```

### 2. Add User Context

Track which users experience errors:
```typescript
Sentry.setUser({ id: userId, email: userEmail });
```

### 3. Add Tags

Organize errors with custom tags:
```typescript
Sentry.setTag('calculator_type', 'bmi');
Sentry.setTag('unit_system', 'metric');
```

### 4. Monitor Performance

Track specific operations:
```typescript
const transaction = Sentry.startTransaction({
  name: 'BMI Calculation',
  op: 'calculate',
});

// ... perform calculation ...

transaction.finish();
```

## Monitoring Dashboard

Access your Sentry dashboard at:
```
https://sentry.io/organizations/[your-org]/projects/[your-project]/
```

### Key Sections:

- **Issues**: View all errors and their frequency
- **Performance**: Monitor page load and API times
- **Releases**: Track errors by deployment
- **Replays**: Watch user sessions that encountered errors

## Support

- [Sentry Next.js Documentation](https://docs.sentry.io/platforms/javascript/guides/nextjs/)
- [Sentry Support](https://sentry.io/support/)
- [GitHub Issues](https://github.com/getsentry/sentry-javascript/issues)

## Cost

Sentry's free tier includes:
- 5,000 errors per month
- 10,000 performance transactions per month
- 50 session replays per month
- 1 team member

This is typically sufficient for small to medium projects. Upgrade as needed.
