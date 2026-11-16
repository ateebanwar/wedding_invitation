import React, { useRef, useState, useEffect, useCallback } from 'react';
import { WeddingContent } from '../../types/wedding';
import { SectionDivider } from '../../components/SectionDivider/SectionDivider';
import { PrimaryButton } from '../../components/PrimaryButton/PrimaryButton';
import { generateGoogleCalendarUrl, downloadIcsFile } from '../../services/calendarService';
import { Calendar, Download, Sparkles } from 'lucide-react';

interface ScratchRevealProps {
  content: WeddingContent;
}

export const ScratchReveal: React.FC<ScratchRevealProps> = ({ content }) => {
  const { wedding, venue, couple, sections } = content;
  const scratchConfig = sections?.scratch || {
    heading: 'A LITTLE SECRET',
    subtitle: 'Save the Date',
    unrevealedText: 'SCRATCH TO REVEAL',
    revealedHeading: 'SAVE THE DATE',
    buttonLabel: 'ADD TO CALENDAR',
    revealedNotice: 'We eagerly await your presence on this auspicious day!',
    thresholdPercent: 40,
  };

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isDrawingRef = useRef<boolean>(false);

  const [isRevealed, setIsRevealed] = useState<boolean>(false);
  const [showCalendarOptions, setShowCalendarOptions] = useState<boolean>(false);
  const [clearedPercent, setClearedPercent] = useState<number>(0);

  // Initialize Canvas with shimmering antique gold foil texture
  const initCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    // Rich metallic gold gradient
    const grad = ctx.createLinearGradient(0, 0, width, height);
    grad.addColorStop(0, '#c59b27');
    grad.addColorStop(0.3, '#f3eed6');
    grad.addColorStop(0.5, '#dfba73');
    grad.addColorStop(0.7, '#f7e7b4');
    grad.addColorStop(1, '#9d782e');

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    // Subtle decorative sparkles/patterns on canvas
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
    ctx.lineWidth = 1;
    for (let i = 0; i < 20; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      const r = Math.random() * 2 + 1;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.stroke();
    }

    // Centered Scratch Instruction Text on the canvas foil
    ctx.fillStyle = '#4a0e1c';
    ctx.font = 'bold 13px "Cormorant Garamond", Georgia, serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.letterSpacing = '2px';
    ctx.fillText('✨ SCRATCH HERE ✨', width / 2, height / 2 - 10);
    ctx.font = '11px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = '#541223';
    ctx.fillText('Swipe with finger or cursor', width / 2, height / 2 + 14);
  }, []);

  useEffect(() => {
    initCanvas();
  }, [initCanvas]);

  // Check how much percentage has been cleared
  const checkScratchPercentage = useCallback(() => {
    if (isRevealed) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    const { width, height } = canvas;
    const imageData = ctx.getImageData(0, 0, width, height);
    const data = imageData.data;
    let transparentCount = 0;
    const totalPixels = data.length / 4;

    // Sample every 4th pixel for performance
    for (let i = 3; i < data.length; i += 16) {
      if (data[i] === 0) {
        transparentCount++;
      }
    }

    const currentPercent = Math.round((transparentCount / (totalPixels / 4)) * 100);
    setClearedPercent(currentPercent);

    const threshold = scratchConfig.thresholdPercent || 40;
    if (currentPercent >= threshold) {
      setIsRevealed(true);
    }
  }, [isRevealed, scratchConfig.thresholdPercent]);

  // Scratch Drawing Handlers
  const scratchAt = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width) * canvas.width;
    const y = ((clientY - rect.top) / rect.height) * canvas.height;

    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 28, 0, Math.PI * 2);
    ctx.fill();

    checkScratchPercentage();
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    if (isRevealed) return;
    isDrawingRef.current = true;
    scratchAt(e.clientX, e.clientY);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDrawingRef.current || isRevealed) return;
    scratchAt(e.clientX, e.clientY);
  };

  const handlePointerUp = () => {
    isDrawingRef.current = false;
  };

  // Calendar Event Details
  const calendarEventDetails = {
    title: `Wedding Ceremony — ${couple?.groom?.name} & ${couple?.bride?.name}`,
    description: `Nikah Ceremony of ${couple?.groom?.name} & ${couple?.bride?.name}.\nVenue: ${venue?.name}, ${venue?.area}.`,
    location: venue?.fullAddress || `${venue?.name}, ${venue?.area}`,
    startDate: wedding?.date || '2026-11-21',
    startTime: wedding?.time || '16:30',
    timeDescription: wedding?.timeDescription,
    timezone: wedding?.timezone,
  };

  const handleGoogleCalendar = () => {
    const url = generateGoogleCalendarUrl(calendarEventDetails);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleDownloadIcs = () => {
    downloadIcsFile(calendarEventDetails);
  };

  return (
    <section
      id="scratch-reveal-section"
      className="relative w-full min-h-screen py-20 px-4 flex flex-col items-center justify-center bg-parchment select-none"
    >
      {/* SVG ClipPath Definition for Exact Responsive Heart Scratch Clipping */}
      <svg width="0" height="0" className="absolute pointer-events-none" aria-hidden="true">
        <defs>
          <clipPath id="scratchHeartClip" clipPathUnits="objectBoundingBox">
            <path d="M 0.50 0.85 C 0.27 0.67, 0.08 0.49, 0.08 0.31 C 0.08 0.17, 0.19 0.07, 0.33 0.07 C 0.41 0.07, 0.46 0.12, 0.50 0.17 C 0.54 0.12, 0.59 0.07, 0.67 0.07 C 0.81 0.07, 0.92 0.17, 0.92 0.31 C 0.92 0.49, 0.73 0.67, 0.50 0.85 Z" />
          </clipPath>
        </defs>
      </svg>

      {/* Main Glass-Bordered Scratch Card with Prominent Depth & Layered Reflections */}
      <div className="relative w-full max-w-lg mx-auto rounded-[32px] card-glass-outer p-2.5 xs:p-3 sm:p-4.5 select-none shadow-2xl overflow-hidden flex flex-col items-center">
        {/* Top Specular Glare Reflection Beam across glass surface */}
        <div className="absolute top-0 left-0 right-0 h-44 rounded-t-[28px] glass-reflection-overlay pointer-events-none opacity-70 z-20" />
        {/* Outer Glass Bevel Rim */}
        <div className="absolute inset-1.5 xs:inset-2 rounded-[26px] border border-white/70 pointer-events-none z-20" />

        {/* Inner Floating Luxury Paper Sheet */}
        <div className="relative z-10 w-full rounded-[24px] card-paper-inner p-4 xs:p-6 sm:p-10 shadow-lg border border-[#c59b27]/35 bg-[#fdfbf7]/95 flex flex-col items-center overflow-hidden">
          {/* Inner hairline frame */}
          <div className="absolute inset-1.5 border border-[#c59b27]/20 rounded-[20px] pointer-events-none" />

          {/* Headings */}
          <div className="relative z-10 text-center space-y-2 mb-4 sm:mb-6 max-w-md">
            <span className="text-xs font-serif tracking-[0.3em] text-[#c59b27] uppercase font-bold">
              {isRevealed ? scratchConfig.revealedHeading : scratchConfig.heading}
            </span>
            <h2 className="font-calligraphy text-2xl xs:text-3xl sm:text-4xl text-[#73162f] font-bold">
              {scratchConfig.subtitle}
            </h2>
            <SectionDivider className="my-2" />
            <p className="font-serif text-xs text-[#655e5a] tracking-wider italic">
              {isRevealed
                ? scratchConfig.revealedNotice
                : 'Scratch the golden heart below to discover the auspicious date'}
            </p>
          </div>

          {/* Large Golden Heart Container - Fluid responsive sizing down to 320px screens */}
          <div
            ref={containerRef}
            className="relative w-56 h-56 xs:w-68 xs:h-68 sm:w-80 sm:h-80 max-w-full flex items-center justify-center my-2 sm:my-3 group"
          >
            {/* Heart SVG Frame Outer Border */}
            <div className="absolute inset-0 filter drop-shadow-xl pointer-events-none">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <path
                  d="M50 88 C25 68, 5 50, 5 30 C5 15, 18 5, 33 5 C42 5, 47 10, 50 15 C53 10, 58 5, 67 5 C82 5, 95 15, 95 30 C95 50, 75 68, 50 88 Z"
                  fill="#fdfbf7"
                  stroke="#c59b27"
                  strokeWidth="1.5"
                />
                {/* Dotted Inner Heart Outline */}
                <path
                  d="M50 84 C28 66, 9 49, 9 31 C9 18, 20 9, 33 9 C41 9, 46 13, 50 18 C54 13, 59 9, 67 9 C80 9, 91 18, 91 31 C91 49, 72 66, 50 84 Z"
                  fill="none"
                  stroke="#dfba73"
                  strokeWidth="0.8"
                  strokeDasharray="2 2"
                />
              </svg>
            </div>

            {/* Revealed Content underneath canvas */}
            <div className="absolute inset-3 xs:inset-4 z-0 flex flex-col items-center justify-center text-center p-2 xs:p-3 select-none">
              <span className="text-[9px] xs:text-[10px] sm:text-xs font-serif font-bold tracking-[0.25em] text-[#c59b27] uppercase">
                ❖ Sacred Nikah ❖
              </span>
              <span className="font-serif text-[11px] xs:text-xs font-medium text-[#73162f] mt-0.5">
                Saturday
              </span>
              {/* Enlarged Prominent Date Number 21 */}
              <span className="font-serif text-5xl xs:text-6xl sm:text-7xl font-bold text-[#73162f] my-0.5 tracking-tight leading-none drop-shadow-sm">
                21
              </span>
              <span className="font-serif text-xs sm:text-sm font-semibold text-[#541223] uppercase tracking-wider">
                November 2026
              </span>
              <span className="font-serif text-[10px] xs:text-[11px] sm:text-xs text-[#5c4033] italic mt-0.5 xs:mt-1 font-medium">
                {wedding?.timeDescription}
              </span>
            </div>

            {/* HTML5 Canvas Scratch Layer - 100% Strictly Clipped Inside Heart */}
            {!isRevealed && (
              <div
                className="absolute inset-0 z-10 overflow-hidden cursor-crosshair touch-none"
                style={{
                  clipPath: 'url(#scratchHeartClip)',
                  WebkitClipPath: 'url(#scratchHeartClip)',
                }}
              >
                <canvas
                  ref={canvasRef}
                  width={320}
                  height={320}
                  className="w-full h-full block"
                  onPointerDown={handlePointerDown}
                  onPointerMove={handlePointerMove}
                  onPointerUp={handlePointerUp}
                  onPointerCancel={handlePointerUp}
                />
              </div>
            )}

            {/* Revealed Sparkle Animation indicator */}
            {isRevealed && (
              <div className="absolute top-2 right-4 text-[#c59b27] animate-pulse pointer-events-none">
                <Sparkles className="w-5 h-5" />
              </div>
            )}
          </div>

          {/* Progress pill if not revealed */}
          {!isRevealed && clearedPercent > 0 && (
            <div className="text-[11px] font-serif text-[#73162f] tracking-widest mt-1 mb-2">
              Revealing: {clearedPercent}%
            </div>
          )}

          {/* ADD TO CALENDAR Action Button */}
          <div className="mt-4 flex flex-col items-center space-y-3 w-full">
            <PrimaryButton
              onClick={() => setShowCalendarOptions(prev => !prev)}
              variant="burgundy"
              icon={<Calendar className="w-4 h-4 text-[#dfba73]" />}
            >
              {scratchConfig.buttonLabel || 'ADD TO CALENDAR'}
            </PrimaryButton>

            {/* Calendar Dropdown Options Modal / Pill */}
            {showCalendarOptions && (
              <div className="w-full max-w-xs p-3 rounded-2xl bg-[#fdfbf7] border border-[#c59b27]/40 shadow-xl space-y-2 animate-in fade-in zoom-in-95 duration-200">
                <button
                  onClick={handleGoogleCalendar}
                  className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl bg-[#faf7f2] hover:bg-[#73162f]/10 text-[#73162f] border border-[#c59b27]/30 text-xs font-serif font-semibold tracking-wider transition-colors"
                >
                  <span>Add to Google Calendar</span>
                  <Calendar className="w-3.5 h-3.5 text-[#c59b27]" />
                </button>
                <button
                  onClick={handleDownloadIcs}
                  className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl bg-[#faf7f2] hover:bg-[#73162f]/10 text-[#73162f] border border-[#c59b27]/30 text-xs font-serif font-semibold tracking-wider transition-colors"
                >
                  <span>Download iCal (.ics)</span>
                  <Download className="w-3.5 h-3.5 text-[#c59b27]" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
