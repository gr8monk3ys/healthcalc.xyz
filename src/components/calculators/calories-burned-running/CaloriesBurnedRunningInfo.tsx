import React from 'react';

export default function CaloriesBurnedRunningInfo() {
  return (
    <div className="neumorph p-6 rounded-lg my-8">
      <h2 className="text-2xl font-semibold mb-4">Running Calorie Burn</h2>
      <p className="text-gray-600 mb-3">
        Running intensity and speed have a big impact on calorie burn. This calculator uses MET
        values based on speed to estimate energy expenditure.
      </p>
      <p className="text-gray-600">
        Use a smartwatch or GPS app to track pace for better accuracy.
      </p>
    </div>
  );
}
