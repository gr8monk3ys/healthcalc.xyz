import React from 'react';
import Link from 'next/link';

export const metadata = {
  alternates: { canonical: './' },
  title: 'Macro Planning | HealthCalc',
  description:
    'How to split daily calories into protein, carbohydrate, and fat targets using accepted intake ranges, with a worked example and common pitfalls.',
};

export default function MacroPlanningGuide() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Macro Planning</h1>
      <p className="text-gray-600 mb-6">
        Protein, carbohydrate and fat supply almost all of your calories, and together they are
        called macronutrients. Once you know roughly how many calories you need, a macro plan
        decides how to divide them up. There is no single correct split. What works depends on your
        goal and how you train, and just as much on what you will actually eat week after week.
        There are, though, well-established ranges that suit most healthy adults. Below we use them
        to build a plan from scratch, then go through the mistakes that make tracking more of a
        chore than it needs to be.
      </p>
      <section className="neumorph p-6 rounded-lg mb-8">
        <h2 className="text-2xl font-semibold mb-3">Calories per Gram</h2>
        <p className="text-gray-600 mb-3">Each macronutrient provides a fixed amount of energy:</p>
        <ul className="list-disc pl-5 space-y-2 text-gray-600 mb-3">
          <li>Protein: 4 calories per gram</li>
          <li>Carbohydrate: 4 calories per gram</li>
          <li>Fat: 9 calories per gram</li>
          <li>Alcohol, which is not a nutrient you need, provides 7 calories per gram</li>
        </ul>
        <p className="text-gray-600 mb-3">
          These numbers let you convert between grams and calories. For example, 100 grams of
          protein is 400 calories, and 70 grams of fat is 630 calories.
        </p>
      </section>
      <section className="neumorph p-6 rounded-lg mb-8">
        <h2 className="text-2xl font-semibold mb-3">Accepted Ranges for Adults</h2>
        <p className="text-gray-600 mb-3">
          The National Academies set Acceptable Macronutrient Distribution Ranges (AMDRs) for
          adults, which are also used in the Dietary Guidelines for Americans:
        </p>
        <ul className="list-disc pl-5 space-y-2 text-gray-600 mb-3">
          <li>Carbohydrate: 45 to 65 percent of calories</li>
          <li>Fat: 20 to 35 percent of calories</li>
          <li>Protein: 10 to 35 percent of calories</li>
        </ul>
        <p className="text-gray-600 mb-3">
          These ranges are wide on purpose. Plenty of healthy eating patterns fit inside them, from
          higher-carbohydrate diets that suit endurance athletes to moderate-carbohydrate diets that
          some people find more filling. Going outside them is not automatically harmful, but very
          low-fat or very low-carbohydrate plans deserve more planning to cover essential fatty
          acids, fiber, and micronutrients.
        </p>
      </section>
      <section className="neumorph p-6 rounded-lg mb-8">
        <h2 className="text-2xl font-semibold mb-3">Setting Protein First</h2>
        <p className="text-gray-600 mb-3">
          Protein is the most useful macro to set first, because needs scale with body weight rather
          than calories. The Recommended Dietary Allowance is 0.8 grams per kilogram of body weight
          per day, which is the amount that covers basic needs for nearly all healthy adults. If you
          train, treat it as the floor.
        </p>
        <p className="text-gray-600 mb-3">
          For people who train regularly, the International Society of Sports Nutrition position
          stand suggests about 1.4 to 2.0 grams per kilogram per day, and many coaches use 1.6 to
          2.2 grams per kilogram during a calorie deficit to help preserve muscle. A 2018
          meta-analysis of resistance-training studies found that the benefit of extra protein for
          muscle gain levelled off at around 1.6 grams per kilogram per day on average. Spreading
          protein across three or four meals makes these amounts easier to reach.
        </p>
      </section>
      <section className="neumorph p-6 rounded-lg mb-8">
        <h2 className="text-2xl font-semibold mb-3">Building a Plan: Worked Example</h2>
        <p className="text-gray-600 mb-3">
          Suppose an 80 kg adult who lifts weights has a target of 2,400 calories per day.
        </p>
        <ul className="list-disc pl-5 space-y-2 text-gray-600 mb-3">
          <li>
            <strong>Protein:</strong> 1.6 g × 80 kg = 128 grams, which is 512 calories, or about 21
            percent of intake.
          </li>
          <li>
            <strong>Fat:</strong> set at 30 percent of calories, which is 720 calories, or 80 grams.
          </li>
          <li>
            <strong>Carbohydrate:</strong> the remaining 2,400 − 512 − 720 = 1,168 calories, which
            is 292 grams, or about 49 percent of intake.
          </li>
        </ul>
        <p className="text-gray-600 mb-3">
          All three fall inside the AMDRs. If this person preferred fewer carbohydrates, they could
          move fat toward 35 percent and lower carbohydrate accordingly, keeping protein the same.
        </p>
        <p className="text-gray-600 mb-3">
          Fiber is worth tracking alongside macros. The Dietary Guidelines use about 14 grams of
          fiber per 1,000 calories, which at 2,400 calories works out to roughly 34 grams per day.
        </p>
      </section>
      <section className="neumorph p-6 rounded-lg mb-8">
        <h2 className="text-2xl font-semibold mb-3">Adjusting Macros for Your Goal</h2>
        <ul className="list-disc pl-5 space-y-2 text-gray-600 mb-3">
          <li>
            <strong>Fat loss:</strong> keep protein high, keep fat at or above about 20 percent of
            calories, and take most of the calorie reduction from carbohydrate and fat together
            rather than cutting one to zero.
          </li>
          <li>
            <strong>Muscle gain:</strong> keep protein at training levels and add the extra calories
            mostly as carbohydrate, which supports training volume.
          </li>
          <li>
            <strong>Endurance training:</strong> carbohydrate needs rise with training time. Long
            sessions often call for carbohydrate at the higher end of the range.
          </li>
          <li>
            <strong>Maintenance:</strong> pick a split you like eating and can repeat. A plan you
            follow loosely beats a perfect one you abandon after a fortnight.
          </li>
        </ul>
        <p className="text-gray-600 mb-3">
          Meal timing matters less than daily totals for most people. Eating a meal that contains
          protein and carbohydrate in the few hours around training can help performance and
          recovery, but there is no need to eat on a strict schedule. If you are hungry between
          meals, shifting some calories from carbohydrate or fat toward protein and high-fiber foods
          such as vegetables, beans, and whole grains often helps, because these foods tend to be
          more filling per calorie.
        </p>
      </section>
      <section className="neumorph p-6 rounded-lg mb-8">
        <h2 className="text-2xl font-semibold mb-3">Common Mistakes</h2>
        <ul className="list-disc pl-5 space-y-2 text-gray-600 mb-3">
          <li>
            <strong>Chasing exact numbers every day.</strong> Hitting your targets within about 5 to
            10 grams on most days is plenty.
          </li>
          <li>
            <strong>Treating protein as unlimited.</strong> Very high intakes crowd out other foods
            and add cost without clear extra benefit for most people.
          </li>
          <li>
            <strong>Ignoring food quality.</strong> Macros say nothing about vitamins, minerals, or
            fiber. A day of protein shakes and white bread can hit the same numbers as a day of
            fish, beans and vegetables.
          </li>
          <li>
            <strong>Forgetting liquid calories.</strong> Juice, coffee drinks, and alcohol count
            toward totals.
          </li>
        </ul>
      </section>
      <section className="neumorph p-6 rounded-lg mb-8">
        <h2 className="text-2xl font-semibold mb-3">When to Talk to a Professional</h2>
        <p className="text-gray-600 mb-3">
          People with kidney disease, diabetes, liver disease, or a history of disordered eating
          should plan macros with a doctor or registered dietitian. Protein targets in particular
          may need adjusting for kidney function, and carbohydrate targets interact with diabetes
          medication.
        </p>
      </section>

      <div className="neumorph p-6 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Recommended Calculators</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link href="/macro" className="neumorph p-4 rounded-lg hover:shadow-neumorph-inset">
            <h3 className="font-semibold text-accent">Macro Calculator</h3>
            <p className="text-sm text-gray-600">Set protein, carbs, and fat targets.</p>
          </Link>
          <Link href="/protein" className="neumorph p-4 rounded-lg hover:shadow-neumorph-inset">
            <h3 className="font-semibold text-accent">Protein Intake Calculator</h3>
            <p className="text-sm text-gray-600">Estimate daily protein goals.</p>
          </Link>
          <Link href="/carb-intake" className="neumorph p-4 rounded-lg hover:shadow-neumorph-inset">
            <h3 className="font-semibold text-accent">Carb Intake Calculator</h3>
            <p className="text-sm text-gray-600">Convert carb percentage into grams.</p>
          </Link>
          <Link href="/fat-intake" className="neumorph p-4 rounded-lg hover:shadow-neumorph-inset">
            <h3 className="font-semibold text-accent">Fat Intake Calculator</h3>
            <p className="text-sm text-gray-600">Convert fat percentage into grams.</p>
          </Link>
        </div>
      </div>

      <div className="mt-12 border-t pt-8">
        <h2 className="text-xl font-semibold mb-4">References</h2>
        <ul className="space-y-3 text-sm text-gray-600">
          <li>
            Institute of Medicine. Dietary Reference Intakes for Energy, Carbohydrate, Fiber, Fat,
            Fatty Acids, Cholesterol, Protein, and Amino Acids. Washington, DC: The National
            Academies Press; 2005.
          </li>
          <li>
            U.S. Department of Agriculture and U.S. Department of Health and Human Services. Dietary
            Guidelines for Americans, 2020-2025.
          </li>
          <li>
            Jäger R, Kerksick CM, Campbell BI, et al. International Society of Sports Nutrition
            position stand: protein and exercise. J Int Soc Sports Nutr. 2017;14:20.
          </li>
          <li>
            Morton RW, Murphy KT, McKellar SR, et al. A systematic review, meta-analysis and
            meta-regression of the effect of protein supplementation on resistance training-induced
            gains in muscle mass and strength in healthy adults. Br J Sports Med.
            2018;52(6):376-384.
          </li>
        </ul>
      </div>
    </div>
  );
}
