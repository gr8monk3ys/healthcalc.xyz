# Google Analytics 4 Setup Guide

## Overview

This application is configured to use Google Analytics 4 (GA4) for tracking user interactions, page views, and custom events. This guide will help you set up GA4 from scratch.

## Prerequisites

- A Google account
- Access to Google Analytics admin panel
- Basic understanding of environment variables

## Step 1: Create a Google Analytics 4 Property

### 1.1 Go to Google Analytics

Visit [Google Analytics](https://analytics.google.com/) and sign in with your Google account.

### 1.2 Create a New Property

1. Click **Admin** (gear icon) in the bottom left
2. Under **Property** column, click **Create Property**
3. Fill in property details:
   - **Property name**: HealthCheck.info (or your site name)
   - **Reporting time zone**: Select your timezone
   - **Currency**: Select your currency
4. Click **Next**

### 1.3 Provide Business Information

1. Select your industry category: **Health and Fitness**
2. Select business size (if applicable)
3. Choose how you intend to use Google Analytics
4. Click **Create**
5. Accept the Terms of Service

### 1.4 Set Up Data Stream

1. Select **Web** as your platform
2. Enter your website details:
   - **Website URL**: `https://www.heathcheck.info` (your actual domain)
   - **Stream name**: HealthCheck.info Web
3. *(Optional)* Enable enhanced measurement for automatic event tracking:
   - Page views ✓
   - Scrolls ✓
   - Outbound clicks ✓
   - Site search ✓
   - Form interactions ✓
   - Video engagement ✓
   - File downloads ✓
4. Click **Create stream**

### 1.5 Get Your Measurement ID

After creating the stream, you'll see your **Measurement ID** in the format:
```
G-XXXXXXXXXX
```

**Copy this ID** - you'll need it for configuration.

## Step 2: Configure Environment Variables

### 2.1 Local Development

1. Create or update `.env.local` file in the project root:

```bash
# Google Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

Replace `G-XXXXXXXXXX` with your actual Measurement ID.

2. Restart your development server:

```bash
npm run dev
```

**Note**: Analytics only runs in production mode by default. To test locally, temporarily modify the condition in `src/components/Analytics.tsx` and `src/app/layout.tsx`.

### 2.2 Production (Vercel)

1. Go to your Vercel project dashboard
2. Navigate to **Settings** > **Environment Variables**
3. Add a new variable:
   - **Name**: `NEXT_PUBLIC_GA_ID`
   - **Value**: `G-XXXXXXXXXX` (your Measurement ID)
   - **Environment**: Production (and Preview/Development if desired)
4. Click **Save**
5. Redeploy your application

### 2.3 Production (Other Platforms)

For other hosting platforms (Netlify, AWS, etc.), add the environment variable:

**Netlify:**
- Go to Site settings > Environment variables
- Add `NEXT_PUBLIC_GA_ID` with your Measurement ID

**AWS Amplify:**
- Go to App settings > Environment variables
- Add `NEXT_PUBLIC_GA_ID` with your Measurement ID

**Custom Server:**
- Set environment variable before starting the app:
  ```bash
  export NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
  npm start
  ```

## Step 3: Verify Installation

### 3.1 Use Google Tag Assistant

1. Install [Google Tag Assistant Chrome Extension](https://chrome.google.com/webstore/detail/tag-assistant-legacy-by-g/kejbdjndbnbjgmefkgdddjlbokphdefk)
2. Visit your live website
3. Click the Tag Assistant icon
4. Click **Enable** and refresh the page
5. Verify that Google Analytics tag is firing correctly

### 3.2 Use GA4 Real-time Reports

1. Go to Google Analytics dashboard
2. Navigate to **Reports** > **Real-time**
3. Visit your website in another tab
4. Within ~30 seconds, you should see activity in the Real-time report

### 3.3 Check Browser Console

Open Developer Tools (F12) and check for:
- No JavaScript errors related to gtag
- Network requests to `www.googletagmanager.com`
- Successful data layer pushes

## Step 4: Set Up Key Events (Recommended)

### 4.1 Configure Events in GA4

1. In GA4, go to **Admin** > **Events**
2. Click **Create event**
3. Set up custom events for calculator usage:

**Example: BMI Calculator Usage**
- Event name: `calculator_use`
- Parameter matching:
  - `calculator_type` equals `bmi`

### 4.2 Mark Events as Conversions

1. In GA4, go to **Admin** > **Conversions**
2. Click **New conversion event**
3. Add important events:
   - `calculator_use` - When users use any calculator
   - `form_submit` - When users submit forms
   - `scroll` - For engagement tracking

### 4.3 Custom Event Tracking (Optional)

You can track custom events in your code using the `trackEvent` function:

```typescript
import { trackEvent } from '@/components/Analytics';

// Example: Track calculator usage
trackEvent('calculator_use', {
  calculator_type: 'bmi',
  result_value: calculatedBMI,
  user_gender: formData.gender,
});

// Example: Track button clicks
trackEvent('button_click', {
  button_name: 'save_result',
  page: '/bmi',
});
```

## Step 5: Configure Google Search Console (Optional)

### 5.1 Link GA4 with Search Console

1. In GA4, go to **Admin** > **Product links**
2. Click **Search Console links**
3. Click **Link**
4. Follow the prompts to connect your Search Console property
5. This enables organic search data in GA4

## Troubleshooting

### Analytics Not Working

**Check 1: Environment Variable**
```bash
# Verify the variable is set
echo $NEXT_PUBLIC_GA_ID

# Or in browser console (production only)
console.log(process.env.NEXT_PUBLIC_GA_ID)
```

**Check 2: Production Mode**
Analytics only runs in production. Test with:
```bash
npm run build
npm start
```

**Check 3: Ad Blockers**
Disable ad blockers or tracking protection in your browser.

**Check 4: Browser Console**
Look for errors related to:
- `gtag is not defined`
- Failed network requests to `googletagmanager.com`
- CSP (Content Security Policy) violations

### Data Not Appearing in GA4

**Wait Period**: Data can take 24-48 hours to appear in standard reports (but should be immediate in Real-time reports)

**Check Filters**: Ensure you don't have IP filters blocking your own traffic

**Verify Measurement ID**: Double-check the ID format is correct (`G-XXXXXXXXXX`)

### GDPR/Privacy Compliance

If your users are in the EU, you need to:

1. **Add Cookie Consent**: Implement a cookie consent banner
2. **Update Privacy Policy**: Mention Google Analytics usage
3. **Configure GA4**:
   - Go to **Admin** > **Data Settings** > **Data Collection**
   - Enable **Data Deletion Requests**
   - Configure **Data Retention** (default is 2 months)
4. **IP Anonymization**: GA4 does this automatically

**Recommended Cookie Consent Libraries:**
- [CookieConsent](https://www.npmjs.com/package/vanilla-cookieconsent)
- [React Cookie Consent](https://www.npmjs.com/package/react-cookie-consent)

## Understanding the Implementation

### Where Analytics is Implemented

**1. Global Tag Loading** (`src/app/layout.tsx`)
```typescript
// Loads gtag.js script
<script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} />
```

**2. Page View Tracking** (`src/components/Analytics.tsx`)
```typescript
// Automatically tracks page views on route changes
const trackPageView = (url: string) => {
  window.gtag('config', gaId, { page_path: url });
};
```

**3. Custom Event Tracking**
```typescript
// Export function for custom events
export const trackEvent = (eventName, eventParams) => {
  window.gtag('event', eventName, eventParams);
};
```

### Important Implementation Details

- **Production Only**: Analytics only runs when `NODE_ENV === 'production'`
- **Automatic**: Page views are tracked automatically via Next.js routing
- **Custom Events**: Use `trackEvent()` function for custom tracking
- **Privacy**: No PII (personally identifiable information) is tracked by default

## Key Metrics to Monitor

Once set up, monitor these important metrics:

### User Engagement
- **Active users**: Daily/weekly/monthly active users
- **Session duration**: Average time users spend on site
- **Pages per session**: How many pages users visit per session
- **Bounce rate**: Percentage of single-page sessions

### Calculator Usage
- **Calculator views**: Which calculators are most popular
- **Completion rate**: How many users complete calculator forms
- **Result actions**: Do users save/share their results?

### Traffic Sources
- **Organic search**: Users from Google, Bing, etc.
- **Direct**: Users typing URL directly
- **Referral**: Users from other websites
- **Social**: Users from social media platforms

### Performance
- **Page load time**: How fast pages load for users
- **Engagement rate**: Percentage of engaged sessions
- **Conversions**: Custom events you've set up

## Best Practices

1. **Don't Over-Track**: Only track events that provide actionable insights
2. **Test Thoroughly**: Always verify tracking in staging before production
3. **Document Events**: Keep a record of all custom events you implement
4. **Regular Audits**: Check GA4 quarterly to ensure proper tracking
5. **Respect Privacy**: Always inform users about analytics in your privacy policy
6. **Use GTM (Optional)**: Consider Google Tag Manager for more complex tracking

## Next Steps

After setting up GA4:

1. **Set up Alerts**: Create custom alerts for important metrics
2. **Custom Reports**: Build reports specific to your KPIs
3. **Set Goals**: Define conversion goals for your site
4. **Integrate with Ads**: If running Google Ads, link the accounts
5. **Export Data**: Set up BigQuery export for advanced analysis (optional)

## Additional Resources

- [Google Analytics 4 Documentation](https://support.google.com/analytics/answer/9304153)
- [GA4 Event Tracking Guide](https://support.google.com/analytics/answer/9267735)
- [Next.js Analytics Guide](https://nextjs.org/docs/app/building-your-application/optimizing/analytics)
- [GA4 vs Universal Analytics](https://support.google.com/analytics/answer/11583528)

## Support

If you encounter issues:

1. Check this documentation first
2. Review the [GitHub Actions CI/CD docs](.github/workflows/README.md)
3. Consult Google Analytics Help Center
4. Create an issue in the project repository

---

**Last Updated**: 2025-11-06
**Version**: 1.0
