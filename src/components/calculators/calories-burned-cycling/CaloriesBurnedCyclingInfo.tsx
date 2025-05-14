import React from 'react';

export default function CaloriesBurnedCyclingInfo() {
  return (
    <div className="neumorph p-6 rounded-lg my-8">
      <h2 className="text-2xl font-semibold mb-4">Cycling Calorie Burn</h2>
      <p className="text-gray-600 mb-3">
        Cycling calorie burn depends on speed, duration, and body weight. This calculator uses MET
        values tied to common cycling speeds to estimate energy expenditure.
      </p>
      <p className="text-gray-600">
        For best accuracy, use your average moving speed rather than overall ride average.
      </p>
    </div>
  );
}
