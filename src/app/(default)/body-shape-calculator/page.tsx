'use client';

import React, { useState, useMemo, useCallback } from 'react';
import { createLogger } from '@/utils/logger';

const logger = createLogger({ component: 'BodyShapeCalculator' });

import { Gender } from '@/types/common';
import { BodyShapeResult } from '@/types/bodyShape';
import { processBodyShapeCalculation } from '@/utils/calculators/bodyShape';
import {
  validateWeight,
  validateHeight,
  validateWaist,
  validateHip,
  validateWrist,
  isEmpty,
} from '@/utils/validation';
import CalculatorPageLayout from '@/components/calculators/CalculatorPageLayout';
import CalculatorForm from '@/components/calculators/CalculatorForm';
import BodyShapeResultDisplay from '@/components/calculators/bodyShape/BodyShapeResult';
import SaveResult from '@/components/SaveResult';
import {
  useHeight,
  useWeight,
  createHeightField,
  createWeightField,
} from '@/hooks/useCalculatorUnits';

const faqs = [
  {
    question: 'How is my body shape determined?',
    answer:
      'Body shape is classified by comparing your bust, waist, and hip measurements. The calculator looks at the ratios between these measurements to determine whether you are an hourglass, pear, apple, rectangle, or inverted triangle shape. For example, an hourglass shape has bust and hips within 5% of each other with a significantly smaller waist, while a pear shape has hips that are more than 5% larger than the bust.',
  },
  {
    question: 'What is a somatotype and how is it calculated?',
    answer:
      'A somatotype classifies your body build into ectomorph (lean, long limbs), mesomorph (muscular, medium frame), or endomorph (rounder build). This calculator uses a simplified Heath-Carter method based on your BMI and optionally your wrist circumference for frame size estimation. The result may also be a blend type like ecto-mesomorph or meso-endomorph if your measurements fall between categories.',
  },
  {
    question: 'How should I measure my bust, waist, and hips?',
    answer:
      'For bust or chest, measure around the fullest part with the tape parallel to the floor. For waist, measure at the narrowest point, typically just above the navel. For hips, measure around the widest part of the buttocks. Stand relaxed, breathe normally, and keep the tape snug but not compressing the skin. Take 2-3 measurements and use the average for the most accurate result.',
  },
  {
    question: 'Can my body shape change over time?',
    answer:
      'Yes. Body shape can change with weight gain or loss, muscle building, aging, and hormonal shifts. Exercise and nutrition can shift your proportions. For example, building lower-body muscle can move you from a rectangle toward an hourglass or pear shape. Consistent strength training can also alter your somatotype classification over months of training.',
  },
  {
    question: 'Does body shape affect health risks?',
    answer:
      'Research shows that where you carry weight matters for health. Apple shapes, which store fat around the midsection, tend to have higher cardiovascular and metabolic risks compared to pear shapes, which store fat in the hips and thighs. However, overall fitness level, diet quality, and lifestyle factors are equally important. Body shape is one piece of the health picture, not a diagnosis.',
  },
];

const blogArticles = [
  {
    title: 'Waist-to-Hip Ratio Guide: What Your Measurements Reveal',
    description:
      'Discover how waist-to-hip ratio indicates health risks, proper measurement techniques, and what healthy ratios look like for men and women.',
    slug: 'waist-to-hip-ratio-guide',
    date: 'February 12, 2025',
    readTime: '10 min read',
    category: 'Body Composition',
  },
  {
    title: 'Understanding Body Fat Percentage: What Your Numbers Mean',
    description:
      'Learn what body fat percentage ranges are healthy for men and women, how body composition differs from BMI, and why it matters for your health goals.',
    slug: 'understanding-body-fat-percentage',
    date: 'February 10, 2025',
    readTime: '9 min read',
    category: 'Body Composition',
  },
];

export default function BodyShapeCalculator() {
  const [gender, setGender] = useState<Gender>('female');
  const height = useHeight();
  const weight = useWeight();
  const [bust, setBust] = useState<number | ''>('');
  const [waist, setWaist] = useState<number | ''>('');
  const [hips, setHips] = useState<number | ''>('');
  const [wristCircumference, setWristCircumference] = useState<number | ''>('');

  const [errors, setErrors] = useState<{
    bust?: string;
    waist?: string;
    hips?: string;
    height?: string;
    weight?: string;
    wrist?: string;
  }>({});

  const [result, setResult] = useState<BodyShapeResult | null>(null);
  const [showResult, setShowResult] = useState<boolean>(false);
  const [calculationError, setCalculationError] = useState<string | null>(null);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      setCalculationError(null);

      const newErrors: {
        bust?: string;
        waist?: string;
        hips?: string;
        height?: string;
        weight?: string;
        wrist?: string;
      } = {};

      // Validate bust (cm, same range as waist)
      if (isEmpty(bust)) {
        newErrors.bust = 'Bust/chest measurement is required';
      } else if (typeof bust === 'number') {
        if (bust < 20) {
          newErrors.bust = 'Bust/chest must be at least 20cm';
        } else if (bust > 300) {
          newErrors.bust = 'Bust/chest must be less than 300cm';
        }
      }

      // Validate waist
      if (isEmpty(waist)) {
        newErrors.waist = 'Waist measurement is required';
      } else {
        const waistValidation = validateWaist(waist, 'metric');
        if (!waistValidation.isValid) {
          newErrors.waist = waistValidation.error;
        }
      }

      // Validate hips
      if (isEmpty(hips)) {
        newErrors.hips = 'Hip measurement is required';
      } else {
        const hipValidation = validateHip(hips, 'metric');
        if (!hipValidation.isValid) {
          newErrors.hips = hipValidation.error;
        }
      }

      // Validate height
      if (isEmpty(height.value)) {
        newErrors.height = 'Height is required';
      } else {
        const unitSystem = height.unit === 'cm' ? 'metric' : 'imperial';
        const heightValidation = validateHeight(height.value, unitSystem);
        if (!heightValidation.isValid) {
          newErrors.height = heightValidation.error;
        }
      }

      // Validate weight
      if (isEmpty(weight.value)) {
        newErrors.weight = 'Weight is required';
      } else {
        const unitSystem = weight.unit === 'kg' ? 'metric' : 'imperial';
        const weightValidation = validateWeight(weight.value, unitSystem);
        if (!weightValidation.isValid) {
          newErrors.weight = weightValidation.error;
        }
      }

      // Validate optional wrist circumference
      if (!isEmpty(wristCircumference) && typeof wristCircumference === 'number') {
        const wristValidation = validateWrist(wristCircumference, 'metric');
        if (!wristValidation.isValid) {
          newErrors.wrist = wristValidation.error;
        }
      }

      setErrors(newErrors);

      const heightCm = height.toCm();
      const weightKg = weight.toKg();

      if (
        Object.keys(newErrors).length === 0 &&
        typeof bust === 'number' &&
        typeof waist === 'number' &&
        typeof hips === 'number' &&
        heightCm !== null &&
        weightKg !== null
      ) {
        try {
          const bodyShapeResult = processBodyShapeCalculation({
            gender,
            bust,
            waist,
            hips,
            height: heightCm,
            weight: weightKg,
            wristCircumference:
              typeof wristCircumference === 'number' ? wristCircumference : undefined,
          });

          setResult(bodyShapeResult);
          setShowResult(true);

          setTimeout(() => {
            const resultElement = document.getElementById('body-shape-result');
            if (resultElement) {
              resultElement.scrollIntoView({ behavior: 'smooth' });
            }
          }, 100);
        } catch (error) {
          logger.logError('Error calculating body shape', error);
          setCalculationError(
            'An error occurred during calculation. Please check your inputs and try again.'
          );
        }
      }
    },
    [gender, bust, waist, hips, height, weight, wristCircumference]
  );

  const handleReset = useCallback(() => {
    setGender('female');
    setBust('');
    setWaist('');
    setHips('');
    height.setValue('');
    weight.setValue('');
    setWristCircumference('');
    setErrors({});
    setResult(null);
    setShowResult(false);
    setCalculationError(null);
  }, [height, weight]);

  const formFields = useMemo(
    () => [
      {
        name: 'gender',
        label: 'Gender',
        type: 'select' as const,
        value: gender,
        onChange: (value: string) => setGender(value as Gender),
        options: [
          { value: 'female', label: 'Female' },
          { value: 'male', label: 'Male' },
        ],
      },
      {
        name: 'bust',
        label: 'Bust / Chest Circumference (cm)',
        type: 'number' as const,
        value: bust,
        onChange: setBust,
        error: errors.bust,
        placeholder: 'Centimeters',
        step: '0.1',
      },
      {
        name: 'waist',
        label: 'Waist Circumference (cm)',
        type: 'number' as const,
        value: waist,
        onChange: setWaist,
        error: errors.waist,
        placeholder: 'Centimeters',
        step: '0.1',
      },
      {
        name: 'hips',
        label: 'Hip Circumference (cm)',
        type: 'number' as const,
        value: hips,
        onChange: setHips,
        error: errors.hips,
        placeholder: 'Centimeters',
        step: '0.1',
      },
      createHeightField(height, errors.height),
      createWeightField(weight, errors.weight),
      {
        name: 'wristCircumference',
        label: 'Wrist Circumference (cm) - Optional',
        type: 'number' as const,
        value: wristCircumference,
        onChange: setWristCircumference,
        error: errors.wrist,
        placeholder: 'Centimeters',
        step: '0.1',
      },
    ],
    [gender, bust, waist, hips, height, weight, wristCircumference, errors]
  );

  return (
    <CalculatorPageLayout
      title="Body Shape Calculator"
      description="Classify your body shape and somatotype based on bust, waist, and hip measurements"
      calculatorSlug="body-shape-calculator"
      shareTitle="Body Shape Calculator | Discover Your Body Type"
      shareDescription="Find out your body shape (hourglass, pear, apple, rectangle, inverted triangle) and somatotype (ectomorph, mesomorph, endomorph) with personalized health and fitness recommendations."
      shareHashtags={['bodyshape', 'somatotype', 'bodytype', 'healthcalculator']}
      faqs={faqs}
      faqTitle="Frequently Asked Questions About Body Shape"
      relatedArticles={blogArticles}
      structuredData={{
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: 'Body Shape Calculator',
        description:
          'Classify your body shape and somatotype based on bust, waist, and hip measurements. Get personalized health, exercise, and nutrition recommendations.',
        url: 'https://www.healthcalc.xyz/body-shape-calculator',
      }}
      showResultsCapture={showResult}
    >
      <div className="md:col-span-1">
        <CalculatorForm
          title="Enter Your Measurements"
          fields={formFields}
          onSubmit={handleSubmit}
          onReset={handleReset}
          submitButtonText="Analyze Body Shape"
        />

        {calculationError && (
          <div
            className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 text-red-700 dark:text-red-300 mt-4"
            role="alert"
          >
            {calculationError}
          </div>
        )}
      </div>

      <div className="md:col-span-2" id="body-shape-result">
        {showResult && result ? (
          <>
            <BodyShapeResultDisplay result={result} />

            <div className="mt-6 flex justify-between items-center">
              <SaveResult
                calculatorType="body-shape-calculator"
                calculatorName="Body Shape Calculator"
                data={{
                  bodyShape: result.bodyShape,
                  somatotype: result.somatotype,
                  bustToWaistRatio: result.bustToWaistRatio,
                  waistToHipRatio: result.waistToHipRatio,
                  bustToHipRatio: result.bustToHipRatio,
                }}
              />

              <button
                onClick={handleReset}
                className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              >
                New Calculation
              </button>
            </div>
          </>
        ) : (
          <BodyShapeResultDisplay result={null} />
        )}
      </div>
    </CalculatorPageLayout>
  );
}
