import React from 'react';

interface PrimaryButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'burgundy' | 'gold' | 'outline';
  icon?: React.ReactNode;
  className?: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  ariaLabel?: string;
}

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  children,
  onClick,
  variant = 'burgundy',
  icon,
  className = '',
  disabled = false,
  type = 'button',
  ariaLabel,
}) => {
  let baseStyle = '';

  if (variant === 'burgundy') {
    baseStyle =
      'bg-gradient-to-r from-[#6b142b] via-[#540d1f] to-[#420917] text-[#fbf8f2] border border-[#c59b27]/60 shadow-[0_8px_20px_rgba(84,13,31,0.25)] hover:shadow-[0_10px_25px_rgba(84,13,31,0.4)] hover:border-[#dfba73]';
  } else if (variant === 'gold') {
    baseStyle =
      'bg-gradient-to-r from-[#c59b27] via-[#dfba73] to-[#c59b27] text-[#3d0916] border border-[#dfba73] font-semibold shadow-[0_8px_20px_rgba(197,155,39,0.3)] hover:shadow-[0_10px_25px_rgba(197,155,39,0.5)]';
  } else {
    baseStyle =
      'bg-transparent text-[#73162f] border border-[#c59b27] hover:bg-[#73162f]/5 hover:border-[#73162f] shadow-sm';
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      className={`relative inline-flex items-center justify-center gap-2 px-6 py-3 min-h-[44px] rounded-full text-xs sm:text-sm font-serif tracking-widest uppercase transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed group overflow-hidden ${baseStyle} ${className}`}
    >
      {/* Subtle shine effect on hover */}
      <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />

      {icon && <span className="transition-transform group-hover:scale-110">{icon}</span>}
      <span className="relative z-10">{children}</span>
    </button>
  );
};
