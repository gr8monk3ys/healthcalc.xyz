import React from 'react';
import Link from 'next/link';
import AdBlock from '@/components/AdBlock';

const CompleteGuideToMacronutrientsPageContent = (
  <article className="max-w-4xl mx-auto px-4 py-12">
    <header className="mb-8">
      <span className="inline-block bg-accent/10 text-accent text-sm px-3 py-1 rounded-full">
        Nutrition Science
      </span>
      <h1 className="text-3xl md:text-4xl font-bold mt-2 mb-4 text-gray-900 dark:text-white">
        Macronutrients Explained: Protein, Carbs, and Fat Without the Dogma
      </h1>
      <p className="text-gray-500 dark:text-gray-400 italic">
        Published: January 17, 2026 &bull; 21 min read
      </p>
    </header>

    <div className="prose prose-lg dark:prose-invert max-w-none">
      <div className="neumorph-card rounded-xl p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Key Takeaways</h2>
        <ul className="space-y-2 text-gray-700 dark:text-gray-300">
          <li>
            Protein requirements for active people are 1.6 to 2.2 g/kg body weight per day, and
            total daily intake matters more than timing
          </li>
          <li>
            Carbohydrates are not inherently fattening; the insulin hypothesis of obesity has been
            repeatedly tested and found inadequate
          </li>
          <li>Fat intake below 20% of total calories risks hormonal disruption</li>
          <li>
            Fiber is the most consistently underconsumed nutrient in Western diets and has the
            strongest evidence base for disease prevention
          </li>
        </ul>
      </div>

      <p className="text-xl text-gray-700 dark:text-gray-300 mb-6">
        Nutrition discourse has a problem. Every macronutrient has been cast as the villain at some
        point. Fat was evil in the 1980s and 1990s. Carbs took over as the enemy in the 2000s and
        2010s. Protein has mostly escaped demonization, though you will occasionally hear someone
        claim it destroys your kidneys (it does not, in healthy people).
      </p>

      <p>
        The reality is simpler and less dramatic. Each macronutrient has a role. None of them is
        inherently harmful. The amounts and ratios that work best for you depend on what you are
        trying to do, how much you move, and what you actually enjoy eating. Let me walk through
        what the research says.
      </p>

      <h2 className="text-3xl font-bold mt-12 mb-6 text-gray-900 dark:text-white">
        Protein: The Most Important Macro for Most Goals
      </h2>

      <p>
        I am going to start with protein because, regardless of whether your goal is fat loss,
        muscle gain, or general health, protein is the macronutrient that deserves the most
        attention.
      </p>

      <h3 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white">
        How much do you actually need?
      </h3>

      <p>
        The U.S. RDA for protein is 0.8 grams per kilogram of body weight per day. This is the
        minimum to prevent deficiency in sedentary adults. It is not the optimal amount for anyone
        who exercises, is trying to lose fat, or is over 50.
      </p>

      <p>
        A 2016 meta-analysis by Morton et al. published in the British Journal of Sports Medicine
        analyzed 49 studies with 1,863 participants and found that protein intakes above 1.6 g/kg
        per day maximized gains in lean mass during resistance training. There was no additional
        benefit above roughly 2.2 g/kg per day.
      </p>

      <p>
        Stuart Phillips, one of the leading protein researchers at McMaster University, has
        published extensively on this topic. His group&apos;s work consistently lands in the 1.6 to
        2.2 g/kg range for active individuals. For someone weighing 80 kg (176 pounds), that is 128
        to 176 grams of protein per day.
      </p>

      <p>
        For older adults, the requirements may be higher due to anabolic resistance (the reduced
        ability of aging muscle to respond to protein intake). The PROT-AGE study group (Bauer et
        al., 2013, published in the Journal of the American Medical Directors Association)
        recommended 1.0 to 1.2 g/kg for healthy older adults and 1.2 to 1.5 g/kg for those with
        acute or chronic illness.
      </p>

      <p>
        Use our{' '}
        <Link href="/protein" className="text-blue-600 dark:text-blue-400 hover:underline">
          protein calculator
        </Link>{' '}
        to find your target based on your weight and activity level.
      </p>

      <h3 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white">
        The protein timing myth
      </h3>

      <p>
        For years, the fitness industry insisted on a narrow &quot;anabolic window&quot; after
        training. You had to consume protein within 30 to 60 minutes of your workout, or the session
        was wasted.
      </p>

      <p>
        This turned out to be mostly wrong. A 2013 meta-analysis by Schoenfeld, Aragon, and Krieger
        in the Journal of the International Society of Sports Nutrition examined the effect of
        protein timing on muscle growth and strength. They found that the apparent benefits of
        immediate post-workout protein disappeared once total daily protein intake was controlled
        for.
      </p>

      <p>
        In other words: people who ate more protein around their workouts tended to eat more protein
        overall. And it was the total daily amount, not the timing, that drove the results.
      </p>

      <p>
        Does this mean timing is completely irrelevant? Not quite. If you train fasted or have not
        eaten in 4 to 5 hours before training, getting protein relatively soon after your session
        makes more sense. And distributing protein across 3 to 4 meals throughout the day may be
        slightly better than cramming it all into one or two meals, based on muscle protein
        synthesis research.
      </p>

      <p>
        But the differences are small compared to simply hitting your total daily target. If you eat
        1.6 g/kg spread across your normal meals, you are getting 90% of the benefit regardless of
        when exactly those meals fall relative to your workout.
      </p>

      <AdBlock format="horizontal" />

      <h2 className="text-3xl font-bold mt-12 mb-6 text-gray-900 dark:text-white">
        Carbohydrates: Not Evil, Not Essential
      </h2>

      <p>
        Carbohydrates are the most contested macronutrient. They have been blamed for obesity,
        diabetes, inflammation, cancer, and essentially everything short of natural disasters. Let
        me try to separate the evidence from the ideology.
      </p>

      <h3 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white">
        The insulin hypothesis is wrong
      </h3>

      <p>
        The popular version goes like this: carbs spike insulin, insulin promotes fat storage,
        therefore carbs make you fat. It sounds logical. It has been promoted by best-selling books
        for decades. And it is wrong.
      </p>

      <p>
        Kevin Hall at the National Institutes of Health directly tested this hypothesis in a 2017
        metabolic ward study published in the American Journal of Clinical Nutrition. Participants
        lived in a locked metabolic ward for four weeks (meaning their food intake was precisely
        controlled). They spent two weeks on a high-carb diet and two weeks on a ketogenic diet with
        the same total calories.
      </p>

      <p>
        If the insulin hypothesis were correct, the low-carb diet should have produced significantly
        more fat loss due to lower insulin levels. It did not. Fat loss was virtually identical
        between the two conditions. The body lost the same amount of fat regardless of insulin
        levels, as long as total calories were the same.
      </p>

      <p>
        Hall followed this up with a 2021 study in Nature Medicine comparing an ad libitum (eat as
        much as you want) low-fat diet versus a low-carb diet. Participants on the low-fat diet
        spontaneously ate fewer calories and lost more body fat, despite eating more carbs and
        having higher insulin levels. This is the opposite of what the carbohydrate-insulin model
        predicts.
      </p>

      <p>
        I want to be clear about my position: low-carb diets work for many people. But they work
        because people eat fewer total calories on them (protein and fat are satiating, and
        restricting an entire macronutrient category naturally limits intake), not because of some
        special insulin-mediated mechanism.
      </p>

      <h3 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white">
        When carbs matter most
      </h3>

      <p>
        Carbohydrates are your body&apos;s preferred fuel source for high-intensity exercise.
        Glycogen (stored carbohydrate in muscle and liver) powers sprinting, heavy lifting, HIIT,
        and any activity above about 70% of maximum effort.
      </p>

      <p>
        If you are a recreational lifter doing 3 to 4 sessions per week, moderate carb intake
        (around 3 to 5 g/kg body weight) is generally sufficient. If you are an endurance athlete or
        training at high volumes, you need more (5 to 8 g/kg or higher). If you are sedentary and
        your primary goal is fat loss, you can go lower without performance consequences, because
        there is not much performance to fuel.
      </p>

      <p>
        Our{' '}
        <Link href="/carb-intake" className="text-blue-600 dark:text-blue-400 hover:underline">
          carb intake calculator
        </Link>{' '}
        can help you find an appropriate range based on your activity level.
      </p>

      <h2 className="text-3xl font-bold mt-12 mb-6 text-gray-900 dark:text-white">
        Fat: The Minimum You Need (And Why It Matters)
      </h2>

      <p>
        Dietary fat is essential. Your body cannot make certain fatty acids on its own, fat is
        required for the absorption of vitamins A, D, E, and K, and it is the precursor to steroid
        hormones including testosterone and estrogen.
      </p>

      <p>
        Going too low on fat has real consequences. Research consistently shows that fat intake
        below approximately 20% of total calories can disrupt hormone production. A 2021 study by
        Whittaker and Harris in the Journal of Steroid Biochemistry and Molecular Biology found that
        men who consumed less than 20% of calories from fat had significantly lower testosterone
        levels compared to those consuming 30 to 40%.
      </p>

      <p>
        For most people, 25 to 35% of total calories from fat is a good target. That is enough to
        support hormonal function and vitamin absorption while leaving room for adequate protein and
        carbs. Use our{' '}
        <Link href="/fat-intake" className="text-blue-600 dark:text-blue-400 hover:underline">
          fat intake calculator
        </Link>{' '}
        to find your range.
      </p>

      <h3 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white">
        Types of fat: a quick orientation
      </h3>

      <p>
        Not all dietary fats are created equal, and this is one area where I think the evidence is
        strong enough to take a position.
      </p>

      <p>
        <strong>Trans fats</strong> are unambiguously harmful. Industrial trans fats increase LDL
        cholesterol, decrease HDL cholesterol, and increase cardiovascular disease risk. Most
        countries have banned or severely restricted them. Avoid them.
      </p>

      <p>
        <strong>Saturated fat</strong> is more nuanced than the messaging suggests. The American
        Heart Association recommends limiting saturated fat to less than 10% of calories. But a 2020
        Cochrane review found that while reducing saturated fat lowered blood cholesterol, the
        evidence linking saturated fat reduction directly to cardiovascular events was less
        consistent than commonly stated. It is probably wise to not go overboard, but moderate
        saturated fat intake within a balanced diet is not the death sentence it was once made out
        to be.
      </p>

      <p>
        <strong>Monounsaturated and polyunsaturated fats</strong> (olive oil, nuts, avocados, fatty
        fish) have the strongest evidence for health benefits. Omega-3 fatty acids in particular
        have strong evidence for reducing inflammation and cardiovascular risk.
      </p>

      <AdBlock format="horizontal" />

      <h2 className="text-3xl font-bold mt-12 mb-6 text-gray-900 dark:text-white">
        Fiber: The Nutrient Nobody Eats Enough Of
      </h2>

      <p>
        If I had to pick the single nutrient that most people should eat more of, it would not be
        protein. It would be fiber.
      </p>

      <p>
        A 2019 meta-analysis commissioned by the World Health Organization and published in The
        Lancet (Reynolds et al.) analyzed 185 prospective studies and 58 clinical trials with a
        combined 4,635 adult participants.
      </p>

      <p>
        Every 8-gram increase in daily fiber intake was associated with a 5 to 27% reduction in
        incidence of coronary heart disease, type 2 diabetes, colorectal cancer, and all-cause
        mortality. The dose-response relationship was consistent: more fiber was better, with the
        most benefit seen at intakes of 25 to 29 grams per day, and additional benefit beyond 30
        grams.
      </p>

      <p>
        Most Americans eat about 15 grams per day. Most Europeans are in a similar range. That is
        roughly half the minimum recommended intake.
      </p>

      <p>
        Fiber works through multiple mechanisms. It feeds beneficial gut bacteria (which produce
        short-chain fatty acids with anti-inflammatory properties). It slows the absorption of
        glucose, blunting blood sugar spikes. It increases satiety, helping with appetite control.
        And it improves bowel regularity, which reduces colorectal cancer risk.
      </p>

      <p>
        The best sources are whole grains, legumes, vegetables, fruits, nuts, and seeds. If your
        current intake is low, increase gradually (jumping from 15 to 35 grams overnight will make
        you miserable). Add 5 grams per week until you reach at least 25 to 30 grams daily.
      </p>

      <h2 className="text-3xl font-bold mt-12 mb-6 text-gray-900 dark:text-white">
        Macro Ratios vs. Total Calories: Which Matters More?
      </h2>

      <p>
        This is one of the most common questions in nutrition, and the answer depends on your goal.
      </p>

      <p>
        <strong>For weight loss:</strong> Total calories matter more. As the metabolic ward studies
        and diet comparison research show, the specific ratio of carbs to fat does not meaningfully
        affect fat loss when calories are matched. What matters is the deficit. However, within that
        calorie budget, higher protein is better for preserving muscle and controlling appetite.
      </p>

      <p>
        <strong>For muscle gain:</strong> Protein takes priority. You need a calorie surplus (or at
        least maintenance) plus sufficient protein to support muscle protein synthesis. The ratio of
        carbs to fat filling the rest of your calories is less important, though carbs support
        training performance.
      </p>

      <p>
        <strong>For athletic performance:</strong> Carb intake becomes much more important. Glycogen
        fuels high-intensity work. Athletes who chronically undereat carbs often see performance
        declines, impaired recovery, and increased injury risk. For serious athletes, macro ratios
        matter more than they do for the general population.
      </p>

      <p>
        <strong>For general health:</strong> The quality of your macros matters more than the exact
        ratios. Whole food sources of protein, carbs, and fat will serve you better than processed
        alternatives regardless of the percentages.
      </p>

      <h2 className="text-3xl font-bold mt-12 mb-6 text-gray-900 dark:text-white">
        Practical Macro Templates
      </h2>

      <p>
        Here are starting-point macro splits for different goals. These are templates, not
        commandments. Adjust based on how you feel, perform, and respond.
      </p>

      <div className="overflow-x-auto my-8">
        <table className="w-full border-collapse neumorph-card rounded-xl overflow-hidden">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-800">
              <th className="p-4 text-left font-semibold text-gray-900 dark:text-white">Goal</th>
              <th className="p-4 text-left font-semibold text-gray-900 dark:text-white">Protein</th>
              <th className="p-4 text-left font-semibold text-gray-900 dark:text-white">Carbs</th>
              <th className="p-4 text-left font-semibold text-gray-900 dark:text-white">Fat</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 dark:text-gray-300">
            <tr className="border-t border-gray-200 dark:border-gray-700">
              <td className="p-4 font-medium">Fat loss (active)</td>
              <td className="p-4">30-35%</td>
              <td className="p-4">35-40%</td>
              <td className="p-4">25-30%</td>
            </tr>
            <tr className="border-t border-gray-200 dark:border-gray-700">
              <td className="p-4 font-medium">Fat loss (low-carb)</td>
              <td className="p-4">30-35%</td>
              <td className="p-4">15-25%</td>
              <td className="p-4">40-50%</td>
            </tr>
            <tr className="border-t border-gray-200 dark:border-gray-700">
              <td className="p-4 font-medium">Muscle gain</td>
              <td className="p-4">25-30%</td>
              <td className="p-4">40-50%</td>
              <td className="p-4">20-30%</td>
            </tr>
            <tr className="border-t border-gray-200 dark:border-gray-700">
              <td className="p-4 font-medium">Maintenance</td>
              <td className="p-4">25-30%</td>
              <td className="p-4">35-45%</td>
              <td className="p-4">25-35%</td>
            </tr>
            <tr className="border-t border-gray-200 dark:border-gray-700">
              <td className="p-4 font-medium">Endurance athlete</td>
              <td className="p-4">15-20%</td>
              <td className="p-4">50-60%</td>
              <td className="p-4">20-30%</td>
            </tr>
            <tr className="border-t border-gray-200 dark:border-gray-700">
              <td className="p-4 font-medium">Keto</td>
              <td className="p-4">20-25%</td>
              <td className="p-4">5-10%</td>
              <td className="p-4">65-75%</td>
            </tr>
          </tbody>
        </table>
      </div>

      <p>
        Notice how protein stays relatively high across all templates. That is intentional. The
        evidence for adequate protein is consistent across goals. The carb-to-fat ratio is where you
        have the most flexibility.
      </p>

      <h2 className="text-3xl font-bold mt-12 mb-6 text-gray-900 dark:text-white">
        How to Actually Set Your Macros
      </h2>

      <p>Here is the order of operations I recommend.</p>

      <p>
        <strong>Step 1: Set your calories.</strong> Use a{' '}
        <Link href="/tdee" className="text-blue-600 dark:text-blue-400 hover:underline">
          TDEE calculator
        </Link>{' '}
        to estimate your maintenance calories. Adjust up or down based on your goal (deficit for fat
        loss, surplus for muscle gain, maintenance for recomposition).
      </p>

      <p>
        <strong>Step 2: Set protein first.</strong> Multiply your body weight in kilograms by 1.6 to
        2.2. This is your daily protein target in grams. Each gram of protein has 4 calories.
      </p>

      <p>
        <strong>Step 3: Set fat at a minimum.</strong> Aim for at least 0.7 to 1.0 g per kg of body
        weight, or about 25 to 30% of total calories. Each gram of fat has 9 calories.
      </p>

      <p>
        <strong>Step 4: Fill the rest with carbs.</strong> Whatever calories remain after protein
        and fat go to carbohydrates. Each gram of carbs has 4 calories. If you prefer lower carbs,
        shift some of these calories to additional fat.
      </p>

      <p>
        Our{' '}
        <Link href="/macro" className="text-blue-600 dark:text-blue-400 hover:underline">
          macro calculator
        </Link>{' '}
        does this math for you. If you are specifically interested in a ketogenic approach, our{' '}
        <Link href="/keto-calculator" className="text-blue-600 dark:text-blue-400 hover:underline">
          keto calculator
        </Link>{' '}
        will set appropriate ratios.
      </p>

      <AdBlock format="horizontal" />

      <h2 className="text-3xl font-bold mt-12 mb-6 text-gray-900 dark:text-white">
        The Bottom Line
      </h2>

      <p>
        Macronutrients are tools. Protein builds and repairs tissue. Carbohydrates are your fuel for
        anything intense. Fat keeps your hormones working and helps you absorb key vitamins. Fiber
        feeds your gut bacteria and has the best evidence base of any nutrient for disease
        prevention. None of them is the enemy.
      </p>

      <p>
        The most useful thing you can do is stop sorting macros into good and evil and start
        thinking about how much of each one actually serves what you are trying to do. Get your
        protein up first. Make sure fat does not drop too low. Adjust carbs based on how much you
        train and what you prefer. And eat more fiber than you currently do, because you almost
        certainly are not eating enough.
      </p>

      <p>
        That is less exciting than a manifesto declaring war on a specific nutrient. But it is what
        the research consistently supports, and you can actually sustain it.
      </p>

      <div className="neumorph-card rounded-xl p-6 my-8">
        <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
          Calculate Your Macros
        </h3>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          Get personalized macro targets based on your body, activity level, and goals.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/macro"
            className="neumorph-button px-4 py-2 rounded-lg text-sm font-medium hover:scale-105 transition-transform"
          >
            Macro Calculator
          </Link>
          <Link
            href="/protein"
            className="neumorph-button px-4 py-2 rounded-lg text-sm font-medium hover:scale-105 transition-transform"
          >
            Protein Calculator
          </Link>
          <Link
            href="/fat-intake"
            className="neumorph-button px-4 py-2 rounded-lg text-sm font-medium hover:scale-105 transition-transform"
          >
            Fat Intake Calculator
          </Link>
          <Link
            href="/keto-calculator"
            className="neumorph-button px-4 py-2 rounded-lg text-sm font-medium hover:scale-105 transition-transform"
          >
            Keto Calculator
          </Link>
        </div>
      </div>

      <h2 className="text-3xl font-bold mt-12 mb-6 text-gray-900 dark:text-white">References</h2>

      <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
        <li>
          Morton RW, et al. &quot;A systematic review, meta-analysis and meta-regression of the
          effect of protein supplementation on resistance training-induced gains in muscle mass and
          strength.&quot; British Journal of Sports Medicine, 2018.
        </li>
        <li>
          Bauer J, et al. &quot;Evidence-based recommendations for optimal dietary protein intake in
          older people: a position paper from the PROT-AGE study group.&quot; Journal of the
          American Medical Directors Association, 2013.
        </li>
        <li>
          Schoenfeld BJ, Aragon AA, Krieger JW. &quot;The effect of protein timing on muscle
          strength and hypertrophy: a meta-analysis.&quot; Journal of the International Society of
          Sports Nutrition, 2013.
        </li>
        <li>
          Hall KD, et al. &quot;Energy expenditure and body composition changes after an isocaloric
          ketogenic diet in overweight and obese men.&quot; American Journal of Clinical Nutrition,
          2016.
        </li>
        <li>
          Hall KD, et al. &quot;Effect of a plant-based, low-fat diet versus an animal-based,
          ketogenic diet on ad libitum energy intake.&quot; Nature Medicine, 2021.
        </li>
        <li>
          Reynolds A, et al. &quot;Carbohydrate quality and human health: a series of systematic
          reviews and meta-analyses.&quot; The Lancet, 2019.
        </li>
        <li>
          Whittaker J, Harris M. &quot;Low-fat diets and testosterone in men.&quot; Journal of
          Steroid Biochemistry and Molecular Biology, 2021.
        </li>
        <li>
          Hooper L, et al. &quot;Reduction in saturated fat intake for cardiovascular disease.&quot;
          Cochrane Database of Systematic Reviews, 2020.
        </li>
      </ul>
    </div>
  </article>
);

export default function CompleteGuideToMacronutrientsPage() {
  return CompleteGuideToMacronutrientsPageContent;
}
