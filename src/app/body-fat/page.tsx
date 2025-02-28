'use client';

import React, { useState } from 'react';
import { Gender, HeightUnit, WeightUnit } from '@/types/common';
import { BodyFatMethod, BodyFatResult as BodyFatResultType } from '@/types/bodyFat';
import { calculateBodyFat, getBodyFatCategory, getHealthyBodyFatRange, calculateFatAndLeanMass } from '@/app/api/bodyFat';
import { BODY_FAT_METHODS } from '@/constants/bodyFat';
import { calculateBMI } from '@/app/api/bmi';
import CalculatorForm from '@/components/calculators/CalculatorForm';
import BodyFatResultDisplay from '@/components/calculators/body-fat/BodyFatResult';
import BodyFatInfo from '@/components/calculators/body-fat/BodyFatInfo';
import BodyFatUnderstanding from '@/components/calculators/body-fat/BodyFatUnderstanding';

export default function Bodyhealthcheckulator() {
  // State for form inputs
  const [gender, setGender] = useState<Gender>('male');
  const [age, setAge] = useState<number | ''>('');
  const [height, setHeight] = useState<number | ''>('');
  const [heightUnit, setHeightUnit] = useState<HeightUnit>('cm');
  const [weight, setWeight] = useState<number | ''>('');
  const [weightUnit, setWeightUnit] = useState<WeightUnit>('kg');
  const [method, setMethod] = useState<BodyFatMethod>('navy');
  const [waist, setWaist] = useState<number | ''>('');
  const [neck, setNeck] = useState<number | ''>('');
  const [hips, setHips] = useState<number | ''>('');
  const [bodyFatPercentage, setBodyFatPercentage] = useState<number | ''>('');
  
  // State for form validation
  const [errors, setErrors] = useState<{
    age?: string;
    height?: string;
    weight?: string;
    waist?: string;
    neck?: string;
    hips?: string;
    bodyFatPercentage?: string;
  }>({});
  
  // State for calculation result
  const [result, setResult] = useState<BodyFatResultType | null>(null);
  const [showResult, setShowResult] = useState<boolean>(false);
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    const newErrors: {
      age?: string;
      height?: string;
      weight?: string;
      waist?: string;
      neck?: string;
      hips?: string;
      bodyFatPercentage?: string;
    } = {};
    
    if (age === '') {
      newErrors.age = 'Age is required';
    } else if (typeof age === 'number' && (age < 18 || age > 80)) {
      newErrors.age = 'Age must be between 18 and 80';
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
    
    // Method-specific validations
    if (method === 'navy') {
      if (waist === '') {
        newErrors.waist = 'Waist measurement is required';
      } else if (typeof waist === 'number' && (waist < 50 || waist > 200)) {
        newErrors.waist = 'Waist must be between 50 and 200 cm';
      }
      
      if (neck === '') {
        newErrors.neck = 'Neck measurement is required';
      } else if (typeof neck === 'number' && (neck < 20 || neck > 60)) {
        newErrors.neck = 'Neck must be between 20 and 60 cm';
      }
      
      if (gender === 'female' && hips === '') {
        newErrors.hips = 'Hip measurement is required for women';
      } else if (gender === 'female' && typeof hips === 'number' && (hips < 70 || hips > 200)) {
        newErrors.hips = 'Hips must be between 70 and 200 cm';
      }
    } else if (method === 'manual') {
      if (bodyFatPercentage === '') {
        newErrors.bodyFatPercentage = 'Body fat percentage is required';
      } else if (typeof bodyFatPercentage === 'number') {
        if (gender === 'male' && (bodyFatPercentage < 2 || bodyFatPercentage > 50)) {
          newErrors.bodyFatPercentage = 'Body fat must be between 2% and 50%';
        } else if (gender === 'female' && (bodyFatPercentage < 10 || bodyFatPercentage > 60)) {
          newErrors.bodyFatPercentage = 'Body fat must be between 10% and 60%';
        }
      }
    }
    
    setErrors(newErrors);
    
    // If no errors, calculate body fat
    if (Object.keys(newErrors).length === 0 && 
        typeof age === 'number' && 
        typeof height === 'number' && 
        typeof weight === 'number') {
      
      // Convert height to cm if needed
      const heightCm = heightUnit === 'cm' ? height : height * 30.48;
      
      // Convert weight to kg if needed
      const weightKg = weightUnit === 'kg' ? weight : weight / 2.20462;
      
      // Calculate BMI
      const bmi = calculateBMI(heightCm, weightKg);
      
      // Prepare parameters for body fat calculation
      const params = {
        gender,
        age,
        heightCm,
        weightKg,
        bmi,
        waistCm: typeof waist === 'number' ? waist : undefined,
        neckCm: typeof neck === 'number' ? neck : undefined,
        hipsCm: typeof hips === 'number' ? hips : undefined,
        bodyFatPercentage: typeof bodyFatPercentage === 'number' ? bodyFatPercentage : undefined
      };
      
      try {
        // Calculate body fat percentage
        const bodyFatPercentage = calculateBodyFat(method, params);
        
        // Get category
        const { name: category, color } = getBodyFatCategory(gender, bodyFatPercentage);
        
        // Get healthy range
        const healthyRange = getHealthyBodyFatRange(gender);
        
        // Calculate fat mass and lean mass
        const { fatMass, leanMass } = calculateFatAndLeanMass(weightKg, bodyFatPercentage);
        
        // Create result object
        const bodyFatResult: BodyFatResultType = {
          bodyFatPercentage,
          category,
          color,
          fatMass,
          leanMass,
          healthyRange
        };
        
        setResult(bodyFatResult);
        setShowResult(true);
        
        // Scroll to result with smooth animation
        setTimeout(() => {
          const resultElement = document.getElementById('body-fat-result');
          if (resultElement) {
            resultElement.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      } catch (error) {
        console.error('Error calculating body fat:', error);
        // Handle error (could set an error state here)
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
    setMethod('navy');
    setWaist('');
    setNeck('');
    setHips('');
    setBodyFatPercentage('');
    setErrors({});
    setResult(null);
    setShowResult(false);
  };
  
  // Handle method change
  const handleMethodChange = (newMethod: BodyFatMethod) => {
    setMethod(newMethod);
    // Clear method-specific errors when changing methods
    setErrors(prev => {
      const updated = { ...prev };
      delete updated.waist;
      delete updated.neck;
      delete updated.hips;
      delete updated.bodyFatPercentage;
      return updated;
    });
  };
  
  // Get method-specific fields
  const getMethodFields = () => {
    const fields = [];
    
    if (method === 'navy') {
      fields.push(
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
          name: 'neck',
          label: 'Neck Circumference (cm)',
          type: 'number' as const,
          value: neck,
          onChange: setNeck,
          error: errors.neck,
          placeholder: 'Centimeters',
          step: '0.1'
        }
      );
      
      if (gender === 'female') {
        fields.push({
          name: 'hips',
          label: 'Hip Circumference (cm)',
          type: 'number' as const,
          value: hips,
          onChange: setHips,
          error: errors.hips,
          placeholder: 'Centimeters',
          step: '0.1'
        });
      }
    } else if (method === 'manual') {
      fields.push({
        name: 'bodyFatPercentage',
        label: 'Body Fat Percentage (%)',
        type: 'number' as const,
        value: bodyFatPercentage,
        onChange: setBodyFatPercentage,
        error: errors.bodyFatPercentage,
        placeholder: 'Percentage',
        step: '0.1'
      });
    }
    
    return fields;
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
      name: 'age',
      label: 'Age',
      type: 'number' as const,
      value: age,
      onChange: setAge,
      error: errors.age,
      placeholder: 'Years'
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
      name: 'method',
      label: 'Calculation Method',
      type: 'select' as const,
      value: method,
      onChange: handleMethodChange,
      options: BODY_FAT_METHODS.map(m => ({
        value: m.value,
        label: m.label,
        description: m.description
      }))
    },
    ...getMethodFields()
  ];
  
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">Body Fat Calculator</h1>
      <p className="text-gray-600 mb-6">
        Calculate your body fat percentage using various methods including Navy, skinfold, and BMI
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
            <BodyFatResultDisplay
              result={result}
              gender={gender}
              weightUnit={weightUnit}
              method={BODY_FAT_METHODS.find(m => m.value === method)?.label || method}
            />
          ) : (
            <BodyFatInfo />
          )}
        </div>
      </div>
      
      <BodyFatUnderstanding />
    </div>
  );
}
