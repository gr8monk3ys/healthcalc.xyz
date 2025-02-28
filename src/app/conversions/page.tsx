'use client';

import React from 'react';
import Card from '@/components/ui/Card';
import Accordion from '@/components/ui/Accordion';

export default function MeasurementConversions() {
  return (
    <div>
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2">Measurement Conversions</h1>
        <p className="text-gray-600">
          Convert between different units of measurement for weight, height, and more
        </p>
      </div>

      <Card className="p-6 mb-8">
        <p className="text-center text-lg">
          This calculator is coming soon! Check back later for a complete implementation.
        </p>
      </Card>

      <div className="mt-12 space-y-6">
        <Accordion title="About Measurement Conversions">
          <p className="mb-4">
            This tool allows you to convert between different units of measurement commonly used in health and fitness calculations. Whether you're following a recipe with metric measurements, tracking your weight in different units, or calculating distances for your workout, this converter makes it easy.
          </p>
          <p>
            Select a conversion category (mass, volume, length, etc.), choose your input and output units, and get instant, accurate conversions.
          </p>
        </Accordion>

        <Accordion title="Weight Conversions">
          <div className="space-y-4">
            <p>
              Common weight conversions for health and fitness:
            </p>
            
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <span className="font-medium">Kilograms to Pounds:</span> 1 kg = 2.20462 lb
              </li>
              <li>
                <span className="font-medium">Pounds to Kilograms:</span> 1 lb = 0.453592 kg
              </li>
              <li>
                <span className="font-medium">Stones to Pounds:</span> 1 stone = 14 lb
              </li>
              <li>
                <span className="font-medium">Stones to Kilograms:</span> 1 stone = 6.35029 kg
              </li>
              <li>
                <span className="font-medium">Grams to Ounces:</span> 1 g = 0.035274 oz
              </li>
              <li>
                <span className="font-medium">Ounces to Grams:</span> 1 oz = 28.3495 g
              </li>
            </ul>
            
            <p>
              Weight conversions are particularly useful for tracking body weight, calculating nutritional information, and following recipes.
            </p>
          </div>
        </Accordion>

        <Accordion title="Height and Length Conversions">
          <div className="space-y-4">
            <p>
              Common height and length conversions:
            </p>
            
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <span className="font-medium">Centimeters to Inches:</span> 1 cm = 0.393701 in
              </li>
              <li>
                <span className="font-medium">Inches to Centimeters:</span> 1 in = 2.54 cm
              </li>
              <li>
                <span className="font-medium">Feet to Centimeters:</span> 1 ft = 30.48 cm
              </li>
              <li>
                <span className="font-medium">Meters to Feet:</span> 1 m = 3.28084 ft
              </li>
              <li>
                <span className="font-medium">Feet and Inches to Centimeters:</span> 5'10" = 177.8 cm
              </li>
              <li>
                <span className="font-medium">Kilometers to Miles:</span> 1 km = 0.621371 mi
              </li>
              <li>
                <span className="font-medium">Miles to Kilometers:</span> 1 mi = 1.60934 km
              </li>
            </ul>
            
            <p>
              Height conversions are essential for BMI calculations, while distance conversions help with tracking running, walking, or cycling workouts.
            </p>
          </div>
        </Accordion>

        <Accordion title="Volume Conversions">
          <div className="space-y-4">
            <p>
              Common volume conversions for cooking and nutrition:
            </p>
            
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <span className="font-medium">Milliliters to Fluid Ounces:</span> 1 ml = 0.033814 fl oz
              </li>
              <li>
                <span className="font-medium">Fluid Ounces to Milliliters:</span> 1 fl oz = 29.5735 ml
              </li>
              <li>
                <span className="font-medium">Liters to Cups:</span> 1 L = 4.22675 cups
              </li>
              <li>
                <span className="font-medium">Cups to Milliliters:</span> 1 cup = 236.588 ml
              </li>
              <li>
                <span className="font-medium">Tablespoons to Milliliters:</span> 1 tbsp = 14.7868 ml
              </li>
              <li>
                <span className="font-medium">Teaspoons to Milliliters:</span> 1 tsp = 4.92892 ml
              </li>
              <li>
                <span className="font-medium">Gallons to Liters:</span> 1 gal = 3.78541 L
              </li>
            </ul>
            
            <p>
              Volume conversions are particularly useful for cooking, measuring water intake, and understanding liquid nutrition labels.
            </p>
          </div>
        </Accordion>

        <Accordion title="Temperature Conversions">
          <div className="space-y-4">
            <p>
              Temperature conversion formulas:
            </p>
            
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <span className="font-medium">Celsius to Fahrenheit:</span> °F = (°C × 9/5) + 32
              </li>
              <li>
                <span className="font-medium">Fahrenheit to Celsius:</span> °C = (°F - 32) × 5/9
              </li>
            </ul>
            
            <p>
              Common reference points:
            </p>
            
            <ul className="list-disc pl-5 space-y-1">
              <li>Freezing point of water: 0°C = 32°F</li>
              <li>Room temperature: ~20-22°C = ~68-72°F</li>
              <li>Body temperature: 37°C = 98.6°F</li>
              <li>Boiling point of water: 100°C = 212°F</li>
            </ul>
            
            <p>
              Temperature conversions are useful for cooking, understanding weather forecasts in different regions, and monitoring body temperature.
            </p>
          </div>
        </Accordion>

        <Accordion title="Energy and Calorie Conversions">
          <div className="space-y-4">
            <p>
              Energy conversion for nutrition and exercise:
            </p>
            
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <span className="font-medium">Calories to Kilojoules:</span> 1 kcal = 4.184 kJ
              </li>
              <li>
                <span className="font-medium">Kilojoules to Calories:</span> 1 kJ = 0.239006 kcal
              </li>
            </ul>
            
            <p>
              Note: In nutrition, what we commonly call a "calorie" is actually a kilocalorie (kcal). Food labels in some countries use kcal, while others use kJ.
            </p>
            
            <p>
              Energy conversions are helpful when comparing nutritional information from different countries or when calculating exercise energy expenditure.
            </p>
          </div>
        </Accordion>
      </div>
    </div>
  );
}
