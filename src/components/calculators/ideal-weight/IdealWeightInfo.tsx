import React from 'react';

export default function IdealWeightInfo() {
  return (
    <div className="neumorph p-6 rounded-lg my-8">
      <h2 className="text-2xl font-semibold mb-4">About Ideal Weight Formulas</h2>
      <p className="text-gray-600 mb-4">
        Ideal weight formulas estimate a healthy weight based on height and gender. They are
        population averages, not personalized medical guidance. Use these numbers as a starting
        point and consider body composition, fitness level, and health goals.
      </p>
      <ul className="list-disc list-inside text-gray-600 space-y-2">
        <li>Formulas are most accurate for adults of average frame size.</li>
        <li>Athletes may have higher lean mass than formulas suggest.</li>
        <li>Use with other metrics like BMI and body fat percentage.</li>
      </ul>
    </div>
  );
}
