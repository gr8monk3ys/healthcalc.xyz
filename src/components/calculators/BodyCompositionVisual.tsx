'use client';

import React from 'react';
import type { Gender } from '@/types/common';
import { getBodyCompositionReference } from '@/utils/bodyCompositionReference';

interface BodyCompositionVisualProps {
  bmi?: number;
  bodyFatPercentage?: number;
  age?: number;
  gender?: Gender;
  className?: string;
}

interface SilhouetteModel {
  bmi: number;
  bodyFatPercentage: number;
  widthScale: number;
  waistScale: number;
  fill: string;
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

function roundToOne(value: number): number {
  return Math.round(value * 10) / 10;
}

function estimateBodyFatFromBmi(bmi: number): number {
  return clamp(1.2 * bmi - 10, 8, 45);
}

function getFillForBodyFat(bodyFatPercentage: number): string {
  if (bodyFatPercentage < 14) return '#10B981';
  if (bodyFatPercentage < 24) return '#22C55E';
  if (bodyFatPercentage < 30) return '#F59E0B';
  return '#EF4444';
}

function buildModel(bmi: number, bodyFatPercentage: number): SilhouetteModel {
  const widthScale = clamp(0.9 + ((bmi - 22) / 18) * 0.35, 0.7, 1.35);
  const waistScale = clamp(0.82 + ((bodyFatPercentage - 20) / 20) * 0.45, 0.65, 1.45);
  const fill = getFillForBodyFat(bodyFatPercentage);

  return {
    bmi: roundToOne(bmi),
    bodyFatPercentage: roundToOne(bodyFatPercentage),
    widthScale,
    waistScale,
    fill,
  };
}

function BodySilhouette({
  model,
  label,
  caption,
}: {
  model: SilhouetteModel;
  label: string;
  caption: string;
}) {
  const gradientId = `body-grad-${label.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
  const shoulderHalf = 26 * model.widthScale;
  const waistHalf = 14 * model.waistScale;
  const hipHalf = 20 * model.widthScale;
  const armOffset = shoulderHalf + 7;
  const legHalf = 8 + (model.widthScale - 1) * 5;

  const torsoPath = [
    `M ${60 - shoulderHalf} 58`,
    `L ${60 + shoulderHalf} 58`,
    `L ${60 + waistHalf} 126`,
    `L ${60 + hipHalf} 176`,
    `L ${60 - hipHalf} 176`,
    `L ${60 - waistHalf} 126`,
    'Z',
  ].join(' ');

  return (
    <figure className="flex flex-col items-center rounded-xl border border-slate-200/60 p-3 dark:border-slate-700/70">
      <figcaption className="mb-2 text-xs font-semibold uppercase tracking-wide opacity-60">
        {label}
      </figcaption>
      <svg viewBox="0 0 120 250" className="h-48 w-24" role="img" aria-label={caption}>
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={model.fill} stopOpacity="0.95" />
            <stop offset="100%" stopColor={model.fill} stopOpacity="0.55" />
          </linearGradient>
        </defs>

        <circle cx="60" cy="28" r="18" fill={`url(#${gradientId})`} />
        <path d={torsoPath} fill={`url(#${gradientId})`} />

        <rect
          x={60 - armOffset}
          y="72"
          width="10"
          height="88"
          rx="5"
          fill={`url(#${gradientId})`}
        />
        <rect
          x={60 + armOffset - 10}
          y="72"
          width="10"
          height="88"
          rx="5"
          fill={`url(#${gradientId})`}
        />

        <rect
          x={60 - legHalf - 7}
          y="176"
          width={legHalf}
          height="66"
          rx="5"
          fill={`url(#${gradientId})`}
        />
        <rect x={60 + 7} y="176" width={legHalf} height="66" rx="5" fill={`url(#${gradientId})`} />
      </svg>
      <p className="mt-2 text-center text-xs text-gray-600 dark:text-gray-300">{caption}</p>
    </figure>
  );
}

export default function BodyCompositionVisual({
  bmi,
  bodyFatPercentage,
  age,
  gender,
  className = '',
}: BodyCompositionVisualProps): React.JSX.Element | null {
  const activeBmi = typeof bmi === 'number' ? bmi : null;
  const activeBodyFat =
    typeof bodyFatPercentage === 'number'
      ? bodyFatPercentage
      : activeBmi !== null
        ? estimateBodyFatFromBmi(activeBmi)
        : null;

  if (activeBmi === null && activeBodyFat === null) {
    return null;
  }

  const personalizedReference = getBodyCompositionReference({ age, gender });
  const hasPersonalizedReference = typeof age === 'number' || typeof gender === 'string';
  const userModel = buildModel(activeBmi ?? 22, activeBodyFat ?? 22);
  const referenceModel = buildModel(
    personalizedReference.bmi,
    personalizedReference.bodyFatPercentage
  );

  return (
    <section
      className={`rounded-xl border border-slate-200/70 p-4 dark:border-slate-700/70 ${className}`}
    >
      <h3 className="mb-1 text-base font-semibold">Body Composition Visual</h3>
      <p className="mb-4 text-sm text-gray-600 dark:text-gray-300">
        A visual comparison of your current composition vs a{' '}
        {hasPersonalizedReference ? 'age and sex adjusted' : 'general'} reference profile.
      </p>

      <div className="grid gap-3 sm:grid-cols-2">
        <BodySilhouette
          model={userModel}
          label="Your Profile"
          caption={`BMI ${userModel.bmi.toFixed(1)} • Body fat ${userModel.bodyFatPercentage.toFixed(1)}%`}
        />
        <BodySilhouette
          model={referenceModel}
          label={hasPersonalizedReference ? 'Age & Sex Reference' : 'Reference'}
          caption={`BMI ${referenceModel.bmi.toFixed(1)} • Body fat ${referenceModel.bodyFatPercentage.toFixed(1)}%`}
        />
      </div>
    </section>
  );
}
