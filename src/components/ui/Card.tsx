'use client';

import React, { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
}

export default function Card({ children, className = '' }: CardProps) {
  return (
    <div className={`neumorph p-4 rounded-lg ${className}`}>
      {children}
    </div>
  );
}
