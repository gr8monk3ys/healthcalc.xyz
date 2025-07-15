import React from 'react';
import Link from 'next/link';
import AdBlock from '@/components/AdBlock';

const ACFTTrainingPlanPageContent = (
  <div className="max-w-4xl mx-auto">
    <div className="mb-8">
      <span className="inline-block bg-accent/10 text-accent text-sm px-3 py-1 rounded-full">
        Military Fitness
      </span>
      <h1 className="text-3xl md:text-4xl font-bold mt-2 mb-4">
        ACFT Training: Event-by-Event Workout Plans That Actually Work
      </h1>
      <p className="text-gray-500 italic">Published: January 15, 2026 &bull; 21 min read</p>
    </div>

    <div className="prose prose-lg max-w-none">
      <div className="neumorph p-6 rounded-lg mb-8">
        <h2 className="text-xl font-semibold mb-4">Key Takeaways</h2>
        <ul className="space-y-2">
          <li>
            An 8-week program is the minimum effective training block for meaningful ACFT
            improvement. Less than that and you are just familiarizing yourself with the events.
          </li>
          <li>
            Training each event in isolation is a mistake. The ACFT tests your ability to perform
            under accumulated fatigue, so your training should reflect that.
          </li>
          <li>
            Your two-mile run time will improve more from interval training and threshold runs than
            from just running more miles at a comfortable pace.
          </li>
          <li>
            Push-up volume programs fail because soldiers only do push-ups. You need to build the
            supporting muscles (chest, triceps, shoulders) separately.
          </li>
          <li>
            Check your progress regularly with our{' '}
            <Link href="/acft-calculator" className="text-accent hover:underline">
              ACFT calculator
            </Link>{' '}
            to track which events are improving and which need more attention.
          </li>
        </ul>
      </div>

      <AdBlock format="horizontal" />

      <p>
        I have trained for the ACFT the wrong way and the right way. The wrong way was doing random
        workouts and hoping that general fitness would carry me. It did not. I scored 430 on my
        first attempt. Not bad, but nowhere near where I wanted to be.
      </p>

      <p>
        The right way was building a structured program that addressed each event with specific
        training methods, progressed intensity over 8 weeks, and peaked for test day. That approach
        took me from 430 to 548 in a single training cycle. The program I am sharing here is based
        on what worked for me and for the soldiers I have coached since.
      </p>

      <h2 className="text-2xl font-bold mt-8 mb-4">The 8-Week Program Structure</h2>

      <p>
        Eight weeks divides cleanly into three phases. Weeks 1-3 build your base. Weeks 4-6 increase
        intensity and specificity. Weeks 7-8 are about peaking and tapering. Each phase has a
        distinct purpose, and skipping ahead is counterproductive.
      </p>

      <div className="neumorph p-6 rounded-lg my-6">
        <h3 className="text-lg font-semibold mb-3">Phase 1: Foundation (Weeks 1-3)</h3>
        <ul className="list-disc list-inside space-y-1">
          <li>Focus on movement quality and building work capacity</li>
          <li>Moderate weights, moderate volume, lots of technique practice</li>
          <li>Running: build your weekly mileage base with easy runs</li>
          <li>Practice each ACFT event at least once per week at low intensity</li>
        </ul>

        <h3 className="text-lg font-semibold mt-4 mb-3">Phase 2: Build (Weeks 4-6)</h3>
        <ul className="list-disc list-inside space-y-1">
          <li>Increase intensity across all events</li>
          <li>Heavier deadlifts, faster SDC practice, harder run intervals</li>
          <li>Start combining events in single sessions to build fatigue tolerance</li>
          <li>Test yourself on each event to establish current benchmarks</li>
        </ul>

        <h3 className="text-lg font-semibold mt-4 mb-3">Phase 3: Peak and Taper (Weeks 7-8)</h3>
        <ul className="list-disc list-inside space-y-1">
          <li>Reduce volume but maintain intensity</li>
          <li>Practice full ACFT simulation in Week 7</li>
          <li>Light activity only in the 3-4 days before the test</li>
          <li>Focus on sleep, nutrition, and mental preparation</li>
        </ul>
      </div>

      <h2 className="text-2xl font-bold mt-8 mb-4">Event 1: 3 Repetition Maximum Deadlift (MDL)</h2>

      <p>
        Here is my strong opinion on ACFT deadlift training: most soldiers do not deadlift heavy
        enough in training. They get nervous about injury, stick to moderate weights, and then
        wonder why they stall at 200 lbs on test day. The deadlift is a strength event. You need to
        train heavy to get stronger. Period.
      </p>

      <h3 className="text-xl font-semibold mt-6 mb-3">Deadlift Progression Plan</h3>

      <div className="neumorph p-6 rounded-lg my-4">
        <p className="font-semibold mb-2">Phase 1 (Weeks 1-3): Build the pattern</p>
        <ul className="list-disc list-inside space-y-1">
          <li>
            Day 1: Hex bar deadlift, 4 sets of 5 reps at 65-70% of estimated max. Focus on perfect
            form. Flat back. Full lockout. Controlled descent.
          </li>
          <li>
            Day 2: Romanian deadlift (conventional barbell), 3 sets of 8. Builds hamstring strength
            and teaches hip hinge mechanics.
          </li>
          <li>
            Accessory work: Goblet squats 3x10, Bulgarian split squats 3x8 per leg, barbell rows
            3x8.
          </li>
        </ul>

        <p className="font-semibold mt-4 mb-2">Phase 2 (Weeks 4-6): Build strength</p>
        <ul className="list-disc list-inside space-y-1">
          <li>
            Day 1: Hex bar deadlift, work up to a heavy set of 3 reps. Then 3 back-off sets of 3 at
            85% of that weight. This is where you build actual strength.
          </li>
          <li>
            Day 2: Deficit deadlifts or paused deadlifts, 4 sets of 3. These build strength off the
            floor where most soldiers are weakest.
          </li>
          <li>
            Add 10-20 lbs to your working weight each week. If you cannot complete the reps with
            good form, the weight is too heavy. Drop 10 lbs and try again next week.
          </li>
        </ul>

        <p className="font-semibold mt-4 mb-2">Phase 3 (Weeks 7-8): Peak</p>
        <ul className="list-disc list-inside space-y-1">
          <li>
            Week 7: Test your 3RM. Warm up thoroughly, then work up in increments. This tells you
            where you stand.
          </li>
          <li>
            Week 8: Light deadlifts only. 2-3 sets of 3 at 60% of your tested max. Keep the pattern
            fresh without creating fatigue.
          </li>
        </ul>
      </div>

      <div className="neumorph p-6 rounded-lg my-6 bg-yellow-50 dark:bg-yellow-900/10">
        <p className="font-semibold mb-2">Common deadlift training mistake:</p>
        <p>
          Training with sets of 10 reps. This builds endurance, not maximal strength. The ACFT tests
          your 3-rep max. You need to train with sets of 3-5 reps at heavy weights. If your training
          sets never go above 60% of your max, you will not get stronger.
        </p>
      </div>

      <h2 className="text-2xl font-bold mt-8 mb-4">Event 2: Standing Power Throw (SPT)</h2>

      <p>
        The power throw is the most technique-dependent event on the ACFT. Strength helps, but a
        well-trained athlete at 160 lbs can out-throw a strong soldier at 220 lbs if the lighter
        athlete has better hip extension timing and release mechanics. This event is about
        coordination and explosiveness, not just brute force.
      </p>

      <h3 className="text-xl font-semibold mt-6 mb-3">Power Throw Training Plan</h3>

      <div className="neumorph p-6 rounded-lg my-4">
        <p className="font-semibold mb-2">Phase 1 (Weeks 1-3): Build explosiveness</p>
        <ul className="list-disc list-inside space-y-1">
          <li>
            Box jumps: 4 sets of 5 reps. Focus on explosive hip extension. Full extension at the
            top.
          </li>
          <li>
            Medicine ball overhead throws (forward): 3 sets of 6 throws. This builds the throwing
            pattern in a forward direction first.
          </li>
          <li>
            Power cleans or hang cleans: 4 sets of 3 reps. The triple extension (ankles, knees,
            hips) is identical to the power throw movement.
          </li>
          <li>
            Practice the actual throw 2x per week with a 10-lb med ball. Do not worry about distance
            yet. Focus on the movement pattern: squat, extend, release.
          </li>
        </ul>

        <p className="font-semibold mt-4 mb-2">Phase 2 (Weeks 4-6): Refine and progress</p>
        <ul className="list-disc list-inside space-y-1">
          <li>
            Increase box jump height. Add depth jumps (step off a box, absorb landing, jump
            immediately).
          </li>
          <li>
            Backward overhead throws with the med ball: 3 sets of 5 throws, measuring distance.
            Track your best throw each session.
          </li>
          <li>
            Jump squats with light weight (40-60 lbs): 4 sets of 5. Speed of the movement matters
            more than the weight.
          </li>
          <li>
            Experiment with release angle and foot position. Small adjustments in your starting
            stance can add 0.5-1.0 meters.
          </li>
        </ul>

        <p className="font-semibold mt-4 mb-2">Phase 3 (Weeks 7-8): Polish</p>
        <ul className="list-disc list-inside space-y-1">
          <li>
            Week 7: Test day simulation. Warm up, take your practice throw, then two max-effort
            record throws. Note your best distance.
          </li>
          <li>Week 8: A few light throws to stay sharp. 5-6 throws at 80% effort. No more.</li>
        </ul>
      </div>

      <AdBlock format="horizontal" />

      <h2 className="text-2xl font-bold mt-8 mb-4">Event 3: Hand-Release Push-Ups (HRP)</h2>

      <p>
        This is where I disagree with most ACFT training advice. The standard recommendation is "do
        more push-ups." That is lazy coaching. If you are stuck at 25 hand-release push-ups and you
        just do more sets of 25, you will stay stuck at 25. You need to build the muscles that
        perform the push-up and train the endurance of those muscles separately.
      </p>

      <h3 className="text-xl font-semibold mt-6 mb-3">Push-Up Volume Programming</h3>

      <div className="neumorph p-6 rounded-lg my-4">
        <p className="font-semibold mb-2">Phase 1 (Weeks 1-3): Build the muscle</p>
        <ul className="list-disc list-inside space-y-1">
          <li>
            Dumbbell bench press: 3 sets of 10-12 reps. This builds raw chest and tricep strength
            beyond what push-ups alone can provide.
          </li>
          <li>
            Dips (bodyweight or assisted): 3 sets of 8-10 reps. Builds tricep endurance
            specifically.
          </li>
          <li>
            Hand-release push-ups: 3 sets to 75% of your max. If your max is 30, do 3 sets of 22-23.
            Rest 90 seconds between sets.
          </li>
          <li>Overhead press: 3 sets of 8. Builds shoulder endurance for the lockout portion.</li>
        </ul>

        <p className="font-semibold mt-4 mb-2">Phase 2 (Weeks 4-6): Build endurance</p>
        <ul className="list-disc list-inside space-y-1">
          <li>
            Increase push-up volume: 4 sets to 80% of max, with 60-second rest periods (shorter rest
            forces adaptation).
          </li>
          <li>
            Add timed sets: do as many hand-release push-ups as possible in 60 seconds. Rest 2
            minutes. Repeat 3 times. This mimics the pacing demand of the actual event.
          </li>
          <li>Continue bench press but shift to higher reps: 3 sets of 15 with moderate weight.</li>
          <li>
            Close-grip push-ups: 3 sets of 12. Builds tricep-specific endurance for the lockout,
            which is where most soldiers fail in the second minute.
          </li>
        </ul>

        <p className="font-semibold mt-4 mb-2">Phase 3 (Weeks 7-8): Test and taper</p>
        <ul className="list-disc list-inside space-y-1">
          <li>
            Week 7: Full 2-minute hand-release push-up test. Record your count. This is your
            baseline for test day.
          </li>
          <li>Week 8: 2 light sets of push-ups. Do not burn yourself out before the real test.</li>
        </ul>
      </div>

      <div className="neumorph p-6 rounded-lg my-6 bg-yellow-50 dark:bg-yellow-900/10">
        <p className="font-semibold mb-2">The pacing trap:</p>
        <p>
          Soldiers who go fast in the first 30 seconds typically get 5-8 fewer reps than soldiers
          who pace themselves. My recommendation: aim for one rep every 2 seconds for the first
          minute (30 reps), then push harder in the second minute. This prevents the "arms turn to
          jelly at 45 seconds" phenomenon that kills scores.
        </p>
      </div>

      <h2 className="text-2xl font-bold mt-8 mb-4">Event 4: Sprint-Drag-Carry (SDC)</h2>

      <p>
        The SDC is the event that separates soldiers who train specifically from soldiers who just
        "work out." General fitness helps, but if you have not practiced dragging a sled, carrying
        kettlebells at speed, and performing lateral shuffles while exhausted, you will be slower
        than you should be.
      </p>

      <h3 className="text-xl font-semibold mt-6 mb-3">SDC-Specific Conditioning</h3>

      <div className="neumorph p-6 rounded-lg my-4">
        <p className="font-semibold mb-2">Phase 1 (Weeks 1-3): Build the components</p>
        <ul className="list-disc list-inside space-y-1">
          <li>
            Sled drags: If you have access to a sled, drag 90 lbs (the test weight) for 4 x 50
            meters. If no sled is available, use a heavy tire or even a training buddy on a towel on
            a smooth floor.
          </li>
          <li>
            Farmer carries: 2 x 40-lb kettlebells (or dumbbells), 4 x 50 meters. Focus on speed
            while maintaining control. Do not shuffle. Walk fast with purpose.
          </li>
          <li>
            Lateral shuffle drills: 4 x 50 meters. Practice staying low with a wide base. Do not let
            your feet cross. Speed increases as technique improves.
          </li>
          <li>
            Sprint intervals: 6 x 50-meter sprints with 60 seconds rest. Build your acceleration and
            top speed.
          </li>
        </ul>

        <p className="font-semibold mt-4 mb-2">Phase 2 (Weeks 4-6): Combine and condition</p>
        <ul className="list-disc list-inside space-y-1">
          <li>
            Practice the full SDC event once per week. Time yourself. Record it. This is your most
            important training data point.
          </li>
          <li>
            On separate days, do "SDC intervals": pick two phases of the SDC (like sled drag and
            sprint) and alternate them for 5 rounds with 90 seconds rest. This builds event-specific
            conditioning.
          </li>
          <li>
            Work on transitions. Practice picking up the sled handles from a dead stop. Practice
            setting down and picking up kettlebells quickly. Every second counts.
          </li>
          <li>
            Add shuttle runs (down-and-back 25-meter sprints) to your conditioning work. 8 sets with
            45 seconds rest builds the specific energy system the SDC demands.
          </li>
        </ul>

        <p className="font-semibold mt-4 mb-2">Phase 3 (Weeks 7-8): Sharpen</p>
        <ul className="list-disc list-inside space-y-1">
          <li>Week 7: Full SDC test at max effort. This is your baseline for test day.</li>
          <li>
            Week 8: One light practice session. Walk through each phase at 60% effort. Stay sharp
            without creating fatigue.
          </li>
        </ul>
      </div>

      <h2 className="text-2xl font-bold mt-8 mb-4">Event 5: Plank (PLK)</h2>

      <p>
        Plank training is boring. I am not going to pretend otherwise. But boring works. The plank
        is an isometric endurance event, and you train it with progressive overload applied to
        isometric holds. The key insight is that just holding a plank until you collapse is not
        optimal training. You need structure.
      </p>

      <h3 className="text-xl font-semibold mt-6 mb-3">Plank Endurance Programming</h3>

      <div className="neumorph p-6 rounded-lg my-4">
        <p className="font-semibold mb-2">Phase 1 (Weeks 1-3): Build the base</p>
        <ul className="list-disc list-inside space-y-1">
          <li>
            Plank holds: 3 sets at 70% of your max hold time. If you can hold for 2 minutes, do 3 x
            1:24. Rest 60 seconds between sets.
          </li>
          <li>
            Dead bugs: 3 sets of 10 per side. Builds anti-extension core strength, which is exactly
            what the plank demands.
          </li>
          <li>
            Pallof press: 3 sets of 10 per side. Builds anti-rotation strength. A strong core
            resists movement in all planes, not just flexion/extension.
          </li>
          <li>
            Bird dogs: 3 sets of 8 per side. Builds stability and coordination in the plank
            position.
          </li>
        </ul>

        <p className="font-semibold mt-4 mb-2">Phase 2 (Weeks 4-6): Progressive overload</p>
        <ul className="list-disc list-inside space-y-1">
          <li>
            Increase plank hold to 80% of max, 3 sets, with only 45 seconds rest. The shorter rest
            forces your core to recover faster.
          </li>
          <li>
            Add weighted planks: put a 10-25 lb plate on your back. Hold for 60% of your bodyweight
            plank time. When you remove the weight on test day, the plank will feel noticeably
            easier.
          </li>
          <li>
            Plank shoulder taps: 3 sets of 12 per side. Removes one point of contact and forces the
            remaining three to work harder. Builds dynamic stability.
          </li>
          <li>
            Ab wheel rollouts (or barbell rollouts): 3 sets of 8. The best anti-extension exercise
            that exists. Directly transfers to plank endurance.
          </li>
        </ul>

        <p className="font-semibold mt-4 mb-2">Phase 3 (Weeks 7-8): Test and maintain</p>
        <ul className="list-disc list-inside space-y-1">
          <li>
            Week 7: Max plank hold test. Note your time. Plug it into the{' '}
            <Link href="/acft-calculator" className="text-accent hover:underline">
              ACFT calculator
            </Link>{' '}
            to see your score.
          </li>
          <li>
            Week 8: One set at 60% of max. Keep the neuromuscular pattern fresh without fatigue.
          </li>
        </ul>
      </div>

      <AdBlock format="horizontal" />

      <h2 className="text-2xl font-bold mt-8 mb-4">Event 6: Two-Mile Run (2MR)</h2>

      <p>
        Most soldiers train for the two-mile run by running two miles. That is like training for the
        deadlift by just doing max-effort deadlifts every session. It works up to a point, then you
        plateau hard. The soldiers I have seen make the biggest improvements in their run times are
        the ones who stopped running the same 2-mile loop at the same pace every other day.
      </p>

      <h3 className="text-xl font-semibold mt-6 mb-3">Run Training: Interval-Based Approach</h3>

      <div className="neumorph p-6 rounded-lg my-4">
        <p className="font-semibold mb-2">Phase 1 (Weeks 1-3): Build your aerobic base</p>
        <ul className="list-disc list-inside space-y-1">
          <li>
            3 runs per week. Two easy runs at conversational pace (you should be able to talk in
            full sentences), one tempo run at a "comfortably hard" pace for 15-20 minutes.
          </li>
          <li>
            Easy run distance: 2-3 miles. Do not worry about pace. These runs build your aerobic
            engine and prepare your joints for the training to come.
          </li>
          <li>
            Tempo run: Find a pace you can sustain for 20 minutes but not 40. Run at that pace after
            a 10-minute warmup. This should feel like a 7 out of 10 effort.
          </li>
        </ul>

        <p className="font-semibold mt-4 mb-2">Phase 2 (Weeks 4-6): Add intervals</p>
        <ul className="list-disc list-inside space-y-1">
          <li>
            Replace one easy run with interval training. The intervals are the key to getting
            faster.
          </li>
          <li>
            Week 4: 6 x 400 meters at your goal 2-mile pace (divide your goal time by 8 for your
            400m split). Rest 90 seconds between repeats. Example: 16:00 goal = 2:00 per 400m.
          </li>
          <li>
            Week 5: 5 x 600 meters at goal pace, 2 minutes rest. Longer intervals build your ability
            to sustain speed.
          </li>
          <li>
            Week 6: 4 x 800 meters at goal pace, 2 minutes rest. If you can hit these splits, your
            goal time is realistic.
          </li>
          <li>
            Keep one easy run and one tempo run each week alongside the intervals. Total: 3 runs per
            week.
          </li>
        </ul>

        <p className="font-semibold mt-4 mb-2">Phase 3 (Weeks 7-8): Race-specific prep</p>
        <ul className="list-disc list-inside space-y-1">
          <li>
            Week 7: Time trial. Run 2 miles at max effort after a proper warmup. This is your test
            day predictor. Note: on the actual ACFT, you will be fatigued from 5 previous events, so
            add 30-60 seconds to this time for a realistic prediction.
          </li>
          <li>Week 8: Two easy 20-minute runs. Nothing intense. Let your legs recover fully.</li>
        </ul>
      </div>

      <div className="neumorph p-6 rounded-lg my-6 bg-yellow-50 dark:bg-yellow-900/10">
        <p className="font-semibold mb-2">Why intervals work better than just running more:</p>
        <p>
          Running at a pace faster than your current 2-mile pace forces physiological adaptations
          that easy running cannot. Your body learns to clear lactate faster, your running economy
          improves, and your VO2 max increases. Easy runs build the base that supports interval
          work, but the intervals are where the speed comes from.
        </p>
      </div>

      <h2 className="text-2xl font-bold mt-8 mb-4">Sample Weekly Schedule</h2>

      <p>
        Here is how I structure a typical training week during Phase 2 (Weeks 4-6). This assumes you
        are training 5 days per week with 2 rest days. Adjust based on your unit schedule.
      </p>

      <div className="overflow-x-auto my-6">
        <table className="min-w-full border-collapse border border-gray-300 dark:border-gray-600 text-sm">
          <caption className="text-base font-semibold mb-2">Sample Phase 2 Weekly Schedule</caption>
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-800">
              <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">
                Day
              </th>
              <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">
                Focus
              </th>
              <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">
                Workout
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-semibold">
                Monday
              </td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">
                Strength (Upper)
              </td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">
                Bench press 3x10, overhead press 3x8, push-up timed sets 3x60sec, dips 3x10, Pallof
                press 3x10/side
              </td>
            </tr>
            <tr className="bg-gray-50 dark:bg-gray-800/50">
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-semibold">
                Tuesday
              </td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">
                Run (Intervals)
              </td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">
                10-min warmup, 6x400m at goal pace with 90sec rest, 10-min cooldown
              </td>
            </tr>
            <tr>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-semibold">
                Wednesday
              </td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">
                Strength (Lower) + Power
              </td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">
                Hex bar deadlift (work to heavy 3), box jumps 4x5, med ball backward throws 3x5,
                plank 3 sets at 80% max
              </td>
            </tr>
            <tr className="bg-gray-50 dark:bg-gray-800/50">
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-semibold">
                Thursday
              </td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">
                SDC Practice + Easy Run
              </td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">
                Full SDC practice (timed), 20-min easy run afterward to build fatigue tolerance
              </td>
            </tr>
            <tr>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-semibold">
                Friday
              </td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">
                Tempo Run + Core
              </td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">
                20-min tempo run, weighted plank 3x45sec, dead bugs 3x10/side, ab wheel rollouts 3x8
              </td>
            </tr>
            <tr className="bg-gray-50 dark:bg-gray-800/50">
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-semibold">
                Saturday
              </td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">
                Rest or Active Recovery
              </td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">
                Walk, stretch, foam roll. Nothing intense.
              </td>
            </tr>
            <tr>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-semibold">
                Sunday
              </td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Full Rest</td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">
                Complete rest. Sleep. Eat well. Recover.
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 className="text-2xl font-bold mt-8 mb-4">Recovery and Nutrition for Soldiers</h2>

      <p>
        I am going to be blunt: the Army does not make recovery easy. Between duty hours, field
        training, and the general grind of garrison life, sleep and nutrition often take a back
        seat. But if you are serious about your ACFT score, you need to treat recovery as part of
        your training program, not an afterthought.
      </p>

      <h3 className="text-xl font-semibold mt-6 mb-3">Sleep</h3>

      <p>
        Seven hours minimum. I know that sounds impossible during a field rotation. But during your
        8-week ACFT training block, prioritize sleep. Your muscles do not get stronger during the
        workout. They get stronger during recovery. Cut the sleep short and you cut the gains short.
        Research consistently shows that sleep deprivation impairs strength output, reaction time,
        and endurance. All things the ACFT tests.
      </p>

      <h3 className="text-xl font-semibold mt-6 mb-3">Nutrition</h3>

      <div className="neumorph p-6 rounded-lg my-4">
        <p className="font-semibold mb-2">Calorie intake:</p>
        <p>
          If you are actively training 5 days per week, you need to eat enough to support that
          training. Undereating is the number one recovery killer I see in soldiers. The DFAC meals
          may not be gourmet, but eat enough of them. If you are losing weight unintentionally
          during your training block, you are not eating enough.
        </p>

        <p className="font-semibold mt-4 mb-2">Protein:</p>
        <p>
          Aim for 0.8-1.0 grams per pound of bodyweight daily. For a 180-lb soldier, that is 144-180
          grams of protein per day. This supports muscle recovery and growth. If you are not hitting
          this number through food alone, a protein supplement can fill the gap. Nothing fancy. Whey
          protein or a plant-based alternative works fine.
        </p>

        <p className="font-semibold mt-4 mb-2">Hydration:</p>
        <p>
          Drink water consistently throughout the day. Not just during workouts. If your urine is
          dark yellow, you are dehydrated. Aim for pale yellow. In hot climates (looking at you,
          Fort Moore and Fort Bliss), you need significantly more than the standard recommendation.
        </p>

        <p className="font-semibold mt-4 mb-2">Pre-test meal (morning of the ACFT):</p>
        <p>
          Eat 2-3 hours before the test. Something you have eaten before training and tolerated
          well. My go-to recommendation: oatmeal with a banana and a tablespoon of peanut butter.
          Carbs for energy, some protein, easy to digest. Do not try anything new on test day.
        </p>
      </div>

      <h3 className="text-xl font-semibold mt-6 mb-3">Active Recovery</h3>

      <p>
        On rest days, do not just sit around. Light activity promotes blood flow and speeds
        recovery. A 20-minute walk, light stretching, foam rolling, or a casual bike ride. The goal
        is to move without creating additional fatigue. Think 3 out of 10 effort, maximum.
      </p>

      <h2 className="text-2xl font-bold mt-8 mb-4">How to Peak for Test Day</h2>

      <p>
        Peaking is the art of arriving at test day fresh, strong, and ready. The biggest mistake
        soldiers make is training hard right up until the test. I see it every cycle. Soldiers
        grinding through heavy deadlifts and hard runs 48 hours before the ACFT, then wondering why
        their legs feel like concrete on test morning.
      </p>

      <div className="neumorph p-6 rounded-lg my-6">
        <h3 className="text-lg font-semibold mb-3">Taper Protocol (Last 7 Days)</h3>

        <p className="font-semibold mt-2 mb-1">7 days out:</p>
        <p className="mb-3">
          Last hard session. Full ACFT simulation or a challenging combined workout. After this, you
          are done with intense training.
        </p>

        <p className="font-semibold mb-1">6 days out:</p>
        <p className="mb-3">Complete rest.</p>

        <p className="font-semibold mb-1">5 days out:</p>
        <p className="mb-3">
          Light 20-minute run at easy pace. A few sets of push-ups. Light deadlift work (3x3 at 50%
          max). Nothing challenging.
        </p>

        <p className="font-semibold mb-1">4 days out:</p>
        <p className="mb-3">
          20-minute walk or light jog. Core work (2 sets of planks at 50% max time). That is it.
        </p>

        <p className="font-semibold mb-1">3 days out:</p>
        <p className="mb-3">Complete rest. Focus on hydration and sleep.</p>

        <p className="font-semibold mb-1">2 days out:</p>
        <p className="mb-3">
          15-minute easy jog. A few bodyweight squats and push-ups. Keep the nervous system active
          without fatigue.
        </p>

        <p className="font-semibold mb-1">1 day out:</p>
        <p className="mb-3">
          Complete rest. Prepare your gear. Eat a normal dinner. Go to bed early. Visualize each
          event.
        </p>
      </div>

      <h2 className="text-2xl font-bold mt-8 mb-4">Track Your Progress</h2>

      <p>
        Every two weeks, test yourself on each event and plug the numbers into our{' '}
        <Link href="/acft-calculator" className="text-accent hover:underline">
          ACFT calculator
        </Link>
        . This serves two purposes. First, it shows you which events are responding to training and
        which are lagging. Second, it keeps you motivated. Watching your estimated score climb from
        380 to 420 to 470 over six weeks is powerful motivation to keep training.
      </p>

      <div className="neumorph p-6 rounded-lg my-6">
        <p>
          The calculator breaks down your score by event and shows your overall category. If you are
          targeting Gold (540+), you need to know exactly where your weak points are. Maybe your
          deadlift is already at 90 points but your plank is sitting at 65. That tells you where to
          focus your training energy.
        </p>
        <p className="mt-4">
          <Link
            href="/acft-calculator"
            className="inline-block bg-accent text-white px-6 py-3 rounded-lg font-semibold hover:bg-accent/90 transition-colors"
          >
            Calculate Your ACFT Score
          </Link>
        </p>
      </div>

      <h2 className="text-2xl font-bold mt-8 mb-4">The Bottom Line</h2>

      <p>
        The ACFT rewards structured, specific training over general fitness. You cannot just "work
        out" and expect to excel. Each event requires targeted training methods, and your program
        needs to account for the fact that you perform all six events sequentially under fatigue.
      </p>

      <p>
        Eight weeks is enough time to make real improvements if you train with intention. Twelve
        weeks is better. But even four weeks of focused, event-specific work will show results
        compared to random gym sessions.
      </p>

      <p>
        Pick the program. Follow the progression. Test yourself regularly. Eat and sleep enough to
        recover. And on test day, trust your training. You have put in the work. Now execute.
      </p>

      <div className="mt-12 border-t pt-8">
        <h3 className="text-xl font-semibold mb-4">References</h3>
        <ul className="space-y-3 text-sm text-gray-600">
          <li>U.S. Army FM 7-22: Holistic Health and Fitness (2020). Department of the Army.</li>
          <li>
            Haff, G. G., &amp; Triplett, N. T. (2016). Essentials of Strength Training and
            Conditioning (4th ed.). National Strength and Conditioning Association.
          </li>
          <li>Daniels, J. (2013). Daniels&apos; Running Formula (3rd ed.). Human Kinetics.</li>
          <li>
            Mujika, I., &amp; Padilla, S. (2003). Scientific bases for precompetition tapering
            strategies. Medicine and Science in Sports and Exercise, 35(7), 1182-1187.
          </li>
          <li>
            Schoenfeld, B. J. (2010). The mechanisms of muscle hypertrophy and their application to
            resistance training. Journal of Strength and Conditioning Research, 24(10), 2857-2872.
          </li>
        </ul>
      </div>
    </div>
  </div>
);

export default function ACFTTrainingPlanPage() {
  return ACFTTrainingPlanPageContent;
}
