import React from 'react';
import Link from 'next/link';
import AdBlock from '@/components/AdBlock';

const SleepRecoverySciencePageContent = (
  <div className="max-w-4xl mx-auto">
    <div className="mb-8">
      <span className="inline-block bg-accent/10 text-accent text-sm px-3 py-1 rounded-full">
        Recovery Science
      </span>
      <h1 className="text-3xl md:text-4xl font-bold mt-2 mb-4">
        Sleep and Recovery: What the Research Says About Optimizing Rest
      </h1>
      <p className="text-gray-500 italic">Published: January 24, 2026 • 14 min read</p>
    </div>

    <div className="prose prose-lg max-w-none">
      <div className="neumorph p-6 rounded-lg mb-8">
        <h2 className="text-xl font-semibold mb-4">Key Takeaways</h2>
        <ul className="space-y-2">
          <li>
            Sleep architecture matters more than total hours. Deep sleep drives physical recovery
            while REM sleep consolidates learning and emotional regulation.
          </li>
          <li>
            Chronic sleep restriction (under 6 hours) increases ghrelin and decreases leptin,
            creating a hormonal environment that promotes weight gain.
          </li>
          <li>
            Sleep debt accumulates and weekend catch-up sleep does not fully reverse the metabolic
            damage from a week of short sleeping.
          </li>
          <li>
            The 2pm caffeine cutoff is too simple. Individual caffeine metabolism varies by a factor
            of 4x depending on your CYP1A2 gene variants.
          </li>
          <li>
            Room temperature between 60-67F (15.5-19.5C) is the single most evidence-backed sleep
            environment change you can make.
          </li>
        </ul>
      </div>

      <p>
        I used to think sleep was negotiable. In my twenties, I treated it like a luxury that could
        be sacrificed for work, training, or Netflix. Turns out that was spectacularly wrong. The
        research on sleep and recovery is some of the most consistent in all of health science, and
        yet most of us still get it wrong.
      </p>

      <p>
        This is not another article telling you to put your phone away an hour before bed (though
        you should). Instead, I want to walk through what actually happens during sleep, why it
        matters for recovery, and what interventions have real evidence behind them.
      </p>

      <h2 className="text-2xl font-bold mt-8 mb-4">
        Sleep Architecture: What Happens When You Close Your Eyes
      </h2>

      <p>
        Sleep is not a uniform state. Your brain cycles through distinct stages roughly every 90
        minutes, and each stage serves different functions. Understanding this architecture explains
        why six hours of fragmented sleep feels worse than six hours of continuous sleep, even
        though the total is identical.
      </p>

      <h3 className="text-xl font-semibold mt-6 mb-3">Stage 1: Light Sleep (N1)</h3>
      <p>
        This is the transition phase, lasting only a few minutes. Your muscles relax, heart rate
        slows, and brain waves shift from alpha to theta patterns. You can be woken easily here. If
        someone shakes you awake during N1, you might not even realize you were asleep.
      </p>

      <h3 className="text-xl font-semibold mt-6 mb-3">Stage 2: True Sleep Onset (N2)</h3>
      <p>
        N2 accounts for about 50% of total sleep time in adults. Your body temperature drops, heart
        rate decreases further, and the brain produces characteristic sleep spindles and
        K-complexes. These burst patterns are now understood to play a role in memory consolidation.
        Research from the University of Montreal published in 2013 showed that sleep spindle density
        correlates with learning capacity, particularly for motor skills.
      </p>

      <h3 className="text-xl font-semibold mt-6 mb-3">
        Stage 3: Deep Sleep (N3 / Slow-Wave Sleep)
      </h3>
      <p>
        This is the stage that matters most for physical recovery. During deep sleep, your pituitary
        gland releases the majority of your daily growth hormone (GH). A 1991 study by Van Cauter
        and colleagues in the Journal of Clinical Endocrinology and Metabolism found that up to 70%
        of daily GH secretion occurs during slow-wave sleep.
      </p>
      <p>
        Deep sleep is also when your immune system does its heaviest repair work. Proinflammatory
        cytokines like IL-1 and TNF-alpha peak during this stage, driving tissue repair. This is why
        you feel terrible when you have a cold and cannot sleep properly. Your body literally cannot
        repair itself as efficiently.
      </p>
      <p>
        Here is the problem: deep sleep is front-loaded. You get the most N3 in the first half of
        the night. If you go to bed at 2am and wake at 8am, you will get roughly the same amount of
        deep sleep as someone who sleeps from 10pm to 6am. But that person will get significantly
        more REM sleep, because REM cycles grow longer toward morning.
      </p>

      <h3 className="text-xl font-semibold mt-6 mb-3">REM Sleep: Where Your Brain Rebuilds</h3>
      <p>
        REM (rapid eye movement) sleep is when most dreaming occurs. But far more importantly, it is
        when your brain consolidates procedural memory, processes emotional experiences, and clears
        metabolic waste through the glymphatic system. A 2013 paper by Xie et al. in Science showed
        that the glymphatic system is 10x more active during sleep, flushing beta-amyloid and other
        waste products from the brain.
      </p>
      <p>
        Athletes should pay attention here. REM sleep is when motor learning solidifies. That tennis
        serve you practiced 200 times? It gets encoded into long-term motor memory during REM.
        Cutting your sleep short by even an hour primarily cuts into REM cycles, since they cluster
        in the final portion of the night.
      </p>

      <AdBlock format="horizontal" />

      <h2 className="text-2xl font-bold mt-8 mb-4">How Much Sleep Do You Actually Need?</h2>

      <p>
        The standard recommendation of 7-9 hours comes from the National Sleep Foundation and the
        American Academy of Sleep Medicine. But I think the more interesting question is what
        happens below that threshold.
      </p>

      <p>
        Matthew Walker, the neuroscientist at UC Berkeley and author of Why We Sleep, has been vocal
        about the cognitive effects of sleep restriction. His research shows that after 10 days of
        sleeping 6 hours per night, cognitive impairment is equivalent to going 24 hours without
        sleep. The insidious part? Subjects in these studies consistently report feeling "fine." You
        lose the ability to accurately judge your own impairment.
      </p>

      <p>
        For athletes, the data is even more compelling. Cheri Mah's landmark 2011 study at Stanford
        had basketball players extend their sleep to 10 hours per night for 5-7 weeks. The results
        were remarkable: sprint times improved by 4%, free throw accuracy increased by 9%, and
        three-point accuracy increased by 9.2%. Reaction times improved across the board. These are
        enormous gains for something that requires zero additional training.
      </p>

      <div className="neumorph p-6 rounded-lg my-6">
        <h3 className="text-xl font-semibold mb-2">The Individual Variation Problem</h3>
        <p>
          There is a small percentage of the population (roughly 1-3%) who carry a mutation in the
          DEC2 gene that allows them to function normally on 6 hours or less. If you think you are
          one of these people, you are almost certainly not. Research from the University of
          California San Francisco found that true short sleepers are extremely rare. Most people
          who claim to need only 5-6 hours have simply adapted to chronic sleep deprivation and no
          longer recognize their own impairment.
        </p>
      </div>

      <p>
        My recommendation: track your sleep for two weeks without an alarm (vacation is ideal) and
        see when you naturally wake. That is probably your true sleep need. For most adults, it will
        land between 7.5 and 8.5 hours. Our{' '}
        <Link href="/sleep" className="text-accent hover:underline">
          sleep calculator
        </Link>{' '}
        can help you figure out optimal bedtimes based on your wake time and natural sleep cycles.
      </p>

      <h2 className="text-2xl font-bold mt-8 mb-4">Sleep Debt: Can You Make It Up on Weekends?</h2>

      <p>The short answer is no, at least not completely.</p>

      <p>
        A 2019 study published in Current Biology by Depner et al. tested exactly this question.
        They split participants into three groups: one that slept 9 hours nightly, one restricted to
        5 hours nightly, and one that slept 5 hours on weekdays but could sleep as much as they
        wanted on weekends. The weekend recovery group did sleep longer on Saturday and Sunday
        (about 9.8 hours), but here is what happened:
      </p>

      <ul className="list-disc list-inside space-y-2 my-4">
        <li>They still snacked more after dinner during the subsequent week of restricted sleep</li>
        <li>Their total body weight increased by about 1.5 kg over the study period</li>
        <li>
          Insulin sensitivity in muscle and liver tissue did not recover to baseline, even after the
          weekend catch-up
        </li>
        <li>
          When they returned to restricted sleep after the weekend, their circadian timing was
          actually worse than the group that never had catch-up sleep
        </li>
      </ul>

      <p>
        The study concluded that ad libitum weekend recovery sleep is not an effective strategy for
        reversing the metabolic effects of workweek sleep restriction. In other words, the "I will
        sleep in on Saturday" plan is not fixing what you think it is fixing.
      </p>

      <h2 className="text-2xl font-bold mt-8 mb-4">Sleep and Weight: The Hormonal Connection</h2>

      <p>
        This is where the research gets particularly convincing, and where I think most people
        underestimate sleep's role in body composition.
      </p>

      <p>
        In 2004, Spiegel, Tasali, Penev, and Van Cauter published a landmark study in the Annals of
        Internal Medicine. They restricted healthy young men to 4 hours of sleep for two consecutive
        nights and measured hormonal changes. The results:
      </p>

      <div className="neumorph p-6 rounded-lg my-6">
        <ul className="list-disc list-inside space-y-3">
          <li>
            <strong>Leptin decreased by 18%.</strong> Leptin is your satiety hormone. Lower leptin
            means you feel less full after eating.
          </li>
          <li>
            <strong>Ghrelin increased by 28%.</strong> Ghrelin is your hunger hormone. Higher
            ghrelin means you feel hungrier throughout the day.
          </li>
          <li>
            <strong>Appetite for high-carb, high-calorie foods increased by 45%.</strong> The
            combination of lower leptin and higher ghrelin did not just increase overall hunger, it
            specifically drove cravings for calorie-dense foods.
          </li>
        </ul>
      </div>

      <p>
        A follow-up study by Nedeltcheva et al. in 2010, published in the Annals of Internal
        Medicine, put people on the same calorie-restricted diet but varied their sleep. The group
        sleeping 5.5 hours lost 55% less fat and 60% more lean mass than the group sleeping 8.5
        hours, despite eating identical calories. Let that sink in. Same food, same calories,
        different body composition outcomes, purely based on sleep duration.
      </p>

      <p>
        If you are trying to lose fat, sleep might be the single highest-impact variable you are
        ignoring. I would argue it matters more than the specific macro split or meal timing
        protocol you are following.
      </p>

      <AdBlock format="horizontal" />

      <h2 className="text-2xl font-bold mt-8 mb-4">
        Sleep and Muscle Recovery: Growth Hormone and Protein Synthesis
      </h2>

      <p>
        For anyone doing resistance training, sleep is non-negotiable for muscle recovery. The
        mechanisms are straightforward:
      </p>

      <p>
        Growth hormone (GH) is released in pulses during deep sleep, with the largest pulse
        occurring within the first hour of sleep onset. GH stimulates protein synthesis, promotes
        fat oxidation, and is essential for tissue repair. Dattilo et al. published a 2011 review in
        Medical Hypotheses confirming that sleep deprivation significantly reduces GH secretion and
        impairs the anabolic environment needed for muscle repair.
      </p>

      <p>
        Testosterone also follows a sleep-dependent pattern. Leproult and Van Cauter published a
        2011 study in JAMA showing that one week of sleeping 5 hours per night reduced daytime
        testosterone levels by 10-15% in young healthy men. For context, normal aging produces a
        1-2% decline per year. So a week of short sleep creates the testosterone equivalent of aging
        10-15 years.
      </p>

      <p>
        Cortisol, the stress hormone that promotes muscle breakdown, follows the inverse pattern.
        Sleep deprivation elevates evening cortisol levels, creating a catabolic environment when
        your body should be in recovery mode. This is a double hit: less anabolic signaling from GH
        and testosterone, more catabolic signaling from cortisol.
      </p>

      <h2 className="text-2xl font-bold mt-8 mb-4">Sleep Hygiene That Actually Has Evidence</h2>

      <p>
        Most "sleep hygiene" advice is well-intentioned but vague. I want to focus specifically on
        interventions where the research is strong.
      </p>

      <h3 className="text-xl font-semibold mt-6 mb-3">Temperature: The Strongest Signal</h3>
      <p>
        Your core body temperature needs to drop by about 1-1.5C (2-3F) to initiate sleep. This is
        not optional; it is a prerequisite for sleep onset. A 1999 study in the journal Nature by
        Krauchi et al. showed that the rate of heat loss from the body's core, particularly through
        the hands and feet, was the strongest physiological predictor of sleep onset latency.
      </p>
      <p>
        Practical implications: keep your bedroom between 60-67F (15.5-19.5C). This is cooler than
        most people keep their homes. A warm bath or shower 1-2 hours before bed paradoxically helps
        because it brings blood to the surface, which then radiates heat and drops core temperature
        faster once you get out.
      </p>

      <h3 className="text-xl font-semibold mt-6 mb-3">
        Light Exposure: Timing Matters More Than Intensity
      </h3>
      <p>
        Bright light in the morning (within 30-60 minutes of waking) anchors your circadian rhythm.
        A 2017 study from the Journal of Clinical Sleep Medicine found that office workers with more
        morning light exposure slept an average of 46 minutes longer per night.
      </p>
      <p>
        Evening light exposure suppresses melatonin. But the blue light from screens is not the main
        culprit. The real problem is total light intensity. Gooley et al. published a 2011 study in
        the Journal of Clinical Endocrinology and Metabolism showing that room lighting (not just
        screens) suppresses melatonin by about 50%. Dimming your environment in the evening matters
        more than buying blue-light glasses.
      </p>

      <h3 className="text-xl font-semibold mt-6 mb-3">Consistency: The Underrated Factor</h3>
      <p>
        Going to bed and waking at the same time (including weekends) is probably the most impactful
        behavioral change for sleep quality. A 2017 study in Scientific Reports by Phillips et al.
        found that irregular sleep schedules were associated with lower academic performance even
        after controlling for total sleep duration. The regularity of the schedule predicted
        outcomes better than the amount of sleep.
      </p>
      <p>
        This is hard advice to follow on weekends. But even keeping your wake time within a
        30-minute window every day makes a measurable difference to circadian stability.
      </p>

      <h2 className="text-2xl font-bold mt-8 mb-4">What Sleep Trackers Get Right and Wrong</h2>

      <p>
        Consumer sleep trackers (Oura Ring, Apple Watch, Whoop, Fitbit) have become enormously
        popular. Here is my honest assessment of what they can and cannot tell you.
      </p>

      <div className="neumorph p-6 rounded-lg my-6">
        <h3 className="text-xl font-semibold mb-2">What They Get Right</h3>
        <ul className="list-disc list-inside space-y-2">
          <li>
            <strong>Total sleep time:</strong> Most wrist-based trackers are reasonably accurate for
            total sleep duration, within about 15-30 minutes for most users. A 2019 validation study
            in Sleep by de Zambotti et al. found that the Oura Ring performed well against
            polysomnography for total sleep time.
          </li>
          <li>
            <strong>Sleep consistency:</strong> The trend data over weeks and months is genuinely
            useful for identifying patterns.
          </li>
          <li>
            <strong>Behavior change:</strong> Simply wearing a tracker makes many people more aware
            of their sleep habits, which drives improvement.
          </li>
        </ul>
      </div>

      <div className="neumorph p-6 rounded-lg my-6">
        <h3 className="text-xl font-semibold mb-2">What They Get Wrong</h3>
        <ul className="list-disc list-inside space-y-2">
          <li>
            <strong>Sleep staging:</strong> Consumer devices are poor at distinguishing deep sleep
            from light sleep and moderately unreliable for REM detection. They use accelerometry and
            heart rate as proxies for what polysomnography measures directly via brain waves. Do not
            obsess over your "deep sleep score."
          </li>
          <li>
            <strong>Single-night data:</strong> Night-to-night variability is high. A bad sleep
            score on one night is rarely meaningful. Look at 7-14 day averages instead.
          </li>
          <li>
            <strong>Recovery scores:</strong> The composite "recovery" or "readiness" scores are
            proprietary algorithms with limited published validation. They can be directionally
            useful but should not dictate your training.
          </li>
        </ul>
      </div>

      <p>
        My advice: use a sleep tracker for the trend data and the behavioral nudge. Ignore
        single-night deep sleep percentages and do not restructure your training around a recovery
        score that has not been validated against actual performance markers.
      </p>

      <AdBlock format="horizontal" />

      <h2 className="text-2xl font-bold mt-8 mb-4">
        Caffeine: It Is More Nuanced Than a 2pm Cutoff
      </h2>

      <p>
        You have probably heard the advice to stop drinking coffee by 2pm. That is a reasonable
        starting point, but it oversimplifies a genuinely complex pharmacokinetic reality.
      </p>

      <p>
        Caffeine has an average half-life of 5-6 hours. So if you drink 200mg of caffeine at 2pm,
        you still have about 100mg in your system at 7-8pm and roughly 50mg at midnight. For
        reference, 50mg is about the amount in a cup of green tea. That is enough to affect sleep
        architecture even if you fall asleep without difficulty.
      </p>

      <p>
        Drake et al. published a 2013 study in the Journal of Clinical Sleep Medicine that tested
        caffeine's effects at different times before bed. Taking 400mg of caffeine even 6 hours
        before bed significantly reduced total sleep time by over an hour and reduced sleep
        efficiency. Critically, many participants were unaware their sleep had been disrupted.
      </p>

      <p>
        But here is the nuance: caffeine metabolism is largely controlled by the CYP1A2 enzyme, and
        genetic variants create a roughly 4x difference in clearance speed. Fast metabolizers (about
        40% of the population) clear caffeine in 3-4 hours. Slow metabolizers might take 8-10 hours.
        If you are a slow metabolizer, even a morning coffee at 10am could affect your sleep that
        night.
      </p>

      <div className="neumorph p-6 rounded-lg my-6">
        <h3 className="text-xl font-semibold mb-2">How to Find Your Caffeine Cutoff</h3>
        <p>
          Without genetic testing, the simplest approach is experimentation. Try moving your last
          caffeine intake progressively earlier for a week at each time point (3pm, 1pm, 11am,
          morning only) and track your sleep quality. You will likely find a threshold where your
          sleep noticeably improves. For most people, 8-10 hours before bed is a safe buffer.
        </p>
        <p className="mt-3">
          Our{' '}
          <Link href="/caffeine-calculator" className="text-accent hover:underline">
            caffeine intake calculator
          </Link>{' '}
          can help you estimate how much caffeine is still in your system at bedtime based on your
          intake timing.
        </p>
      </div>

      <h2 className="text-2xl font-bold mt-8 mb-4">
        Alcohol: The Sleep Destroyer Nobody Wants to Talk About
      </h2>

      <p>
        Alcohol is arguably the most common sleep disruptor in modern society, and it is more
        damaging than most people realize.
      </p>

      <p>
        Yes, alcohol makes you fall asleep faster. It is a sedative. But sedation is not sleep.
        Alcohol fragments sleep architecture in several specific ways. It suppresses REM sleep in
        the first half of the night and causes rebound wakefulness in the second half as your liver
        metabolizes it. Ebrahim et al. published a 2013 meta-analysis in Alcoholism: Clinical and
        Experimental Research showing that even moderate doses (1-2 drinks) reduce REM sleep by
        about 20%.
      </p>

      <p>
        For recovery purposes, this is particularly harmful. You get the illusion of falling asleep
        quickly, but the sleep you are getting is qualitatively worse. The growth hormone pulses
        during deep sleep are blunted. The REM-dependent memory consolidation is disrupted. You wake
        feeling unrested even after what seemed like a full night.
      </p>

      <p>
        I am not going to tell you never to drink. But if you are serious about recovery, be honest
        with yourself about the tradeoff. Two beers with dinner is not "harmless" from a sleep
        perspective, even if you feel fine the next morning.
      </p>

      <h2 className="text-2xl font-bold mt-8 mb-4">Napping: When It Helps and When It Backfires</h2>

      <p>Napping can be a powerful recovery tool, but only if done correctly.</p>

      <p>
        A 2010 study by Waterhouse et al. in the Journal of Sports Sciences found that a 30-minute
        nap after a night of sleep restriction improved sprint performance and alertness in
        athletes. NASA's Fatigue Countermeasures Program found that a 26-minute nap improved
        alertness by 54% and performance by 34% in pilots.
      </p>

      <p>
        The key variable is duration. Short naps (10-20 minutes) provide an alertness boost without
        entering deep sleep, so you wake feeling refreshed. Naps of 30-60 minutes risk entering deep
        sleep and causing sleep inertia (that groggy, disoriented feeling upon waking). If you have
        the time, a full 90-minute nap allows completion of one sleep cycle and tends to work well.
      </p>

      <p>
        The danger of napping is timing. Napping after 3pm can interfere with nighttime sleep drive,
        making it harder to fall asleep at bedtime. If you are already struggling with nighttime
        sleep, adding naps can make the problem worse by reducing your adenosine sleep pressure.
      </p>

      <h2 className="text-2xl font-bold mt-8 mb-4">
        Putting It All Together: A Research-Based Sleep Protocol
      </h2>

      <p>
        Based on the evidence reviewed above, here is what I consider the highest-impact sleep
        protocol, ranked roughly by effect size:
      </p>

      <ol className="list-decimal list-inside space-y-3 my-4">
        <li>
          <strong>Consistent sleep and wake times</strong> (within 30 minutes, including weekends).
          This is the foundation everything else builds on.
        </li>
        <li>
          <strong>Cool bedroom temperature</strong> (60-67F / 15.5-19.5C). Probably the single most
          impactful environmental change.
        </li>
        <li>
          <strong>Morning light exposure</strong> (15-30 minutes of bright light within an hour of
          waking). Anchors your circadian clock.
        </li>
        <li>
          <strong>Caffeine cutoff</strong> 8-10 hours before bed, adjusted for your individual
          metabolism.
        </li>
        <li>
          <strong>Dim lighting in the evening</strong> (not just screens, but overhead lights too).
          Use lamps instead of ceiling lights.
        </li>
        <li>
          <strong>Limit alcohol</strong> or at minimum allow 3-4 hours between your last drink and
          bedtime.
        </li>
        <li>
          <strong>Aim for 7.5-8.5 hours in bed</strong> (sleep efficiency is rarely 100%, so budget
          extra time).
        </li>
      </ol>

      <p>
        Notice what is not on this list: supplements, weighted blankets, sleep sounds apps, mouth
        tape. These are not necessarily useless, but the evidence behind them is weaker or more
        mixed than the items above. Focus on the fundamentals first.
      </p>

      <div className="neumorph p-6 rounded-lg mt-8">
        <h3 className="text-xl font-semibold mb-4">Tools for Tracking Your Sleep and Recovery</h3>
        <p className="mb-4">
          Our calculators can help you plan your sleep schedule and understand how caffeine affects
          your rest:
        </p>
        <ul className="list-disc list-inside space-y-2">
          <li>
            <Link href="/sleep" className="text-accent hover:underline">
              Sleep Calculator
            </Link>{' '}
            - Find optimal bedtimes based on your wake time and natural sleep cycles
          </li>
          <li>
            <Link href="/caffeine-calculator" className="text-accent hover:underline">
              Caffeine Intake Calculator
            </Link>{' '}
            - Estimate how caffeine timing affects your system and sleep
          </li>
          <li>
            <Link href="/bmr" className="text-accent hover:underline">
              BMR Calculator
            </Link>{' '}
            - Understand your basal metabolic rate, which is affected by sleep quality
          </li>
          <li>
            <Link href="/calories-burned" className="text-accent hover:underline">
              Calories Burned Calculator
            </Link>{' '}
            - Track activity alongside sleep for a complete recovery picture
          </li>
        </ul>
      </div>

      <div className="mt-12 border-t pt-8">
        <h3 className="text-xl font-semibold mb-4">References</h3>
        <ul className="space-y-3 text-sm text-gray-600">
          <li>
            Van Cauter E, Plat L. Physiology of growth hormone secretion during sleep. J Pediatr.
            1996;128(5 Pt 2):S32-7.
          </li>
          <li>
            Xie L, et al. Sleep drives metabolite clearance from the adult brain. Science.
            2013;342(6156):373-377.
          </li>
          <li>
            Mah CD, et al. The effects of sleep extension on the athletic performance of collegiate
            basketball players. Sleep. 2011;34(7):943-950.
          </li>
          <li>
            Spiegel K, et al. Brief communication: Sleep curtailment in healthy young men is
            associated with decreased leptin levels, elevated ghrelin levels, and increased hunger
            and appetite. Ann Intern Med. 2004;141(11):846-850.
          </li>
          <li>
            Nedeltcheva AV, et al. Insufficient sleep undermines dietary efforts to reduce
            adiposity. Ann Intern Med. 2010;153(7):435-441.
          </li>
          <li>
            Depner CM, et al. Ad libitum weekend recovery sleep fails to prevent metabolic
            dysregulation during a repeating pattern of insufficient sleep and weekend recovery
            sleep. Curr Biol. 2019;29(2):365-370.
          </li>
          <li>
            Leproult R, Van Cauter E. Effect of 1 week of sleep restriction on testosterone levels
            in young healthy men. JAMA. 2011;305(21):2173-2174.
          </li>
          <li>
            Drake C, et al. Caffeine effects on sleep taken 0, 3, or 6 hours before going to bed. J
            Clin Sleep Med. 2013;9(11):1195-1200.
          </li>
          <li>
            Krauchi K, et al. Warm feet promote the rapid onset of sleep. Nature.
            1999;401(6748):36-37.
          </li>
          <li>
            Ebrahim IO, et al. Alcohol and sleep I: effects on normal sleep. Alcohol Clin Exp Res.
            2013;37(4):539-549.
          </li>
          <li>
            de Zambotti M, et al. The Sleep of the Ring: Comparison of the OURA Sleep Tracker
            Against Polysomnography. Behav Sleep Med. 2019;17(2):124-136.
          </li>
          <li>
            Phillips AJK, et al. Irregular sleep/wake patterns are associated with poorer academic
            performance and delayed circadian and sleep/wake timing. Sci Rep. 2017;7:3216.
          </li>
          <li>
            Fothergill E, et al. Persistent metabolic adaptation 6 years after "The Biggest Loser"
            competition. Obesity. 2016;24(8):1612-1619.
          </li>
        </ul>
      </div>
    </div>
  </div>
);

export default function SleepRecoverySciencePage() {
  return SleepRecoverySciencePageContent;
}
