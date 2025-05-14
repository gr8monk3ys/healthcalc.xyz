import React from 'react';

export default function StepsToMilesInfo() {
  return (
    <div className="neumorph p-6 rounded-lg my-8">
      <h2 className="text-2xl font-semibold mb-4">Steps to Distance</h2>
      <p className="text-gray-600 mb-3">
        Step length varies based on height and walking speed. If you are unsure, an average stride
        is often around 2.2 ft (26.4 in) for women and 2.5 ft (30 in) for men.
      </p>
      <p className="text-gray-600">
        Use your wearable stride length for the most accurate conversion.
      </p>
    </div>
  );
}
