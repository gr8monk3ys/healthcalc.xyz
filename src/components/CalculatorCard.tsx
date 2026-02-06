'use client';

import React from 'react';
import Link from 'next/link';

interface CalculatorCardProps {
  title: string;
  description: string;
  path: string;
  icon: React.ReactNode;
}

/**
 * Calculator card component that displays a calculator with a title, description, and icon
 * @param title - The calculator title
 * @param description - The calculator description
 * @param path - The path to the calculator page
 * @param icon - The calculator icon
 * @returns A card component with a link to the calculator
 */
function CalculatorCard({ title, description, path, icon }: CalculatorCardProps) {
  return (
    <Link href={path} className="group block h-full">
      <div className="neumorph h-full p-6 border border-transparent transition-all duration-300 group-hover:-translate-y-1 group-hover:border-accent/30 group-hover:shadow-xl">
        <div className="flex items-start mb-4">
          <div className="mr-4 rounded-xl bg-accent/10 p-2 text-accent transition-transform duration-300 group-hover:scale-110">
            {icon}
          </div>
          <h2 className="text-xl font-semibold">{title}</h2>
        </div>
        <p className="text-gray-600 mb-4">{description}</p>
        <div className="text-accent font-medium">Use Calculator →</div>
      </div>
    </Link>
  );
}

/**
 * Memoized version of the CalculatorCard component
 * This prevents unnecessary re-renders when parent components re-render
 */
export const MemoizedCalculatorCard = React.memo(CalculatorCard, (prevProps, nextProps) => {
  // Custom comparison function to determine if the component should re-render
  // Return true if the props are equal (no re-render needed)
  return (
    prevProps.title === nextProps.title &&
    prevProps.description === nextProps.description &&
    prevProps.path === nextProps.path &&
    // For the icon, we do a simple check if both exist or both don't exist
    // A more complex comparison would be needed for deeply comparing React nodes
    Boolean(prevProps.icon) === Boolean(nextProps.icon)
  );
});

// For backward compatibility and to maintain existing import structure
export default CalculatorCard;
