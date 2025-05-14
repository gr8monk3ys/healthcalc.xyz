'use client';

import React, { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
}

export default function Card({ children, className = '' }: CardProps) {
  return <div className={`glass-panel rounded-2xl p-4 ${className}`}>{children}</div>;
}
