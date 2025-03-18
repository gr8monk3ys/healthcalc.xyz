/**
 * Body Shape / Somatotype Calculator
 *
 * Scientific References:
 * - Heath & Carter (1967): A modified somatotype method
 * - Singh (2007): Body shape classification for health assessment
 * - Lee & Nieman (2013): Nutritional Assessment - body composition chapter
 *
 * Body Shape Classification (based on bust-waist-hip ratios):
 * - Hourglass: bust ≈ hips (within 5%), waist significantly smaller
 * - Pear: hips > bust by >5%, waist < hips
 * - Apple: waist is largest or close to largest measurement
 * - Rectangle: bust ≈ waist ≈ hips (within 5%)
 * - Inverted Triangle: bust/shoulders > hips by >5%
 *
 * Somatotype (simplified Heath-Carter):
 * - Ectomorph: lean, long limbs, low BMI
 * - Mesomorph: muscular, medium frame
 * - Endomorph: rounder, higher body fat
 */

import { BodyShapeFormValues, BodyShapeResult, BodyShape, Somatotype } from '@/types/bodyShape';

const SHAPE_DESCRIPTIONS: Record<BodyShape, string> = {
  apple:
    'Apple shapes carry weight primarily around the midsection. Focus on core-strengthening exercises and cardiovascular health.',
  pear: 'Pear shapes carry weight in the hips and thighs. This distribution is associated with lower cardiovascular risk compared to apple shapes.',
  hourglass:
    'Hourglass shapes have balanced bust and hip measurements with a defined waist. Weight is distributed proportionally.',
  rectangle:
    'Rectangle shapes have similar bust, waist, and hip measurements. Building muscle definition can create more curves.',
  'inverted-triangle':
    'Inverted triangle shapes have broader shoulders relative to hips. This is common in athletes, especially swimmers.',
};

const SOMATOTYPE_DESCRIPTIONS: Record<Somatotype, string> = {
  ectomorph:
    'Ectomorphs tend to be lean with long limbs and a fast metabolism. May find it challenging to gain muscle mass.',
  mesomorph:
    'Mesomorphs are naturally muscular with a medium frame. They tend to gain muscle and lose fat relatively easily.',
  endomorph:
    'Endomorphs tend to have a rounder build and may gain weight more easily. Respond well to consistent exercise and balanced nutrition.',
  'ecto-mesomorph':
    'A blend of lean frame with moderate muscular development. Athletic build with relatively easy muscle maintenance.',
  'meso-endomorph':
    'A blend of muscular and rounder build. Strong natural strength with attention needed to body composition.',
  'ecto-endomorph':
    'A mix of lean frame in some areas with tendency to store fat in others. Benefits from balanced training approach.',
};

const HEALTH_IMPLICATIONS: Record<BodyShape, string[]> = {
  apple: [
    'Higher visceral fat is associated with increased cardiovascular risk.',
    'Monitor blood pressure, blood sugar, and cholesterol regularly.',
    'Waist-focused fat storage correlates with metabolic syndrome risk.',
  ],
  pear: [
    'Lower cardiovascular risk compared to apple shape.',
    'Hip and thigh fat is more metabolically neutral.',
    'May have better insulin sensitivity than apple-shaped individuals.',
  ],
  hourglass: [
    'Balanced weight distribution is generally associated with good metabolic health.',
    'Maintain proportional fitness across all body areas.',
  ],
  rectangle: [
    'Lower subcutaneous fat, but internal visceral fat should still be monitored.',
    'Risk profile depends more on overall BMI and fitness level.',
  ],
  'inverted-triangle': [
    'Shoulder-dominant builds often indicate good upper body strength.',
    'Pay attention to lower body training for balanced musculature.',
  ],
};

const EXERCISE_RECS: Record<BodyShape, string[]> = {
  apple: [
    'Prioritize cardio for visceral fat reduction.',
    'Core-strengthening exercises.',
    'Full-body resistance training 3x/week.',
  ],
  pear: [
    'Lower-body strength training.',
    'HIIT for overall fat burning.',
    'Plyometric exercises for legs.',
  ],
  hourglass: [
    'Balanced full-body training.',
    'Compound movements like squats and deadlifts.',
    'Flexibility and mobility work.',
  ],
  rectangle: [
    'Build muscle with progressive overload.',
    'Focus on compound lifts for overall development.',
    'Include both upper and lower body work.',
  ],
  'inverted-triangle': [
    'Emphasize lower body exercises.',
    'Hip-dominant movements like hip thrusts and lunges.',
    'Core stability training.',
  ],
};

const NUTRITION_TIPS: Record<BodyShape, string[]> = {
  apple: [
    'Reduce refined carbs and added sugars.',
    'Increase fiber intake.',
    'Focus on anti-inflammatory foods.',
  ],
  pear: [
    'Moderate carb intake with healthy fats.',
    'Adequate protein for lower-body muscle maintenance.',
    'Stay hydrated.',
  ],
  hourglass: [
    'Balanced macros with adequate protein.',
    'Eat a variety of whole foods.',
    'Watch portion sizes.',
  ],
  rectangle: [
    'Increase protein to support muscle building.',
    'Caloric surplus if muscle gain is the goal.',
    'Complex carbs around workouts.',
  ],
  'inverted-triangle': [
    'Balanced diet with emphasis on protein.',
    'Healthy fats for hormonal health.',
    'Adequate carbs for energy.',
  ],
};

/**
 * Classify body shape based on bust, waist, and hip measurements
 */
export function classifyBodyShape(
  bust: number,
  waist: number,
  hips: number,
  _gender: 'male' | 'female'
): BodyShape {
  if (bust <= 0 || waist <= 0 || hips <= 0) {
    throw new Error('All measurements must be greater than 0');
  }

  const bustToHipRatio = bust / hips;
  const waistToHipRatio = waist / hips;
  const waistToBustRatio = waist / bust;

  // Hourglass: bust ≈ hips (within 5%) AND waist significantly smaller
  if (Math.abs(bustToHipRatio - 1) <= 0.05 && waistToHipRatio < 0.75) {
    return 'hourglass';
  }

  // Rectangle: all measurements similar AND waist is NOT the largest
  if (
    Math.abs(bustToHipRatio - 1) <= 0.05 &&
    Math.abs(waistToHipRatio - 1) <= 0.1 &&
    waist <= Math.max(bust, hips)
  ) {
    return 'rectangle';
  }

  // Apple: waist is close to or exceeds bust and hips
  if (waistToHipRatio > 0.85 && waistToBustRatio > 0.85) {
    return 'apple';
  }

  // Inverted Triangle: bust significantly larger than hips
  if (bustToHipRatio > 1.05) {
    return 'inverted-triangle';
  }

  // Pear: hips significantly larger than bust
  if (bustToHipRatio < 0.95) {
    return 'pear';
  }

  // Default to rectangle if no strong pattern
  return 'rectangle';
}

/**
 * Determine somatotype from BMI and optional wrist circumference
 */
export function classifySomatotype(
  heightCm: number,
  weightKg: number,
  wristCm?: number
): Somatotype {
  if (heightCm <= 0 || weightKg <= 0) {
    throw new Error('Height and weight must be greater than 0');
  }

  const heightM = heightCm / 100;
  const bmi = weightKg / (heightM * heightM);

  // Frame size from wrist (if available)
  let frameSize: 'small' | 'medium' | 'large' = 'medium';
  if (wristCm) {
    const ratio = heightCm / wristCm;
    if (ratio > 10.4) frameSize = 'small';
    else if (ratio < 9.6) frameSize = 'large';
  }

  if (bmi < 18.5) return 'ectomorph';
  if (bmi < 22) return frameSize === 'large' ? 'ecto-mesomorph' : 'ectomorph';
  if (bmi < 25) return frameSize === 'small' ? 'ecto-mesomorph' : 'mesomorph';
  if (bmi < 28) return frameSize === 'large' ? 'meso-endomorph' : 'mesomorph';
  if (bmi < 30) return 'meso-endomorph';
  return 'endomorph';
}

/**
 * Process full body shape calculation
 */
export function processBodyShapeCalculation(values: BodyShapeFormValues): BodyShapeResult {
  const { gender, bust, waist, hips, height, weight, wristCircumference } = values;

  if (bust <= 0) throw new Error('Bust/chest measurement must be greater than 0');
  if (waist <= 0) throw new Error('Waist measurement must be greater than 0');
  if (hips <= 0) throw new Error('Hip measurement must be greater than 0');
  if (height <= 0) throw new Error('Height must be greater than 0');
  if (weight <= 0) throw new Error('Weight must be greater than 0');

  const bodyShape = classifyBodyShape(bust, waist, hips, gender);
  const somatotype = classifySomatotype(height, weight, wristCircumference);

  return {
    bodyShape,
    shapeDescription: SHAPE_DESCRIPTIONS[bodyShape],
    somatotype,
    somatotypeDescription: SOMATOTYPE_DESCRIPTIONS[somatotype],
    bustToWaistRatio: Math.round((bust / waist) * 100) / 100,
    waistToHipRatio: Math.round((waist / hips) * 100) / 100,
    bustToHipRatio: Math.round((bust / hips) * 100) / 100,
    healthImplications: HEALTH_IMPLICATIONS[bodyShape],
    exerciseRecommendations: EXERCISE_RECS[bodyShape],
    nutritionTips: NUTRITION_TIPS[bodyShape],
  };
}
