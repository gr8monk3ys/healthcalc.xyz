import { NextRequest, NextResponse } from 'next/server';

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

interface SubscribeRequest {
  email: string;
}

interface SubscribeResponse {
  success: boolean;
  message: string;
}

// Email validation regex
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: NextRequest): Promise<NextResponse<SubscribeResponse>> {
  try {
    const body = (await request.json()) as SubscribeRequest;
    const { email } = body;

    // Validate email
    if (!email || !EMAIL_REGEX.test(email)) {
      return NextResponse.json(
        { success: false, message: 'Please provide a valid email address' },
        { status: 400 }
      );
    }

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
          }),
        }
      );

      if (response.ok) {
        return NextResponse.json({
          success: true,
          message:
            'Thank you for subscribing! Please check your email to confirm your subscription.',
        });
      }

      const error = await response.json();
      if (error.title === 'Member Exists') {
        return NextResponse.json({
          success: true,
          message: 'You are already subscribed to our newsletter.',
        });
      }

      console.error('Mailchimp error:', error);
      return NextResponse.json(
        { success: false, message: 'Failed to subscribe. Please try again later.' },
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
        return NextResponse.json({
          success: true,
          message:
            'Thank you for subscribing! Please check your email to confirm your subscription.',
        });
      }

      console.error('ConvertKit error:', await response.text());
      return NextResponse.json(
        { success: false, message: 'Failed to subscribe. Please try again later.' },
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
        return NextResponse.json({
          success: true,
          message: 'Thank you for subscribing! You will receive our latest updates.',
        });
      }

      console.error('Resend error:', await response.text());
      return NextResponse.json(
        { success: false, message: 'Failed to subscribe. Please try again later.' },
        { status: 500 }
      );
    }

    // No email provider configured - log the email for manual processing
    // In production, you should configure an email provider
    console.log('Newsletter subscription (no provider configured):', email);

    // For development/demo: Store in a simple way or just acknowledge
    if (process.env.NODE_ENV === 'development') {
      return NextResponse.json({
        success: true,
        message:
          'Thank you for your interest! (Development mode - configure an email provider for production)',
      });
    }

    // Production without provider - return a clear error so integrations don't silently fail
    console.warn(
      'Newsletter subscription received but no email provider configured. Please set up Mailchimp, ConvertKit, or Resend.'
    );

    return NextResponse.json(
      {
        success: false,
        message:
          'Newsletter service is temporarily unavailable. Please try again later or contact support.',
      },
      { status: 503 }
    );
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return NextResponse.json(
      { success: false, message: 'An error occurred. Please try again later.' },
      { status: 500 }
    );
  }
}
