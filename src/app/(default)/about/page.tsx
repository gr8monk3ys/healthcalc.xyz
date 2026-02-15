import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'About Us | HealthCheck',
  description:
    'Learn about HealthCheck, our mission, and the science behind our health and fitness calculators.',
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">About HealthCheck</h1>

      <div className="neumorph p-6 mb-8 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
        <p className="mb-4">
          HealthCheck is your go-to resource for evidence-based health and fitness calculators. We
          believe in making health information accessible, accurate, and actionable for everyone.
        </p>
        <p>
          Our suite of calculators helps you understand your body composition and calorie needs,
          empowering you to make informed decisions about your health based on your results.
        </p>
      </div>

      <div className="neumorph p-6 mb-8 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">The Science Behind Our Calculators</h2>
        <p className="mb-4">
          All our calculators are built on scientifically validated formulas and methodologies. We
          regularly review and update our calculations based on the latest research to ensure
          accuracy.
        </p>
        <p className="mb-4">
          Our body composition calculators use methods like the U.S. Navy formula, Jackson-Pollock
          skinfold equations, and BMI correlations to estimate body fat percentage. For energy
          expenditure, we implement the Mifflin-St Jeor equation, which research has shown to be the
          most accurate for most individuals.
        </p>
        <p>
          While these calculators provide valuable estimates, they are not substitutes for
          professional medical advice or laboratory measurements. We encourage users to consult with
          healthcare professionals for personalized guidance.
        </p>
      </div>

      <div className="neumorph p-6 mb-8 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Our Approach</h2>
        <p className="mb-4">At HealthCheck, we believe in:</p>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li>
            <strong>Accuracy:</strong> Using validated scientific formulas and methodologies
          </li>
          <li>
            <strong>Education:</strong> Providing context and explanation alongside results
          </li>
          <li>
            <strong>Accessibility:</strong> Making health information available to everyone
          </li>
          <li>
            <strong>Transparency:</strong> Clearly explaining our calculation methods
          </li>
          <li>
            <strong>Privacy:</strong> Respecting user data and performing calculations locally
          </li>
        </ul>
        <p>
          We strive to provide tools that help you understand your body better and make informed
          decisions about your health and fitness journey.
        </p>
      </div>

      <div className="neumorph p-6 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Get Started</h2>
        <p className="mb-4">
          Ready to learn more about your body composition and calorie needs? Check out our
          calculators:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link
            href="/body-fat"
            className="neumorph p-4 rounded-lg hover:shadow-neumorph-inset transition-all"
          >
            <h3 className="font-semibold text-accent">Body Fat Calculator</h3>
            <p className="text-sm text-gray-600">
              Calculate your body fat percentage using various methods
            </p>
          </Link>
          <Link
            href="/bmi"
            className="neumorph p-4 rounded-lg hover:shadow-neumorph-inset transition-all"
          >
            <h3 className="font-semibold text-accent">BMI Calculator</h3>
            <p className="text-sm text-gray-600">Calculate your Body Mass Index</p>
          </Link>
          <Link
            href="/tdee"
            className="neumorph p-4 rounded-lg hover:shadow-neumorph-inset transition-all"
          >
            <h3 className="font-semibold text-accent">TDEE Calculator</h3>
            <p className="text-sm text-gray-600">Calculate your Total Daily Energy Expenditure</p>
          </Link>
          <Link
            href="/calorie-deficit"
            className="neumorph p-4 rounded-lg hover:shadow-neumorph-inset transition-all"
          >
            <h3 className="font-semibold text-accent">Calorie Deficit Calculator</h3>
            <p className="text-sm text-gray-600">Plan your weight loss journey</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
