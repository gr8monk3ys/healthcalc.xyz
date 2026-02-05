import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import AdBlock from '@/components/AdBlock';
import RelatedCalculatorLinks from '@/components/RelatedCalculatorLinks';
import RelatedGuides from '@/components/RelatedGuides';

export const metadata: Metadata = {
  title: 'TDEE Explained: How Many Calories Do You Really Need? | HealthCheck Blog',
  description:
    'Learn how to calculate TDEE, what affects daily calorie needs, and how to use it for fat loss.',
  keywords:
    'TDEE, total daily energy expenditure, BMR, calorie needs, metabolism, weight management, energy balance, activity level, exercise, non-exercise activity thermogenesis',
  openGraph: {
    title: 'TDEE Explained: How Many Calories Do You Really Need? | HealthCheck Blog',
    description:
      'Learn how to calculate TDEE, what affects daily calorie needs, and how to use it for fat loss.',
    type: 'article',
    url: 'https://www.heathcheck.info/blog/tdee-explained',
    images: [
      {
        url: '/images/blog/tdee-explained.jpg',
        width: 1200,
        height: 630,
        alt: 'TDEE Explained',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TDEE Explained: How Many Calories Do You Really Need? | HealthCheck Blog',
    description:
      'Learn how to calculate TDEE, what affects daily calorie needs, and how to use it for fat loss.',
    images: ['/images/blog/tdee-explained.jpg'],
  },
};

export default function TDEEExplainedPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <span className="inline-block bg-accent/10 text-accent text-sm px-3 py-1 rounded-full">
          Energy Expenditure
        </span>
        <h1 className="text-3xl md:text-4xl font-bold mt-2 mb-4">
          TDEE Explained: How Many Calories Do You Really Need?
        </h1>
        <p className="text-gray-500 italic">Published: February 20, 2025 • 10 min read</p>
      </div>

      <div className="prose prose-lg max-w-none">
        <div className="neumorph p-6 rounded-lg mb-8">
          <h2 className="text-xl font-semibold mb-4">Key Takeaways</h2>
          <ul className="space-y-2">
            <li>
              TDEE (Total Daily Energy Expenditure) represents the total calories your body burns in
              a day
            </li>
            <li>TDEE consists of four components: BMR, TEF, EAT, and NEAT</li>
            <li>Your BMR (Basal Metabolic Rate) typically accounts for 60-70% of your TDEE</li>
            <li>Activity level can significantly impact your daily calorie needs</li>
            <li>Understanding your TDEE is essential for effective weight management</li>
          </ul>
        </div>

        <AdBlock format="horizontal" />

        <p>
          Whether you're trying to lose weight, gain muscle, or simply maintain your current
          physique, understanding your body's energy needs is crucial. At the center of this
          understanding is a concept known as Total Daily Energy Expenditure (TDEE). In this
          article, we'll break down what TDEE is, how it's calculated, and why it matters for your
          health and fitness goals.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">What Is TDEE?</h2>

        <p>
          Total Daily Energy Expenditure (TDEE) is the total number of calories your body burns in a
          24-hour period. It represents the sum of all the energy your body uses, from basic
          life-sustaining functions to intense physical activity. Think of TDEE as your body's daily
          caloric budget—the number of calories you need to consume to maintain your current weight.
        </p>

        <p>
          Understanding your TDEE is fundamental to any nutrition plan because it establishes your
          energy balance equation:
        </p>

        <div className="neumorph p-6 rounded-lg my-6">
          <ul className="list-disc list-inside space-y-3">
            <li>
              If you consume <strong>fewer calories than your TDEE</strong>, you'll be in a calorie
              deficit and lose weight
            </li>
            <li>
              If you consume <strong>more calories than your TDEE</strong>, you'll be in a calorie
              surplus and gain weight
            </li>
            <li>
              If you consume <strong>calories equal to your TDEE</strong>, you'll maintain your
              current weight
            </li>
          </ul>
        </div>

        <p>
          While this principle is straightforward, accurately determining your TDEE can be
          challenging because it's influenced by numerous factors, including your age, gender, body
          composition, activity level, and even genetics.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">The Four Components of TDEE</h2>

        <p>
          Your TDEE is made up of four distinct components, each representing different aspects of
          your body's energy expenditure:
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-3">1. Basal Metabolic Rate (BMR)</h3>

        <div className="neumorph p-6 rounded-lg my-4">
          <p>
            BMR represents the calories your body needs to perform basic, life-sustaining functions
            while at complete rest. This includes processes like breathing, circulating blood, cell
            production, nutrient processing, and maintaining body temperature.
          </p>
          <p className="mt-4">
            For most people, BMR accounts for approximately 60-70% of their total daily energy
            expenditure, making it the largest component of TDEE. Your BMR is primarily determined
            by:
          </p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>
              <strong>Body size and composition</strong>: Larger bodies require more energy; muscle
              tissue burns more calories than fat tissue
            </li>
            <li>
              <strong>Age</strong>: BMR typically decreases with age as muscle mass naturally
              declines
            </li>
            <li>
              <strong>Gender</strong>: Men generally have higher BMRs than women due to greater
              muscle mass
            </li>
            <li>
              <strong>Genetics</strong>: Some people naturally have faster or slower metabolisms
            </li>
            <li>
              <strong>Hormonal factors</strong>: Thyroid function and other hormones can
              significantly impact BMR
            </li>
          </ul>
        </div>

        <h3 className="text-xl font-semibold mt-6 mb-3">2. Thermic Effect of Food (TEF)</h3>

        <div className="neumorph p-6 rounded-lg my-4">
          <p>
            TEF refers to the energy your body uses to digest, absorb, and process the nutrients in
            the food you eat. In essence, you burn calories by eating and digesting food.
          </p>
          <p className="mt-4">
            TEF typically accounts for about 10% of your total daily energy expenditure, though this
            varies based on the composition of your diet:
          </p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>
              <strong>Protein</strong>: Has the highest thermic effect, burning approximately 20-30%
              of the calories consumed
            </li>
            <li>
              <strong>Carbohydrates</strong>: Have a moderate thermic effect, burning about 5-10% of
              calories consumed
            </li>
            <li>
              <strong>Fats</strong>: Have the lowest thermic effect, burning only about 0-3% of
              calories consumed
            </li>
          </ul>
          <p className="mt-4">
            This is one reason why high-protein diets can be beneficial for weight management—they
            naturally increase your calorie burn through TEF.
          </p>
        </div>

        <h3 className="text-xl font-semibold mt-6 mb-3">
          3. Exercise Activity Thermogenesis (EAT)
        </h3>

        <div className="neumorph p-6 rounded-lg my-4">
          <p>
            EAT represents the calories burned during intentional exercise, such as running,
            weightlifting, swimming, or any structured physical activity. This component varies
            dramatically from person to person based on:
          </p>
          <ul className="list-disc list-inside mt-4 space-y-1">
            <li>
              <strong>Exercise frequency</strong>: How often you work out
            </li>
            <li>
              <strong>Exercise intensity</strong>: How hard you push yourself during workouts
            </li>
            <li>
              <strong>Exercise duration</strong>: How long your workout sessions last
            </li>
            <li>
              <strong>Exercise type</strong>: Different activities burn calories at different rates
            </li>
          </ul>
          <p className="mt-4">
            For sedentary individuals, EAT might contribute very little to TDEE. For athletes or
            very active individuals, it can represent a significant portion of daily energy
            expenditure.
          </p>
        </div>

        <h3 className="text-xl font-semibold mt-6 mb-3">
          4. Non-Exercise Activity Thermogenesis (NEAT)
        </h3>

        <div className="neumorph p-6 rounded-lg my-4">
          <p>
            NEAT encompasses all the calories burned through non-exercise physical activities in
            your daily life. This includes:
          </p>
          <ul className="list-disc list-inside mt-4 space-y-1">
            <li>Walking around your home or office</li>
            <li>Fidgeting</li>
            <li>Standing</li>
            <li>Cleaning</li>
            <li>Typing</li>
            <li>Gardening</li>
            <li>Shopping</li>
            <li>Any other physical activity that isn't structured exercise</li>
          </ul>
          <p className="mt-4">
            NEAT can vary enormously between individuals and is often the most significant factor in
            differences in TDEE between people of similar size and composition. For some people,
            NEAT might account for just 15% of TDEE, while for others (especially those with active
            jobs), it could represent 50% or more.
          </p>
        </div>

        <p className="mt-6">
          Understanding these four components helps explain why two people of the same weight,
          height, age, and gender can have very different calorie needs. Differences in muscle mass
          affect BMR, dietary choices influence TEF, exercise habits determine EAT, and lifestyle
          factors impact NEAT.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">How TDEE Is Calculated</h2>

        <p>
          There are several methods to estimate TDEE, each with its own advantages and limitations:
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-3">Method 1: BMR × Activity Multiplier</h3>

        <p>The most common approach to estimating TDEE involves two steps:</p>

        <ol className="list-decimal list-inside space-y-4 my-4">
          <li>
            <strong>Calculate BMR using a formula</strong>. The most widely used formulas include:
            <ul className="list-disc list-inside ml-6 mt-2 space-y-1">
              <li>
                <strong>Mifflin-St Jeor Equation</strong>: Considered the most accurate for most
                people
              </li>
              <li>
                <strong>Harris-Benedict Equation</strong>: An older formula that's still widely used
              </li>
              <li>
                <strong>Katch-McArdle Formula</strong>: Incorporates lean body mass for greater
                accuracy if body fat percentage is known
              </li>
            </ul>
          </li>
          <li>
            <strong>Multiply BMR by an activity factor</strong> based on your typical activity
            level:
            <ul className="list-disc list-inside ml-6 mt-2 space-y-1">
              <li>
                <strong>Sedentary (1.2)</strong>: Little or no exercise, desk job
              </li>
              <li>
                <strong>Lightly active (1.375)</strong>: Light exercise 1-3 days per week
              </li>
              <li>
                <strong>Moderately active (1.55)</strong>: Moderate exercise 3-5 days per week
              </li>
              <li>
                <strong>Very active (1.725)</strong>: Hard exercise 6-7 days per week
              </li>
              <li>
                <strong>Extremely active (1.9)</strong>: Hard daily exercise and physical job or
                training twice daily
              </li>
            </ul>
          </li>
        </ol>

        <p>
          For example, if your calculated BMR is 1,500 calories and you're moderately active, your
          estimated TDEE would be 1,500 × 1.55 = 2,325 calories per day.
        </p>

        <p>
          Our{' '}
          <Link href="/tdee" className="text-accent hover:underline">
            TDEE Calculator
          </Link>{' '}
          uses this method with the Mifflin-St Jeor equation, which research has shown to be the
          most accurate for most people.
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-3">Method 2: Direct Measurement</h3>

        <p>For more precise TDEE measurement, scientific methods include:</p>

        <ul className="list-disc list-inside space-y-3 my-4">
          <li>
            <strong>Doubly Labeled Water (DLW)</strong>: Considered the gold standard for measuring
            energy expenditure outside of a laboratory setting. This method involves drinking water
            containing special isotopes and measuring how quickly they're eliminated from the body.
          </li>
          <li>
            <strong>Indirect Calorimetry</strong>: Measures oxygen consumption and carbon dioxide
            production to determine energy expenditure. This can be done in a metabolic chamber or
            using a portable device.
          </li>
          <li>
            <strong>Wearable Technology</strong>: Modern fitness trackers and smartwatches estimate
            calorie burn based on heart rate, movement, and other factors. While not as accurate as
            laboratory methods, they can provide useful estimates for many people.
          </li>
        </ul>

        <p>
          These direct measurement methods are more accurate but less accessible than formula-based
          calculations.
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-3">Method 3: The Tracking Method</h3>

        <p>
          Perhaps the most practical approach for many individuals is what we call the "tracking
          method":
        </p>

        <ol className="list-decimal list-inside space-y-2 my-4">
          <li>Track your calorie intake accurately for 2-3 weeks</li>
          <li>Monitor your weight daily (taking a weekly average)</li>
          <li>If your weight remains stable, your average calorie intake equals your TDEE</li>
          <li>
            If your weight changes, adjust the calculation based on the rate of change
            (approximately 3,500 calories per pound of weight change)
          </li>
        </ol>

        <p>
          This method requires patience and consistent tracking but can provide a highly
          personalized TDEE estimate based on real-world data.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">Factors That Influence Your TDEE</h2>

        <p>Your TDEE isn't static—it can change based on numerous factors:</p>

        <div className="neumorph p-6 rounded-lg my-6">
          <h3 className="text-xl font-semibold mb-3">Physical Factors</h3>
          <ul className="list-disc list-inside space-y-2">
            <li>
              <strong>Body size and composition</strong>: Larger bodies and those with more muscle
              mass have higher TDEEs
            </li>
            <li>
              <strong>Age</strong>: TDEE typically decreases with age as muscle mass declines and
              hormonal changes occur
            </li>
            <li>
              <strong>Gender</strong>: Men generally have higher TDEEs than women of similar size
              due to greater muscle mass
            </li>
            <li>
              <strong>Health conditions</strong>: Certain medical conditions can increase or
              decrease TDEE
            </li>
          </ul>
        </div>

        <div className="neumorph p-6 rounded-lg my-6">
          <h3 className="text-xl font-semibold mb-3">Lifestyle Factors</h3>
          <ul className="list-disc list-inside space-y-2">
            <li>
              <strong>Physical activity</strong>: Both exercise and non-exercise activity
              significantly impact TDEE
            </li>
            <li>
              <strong>Diet</strong>: Food choices affect TEF; protein has the highest thermic effect
            </li>
            <li>
              <strong>Sleep</strong>: Poor sleep can reduce TDEE by affecting both metabolism and
              activity levels
            </li>
            <li>
              <strong>Stress</strong>: Chronic stress can alter hormonal balance and affect
              metabolic rate
            </li>
            <li>
              <strong>Environmental temperature</strong>: Extreme heat or cold can increase energy
              expenditure as your body works to maintain temperature
            </li>
          </ul>
        </div>

        <div className="neumorph p-6 rounded-lg my-6">
          <h3 className="text-xl font-semibold mb-3">Adaptive Factors</h3>
          <ul className="list-disc list-inside space-y-2">
            <li>
              <strong>Weight loss</strong>: As you lose weight, your TDEE decreases due to having
              less body mass to maintain
            </li>
            <li>
              <strong>Caloric restriction</strong>: Extended periods of significant calorie
              restriction can lead to metabolic adaptation, where your body becomes more efficient
              and burns fewer calories
            </li>
            <li>
              <strong>Overfeeding</strong>: Consistent caloric surplus can slightly increase TDEE
              through increased TEF and potential increases in NEAT
            </li>
            <li>
              <strong>Exercise adaptation</strong>: As you become more efficient at specific
              exercises, you may burn fewer calories performing the same activity
            </li>
          </ul>
        </div>

        <p>
          Understanding these factors helps explain why TDEE can change over time and why regular
          reassessment is important for long-term weight management.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">Why Understanding TDEE Matters</h2>

        <p>Knowing your TDEE provides several important benefits:</p>

        <h3 className="text-xl font-semibold mt-6 mb-3">For Weight Loss</h3>

        <p>
          To lose weight effectively and sustainably, you need to create a moderate calorie deficit
          below your TDEE. Without knowing your TDEE, you might:
        </p>

        <ul className="list-disc list-inside space-y-2 my-4">
          <li>Create too small a deficit, leading to frustratingly slow progress</li>
          <li>
            Create too large a deficit, leading to excessive hunger, nutrient deficiencies, muscle
            loss, and metabolic adaptation
          </li>
          <li>Fail to adjust your intake as your TDEE changes during weight loss</li>
        </ul>

        <p>
          A well-designed weight loss plan typically creates a deficit of 15-25% below TDEE, which
          for most people translates to 500-750 calories per day or about 1-1.5 pounds of weight
          loss per week.
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-3">For Muscle Gain</h3>

        <p>
          Building muscle requires a calorie surplus—consuming more than your TDEE to provide energy
          and resources for muscle growth. Knowing your TDEE helps you:
        </p>

        <ul className="list-disc list-inside space-y-2 my-4">
          <li>Create an appropriate surplus (typically 10-20% above TDEE)</li>
          <li>Minimize excessive fat gain while maximizing muscle growth</li>
          <li>Adjust your intake during different phases of training</li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 mb-3">For Weight Maintenance</h3>

        <p>
          Perhaps the most valuable application of understanding TDEE is for long-term weight
          maintenance. After reaching a weight loss or muscle gain goal, knowing your new TDEE
          allows you to:
        </p>

        <ul className="list-disc list-inside space-y-2 my-4">
          <li>Transition to a sustainable maintenance calorie level</li>
          <li>Make informed adjustments as your activity levels or other factors change</li>
          <li>Prevent unintentional weight regain or loss</li>
        </ul>

        <h2 className="text-2xl font-bold mt-8 mb-4">Common TDEE Misconceptions</h2>

        <div className="neumorph p-6 rounded-lg my-6">
          <h3 className="text-xl font-semibold mb-3">
            Misconception #1: TDEE Calculators Are Perfectly Accurate
          </h3>
          <p>
            While TDEE calculators provide useful estimates, they're just that—estimates. Individual
            variations in metabolism, activity levels, and other factors mean that calculator
            results may be off by 10-20% for some people. Use calculator results as a starting
            point, then adjust based on your actual results.
          </p>
        </div>

        <div className="neumorph p-6 rounded-lg my-6">
          <h3 className="text-xl font-semibold mb-3">Misconception #2: TDEE Remains Constant</h3>
          <p>
            As discussed earlier, your TDEE changes in response to numerous factors, including
            weight loss or gain, changes in activity, aging, and even seasonal variations. Regular
            reassessment is necessary for long-term success.
          </p>
        </div>

        <div className="neumorph p-6 rounded-lg my-6">
          <h3 className="text-xl font-semibold mb-3">
            Misconception #3: Exercise Is the Biggest Factor in TDEE
          </h3>
          <p>
            While exercise is important, for most people, BMR and NEAT contribute more to TDEE than
            structured exercise. This explains why some people can maintain their weight without
            formal exercise (high NEAT) while others struggle despite regular workouts (low NEAT).
          </p>
        </div>

        <div className="neumorph p-6 rounded-lg my-6">
          <h3 className="text-xl font-semibold mb-3">
            Misconception #4: You Need to Calculate TDEE Precisely
          </h3>
          <p>
            While understanding TDEE is valuable, obsessing over precise numbers isn't necessary or
            helpful for most people. The tracking method—monitoring intake and weight changes—often
            provides more practical guidance than complex calculations.
          </p>
        </div>

        <h2 className="text-2xl font-bold mt-8 mb-4">
          Practical Applications: Using TDEE for Your Goals
        </h2>

        <p>Here's how to apply TDEE knowledge to various fitness goals:</p>

        <h3 className="text-xl font-semibold mt-6 mb-3">For Weight Loss</h3>

        <ol className="list-decimal list-inside space-y-2 my-4">
          <li>
            Calculate your estimated TDEE using our{' '}
            <Link href="/tdee" className="text-accent hover:underline">
              TDEE Calculator
            </Link>
          </li>
          <li>Create a moderate deficit of 15-25% below your TDEE</li>
          <li>
            Monitor your weight and adjust as needed (aim for 0.5-1% of body weight loss per week)
          </li>
          <li>Recalculate your TDEE every 10-15 pounds of weight loss</li>
          <li>Include resistance training to preserve muscle mass</li>
          <li>
            Prioritize protein intake (1.6-2.2g per kg of body weight) to support satiety and muscle
            preservation
          </li>
        </ol>

        <h3 className="text-xl font-semibold mt-6 mb-3">For Muscle Gain</h3>

        <ol className="list-decimal list-inside space-y-2 my-4">
          <li>Calculate your estimated TDEE</li>
          <li>Create a moderate surplus of 10-20% above your TDEE</li>
          <li>Monitor both weight and body composition changes</li>
          <li>
            Adjust your surplus based on results (aim for 0.25-0.5% of body weight gain per week)
          </li>
          <li>Follow a progressive resistance training program</li>
          <li>
            Prioritize protein intake (1.6-2.2g per kg of body weight) to support muscle growth
          </li>
        </ol>

        <h3 className="text-xl font-semibold mt-6 mb-3">
          For Body Recomposition (Losing Fat While Gaining Muscle)
        </h3>

        <ol className="list-decimal list-inside space-y-2 my-4">
          <li>Calculate your estimated TDEE</li>
          <li>Consume calories at or slightly below TDEE (0-10% deficit)</li>
          <li>Follow a structured resistance training program</li>
          <li>Prioritize protein intake (1.8-2.2g per kg of body weight)</li>
          <li>
            Be patient—recomposition is typically slower than dedicated cutting or bulking phases
          </li>
          <li>Monitor body composition changes rather than just scale weight</li>
        </ol>

        <h3 className="text-xl font-semibold mt-6 mb-3">For Weight Maintenance</h3>

        <ol className="list-decimal list-inside space-y-2 my-4">
          <li>Calculate your estimated TDEE at your goal weight</li>
          <li>Gradually adjust calories to maintenance level after weight loss or gain</li>
          <li>Monitor weight regularly and make small adjustments as needed</li>
          <li>Focus on sustainable dietary and exercise habits</li>
          <li>
            Consider periodic "diet breaks" at maintenance calories during extended weight loss
            phases
          </li>
        </ol>

        <h2 className="text-2xl font-bold mt-8 mb-4">Conclusion: TDEE as a Tool, Not a Rule</h2>

        <p>
          Understanding your Total Daily Energy Expenditure provides valuable insight into your
          body's calorie needs and creates a framework for effective nutrition planning. However,
          it's important to remember that TDEE is a tool to guide your decisions, not an absolute
          rule to follow rigidly.
        </p>

        <p>The most successful approach to using TDEE involves:</p>

        <ul className="list-disc list-inside space-y-2 my-4">
          <li>Starting with a reasonable estimate</li>
          <li>Monitoring your results</li>
          <li>Making data-based adjustments</li>
          <li>Focusing on consistency rather than perfection</li>
          <li>Adapting your approach as your body, goals, and circumstances change</li>
        </ul>

        <p>
          By combining TDEE knowledge with mindful eating, regular physical activity, and patience,
          you can develop a sustainable approach to nutrition that supports your health and fitness
          goals for the long term.
        </p>

        <div className="neumorph p-6 rounded-lg mt-8">
          <h3 className="text-xl font-semibold mb-4">
            Tools to Help You Calculate and Use Your TDEE
          </h3>
          <p className="mb-4">
            At HealthCheck, we've developed several calculators to help you apply TDEE concepts to
            your specific goals:
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>
              <Link href="/tdee" className="text-accent hover:underline">
                TDEE Calculator
              </Link>{' '}
              - Calculate your Total Daily Energy Expenditure based on your personal metrics
            </li>
            <li>
              <Link href="/calorie-deficit" className="text-accent hover:underline">
                Calorie Deficit Calculator
              </Link>{' '}
              - Determine appropriate calorie targets for weight loss
            </li>
            <li>
              <Link href="/weight-management" className="text-accent hover:underline">
                Weight Management Calculator
              </Link>{' '}
              - Create a personalized plan to reach your target weight by a specific date
            </li>
            <li>
              <Link href="/maximum-fat-loss" className="text-accent hover:underline">
                Maximum Fat Loss Calculator
              </Link>{' '}
              - Find the optimal calorie deficit that maximizes fat loss while preserving muscle
            </li>
            <li>
              <Link href="/body-fat-burn" className="text-accent hover:underline">
                Body Fat Burn Calculator
              </Link>{' '}
              - Calculate calories burned during physical activities and their impact on weight loss
            </li>
          </ul>
        </div>

        <RelatedCalculatorLinks
          slugs={['tdee', 'calorie', 'calorie-deficit', 'weight-management']}
        />
        <RelatedGuides />

        <div className="mt-12 border-t pt-8">
          <h3 className="text-xl font-semibold mb-4">References</h3>
          <ul className="space-y-3 text-sm text-gray-600">
            <li>
              Pontzer H, et al. Constrained Total Energy Expenditure and Metabolic Adaptation to
              Physical Activity in Adult Humans. Current Biology. 2016;26(3):410-417.
            </li>
            <li>
              Levine JA. Non-exercise activity thermogenesis (NEAT). Best Practice & Research
              Clinical Endocrinology & Metabolism. 2002;16(4):679-702.
            </li>
            <li>
              Frankenfield D, et al. Comparison of Predictive Equations for Resting Metabolic Rate
              in Healthy Nonobese and Obese Adults: A Systematic Review. Journal of the American
              Dietetic Association. 2005;105(5):775-789.
            </li>
            <li>
              Müller MJ, Bosy-Westphal A. Adaptive thermogenesis with weight loss in humans. Obesity
              (Silver Spring). 2013;21(2):218-228.
            </li>
            <li>Westerterp KR. Diet induced thermogenesis. Nutrition & Metabolism. 2004;1:5.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
