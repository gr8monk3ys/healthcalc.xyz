'use client';

import React from 'react';
import InfoSection from '../InfoSection';
import { MEASUREMENT_INSTRUCTIONS } from '@/constants/whr';

const WHRInfo: React.FC = () => {
  return (
    <InfoSection title="About Waist-to-Hip Ratio (WHR)">
      <p>
        Waist-to-Hip Ratio (WHR) is a simple measurement that compares the circumference of your
        waist to that of your hips. It's an important indicator of how your body fat is distributed
        and can help assess your risk for certain health conditions.
      </p>

      <h3 className="font-medium mt-4">Why WHR Matters</h3>
      <p className="mb-2">
        The amount of fat, but more importantly, the location of fat on your body can significantly
        impact your health. Research has shown that people who carry more weight around their waist
        (apple-shaped) face higher health risks than those who carry more weight around their hips
        and thighs (pear-shaped).
      </p>
      <p>
        WHR helps identify if you have central obesity (excess abdominal fat), which is linked to
        increased risk of heart disease, type 2 diabetes, and other health problems. The World
        Health Organization (WHO) has established WHR thresholds that indicate increased health
        risks.
      </p>

      <h3 className="font-medium mt-4">How to Measure Correctly</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2">
        <div className="neumorph-inset p-4 rounded-lg">
          <h4 className="font-medium mb-2">Waist Measurement</h4>
          <ol className="list-decimal pl-5 space-y-1">
            {MEASUREMENT_INSTRUCTIONS.waist.map((instruction, index) => (
              <li key={index} className="text-sm">
                {instruction}
              </li>
            ))}
          </ol>
        </div>

        <div className="neumorph-inset p-4 rounded-lg">
          <h4 className="font-medium mb-2">Hip Measurement</h4>
          <ol className="list-decimal pl-5 space-y-1">
            {MEASUREMENT_INSTRUCTIONS.hips.map((instruction, index) => (
              <li key={index} className="text-sm">
                {instruction}
              </li>
            ))}
          </ol>
        </div>
      </div>

      <h3 className="font-medium mt-6">WHO Risk Categories</h3>
      <p className="mb-2">
        According to the World Health Organization, these are the risk categories based on WHR:
      </p>

      <div className="overflow-x-auto">
        <table className="min-w-full mt-2">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 text-left">Risk Category</th>
              <th className="px-4 py-2 text-left">Men</th>
              <th className="px-4 py-2 text-left">Women</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border px-4 py-2">Low Risk</td>
              <td className="border px-4 py-2">0.95 or lower</td>
              <td className="border px-4 py-2">0.80 or lower</td>
            </tr>
            <tr>
              <td className="border px-4 py-2">Moderate Risk</td>
              <td className="border px-4 py-2">0.96 to 1.0</td>
              <td className="border px-4 py-2">0.81 to 0.85</td>
            </tr>
            <tr>
              <td className="border px-4 py-2">High Risk</td>
              <td className="border px-4 py-2">1.0 to 1.1</td>
              <td className="border px-4 py-2">0.86 to 0.90</td>
            </tr>
            <tr>
              <td className="border px-4 py-2">Very High Risk</td>
              <td className="border px-4 py-2">Above 1.1</td>
              <td className="border px-4 py-2">Above 0.90</td>
            </tr>
          </tbody>
        </table>
      </div>

      <p className="text-sm text-gray-600 mt-4">
        Note: These are general guidelines. Individual health assessment should consider multiple
        factors, including other body composition metrics, lifestyle, and family history.
      </p>
    </InfoSection>
  );
};

export default WHRInfo;
