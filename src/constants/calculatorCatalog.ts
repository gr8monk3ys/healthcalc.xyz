export interface CalculatorHub {
  slug: string;
  title: string;
  description: string;
}

export interface CalculatorCatalogItem {
  slug: string;
  title: string;
  description: string;
  category: string;
  hub: string;
  image: string;
  detail?: {
    intro: string;
    highlights: string[];
    faqs: { question: string; answer: string }[];
    relatedCalculators: string[];
    relatedGuides: string[];
  };
}

export const CALCULATOR_HUBS: CalculatorHub[] = [
  {
    slug: 'weight-loss',
    title: 'Weight Loss & Management',
    description: 'Plan sustainable fat loss with calorie, activity, and timeline tools.',
  },
  {
    slug: 'body-composition',
    title: 'Body Composition',
    description:
      'Understand body fat, shape, and healthy weight ranges with science-backed metrics.',
  },
  {
    slug: 'metabolism-energy',
    title: 'Metabolism & Energy',
    description: 'Calculate calories burned at rest and across daily activity.',
  },
  {
    slug: 'nutrition',
    title: 'Nutrition & Macros',
    description: 'Set protein and macro targets for weight loss, maintenance, or muscle gain.',
  },
  {
    slug: 'performance',
    title: 'Performance & Training',
    description: 'Optimize workouts with pacing, heart rate, and strength tools.',
  },
  {
    slug: 'wellness-recovery',
    title: 'Wellness & Recovery',
    description: 'Support hydration and sleep with daily recovery targets.',
  },
  {
    slug: 'pregnancy',
    title: 'Pregnancy & Fertility',
    description: 'Track due dates and ovulation windows with confidence.',
  },
  {
    slug: 'health-vitals',
    title: 'Health & Vitals',
    description: 'Monitor key vitals like blood pressure with clear categories.',
  },
  {
    slug: 'utilities',
    title: 'Utilities',
    description: 'Quick conversions for weight, height, and fitness-related units.',
  },
];

const IMAGE_OVERRIDES: Record<string, string> = {
  conversions: '/images/calculators/conversions-calculator.jpg',
};

const getCalculatorImage = (slug: string) =>
  IMAGE_OVERRIDES[slug] || `/images/calculators/${slug}-calculator.jpg`;

export const CALCULATOR_CATALOG: CalculatorCatalogItem[] = [
  {
    slug: 'bmi',
    title: 'BMI Calculator',
    description: 'Calculate your Body Mass Index to assess your weight relative to height.',
    category: 'Body Composition',
    hub: 'body-composition',
    image: getCalculatorImage('bmi'),
    detail: {
      intro:
        'Use BMI to quickly estimate whether your weight is in a healthy range for your height.',
      highlights: [
        'Supports metric and imperial inputs.',
        'Shows BMI category and healthy weight range.',
        'Great first check before deeper body composition analysis.',
      ],
      faqs: [
        {
          question: 'Is BMI accurate for athletes?',
          answer:
            'BMI is a helpful screening tool, but it can overestimate risk for muscular athletes. Pair it with body fat or waist-based metrics for better context.',
        },
        {
          question: 'What is a healthy BMI range?',
          answer:
            'Most guidelines cite 18.5–24.9 as the general healthy range for adults, but individual factors still matter.',
        },
      ],
      relatedCalculators: ['body-fat', 'whr', 'absi', 'lean-body-mass'],
      relatedGuides: ['/learn/body-composition-guide', '/learn/calorie-basics'],
    },
  },
  {
    slug: 'body-fat',
    title: 'Body Fat Calculator',
    description: 'Estimate body fat percentage using Navy, skinfold, or BMI methods.',
    category: 'Body Composition',
    hub: 'body-composition',
    image: getCalculatorImage('body-fat'),
    detail: {
      intro:
        'Estimate body fat percentage using Navy, BMI-based, or manual inputs to understand fat vs lean mass.',
      highlights: [
        'Multiple calculation methods for flexibility.',
        'Explains body fat categories by gender.',
        'Pairs well with BMI and lean mass calculators.',
      ],
      faqs: [
        {
          question: 'Which body fat method is most accurate?',
          answer:
            'DEXA and hydrostatic weighing are most accurate, but the Navy method is a practical, reliable option for most people.',
        },
        {
          question: 'How often should I measure body fat?',
          answer: 'Every 2–4 weeks is typical; consistency matters more than frequency.',
        },
      ],
      relatedCalculators: ['bmi', 'lean-body-mass', 'body-frame-size', 'absi'],
      relatedGuides: ['/learn/body-composition-guide'],
    },
  },
  {
    slug: 'body-frame-size',
    title: 'Body Frame Size Calculator',
    description: 'Determine body frame size using height and wrist circumference.',
    category: 'Body Composition',
    hub: 'body-composition',
    image: getCalculatorImage('body-frame-size'),
  },
  {
    slug: 'army-body-fat',
    title: 'Army Body Fat Calculator',
    description: 'Estimate body fat using the U.S. Army circumference method.',
    category: 'Body Composition',
    hub: 'body-composition',
    image: getCalculatorImage('army-body-fat'),
  },
  {
    slug: 'absi',
    title: 'ABSI Calculator',
    description: 'Assess health risk using A Body Shape Index.',
    category: 'Body Composition',
    hub: 'body-composition',
    image: getCalculatorImage('absi'),
    detail: {
      intro: 'Use ABSI to assess central obesity risk based on waist circumference and height.',
      highlights: [
        'Highlights abdominal fat risk.',
        'Pairs with BMI and WHR for fuller context.',
        'Simple inputs with clear risk categories.',
      ],
      faqs: [
        {
          question: 'Is ABSI better than BMI?',
          answer: 'ABSI can better reflect abdominal fat risk, but it works best alongside BMI.',
        },
        {
          question: 'What inputs do I need?',
          answer: 'You only need height, weight, and waist circumference.',
        },
      ],
      relatedCalculators: ['whr', 'bmi', 'body-fat', 'waist-to-height-ratio'],
      relatedGuides: ['/learn/body-composition-guide'],
    },
  },
  {
    slug: 'whr',
    title: 'Waist-to-Hip Ratio Calculator',
    description: 'Evaluate body fat distribution and risk with WHR.',
    category: 'Body Composition',
    hub: 'body-composition',
    image: getCalculatorImage('whr'),
    detail: {
      intro: 'Calculate waist-to-hip ratio to understand fat distribution and health risk.',
      highlights: [
        'Quick abdominal fat risk check.',
        'Easy to measure with a tape.',
        'Pairs well with ABSI and BMI.',
      ],
      faqs: [
        {
          question: 'What WHR indicates higher risk?',
          answer: 'Common cutoffs are >0.90 for men and >0.85 for women, but guidelines vary.',
        },
        {
          question: 'Is WHR better than waist alone?',
          answer: 'It adds hip context, which can improve risk assessment.',
        },
      ],
      relatedCalculators: ['absi', 'waist-to-height-ratio', 'body-fat', 'bmi'],
      relatedGuides: ['/learn/body-composition-guide'],
    },
  },
  {
    slug: 'waist-to-height-ratio',
    title: 'Waist-to-Height Ratio Calculator',
    description: 'Assess central body fat with a waist-to-height ratio.',
    category: 'Body Composition',
    hub: 'body-composition',
    image: getCalculatorImage('waist-to-height-ratio'),
  },
  {
    slug: 'ideal-weight',
    title: 'Ideal Weight Calculator',
    description: 'Estimate healthy weight ranges using common formulas.',
    category: 'Body Composition',
    hub: 'body-composition',
    image: getCalculatorImage('ideal-weight'),
  },
  {
    slug: 'adjusted-body-weight',
    title: 'Adjusted Body Weight Calculator',
    description: 'Estimate adjusted body weight using clinical formulas.',
    category: 'Body Composition',
    hub: 'body-composition',
    image: getCalculatorImage('adjusted-body-weight'),
  },
  {
    slug: 'body-surface-area',
    title: 'Body Surface Area Calculator',
    description: 'Estimate body surface area from height and weight.',
    category: 'Body Composition',
    hub: 'body-composition',
    image: getCalculatorImage('body-surface-area'),
  },
  {
    slug: 'lean-body-mass',
    title: 'Lean Body Mass Calculator',
    description: 'Estimate lean body mass based on height and weight.',
    category: 'Body Composition',
    hub: 'body-composition',
    image: getCalculatorImage('lean-body-mass'),
  },
  {
    slug: 'tdee',
    title: 'TDEE Calculator',
    description: 'Calculate total daily energy expenditure and maintenance calories.',
    category: 'Energy Expenditure',
    hub: 'metabolism-energy',
    image: getCalculatorImage('tdee'),
    detail: {
      intro:
        'Estimate how many calories you burn each day based on activity level to plan maintenance, loss, or gain.',
      highlights: [
        'Activity-based multipliers for realistic daily burn.',
        'Great starting point for fat loss or muscle gain plans.',
        'Pairs with calorie deficit and weight management tools.',
      ],
      faqs: [
        {
          question: 'How often should I recalculate TDEE?',
          answer: 'Recalculate every 10–15 lbs of weight change or every few months if stable.',
        },
        {
          question: 'Why do TDEE calculators differ?',
          answer:
            'Different formulas and activity assumptions can shift results by 100–300 calories.',
        },
      ],
      relatedCalculators: ['calorie', 'calorie-deficit', 'weight-management', 'maximum-fat-loss'],
      relatedGuides: ['/learn/calorie-basics', '/learn/macro-planning'],
    },
  },
  {
    slug: 'calorie',
    title: 'Calorie Calculator',
    description: 'Estimate daily calorie needs for maintenance, loss, or gain.',
    category: 'Energy Expenditure',
    hub: 'metabolism-energy',
    image: getCalculatorImage('calorie'),
    detail: {
      intro: 'Get a daily calorie target for your goal—maintain weight, lose fat, or gain muscle.',
      highlights: [
        'Personalized calorie targets by goal.',
        'Pairs with macro and protein calculators.',
        'Easy starting point for nutrition planning.',
      ],
      faqs: [
        {
          question: 'How big of a deficit should I use?',
          answer: 'A 10–20% deficit is common for sustainable fat loss without excessive fatigue.',
        },
        {
          question: 'Do calories change as I lose weight?',
          answer: 'Yes—your calorie needs decrease as body weight drops, so revisit your targets.',
        },
      ],
      relatedCalculators: ['tdee', 'calorie-deficit', 'macro', 'protein'],
      relatedGuides: ['/learn/calorie-basics', '/learn/macro-planning'],
    },
  },
  {
    slug: 'bmr',
    title: 'BMR Calculator',
    description: 'Estimate calories your body burns at rest.',
    category: 'Metabolism',
    hub: 'metabolism-energy',
    image: getCalculatorImage('bmr'),
  },
  {
    slug: 'calorie-deficit',
    title: 'Calorie Deficit Calculator',
    description: 'Plan safe weight loss with a personalized deficit.',
    category: 'Weight Management',
    hub: 'weight-loss',
    image: getCalculatorImage('calorie-deficit'),
    detail: {
      intro:
        'Estimate how long it will take to reach your goal weight using different deficit sizes.',
      highlights: [
        'Timeline projections for goal weight.',
        'Deficit ranges for sustainable fat loss.',
        'Connects to TDEE and weight management planning.',
      ],
      faqs: [
        {
          question: 'Is a 500-calorie deficit safe?',
          answer:
            'For many adults it is, but your ideal deficit depends on body size, activity, and goals.',
        },
        {
          question: 'Why does weight loss slow down?',
          answer: 'As you lose weight, your maintenance calories drop—recalculate periodically.',
        },
      ],
      relatedCalculators: ['tdee', 'weight-management', 'maximum-fat-loss', 'calorie'],
      relatedGuides: ['/learn/calorie-basics'],
    },
  },
  {
    slug: 'weight-management',
    title: 'Weight Management Calculator',
    description: 'Build a weight change plan with a target date.',
    category: 'Weight Management',
    hub: 'weight-loss',
    image: getCalculatorImage('weight-management'),
    detail: {
      intro: 'Build a timeline-based plan to lose or gain weight with daily calorie targets.',
      highlights: [
        'Target-date planning for weight change.',
        'Personalized daily calorie recommendations.',
        'Pairs with deficit and macro calculators.',
      ],
      faqs: [
        {
          question: 'How aggressive should my timeline be?',
          answer: 'Aim for 0.5–1% of body weight per week for sustainable changes.',
        },
        {
          question: 'Do I need to update the plan?',
          answer: 'Yes—adjust every few weeks as your weight and activity change.',
        },
      ],
      relatedCalculators: ['calorie-deficit', 'tdee', 'macro', 'protein'],
      relatedGuides: ['/learn/calorie-basics', '/learn/macro-planning'],
    },
  },
  {
    slug: 'maximum-fat-loss',
    title: 'Maximum Fat Loss Calculator',
    description: 'Find a sustainable rate of fat loss based on body composition.',
    category: 'Weight Management',
    hub: 'weight-loss',
    image: getCalculatorImage('maximum-fat-loss'),
    detail: {
      intro: 'Find the most aggressive deficit that still preserves muscle and performance.',
      highlights: [
        'Optimized cutting calories.',
        'Balances fat loss with muscle retention.',
        'Useful for short-term cut planning.',
      ],
      faqs: [
        {
          question: 'Is maximum fat loss sustainable long term?',
          answer: 'It is designed for short phases—transition to a moderate deficit afterward.',
        },
        {
          question: 'How do I preserve muscle while cutting?',
          answer: 'Keep protein high and prioritize resistance training.',
        },
      ],
      relatedCalculators: ['calorie-deficit', 'tdee', 'weight-management', 'protein'],
      relatedGuides: ['/learn/calorie-basics', '/learn/macro-planning'],
    },
  },
  {
    slug: 'body-fat-burn',
    title: 'Body Fat Burn Calculator',
    description: 'Estimate calories burned during activities and fat-loss timelines.',
    category: 'Weight Management',
    hub: 'weight-loss',
    image: getCalculatorImage('body-fat-burn'),
  },
  {
    slug: 'macro',
    title: 'Macro Calculator',
    description: 'Set daily protein, carbs, and fat targets.',
    category: 'Nutrition',
    hub: 'nutrition',
    image: getCalculatorImage('macro'),
  },
  {
    slug: 'carb-intake',
    title: 'Carb Intake Calculator',
    description: 'Set daily carbohydrate targets from calories.',
    category: 'Nutrition',
    hub: 'nutrition',
    image: getCalculatorImage('carb-intake'),
  },
  {
    slug: 'fat-intake',
    title: 'Fat Intake Calculator',
    description: 'Set daily fat targets from calories.',
    category: 'Nutrition',
    hub: 'nutrition',
    image: getCalculatorImage('fat-intake'),
  },
  {
    slug: 'protein',
    title: 'Protein Intake Calculator',
    description: 'Estimate daily protein needs for your goals.',
    category: 'Nutrition',
    hub: 'nutrition',
    image: getCalculatorImage('protein'),
  },
  {
    slug: 'one-rep-max',
    title: 'One Rep Max Calculator',
    description: 'Estimate 1RM and training zones safely.',
    category: 'Performance',
    hub: 'performance',
    image: getCalculatorImage('one-rep-max'),
  },
  {
    slug: 'heart-rate-zones',
    title: 'Heart Rate Zones Calculator',
    description: 'Calculate training zones from max or resting heart rate.',
    category: 'Performance',
    hub: 'performance',
    image: getCalculatorImage('heart-rate-zones'),
  },
  {
    slug: 'target-heart-rate',
    title: 'Target Heart Rate Calculator',
    description: 'Calculate target heart rate ranges for cardio training.',
    category: 'Performance',
    hub: 'performance',
    image: getCalculatorImage('target-heart-rate'),
  },
  {
    slug: 'max-heart-rate',
    title: 'Max Heart Rate Calculator',
    description: 'Estimate max heart rate using age-based formulas.',
    category: 'Performance',
    hub: 'performance',
    image: getCalculatorImage('max-heart-rate'),
  },
  {
    slug: 'vo2-max',
    title: 'VO2 Max Calculator',
    description: 'Estimate cardiovascular fitness using the Rockport test.',
    category: 'Performance',
    hub: 'performance',
    image: getCalculatorImage('vo2-max'),
  },
  {
    slug: 'running-pace',
    title: 'Running Pace Calculator',
    description: 'Convert time and distance into pace and speed.',
    category: 'Performance',
    hub: 'performance',
    image: getCalculatorImage('running-pace'),
  },
  {
    slug: 'calories-burned',
    title: 'Calories Burned Calculator',
    description: 'Estimate workout calorie burn from activity and time.',
    category: 'Performance',
    hub: 'performance',
    image: getCalculatorImage('calories-burned'),
  },
  {
    slug: 'calories-burned-walking',
    title: 'Calories Burned Walking Calculator',
    description: 'Estimate calories burned while walking.',
    category: 'Performance',
    hub: 'performance',
    image: getCalculatorImage('calories-burned-walking'),
  },
  {
    slug: 'calories-burned-running',
    title: 'Calories Burned Running Calculator',
    description: 'Estimate calories burned while running.',
    category: 'Performance',
    hub: 'performance',
    image: getCalculatorImage('calories-burned-running'),
  },
  {
    slug: 'calories-burned-cycling',
    title: 'Calories Burned Cycling Calculator',
    description: 'Estimate calories burned while cycling.',
    category: 'Performance',
    hub: 'performance',
    image: getCalculatorImage('calories-burned-cycling'),
  },
  {
    slug: 'calories-burned-swimming',
    title: 'Calories Burned Swimming Calculator',
    description: 'Estimate calories burned while swimming.',
    category: 'Performance',
    hub: 'performance',
    image: getCalculatorImage('calories-burned-swimming'),
  },
  {
    slug: 'steps-to-calories',
    title: 'Steps to Calories Calculator',
    description: 'Estimate calories burned from daily steps.',
    category: 'Performance',
    hub: 'performance',
    image: getCalculatorImage('steps-to-calories'),
  },
  {
    slug: 'water-intake',
    title: 'Water Intake Calculator',
    description: 'Estimate daily hydration targets based on weight and activity.',
    category: 'Wellness',
    hub: 'wellness-recovery',
    image: getCalculatorImage('water-intake'),
  },
  {
    slug: 'sleep',
    title: 'Sleep Calculator',
    description: 'Plan sleep cycles and ideal bedtimes.',
    category: 'Recovery',
    hub: 'wellness-recovery',
    image: getCalculatorImage('sleep'),
  },
  {
    slug: 'pregnancy-due-date',
    title: 'Pregnancy Due Date Calculator',
    description: 'Estimate due date from last period or conception.',
    category: 'Pregnancy',
    hub: 'pregnancy',
    image: getCalculatorImage('pregnancy-due-date'),
  },
  {
    slug: 'due-date-by-conception',
    title: 'Due Date by Conception Calculator',
    description: 'Estimate due date from conception date.',
    category: 'Pregnancy',
    hub: 'pregnancy',
    image: getCalculatorImage('due-date-by-conception'),
  },
  {
    slug: 'pregnancy-weight-gain',
    title: 'Pregnancy Weight Gain Calculator',
    description: 'Estimate recommended pregnancy weight gain ranges.',
    category: 'Pregnancy',
    hub: 'pregnancy',
    image: getCalculatorImage('pregnancy-weight-gain'),
  },
  {
    slug: 'ovulation',
    title: 'Ovulation Calculator',
    description: 'Estimate fertile window and ovulation date.',
    category: 'Pregnancy',
    hub: 'pregnancy',
    image: getCalculatorImage('ovulation'),
  },
  {
    slug: 'blood-pressure',
    title: 'Blood Pressure Calculator',
    description: 'Check your blood pressure category and ranges.',
    category: 'Health',
    hub: 'health-vitals',
    image: getCalculatorImage('blood-pressure'),
  },
  {
    slug: 'resting-heart-rate',
    title: 'Resting Heart Rate Calculator',
    description: 'Evaluate resting heart rate and fitness category.',
    category: 'Health',
    hub: 'health-vitals',
    image: getCalculatorImage('resting-heart-rate'),
  },
  {
    slug: 'conversions',
    title: 'Measurement Conversions',
    description: 'Convert weight, height, volume, and energy units quickly.',
    category: 'Utilities',
    hub: 'utilities',
    image: getCalculatorImage('conversions'),
    detail: {
      intro: 'Convert weight, height, volume, and temperature units quickly with a single tool.',
      highlights: [
        'Fast conversions for common fitness metrics.',
        'Supports metric and imperial units.',
        'Great companion for any calculator.',
      ],
      faqs: [
        {
          question: 'Which units are supported?',
          answer: 'Weight, height, volume, temperature, and several fitness-friendly units.',
        },
        {
          question: 'Do conversions affect calculator accuracy?',
          answer: 'Accurate conversions help ensure calculator inputs are consistent.',
        },
      ],
      relatedCalculators: ['bmi', 'tdee', 'body-fat', 'macro'],
      relatedGuides: ['/learn/calorie-basics'],
    },
  },
  {
    slug: 'age',
    title: 'Age Calculator',
    description: 'Calculate exact age in years, months, and days.',
    category: 'Utilities',
    hub: 'utilities',
    image: getCalculatorImage('age'),
  },
  {
    slug: 'steps-to-miles',
    title: 'Steps to Miles Calculator',
    description: 'Convert steps into miles or kilometers.',
    category: 'Utilities',
    hub: 'utilities',
    image: getCalculatorImage('steps-to-miles'),
  },
  {
    slug: 'ffmi',
    title: 'FFMI Calculator',
    description:
      'Calculate your Fat-Free Mass Index to assess muscular development relative to your height.',
    category: 'Body Composition',
    hub: 'body-composition',
    image: getCalculatorImage('ffmi'),
  },
  {
    slug: 'body-recomposition',
    title: 'Body Recomposition Calculator',
    description: 'Get calorie and macro targets to build muscle and lose fat simultaneously.',
    category: 'Body Composition',
    hub: 'body-composition',
    image: getCalculatorImage('body-recomposition'),
  },
  {
    slug: 'intermittent-fasting',
    title: 'Intermittent Fasting Calculator',
    description: 'Plan your eating window and calorie distribution for popular fasting protocols.',
    category: 'Nutrition & Macros',
    hub: 'nutrition',
    image: getCalculatorImage('intermittent-fasting'),
  },
  {
    slug: 'keto-calculator',
    title: 'Keto Macro Calculator',
    description: 'Calculate your ideal fat, protein, and carb macros for a ketogenic diet.',
    category: 'Nutrition & Macros',
    hub: 'nutrition',
    image: getCalculatorImage('keto-calculator'),
  },
  {
    slug: 'caffeine-calculator',
    title: 'Caffeine Intake Calculator',
    description:
      'Find your safe daily caffeine limit and optimal pre-workout timing based on body weight.',
    category: 'Wellness & Recovery',
    hub: 'wellness-recovery',
    image: getCalculatorImage('caffeine-calculator'),
  },
  {
    slug: 'glp1-calculator',
    title: 'GLP-1 Weight Loss Calculator',
    description:
      'Get personalized nutrition, protein, and hydration targets while on Ozempic, Wegovy, Mounjaro, or Zepbound.',
    category: 'Nutrition & Macros',
    hub: 'nutrition',
    image: getCalculatorImage('glp1'),
  },
  {
    slug: 'diabetes-risk-calculator',
    title: 'Diabetes Risk Calculator',
    description:
      'Assess your Type 2 diabetes risk using ADA-based scoring and convert A1C to estimated average glucose.',
    category: 'Health & Vitals',
    hub: 'health-vitals',
    image: getCalculatorImage('diabetes-risk'),
  },
  {
    slug: 'body-shape-calculator',
    title: 'Body Shape Calculator',
    description:
      'Classify your body shape (apple, pear, hourglass, rectangle) and somatotype with personalized fitness tips.',
    category: 'Body Composition',
    hub: 'body-composition',
    image: getCalculatorImage('body-shape'),
  },
  {
    slug: 'life-expectancy-calculator',
    title: 'Life Expectancy Calculator',
    description:
      'Estimate your life expectancy based on lifestyle factors including diet, exercise, sleep, and social connections.',
    category: 'Wellness & Recovery',
    hub: 'wellness-recovery',
    image: getCalculatorImage('life-expectancy'),
  },
  {
    slug: 'substance-impact-calculator',
    title: 'Alcohol & Smoking Impact Calculator',
    description:
      'Calculate the health, financial, and lifespan impact of alcohol consumption and tobacco use.',
    category: 'Wellness & Recovery',
    hub: 'wellness-recovery',
    image: getCalculatorImage('substance-impact'),
  },
  {
    slug: 'acft-calculator',
    title: 'ACFT Score Calculator',
    description:
      'Calculate your Army Combat Fitness Test score across all 6 events with gender-normed scoring tables.',
    category: 'Performance & Training',
    hub: 'performance',
    image: getCalculatorImage('acft'),
  },
];

export const getCalculatorHub = (slug: string) => CALCULATOR_HUBS.find(hub => hub.slug === slug);

export const getCalculatorsForHub = (hubSlug: string) =>
  CALCULATOR_CATALOG.filter(item => item.hub === hubSlug);

export const getCalculatorBySlug = (slug: string) =>
  CALCULATOR_CATALOG.find(item => item.slug === slug);
