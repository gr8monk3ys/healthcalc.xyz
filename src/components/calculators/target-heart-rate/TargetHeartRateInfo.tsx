import React from 'react';

export default function TargetHeartRateInfo() {
  return (
    <div className="neumorph p-6 rounded-lg my-8">
      <h2 className="text-2xl font-semibold mb-4">Target Heart Rate Zones</h2>
      <p className="text-gray-600 mb-3">
        Target heart rate zones help you train at the right intensity. The calculator uses a
        percentage of your max heart rate, or the Karvonen method if you provide resting heart rate.
      </p>
      <p className="text-gray-600">
        Moderate zones improve endurance, while higher zones build speed and conditioning.
      </p>
    </div>
  );
}
