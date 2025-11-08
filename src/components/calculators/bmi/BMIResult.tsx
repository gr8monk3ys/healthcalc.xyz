'use client';

import React from 'react';
import { BMIResult } from '@/types/bmi';

interface BMIResultDisplayProps {
  result: BMIResult;
  isChild: boolean;
  weightUnit: 'kg' | 'lb';
}

const BMIResultDisplay: React.FC<BMIResultDisplayProps> = ({ result, isChild, weightUnit }) => {
  return (
    <div
      id="bmi-result"
      className="neumorph p-6 rounded-lg transition-all duration-500 transform animate-fade-in"
    >
      <h2 className="text-xl font-semibold mb-4">Your BMI Results</h2>

      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium">BMI Value</span>
          <span className="text-2xl font-bold">{result.bmi.toFixed(1)}</span>
        </div>

        <div className="relative h-6 neumorph-inset rounded-full overflow-hidden">
          <div className="absolute inset-0 flex">
            <div className="h-full bg-blue-200" style={{ width: '20%' }}></div>
            <div className="h-full bg-green-200" style={{ width: '15%' }}></div>
            <div className="h-full bg-yellow-200" style={{ width: '15%' }}></div>
            <div className="h-full bg-orange-200" style={{ width: '15%' }}></div>
            <div className="h-full bg-red-200" style={{ width: '35%' }}></div>
          </div>

          <div
            className="absolute top-0 h-6 w-3 bg-accent rounded-full transform -translate-x-1/2 transition-all duration-500"
            style={{
              left: `${Math.min(Math.max(((result.bmi - 10) / 30) * 100, 0), 100)}%`,
            }}
          ></div>
        </div>

        <div className="flex justify-between text-xs mt-1">
          <span>Underweight</span>
          <span>Normal</span>
          <span>Overweight</span>
          <span>Obese</span>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="font-medium mb-2">
          {isChild ? 'BMI Percentile Classification' : 'BMI Classification'}
        </h3>
        <div className="neumorph-inset p-4 rounded-lg">
          <p className="font-medium text-lg">
            {isChild && result.percentile !== undefined
              ? `${result.percentile}th Percentile - ${result.category}`
              : result.category}
          </p>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="font-medium mb-2">Healthy Weight Range for Your Height</h3>
        <div className="neumorph-inset p-4 rounded-lg">
          <p className="font-medium text-lg">
            {result.healthyWeightRange.min.toFixed(1)} - {result.healthyWeightRange.max.toFixed(1)}{' '}
            {weightUnit}
          </p>
        </div>
      </div>

      <div>
        <h3 className="font-medium mb-2">What This Means</h3>
        <p className="mb-2">
          {isChild && result.percentile !== undefined ? (
            <>
              Your child's BMI is at the {result.percentile}th percentile for their age and sex.
              {result.percentile < 5
                ? ' This is considered underweight. Consult with a healthcare provider to ensure proper growth and nutrition.'
                : result.percentile >= 5 && result.percentile < 85
                  ? ' This is within the healthy weight range.'
                  : result.percentile >= 85 && result.percentile < 95
                    ? ' This is considered overweight. Consider discussing healthy lifestyle habits with a healthcare provider.'
                    : ' This is considered obese. It is recommended to consult with a healthcare provider about healthy weight management strategies.'}
            </>
          ) : (
            <>
              {result.bmi < 18.5
                ? 'Being underweight can be associated with certain health risks including nutrient deficiencies and immune system issues. Consider consulting with a healthcare provider.'
                : result.bmi >= 18.5 && result.bmi < 25
                  ? 'Your BMI is within the healthy range. Maintaining a healthy weight can lower your risk of developing serious health problems.'
                  : result.bmi >= 25 && result.bmi < 30
                    ? 'Being overweight increases your risk of developing health problems such as heart disease, high blood pressure, and type 2 diabetes.'
                    : 'Obesity is associated with higher risks for serious health conditions including heart disease, stroke, type 2 diabetes, and certain cancers.'}
            </>
          )}
        </p>
        <p className="text-sm text-gray-600">
          Note: BMI is a screening tool but does not diagnose body fatness or health. Athletes may
          have a high BMI due to muscle mass. Consult a healthcare provider for a complete health
          assessment.
        </p>
      </div>
    </div>
  );
};

export default BMIResultDisplay;
