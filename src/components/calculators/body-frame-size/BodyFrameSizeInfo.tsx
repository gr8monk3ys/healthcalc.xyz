import React from 'react';

export default function BodyFrameSizeInfo() {
  return (
    <div className="neumorph p-6 rounded-lg my-8">
      <h2 className="text-2xl font-semibold mb-4">What Is Body Frame Size?</h2>
      <p className="text-gray-600 mb-3">
        Body frame size estimates bone structure based on your height and wrist circumference. It
        helps contextualize weight ranges and body composition goals.
      </p>
      <p className="text-gray-600">
        Use this as one factor alongside BMI, body fat percentage, and waist measurements.
      </p>
    </div>
  );
}
