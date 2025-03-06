interface BlogCategory {
  id: string;
  label: string;
  description: string;
  priority: number;
  type: 'educational' | 'review' | 'comparison';
}

const BLOG_CATEGORIES: BlogCategory[] = [
  {
    id: 'health-science',
    label: 'Health & Science',
    description:
      'Evidence-based articles on body composition, health markers, and medical research.',
    priority: 1,
    type: 'educational',
  },
  {
    id: 'measurement-methods',
    label: 'Measurement Methods',
    description:
      'How different body composition and fitness measurement techniques work, compared honestly.',
    priority: 2,
    type: 'educational',
  },
  {
    id: 'energy-expenditure',
    label: 'Energy Expenditure',
    description: 'Understanding TDEE, BMR, and the science of how your body burns calories.',
    priority: 3,
    type: 'educational',
  },
  {
    id: 'weight-management',
    label: 'Weight Management',
    description:
      'Sustainable strategies for weight loss, maintenance, and gain backed by research.',
    priority: 4,
    type: 'educational',
  },
  {
    id: 'nutrition',
    label: 'Nutrition',
    description:
      'Macro tracking, calorie counting, and practical nutrition strategies grounded in science.',
    priority: 5,
    type: 'educational',
  },
  {
    id: 'training',
    label: 'Training',
    description:
      'Strength training, cardio, muscle building, and heart rate training zone guidance.',
    priority: 6,
    type: 'educational',
  },
  {
    id: 'comparisons',
    label: 'Comparisons',
    description:
      'Side-by-side analysis of equipment, methods, and approaches to help you decide what works.',
    priority: 20,
    type: 'comparison',
  },
  {
    id: 'product-reviews',
    label: 'Product Reviews',
    description:
      'Hands-on reviews of fitness trackers, scales, apps, and equipment for health tracking.',
    priority: 21,
    type: 'review',
  },
];

/**
 * Maps the category strings used in blog post data to the category type.
 * Any category not listed here is treated as educational.
 */
const CATEGORY_TYPE_MAP: Record<string, BlogCategory['type']> = {
  'Product Reviews': 'review',
  Comparisons: 'comparison',
};

export function getCategoryType(categoryLabel: string): BlogCategory['type'] {
  return CATEGORY_TYPE_MAP[categoryLabel] ?? 'educational';
}

/**
 * Returns a display badge label for a given category type.
 */
export function getCategoryBadgeLabel(type: BlogCategory['type']): string {
  switch (type) {
    case 'review':
      return 'Review';
    case 'comparison':
      return 'Comparison';
    case 'educational':
    default:
      return 'Guide';
  }
}

/**
 * Returns a priority number for sorting categories.
 * Educational categories sort first, then comparisons, then reviews.
 */
export function getCategorySortPriority(categoryLabel: string): number {
  const found = BLOG_CATEGORIES.find(c => c.label.toLowerCase() === categoryLabel.toLowerCase());
  return found?.priority ?? 10;
}
