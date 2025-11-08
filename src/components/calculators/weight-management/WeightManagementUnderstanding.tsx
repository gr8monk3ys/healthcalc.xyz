/**
 * Weight Management Understanding Component
 * Educational content about weight management
 */

import React from 'react';
import Card from '@/components/ui/Card';
import Accordion from '@/components/ui/Accordion';

export default function WeightManagementUnderstanding() {
  return (
    <div className="mt-12 space-y-6">
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-4">Understanding Weight Management</h2>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          Successful weight management requires balancing your calorie intake with your goals while
          maintaining proper nutrition. This calculator provides a personalized roadmap based on
          scientifically-backed principles, accounting for your unique metabolism and timeline.
        </p>
      </Card>

      <div className="space-y-4">
        <Accordion title="The Science of Weight Change">
          <div className="space-y-4">
            <p>
              Weight change occurs when you consistently consume more or fewer calories than your
              body burns. However, the process is more nuanced than simple arithmetic:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <span className="font-medium">Energy Balance:</span> Weight loss requires a calorie
                deficit (eating less than you burn), while weight gain requires a surplus
              </li>
              <li>
                <span className="font-medium">Metabolic Adaptation:</span> Your metabolism adjusts to
                prolonged deficits or surpluses, making continued progress more difficult over time
              </li>
              <li>
                <span className="font-medium">Body Composition:</span> What you eat and how you
                exercise determines whether weight changes come from fat or muscle
              </li>
              <li>
                <span className="font-medium">Individual Variation:</span> Genetics, hormones, sleep,
                stress, and adherence all affect real-world results
              </li>
            </ul>
          </div>
        </Accordion>

        <Accordion title="Choosing Your Diet Type">
          <div className="space-y-4">
            <p>
              The calculator offers four macronutrient distributions. Choose based on your
              preferences, lifestyle, and health goals:
            </p>
            <div className="space-y-3">
              <div>
                <div className="font-medium text-blue-700 dark:text-blue-300">
                  Balanced (40% carbs / 30% protein / 30% fat)
                </div>
                <ul className="list-disc pl-5 mt-1 space-y-1 text-sm">
                  <li>Most versatile and sustainable approach</li>
                  <li>Provides energy for various activities</li>
                  <li>Good starting point if you're unsure</li>
                  <li>Supports both strength and endurance training</li>
                </ul>
              </div>
              <div>
                <div className="font-medium text-green-700 dark:text-green-300">
                  Low-Carb (25% carbs / 40% protein / 35% fat)
                </div>
                <ul className="list-disc pl-5 mt-1 space-y-1 text-sm">
                  <li>May improve blood sugar control</li>
                  <li>Can reduce hunger and cravings for some people</li>
                  <li>Beneficial for insulin resistance or PCOS</li>
                  <li>Still provides adequate carbs for moderate activity</li>
                </ul>
              </div>
              <div>
                <div className="font-medium text-purple-700 dark:text-purple-300">
                  High-Protein (30% carbs / 40% protein / 30% fat)
                </div>
                <ul className="list-disc pl-5 mt-1 space-y-1 text-sm">
                  <li>Maximizes muscle preservation during weight loss</li>
                  <li>Supports muscle building during weight gain</li>
                  <li>Increases satiety and thermic effect of food</li>
                  <li>Ideal for active individuals and athletes</li>
                </ul>
              </div>
              <div>
                <div className="font-medium text-orange-700 dark:text-orange-300">
                  Ketogenic (5% carbs / 30% protein / 65% fat)
                </div>
                <ul className="list-disc pl-5 mt-1 space-y-1 text-sm">
                  <li>Shifts metabolism to primarily burn fat (ketosis)</li>
                  <li>Very effective for some people's appetite control</li>
                  <li>Requires strict adherence and monitoring</li>
                  <li>Not suitable for high-intensity exercise</li>
                </ul>
                <p className="text-sm text-orange-600 dark:text-orange-400 mt-2">
                  ⚠️ Consult a healthcare provider before starting a ketogenic diet, especially if
                  you have medical conditions.
                </p>
              </div>
            </div>
          </div>
        </Accordion>

        <Accordion title="Setting Realistic Timelines">
          <div className="space-y-4">
            <p>Your timeline significantly impacts your plan's sustainability and effectiveness:</p>
            <div className="space-y-3">
              <div>
                <div className="font-medium">For Weight Loss:</div>
                <ul className="list-disc pl-5 mt-1 space-y-1 text-sm">
                  <li>
                    <span className="font-medium">Safe rate:</span> 0.5-1% of body weight per week
                    (0.5-1 kg / 1-2 lbs for most people)
                  </li>
                  <li>
                    <span className="font-medium">Faster isn't better:</span> Aggressive deficits
                    increase muscle loss, metabolic slowdown, and rebound risk
                  </li>
                  <li>
                    <span className="font-medium">Minimum timeline:</span> Allow at least 4 weeks for
                    any weight loss goal
                  </li>
                </ul>
              </div>
              <div>
                <div className="font-medium">For Weight Gain:</div>
                <ul className="list-disc pl-5 mt-1 space-y-1 text-sm">
                  <li>
                    <span className="font-medium">Safe rate:</span> 0.25-0.5 kg (0.5-1 lb) per week
                    for lean muscle gain
                  </li>
                  <li>
                    <span className="font-medium">Slower = leaner:</span> Rapid weight gain leads to
                    more fat accumulation
                  </li>
                  <li>
                    <span className="font-medium">Combine with training:</span> Progressive strength
                    training ensures gains are primarily muscle
                  </li>
                </ul>
              </div>
            </div>
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg mt-4">
              <p className="text-sm text-blue-800 dark:text-blue-200">
                <span className="font-medium">Tip:</span> If the calculator adjusts your timeline,
                it's protecting your health and long-term success. Trust the recommendation.
              </p>
            </div>
          </div>
        </Accordion>

        <Accordion title="Understanding Macronutrients">
          <div className="space-y-4">
            <p>
              Each macronutrient serves specific functions in your body. Balancing them properly
              supports your goals:
            </p>
            <div className="space-y-3">
              <div>
                <div className="font-medium text-blue-700 dark:text-blue-300">Protein (4 cal/g)</div>
                <ul className="list-disc pl-5 mt-1 space-y-1 text-sm">
                  <li>Builds and repairs muscle tissue</li>
                  <li>Supports immune function and hormone production</li>
                  <li>Most satiating macronutrient</li>
                  <li>Higher thermic effect (burns calories during digestion)</li>
                  <li>
                    Aim for 1.6-2.2g per kg body weight during weight loss or muscle building
                  </li>
                </ul>
              </div>
              <div>
                <div className="font-medium text-green-700 dark:text-green-300">
                  Carbohydrates (4 cal/g)
                </div>
                <ul className="list-disc pl-5 mt-1 space-y-1 text-sm">
                  <li>Primary fuel source for high-intensity exercise</li>
                  <li>Supports brain function and mood</li>
                  <li>Spares protein from being used as energy</li>
                  <li>Helps with workout recovery and performance</li>
                  <li>Focus on complex carbs (whole grains, fruits, vegetables)</li>
                </ul>
              </div>
              <div>
                <div className="font-medium text-yellow-700 dark:text-yellow-300">Fat (9 cal/g)</div>
                <ul className="list-disc pl-5 mt-1 space-y-1 text-sm">
                  <li>Essential for hormone production (including testosterone)</li>
                  <li>Supports vitamin absorption (A, D, E, K)</li>
                  <li>Provides long-lasting energy</li>
                  <li>Promotes satiety and meal satisfaction</li>
                  <li>Minimum 20-25% of calories for optimal health</li>
                </ul>
              </div>
            </div>
          </div>
        </Accordion>

        <Accordion title="Tracking Your Progress">
          <div className="space-y-4">
            <p>Effective tracking helps you stay accountable and adjust as needed:</p>
            <div className="space-y-3">
              <div>
                <div className="font-medium">Weigh Yourself Consistently</div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Weigh at the same time each week (ideally morning, after bathroom, before eating).
                  Weight fluctuates daily due to water, food, and hormones—weekly averages are more
                  meaningful.
                </p>
              </div>
              <div>
                <div className="font-medium">Track Your Food Intake</div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Use a food tracking app (MyFitnessPal, Cronometer, LoseIt) to log everything. Use a
                  food scale for accuracy—eyeballing portions often leads to 20-50% underestimation.
                </p>
              </div>
              <div>
                <div className="font-medium">Monitor Energy and Performance</div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Pay attention to hunger, energy levels, sleep quality, and workout performance. If
                  you're constantly exhausted or performance drops significantly, you may need to
                  adjust your plan.
                </p>
              </div>
              <div>
                <div className="font-medium">Take Progress Photos</div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Photos often reveal changes the scale doesn't show, especially if you're building
                  muscle while losing fat.
                </p>
              </div>
            </div>
          </div>
        </Accordion>

        <Accordion title="Common Challenges and Solutions">
          <div className="space-y-4">
            <div className="space-y-3">
              <div>
                <div className="font-medium text-red-700 dark:text-red-300">Problem: Plateaus</div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  <span className="font-medium">Solution:</span> Weight loss naturally slows as you
                  get lighter. Recalculate your targets every 5-10 kg lost. Consider a 1-2 week diet
                  break at maintenance calories to reset hormones.
                </p>
              </div>
              <div>
                <div className="font-medium text-red-700 dark:text-red-300">
                  Problem: Extreme Hunger
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  <span className="font-medium">Solution:</span> Increase protein and fiber intake.
                  Consider a smaller deficit or diet break. Ensure you're getting adequate sleep (poor
                  sleep increases hunger hormones).
                </p>
              </div>
              <div>
                <div className="font-medium text-red-700 dark:text-red-300">
                  Problem: Social Situations
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  <span className="font-medium">Solution:</span> Plan ahead for events. Eat protein
                  before going out. Bank calories during the week for weekend flexibility. Remember
                  one meal won't derail progress—consistency matters more than perfection.
                </p>
              </div>
              <div>
                <div className="font-medium text-red-700 dark:text-red-300">
                  Problem: Not Seeing Results
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  <span className="font-medium">Solution:</span> First, ensure you're tracking
                  accurately (use a food scale). If truly tracking accurately, recalculate TDEE or
                  consult a healthcare provider to rule out medical issues.
                </p>
              </div>
            </div>
          </div>
        </Accordion>

        <Accordion title="Lifestyle Factors for Success">
          <div className="space-y-4">
            <p>
              Your environment and habits are just as important as your calorie target. Optimize
              these factors:
            </p>
            <div className="space-y-3">
              <div>
                <div className="font-medium">Sleep (7-9 hours/night)</div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Poor sleep increases hunger hormones (ghrelin), decreases satiety hormones (leptin),
                  impairs insulin sensitivity, and reduces willpower. Prioritize consistent sleep
                  schedules.
                </p>
              </div>
              <div>
                <div className="font-medium">Hydration (2.5-4L/day)</div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Adequate water supports metabolism, reduces false hunger signals, improves workout
                  performance, and aids recovery. Drink consistently throughout the day.
                </p>
              </div>
              <div>
                <div className="font-medium">Stress Management</div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Chronic stress elevates cortisol, which can increase fat storage (especially
                  abdominal), impair sleep, and trigger emotional eating. Practice stress-reduction
                  techniques (meditation, exercise, hobbies).
                </p>
              </div>
              <div>
                <div className="font-medium">Exercise</div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Combine strength training (2-4x/week) with cardio or daily movement. Strength
                  training preserves muscle during weight loss and builds muscle during weight gain.
                  Cardio supports heart health and creates additional calorie burn.
                </p>
              </div>
            </div>
          </div>
        </Accordion>

        <Accordion title="When to Adjust Your Plan">
          <div className="space-y-4">
            <p>Recalculate or adjust when:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>You've lost or gained 5-10% of your body weight</li>
              <li>Weight hasn't changed for 3-4 weeks despite consistent adherence</li>
              <li>Your activity level changes significantly</li>
              <li>You experience persistent fatigue, poor sleep, or mood issues</li>
              <li>You're no longer making progress in the gym (if applicable)</li>
            </ul>
            <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg mt-4">
              <p className="text-sm text-yellow-800 dark:text-yellow-200">
                <span className="font-medium">Important:</span> If you experience extreme fatigue,
                hair loss, menstrual cycle disruptions, or other concerning symptoms, consult a
                healthcare provider immediately. These may indicate your deficit is too aggressive or
                you have nutrient deficiencies.
              </p>
            </div>
          </div>
        </Accordion>
      </div>
    </div>
  );
}
