'use client';

import React from 'react';

interface TDEEResultProps {
  result: {
    bmr: number;
    tdee: number;
    activityMultiplier: number;
    dailyCalories: {
      maintain: number;
      mildLoss: number;
      moderateLoss: number;
      extremeLoss: number;
      mildGain: number;
      moderateGain: number;
      extremeGain: number;
    };
  };
}

const TDEEResult: React.FC<TDEEResultProps> = ({ result }) => {
  return (
    <div
      id="tdee-result"
      className="neumorph p-6 rounded-lg transition-all duration-500 transform animate-fade-in"
    >
      <h2 className="text-xl font-semibold mb-4">Your TDEE Results</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="neumorph-inset p-4 rounded-lg">
          <h3 className="text-sm font-medium text-gray-500">Basal Metabolic Rate (BMR)</h3>
          <p className="text-2xl font-bold">{result.bmr} calories/day</p>
          <p className="text-xs text-gray-500 mt-1">Calories your body needs at complete rest</p>
        </div>

        <div className="neumorph-inset p-4 rounded-lg">
          <h3 className="text-sm font-medium text-gray-500">Total Daily Energy Expenditure</h3>
          <p className="text-2xl font-bold">{result.tdee} calories/day</p>
          <p className="text-xs text-gray-500 mt-1">
            Total calories burned daily with your activity level
          </p>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="font-medium mb-3">Daily Calorie Targets</h3>

        <div className="space-y-4">
          <div className="neumorph-inset p-4 rounded-lg">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-medium">Weight Maintenance</h4>
                <p className="text-sm text-gray-500">To maintain your current weight</p>
              </div>
              <div className="text-right">
                <p className="text-xl font-bold">{result.dailyCalories.maintain} calories</p>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-medium mb-2">Weight Loss</h4>
            <div className="space-y-2">
              <div className="neumorph-inset p-3 rounded-lg">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">Mild weight loss</p>
                    <p className="text-xs text-gray-500">0.25 kg (0.5 lb) per week</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold">{result.dailyCalories.mildLoss} calories</p>
                    <p className="text-xs text-gray-500">10% deficit</p>
                  </div>
                </div>
              </div>

              <div className="neumorph-inset p-3 rounded-lg">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">Moderate weight loss</p>
                    <p className="text-xs text-gray-500">0.5 kg (1 lb) per week</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold">
                      {result.dailyCalories.moderateLoss} calories
                    </p>
                    <p className="text-xs text-gray-500">20% deficit</p>
                  </div>
                </div>
              </div>

              <div className="neumorph-inset p-3 rounded-lg">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">Aggressive weight loss</p>
                    <p className="text-xs text-gray-500">0.75 kg (1.5 lb) per week</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold">{result.dailyCalories.extremeLoss} calories</p>
                    <p className="text-xs text-gray-500">25% deficit</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-medium mb-2">Weight Gain</h4>
            <div className="space-y-2">
              <div className="neumorph-inset p-3 rounded-lg">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">Mild weight gain</p>
                    <p className="text-xs text-gray-500">0.25 kg (0.5 lb) per week</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold">{result.dailyCalories.mildGain} calories</p>
                    <p className="text-xs text-gray-500">10% surplus</p>
                  </div>
                </div>
              </div>

              <div className="neumorph-inset p-3 rounded-lg">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">Moderate weight gain</p>
                    <p className="text-xs text-gray-500">0.5 kg (1 lb) per week</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold">
                      {result.dailyCalories.moderateGain} calories
                    </p>
                    <p className="text-xs text-gray-500">15% surplus</p>
                  </div>
                </div>
              </div>

              <div className="neumorph-inset p-3 rounded-lg">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">Aggressive weight gain</p>
                    <p className="text-xs text-gray-500">0.75 kg (1.5 lb) per week</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold">{result.dailyCalories.extremeGain} calories</p>
                    <p className="text-xs text-gray-500">20% surplus</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="font-medium mb-2">What This Means</h3>
        <p className="mb-2">
          Your Total Daily Energy Expenditure (TDEE) is the total number of calories you burn each
          day. This includes your Basal Metabolic Rate (BMR) - the calories your body needs for
          basic functions at rest - plus additional calories burned through physical activity and
          digestion.
        </p>
        <p className="mb-2">
          To lose weight, you need to consume fewer calories than your TDEE (calorie deficit). To
          gain weight, you need to consume more calories than your TDEE (calorie surplus).
        </p>
        <p className="text-sm text-gray-600">
          Note: These calculations provide estimates based on formulas. Individual metabolism can
          vary. For best results, track your calorie intake and weight changes over time to find
          your true maintenance calories.
        </p>
      </div>
    </div>
  );
};

export default TDEEResult;
