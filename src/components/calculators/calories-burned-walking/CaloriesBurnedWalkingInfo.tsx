import React from 'react';

export default function CaloriesBurnedWalkingInfo() {
  return (
    <div className="neumorph p-6 rounded-lg my-8">
      <h2 className="text-2xl font-semibold mb-4">Walking Calorie Burn</h2>
      <p className="text-gray-600 mb-3">
        Walking calorie burn depends on body weight, speed, and time. This calculator uses MET
        values tied to walking pace to estimate energy expenditure.
      </p>
      <p className="text-gray-600">
        For accuracy, track your pace and duration with a wearable or phone app.
      </p>
    </div>
  );
}
