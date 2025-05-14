import React from 'react';

export default function StepsToCaloriesInfo() {
  return (
    <div className="neumorph p-6 rounded-lg my-8">
      <h2 className="text-2xl font-semibold mb-4">Steps to Calories</h2>
      <p className="text-gray-600 mb-3">
        This calculator estimates calories from steps using stride length, duration, and body
        weight. The faster your pace, the higher the estimated calorie burn.
      </p>
      <p className="text-gray-600">
        Use a wearable stride length if you have one for the most accurate estimate.
      </p>
    </div>
  );
}
