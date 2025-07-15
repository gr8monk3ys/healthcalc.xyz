import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createLogger } from '@/utils/logger';
import { rateLimit } from '@/utils/rateLimit';
import { verifyCsrf } from '@/utils/csrf';
import {
  isSubmissionPersistenceStrictModeEnabled,
  saveEmbedRequestSubmission,
} from '@/lib/db/submissions';

const logger = createLogger({ component: 'EmbedRequestAPI' });

const CONVERTKIT_API_KEY = process.env.CONVERTKIT_API_KEY;
const CONVERTKIT_FORM_ID = process.env.CONVERTKIT_FORM_ID;

const embedRequestSchema = z.object({
  name: z.string().trim().max(100).default(''),
  email: z.string().email('Please provide a valid email address'),
  website: z.string().trim().max(500).default(''),
  calculator: z.string().trim().max(100).default(''),
  calculatorSlug: z.string().trim().max(100).default(''),
  notes: z.string().trim().max(1000).default(''),
});

interface EmbedSuccessResponse {
  success: true;
  message: string;
}

interface EmbedErrorResponse {
  success: false;
  error: string;
}

type EmbedResponse = EmbedSuccessResponse | EmbedErrorResponse;

async function persistSubmissionOrFail(
  payload: Parameters<typeof saveEmbedRequestSubmission>[0]
): Promise<NextResponse<EmbedErrorResponse> | null> {
  const persistence = await saveEmbedRequestSubmission(payload);
  if (persistence.success || !isSubmissionPersistenceStrictModeEnabled()) {
    return null;
  }

  logger.error('Strict persistence mode blocked embed request response', {
    driver: persistence.driver,
    error: persistence.error,
  });

  return NextResponse.json(
    {
      success: false,
      error: 'Embed request service is temporarily unavailable. Please try again later.',
    },
    { status: 503 }
  );
}

export async function POST(request: NextRequest): Promise<NextResponse<EmbedResponse>> {
  // CSRF protection
  if (!verifyCsrf(request)) {
    return NextResponse.json({ success: false, error: 'Forbidden' }, { status: 403 });
  }

  const rateLimitResult = rateLimit(request, {
    limit: 5,
    windowMs: 60_000,
  });
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
    const payload = await request.json();

    // Validate request body with Zod
    const parsed = embedRequestSchema.safeParse(payload);
    if (!parsed.success) {
      const firstError = parsed.error.issues[0]?.message ?? 'Invalid input';
      return NextResponse.json({ success: false, error: firstError }, { status: 400 });
    }

    const { name, email, website, calculator, calculatorSlug, notes } = parsed.data;

    if (CONVERTKIT_API_KEY && CONVERTKIT_FORM_ID) {
      const response = await fetch(
        `https://api.convertkit.com/v3/forms/${CONVERTKIT_FORM_ID}/subscribe`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            api_key: CONVERTKIT_API_KEY,
            email,
            first_name: name,
            fields: {
              website,
              calculator,
              calculatorSlug,
              notes,
              source: 'embed-request',
            },
          }),
        }
      );

      if (!response.ok) {
        const errorBody = await response.text();
        logger.error('ConvertKit error', { responseBody: errorBody });
        await persistSubmissionOrFail({
          name,
          email,
          website,
          calculator,
          calculatorSlug,
          notes,
          provider: 'convertkit',
          status: 'failed',
          error: errorBody,
        });
        return NextResponse.json(
          {
            success: false,
            error: 'Failed to submit request. Please try again later.',
          },
          { status: 502 }
        );
      }

      const strictFailureResponse = await persistSubmissionOrFail({
        name,
        email,
        website,
        calculator,
        calculatorSlug,
        notes,
        provider: 'convertkit',
        status: 'submitted',
      });
      if (strictFailureResponse) return strictFailureResponse;
    } else {
      logger.warn('Missing ConvertKit config');
      const strictFailureResponse = await persistSubmissionOrFail({
        name,
        email,
        website,
        calculator,
        calculatorSlug,
        notes,
        provider: 'none',
        status: 'queued',
      });
      if (strictFailureResponse) return strictFailureResponse;
    }

    return NextResponse.json({
      success: true,
      message: 'Embed request submitted successfully.',
    });
  } catch (error) {
    logger.error('Embed request failed', {
      error: error instanceof Error ? error.message : String(error),
    });

    if (error instanceof SyntaxError) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid request body. Please provide valid JSON.',
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: 'An internal error occurred. Please try again later.',
      },
      { status: 500 }
    );
  }
}
