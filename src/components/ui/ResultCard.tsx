import React, { ReactNode } from 'react';
import Card from './Card';

interface ResultCardProps {
  title: string;
  value: string | number;
  unit?: string;
  description?: string;
  icon?: ReactNode;
  status?: 'success' | 'warning' | 'danger' | 'info';
  className?: string;
}

export default function ResultCard({
  title,
  value,
  unit,
  description,
  icon,
  status = 'info',
  className = '',
}: ResultCardProps) {
  const statusColors = {
    success: 'text-green-600',
    warning: 'text-yellow-600',
    danger: 'text-red-600',
    info: 'text-accent',
  };

  return (
    <Card className={`${className}`}>
      <div className="flex items-start">
        {icon && (
          <div className={`mr-4 ${statusColors[status]}`}>
            {icon}
          </div>
        )}
        
        <div className="flex-1">
          <h3 className="text-sm font-medium text-gray-600 mb-1">{title}</h3>
          
          <div className="flex items-baseline">
            <span className={`text-2xl font-bold ${statusColors[status]}`}>
              {value}
            </span>
            
            {unit && (
              <span className="ml-1 text-gray-600">{unit}</span>
            )}
          </div>
          
          {description && (
            <p className="mt-2 text-sm text-gray-600">{description}</p>
          )}
        </div>
      </div>
    </Card>
  );
}
