import React, { useState, useEffect, useRef } from 'react';
import { useWeddingContent } from '../hooks/useWeddingContent';
import { useAudio } from '../hooks/useAudio';
import { MusicController } from '../components/MusicController/MusicController';
import { LoadingScreen } from '../components/LoadingScreen/LoadingScreen';

// Sections in exact sequence (GroomIntroduction removed as requested)
import { EnvelopeOpening } from '../sections/EnvelopeOpening/EnvelopeOpening';
import { WeddingInvitation } from '../sections/WeddingInvitation/WeddingInvitation';
import { ScratchReveal } from '../sections/ScratchReveal/ScratchReveal';
import { WeddingCountdown } from '../sections/WeddingCountdown/WeddingCountdown';
import { CelebrationsTimeline } from '../sections/CelebrationsTimeline/CelebrationsTimeline';
import { WeddingCeremony } from '../sections/WeddingCeremony/WeddingCeremony';
import { OurFamily } from '../sections/OurFamily/OurFamily';
import { ClosingScreen } from '../sections/ClosingScreen/ClosingScreen';

export const WeddingExperience: React.FC = () => {
  const { content, loading, error, refetch } = useWeddingContent();
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState<boolean>(false);

  // Background Audio Controller
  const {
    isPlaying,
    isMuted,
    togglePlay,
    toggleMute,
    startAudio,
    hasStarted,
  } = useAudio(content?.assets?.music);

  const envelopeSectionRef = useRef<HTMLDivElement>(null);

  // STRICT SCROLL LOCK: Prevent any scrolling until the envelope opening is 100% complete
  useEffect(() => {
    if (!isEnvelopeOpen) {
      document.body.classList.add('scroll-locked');
      document.documentElement.classList.add('scroll-locked');

      const preventScroll = (e: Event) => {
        e.preventDefault();
        e.stopPropagation();
        return false;
      };

      const preventKeyScroll = (e: KeyboardEvent) => {
        const keys = ['ArrowDown', 'ArrowUp', 'PageDown', 'PageUp', ' ', 'Space', 'Home', 'End'];
        if (keys.includes(e.key)) {
          e.preventDefault();
          return false;
        }
      };

      window.addEventListener('wheel', preventScroll, { passive: false });
      window.addEventListener('touchmove', preventScroll, { passive: false });
      window.addEventListener('keydown', preventKeyScroll, { passive: false });

      return () => {
        document.body.classList.remove('scroll-locked');
        document.documentElement.classList.remove('scroll-locked');
        window.removeEventListener('wheel', preventScroll);
        window.removeEventListener('touchmove', preventScroll);
        window.removeEventListener('keydown', preventKeyScroll);
      };
    } else {
      document.body.classList.remove('scroll-locked');
      document.documentElement.classList.remove('scroll-locked');
    }
  }, [isEnvelopeOpen]);

  // Once card emerges, expands, and settles, unlock scrolling
  const handleEnvelopeComplete = () => {
    setIsEnvelopeOpen(true);
  };

  const handleScrollToDetails = () => {
    const inviteEl = document.getElementById('invitation-card-section');
    if (inviteEl) {
      inviteEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return <LoadingScreen onRetry={refetch} />;
  }

  if (error || !content) {
    return <LoadingScreen error={error || 'Failed to load wedding invitation content.'} onRetry={refetch} />;
  }

  // Configurable diagonal gradient background (scrolls naturally with page, non-sticky)
  const bgConfig = content.theme?.backgroundGradient;
  const gradientAngle = bgConfig?.angle || '135deg';
  const firstColor = bgConfig?.firstColor || '#d2e3cd';
  const secondColor = bgConfig?.secondColor || '#f4eedf';
  const thirdColor = bgConfig?.thirdColor || '#c2d6be';
  const fourthColor = bgConfig?.fourthColor || '#faf5ec';
  const fifthColor = bgConfig?.fifthColor || '#d8e7d4';

  const backgroundGradientStyle: React.CSSProperties = {
    background: `linear-gradient(${gradientAngle}, ${firstColor} 0%, ${secondColor} 25%, ${thirdColor} 50%, ${fourthColor} 75%, ${fifthColor} 100%)`,
    minHeight: '100vh',
  };

  return (
    <div
      style={backgroundGradientStyle}
      className="relative min-h-screen w-full text-[#2c2724] overflow-x-hidden selection:bg-[#73162f] selection:text-[#fdfbf7]"
    >
      {/* Persistent Floating Music Controller */}
      <MusicController
        isPlaying={isPlaying}
        isMuted={isMuted}
        togglePlay={togglePlay}
        toggleMute={toggleMute}
        hasStarted={hasStarted}
      />

      <main className="w-full">
        {/* Section 1: The Envelope & Permanent Opening Invitation Card */}
        {/* Emerges from envelope, expands to full screen, and stays permanently right here! */}
        <div ref={envelopeSectionRef} className="w-full">
          <EnvelopeOpening
            content={content}
            onOpenComplete={handleEnvelopeComplete}
            onStartAudio={startAudio}
            onScrollToDetails={handleScrollToDetails}
          />
        </div>

        {/* Subsequent Sections: Completely Hidden and Non-Scrollable Until Card has settled */}
        <div
          style={{ display: isEnvelopeOpen ? 'block' : 'none' }}
          className={`transition-opacity duration-1000 ${
            isEnvelopeOpen ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {/* Detailed Wedding Invitation Card */}
          <WeddingInvitation content={content} />

          {/* Scratch-to-Reveal Nikah Date */}
          <ScratchReveal content={content} />

          {/* Live Wedding Countdown */}
          <WeddingCountdown content={content} />

          {/* Wedding Celebrations Timeline (Nikah & Walima) */}
          <CelebrationsTimeline content={content} />

          {/* The Wedding Ceremony (Bilingual English & Urdu Nastaliq) */}
          <WeddingCeremony content={content} />

          {/* Our Family */}
          <OurFamily content={content} />

          {/* Final Inshallah Screen */}
          <ClosingScreen content={content} onBackToTop={handleBackToTop} />
        </div>
      </main>
    </div>
  );
};
