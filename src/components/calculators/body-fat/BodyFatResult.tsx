'use client';

import React, { useMemo } from 'react';
import { BodyFatResult } from '@/types/bodyFat';
import { Gender, WeightUnit } from '@/types/common';
import { BODY_FAT_CATEGORIES } from '@/constants/bodyFat';
import NextSteps from '@/components/calculators/NextSteps';
import BodyCompositionVisual from '@/components/calculators/BodyCompositionVisual';
import ReviewedBy from '@/components/ReviewedBy';
import { EDITORIAL_TEAM } from '@/constants/reviewers';

interface BodyFatResultDisplayProps {
  result: BodyFatResult;
  age?: number;
  gender: Gender;
  weightUnit: WeightUnit;
  method: string;
}

function getBodyFatNextSteps(
  bodyFatPercentage: number,
  healthyRange: { min: number; max: number }
): {
  insight: string;
  steps: { label: string; description: string; href: string; highlight?: boolean }[];
} {
  const isBelow = bodyFatPercentage < healthyRange.min;
  const isAbove = bodyFatPercentage > healthyRange.max;

  if (isBelow) {
    return {
      insight: `At ${bodyFatPercentage.toFixed(1)}% body fat, you are below the recommended range. If you are an athlete this may be expected during competition, but it is worth monitoring your health closely.`,
      steps: [
        {
          label: 'FFMI Calculator',
          description: 'Evaluate your muscular development relative to your frame',
          href: '/ffmi',
          highlight: true,
        },
        {
          label: 'TDEE Calculator',
          description: 'Make sure you are eating enough to support your activity',
          href: '/tdee',
        },
        {
          label: 'Macro Calculator',
          description: 'Dial in your nutrition for performance and recovery',
          href: '/macro',
        },
      ],
    };
  }

  if (isAbove) {
    return {
      insight: `At ${bodyFatPercentage.toFixed(1)}% body fat, you are above the recommended range. A combination of calorie management and resistance training is the most effective approach.`,
      steps: [
        {
          label: 'Body Recomposition',
          description: 'Lose fat and build muscle at the same time',
          href: '/body-recomposition',
          highlight: true,
        },
        {
          label: 'TDEE Calculator',
          description: 'Find your daily calorie needs to plan a deficit',
          href: '/tdee',
        },
        {
          label: 'Calorie Deficit Calculator',
          description: 'Create a sustainable fat loss plan',
          href: '/calorie-deficit',
        },
      ],
    };
  }

  return {
    insight: `At ${bodyFatPercentage.toFixed(1)}% body fat, you are within the healthy range. These tools can help you fine-tune your fitness and nutrition.`,
    steps: [
      {
        label: 'FFMI Calculator',
        description: 'Check your muscular development relative to your height',
        href: '/ffmi',
        highlight: true,
      },
      {
        label: 'Body Recomposition',
        description: 'Optimize your body composition by trading fat for muscle',
        href: '/body-recomposition',
      },
      {
        label: 'TDEE Calculator',
        description: 'Calculate your daily calorie needs',
        href: '/tdee',
      },
    ],
  };
}

const BodyFatResultDisplay: React.FC<BodyFatResultDisplayProps> = ({
  result,
  age,
  gender,
  weightUnit,
  method,
}) => {
  const nextStepsData = useMemo(
    () => getBodyFatNextSteps(result.bodyFatPercentage, result.healthyRange),
    [result.bodyFatPercentage, result.healthyRange]
  );

  // Get the appropriate gauge segments based on gender
  const getGaugePosition = () => {
    // Calculate position on the gauge (0-100%)
    const maxValue = gender === 'male' ? 35 : 45;
    const position = Math.min(Math.max((result.bodyFatPercentage / maxValue) * 100, 0), 100);
    return position;
  };

  // Get category description
  const getCategoryDescription = () => {
    const category = BODY_FAT_CATEGORIES.find(cat => cat.name === result.category);
    return category?.description || '';
  };

  return (
    <div
      id="body-fat-result"
      className="neumorph p-6 rounded-lg transition-all duration-500 transform animate-fade-in"
    >
      <h2 className="text-xl font-semibold mb-4">Your Body Fat Results</h2>

      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium">Body Fat Percentage</span>
          <span className="text-2xl font-bold">{result.bodyFatPercentage.toFixed(1)}%</span>
        </div>

        <div className="relative h-6 neumorph-inset rounded-full overflow-hidden">
          <div className="absolute inset-0 flex">
            <div className="h-full bg-blue-200 dark:bg-blue-800" style={{ width: '15%' }}></div>
            <div className="h-full bg-green-200 dark:bg-green-800" style={{ width: '25%' }}></div>
            <div className="h-full bg-yellow-200 dark:bg-yellow-800" style={{ width: '20%' }}></div>
            <div className="h-full bg-red-200 dark:bg-red-800" style={{ width: '40%' }}></div>
          </div>

          <div
            className="absolute top-0 h-6 w-3 bg-accent rounded-full transform -translate-x-1/2 transition-all duration-500"
            style={{
              left: `${getGaugePosition()}%`,
            }}
          ></div>
        </div>

        <div className="flex justify-between text-xs mt-1">
          <span>Essential</span>
          <span>Athletic</span>
          <span>Fitness</span>
          <span>Average</span>
          <span>Obese</span>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="font-medium mb-2">Classification</h3>
        <div className="neumorph-inset p-4 rounded-lg">
          <p className="font-medium text-lg">{result.category}</p>
          <p className="text-sm text-gray-600 mt-1 dark:text-gray-400">
            {getCategoryDescription()}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="neumorph-inset p-4 rounded-lg">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Fat Mass</h3>
          <p className="text-2xl font-bold">
            {result.fatMass.toFixed(1)} {weightUnit}
          </p>
          <p className="text-xs text-gray-500 mt-1 dark:text-gray-400">Total weight of body fat</p>
        </div>

        <div className="neumorph-inset p-4 rounded-lg">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Lean Mass</h3>
          <p className="text-2xl font-bold">
            {result.leanMass.toFixed(1)} {weightUnit}
          </p>
          <p className="text-xs text-gray-500 mt-1 dark:text-gray-400">
            Weight of muscle, bone, organs, etc.
          </p>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="font-medium mb-2">Healthy Range for Your Gender</h3>
        <div className="neumorph-inset p-4 rounded-lg">
          <p className="font-medium text-lg">
            {result.healthyRange.min.toFixed(1)}% - {result.healthyRange.max.toFixed(1)}%
          </p>
          <p className="text-sm text-gray-600 mt-1 dark:text-gray-400">
            Based on {gender === 'male' ? 'male' : 'female'} fitness standards
          </p>
        </div>
      </div>

      <BodyCompositionVisual
        bodyFatPercentage={result.bodyFatPercentage}
        age={age}
        gender={gender}
        className="mb-6"
      />

      <div>
        <h3 className="font-medium mb-2">What This Means</h3>
        <p className="mb-2">
          {result.bodyFatPercentage < result.healthyRange.min
            ? `Your body fat percentage is below the healthy range for your gender. While having low body fat can be beneficial for certain athletic performances, having too little body fat can negatively impact hormone production, immune function, and overall health.`
            : result.bodyFatPercentage <= result.healthyRange.max
              ? `Your body fat percentage is within the healthy range for your gender. This level of body fat is associated with good health and physical performance.`
              : `Your body fat percentage is above the recommended range for your gender. Excess body fat, especially around the abdomen, is associated with increased health risks including heart disease, type 2 diabetes, and certain cancers.`}
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Note: This calculation is based on the {method} method, which provides an estimate. For
          the most accurate body fat measurement, consider methods like DEXA scans or hydrostatic
          weighing performed by healthcare professionals.
        </p>
      </div>

      <NextSteps insight={nextStepsData.insight} steps={nextStepsData.steps} />

      <ReviewedBy reviewer={EDITORIAL_TEAM} lastReviewed="2026-02-01" />
    </div>
  );
};

export default BodyFatResultDisplay;
