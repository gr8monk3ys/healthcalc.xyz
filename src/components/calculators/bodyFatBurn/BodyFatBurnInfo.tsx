import React from 'react';
import InfoSection from '@/components/calculators/InfoSection';

export default function BodyFatBurnInfo() {
  return (
    <div className="space-y-6">
      <InfoSection title="Understanding Energy Expenditure">
        <p className="mb-4">
          Your body requires energy (calories) for all functions, from basic survival to intense
          physical activity. This calculator helps you understand how exercise contributes to your
          total energy expenditure and how it can be used for weight management.
        </p>
        <p>The calculator breaks down your energy expenditure into two main components:</p>
        <ul className="list-disc list-inside space-y-2 mt-2 mb-4">
          <li>
            <strong>Resting Energy Expenditure (REE):</strong> The calories your body burns at rest
            for basic functions like breathing, circulation, and cell production. This is calculated
            using the Mifflin-St Jeor formula, which is considered the most accurate equation for
            estimating resting metabolic rate.
          </li>
          <li>
            <strong>Activity Energy Expenditure:</strong> The additional calories burned during
            physical activity. This is calculated using MET (Metabolic Equivalent) values, which
            represent the energy cost of activities relative to resting.
          </li>
        </ul>
      </InfoSection>

      <InfoSection title="How MET Values Work">
        <p className="mb-4">
          MET (Metabolic Equivalent of Task) is a measure of the energy cost of physical activities.
          One MET is defined as the energy expended while sitting at rest, which is approximately 1
          calorie per kilogram of body weight per hour.
        </p>
        <p className="mb-4">Activities are assigned MET values based on their intensity:</p>
        <ul className="list-disc list-inside space-y-1 mb-4">
          <li>Light activities (like casual walking) have MET values of 2-3</li>
          <li>Moderate activities (like brisk walking) have MET values of 3-6</li>
          <li>Vigorous activities (like running) have MET values of 6+</li>
        </ul>
        <p>
          The calculator adjusts MET values based on the intensity (speed/level) you select,
          providing a more accurate estimate of calories burned during your specific workout.
        </p>
      </InfoSection>

      <InfoSection title="Weight Loss and Calorie Deficits">
        <p className="mb-4">
          Weight loss occurs when you create a calorie deficit—burning more calories than you
          consume. The general guideline is that 3,500 calories equals approximately one pound of
          fat, though this is a simplification and actual results vary based on individual factors.
        </p>
        <p className="mb-4">
          This calculator estimates how long it will take to reach your weight loss goal based on
          the calorie deficit created by your exercise routine alone. For more effective weight
          management, consider combining exercise with dietary changes.
        </p>
        <p>
          For sustainable weight loss, aim for a moderate deficit of 500-1000 calories per day,
          which typically results in 1-2 pounds of weight loss per week. Rapid weight loss is
          generally not recommended as it can lead to muscle loss, metabolic adaptation, and is
          harder to maintain long-term.
        </p>
      </InfoSection>

      <InfoSection title="Limitations of the Calculator">
        <p className="mb-4">
          While this calculator provides useful estimates, several factors can affect actual
          results:
        </p>
        <ul className="list-disc list-inside space-y-2">
          <li>Individual variations in metabolism and efficiency of movement</li>
          <li>
            The body's adaptation to regular exercise (you may burn fewer calories doing the same
            activity over time)
          </li>
          <li>Changes in diet that may accompany exercise programs</li>
          <li>
            The "afterburn effect" (excess post-exercise oxygen consumption) is not included in
            these calculations
          </li>
          <li>
            Weight loss is rarely linear due to fluctuations in water weight, hormones, and other
            factors
          </li>
        </ul>
      </InfoSection>
    </div>
  );
}
