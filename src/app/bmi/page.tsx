'use client';

import React, { useState } from 'react';
import { calculateBMI, getBMICategory, calculateHealthyWeightRange, estimateBMIPercentile, getBMIPercentileCategory } from '@/app/api/bmi';
import { BMIResult } from '@/types/bmi';
import { HeightUnit, WeightUnit } from '@/types/common';

export default function BMICalculator() {
  // State for form inputs
  const [age, setAge] = useState<number | ''>('');
  const [gender, setGender] = useState<'male' | 'female'>('male');
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
  
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">BMI Calculator</h1>
      <p className="text-gray-600 mb-6">
        Calculate your Body Mass Index (BMI) and find your healthy weight range based on your height.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <div className="neumorph p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Enter Your Details</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="age" className="block text-sm font-medium mb-1">
                  Age
                </label>
                <input
                  type="number"
                  id="age"
                  value={age}
                  onChange={(e) => setAge(e.target.value === '' ? '' : parseFloat(e.target.value))}
                  className={`w-full p-3 neumorph-inset rounded-lg focus:outline-none focus:ring-2 focus:ring-accent ${
                    errors.age ? 'border border-red-500' : ''
                  }`}
                  placeholder="Years"
                />
                {errors.age && <p className="text-red-500 text-sm mt-1">{errors.age}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Gender</label>
                <div className="flex space-x-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      checked={gender === 'male'}
                      onChange={() => setGender('male')}
                      className="mr-2"
                    />
                    <span>Male</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      checked={gender === 'female'}
                      onChange={() => setGender('female')}
                      className="mr-2"
                    />
                    <span>Female</span>
                  </label>
                </div>
              </div>
              
              <div>
                <label htmlFor="height" className="block text-sm font-medium mb-1">
                  Height
                </label>
                <div className="flex">
                  <input
                    type="number"
                    id="height"
                    value={height}
                    onChange={(e) => setHeight(e.target.value === '' ? '' : parseFloat(e.target.value))}
                    className={`w-full p-3 neumorph-inset rounded-l-lg focus:outline-none focus:ring-2 focus:ring-accent ${
                      errors.height ? 'border border-red-500' : ''
                    }`}
                    placeholder={heightUnit === 'cm' ? 'Centimeters' : 'Feet'}
                    step="0.1"
                  />
                  <button
                    type="button"
                    onClick={toggleHeightUnit}
                    className="px-4 neumorph rounded-r-lg hover:shadow-neumorph-inset transition-all"
                  >
                    {heightUnit === 'cm' ? 'cm' : 'ft'}
                  </button>
                </div>
                {errors.height && <p className="text-red-500 text-sm mt-1">{errors.height}</p>}
              </div>
              
              <div>
                <label htmlFor="weight" className="block text-sm font-medium mb-1">
                  Weight
                </label>
                <div className="flex">
                  <input
                    type="number"
                    id="weight"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value === '' ? '' : parseFloat(e.target.value))}
                    className={`w-full p-3 neumorph-inset rounded-l-lg focus:outline-none focus:ring-2 focus:ring-accent ${
                      errors.weight ? 'border border-red-500' : ''
                    }`}
                    placeholder={weightUnit === 'kg' ? 'Kilograms' : 'Pounds'}
                    step="0.1"
                  />
                  <button
                    type="button"
                    onClick={toggleWeightUnit}
                    className="px-4 neumorph rounded-r-lg hover:shadow-neumorph-inset transition-all"
                  >
                    {weightUnit === 'kg' ? 'kg' : 'lb'}
                  </button>
                </div>
                {errors.weight && <p className="text-red-500 text-sm mt-1">{errors.weight}</p>}
              </div>
              
              <div className="flex space-x-4 pt-2">
                <button
                  type="submit"
                  className="flex-1 py-3 px-4 neumorph text-accent font-medium rounded-lg hover:shadow-neumorph-inset transition-all"
                >
                  Calculate
                </button>
                <button
                  type="button"
                  onClick={handleReset}
                  className="py-3 px-4 neumorph text-gray-500 font-medium rounded-lg hover:shadow-neumorph-inset transition-all"
                >
                  Reset
                </button>
              </div>
            </form>
          </div>
        </div>
        
        <div className="md:col-span-2">
          {showResult && result ? (
            <div 
              id="bmi-result" 
              className="neumorph p-6 rounded-lg transition-all duration-500 transform animate-fade-in"
            >
              <h2 className="text-xl font-semibold mb-4">Your BMI Results</h2>
              
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">BMI Value</span>
                  <span className="text-2xl font-bold">{result.bmi.toFixed(1)}</span>
                </div>
                
                <div className="relative h-6 neumorph-inset rounded-full overflow-hidden">
                  <div className="absolute inset-0 flex">
                    <div className="h-full bg-blue-200" style={{ width: '20%' }}></div>
                    <div className="h-full bg-green-200" style={{ width: '15%' }}></div>
                    <div className="h-full bg-yellow-200" style={{ width: '15%' }}></div>
                    <div className="h-full bg-orange-200" style={{ width: '15%' }}></div>
                    <div className="h-full bg-red-200" style={{ width: '35%' }}></div>
                  </div>
                  
                  <div 
                    className="absolute top-0 h-6 w-3 bg-accent rounded-full transform -translate-x-1/2 transition-all duration-500"
                    style={{ 
                      left: `${Math.min(Math.max((result.bmi - 10) / 30 * 100, 0), 100)}%`,
                    }}
                  ></div>
                </div>
                
                <div className="flex justify-between text-xs mt-1">
                  <span>Underweight</span>
                  <span>Normal</span>
                  <span>Overweight</span>
                  <span>Obese</span>
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="font-medium mb-2">
                  {isChild ? 'BMI Percentile Classification' : 'BMI Classification'}
                </h3>
                <div className="neumorph-inset p-4 rounded-lg">
                  <p className="font-medium text-lg">
                    {isChild && result.percentile !== undefined
                      ? `${result.percentile}th Percentile - ${result.category}`
                      : result.category
                    }
                  </p>
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="font-medium mb-2">Healthy Weight Range for Your Height</h3>
                <div className="neumorph-inset p-4 rounded-lg">
                  <p className="font-medium text-lg">
                    {result.healthyWeightRange.min.toFixed(1)} - {result.healthyWeightRange.max.toFixed(1)} {weightUnit}
                  </p>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">What This Means</h3>
                <p className="mb-2">
                  {isChild && result.percentile !== undefined ? (
                    <>
                      Your child's BMI is at the {result.percentile}th percentile for their age and sex. 
                      {result.percentile < 5 
                        ? ' This is considered underweight. Consult with a healthcare provider to ensure proper growth and nutrition.'
                        : result.percentile >= 5 && result.percentile < 85
                          ? ' This is within the healthy weight range.'
                          : result.percentile >= 85 && result.percentile < 95
                            ? ' This is considered overweight. Consider discussing healthy lifestyle habits with a healthcare provider.'
                            : ' This is considered obese. It is recommended to consult with a healthcare provider about healthy weight management strategies.'
                      }
                    </>
                  ) : (
                    <>
                      {result.bmi < 18.5 
                        ? 'Being underweight can be associated with certain health risks including nutrient deficiencies and immune system issues. Consider consulting with a healthcare provider.'
                        : result.bmi >= 18.5 && result.bmi < 25
                          ? 'Your BMI is within the healthy range. Maintaining a healthy weight can lower your risk of developing serious health problems.'
                          : result.bmi >= 25 && result.bmi < 30
                            ? 'Being overweight increases your risk of developing health problems such as heart disease, high blood pressure, and type 2 diabetes.'
                            : 'Obesity is associated with higher risks for serious health conditions including heart disease, stroke, type 2 diabetes, and certain cancers.'
                      }
                    </>
                  )}
                </p>
                <p className="text-sm text-gray-600">
                  Note: BMI is a screening tool but does not diagnose body fatness or health. Athletes may have a high BMI due to muscle mass. Consult a healthcare provider for a complete health assessment.
                </p>
              </div>
            </div>
          ) : (
            <div className="neumorph p-6 rounded-lg h-full">
              <h2 className="text-xl font-semibold mb-4">About BMI</h2>
              
              <div className="space-y-4">
                <p>
                  Body Mass Index (BMI) is a simple calculation using a person's height and weight. The formula is BMI = kg/m² where kg is a person's weight in kilograms and m² is their height in meters squared.
                </p>
                
                <h3 className="font-medium">BMI Categories for Adults:</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li><strong>Underweight:</strong> BMI less than 18.5</li>
                  <li><strong>Normal weight:</strong> BMI 18.5 to 24.9</li>
                  <li><strong>Overweight:</strong> BMI 25 to 29.9</li>
                  <li><strong>Obesity:</strong> BMI 30 or greater</li>
                </ul>
                
                <h3 className="font-medium">For Children and Teens (2-19 years):</h3>
                <p>
                  BMI is calculated the same way, but the interpretation is different. Results are compared to typical values for other children of the same age and sex, using percentiles:
                </p>
                <ul className="list-disc pl-5 space-y-1">
                  <li><strong>Underweight:</strong> Less than the 5th percentile</li>
                  <li><strong>Healthy weight:</strong> 5th to 84th percentile</li>
                  <li><strong>Overweight:</strong> 85th to 94th percentile</li>
                  <li><strong>Obesity:</strong> 95th percentile or greater</li>
                </ul>
                
                <h3 className="font-medium">Limitations of BMI:</h3>
                <p>
                  BMI is a useful screening tool, but it has limitations. It doesn't distinguish between muscle and fat, nor does it account for factors like age, sex, ethnicity, or muscle mass. Athletes and muscular individuals may have a high BMI without excess fat.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <div className="mt-12 neumorph p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Understanding Your BMI</h2>
        
        <div className="space-y-4">
          <p>
            BMI provides a simple numeric measure of your weight relative to height. It was developed in the 19th century by Belgian mathematician Adolphe Quetelet and is widely used as a screening tool to categorize weight status.
          </p>
          
          <h3 className="font-medium">Why BMI Matters</h3>
          <p>
            Research has shown that BMI correlates with direct measures of body fat and with various health risks. Higher BMIs are associated with increased risk for conditions like:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Heart disease and stroke</li>
            <li>Type 2 diabetes</li>
            <li>High blood pressure</li>
            <li>Certain types of cancer</li>
            <li>Sleep apnea and breathing problems</li>
            <li>Osteoarthritis</li>
          </ul>
          
          <h3 className="font-medium">Beyond BMI</h3>
          <p>
            While BMI is useful for population studies and general screening, it doesn't tell the complete story about your health. Other factors to consider include:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Body composition:</strong> The ratio of fat to muscle in your body</li>
            <li><strong>Fat distribution:</strong> Where fat is stored on your body (abdominal fat carries higher health risks)</li>
            <li><strong>Waist circumference:</strong> A measurement of abdominal fat</li>
            <li><strong>Lifestyle factors:</strong> Diet quality, physical activity, sleep, and stress</li>
            <li><strong>Family history:</strong> Genetic predisposition to certain conditions</li>
          </ul>
          
          <p>
            For a more comprehensive assessment of your health status, consider using our other calculators like the <a href="/body-fat" className="text-accent hover:underline">Body Fat Calculator</a> or <a href="/absi" className="text-accent hover:underline">ABSI Calculator</a>, and consult with healthcare professionals.
          </p>
        </div>
      </div>
    </div>
  );
}
