import { WHRCategory } from '@/types/whr';

/**
 * Waist-to-Hip Ratio (WHR) categories based on WHO guidelines
 */
export const WHR_CATEGORIES: WHRCategory[] = [
  {
    name: 'Low Risk',
    color: '#10B981', // green
    description: 'Your waist-to-hip ratio indicates a healthy fat distribution pattern with lower health risks.',
    healthRisk: 'Low',
    ranges: {
      male: { min: 0, max: 0.95 },
      female: { min: 0, max: 0.80 }
    }
  },
  {
    name: 'Moderate Risk',
    color: '#FBBF24', // yellow
    description: 'Your waist-to-hip ratio indicates a moderate level of abdominal fat, which may increase your health risks.',
    healthRisk: 'Moderate',
    ranges: {
      male: { min: 0.95, max: 1.0 },
      female: { min: 0.80, max: 0.85 }
    }
  },
  {
    name: 'High Risk',
    color: '#F97316', // orange
    description: 'Your waist-to-hip ratio indicates significant abdominal fat accumulation, which is associated with increased health risks.',
    healthRisk: 'High',
    ranges: {
      male: { min: 1.0, max: 1.1 },
      female: { min: 0.85, max: 0.90 }
    }
  },
  {
    name: 'Very High Risk',
    color: '#EF4444', // red
    description: 'Your waist-to-hip ratio indicates excessive abdominal fat accumulation, which is strongly associated with metabolic complications and cardiovascular disease.',
    healthRisk: 'Very High',
    ranges: {
      male: { min: 1.1 },
      female: { min: 0.90 }
    }
  }
];

/**
 * Health risks associated with high WHR
 */
export const WHR_HEALTH_RISKS = [
  'Type 2 diabetes',
  'Heart disease',
  'High blood pressure',
  'Stroke',
  'Some types of cancer',
  'Sleep apnea',
  'Metabolic syndrome'
];

/**
 * Measurement instructions for waist and hips
 */
export const MEASUREMENT_INSTRUCTIONS = {
  waist: [
    'Stand up straight and breathe normally',
    'Find the top of your hip bones and the bottom of your ribs',
    'Place the measuring tape midway between these points (usually at the level of your navel)',
    'Wrap the tape around your waist, keeping it parallel to the floor',
    'Measure after breathing out normally (don\'t suck in your stomach)',
    'Ensure the tape is snug but not digging into your skin'
  ],
  hips: [
    'Stand with your feet together',
    'Place the measuring tape around the widest part of your buttocks',
    'Ensure the tape is parallel to the floor all the way around',
    'Keep the tape snug against your body but not tight enough to compress the skin',
    'Take the measurement'
  ]
};
