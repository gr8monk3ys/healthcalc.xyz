import React from 'react';

export default function PregnancyDueDateInfo() {
  return (
    <div className="neumorph p-6 rounded-lg my-8">
      <h2 className="text-2xl font-semibold mb-4">How Due Dates Are Estimated</h2>
      <p className="text-gray-600 mb-4">
        Most due dates are estimated using the first day of your last menstrual period (LMP), which
        adds 40 weeks (280 days). If you know your conception date, an estimate of 38 weeks (266
        days) is often used.
      </p>
      <ul className="list-disc list-inside text-gray-600 space-y-2">
        <li>Due dates are estimates and can vary by up to two weeks.</li>
        <li>Ultrasound measurements can refine timing.</li>
        <li>Always consult your healthcare provider for personalized guidance.</li>
      </ul>
    </div>
  );
}
