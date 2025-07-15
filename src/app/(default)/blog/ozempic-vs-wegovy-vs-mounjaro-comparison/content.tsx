import React from 'react';
import Link from 'next/link';
import AdBlock from '@/components/AdBlock';

const OzempicVsWegovyVsMounjaroComparisonPageContent = (
  <div className="max-w-4xl mx-auto">
    <div className="mb-8">
      <span className="inline-block bg-accent/10 text-accent text-sm px-3 py-1 rounded-full">
        GLP-1 &amp; Weight Loss
      </span>
      <h1 className="text-3xl md:text-4xl font-bold mt-2 mb-4">
        Ozempic vs Wegovy vs Mounjaro: An Honest Comparison
      </h1>
      <p className="text-gray-500 italic">Published: January 19, 2026 &bull; 17 min read</p>
    </div>

    <div className="prose prose-lg max-w-none">
      <div className="neumorph p-6 rounded-lg mb-8">
        <h2 className="text-xl font-semibold mb-4">Key Takeaways</h2>
        <ul className="space-y-2">
          <li>
            Ozempic and Wegovy contain the exact same molecule (semaglutide) at different doses.
            Mounjaro contains a different molecule (tirzepatide) that hits two receptors instead of
            one.
          </li>
          <li>
            Head-to-head, tirzepatide (Mounjaro/Zepbound) produces roughly 5-7 percentage points
            more weight loss than semaglutide (Wegovy/Ozempic) at maximal doses
          </li>
          <li>
            Ozempic is FDA-approved only for type 2 diabetes. Using it for weight loss is off-label,
            which matters for insurance coverage.
          </li>
          <li>
            Monthly costs range from $935 to $1,350 at list price. Insurance coverage varies
            enormously by plan, indication, and employer.
          </li>
          <li>
            Compounded versions are cheaper but exist in a legal gray area that is shifting as FDA
            shortage designations change
          </li>
        </ul>
      </div>

      <p>
        The question I get most often about GLP-1 medications is some version of "which one is
        best?" It depends on your situation. But that does not mean all three options are
        interchangeable. The differences are real, measurable, and worth understanding.
      </p>

      <p>
        This comparison is based on clinical trial data, FDA labeling, and the current (as of early
        2026) pricing and coverage landscape. I will be specific about what the data shows and where
        the data has gaps.
      </p>

      <AdBlock format="horizontal" />

      <h2 className="text-2xl font-bold mt-10 mb-4">What Each Drug Actually Is</h2>

      <h3 className="text-xl font-semibold mt-8 mb-3">
        Ozempic and Wegovy: Same Drug, Different Labels
      </h3>

      <p>
        This is the most common point of confusion. Ozempic and Wegovy both contain semaglutide,
        manufactured by Novo Nordisk. They are the same molecule injected subcutaneously once per
        week.
      </p>

      <p>The differences are dosing and FDA-approved indication.</p>

      <p>
        Ozempic is approved for type 2 diabetes management. Its maximum dose is 2.0 mg per week (a
        1.0 mg dose is also available). Wegovy is approved for chronic weight management. Its target
        maintenance dose is 2.4 mg per week, which is 20% higher than Ozempic&apos;s maximum.
      </p>

      <p>
        In practice, many doctors prescribe Ozempic off-label for weight loss. Sometimes this is
        because it is easier to get covered by insurance (diabetes medications generally have better
        coverage than weight loss medications). Sometimes it is because Wegovy has been in and out
        of shortage since its launch.
      </p>

      <p>
        The practical consequence: someone taking Ozempic at 1.0 mg for weight loss is getting less
        than half the weight-loss dose studied in the STEP trials. They will still lose some weight,
        but likely less than someone on Wegovy 2.4 mg. If you are using Ozempic for weight loss and
        have plateaued, the dose difference may be part of the reason.
      </p>

      <h3 className="text-xl font-semibold mt-8 mb-3">
        Mounjaro and Zepbound: A Different Molecule Entirely
      </h3>

      <p>
        Mounjaro and Zepbound both contain tirzepatide, manufactured by Eli Lilly. Like the
        Ozempic/Wegovy split, these are the same molecule with different approved indications.
        Mounjaro is approved for type 2 diabetes. Zepbound is approved for chronic weight
        management.
      </p>

      <p>
        Tirzepatide is fundamentally different from semaglutide. Where semaglutide is a GLP-1
        receptor agonist only, tirzepatide is a dual GIP/GLP-1 receptor agonist. It activates both
        the GLP-1 pathway (appetite reduction, slowed gastric emptying, insulin secretion) and the
        GIP pathway (additional effects on appetite, fat metabolism, and insulin sensitivity).
      </p>

      <p>
        Whether that dual mechanism explains the better weight loss or whether tirzepatide just
        happens to be a more potent molecule is still debated. Either way, tirzepatide produces more
        weight loss in clinical trials.
      </p>

      <div className="overflow-x-auto my-8">
        <table className="min-w-full text-sm border border-gray-200 dark:border-gray-700">
          <thead>
            <tr className="bg-gray-50 dark:bg-gray-800">
              <th className="px-4 py-3 text-left font-semibold">Feature</th>
              <th className="px-4 py-3 text-left font-semibold">Ozempic</th>
              <th className="px-4 py-3 text-left font-semibold">Wegovy</th>
              <th className="px-4 py-3 text-left font-semibold">Mounjaro</th>
              <th className="px-4 py-3 text-left font-semibold">Zepbound</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            <tr>
              <td className="px-4 py-3 font-semibold">Active ingredient</td>
              <td className="px-4 py-3">Semaglutide</td>
              <td className="px-4 py-3">Semaglutide</td>
              <td className="px-4 py-3">Tirzepatide</td>
              <td className="px-4 py-3">Tirzepatide</td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-semibold">Manufacturer</td>
              <td className="px-4 py-3">Novo Nordisk</td>
              <td className="px-4 py-3">Novo Nordisk</td>
              <td className="px-4 py-3">Eli Lilly</td>
              <td className="px-4 py-3">Eli Lilly</td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-semibold">Mechanism</td>
              <td className="px-4 py-3">GLP-1 only</td>
              <td className="px-4 py-3">GLP-1 only</td>
              <td className="px-4 py-3">GLP-1 + GIP</td>
              <td className="px-4 py-3">GLP-1 + GIP</td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-semibold">FDA indication</td>
              <td className="px-4 py-3">Type 2 diabetes</td>
              <td className="px-4 py-3">Weight management</td>
              <td className="px-4 py-3">Type 2 diabetes</td>
              <td className="px-4 py-3">Weight management</td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-semibold">Max dose</td>
              <td className="px-4 py-3">2.0 mg/week</td>
              <td className="px-4 py-3">2.4 mg/week</td>
              <td className="px-4 py-3">15 mg/week</td>
              <td className="px-4 py-3">15 mg/week</td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-semibold">Administration</td>
              <td className="px-4 py-3">Weekly injection</td>
              <td className="px-4 py-3">Weekly injection</td>
              <td className="px-4 py-3">Weekly injection</td>
              <td className="px-4 py-3">Weekly injection</td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-semibold">Pen type</td>
              <td className="px-4 py-3">Multi-dose pen</td>
              <td className="px-4 py-3">Single-dose pen</td>
              <td className="px-4 py-3">Single-dose pen</td>
              <td className="px-4 py-3">Single-dose pen</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 className="text-2xl font-bold mt-10 mb-4">Head-to-Head Efficacy: What the Data Shows</h2>

      <p>
        We do not have a direct randomized trial comparing Wegovy 2.4 mg against Zepbound 15 mg in a
        weight loss population. That is the comparison everyone wants, and it does not exist yet.
      </p>

      <p>
        What we do have is the SURPASS-2 trial (published in the NEJM in 2021), which compared
        tirzepatide against semaglutide 1.0 mg in patients with type 2 diabetes. This is not a
        perfect comparison because the semaglutide dose was 1.0 mg (the diabetes dose, not the 2.4
        mg weight loss dose), but it is the closest head-to-head data available.
      </p>

      <p>
        At 40 weeks, tirzepatide 15 mg produced 12.4 kg of weight loss versus 6.2 kg with
        semaglutide 1.0 mg. Tirzepatide at 10 mg produced 11.2 kg. Even tirzepatide at its lowest
        dose (5 mg) beat semaglutide 1.0 mg: 7.8 kg versus 6.2 kg.
      </p>

      <p>
        When we compare across trials (understanding that cross-trial comparisons have significant
        methodological limitations), the picture looks like this:
      </p>

      <div className="overflow-x-auto my-8">
        <table className="min-w-full text-sm border border-gray-200 dark:border-gray-700">
          <thead>
            <tr className="bg-gray-50 dark:bg-gray-800">
              <th className="px-4 py-3 text-left font-semibold">Medication</th>
              <th className="px-4 py-3 text-left font-semibold">Trial</th>
              <th className="px-4 py-3 text-left font-semibold">Population</th>
              <th className="px-4 py-3 text-left font-semibold">Avg % Weight Loss</th>
              <th className="px-4 py-3 text-left font-semibold">% Losing &gt;20%</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            <tr>
              <td className="px-4 py-3">Semaglutide 2.4 mg (Wegovy)</td>
              <td className="px-4 py-3">STEP 1, 68 wks</td>
              <td className="px-4 py-3">Non-diabetic</td>
              <td className="px-4 py-3 font-semibold">14.9%</td>
              <td className="px-4 py-3">32%</td>
            </tr>
            <tr>
              <td className="px-4 py-3">Tirzepatide 5 mg (Mounjaro/Zepbound)</td>
              <td className="px-4 py-3">SURMOUNT-1, 72 wks</td>
              <td className="px-4 py-3">Non-diabetic</td>
              <td className="px-4 py-3 font-semibold">15.0%</td>
              <td className="px-4 py-3">27%</td>
            </tr>
            <tr>
              <td className="px-4 py-3">Tirzepatide 10 mg (Mounjaro/Zepbound)</td>
              <td className="px-4 py-3">SURMOUNT-1, 72 wks</td>
              <td className="px-4 py-3">Non-diabetic</td>
              <td className="px-4 py-3 font-semibold">19.5%</td>
              <td className="px-4 py-3">46%</td>
            </tr>
            <tr>
              <td className="px-4 py-3">Tirzepatide 15 mg (Mounjaro/Zepbound)</td>
              <td className="px-4 py-3">SURMOUNT-1, 72 wks</td>
              <td className="px-4 py-3">Non-diabetic</td>
              <td className="px-4 py-3 font-semibold">20.9%</td>
              <td className="px-4 py-3">57%</td>
            </tr>
          </tbody>
        </table>
      </div>

      <p>
        At the highest tirzepatide dose, more than half of participants lost over 20% of their body
        weight. With semaglutide, about a third did. For a 250-pound person, that is roughly 37
        pounds versus 52 pounds.
      </p>

      <p>
        A caveat: these are different trials with different patient populations, different sites,
        and slightly different timeframes. The gold-standard comparison (randomized, double-blind,
        same patients) is being done in the ongoing SURMOUNT-5 trial, which directly compares
        tirzepatide 15 mg against semaglutide 2.4 mg. Initial results announced in late 2024
        confirmed tirzepatide&apos;s superiority, with a roughly 5 percentage point greater weight
        loss.
      </p>

      <AdBlock format="horizontal" />

      <h2 className="text-2xl font-bold mt-10 mb-4">Dosing Schedules Compared</h2>

      <p>
        All three medications are weekly subcutaneous injections. But their titration schedules
        differ, and this matters because the ramp-up period determines how long it takes to reach a
        therapeutic dose and how much time you spend dealing with dose-escalation side effects.
      </p>

      <div className="overflow-x-auto my-8">
        <table className="min-w-full text-sm border border-gray-200 dark:border-gray-700">
          <thead>
            <tr className="bg-gray-50 dark:bg-gray-800">
              <th className="px-4 py-3 text-left font-semibold">Weeks</th>
              <th className="px-4 py-3 text-left font-semibold">Ozempic</th>
              <th className="px-4 py-3 text-left font-semibold">Wegovy</th>
              <th className="px-4 py-3 text-left font-semibold">Mounjaro/Zepbound</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            <tr>
              <td className="px-4 py-3">Weeks 1-4</td>
              <td className="px-4 py-3">0.25 mg</td>
              <td className="px-4 py-3">0.25 mg</td>
              <td className="px-4 py-3">2.5 mg</td>
            </tr>
            <tr>
              <td className="px-4 py-3">Weeks 5-8</td>
              <td className="px-4 py-3">0.5 mg</td>
              <td className="px-4 py-3">0.5 mg</td>
              <td className="px-4 py-3">5 mg</td>
            </tr>
            <tr>
              <td className="px-4 py-3">Weeks 9-12</td>
              <td className="px-4 py-3">0.5 mg or 1.0 mg</td>
              <td className="px-4 py-3">1.0 mg</td>
              <td className="px-4 py-3">7.5 mg</td>
            </tr>
            <tr>
              <td className="px-4 py-3">Weeks 13-16</td>
              <td className="px-4 py-3">1.0 mg (may stay)</td>
              <td className="px-4 py-3">1.7 mg</td>
              <td className="px-4 py-3">10 mg</td>
            </tr>
            <tr>
              <td className="px-4 py-3">Week 17+</td>
              <td className="px-4 py-3">1.0 mg or 2.0 mg</td>
              <td className="px-4 py-3">2.4 mg (maintenance)</td>
              <td className="px-4 py-3">12.5 mg or 15 mg</td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-semibold">Time to full dose</td>
              <td className="px-4 py-3 font-semibold">8-16 weeks</td>
              <td className="px-4 py-3 font-semibold">16 weeks</td>
              <td className="px-4 py-3 font-semibold">16-20 weeks</td>
            </tr>
          </tbody>
        </table>
      </div>

      <p>
        A few practical notes. The Wegovy and Mounjaro/Zepbound titration schedules are designed to
        be followed as written. Each step gives your body time to adapt before increasing the dose.
        Rushing this process leads to worse side effects without meaningfully faster weight loss.
      </p>

      <p>
        Ozempic&apos;s titration is somewhat more flexible because it is a diabetes drug where
        dosing is titrated based on blood sugar response, not weight loss. Many people on Ozempic
        for weight loss stay at 1.0 mg and never go to 2.0 mg, which means they are getting less
        than half the dose that was studied for weight loss in the STEP trials.
      </p>

      <p>
        Not everyone needs the maximum dose. Some people achieve excellent results at lower doses
        with fewer side effects. Discuss with your prescriber whether the maximum dose is right for
        you.
      </p>

      <h2 className="text-2xl font-bold mt-10 mb-4">Cost Comparison: The Real Numbers</h2>

      <p>
        Drug pricing in the US is a mess. List prices, negotiated insurance rates, manufacturer
        coupons, and compounding pharmacy prices all overlap. Here is my best attempt at what you
        will actually pay, as of early 2026.
      </p>

      <div className="overflow-x-auto my-8">
        <table className="min-w-full text-sm border border-gray-200 dark:border-gray-700">
          <thead>
            <tr className="bg-gray-50 dark:bg-gray-800">
              <th className="px-4 py-3 text-left font-semibold">Scenario</th>
              <th className="px-4 py-3 text-left font-semibold">Ozempic</th>
              <th className="px-4 py-3 text-left font-semibold">Wegovy</th>
              <th className="px-4 py-3 text-left font-semibold">Mounjaro</th>
              <th className="px-4 py-3 text-left font-semibold">Zepbound</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            <tr>
              <td className="px-4 py-3 font-semibold">List price (monthly)</td>
              <td className="px-4 py-3">~$935</td>
              <td className="px-4 py-3">~$1,350</td>
              <td className="px-4 py-3">~$1,023</td>
              <td className="px-4 py-3">~$1,060</td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-semibold">With commercial insurance (typical copay)</td>
              <td className="px-4 py-3">$25-$100</td>
              <td className="px-4 py-3">$25-$150</td>
              <td className="px-4 py-3">$25-$100</td>
              <td className="px-4 py-3">$25-$150</td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-semibold">Cash pay with GoodRx</td>
              <td className="px-4 py-3">$800-$900</td>
              <td className="px-4 py-3">$1,200-$1,350</td>
              <td className="px-4 py-3">$900-$1,000</td>
              <td className="px-4 py-3">$950-$1,060</td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-semibold">Eli Lilly direct (LillyDirect)</td>
              <td className="px-4 py-3">N/A</td>
              <td className="px-4 py-3">N/A</td>
              <td className="px-4 py-3">$549/month</td>
              <td className="px-4 py-3">$549/month</td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-semibold">Compounded version</td>
              <td className="px-4 py-3">$200-$500</td>
              <td className="px-4 py-3">$200-$500</td>
              <td className="px-4 py-3">$250-$600</td>
              <td className="px-4 py-3">$250-$600</td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-semibold">Annual cost (list price)</td>
              <td className="px-4 py-3">~$11,220</td>
              <td className="px-4 py-3">~$16,200</td>
              <td className="px-4 py-3">~$12,276</td>
              <td className="px-4 py-3">~$12,720</td>
            </tr>
          </tbody>
        </table>
      </div>

      <p>
        A few things that complicate this picture. Eli Lilly launched LillyDirect in early 2024,
        letting patients buy single-dose vials of tirzepatide at $549/month directly from the
        company, bypassing pharmacies and insurance entirely. That undercut the brand-name price by
        nearly half.
      </p>

      <p>
        Novo Nordisk has not offered a similar direct-to-consumer program for semaglutide, though
        manufacturer savings cards can reduce costs for commercially insured patients.
      </p>

      <p>
        Medicare does not cover weight loss medications. That shuts out a large population of older
        adults with obesity. The Treat and Reduce Obesity Act has been introduced to change this,
        but as of early 2026, it has not passed.
      </p>

      <h2 className="text-2xl font-bold mt-10 mb-4">Insurance Coverage: The Obstacle Course</h2>

      <p>
        Getting insurance to cover a GLP-1 medication for weight loss is often a multi-step process.
        Here is what it typically involves.
      </p>

      <p>
        Step 1: Prior authorization. Almost every insurer requires your doctor to submit
        documentation showing you meet certain criteria, typically a BMI threshold, evidence of
        weight-related conditions, and documentation of failed lifestyle interventions.
      </p>

      <p>
        Step 2: Formulary check. Your specific plan may cover Wegovy but not Zepbound, or vice
        versa. Some plans cover neither for weight loss but cover Ozempic or Mounjaro for diabetes.
      </p>

      <p>
        Step 3: Step therapy. Some insurers require you to try and fail a less expensive medication
        first (like phentermine or naltrexone-bupropion) before they will approve a GLP-1.
      </p>

      <p>
        Step 4: Ongoing documentation. Many insurers require periodic re-authorization, sometimes
        every 6 or 12 months, with evidence that the medication is working (usually defined as a 5%
        weight loss threshold).
      </p>

      <p>
        Many people who would benefit from these medications cannot access them because of cost and
        coverage barriers. If your insurance denies coverage, ask your doctor about the appeals
        process. First-level denials are often overturned.
      </p>

      <AdBlock format="horizontal" />

      <h2 className="text-2xl font-bold mt-10 mb-4">
        Compounded GLP-1 Medications: The Gray Market
      </h2>

      <p>
        Compounding pharmacies have become a big part of the GLP-1 market. This deserves a direct
        discussion.
      </p>

      <p>
        Under the Federal Food, Drug, and Cosmetic Act, compounding pharmacies can produce copies of
        FDA-approved drugs when those drugs are listed on the FDA Drug Shortage List. Semaglutide
        was on the shortage list from March 2022 through early 2024. During that period, compounding
        pharmacies legally produced and sold semaglutide at a fraction of the brand-name price.
      </p>

      <p>
        As Novo Nordisk ramped up production and the FDA resolved the shortage designation, the
        legal basis for compounding semaglutide started to disappear. Novo Nordisk filed lawsuits.
        The FDA issued guidance restricting compounding. Some pharmacies have continued to operate
        in legal gray areas, arguing various exemptions.
      </p>

      <p>
        Tirzepatide went through a similar cycle: shortage designation, legal compounding, then
        resolution of shortage and legal challenges.
      </p>

      <p>If you are considering a compounded version, here is what you should know.</p>

      <p>
        <strong>Quality is variable.</strong> Brand-name drugs undergo rigorous FDA manufacturing
        oversight. Compounding pharmacies are regulated by state boards of pharmacy, with varying
        levels of oversight. Testing by independent labs has found that some compounded semaglutide
        products contain less active ingredient than labeled, and some have contained impurities.
        Others have tested accurately. You are relying on the specific pharmacy&apos;s quality
        control.
      </p>

      <p>
        <strong>Legal status is uncertain.</strong> What is legal today may not be tomorrow. Several
        compounding pharmacies have received cease-and-desist letters. If you are on a compounded
        version and the pharmacy is forced to stop producing it, you need a backup plan.
      </p>

      <p>
        <strong>Dosing may differ.</strong> Compounded versions may come in vials that require you
        to draw up your own injection, rather than pre-filled pens. This introduces the possibility
        of dosing errors. Make sure you are comfortable with the injection process and have been
        properly trained.
      </p>

      <p>
        I am not going to tell you whether compounded GLP-1s are right for you. Brand-name pricing
        makes compounded versions the only option for many people. Just understand the trade-offs
        before you start.
      </p>

      <h2 className="text-2xl font-bold mt-10 mb-4">Side Effect Comparison</h2>

      <p>
        GI side effects are common with all GLP-1 medications, but the rates differ enough to be
        worth comparing.
      </p>

      <div className="overflow-x-auto my-8">
        <table className="min-w-full text-sm border border-gray-200 dark:border-gray-700">
          <thead>
            <tr className="bg-gray-50 dark:bg-gray-800">
              <th className="px-4 py-3 text-left font-semibold">Side Effect</th>
              <th className="px-4 py-3 text-left font-semibold">Semaglutide 2.4 mg (Wegovy)</th>
              <th className="px-4 py-3 text-left font-semibold">Tirzepatide 15 mg (Zepbound)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            <tr>
              <td className="px-4 py-3">Nausea</td>
              <td className="px-4 py-3">44%</td>
              <td className="px-4 py-3">33%</td>
            </tr>
            <tr>
              <td className="px-4 py-3">Vomiting</td>
              <td className="px-4 py-3">25%</td>
              <td className="px-4 py-3">12%</td>
            </tr>
            <tr>
              <td className="px-4 py-3">Diarrhea</td>
              <td className="px-4 py-3">30%</td>
              <td className="px-4 py-3">25%</td>
            </tr>
            <tr>
              <td className="px-4 py-3">Constipation</td>
              <td className="px-4 py-3">24%</td>
              <td className="px-4 py-3">21%</td>
            </tr>
            <tr>
              <td className="px-4 py-3">Discontinuation due to side effects</td>
              <td className="px-4 py-3">7.0%</td>
              <td className="px-4 py-3">6.2%</td>
            </tr>
          </tbody>
        </table>
      </div>

      <p>
        Tirzepatide has lower GI side effect rates across the board, despite producing more weight
        loss. The vomiting gap stands out: 25% versus 12%. If GI tolerance is a concern for you,
        tirzepatide may be the easier drug to stay on.
      </p>

      <p>
        Discontinuation rates are similar between the two drugs (roughly 6-7%). Semaglutide causes
        more GI symptoms, but most people can tolerate them well enough to stay on the drug.
      </p>

      <p>
        For a more detailed discussion of side effects and management strategies, see our{' '}
        <Link
          href="/blog/glp1-side-effects-what-to-expect"
          className="text-blue-600 dark:text-blue-400 hover:underline"
        >
          complete guide to GLP-1 side effects
        </Link>
        .
      </p>

      <h2 className="text-2xl font-bold mt-10 mb-4">The Decision Framework</h2>

      <p>
        No single medication is "best" for everyone. But the data points toward some reasonably
        clear recommendations depending on your situation.
      </p>

      <div className="neumorph-card rounded-xl p-6 my-8 bg-blue-50 dark:bg-blue-900/20">
        <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
          Which Medication Might Be Right for You
        </h3>

        <div className="space-y-4 text-gray-700 dark:text-gray-300">
          <div>
            <p className="font-semibold">
              If your primary goal is maximum weight loss and you can access it:
            </p>
            <p>
              Tirzepatide (Zepbound or Mounjaro) produces the most weight loss in clinical trials,
              with lower GI side effect rates. If insurance covers it or you can manage the cost, it
              is the strongest option based on current data.
            </p>
          </div>

          <div>
            <p className="font-semibold">If you have type 2 diabetes and want weight loss:</p>
            <p>
              Both Mounjaro and Ozempic are FDA-approved for diabetes and produce significant weight
              loss. Mounjaro produces more weight loss and better A1c reduction in head-to-head data
              (SURPASS-2). Insurance coverage for the diabetes indication is typically better than
              for weight loss.
            </p>
          </div>

          <div>
            <p className="font-semibold">If cardiovascular risk reduction is important:</p>
            <p>
              Semaglutide (Wegovy) has the strongest cardiovascular outcomes data, with the SELECT
              trial showing a 20% reduction in MACE events. Tirzepatide cardiovascular outcomes data
              (SURPASS-CVOT) is expected but not yet published.
            </p>
          </div>

          <div>
            <p className="font-semibold">If cost is the primary barrier:</p>
            <p>
              LillyDirect offers tirzepatide at $549/month (no insurance needed). Compounded
              semaglutide, where legally available, can run $200-500/month. Some patients get
              Ozempic covered through diabetes insurance pathways even when their primary goal is
              weight loss.
            </p>
          </div>

          <div>
            <p className="font-semibold">If you are very sensitive to GI side effects:</p>
            <p>
              Tirzepatide has consistently lower nausea and vomiting rates. Starting at the lowest
              dose (2.5 mg) and titrating slowly over 20+ weeks may also help. Slower titration of
              semaglutide is another option.
            </p>
          </div>
        </div>
      </div>

      <h2 className="text-2xl font-bold mt-10 mb-4">What About Oral Semaglutide?</h2>

      <p>
        Rybelsus is an oral formulation of semaglutide, currently approved only for type 2 diabetes
        at doses up to 14 mg daily. It is taken as a pill rather than an injection, which some
        people prefer.
      </p>

      <p>
        However, oral semaglutide at the 14 mg dose produces significantly less weight loss than the
        injectable 2.4 mg dose. Oral bioavailability of semaglutide is only about 1%, meaning most
        of the pill is destroyed in the GI tract before it gets absorbed. You need a much larger
        dose orally to achieve the same blood levels.
      </p>

      <p>
        Novo Nordisk is developing a higher-dose oral semaglutide (25 mg and 50 mg) specifically for
        weight loss. Phase 3 trials (the OASIS program) showed the 50 mg oral dose produced about
        15.1% weight loss at 68 weeks, which is comparable to injectable Wegovy 2.4 mg. An FDA
        application has been submitted, with potential approval in 2026.
      </p>

      <p>
        If you hate needles, this might eventually be your best option. But it is not available for
        weight loss yet.
      </p>

      <h2 className="text-2xl font-bold mt-10 mb-4">The Next Generation: What Is Coming</h2>

      <p>Several next-generation GLP-1 drugs are in late-stage development.</p>

      <p>
        <strong>Retatrutide</strong> (Eli Lilly) is a triple agonist hitting GLP-1, GIP, and
        glucagon receptors. Phase 2 data published in the NEJM in 2023 showed up to 24.2% weight
        loss at 48 weeks. Phase 3 trials are ongoing.
      </p>

      <p>
        <strong>Orforglipron</strong> (Eli Lilly) is a non-peptide oral GLP-1 agonist. Unlike
        Rybelsus (which is a peptide squeezed into a pill), orforglipron is a small molecule with
        much better oral bioavailability. Phase 2 data showed up to 14.7% weight loss at 36 weeks.
        Phase 3 trials are underway.
      </p>

      <p>
        <strong>CagriSema</strong> (Novo Nordisk) combines semaglutide with cagrilintide (an amylin
        analog). The REDEFINE program is testing this combination, with early data suggesting weight
        loss potentially exceeding individual components.
      </p>

      <p>
        Expect more effective drugs, more delivery options (oral, higher doses), and eventually
        lower costs as competition increases. But for now, semaglutide and tirzepatide are the
        options on the table.
      </p>

      <h2 className="text-2xl font-bold mt-10 mb-4">Making Your Decision</h2>

      <p>
        Talk to your doctor. They know your medical history, your insurance situation, and your
        goals. What I can tell you from the data: tirzepatide produces more weight loss with fewer
        GI side effects. Semaglutide has stronger cardiovascular outcomes data. Both work. Neither
        is cheap.
      </p>

      <p>
        Whichever medication you choose, the basics still apply. Eat enough protein (our{' '}
        <Link href="/glp1-calculator" className="text-blue-600 dark:text-blue-400 hover:underline">
          GLP-1 calculator
        </Link>{' '}
        can help you figure out exactly how much). Do resistance training. Stay hydrated. Titrate
        slowly. Track your progress beyond just the scale.
      </p>

      <p>The medication is a tool. What you do with it is up to you.</p>

      <div className="neumorph p-6 rounded-lg mt-8">
        <h2 className="text-xl font-semibold mb-4">Sources</h2>
        <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
          <li>
            Wilding JPH, et al. &quot;Once-Weekly Semaglutide in Adults with Overweight or
            Obesity.&quot; NEJM, 2021. (STEP 1)
          </li>
          <li>
            Jastreboff AM, et al. &quot;Tirzepatide Once Weekly for the Treatment of Obesity.&quot;
            NEJM, 2022. (SURMOUNT-1)
          </li>
          <li>
            Frias JP, et al. &quot;Tirzepatide versus Semaglutide Once Weekly in Patients with Type
            2 Diabetes.&quot; NEJM, 2021. (SURPASS-2)
          </li>
          <li>
            Lincoff AM, et al. &quot;Semaglutide and Cardiovascular Outcomes in Obesity without
            Diabetes.&quot; NEJM, 2023. (SELECT)
          </li>
          <li>
            Jastreboff AM, et al. &quot;Triple-hormone-receptor agonist retatrutide for
            obesity.&quot; NEJM, 2023.
          </li>
          <li>
            Wharton S, et al. &quot;Orforglipron, a non-peptide oral GLP-1 receptor agonist, in
            adults with obesity.&quot; Nature Medicine, 2023.
          </li>
          <li>
            Knop FK, et al. &quot;Oral Semaglutide 50 mg Taken Once Daily in Adults with Overweight
            or Obesity.&quot; Lancet, 2023. (OASIS 1)
          </li>
          <li>Ozempic (semaglutide) Prescribing Information. Novo Nordisk, 2024.</li>
          <li>Wegovy (semaglutide) Prescribing Information. Novo Nordisk, 2024.</li>
          <li>Mounjaro (tirzepatide) Prescribing Information. Eli Lilly, 2024.</li>
          <li>Zepbound (tirzepatide) Prescribing Information. Eli Lilly, 2024.</li>
        </ul>
      </div>
    </div>
  </div>
);

export default function OzempicVsWegovyVsMounjaroComparisonPage() {
  return OzempicVsWegovyVsMounjaroComparisonPageContent;
}
