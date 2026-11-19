'use client';

import React from 'react';
import type { Gender } from '@/types/common';
import { getBodyCompositionReference } from '@/utils/bodyCompositionReference';
import { formatNumber } from '@/utils/formatNumber';

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

function buildModel(bmi: number, bodyFatPercentage: number): SilhouetteModel {
  const widthScale = clamp(0.9 + ((bmi - 22) / 18) * 0.35, 0.7, 1.35);
  const waistScale = clamp(0.82 + ((bodyFatPercentage - 20) / 20) * 0.45, 0.65, 1.45);

  return {
    bmi: roundToOne(bmi),
    bodyFatPercentage: roundToOne(bodyFatPercentage),
    widthScale,
    waistScale,
  };
}

function BodySilhouette({
  model,
  label,
  caption,
  outlined = false,
}: {
  model: SilhouetteModel;
  label: string;
  caption: string;
  outlined?: boolean;
}) {
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

  const body = (
    <>
      <circle cx="60" cy="28" r="18" />
      <path d={torsoPath} />
      <rect x={60 - armOffset} y="72" width="10" height="88" rx="5" />
      <rect x={60 + armOffset - 10} y="72" width="10" height="88" rx="5" />
      <rect x={60 - legHalf - 7} y="176" width={legHalf} height="66" rx="5" />
      <rect x={60 + 7} y="176" width={legHalf} height="66" rx="5" />
    </>
  );

  return (
    <figure className="flex flex-col items-center py-3">
      <figcaption className="mb-2 text-sm font-bold">{label}</figcaption>
      <svg viewBox="0 0 120 250" className="h-48 w-24" role="img" aria-label={caption}>
        {/* The parts overlap, so the outline is the stroked ink figure with the
            paper figure laid over it. */}
        <g fill="var(--ink)" stroke="var(--ink)" strokeWidth="4">
          {body}
        </g>
        {outlined && <g fill="var(--paper)">{body}</g>}
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
    <section className={`border-t-4 border-ink pt-3 ${className}`}>
      <h3 className="mb-1 text-base font-semibold">Body Composition Visual</h3>
      <p className="mb-4 text-sm text-gray-600 dark:text-gray-300">
        A visual comparison of your current composition vs a{' '}
        {hasPersonalizedReference ? 'age and sex adjusted' : 'general'} reference profile.
      </p>

      <div className="grid divide-y divide-ink sm:grid-cols-2 sm:divide-x sm:divide-y-0">
        <BodySilhouette
          model={userModel}
          label="Your Profile"
          caption={`BMI ${formatNumber(userModel.bmi, 1)} • Body fat ${formatNumber(userModel.bodyFatPercentage, 1)}%`}
        />
        <BodySilhouette
          model={referenceModel}
          label={hasPersonalizedReference ? 'Age & Sex Reference' : 'Reference'}
          outlined
          caption={`BMI ${formatNumber(referenceModel.bmi, 1)} • Body fat ${formatNumber(referenceModel.bodyFatPercentage, 1)}%`}
        />
      </div>
    </section>
  );
}
