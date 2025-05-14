import React from 'react';

export default function AdjustedBodyWeightInfo() {
  return (
    <div className="neumorph p-6 rounded-lg my-8">
      <h2 className="text-2xl font-semibold mb-4">What Is Adjusted Body Weight?</h2>
      <p className="text-gray-600 mb-3">
        Adjusted body weight is often used for clinical dosing when actual body weight is
        substantially above ideal weight. It applies a correction factor to the difference between
        actual and ideal body weight.
      </p>
      <p className="text-gray-600">
        This tool uses the Devine ideal body weight formula and a 40% correction factor.
      </p>
    </div>
  );
}
