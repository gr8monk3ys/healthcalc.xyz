import React from 'react';

interface LogoMarkProps {
  className?: string;
}

/**
 * The HealthCalc mark: an equals sign drawn as a label's heavy rule over a
 * hairline, on the highlighter square. The colors are fixed (not theme
 * tokens) so the mark is identical on every ground.
 */
export function LogoMark({ className = 'h-8 w-8' }: LogoMarkProps): React.JSX.Element {
  return (
    <svg
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      className={`shrink-0 ${className}`}
    >
      <rect width="32" height="32" fill="#ffd400" />
      <rect x="6" y="9" width="20" height="7" fill="#0b0b0b" />
      <rect x="6" y="20" width="20" height="2.5" fill="#0b0b0b" />
    </svg>
  );
}

interface LogoProps {
  markClassName?: string;
  className?: string;
}

export default function Logo({ markClassName, className = '' }: LogoProps): React.JSX.Element {
  return (
    <span
      translate="no"
      className={`notranslate inline-flex items-center gap-2.5 font-black tracking-[-0.03em] ${className}`}
    >
      <LogoMark className={markClassName} />
      HealthCalc
    </span>
  );
}
