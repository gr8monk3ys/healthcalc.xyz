import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';
import {
  buildSharedResultSummary,
  decodeSharedResultToken,
  isSupportedShareCalculator,
  type ShareCalculatorSlug,
  type SharedResultSummary,
} from '@/utils/resultSharing';

export const runtime = 'edge';
export const alt = 'HealthCheck shared result';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

const FALLBACK_TITLES: Record<ShareCalculatorSlug, string> = {
  bmi: 'BMI Calculator',
  tdee: 'TDEE Calculator',
  'calorie-deficit': 'Calorie Deficit Calculator',
  'body-fat': 'Body Fat Calculator',
  macro: 'Macro Calculator',
  'fitness-age': 'Fitness Age Quiz',
};

function getFallbackSummary(calculator: ShareCalculatorSlug): SharedResultSummary {
  return {
    calculator,
    title: FALLBACK_TITLES[calculator],
    description: 'Calculate your personalized result on HealthCheck.',
    primaryValue: 'HealthCheck',
    secondaryValue: FALLBACK_TITLES[calculator],
    detail: 'healthcalc.xyz',
    accentColor: '#4F46E5',
  };
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ calculator: string }> }
): Promise<ImageResponse> {
  const { calculator } = await params;

  const calculatorSlug: ShareCalculatorSlug = isSupportedShareCalculator(calculator)
    ? calculator
    : 'bmi';

  const url = new URL(request.url);
  const token = url.searchParams.get('r');
  const payload = decodeSharedResultToken(token);

  const summary =
    payload && payload.c === calculatorSlug
      ? buildSharedResultSummary(payload)
      : getFallbackSummary(calculatorSlug);

  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '56px 64px',
        background:
          'radial-gradient(circle at 10% 10%, rgba(79, 70, 229, 0.26), transparent 36%), radial-gradient(circle at 90% 0%, rgba(16, 185, 129, 0.2), transparent 42%), linear-gradient(135deg, #EEF2FF 0%, #F8FAFC 48%, #ECFEFF 100%)',
        color: '#0F172A',
        fontFamily: 'Inter, Arial, sans-serif',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 12,
            padding: '10px 18px',
            borderRadius: 999,
            background: 'rgba(255,255,255,0.78)',
            border: '1px solid rgba(79,70,229,0.22)',
            fontSize: 24,
            fontWeight: 600,
          }}
        >
          <div
            style={{
              width: 16,
              height: 16,
              borderRadius: 999,
              background: summary.accentColor,
            }}
          />
          HealthCheck Shared Result
        </div>
        <div
          style={{
            fontSize: 24,
            color: '#334155',
            fontWeight: 500,
          }}
        >
          healthcalc.xyz
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <div
          style={{
            fontSize: 60,
            fontWeight: 800,
            lineHeight: 1.04,
            letterSpacing: -1.4,
            maxWidth: 1000,
          }}
        >
          {summary.title}
        </div>

        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            alignSelf: 'flex-start',
            borderRadius: 18,
            padding: '16px 22px',
            background: 'rgba(255,255,255,0.82)',
            border: '1px solid rgba(15,23,42,0.08)',
            fontSize: 30,
            fontWeight: 700,
            color: '#1E293B',
          }}
        >
          {summary.primaryValue}
        </div>

        <div style={{ fontSize: 34, fontWeight: 600, color: '#1F2937' }}>
          {summary.secondaryValue}
        </div>
        <div style={{ fontSize: 24, color: '#475569' }}>{summary.detail}</div>
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          gap: 24,
        }}
      >
        <div
          style={{
            fontSize: 22,
            color: '#334155',
            lineHeight: 1.35,
            maxWidth: 820,
          }}
        >
          {summary.description}
        </div>

        <div
          style={{
            width: 88,
            height: 12,
            borderRadius: 999,
            background: summary.accentColor,
          }}
        />
      </div>
    </div>,
    {
      ...size,
    }
  );
}
