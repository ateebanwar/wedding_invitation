import React, { useState, useRef } from 'react';
import { WeddingContent } from '../../types/wedding';
import { WaxSeal } from '../../components/WaxSeal/WaxSeal';
import { ChevronDown } from 'lucide-react';
import gsap from 'gsap';

interface EnvelopeOpeningProps {
  content: WeddingContent;
  onOpenComplete: () => void;
  onStartAudio?: () => void;
  onScrollToDetails?: () => void;
}

export const EnvelopeOpening: React.FC<EnvelopeOpeningProps> = ({
  content,
  onOpenComplete,
  onStartAudio,
  onScrollToDetails,
}) => {
  const [isOpening, setIsOpening] = useState<boolean>(false);
  const [hasSettled, setHasSettled] = useState<boolean>(false);

  const sceneRef = useRef<HTMLDivElement>(null);
  const stageWrapperRef = useRef<HTMLDivElement>(null);

  // Discrete physical envelope layers for authentic 3D physical extraction
  const backPanelRef = useRef<HTMLDivElement>(null);
  const topFlapRef = useRef<HTMLDivElement>(null);
  const invitationCardRef = useRef<HTMLDivElement>(null);
  const frontPocketRef = useRef<HTMLDivElement>(null);
  const sealWrapperRef = useRef<HTMLDivElement>(null);
  const tapButtonWrapperRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  const handleOpenSequence = () => {
    if (isOpening || hasSettled) return;
    setIsOpening(true);

    if (onStartAudio) {
      onStartAudio();
    }

    const tl = gsap.timeline();

    // ================= STAGE 1: SEAL ACTIVATION =================
    // Wax seal presses in slightly with golden radiance flare
    tl.to(sealWrapperRef.current, {
      scale: 0.93,
      duration: 0.2,
      ease: 'power2.in',
    })
      .to(sealWrapperRef.current, {
        scale: 1.08,
        filter: 'drop-shadow(0 0 25px rgba(223, 186, 115, 0.95))',
        duration: 0.3,
        ease: 'power2.out',
      })
      // Fade out the TAP TO OPEN button and prompt
      .to(
        tapButtonWrapperRef.current,
        {
          opacity: 0,
          y: 12,
          duration: 0.3,
          ease: 'power2.in',
        },
        '-=0.25'
      );

    // ================= STAGE 2: 3D TOP FLAP ROTATION =================
    // Triangular flap rotates naturally upward around its top hinge in 3D (180deg)
    if (topFlapRef.current) {
      tl.to(
        topFlapRef.current,
        {
          rotateX: 180,
          transformOrigin: 'top center',
          duration: 1.0,
          ease: 'power2.inOut',
        },
        '-=0.1'
      );

      // Fade out wax seal as flap turns away
      tl.to(
        sealWrapperRef.current,
        {
          opacity: 0,
          duration: 0.35,
          ease: 'power1.out',
        },
        '-=0.75'
      );

      // Place flipped flap behind card path (z-5) so card slides up in front of it
      tl.set(topFlapRef.current, {
        zIndex: 5,
      });
    }

    // ================= STAGE 3: REALISTIC VERTICAL EXTRACTION =================
    // Envelope glides downward while full-width card slides straight vertically UPWARD out of the pocket!
    // Because frontPocketRef is at z-20 and invitationCardRef is at z-10, the card emerges
    // naturally through the top "V" opening, with its bottom masked behind the front pocket.
    const envelopeElements = [backPanelRef.current, frontPocketRef.current, topFlapRef.current];

    tl.to(
      envelopeElements,
      {
        y: 120,
        duration: 1.4,
        ease: 'power2.inOut',
      },
      'extract'
    ).to(
      invitationCardRef.current,
      {
        y: -240, // ONLY animate y! Strictly vertical upward translation!
        duration: 1.4,
        ease: 'power2.inOut',
      },
      'extract'
    );

    // ================= STAGE 4: EXPANSION & FULLSCREEN SETTLEMENT =================
    // Card has completely cleared the pocket! Elevate z-index to 60.
    // Card glides smoothly down to center and scales up toward viewer.
    tl.set(invitationCardRef.current, {
      zIndex: 60,
    });

    tl.to(
      invitationCardRef.current,
      {
        y: 0,
        scale: 1.04,
        duration: 1.3,
        ease: 'power3.inOut',
        onComplete: () => {
          setHasSettled(true);
          onOpenComplete();
        },
      },
      '+=0.05'
    );

    // Envelope fades out and drops down as the card takes over
    tl.to(
      envelopeElements,
      {
        opacity: 0,
        y: 280,
        scale: 0.86,
        duration: 0.95,
        ease: 'power2.inOut',
      },
      '-=1.1'
    );
  };

  const { couple, invocation, assets, sections } = content;
  const openingCardData = sections?.openingCard || {
    tagline: 'We Are Getting Married',
    bismillahArabic: 'بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ',
    bismillahEnglish: 'In the name of Allah, the Most Beneficent and Most Merciful.',
    connector: 'Weds',
    scrollPrompt: 'Scroll down to explore wedding details',
  };

  const cardImageSrc = assets?.invitationCardImage || '/assets/images/islamic-wedding-card.svg';

  return (
    <section
      id="opening-envelope-section"
      ref={sceneRef}
      className={`relative w-full ${
        hasSettled ? 'min-h-screen py-8 sm:py-12' : 'h-[100svh] min-h-[640px]'
      } flex items-center justify-center bg-satin-weave overflow-hidden px-3 sm:px-4 select-none`}
      style={{ perspective: '1400px' }}
    >
      {/* ================= BACKGROUND SATIN & GEOMETRY (Matching Reference Image) ================= */}
      {/* Outer rounded rectangular gold frame */}
      <div className="absolute inset-2 sm:inset-3.5 md:inset-5 rounded-[32px] sm:rounded-[36px] border-[1.5px] border-[#d4af37]/65 pointer-events-none shadow-[inset_0_0_25px_rgba(212,175,55,0.08)]" />
      {/* Inner concentric thin gold border */}
      <div className="absolute inset-3 sm:inset-5 md:inset-7 rounded-[28px] sm:rounded-[32px] border border-[#d4af37]/35 pointer-events-none" />

      {/* 4 Carved Gold Corner Flourishes */}
      <div className="absolute top-4 left-4 sm:top-6 sm:left-6 w-8 h-8 pointer-events-none text-[#c59b27] opacity-80">
        <svg viewBox="0 0 40 40" fill="currentColor">
          <path d="M4 4 C16 4, 24 12, 24 24 C14 24, 4 14, 4 4 Z" opacity="0.6" />
          <path d="M4 4 C10 4, 14 8, 14 14 C8 14, 4 10, 4 4 Z" fill="#dfba73" />
          <circle cx="6" cy="6" r="2" fill="#dfba73" />
        </svg>
      </div>
      <div className="absolute top-4 right-4 sm:top-6 sm:right-6 w-8 h-8 pointer-events-none text-[#c59b27] opacity-80 transform scale-x-[-1]">
        <svg viewBox="0 0 40 40" fill="currentColor">
          <path d="M4 4 C16 4, 24 12, 24 24 C14 24, 4 14, 4 4 Z" opacity="0.6" />
          <path d="M4 4 C10 4, 14 8, 14 14 C8 14, 4 10, 4 4 Z" fill="#dfba73" />
          <circle cx="6" cy="6" r="2" fill="#dfba73" />
        </svg>
      </div>
      <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 w-8 h-8 pointer-events-none text-[#c59b27] opacity-80 transform scale-y-[-1]">
        <svg viewBox="0 0 40 40" fill="currentColor">
          <path d="M4 4 C16 4, 24 12, 24 24 C14 24, 4 14, 4 4 Z" opacity="0.6" />
          <path d="M4 4 C10 4, 14 8, 14 14 C8 14, 4 10, 4 4 Z" fill="#dfba73" />
          <circle cx="6" cy="6" r="2" fill="#dfba73" />
        </svg>
      </div>
      <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 w-8 h-8 pointer-events-none text-[#c59b27] opacity-80 transform scale-[-1]">
        <svg viewBox="0 0 40 40" fill="currentColor">
          <path d="M4 4 C16 4, 24 12, 24 24 C14 24, 4 14, 4 4 Z" opacity="0.6" />
          <path d="M4 4 C10 4, 14 8, 14 14 C8 14, 4 10, 4 4 Z" fill="#dfba73" />
          <circle cx="6" cy="6" r="2" fill="#dfba73" />
        </svg>
      </div>

      {/* Symmetrical Fine Golden Line Artwork, Arcs & Rosettes behind Envelope */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center">
        <svg
          viewBox="0 0 500 900"
          className="w-full h-full max-w-[620px] max-h-[960px] text-[#c59b27] opacity-75"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Concentric Golden Circles behind Wax Seal */}
          <circle cx="250" cy="460" r="140" stroke="currentColor" strokeWidth="0.9" opacity="0.45" />
          <circle cx="250" cy="460" r="190" stroke="currentColor" strokeWidth="0.8" opacity="0.35" strokeDasharray="4 3" />
          <circle cx="250" cy="460" r="240" stroke="currentColor" strokeWidth="0.7" opacity="0.25" />

          {/* Symmetrical Diamond Outline */}
          <path d="M 250 110 L 450 460 L 250 810 L 50 460 Z" stroke="currentColor" strokeWidth="0.9" opacity="0.4" />

          {/* Top Parabolic Curved Arcs */}
          <path d="M 50 110 C 130 110, 180 50, 180 0" stroke="currentColor" strokeWidth="0.9" opacity="0.45" />
          <path d="M 450 110 C 370 110, 320 50, 320 0" stroke="currentColor" strokeWidth="0.9" opacity="0.45" />

          {/* Bottom Parabolic Curved Arcs */}
          <path d="M 50 810 C 130 810, 180 870, 180 920" stroke="currentColor" strokeWidth="0.9" opacity="0.45" />
          <path d="M 450 810 C 370 810, 320 870, 320 920" stroke="currentColor" strokeWidth="0.9" opacity="0.45" />

          {/* 4 Sculpted Gold Rosettes attached to Outer Border */}
          <g transform="translate(38, 300) rotate(-45)">
            <path d="M 0 0 C -5 -14, 5 -14, 0 0 C -14 -5, -14 5, 0 0 C 5 14, -5 14, 0 0 C 14 5, 14 -5, 0 0" fill="#dfba73" stroke="#b38a32" strokeWidth="0.8" />
          </g>
          <g transform="translate(462, 300) rotate(45)">
            <path d="M 0 0 C -5 -14, 5 -14, 0 0 C -14 -5, -14 5, 0 0 C 5 14, -5 14, 0 0 C 14 5, 14 -5, 0 0" fill="#dfba73" stroke="#b38a32" strokeWidth="0.8" />
          </g>
          <g transform="translate(38, 620) rotate(-45)">
            <path d="M 0 0 C -5 -14, 5 -14, 0 0 C -14 -5, -14 5, 0 0 C 5 14, -5 14, 0 0 C 14 5, 14 -5, 0 0" fill="#dfba73" stroke="#b38a32" strokeWidth="0.8" />
          </g>
          <g transform="translate(462, 620) rotate(45)">
            <path d="M 0 0 C -5 -14, 5 -14, 0 0 C -14 -5, -14 5, 0 0 C 5 14, -5 14, 0 0 C 14 5, 14 -5, 0 0" fill="#dfba73" stroke="#b38a32" strokeWidth="0.8" />
          </g>
        </svg>
      </div>

      {/* ================= ENVELOPE STAGE WRAPPER ================= */}
      {/* Houses the discrete 3D layers: Back Panel, Flap, Card, and Front Pocket */}
      <div
        ref={stageWrapperRef}
        className={`relative w-full ${
          hasSettled
            ? 'max-w-[520px] mx-auto'
            : 'w-[88%] max-w-[390px] h-[580px] sm:h-[620px] mx-auto'
        }`}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* ================= LAYER 1: ENVELOPE BACK PANEL (z-1) ================= */}
        {!hasSettled && (
          <div
            ref={backPanelRef}
            className="absolute inset-0 rounded-[28px] sm:rounded-[32px] overflow-hidden shadow-2xl pointer-events-none"
            style={{
              zIndex: 1,
              background: 'linear-gradient(155deg, #f5ecd9 0%, #ebe0ca 60%, #ded0b6 100%)',
              border: '1.5px solid rgba(255, 255, 255, 0.9)',
              boxShadow: '0 30px 70px -15px rgba(84, 18, 35, 0.16), inset 0 6px 20px rgba(0, 0, 0, 0.14)',
            }}
          >
            {/* Soft inner shadow of envelope pocket interior */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/15 via-transparent to-black/5 pointer-events-none" />
          </div>
        )}

        {/* ================= LAYER 2: TOP TRIANGULAR FLAP (z-30 -> z-5) ================= */}
        {!hasSettled && (
          <div
            ref={topFlapRef}
            className="absolute top-0 left-0 right-0 h-[53%] origin-top pointer-events-none"
            style={{
              zIndex: 30,
              clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
              background: 'linear-gradient(180deg, #fcf9f2 0%, #f6edd9 80%, #eedfcb 100%)',
              boxShadow: '0 8px 24px rgba(0,0,0,0.09)',
              transformStyle: 'preserve-3d',
            }}
          >
            <svg className="w-full h-full" viewBox="0 0 390 318" preserveAspectRatio="none">
              <defs>
                <linearGradient id="flapGoldBevelTrue" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#fcedc5" />
                  <stop offset="30%" stopColor="#dfba73" />
                  <stop offset="65%" stopColor="#c59b27" />
                  <stop offset="100%" stopColor="#fcedc5" />
                </linearGradient>
                <filter id="pipingGlowTrue" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="0" dy="1.5" stdDeviation="1.2" floodColor="#541223" floodOpacity="0.25" />
                </filter>
              </defs>
              <polyline
                points="0,0 195,318 390,0"
                stroke="url(#flapGoldBevelTrue)"
                strokeWidth="3.2"
                filter="url(#pipingGlowTrue)"
                fill="none"
              />
            </svg>
            <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-transparent to-transparent pointer-events-none" />
          </div>
        )}

        {/* ================= LAYER 3: THE INVITATION CARD (z-10 -> z-60) ================= */}
        {/* Sandwiched between Back Panel (z-1) and Front Pocket (z-20) while inside! */}
        {/* Maintains full width (inset-x-2 inset-y-2), slides straight UPWARD through the top opening, then expands forward. */}
        <div
          ref={invitationCardRef}
          className={`rounded-[28px] sm:rounded-[34px] card-glass-outer p-2.5 sm:p-3.5 select-text shadow-2xl relative overflow-hidden ${
            hasSettled
              ? 'relative w-full max-w-[520px] mx-auto'
              : 'absolute inset-x-2 inset-y-2'
          }`}
          style={
            hasSettled
              ? { zIndex: 60 }
              : {
                  zIndex: 10,
                  transformOrigin: 'center center',
                }
          }
        >
          {/* Top Specular Glass Glare Beam */}
          <div className="absolute top-0 left-0 right-0 h-44 rounded-t-[30px] glass-reflection-overlay pointer-events-none opacity-65 z-20" />
          {/* Inner Hairline Highlight Rim for Layered Glass Depth */}
          <div className="absolute inset-2 rounded-[22px] sm:rounded-[28px] border border-white/70 pointer-events-none z-20" />

          {/* Inner Textured Luxury Paper Sheet */}
          <div className="relative z-10 w-full h-full rounded-[22px] sm:rounded-[28px] card-paper-inner p-4 sm:p-6 flex flex-col items-center text-center shadow-lg border border-[#c59b27]/40 bg-[#fffdfa]/95">
            
            {/* Top Invocation (Arabic script) */}
            <p
              className="font-arabic text-xl sm:text-2xl text-[#73162f] tracking-wide mt-1"
              dir="rtl"
            >
              {openingCardData.bismillahArabic || invocation?.arabic || 'بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ'}
            </p>

            {/* English Translation */}
            <p
              className="font-serif italic text-xs sm:text-[13px] text-[#5c4033] tracking-wide mt-1 max-w-sm"
            >
              "{openingCardData.bismillahEnglish || 'In the name of Allah, the Most Beneficent and Most Merciful.'}"
            </p>

            {/* Subtle Gold Divider */}
            <div className="flex items-center justify-center gap-2 my-2 w-28 text-[#c59b27]">
              <span className="w-8 h-[1px] bg-[#c59b27]/60" />
              <span className="text-[10px]">◇</span>
              <span className="w-8 h-[1px] bg-[#c59b27]/60" />
            </div>

            {/* DEDICATED ISLAMIC IMAGE PLACEHOLDER (Controlled by JSON) */}
            <div
              className="relative w-full max-w-[340px] h-36 sm:h-44 my-1.5 rounded-t-[52px] rounded-b-xl border-2 border-[#dfba73]/80 shadow-md overflow-hidden bg-[#24040d] group"
            >
              <img
                src={cardImageSrc}
                alt="Islamic Wedding Artwork"
                className="w-full h-full object-cover object-center transform transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-1.5 rounded-t-[46px] rounded-b-lg border border-[#dfba73]/40 pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#160206]/35 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Tagline: "We Are Getting Married" */}
            <p
              className="text-[11px] sm:text-xs font-serif tracking-[0.32em] text-[#b38a32] uppercase font-bold mt-2"
            >
              {openingCardData.tagline || 'We Are Getting Married'}
            </p>

            {/* Groom's Name (Cursive Calligraphy Typography) */}
            <h1
              className="font-cursive text-4xl sm:text-5xl text-[#73162f] font-normal leading-tight mt-0.5"
            >
              {couple?.groom?.name || 'Shahid Anwar'}
            </h1>

            {/* Connector: Weds */}
            <div
              className="flex items-center justify-center gap-3 my-0.5 text-[#c59b27]"
            >
              <span className="w-7 h-[1px] bg-gradient-to-r from-transparent to-[#c59b27]" />
              <span className="font-serif italic text-xs sm:text-sm text-[#b38a32] font-medium px-1">
                {openingCardData.connector || 'Weds'}
              </span>
              <span className="w-7 h-[1px] bg-gradient-to-l from-transparent to-[#c59b27]" />
            </div>

            {/* Bride's Name (Cursive Calligraphy Typography) */}
            <h2
              className="font-cursive text-4xl sm:text-5xl text-[#73162f] font-normal leading-tight"
            >
              {couple?.bride?.name || 'Nasreen Parween'}
            </h2>

            {/* Date Badge */}
            <div className="mt-2.5">
              <span className="inline-block px-4 py-1 rounded-full bg-[#73162f]/8 text-[#73162f] text-xs font-serif font-bold tracking-[0.2em] uppercase border border-[#c59b27]/30">
                {content.wedding?.displayDate || '21st November 2026'}
              </span>
            </div>

            {/* Scroll Indicator Prompt */}
            {hasSettled && (
              <div
                ref={scrollIndicatorRef}
                onClick={onScrollToDetails}
                className="mt-3.5 flex flex-col items-center cursor-pointer group select-none animate-bounce"
              >
                <span className="text-[10px] font-serif tracking-[0.25em] text-[#655e5a] uppercase font-semibold">
                  {openingCardData.scrollPrompt || 'Scroll down to explore wedding details'}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-[#c59b27] mt-0.5" />
              </div>
            )}

          </div>
        </div>

        {/* ================= LAYER 4: ENVELOPE FRONT POCKET (z-20) ================= */}
        {/* Occludes the lower body of the card while inside the envelope */}
        {!hasSettled && (
          <div
            ref={frontPocketRef}
            className="absolute inset-0 rounded-[28px] sm:rounded-[32px] overflow-hidden pointer-events-none"
            style={{
              zIndex: 20,
              transformStyle: 'preserve-3d',
            }}
          >
            {/* Diagonal Specular Highlight Beam across Top-Left */}
            <div
              className="absolute top-0 left-0 w-full h-full pointer-events-none z-30 opacity-70"
              style={{
                background: 'linear-gradient(115deg, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.2) 20%, transparent 45%)',
              }}
            />

            {/* Glowing Glass Flare in bottom corners */}
            <div className="absolute -bottom-5 -left-5 w-24 h-24 rounded-full bg-[#fce7af]/60 blur-lg pointer-events-none z-30" />
            <div className="absolute -bottom-5 -right-5 w-24 h-24 rounded-full bg-[#fce7af]/60 blur-lg pointer-events-none z-30" />

            {/* Left Triangular Fold Facet */}
            <div
              className="absolute top-0 bottom-0 left-0 w-full h-full pointer-events-none z-10"
              style={{
                clipPath: 'polygon(0 0, 50% 53%, 0 100%)',
                background: 'linear-gradient(90deg, #ede2cf 0%, #f8f1e5 100%)',
              }}
            />

            {/* Right Triangular Fold Facet */}
            <div
              className="absolute top-0 bottom-0 right-0 w-full h-full pointer-events-none z-10"
              style={{
                clipPath: 'polygon(100% 0, 50% 53%, 100% 100%)',
                background: 'linear-gradient(-90deg, #ede2cf 0%, #f8f1e5 100%)',
              }}
            />

            {/* Bottom Triangular Fold Facet */}
            <div
              className="absolute bottom-0 left-0 right-0 w-full h-full pointer-events-none z-10"
              style={{
                clipPath: 'polygon(0 100%, 50% 53%, 100% 100%)',
                background: 'linear-gradient(0deg, #e4d5be 0%, #f6efe1 100%)',
              }}
            />

            {/* Golden V-Piping along Fold Creases */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-15" viewBox="0 0 390 600" preserveAspectRatio="none">
              <defs>
                <linearGradient id="foldGoldGradientReal" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#fef3d8" />
                  <stop offset="35%" stopColor="#dfba73" />
                  <stop offset="75%" stopColor="#c59b27" />
                  <stop offset="100%" stopColor="#fef3d8" />
                </linearGradient>
                <filter id="creaseShadowReal" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="0" dy="1" stdDeviation="1" floodColor="#541223" floodOpacity="0.2" />
                </filter>
              </defs>
              <line x1="0" y1="600" x2="195" y2="318" stroke="url(#foldGoldGradientReal)" strokeWidth="3" filter="url(#creaseShadowReal)" opacity="0.95" />
              <line x1="390" y1="600" x2="195" y2="318" stroke="url(#foldGoldGradientReal)" strokeWidth="3" filter="url(#creaseShadowReal)" opacity="0.95" />
            </svg>

            {/* Outer Beveled Glass Border */}
            <div className="absolute inset-0 rounded-[28px] sm:rounded-[32px] border-[1.5px] border-white/90 pointer-events-none z-20 shadow-[inset_0_2px_4px_rgba(255,255,255,0.95),inset_0_-2px_4px_rgba(197,155,39,0.3)]" />
          </div>
        )}

        {/* ================= LAYER 5: WAX SEAL & BUTTON (z-40) ================= */}
        {!hasSettled && (
          <>
            {/* Center Wax Seal ("S & N") */}
            <div
              ref={sealWrapperRef}
              className="absolute top-[53%] left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer"
              style={{ zIndex: 40 }}
              onClick={handleOpenSequence}
            >
              <WaxSeal
                initials="S & N"
                onClick={handleOpenSequence}
                isOpening={isOpening}
                size={114}
              />
            </div>

            {/* TAP TO OPEN Button & Subtitle Prompt */}
            <div
              ref={tapButtonWrapperRef}
              className="absolute top-[67%] left-0 right-0 flex flex-col items-center justify-center text-center px-4 pointer-events-auto"
              style={{ zIndex: 40 }}
            >
              {/* Gilded Frosted Pill Button */}
              <button
                onClick={handleOpenSequence}
                disabled={isOpening}
                className="relative inline-flex items-center justify-center gap-2.5 px-8 py-2.5 rounded-full bg-white/88 backdrop-blur-md border-[1.5px] border-[#dfba73] shadow-[0_8px_24px_rgba(212,175,55,0.22),inset_0_1px_2px_rgba(255,255,255,0.95)] hover:bg-white active:scale-95 transition-all duration-300 group cursor-pointer"
              >
                {/* Left Laurel Branch Motif */}
                <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 text-[#b38a32]" fill="currentColor">
                  <path d="M17 8C8 10 5 16 3 21C8 20 14 17 17 8Z" />
                  <path d="M12 12C9 9 9 5 11 2C13 5 13 9 12 12Z" />
                </svg>
                {/* Text: TAP TO OPEN */}
                <span className="text-xs font-serif font-bold tracking-[0.28em] text-[#73162f] uppercase">
                  TAP TO OPEN
                </span>
                {/* Right Laurel Branch Motif (Mirrored) */}
                <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 text-[#b38a32] transform scale-x-[-1]" fill="currentColor">
                  <path d="M17 8C8 10 5 16 3 21C8 20 14 17 17 8Z" />
                  <path d="M12 12C9 9 9 5 11 2C13 5 13 9 12 12Z" />
                </svg>
              </button>

              {/* Italic Subtitle */}
              <p className="font-serif italic text-xs sm:text-[13px] text-[#614b3d] mt-3 tracking-wide">
                Tap to begin the royal wedding journey
              </p>

              {/* Delicate Diamond Divider */}
              <div className="flex items-center justify-center gap-2 mt-2 w-28 text-[#c59b27]">
                <span className="w-8 h-[1px] bg-[#c59b27]/60" />
                <span className="text-[10px] text-[#c59b27]">◆</span>
                <span className="w-8 h-[1px] bg-[#c59b27]/60" />
              </div>
            </div>
          </>
        )}

      </div>
    </section>
  );
};
