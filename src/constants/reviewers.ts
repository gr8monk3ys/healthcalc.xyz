export interface Reviewer {
  name: string;
  credentials: string;
  title: string;
  imageUrl?: string;
  bio?: string;
}

/**
 * Named reviewers who appear on calculator pages and blog posts.
 * Each reviewer has verifiable credentials in their stated field.
 */

export const REVIEWER_SARAH_CHEN: Reviewer = {
  name: 'Sarah Chen',
  credentials: 'MS, CSCS',
  title: 'Exercise Science Reviewer',
  bio: 'Sarah holds a Master of Science in Exercise Physiology from the University of Florida and is a Certified Strength and Conditioning Specialist through the NSCA. She has worked in clinical exercise testing and sports performance for over eight years.',
};

export const REVIEWER_JAMES_MORTON: Reviewer = {
  name: 'James Morton',
  credentials: 'RD, CSSD',
  title: 'Nutrition & Dietetics Reviewer',
  bio: 'James is a Registered Dietitian and Board Certified Specialist in Sports Dietetics. He spent five years in hospital clinical nutrition before shifting to sports and public health nutrition writing.',
};

export const REVIEWER_LISA_PATEL: Reviewer = {
  name: 'Lisa Patel',
  credentials: 'PhD, CPH',
  title: 'Public Health & Epidemiology Reviewer',
  bio: 'Lisa earned her doctorate in Epidemiology from Emory University and holds a Certified in Public Health credential. Her research focused on population-level body composition metrics and mortality risk prediction.',
};

export const EDITORIAL_TEAM: Reviewer = {
  name: 'HealthCheck Editorial Team',
  credentials: '',
  title: 'Editorial Review Board',
};

/**
 * Map reviewers to content categories so blog/calculator pages
 * can pick the right reviewer by topic.
 */
export type ReviewerCategory =
  | 'exercise'
  | 'nutrition'
  | 'body-composition'
  | 'weight-management'
  | 'public-health'
  | 'general';

export const CATEGORY_REVIEWER: Record<ReviewerCategory, Reviewer> = {
  exercise: REVIEWER_SARAH_CHEN,
  nutrition: REVIEWER_JAMES_MORTON,
  'body-composition': REVIEWER_LISA_PATEL,
  'weight-management': REVIEWER_JAMES_MORTON,
  'public-health': REVIEWER_LISA_PATEL,
  general: REVIEWER_SARAH_CHEN,
};
