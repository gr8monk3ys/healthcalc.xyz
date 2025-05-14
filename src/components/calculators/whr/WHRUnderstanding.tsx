'use client';

import Link from 'next/link';
import React from 'react';
import { useLocale } from '@/context/LocaleContext';
import InfoSection from '../InfoSection';

const WHRUnderstanding: React.FC = () => {
  const { localizePath } = useLocale();

  return (
    <InfoSection title="Understanding Waist-to-Hip Ratio" className="mt-12">
      <p>
        Waist-to-Hip Ratio (WHR) is a valuable tool for assessing your body fat distribution and
        associated health risks. Understanding what your WHR means and how it relates to your
        overall health can help you make informed decisions about your lifestyle and wellness goals.
      </p>

      <h3 className="font-medium mt-4">Body Shape and Health</h3>
      <p className="mb-2">
        Your body shape, often described as either "apple-shaped" or "pear-shaped," is determined by
        where your body tends to store fat:
      </p>
      <ul className="list-disc pl-5 space-y-2">
        <li>
          <span className="font-medium">Apple-shaped (higher WHR):</span> Fat is concentrated around
          the abdomen and waist. This pattern is associated with visceral fat (fat surrounding
          internal organs) and higher health risks.
        </li>
        <li>
          <span className="font-medium">Pear-shaped (lower WHR):</span> Fat is concentrated around
          the hips, thighs, and buttocks. This pattern is associated with subcutaneous fat (fat
          under the skin) and generally lower health risks.
        </li>
      </ul>
      <p className="mt-2">
        Research has consistently shown that central obesity (excess abdominal fat) is a stronger
        predictor of certain health conditions than overall body weight or BMI alone.
      </p>

      <h3 className="font-medium mt-4">The Science Behind WHR</h3>
      <p className="mb-2">
        WHR was established as a health indicator in the 1980s and has been validated through
        numerous studies. The World Health Organization (WHO) adopted WHR as a measure of central
        obesity and established risk thresholds based on extensive population studies.
      </p>
      <p className="mb-2">
        The scientific basis for WHR's importance lies in the metabolic activity of visceral fat.
        Abdominal fat cells release inflammatory substances and hormones that can:
      </p>
      <ul className="list-disc pl-5 space-y-1">
        <li>Increase insulin resistance</li>
        <li>Raise blood pressure</li>
        <li>Promote inflammation throughout the body</li>
        <li>Affect cholesterol and triglyceride levels</li>
        <li>Disrupt normal hormone function</li>
      </ul>
      <p className="mt-2">
        These metabolic changes explain why central obesity is linked to increased risk of
        cardiovascular disease, type 2 diabetes, and other health conditions.
      </p>

      <h3 className="font-medium mt-4">WHR vs. Other Body Composition Metrics</h3>
      <p className="mb-2">Several metrics are used to assess body composition and health risks:</p>
      <ul className="list-disc pl-5 space-y-2">
        <li>
          <span className="font-medium">BMI (Body Mass Index):</span> Measures overall weight
          relative to height, but doesn't distinguish between fat and muscle or consider fat
          distribution
        </li>
        <li>
          <span className="font-medium">Waist Circumference:</span> Measures abdominal fat directly,
          but doesn't account for overall body size or frame
        </li>
        <li>
          <span className="font-medium">WHR (Waist-to-Hip Ratio):</span> Compares waist and hip
          circumferences to assess fat distribution pattern
        </li>
        <li>
          <span className="font-medium">ABSI (A Body Shape Index):</span> Combines waist
          circumference with height and weight to assess health risk
        </li>
        <li>
          <span className="font-medium">Body Fat Percentage:</span> Measures the actual proportion
          of fat in your body, regardless of where it's distributed
        </li>
      </ul>
      <p className="mt-2">
        Each metric has strengths and limitations. WHR is particularly valuable because it's easy to
        measure and provides insight into fat distribution patterns that BMI alone cannot capture.
      </p>

      <h3 className="font-medium mt-4">Improving Your WHR</h3>
      <p className="mb-2">
        If your WHR is higher than recommended, these strategies may help reduce abdominal fat:
      </p>
      <ul className="list-disc pl-5 space-y-1">
        <li>
          <span className="font-medium">Regular physical activity:</span> Both cardio and strength
          training can help reduce abdominal fat. High-intensity interval training (HIIT) has been
          shown to be particularly effective.
        </li>
        <li>
          <span className="font-medium">Balanced diet:</span> Focus on whole foods, lean proteins,
          fruits, vegetables, and whole grains. Limit processed foods, added sugars, and trans fats.
        </li>
        <li>
          <span className="font-medium">Adequate protein intake:</span> Protein helps preserve
          muscle mass during weight loss and can increase feelings of fullness.
        </li>
        <li>
          <span className="font-medium">Stress management:</span> Chronic stress can increase
          cortisol levels, which may promote abdominal fat storage. Techniques like meditation,
          yoga, or deep breathing can help.
        </li>
        <li>
          <span className="font-medium">Quality sleep:</span> Poor sleep is associated with
          increased abdominal fat. Aim for 7-9 hours of quality sleep per night.
        </li>
        <li>
          <span className="font-medium">Limit alcohol:</span> Excessive alcohol consumption is
          associated with increased abdominal fat ("beer belly").
        </li>
      </ul>

      <h3 className="font-medium mt-4">Genetic Factors</h3>
      <p className="mb-2">
        It's important to note that body fat distribution is influenced by genetics, age, sex
        hormones, and other factors beyond your control. Some people naturally tend toward an apple
        or pear shape.
      </p>
      <p className="mb-2">
        However, even modest improvements in WHR can significantly reduce health risks. Focus on
        healthy behaviors rather than achieving a specific body shape, and remember that health
        encompasses many factors beyond WHR alone.
      </p>

      <p className="mt-4">
        For a more comprehensive health assessment, consider using our other calculators like the{' '}
        <Link href={localizePath('/bmi')} className="text-accent hover:underline">
          BMI Calculator
        </Link>
        ,{' '}
        <Link href={localizePath('/absi')} className="text-accent hover:underline">
          ABSI Calculator
        </Link>
        , or{' '}
        <Link href={localizePath('/body-fat')} className="text-accent hover:underline">
          Body Fat Calculator
        </Link>
        .
      </p>
    </InfoSection>
  );
};

export default WHRUnderstanding;
