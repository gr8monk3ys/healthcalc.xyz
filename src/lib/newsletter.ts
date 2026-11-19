/**
 * Whether an email provider is configured. next.config.js derives this at
 * build time from the provider keys, so signup forms never render against an
 * API that can only answer 503.
 */
export const NEWSLETTER_ENABLED = process.env.NEXT_PUBLIC_NEWSLETTER_ENABLED === '1';
