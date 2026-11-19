'use client';

import React, { useMemo } from 'react';
import { BMIResult } from '@/types/bmi';
import { Gender } from '@/types/common';
import type { BMIPageCopy } from '@/i18n/pages/bmi';
import NextSteps from '@/components/calculators/NextSteps';
import BodyCompositionVisual from '@/components/calculators/BodyCompositionVisual';
import ReviewedBy from '@/components/ReviewedBy';
import { EDITORIAL_TEAM } from '@/constants/reviewers';
import { formatNumber, formatOrdinal } from '@/utils/formatNumber';
import { BMI_GAUGE_SEGMENTS, getBMIGaugePosition } from './bmiGauge';

interface BMIResultDisplayProps {
  result: BMIResult;
  isChild: boolean;
  age?: number;
  gender?: Gender;
  weightUnit: 'kg' | 'lb';
  copy?: BMIPageCopy['result'];
}

const FALLBACK_COPY: BMIPageCopy['result'] = {
  title: 'Your BMI Results',
  bmiValueLabel: 'BMI Value',
  gaugeLabels: {
    underweight: 'Underweight',
    normal: 'Normal',
    overweight: 'Overweight',
    obese: 'Obese',
  },
  classificationAdult: 'BMI Classification',
  classificationChild: 'BMI Percentile Classification',
  percentileTemplate: '{ordinal} Percentile - {category}',
  healthyWeightRangeTitle: 'Healthy Weight Range for Your Height',
  whatThisMeansTitle: 'What This Means',
  childIntroTemplate: 'Your child’s BMI is at the {ordinal} percentile for their age and sex.',
  childUnderweight:
    'This is considered underweight. Consult with a healthcare provider to ensure proper growth and nutrition.',
  childHealthy: 'This is within the healthy weight range.',
  childOverweight:
    'This is considered overweight. Consider discussing healthy lifestyle habits with a healthcare provider.',
  childObese:
    'This is considered obese. It is recommended to consult with a healthcare provider about healthy weight management strategies.',
  adultUnderweight:
    'Being underweight can be associated with certain health risks including nutrient deficiencies and immune system issues. Consider consulting with a healthcare provider.',
  adultNormal:
    'Your BMI is within the healthy range. Maintaining a healthy weight can lower your risk of developing serious health problems.',
  adultOverweight:
    'Being overweight increases your risk of developing health problems such as heart disease, high blood pressure, and type 2 diabetes.',
  adultObese:
    'Obesity is associated with higher risks for serious health conditions including heart disease, stroke, type 2 diabetes, and certain cancers.',
  note: 'Note: BMI is a screening tool but does not diagnose body fatness or health. Athletes may have a high BMI due to muscle mass. Consult a healthcare provider for a complete health assessment.',
};

const GAUGE_COLUMNS = BMI_GAUGE_SEGMENTS.map(
  ({ from, to }) => `minmax(min-content, ${to - from}fr)`
).join(' ');

function formatTemplate(template: string, vars: Record<string, string | number>): string {
  let output = template;
  for (const [key, value] of Object.entries(vars)) {
    output = output.replaceAll(`{${key}}`, String(value));
  }
  return output;
}

function getBMINextSteps(
  bmi: number,
  isChild: boolean
): {
  insight: string;
  steps: { label: string; description: string; href: string; highlight?: boolean }[];
} {
  if (isChild) {
    return {
      insight:
        'BMI percentiles for children are interpreted differently than adult BMI. Talk to your pediatrician about your child’s growth pattern.',
      steps: [
        {
          label: 'Calorie Calculator',
          description: 'Estimate daily calorie needs for growth and activity',
          href: '/calorie',
          highlight: true,
        },
        {
          label: 'Macro Calculator',
          description: 'Find the right balance of protein, carbs, and fat',
          href: '/macro',
        },
      ],
    };
  }

  if (bmi < 18.5) {
    return {
      insight: `Your BMI of ${formatNumber(bmi, 1)} falls in the underweight category. Building a calorie surplus with balanced nutrition can help you reach a healthier weight.`,
      steps: [
        {
          label: 'Calorie Calculator',
          description: 'Find out how many calories you need to gain weight safely',
          href: '/calorie',
          highlight: true,
        },
        {
          label: 'Macro Calculator',
          description: 'Get a protein, carb, and fat breakdown for weight gain',
          href: '/macro',
        },
        {
          label: 'TDEE Calculator',
          description: 'Understand your total daily energy expenditure',
          href: '/tdee',
        },
      ],
    };
  }

  if (bmi < 25) {
    return {
      insight: `Your BMI of ${formatNumber(bmi, 1)} is in the normal range. Staying active and eating well will help you maintain this healthy weight.`,
      steps: [
        {
          label: 'TDEE Calculator',
          description: 'Know your maintenance calories to stay on track',
          href: '/tdee',
          highlight: true,
        },
        {
          label: 'Body Fat Calculator',
          description: 'Get a more detailed picture of your body composition',
          href: '/body-fat',
        },
        {
          label: 'Macro Calculator',
          description: 'Optimize your nutrition for energy and performance',
          href: '/macro',
        },
      ],
    };
  }

  if (bmi < 30) {
    return {
      insight: `Your BMI of ${formatNumber(bmi, 1)} puts you in the overweight category. A moderate calorie deficit combined with regular exercise is an effective path forward.`,
      steps: [
        {
          label: 'Calorie Deficit Calculator',
          description: 'Build a sustainable plan to lose weight',
          href: '/calorie-deficit',
          highlight: true,
        },
        {
          label: 'TDEE Calculator',
          description: 'Calculate how many calories you burn each day',
          href: '/tdee',
        },
        {
          label: 'Weight Management',
          description: 'Set realistic weight goals and timelines',
          href: '/weight-management',
        },
      ],
    };
  }

  return {
    insight: `Your BMI of ${formatNumber(bmi, 1)} is in the obese category. Working with a healthcare provider alongside tracking your nutrition can make a real difference.`,
    steps: [
      {
        label: 'Calorie Deficit Calculator',
        description: 'Create a safe, gradual weight loss plan',
        href: '/calorie-deficit',
        highlight: true,
      },
      {
        label: 'Maximum Fat Loss Calculator',
        description: 'Find the fastest safe rate of weight loss for your body',
        href: '/maximum-fat-loss',
      },
      {
        label: 'Weight Management',
        description: 'Plan long-term weight goals with realistic timelines',
        href: '/weight-management',
      },
    ],
  };
}

const BMIResultDisplay: React.FC<BMIResultDisplayProps> = ({
  result,
  isChild,
  age,
  gender,
  weightUnit,
  copy,
}) => {
  const content = copy ?? FALLBACK_COPY;

  const nextStepsData = useMemo(() => getBMINextSteps(result.bmi, isChild), [result.bmi, isChild]);
  const gauge = getBMIGaugePosition(result.bmi);
  const classificationLabel = isChild ? content.classificationChild : content.classificationAdult;
  const classificationValue =
    isChild && result.percentile !== undefined
      ? formatTemplate(content.percentileTemplate, {
          percentile: result.percentile,
          ordinal: formatOrdinal(result.percentile),
          category: result.category,
        })
      : result.category;

  return (
    <div
      id="bmi-result"
      className="neumorph p-6 animate-fade-in"
      tabIndex={-1}
      aria-live="polite"
      role="region"
      aria-label={content.title}
    >
      <h2>{content.title}</h2>

      <div className="facts-row facts-row--figure">
        <span>{content.bmiValueLabel}</span>
        <span>{formatNumber(result.bmi, 1)}</span>
      </div>
      <div className="facts-row">
        <span>{classificationLabel}</span>
        <span className="facts-mark">{classificationValue}</span>
      </div>

      {/* Bar cells and labels share the columns; the marker sits inside its own
          segment, so it cannot land over a neighbouring one. */}
      <div
        className="mb-4 mt-3 grid text-center text-[0.6875rem] font-semibold"
        style={{ gridTemplateColumns: GAUGE_COLUMNS }}
      >
        {BMI_GAUGE_SEGMENTS.map((segment, index) => (
          <div
            key={segment.key}
            className={`relative h-3 border border-ink ${index > 0 ? 'border-l-0' : ''} ${
              segment.key === gauge.segment ? 'bg-mark' : ''
            }`}
          >
            {segment.key === gauge.segment && (
              <span
                className="absolute -inset-y-1 w-1 -translate-x-1/2 bg-[#0b0b0b] dark:outline dark:outline-1 dark:outline-[#f6f3ea]"
                style={{ left: `${gauge.offset}%` }}
              />
            )}
          </div>
        ))}
        {BMI_GAUGE_SEGMENTS.map(segment => (
          <span key={segment.key} className="px-0.5 pt-1.5">
            {content.gaugeLabels[segment.key]}
          </span>
        ))}
      </div>

      <div className="facts-row mb-6">
        <span>{content.healthyWeightRangeTitle}</span>
        <span className="shrink-0 font-bold">
          {formatNumber(result.healthyWeightRange.min, 1)} -{' '}
          {formatNumber(result.healthyWeightRange.max, 1)}{' '}
          <span className="font-normal">{weightUnit}</span>
        </span>
      </div>

      <BodyCompositionVisual bmi={result.bmi} age={age} gender={gender} className="mb-6" />

      <h3 className="border-t-4 border-ink pt-2">{content.whatThisMeansTitle}</h3>
      <p className="mt-2">
        {isChild && result.percentile !== undefined ? (
          <>
            {formatTemplate(content.childIntroTemplate, {
              percentile: result.percentile,
              ordinal: formatOrdinal(result.percentile),
            })}
            {result.percentile < 5
              ? ` ${content.childUnderweight}`
              : result.percentile >= 5 && result.percentile < 85
                ? ` ${content.childHealthy}`
                : result.percentile >= 85 && result.percentile < 95
                  ? ` ${content.childOverweight}`
                  : ` ${content.childObese}`}
          </>
        ) : (
          <>
            {result.bmi < 18.5
              ? content.adultUnderweight
              : result.bmi >= 18.5 && result.bmi < 25
                ? content.adultNormal
                : result.bmi >= 25 && result.bmi < 30
                  ? content.adultOverweight
                  : content.adultObese}
          </>
        )}
      </p>

      <NextSteps insight={nextStepsData.insight} steps={nextStepsData.steps} />

      <ReviewedBy reviewer={EDITORIAL_TEAM} lastReviewed="2026-02-01" />

      <p className="facts-note mt-6">{content.note}</p>
    </div>
  );
};

export default BMIResultDisplay;
