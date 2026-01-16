'use client';

import React, { useState } from 'react';
import { Gender, ActivityLevel, HeightUnit, WeightUnit } from '@/types/common';
import { MaximumFatLossResult } from '@/types/maximumFatLoss';
import { calculateMaximumFatLoss } from '@/app/api/maximumFatLoss';
import { ACTIVITY_MULTIPLIERS } from '@/constants/tdee';
import { validateAge, validateHeight, validateWeight, isEmpty } from '@/utils/validation';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import CalculatorForm from '@/components/calculators/CalculatorForm';
import MaximumFatLossResultDisplay from '@/components/calculators/maximum-fat-loss/MaximumFatLossResult';
import MaximumFatLossInfo from '@/components/calculators/maximum-fat-loss/MaximumFatLossInfo';
import MaximumFatLossUnderstanding from '@/components/calculators/maximum-fat-loss/MaximumFatLossUnderstanding';
import Breadcrumb from '@/components/Breadcrumb';
import StructuredData from '@/components/StructuredData';
import SocialShare from '@/components/SocialShare';
import SaveResult from '@/components/SaveResult';
import NewsletterSignup from '@/components/NewsletterSignup';
import FAQSection from '@/components/FAQSection';
import RelatedArticles from '@/components/RelatedArticles';

// FAQ data for the calculator
const faqs = [
  {
    question: 'What makes this calculator different from other fat loss calculators?',
    answer:
      "The Maximum Fat Loss Calculator uses your body composition (body fat percentage) to calculate lean body mass and determine the maximum safe rate of fat loss while preserving muscle. Unlike simple calorie calculators, it factors in the 31 kcal per kg of fat mass per day rule, ensuring you don't lose muscle along with fat. This science-based approach optimizes fat loss without compromising metabolic health or lean tissue.",
  },
  {
    question: 'How do I accurately measure my body fat percentage?',
    answer:
      'The most accurate methods include DEXA scans, hydrostatic weighing, and 3D body scanners. More accessible options include bioelectrical impedance scales (moderate accuracy), skinfold calipers (requires skill), and the Navy method (uses circumference measurements). For this calculator, consistency is more important than perfect accuracy - use the same method each time to track changes. If unsure, start with a conservative estimate based on visual comparison guides.',
  },
  {
    question: 'Why does the calculator limit my calorie deficit even if I want faster results?',
    answer:
      'The calculator caps your deficit based on the maximum energy your fat stores can release per day (approximately 31 kcal per kg of fat mass). Exceeding this limit forces your body to break down muscle for energy, leading to metabolic slowdown, strength loss, and poor body composition. The calculator ensures your deficit is aggressive but sustainable, maximizing fat loss while preserving lean muscle mass and metabolic rate.',
  },
  {
    question: "Can I adjust my plan if I'm also doing strength training?",
    answer:
      "Yes! If you're strength training, you may benefit from a slightly smaller deficit than calculated to support recovery and muscle preservation. Consider staying at the higher end of your recommended calorie range, ensure adequate protein intake (1.6-2.2g per kg lean body mass), and prioritize training performance. The calculator provides a starting point, but listen to your body - if strength is declining rapidly, increase calories slightly.",
  },
  {
    question: 'What if my body fat percentage is very high or very low?',
    answer:
      'For very high body fat (>35%), you can safely maintain a larger deficit as your fat stores can supply more energy. For very low body fat (<15% men, <22% women), the calculator will recommend smaller deficits to protect essential fat and muscle. Never go below essential fat levels (3-5% men, 12-15% women) as this is dangerous for hormonal function, immune health, and organ protection. The calculator includes safety limits to prevent unhealthy extremes.',
  },
];

// Blog article data for related articles
const blogArticles = [
  {
    title: 'Understanding Body Fat Percentage: What Your Numbers Mean',
    description:
      'Learn what body fat percentage ranges are healthy for men and women, how body composition differs from BMI, and why it matters for your health goals.',
    slug: 'understanding-body-fat-percentage',
    date: 'February 10, 2025',
    readTime: '9 min read',
    category: 'Body Composition',
  },
  {
    title: 'The Pros and Cons of Different Body Fat Measurement Methods',
    description:
      'Compare the accuracy, accessibility, and practicality of various body fat assessment techniques, from DEXA scans to skinfold calipers to Navy method measurements.',
    slug: 'measuring-body-fat',
    date: 'February 15, 2025',
    readTime: '12 min read',
    category: 'Measurement Methods',
  },
  {
    title: 'TDEE Explained: How Many Calories Do You Really Need?',
    description:
      "Understand the components of Total Daily Energy Expenditure (TDEE), how it's calculated, and why knowing your TDEE is crucial for effective weight management.",
    slug: 'tdee-explained',
    date: 'February 20, 2025',
    readTime: '10 min read',
    category: 'Energy Expenditure',
  },
];

export default function MaximumFatLossCalculator() {
  // State for form inputs
  const [gender, setGender] = useState<Gender>('male');
  const [age, setAge] = useState<number | ''>('');
  const [height, setHeight] = useState<number | ''>('');
  const [heightUnit, setHeightUnit] = useState<HeightUnit>('cm');
  const [weight, setWeight] = useState<number | ''>('');
  const [weightUnit, setWeightUnit] = useState<WeightUnit>('kg');
  const [activityLevel, setActivityLevel] = useState<ActivityLevel>('sedentary');
  const [bodyFatPercentage, setBodyFatPercentage] = useState<number | ''>('');

  // State for form validation
  const [errors, setErrors] = useState<{
    age?: string;
    height?: string;
    weight?: string;
    bodyFatPercentage?: string;
  }>({});

  // State for calculation result
  const [result, setResult] = useState<MaximumFatLossResult | null>(null);
  const [showResult, setShowResult] = useState<boolean>(false);

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    const newErrors: {
      age?: string;
      height?: string;
      weight?: string;
      bodyFatPercentage?: string;
    } = {};

    // Validate age
    if (isEmpty(age)) {
      newErrors.age = 'Age is required';
    } else {
      const ageValidation = validateAge(age);
      if (!ageValidation.isValid) {
        newErrors.age = ageValidation.error;
      }
    }

    // Validate height
    if (isEmpty(height)) {
      newErrors.height = 'Height is required';
    } else {
      const heightForValidation =
        heightUnit === 'ft' ? (typeof height === 'number' ? height * 12 : height) : height;
      const unitSystem = heightUnit === 'cm' ? 'metric' : 'imperial';
      const heightValidation = validateHeight(heightForValidation, unitSystem);
      if (!heightValidation.isValid) {
        newErrors.height = heightValidation.error;
      }
    }

    // Validate weight
    if (isEmpty(weight)) {
      newErrors.weight = 'Weight is required';
    } else {
      const unitSystem = weightUnit === 'kg' ? 'metric' : 'imperial';
      const weightValidation = validateWeight(weight, unitSystem);
      if (!weightValidation.isValid) {
        newErrors.weight = weightValidation.error;
      }
    }

    // Validate body fat percentage
    if (isEmpty(bodyFatPercentage)) {
      newErrors.bodyFatPercentage = 'Body fat percentage is required';
    } else if (typeof bodyFatPercentage === 'number') {
      if (bodyFatPercentage < 3 || bodyFatPercentage > 60) {
        newErrors.bodyFatPercentage = 'Body fat percentage must be between 3% and 60%';
      } else if (bodyFatPercentage < 5 && gender === 'male') {
        newErrors.bodyFatPercentage = 'Body fat below 5% is dangerous for males';
      } else if (bodyFatPercentage < 12 && gender === 'female') {
        newErrors.bodyFatPercentage = 'Body fat below 12% is dangerous for females';
      }
    }

    setErrors(newErrors);

    // If no errors, calculate maximum fat loss
    if (
      Object.keys(newErrors).length === 0 &&
      typeof age === 'number' &&
      typeof height === 'number' &&
      typeof weight === 'number' &&
      typeof bodyFatPercentage === 'number'
    ) {
      // Convert height to cm if needed
      const heightCm = heightUnit === 'cm' ? height : height * 30.48;

      // Convert weight to kg if needed
      const weightKg = weightUnit === 'kg' ? weight : weight / 2.20462;

      try {
        // Calculate maximum fat loss plan
        const maxFatLossResult = calculateMaximumFatLoss({
          gender,
          age,
          heightCm,
          weightKg,
          activityLevel,
          bodyFatPercentage,
        });

        setResult(maxFatLossResult);
        setShowResult(true);

        // Scroll to result with smooth animation
        setTimeout(() => {
          const resultElement = document.getElementById('maximum-fat-loss-result');
          if (resultElement) {
            resultElement.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      } catch (error) {
        console.error('Error calculating maximum fat loss:', error);
        if (error instanceof Error) {
          setErrors({ ...newErrors, bodyFatPercentage: error.message });
        }
      }
    }
  };

  // Handle unit toggle
  const toggleHeightUnit = () => {
    if (heightUnit === 'cm' && typeof height === 'number') {
      setHeight(parseFloat((height / 30.48).toFixed(1)));
      setHeightUnit('ft');
    } else if (heightUnit === 'ft' && typeof height === 'number') {
      setHeight(parseFloat((height * 30.48).toFixed(1)));
      setHeightUnit('cm');
    } else {
      setHeightUnit(heightUnit === 'cm' ? 'ft' : 'cm');
    }
  };

  const toggleWeightUnit = () => {
    if (weightUnit === 'kg' && typeof weight === 'number') {
      setWeight(parseFloat((weight * 2.20462).toFixed(1)));
      setWeightUnit('lb');
    } else if (weightUnit === 'lb' && typeof weight === 'number') {
      setWeight(parseFloat((weight / 2.20462).toFixed(1)));
      setWeightUnit('kg');
    } else {
      setWeightUnit(weightUnit === 'kg' ? 'lb' : 'kg');
    }
  };

  // Reset form
  const handleReset = () => {
    setGender('male');
    setAge('');
    setHeight('');
    setHeightUnit('cm');
    setWeight('');
    setWeightUnit('kg');
    setActivityLevel('sedentary');
    setBodyFatPercentage('');
    setErrors({});
    setResult(null);
    setShowResult(false);
  };

  // Form fields for the CalculatorForm component
  const formFields = [
    {
      name: 'gender',
      label: 'Gender',
      type: 'radio' as const,
      value: gender,
      onChange: (value: string) => setGender(value as Gender),
      options: [
        { value: 'male', label: 'Male' },
        { value: 'female', label: 'Female' },
      ],
    },
    {
      name: 'age',
      label: 'Age',
      type: 'number' as const,
      value: age,
      onChange: setAge,
      error: errors.age,
      placeholder: 'Years',
    },
    {
      name: 'height',
      label: 'Height',
      type: 'number' as const,
      value: height,
      onChange: setHeight,
      error: errors.height,
      placeholder: heightUnit === 'cm' ? 'Centimeters' : 'Feet',
      unit: heightUnit === 'cm' ? 'cm' : 'ft',
      unitToggle: toggleHeightUnit,
      step: '0.1',
    },
    {
      name: 'weight',
      label: 'Current Weight',
      type: 'number' as const,
      value: weight,
      onChange: setWeight,
      error: errors.weight,
      placeholder: weightUnit === 'kg' ? 'Kilograms' : 'Pounds',
      unit: weightUnit === 'kg' ? 'kg' : 'lb',
      unitToggle: toggleWeightUnit,
      step: '0.1',
    },
    {
      name: 'bodyFatPercentage',
      label: 'Body Fat %',
      type: 'number' as const,
      value: bodyFatPercentage,
      onChange: setBodyFatPercentage,
      error: errors.bodyFatPercentage,
      placeholder: 'Percentage',
      step: '0.1',
      min: 3,
      max: 60,
    },
    {
      name: 'activity',
      label: 'Activity Level',
      type: 'select' as const,
      value: activityLevel,
      onChange: (value: string) => setActivityLevel(value as ActivityLevel),
      options: ACTIVITY_MULTIPLIERS.map(level => ({
        value: level.level,
        label: level.label,
        description: level.description,
      })),
    },
  ];

  return (
    <ErrorBoundary>
      <div className="max-w-4xl mx-auto">
        {/* Breadcrumb navigation */}
        <Breadcrumb />

        <h1 className="text-3xl font-bold mb-2">Maximum Fat Loss Calculator</h1>
        <p className="text-gray-600 mb-6">
          Find the optimal calorie intake for maximum fat loss while preserving muscle mass
        </p>

        {/* Social sharing buttons */}
        <div className="mb-6">
          <SocialShare
            url="/maximum-fat-loss"
            title="Maximum Fat Loss Calculator | Preserve Muscle While Losing Fat"
            description="Find the optimal calorie intake for maximum fat loss while preserving muscle mass. Science-based approach using body composition analysis."
            hashtags={['fatloss', 'musclepreservation', 'bodycomposition', 'fitness']}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div className="md:col-span-1">
            <CalculatorForm
              title="Enter Your Details"
              fields={formFields}
              onSubmit={handleSubmit}
              onReset={handleReset}
            />
          </div>

          <div className="md:col-span-2" id="maximum-fat-loss-result">
            {showResult && result ? (
              <>
                <MaximumFatLossResultDisplay
                  result={result}
                  weightUnit={weightUnit}
                  gender={gender}
                />

                {/* Save result functionality */}
                <div className="mt-6 flex justify-between items-center">
                  <SaveResult
                    calculatorType="maximum-fat-loss"
                    calculatorName="Maximum Fat Loss Calculator"
                    data={{
                      tdee: result.tdee,
                      minimumCalories: result.minimumCalories,
                      maximumDeficit: result.maximumDeficit,
                      leanMassKg: result.leanMassKg,
                      fatMassKg: result.fatMassKg,
                      bodyFatPercentage: bodyFatPercentage,
                    }}
                  />

                  <button
                    onClick={handleReset}
                    className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    New Calculation
                  </button>
                </div>
              </>
            ) : (
              <MaximumFatLossInfo />
            )}
          </div>
        </div>

        {/* FAQ Section with structured data */}
        <FAQSection
          faqs={faqs}
          title="Frequently Asked Questions About Maximum Fat Loss"
          className="mb-8"
        />

        <MaximumFatLossUnderstanding />

        {/* Related Articles Section */}
        <RelatedArticles
          currentSlug=""
          articles={blogArticles}
          title="Related Articles"
          className="my-8"
        />

        {/* Newsletter Signup */}
        <NewsletterSignup
          title="Get Fat Loss Tips & Updates"
          description="Subscribe to receive the latest fat loss strategies, body composition tips, calculator updates, and exclusive content to help you achieve your physique goals."
          className="my-8"
        />

        {/* Structured data for the calculator */}
        <StructuredData
          data={{
            '@context': 'https://schema.org',
            '@type': 'SoftwareApplication',
            name: 'Maximum Fat Loss Calculator',
            applicationCategory: 'HealthApplication',
            operatingSystem: 'Web',
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'USD',
            },
            description:
              'Find the optimal calorie intake for maximum fat loss while preserving muscle mass. Science-based approach using body composition analysis.',
            url: 'https://www.heathcheck.info/maximum-fat-loss',
          }}
        />
      </div>
    </ErrorBoundary>
  );
}
