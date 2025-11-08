'use client';

import React from 'react';
import { ABSIResult } from '@/types/absi';
import { getWaistHeightRatioCategory } from '@/app/api/absi';

interface ABSIResultDisplayProps {
  result: ABSIResult;
}

const ABSIResultDisplay: React.FC<ABSIResultDisplayProps> = ({ result }) => {
  // Format ABSI value to 4 decimal places
  const formattedABSI = result.absi.toFixed(4);

  // Format z-score to 2 decimal places
  const formattedZScore = result.absiZScore.toFixed(2);

  // Get waist-to-height ratio category
  const waistHeightRatioCategory = getWaistHeightRatioCategory(result.waistHeightRatio);

  // Calculate position on the gauge (0-100%)
  const getZScorePosition = () => {
    // Map z-score from -3 to 3 to 0-100%
    const position = ((result.absiZScore + 3) / 6) * 100;
    return Math.min(Math.max(position, 0), 100);
  };

  return (
    <div
      id="absi-result"
      className="neumorph p-6 rounded-lg transition-all duration-500 transform animate-fade-in"
    >
      <h2 className="text-xl font-semibold mb-4">Your ABSI Results</h2>

      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium">ABSI Value</span>
          <span className="text-2xl font-bold">{formattedABSI}</span>
        </div>

        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium">ABSI Z-Score</span>
          <span className="text-2xl font-bold">{formattedZScore}</span>
        </div>

        <div className="relative h-6 neumorph-inset rounded-full overflow-hidden mt-4">
          <div className="absolute inset-0 flex">
            <div className="h-full bg-green-200" style={{ width: '20%' }}></div>
            <div className="h-full bg-green-100" style={{ width: '15%' }}></div>
            <div className="h-full bg-yellow-100" style={{ width: '30%' }}></div>
            <div className="h-full bg-orange-100" style={{ width: '15%' }}></div>
            <div className="h-full bg-red-100" style={{ width: '20%' }}></div>
          </div>

          <div
            className="absolute top-0 h-6 w-3 bg-accent rounded-full transform -translate-x-1/2 transition-all duration-500"
            style={{
              left: `${getZScorePosition()}%`,
            }}
          ></div>
        </div>

        <div className="flex justify-between text-xs mt-1">
          <span>Very Low</span>
          <span>Low</span>
          <span>Average</span>
          <span>High</span>
          <span>Very High</span>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="font-medium mb-2">Risk Category</h3>
        <div className="neumorph-inset p-4 rounded-lg">
          <p className="font-medium text-lg">{result.riskCategory}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="neumorph-inset p-4 rounded-lg">
          <h3 className="text-sm font-medium text-gray-500">BMI</h3>
          <p className="text-2xl font-bold">{result.bmi.toFixed(1)}</p>
          <p className="text-xs text-gray-500 mt-1">Category: {result.bmiCategory}</p>
        </div>

        <div className="neumorph-inset p-4 rounded-lg">
          <h3 className="text-sm font-medium text-gray-500">Waist-to-Height Ratio</h3>
          <p className="text-2xl font-bold">{result.waistHeightRatio.toFixed(2)}</p>
          <p className="text-xs text-gray-500 mt-1">Category: {waistHeightRatioCategory.name}</p>
        </div>
      </div>

      <div>
        <h3 className="font-medium mb-2">What This Means</h3>
        <p className="mb-2">
          ABSI (A Body Shape Index) measures the health risk associated with your waist
          circumference relative to your height and weight. It's particularly useful for assessing
          the risks of central obesity (excess abdominal fat).
        </p>
        <p className="mb-2">
          Your ABSI z-score of {formattedZScore} indicates that your ABSI is{' '}
          {result.absiZScore > 0 ? 'above' : 'below'} the average for your age and gender.{' '}
          {result.absiZScore > 0 ? 'Higher' : 'Lower'} ABSI values are associated with{' '}
          {result.absiZScore > 0 ? 'higher' : 'lower'} mortality risk.
        </p>
        <p className="text-sm text-gray-600">
          Note: ABSI is a screening tool, not a diagnostic measure. For a comprehensive health
          assessment, consult with healthcare professionals.
        </p>
      </div>
    </div>
  );
};

export default ABSIResultDisplay;
