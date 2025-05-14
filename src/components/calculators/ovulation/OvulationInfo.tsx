import React from 'react';

export default function OvulationInfo() {
  return (
    <div className="neumorph p-6 rounded-lg my-8">
      <h2 className="text-2xl font-semibold mb-4">Understanding Ovulation Timing</h2>
      <p className="text-gray-600 mb-4">
        Ovulation typically occurs about 14 days before your next period. This calculator uses your
        average cycle length to estimate ovulation and your fertile window.
      </p>
      <ul className="list-disc list-inside text-gray-600 space-y-2">
        <li>The fertile window usually spans 5 days before ovulation and the day of ovulation.</li>
        <li>Cycle lengths vary, so track multiple cycles for accuracy.</li>
        <li>Consult your healthcare provider if your cycles are irregular.</li>
      </ul>
    </div>
  );
}
