/**
 * Calorie Deficit Understanding Component
 * Educational content about calorie deficits
 */

import React from 'react';
import Card from '@/components/ui/Card';
import Accordion from '@/components/ui/Accordion';

export default function CalorieDeficitUnderstanding() {
  return (
    <div className="mt-12 space-y-6">
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-4">Understanding Calorie Deficits</h2>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          A calorie deficit is the foundation of weight loss. By consuming fewer calories than your
          body burns, you force it to use stored energy (primarily fat) for fuel. This calculator
          uses advanced metabolic models to provide realistic projections that account for how your
          body adapts over time.
        </p>
      </Card>

      <div className="space-y-4">
        <Accordion title="The Science Behind Weight Loss">
          <div className="space-y-4">
            <p>
              While the old rule of "3,500 calories equals one pound of fat" is commonly cited, modern
              research shows that weight loss is more complex. Your body adapts to calorie restriction
              in several ways:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <span className="font-medium">Metabolic Adaptation:</span> Your metabolism slows by 5-15%
                as you lose weight, making further weight loss more difficult
              </li>
              <li>
                <span className="font-medium">Body Composition Changes:</span> You lose both fat and
                some lean mass, affecting your calorie needs
              </li>
              <li>
                <span className="font-medium">Hormonal Adjustments:</span> Hunger hormones (ghrelin and
                leptin) change, affecting appetite and energy levels
              </li>
              <li>
                <span className="font-medium">Non-Linear Progress:</span> Weight loss isn't constant;
                you'll experience plateaus and fluctuations
              </li>
            </ul>
            <p>
              This calculator accounts for metabolic adaptation to provide more realistic estimates than
              simple calorie math.
            </p>
          </div>
        </Accordion>

        <Accordion title="Choosing the Right Deficit">
          <div className="space-y-4">
            <p>The best deficit level depends on several factors:</p>
            <div className="space-y-3">
              <div>
                <div className="font-medium text-green-700 dark:text-green-300">
                  Mild Deficit (250-500 cal/day) is best for:
                </div>
                <ul className="list-disc pl-5 mt-1 space-y-1 text-sm">
                  <li>People new to dieting</li>
                  <li>Those with less than 10 kg (20 lbs) to lose</li>
                  <li>Athletes who need to maintain performance</li>
                  <li>Anyone prioritizing muscle preservation</li>
                </ul>
              </div>
              <div>
                <div className="font-medium text-blue-700 dark:text-blue-300">
                  Moderate Deficit (500-750 cal/day) works well for:
                </div>
                <ul className="list-disc pl-5 mt-1 space-y-1 text-sm">
                  <li>Most people with 10-30 kg (20-60 lbs) to lose</li>
                  <li>Those who want steady, sustainable progress</li>
                  <li>People comfortable with tracking calories</li>
                </ul>
              </div>
              <div>
                <div className="font-medium text-orange-700 dark:text-orange-300">
                  Aggressive Deficit (750-1000 cal/day) may be appropriate for:
                </div>
                <ul className="list-disc pl-5 mt-1 space-y-1 text-sm">
                  <li>People with significant weight to lose (30+ kg / 60+ lbs)</li>
                  <li>Those under medical supervision</li>
                  <li>Short-term use before transitioning to a moderate deficit</li>
                </ul>
                <p className="text-sm text-orange-600 dark:text-orange-400 mt-2">
                  ⚠️ Larger deficits increase the risk of muscle loss, nutrient deficiencies, and
                  metabolic slowdown. Always prioritize adequate protein intake.
                </p>
              </div>
            </div>
          </div>
        </Accordion>

        <Accordion title="Minimum Calorie Guidelines">
          <div className="space-y-4">
            <p>
              Healthcare professionals generally recommend minimum calorie intakes to ensure adequate
              nutrition:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <span className="font-medium">Women:</span> Generally should not go below 1,200 calories
                per day
              </li>
              <li>
                <span className="font-medium">Men:</span> Generally should not go below 1,500 calories per
                day
              </li>
            </ul>
            <p>
              Going below these thresholds makes it difficult to get adequate vitamins, minerals, and
              protein. Very low-calorie diets should only be undertaken under medical supervision.
            </p>
            <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg mt-4">
              <p className="text-sm text-yellow-800 dark:text-yellow-200">
                <span className="font-medium">Important:</span> If your calculator results show a daily
                calorie target below these minimums, consider:
              </p>
              <ul className="list-disc pl-5 mt-2 text-sm text-yellow-700 dark:text-yellow-300">
                <li>Choosing a smaller deficit</li>
                <li>Increasing physical activity to create more room in your calorie budget</li>
                <li>Consulting with a healthcare provider or registered dietitian</li>
              </ul>
            </div>
          </div>
        </Accordion>

        <Accordion title="Why Weight Loss Slows Over Time">
          <div className="space-y-4">
            <p>You may notice that your weight loss projections show a slowdown over time. This is normal and expected due to:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <span className="font-medium">Lower body weight:</span> Smaller bodies burn fewer
                calories, so your TDEE decreases as you lose weight
              </li>
              <li>
                <span className="font-medium">Metabolic adaptation:</span> Your body becomes more
                efficient, burning 5-15% fewer calories than expected for your new weight
              </li>
              <li>
                <span className="font-medium">Reduced activity thermogenesis:</span> You may
                unconsciously move less throughout the day
              </li>
            </ul>
            <p>
              To continue losing weight, you'll need to either reduce calories further or increase
              physical activity. Most experts recommend recalculating your targets every 5-10 kg
              (10-20 lbs) of weight loss.
            </p>
          </div>
        </Accordion>

        <Accordion title="Tips for Success">
          <div className="space-y-4">
            <p>Maximize your success with these evidence-based strategies:</p>
            <div className="space-y-3">
              <div>
                <div className="font-medium">1. Track Accurately</div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Use a food scale and tracking app. Most people underestimate calorie intake by
                  20-50% without tracking.
                </p>
              </div>
              <div>
                <div className="font-medium">2. Prioritize Protein</div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Aim for 1.6-2.2g per kg of body weight. Protein preserves muscle mass and increases
                  satiety.
                </p>
              </div>
              <div>
                <div className="font-medium">3. Include Strength Training</div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Resistance training 2-3x per week helps maintain lean mass during weight loss.
                </p>
              </div>
              <div>
                <div className="font-medium">4. Be Patient with Plateaus</div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Weight loss isn't linear. Expect 1-2 week plateaus occasionally. Stay consistent.
                </p>
              </div>
              <div>
                <div className="font-medium">5. Focus on Habits, Not Just Numbers</div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Build sustainable eating patterns you can maintain after reaching your goal weight.
                </p>
              </div>
            </div>
          </div>
        </Accordion>

        <Accordion title="When to Adjust Your Plan">
          <div className="space-y-4">
            <p>Recalculate your calorie targets when:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>You've lost 5-10 kg (10-20 lbs) from your starting weight</li>
              <li>Your weight hasn't changed for 3-4 weeks despite consistent tracking</li>
              <li>Your activity level changes significantly</li>
              <li>You experience excessive hunger, fatigue, or other negative symptoms</li>
            </ul>
            <p className="mt-4">
              Remember: The calculator provides estimates based on averages. Individual results vary
              due to factors like genetics, medication, sleep, stress, and adherence. Use the
              projections as guidelines, but listen to your body and adjust as needed.
            </p>
          </div>
        </Accordion>
      </div>
    </div>
  );
}
