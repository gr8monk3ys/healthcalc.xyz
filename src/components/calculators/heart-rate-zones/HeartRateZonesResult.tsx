import React from 'react';
import type { HeartRateZonesResult } from '@/types/heartRateZones';
import NextSteps from '@/components/calculators/NextSteps';
import ReviewedBy from '@/components/ReviewedBy';
import { EDITORIAL_TEAM } from '@/constants/reviewers';

interface HeartRateZonesResultProps {
  result: HeartRateZonesResult | null;
}

export default function HeartRateZonesResult({ result }: HeartRateZonesResultProps) {
  if (!result) {
    return (
      <div className="neumorph p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-2">Heart Rate Zones</h2>
        <p className="text-gray-600">Enter your details to calculate training zones.</p>
      </div>
    );
  }

  return (
    <div className="neumorph p-6 rounded-lg" id="heart-rate-zones-result">
      <h2 className="text-xl font-semibold mb-2">Heart Rate Zones</h2>
      <p className="text-2xl font-bold text-accent">Max HR: {result.maxHeartRate} bpm</p>
      {result.restingHeartRate ? (
        <p className="text-sm text-gray-600 mt-1">Resting HR: {result.restingHeartRate} bpm</p>
      ) : null}

      <div className="mt-4 overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="text-gray-500">
            <tr>
              <th className="py-2">Zone</th>
              <th className="py-2">Range (bpm)</th>
              <th className="py-2">Purpose</th>
            </tr>
          </thead>
          <tbody>
            {result.zones.map(zone => (
              <tr key={zone.id} className="border-t border-gray-100">
                <td className="py-2 font-medium">{zone.label}</td>
                <td className="py-2">
                  {zone.minBpm}-{zone.maxBpm}
                </td>
                <td className="py-2 text-gray-600">{zone.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <NextSteps
        insight={`Your max heart rate of ${result.maxHeartRate} bpm gives you ${result.zones.length} training zones to work with. Use these tools to build a complete training plan.`}
        steps={[
          {
            label: 'VO2 Max Calculator',
            description: 'Estimate your cardiovascular fitness level',
            href: '/vo2-max',
            highlight: true,
          },
          {
            label: 'Calories Burned Running',
            description: 'See how many calories you burn at different paces',
            href: '/calories-burned-running',
          },
          {
            label: 'Running Pace Calculator',
            description: 'Find the right pace for each heart rate zone',
            href: '/running-pace',
          },
        ]}
      />

      <ReviewedBy reviewer={EDITORIAL_TEAM} lastReviewed="2026-02-01" />
    </div>
  );
}
