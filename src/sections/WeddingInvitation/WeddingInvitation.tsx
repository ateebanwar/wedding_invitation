import React from 'react';
import { WeddingContent } from '../../types/wedding';
import { SectionDivider } from '../../components/SectionDivider/SectionDivider';

interface WeddingInvitationProps {
  content: WeddingContent;
}

export const WeddingInvitation: React.FC<WeddingInvitationProps> = ({ content }) => {
  const { invocation, couple, wedding, venue, family, sections } = content;

  return (
    <section
      id="invitation-card-section"
      className="relative w-full min-h-screen py-20 px-4 flex items-center justify-center bg-parchment overflow-hidden"
    >
      {/* Background radial ambient warmth */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#f5efe6]/40 to-[#ede2d1]/60 pointer-events-none" />

      {/* ================= 1. TRANSPARENT GLASS-LIKE OUTER LAYER ================= */}
      <div className="relative w-full max-w-[500px] rounded-t-[150px] rounded-b-[36px] card-glass-outer p-3.5 sm:p-4.5 select-none shadow-2xl overflow-hidden">
        
        {/* Specular Gloss Reflection Beam across the glass surface */}
        <div className="absolute top-0 left-0 right-0 h-48 rounded-t-[146px] glass-reflection-overlay pointer-events-none opacity-70 z-20" />

        {/* Outer glass highlight rim for layered depth */}
        <div className="absolute inset-2 rounded-t-[140px] rounded-b-[28px] border border-white/70 pointer-events-none z-20" />

        {/* ================= 2. REALISTIC PAPER SHEET INSIDE GLASS LAYER ================= */}
        <div className="relative z-10 w-full rounded-t-[136px] rounded-b-[24px] card-paper-inner p-6 sm:p-10 text-center shadow-lg border border-[#c59b27]/35 overflow-hidden bg-[#fdfbf7]/95">
          
          {/* Inner Ornate Double Border on the Paper */}
          <div className="absolute inset-2 border border-[#c59b27]/25 rounded-t-[130px] rounded-b-xl pointer-events-none" />
          <div className="absolute inset-3 border border-[#dfba73]/15 rounded-t-[124px] rounded-b-lg pointer-events-none" />

          {/* Top Islamic Arch SVG Ornament */}
          <div className="w-full flex justify-center mb-3">
            <svg viewBox="0 0 160 36" className="w-36 h-9 text-[#c59b27]" fill="none">
              <path
                d="M10 32 C40 32, 60 16, 80 4 C100 16, 120 32, 150 32"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <circle cx="80" cy="4" r="3" fill="#c59b27" />
              <circle cx="80" cy="14" r="1.5" fill="#73162f" />
            </svg>
          </div>

          {/* 1. Invocation */}
          <div className="space-y-1 mb-5">
            <p className="font-arabic text-lg sm:text-xl text-[#73162f]" dir="rtl">
              {invocation?.arabic}
            </p>
            <p className="font-serif text-xs text-[#5c4033] tracking-wider leading-relaxed whitespace-pre-line italic">
              {invocation?.english}
            </p>
          </div>

          {/* 2. Main Title */}
          <div className="mb-5">
            <span className="inline-block px-4 py-1 rounded-full bg-[#73162f]/8 text-[#73162f] text-xs font-serif font-bold tracking-[0.25em] uppercase border border-[#c59b27]/30 shadow-xs">
              {sections?.invitation?.cardTitle || 'Wedding Invitation'}
            </span>
          </div>

          {/* 3. Groom Details */}
          <div className="space-y-1 my-3">
            <h2 className="font-calligraphy text-3xl sm:text-4xl text-[#73162f] font-bold drop-shadow-xs">
              {couple?.groom?.name}
            </h2>
            <p className="font-serif text-xs sm:text-sm text-[#423d3a] tracking-wider">
              {couple?.groom?.relation} <span className="font-semibold text-[#541223]">{couple?.groom?.parentName}</span>
            </p>
          </div>

          {/* Connector: ----------- o weds o ----------- */}
          <div className="flex items-center justify-center gap-2 my-4 text-[#c59b27]">
            <span className="w-12 h-[1px] bg-[#c59b27]/60" />
            <span className="text-xs">o</span>
            <span className="font-serif italic text-xs tracking-widest text-[#73162f] font-medium px-2">
              {couple?.connector?.english || 'weds'}
            </span>
            <span className="text-xs">o</span>
            <span className="w-12 h-[1px] bg-[#c59b27]/60" />
          </div>

          {/* 4. Bride Details */}
          <div className="space-y-1 my-3">
            <h2 className="font-calligraphy text-3xl sm:text-4xl text-[#73162f] font-bold drop-shadow-xs">
              {couple?.bride?.name}
            </h2>
            <p className="font-serif text-xs sm:text-sm text-[#423d3a] tracking-wider">
              {couple?.bride?.relation} <span className="font-semibold text-[#541223]">{couple?.bride?.parentName}</span>
            </p>
          </div>

          <SectionDivider className="my-5" />

          {/* 5. Nikah Insha Allah */}
          <div className="space-y-1.5 mb-6">
            <h3 className="text-sm font-serif font-bold tracking-[0.2em] text-[#73162f] uppercase">
              {sections?.invitation?.nikahHeading || '❖ Nikah Insha Allah ❖'}
            </h3>
            <p className="font-serif text-sm sm:text-base text-[#2c2724] font-medium">
              On {wedding?.day} <span className="font-bold text-[#73162f] text-lg">21</span>st November 2026
            </p>
            <p className="font-serif text-xs sm:text-sm text-[#5c4033] italic font-semibold">
              {wedding?.timeDescription}
            </p>
          </div>

          {/* 6. Venue */}
          <div className="space-y-1 mb-6 py-3 px-4 rounded-xl bg-[#faf5ec]/80 border border-[#c59b27]/30 shadow-xs">
            <p className="font-serif text-xs uppercase tracking-widest text-[#c59b27] font-semibold">
              At Venue
            </p>
            <p className="font-serif text-base text-[#73162f] font-bold">
              {venue?.name}
            </p>
            <p className="font-serif text-xs sm:text-sm text-[#423d3a]">
              {venue?.area}
            </p>
          </div>

          {/* 7. Invite Group */}
          <div className="space-y-1 my-5 pt-2">
            <h4 className="text-xs font-serif font-bold tracking-widest text-[#73162f] uppercase">
              {family?.inviteHeader || '❖ Invite ❖'}
            </h4>
            <p className="font-serif text-sm font-bold text-[#2c2724] tracking-wide">
              {family?.invitePerson}
            </p>
            <p className="font-serif text-xs text-[#5c4033] italic">
              {family?.inviteRelation}
            </p>
          </div>

          {/* 8. Residence Group */}
          <div className="space-y-1 my-5 pt-2">
            <h4 className="text-xs font-serif font-bold tracking-widest text-[#73162f] uppercase">
              {family?.residenceHeader || '❖ Residence ❖'}
            </h4>
            <p className="font-serif text-xs sm:text-sm text-[#423d3a] whitespace-pre-line leading-relaxed">
              {family?.residenceAddress}
            </p>
          </div>

          {/* Bottom Ornamental Corner Flourishes */}
          <div className="w-12 h-12 mx-auto mt-4 text-[#c59b27]/40 flex items-center justify-center">
            <svg viewBox="0 0 40 40" className="w-full h-full" fill="none" stroke="currentColor">
              <path d="M20 5 L20 35 M5 20 L35 20" strokeWidth="0.8" />
              <circle cx="20" cy="20" r="10" strokeWidth="0.8" />
              <circle cx="20" cy="20" r="3" fill="#c59b27" />
            </svg>
          </div>

        </div>
      </div>
    </section>
  );
};
