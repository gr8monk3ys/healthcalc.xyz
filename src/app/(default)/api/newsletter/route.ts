import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createLogger } from '@/utils/logger';
import { rateLimit } from '@/utils/rateLimit';
import { verifyCsrf } from '@/utils/csrf';
import {
  isSubmissionPersistenceStrictModeEnabled,
  saveNewsletterSubmission,
} from '@/lib/db/submissions';

/**
 * Newsletter subscription API endpoint
 *
 * This endpoint handles newsletter subscriptions. Configure your email service
 * provider (Mailchimp, ConvertKit, Resend, etc.) by setting the appropriate
 * environment variables.
 *
 * Supported providers:
 * - Mailchimp: Set MAILCHIMP_API_KEY and MAILCHIMP_AUDIENCE_ID
 * - ConvertKit: Set CONVERTKIT_API_KEY and CONVERTKIT_FORM_ID
 * - Resend: Set RESEND_API_KEY and RESEND_AUDIENCE_ID
 * - Custom: Implement your own integration below
 */

const logger = createLogger({ component: 'NewsletterAPI' });

const subscribeSchema = z.object({
  email: z.string().email('Please provide a valid email address'),
  source: z.string().max(100).optional(),
});

interface SubscribeSuccessResponse {
  success: true;
  message: string;
}

interface SubscribeErrorResponse {
  success: false;
  error: string;
}

type SubscribeResponse = SubscribeSuccessResponse | SubscribeErrorResponse;

async function persistSubmissionOrFail(
  payload: Parameters<typeof saveNewsletterSubmission>[0]
): Promise<NextResponse<SubscribeErrorResponse> | null> {
  const persistence = await saveNewsletterSubmission(payload);
  if (persistence.success || !isSubmissionPersistenceStrictModeEnabled()) {
    return null;
  }

  logger.error('Strict persistence mode blocked newsletter response', {
    driver: persistence.driver,
    error: persistence.error,
  });

  return NextResponse.json(
    {
      success: false,
      error: 'Newsletter service is temporarily unavailable. Please try again later.',
    },
    { status: 503 }
  );
}

export async function POST(request: NextRequest): Promise<NextResponse<SubscribeResponse>> {
  // CSRF protection
  if (!verifyCsrf(request)) {
    return NextResponse.json({ success: false, error: 'Forbidden' }, { status: 403 });
  }

  const rateLimitResult = rateLimit(request);
  if (!rateLimitResult.success) {
    return NextResponse.json(
      {
        success: false,
        error: 'Too many requests. Please try again later.',
      },
      { status: 429, headers: rateLimitResult.headers }
    );
  }

  try {
    const body = await request.json();

    // Validate request body with Zod
    const parsed = subscribeSchema.safeParse(body);
    if (!parsed.success) {
      const firstError = parsed.error.issues[0]?.message ?? 'Invalid input';
      return NextResponse.json({ success: false, error: firstError }, { status: 400 });
    }

    const { email, source } = parsed.data;

    // Check which email provider is configured
    const mailchimpApiKey = process.env.MAILCHIMP_API_KEY;
    const mailchimpAudienceId = process.env.MAILCHIMP_AUDIENCE_ID;
    const convertkitApiKey = process.env.CONVERTKIT_API_KEY;
    const convertkitFormId = process.env.CONVERTKIT_FORM_ID;
    const resendApiKey = process.env.RESEND_API_KEY;
    const resendAudienceId = process.env.RESEND_AUDIENCE_ID;

    // Mailchimp integration
    if (mailchimpApiKey && mailchimpAudienceId) {
      const datacenter = mailchimpApiKey.split('-')[1];
      const response = await fetch(
        `https://${datacenter}.api.mailchimp.com/3.0/lists/${mailchimpAudienceId}/members`,
        {
          method: 'POST',
          headers: {
            Authorization: `apikey ${mailchimpApiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email_address: email,
            status: 'pending', // Double opt-in
            ...(source && {
              tags: [source],
              merge_fields: { SOURCE: source },
            }),
          }),
        }
      );

      if (response.ok) {
        const strictFailureResponse = await persistSubmissionOrFail({
          email,
          source,
          provider: 'mailchimp',
          status: 'subscribed',
        });
        if (strictFailureResponse) return strictFailureResponse;
        return NextResponse.json({
          success: true,
          message:
            'Thank you for subscribing! Please check your email to confirm your subscription.',
        });
      }

      const error = await response.json();
      if (error.title === 'Member Exists') {
        const strictFailureResponse = await persistSubmissionOrFail({
          email,
          source,
          provider: 'mailchimp',
          status: 'already-subscribed',
        });
        if (strictFailureResponse) return strictFailureResponse;
        return NextResponse.json({
          success: true,
          message: 'You are already subscribed to our newsletter.',
        });
      }

      logger.error('Mailchimp error', { error });
      await persistSubmissionOrFail({
        email,
        source,
        provider: 'mailchimp',
        status: 'failed',
        error: JSON.stringify(error),
      });
      return NextResponse.json(
        {
          success: false,
          error: 'Failed to subscribe. Please try again later.',
        },
        { status: 500 }
      );
    }

    // ConvertKit integration
    if (convertkitApiKey && convertkitFormId) {
      const response = await fetch(
        `https://api.convertkit.com/v3/forms/${convertkitFormId}/subscribe`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            api_key: convertkitApiKey,
            email: email,
          }),
        }
      );

      if (response.ok) {
        const strictFailureResponse = await persistSubmissionOrFail({
          email,
          source,
          provider: 'convertkit',
          status: 'subscribed',
        });
        if (strictFailureResponse) return strictFailureResponse;
        return NextResponse.json({
          success: true,
          message:
            'Thank you for subscribing! Please check your email to confirm your subscription.',
        });
      }

      const responseBody = await response.text();
      logger.error('ConvertKit error', {
        responseBody,
      });
      await persistSubmissionOrFail({
        email,
        source,
        provider: 'convertkit',
        status: 'failed',
        error: responseBody,
      });
      return NextResponse.json(
        {
          success: false,
          error: 'Failed to subscribe. Please try again later.',
        },
        { status: 500 }
      );
    }

    // Resend integration
    if (resendApiKey && resendAudienceId) {
      const response = await fetch(
        `https://api.resend.com/audiences/${resendAudienceId}/contacts`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${resendApiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: email,
            unsubscribed: false,
          }),
        }
      );

      if (response.ok) {
        const strictFailureResponse = await persistSubmissionOrFail({
          email,
          source,
          provider: 'resend',
          status: 'subscribed',
        });
        if (strictFailureResponse) return strictFailureResponse;
        return NextResponse.json({
          success: true,
          message: 'Thank you for subscribing! You will receive our latest updates.',
        });
      }

      const responseBody = await response.text();
      logger.error('Resend error', { responseBody });
      await persistSubmissionOrFail({
        email,
        source,
        provider: 'resend',
        status: 'failed',
        error: responseBody,
      });
      return NextResponse.json(
        {
          success: false,
          error: 'Failed to subscribe. Please try again later.',
        },
        { status: 500 }
      );
    }

    // No email provider configured - log without the email address
    // In production, you should configure an email provider
    logger.warn('Newsletter subscription (no provider configured)', {
      ...(source && { source }),
    });

    // For development/demo: Store in a simple way or just acknowledge
    if (process.env.NODE_ENV === 'development') {
      const strictFailureResponse = await persistSubmissionOrFail({
        email,
        source,
        provider: 'none',
        status: 'queued',
      });
      if (strictFailureResponse) return strictFailureResponse;
      return NextResponse.json({
        success: true,
        message:
          'Thank you for your interest! (Development mode - configure an email provider for production)',
      });
    }

    // Production without provider - return a clear error so integrations don't silently fail
    logger.warn(
      'Newsletter subscription received but no email provider configured. Please set up Mailchimp, ConvertKit, or Resend.'
    );
    await persistSubmissionOrFail({
      email,
      source,
      provider: 'none',
      status: 'unavailable',
      error: 'No newsletter provider configured',
    });

    return NextResponse.json(
      {
        success: false,
        error:
          'Newsletter service is temporarily unavailable. Please try again later or contact support.',
      },
      { status: 503 }
    );
  } catch (error) {
    logger.error('Newsletter subscription error', {
      error: error instanceof Error ? error.message : String(error),
    });
    return NextResponse.json(
      {
        success: false,
        error: 'An error occurred. Please try again later.',
      },
      { status: 500 }
    );
  }
}
