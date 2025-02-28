'use client';

import React, { useState } from 'react';
import { ActivityLevel, Gender, HeightUnit, WeightUnit } from '@/types/common';
import { calculateBMR, calculateTDEE, getActivityMultiplier } from '@/app/api/tdee';
import { ACTIVITY_MULTIPLIERS } from '@/constants/tdee';
import CalculatorForm from '@/components/calculators/CalculatorForm';
import TDEEResult from '@/components/calculators/tdee/TDEEResult';
import TDEEInfo from '@/components/calculators/tdee/TDEEInfo';
import TDEEUnderstanding from '@/components/calculators/tdee/TDEEUnderstanding';

export default function TDEECalculator() {
  // State for form inputs
  const [age, setAge] = useState<number | ''>('');
  const [gender, setGender] = useState<Gender>('male');
  const [height, setHeight] = useState<number | ''>('');
  const [heightUnit, setHeightUnit] = useState<HeightUnit>('cm');
  const [weight, setWeight] = useState<number | ''>('');
  const [weightUnit, setWeightUnit] = useState<WeightUnit>('kg');
  const [activityLevel, setActivityLevel] = useState<ActivityLevel>('sedentary');
  
  // State for form validation
  const [errors, setErrors] = useState<{
    age?: string;
    height?: string;
    weight?: string;
  }>({});
  
  // State for calculation result
  const [result, setResult] = useState<{
    bmr: number;
    tdee: number;
    activityMultiplier: number;
    dailyCalories: {
      maintain: number;
      mildLoss: number;
      moderateLoss: number;
      extremeLoss: number;
      mildGain: number;
      moderateGain: number;
      extremeGain: number;
    };
  } | null>(null);
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
    } else if (typeof age === 'number' && (age < 15 || age > 80)) {
      newErrors.age = 'Age must be between 15 and 80';
    }
    
    if (height === '') {
      newErrors.height = 'Height is required';
    } else if (typeof height === 'number') {
      if (heightUnit === 'cm' && (height < 130 || height > 230)) {
        newErrors.height = 'Height must be between 130 and 230 cm';
      } else if (heightUnit === 'ft' && (height < 4 || height > 7.5)) {
        newErrors.height = 'Height must be between 4 and 7.5 feet';
      }
    }
    
    if (weight === '') {
      newErrors.weight = 'Weight is required';
    } else if (typeof weight === 'number') {
      if (weightUnit === 'kg' && (weight < 40 || weight > 200)) {
        newErrors.weight = 'Weight must be between 40 and 200 kg';
      } else if (weightUnit === 'lb' && (weight < 88 || weight > 440)) {
        newErrors.weight = 'Weight must be between 88 and 440 lb';
      }
    }
    
    setErrors(newErrors);
    
    // If no errors, calculate TDEE
    if (Object.keys(newErrors).length === 0 && 
        typeof age === 'number' && 
        typeof height === 'number' && 
        typeof weight === 'number') {
      
      // Convert height to cm if needed
      const heightCm = heightUnit === 'cm' ? height : height * 30.48;
      
      // Convert weight to kg if needed
      const weightKg = weightUnit === 'kg' ? weight : weight / 2.20462;
      
      // Get activity multiplier
      const activityMultiplier = getActivityMultiplier(activityLevel);
      
      // Calculate BMR
      const bmr = calculateBMR(gender, age, weightKg, heightCm);
      
      // Calculate TDEE
      const tdee = calculateTDEE(bmr, activityMultiplier);
      
      // Calculate daily calories for different goals
      const dailyCalories = {
        maintain: Math.round(tdee),
        mildLoss: Math.round(tdee * 0.9), // 10% deficit
        moderateLoss: Math.round(tdee * 0.8), // 20% deficit
        extremeLoss: Math.round(tdee * 0.75), // 25% deficit
        mildGain: Math.round(tdee * 1.1), // 10% surplus
        moderateGain: Math.round(tdee * 1.15), // 15% surplus
        extremeGain: Math.round(tdee * 1.2), // 20% surplus
      };
      
      setResult({
        bmr: Math.round(bmr),
        tdee: Math.round(tdee),
        activityMultiplier,
        dailyCalories,
      });
      
      setShowResult(true);
      
      // Scroll to result with smooth animation
      setTimeout(() => {
        const resultElement = document.getElementById('tdee-result');
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
    setActivityLevel('sedentary');
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
    },
    {
      name: 'activity',
      label: 'Activity Level',
      type: 'select' as const,
      value: activityLevel,
      onChange: setActivityLevel,
      options: ACTIVITY_MULTIPLIERS.map(level => ({
        value: level.level,
        label: level.label,
        description: level.description
      }))
    }
  ];
  
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">TDEE Calculator</h1>
      <p className="text-gray-600 mb-6">
        Calculate your Total Daily Energy Expenditure (TDEE) to determine your daily calorie needs.
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
            <TDEEResult result={result} />
          ) : (
            <TDEEInfo />
          )}
        </div>
      </div>
      
      <TDEEUnderstanding />
    </div>
  );
}
