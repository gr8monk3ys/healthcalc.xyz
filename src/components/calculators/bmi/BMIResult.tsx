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

  return (
    <div
      id="bmi-result"
      className="neumorph p-6 rounded-lg transition-all duration-500 transform animate-fade-in"
      tabIndex={-1}
      aria-live="polite"
      role="region"
      aria-label={content.title}
    >
      <h2 className="text-xl font-semibold mb-4">{content.title}</h2>

      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium">{content.bmiValueLabel}</span>
          <span className="text-2xl font-bold">{result.bmi.toFixed(1)}</span>
        </div>

        <div className="relative h-6 neumorph-inset rounded-full overflow-hidden">
          <div className="absolute inset-0 flex">
            <div className="h-full bg-blue-200 dark:bg-blue-800" style={{ width: '20%' }}></div>
            <div className="h-full bg-green-200 dark:bg-green-800" style={{ width: '15%' }}></div>
            <div className="h-full bg-yellow-200 dark:bg-yellow-800" style={{ width: '15%' }}></div>
            <div className="h-full bg-orange-200 dark:bg-orange-800" style={{ width: '15%' }}></div>
            <div className="h-full bg-red-200 dark:bg-red-800" style={{ width: '35%' }}></div>
          </div>

          <div
            className="absolute top-0 h-6 w-3 bg-accent rounded-full transform -translate-x-1/2 transition-all duration-500"
            style={{
              left: `${Math.min(Math.max(((result.bmi - 10) / 30) * 100, 0), 100)}%`,
            }}
          ></div>
        </div>

        <div className="flex justify-between text-xs mt-1">
          <span>{content.gaugeLabels.underweight}</span>
          <span>{content.gaugeLabels.normal}</span>
          <span>{content.gaugeLabels.overweight}</span>
          <span>{content.gaugeLabels.obese}</span>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="font-medium mb-2">
          {isChild ? content.classificationChild : content.classificationAdult}
        </h3>
        <div className="neumorph-inset p-4 rounded-lg">
          <p className="font-medium text-lg">
            {isChild && result.percentile !== undefined
              ? formatTemplate(content.percentileTemplate, {
                  percentile: result.percentile,
                  category: result.category,
                })
              : result.category}
          </p>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="font-medium mb-2">{content.healthyWeightRangeTitle}</h3>
        <div className="neumorph-inset p-4 rounded-lg">
          <p className="font-medium text-lg">
            {result.healthyWeightRange.min.toFixed(1)} - {result.healthyWeightRange.max.toFixed(1)}{' '}
            {weightUnit}
          </p>
        </div>
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
