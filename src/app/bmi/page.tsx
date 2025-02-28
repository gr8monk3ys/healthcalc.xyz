'use client';

import React, { useState } from 'react';
import { calculateBMI, getBMICategory, calculateHealthyWeightRange, estimateBMIPercentile, getBMIPercentileCategory } from '@/app/api/bmi';
import { BMIResult } from '@/types/bmi';
import { Gender, HeightUnit, WeightUnit } from '@/types/common';
import CalculatorForm from '@/components/calculators/CalculatorForm';
import BMIResultDisplay from '@/components/calculators/bmi/BMIResult';
import BMIInfo from '@/components/calculators/bmi/BMIInfo';
import BMIUnderstanding from '@/components/calculators/bmi/BMIUnderstanding';

export default function BMICalculator() {
  // State for form inputs
  const [age, setAge] = useState<number | ''>('');
  const [gender, setGender] = useState<Gender>('male');
  const [height, setHeight] = useState<number | ''>('');
  const [heightUnit, setHeightUnit] = useState<HeightUnit>('cm');
  const [weight, setWeight] = useState<number | ''>('');
  const [weightUnit, setWeightUnit] = useState<WeightUnit>('kg');
  const [isChild, setIsChild] = useState<boolean>(false);
  
  // State for form validation
  const [errors, setErrors] = useState<{
    age?: string;
    height?: string;
    weight?: string;
  }>({});
  
  // State for calculation result
  const [result, setResult] = useState<BMIResult | null>(null);
  const [showResult, setShowResult] = useState<boolean>(false);
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    const newErrors: {
      age?: string;
      height?: string;
      weight?: string;
    } = {};
    
    if (age === '') {
      newErrors.age = 'Age is required';
    } else if (typeof age === 'number' && (age < 2 || age > 120)) {
      newErrors.age = 'Age must be between 2 and 120';
    }
    
    if (height === '') {
      newErrors.height = 'Height is required';
    } else if (typeof height === 'number') {
      if (heightUnit === 'cm' && (height < 50 || height > 300)) {
        newErrors.height = 'Height must be between 50 and 300 cm';
      } else if (heightUnit === 'ft' && (height < 1.5 || height > 9)) {
        newErrors.height = 'Height must be between 1.5 and 9 feet';
      }
    }
    
    if (weight === '') {
      newErrors.weight = 'Weight is required';
    } else if (typeof weight === 'number') {
      if (weightUnit === 'kg' && (weight < 10 || weight > 500)) {
        newErrors.weight = 'Weight must be between 10 and 500 kg';
      } else if (weightUnit === 'lb' && (weight < 22 || weight > 1100)) {
        newErrors.weight = 'Weight must be between 22 and 1100 lb';
      }
    }
    
    setErrors(newErrors);
    
    // If no errors, calculate BMI
    if (Object.keys(newErrors).length === 0 && 
        typeof age === 'number' && 
        typeof height === 'number' && 
        typeof weight === 'number') {
      
      // Set isChild based on age
      const childStatus = age < 20;
      setIsChild(childStatus);
      
      // Convert height to cm if needed
      const heightCm = heightUnit === 'cm' ? height : height * 30.48;
      
      // Convert weight to kg if needed
      const weightKg = weightUnit === 'kg' ? weight : weight / 2.20462;
      
      // Calculate BMI
      const bmi = calculateBMI(heightCm, weightKg);
      
      // Get healthy weight range
      const healthyWeightRange = calculateHealthyWeightRange(heightCm);
      
      // Convert healthy weight range to the current unit
      const displayHealthyWeightRange = {
        min: weightUnit === 'kg' 
          ? healthyWeightRange.min 
          : healthyWeightRange.min * 2.20462,
        max: weightUnit === 'kg' 
          ? healthyWeightRange.max 
          : healthyWeightRange.max * 2.20462
      };
      
      // Create result object
      let bmiResult: BMIResult;
      
      if (childStatus) {
        // For children
        const percentile = estimateBMIPercentile(bmi, age, gender);
        const { name: category, color } = getBMIPercentileCategory(percentile);
        
        bmiResult = {
          bmi: Math.round(bmi * 10) / 10,
          category,
          color,
          healthyWeightRange: displayHealthyWeightRange,
          percentile
        };
      } else {
        // For adults
        const { name: category, color } = getBMICategory(bmi);
        
        bmiResult = {
          bmi: Math.round(bmi * 10) / 10,
          category,
          color,
          healthyWeightRange: displayHealthyWeightRange
        };
      }
      
      setResult(bmiResult);
      setShowResult(true);
      
      // Scroll to result with smooth animation
      setTimeout(() => {
        const resultElement = document.getElementById('bmi-result');
        if (resultElement) {
          resultElement.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
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
    setAge('');
    setGender('male');
    setHeight('');
    setHeightUnit('cm');
    setWeight('');
    setWeightUnit('kg');
    setErrors({});
    setResult(null);
    setShowResult(false);
  };

  // Form fields for the CalculatorForm component
  const formFields = [
    {
      name: 'age',
      label: 'Age',
      type: 'number' as const,
      value: age,
      onChange: setAge,
      error: errors.age,
      placeholder: 'Years'
    },
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
      name: 'height',
      label: 'Height',
      type: 'number' as const,
      value: height,
      onChange: setHeight,
      error: errors.height,
      placeholder: heightUnit === 'cm' ? 'Centimeters' : 'Feet',
      unit: heightUnit === 'cm' ? 'cm' : 'ft',
      unitToggle: toggleHeightUnit,
      step: '0.1'
    },
    {
      name: 'weight',
      label: 'Weight',
      type: 'number' as const,
      value: weight,
      onChange: setWeight,
      error: errors.weight,
      placeholder: weightUnit === 'kg' ? 'Kilograms' : 'Pounds',
      unit: weightUnit === 'kg' ? 'kg' : 'lb',
      unitToggle: toggleWeightUnit,
      step: '0.1'
    }
  ];
  
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">BMI Calculator</h1>
      <p className="text-gray-600 mb-6">
        Calculate your Body Mass Index (BMI) and find your healthy weight range based on your height.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <CalculatorForm
            title="Enter Your Details"
            fields={formFields}
            onSubmit={handleSubmit}
            onReset={handleReset}
          />
        </div>
        
        <div className="md:col-span-2">
          {showResult && result ? (
            <BMIResultDisplay
              result={result}
              isChild={isChild}
              weightUnit={weightUnit}
            />
          ) : (
            <BMIInfo />
          )}
        </div>
      </div>
      
      <BMIUnderstanding />
    </div>
  );
}
