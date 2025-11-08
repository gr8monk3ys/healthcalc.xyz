import React from 'react';
import { BodyFatBurnResult as BodyFatBurnResultType } from '@/types/bodyFatBurn';
import { formatNumber } from '@/utils/calculators';
import { ACTIVITIES } from '@/constants/bodyFatBurn';

interface BodyFatBurnResultProps {
  result: BodyFatBurnResultType;
  formData: {
    activity: string;
    duration: number;
    frequency: number;
    burnGoal: number;
    unitSystem: 'metric' | 'imperial';
  };
}

export default function BodyFatBurnResult({ result, formData }: BodyFatBurnResultProps) {
  const selectedActivity = ACTIVITIES.find(a => a.id === formData.activity);
  const distanceUnit = formData.unitSystem === 'imperial' ? 'miles' : 'km';

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="neumorph p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Energy Expenditure</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Resting Energy:</span>
              <span className="font-medium">
                {formatNumber(result.restingEnergyExpenditure)} kcal/day
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Activity Energy:</span>
              <span className="font-medium">
                {formatNumber(result.activityEnergyExpenditure)} kcal/session
              </span>
            </div>
            <div className="flex justify-between border-t pt-2 mt-2">
              <span className="text-gray-600">Weekly Burn:</span>
              <span className="font-medium text-accent">
                {formatNumber(result.activityEnergyExpenditure * formData.frequency)} kcal/week
              </span>
            </div>
          </div>
        </div>

        <div className="neumorph p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Time to Goal</h3>
          <div className="flex flex-col items-center justify-center h-full">
            <div className="text-4xl font-bold text-accent mb-2">
              {result.timeToReachGoal.weeks} weeks
            </div>
            <div className="text-gray-600 text-center">
              {result.timeToReachGoal.days} days to lose {formData.burnGoal}{' '}
              {formData.unitSystem === 'imperial' ? 'lbs' : 'kg'}
            </div>
          </div>
        </div>
      </div>

      <div className="neumorph p-4 rounded-lg">
        <h3 className="text-lg font-semibold mb-4">Your Exercise Plan</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-accent/5 p-3 rounded-lg">
            <div className="text-center">
              <div className="text-xl font-semibold">{selectedActivity?.name}</div>
              <div className="text-gray-600">Activity</div>
            </div>
          </div>

          <div className="bg-accent/5 p-3 rounded-lg">
            <div className="text-center">
              <div className="text-xl font-semibold">{formData.duration} min</div>
              <div className="text-gray-600">{formData.frequency}x per week</div>
            </div>
          </div>

          {result.distancePerSession > 0 && (
            <div className="bg-accent/5 p-3 rounded-lg">
              <div className="text-center">
                <div className="text-xl font-semibold">
                  {formatNumber(result.distancePerSession)} {distanceUnit}
                </div>
                <div className="text-gray-600">Distance per session</div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="neumorph p-4 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">Recommendations</h3>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>
            Aim for consistency with your {formData.frequency}x weekly{' '}
            {selectedActivity?.name.toLowerCase()} sessions
          </li>
          <li>
            This plan creates a weekly deficit of approximately{' '}
            {formatNumber((result.activityEnergyExpenditure * formData.frequency) / 7)} calories per
            day
          </li>
          <li>For faster results, consider combining this exercise plan with dietary changes</li>
          <li>Stay hydrated during exercise and allow for proper recovery between sessions</li>
        </ul>
      </div>
    </div>
  );
}
