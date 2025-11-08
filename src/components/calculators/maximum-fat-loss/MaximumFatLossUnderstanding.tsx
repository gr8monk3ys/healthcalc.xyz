/**
 * Maximum Fat Loss Understanding Component
 */

import React from 'react';
import Card from '@/components/ui/Card';
import Accordion from '@/components/ui/Accordion';

export default function MaximumFatLossUnderstanding() {
  return (
    <div className="mt-12 space-y-6">
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-4">Understanding Maximum Fat Loss</h2>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          The maximum fat loss approach is based on scientific research showing that your body has
          a limit to how much fat it can mobilize per day. By respecting this limit, you maximize
          fat loss while preserving muscle mass and metabolic health.
        </p>
      </Card>

      <div className="space-y-4">
        <Accordion title="The Science Behind Maximum Fat Loss">
          <div className="space-y-4">
            <p>
              Research by Dr. Alpert published in the International Journal of Obesity established
              that your body can only mobilize about 22-31 calories per pound of body fat per day.
              This means:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                If your calorie deficit exceeds this limit, you'll likely lose muscle along with fat
              </li>
              <li>
                The more body fat you have, the larger deficit you can sustain without muscle loss
              </li>
              <li>As you lose fat, your maximum sustainable deficit decreases</li>
              <li>
                This calculator uses a moderate estimate of 26.5 kcal/lb/day for safety
              </li>
            </ul>
            <p className="mt-4">
              For example, someone with 40 pounds of body fat can theoretically mobilize about 1,060
              calories per day from fat stores (40 lbs × 26.5 kcal/lb). A larger deficit would likely
              result in muscle loss.
            </p>
          </div>
        </Accordion>

        <Accordion title="Why Muscle Preservation Matters">
          <div className="space-y-4">
            <p>Preserving lean muscle mass during fat loss offers critical benefits:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <span className="font-medium">Higher metabolism:</span> Muscle tissue burns more
                calories at rest than fat tissue
              </li>
              <li>
                <span className="font-medium">Better appearance:</span> You'll look leaner and more
                defined at the same weight
              </li>
              <li>
                <span className="font-medium">Functional strength:</span> Maintain performance in
                daily activities and sports
              </li>
              <li>
                <span className="font-medium">Easier maintenance:</span> Higher muscle mass means you
                can eat more while maintaining weight
              </li>
              <li>
                <span className="font-medium">Reduced rebound:</span> Less muscle loss means less
                metabolic adaptation and lower risk of regaining fat
              </li>
            </ul>
          </div>
        </Accordion>

        <Accordion title="The Role of Protein">
          <div className="space-y-4">
            <p>
              Protein is THE most important macronutrient during a fat loss phase. This calculator
              recommends 1.6-2.2g per kg of lean body mass based on current research:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <span className="font-medium">Preserves muscle:</span> Provides amino acids for
                muscle protein synthesis
              </li>
              <li>
                <span className="font-medium">Increases satiety:</span> Protein is the most filling
                macronutrient
              </li>
              <li>
                <span className="font-medium">Higher thermic effect:</span> Burns ~25-30% of protein
                calories during digestion
              </li>
              <li>
                <span className="font-medium">Supports recovery:</span> Essential for repairing
                training damage
              </li>
            </ul>
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg mt-4">
              <p className="text-sm text-blue-800 dark:text-blue-200">
                <span className="font-medium">Pro tip:</span> Spread protein evenly across 3-4 meals
                for optimal muscle protein synthesis. Each meal should contain 25-40g of protein.
              </p>
            </div>
          </div>
        </Accordion>

        <Accordion title="Strength Training Requirements">
          <div className="space-y-4">
            <p>
              Without resistance training, your body has no reason to preserve muscle during a
              calorie deficit. Essential guidelines:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <span className="font-medium">Frequency:</span> Train each muscle group 2-3x per week
              </li>
              <li>
                <span className="font-medium">Progressive overload:</span> Strive to maintain or
                increase weight/reps on key lifts
              </li>
              <li>
                <span className="font-medium">Compound movements:</span> Focus on squats, deadlifts,
                bench press, rows, and overhead press
              </li>
              <li>
                <span className="font-medium">Volume:</span> 10-20 sets per muscle group per week is
                sufficient during a deficit
              </li>
              <li>
                <span className="font-medium">Don't overtrain:</span> Recovery is harder in a deficit
                - avoid excessive volume
              </li>
            </ul>
          </div>
        </Accordion>

        <Accordion title="When to Adjust Your Plan">
          <div className="space-y-4">
            <p>Recalculate your maximum fat loss targets when:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>You've lost 5-7 kg (10-15 lbs) of body weight</li>
              <li>Your estimated body fat percentage has dropped by 3-5%</li>
              <li>Weight loss has stalled for 2-3 weeks despite adherence</li>
              <li>Strength is dropping significantly on key lifts</li>
              <li>You're experiencing persistent fatigue or poor recovery</li>
            </ul>
            <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg mt-4">
              <p className="text-sm text-yellow-800 dark:text-yellow-200">
                <span className="font-medium">Important:</span> As you get leaner, your maximum
                deficit decreases. When you reach 10-12% body fat (males) or 18-20% (females),
                consider slower fat loss rates or diet breaks to preserve muscle and hormonal health.
              </p>
            </div>
          </div>
        </Accordion>

        <Accordion title="Common Mistakes to Avoid">
          <div className="space-y-4">
            <div className="space-y-3">
              <div>
                <div className="font-medium text-red-700 dark:text-red-300">
                  Mistake: Excessive cardio to create a larger deficit
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  <span className="font-medium">Better approach:</span> Use cardio for health and
                  modest calorie burn (2-3 sessions/week), but don't exceed your calculated maximum
                  deficit with excessive activity.
                </p>
              </div>
              <div>
                <div className="font-medium text-red-700 dark:text-red-300">
                  Mistake: Cutting calories too aggressively at low body fat
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  <span className="font-medium">Better approach:</span> At body fat percentages below
                  12% (men) or 20% (women), prioritize slower fat loss and muscle preservation over
                  speed.
                </p>
              </div>
              <div>
                <div className="font-medium text-red-700 dark:text-red-300">
                  Mistake: Neglecting protein targets
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  <span className="font-medium">Better approach:</span> Treat your protein target as
                  a minimum requirement, not an optional goal. Track it daily.
                </p>
              </div>
              <div>
                <div className="font-medium text-red-700 dark:text-red-300">
                  Mistake: Ignoring strength performance
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  <span className="font-medium">Better approach:</span> If your strength drops more
                  than 10-15% on main lifts, you're likely losing muscle. Reduce your deficit or take
                  a diet break.
                </p>
              </div>
            </div>
          </div>
        </Accordion>

        <Accordion title="Diet Breaks and Refeeds">
          <div className="space-y-4">
            <p>
              Strategic diet breaks can improve long-term fat loss success by managing metabolic
              adaptation and hormonal health:
            </p>
            <div className="space-y-3">
              <div>
                <div className="font-medium">Diet Breaks (1-2 weeks)</div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Eat at maintenance calories every 8-12 weeks. This helps restore leptin levels,
                  improve energy, and provide a mental break. You won't lose fat during this time, but
                  you'll be better positioned for continued progress afterward.
                </p>
              </div>
              <div>
                <div className="font-medium">Refeed Days (1-2 days/week)</div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Increase calories to maintenance (primarily from carbs) 1-2 days per week. This can
                  help restore glycogen, improve training performance, and provide psychological
                  relief without significantly impacting weekly fat loss.
                </p>
              </div>
            </div>
          </div>
        </Accordion>
      </div>
    </div>
  );
}
