'use client';

import React, { useMemo } from 'react';
import { BMIResult } from '@/types/bmi';
import { Gender } from '@/types/common';
import type { BMIPageCopy } from '@/i18n/pages/bmi';
import NextSteps from '@/components/calculators/NextSteps';
import BodyCompositionVisual from '@/components/calculators/BodyCompositionVisual';
import ReviewedBy from '@/components/ReviewedBy';
import { EDITORIAL_TEAM } from '@/constants/reviewers';

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
  percentileTemplate: '{percentile}th Percentile - {category}',
  healthyWeightRangeTitle: 'Healthy Weight Range for Your Height',
  whatThisMeansTitle: 'What This Means',
  childIntroTemplate: "Your child's BMI is at the {percentile}th percentile for their age and sex.",
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

function formatTemplate(template: string, vars: Record<string, string | number>): string {
  let output = template;
  for (const [key, value] of Object.entries(vars)) {
    output = output.replace(new RegExp(`\\{${key}\\}`, 'g'), String(value));
  }
  return output;
}

type ResultTone = 'healthy' | 'caution' | 'elevated';

const TONE_STYLES: Record<ResultTone, { panel: string; value: string; badge: string }> = {
  healthy: {
    panel: 'border-emerald-500/25 bg-emerald-500/[0.07]',
    value: 'text-emerald-600 dark:text-emerald-400',
    badge: 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300',
  },
  caution: {
    panel: 'border-amber-500/25 bg-amber-500/[0.07]',
    value: 'text-amber-600 dark:text-amber-400',
    badge: 'bg-amber-500/15 text-amber-700 dark:text-amber-300',
  },
  elevated: {
    panel: 'border-red-500/25 bg-red-500/[0.07]',
    value: 'text-red-600 dark:text-red-400',
    badge: 'bg-red-500/15 text-red-700 dark:text-red-300',
  },
};

/** Maps a result to a severity tone so the headline number is colour-coded. */
function getResultTone(bmi: number, isChild: boolean, percentile?: number): ResultTone {
  if (isChild && percentile !== undefined) {
    if (percentile < 5) return 'caution';
    if (percentile < 85) return 'healthy';
    if (percentile < 95) return 'caution';
    return 'elevated';
  }

  if (bmi < 18.5) return 'caution';
  if (bmi < 25) return 'healthy';
  if (bmi < 30) return 'caution';
  return 'elevated';
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
        "BMI percentiles for children are interpreted differently than adult BMI. Talk to your pediatrician about your child's growth pattern.",
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
      insight: `Your BMI of ${bmi.toFixed(1)} falls in the underweight category. Building a calorie surplus with balanced nutrition can help you reach a healthier weight.`,
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
      insight: `Your BMI of ${bmi.toFixed(1)} is in the normal range. Staying active and eating well will help you maintain this healthy weight.`,
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
      insight: `Your BMI of ${bmi.toFixed(1)} puts you in the overweight category. A moderate calorie deficit combined with regular exercise is an effective path forward.`,
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
    insight: `Your BMI of ${bmi.toFixed(1)} is in the obese category. Working with a healthcare provider alongside tracking your nutrition can make a real difference.`,
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
  const tone = TONE_STYLES[getResultTone(result.bmi, isChild, result.percentile)];
  const classificationLabel = isChild ? content.classificationChild : content.classificationAdult;
  const classificationValue =
    isChild && result.percentile !== undefined
      ? formatTemplate(content.percentileTemplate, {
          percentile: result.percentile,
          category: result.category,
        })
      : result.category;

  return (
    <div
      id="bmi-result"
      className="neumorph p-6 rounded-lg transition-all duration-500 transform animate-fade-in"
      tabIndex={-1}
      aria-live="polite"
      role="region"
      aria-label={content.title}
    >
      <h2 className="mb-5 text-xl font-bold tracking-tight">{content.title}</h2>

      {/* Headline metric: the number and what it means, read together. */}
      <div className={`mb-6 rounded-2xl border p-5 ${tone.panel}`}>
        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.1em] text-slate-500 dark:text-slate-400">
              {content.bmiValueLabel}
            </p>
            <p
              className={`mt-1 text-5xl font-extrabold leading-none tracking-tight tabular-nums ${tone.value}`}
            >
              {result.bmi.toFixed(1)}
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs font-semibold uppercase tracking-[0.1em] text-slate-500 dark:text-slate-400">
              {classificationLabel}
            </p>
            <span
              className={`mt-1.5 inline-flex rounded-full px-3 py-1 text-sm font-bold ${tone.badge}`}
            >
              {classificationValue}
            </span>
          </div>
        </div>

        <div className="relative mt-5 h-3 overflow-hidden rounded-full bg-white/60 dark:bg-slate-900/40">
          <div className="absolute inset-0 flex">
            <div className="h-full bg-blue-300 dark:bg-blue-500/60" style={{ width: '20%' }}></div>
            <div
              className="h-full bg-emerald-300 dark:bg-emerald-500/60"
              style={{ width: '15%' }}
            ></div>
            <div
              className="h-full bg-amber-300 dark:bg-amber-500/60"
              style={{ width: '15%' }}
            ></div>
            <div
              className="h-full bg-orange-300 dark:bg-orange-500/60"
              style={{ width: '15%' }}
            ></div>
            <div className="h-full bg-red-300 dark:bg-red-500/60" style={{ width: '35%' }}></div>
          </div>

          <div
            className="absolute -top-0.5 h-4 w-4 -translate-x-1/2 rounded-full border-2 border-white bg-slate-900 shadow-md transition-all duration-500 dark:border-slate-900 dark:bg-white"
            style={{
              left: `${Math.min(Math.max(((result.bmi - 10) / 30) * 100, 0), 100)}%`,
            }}
          ></div>
        </div>

        <div className="mt-2 flex justify-between text-[0.7rem] font-medium text-slate-500 dark:text-slate-400">
          <span>{content.gaugeLabels.underweight}</span>
          <span>{content.gaugeLabels.normal}</span>
          <span>{content.gaugeLabels.overweight}</span>
          <span>{content.gaugeLabels.obese}</span>
        </div>
      </div>

      <div className="mb-6 flex items-baseline justify-between gap-4 rounded-xl border border-[var(--card-border)] px-4 py-3.5">
        <h3 className="text-sm font-semibold text-slate-600 dark:text-slate-300">
          {content.healthyWeightRangeTitle}
        </h3>
        <p className="shrink-0 text-lg font-bold tabular-nums">
          {result.healthyWeightRange.min.toFixed(1)} - {result.healthyWeightRange.max.toFixed(1)}{' '}
          <span className="text-sm font-semibold text-slate-500 dark:text-slate-400">
            {weightUnit}
          </span>
        </p>
      </div>

      <BodyCompositionVisual bmi={result.bmi} age={age} gender={gender} className="mb-6" />

      <div>
        <h3 className="font-medium mb-2">{content.whatThisMeansTitle}</h3>
        <p className="mb-2">
          {isChild && result.percentile !== undefined ? (
            <>
              {formatTemplate(content.childIntroTemplate, { percentile: result.percentile })}
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
        <p className="text-sm text-gray-600 dark:text-gray-400">{content.note}</p>
      </div>

      <NextSteps insight={nextStepsData.insight} steps={nextStepsData.steps} />

      <ReviewedBy reviewer={EDITORIAL_TEAM} lastReviewed="2026-02-01" />
    </div>
  );
};

export default BMIResultDisplay;
