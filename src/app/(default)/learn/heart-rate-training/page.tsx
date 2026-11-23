import React from 'react';
import Link from 'next/link';

export const metadata = {
  alternates: { canonical: './' },
  title: 'Heart Rate Training | HealthCalc',
  description:
    'How maximum heart rate is estimated, how percent-of-max and Karvonen heart rate reserve zones differ, and how to use zones to set training intensity.',
};

export default function HeartRateTrainingGuide() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Heart Rate Training</h1>
      <p className="text-gray-600 mb-6">
        Heart rate is one of the easiest ways to tell how hard you are working. It climbs
        predictably with effort, and you can measure it with a chest strap, a watch or two fingers
        on your wrist. Log it for a few weeks and you can compare one session with another. This
        guide covers how maximum heart rate is estimated and the two main ways to turn it into
        training zones. After that we explain what each zone is for and where heart rate stops being
        a reliable guide.
      </p>
      <section className="neumorph p-6 rounded-lg mb-8">
        <h2 className="text-2xl font-semibold mb-3">Resting Heart Rate</h2>
        <p className="text-gray-600 mb-3">
          Resting heart rate is your pulse when you are calm and have been sitting or lying quietly
          for several minutes. The American Heart Association describes a normal adult resting rate
          as 60 to 100 beats per minute, and well-trained endurance athletes often sit lower. The
          best time to measure is right after waking, before coffee or getting out of bed. A resting
          rate that stays several beats higher than your usual baseline for days can be a sign of
          illness, poor sleep, or accumulated fatigue.
        </p>
      </section>
      <section className="neumorph p-6 rounded-lg mb-8">
        <h2 className="text-2xl font-semibold mb-3">Estimating Maximum Heart Rate</h2>
        <p className="text-gray-600 mb-3">
          Maximum heart rate (HRmax) is the highest rate your heart reaches during all-out effort.
          It falls with age, and it varies between people of the same age by 10 beats per minute or
          more, so any formula is only an estimate.
        </p>
        <ul className="list-disc pl-5 space-y-2 text-gray-600 mb-3">
          <li>
            <strong>Traditional formula:</strong> HRmax = 220 − age. It is simple and widely used,
            and it is the basis of our heart rate zones and target heart rate calculators.
          </li>
          <li>
            <strong>Tanaka formula:</strong> HRmax = 208 − 0.7 × age. Published in 2001 from a large
            meta-analysis, it tends to fit older adults better.
          </li>
        </ul>
        <p className="text-gray-600 mb-3">
          For a 50-year-old, the traditional formula gives 170 beats per minute and the Tanaka
          formula gives 208 − 35 = 173. The two agree at age 40 (both 180) and drift apart further
          from that age. Our max heart rate calculator shows both so you can see the range.
        </p>
        <p className="text-gray-600 mb-3">
          The only way to know your true maximum is a supervised maximal exercise test. If you have
          a heart condition, high blood pressure, or have been inactive, get medical clearance
          before trying to reach your maximum.
        </p>
      </section>
      <section className="neumorph p-6 rounded-lg mb-8">
        <h2 className="text-2xl font-semibold mb-3">Two Ways to Build Zones</h2>
        <p className="text-gray-600 mb-3">
          <strong>Percent of maximum</strong> multiplies HRmax by a percentage. It needs only your
          age.
        </p>
        <p className="text-gray-600 mb-3">
          <strong>Heart rate reserve (Karvonen method)</strong> uses the gap between maximum and
          resting heart rate:
        </p>
        <ul className="list-disc pl-5 space-y-2 text-gray-600 mb-3">
          <li>Target = (HRmax − resting HR) × intensity + resting HR</li>
        </ul>
        <p className="text-gray-600 mb-3">
          Worked example for a 50-year-old with a resting heart rate of 60 and an estimated maximum
          of 170:
        </p>
        <ul className="list-disc pl-5 space-y-2 text-gray-600 mb-3">
          <li>Percent of max at 60 to 70 percent: 102 to 119 beats per minute.</li>
          <li>
            Karvonen at 60 to 70 percent: reserve is 170 − 60 = 110, so the range is 110 × 0.6 + 60
            = 126 to 110 × 0.7 + 60 = 137 beats per minute.
          </li>
        </ul>
        <p className="text-gray-600 mb-3">
          The Karvonen method gives higher numbers at the same percentage because it accounts for
          your resting rate. For fit people with low resting rates, that difference is large enough
          to change how a workout feels. Our heart rate zones calculator offers both methods.
        </p>
      </section>
      <section className="neumorph p-6 rounded-lg mb-8">
        <h2 className="text-2xl font-semibold mb-3">What the Zones Are For</h2>
        <p className="text-gray-600 mb-3">
          The CDC describes moderate-intensity activity as about 64 to 76 percent of maximum heart
          rate and vigorous activity as about 77 to 93 percent. Five-zone systems split that range
          further:
        </p>
        <ul className="list-disc pl-5 space-y-2 text-gray-600 mb-3">
          <li>
            <strong>Zone 1 (very light):</strong> warm-ups, cool-downs, and recovery days.
          </li>
          <li>
            <strong>Zone 2 (light):</strong> easy aerobic work you could sustain for a long time
            while holding a conversation. Most endurance training volume lives here.
          </li>
          <li>
            <strong>Zone 3 (moderate):</strong> steady, comfortably hard efforts.
          </li>
          <li>
            <strong>Zone 4 (hard):</strong> threshold intervals you can hold for several minutes at
            a time.
          </li>
          <li>
            <strong>Zone 5 (maximum):</strong> short, very hard efforts.
          </li>
        </ul>
        <p className="text-gray-600 mb-3">
          The U.S. Physical Activity Guidelines recommend at least 150 to 300 minutes of moderate
          activity or 75 to 150 minutes of vigorous activity per week for adults, or an equivalent
          mix, plus muscle-strengthening activity on two or more days.
        </p>
      </section>
      <section className="neumorph p-6 rounded-lg mb-8">
        <h2 className="text-2xl font-semibold mb-3">Limits and Common Mistakes</h2>
        <ul className="list-disc pl-5 space-y-2 text-gray-600 mb-3">
          <li>
            <strong>Heart rate lag.</strong> During short intervals, heart rate takes a minute or
            more to catch up with effort. Use pace, power, or perceived effort for very short
            repeats.
          </li>
          <li>
            <strong>Cardiac drift.</strong> On long or hot sessions, heart rate creeps up even at a
            steady pace, mainly due to rising body temperature and fluid loss.
          </li>
          <li>
            <strong>Wrist sensors.</strong> Optical wrist monitors can be inaccurate during
            intervals or lifting. A chest strap is usually more reliable.
          </li>
          <li>
            <strong>Day-to-day factors.</strong> Caffeine, heat, dehydration, stress, and poor sleep
            all raise heart rate.
          </li>
          <li>
            <strong>Medication.</strong> Beta blockers and some other drugs blunt the heart rate
            response, which makes formula-based zones misleading. Use perceived exertion instead and
            ask your doctor for guidance.
          </li>
        </ul>
      </section>
      <section className="neumorph p-6 rounded-lg mb-8">
        <h2 className="text-2xl font-semibold mb-3">When to Talk to a Professional</h2>
        <p className="text-gray-600 mb-3">
          Stop exercising and seek medical help if you have chest pain, unusual shortness of breath,
          dizziness, or a racing or irregular heartbeat. Talk to a doctor before starting vigorous
          training if you have heart disease, diabetes, or kidney disease, or if you have symptoms
          that suggest any of these.
        </p>
      </section>

      <div className="neumorph p-6 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Recommended Calculators</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link
            href="/max-heart-rate"
            className="neumorph p-4 rounded-lg hover:shadow-neumorph-inset"
          >
            <h3 className="font-semibold text-accent">Max Heart Rate Calculator</h3>
            <p className="text-sm text-gray-600">Estimate max HR with common formulas.</p>
          </Link>
          <Link
            href="/target-heart-rate"
            className="neumorph p-4 rounded-lg hover:shadow-neumorph-inset"
          >
            <h3 className="font-semibold text-accent">Target Heart Rate Calculator</h3>
            <p className="text-sm text-gray-600">Calculate your training zone range.</p>
          </Link>
          <Link
            href="/heart-rate-zones"
            className="neumorph p-4 rounded-lg hover:shadow-neumorph-inset"
          >
            <h3 className="font-semibold text-accent">Heart Rate Zones Calculator</h3>
            <p className="text-sm text-gray-600">Zones with optional resting heart rate.</p>
          </Link>
          <Link
            href="/resting-heart-rate"
            className="neumorph p-4 rounded-lg hover:shadow-neumorph-inset"
          >
            <h3 className="font-semibold text-accent">Resting Heart Rate Calculator</h3>
            <p className="text-sm text-gray-600">Evaluate fitness based on resting HR.</p>
          </Link>
        </div>
      </div>

      <div className="mt-12 border-t pt-8">
        <h2 className="text-xl font-semibold mb-4">References</h2>
        <ul className="space-y-3 text-sm text-gray-600">
          <li>
            Tanaka H, Monahan KD, Seals DR. Age-predicted maximal heart rate revisited. J Am Coll
            Cardiol. 2001;37(1):153-156.
          </li>
          <li>
            Karvonen MJ, Kentala E, Mustala O. The effects of training on heart rate; a longitudinal
            study. Ann Med Exp Biol Fenn. 1957;35(3):307-315.
          </li>
          <li>
            American College of Sports Medicine. ACSM&apos;s Guidelines for Exercise Testing and
            Prescription. Philadelphia: Wolters Kluwer.
          </li>
          <li>
            Centers for Disease Control and Prevention. Target Heart Rate and Estimated Maximum
            Heart Rate.
          </li>
          <li>
            U.S. Department of Health and Human Services. Physical Activity Guidelines for
            Americans, 2nd edition. Washington, DC; 2018.
          </li>
          <li>American Heart Association. All About Heart Rate (Pulse).</li>
        </ul>
      </div>
    </div>
  );
}
