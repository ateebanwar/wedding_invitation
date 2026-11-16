import React from 'react';
import { WeddingContent } from '../../types/wedding';
import { SectionDivider } from '../../components/SectionDivider/SectionDivider';
import { Heart, Sparkles } from 'lucide-react';

interface OurFamilyProps {
  content: WeddingContent;
}

export const OurFamily: React.FC<OurFamilyProps> = ({ content }) => {
  const { family, sections } = content;
  const familyConfig = sections?.familySection || {
    heading: 'WITH LOVE & BLESSINGS',
    title: 'Our Family',
    subtitle: 'Warmly welcoming you to celebrate with us',
    blessingsFromLabel: 'WITH THE BLESSINGS OF',
    withLoveLabel: 'WITH LOVE',
  };

  return (
    <section
      id="our-family-section"
      className="relative w-full min-h-[500px] py-20 px-4 flex flex-col items-center justify-center bg-parchment select-none text-center"
    >
      {/* Headings */}
      <div className="space-y-2 mb-10 max-w-lg mx-auto">
        <span className="text-xs font-serif tracking-[0.35em] text-[#c59b27] uppercase font-bold">
          {familyConfig.heading}
        </span>
        <h2 className="font-calligraphy text-3xl sm:text-5xl text-[#73162f] font-bold">
          {familyConfig.title}
        </h2>
        <SectionDivider className="my-2" />
        <p className="font-serif text-xs sm:text-sm text-[#5c4033] tracking-wider italic">
          {familyConfig.subtitle}
        </p>
      </div>

      {/* Glass-Bordered Family Panel with Prominent 5px Glass Border */}
      <div className="relative w-full max-w-[480px] p-8 sm:p-10 rounded-[32px] glass-card-border shadow-2xl overflow-hidden">
        {/* Top Specular Glare Reflection Beam */}
        <div className="absolute top-0 left-0 right-0 h-44 rounded-t-[28px] glass-reflection-overlay pointer-events-none opacity-70 z-20" />
        {/* Inner Hairline Highlight Rim */}
        <div className="absolute inset-2 rounded-[26px] border border-white/70 pointer-events-none z-20" />
        {/* Inner Corner Accent Squares */}
        <div className="absolute top-2 left-2 w-3 h-3 border-t border-l border-[#c59b27]" />
        <div className="absolute top-2 right-2 w-3 h-3 border-t border-r border-[#c59b27]" />
        <div className="absolute bottom-2 left-2 w-3 h-3 border-b border-l border-[#c59b27]" />
        <div className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-[#c59b27]" />

        {/* Decorative Watermark Rosette */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03]">
          <svg viewBox="0 0 100 100" className="w-64 h-64 text-[#73162f]" fill="currentColor">
            <circle cx="50" cy="50" r="45" />
          </svg>
        </div>

        {/* 1. With the Blessings Of */}
        <div className="space-y-2 mb-8">
          <div className="flex items-center justify-center gap-1.5 text-[#c59b27]">
            <Sparkles className="w-3.5 h-3.5" />
            <span className="text-[11px] font-serif font-bold tracking-[0.25em] text-[#c59b27] uppercase">
              {familyConfig.blessingsFromLabel}
            </span>
            <Sparkles className="w-3.5 h-3.5" />
          </div>

          <h3 className="font-serif text-xl sm:text-2xl text-[#73162f] font-bold tracking-wide">
            {family?.invitePerson}
          </h3>
          <p className="font-urdu text-sm text-[#c59b27]" dir="rtl">
            {family?.urduInvitePerson}
          </p>
        </div>

        {/* Delicate divider */}
        <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[#c59b27]/50 to-transparent mx-auto my-6" />

        {/* 2. With Love */}
        <div className="space-y-2">
          <div className="flex items-center justify-center gap-1.5 text-[#73162f]">
            <Heart className="w-3.5 h-3.5 text-[#73162f]" />
            <span className="text-[11px] font-serif font-bold tracking-[0.25em] text-[#73162f] uppercase">
              {familyConfig.withLoveLabel}
            </span>
            <Heart className="w-3.5 h-3.5 text-[#73162f]" />
          </div>

          <p className="font-serif text-lg sm:text-xl text-[#2c2724] font-medium tracking-wide">
            {family?.inviteRelation}
          </p>
          <p className="font-urdu text-sm text-[#5c4033]" dir="rtl">
            {family?.urduInviteRelation}
          </p>
        </div>

        {/* Residence Address Note */}
        <div className="mt-8 pt-6 border-t border-[#c59b27]/20">
          <span className="text-[10px] font-serif uppercase tracking-widest text-[#c59b27] font-semibold block mb-1">
            Residence
          </span>
          <p className="font-serif text-xs text-[#5c4033] leading-relaxed whitespace-pre-line">
            {family?.residenceAddress}
          </p>
        </div>

      </div>
    </section>
  );
};
