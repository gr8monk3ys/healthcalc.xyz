'use client';

import React, { useState } from 'react';
import { Gender } from '@/types/common';
import { WHRResult as WHRResultType } from '@/types/whr';
import { calculateWHRWithCategory } from '@/app/api/whr';
import CalculatorForm from '@/components/calculators/CalculatorForm';
import WHRResultDisplay from '@/components/calculators/whr/WHRResult';
import WHRInfo from '@/components/calculators/whr/WHRInfo';
import WHRUnderstanding from '@/components/calculators/whr/WHRUnderstanding';

export default function WHRCalculator() {
  // State for form inputs
  const [gender, setGender] = useState<Gender>('male');
  const [waist, setWaist] = useState<number | ''>('');
  const [hips, setHips] = useState<number | ''>('');
  
  // State for form validation
  const [errors, setErrors] = useState<{
    waist?: string;
    hips?: string;
  }>({});
  
  // State for calculation result
  const [result, setResult] = useState<WHRResultType | null>(null);
  const [showResult, setShowResult] = useState<boolean>(false);
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    const newErrors: {
      waist?: string;
      hips?: string;
    } = {};
    
    if (waist === '') {
      newErrors.waist = 'Waist measurement is required';
    } else if (typeof waist === 'number' && (waist < 50 || waist > 200)) {
      newErrors.waist = 'Waist must be between 50 and 200 cm';
    }
    
    if (hips === '') {
      newErrors.hips = 'Hip measurement is required';
    } else if (typeof hips === 'number' && (hips < 70 || hips > 200)) {
      newErrors.hips = 'Hips must be between 70 and 200 cm';
    }
    
    setErrors(newErrors);
    
    // If no errors, calculate WHR
    if (Object.keys(newErrors).length === 0 && 
        typeof waist === 'number' && 
        typeof hips === 'number') {
      
      try {
        // Calculate WHR and get category
        const whrResult = calculateWHRWithCategory(waist, hips, gender);
        
        setResult(whrResult);
        setShowResult(true);
        
        // Scroll to result with smooth animation
        setTimeout(() => {
          const resultElement = document.getElementById('whr-result');
          if (resultElement) {
            resultElement.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      } catch (error) {
        console.error('Error calculating WHR:', error);
        // Handle error (could set an error state here)
      }
    }
  };
  
  // Reset form
  const handleReset = () => {
    setGender('male');
    setWaist('');
    setHips('');
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
      onChange: setGender,
      options: [
        { value: 'male', label: 'Male' },
        { value: 'female', label: 'Female' }
      ]
    },
    {
      name: 'waist',
      label: 'Waist Circumference (cm)',
      type: 'number' as const,
      value: waist,
      onChange: setWaist,
      error: errors.waist,
      placeholder: 'Centimeters',
      step: '0.1'
    },
    {
      name: 'hips',
      label: 'Hip Circumference (cm)',
      type: 'number' as const,
      value: hips,
      onChange: setHips,
      error: errors.hips,
      placeholder: 'Centimeters',
      step: '0.1'
    }
  ];
  
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">Waist-to-Hip Ratio (WHR) Calculator</h1>
      <p className="text-gray-600 mb-6">
        Calculate your waist-to-hip ratio to assess your body fat distribution and health risks
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <CalculatorForm
            title="Enter Your Measurements"
            fields={formFields}
            onSubmit={handleSubmit}
            onReset={handleReset}
          />
        </div>
        
        <div className="md:col-span-2">
          {showResult && result ? (
            <WHRResultDisplay result={result} gender={gender} />
          ) : (
            <WHRInfo />
          )}
        </div>
      </div>
      
      <WHRUnderstanding />
    </div>
  );
}
