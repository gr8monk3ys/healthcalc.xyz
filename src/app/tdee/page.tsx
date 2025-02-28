'use client';

import React, { useState } from 'react';
import { ActivityLevel, Gender, HeightUnit, WeightUnit } from '@/types/common';
import { calculateBMR, calculateTDEE, getActivityMultiplier } from '@/app/api/tdee';

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
  
  // Activity level descriptions
  const activityLevels = [
    { 
      value: 'sedentary', 
      label: 'Sedentary', 
      description: 'Little or no exercise, desk job',
      factor: 1.2
    },
    { 
      value: 'lightly_active', 
      label: 'Lightly Active', 
      description: 'Light exercise 1-3 days/week',
      factor: 1.375
    },
    { 
      value: 'moderately_active', 
      label: 'Moderately Active', 
      description: 'Moderate exercise 3-5 days/week',
      factor: 1.55
    },
    { 
      value: 'very_active', 
      label: 'Very Active', 
      description: 'Hard exercise 6-7 days/week',
      factor: 1.725
    },
    { 
      value: 'extremely_active', 
      label: 'Extremely Active', 
      description: 'Very hard exercise, physical job or training twice a day',
      factor: 1.9
    }
  ];
  
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
  
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">TDEE Calculator</h1>
      <p className="text-gray-600 mb-6">
        Calculate your Total Daily Energy Expenditure (TDEE) to determine your daily calorie needs.
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
              
              <div>
                <label htmlFor="activity" className="block text-sm font-medium mb-1">
                  Activity Level
                </label>
                <select
                  id="activity"
                  value={activityLevel}
                  onChange={(e) => setActivityLevel(e.target.value as ActivityLevel)}
                  className="w-full p-3 neumorph-inset rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                >
                  {activityLevels.map((level) => (
                    <option key={level.value} value={level.value}>
                      {level.label}
                    </option>
                  ))}
                </select>
                <p className="text-sm text-gray-500 mt-1">
                  {activityLevels.find(level => level.value === activityLevel)?.description}
                </p>
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
              id="tdee-result" 
              className="neumorph p-6 rounded-lg transition-all duration-500 transform animate-fade-in"
            >
              <h2 className="text-xl font-semibold mb-4">Your TDEE Results</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="neumorph-inset p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-gray-500">Basal Metabolic Rate (BMR)</h3>
                  <p className="text-2xl font-bold">{result.bmr} calories/day</p>
                  <p className="text-xs text-gray-500 mt-1">
                    Calories your body needs at complete rest
                  </p>
                </div>
                
                <div className="neumorph-inset p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-gray-500">Total Daily Energy Expenditure</h3>
                  <p className="text-2xl font-bold">{result.tdee} calories/day</p>
                  <p className="text-xs text-gray-500 mt-1">
                    Total calories burned daily with your activity level
                  </p>
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="font-medium mb-3">Daily Calorie Targets</h3>
                
                <div className="space-y-4">
                  <div className="neumorph-inset p-4 rounded-lg">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-medium">Weight Maintenance</h4>
                        <p className="text-sm text-gray-500">To maintain your current weight</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-bold">{result.dailyCalories.maintain} calories</p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">Weight Loss</h4>
                    <div className="space-y-2">
                      <div className="neumorph-inset p-3 rounded-lg">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-medium">Mild weight loss</p>
                            <p className="text-xs text-gray-500">0.25 kg (0.5 lb) per week</p>
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-bold">{result.dailyCalories.mildLoss} calories</p>
                            <p className="text-xs text-gray-500">10% deficit</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="neumorph-inset p-3 rounded-lg">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-medium">Moderate weight loss</p>
                            <p className="text-xs text-gray-500">0.5 kg (1 lb) per week</p>
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-bold">{result.dailyCalories.moderateLoss} calories</p>
                            <p className="text-xs text-gray-500">20% deficit</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="neumorph-inset p-3 rounded-lg">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-medium">Aggressive weight loss</p>
                            <p className="text-xs text-gray-500">0.75 kg (1.5 lb) per week</p>
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-bold">{result.dailyCalories.extremeLoss} calories</p>
                            <p className="text-xs text-gray-500">25% deficit</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">Weight Gain</h4>
                    <div className="space-y-2">
                      <div className="neumorph-inset p-3 rounded-lg">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-medium">Mild weight gain</p>
                            <p className="text-xs text-gray-500">0.25 kg (0.5 lb) per week</p>
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-bold">{result.dailyCalories.mildGain} calories</p>
                            <p className="text-xs text-gray-500">10% surplus</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="neumorph-inset p-3 rounded-lg">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-medium">Moderate weight gain</p>
                            <p className="text-xs text-gray-500">0.5 kg (1 lb) per week</p>
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-bold">{result.dailyCalories.moderateGain} calories</p>
                            <p className="text-xs text-gray-500">15% surplus</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="neumorph-inset p-3 rounded-lg">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-medium">Aggressive weight gain</p>
                            <p className="text-xs text-gray-500">0.75 kg (1.5 lb) per week</p>
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-bold">{result.dailyCalories.extremeGain} calories</p>
                            <p className="text-xs text-gray-500">20% surplus</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">What This Means</h3>
                <p className="mb-2">
                  Your Total Daily Energy Expenditure (TDEE) is the total number of calories you burn each day. 
                  This includes your Basal Metabolic Rate (BMR) - the calories your body needs for basic functions 
                  at rest - plus additional calories burned through physical activity and digestion.
                </p>
                <p className="mb-2">
                  To lose weight, you need to consume fewer calories than your TDEE (calorie deficit). 
                  To gain weight, you need to consume more calories than your TDEE (calorie surplus).
                </p>
                <p className="text-sm text-gray-600">
                  Note: These calculations provide estimates based on formulas. Individual metabolism can vary. 
                  For best results, track your calorie intake and weight changes over time to find your true 
                  maintenance calories.
                </p>
              </div>
            </div>
          ) : (
            <div className="neumorph p-6 rounded-lg h-full">
              <h2 className="text-xl font-semibold mb-4">About TDEE</h2>
              
              <div className="space-y-4">
                <p>
                  Total Daily Energy Expenditure (TDEE) is the total number of calories you burn each day. 
                  Understanding your TDEE is essential for effective weight management, whether your goal 
                  is to lose, maintain, or gain weight.
                </p>
                
                <h3 className="font-medium">TDEE Components:</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>
                    <strong>Basal Metabolic Rate (BMR):</strong> The calories your body needs at complete 
                    rest for basic functions like breathing, circulation, and cell production (60-70% of TDEE).
                  </li>
                  <li>
                    <strong>Thermic Effect of Food (TEF):</strong> Calories burned digesting and processing 
                    food (10% of TDEE).
                  </li>
                  <li>
                    <strong>Exercise Activity Thermogenesis (EAT):</strong> Calories burned during intentional 
                    exercise.
                  </li>
                  <li>
                    <strong>Non-Exercise Activity Thermogenesis (NEAT):</strong> Calories burned during 
                    non-exercise activities like walking, fidgeting, and daily tasks.
                  </li>
                </ul>
                
                <h3 className="font-medium">Activity Levels Explained:</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>
                    <strong>Sedentary (1.2):</strong> Little or no exercise, desk job (e.g., office worker 
                    with no additional physical activity).
                  </li>
                  <li>
                    <strong>Lightly Active (1.375):</strong> Light exercise 1-3 days/week (e.g., walking, 
                    light gardening, or yoga a few times per week).
                  </li>
                  <li>
                    <strong>Moderately Active (1.55):</strong> Moderate exercise 3-5 days/week (e.g., jogging, 
                    cycling, or weight training several times per week).
                  </li>
                  <li>
                    <strong>Very Active (1.725):</strong> Hard exercise 6-7 days/week (e.g., daily intense 
                    workouts or physically demanding job).
                  </li>
                  <li>
                    <strong>Extremely Active (1.9):</strong> Very hard exercise, physical job or training 
                    twice a day (e.g., professional athletes, very physically demanding jobs).
                  </li>
                </ul>
                
                <h3 className="font-medium">Using Your TDEE:</h3>
                <p>
                  Once you know your TDEE, you can adjust your calorie intake based on your goals:
                </p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>
                    <strong>Weight Maintenance:</strong> Consume calories equal to your TDEE.
                  </li>
                  <li>
                    <strong>Weight Loss:</strong> Consume fewer calories than your TDEE (typically 10-25% less).
                  </li>
                  <li>
                    <strong>Weight Gain:</strong> Consume more calories than your TDEE (typically 10-20% more).
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <div className="mt-12 neumorph p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Understanding Your TDEE</h2>
        
        <div className="space-y-4">
          <p>
            Your TDEE is influenced by several factors, including age, gender, weight, height, and activity level. 
            Understanding these factors can help you make more informed decisions about your nutrition and exercise.
          </p>
          
          <h3 className="font-medium">Factors Affecting TDEE</h3>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              <strong>Age:</strong> Metabolism typically slows with age, reducing TDEE by approximately 
              1-2% per decade after age 20.
            </li>
            <li>
              <strong>Gender:</strong> Men generally have higher TDEEs than women of similar size due to 
              greater muscle mass and less body fat.
            </li>
            <li>
              <strong>Body Composition:</strong> Muscle tissue burns more calories at rest than fat tissue, 
              so individuals with more muscle mass have higher TDEEs.
            </li>
            <li>
              <strong>Hormones:</strong> Thyroid hormones, cortisol, and other hormones can significantly 
              impact metabolic rate and TDEE.
            </li>
            <li>
              <strong>Environmental Factors:</strong> Temperature, altitude, and stress can all affect 
              energy expenditure.
            </li>
          </ul>
          
          <h3 className="font-medium">Tracking and Adjusting</h3>
          <p>
            While TDEE calculators provide a good starting point, individual metabolism varies. For best 
            results:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Track your calorie intake accurately using a food diary or app</li>
            <li>Monitor your weight changes over 2-4 weeks</li>
            <li>Adjust your calorie intake based on actual results</li>
            <li>Recalculate your TDEE periodically as your weight, activity level, or goals change</li>
          </ul>
          
          <p>
            For more personalized guidance on nutrition and exercise, consider consulting with a registered 
            dietitian or certified fitness professional.
          </p>
        </div>
      </div>
    </div>
  );
}
