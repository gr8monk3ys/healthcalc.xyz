// Affiliate link configurations for health/fitness products
// Update the `url` fields with actual affiliate links when available

export type CalculatorType =
  | 'bmi'
  | 'tdee'
  | 'body-fat'
  | 'body-fat-burn'
  | 'calorie-deficit'
  | 'weight-management'
  | 'maximum-fat-loss'
  | 'absi'
  | 'whr'
  | 'conversions'
  | 'macro'
  | 'protein'
  | 'one-rep-max';

export type ProductCategory =
  | 'fitness-tracker'
  | 'smart-scale'
  | 'meal-delivery'
  | 'fitness-app'
  | 'supplement'
  | 'equipment';

export interface AffiliateProduct {
  id: string;
  name: string;
  description: string;
  category: ProductCategory;
  url: string;
  imageUrl?: string;
  price?: string;
  rating?: number;
  badge?: string;
}

export interface AffiliateCategoryConfig {
  title: string;
  description: string;
  icon: string;
}

// Product category display configurations
export const AFFILIATE_CATEGORY_CONFIG: Record<ProductCategory, AffiliateCategoryConfig> = {
  'fitness-tracker': {
    title: 'Fitness Trackers',
    description: 'Track your daily activity, heart rate, and calories burned',
    icon: 'watch',
  },
  'smart-scale': {
    title: 'Smart Scales',
    description: 'Monitor weight, body fat percentage, and more',
    icon: 'scale',
  },
  'meal-delivery': {
    title: 'Meal Delivery Services',
    description: 'Healthy, portion-controlled meals delivered to your door',
    icon: 'utensils',
  },
  'fitness-app': {
    title: 'Fitness Apps',
    description: 'Track workouts, nutrition, and achieve your goals',
    icon: 'smartphone',
  },
  supplement: {
    title: 'Supplements',
    description: 'Support your health and fitness journey',
    icon: 'pill',
  },
  equipment: {
    title: 'Fitness Equipment',
    description: 'Quality equipment for home workouts',
    icon: 'dumbbell',
  },
};

// All available affiliate products
// Replace placeholder URLs with actual affiliate links
export const AFFILIATE_PRODUCTS: AffiliateProduct[] = [
  // Fitness Trackers
  {
    id: 'fitbit-charge-6',
    name: 'Fitbit Charge 6',
    description: 'Advanced fitness tracker with heart rate monitoring, GPS, and sleep tracking',
    category: 'fitness-tracker',
    url: '#fitbit-charge-6',
    price: '$159.95',
    rating: 4.5,
    badge: 'Popular',
  },
  {
    id: 'apple-watch-se',
    name: 'Apple Watch SE',
    description: 'Powerful fitness features including workout detection and activity rings',
    category: 'fitness-tracker',
    url: '#apple-watch-se',
    price: '$249.00',
    rating: 4.7,
  },
  {
    id: 'garmin-vivosmart-5',
    name: 'Garmin Vivosmart 5',
    description: 'Slim fitness tracker with Body Battery energy monitoring and stress tracking',
    category: 'fitness-tracker',
    url: '#garmin-vivosmart-5',
    price: '$149.99',
    rating: 4.4,
  },

  // Smart Scales
  {
    id: 'withings-body-plus',
    name: 'Withings Body+',
    description: 'Wi-Fi smart scale with body composition analysis and pregnancy mode',
    category: 'smart-scale',
    url: '#withings-body-plus',
    price: '$99.95',
    rating: 4.6,
    badge: 'Best Value',
  },
  {
    id: 'renpho-smart-scale',
    name: 'RENPHO Smart Scale',
    description: 'Affordable scale measuring 13 body metrics including BMI and body fat',
    category: 'smart-scale',
    url: '#renpho-smart-scale',
    price: '$29.99',
    rating: 4.5,
  },
  {
    id: 'eufy-smart-scale-p2',
    name: 'eufy Smart Scale P2 Pro',
    description: 'High-precision scale with ITO coating for accurate body composition',
    category: 'smart-scale',
    url: '#eufy-smart-scale-p2',
    price: '$49.99',
    rating: 4.4,
  },

  // Meal Delivery Services
  {
    id: 'factor-meals',
    name: 'Factor Meals',
    description: 'Chef-prepared, ready-to-eat meals tailored to your diet goals',
    category: 'meal-delivery',
    url: '#factor-meals',
    price: 'From $11/meal',
    rating: 4.3,
    badge: 'Editor Choice',
  },
  {
    id: 'hello-fresh',
    name: 'HelloFresh',
    description: 'Fresh ingredients and easy recipes delivered weekly with calorie-smart options',
    category: 'meal-delivery',
    url: '#hello-fresh',
    price: 'From $8/serving',
    rating: 4.4,
  },
  {
    id: 'noom',
    name: 'Noom',
    description: 'Psychology-based weight loss program with personalized meal plans',
    category: 'meal-delivery',
    url: '#noom',
    price: 'From $59/month',
    rating: 4.2,
  },

  // Fitness Apps
  {
    id: 'myfitnesspal-premium',
    name: 'MyFitnessPal Premium',
    description: 'Comprehensive calorie and macro tracking with barcode scanner',
    category: 'fitness-app',
    url: '#myfitnesspal-premium',
    price: '$19.99/month',
    rating: 4.6,
    badge: 'Most Popular',
  },
  {
    id: 'lose-it',
    name: 'Lose It!',
    description: 'Easy-to-use calorie counter and weight loss app with community support',
    category: 'fitness-app',
    url: '#lose-it',
    price: '$39.99/year',
    rating: 4.5,
  },
  {
    id: 'cronometer',
    name: 'Cronometer',
    description: 'Detailed nutrition tracking with micronutrient analysis for health optimization',
    category: 'fitness-app',
    url: '#cronometer',
    price: '$49.99/year',
    rating: 4.4,
  },

  // Supplements
  {
    id: 'protein-powder',
    name: 'Optimum Nutrition Whey Protein',
    description: 'High-quality whey protein for muscle recovery and growth',
    category: 'supplement',
    url: '#optimum-nutrition-whey',
    price: '$32.99',
    rating: 4.7,
    badge: 'Best Seller',
  },
  {
    id: 'multivitamin',
    name: 'Garden of Life Multivitamin',
    description: 'Whole food multivitamin for men and women',
    category: 'supplement',
    url: '#garden-of-life-multi',
    price: '$44.99',
    rating: 4.5,
  },
  {
    id: 'omega-3',
    name: 'Nordic Naturals Omega-3',
    description: 'Pure, sustainable fish oil for heart and brain health',
    category: 'supplement',
    url: '#nordic-naturals-omega',
    price: '$27.95',
    rating: 4.6,
  },

  // Fitness Equipment
  {
    id: 'resistance-bands',
    name: 'Fit Simplify Resistance Bands',
    description: 'Set of 5 exercise bands for strength training anywhere',
    category: 'equipment',
    url: '#fit-simplify-bands',
    price: '$12.95',
    rating: 4.5,
  },
  {
    id: 'yoga-mat',
    name: 'Manduka PRO Yoga Mat',
    description: 'Premium, eco-friendly yoga mat with lifetime guarantee',
    category: 'equipment',
    url: '#manduka-pro-mat',
    price: '$120.00',
    rating: 4.8,
  },
];

// Mapping of calculator types to relevant product categories
export const CALCULATOR_PRODUCT_MAPPING: Record<CalculatorType, ProductCategory[]> = {
  bmi: ['smart-scale', 'fitness-tracker', 'fitness-app'],
  tdee: ['fitness-tracker', 'meal-delivery', 'fitness-app'],
  'body-fat': ['smart-scale', 'fitness-tracker', 'supplement'],
  'body-fat-burn': ['fitness-tracker', 'fitness-app', 'equipment'],
  'calorie-deficit': ['meal-delivery', 'fitness-app', 'smart-scale'],
  'weight-management': ['meal-delivery', 'fitness-app', 'smart-scale'],
  'maximum-fat-loss': ['meal-delivery', 'supplement', 'fitness-tracker'],
  absi: ['smart-scale', 'meal-delivery', 'fitness-app'],
  whr: ['smart-scale', 'fitness-tracker', 'equipment'],
  conversions: ['fitness-app', 'smart-scale'],
  macro: ['meal-delivery', 'fitness-app', 'supplement'],
  protein: ['supplement', 'meal-delivery', 'fitness-app'],
  'one-rep-max': ['equipment', 'fitness-app', 'supplement'],
};

// Helper function to get products for a specific calculator type
export function getProductsForCalculator(
  calculatorType: CalculatorType,
  maxProducts = 6
): AffiliateProduct[] {
  const relevantCategories = CALCULATOR_PRODUCT_MAPPING[calculatorType] || [];

  const products = AFFILIATE_PRODUCTS.filter(product =>
    relevantCategories.includes(product.category)
  );

  // Sort by rating (if available) and return top products
  return products.sort((a, b) => (b.rating || 0) - (a.rating || 0)).slice(0, maxProducts);
}

// Helper function to get products by category
export function getProductsByCategory(category: ProductCategory): AffiliateProduct[] {
  return AFFILIATE_PRODUCTS.filter(product => product.category === category);
}

// Affiliate disclosure text
export const AFFILIATE_DISCLOSURE = {
  short:
    'As an affiliate, we may earn a commission from qualifying purchases at no extra cost to you.',
  full: `Disclosure: Some of the links on this page are affiliate links, meaning we may earn a small commission if you click through and make a purchase. This comes at no additional cost to you and helps support our free health calculators. We only recommend products we believe will be valuable to our users.`,
};
