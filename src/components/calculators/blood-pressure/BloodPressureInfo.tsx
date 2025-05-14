import React from 'react';

export default function BloodPressureInfo() {
  return (
    <div className="neumorph p-6 rounded-lg my-8">
      <h2 className="text-2xl font-semibold mb-4">Understanding Blood Pressure</h2>
      <p className="text-gray-600 mb-4">
        Blood pressure is recorded as systolic over diastolic (e.g., 120/80 mmHg). Systolic is the
        pressure when your heart beats; diastolic is the pressure when your heart rests between
        beats. Consistently high readings can increase health risks.
      </p>
      <ul className="list-disc list-inside text-gray-600 space-y-2">
        <li>Measure after sitting quietly for 5 minutes.</li>
        <li>Avoid caffeine, exercise, and smoking 30 minutes before measuring.</li>
        <li>Take multiple readings and track trends over time.</li>
      </ul>
    </div>
  );
}
