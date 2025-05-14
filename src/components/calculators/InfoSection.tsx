'use client';

import React from 'react';

interface InfoSectionProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

const InfoSection: React.FC<InfoSectionProps> = ({ title, children, className = '' }) => {
  return (
    <div className={`neumorph p-6 rounded-lg ${className}`}>
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      <div className="space-y-4">{children}</div>
    </div>
  );
};

export default InfoSection;
