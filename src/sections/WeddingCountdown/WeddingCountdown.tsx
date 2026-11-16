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
      className="relative w-full min-h-[550px] py-20 px-4 flex flex-col items-center justify-center bg-parchment select-none text-center overflow-hidden"
    >
      {/* Background Decorative Islamic Rosette Outline */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5">
        <svg viewBox="0 0 500 500" className="w-[600px] h-[600px] text-[#73162f]" fill="currentColor">
          <circle cx="250" cy="250" r="240" />
        </svg>
      </div>

      {/* Main Glass-Bordered Countdown Card with Prominent Depth & Reflections */}
      <div className="relative z-10 w-full max-w-xl p-8 sm:p-12 rounded-[32px] glass-card-border shadow-2xl flex flex-col items-center overflow-hidden">
        {/* Top Specular Glare Reflection Beam */}
        <div className="absolute top-0 left-0 right-0 h-44 rounded-t-[28px] glass-reflection-overlay pointer-events-none opacity-70 z-20" />
        {/* Inner Hairline Highlight Rim */}
        <div className="absolute inset-2 rounded-[26px] border border-white/70 pointer-events-none z-20" />

        <div className="relative z-10 max-w-lg mx-auto space-y-3 mb-8">
          <span className="text-xs font-serif tracking-[0.35em] text-[#c59b27] uppercase font-bold">
            {countdownConfig.heading}
          </span>
          <h2 className="font-calligraphy text-3xl sm:text-5xl text-[#73162f] font-bold">
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
          <div className="flex items-center justify-center gap-2.5 sm:gap-4 md:gap-5">
            <CountdownBox value={days} label={countdownConfig.labels?.days || 'DAYS'} />
            <span className="font-serif text-xl sm:text-2xl text-[#c59b27] self-center -mt-5">:</span>
            <CountdownBox value={hours} label={countdownConfig.labels?.hours || 'HOURS'} />
            <span className="font-serif text-xl sm:text-2xl text-[#c59b27] self-center -mt-5">:</span>
            <CountdownBox value={minutes} label={countdownConfig.labels?.minutes || 'MINUTES'} />
            <span className="font-serif text-xl sm:text-2xl text-[#c59b27] self-center -mt-5">:</span>
            <CountdownBox value={seconds} label={countdownConfig.labels?.seconds || 'SECONDS'} />
          </div>
        )}

        {/* Target Date Note */}
        <div className="mt-8 pt-6 border-t border-[#c59b27]/25 w-full max-w-md">
          <p className="font-serif text-xs sm:text-sm text-[#655e5a] tracking-widest uppercase font-medium">
            {wedding?.day}, {wedding?.displayDate} • {wedding?.timeDescription}
          </p>
        </div>
      </div>
    </section>
  );
};
