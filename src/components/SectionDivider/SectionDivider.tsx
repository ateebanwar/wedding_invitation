import React from 'react';

interface SectionDividerProps {
  className?: string;
  variant?: 'gold' | 'burgundy' | 'subtle';
}

export const SectionDivider: React.FC<SectionDividerProps> = ({
  className = '',
  variant = 'gold',
}) => {
  const strokeColor =
    variant === 'burgundy' ? '#73162f' : variant === 'subtle' ? '#c59b2780' : '#c59b27';

  return (
    <div className={`flex items-center justify-center my-4 ${className}`} aria-hidden="true">
      <svg
        viewBox="0 0 200 24"
        className="w-48 max-w-full h-5 text-current overflow-visible"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Left taper line */}
        <line x1="10" y1="12" x2="70" y2="12" stroke={strokeColor} strokeWidth="1" strokeDasharray="3 3" />
        <circle cx="75" cy="12" r="1.5" fill={strokeColor} />
        
        {/* Islamic 8-pointed star / Rub el Hizb rosette in center */}
        <g transform="translate(100, 12)">
          <path
            d="M0 -6 L1.8 -1.8 L6 0 L1.8 1.8 L0 6 L-1.8 1.8 L-6 0 L-1.8 -1.8 Z"
            fill={strokeColor}
          />
          <circle cx="0" cy="0" r="1.2" fill="#faf7f2" />
          {/* Subtle petals */}
          <path
            d="M-4 -4 C -2 -7, 2 -7, 4 -4 C 7 -2, 7 2, 4 4 C 2 7, -2 7, -4 4 C -7 2, -7 -2, -4 -4 Z"
            stroke={strokeColor}
            strokeWidth="0.6"
            fill="none"
          />
        </g>

        {/* Right taper line */}
        <circle cx="125" cy="12" r="1.5" fill={strokeColor} />
        <line x1="130" y1="12" x2="190" y2="12" stroke={strokeColor} strokeWidth="1" strokeDasharray="3 3" />
      </svg>
    </div>
  );
};
