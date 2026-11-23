import React from 'react';
import Link from 'next/link';

export const metadata = {
  alternates: { canonical: './' },
  title: 'Walking & Running Energy | HealthCalc',
  description:
    'How calories burned walking and running are estimated with MET values, how steps convert to distance, and why tracker numbers often differ from the estimates.',
};

export default function WalkingRunningEnergyGuide() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Walking & Running Energy</h1>
      <p className="text-gray-600 mb-6">
        For most people, walking and running are how activity fits into the day, and the energy they
        burn is fairly predictable. Body weight, distance and speed do most of the work. This guide
        explains the MET method behind our activity calculators and how steps turn into distance. It
        also compares walking with running and covers why the number on your watch often disagrees
        with ours.
      </p>
      <section className="neumorph p-6 rounded-lg mb-8">
        <h2 className="text-2xl font-semibold mb-3">What a MET Is</h2>
        <p className="text-gray-600 mb-3">
          A MET, or metabolic equivalent of task, compares the energy cost of an activity with
          sitting quietly. One MET is roughly the energy you use at rest, conventionally set at 3.5
          milliliters of oxygen per kilogram of body weight per minute. An activity rated 4 METs
          costs about four times as much energy as resting.
        </p>
        <p className="text-gray-600 mb-3">
          The Compendium of Physical Activities, a research catalogue maintained since 1993 and
          updated in 2011, lists MET values for hundreds of activities. For walking on level ground,
          values rise from about 3.0 at 2.5 mph to 5.0 at 4.0 mph. Running at 6 mph (a 10-minute
          mile) is listed at 9.8 METs.
        </p>
      </section>
      <section className="neumorph p-6 rounded-lg mb-8">
        <h2 className="text-2xl font-semibold mb-3">The Calorie Formula</h2>
        <p className="text-gray-600 mb-3">The standard conversion from METs to calories is:</p>
        <ul className="list-disc pl-5 space-y-2 text-gray-600 mb-3">
          <li>Calories per minute = MET × 3.5 × body weight (kg) ÷ 200</li>
        </ul>
        <p className="text-gray-600 mb-3">
          Worked example: a 70 kg person walking for 30 minutes at 3 mph (3.3 METs, the value our
          walking calculator uses) burns 3.3 × 3.5 × 70 ÷ 200 = 4.0 calories per minute, or about
          121 calories in total.
        </p>
        <p className="text-gray-600 mb-3">
          That figure is the gross energy cost, which includes the energy you would have burned
          anyway sitting still. To estimate only the extra calories from the walk, subtract one MET:
          2.3 × 3.5 × 70 ÷ 200 × 30 = about 85 calories. The difference matters if you are adding
          exercise calories on top of a daily calorie target.
        </p>
        <p className="text-gray-600 mb-3">
          The same 70 kg person running at 6 mph for 30 minutes burns 9.8 × 3.5 × 70 ÷ 200 × 30, or
          about 360 calories, and covers about 3 miles (4.8 km).
        </p>
      </section>
      <section className="neumorph p-6 rounded-lg mb-8">
        <h2 className="text-2xl font-semibold mb-3">Walking Versus Running</h2>
        <p className="text-gray-600 mb-3">
          Per minute, running burns far more than walking. Per mile, the gap is much smaller,
          because running covers the distance faster. A common rule of thumb is that running costs
          roughly 1 calorie per kilogram of body weight per kilometer, so a 70 kg runner uses
          roughly 350 calories over 5 km. Brisk walking over the same distance costs somewhat less,
          and the gap narrows further at very fast walking speeds, where walking becomes
          inefficient.
        </p>
        <p className="text-gray-600 mb-3">A few things follow from this:</p>
        <ul className="list-disc pl-5 space-y-2 text-gray-600 mb-3">
          <li>
            Heavier people burn more calories for the same distance, because they move more mass.
          </li>
          <li>
            Hills raise the cost substantially. Walking uphill can match the energy cost of running
            on flat ground.
          </li>
          <li>
            Pace matters less than time and distance for total energy use. Choose the pace you can
            repeat.
          </li>
        </ul>
        <p className="text-gray-600 mb-3">
          A simple way to judge intensity without a device is the talk test. At a moderate pace you
          can talk in full sentences but not sing. At a vigorous pace you can only say a few words
          before pausing for breath. The Physical Activity Guidelines for Americans treat brisk
          walking as moderate activity and running as vigorous activity, and count one minute of
          vigorous activity as roughly equal to two minutes of moderate activity.
        </p>
      </section>
      <section className="neumorph p-6 rounded-lg mb-8">
        <h2 className="text-2xl font-semibold mb-3">Converting Steps to Distance</h2>
        <p className="text-gray-600 mb-3">
          Distance equals steps multiplied by stride length. Stride length varies with height, leg
          length, and pace, so the most accurate approach is to measure your own: walk a known
          distance, such as a running track lap, count your steps, and divide.
        </p>
        <p className="text-gray-600 mb-3">
          With a stride of 2.5 feet, one mile takes 5,280 ÷ 2.5 = 2,112 steps, and 10,000 steps
          covers about 4.7 miles. A shorter stride means more steps per mile. Running strides are
          longer than walking strides, so use a separate figure for each.
        </p>
        <p className="text-gray-600 mb-3">
          The 10,000-step goal began as a marketing slogan rather than a research finding. A 2022
          meta-analysis of 15 cohort studies found that the risk of death kept falling as daily
          steps rose, levelling off at roughly 6,000 to 8,000 steps per day for adults aged 60 and
          over and 8,000 to 10,000 for younger adults. If you are starting from a low count, any
          increase is worth having.
        </p>
      </section>
      <section className="neumorph p-6 rounded-lg mb-8">
        <h2 className="text-2xl font-semibold mb-3">Why Your Tracker Disagrees</h2>
        <ul className="list-disc pl-5 space-y-2 text-gray-600 mb-3">
          <li>
            <strong>Different formulas.</strong> Devices combine heart rate, motion, and your
            profile in proprietary ways, and validation studies often find energy estimates off by a
            wide margin.
          </li>
          <li>
            <strong>Gross versus net.</strong> Some apps report total calories during the activity,
            others only the extra.
          </li>
          <li>
            <strong>Wrong profile data.</strong> An outdated weight changes every estimate.
          </li>
          <li>
            <strong>Terrain and carrying loads.</strong> A backpack, stroller, or soft sand all
            raise the real cost.
          </li>
        </ul>
        <p className="text-gray-600 mb-3">
          Whichever estimate you use, check it against what your weight does over several weeks.
          That is the real test.
        </p>
      </section>
      <section className="neumorph p-6 rounded-lg mb-8">
        <h2 className="text-2xl font-semibold mb-3">When to Talk to a Professional</h2>
        <p className="text-gray-600 mb-3">
          If you have joint pain, heart or lung disease, or balance problems, ask a doctor or
          physical therapist how to build up safely. Stop and seek help for chest pain, severe
          breathlessness, or dizziness. People who have been inactive can usually start with short,
          easy walks and add a few minutes each week.
        </p>
      </section>

      <div className="neumorph p-6 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Recommended Calculators</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link
            href="/calories-burned-walking"
            className="neumorph p-4 rounded-lg hover:shadow-neumorph-inset"
          >
            <h3 className="font-semibold text-accent">Calories Burned Walking</h3>
            <p className="text-sm text-gray-600">Estimate walking calorie burn.</p>
          </Link>
          <Link
            href="/calories-burned-running"
            className="neumorph p-4 rounded-lg hover:shadow-neumorph-inset"
          >
            <h3 className="font-semibold text-accent">Calories Burned Running</h3>
            <p className="text-sm text-gray-600">Estimate running calorie burn.</p>
          </Link>
          <Link
            href="/calories-burned"
            className="neumorph p-4 rounded-lg hover:shadow-neumorph-inset"
          >
            <h3 className="font-semibold text-accent">Calories Burned Calculator</h3>
            <p className="text-sm text-gray-600">General workout calorie estimate.</p>
          </Link>
          <Link
            href="/steps-to-miles"
            className="neumorph p-4 rounded-lg hover:shadow-neumorph-inset"
          >
            <h3 className="font-semibold text-accent">Steps to Miles</h3>
            <p className="text-sm text-gray-600">Convert steps into distance.</p>
          </Link>
        </div>
      </div>

      <div className="mt-12 border-t pt-8">
        <h2 className="text-xl font-semibold mb-4">References</h2>
        <ul className="space-y-3 text-sm text-gray-600">
          <li>
            Ainsworth BE, Haskell WL, Herrmann SD, et al. 2011 Compendium of Physical Activities: a
            second update of codes and MET values. Med Sci Sports Exerc. 2011;43(8):1575-1581.
          </li>
          <li>
            American College of Sports Medicine. ACSM&apos;s Guidelines for Exercise Testing and
            Prescription. Philadelphia: Wolters Kluwer.
          </li>
          <li>
            Paluch AE, Bajpai S, Bassett DR, et al. Daily steps and all-cause mortality: a
            meta-analysis of 15 international cohorts. Lancet Public Health. 2022;7(3):e219-e228.
          </li>
          <li>
            U.S. Department of Health and Human Services. Physical Activity Guidelines for
            Americans, 2nd edition. Washington, DC; 2018.
          </li>
        </ul>
      </div>
    </div>
  );
}
