import React from 'react';

export default function CalorieInfo() {
  return (
    <div className="neumorph p-6 rounded-lg my-8">
      <h2 className="text-2xl font-semibold mb-4">How the Calorie Calculator Works</h2>
      <p className="text-gray-600 mb-3">
        Your daily calorie needs depend on your basal metabolic rate (BMR) and how active you are.
        This calculator estimates your BMR from height, weight, age, and sex, then applies an
        activity multiplier to estimate maintenance calories.
      </p>
      <p className="text-gray-600">
        Use maintenance calories to keep your weight steady, then adjust up or down for gain or
        loss. Recalculate after major weight changes or activity shifts for better accuracy.
      </p>
    </div>
  );
}
