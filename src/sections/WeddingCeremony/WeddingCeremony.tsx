import React, { useState } from 'react';
import { WeddingContent } from '../../types/wedding';
import { SectionDivider } from '../../components/SectionDivider/SectionDivider';
import { PrimaryButton } from '../../components/PrimaryButton/PrimaryButton';
import { copyToClipboard } from '../../services/clipboardService';
import { openMapLocation } from '../../services/mapsService';
import { MapPin, Copy, Check } from 'lucide-react';

interface WeddingCeremonyProps {
  content: WeddingContent;
}

export const WeddingCeremony: React.FC<WeddingCeremonyProps> = ({ content }) => {
  const { invocation, couple, wedding, venue, family, sections } = content;
  const ceremonyConfig = sections?.ceremony || {
    heading: 'THE SACRED VOWS',
    title: 'The Wedding Ceremony',
    subtitle: 'With divine blessings and the love of our families, we unite in sacred vows.',
    englishTabLabel: 'English',
    urduTabLabel: 'اردو',
    copyAddressLabel: 'COPY ADDRESS',
    openMapsLabel: 'OPEN IN MAPS',
    copiedToast: 'Address copied to clipboard!',
  };

  const [activeLang, setActiveLang] = useState<'en' | 'ur'>('en');
  const [copied, setCopied] = useState<boolean>(false);

  const isUrdu = activeLang === 'ur';

  const handleCopyAddress = async () => {
    const textToCopy = isUrdu ? venue?.urduFullAddress : venue?.fullAddress;
    const success = await copyToClipboard(textToCopy);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleOpenMaps = () => {
    openMapLocation({
      latitude: venue?.latitude,
      longitude: venue?.longitude,
      googleMapsUrl: venue?.googleMapsUrl,
      address: venue?.fullAddress,
    });
  };

  return (
    <section
      id="wedding-ceremony-section"
      className="relative w-full min-h-screen py-24 px-4 flex flex-col items-center justify-center bg-parchment select-none"
    >
      {/* Section Introduction */}
      <div className="text-center space-y-2 mb-8 max-w-lg mx-auto">
        <span className="text-xs font-serif tracking-[0.35em] text-[#c59b27] uppercase font-bold">
          {ceremonyConfig.heading}
        </span>
        <h2 className="font-calligraphy text-3xl sm:text-5xl text-[#73162f] font-bold">
          {ceremonyConfig.title}
        </h2>
        <SectionDivider className="my-2" />
        <p className="font-serif text-xs sm:text-sm text-[#5c4033] tracking-wider italic max-w-md mx-auto">
          {ceremonyConfig.subtitle}
        </p>

        {/* Elegant Language Switcher Pill */}
        <div className="inline-flex items-center gap-1.5 p-1 rounded-full bg-[#fdfcf9] border border-[#c59b27]/40 shadow-sm mt-4">
          <button
            onClick={() => setActiveLang('en')}
            className={`px-4 py-1.5 rounded-full text-xs font-serif font-semibold tracking-wider transition-all duration-300 ${
              !isUrdu
                ? 'bg-[#73162f] text-[#fbf8f2] shadow-sm'
                : 'text-[#73162f] hover:bg-[#73162f]/10'
            }`}
          >
            {ceremonyConfig.englishTabLabel}
          </button>
          <button
            onClick={() => setActiveLang('ur')}
            className={`px-4 py-1.5 rounded-full text-sm font-urdu font-semibold transition-all duration-300 ${
              isUrdu
                ? 'bg-[#73162f] text-[#fbf8f2] shadow-sm'
                : 'text-[#73162f] hover:bg-[#73162f]/10'
            }`}
          >
            {ceremonyConfig.urduTabLabel}
          </button>
        </div>
      </div>

      {/* Main Arched Invitation Ceremony Card with Layered Glass Over Paper */}
      <div className="relative w-full max-w-[510px] mx-auto rounded-t-[150px] rounded-b-[36px] card-glass-outer p-2.5 xs:p-3 sm:p-4.5 select-none shadow-2xl overflow-hidden">
        {/* Top Specular Glare Reflection Beam across Arch */}
        <div className="absolute top-0 left-0 right-0 h-48 rounded-t-[146px] glass-reflection-overlay pointer-events-none opacity-70 z-20" />
        {/* Outer Glass Bevel Rim */}
        <div className="absolute inset-1.5 xs:inset-2 rounded-t-[142px] rounded-b-[28px] border border-white/70 pointer-events-none z-20" />

        {/* Inner Floating Luxury Paper Sheet */}
        <div
          className={`relative z-10 w-full rounded-t-[136px] rounded-b-[24px] card-paper-inner p-5 sm:p-9 shadow-lg border border-[#c59b27]/35 overflow-hidden bg-[#fdfbf7]/95 transition-all duration-300 ${
            isUrdu ? 'text-right urdu-text' : 'text-center'
          }`}
          dir={isUrdu ? 'rtl' : 'ltr'}
        >
          {/* Ornate Double Inner Arch Border */}
          <div className="absolute inset-2 border border-[#c59b27]/30 rounded-t-[130px] rounded-b-xl pointer-events-none" />
          <div className="absolute inset-3 border border-[#dfba73]/15 rounded-t-[124px] rounded-b-lg pointer-events-none" />

          {/* Top Arch Center Rosette */}
          <div className="w-full flex justify-center mb-4">
            <svg viewBox="0 0 160 36" className="w-36 h-9 text-[#c59b27]" fill="none">
              <path
                d="M10 32 C40 32, 60 16, 80 4 C100 16, 120 32, 150 32"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <circle cx="80" cy="4" r="3" fill="#c59b27" />
            </svg>
          </div>

          {/* 1. Invocation */}
          <div className="mb-6 space-y-1 text-center">
            <p className="font-arabic text-lg sm:text-xl text-[#73162f] leading-loose" dir="rtl">
              {invocation?.arabic}
            </p>
            <p className={`text-xs text-[#5c4033] tracking-wide leading-relaxed ${isUrdu ? 'font-urdu text-sm' : 'font-serif italic'}`}>
              {isUrdu ? invocation?.urdu : invocation?.english}
            </p>
          </div>

          {/* 2. Invitation Title */}
          <div className="text-center mb-6">
            <span className="inline-block px-4 py-1 rounded-full bg-[#73162f]/8 text-[#73162f] text-xs font-serif font-bold tracking-[0.2em] uppercase border border-[#c59b27]/30">
              {isUrdu ? 'دعوتِ تقریبِ نکاح' : 'Wedding Invitation'}
            </span>
          </div>

        {/* 3. Groom Details */}
        <div className="space-y-1 my-3 text-center">
          <h3 className={`text-3xl sm:text-4xl text-[#73162f] font-bold ${isUrdu ? 'font-urdu py-1' : 'font-calligraphy'}`}>
            {isUrdu ? couple?.groom?.urduName : couple?.groom?.name}
          </h3>
          <p className={`text-xs sm:text-sm text-[#423d3a] ${isUrdu ? 'font-urdu' : 'font-serif'}`}>
            {isUrdu ? couple?.groom?.urduRelation : couple?.groom?.relation}{' '}
            <span className="font-semibold text-[#541223]">
              {isUrdu ? couple?.groom?.urduParentName : couple?.groom?.parentName}
            </span>
          </p>
        </div>

        {/* Connector */}
        <div className="flex items-center justify-center gap-2 my-4 text-[#c59b27]">
          <span className="w-12 h-[1px] bg-[#c59b27]/60" />
          <span className={`text-xs sm:text-sm text-[#73162f] font-medium px-2 ${isUrdu ? 'font-urdu' : 'font-serif italic'}`}>
            {isUrdu ? couple?.connector?.urdu : `o ${couple?.connector?.english} o`}
          </span>
          <span className="w-12 h-[1px] bg-[#c59b27]/60" />
        </div>

        {/* 4. Bride Details */}
        <div className="space-y-1 my-3 text-center">
          <h3 className={`text-3xl sm:text-4xl text-[#73162f] font-bold ${isUrdu ? 'font-urdu py-1' : 'font-calligraphy'}`}>
            {isUrdu ? couple?.bride?.urduName : couple?.bride?.name}
          </h3>
          <p className={`text-xs sm:text-sm text-[#423d3a] ${isUrdu ? 'font-urdu' : 'font-serif'}`}>
            {isUrdu ? couple?.bride?.urduRelation : couple?.bride?.relation}{' '}
            <span className="font-semibold text-[#541223]">
              {isUrdu ? couple?.bride?.urduParentName : couple?.bride?.parentName}
            </span>
          </p>
        </div>

        <SectionDivider className="my-5" />

        {/* 5. Nikah Heading & Date */}
        <div className="space-y-2 mb-6 text-center">
          <h4 className={`text-sm font-bold tracking-[0.2em] text-[#73162f] uppercase ${isUrdu ? 'font-urdu text-base' : 'font-serif'}`}>
            {isUrdu ? sections?.invitation?.urduNikahHeading : sections?.invitation?.nikahHeading}
          </h4>
          <p className={`text-sm sm:text-base text-[#2c2724] font-medium ${isUrdu ? 'font-urdu' : 'font-serif'}`}>
            {isUrdu ? (
              <>بروز ہفتہ <span className="font-bold text-[#73162f] text-lg">21</span> نومبر 2026ء</>
            ) : (
              <>On {wedding?.day} <span className="font-bold text-[#73162f] text-lg">21</span>st November 2026</>
            )}
          </p>
          <p className={`text-xs sm:text-sm text-[#5c4033] font-semibold italic ${isUrdu ? 'font-urdu text-sm' : 'font-serif'}`}>
            {isUrdu ? wedding?.urduTimeDescription : wedding?.timeDescription}
          </p>
        </div>

        {/* 6. Venue Details */}
        <div className="space-y-1 mb-6 py-3 px-4 rounded-xl bg-[#faf7f2] border border-[#c59b27]/25 shadow-xs text-center">
          <p className={`text-xs uppercase tracking-widest text-[#c59b27] font-semibold ${isUrdu ? 'font-urdu' : 'font-serif'}`}>
            {isUrdu ? 'بمقام:' : 'At Venue:'}
          </p>
          <p className={`text-base text-[#73162f] font-bold ${isUrdu ? 'font-urdu text-lg' : 'font-serif'}`}>
            {isUrdu ? venue?.urduName : venue?.name}
          </p>
          <p className={`text-xs sm:text-sm text-[#423d3a] ${isUrdu ? 'font-urdu' : 'font-serif'}`}>
            {isUrdu ? venue?.urduArea : venue?.area}
          </p>
        </div>

        {/* 7. Invite and Residence Snippets */}
        <div className="space-y-4 my-4 pt-2 border-t border-[#c59b27]/20 text-center">
          <div>
            <span className={`text-xs font-bold text-[#73162f] tracking-wider block ${isUrdu ? 'font-urdu' : 'font-serif uppercase'}`}>
              {isUrdu ? family?.urduInviteHeader : family?.inviteHeader}
            </span>
            <p className={`text-sm font-bold text-[#2c2724] mt-0.5 ${isUrdu ? 'font-urdu' : 'font-serif'}`}>
              {isUrdu ? family?.urduInvitePerson : family?.invitePerson}
            </p>
            <p className={`text-xs text-[#5c4033] italic ${isUrdu ? 'font-urdu text-sm' : 'font-serif'}`}>
              {isUrdu ? family?.urduInviteRelation : family?.inviteRelation}
            </p>
          </div>

          <div>
            <span className={`text-xs font-bold text-[#73162f] tracking-wider block ${isUrdu ? 'font-urdu' : 'font-serif uppercase'}`}>
              {isUrdu ? family?.urduResidenceHeader : family?.residenceHeader}
            </span>
            <p className={`text-xs sm:text-sm text-[#423d3a] mt-0.5 leading-relaxed whitespace-pre-line ${isUrdu ? 'font-urdu' : 'font-serif'}`}>
              {isUrdu ? family?.urduResidenceAddress : family?.residenceAddress}
            </p>
          </div>
        </div>

        {/* Action Buttons: COPY ADDRESS and OPEN IN MAPS */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-8 pt-4 border-t border-[#c59b27]/25">
          <PrimaryButton
            onClick={handleCopyAddress}
            variant="outline"
            icon={copied ? <Check className="w-4 h-4 text-green-700" /> : <Copy className="w-4 h-4 text-[#73162f]" />}
            className="w-full sm:w-auto"
          >
            {copied ? 'COPIED!' : ceremonyConfig.copyAddressLabel}
          </PrimaryButton>

          <PrimaryButton
            onClick={handleOpenMaps}
            variant="burgundy"
            icon={<MapPin className="w-4 h-4 text-[#dfba73]" />}
            className="w-full sm:w-auto"
          >
            {ceremonyConfig.openMapsLabel}
          </PrimaryButton>
        </div>

        {/* Toast confirmation message */}
        {copied && (
          <div className="mt-3 p-2 rounded-lg bg-green-50 border border-green-200 text-green-800 text-xs font-serif text-center animate-fade-in">
            {ceremonyConfig.copiedToast}
          </div>
        )}

        </div>
      </div>
    </section>
  );
};
