import React from 'react';

interface CountdownBoxProps {
  value: number;
  label: string;
}

export const CountdownBox: React.FC<CountdownBoxProps> = ({ value, label }) => {
  const formattedValue = value.toString().padStart(2, '0');

  return (
    <div className="flex flex-col items-center">
      {/* Box container: Responsive fluid dimensions for zero overflow down to 320px */}
      <div className="relative w-[3.1rem] h-16 xs:w-15 xs:h-18 sm:w-20 sm:h-24 md:w-24 md:h-28 rounded-lg bg-gradient-to-b from-[#5c1325] via-[#480d1c] to-[#340713] border border-[#c59b27]/60 shadow-[0_8px_20px_rgba(52,7,19,0.35),inset_0_1px_2px_rgba(255,255,255,0.15)] flex flex-col items-center justify-center overflow-hidden transition-transform duration-300 hover:scale-105">
        {/* Decorative gold diamond at the top */}
        <div className="absolute top-1 xs:top-1.5 w-1.5 h-1.5 xs:w-2 xs:h-2 rotate-45 border border-[#dfba73] bg-[#c59b27]/40" />

        {/* Inner subtle frame line */}
        <div className="absolute inset-0.5 xs:inset-1 border border-[#c59b27]/25 rounded pointer-events-none" />

        {/* Large antique-gold number */}
        <span className="font-serif text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#f2dfab] drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]">
          {formattedValue}
        </span>

        {/* Bottom subtle gold accent line */}
        <div className="absolute bottom-1.5 xs:bottom-2 w-4 xs:w-6 h-[1px] bg-gradient-to-r from-transparent via-[#c59b27] to-transparent opacity-60" />
      </div>

      {/* Small uppercase label */}
      <span className="mt-1.5 xs:mt-2 text-[8px] xs:text-[10px] sm:text-xs font-serif tracking-widest text-[#73162f] font-semibold uppercase">
        {label}
      </span>
    </div>
  );
};
