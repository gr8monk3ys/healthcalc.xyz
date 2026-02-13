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
      <div className="glass-panel-strong h-full rounded-3xl p-6 transition-all duration-300 group-hover:-translate-y-1.5 group-hover:border-accent/40 group-hover:shadow-[0_18px_35px_rgba(66,72,182,0.28)] dark:group-hover:shadow-[0_20px_38px_rgba(3,5,22,0.55)]">
        <div className="flex items-start mb-4">
          <div className="mr-4 rounded-2xl bg-gradient-to-br from-accent/20 via-accent/12 to-transparent p-2.5 text-accent transition-transform duration-300 group-hover:scale-110">
            {icon}
          </div>
          <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
        </div>
        <p className="mb-4 text-slate-700 dark:text-slate-300">{description}</p>
        <div className="font-medium text-accent">Use Calculator →</div>
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
