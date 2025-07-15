import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createLogger } from '@/utils/logger';
import { rateLimit } from '@/utils/rateLimit';
import { verifyCsrf } from '@/utils/csrf';
import {
  isSubmissionPersistenceStrictModeEnabled,
  saveContactSubmission,
} from '@/lib/db/submissions';

const logger = createLogger({ component: 'ContactAPI' });

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Please provide a valid email address'),
  subject: z.enum(['question', 'feedback', 'bug', 'feature', 'other']),
  message: z
    .string()
    .min(10, 'Message must be at least 10 characters')
    .max(5000, 'Message must be less than 5,000 characters'),
});

const SUBJECT_LABELS: Record<string, string> = {
  question: 'General Question',
  feedback: 'Feedback',
  bug: 'Bug Report',
  feature: 'Feature Request',
  other: 'Other',
};

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

interface ContactSuccessResponse {
  success: true;
  message: string;
}

interface ContactErrorResponse {
  success: false;
  error: string;
}

type ContactResponse = ContactSuccessResponse | ContactErrorResponse;

async function persistSubmissionOrFail(
  payload: Parameters<typeof saveContactSubmission>[0]
): Promise<NextResponse<ContactErrorResponse> | null> {
  const persistence = await saveContactSubmission(payload);
  if (persistence.success || !isSubmissionPersistenceStrictModeEnabled()) {
    return null;
  }

  logger.error('Strict persistence mode blocked contact response', {
    driver: persistence.driver,
    error: persistence.error,
  });

  return NextResponse.json(
    {
      success: false,
      error: 'Contact form is temporarily unavailable. Please try again later.',
    },
    { status: 503 }
  );
}

export async function POST(request: NextRequest): Promise<NextResponse<ContactResponse>> {
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
    const parsed = contactSchema.safeParse(body);
    if (!parsed.success) {
      const firstError = parsed.error.issues[0]?.message ?? 'Invalid input';
      return NextResponse.json({ success: false, error: firstError }, { status: 400 });
    }

    const { name, email, subject, message } = parsed.data;

    const resendApiKey = process.env.RESEND_API_KEY?.trim();
    const contactEmail = process.env.CONTACT_EMAIL?.trim() || 'info@healthcalc.xyz';
    const resendFrom =
      process.env.RESEND_FROM_EMAIL?.trim() || 'HealthCheck Contact <noreply@healthcalc.xyz>';

    if (resendApiKey) {
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: resendFrom,
          to: contactEmail,
          reply_to: email,
          subject: `[HealthCheck] ${SUBJECT_LABELS[subject] || subject} from ${name.trim()}`,
          html: `
            <h2>New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${escapeHtml(name.trim())}</p>
            <p><strong>Email:</strong> ${escapeHtml(email)}</p>
            <p><strong>Subject:</strong> ${SUBJECT_LABELS[subject] || escapeHtml(subject)}</p>
            <hr />
            <p><strong>Message:</strong></p>
            <p>${escapeHtml(message.trim()).replace(/\n/g, '<br />')}</p>
          `,
        }),
      });

      if (response.ok) {
        const strictFailureResponse = await persistSubmissionOrFail({
          name,
          email,
          subject,
          message,
          provider: 'resend',
          status: 'sent',
        });
        if (strictFailureResponse) return strictFailureResponse;
        return NextResponse.json({
          success: true,
          message: "Thank you for your message! We'll get back to you within 1-2 business days.",
        });
      }

      const responseBody = await response.text();
      logger.error('Resend email error', {
        responseBody,
      });
      await persistSubmissionOrFail({
        name,
        email,
        subject,
        message,
        provider: 'resend',
        status: 'failed',
        error: responseBody,
      });
      return NextResponse.json(
        {
          success: false,
          error: 'Failed to send message. Please try again later.',
        },
        { status: 500 }
      );
    }

    // No email provider configured
    logger.warn('Contact form submission (no email provider configured)');

    if (process.env.NODE_ENV === 'development') {
      const strictFailureResponse = await persistSubmissionOrFail({
        name,
        email,
        subject,
        message,
        provider: 'none',
        status: 'queued',
      });
      if (strictFailureResponse) return strictFailureResponse;
      return NextResponse.json({
        success: true,
        message: 'Message received! (Development mode - configure RESEND_API_KEY for production)',
      });
    }

    await persistSubmissionOrFail({
      name,
      email,
      subject,
      message,
      provider: 'none',
      status: 'unavailable',
      error: 'No contact provider configured',
    });
    return NextResponse.json(
      {
        success: false,
        error:
          'Contact form is temporarily unavailable. Please email us directly at info@healthcalc.xyz',
      },
      { status: 503 }
    );
  } catch (error) {
    logger.error('Contact form error', {
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
