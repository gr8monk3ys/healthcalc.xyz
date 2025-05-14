import React from 'react';

export default function HeartRateZonesInfo() {
  return (
    <div className="neumorph p-6 rounded-lg my-8">
      <h2 className="text-2xl font-semibold mb-4">Why Heart Rate Zones Matter</h2>
      <p className="text-gray-600 mb-4">
        Training in specific heart rate zones helps target different energy systems. Lower zones
        build aerobic endurance and recovery, while higher zones improve speed and VO2 max.
      </p>
      <ul className="list-disc list-inside text-gray-600 space-y-2">
        <li>Zone 2 is ideal for steady-state endurance work.</li>
        <li>Zone 3-4 improves tempo and threshold performance.</li>
        <li>Zone 5 is best reserved for short, intense intervals.</li>
      </ul>
    </div>
  );
}
