import React, { useEffect, useRef } from 'react';
import { WeddingContent } from '../../types/wedding';
import { SectionDivider } from '../../components/SectionDivider/SectionDivider';
import { Sparkles, Heart } from 'lucide-react';

interface CelebrationsTimelineProps {
  content: WeddingContent;
}

export const CelebrationsTimeline: React.FC<CelebrationsTimelineProps> = ({ content }) => {
  const { events, sections } = content;
  const celebrationsConfig = sections?.celebrations || {
    heading: 'WEDDING FESTIVITIES',
    title: 'The Celebrations',
    subtitle: 'Join us for the celebrations',
  };

  const containerRef = useRef<HTMLDivElement>(null);
  const nikahCardRef = useRef<HTMLDivElement>(null);
  const walimaCardRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const progressPathRef = useRef<SVGPathElement>(null);
  const heartGroupRef = useRef<SVGGElement>(null);
  const milestone1GroupRef = useRef<SVGGElement>(null);
  const milestone2GroupRef = useRef<SVGGElement>(null);
  const milestone1CircleRef = useRef<SVGCircleElement>(null);
  const milestone2CircleRef = useRef<SVGCircleElement>(null);

  // Pure requestAnimationFrame scroll synchronization:
  // Tracks scroll progress bidirectionally (down & up) without any React re-renders!
  useEffect(() => {
    let rafId: number | null = null;

    const setupMilestones = () => {
      const path = pathRef.current;
      if (!path) return;
      const len = path.getTotalLength();
      const p1 = path.getPointAtLength(0.08 * len);
      const p2 = path.getPointAtLength(0.92 * len);

      if (milestone1GroupRef.current) {
        milestone1GroupRef.current.setAttribute('transform', `translate(${p1.x}, ${p1.y})`);
      }
      if (milestone2GroupRef.current) {
        milestone2GroupRef.current.setAttribute('transform', `translate(${p2.x}, ${p2.y})`);
      }
    };

    const updateHeartPosition = () => {
      const path = pathRef.current;
      const heart = heartGroupRef.current;
      const nikah = nikahCardRef.current;
      const walima = walimaCardRef.current;

      if (!path || !heart || !nikah || !walima) return;

      const nikahRect = nikah.getBoundingClientRect();
      const walimaRect = walima.getBoundingClientRect();

      // Optical focal center in viewport (50% of viewport height)
      const viewportCenter = window.innerHeight * 0.5;

      const nikahY = nikahRect.top + nikahRect.height * 0.45;
      const walimaY = walimaRect.top + walimaRect.height * 0.45;
      const totalDistance = walimaY - nikahY;

      let progress = 0;
      if (totalDistance > 0) {
        progress = (viewportCenter - nikahY) / totalDistance;
      }

      // Clamp between 0.0 (at Nikah) and 1.0 (at Walima)
      progress = Math.max(0, Math.min(1, progress));

      const pathLength = path.getTotalLength();
      const point = path.getPointAtLength(progress * pathLength);

      // 1. Direct hardware-accelerated transform on heart marker (ZERO React re-renders)
      heart.setAttribute('transform', `translate(${point.x}, ${point.y})`);

      // 2. Active illuminated progress line following the heart
      if (progressPathRef.current) {
        progressPathRef.current.style.strokeDasharray = `${pathLength}`;
        progressPathRef.current.style.strokeDashoffset = `${pathLength * (1 - progress)}`;
      }

      // 3. Milestone circle illuminations
      if (milestone1CircleRef.current) {
        milestone1CircleRef.current.setAttribute('fill', progress >= 0.08 ? '#73162f' : '#fdfbf7');
      }
      if (milestone2CircleRef.current) {
        milestone2CircleRef.current.setAttribute('fill', progress >= 0.90 ? '#73162f' : '#fdfbf7');
      }
    };

    const onScrollOrResize = () => {
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
      rafId = requestAnimationFrame(updateHeartPosition);
    };

    setupMilestones();
    updateHeartPosition();

    window.addEventListener('scroll', onScrollOrResize, { passive: true });
    window.addEventListener('resize', () => {
      setupMilestones();
      onScrollOrResize();
    }, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScrollOrResize);
      window.removeEventListener('resize', onScrollOrResize);
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
    };
  }, []);

  // Filter strictly to the 2 allowed Islamic events: Nikah and Walima
  const validEvents = (events || []).filter(
    e => e.id.toLowerCase() === 'nikah' || e.id.toLowerCase() === 'walima'
  );

  return (
    <section
      id="celebrations-timeline-section"
      ref={containerRef}
      className="relative w-full min-h-screen py-24 px-4 bg-parchment overflow-hidden select-none"
    >
      {/* Section Header */}
      <div className="text-center space-y-2 mb-20 max-w-lg mx-auto">
        <span className="text-xs font-serif tracking-[0.35em] text-[#c59b27] uppercase font-bold">
          {celebrationsConfig.heading}
        </span>
        <h2 className="font-calligraphy text-3xl sm:text-5xl text-[#73162f] font-bold">
          {celebrationsConfig.title}
        </h2>
        <SectionDivider className="my-2" />
        <p className="font-serif text-xs sm:text-sm text-[#5c4033] tracking-wider italic">
          {celebrationsConfig.subtitle}
        </p>
      </div>

      {/* Timeline Journey Container with Generous Height for Real Breathing Room */}
      <div className="relative max-w-3xl mx-auto min-h-[1100px] sm:min-h-[1200px]">
        {/* SVG Curved Pathway with Travelling Heart */}
        <div className="absolute inset-0 w-full h-full pointer-events-none">
          <svg
            viewBox="0 0 400 1100"
            className="w-full h-full"
            preserveAspectRatio="none"
            fill="none"
          >
            <defs>
              <linearGradient id="timelineGradBase" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#dfba73" stopOpacity="0.4" />
                <stop offset="50%" stopColor="#c59b27" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#dfba73" stopOpacity="0.4" />
              </linearGradient>

              <linearGradient id="timelineActiveGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#c59b27" />
                <stop offset="35%" stopColor="#73162f" />
                <stop offset="70%" stopColor="#c59b27" />
                <stop offset="100%" stopColor="#73162f" />
              </linearGradient>

              {/* Heart Glow Filter */}
              <filter id="heartGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Base guide pathway */}
            <path
              d="M 160 160 C 340 320, 340 540, 200 660 C 60 780, 60 920, 240 1020"
              stroke="url(#timelineGradBase)"
              strokeWidth="3.5"
              strokeDasharray="6 6"
            />

            {/* Main Interactive Pathway */}
            <path
              ref={pathRef}
              d="M 160 160 C 340 320, 340 540, 200 660 C 60 780, 60 920, 240 1020"
              stroke="rgba(212, 175, 55, 0.25)"
              strokeWidth="4.5"
              strokeLinecap="round"
            />

            {/* Active Illuminated Trail that dynamically follows the heart */}
            <path
              ref={progressPathRef}
              d="M 160 160 C 340 320, 340 540, 200 660 C 60 780, 60 920, 240 1020"
              stroke="url(#timelineActiveGrad)"
              strokeWidth="4.5"
              strokeLinecap="round"
            />

            {/* Event Milestone 1: Nikah (Anchored dynamically on path) */}
            <g ref={milestone1GroupRef}>
              <circle
                ref={milestone1CircleRef}
                r="18"
                fill="#fdfbf7"
                stroke="#c59b27"
                strokeWidth="3"
                className="transition-colors duration-300 drop-shadow-md"
              />
              <circle r="7" fill="#c59b27" />
            </g>

            {/* Event Milestone 2: Walima (Anchored dynamically on path) */}
            <g ref={milestone2GroupRef}>
              <circle
                ref={milestone2CircleRef}
                r="18"
                fill="#fdfbf7"
                stroke="#c59b27"
                strokeWidth="3"
                className="transition-colors duration-300 drop-shadow-md"
              />
              <circle r="7" fill="#c59b27" />
            </g>

            {/* Travelling Heart Marker synchronized continuously with user scroll (both DOWN and UP) */}
            <g
              ref={heartGroupRef}
              filter="url(#heartGlow)"
              className="pointer-events-none"
            >
              {/* Outer pulsing gold halo */}
              <circle r="22" fill="rgba(212, 175, 55, 0.4)" />
              <circle r="15" fill="rgba(115, 22, 47, 0.5)" />
              {/* Burgundy Heart with Golden Bevel Edge */}
              <path
                d="M 0 6 C -9 -6, -18 3, -13 12 C -9 20, 0 27, 0 27 C 0 27, 9 20, 13 12 C 18 3, 9 -6, 0 6 Z"
                transform="translate(0, -16)"
                fill="#73162f"
                stroke="#fdfbf7"
                strokeWidth="2.2"
              />
            </g>
          </svg>
        </div>

        {/* Event Cards placed on alternate sides with Ample Breathing Room */}
        <div className="relative z-10 flex flex-col justify-between min-h-[1100px] sm:min-h-[1200px] py-8">
          
          {/* 1. NIKAH EVENT CARD (Left / Top milestone with Glass Over Paper) */}
          <div className="flex justify-start pl-1 sm:pl-4 pr-3 xs:pr-6 sm:pr-24">
            <div
              ref={nikahCardRef}
              className="relative w-full max-w-[360px] sm:max-w-[430px] rounded-[28px] card-glass-outer shadow-2xl overflow-hidden p-2.5 xs:p-3 sm:p-4 select-none"
            >
              {/* Top Specular Glare Reflection Beam */}
              <div className="absolute top-0 left-0 right-0 h-36 rounded-t-[24px] glass-reflection-overlay pointer-events-none opacity-70 z-20" />
              {/* Outer Glass Bevel Rim */}
              <div className="absolute inset-1.5 rounded-[22px] border border-white/70 pointer-events-none z-20" />

              {/* Inner Floating Luxury Paper Sheet */}
              <div className="relative z-10 w-full rounded-[20px] card-paper-inner p-4 xs:p-5 sm:p-7 shadow-lg border border-[#c59b27]/35 bg-[#fdfbf7]/95">
                <div className="absolute inset-1 border border-[#c59b27]/20 rounded-[16px] pointer-events-none" />

                <div className="flex items-center justify-between mb-3">
                  <span className="px-3.5 py-1 rounded-full bg-[#73162f]/10 text-[#73162f] text-[11px] font-serif font-bold uppercase tracking-wider border border-[#c59b27]/40 shadow-xs">
                    {validEvents[0]?.badge || 'Main Ceremony'}
                  </span>
                  <Sparkles className="w-4 h-4 text-[#c59b27]" />
                </div>

                <h3 className="font-calligraphy text-2xl xs:text-3xl sm:text-4xl text-[#73162f] font-bold">
                  {validEvents[0]?.title || 'Nikah'}
                </h3>
                <p className="font-arabic text-base sm:text-lg text-[#b88c24] font-semibold mt-0.5" dir="rtl">
                  {validEvents[0]?.urduTitle || 'تقریبِ نکاح'}
                </p>

                <div className="mt-3.5 space-y-1.5 text-xs sm:text-sm font-serif text-[#2c2724]">
                  <p className="font-semibold text-[#541223] text-sm sm:text-base">
                    {validEvents[0]?.day}, {validEvents[0]?.date ? '21st November 2026' : ''}
                  </p>
                  <p className="text-[#5c4033] italic font-semibold">
                    {validEvents[0]?.timeDescription}
                  </p>
                  <p className="text-[#3d3835] text-xs pt-1 flex items-start gap-1 font-medium">
                    <span>📍</span>
                    <span>{validEvents[0]?.venue}, {validEvents[0]?.location}</span>
                  </p>
                </div>

                <p className="mt-4 text-xs font-serif text-[#383330] leading-relaxed border-t border-[#c59b27]/30 pt-3">
                  {validEvents[0]?.description}
                </p>
              </div>
            </div>
          </div>

          {/* 2. WALIMA EVENT CARD (Right / Bottom milestone with Glass Over Paper) */}
          <div className="flex justify-end pr-1 sm:pr-4 pl-3 xs:pl-6 sm:pl-24">
            <div
              ref={walimaCardRef}
              className="relative w-full max-w-[360px] sm:max-w-[430px] rounded-[28px] card-glass-outer shadow-2xl overflow-hidden p-2.5 xs:p-3 sm:p-4 select-none"
            >
              {/* Top Specular Glare Reflection Beam */}
              <div className="absolute top-0 left-0 right-0 h-36 rounded-t-[24px] glass-reflection-overlay pointer-events-none opacity-70 z-20" />
              {/* Outer Glass Bevel Rim */}
              <div className="absolute inset-1.5 rounded-[22px] border border-white/70 pointer-events-none z-20" />

              {/* Inner Floating Luxury Paper Sheet */}
              <div className="relative z-10 w-full rounded-[20px] card-paper-inner p-4 xs:p-5 sm:p-7 shadow-lg border border-[#c59b27]/35 bg-[#fdfbf7]/95">
                <div className="absolute inset-1 border border-[#c59b27]/20 rounded-[16px] pointer-events-none" />

                <div className="flex items-center justify-between mb-3">
                  <span className="px-3.5 py-1 rounded-full bg-[#73162f]/10 text-[#73162f] text-[11px] font-serif font-bold uppercase tracking-wider border border-[#c59b27]/40 shadow-xs">
                    {validEvents[1]?.badge || 'Reception Banquet'}
                  </span>
                  <Heart className="w-4 h-4 text-[#c59b27]" />
                </div>

                <h3 className="font-calligraphy text-2xl xs:text-3xl sm:text-4xl text-[#73162f] font-bold">
                  {validEvents[1]?.title || 'Walima'}
                </h3>
                <p className="font-arabic text-base sm:text-lg text-[#b88c24] font-semibold mt-0.5" dir="rtl">
                  {validEvents[1]?.urduTitle || 'دعوتِ ولیمہ'}
                </p>

                <div className="mt-3.5 space-y-1.5 text-xs sm:text-sm font-serif text-[#2c2724]">
                  <p className="font-semibold text-[#541223] text-sm sm:text-base">
                    {validEvents[1]?.day} {validEvents[1]?.date ? `• ${validEvents[1]?.date}` : '• To Be Announced'}
                  </p>
                  <p className="text-[#5c4033] italic font-semibold">
                    {validEvents[1]?.timeDescription}
                  </p>
                  <p className="text-[#3d3835] text-xs pt-1 flex items-start gap-1 font-medium">
                    <span>📍</span>
                    <span>{validEvents[1]?.location || 'Malegaon'}</span>
                  </p>
                </div>

                <p className="mt-4 text-xs font-serif text-[#383330] leading-relaxed border-t border-[#c59b27]/30 pt-3">
                  {validEvents[1]?.description}
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
