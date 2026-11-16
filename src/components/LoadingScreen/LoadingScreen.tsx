import React from 'react';

interface LoadingScreenProps {
  error?: string | null;
  onRetry?: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ error, onRetry }) => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#faf7f2] bg-parchment p-6 select-none">
      {/* Decorative Outer Border */}
      <div className="absolute inset-4 md:inset-8 border border-[#c59b27]/30 pointer-events-none rounded-lg" />
      <div className="absolute inset-5 md:inset-9 border border-[#c59b27]/15 pointer-events-none rounded-lg" />

      {error ? (
        <div className="max-w-md text-center z-10 space-y-4">
          <div className="w-12 h-12 mx-auto rounded-full bg-[#73162f]/10 flex items-center justify-center text-[#73162f]">
            <svg viewBox="0 0 24 24" className="w-6 h-6 stroke-current fill-none" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
          </div>
          <h2 className="text-xl font-serif text-[#73162f] font-semibold">Unable to Load Invitation</h2>
          <p className="text-xs sm:text-sm text-[#423d3a] font-serif leading-relaxed">
            {error}
          </p>
          {onRetry && (
            <button
              onClick={onRetry}
              className="mt-4 px-6 py-2.5 rounded-full bg-[#73162f] text-[#fdfbf7] text-xs font-serif tracking-widest uppercase hover:bg-[#541223] transition-colors"
            >
              Retry Loading
            </button>
          )}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center text-center z-10 space-y-6">
          {/* Animated Islamic 8-pointed star / Rosette */}
          <div className="relative w-20 h-20 flex items-center justify-center">
            {/* Spinning subtle outer ring */}
            <div className="absolute inset-0 rounded-full border border-dashed border-[#c59b27]/40 animate-[spin_12s_linear_infinite]" />
            
            {/* Pulsing Islamic star */}
            <svg viewBox="0 0 100 100" className="w-16 h-16 text-[#c59b27] animate-pulse" fill="none">
              <path
                d="M50 5 L63 37 L95 50 L63 63 L50 95 L37 63 L5 50 L37 37 Z"
                stroke="currentColor"
                strokeWidth="2"
                fill="rgba(197, 155, 39, 0.08)"
              />
              <path
                d="M50 20 L59 41 L80 50 L59 59 L50 80 L41 59 L20 50 L41 41 Z"
                stroke="#73162f"
                strokeWidth="1.2"
                fill="none"
              />
              <circle cx="50" cy="50" r="4" fill="#c59b27" />
            </svg>
          </div>

          {/* Couple Calligraphy Initials */}
          <div>
            <h1 className="font-calligraphy text-2xl sm:text-3xl text-[#73162f] tracking-wide">
              Shahid &amp; Nasreen
            </h1>
            <p className="text-xs font-serif tracking-[0.25em] text-[#c59b27] uppercase mt-1">
              Wedding Invitation
            </p>
          </div>

          {/* Arabic Invocation snippet */}
          <div className="font-arabic text-sm text-[#73162f]/80" dir="rtl">
            بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
          </div>

          {/* Subtitle */}
          <p className="text-[11px] font-serif tracking-widest text-[#655e5a] uppercase animate-pulse">
            Unfolding the royal invitation...
          </p>
        </div>
      )}
    </div>
  );
};
