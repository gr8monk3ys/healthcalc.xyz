import React from 'react';
import Link from 'next/link';
import AdBlock from '@/components/AdBlock';

const CompleteGuideGLP1WeightLossPageContent = (
  <div className="max-w-4xl mx-auto">
    <div className="mb-8">
      <span className="inline-block bg-accent/10 text-accent text-sm px-3 py-1 rounded-full">
        GLP-1 &amp; Weight Loss
      </span>
      <h1 className="text-3xl md:text-4xl font-bold mt-2 mb-4">
        GLP-1 Medications for Weight Loss: What the Research Actually Shows
      </h1>
      <p className="text-gray-500 italic">Published: January 5, 2026 &bull; 18 min read</p>
    </div>

    <div className="prose prose-lg max-w-none">
      <div className="neumorph p-6 rounded-lg mb-8">
        <h2 className="text-xl font-semibold mb-4">Key Takeaways</h2>
        <ul className="space-y-2">
          <li>
            GLP-1 receptor agonists work by mimicking a gut hormone that signals fullness to your
            brain, slowing gastric emptying, and reducing appetite at a neurological level
          </li>
          <li>
            Semaglutide (Wegovy) produces average weight loss of about 15% of body weight over 68
            weeks. Tirzepatide (Zepbound) averages 20-22% in the same timeframe.
          </li>
          <li>
            Weight regain is real: the STEP 1 extension trial showed participants regained roughly
            two-thirds of lost weight within one year of stopping the medication
          </li>
          <li>
            Monthly costs without insurance range from $900 to $1,350, though manufacturer discount
            programs and compounding pharmacies have changed the pricing picture
          </li>
          <li>
            These medications work best when combined with a high-protein diet and resistance
            training to preserve lean muscle mass
          </li>
        </ul>
      </div>

      <p>
        I want to be upfront about something. GLP-1 medications produce weight loss that no pill or
        injection could before. They are also wildly overhyped, poorly understood by most people
        taking them, and surrounded by misinformation from every direction. Pharma companies
        oversell the benefits. Social media undersells the risks. And most coverage glosses over the
        single biggest question: what happens when you stop?
      </p>

      <p>
        This guide is my attempt to lay out what the clinical data actually shows. Not the
        marketing. Not the TikTok testimonials. The research.
      </p>

      <AdBlock format="horizontal" />

      <h2 className="text-2xl font-bold mt-10 mb-4">What GLP-1 Receptor Agonists Actually Are</h2>

      <p>
        GLP-1 stands for glucagon-like peptide-1. It is a hormone your gut naturally produces after
        you eat. When food hits your small intestine, specialized L-cells release GLP-1 into your
        bloodstream. That GLP-1 does several things at once.
      </p>

      <p>
        First, it tells your pancreas to release insulin. This is why GLP-1 drugs were originally
        developed for type 2 diabetes. Second, it slows gastric emptying, meaning food sits in your
        stomach longer. You feel full faster and stay full longer. Third, and this is the part that
        matters most for weight loss, it acts on receptors in the hypothalamus and brainstem to
        reduce appetite.
      </p>

      <p>
        Natural GLP-1 breaks down in your body within about 2 minutes. The pharmaceutical versions
        are engineered to last much longer. Semaglutide has a half-life of roughly 7 days, which is
        why it works as a weekly injection. The drug attaches to albumin in your blood, which
        shields it from the enzymes that would normally chew it up.
      </p>

      <p>
        Tirzepatide goes a step further. It is a dual agonist, hitting both the GLP-1 receptor and
        the GIP (glucose-dependent insulinotropic polypeptide) receptor. GIP is another gut hormone
        involved in satiety. By targeting both pathways, tirzepatide produces stronger appetite
        suppression and greater weight loss in clinical trials.
      </p>

      <p>
        This is not a willpower drug. It is changing the hormonal signaling in your brain. People on
        these medications consistently report that "food noise," the constant background chatter
        about what to eat next, goes quiet. That is a neurological effect, not a psychological one.
      </p>

      <div className="neumorph-card rounded-xl p-6 my-8 bg-blue-50 dark:bg-blue-900/20">
        <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
          Estimate Your Targets
        </h3>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          If you are taking or considering a GLP-1 medication, our calculator can give you
          personalized calorie and protein targets based on your medication, body stats, and
          activity level.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/glp1-calculator"
            className="neumorph-button px-4 py-2 rounded-lg text-sm font-medium hover:scale-105 transition-transform"
          >
            GLP-1 Nutrition Calculator
          </Link>
        </div>
      </div>

      <h2 className="text-2xl font-bold mt-10 mb-4">
        The Clinical Trial Data: What the Numbers Say
      </h2>

      <h3 className="text-xl font-semibold mt-8 mb-3">Semaglutide: The STEP Trial Program</h3>

      <p>
        The STEP (Semaglutide Treatment Effect in People with Obesity) trials are the foundation of
        everything we know about semaglutide for weight loss. STEP 1 was the big one. Published in
        the New England Journal of Medicine in 2021, it enrolled 1,961 adults with a BMI of 30 or
        higher (or 27+ with at least one weight-related condition). None had diabetes.
      </p>

      <p>
        Participants received either weekly semaglutide 2.4 mg or placebo, plus lifestyle
        counseling. After 68 weeks, the semaglutide group lost an average of 14.9% of their body
        weight, compared to 2.4% in the placebo group. For a 220-pound person, that is about 33
        pounds versus 5 pounds.
      </p>

      <p>
        But averages hide a lot of variation. Roughly one-third of participants lost more than 20%
        of their body weight. About 10% lost less than 5%. Individual response varies enormously,
        and nobody fully understands why yet.
      </p>

      <p>
        STEP 2 looked at semaglutide in people with type 2 diabetes. Weight loss was lower (about
        9.6% at 68 weeks), which tells us something important: diabetes changes the metabolic
        equation. People with insulin resistance tend to lose less weight on these medications.
      </p>

      <p>
        STEP 3 combined semaglutide with intensive behavioral therapy (meal replacements, exercise
        coaching, 30 counseling sessions). Weight loss was 16%, slightly better than medication
        alone. The takeaway: the drug does most of the heavy lifting, but lifestyle intervention
        adds a real but modest benefit.
      </p>

      <p>
        STEP 5 extended the treatment to 104 weeks (2 years). Average weight loss was 15.2%, and it
        held for the duration of treatment. The medication keeps working as long as you keep taking
        it.
      </p>

      <h3 className="text-xl font-semibold mt-8 mb-3">Tirzepatide: The SURMOUNT Trial Program</h3>

      <p>
        The SURMOUNT trials tested tirzepatide (Eli Lilly's dual GLP-1/GIP agonist) for weight loss.
        SURMOUNT-1, published in the New England Journal of Medicine in 2022, enrolled 2,539 adults
        without diabetes.
      </p>

      <p>
        The results stood out. At the highest dose (15 mg), participants lost an average of 22.5% of
        their body weight over 72 weeks. At the middle dose (10 mg), it was 21.4%. At the lowest
        dose (5 mg), 15%.
      </p>

      <p>
        To put those numbers in context: bariatric surgery, which is the most effective weight loss
        intervention we have, typically produces 25-30% weight loss. Tirzepatide at the highest dose
        is getting within striking distance of surgical results without surgery.
      </p>

      <p>
        SURMOUNT-2 looked at tirzepatide in people with type 2 diabetes and found 12.8% to 14.7%
        weight loss, again confirming that diabetes blunts the weight loss effect somewhat.
      </p>

      <div className="overflow-x-auto my-8">
        <table className="min-w-full text-sm border border-gray-200 dark:border-gray-700">
          <thead>
            <tr className="bg-gray-50 dark:bg-gray-800">
              <th className="px-4 py-3 text-left font-semibold">Trial</th>
              <th className="px-4 py-3 text-left font-semibold">Drug</th>
              <th className="px-4 py-3 text-left font-semibold">Population</th>
              <th className="px-4 py-3 text-left font-semibold">Duration</th>
              <th className="px-4 py-3 text-left font-semibold">Avg Weight Loss</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            <tr>
              <td className="px-4 py-3">STEP 1</td>
              <td className="px-4 py-3">Semaglutide 2.4 mg</td>
              <td className="px-4 py-3">Non-diabetic, BMI 30+</td>
              <td className="px-4 py-3">68 weeks</td>
              <td className="px-4 py-3 font-semibold">14.9%</td>
            </tr>
            <tr>
              <td className="px-4 py-3">STEP 2</td>
              <td className="px-4 py-3">Semaglutide 2.4 mg</td>
              <td className="px-4 py-3">Type 2 diabetes, BMI 27+</td>
              <td className="px-4 py-3">68 weeks</td>
              <td className="px-4 py-3 font-semibold">9.6%</td>
            </tr>
            <tr>
              <td className="px-4 py-3">STEP 3</td>
              <td className="px-4 py-3">Semaglutide 2.4 mg + IBT</td>
              <td className="px-4 py-3">Non-diabetic, BMI 30+</td>
              <td className="px-4 py-3">68 weeks</td>
              <td className="px-4 py-3 font-semibold">16.0%</td>
            </tr>
            <tr>
              <td className="px-4 py-3">STEP 5</td>
              <td className="px-4 py-3">Semaglutide 2.4 mg</td>
              <td className="px-4 py-3">Non-diabetic, BMI 30+</td>
              <td className="px-4 py-3">104 weeks</td>
              <td className="px-4 py-3 font-semibold">15.2%</td>
            </tr>
            <tr>
              <td className="px-4 py-3">SURMOUNT-1</td>
              <td className="px-4 py-3">Tirzepatide 15 mg</td>
              <td className="px-4 py-3">Non-diabetic, BMI 30+</td>
              <td className="px-4 py-3">72 weeks</td>
              <td className="px-4 py-3 font-semibold">22.5%</td>
            </tr>
            <tr>
              <td className="px-4 py-3">SURMOUNT-1</td>
              <td className="px-4 py-3">Tirzepatide 10 mg</td>
              <td className="px-4 py-3">Non-diabetic, BMI 30+</td>
              <td className="px-4 py-3">72 weeks</td>
              <td className="px-4 py-3 font-semibold">21.4%</td>
            </tr>
            <tr>
              <td className="px-4 py-3">SURMOUNT-2</td>
              <td className="px-4 py-3">Tirzepatide 15 mg</td>
              <td className="px-4 py-3">Type 2 diabetes, BMI 27+</td>
              <td className="px-4 py-3">72 weeks</td>
              <td className="px-4 py-3 font-semibold">14.7%</td>
            </tr>
          </tbody>
        </table>
      </div>

      <AdBlock format="horizontal" />

      <h2 className="text-2xl font-bold mt-10 mb-4">Who Responds Best (and Who Doesn&apos;t)</h2>

      <p>
        Not everyone loses the same amount. Post-hoc analyses from the STEP trials have identified
        some patterns worth knowing about.
      </p>

      <p>
        People without type 2 diabetes tend to lose more weight. This is consistent across every
        major trial. Younger participants generally respond better than older ones, though the
        difference is modest. Women tend to lose a slightly higher percentage of body weight than
        men, possibly because women start with higher body fat percentages.
      </p>

      <p>
        Higher starting BMI does not necessarily predict greater percentage weight loss, which
        surprises a lot of people. Someone with a BMI of 32 might lose 18% of their body weight
        while someone with a BMI of 45 loses 12%. The absolute pounds lost may be higher at higher
        weights, but the percentage can go either way.
      </p>

      <p>
        One strong predictor: early response. A 2023 analysis published in Lancet Diabetes &amp;
        Endocrinology found that weight loss at 12 weeks was a reliable predictor of weight loss at
        68 weeks. If you have lost at least 5% of your body weight by week 12, you are likely to be
        a strong responder. If you have lost less than 2%, your long-term results are likely to be
        modest.
      </p>

      <p>
        This matters for practical decision-making. If after 3 months at a therapeutic dose you are
        seeing minimal results, it may be worth discussing alternatives with your doctor rather than
        assuming the drug just needs more time.
      </p>

      <h2 className="text-2xl font-bold mt-10 mb-4">
        The Weight Regain Problem Nobody Wants to Talk About
      </h2>

      <p>Here is where the conversation gets uncomfortable.</p>

      <p>
        The STEP 1 trial extension study, published in the journal Diabetes, Obesity and Metabolism
        in 2022, followed participants for one year after they stopped taking semaglutide. The
        results were sobering. Participants regained approximately two-thirds of the weight they had
        lost within 52 weeks of discontinuation. They also lost the cardiometabolic improvements
        they had achieved (improvements in blood pressure, blood sugar, and lipids partially
        reversed).
      </p>

      <p>
        SURMOUNT-4 showed a nearly identical pattern with tirzepatide. Participants who switched
        from tirzepatide to placebo regained about half their lost weight in 52 weeks, and the
        trajectory suggested further regain would continue.
      </p>

      <p>
        This is not a failure of the medication. It is biology. Obesity, for most people, is a
        chronic condition driven by hormonal and neurological factors that the medication corrects.
        Remove the medication and those factors come back. Blood pressure rises again when you stop
        taking blood pressure medication. Same idea.
      </p>

      <p>
        For most people, GLP-1 medications work best as a long-term treatment, not a short course.
        That changes the math on cost and access entirely.
      </p>

      <p>
        Some researchers are exploring whether lower maintenance doses might prevent full regain. A
        2024 Obesity study examined using half-doses after initial weight loss was achieved and
        found partial maintenance of weight loss, but the data is still preliminary.
      </p>

      <div className="neumorph-card rounded-xl p-6 my-8 bg-yellow-50 dark:bg-yellow-900/20">
        <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
          Plan for the Long Term
        </h3>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          If you are starting a GLP-1 medication, building sustainable nutrition habits from the
          beginning is critical. Our{' '}
          <Link
            href="/glp1-calculator"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            GLP-1 calculator
          </Link>{' '}
          helps you set protein and calorie targets that support muscle preservation, which is one
          of the most important factors in long-term weight maintenance.
        </p>
      </div>

      <h2 className="text-2xl font-bold mt-10 mb-4">The Muscle Loss Problem</h2>

      <p>
        When you lose weight rapidly, you do not just lose fat. You lose muscle too. This is true
        regardless of how you lose the weight, but GLP-1 medications create a specific challenge:
        they suppress appetite so aggressively that many people struggle to eat enough protein.
      </p>

      <p>
        Data from the STEP trials showed that about 25-40% of total weight lost was lean body mass
        rather than fat. That is a higher ratio than what you would expect from a well-managed diet
        with adequate protein and resistance training.
      </p>

      <p>
        Why does this matter? Muscle mass is your metabolic engine. It determines how many calories
        you burn at rest, it protects your joints, it keeps you functional as you age. Losing 30
        pounds of fat and 15 pounds of muscle leaves you lighter but metabolically worse off than
        losing 40 pounds of fat and 5 pounds of muscle.
      </p>

      <p>
        The fix is straightforward in theory: eat enough protein (at least 1.2 grams per kilogram of
        body weight, ideally 1.6-2.0 g/kg) and do resistance training at least twice a week. In
        practice, when nausea is making it hard to eat a full meal, hitting 120+ grams of protein
        daily feels like a second job.
      </p>

      <p>
        Prioritize protein at every meal. Eat your protein first before anything else on the plate.
        Consider protein supplements if whole food is not realistic. This is not optional advice if
        you want to come out of GLP-1 treatment in good shape.
      </p>

      <h2 className="text-2xl font-bold mt-10 mb-4">Who Should Consider GLP-1 Medications</h2>

      <p>
        The FDA-approved criteria for Wegovy (semaglutide for weight loss) are: BMI of 30 or
        greater, or BMI of 27 or greater with at least one weight-related comorbidity (type 2
        diabetes, high blood pressure, high cholesterol, or obstructive sleep apnea).
      </p>

      <p>
        In my view, the people who benefit most have already tried lifestyle changes and hit a
        biological wall. Someone who has been eating well and exercising consistently for years but
        cannot get their weight below a certain threshold. Someone whose hunger signals are
        dysregulated at a hormonal level, not someone who skips breakfast and eats fast food and has
        never seriously tried.
      </p>

      <p>
        I know that last sentence will be controversial. But these drugs have real side effects and
        cost a fortune. You may need to take them indefinitely. Starting them before exhausting
        simpler approaches does not make sense to me.
      </p>

      <h3 className="text-xl font-semibold mt-8 mb-3">Who Should Not Take GLP-1 Medications</h3>

      <ul className="space-y-2 mb-6">
        <li>
          <strong>Personal or family history of medullary thyroid carcinoma (MTC).</strong> This is
          an absolute contraindication. Semaglutide and tirzepatide caused thyroid C-cell tumors in
          rodent studies. More on what this means for humans below.
        </li>
        <li>
          <strong>
            Personal or family history of Multiple Endocrine Neoplasia syndrome type 2 (MEN2).
          </strong>{' '}
          Same thyroid concern.
        </li>
        <li>
          <strong>History of pancreatitis.</strong> GLP-1 medications can increase the risk of
          pancreatitis, so a prior history is a relative contraindication.
        </li>
        <li>
          <strong>Pregnancy or planning pregnancy.</strong> These medications should be stopped at
          least 2 months before trying to conceive, given semaglutide&apos;s long half-life.
        </li>
        <li>
          <strong>Severe gastroparesis.</strong> Since GLP-1s slow gastric emptying, they can worsen
          pre-existing motility disorders.
        </li>
        <li>
          <strong>Active eating disorders.</strong> The appetite suppression can mask and worsen
          disordered eating patterns. This one does not get discussed enough.
        </li>
      </ul>

      <AdBlock format="horizontal" />

      <h2 className="text-2xl font-bold mt-10 mb-4">The Cost Reality</h2>

      <p>Let&apos;s talk money, because this is where the rubber meets the road for most people.</p>

      <div className="overflow-x-auto my-8">
        <table className="min-w-full text-sm border border-gray-200 dark:border-gray-700">
          <thead>
            <tr className="bg-gray-50 dark:bg-gray-800">
              <th className="px-4 py-3 text-left font-semibold">Medication</th>
              <th className="px-4 py-3 text-left font-semibold">List Price/Month</th>
              <th className="px-4 py-3 text-left font-semibold">With Manufacturer Savings</th>
              <th className="px-4 py-3 text-left font-semibold">With Good Insurance</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            <tr>
              <td className="px-4 py-3">Wegovy (semaglutide)</td>
              <td className="px-4 py-3">~$1,350/month</td>
              <td className="px-4 py-3">Varies, often $0-$500</td>
              <td className="px-4 py-3">$25-$150 copay</td>
            </tr>
            <tr>
              <td className="px-4 py-3">Zepbound (tirzepatide)</td>
              <td className="px-4 py-3">~$1,060/month</td>
              <td className="px-4 py-3">$550 savings card available</td>
              <td className="px-4 py-3">$25-$150 copay</td>
            </tr>
            <tr>
              <td className="px-4 py-3">Ozempic (semaglutide, off-label)</td>
              <td className="px-4 py-3">~$935/month</td>
              <td className="px-4 py-3">Diabetes savings programs</td>
              <td className="px-4 py-3">$25-$100 copay</td>
            </tr>
            <tr>
              <td className="px-4 py-3">Compounded semaglutide</td>
              <td className="px-4 py-3">$200-$500/month</td>
              <td className="px-4 py-3">N/A</td>
              <td className="px-4 py-3">Not covered</td>
            </tr>
          </tbody>
        </table>
      </div>

      <p>
        Insurance coverage is wildly inconsistent. Medicare does not cover weight loss medications
        (though legislation to change this has been introduced). Many private insurers cover Wegovy
        or Zepbound but require prior authorization and evidence of failed lifestyle interventions.
        Some employers explicitly exclude obesity medications from their plans.
      </p>

      <p>
        The compounded semaglutide market exploded in 2023-2024 while brand-name drugs were in
        shortage. Compounding pharmacies were legally allowed to produce semaglutide because the FDA
        had listed it as "in shortage." As shortages resolve, the FDA has moved to restrict
        compounding, creating a gray area. Compounded versions are cheaper but come with questions
        about quality control, dosing accuracy, and legal status that change month to month.
      </p>

      <p>
        If you are paying out of pocket, you are looking at a minimum of $10,000-$16,000 per year
        for brand-name medications. That is a significant financial commitment, especially for a
        drug you may need to take indefinitely.
      </p>

      <h2 className="text-2xl font-bold mt-10 mb-4">
        Beyond Weight: Other Benefits the Trials Found
      </h2>

      <p>
        The weight loss gets all the headlines. But the metabolic improvements may matter more in
        the long run.
      </p>

      <p>
        The SELECT trial, published in the New England Journal of Medicine in 2023, studied
        semaglutide specifically for cardiovascular outcomes in overweight and obese adults without
        diabetes but with established cardiovascular disease. Participants taking semaglutide had a
        20% reduction in major adverse cardiovascular events (heart attack, stroke, or
        cardiovascular death) compared to placebo.
      </p>

      <p>
        That is a big number. For comparison, statins typically reduce cardiovascular events by
        about 25-30%. Semaglutide is in the same neighborhood.
      </p>

      <p>
        The trials also documented: lower hemoglobin A1c (even in non-diabetic patients), blood
        pressure reductions averaging 4-6 mmHg systolic, better triglycerides and HDL cholesterol,
        lower C-reactive protein (a marker of systemic inflammation), and reduced liver fat content
        (relevant for people with fatty liver disease).
      </p>

      <p>
        Research on kidney outcomes, sleep apnea, and heart failure is ongoing. Early results from
        the FLOW trial showed a 24% reduction in kidney disease progression with semaglutide. The
        trial was stopped early because the benefit was large enough that continuing the placebo arm
        was considered unethical.
      </p>

      <h2 className="text-2xl font-bold mt-10 mb-4">Making It Work: Practical Recommendations</h2>

      <p>
        Based on my reading of the literature and talking to clinicians who prescribe these drugs
        daily, here is what actually matters for getting the best results.
      </p>

      <p>
        <strong>Protein first, always.</strong> Aim for 1.2 to 2.0 grams per kilogram of body weight
        daily. At every meal, eat your protein source before anything else. When your appetite is
        suppressed and you can only eat 1,200 calories, those calories need to be mostly protein.
        Use our{' '}
        <Link href="/glp1-calculator" className="text-blue-600 dark:text-blue-400 hover:underline">
          GLP-1 nutrition calculator
        </Link>{' '}
        to get personalized targets based on your specific medication and goals.
      </p>

      <p>
        <strong>Resistance train consistently.</strong> Two to three sessions per week. Compound
        movements: squats, deadlifts, rows, presses. This is the single most important thing you can
        do to preserve muscle mass while losing weight on GLP-1s.
      </p>

      <p>
        <strong>Drink more water than you think you need.</strong> Nausea, constipation, and
        headaches all get worse when you are dehydrated. At least 2 liters daily. More if you are
        exercising.
      </p>

      <p>
        <strong>Titrate slowly.</strong> Every GLP-1 medication has a dose escalation schedule for a
        reason. Rushing to the highest dose increases side effects without meaningfully accelerating
        weight loss. If your provider wants to jump you straight to a maintenance dose, push back.
      </p>

      <p>
        <strong>Track more than the scale number.</strong> Body measurements, progress photos, how
        your clothes fit, energy levels, blood work. The scale alone tells you almost nothing about
        whether you are losing fat or muscle.
      </p>

      <h2 className="text-2xl font-bold mt-10 mb-4">The Bottom Line</h2>

      <p>
        GLP-1 medications work. They produce weight loss that was previously only achievable through
        surgery, and they improve cardiovascular outcomes and metabolic markers along the way.
      </p>

      <p>
        They are also expensive, require long-term use, and cause real side effects in many people.
        They do not replace good nutrition and exercise. The best outcomes come from treating them
        as one piece of a plan that includes adequate protein, resistance training, and realistic
        expectations about what happens when you stop.
      </p>

      <p>
        If you are considering a GLP-1 medication, talk to your doctor about your specific
        situation. Use our{' '}
        <Link href="/glp1-calculator" className="text-blue-600 dark:text-blue-400 hover:underline">
          GLP-1 calculator
        </Link>{' '}
        to understand what your nutritional needs will look like on treatment. And go in with your
        eyes open about both the benefits and the limitations.
      </p>

      <p>
        These medications work. How well they work for you depends on everything you do around them.
      </p>

      <div className="neumorph p-6 rounded-lg mt-8">
        <h2 className="text-xl font-semibold mb-4">Sources</h2>
        <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
          <li>
            Wilding JPH, et al. &quot;Once-Weekly Semaglutide in Adults with Overweight or
            Obesity.&quot; NEJM, 2021. (STEP 1)
          </li>
          <li>
            Davies M, et al. &quot;Semaglutide 2.4 mg once a week in adults with overweight or
            obesity, and type 2 diabetes.&quot; Lancet, 2021. (STEP 2)
          </li>
          <li>
            Wadden TA, et al. &quot;Effect of Subcutaneous Semaglutide vs Placebo as an Adjunct to
            Intensive Behavioral Therapy on Body Weight.&quot; JAMA, 2021. (STEP 3)
          </li>
          <li>
            Garvey WT, et al. &quot;Two-year effects of semaglutide in adults with overweight or
            obesity.&quot; Nature Medicine, 2022. (STEP 5)
          </li>
          <li>
            Jastreboff AM, et al. &quot;Tirzepatide Once Weekly for the Treatment of Obesity.&quot;
            NEJM, 2022. (SURMOUNT-1)
          </li>
          <li>
            Garvey WT, et al. &quot;Tirzepatide Once Weekly for the Treatment of Obesity in People
            with Type 2 Diabetes.&quot; NEJM, 2023. (SURMOUNT-2)
          </li>
          <li>
            Wilding JPH, et al. &quot;Weight regain and cardiometabolic effects after withdrawal of
            semaglutide.&quot; Diabetes, Obesity and Metabolism, 2022. (STEP 1 extension)
          </li>
          <li>
            Lincoff AM, et al. &quot;Semaglutide and Cardiovascular Outcomes in Obesity without
            Diabetes.&quot; NEJM, 2023. (SELECT)
          </li>
          <li>
            Perkovic V, et al. &quot;Effects of Semaglutide on Chronic Kidney Disease in Patients
            with Type 2 Diabetes.&quot; NEJM, 2024. (FLOW)
          </li>
        </ul>
      </div>
    </div>
  </div>
);

export default function CompleteGuideGLP1WeightLossPage() {
  return CompleteGuideGLP1WeightLossPageContent;
}
