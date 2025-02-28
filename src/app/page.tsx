'use client';

import React from 'react';
import Link from 'next/link';
import CalculatorCard from '@/components/CalculatorCard';

// Icons for calculator cards
const icons = {
  bodyFat: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  ),
  calorieDeficit: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  ),
  weightManagement: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  ),
  maxFatLoss: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" />
    </svg>
  ),
  tdee: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
    </svg>
  ),
  absi: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  ),
  calorieBurn: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
    </svg>
  ),
  bmi: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  ),
  whr: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    </svg>
  ),
  conversions: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
    </svg>
  ),
};

export default function Home() {
  return (
    <div>
      <section className="mb-12">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Health & Fitness Calculators</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Your go-to resource for body fat, calorie needs, and weight management calculations.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <CalculatorCard
            title="Body Fat Calculator"
            description="Calculate your body fat percentage using various methods including Navy, skinfold, and BMI."
            path="/body-fat"
            icon={icons.bodyFat}
          />
          
          <CalculatorCard
            title="Calorie Deficit Calculator"
            description="Discover how long it will take to reach your goal weight with different calorie deficits."
            path="/calorie-deficit"
            icon={icons.calorieDeficit}
          />
          
          <CalculatorCard
            title="Weight Management Calculator"
            description="Plan your weight loss with a target date and get daily calorie and macro recommendations."
            path="/weight-management"
            icon={icons.weightManagement}
          />
          
          <CalculatorCard
            title="Maximum Fat Loss Calculator"
            description="Find the optimal calorie intake for maximum fat loss while preserving muscle mass."
            path="/maximum-fat-loss"
            icon={icons.maxFatLoss}
          />
          
          <CalculatorCard
            title="TDEE Calculator"
            description="Calculate your Total Daily Energy Expenditure to maintain your current weight."
            path="/tdee"
            icon={icons.tdee}
          />
          
          <CalculatorCard
            title="ABSI Calculator"
            description="Calculate your A Body Shape Index to assess health risk based on body shape."
            path="/absi"
            icon={icons.absi}
          />
          
          <CalculatorCard
            title="BMI Calculator"
            description="Calculate Body Mass Index for adults and children with age-appropriate interpretations."
            path="/bmi"
            icon={icons.bmi}
          />
          
          <CalculatorCard
            title="Waist-to-Hip Ratio"
            description="Calculate your Waist-to-Hip Ratio to assess fat distribution and health risk."
            path="/whr"
            icon={icons.whr}
          />
          
          <CalculatorCard
            title="Measurement Conversions"
            description="Convert between different units of measurement for weight, length, and volume."
            path="/conversions"
            icon={icons.conversions}
          />
        </div>
      </section>
      
      <section className="mb-12">
        <div className="neumorph p-6">
          <h2 className="text-2xl font-bold mb-4">About HealthCheck</h2>
          <p className="mb-4">
            HealthCheck provides evidence-based calculators to help you understand your body composition, 
            calorie needs, and set realistic fitness goals. Our tools use scientifically validated formulas 
            and provide educational content to help you make informed decisions about your health.
          </p>
          <p>
            Whether you're looking to lose weight, gain muscle, or simply understand your body better, 
            our calculators offer personalized insights based on your unique measurements and goals.
          </p>
        </div>
      </section>
      
      <section>
        <div className="neumorph p-6">
          <h2 className="text-2xl font-bold mb-4">Common Misconceptions About Fat Loss</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold">The 3,500 Calorie Rule</h3>
              <p>
                While it's commonly stated that a 3,500 calorie deficit equals one pound of fat loss, 
                the reality is more complex. Your body adapts to calorie restriction over time, and 
                weight loss isn't linear. Our calculators use advanced models that account for these adaptations.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold">Spot Reduction</h3>
              <p>
                You can't target fat loss from specific areas through exercise. Fat reduction occurs 
                throughout the body based on genetics, hormones, and overall calorie deficit. Focus on 
                total body fat percentage rather than "problem areas."
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold">Crash Diets</h3>
              <p>
                Extreme calorie restriction can lead to muscle loss, metabolic adaptation, and eventual 
                weight regain. Our calculators promote sustainable approaches that preserve muscle mass 
                and metabolic health.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
