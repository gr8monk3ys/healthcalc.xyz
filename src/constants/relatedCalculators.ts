export interface RelatedCalculator {
  slug: string;
  title: string;
  description: string;
}

const calculators: RelatedCalculator[] = [
  { slug: 'bmi', title: 'BMI Calculator', description: 'Calculate your Body Mass Index' },
  { slug: 'body-fat', title: 'Body Fat Calculator', description: 'Estimate body fat percentage' },
  { slug: 'absi', title: 'ABSI Calculator', description: 'Calculate A Body Shape Index' },
  { slug: 'whr', title: 'Waist-to-Hip Ratio', description: 'Assess fat distribution' },
  {
    slug: 'waist-to-height-ratio',
    title: 'Waist-to-Height Ratio',
    description: 'Assess central fat risk',
  },
  { slug: 'tdee', title: 'TDEE Calculator', description: 'Calculate daily calorie needs' },
  { slug: 'calorie', title: 'Calorie Calculator', description: 'Daily calorie targets' },
  {
    slug: 'calories-burned',
    title: 'Calories Burned',
    description: 'Estimate workout calorie burn',
  },
  {
    slug: 'calories-burned-cycling',
    title: 'Calories Burned Cycling',
    description: 'Cycling calorie estimate',
  },
  {
    slug: 'calories-burned-swimming',
    title: 'Calories Burned Swimming',
    description: 'Swimming calorie estimate',
  },
  {
    slug: 'calorie-deficit',
    title: 'Calorie Deficit Calculator',
    description: 'Plan your weight loss pace',
  },
  {
    slug: 'weight-management',
    title: 'Weight Management',
    description: 'Plan weight change with a target date',
  },
  { slug: 'maximum-fat-loss', title: 'Maximum Fat Loss', description: 'Optimize cutting calories' },
  { slug: 'macro', title: 'Macro Calculator', description: 'Set protein, carbs, and fat targets' },
  { slug: 'carb-intake', title: 'Carb Intake', description: 'Set daily carbs' },
  { slug: 'fat-intake', title: 'Fat Intake', description: 'Set daily fat targets' },
  {
    slug: 'protein',
    title: 'Protein Calculator',
    description: 'Get daily protein recommendations',
  },
  { slug: 'one-rep-max', title: 'One Rep Max', description: 'Estimate your max lift' },
  { slug: 'body-fat-burn', title: 'Body Fat Burn', description: 'Estimate calories burned' },
  { slug: 'conversions', title: 'Conversions', description: 'Unit conversions for health metrics' },
  {
    slug: 'ideal-weight',
    title: 'Ideal Weight Calculator',
    description: 'Estimate a healthy weight range',
  },
  { slug: 'lean-body-mass', title: 'Lean Body Mass', description: 'Estimate lean mass' },
  { slug: 'body-surface-area', title: 'Body Surface Area', description: 'Estimate BSA' },
  { slug: 'army-body-fat', title: 'Army Body Fat', description: 'Circumference-based body fat' },
  { slug: 'heart-rate-zones', title: 'Heart Rate Zones', description: 'Train smarter with zones' },
  { slug: 'target-heart-rate', title: 'Target Heart Rate', description: 'Find training zones' },
  { slug: 'bmr', title: 'BMR Calculator', description: 'Calculate calories burned at rest' },
  { slug: 'vo2-max', title: 'VO2 Max Calculator', description: 'Estimate cardio fitness' },
  {
    slug: 'running-pace',
    title: 'Running Pace Calculator',
    description: 'Calculate pace per mile or km',
  },
  {
    slug: 'water-intake',
    title: 'Water Intake Calculator',
    description: 'Daily hydration targets',
  },
  { slug: 'sleep', title: 'Sleep Calculator', description: 'Optimize sleep cycles' },
  {
    slug: 'blood-pressure',
    title: 'Blood Pressure Calculator',
    description: 'Check blood pressure category',
  },
  {
    slug: 'pregnancy-due-date',
    title: 'Pregnancy Due Date',
    description: 'Estimate your due date',
  },
  {
    slug: 'due-date-by-conception',
    title: 'Due Date by Conception',
    description: 'Estimate due date from conception',
  },
  {
    slug: 'pregnancy-weight-gain',
    title: 'Pregnancy Weight Gain',
    description: 'Recommended gain ranges',
  },
  { slug: 'ovulation', title: 'Ovulation Calculator', description: 'Estimate fertile window' },
  { slug: 'steps-to-miles', title: 'Steps to Miles', description: 'Convert steps into distance' },
  {
    slug: 'steps-to-calories',
    title: 'Steps to Calories',
    description: 'Estimate calories from steps',
  },
  { slug: 'age', title: 'Age Calculator', description: 'Calculate exact age' },
  {
    slug: 'ffmi',
    title: 'FFMI Calculator',
    description: 'Assess muscular development with Fat-Free Mass Index',
  },
  {
    slug: 'body-recomposition',
    title: 'Body Recomposition',
    description: 'Build muscle and lose fat simultaneously',
  },
  {
    slug: 'intermittent-fasting',
    title: 'Intermittent Fasting',
    description: 'Plan eating windows and calorie distribution',
  },
  {
    slug: 'keto-calculator',
    title: 'Keto Macro Calculator',
    description: 'Calculate keto fat, protein, and carb targets',
  },
  {
    slug: 'caffeine-calculator',
    title: 'Caffeine Calculator',
    description: 'Find safe daily caffeine limits',
  },
  {
    slug: 'resting-heart-rate',
    title: 'Resting Heart Rate',
    description: 'Evaluate resting heart rate fitness category',
  },
  {
    slug: 'max-heart-rate',
    title: 'Max Heart Rate',
    description: 'Estimate max heart rate using age formulas',
  },
  {
    slug: 'calories-burned-walking',
    title: 'Calories Burned Walking',
    description: 'Estimate walking calorie burn',
  },
  {
    slug: 'calories-burned-running',
    title: 'Calories Burned Running',
    description: 'Estimate running calorie burn',
  },
  {
    slug: 'adjusted-body-weight',
    title: 'Adjusted Body Weight',
    description: 'Clinical adjusted body weight formulas',
  },
  {
    slug: 'body-frame-size',
    title: 'Body Frame Size',
    description: 'Determine body frame using wrist measurement',
  },
];

const relatedMap: Record<string, string[]> = {
  bmi: ['body-fat', 'ideal-weight', 'tdee'],
  'body-fat': ['bmi', 'ffmi', 'whr'],
  tdee: ['bmr', 'calorie-deficit', 'macro'],
  calorie: ['tdee', 'calorie-deficit', 'macro'],
  'calories-burned': ['tdee', 'heart-rate-zones', 'running-pace'],
  'calories-burned-cycling': ['calories-burned', 'heart-rate-zones', 'running-pace'],
  'calories-burned-swimming': ['calories-burned', 'heart-rate-zones', 'tdee'],
  'calorie-deficit': ['tdee', 'macro', 'weight-management'],
  'weight-management': ['tdee', 'calorie-deficit', 'macro'],
  absi: ['whr', 'body-fat', 'bmi'],
  whr: ['absi', 'body-fat', 'bmi'],
  'waist-to-height-ratio': ['whr', 'body-fat', 'bmi'],
  'heart-rate-zones': ['vo2-max', 'running-pace', 'tdee'],
  'target-heart-rate': ['heart-rate-zones', 'vo2-max', 'running-pace'],
  'vo2-max': ['heart-rate-zones', 'running-pace', 'tdee'],
  'running-pace': ['heart-rate-zones', 'vo2-max', 'tdee'],
  'water-intake': ['sleep', 'tdee', 'protein'],
  sleep: ['water-intake', 'tdee', 'protein'],
  'blood-pressure': ['bmi', 'whr', 'body-fat'],
  'ideal-weight': ['bmi', 'body-fat', 'tdee'],
  'pregnancy-due-date': ['ovulation', 'water-intake', 'sleep'],
  'due-date-by-conception': ['pregnancy-due-date', 'ovulation', 'sleep'],
  'pregnancy-weight-gain': ['pregnancy-due-date', 'calorie', 'water-intake'],
  ovulation: ['pregnancy-due-date', 'sleep', 'water-intake'],
  bmr: ['tdee', 'macro', 'protein'],
  macro: ['tdee', 'protein', 'calorie-deficit'],
  'carb-intake': ['macro', 'protein', 'fat-intake'],
  'fat-intake': ['macro', 'protein', 'carb-intake'],
  protein: ['macro', 'tdee', 'weight-management'],
  'one-rep-max': ['running-pace', 'tdee', 'protein'],
  'body-fat-burn': ['tdee', 'calorie-deficit', 'maximum-fat-loss'],
  'maximum-fat-loss': ['calorie-deficit', 'tdee', 'protein'],
  conversions: ['bmi', 'tdee', 'protein'],
  'lean-body-mass': ['body-fat', 'ffmi', 'ideal-weight'],
  'body-surface-area': ['lean-body-mass', 'bmi', 'ideal-weight'],
  'army-body-fat': ['body-fat', 'whr', 'waist-to-height-ratio'],
  'steps-to-miles': ['calories-burned', 'running-pace', 'tdee'],
  'steps-to-calories': ['steps-to-miles', 'calories-burned', 'tdee'],
  age: ['bmi', 'tdee', 'calorie'],
  ffmi: ['body-fat', 'lean-body-mass', 'bmi'],
  'body-recomposition': ['tdee', 'macro', 'protein'],
  'intermittent-fasting': ['tdee', 'calorie-deficit', 'macro'],
  'keto-calculator': ['macro', 'fat-intake', 'carb-intake'],
  'caffeine-calculator': ['water-intake', 'sleep', 'tdee'],
  'resting-heart-rate': ['heart-rate-zones', 'target-heart-rate', 'blood-pressure'],
  'max-heart-rate': ['heart-rate-zones', 'target-heart-rate', 'vo2-max'],
  'calories-burned-walking': ['calories-burned', 'steps-to-calories', 'tdee'],
  'calories-burned-running': ['calories-burned', 'running-pace', 'tdee'],
  'adjusted-body-weight': ['ideal-weight', 'bmi', 'lean-body-mass'],
  'body-frame-size': ['ideal-weight', 'bmi', 'adjusted-body-weight'],
};

export function getRelatedCalculators(currentSlug: string, maxItems = 3): RelatedCalculator[] {
  const relatedSlugs = relatedMap[currentSlug] || ['tdee', 'bmi', 'calorie-deficit'];
  const matched = relatedSlugs
    .map(slug => calculators.find(item => item.slug === slug))
    .filter(Boolean) as RelatedCalculator[];

  return matched.slice(0, maxItems);
}
