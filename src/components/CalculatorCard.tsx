'use client';

import React from 'react';
import Link from 'next/link';

interface CalculatorCardProps {
  title: string;
  description: string;
  path: string;
  icon: React.ReactNode;
}

export default function CalculatorCard({ title, description, path, icon }: CalculatorCardProps) {
  return (
    <Link href={path} className="block">
      <div className="neumorph h-full p-6 transition-all duration-300 hover:shadow-neumorph-inset">
        <div className="flex items-start mb-4">
          <div className="mr-4 text-accent">{icon}</div>
          <h2 className="text-xl font-semibold">{title}</h2>
        </div>
        <p className="text-gray-600 mb-4">{description}</p>
        <div className="text-accent font-medium">Use Calculator →</div>
      </div>
    </Link>
  );
}
