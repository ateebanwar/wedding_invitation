import React from 'react';

interface WaxSealProps {
  initials?: string;
  onClick?: () => void;
  isOpening?: boolean;
  size?: number; // size in px
  className?: string;
}

export const WaxSeal: React.FC<WaxSealProps> = ({
  initials = 'S & N',
  onClick,
  isOpening = false,
  size = 114,
  className = '',
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={isOpening}
      aria-label="Wax seal — Tap to open invitation"
      style={{ width: `${size}px`, height: `${size}px` }}
      className={`relative rounded-full select-none cursor-pointer group focus:outline-none transition-transform duration-300 ${
        isOpening ? 'scale-95' : 'hover:scale-105 active:scale-95'
      } ${className}`}
    >
      {/* Organic Molten Wax Rim with 3 exact Drips (Top-Left, Mid-Left, Bottom-Right) matching reference */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#7a152d] via-[#580e20] to-[#320612] shadow-[0_16px_36px_rgba(42,5,14,0.65),0_6px_14px_rgba(0,0,0,0.4),inset_0_2px_4px_rgba(255,255,255,0.45),inset_0_-4px_8px_rgba(0,0,0,0.7)]">
        {/* Drip 1: Top-left (~10 o'clock) */}
        <div className="absolute -top-1.5 left-4 w-6 h-5.5 rounded-full bg-gradient-to-br from-[#841932] to-[#4e0c1c] shadow-sm transform -rotate-12" />
        {/* Drip 2: Mid-left (~9 o'clock) */}
        <div className="absolute top-10 -left-2.5 w-5 h-6.5 rounded-full bg-gradient-to-br from-[#76162c] to-[#440a18] shadow-sm" />
        {/* Drip 3: Bottom-right (~4:30 o'clock) */}
        <div className="absolute bottom-0.5 right-4 w-6.5 h-5.5 rounded-full bg-gradient-to-br from-[#6b1428] to-[#350613] shadow-sm transform rotate-20" />
        
        {/* Realistic glossy wax highlight glare across top and top-right edge */}
        <div className="absolute top-1 left-4 right-4 h-5 rounded-full bg-gradient-to-b from-white/40 via-white/10 to-transparent blur-[0.5px] pointer-events-none" />
      </div>

      {/* Inner Impressed Circle with 3D Bevel Depth */}
      <div className="absolute inset-3 rounded-full border border-[#e8d4a6]/50 bg-gradient-to-br from-[#5e0d22] via-[#430917] to-[#24030c] shadow-[inset_0_4px_10px_rgba(0,0,0,0.85),inset_0_-2px_5px_rgba(255,255,255,0.22)] flex items-center justify-center overflow-hidden">
        
        {/* Golden Circular Laurel Wreath & Crest SVG matching reference image */}
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full p-1.5 filter drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="sealGoldExact" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fef6e2" />
              <stop offset="50%" stopColor="#dfba73" />
              <stop offset="100%" stopColor="#b38a32" />
            </linearGradient>
          </defs>

          {/* Outer fine gold dashed guide ring */}
          <circle cx="50" cy="50" r="43" stroke="url(#sealGoldExact)" strokeWidth="0.8" opacity="0.65" strokeDasharray="3 2" />

          {/* Laurel Wreath Circular Border */}
          <g stroke="url(#sealGoldExact)" fill="url(#sealGoldExact)" strokeWidth="0.6">
            {/* Left wreath arc */}
            <path d="M 50 90 C 25 90, 10 70, 10 50 C 10 30, 25 15, 45 12" fill="none" strokeWidth="0.8" />
            {/* Right wreath arc */}
            <path d="M 50 90 C 75 90, 90 70, 90 50 C 90 30, 75 15, 55 12" fill="none" strokeWidth="0.8" />

            {/* Left Wreath Leaves */}
            <path d="M 12 50 C 6 47, 8 41, 14 43 Z" />
            <path d="M 14 62 C 9 61, 9 55, 16 56 Z" />
            <path d="M 21 73 C 16 74, 15 68, 23 68 Z" />
            <path d="M 31 82 C 26 84, 25 79, 33 77 Z" />
            <path d="M 43 88 C 39 91, 37 86, 44 84 Z" />
            <path d="M 14 38 C 9 37, 11 31, 17 33 Z" />
            <path d="M 21 27 C 16 24, 20 19, 25 23 Z" />
            <path d="M 32 18 C 28 14, 33 11, 36 16 Z" />

            {/* Right Wreath Leaves */}
            <path d="M 88 50 C 94 47, 92 41, 86 43 Z" />
            <path d="M 86 62 C 91 61, 91 55, 84 56 Z" />
            <path d="M 79 73 C 84 74, 85 68, 77 68 Z" />
            <path d="M 69 82 C 74 84, 75 79, 67 77 Z" />
            <path d="M 57 88 C 61 91, 63 86, 56 84 Z" />
            <path d="M 86 38 C 91 37, 89 31, 83 33 Z" />
            <path d="M 79 27 C 84 24, 80 19, 75 23 Z" />
            <path d="M 68 18 C 72 14, 67 11, 64 16 Z" />
          </g>

          {/* Central 5-Petal Star / Flower Crest */}
          <g transform="translate(50, 31)">
            {/* Center dot */}
            <circle cx="0" cy="0" r="1.5" fill="url(#sealGoldExact)" />
            {/* 5 pointed petals */}
            <path d="M 0 -8 L 2.2 -2.5 L 8 -2.5 L 3.5 1 L 5.2 6.5 L 0 3.2 L -5.2 6.5 L -3.5 1 L -8 -2.5 L -2.2 -2.5 Z" fill="url(#sealGoldExact)" />
          </g>

          {/* Couple Initials: S & N */}
          <text
            x="50"
            y="65"
            textAnchor="middle"
            fill="url(#sealGoldExact)"
            fontFamily="'Cormorant Garamond', Georgia, serif"
            fontSize="18"
            fontWeight="bold"
            letterSpacing="2.5"
          >
            {initials}
          </text>
        </svg>

        {/* Specular gloss streak across the medallion */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none" />
      </div>

      {/* Luminous golden flare when activated */}
      <div
        className={`absolute -inset-2 rounded-full border-2 border-[#dfba73] pointer-events-none transition-all duration-500 ${
          isOpening ? 'opacity-100 scale-125 animate-ping' : 'opacity-0'
        }`}
      />
    </button>
  );
};
