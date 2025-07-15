import React from 'react';
import Link from 'next/link';
import AdBlock from '@/components/AdBlock';

const PregnancyNutritionGuidePageContent = (
  <div className="max-w-4xl mx-auto">
    <div className="mb-8">
      <span className="inline-block bg-accent/10 text-accent text-sm px-3 py-1 rounded-full">
        Pregnancy Health
      </span>
      <h1 className="text-3xl md:text-4xl font-bold mt-2 mb-4">
        Pregnancy Nutrition: Evidence-Based Guidelines for Each Trimester
      </h1>
      <p className="text-gray-500 italic">Published: February 3, 2026 • 14 min read</p>
    </div>

    <div className="prose prose-lg max-w-none">
      <div className="neumorph p-6 rounded-lg mb-8">
        <h2 className="text-xl font-semibold mb-4">Key Takeaways</h2>
        <ul className="space-y-2">
          <li>
            You do not need extra calories during the first trimester. The increase is +340 cal/day
            in the second trimester and +450 cal/day in the third (per ACOG guidelines).
          </li>
          <li>
            Recommended weight gain depends on pre-pregnancy BMI: 25-35 lbs for normal weight, 15-25
            lbs for overweight, and 11-20 lbs for obese (IOM 2009).
          </li>
          <li>
            Folate, iron, DHA, choline, and vitamin D need the most attention. Many prenatal
            vitamins lack adequate DHA and choline.
          </li>
          <li>
            The "eating for two" concept is misleading. The additional calorie needs are roughly
            equivalent to a small extra snack, not a second meal.
          </li>
          <li>
            Current ACOG guidelines recommend 150 minutes per week of moderate exercise during
            uncomplicated pregnancies. Most forms of exercise are safe.
          </li>
        </ul>
      </div>

      <p>
        Pregnancy nutrition advice is a minefield. Some of it is evidence-based. A lot of it is
        cultural tradition dressed up as medical guidance. And the food restriction lists have grown
        so long that many pregnant women feel anxious eating anything at all.
      </p>

      <p>
        I want to cut through this and present what the major medical organizations (ACOG, IOM, WHO)
        actually recommend, what the research supports, and where common advice goes beyond what the
        data warrants. This guide is organized by trimester because nutritional needs genuinely
        change as pregnancy progresses.
      </p>

      <p>
        <strong>Important disclaimer:</strong> This article is educational. Your OB-GYN or midwife
        knows your specific medical history and should be your primary source of nutrition guidance
        during pregnancy. Nothing here replaces that relationship.
      </p>

      <h2 className="text-2xl font-bold mt-8 mb-4">
        Calorie Needs by Trimester: Much Less Than You Think
      </h2>

      <p>
        The American College of Obstetricians and Gynecologists (ACOG) provides clear guidelines on
        additional calorie needs during pregnancy:
      </p>

      <div className="neumorph p-6 rounded-lg my-6">
        <h3 className="text-xl font-semibold mb-3">Additional Daily Calories by Trimester</h3>
        <ul className="list-disc list-inside space-y-3">
          <li>
            <strong>First trimester (weeks 1-12):</strong> No additional calories needed. Zero. The
            embryo is tiny (about the size of a lime by week 12) and requires minimal extra energy.
            Total weight gain in the first trimester should be approximately 1-4.5 pounds.
          </li>
          <li>
            <strong>Second trimester (weeks 13-26):</strong> Approximately 340 additional calories
            per day. That is roughly the equivalent of a cup of yogurt with fruit and a handful of
            nuts. Not a second dinner.
          </li>
          <li>
            <strong>Third trimester (weeks 27-40):</strong> Approximately 450 additional calories
            per day. The baby is growing rapidly now, gaining about half a pound per week in the
            final weeks.
          </li>
        </ul>
      </div>

      <p>
        I want to emphasize how small these increases are, because the "eating for two" myth
        persists and causes real harm. Excessive weight gain during pregnancy increases the risk of
        gestational diabetes, preeclampsia, C-section delivery, and postpartum weight retention.
        Goldstein et al. published a 2017 meta-analysis in JAMA showing that excessive gestational
        weight gain affected nearly half of pregnant women and was associated with increased risk of
        large-for-gestational-age babies, C-section, and postpartum weight retention.
      </p>

      <p>
        Our{' '}
        <Link href="/pregnancy-weight-gain" className="text-accent hover:underline">
          pregnancy weight gain calculator
        </Link>{' '}
        can help you track whether your weight gain is within the recommended range for your
        pre-pregnancy BMI.
      </p>

      <h2 className="text-2xl font-bold mt-8 mb-4">
        Weight Gain Recommendations by Pre-Pregnancy BMI
      </h2>

      <p>
        The Institute of Medicine (IOM) published updated weight gain guidelines in 2009. These
        remain the standard used by ACOG and most healthcare providers:
      </p>

      <div className="neumorph p-6 rounded-lg my-6">
        <h3 className="text-xl font-semibold mb-3">IOM 2009 Gestational Weight Gain Guidelines</h3>
        <ul className="list-disc list-inside space-y-3">
          <li>
            <strong>Underweight (BMI &lt; 18.5):</strong> 28-40 pounds total, approximately 1 lb per
            week in the second and third trimesters
          </li>
          <li>
            <strong>Normal weight (BMI 18.5-24.9):</strong> 25-35 pounds total, approximately 1 lb
            per week in the second and third trimesters
          </li>
          <li>
            <strong>Overweight (BMI 25.0-29.9):</strong> 15-25 pounds total, approximately 0.6 lb
            per week in the second and third trimesters
          </li>
          <li>
            <strong>Obese (BMI 30.0+):</strong> 11-20 pounds total, approximately 0.5 lb per week in
            the second and third trimesters
          </li>
        </ul>
      </div>

      <p>
        These ranges are population-level recommendations and have limitations. They were derived
        primarily from studies of white women in the United States and may not be equally applicable
        across all populations. Several researchers have suggested the ranges for obese women may be
        too generous, and there is growing evidence that women with Class III obesity (BMI 40+) may
        benefit from gaining less than 11 pounds. Discuss your specific targets with your provider.
      </p>

      <p>
        If you do not know your pre-pregnancy BMI, our{' '}
        <Link href="/bmi" className="text-accent hover:underline">
          BMI calculator
        </Link>{' '}
        can help you calculate it based on your height and pre-pregnancy weight.
      </p>

      <AdBlock format="horizontal" />

      <h2 className="text-2xl font-bold mt-8 mb-4">The Nutrients That Matter Most</h2>

      <p>
        Prenatal vitamins are important, but they are not a complete solution. Many commonly
        available prenatals are missing key nutrients or provide inadequate amounts. Here is what
        the evidence actually says about each one.
      </p>

      <h3 className="text-xl font-semibold mt-6 mb-3">Folate (Folic Acid)</h3>
      <p>
        Folate has the longest track record of any nutrient in prenatal care. It is essential for
        neural tube development, and supplementation dramatically reduces the risk of spina bifida
        and anencephaly. The CDC recommends 400 mcg of folic acid daily starting at least one month
        before conception and continuing through the first 12 weeks.
      </p>
      <p>
        Women with a previous neural tube defect pregnancy or those on certain medications
        (antiepileptics, methotrexate) may need 4,000 mcg (4 mg) daily. The evidence for folate
        supplementation in preventing neural tube defects is about as strong as evidence gets in
        nutrition science. A 1991 MRC Vitamin Study Research Group trial in the Lancet showed a 72%
        reduction in neural tube defect recurrence with folic acid supplementation.
      </p>

      <h3 className="text-xl font-semibold mt-6 mb-3">Iron</h3>
      <p>
        Blood volume increases by about 45% during pregnancy, and the body needs significantly more
        iron to support this expansion and fetal development. The recommended intake increases from
        18 mg/day to 27 mg/day. Iron deficiency anemia during pregnancy is associated with preterm
        birth and low birth weight.
      </p>
      <p>
        Here is the practical challenge: iron supplements cause constipation and nausea in many
        women, particularly during the first trimester when nausea is already a problem. Taking iron
        with vitamin C increases absorption and allows a lower effective dose. Taking it at night or
        with food (though this reduces absorption somewhat) can reduce stomach upset. If you cannot
        tolerate oral iron, discuss alternatives like iron bisglycinate or IV iron with your
        provider.
      </p>

      <h3 className="text-xl font-semibold mt-6 mb-3">DHA (Docosahexaenoic Acid)</h3>
      <p>
        DHA is an omega-3 fatty acid that the fetal brain and eyes need in large quantities. The
        brain is approximately 60% fat by dry weight, and DHA is the predominant structural fatty
        acid. The International Society for the Study of Fatty Acids and Lipids recommends 200-300
        mg of DHA daily during pregnancy.
      </p>
      <p>
        Many prenatal vitamins either skip DHA entirely or include a trivially small amount. Check
        the label. If your prenatal does not contain at least 200 mg of DHA, consider a separate DHA
        supplement or eat 2-3 servings of low-mercury fatty fish per week (salmon, sardines,
        herring). Fish oil supplements are generally considered safe during pregnancy, though the
        specific brand matters because of potential mercury contamination in lower-quality products.
      </p>

      <h3 className="text-xl font-semibold mt-6 mb-3">Choline</h3>
      <p>
        Choline gets almost no attention in prenatal care, which is a problem. It is essential for
        brain development, particularly the hippocampus (memory center), and for preventing neural
        tube defects in conjunction with folate. The AI (Adequate Intake) for pregnant women is 450
        mg/day.
      </p>
      <p>
        A 2018 randomized controlled trial by Caudill et al. published in the FASEB Journal found
        that maternal choline intake of 930 mg/day (double the AI) improved infant information
        processing speed compared to intake at the AI level. This suggests the current
        recommendations may actually be too low.
      </p>
      <p>
        Most prenatal vitamins contain little to no choline. The best food sources are egg yolks
        (147 mg per yolk), beef liver, chicken, fish, and soybeans. If you eat 2 eggs daily, you are
        getting roughly 300 mg. The rest should come from other dietary sources or a supplement.
      </p>

      <h3 className="text-xl font-semibold mt-6 mb-3">Vitamin D</h3>
      <p>
        Vitamin D deficiency during pregnancy is associated with increased risk of preeclampsia,
        gestational diabetes, and preterm birth. A 2017 meta-analysis by Palacios et al. in the
        Cochrane Database of Systematic Reviews found that vitamin D supplementation probably
        reduced the risk of preeclampsia, gestational diabetes, and low birth weight.
      </p>
      <p>
        ACOG recommends 600 IU daily during pregnancy, but many researchers (including Hollis and
        Wagner, who conducted large RCTs in pregnant women) argue that 4,000 IU daily is safe and
        more effective at achieving adequate blood levels. The Endocrine Society recommends at least
        1,500-2,000 IU daily for pregnant women. Ask your provider to check your 25(OH)D level and
        supplement accordingly.
      </p>

      <h3 className="text-xl font-semibold mt-6 mb-3">Iodine</h3>
      <p>
        Iodine tends to fly under the radar, but the fetus needs it for thyroid development and
        brain growth. The recommended intake during pregnancy is 220 mcg/day (up from 150 mcg for
        non-pregnant adults). WHO considers iodine deficiency the most common preventable cause of
        intellectual disability worldwide. Many prenatal vitamins now include iodine, but check your
        label. If it is not there, iodized salt (about 95 mcg per half teaspoon) and dairy products
        are good dietary sources.
      </p>

      <AdBlock format="horizontal" />

      <h2 className="text-2xl font-bold mt-8 mb-4">
        Morning Sickness and Nutrition: What Actually Helps
      </h2>

      <p>
        Nausea and vomiting affect 70-80% of pregnant women, typically peaking between weeks 8 and
        12. For most women, it resolves by week 16. For 1-3% of women, it becomes hyperemesis
        gravidarum (severe, persistent vomiting requiring medical treatment).
      </p>

      <p>Here is what the evidence supports for managing standard pregnancy nausea:</p>

      <div className="neumorph p-6 rounded-lg my-6">
        <h3 className="text-xl font-semibold mb-3">Evidence-Based Strategies</h3>
        <ul className="list-disc list-inside space-y-3">
          <li>
            <strong>Ginger:</strong> The most studied remedy, with several RCTs supporting efficacy.
            ACOG recommends ginger supplements (250 mg four times daily) as a first-line treatment.
            Ginger tea, ginger ale (with real ginger), and ginger chews can also help.
          </li>
          <li>
            <strong>Vitamin B6 (pyridoxine):</strong> 10-25 mg three times daily reduces nausea in
            many women. This is ACOG's other first-line recommendation. It is available over the
            counter.
          </li>
          <li>
            <strong>Small, frequent meals:</strong> An empty stomach worsens nausea. Eating small
            amounts every 2-3 hours, even just crackers or dry toast, keeps blood sugar stable and
            reduces the empty-stomach trigger.
          </li>
          <li>
            <strong>Protein-rich snacks before bed and upon waking:</strong> Low blood sugar in the
            morning is a common nausea trigger. Having a protein snack at the bedside (cheese, nuts)
            to eat before getting up can help.
          </li>
          <li>
            <strong>Cold foods over hot foods:</strong> Cold foods produce less aroma, and strong
            smells are a common trigger. Salads, sandwiches, smoothies, and cold fruit may be better
            tolerated than cooked meals.
          </li>
        </ul>
      </div>

      <p>
        One important reassurance: mild to moderate nausea during the first trimester, even if it
        limits food intake, is not harmful to the baby. The embryo's calorie needs at this stage are
        minimal (remember: no extra calories needed in the first trimester). Focus on staying
        hydrated and eating whatever you can tolerate. Nutritional perfection is not the goal during
        weeks 6-12. Survival is.
      </p>

      <h2 className="text-2xl font-bold mt-8 mb-4">Gestational Diabetes: What You Need to Know</h2>

      <p>
        Gestational diabetes mellitus (GDM) affects 6-9% of pregnancies in the United States. It
        typically develops during the second trimester as placental hormones create increasing
        insulin resistance. Screening usually happens between weeks 24 and 28 with a glucose
        challenge test.
      </p>

      <h3 className="text-xl font-semibold mt-6 mb-3">Risk Factors</h3>
      <ul className="list-disc list-inside space-y-2 my-4">
        <li>Pre-pregnancy BMI above 25</li>
        <li>Age over 35</li>
        <li>Family history of type 2 diabetes</li>
        <li>Previous GDM diagnosis</li>
        <li>
          Ethnicity (higher rates in Hispanic, Black, Native American, Asian, and Pacific Islander
          populations)
        </li>
        <li>Polycystic ovary syndrome (PCOS)</li>
      </ul>

      <h3 className="text-xl font-semibold mt-6 mb-3">Dietary Management</h3>
      <p>
        If diagnosed with GDM, dietary management is the first-line treatment. The goal is to keep
        blood glucose within target ranges while still meeting nutritional needs. The general
        approach includes:
      </p>

      <div className="neumorph p-6 rounded-lg my-6">
        <ul className="list-disc list-inside space-y-3">
          <li>
            <strong>Distribute carbohydrates evenly</strong> across 3 meals and 2-3 snacks per day.
            Most GDM meal plans target 30-45g of carbs at meals and 15-30g at snacks.
          </li>
          <li>
            <strong>Pair carbohydrates with protein, fat, or fiber</strong> to slow glucose
            absorption. A piece of fruit alone will spike blood sugar more than the same fruit eaten
            with a handful of almonds.
          </li>
          <li>
            <strong>Breakfast is often the hardest meal</strong> because cortisol-driven insulin
            resistance is highest in the morning. Many women with GDM find they need to keep
            breakfast carbs especially low (15-30g) compared to other meals.
          </li>
          <li>
            <strong>A post-meal walk</strong> (even 10-15 minutes) significantly helps post-meal
            glucose control. A 2016 study by Reynolds et al. in Diabetologia found that walking for
            just 10 minutes after each meal was more effective at lowering blood sugar than a single
            30-minute walk per day.
          </li>
        </ul>
      </div>

      <p>
        GDM usually resolves after delivery, but it increases long-term risk of developing type 2
        diabetes by about 50% within 10 years. Continued attention to diet and exercise postpartum
        matters.
      </p>

      <h2 className="text-2xl font-bold mt-8 mb-4">
        Foods to Actually Avoid (and Ones Unnecessarily Restricted)
      </h2>

      <p>
        The list of "foods to avoid during pregnancy" has expanded far beyond what the evidence
        supports, creating unnecessary anxiety. Let me separate the evidence-based restrictions from
        the overcautious ones.
      </p>

      <h3 className="text-xl font-semibold mt-6 mb-3">Genuinely Avoid</h3>
      <div className="neumorph p-6 rounded-lg my-6">
        <ul className="list-disc list-inside space-y-3">
          <li>
            <strong>High-mercury fish:</strong> Shark, swordfish, king mackerel, and tilefish. These
            accumulate methylmercury, which crosses the placenta and is neurotoxic to the developing
            brain. This is well-established.
          </li>
          <li>
            <strong>Raw or undercooked meat:</strong> The risk here is toxoplasmosis and certain
            bacteria. Cook meat to safe internal temperatures (165F for poultry, 145F for whole cuts
            of beef/pork).
          </li>
          <li>
            <strong>Unpasteurized dairy and juice:</strong> Risk of Listeria monocytogenes, which is
            particularly dangerous during pregnancy (20x higher susceptibility). This includes soft
            cheeses made from unpasteurized milk (queso fresco, certain Brie and Camembert).
          </li>
          <li>
            <strong>Alcohol:</strong> No amount of alcohol has been established as safe during
            pregnancy. The CDC and ACOG both recommend complete abstinence. Fetal alcohol spectrum
            disorders are entirely preventable.
          </li>
          <li>
            <strong>Raw sprouts:</strong> Alfalfa, clover, and radish sprouts have been linked to
            multiple Salmonella and E. coli outbreaks. The warm, moist growing conditions are ideal
            for bacteria.
          </li>
        </ul>
      </div>

      <h3 className="text-xl font-semibold mt-6 mb-3">Probably Overcautious</h3>
      <div className="neumorph p-6 rounded-lg my-6">
        <ul className="list-disc list-inside space-y-3">
          <li>
            <strong>All sushi:</strong> The concern is parasites in raw fish. In practice, sushi
            from reputable restaurants in the US is flash-frozen (FDA requirement), which kills
            parasites. The Japanese Ministry of Health does not advise pregnant women to avoid
            sushi. The real risk is from high-mercury species, not raw preparation.
          </li>
          <li>
            <strong>Caffeine:</strong> ACOG says up to 200 mg/day (one 12-oz cup of coffee) is safe.
            A 2020 BMJ Evidence-Based Medicine review by Jack James argued for eliminating caffeine
            entirely, but this position is not endorsed by ACOG, WHO, or most national guidelines.
            The moderate approach (under 200 mg) is reasonable.
          </li>
          <li>
            <strong>Deli meat:</strong> The Listeria concern is real but the actual risk from modern
            deli meat is extremely low. Heating to steaming (165F) eliminates the risk. Some
            providers clear cold deli meat; others recommend heating it. Ask your specific provider.
          </li>
          <li>
            <strong>Eggs (runny yolks):</strong> The Salmonella risk from pasteurized eggs is
            negligible. If using pasteurized eggs, runny yolks are fine. For non-pasteurized eggs,
            cooking until both white and yolk are firm is the cautious approach.
          </li>
        </ul>
      </div>

      <AdBlock format="horizontal" />

      <h2 className="text-2xl font-bold mt-8 mb-4">
        Exercise During Pregnancy: Current ACOG Recommendations
      </h2>

      <p>
        Exercise during pregnancy is not just safe for most women, it is actively beneficial. ACOG's
        2020 Committee Opinion (Number 804) recommends that pregnant women with uncomplicated
        pregnancies get at least 150 minutes of moderate-intensity aerobic activity per week.
      </p>

      <p>The research on this is clear:</p>

      <ul className="list-disc list-inside space-y-2 my-4">
        <li>Reduced risk of gestational diabetes (by about 30% per a 2017 meta-analysis)</li>
        <li>Reduced risk of preeclampsia</li>
        <li>Reduced risk of excessive weight gain</li>
        <li>Decreased severity of low back pain</li>
        <li>Possible shorter labor duration</li>
        <li>Faster postpartum recovery</li>
        <li>Reduced risk of postpartum depression</li>
      </ul>

      <h3 className="text-xl font-semibold mt-6 mb-3">What Is Safe</h3>
      <p>
        Walking, swimming, stationary cycling, low-impact aerobics, yoga (modified), and strength
        training with moderate loads are all considered safe throughout pregnancy. Women who were
        running, weightlifting, or doing CrossFit before pregnancy can generally continue with
        modifications (discussed with their provider).
      </p>

      <h3 className="text-xl font-semibold mt-6 mb-3">What to Avoid</h3>
      <p>
        Contact sports with fall risk (soccer, basketball, horseback riding), scuba diving (risk of
        decompression sickness to the fetus), activities at altitude above 6,000 feet (for those not
        already acclimated), and hot yoga or exercise in extreme heat (hyperthermia risk, especially
        in the first trimester).
      </p>

      <p>
        After the first trimester, avoid exercises performed flat on your back for extended periods,
        as the weight of the uterus can compress the inferior vena cava and reduce blood flow.
        Incline positions are fine.
      </p>

      <h2 className="text-2xl font-bold mt-8 mb-4">Trimester-by-Trimester Nutrition Summary</h2>

      <div className="neumorph p-6 rounded-lg my-6">
        <h3 className="text-xl font-semibold mb-3">First Trimester (Weeks 1-12)</h3>
        <ul className="list-disc list-inside space-y-2">
          <li>Prioritize folate (400 mcg min) and begin prenatal vitamins if not already taking</li>
          <li>No extra calories needed</li>
          <li>Focus on hydration and whatever foods you can tolerate if experiencing nausea</li>
          <li>Consider ginger and vitamin B6 for nausea management</li>
          <li>Avoid alcohol and limit caffeine to 200 mg/day</li>
        </ul>
      </div>

      <div className="neumorph p-6 rounded-lg my-6">
        <h3 className="text-xl font-semibold mb-3">Second Trimester (Weeks 13-26)</h3>
        <ul className="list-disc list-inside space-y-2">
          <li>Increase intake by roughly 340 calories/day</li>
          <li>Ensure adequate iron intake (27 mg/day) as blood volume expands</li>
          <li>Prioritize DHA (200-300 mg/day) for fetal brain development</li>
          <li>Ensure adequate choline (450 mg/day minimum)</li>
          <li>Expect and monitor weight gain (roughly 1 lb/week for normal-weight women)</li>
          <li>GDM screening typically occurs at 24-28 weeks</li>
        </ul>
      </div>

      <div className="neumorph p-6 rounded-lg my-6">
        <h3 className="text-xl font-semibold mb-3">Third Trimester (Weeks 27-40)</h3>
        <ul className="list-disc list-inside space-y-2">
          <li>Increase intake by roughly 450 calories/day</li>
          <li>Continue iron supplementation (anemia is most common in the third trimester)</li>
          <li>Ensure adequate calcium (1,000 mg/day) for fetal bone development</li>
          <li>Protein needs are highest now (about 1.1 g per kg body weight per day)</li>
          <li>
            Smaller, more frequent meals become practical as the uterus compresses the stomach
          </li>
          <li>Stay hydrated (dehydration can trigger Braxton Hicks contractions)</li>
        </ul>
      </div>

      <div className="neumorph p-6 rounded-lg mt-8">
        <h3 className="text-xl font-semibold mb-4">Pregnancy Calculators</h3>
        <p className="mb-4">
          Our calculators can help you track key metrics throughout your pregnancy:
        </p>
        <ul className="list-disc list-inside space-y-2">
          <li>
            <Link href="/pregnancy-weight-gain" className="text-accent hover:underline">
              Pregnancy Weight Gain Calculator
            </Link>{' '}
            - Track whether your weight gain is within recommended ranges for your BMI
          </li>
          <li>
            <Link href="/pregnancy-due-date" className="text-accent hover:underline">
              Pregnancy Due Date Calculator
            </Link>{' '}
            - Estimate your due date and current gestational age
          </li>
          <li>
            <Link href="/due-date-by-conception" className="text-accent hover:underline">
              Due Date by Conception Calculator
            </Link>{' '}
            - Calculate your due date based on conception date
          </li>
          <li>
            <Link href="/calorie" className="text-accent hover:underline">
              Calorie Calculator
            </Link>{' '}
            - Estimate your baseline calorie needs to add trimester-specific increases
          </li>
          <li>
            <Link href="/bmi" className="text-accent hover:underline">
              BMI Calculator
            </Link>{' '}
            - Determine your pre-pregnancy BMI to find your recommended weight gain range
          </li>
        </ul>
      </div>

      <div className="mt-12 border-t pt-8">
        <h3 className="text-xl font-semibold mb-4">References</h3>
        <ul className="space-y-3 text-sm text-gray-600">
          <li>
            ACOG Committee Opinion No. 804: Physical Activity and Exercise During Pregnancy and the
            Postpartum Period. Obstet Gynecol. 2020;135(4):e178-e188.
          </li>
          <li>
            Institute of Medicine (US) and National Research Council (US) Committee to Reexamine IOM
            Pregnancy Weight Guidelines. Weight Gain During Pregnancy: Reexamining the Guidelines.
            Washington, DC: National Academies Press; 2009.
          </li>
          <li>
            Goldstein RF, et al. Association of gestational weight gain with maternal and infant
            outcomes: a systematic review and meta-analysis. JAMA. 2017;317(21):2207-2225.
          </li>
          <li>
            MRC Vitamin Study Research Group. Prevention of neural tube defects: results of the
            Medical Research Council Vitamin Study. Lancet. 1991;338(8760):131-137.
          </li>
          <li>
            Caudill MA, et al. Maternal choline supplementation during the third trimester of
            pregnancy improves infant information processing speed: a randomized, double-blind,
            controlled feeding study. FASEB J. 2018;32(4):2172-2180.
          </li>
          <li>
            Palacios C, et al. Vitamin D supplementation for women during pregnancy. Cochrane
            Database Syst Rev. 2019;7(7):CD008873.
          </li>
          <li>
            Reynolds AN, et al. Advice to walk after meals is more effective for lowering
            postprandial glycaemia in type 2 diabetes mellitus than advice that does not specify
            timing: a randomised crossover study. Diabetologia. 2016;59(12):2572-2578.
          </li>
          <li>
            Davenport MH, et al. Prenatal exercise for the prevention of gestational diabetes
            mellitus and hypertensive disorders of pregnancy: a systematic review and meta-analysis.
            Br J Sports Med. 2018;52(21):1367-1375.
          </li>
        </ul>
      </div>
    </div>
  </div>
);

export default function PregnancyNutritionGuidePage() {
  return PregnancyNutritionGuidePageContent;
}
