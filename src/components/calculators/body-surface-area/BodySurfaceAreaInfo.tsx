import React from 'react';

export default function BodySurfaceAreaInfo() {
  return (
    <div className="neumorph p-6 rounded-lg my-8">
      <h2 className="text-2xl font-semibold mb-4">About Body Surface Area</h2>
      <p className="text-gray-600 mb-3">
        Body surface area (BSA) estimates the total area of your body. It is commonly used in
        clinical settings for medication dosing and physiological comparisons.
      </p>
      <p className="text-gray-600">
        This calculator uses a standard formula based on height and weight. It is an estimate, so
        clinicians may use additional factors for medical decisions.
      </p>
    </div>
  );
}
