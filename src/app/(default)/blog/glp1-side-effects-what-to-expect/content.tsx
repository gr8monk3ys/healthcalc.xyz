import React from 'react';
import Link from 'next/link';
import AdBlock from '@/components/AdBlock';

const GLP1SideEffectsWhatToExpectPageContent = (
  <div className="max-w-4xl mx-auto">
    <div className="mb-8">
      <span className="inline-block bg-accent/10 text-accent text-sm px-3 py-1 rounded-full">
        GLP-1 &amp; Weight Loss
      </span>
      <h1 className="text-3xl md:text-4xl font-bold mt-2 mb-4">
        GLP-1 Side Effects: What Actually Happens and How to Manage Them
      </h1>
      <p className="text-gray-500 italic">Published: January 12, 2026 &bull; 16 min read</p>
    </div>

    <div className="prose prose-lg max-w-none">
      <div className="neumorph p-6 rounded-lg mb-8">
        <h2 className="text-xl font-semibold mb-4">Key Takeaways</h2>
        <ul className="space-y-2">
          <li>
            Nausea affects 40-44% of people starting semaglutide and typically peaks during dose
            escalation, then improves significantly after 4-8 weeks at each dose level
          </li>
          <li>
            Most GI side effects are dose-dependent and can be managed with slower titration,
            smaller meals, and specific dietary adjustments
          </li>
          <li>
            &quot;Ozempic face&quot; is not a drug side effect per se. It is what rapid weight loss
            looks like on anyone&apos;s face, especially over age 40.
          </li>
          <li>
            The thyroid cancer signal seen in rodent studies has not been confirmed in human data
            after millions of patient-years of exposure. But certain people with family history
            should still avoid these drugs.
          </li>
          <li>
            Muscle loss is perhaps the most underappreciated concern, affecting 25-40% of total
            weight lost, and it is largely preventable with protein and resistance training
          </li>
        </ul>
      </div>

      <p>
        Every medication has side effects. What matters is whether you know what to expect, how
        likely each one is, and what to do about it. I have seen too many people panic over things
        that are normal and predictable, and not enough people take action on the side effects that
        actually need attention.
      </p>

      <p>
        This is a side-effect-by-side-effect breakdown based on the clinical trial data, the FDA
        prescribing information, and what clinicians report seeing in practice. No sugarcoating, no
        fear-mongering.
      </p>

      <AdBlock format="horizontal" />

      <h2 className="text-2xl font-bold mt-10 mb-4">Nausea: The Most Common Side Effect</h2>

      <p>
        Nausea is the side effect everyone asks about first, and for good reason. It is the most
        commonly reported adverse event in every major GLP-1 trial.
      </p>

      <p>
        In the STEP 1 trial (semaglutide 2.4 mg), 44.2% of participants in the drug group reported
        nausea, compared to 17.4% on placebo. In SURMOUNT-1 (tirzepatide), the rates were 24-33%
        depending on the dose, somewhat lower than semaglutide.
      </p>

      <p>
        Here is what the numbers do not tell you: intensity and duration. Most nausea is mild to
        moderate. In STEP 1, only 1.6% of participants discontinued the drug due to nausea. That
        means for the vast majority of people who experience it, the nausea is tolerable.
      </p>

      <p>
        Nausea follows a predictable pattern. It typically appears within the first few days of
        starting the medication or increasing the dose. It peaks during week 1-2 at each new dose
        level. It gradually fades over 4-8 weeks as your body adjusts. Then it comes back when you
        titrate up to the next dose. And the cycle repeats.
      </p>

      <p>
        By the time you reach your maintenance dose and have been there for a month or two, most
        people find the nausea has resolved almost completely. The dose escalation period is the
        worst of it.
      </p>

      <h3 className="text-xl font-semibold mt-8 mb-3">What Actually Helps</h3>

      <ul className="space-y-2 mb-6">
        <li>
          <strong>Eat smaller meals.</strong> This is the most effective single intervention. Your
          stomach is emptying slower now. If you put a full-size meal into a stomach that is
          operating at half speed, you will feel sick. Eat half of what you used to eat, twice as
          often.
        </li>
        <li>
          <strong>Avoid high-fat foods.</strong> Fat delays gastric emptying further. Combining a
          GLP-1 drug that slows your stomach with a greasy meal is a recipe for misery.
        </li>
        <li>
          <strong>Do not lie down after eating.</strong> Stay upright for at least 30 minutes. This
          is simple gravity helping food move in the right direction.
        </li>
        <li>
          <strong>Ginger, real ginger.</strong> Ginger tea, ginger chews, or ginger supplements (250
          mg four times daily) have evidence supporting their anti-nausea effect, originally studied
          for pregnancy-related nausea but applicable here too.
        </li>
        <li>
          <strong>Stay hydrated.</strong> Dehydration worsens nausea. Sip water throughout the day
          rather than drinking large amounts at once.
        </li>
        <li>
          <strong>Talk to your doctor about slower titration.</strong> There is no rule that says
          you must follow the standard dose escalation timeline. Many prescribers will extend each
          dose level from 4 weeks to 6 or 8 weeks if side effects are significant.
        </li>
      </ul>

      <h2 className="text-2xl font-bold mt-10 mb-4">The Full GI Side Effect Spectrum</h2>

      <p>
        Nausea gets the attention, but GLP-1 medications affect the entire gastrointestinal tract.
        Here is the full picture from the clinical trial data.
      </p>

      <div className="overflow-x-auto my-8">
        <table className="min-w-full text-sm border border-gray-200 dark:border-gray-700">
          <thead>
            <tr className="bg-gray-50 dark:bg-gray-800">
              <th className="px-4 py-3 text-left font-semibold">Side Effect</th>
              <th className="px-4 py-3 text-left font-semibold">Semaglutide 2.4 mg (STEP 1)</th>
              <th className="px-4 py-3 text-left font-semibold">Tirzepatide 15 mg (SURMOUNT-1)</th>
              <th className="px-4 py-3 text-left font-semibold">Placebo</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            <tr>
              <td className="px-4 py-3">Nausea</td>
              <td className="px-4 py-3">44.2%</td>
              <td className="px-4 py-3">33.3%</td>
              <td className="px-4 py-3">17.4%</td>
            </tr>
            <tr>
              <td className="px-4 py-3">Diarrhea</td>
              <td className="px-4 py-3">30.0%</td>
              <td className="px-4 py-3">25.4%</td>
              <td className="px-4 py-3">15.7%</td>
            </tr>
            <tr>
              <td className="px-4 py-3">Vomiting</td>
              <td className="px-4 py-3">24.8%</td>
              <td className="px-4 py-3">12.2%</td>
              <td className="px-4 py-3">6.2%</td>
            </tr>
            <tr>
              <td className="px-4 py-3">Constipation</td>
              <td className="px-4 py-3">24.2%</td>
              <td className="px-4 py-3">20.9%</td>
              <td className="px-4 py-3">10.5%</td>
            </tr>
            <tr>
              <td className="px-4 py-3">Abdominal pain</td>
              <td className="px-4 py-3">15.2%</td>
              <td className="px-4 py-3">14.0%</td>
              <td className="px-4 py-3">10.2%</td>
            </tr>
            <tr>
              <td className="px-4 py-3">Dyspepsia (indigestion)</td>
              <td className="px-4 py-3">8.6%</td>
              <td className="px-4 py-3">9.2%</td>
              <td className="px-4 py-3">3.8%</td>
            </tr>
            <tr>
              <td className="px-4 py-3">GERD/acid reflux</td>
              <td className="px-4 py-3">5.0%</td>
              <td className="px-4 py-3">5.6%</td>
              <td className="px-4 py-3">1.8%</td>
            </tr>
            <tr>
              <td className="px-4 py-3">Flatulence</td>
              <td className="px-4 py-3">4.2%</td>
              <td className="px-4 py-3">4.1%</td>
              <td className="px-4 py-3">2.8%</td>
            </tr>
          </tbody>
        </table>
      </div>

      <p>
        A few things stand out. First, notice the placebo rates. Nausea was reported by 17% of
        people taking a placebo. That is partly because GI complaints are incredibly common in
        general, and partly the nocebo effect (expecting side effects makes you more likely to
        experience them).
      </p>

      <p>
        Second, diarrhea and constipation are nearly equally common, which seems contradictory until
        you understand that GLP-1 medications alter gut motility in complex ways. Some people
        experience one, some the other, and some alternate between the two, especially during dose
        changes.
      </p>

      <p>
        Third, vomiting rates are notably lower with tirzepatide (12.2%) than semaglutide (24.8%).
        If nausea and vomiting are your primary concern, this is worth discussing with your
        prescriber.
      </p>

      <h3 className="text-xl font-semibold mt-8 mb-3">Managing Constipation</h3>

      <p>
        Constipation on GLP-1 medications is a direct result of slowed gastric emptying extending
        into slower transit throughout the entire GI tract. If food moves through your stomach more
        slowly, everything downstream slows too.
      </p>

      <p>
        Practical fixes: increase fiber intake gradually (too much too fast will make things worse),
        drink at least 2 liters of water daily, and walk for 15-20 minutes after meals. If those do
        not work, an over-the-counter osmotic laxative like polyethylene glycol (Miralax) is safe
        for daily use. Stool softeners like docusate (Colace) are another option.
      </p>

      <p>
        Do not ignore constipation for weeks. Severe cases can progress to bowel obstruction, which
        is a medical emergency. If you have not had a bowel movement in 3-4 days, call your doctor.
      </p>

      <AdBlock format="horizontal" />

      <h2 className="text-2xl font-bold mt-10 mb-4">&quot;Ozempic Face&quot; and Muscle Loss</h2>

      <p>
        The term "Ozempic face" went viral in 2023 and has caused more anxiety than it probably
        should have. What people call "Ozempic face" is not a drug-specific side effect. It is what
        happens when anyone loses 15-25% of their body weight relatively quickly: the fat pads in
        the face deflate, and the skin (especially in people over 40 whose skin has less elasticity)
        sags.
      </p>

      <p>
        The same thing happens after bariatric surgery. It happens after aggressive dieting. It
        happens anytime you lose a lot of weight fast. The fact that it has a catchy name attached
        to a specific drug makes it seem unique to that drug, but it is not.
      </p>

      <p>
        The real concern is not the cosmetic facial change. It is what that facial change
        represents: overall lean mass loss. When you see dramatic facial wasting, the person has
        lost significant muscle mass throughout their body, not just facial fat.
      </p>

      <p>
        Data from STEP trials and body composition substudy analyses consistently show that
        approximately 25-40% of weight lost on semaglutide is lean body mass. In a person who loses
        40 pounds, that means 10-16 pounds of muscle gone along with the fat.
      </p>

      <p>
        This is not inevitable. A 2024 study in JAMA Network Open found that participants who
        combined semaglutide with a structured resistance training program and high-protein diet
        (1.6 g/kg/day) lost significantly less lean mass than those on medication alone. The
        resistance training group preserved roughly 80% of their lean mass compared to about 65% in
        the medication-only group.
      </p>

      <p>
        The prescription is clear: lift weights and eat protein. It will not fully prevent lean mass
        loss, but it dramatically reduces it. If you want to figure out exactly how much protein you
        should be targeting, our{' '}
        <Link href="/glp1-calculator" className="text-blue-600 dark:text-blue-400 hover:underline">
          GLP-1 nutrition calculator
        </Link>{' '}
        personalizes recommendations based on your weight, activity level, and specific medication.
      </p>

      <h2 className="text-2xl font-bold mt-10 mb-4">Gallbladder Issues</h2>

      <p>
        This one is real and underappreciated. Rapid weight loss increases the risk of gallstones,
        and GLP-1 medications may add to that risk through their effects on gallbladder motility.
      </p>

      <p>
        In the STEP 1 trial, gallbladder-related disorders (gallstones, cholecystitis, biliary
        colic) occurred in 2.6% of the semaglutide group versus 1.2% in the placebo group. In
        SURMOUNT-1, rates were similar, around 0.6-1.7% depending on the dose.
      </p>

      <p>
        Those percentages sound small, but in a population of millions of people taking these drugs,
        that translates to tens of thousands of gallbladder events. Some require surgery
        (cholecystectomy).
      </p>

      <p>
        The mechanism is straightforward. When you lose weight rapidly, your liver secretes more
        cholesterol into bile. Simultaneously, the gallbladder is not emptying as efficiently
        because of the GLP-1 effect on smooth muscle motility. More cholesterol plus slower emptying
        equals higher gallstone risk.
      </p>

      <p>
        Warning signs include: sudden sharp pain in the right upper abdomen (especially after eating
        fatty foods), pain that radiates to the right shoulder or back, nausea and vomiting that
        feel different from your baseline GLP-1 nausea, and fever. If you experience these, contact
        your doctor promptly.
      </p>

      <p>
        Risk factors that increase your chances: being female (gallstones are 2-3 times more common
        in women), rapid weight loss (more than 1.5 kg per week), history of gallstones, and being
        over age 40.
      </p>

      <h2 className="text-2xl font-bold mt-10 mb-4">Pancreatitis: Separating Fact from Fear</h2>

      <p>
        The pancreatitis concern has been debated since the early days of GLP-1 medications. It is a
        legitimate topic. But the data is far more nuanced than the fear-mongering suggests.
      </p>

      <p>
        First, the background. GLP-1 receptors exist on pancreatic cells. Early animal studies
        showed potential changes in pancreatic tissue. Some case reports of pancreatitis in patients
        taking liraglutide (an older GLP-1 drug) raised alarm.
      </p>

      <p>
        Here is what the large-scale human data shows. In the STEP trials, acute pancreatitis
        occurred in about 0.2% of participants on semaglutide versus 0.1% on placebo. In the LEADER
        cardiovascular outcomes trial (liraglutide, over 9,000 patients followed for nearly 4
        years), there was no statistically significant increase in pancreatitis risk.
      </p>

      <p>
        A 2023 meta-analysis published in Diabetes Care that pooled data from multiple GLP-1 trials
        covering more than 150,000 patient-years of exposure found no statistically significant
        increase in pancreatitis risk compared to placebo.
      </p>

      <p>
        My read: there is likely a very small increase in risk that is difficult to detect even in
        large trials because pancreatitis is uncommon at baseline. The risk does not approach the
        level that should prevent people from taking these medications, unless they have a history
        of pancreatitis, which is listed as a contraindication.
      </p>

      <p>
        If you experience severe abdominal pain that radiates to your back, does not improve with
        position changes, and is accompanied by nausea and vomiting, stop the medication and go to
        the emergency room. Acute pancreatitis requires immediate medical evaluation.
      </p>

      <h2 className="text-2xl font-bold mt-10 mb-4">The Thyroid Cancer Question</h2>

      <p>
        Every GLP-1 medication carries a black box warning about thyroid C-cell tumors. This is the
        scariest-sounding thing in the prescribing information, and it deserves a careful look.
      </p>

      <p>
        The background: in rodent studies, semaglutide and tirzepatide caused dose-dependent
        increases in thyroid C-cell tumors, including medullary thyroid carcinoma (MTC). The doses
        used were significantly higher relative to body weight than human doses, and rodents were
        exposed for their entire lifetimes (2 years, which is roughly equivalent to a human
        lifetime).
      </p>

      <p>
        Rodents have far more GLP-1 receptors on their thyroid C-cells than humans do. This is a
        well-documented species difference. It means the rat findings may not translate to humans at
        all.
      </p>

      <p>
        What does the human data show? A 2024 analysis published in The BMJ looked at semaglutide
        use in over 300,000 patients with a median follow-up of about 3 years and found no signal
        for increased thyroid cancer risk. A separate Scandinavian study using national registry
        data from Denmark, Norway, and Sweden that tracked GLP-1 use over multiple years also found
        no increased risk of MTC.
      </p>

      <p>
        But there is a critical caveat. MTC is extremely rare (about 500-1,000 new cases per year in
        the US). Even a doubling of risk might take decades to become detectable in epidemiological
        studies. We simply do not have 20-year data on semaglutide use in humans.
      </p>

      <p>
        This is why the contraindication for personal or family history of MTC or MEN2 exists. If
        you are already at elevated risk for MTC, the theoretical concern warrants avoiding these
        drugs. For everyone else, the current evidence is reassuring but not yet definitive. This is
        one of those situations where the honest answer is that we are still watching.
      </p>

      <AdBlock format="horizontal" />

      <h2 className="text-2xl font-bold mt-10 mb-4">Other Side Effects Worth Knowing About</h2>

      <h3 className="text-xl font-semibold mt-8 mb-3">Injection Site Reactions</h3>

      <p>
        Redness, swelling, or itching at the injection site occurred in about 3-5% of trial
        participants. These are almost always mild and self-limiting. Rotating injection sites
        (abdomen, thigh, upper arm) minimizes recurrence.
      </p>

      <h3 className="text-xl font-semibold mt-8 mb-3">Headache</h3>

      <p>
        Reported in about 14% of semaglutide users versus 10% on placebo. Often related to
        dehydration or reduced caloric intake. If you went from eating 2,500 calories to 1,400
        calories in a week because your appetite vanished, a headache is not surprising. Ensure
        adequate hydration and do not let your calorie intake drop below 1,200 (women) or 1,500
        (men) without medical supervision.
      </p>

      <h3 className="text-xl font-semibold mt-8 mb-3">Fatigue</h3>

      <p>
        Fatigue is common in the first few weeks and again during dose increases. It is partly
        metabolic (your body is adjusting to lower caloric intake) and partly because nausea is
        draining. It typically resolves as side effects stabilize.
      </p>

      <h3 className="text-xl font-semibold mt-8 mb-3">Hair Loss</h3>

      <p>
        This has been widely reported anecdotally, though clinical trial data is limited. Rapid
        weight loss of any kind can trigger telogen effluvium, a temporary shedding caused by the
        physiological stress of significant calorie restriction. It typically begins 2-4 months
        after starting the medication and resolves within 6-12 months as the body adjusts to its new
        weight. Ensuring adequate protein, iron, zinc, and biotin intake can help.
      </p>

      <h3 className="text-xl font-semibold mt-8 mb-3">Mental Health Effects</h3>

      <p>
        The European Medicines Agency reviewed reports of suicidal ideation and self-harm in GLP-1
        users in 2023. Their conclusion: no causal link was established. The FDA conducted a similar
        review and reached the same conclusion in 2024. However, ongoing monitoring continues. If
        you notice new or worsening depression, anxiety, or suicidal thoughts while taking a GLP-1
        medication, report it to your doctor immediately.
      </p>

      <h3 className="text-xl font-semibold mt-8 mb-3">Gastroparesis Concerns</h3>

      <p>
        GLP-1 medications slow gastric emptying by design. In rare cases, this can become
        pathologically slow (gastroparesis). Reports of severe gastroparesis requiring
        hospitalization have emerged in post-marketing surveillance. The risk appears to be higher
        in people who already have some degree of impaired gastric motility (common in long-standing
        diabetes) and in those taking the highest doses.
      </p>

      <p>
        There have also been concerns about food retained in the stomach during general anesthesia
        in patients taking GLP-1s. The American Society of Anesthesiologists released guidance in
        2023 recommending that patients hold their GLP-1 medication for at least one week before any
        elective surgery requiring general anesthesia. Tell your anesthesiologist that you are
        taking a GLP-1 drug before any procedure.
      </p>

      <h2 className="text-2xl font-bold mt-10 mb-4">Quick Reference: Side Effect Management</h2>

      <div className="overflow-x-auto my-8">
        <table className="min-w-full text-sm border border-gray-200 dark:border-gray-700">
          <thead>
            <tr className="bg-gray-50 dark:bg-gray-800">
              <th className="px-4 py-3 text-left font-semibold">Side Effect</th>
              <th className="px-4 py-3 text-left font-semibold">When It Peaks</th>
              <th className="px-4 py-3 text-left font-semibold">What Helps</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            <tr>
              <td className="px-4 py-3">Nausea</td>
              <td className="px-4 py-3">Week 1-2 of each new dose</td>
              <td className="px-4 py-3">
                Small meals, avoid fatty foods, ginger, stay upright after eating
              </td>
            </tr>
            <tr>
              <td className="px-4 py-3">Vomiting</td>
              <td className="px-4 py-3">Week 1-2 of each new dose</td>
              <td className="px-4 py-3">
                Smaller portions, bland foods, slow titration, ondansetron if prescribed
              </td>
            </tr>
            <tr>
              <td className="px-4 py-3">Constipation</td>
              <td className="px-4 py-3">Ongoing, especially at higher doses</td>
              <td className="px-4 py-3">
                Fiber, 2+ liters water daily, walking, Miralax if needed
              </td>
            </tr>
            <tr>
              <td className="px-4 py-3">Diarrhea</td>
              <td className="px-4 py-3">First 4-6 weeks</td>
              <td className="px-4 py-3">
                Avoid sugar alcohols and high-fat foods, stay hydrated, usually self-resolving
              </td>
            </tr>
            <tr>
              <td className="px-4 py-3">Headache</td>
              <td className="px-4 py-3">First 2-4 weeks</td>
              <td className="px-4 py-3">Hydration, adequate calorie intake, OTC pain relief</td>
            </tr>
            <tr>
              <td className="px-4 py-3">Fatigue</td>
              <td className="px-4 py-3">First 2-4 weeks and during dose increases</td>
              <td className="px-4 py-3">
                Ensure adequate calories and protein, prioritize sleep, usually temporary
              </td>
            </tr>
            <tr>
              <td className="px-4 py-3">Hair loss</td>
              <td className="px-4 py-3">Months 2-4 of treatment</td>
              <td className="px-4 py-3">
                Adequate protein, iron, zinc, biotin; temporary and self-resolving
              </td>
            </tr>
            <tr>
              <td className="px-4 py-3">Injection site reactions</td>
              <td className="px-4 py-3">First few injections</td>
              <td className="px-4 py-3">Rotate sites, inject at room temperature</td>
            </tr>
            <tr>
              <td className="px-4 py-3">GERD/reflux</td>
              <td className="px-4 py-3">Ongoing</td>
              <td className="px-4 py-3">
                Small meals, avoid eating before bed, elevate head of bed, antacids if needed
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 className="text-2xl font-bold mt-10 mb-4">When to Call Your Doctor</h2>

      <p>
        Most GLP-1 side effects are manageable at home. But some situations require prompt medical
        attention. Do not wait on these.
      </p>

      <div className="neumorph-card rounded-xl p-6 my-8 bg-red-50 dark:bg-red-900/20">
        <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
          Red Flags: Seek Medical Attention
        </h3>
        <ul className="space-y-2 text-gray-700 dark:text-gray-300">
          <li>
            <strong>Severe abdominal pain that does not resolve</strong> (especially pain radiating
            to the back). Could indicate pancreatitis.
          </li>
          <li>
            <strong>Persistent vomiting for more than 24 hours</strong> or inability to keep fluids
            down. Dehydration risk is real.
          </li>
          <li>
            <strong>Signs of allergic reaction:</strong> difficulty breathing, facial swelling,
            rapid heartbeat, severe rash.
          </li>
          <li>
            <strong>Sharp right upper abdominal pain after eating,</strong> especially with fever.
            Could indicate gallbladder problems.
          </li>
          <li>
            <strong>Vision changes.</strong> Rarely, rapid blood sugar improvements in diabetic
            patients can worsen diabetic retinopathy temporarily.
          </li>
          <li>
            <strong>Signs of severe dehydration:</strong> dark urine, dizziness when standing, rapid
            heartbeat, confusion.
          </li>
          <li>
            <strong>New or worsening depression, anxiety, or suicidal thoughts.</strong>
          </li>
          <li>
            <strong>A lump or swelling in your neck,</strong> difficulty swallowing, or persistent
            hoarseness (thyroid concern).
          </li>
        </ul>
      </div>

      <h2 className="text-2xl font-bold mt-10 mb-4">The Side Effects Nobody Warns You About</h2>

      <p>
        There are a few things that do not show up in clinical trial adverse event tables but matter
        in real life.
      </p>

      <p>
        <strong>Your relationship with food will change.</strong> For many people, eating was a
        source of pleasure, comfort, or social connection. When the medication removes the drive to
        eat, some people experience a form of grief. Food stops being exciting. Meals become
        obligatory. This is not depression in the clinical sense, but it is an adjustment that
        catches people off guard.
      </p>

      <p>
        <strong>Social eating becomes awkward.</strong> When your friends order full entrees and you
        can barely finish an appetizer, it changes the dynamic. When you cannot have that second
        drink because your stomach cannot handle it, people notice. Some people find this isolating.
      </p>

      <p>
        <strong>Alcohol tolerance drops significantly.</strong> Multiple patient reports and
        emerging research suggest that GLP-1 medications reduce alcohol cravings and tolerance. A
        2023 study in The Journal of Clinical Endocrinology &amp; Metabolism confirmed that
        semaglutide reduces alcohol intake in people with alcohol use disorder. Even without a
        formal diagnosis, many patients report needing significantly less alcohol to feel its
        effects, and hangovers become worse. Be cautious with alcohol, especially in the early
        months.
      </p>

      <p>
        <strong>The "last meal" phenomenon.</strong> Some people find that their ability to enjoy
        certain foods disappears entirely. Foods they used to love become nauseating. This is
        usually temporary, but in some cases, specific food aversions persist for the duration of
        treatment.
      </p>

      <h2 className="text-2xl font-bold mt-10 mb-4">Putting It All in Context</h2>

      <p>
        Side effects are the cost of entry with any medication. The question is always whether the
        benefits justify the costs. For GLP-1 medications, the calculus looks like this: you are
        trading GI discomfort (mostly temporary) and the ongoing costs of the medication for 15-22%
        weight loss, significant cardiometabolic improvement, and a 20% reduction in cardiovascular
        events.
      </p>

      <p>
        For most people with clinically significant obesity, that trade-off is favorable. But it is
        a trade-off, and you should go in with realistic expectations about what the first few
        months will feel like.
      </p>

      <p>
        The single most important thing you can do to reduce side effects and improve outcomes is to
        titrate slowly, eat adequate protein, stay hydrated, and do resistance training. If you want
        personalized nutrition targets for your specific medication, use our{' '}
        <Link href="/glp1-calculator" className="text-blue-600 dark:text-blue-400 hover:underline">
          GLP-1 nutrition calculator
        </Link>{' '}
        to get started.
      </p>

      <p>
        And if side effects become unmanageable, tell your doctor. Slower titration, dose
        adjustment, or switching to a different medication in the class are all valid options.
        Suffering in silence is not required.
      </p>

      <div className="neumorph p-6 rounded-lg mt-8">
        <h2 className="text-xl font-semibold mb-4">Sources</h2>
        <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
          <li>
            Wilding JPH, et al. &quot;Once-Weekly Semaglutide in Adults with Overweight or
            Obesity.&quot; NEJM, 2021. (STEP 1 safety data)
          </li>
          <li>
            Jastreboff AM, et al. &quot;Tirzepatide Once Weekly for the Treatment of Obesity.&quot;
            NEJM, 2022. (SURMOUNT-1 safety data)
          </li>
          <li>Wegovy (semaglutide) Prescribing Information. Novo Nordisk, 2024 revision.</li>
          <li>Zepbound (tirzepatide) Prescribing Information. Eli Lilly, 2024 revision.</li>
          <li>
            Sodhi M, et al. &quot;Risk of Gastrointestinal Adverse Events Associated With
            Glucagon-Like Peptide-1 Receptor Agonists for Weight Loss.&quot; JAMA, 2023.
          </li>
          <li>
            European Medicines Agency. &quot;GLP-1 receptor agonists: reports of suicidal ideation
            and self-harm.&quot; EMA Review, 2023.
          </li>
          <li>
            FDA. &quot;Update on FDA&apos;s ongoing evaluation of reports of suicidal thoughts or
            actions in patients taking GLP-1 receptor agonists.&quot; 2024.
          </li>
          <li>
            American Society of Anesthesiologists. &quot;Consensus-Based Guidance on Preoperative
            Management of Patients on GLP-1 Receptor Agonists.&quot; 2023.
          </li>
          <li>
            Wharton S, et al. &quot;Semaglutide, Alcohol Consumption, and Alcohol Use
            Disorder.&quot; JCEM, 2023.
          </li>
        </ul>
      </div>
    </div>
  </div>
);

export default function GLP1SideEffectsWhatToExpectPage() {
  return GLP1SideEffectsWhatToExpectPageContent;
}
