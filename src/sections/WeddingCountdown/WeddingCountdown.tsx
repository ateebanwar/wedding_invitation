import React from 'react';
import { WeddingContent } from '../../types/wedding';
import { SectionDivider } from '../../components/SectionDivider/SectionDivider';
import { CountdownBox } from '../../components/CountdownBox/CountdownBox';
import { useCountdown } from '../../hooks/useCountdown';

interface WeddingCountdownProps {
  content: WeddingContent;
}

export const WeddingCountdown: React.FC<WeddingCountdownProps> = ({ content }) => {
  const { wedding, sections } = content;
  const countdownConfig = sections?.countdown || {
    heading: 'COUNTING THE DAYS',
    subtitle: 'Every moment brings us closer to forever',
    labels: {
      days: 'DAYS',
      hours: 'HOURS',
      minutes: 'MINUTES',
      seconds: 'SECONDS',
    },
    completedMessage: 'The auspicious day has arrived! Alhamdulillah.',
  };

  const targetDate = wedding?.countdownTarget || `${wedding?.date || '2026-11-21'}T16:30:00+05:30`;
  const { days, hours, minutes, seconds, isExpired } = useCountdown(targetDate);

  return (
    <section
      id="countdown-section"
      className="relative w-full min-h-[550px] py-16 sm:py-20 px-3 xs:px-4 flex flex-col items-center justify-center bg-parchment select-none text-center overflow-hidden"
    >
      {/* Background Decorative Islamic Rosette Outline */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5">
        <svg viewBox="0 0 500 500" className="w-[600px] h-[600px] text-[#73162f]" fill="currentColor">
          <circle cx="250" cy="250" r="240" />
        </svg>
      </div>

      {/* Main Glass-Bordered Countdown Card with Layered Glass Over Paper */}
      <div className="relative z-10 w-full max-w-xl mx-auto rounded-[32px] card-glass-outer p-2.5 xs:p-3 sm:p-4.5 select-none shadow-2xl overflow-hidden flex flex-col items-center">
        {/* Specular Glare Reflection Beam across glass surface */}
        <div className="absolute top-0 left-0 right-0 h-44 rounded-t-[28px] glass-reflection-overlay pointer-events-none opacity-70 z-20" />
        {/* Outer Glass Bevel Rim */}
        <div className="absolute inset-1.5 xs:inset-2 rounded-[26px] border border-white/70 pointer-events-none z-20" />

        {/* Inner Floating Luxury Paper Sheet */}
        <div className="relative z-10 w-full rounded-[24px] card-paper-inner p-4 xs:p-6 sm:p-10 shadow-lg border border-[#c59b27]/35 bg-[#fdfbf7]/95 flex flex-col items-center overflow-hidden">
          {/* Inner hairline frame */}
          <div className="absolute inset-1.5 border border-[#c59b27]/20 rounded-[20px] pointer-events-none" />

          <div className="relative z-10 max-w-lg mx-auto space-y-2 xs:space-y-3 mb-6 sm:mb-8">
            <span className="text-[11px] xs:text-xs font-serif tracking-[0.35em] text-[#c59b27] uppercase font-bold">
              {countdownConfig.heading}
            </span>
            <h2 className="font-calligraphy text-2xl xs:text-3xl sm:text-5xl text-[#73162f] font-bold">
              Until We Say "Qubool Hai"
            </h2>
            <SectionDivider className="my-2" />
            <p className="font-serif text-xs sm:text-sm text-[#5c4033] tracking-wider italic">
              {countdownConfig.subtitle}
            </p>
          </div>

          {isExpired ? (
            <div className="p-6 rounded-2xl bg-[#fdfbf7] border border-[#c59b27]/40 shadow-xl max-w-md">
              <p className="font-serif text-lg text-[#73162f] font-bold">
                {countdownConfig.completedMessage}
              </p>
            </div>
          ) : (
            <div className="flex items-center justify-center gap-1 xs:gap-2 sm:gap-4 md:gap-5 w-full">
              <CountdownBox value={days} label={countdownConfig.labels?.days || 'DAYS'} />
              <span className="font-serif text-base xs:text-xl sm:text-2xl text-[#c59b27] self-center -mt-4">:</span>
              <CountdownBox value={hours} label={countdownConfig.labels?.hours || 'HOURS'} />
              <span className="font-serif text-base xs:text-xl sm:text-2xl text-[#c59b27] self-center -mt-4">:</span>
              <CountdownBox value={minutes} label={countdownConfig.labels?.minutes || 'MINUTES'} />
              <span className="font-serif text-base xs:text-xl sm:text-2xl text-[#c59b27] self-center -mt-4">:</span>
              <CountdownBox value={seconds} label={countdownConfig.labels?.seconds || 'SECONDS'} />
            </div>
          )}

          {/* Target Date Note */}
          <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-[#c59b27]/25 w-full max-w-md">
            <p className="font-serif text-[11px] xs:text-xs sm:text-sm text-[#655e5a] tracking-widest uppercase font-medium">
              {wedding?.day}, {wedding?.displayDate} • {wedding?.timeDescription}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
