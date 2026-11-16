import React from 'react';

interface IslamicArchProps {
  children: React.ReactNode;
  className?: string;
  borderColor?: string;
}

export const IslamicArch: React.FC<IslamicArchProps> = ({
  children,
  className = '',
  borderColor = '#c59b27',
}) => {
  return (
    <div className={`relative rounded-t-[140px] border-2 border-[${borderColor}]/40 p-6 md:p-10 shadow-2xl bg-[#faf7f2]/95 backdrop-blur-sm ${className}`}>
      {/* Outer decorative Islamic Arch SVG header */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1 w-32 h-8 flex items-center justify-center pointer-events-none">
        <svg viewBox="0 0 120 30" className="w-full h-full text-[#c59b27]" fill="none">
          <path
            d="M10 28 C 30 28, 45 15, 60 4 C 75 15, 90 28, 110 28"
            stroke="currentColor"
            strokeWidth="1.5"
            fill="none"
          />
          <circle cx="60" cy="4" r="2.5" fill="currentColor" />
        </svg>
      </div>

      {/* Ornate corner flourishes */}
      <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-[#c59b27]/60 pointer-events-none" />
      <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-[#c59b27]/60 pointer-events-none" />
      <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-[#c59b27]/60 pointer-events-none" />
      <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-[#c59b27]/60 pointer-events-none" />

      {/* Inner thin decorative gold line */}
      <div className="absolute inset-2 border border-[#c59b27]/20 rounded-t-[132px] pointer-events-none" />

      {children}
    </div>
  );
};
