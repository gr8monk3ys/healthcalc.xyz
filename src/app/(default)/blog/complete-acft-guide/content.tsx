import React from 'react';
import Link from 'next/link';
import AdBlock from '@/components/AdBlock';

const CompleteACFTGuidePageContent = (
  <div className="max-w-4xl mx-auto">
    <div className="mb-8">
      <span className="inline-block bg-accent/10 text-accent text-sm px-3 py-1 rounded-full">
        Military Fitness
      </span>
      <h1 className="text-3xl md:text-4xl font-bold mt-2 mb-4">
        The Complete ACFT Guide: Scoring, Standards, and Strategy
      </h1>
      <p className="text-gray-500 italic">Published: January 8, 2026 &bull; 18 min read</p>
    </div>

    <div className="prose prose-lg max-w-none">
      <div className="neumorph p-6 rounded-lg mb-8">
        <h2 className="text-xl font-semibold mb-4">Key Takeaways</h2>
        <ul className="space-y-2">
          <li>
            The ACFT has six events, each scored 0-100 points. You need at least 60 per event and
            360 total to pass.
          </li>
          <li>
            Scoring is gender- and age-normed, meaning the same raw performance earns different
            points for different demographics.
          </li>
          <li>
            The two-mile run and the leg tuck/plank are statistically the events soldiers fail most
            often.
          </li>
          <li>
            Proper form on each event matters more than raw strength. Small technique fixes can add
            10-20 points.
          </li>
          <li>
            Use our{' '}
            <Link href="/acft-calculator" className="text-accent hover:underline">
              ACFT calculator
            </Link>{' '}
            to estimate your score before test day.
          </li>
        </ul>
      </div>

      <AdBlock format="horizontal" />

      <p>
        I remember my first ACFT. I walked onto the field cocky because I had been crushing the old
        APFT for years. Two hours later I was on my hands and knees after the two-mile run,
        rethinking every training decision I had made in the previous six months. The ACFT is a
        fundamentally different test. It demands a different kind of fitness.
      </p>

      <p>
        Since then, I have coached dozens of soldiers through ACFT preparation, from fresh privates
        barely scraping 360 to NCOs chasing 600. This guide covers everything you need to know about
        the test: what each event involves, how scoring works, where soldiers lose points they
        should not be losing, and how to approach test day strategically.
      </p>

      <h2 className="text-2xl font-bold mt-8 mb-4">
        The Six ACFT Events: What You Are Being Tested On
      </h2>

      <p>
        The ACFT tests six physical domains in a specific order. You cannot rearrange the events.
        You get a minimum rest period between each one. Understanding the flow of the test is just
        as important as training for each event individually.
      </p>

      <h3 className="text-xl font-semibold mt-6 mb-3">
        Event 1: 3 Repetition Maximum Deadlift (MDL)
      </h3>

      <div className="neumorph p-6 rounded-lg my-4">
        <p className="font-semibold mb-2">What it tests:</p>
        <p>
          Lower body and grip strength. You perform three continuous repetitions of a hex bar (trap
          bar) deadlift at the heaviest weight you can manage.
        </p>

        <p className="font-semibold mt-4 mb-2">Equipment:</p>
        <p>
          60-pound hex bar loaded with 10-pound bumper plates in increments. Weight options range
          from 60 lbs to 340 lbs.
        </p>

        <p className="font-semibold mt-4 mb-2">Execution:</p>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>Step inside the hex bar. Feet roughly shoulder-width apart.</li>
          <li>
            Bend at the hips and knees, grip the handles, and stand up straight. That is rep one.
          </li>
          <li>Lower the weight to the ground under control. Do not drop it.</li>
          <li>Complete three reps without releasing the bar.</li>
          <li>
            You get two attempts at your chosen weight. If you fail both, your score is based on
            whatever you successfully lifted before.
          </li>
        </ul>

        <p className="font-semibold mt-4 mb-2">Form cues that matter:</p>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>Drive through your heels. Not your toes.</li>
          <li>
            Keep your back flat. The graders are watching for excessive rounding. A rounded back on
            any rep can get that rep no-counted.
          </li>
          <li>Lock out at the top. Hips fully extended, knees straight, shoulders back.</li>
          <li>
            Control the descent. Slamming the weight down or bouncing it off the ground will cost
            you reps.
          </li>
        </ul>
      </div>

      <div className="overflow-x-auto my-6">
        <table className="min-w-full border-collapse border border-gray-300 dark:border-gray-600 text-sm">
          <caption className="text-base font-semibold mb-2">
            MDL Scoring (Approximate Breakpoints)
          </caption>
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-800">
              <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">
                Points
              </th>
              <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">
                Male (lbs)
              </th>
              <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">
                Female (lbs)
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-semibold">
                100
              </td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">340</td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">210</td>
            </tr>
            <tr className="bg-gray-50 dark:bg-gray-800/50">
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-semibold">
                90
              </td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">300</td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">190</td>
            </tr>
            <tr>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-semibold">
                80
              </td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">260</td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">170</td>
            </tr>
            <tr className="bg-gray-50 dark:bg-gray-800/50">
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-semibold">
                70
              </td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">230</td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">150</td>
            </tr>
            <tr className="bg-green-50 dark:bg-green-900/20">
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-semibold">
                60 (min pass)
              </td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">200</td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">130</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 className="text-xl font-semibold mt-6 mb-3">Event 2: Standing Power Throw (SPT)</h3>

      <div className="neumorph p-6 rounded-lg my-4">
        <p className="font-semibold mb-2">What it tests:</p>
        <p>
          Explosive power from the lower body through the upper body. You throw a 10-pound medicine
          ball backward over your head for maximum distance.
        </p>

        <p className="font-semibold mt-4 mb-2">Execution:</p>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>Stand with your back to the throwing lane, feet shoulder-width apart.</li>
          <li>
            Hold the medicine ball at hip level. Dip into a squat, then explode upward and backward,
            releasing the ball overhead.
          </li>
          <li>You get two record attempts plus one practice throw.</li>
          <li>The best of your two record throws counts.</li>
          <li>
            You can fall backward after the throw, but you cannot step past the start line before
            release.
          </li>
        </ul>

        <p className="font-semibold mt-4 mb-2">Form cues that matter:</p>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>
            This is a legs-first movement. The power comes from your hips and quads, not your arms.
            Think of it as a backwards jump.
          </li>
          <li>
            Release angle matters. Too high and you lose distance. Too low and the ball hits the
            ground early. Aim for roughly 45 degrees.
          </li>
          <li>
            Follow through. Let your body fall backward if needed. Stopping your momentum short
            kills distance.
          </li>
        </ul>
      </div>

      <div className="overflow-x-auto my-6">
        <table className="min-w-full border-collapse border border-gray-300 dark:border-gray-600 text-sm">
          <caption className="text-base font-semibold mb-2">
            SPT Scoring (Approximate Breakpoints)
          </caption>
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-800">
              <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">
                Points
              </th>
              <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">
                Male (meters)
              </th>
              <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">
                Female (meters)
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-semibold">
                100
              </td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">12.5</td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">8.5</td>
            </tr>
            <tr className="bg-gray-50 dark:bg-gray-800/50">
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-semibold">
                90
              </td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">11.0</td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">7.5</td>
            </tr>
            <tr>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-semibold">
                80
              </td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">10.0</td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">6.5</td>
            </tr>
            <tr className="bg-gray-50 dark:bg-gray-800/50">
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-semibold">
                70
              </td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">9.0</td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">5.8</td>
            </tr>
            <tr className="bg-green-50 dark:bg-green-900/20">
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-semibold">
                60 (min pass)
              </td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">8.0</td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">5.0</td>
            </tr>
          </tbody>
        </table>
      </div>

      <AdBlock format="horizontal" />

      <h3 className="text-xl font-semibold mt-6 mb-3">Event 3: Hand-Release Push-Ups (HRP)</h3>

      <div className="neumorph p-6 rounded-lg my-4">
        <p className="font-semibold mb-2">What it tests:</p>
        <p>
          Upper body muscular endurance. You perform as many hand-release push-ups as possible in
          two minutes.
        </p>

        <p className="font-semibold mt-4 mb-2">Execution:</p>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>Start in the front-leaning rest (standard push-up position).</li>
          <li>
            Lower your body to the ground until your chest touches. Your entire body should contact
            the ground.
          </li>
          <li>
            Lift both hands clearly off the ground. This is the "hand release." Your hands must
            visibly leave the surface.
          </li>
          <li>Place your hands back down and push up to the starting position. That is one rep.</li>
          <li>
            Repeat for two minutes. Rest in the front-leaning rest position (not on the ground) if
            you need to pause.
          </li>
        </ul>

        <p className="font-semibold mt-4 mb-2">Form cues that matter:</p>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>
            Keep your body rigid. Sagging hips or piking up will get reps no-counted. The grader is
            watching from the side.
          </li>
          <li>Full arm extension at the top. Your elbows must lock out completely.</li>
          <li>
            The hand release must be clear. Do not just wiggle your fingers. Lift your palms off the
            ground visibly. Some soldiers extend their arms to the side in a "T" position for
            clarity.
          </li>
          <li>
            Pace yourself. Going all-out in the first 30 seconds and burning out is the most common
            mistake I see. Aim for a sustainable rhythm.
          </li>
        </ul>
      </div>

      <div className="overflow-x-auto my-6">
        <table className="min-w-full border-collapse border border-gray-300 dark:border-gray-600 text-sm">
          <caption className="text-base font-semibold mb-2">
            HRP Scoring (Approximate Breakpoints)
          </caption>
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-800">
              <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">
                Points
              </th>
              <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">
                Male (reps)
              </th>
              <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">
                Female (reps)
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-semibold">
                100
              </td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">60</td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">60</td>
            </tr>
            <tr className="bg-gray-50 dark:bg-gray-800/50">
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-semibold">
                90
              </td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">50</td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">45</td>
            </tr>
            <tr>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-semibold">
                80
              </td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">40</td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">35</td>
            </tr>
            <tr className="bg-gray-50 dark:bg-gray-800/50">
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-semibold">
                70
              </td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">35</td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">28</td>
            </tr>
            <tr className="bg-green-50 dark:bg-green-900/20">
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-semibold">
                60 (min pass)
              </td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">30</td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">20</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 className="text-xl font-semibold mt-6 mb-3">Event 4: Sprint-Drag-Carry (SDC)</h3>

      <div className="neumorph p-6 rounded-lg my-4">
        <p className="font-semibold mb-2">What it tests:</p>
        <p>
          Anaerobic endurance, agility, and functional strength. This is five 50-meter shuttles back
          to back, each with a different task. It is the most physically demanding single event on
          the test.
        </p>

        <p className="font-semibold mt-4 mb-2">The five shuttles (250 meters total):</p>
        <ol className="list-decimal list-inside mt-2 space-y-2">
          <li>
            <strong>Sprint:</strong> Sprint 25 meters, touch the line, sprint back.
          </li>
          <li>
            <strong>Drag:</strong> Drag a 90-pound sled 25 meters down, turn around, drag it 25
            meters back.
          </li>
          <li>
            <strong>Lateral:</strong> Lateral shuffle 25 meters down and 25 meters back. You must
            face the same direction both ways (no crossing feet).
          </li>
          <li>
            <strong>Carry:</strong> Pick up two 40-pound kettlebells (80 lbs total), carry them 25
            meters, turn, carry them back.
          </li>
          <li>
            <strong>Sprint:</strong> Final sprint, 25 meters and back.
          </li>
        </ol>

        <p className="font-semibold mt-4 mb-2">Form cues that matter:</p>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>
            Transitions kill time. Practice picking up the sled handles and the kettlebells quickly.
            Every second of fumbling adds up.
          </li>
          <li>
            On the sled drag, stay low and drive with your legs. Do not try to pull with your arms.
            Lean forward, dig in, and push the ground behind you.
          </li>
          <li>
            The lateral shuffle is where technique breaks down. Stay low, keep your feet wide, and
            do not let them cross. Crossing your feet is a no-go.
          </li>
          <li>
            On the carry, grip the kettlebells tight, keep them at your sides, and move with short
            quick steps. Do not sprint with them if it means dropping one.
          </li>
        </ul>
      </div>

      <div className="overflow-x-auto my-6">
        <table className="min-w-full border-collapse border border-gray-300 dark:border-gray-600 text-sm">
          <caption className="text-base font-semibold mb-2">
            SDC Scoring (Approximate Breakpoints)
          </caption>
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-800">
              <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">
                Points
              </th>
              <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">
                Male (time)
              </th>
              <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">
                Female (time)
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-semibold">
                100
              </td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">1:33</td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">1:58</td>
            </tr>
            <tr className="bg-gray-50 dark:bg-gray-800/50">
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-semibold">
                90
              </td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">1:40</td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">2:10</td>
            </tr>
            <tr>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-semibold">
                80
              </td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">1:50</td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">2:20</td>
            </tr>
            <tr className="bg-gray-50 dark:bg-gray-800/50">
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-semibold">
                70
              </td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">2:00</td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">2:30</td>
            </tr>
            <tr className="bg-green-50 dark:bg-green-900/20">
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-semibold">
                60 (min pass)
              </td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">2:10</td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">2:40</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 className="text-xl font-semibold mt-6 mb-3">Event 5: Plank (PLK)</h3>

      <div className="neumorph p-6 rounded-lg my-4">
        <p className="font-semibold mb-2">What it tests:</p>
        <p>
          Core endurance and stability. You hold a proper forearm plank position for as long as
          possible. The Plank replaced the original Leg Tuck event, which had extremely high failure
          rates (over 70% for female soldiers).
        </p>

        <p className="font-semibold mt-4 mb-2">Execution:</p>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>
            Start on the ground, then rise into a forearm plank. Forearms flat, elbows directly
            under your shoulders.
          </li>
          <li>Your body must form a straight line from head to heels. No sagging, no piking.</li>
          <li>
            The clock starts when you assume the position. It stops when you break form or
            voluntarily give up.
          </li>
          <li>The grader will warn you once if your form breaks. Second break ends the event.</li>
        </ul>

        <p className="font-semibold mt-4 mb-2">Form cues that matter:</p>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>
            Squeeze your glutes hard. This is the single best cue for maintaining plank form. It
            locks your pelvis into position and prevents hip sag.
          </li>
          <li>
            Breathe steadily. Holding your breath causes early fatigue. Slow inhale through the
            nose, controlled exhale through the mouth.
          </li>
          <li>
            Focus your eyes on a point on the ground about a foot in front of your hands. This keeps
            your neck neutral.
          </li>
          <li>
            When it gets hard (and it will), mentally break the time into 30-second chunks. "Just 30
            more seconds" is more manageable than "I still have a minute left."
          </li>
        </ul>
      </div>

      <div className="overflow-x-auto my-6">
        <table className="min-w-full border-collapse border border-gray-300 dark:border-gray-600 text-sm">
          <caption className="text-base font-semibold mb-2">
            Plank Scoring (Same for Male and Female)
          </caption>
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-800">
              <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">
                Points
              </th>
              <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">
                Time (min:sec)
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-semibold">
                100
              </td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">3:40</td>
            </tr>
            <tr className="bg-gray-50 dark:bg-gray-800/50">
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-semibold">
                90
              </td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">3:20</td>
            </tr>
            <tr>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-semibold">
                80
              </td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">3:00</td>
            </tr>
            <tr className="bg-gray-50 dark:bg-gray-800/50">
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-semibold">
                70
              </td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">2:40</td>
            </tr>
            <tr className="bg-green-50 dark:bg-green-900/20">
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-semibold">
                60 (min pass)
              </td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">2:20</td>
            </tr>
          </tbody>
        </table>
      </div>

      <AdBlock format="horizontal" />

      <h3 className="text-xl font-semibold mt-6 mb-3">Event 6: Two-Mile Run (2MR)</h3>

      <div className="neumorph p-6 rounded-lg my-4">
        <p className="font-semibold mb-2">What it tests:</p>
        <p>
          Aerobic endurance. You run two miles as fast as possible. This is the final event, which
          means you are already fatigued from the previous five events. That fatigue is the point.
          The ACFT tests your ability to perform under accumulated physical stress.
        </p>

        <p className="font-semibold mt-4 mb-2">Execution:</p>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>
            Run on a measured course (usually a track, sometimes a road loop). The course must be
            certified or measured.
          </li>
          <li>Walking is permitted, but it will destroy your time.</li>
          <li>
            Pacing is critical. Going out too fast after the SDC and plank will result in a brutal
            second mile.
          </li>
        </ul>

        <p className="font-semibold mt-4 mb-2">Strategy notes:</p>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>
            Aim for even splits. If your target is 16:00, that means 2:00 per quarter mile, or
            roughly 8:00 per mile. Going out at 7:30 on your first mile and dying to a 9:00 second
            mile is worse than running two 8:00 miles.
          </li>
          <li>
            The first 400 meters will feel deceptively easy because adrenaline is masking your
            fatigue. Do not trust that feeling. Stick to your pace.
          </li>
          <li>
            Mental toughness matters most between miles 1 and 1.5. That is where the fatigue from
            the previous events really hits. Push through that window.
          </li>
        </ul>
      </div>

      <div className="overflow-x-auto my-6">
        <table className="min-w-full border-collapse border border-gray-300 dark:border-gray-600 text-sm">
          <caption className="text-base font-semibold mb-2">
            2MR Scoring (Approximate Breakpoints)
          </caption>
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-800">
              <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">
                Points
              </th>
              <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">
                Male (time)
              </th>
              <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">
                Female (time)
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-semibold">
                100
              </td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">13:00</td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">15:00</td>
            </tr>
            <tr className="bg-gray-50 dark:bg-gray-800/50">
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-semibold">
                90
              </td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">14:00</td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">16:00</td>
            </tr>
            <tr>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-semibold">
                80
              </td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">15:00</td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">17:30</td>
            </tr>
            <tr className="bg-gray-50 dark:bg-gray-800/50">
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-semibold">
                70
              </td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">16:00</td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">18:30</td>
            </tr>
            <tr className="bg-green-50 dark:bg-green-900/20">
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-semibold">
                60 (min pass)
              </td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">17:00</td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">20:00</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 className="text-2xl font-bold mt-8 mb-4">How ACFT Scoring Works</h2>

      <p>
        Each event is scored on a 0-100 point scale. Your total ACFT score is the sum of all six
        events, meaning the maximum possible score is 600. But here is the critical part that
        catches soldiers off guard: you must score at least 60 points on every single event.
      </p>

      <p>
        That means you can score 100 on five events and 58 on one event, and you fail the entire
        test. I have seen this happen. A sergeant who maxed the deadlift, crushed the push-ups, and
        ran a 14-minute two-mile run. Failed because his plank gave out at 2:05. Fifty-seven points.
        Two minutes and twenty seconds was the target. He missed it by fifteen seconds.
      </p>

      <div className="neumorph p-6 rounded-lg my-6">
        <h3 className="text-xl font-semibold mb-4">Overall Score Categories</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-gray-300 dark:border-gray-600 text-sm">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-800">
                <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">
                  Category
                </th>
                <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">
                  Total Score Required
                </th>
                <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">
                  What It Means
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-semibold">
                  Gold
                </td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">540+</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">
                  Elite performance. Averaging 90+ per event.
                </td>
              </tr>
              <tr className="bg-gray-50 dark:bg-gray-800/50">
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-semibold">
                  Silver
                </td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">480-539</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">
                  Strong performance. Averaging 80+ per event.
                </td>
              </tr>
              <tr>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-semibold">
                  Bronze
                </td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">420-479</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">
                  Solid performance. Averaging 70+ per event.
                </td>
              </tr>
              <tr className="bg-gray-50 dark:bg-gray-800/50">
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-semibold">
                  Pass
                </td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">360-419</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">
                  Meets minimum standard. 60+ on every event.
                </td>
              </tr>
              <tr className="bg-red-50 dark:bg-red-900/20">
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-semibold">
                  Fail
                </td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">
                  Below 360 or any event below 60
                </td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">
                  Does not meet standard. Requires retest.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <h2 className="text-2xl font-bold mt-8 mb-4">Gender and Age Group Considerations</h2>

      <p>
        ACFT scoring is gender- and age-normed. This means that the raw performance required to earn
        a specific number of points varies depending on whether you are male or female and which age
        bracket you fall into. A 25-year-old male needs to deadlift 200 lbs for 60 points, while a
        25-year-old female needs 130 lbs for the same score.
      </p>

      <p>
        The age brackets are: 17-21, 22-26, 27-31, 32-36, 37-41, 42-46, 47-51, 52-56, 57-61, and
        62+. As you age, the standards adjust. A 50-year-old male does not need the same two-mile
        run time as a 22-year-old. The adjustments are not dramatic between adjacent brackets, but
        they compound. The difference between the 22-26 and 47-51 brackets is significant.
      </p>

      <p>
        The Plank is the one event that uses the same scoring scale for both genders. Every other
        event has separate male and female tables. This is important to keep in mind when comparing
        scores across a unit.
      </p>

      <h2 className="text-2xl font-bold mt-8 mb-4">Common Mistakes That Cost Points</h2>

      <p>
        I have graded hundreds of ACFT attempts. These are the mistakes I see over and over again.
      </p>

      <div className="neumorph p-6 rounded-lg my-6">
        <h3 className="text-lg font-semibold mb-3">Deadlift: Not locking out at the top</h3>
        <p>
          Soldiers rush through reps and fail to fully extend at the hip. The grader needs to see a
          clear lockout. Hips forward, shoulders back, knees straight. If any of those are missing,
          the rep does not count. I have watched soldiers lift 300 lbs and get credit for zero reps
          because they never fully stood up.
        </p>
      </div>

      <div className="neumorph p-6 rounded-lg my-6">
        <h3 className="text-lg font-semibold mb-3">Power Throw: Stepping over the line</h3>
        <p>
          In the excitement of throwing, soldiers step past the start line before releasing the
          ball. That throw is a foul. You only get two record attempts. Fouling one of them puts
          enormous pressure on the other.
        </p>
      </div>

      <div className="neumorph p-6 rounded-lg my-6">
        <h3 className="text-lg font-semibold mb-3">Push-Ups: Inadequate hand release</h3>
        <p>
          The hand release must be obvious. Barely lifting your pinky finger is not going to cut it.
          Graders want to see daylight between your palms and the ground. Some soldiers find it
          helpful to extend their arms out to the sides in a "T" position for maximum clarity.
        </p>
      </div>

      <div className="neumorph p-6 rounded-lg my-6">
        <h3 className="text-lg font-semibold mb-3">SDC: Slow transitions between legs</h3>
        <p>
          The time between each shuttle phase adds up fast. Fumbling with the sled straps,
          hesitating before picking up the kettlebells, standing around at the turnaround line. I
          have seen soldiers lose 10-15 seconds just in transition time. Practice the full event end
          to end and focus specifically on your transitions.
        </p>
      </div>

      <div className="neumorph p-6 rounded-lg my-6">
        <h3 className="text-lg font-semibold mb-3">Plank: Holding your breath</h3>
        <p>
          Under strain, your instinct is to hold your breath and brace. That works for a 10-second
          max effort. It does not work for a 2+ minute isometric hold. You need to breathe
          rhythmically while maintaining abdominal tension. Practice this before test day. It is a
          skill, not something you figure out in the moment.
        </p>
      </div>

      <div className="neumorph p-6 rounded-lg my-6">
        <h3 className="text-lg font-semibold mb-3">Two-Mile Run: Going out too fast</h3>
        <p>
          After five events, you are running on fumes. The adrenaline of starting the run masks how
          tired you actually are. Soldiers go out 20-30 seconds per lap faster than their goal pace
          and completely fall apart by the fourth lap. Negative splits (running the second mile
          faster than the first) almost never happen on the ACFT. The goal is to limit how much you
          slow down.
        </p>
      </div>

      <h2 className="text-2xl font-bold mt-8 mb-4">Test Day Strategy</h2>

      <p>
        Training is only half the battle. How you approach test day determines whether your training
        translates to your score.
      </p>

      <div className="neumorph p-6 rounded-lg my-6">
        <h3 className="text-lg font-semibold mb-3">The night before:</h3>
        <ul className="list-disc list-inside space-y-1">
          <li>
            Eat a normal dinner. Nothing exotic. Not the time to try a new restaurant or experiment
            with pre-workout nutrition.
          </li>
          <li>
            Sleep 7-8 hours if possible. You will not make up for months of poor sleep in one night,
            but do not sabotage yourself either.
          </li>
          <li>Lay out your gear. Know exactly what you are wearing and where it is.</li>
        </ul>

        <h3 className="text-lg font-semibold mt-4 mb-3">Morning of:</h3>
        <ul className="list-disc list-inside space-y-1">
          <li>
            Eat 2-3 hours before the test starts. Something you have eaten before training sessions.
            Toast with peanut butter, a banana, oatmeal. Nothing heavy.
          </li>
          <li>Hydrate, but do not overdo it. Sipping water, not chugging it.</li>
          <li>
            Arrive early. Get your lane assignment. Walk through the event stations. Visualize your
            plan for each event.
          </li>
        </ul>

        <h3 className="text-lg font-semibold mt-4 mb-3">During the test:</h3>
        <ul className="list-disc list-inside space-y-1">
          <li>
            Warm up before the deadlift. Bodyweight squats, hip hinges, a few sets with light
            weight. Your first attempt should not be the first time you touch the bar that day.
          </li>
          <li>
            Between events, stay loose. Walk around. Do not sit down and stiffen up. Light movement
            keeps blood flowing and maintains readiness.
          </li>
          <li>
            Sip water between events. Not large amounts. Just enough to stay hydrated without
            feeling sloshy.
          </li>
        </ul>
      </div>

      <h2 className="text-2xl font-bold mt-8 mb-4">Calculate Your ACFT Score</h2>

      <p>
        Knowing where you stand before test day is half the battle. Plug your current performance
        numbers into our{' '}
        <Link href="/acft-calculator" className="text-accent hover:underline">
          ACFT calculator
        </Link>{' '}
        to see your estimated score, identify which events need the most work, and figure out
        exactly what you need to improve to hit your target category.
      </p>

      <div className="neumorph p-6 rounded-lg my-6">
        <p>
          The calculator will break down your score by event, show you whether you are passing or
          failing each one, and give you your overall category (Gold, Silver, Bronze, Pass, or
          Fail). Use it regularly during your training cycle to track progress.
        </p>
        <p className="mt-4">
          <Link
            href="/acft-calculator"
            className="inline-block bg-accent text-white px-6 py-3 rounded-lg font-semibold hover:bg-accent/90 transition-colors"
          >
            Try the ACFT Calculator
          </Link>
        </p>
      </div>

      <h2 className="text-2xl font-bold mt-8 mb-4">The Bottom Line</h2>

      <p>
        The ACFT is not a test you cram for. It tests a broad range of physical fitness across
        strength, power, endurance, and core stability. That breadth is what makes it harder than
        the old APFT. You cannot just be a good runner or a strong lifter. You have to be both, plus
        everything in between.
      </p>

      <p>
        The good news is that with focused training, most soldiers can pass the ACFT comfortably
        within 8-12 weeks. The bad news is that "focused" means actually addressing your weaknesses
        instead of doing more of what you are already good at. If your deadlift is strong but your
        run is weak, you need to run more, not deadlift more. That sounds obvious, but I watch
        soldiers ignore it constantly.
      </p>

      <p>
        Train smart, practice the actual events, know the standards, and do not leave points on the
        table through poor technique. The ACFT rewards preparation over raw talent.
      </p>

      <div className="mt-12 border-t pt-8">
        <h3 className="text-xl font-semibold mb-4">References</h3>
        <ul className="space-y-3 text-sm text-gray-600">
          <li>U.S. Army FM 7-22: Holistic Health and Fitness (2020). Department of the Army.</li>
          <li>Army Regulation 350-1: Army Training and Leader Development (2022).</li>
          <li>
            ACFT Scoring Scales, effective March 23, 2022. U.S. Army Center for Initial Military
            Training.
          </li>
          <li>
            Military.com. &quot;Nearly Half of Female Soldiers Still Failing New Army Fitness
            Test.&quot; May 2021.
          </li>
          <li>
            Army Times. &quot;New data shows performance divide on Army Combat Fitness Test.&quot;
            November 2019.
          </li>
        </ul>
      </div>
    </div>
  </div>
);

export default function CompleteACFTGuidePage() {
  return CompleteACFTGuidePageContent;
}
