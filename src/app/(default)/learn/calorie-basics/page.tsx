import React from 'react';
import Link from 'next/link';

export const metadata = {
  alternates: { canonical: './' },
  title: 'Calorie Basics | HealthCalc',
  description:
    'How maintenance calories are estimated with BMR and activity multipliers, how to size a deficit or surplus, and how to adjust targets from real results.',
};

export default function CalorieBasicsGuide() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Calorie Basics</h1>
      <p className="text-gray-600 mb-6">
        A calorie is a unit of energy. Your body burns it around the clock, even while you sleep,
        and food is how it gets topped back up. Eat about as much as you burn over a few weeks and
        your weight holds steady. Eat consistently less and it drifts down; eat consistently more
        and it creeps up. The hard part is knowing how much you actually burn. Calorie calculators
        give you a first guess. This guide shows how they arrive at it, where that guess tends to go
        wrong, and how to correct it with your own results.
      </p>
      <section className="neumorph p-6 rounded-lg mb-8">
        <h2 className="text-2xl font-semibold mb-3">Where Your Daily Calories Go</h2>
        <p className="text-gray-600 mb-3">
          Total daily energy expenditure (TDEE) is the sum of a few parts:
        </p>
        <ul className="list-disc pl-5 space-y-2 text-gray-600 mb-3">
          <li>
            <strong>Basal metabolic rate (BMR):</strong> the energy needed to keep your organs
            working at complete rest. For most people this is the largest share of daily burn.
          </li>
          <li>
            <strong>Thermic effect of food:</strong> the energy used to digest and process what you
            eat, roughly a tenth of intake for a typical mixed diet.
          </li>
          <li>
            <strong>Exercise:</strong> planned workouts such as running, lifting, or cycling.
          </li>
          <li>
            <strong>Non-exercise activity:</strong> walking around, standing, chores, fidgeting.
            This varies a lot between people and can change when you diet.
          </li>
        </ul>
        <p className="text-gray-600 mb-3">
          BMR is the easiest piece to predict, since it depends mostly on body size, age and sex. So
          calculators estimate it first and then scale it up for activity.
        </p>
      </section>
      <section className="neumorph p-6 rounded-lg mb-8">
        <h2 className="text-2xl font-semibold mb-3">How Calculators Estimate Maintenance</h2>
        <p className="text-gray-600 mb-3">
          Most of our calorie tools use the Mifflin-St Jeor equation for BMR. It dates from 1990,
          and dietitians tend to prefer it because in healthy adults it predicts resting needs more
          closely than the older equations do:
        </p>
        <ul className="list-disc pl-5 space-y-2 text-gray-600 mb-3">
          <li>Men: BMR = 10 × weight (kg) + 6.25 × height (cm) − 5 × age (years) + 5</li>
          <li>Women: BMR = 10 × weight (kg) + 6.25 × height (cm) − 5 × age (years) − 161</li>
        </ul>
        <p className="text-gray-600 mb-3">
          BMR is then multiplied by an activity factor. Common multipliers are 1.2 for sedentary,
          1.375 for lightly active, 1.55 for moderately active, 1.725 for very active, and 1.9 for
          extremely active.
        </p>
        <p className="text-gray-600 mb-3">
          Worked example: a 35-year-old woman who weighs 70 kg and is 165 cm tall has a BMR of 10 ×
          70 + 6.25 × 165 − 5 × 35 − 161 = 1,395 calories. If she exercises moderately most days,
          her estimated maintenance is 1,395 × 1.55, or about 2,160 calories per day.
        </p>
        <p className="text-gray-600 mb-3">
          Don&apos;t treat that number as exact. The equation describes an average person, and
          plenty of real people sit a few hundred calories above or below it.
        </p>
      </section>
      <section className="neumorph p-6 rounded-lg mb-8">
        <h2 className="text-2xl font-semibold mb-3">Sizing a Deficit or Surplus</h2>
        <p className="text-gray-600 mb-3">
          For fat loss, a moderate deficit of about 10 to 20 percent below maintenance is a common
          starting point. Using the example above, a 15 percent deficit is 2,160 × 0.85, or roughly
          1,840 calories per day. Bigger deficits move the scale faster at first. They are also
          harder to stick with, and the less you eat, the harder it is to fit in enough protein,
          fiber and micronutrients.
        </p>
        <p className="text-gray-600 mb-3">
          You may have heard that a 500-calorie daily deficit equals one pound of fat lost per week.
          That rule holds up reasonably well for the first few weeks and then overpromises. A
          smaller body burns less energy, so loss slows down over time even if you keep eating
          exactly the same amount. Energy-balance modelling by Hall and colleagues shows this
          clearly.
        </p>
        <p className="text-gray-600 mb-3">
          For muscle gain, a small surplus of about 5 to 15 percent above maintenance, combined with
          resistance training and enough protein, limits unnecessary fat gain. Beginners often gain
          faster than experienced lifters.
        </p>
      </section>
      <section className="neumorph p-6 rounded-lg mb-8">
        <h2 className="text-2xl font-semibold mb-3">Adjusting From Real Results</h2>
        <p className="text-gray-600 mb-3">
          Your scale trend is better data than any equation. Weigh yourself under similar conditions
          several times a week and compare weekly averages rather than single days, since water,
          salt, and digestion can move daily weight by a kilogram or more.
        </p>
        <ul className="list-disc pl-5 space-y-2 text-gray-600 mb-3">
          <li>
            If your average has not changed after two to three weeks and you are aiming to lose,
            reduce intake by 100 to 200 calories per day or add activity.
          </li>
          <li>
            If you are losing faster than about 1 percent of body weight per week, consider eating a
            little more to protect muscle and energy.
          </li>
          <li>
            Recalculate your targets after every 4 to 5 kg of change, because BMR and the energy
            cost of movement fall as weight falls.
          </li>
        </ul>
      </section>
      <section className="neumorph p-6 rounded-lg mb-8">
        <h2 className="text-2xl font-semibold mb-3">Common Mistakes</h2>
        <ul className="list-disc pl-5 space-y-2 text-gray-600 mb-3">
          <li>
            <strong>Counting exercise twice.</strong> If you choose a higher activity multiplier, do
            not also add back the calories shown by a fitness tracker.
          </li>
          <li>
            <strong>Underestimating intake.</strong> Cooking oils, drinks, and weekend meals are
            easy to miss. Weighing food for a week or two often reveals the gap.
          </li>
          <li>
            <strong>Changing course too soon.</strong> A single high weigh-in after a salty meal is
            not a stall.
          </li>
          <li>
            <strong>Going too low.</strong> Very low intakes make it hard to meet nutrient needs and
            are best done only under medical supervision.
          </li>
        </ul>
      </section>
      <section className="neumorph p-6 rounded-lg mb-8">
        <h2 className="text-2xl font-semibold mb-3">When to Talk to a Professional</h2>
        <p className="text-gray-600 mb-3">
          Speak with a doctor or registered dietitian before changing your intake if you are
          pregnant or breastfeeding, have diabetes or take medication that affects blood sugar, have
          kidney disease, have a history of disordered eating, or are planning a very low-calorie
          diet. Unexplained weight change, either loss or gain, is also worth a medical check.
        </p>
      </section>

      <div className="neumorph p-6 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Recommended Calculators</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link href="/calorie" className="neumorph p-4 rounded-lg hover:shadow-neumorph-inset">
            <h3 className="font-semibold text-accent">Calorie Calculator</h3>
            <p className="text-sm text-gray-600">Daily calories for maintenance, loss, or gain.</p>
          </Link>
          <Link href="/tdee" className="neumorph p-4 rounded-lg hover:shadow-neumorph-inset">
            <h3 className="font-semibold text-accent">TDEE Calculator</h3>
            <p className="text-sm text-gray-600">Estimate total daily energy expenditure.</p>
          </Link>
          <Link
            href="/calorie-deficit"
            className="neumorph p-4 rounded-lg hover:shadow-neumorph-inset"
          >
            <h3 className="font-semibold text-accent">Calorie Deficit Calculator</h3>
            <p className="text-sm text-gray-600">Plan a safe deficit and timeline.</p>
          </Link>
          <Link
            href="/weight-management"
            className="neumorph p-4 rounded-lg hover:shadow-neumorph-inset"
          >
            <h3 className="font-semibold text-accent">Weight Management Calculator</h3>
            <p className="text-sm text-gray-600">Set a target date and daily intake.</p>
          </Link>
        </div>
      </div>

      <div className="mt-12 border-t pt-8">
        <h2 className="text-xl font-semibold mb-4">References</h2>
        <ul className="space-y-3 text-sm text-gray-600">
          <li>
            Mifflin MD, St Jeor ST, Hill LA, Scott BJ, Daugherty SA, Koh YO. A new predictive
            equation for resting energy expenditure in healthy individuals. Am J Clin Nutr.
            1990;51(2):241-247.
          </li>
          <li>
            Frankenfield D, Roth-Yousey L, Compher C. Comparison of predictive equations for resting
            metabolic rate in healthy nonobese and obese adults: a systematic review. J Am Diet
            Assoc. 2005;105(5):775-789.
          </li>
          <li>
            Hall KD, Sacks G, Chandramohan D, et al. Quantification of the effect of energy
            imbalance on bodyweight. Lancet. 2011;378(9793):826-837.
          </li>
          <li>
            U.S. Department of Agriculture and U.S. Department of Health and Human Services. Dietary
            Guidelines for Americans, 2020-2025.
          </li>
        </ul>
      </div>
    </div>
  );
}
