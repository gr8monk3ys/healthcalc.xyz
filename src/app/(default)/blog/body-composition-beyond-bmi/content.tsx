import React from 'react';
import Link from 'next/link';
import AdBlock from '@/components/AdBlock';

const BodyCompositionBeyondBMIPageContent = (
  <article className="max-w-4xl mx-auto px-4 py-12">
    <header className="mb-8">
      <span className="inline-block bg-accent/10 text-accent text-sm px-3 py-1 rounded-full">
        Body Composition
      </span>
      <h1 className="text-3xl md:text-4xl font-bold mt-2 mb-4 text-gray-900 dark:text-white">
        Body Composition: Why BMI Tells You Almost Nothing Useful
      </h1>
      <p className="text-gray-500 dark:text-gray-400 italic">
        Published: January 10, 2026 &bull; 20 min read
      </p>
    </header>

    <div className="prose prose-lg dark:prose-invert max-w-none">
      <div className="neumorph-card rounded-xl p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Key Takeaways</h2>
        <ul className="space-y-2 text-gray-700 dark:text-gray-300">
          <li>
            BMI was invented in the 1830s for population-level statistics, never for individual
            health assessment
          </li>
          <li>
            &quot;Normal weight obesity&quot; (normal BMI but high body fat) carries higher
            cardiovascular risk than BMI alone would suggest
          </li>
          <li>
            Waist-to-hip ratio and ABSI predict mortality risk better than BMI in most research
          </li>
          <li>
            No single measurement captures the full picture; the best approach combines multiple
            metrics
          </li>
        </ul>
      </div>

      <p className="text-xl text-gray-700 dark:text-gray-300 mb-6">
        I have a confession. I built a{' '}
        <Link href="/bmi" className="text-blue-600 dark:text-blue-400 hover:underline">
          BMI calculator
        </Link>{' '}
        for this site, and I think BMI is one of the least useful health metrics a person can track.
        That&apos;s not a contradiction. BMI is widespread, people search for it, and it gives you a
        number you can use as a rough screening tool. But the moment you start treating it as a
        meaningful indicator of individual health, you&apos;ve gone wrong.
      </p>

      <p>
        Let me explain why, what to measure instead, and how to actually understand your body
        composition in a way that tells you something useful.
      </p>

      <h2 className="text-3xl font-bold mt-12 mb-6 text-gray-900 dark:text-white">
        The Accidental History of BMI
      </h2>

      <p>
        BMI was not created by a doctor. It was created by a Belgian astronomer and statistician
        named Adolphe Quetelet in the 1830s. Quetelet was interested in defining &quot;the average
        man&quot; as a statistical concept. He noticed that body weight scaled roughly with the
        square of height across populations, and he described this mathematical relationship.
      </p>

      <p>
        That was it. He was not trying to create a health metric. He was not studying disease or
        fitness or body fat. He was doing population-level statistics with the tools available in
        1835.
      </p>

      <p>
        The formula sat mostly unused for over a century until Ancel Keys published a paper in 1972
        that dubbed it the &quot;Body Mass Index&quot; and argued it was useful for epidemiological
        studies. Keys himself was explicit that BMI was meant for population research, not
        individual diagnosis. He wrote that it was &quot;not fully satisfactory&quot; and
        acknowledged its limitations.
      </p>

      <p>
        But the insurance industry and public health agencies wanted something simple. BMI was
        simple. You could calculate it with a bathroom scale and a tape measure. No blood tests, no
        scans, no expertise needed. By the 1990s, it had become the primary screening tool for
        overweight and obesity classifications worldwide.
      </p>

      <p>That decision had consequences we are still dealing with.</p>

      <h2 className="text-3xl font-bold mt-12 mb-6 text-gray-900 dark:text-white">
        Where BMI Fails: The Obvious Cases
      </h2>

      <p>
        The most commonly cited failure of BMI is with athletes. Dwayne Johnson has a BMI of roughly
        34, which classifies him as &quot;obese.&quot; Most NFL running backs are
        &quot;overweight&quot; or &quot;obese&quot; by BMI. Competitive CrossFit athletes, gymnasts,
        and sprinters routinely fall outside the &quot;normal&quot; range.
      </p>

      <p>
        This happens because BMI treats all weight as equal. It divides weight by height squared. It
        cannot distinguish between 200 pounds of muscle and 200 pounds of fat. For anyone who has
        built significant muscle mass, BMI will overestimate health risk.
      </p>

      <p>But athletes are the obvious example. The less obvious failures are more concerning.</p>

      <h3 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white">
        The Elderly
      </h3>

      <p>
        Older adults lose muscle mass as they age (a process called sarcopenia). A 75-year-old with
        a BMI of 23 might have significantly more body fat than a 30-year-old with the same BMI,
        because the older person has lost muscle and replaced it with fat. The number looks the
        same. The body composition is completely different.
      </p>

      <p>
        Multiple studies, including a 2014 analysis in the Annals of Internal Medicine, have shown
        that the &quot;optimal&quot; BMI for mortality risk shifts higher with age. Elderly adults
        with BMIs of 25 to 30 (classified as &quot;overweight&quot;) actually have lower mortality
        rates than those with &quot;normal&quot; BMIs. This is sometimes called the obesity paradox,
        and it probably reflects the fact that some of that extra weight is protective muscle mass
        or metabolic reserve.
      </p>

      <h3 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white">
        Different Ethnicities
      </h3>

      <p>
        BMI cutoffs were established primarily from data on white European populations. They do not
        translate cleanly across ethnic groups.
      </p>

      <p>
        People of South Asian descent tend to carry more visceral fat at lower BMIs. A BMI of 23 in
        a South Asian individual may carry similar metabolic risk to a BMI of 25 to 27 in a white
        European. The WHO acknowledged this in 2004 by suggesting lower BMI cutoffs for Asian
        populations, but many health systems still use the universal thresholds.
      </p>

      <p>
        People of Polynesian and Pacific Islander descent tend to have greater bone density and lean
        mass, meaning BMI overestimates their fat mass and health risk. Black Americans also tend to
        have higher bone mineral density and lean mass compared to white Americans at the same BMI.
      </p>

      <p>
        A single set of BMI cutoffs applied across all populations is, to be direct, scientifically
        lazy. The data has been clear on this for decades.
      </p>

      <AdBlock format="horizontal" />

      <h2 className="text-3xl font-bold mt-12 mb-6 text-gray-900 dark:text-white">
        Normal Weight Obesity: The Hidden Risk
      </h2>

      <p>
        This is where BMI&apos;s failures become genuinely dangerous. &quot;Normal weight
        obesity&quot; describes people who have a BMI in the normal range (18.5 to 24.9) but carry
        an unhealthy amount of body fat.
      </p>

      <p>
        A 2008 study by Romero-Corral et al. in the European Heart Journal examined over 6,000
        adults and found that roughly 30% of people with normal BMIs had body fat percentages that
        met the criteria for obesity. These individuals had higher rates of metabolic syndrome,
        dyslipidemia, and cardiovascular risk factors compared to their normal-weight,
        normal-body-fat counterparts.
      </p>

      <p>
        A follow-up analysis using NHANES data (De Lorenzo et al., 2013) found that normal weight
        obese women had cardiovascular risk profiles similar to women classified as obese by BMI.
        Their BMI said &quot;healthy.&quot; Their body composition said otherwise.
      </p>

      <p>
        This matters because these people fall through the screening cracks. Their doctor checks
        BMI, sees a normal number, and moves on. No one investigates further. The patient feels fine
        because the metric says they&apos;re fine. Meanwhile, their visceral fat is accumulating
        around their organs, driving inflammation and insulin resistance.
      </p>

      <p>
        I think this is the strongest argument against relying on BMI alone. It&apos;s not just
        inaccurate for athletes. It misses people who are genuinely at risk.
      </p>

      <h2 className="text-3xl font-bold mt-12 mb-6 text-gray-900 dark:text-white">
        Body Fat Percentage: What Actually Matters
      </h2>

      <p>
        If BMI is a blunt instrument, body fat percentage is a much sharper one. It tells you what
        proportion of your total body weight is fat versus everything else (muscle, bone, water,
        organs).
      </p>

      <p>General ranges that most researchers agree on:</p>

      <div className="overflow-x-auto my-8">
        <table className="w-full border-collapse neumorph-card rounded-xl overflow-hidden">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-800">
              <th className="p-4 text-left font-semibold text-gray-900 dark:text-white">
                Category
              </th>
              <th className="p-4 text-left font-semibold text-gray-900 dark:text-white">Men</th>
              <th className="p-4 text-left font-semibold text-gray-900 dark:text-white">Women</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 dark:text-gray-300">
            <tr className="border-t border-gray-200 dark:border-gray-700">
              <td className="p-4">Essential fat</td>
              <td className="p-4">2-5%</td>
              <td className="p-4">10-13%</td>
            </tr>
            <tr className="border-t border-gray-200 dark:border-gray-700">
              <td className="p-4">Athletic</td>
              <td className="p-4">6-13%</td>
              <td className="p-4">14-20%</td>
            </tr>
            <tr className="border-t border-gray-200 dark:border-gray-700">
              <td className="p-4">Fitness</td>
              <td className="p-4">14-17%</td>
              <td className="p-4">21-24%</td>
            </tr>
            <tr className="border-t border-gray-200 dark:border-gray-700">
              <td className="p-4">Average</td>
              <td className="p-4">18-24%</td>
              <td className="p-4">25-31%</td>
            </tr>
            <tr className="border-t border-gray-200 dark:border-gray-700">
              <td className="p-4">Obese</td>
              <td className="p-4">25%+</td>
              <td className="p-4">32%+</td>
            </tr>
          </tbody>
        </table>
      </div>

      <p>
        Women carry more essential fat than men due to hormonal and reproductive demands. This is
        not a flaw. It is biology. A woman at 20% body fat is roughly equivalent in leanness to a
        man at 12%.
      </p>

      <p>
        The challenge with body fat percentage is measurement. Unlike BMI, you cannot calculate it
        with simple math. You need an actual measurement method, and every method has trade-offs.
      </p>

      <h2 className="text-3xl font-bold mt-12 mb-6 text-gray-900 dark:text-white">
        Measuring Body Fat: Methods Compared
      </h2>

      <p>I&apos;ve organized these from most to least accurate, with practical notes on each.</p>

      <h3 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white">
        DEXA Scan (Dual-Energy X-ray Absorptiometry)
      </h3>

      <p>
        DEXA is the clinical gold standard. It uses low-dose X-rays to differentiate between bone,
        lean tissue, and fat tissue. It gives you total body fat percentage, regional fat
        distribution, and bone density.
      </p>

      <p>
        Accuracy is within 1-2% body fat. The downside: it costs $75 to $200 per scan, it requires a
        clinic visit, and results can vary between machines and technicians. A 2019 review in
        Clinical Nutrition found that even DEXA results can differ by 1-3% between devices from
        different manufacturers. Still, for a one-time baseline measurement, it is the best option
        available outside of a research lab.
      </p>

      <h3 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white">
        Hydrostatic Weighing
      </h3>

      <p>
        You get dunked in a tank of water. Your underwater weight is compared to your dry weight,
        and the difference is used to calculate body density, which is then converted to body fat
        percentage. Accuracy is comparable to DEXA (within 1-2.5%).
      </p>

      <p>
        It&apos;s uncomfortable, requires you to fully exhale while submerged, and is only available
        at universities and specialized facilities. Not practical for regular tracking.
      </p>

      <h3 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white">
        Navy Method (Circumference-Based)
      </h3>

      <p>
        The U.S. Navy method uses neck, waist, and hip circumferences (plus height) to estimate body
        fat. Our{' '}
        <Link href="/body-fat" className="text-blue-600 dark:text-blue-400 hover:underline">
          body fat calculator
        </Link>{' '}
        includes this method.
      </p>

      <p>
        Accuracy is within 3-4% of DEXA for most people. It&apos;s free, requires only a tape
        measure, and is reasonably repeatable if you measure consistently. The main weakness is that
        it assumes fat distribution follows a standard pattern. If you carry fat differently than
        the average Navy recruit from the 1980s, it may be less accurate for you.
      </p>

      <p>
        For regular at-home tracking, I think this is the best option. Not because it&apos;s the
        most accurate, but because you can do it weekly with consistent conditions and track trends
        over time. The trend matters more than the absolute number.
      </p>

      <h3 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white">
        Bioelectrical Impedance Analysis (BIA)
      </h3>

      <p>
        This is what smart scales and handheld body fat devices use. A small electrical current
        passes through your body. Since muscle conducts electricity better than fat, the resistance
        (impedance) is used to estimate body composition.
      </p>

      <p>
        The problem: BIA is wildly affected by hydration. If you&apos;re dehydrated, it
        overestimates body fat. If you just drank a liter of water, it underestimates. Time of day,
        recent meals, recent exercise, and even skin temperature all influence the reading. Error
        margins of 5-8% are common, which makes a single reading nearly meaningless.
      </p>

      <p>
        High-end medical-grade BIA devices (like InBody) perform better, with error margins closer
        to 3%. But the consumer-grade scale you bought on Amazon? Take its body fat reading with a
        large amount of skepticism.
      </p>

      <h3 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white">
        Skinfold Calipers
      </h3>

      <p>
        A trained person pinches folds of skin at specific body sites and measures their thickness
        with calipers. The measurements are plugged into equations to estimate total body fat.
      </p>

      <p>
        In the hands of an experienced technician, accuracy is within 3-4%. In your own hands, with
        no training, accuracy drops significantly. The technique matters enormously. Which site you
        pinch, how hard you pinch, and where exactly you place the calipers all affect the result.
      </p>

      <div className="overflow-x-auto my-8">
        <table className="w-full border-collapse neumorph-card rounded-xl overflow-hidden">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-800">
              <th className="p-4 text-left font-semibold text-gray-900 dark:text-white">Method</th>
              <th className="p-4 text-left font-semibold text-gray-900 dark:text-white">
                Accuracy
              </th>
              <th className="p-4 text-left font-semibold text-gray-900 dark:text-white">Cost</th>
              <th className="p-4 text-left font-semibold text-gray-900 dark:text-white">
                Practicality
              </th>
            </tr>
          </thead>
          <tbody className="text-gray-700 dark:text-gray-300">
            <tr className="border-t border-gray-200 dark:border-gray-700">
              <td className="p-4">DEXA</td>
              <td className="p-4">+/- 1-2%</td>
              <td className="p-4">$75-200</td>
              <td className="p-4">Low (clinic visit)</td>
            </tr>
            <tr className="border-t border-gray-200 dark:border-gray-700">
              <td className="p-4">Hydrostatic</td>
              <td className="p-4">+/- 1-2.5%</td>
              <td className="p-4">$40-75</td>
              <td className="p-4">Low (specialized facility)</td>
            </tr>
            <tr className="border-t border-gray-200 dark:border-gray-700">
              <td className="p-4">Navy Method</td>
              <td className="p-4">+/- 3-4%</td>
              <td className="p-4">Free</td>
              <td className="p-4">High (tape measure)</td>
            </tr>
            <tr className="border-t border-gray-200 dark:border-gray-700">
              <td className="p-4">BIA (consumer)</td>
              <td className="p-4">+/- 5-8%</td>
              <td className="p-4">$20-100</td>
              <td className="p-4">High (step on scale)</td>
            </tr>
            <tr className="border-t border-gray-200 dark:border-gray-700">
              <td className="p-4">Skinfold calipers</td>
              <td className="p-4">+/- 3-4%</td>
              <td className="p-4">$10-30</td>
              <td className="p-4">Medium (requires skill)</td>
            </tr>
          </tbody>
        </table>
      </div>

      <AdBlock format="horizontal" />

      <h2 className="text-3xl font-bold mt-12 mb-6 text-gray-900 dark:text-white">
        Better Metrics: Waist-to-Hip Ratio and ABSI
      </h2>

      <p>
        If body fat percentage is hard to measure accurately at home, are there simpler metrics that
        still tell you something useful about health risk? Yes.
      </p>

      <h3 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white">
        Waist-to-Hip Ratio (WHR)
      </h3>

      <p>
        WHR is exactly what it sounds like: waist circumference divided by hip circumference. It
        captures how your fat is distributed, which turns out to be more important for health
        outcomes than how much fat you have overall.
      </p>

      <p>
        A 2011 meta-analysis published in the International Journal of Epidemiology (Czernichow et
        al.) analyzed data from over 220,000 participants and found that WHR was a stronger
        predictor of cardiovascular disease and all-cause mortality than BMI. People with high WHR
        (indicating more fat around the midsection) had significantly higher risks regardless of
        their BMI classification.
      </p>

      <p>
        The World Health Organization considers abdominal obesity to exist when WHR exceeds 0.90 for
        men or 0.85 for women. You can calculate yours with our{' '}
        <Link href="/whr" className="text-blue-600 dark:text-blue-400 hover:underline">
          waist-to-hip ratio calculator
        </Link>
        .
      </p>

      <h3 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white">
        A Body Shape Index (ABSI)
      </h3>

      <p>
        ABSI, developed by Krakauer and Krakauer (2012), goes a step further. It adjusts waist
        circumference for BMI and height, effectively isolating the health impact of abdominal fat
        distribution from overall body size.
      </p>

      <p>
        Their research, published in PLOS ONE, showed that ABSI predicted mortality risk
        independently of BMI. Someone with a high ABSI (lots of abdominal fat relative to their
        overall size) had a significantly higher death risk than someone with a low ABSI, even if
        both had the same BMI. A 2015 follow-up study confirmed the finding across multiple
        populations.
      </p>

      <p>
        Our{' '}
        <Link href="/absi" className="text-blue-600 dark:text-blue-400 hover:underline">
          ABSI calculator
        </Link>{' '}
        gives you this metric. Combined with WHR and body fat percentage, you get a substantially
        more complete picture than BMI alone can provide.
      </p>

      <h3 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white">
        Waist-to-Height Ratio
      </h3>

      <p>
        The simplest and possibly most powerful single metric. Just divide your waist circumference
        by your height. If the result is over 0.5, you are carrying excess abdominal fat.
      </p>

      <p>
        A 2012 systematic review in Obesity Reviews (Ashwell et al.) analyzed 31 studies and
        concluded that waist-to-height ratio was a better discriminator of health outcomes
        (diabetes, cardiovascular disease, and all-cause mortality) than both BMI and waist
        circumference alone. The 0.5 cutoff worked across ages, sexes, and ethnicities. You can
        check yours with our{' '}
        <Link
          href="/waist-to-height-ratio"
          className="text-blue-600 dark:text-blue-400 hover:underline"
        >
          waist-to-height ratio calculator
        </Link>
        .
      </p>

      <p>
        A tape measure around your waist and knowledge of your height. That&apos;s all you need for
        a metric that outperforms BMI in nearly every study that compares them.
      </p>

      <h2 className="text-3xl font-bold mt-12 mb-6 text-gray-900 dark:text-white">
        What the Research Says About Body Fat and Health Outcomes
      </h2>

      <p>
        The relationship between body fat and health is not a straight line. You do not become
        progressively healthier as you get leaner. There is a U-shaped curve, where both too much
        and too little body fat increase health risks.
      </p>

      <p>
        For men, body fat below 5% is associated with hormonal disruption, immune suppression, and
        reduced cognitive function. Competitive bodybuilders who reach 3-5% for a show often report
        fatigue, mood disturbances, and loss of sex drive. This is not a sustainable or healthy
        state.
      </p>

      <p>
        For women, body fat below 12-14% often disrupts menstrual function. The female athlete triad
        (now called Relative Energy Deficiency in Sport, or RED-S) involves low energy availability,
        menstrual dysfunction, and decreased bone density. It is a serious medical condition, not a
        badge of fitness.
      </p>

      <p>
        On the other end, the health risks of excess body fat are well established: increased risk
        of type 2 diabetes, cardiovascular disease, certain cancers, sleep apnea, and joint
        problems. But the exact threshold where risk increases meaningfully is debated and varies by
        individual.
      </p>

      <p>
        A 2016 analysis in JAMA Internal Medicine using data from the National Health and Nutrition
        Examination Survey found that the lowest mortality risk for men was in the 14-20% body fat
        range, and for women in the 20-28% range. Going below those ranges did not provide
        additional health benefits in the general population, and in some subgroups, it increased
        risk.
      </p>

      <AdBlock format="horizontal" />

      <h2 className="text-3xl font-bold mt-12 mb-6 text-gray-900 dark:text-white">
        A Practical Approach to Body Composition Assessment
      </h2>

      <p>
        Given everything above, here is what I actually recommend for someone who wants to
        understand their body composition without spending hundreds on clinical testing.
      </p>

      <p>
        <strong>Track waist circumference.</strong> Measure at the narrowest point of your natural
        waist (usually around the navel), first thing in the morning, before eating. This single
        measurement, tracked weekly, tells you more about health-relevant fat changes than body
        weight alone.
      </p>

      <p>
        <strong>Calculate waist-to-height ratio.</strong> If it&apos;s under 0.5, your abdominal fat
        is likely in a healthy range. If it&apos;s above 0.5, focus on reducing it through calorie
        management and exercise.
      </p>

      <p>
        <strong>Use the Navy method for body fat estimation.</strong> Measure neck, waist, and hips
        consistently, at the same time of day, once a week. Don&apos;t obsess over the absolute
        number. Watch the trend.
      </p>

      <p>
        <strong>Check your WHR and ABSI.</strong> These give you information about fat distribution
        that body fat percentage alone does not capture. Someone with 20% body fat concentrated
        around the midsection has a different risk profile than someone with 20% body fat
        distributed more evenly.
      </p>

      <p>
        <strong>Get a DEXA scan once per year if you can afford it.</strong> This gives you a
        precise baseline and shows you exactly where your fat and lean mass are distributed. Compare
        it to your Navy method estimates to calibrate your at-home measurements.
      </p>

      <p>
        <strong>Stop obsessing over BMI.</strong> Know it. Check it. Then move on to measurements
        that actually matter for your health. BMI is a screening tool for populations. It was never
        designed to describe you as an individual, and it doesn&apos;t do that job well.
      </p>

      <h2 className="text-3xl font-bold mt-12 mb-6 text-gray-900 dark:text-white">
        The Bottom Line
      </h2>

      <p>
        Your body composition is more than a single number. BMI is a quick and easy metric, but it
        cannot distinguish fat from muscle, it fails across ethnicities and age groups, and it
        misses the &quot;normal weight obese&quot; population entirely.
      </p>

      <p>
        Body fat percentage, waist-to-hip ratio, ABSI, and waist-to-height ratio each capture
        different aspects of health risk. None of them is perfect alone. Together, they give you a
        picture that is genuinely useful.
      </p>

      <p>
        If you only have 30 seconds, measure your waist and divide by your height. If it&apos;s
        under 0.5, you&apos;re probably in a good place. If it&apos;s over 0.5, you have a concrete
        target to work toward.
      </p>

      <div className="neumorph-card rounded-xl p-6 my-8">
        <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
          Measure What Matters
        </h3>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          Get a fuller picture of your body composition with these calculators. Use them together
          for the most complete assessment.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/bmi"
            className="neumorph-button px-4 py-2 rounded-lg text-sm font-medium hover:scale-105 transition-transform"
          >
            BMI Calculator
          </Link>
          <Link
            href="/body-fat"
            className="neumorph-button px-4 py-2 rounded-lg text-sm font-medium hover:scale-105 transition-transform"
          >
            Body Fat Calculator
          </Link>
          <Link
            href="/whr"
            className="neumorph-button px-4 py-2 rounded-lg text-sm font-medium hover:scale-105 transition-transform"
          >
            WHR Calculator
          </Link>
          <Link
            href="/absi"
            className="neumorph-button px-4 py-2 rounded-lg text-sm font-medium hover:scale-105 transition-transform"
          >
            ABSI Calculator
          </Link>
          <Link
            href="/waist-to-height-ratio"
            className="neumorph-button px-4 py-2 rounded-lg text-sm font-medium hover:scale-105 transition-transform"
          >
            Waist-to-Height Ratio
          </Link>
        </div>
      </div>

      <h2 className="text-3xl font-bold mt-12 mb-6 text-gray-900 dark:text-white">References</h2>

      <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
        <li>
          Keys A, et al. &quot;Indices of relative weight and obesity.&quot; Journal of Chronic
          Diseases, 1972.
        </li>
        <li>
          Romero-Corral A, et al. &quot;Normal weight obesity: a risk factor for cardiometabolic
          dysregulation and cardiovascular mortality.&quot; European Heart Journal, 2008.
        </li>
        <li>
          De Lorenzo A, et al. &quot;New obesity classification criteria as a tool for bariatric
          surgery indication.&quot; World Journal of Gastroenterology, 2016.
        </li>
        <li>
          Czernichow S, et al. &quot;Body mass index, waist circumference and waist-hip ratio: which
          is the better discriminator of cardiovascular disease mortality risk?&quot; International
          Journal of Epidemiology, 2011.
        </li>
        <li>
          Krakauer NY, Krakauer JC. &quot;A new body shape index predicts mortality hazard
          independently of body mass index.&quot; PLOS ONE, 2012.
        </li>
        <li>
          Ashwell M, et al. &quot;Waist-to-height ratio is a better screening tool than waist
          circumference and BMI for adult cardiometabolic risk factors.&quot; Obesity Reviews, 2012.
        </li>
        <li>
          Flegal KM, et al. &quot;Association of all-cause mortality with overweight and obesity
          using standard body mass index categories.&quot; JAMA, 2013.
        </li>
      </ul>
    </div>
  </article>
);

export default function BodyCompositionBeyondBMIPage() {
  return BodyCompositionBeyondBMIPageContent;
}
