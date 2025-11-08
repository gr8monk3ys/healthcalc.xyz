'use client';

import React, { useState } from 'react';
import Card from '@/components/ui/Card';
import Accordion from '@/components/ui/Accordion';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import Breadcrumb from '@/components/Breadcrumb';
import StructuredData from '@/components/StructuredData';
import SocialShare from '@/components/SocialShare';
import NewsletterSignup from '@/components/NewsletterSignup';
import FAQSection from '@/components/FAQSection';
import RelatedArticles from '@/components/RelatedArticles';
import {
  convertWeight,
  convertHeight,
  convertVolume,
  convertTemperature,
  convertEnergy,
} from '@/utils/conversions';

type ConversionCategory = 'weight' | 'height' | 'volume' | 'temperature' | 'energy';

const CONVERSION_CATEGORIES = {
  weight: {
    name: 'Weight / Mass',
    units: ['kg', 'lb', 'g', 'oz', 'stone'],
    labels: { kg: 'Kilograms', lb: 'Pounds', g: 'Grams', oz: 'Ounces', stone: 'Stones' },
  },
  height: {
    name: 'Height / Length',
    units: ['cm', 'in', 'ft', 'm'],
    labels: { cm: 'Centimeters', in: 'Inches', ft: 'Feet', m: 'Meters' },
  },
  volume: {
    name: 'Volume',
    units: ['ml', 'l', 'cup', 'tbsp', 'tsp', 'floz', 'gal'],
    labels: {
      ml: 'Milliliters',
      l: 'Liters',
      cup: 'Cups',
      tbsp: 'Tablespoons',
      tsp: 'Teaspoons',
      floz: 'Fluid Ounces',
      gal: 'Gallons',
    },
  },
  temperature: {
    name: 'Temperature',
    units: ['c', 'f'],
    labels: { c: 'Celsius (°C)', f: 'Fahrenheit (°F)' },
  },
  energy: {
    name: 'Energy / Calories',
    units: ['kcal', 'kj'],
    labels: { kcal: 'Kilocalories', kj: 'Kilojoules' },
  },
};

// FAQ data for the converter
const faqs = [
  {
    question: 'Why is it important to convert units accurately for health tracking?',
    answer:
      'Accurate unit conversions are critical for health and fitness tracking because small errors compound over time. For example, confusing pounds with kilograms in weight tracking could lead to misinterpreting weight loss progress. Inaccurate calorie conversions between kcal and kJ could result in under or overeating. When sharing health data with medical professionals, using the correct units ensures proper diagnosis and treatment. Our converter uses precise conversion factors (not rounded approximations) to maintain accuracy.',
  },
  {
    question: 'What is the difference between a calorie and a kilocalorie?',
    answer:
      'In nutrition, "calorie" (with lowercase c) typically refers to kilocalorie (kcal), also written as Calorie with uppercase C. 1 kilocalorie = 1,000 small calories (cal). This can be confusing because food labels might say "calories" but actually mean kilocalories. For example, a food labeled "200 calories" contains 200 kcal or 200,000 small calories. In scientific contexts, energy is often measured in kilojoules (kJ), where 1 kcal = 4.184 kJ. Most nutrition databases use kcal.',
  },
  {
    question: 'How do I convert my height from feet and inches to centimeters?',
    answer:
      'To convert height from feet and inches to centimeters: 1) Convert feet to inches (multiply feet by 12), 2) Add remaining inches, 3) Multiply total inches by 2.54 to get centimeters. For example, 5 feet 9 inches = (5 × 12) + 9 = 69 inches = 69 × 2.54 = 175.26 cm. Our converter handles this automatically. Note: Many health calculators require height in centimeters (metric) or total inches (imperial), not feet alone.',
  },
  {
    question: 'Which weight unit system should I use for fitness tracking?',
    answer:
      'Use whichever system you\'re most familiar with, but be consistent. Metric (kg) is used internationally and in scientific contexts, with finer precision for small changes (0.1 kg = 0.22 lb). Imperial (lb) is common in the US and UK. Stones are primarily British. For detailed tracking, kilograms are often preferred because 0.1 kg increments are easier to track than 0.2 lb increments. What matters most is consistency - don\'t switch systems mid-tracking, as this introduces conversion errors and makes trends harder to spot.',
  },
  {
    question: 'Are the conversion factors in this tool accurate enough for medical use?',
    answer:
      'Yes, our conversion factors use standard international definitions with high precision (4+ decimal places). For example: 1 kg = 2.20462 lb (not 2.2), 1 in = 2.54 cm (exact), 1 kcal = 4.184 kJ (thermochemical). These are suitable for health tracking, nutrition planning, and medical contexts. However, for clinical research or pharmaceutical applications requiring extreme precision, consult official NIST or BIPM standards. For everyday health and fitness use, these conversions are more than adequate.',
  },
];

// Blog article data for related articles
const blogArticles = [
  {
    title: 'TDEE Explained: How Many Calories Do You Really Need?',
    description:
      "Understand the components of Total Daily Energy Expenditure (TDEE), how it's calculated, and why knowing your TDEE is crucial for effective weight management.",
    slug: 'tdee-explained',
    date: 'February 20, 2025',
    readTime: '10 min read',
    category: 'Energy Expenditure',
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
  {
    title: '5 Myths About Calorie Deficits Debunked',
    description:
      "Discover the truth behind common misconceptions about calorie deficits, weight loss, and metabolism. Learn why weight loss isn't always linear and how to set realistic expectations.",
    slug: 'calorie-deficit-myths',
    date: 'February 25, 2025',
    readTime: '8 min read',
    category: 'Weight Management',
  },
];

export default function MeasurementConversions() {
  const [category, setCategory] = useState<ConversionCategory>('weight');
  const [inputValue, setInputValue] = useState<string>('');
  const [fromUnit, setFromUnit] = useState<string>('kg');
  const [toUnit, setToUnit] = useState<string>('lb');
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState<string>('');

  const handleCategoryChange = (newCategory: ConversionCategory) => {
    setCategory(newCategory);
    setFromUnit(CONVERSION_CATEGORIES[newCategory].units[0]);
    setToUnit(CONVERSION_CATEGORIES[newCategory].units[1]);
    setInputValue('');
    setResult(null);
    setError('');
  };

  const handleConvert = () => {
    const value = parseFloat(inputValue);

    if (isNaN(value) || inputValue === '') {
      setError('Please enter a valid number');
      setResult(null);
      return;
    }

    try {
      let converted: number;

      switch (category) {
        case 'weight':
          converted = convertWeight(value, fromUnit as any, toUnit as any); // eslint-disable-line @typescript-eslint/no-explicit-any
          break;
        case 'height':
          converted = convertHeight(value, fromUnit as any, toUnit as any); // eslint-disable-line @typescript-eslint/no-explicit-any
          break;
        case 'volume':
          converted = convertVolume(value, fromUnit as any, toUnit as any); // eslint-disable-line @typescript-eslint/no-explicit-any
          break;
        case 'temperature':
          converted = convertTemperature(value, fromUnit as 'c' | 'f', toUnit as 'c' | 'f');
          break;
        case 'energy':
          converted = convertEnergy(value, fromUnit as 'kcal' | 'kj', toUnit as 'kcal' | 'kj');
          break;
        default:
          throw new Error('Invalid category');
      }

      setResult(converted);
      setError('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Conversion failed');
      setResult(null);
    }
  };

  const handleSwapUnits = () => {
    const temp = fromUnit;
    setFromUnit(toUnit);
    setToUnit(temp);
    if (result !== null) {
      setInputValue(result.toString());
      setResult(parseFloat(inputValue));
    }
  };

  const categoryConfig = CONVERSION_CATEGORIES[category];

  return (
    <ErrorBoundary>
      <div className="max-w-4xl mx-auto">
        {/* Breadcrumb navigation */}
        <Breadcrumb />

        <h1 className="text-3xl font-bold mb-2">Measurement Conversions</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Convert between different units of measurement for weight, height, volume, and more
        </p>

        {/* Social sharing buttons */}
        <div className="mb-8">
          <SocialShare
            url="/conversions"
            title="Measurement Conversions | Weight, Height, Volume & More"
            description="Accurate unit converter for weight, height, volume, temperature, and energy. Perfect for health tracking, fitness planning, and nutrition calculations."
            hashtags={['conversions', 'measurements', 'health', 'fitness']}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Conversion Category</h2>
              <div className="space-y-2">
                {Object.entries(CONVERSION_CATEGORIES).map(([key, config]) => (
                  <button
                    key={key}
                    onClick={() => handleCategoryChange(key as ConversionCategory)}
                    className={`w-full p-3 rounded-lg text-left transition-all ${
                      category === key
                        ? 'bg-accent text-white shadow-lg'
                        : 'neumorph hover:shadow-neumorph-inset'
                    }`}
                  >
                    {config.name}
                  </button>
                ))}
              </div>
            </Card>
          </div>

          <div className="md:col-span-2">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-6">{categoryConfig.name} Converter</h2>

              <div className="space-y-4">
                {/* Input Value */}
                <div>
                  <label className="block text-sm font-medium mb-2">Value</label>
                  <input
                    type="number"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleConvert()}
                    placeholder="Enter value"
                    className="w-full p-3 neumorph-inset rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                    step="any"
                  />
                </div>

                {/* From Unit */}
                <div>
                  <label className="block text-sm font-medium mb-2">From</label>
                  <select
                    value={fromUnit}
                    onChange={(e) => setFromUnit(e.target.value)}
                    className="w-full p-3 neumorph-inset rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                  >
                    {categoryConfig.units.map(unit => (
                      <option key={unit} value={unit}>
                        {categoryConfig.labels[unit as keyof typeof categoryConfig.labels]}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Swap Button */}
                <div className="flex justify-center">
                  <button
                    onClick={handleSwapUnits}
                    className="p-3 neumorph rounded-lg hover:shadow-neumorph-inset transition-all"
                    title="Swap units"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                    </svg>
                  </button>
                </div>

                {/* To Unit */}
                <div>
                  <label className="block text-sm font-medium mb-2">To</label>
                  <select
                    value={toUnit}
                    onChange={(e) => setToUnit(e.target.value)}
                    className="w-full p-3 neumorph-inset rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                  >
                    {categoryConfig.units.map(unit => (
                      <option key={unit} value={unit}>
                        {categoryConfig.labels[unit as keyof typeof categoryConfig.labels]}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Convert Button */}
                <button
                  onClick={handleConvert}
                  className="w-full py-3 px-4 neumorph text-accent font-medium rounded-lg hover:shadow-neumorph-inset transition-all"
                >
                  Convert
                </button>

                {/* Error Message */}
                {error && (
                  <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                    <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
                  </div>
                )}

                {/* Result */}
                {result !== null && (
                  <div className="p-6 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg text-center">
                    <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">Result</div>
                    <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                      {result.toFixed(4)}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {categoryConfig.labels[toUnit as keyof typeof categoryConfig.labels]}
                    </div>
                    <div className="mt-4 text-sm text-gray-500 dark:text-gray-500">
                      {inputValue} {categoryConfig.labels[fromUnit as keyof typeof categoryConfig.labels]} = {result.toFixed(4)} {categoryConfig.labels[toUnit as keyof typeof categoryConfig.labels]}
                    </div>
                  </div>
                )}
              </div>
            </Card>

            {/* Quick Reference */}
            {category === 'weight' && (
              <Card className="p-4 mt-4 bg-blue-50 dark:bg-blue-900/20">
                <h3 className="font-semibold mb-2 text-sm">Quick Reference</h3>
                <div className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                  <div>1 kg = 2.205 lb = 35.274 oz</div>
                  <div>1 stone = 14 lb = 6.350 kg</div>
                </div>
              </Card>
            )}

            {category === 'height' && (
              <Card className="p-4 mt-4 bg-blue-50 dark:bg-blue-900/20">
                <h3 className="font-semibold mb-2 text-sm">Quick Reference</h3>
                <div className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                  <div>1 ft = 12 in = 30.48 cm</div>
                  <div>1 m = 3.281 ft = 100 cm</div>
                </div>
              </Card>
            )}

            {category === 'temperature' && (
              <Card className="p-4 mt-4 bg-blue-50 dark:bg-blue-900/20">
                <h3 className="font-semibold mb-2 text-sm">Quick Reference</h3>
                <div className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                  <div>0°C = 32°F (freezing)</div>
                  <div>37°C = 98.6°F (body temp)</div>
                  <div>100°C = 212°F (boiling)</div>
                </div>
              </Card>
            )}
          </div>
        </div>

        {/* Educational Content */}
        <div className="mt-12 space-y-4">
          <Accordion title="Weight Conversions">
            <p className="mb-3">Common weight conversions for health and fitness:</p>
            <ul className="list-disc pl-5 space-y-2 text-sm">
              <li><span className="font-medium">Kilograms to Pounds:</span> 1 kg = 2.20462 lb</li>
              <li><span className="font-medium">Pounds to Kilograms:</span> 1 lb = 0.453592 kg</li>
              <li><span className="font-medium">Stones to Kilograms:</span> 1 stone = 6.35029 kg</li>
              <li><span className="font-medium">Grams to Ounces:</span> 1 g = 0.035274 oz</li>
            </ul>
          </Accordion>

          <Accordion title="Height and Length Conversions">
            <p className="mb-3">Common height and length conversions:</p>
            <ul className="list-disc pl-5 space-y-2 text-sm">
              <li><span className="font-medium">Centimeters to Inches:</span> 1 cm = 0.393701 in</li>
              <li><span className="font-medium">Feet to Centimeters:</span> 1 ft = 30.48 cm</li>
              <li><span className="font-medium">Meters to Feet:</span> 1 m = 3.28084 ft</li>
            </ul>
          </Accordion>

          <Accordion title="Volume Conversions">
            <p className="mb-3">Common volume conversions for cooking and nutrition:</p>
            <ul className="list-disc pl-5 space-y-2 text-sm">
              <li><span className="font-medium">Liters to Cups:</span> 1 L = 4.227 cups</li>
              <li><span className="font-medium">Cups to Milliliters:</span> 1 cup = 236.588 ml</li>
              <li><span className="font-medium">Tablespoons to Milliliters:</span> 1 tbsp = 14.787 ml</li>
              <li><span className="font-medium">Teaspoons to Milliliters:</span> 1 tsp = 4.929 ml</li>
            </ul>
          </Accordion>

          <Accordion title="Temperature Conversions">
            <p className="mb-3">Temperature conversion formulas:</p>
            <ul className="list-disc pl-5 space-y-2 text-sm">
              <li><span className="font-medium">Celsius to Fahrenheit:</span> °F = (°C × 9/5) + 32</li>
              <li><span className="font-medium">Fahrenheit to Celsius:</span> °C = (°F - 32) × 5/9</li>
            </ul>
          </Accordion>

          <Accordion title="Energy Conversions">
            <p className="mb-3">Energy conversion for nutrition:</p>
            <ul className="list-disc pl-5 space-y-2 text-sm">
              <li><span className="font-medium">Calories to Kilojoules:</span> 1 kcal = 4.184 kJ</li>
              <li><span className="font-medium">Kilojoules to Calories:</span> 1 kJ = 0.239 kcal</li>
            </ul>
            <p className="mt-2 text-sm">Note: In nutrition, "calorie" typically refers to kilocalorie (kcal).</p>
          </Accordion>
        </div>

        {/* FAQ Section with structured data */}
        <FAQSection
          faqs={faqs}
          title="Frequently Asked Questions About Unit Conversions"
          className="my-8"
        />

        {/* Related Articles Section */}
        <RelatedArticles
          currentSlug=""
          articles={blogArticles}
          title="Related Articles"
          className="my-8"
        />

        {/* Newsletter Signup */}
        <NewsletterSignup
          title="Get Health & Fitness Tips"
          description="Subscribe to receive the latest health calculators, conversion tools, fitness tips, and exclusive content to help you achieve your health goals."
          className="my-8"
        />

        {/* Structured data for the converter tool */}
        <StructuredData
          data={{
            '@context': 'https://schema.org',
            '@type': 'SoftwareApplication',
            name: 'Measurement Conversions Tool',
            applicationCategory: 'UtilityApplication',
            operatingSystem: 'Web',
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'USD',
            },
            description:
              'Accurate unit converter for weight, height, volume, temperature, and energy. Perfect for health tracking, fitness planning, and nutrition calculations.',
            url: 'https://www.heathcheck.info/conversions',
          }}
        />
      </div>
    </ErrorBoundary>
  );
}
