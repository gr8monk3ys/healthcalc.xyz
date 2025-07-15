import React from 'react';
import Link from 'next/link';
import AdBlock from '@/components/AdBlock';

const HeartRateTrainingSciencePageContent = (
  <article className="max-w-4xl mx-auto px-4 py-12">
    <header className="mb-8">
      <span className="inline-block bg-accent/10 text-accent text-sm px-3 py-1 rounded-full">
        Performance Training
      </span>
      <h1 className="text-3xl md:text-4xl font-bold mt-2 mb-4 text-gray-900 dark:text-white">
        Heart Rate Training Zones: The Science and How to Actually Use Them
      </h1>
      <p className="text-gray-500 dark:text-gray-400 italic">
        Published: January 20, 2026 &bull; 19 min read
      </p>
    </header>

    <div className="prose prose-lg dark:prose-invert max-w-none">
      <div className="neumorph-card rounded-xl p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Key Takeaways</h2>
        <ul className="space-y-2 text-gray-700 dark:text-gray-300">
          <li>
            The 220-minus-age formula for max heart rate has a standard deviation of 10 to 12 bpm,
            making it unreliable for individual training
          </li>
          <li>
            Zone 2 training (where you can hold a conversation but feel like you are working) should
            make up 75 to 80% of your training volume
          </li>
          <li>
            Heart rate lags behind actual effort during intervals, making HR zones unreliable for
            short, high-intensity work
          </li>
          <li>
            Resting heart rate, tracked over time, is one of the best free indicators of
            cardiovascular fitness and recovery status
          </li>
        </ul>
      </div>

      <p className="text-xl text-gray-700 dark:text-gray-300 mb-6">
        Heart rate training has been around since the 1970s, but it has exploded in popularity over
        the last decade thanks to wearable technology. Nearly every fitness watch now displays
        real-time heart rate zones during exercise. The problem is that most people have no idea
        what those zones mean, how they were defined, or why the foundational formula behind them is
        deeply flawed.
      </p>

      <p>
        Let me walk through the physiology, the practical applications, and the places where heart
        rate monitoring falls short.
      </p>

      <h2 className="text-3xl font-bold mt-12 mb-6 text-gray-900 dark:text-white">
        Why 220 Minus Your Age Is Terrible
      </h2>

      <p>
        Almost every heart rate calculator and fitness device defaults to this formula for
        estimating maximum heart rate: 220 minus your age. If you are 30, your predicted max is 190
        bpm. If you are 50, it is 170 bpm.
      </p>

      <p>
        The origin of this formula is surprisingly informal. It was not derived from a controlled
        study. As Robert Robergs and Roberto Landwehr documented in a 2002 paper in the Journal of
        Exercise Physiology, the 220-minus-age formula came from an observation made by Fox,
        Naughton, and Haskell in 1971 who plotted data points from roughly 10 studies on a graph,
        drew a line through them, and noted the general trend. It was never intended as a precise
        prediction tool.
      </p>

      <p>
        The standard deviation around this formula is approximately 10 to 12 bpm. That means if you
        are 40 and the formula predicts a max HR of 180, your actual max could reasonably be
        anywhere from 168 to 192. A 24-beat range.
      </p>

      <p>
        Think about what that means for training zones. If your zones are calculated as percentages
        of max HR, and your estimated max is wrong by 12 beats, every single zone is shifted. You
        might be training in what you believe is Zone 2 (easy aerobic) when you are actually in Zone
        3 (tempo). Or you might think you are pushing hard in Zone 4 when you are barely above Zone
        3.
      </p>

      <p>
        You can check what the standard formula predicts for you with our{' '}
        <Link href="/max-heart-rate" className="text-blue-600 dark:text-blue-400 hover:underline">
          max heart rate calculator
        </Link>
        , but understand that the output is an estimate with a wide margin of error.
      </p>

      <h3 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white">
        Better alternatives
      </h3>

      <p>
        The Tanaka formula (2001, published in the Journal of the American College of Cardiology) is
        slightly more accurate: 208 minus (0.7 x age). It has a smaller standard deviation than the
        220-minus-age formula, though it is still not precise enough for individual prescription.
      </p>

      <p>
        The Gulati formula (2010) was developed specifically for women: 206 minus (0.88 x age).
        Women tend to have higher maximum heart rates than men of the same age, and using the
        standard 220-minus-age formula consistently underestimates max HR for women.
      </p>

      <p>
        But here is the truth: the only reliable way to determine your maximum heart rate is to test
        it. A graded maximal exercise test in a lab is the gold standard. A field test (such as
        running progressively faster 400-meter repeats until you cannot go harder) can get you
        close, though it requires a high level of motivation and carries some risk if you have
        underlying cardiovascular issues.
      </p>

      <p>
        If you have never done a max HR test, do not assume you know your max. A formula gives you a
        range. Your actual max could be significantly different.
      </p>

      <h2 className="text-3xl font-bold mt-12 mb-6 text-gray-900 dark:text-white">
        The 5-Zone Model: What Actually Happens in Your Body
      </h2>

      <p>
        There are several zone models used in exercise science (3-zone, 5-zone, 7-zone). The 5-zone
        model is the most common and practical for most people. Each zone corresponds to real
        physiological changes in how your body produces energy.
      </p>

      <div className="overflow-x-auto my-8">
        <table className="w-full border-collapse neumorph-card rounded-xl overflow-hidden">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-800">
              <th className="p-4 text-left font-semibold text-gray-900 dark:text-white">Zone</th>
              <th className="p-4 text-left font-semibold text-gray-900 dark:text-white">
                % Max HR
              </th>
              <th className="p-4 text-left font-semibold text-gray-900 dark:text-white">Feel</th>
              <th className="p-4 text-left font-semibold text-gray-900 dark:text-white">
                Physiology
              </th>
            </tr>
          </thead>
          <tbody className="text-gray-700 dark:text-gray-300">
            <tr className="border-t border-gray-200 dark:border-gray-700">
              <td className="p-4 font-medium">Zone 1 (50-60%)</td>
              <td className="p-4">Very easy</td>
              <td className="p-4">Walking pace</td>
              <td className="p-4">Active recovery, primarily fat oxidation</td>
            </tr>
            <tr className="border-t border-gray-200 dark:border-gray-700">
              <td className="p-4 font-medium">Zone 2 (60-70%)</td>
              <td className="p-4">Easy to moderate</td>
              <td className="p-4">Can talk in sentences</td>
              <td className="p-4">
                Aerobic base, maximal fat oxidation, mitochondrial development
              </td>
            </tr>
            <tr className="border-t border-gray-200 dark:border-gray-700">
              <td className="p-4 font-medium">Zone 3 (70-80%)</td>
              <td className="p-4">Moderate to hard</td>
              <td className="p-4">Talking becomes difficult</td>
              <td className="p-4">Aerobic-anaerobic transition, lactate starts accumulating</td>
            </tr>
            <tr className="border-t border-gray-200 dark:border-gray-700">
              <td className="p-4 font-medium">Zone 4 (80-90%)</td>
              <td className="p-4">Hard</td>
              <td className="p-4">Only short phrases possible</td>
              <td className="p-4">Threshold training, lactate at or near clearance capacity</td>
            </tr>
            <tr className="border-t border-gray-200 dark:border-gray-700">
              <td className="p-4 font-medium">Zone 5 (90-100%)</td>
              <td className="p-4">Maximum</td>
              <td className="p-4">Cannot talk</td>
              <td className="p-4">VO2max efforts, anaerobic, sustainable for 1-5 minutes</td>
            </tr>
          </tbody>
        </table>
      </div>

      <p>
        Calculate your personal zones with our{' '}
        <Link href="/heart-rate-zones" className="text-blue-600 dark:text-blue-400 hover:underline">
          heart rate zones calculator
        </Link>
        . Just remember that the accuracy of those zones depends entirely on how accurate your max
        HR input is.
      </p>

      <AdBlock format="horizontal" />

      <h2 className="text-3xl font-bold mt-12 mb-6 text-gray-900 dark:text-white">
        Zone 2 Training: Why Everyone Is Talking About It
      </h2>

      <p>
        Zone 2 has become the most discussed training zone in recent years, partly because of
        researchers like Inigo San Millan and partly because high-profile figures like Peter Attia
        have popularized it. But the science behind Zone 2 training is not new. Endurance coaches
        have known about its importance for decades.
      </p>

      <h3 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white">
        What happens in Zone 2
      </h3>

      <p>
        Zone 2 represents the intensity at which your body primarily uses fat for fuel through
        aerobic metabolism. Your mitochondria (the energy-producing structures in your cells) are
        working at high capacity, your body is clearing lactate as fast as it produces it, and your
        cardiovascular system is under enough stress to adapt without enough stress to accumulate
        significant fatigue.
      </p>

      <p>
        The adaptations from sustained Zone 2 training are profound. Mitochondrial density increases
        (more mitochondria per muscle cell). Capillary density increases (better blood delivery to
        working muscles). Fat oxidation capacity improves (your body becomes better at burning fat
        at higher intensities). Cardiac output increases (your heart pumps more blood per beat).
      </p>

      <p>
        These are the foundations of cardiovascular fitness. They cannot be built through
        high-intensity training alone. HIIT develops different adaptations (lactate tolerance, peak
        power, VO2max). Zone 2 builds the aerobic base that everything else sits on top of.
      </p>

      <h3 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white">
        The 80/20 polarized model
      </h3>

      <p>
        Stephen Seiler, a researcher at the University of Agder in Norway, has published extensively
        on how elite endurance athletes actually train. His findings, replicated across running,
        cycling, rowing, and cross-country skiing, consistently show the same pattern: roughly 80%
        of training volume is performed at low intensity (Zone 1 and Zone 2) and roughly 20% at high
        intensity (Zone 4 and Zone 5). Very little training is done in Zone 3.
      </p>

      <p>
        Seiler&apos;s 2010 paper in the International Journal of Sports Physiology and Performance
        showed that this polarized distribution was common among Olympic-level athletes across
        multiple disciplines. A 2014 meta-analysis by Stoggl and Sperlich in Frontiers in Physiology
        compared polarized training to threshold training (more time in Zone 3) and high-intensity
        training (more time in Zone 4-5). Polarized training produced the best improvements in
        endurance performance measures.
      </p>

      <p>
        The reason Zone 3 is minimized in this model is important. Zone 3 is hard enough to generate
        significant fatigue but not intense enough to produce the specific high-intensity
        adaptations that Zones 4 and 5 develop. Seiler calls it the &quot;black hole&quot; of
        training: too hard to recover from easily, too easy to drive meaningful intensity-specific
        adaptation.
      </p>

      <p>
        For recreational athletes, the practical implication is clear: most of your training should
        feel easy. Uncomfortably easy. If you can hold a conversation throughout the session, you
        are probably in the right zone. The hard days should be genuinely hard. The easy days should
        be genuinely easy.
      </p>

      <h2 className="text-3xl font-bold mt-12 mb-6 text-gray-900 dark:text-white">
        Where Heart Rate Zones Lie: Drift and Lag
      </h2>

      <p>
        Heart rate is a useful tool, but it is not a perfect proxy for exercise intensity. There are
        two major phenomena that cause heart rate to misrepresent what is actually happening in your
        muscles.
      </p>

      <h3 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white">
        Cardiac lag
      </h3>

      <p>
        Heart rate takes time to respond to changes in effort. When you start a sprint, your muscles
        immediately ramp up energy production, but your heart rate takes 30 to 60 seconds to catch
        up. During interval training, this means your heart rate may still be climbing when the
        interval ends, and it may not reach the value that actually represents your effort level.
      </p>

      <p>
        Conversely, when you stop or reduce effort, heart rate takes time to come back down. During
        a rest interval, your heart rate might read 160 bpm even though your actual metabolic demand
        has dropped significantly.
      </p>

      <p>
        This makes heart rate zones unreliable for short, high-intensity intervals (anything under 2
        to 3 minutes). For these sessions, perceived effort or pace-based targets are more useful
        than heart rate.
      </p>

      <h3 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white">
        Heart rate drift
      </h3>

      <p>
        During prolonged exercise at a constant effort, heart rate gradually increases even though
        your pace and power remain the same. This is called cardiac drift, and it happens because of
        dehydration (reduced blood volume), increased body temperature, and sympathetic nervous
        system activation over time.
      </p>

      <p>
        During a 90-minute easy run, your heart rate might start at 135 bpm and drift to 150 bpm
        without any change in pace. If you are targeting Zone 2 by heart rate alone, you might slow
        down to keep your heart rate in the zone, when the reality is that your effort level has not
        changed. The heart rate went up, but the metabolic intensity stayed the same.
      </p>

      <p>
        For sessions over 60 minutes, recognize that drift is normal and expected. Anchor your Zone
        2 work to perceived effort and pace rather than chasing a specific heart rate number
        throughout the entire session.
      </p>

      <AdBlock format="horizontal" />

      <h2 className="text-3xl font-bold mt-12 mb-6 text-gray-900 dark:text-white">
        Heart Rate Variability: What It Tells You (And What It Does Not)
      </h2>

      <p>
        HRV measures the variation in time between consecutive heartbeats. Despite the name, higher
        HRV is generally associated with better health and fitness. It reflects the activity of your
        autonomic nervous system, specifically the balance between sympathetic (fight or flight) and
        parasympathetic (rest and digest) branches.
      </p>

      <p>
        HRV has genuine value as a recovery metric. A 2017 systematic review by Plews et al. in
        Sports Medicine found that daily HRV monitoring could identify accumulated fatigue and
        predict overreaching in trained athletes. When HRV trends downward over several days, it
        suggests your body is not fully recovering from training stress.
      </p>

      <p>
        Multiple apps now use morning HRV readings to recommend training intensity. The concept is
        sound: train hard when your HRV is normal or elevated, back off when it is suppressed.
        Several studies have shown that HRV-guided training produces equal or better results than
        fixed training plans, primarily because it prevents overreaching.
      </p>

      <p>
        But HRV is also sensitive to things that have nothing to do with training: alcohol, sleep
        quality, stress, illness, caffeine, even the time you wake up. A single low HRV reading does
        not mean you are overtrained. A trend of declining HRV over a week combined with increased
        fatigue, poor sleep, and declining performance might.
      </p>

      <p>
        I think HRV is useful when tracked consistently over weeks and months, looked at as a trend
        rather than daily data points, and interpreted alongside subjective indicators (how do you
        actually feel?). It is not a crystal ball.
      </p>

      <h2 className="text-3xl font-bold mt-12 mb-6 text-gray-900 dark:text-white">
        Resting Heart Rate: The Free Fitness Indicator
      </h2>

      <p>
        Of all the heart rate metrics, resting heart rate (RHR) might be the most underappreciated.
        It requires no formula, no maximal test, and no expensive equipment. Just check your pulse
        when you wake up.
      </p>

      <p>
        Average resting heart rate for adults is 60 to 100 bpm. Well-trained endurance athletes
        often have RHRs in the 40s or even 30s. This reflects a more efficient heart that pumps more
        blood per beat, requiring fewer beats per minute to meet the body&apos;s resting needs.
      </p>

      <p>
        A 2018 study in Open Heart (Reimers et al.) analyzed data from over 45 studies and found
        that resting heart rate was a significant independent predictor of all-cause mortality and
        cardiovascular events. Each 10-bpm increase in RHR was associated with a roughly 15%
        increase in mortality risk.
      </p>

      <p>
        As a fitness indicator, tracking RHR over months shows clear trends. When cardiovascular
        fitness improves, RHR decreases. When you are overtraining, sleep deprived, or getting sick,
        RHR tends to increase. It is a simple, free, and surprisingly informative metric.
      </p>

      <p>
        Check yours with our{' '}
        <Link
          href="/resting-heart-rate"
          className="text-blue-600 dark:text-blue-400 hover:underline"
        >
          resting heart rate calculator
        </Link>{' '}
        to see where you stand.
      </p>

      <h2 className="text-3xl font-bold mt-12 mb-6 text-gray-900 dark:text-white">
        Practical: How to Structure a Week Using Heart Rate Zones
      </h2>

      <p>
        Here is how I would structure a training week for a recreational athlete who wants to
        improve cardiovascular fitness, based on the polarized model and the research above.
      </p>

      <div className="neumorph-card rounded-xl p-6 my-8 bg-blue-50 dark:bg-blue-900/20">
        <h4 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
          Sample Week (4-5 sessions)
        </h4>
        <div className="space-y-3 text-gray-700 dark:text-gray-300">
          <p>
            <strong>Monday:</strong> Zone 2, 40-60 minutes. Easy run, bike, or swim. Should feel
            comfortable the entire time. You should be able to talk without pausing for breath.
          </p>
          <p>
            <strong>Tuesday:</strong> Rest or Zone 1 recovery walk.
          </p>
          <p>
            <strong>Wednesday:</strong> High intensity. Intervals in Zone 4-5. Example: 4-6 x 3
            minutes hard with 2 minutes easy recovery between. Total session 35-45 minutes including
            warm-up and cool-down.
          </p>
          <p>
            <strong>Thursday:</strong> Zone 2, 40-60 minutes. Same as Monday.
          </p>
          <p>
            <strong>Friday:</strong> Rest.
          </p>
          <p>
            <strong>Saturday:</strong> Long Zone 2 session, 60-90 minutes. This is the most
            important session of the week for building aerobic capacity.
          </p>
          <p>
            <strong>Sunday:</strong> Rest or easy Zone 1 activity.
          </p>
        </div>
      </div>

      <p>
        Notice the ratio. Three sessions in Zone 2, one high-intensity session. That is close to the
        80/20 split the research supports. The volume might seem easy compared to what most fitness
        plans prescribe. That is the point. Most recreational athletes train too hard on their easy
        days and too easy on their hard days. The result is a lot of time spent in Zone 3 (the black
        hole) with less adaptation than a properly polarized approach would produce.
      </p>

      <p>
        If you are combining cardio with strength training (which I recommend), the resistance
        training sessions can replace one or two of the cardio sessions, or be done on the same day
        with a few hours of separation.
      </p>

      <h2 className="text-3xl font-bold mt-12 mb-6 text-gray-900 dark:text-white">
        VO2 Max: The Number Behind the Zones
      </h2>

      <p>
        VO2 max is the maximum amount of oxygen your body can use during exercise. It is considered
        the single best measure of cardiovascular fitness. Heart rate zones, at their core, are
        approximations of the effort levels that correspond to different percentages of your VO2
        max.
      </p>

      <p>
        Zone 2 roughly corresponds to 55-75% of VO2 max. The lactate threshold (where lactate begins
        accumulating faster than it can be cleared) typically occurs at 75-85% of VO2 max. Zone 5
        efforts push you to 90-100%.
      </p>

      <p>
        Wearable devices now estimate VO2 max from heart rate and pace data. These estimates are
        reasonable for tracking trends but should not be confused with a laboratory measurement. A
        proper VO2 max test costs $100 to $300 and gives you a precise number along with your
        ventilatory thresholds, which can be used to set highly accurate training zones.
      </p>

      <p>
        Our{' '}
        <Link href="/vo2-max" className="text-blue-600 dark:text-blue-400 hover:underline">
          VO2 max calculator
        </Link>{' '}
        gives you an estimate based on your running performance data. Use it as a reference point,
        not a lab result.
      </p>

      <AdBlock format="horizontal" />

      <h2 className="text-3xl font-bold mt-12 mb-6 text-gray-900 dark:text-white">
        Common Mistakes with Heart Rate Training
      </h2>

      <p>
        <strong>Using the 220-minus-age formula without testing.</strong> I have said this already,
        but it bears repeating. If your max HR estimate is wrong by 12 bpm, every zone you calculate
        from it is wrong. If you are going to train by heart rate, invest the effort to determine
        your actual max.
      </p>

      <p>
        <strong>Training too hard too often.</strong> The most common error I see is people who
        never go truly easy. Every run is at a &quot;moderate&quot; pace. Every cycling session is
        &quot;decent effort.&quot; They are chronically training in Zone 3, accumulating fatigue
        without the recovery benefits of Zone 2 or the intensity benefits of Zone 4-5.
      </p>

      <p>
        <strong>Ignoring heart rate drift.</strong> Slowing down to keep heart rate in Zone 2 during
        a long session is not always the right call. If your pace is the same and your perceived
        effort is the same, the rising heart rate is drift, not increased intensity. Learn to use
        heart rate alongside perceived effort, not as the sole guide.
      </p>

      <p>
        <strong>Using heart rate for short intervals.</strong> Cardiac lag means your heart rate
        during a 30-second or 60-second interval does not reflect the actual metabolic intensity.
        For intervals under 2 to 3 minutes, use pace or power instead.
      </p>

      <p>
        <strong>Checking heart rate obsessively.</strong> If you spend your entire run staring at
        your watch and adjusting pace every 10 seconds to stay in the exact right zone, you are
        missing the point. Zones are ranges, not precise targets. Being a few beats above or below
        the zone boundary does not change the physiological stimulus.
      </p>

      <h2 className="text-3xl font-bold mt-12 mb-6 text-gray-900 dark:text-white">
        The Bottom Line
      </h2>

      <p>
        Heart rate training is a useful framework for organizing exercise intensity. The zones
        correspond to real physiological processes, and training in the right zones at the right
        ratios produces better results than randomly varying intensity.
      </p>

      <p>
        But heart rate is an imperfect proxy for effort. The formulas used to estimate max HR are
        imprecise. Cardiac lag and drift make real-time readings unreliable in certain contexts. And
        the zones themselves are approximations, not hard boundaries.
      </p>

      <p>
        Use heart rate as one input alongside perceived effort, pace, and power (if available).
        Spend most of your training time easy. Make your hard days genuinely hard. Track your
        resting heart rate over time as a free indicator of fitness. And if you are serious about
        heart rate training, get your max HR tested rather than relying on a formula that was never
        meant to describe you personally.
      </p>

      <div className="neumorph-card rounded-xl p-6 my-8">
        <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
          Find Your Numbers
        </h3>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          Use these calculators to estimate your training zones, max heart rate, and cardiovascular
          fitness.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/heart-rate-zones"
            className="neumorph-button px-4 py-2 rounded-lg text-sm font-medium hover:scale-105 transition-transform"
          >
            Heart Rate Zones
          </Link>
          <Link
            href="/max-heart-rate"
            className="neumorph-button px-4 py-2 rounded-lg text-sm font-medium hover:scale-105 transition-transform"
          >
            Max Heart Rate
          </Link>
          <Link
            href="/resting-heart-rate"
            className="neumorph-button px-4 py-2 rounded-lg text-sm font-medium hover:scale-105 transition-transform"
          >
            Resting Heart Rate
          </Link>
          <Link
            href="/vo2-max"
            className="neumorph-button px-4 py-2 rounded-lg text-sm font-medium hover:scale-105 transition-transform"
          >
            VO2 Max Calculator
          </Link>
          <Link
            href="/target-heart-rate"
            className="neumorph-button px-4 py-2 rounded-lg text-sm font-medium hover:scale-105 transition-transform"
          >
            Target Heart Rate
          </Link>
        </div>
      </div>

      <h2 className="text-3xl font-bold mt-12 mb-6 text-gray-900 dark:text-white">References</h2>

      <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
        <li>
          Robergs RA, Landwehr R. &quot;The surprising history of the &apos;HRmax=220-age&apos;
          equation.&quot; Journal of Exercise Physiology Online, 2002.
        </li>
        <li>
          Tanaka H, Monahan KD, Seals DR. &quot;Age-predicted maximal heart rate revisited.&quot;
          Journal of the American College of Cardiology, 2001.
        </li>
        <li>
          Gulati M, et al. &quot;Heart rate response to exercise stress testing in asymptomatic
          women.&quot; Circulation, 2010.
        </li>
        <li>
          Seiler S. &quot;What is best practice for training intensity and duration distribution in
          endurance athletes?&quot; International Journal of Sports Physiology and Performance,
          2010.
        </li>
        <li>
          Stoggl T, Sperlich B. &quot;Polarized training has greater impact on key endurance
          variables than threshold, high intensity, or high volume training.&quot; Frontiers in
          Physiology, 2014.
        </li>
        <li>
          Plews DJ, et al. &quot;Training adaptation and heart rate variability in elite endurance
          athletes: opening the door to effective monitoring.&quot; Sports Medicine, 2013.
        </li>
        <li>
          Reimers AK, Knapp G, Reimers CD. &quot;Effects of exercise on the resting heart rate: a
          systematic review and meta-analysis of interventional studies.&quot; Journal of Clinical
          Medicine, 2018.
        </li>
      </ul>
    </div>
  </article>
);

export default function HeartRateTrainingSciencePage() {
  return HeartRateTrainingSciencePageContent;
}
