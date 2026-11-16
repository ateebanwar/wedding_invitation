import React from 'react';
import { WeddingContent } from '../../types/wedding';
import { SectionDivider } from '../../components/SectionDivider/SectionDivider';
import { Sparkles } from 'lucide-react';

interface ClosingScreenProps {
  content: WeddingContent;
  onBackToTop?: () => void;
}

export const ClosingScreen: React.FC<ClosingScreenProps> = ({ content, onBackToTop }) => {
  const { sections, couple } = content;
  const closingConfig = sections?.closing || {
    heading: 'INSHALLAH',
    arabicGreeting: 'إِنْ شَاءَ ٱللَّٰهُ',
    message:
      "May Allah Subhanah-u-Wa-Ta'ala bless this sacred union with boundless peace, eternal love, affection, and barakah. Your prayers and gracious presence will add immense joy to our special occasion.",
    urduMessage:
      'اللہ تعالیٰ اس نئے بابِ حیات کو خیر و برکت، محبت اور باہمی الفت کا گہوارہ بنائے۔ آپ سب کی تشریف آوری ہمارے لیے باعثِ مسرت و عزت ہوگی۔',
    salutation: 'Warmly awaiting your presence',
    coupleSign: 'Shahid Anwar & Nasreen Parween',
    duas: "Barakallahu laka wa baraka 'alayka wa jama'a baynakuma fee khayr",
  };

  return (
    <section
      id="closing-screen-section"
      className="relative w-full min-h-[600px] py-20 sm:py-24 px-3 xs:px-4 flex flex-col items-center justify-center bg-parchment select-none text-center overflow-hidden"
    >
      {/* Decorative Islamic Arch Rosette at top */}
      <div className="w-full flex justify-center mb-6">
        <svg viewBox="0 0 160 40" className="w-40 h-10 text-[#c59b27]" fill="none">
          <path
            d="M10 36 C40 36, 60 18, 80 4 C100 18, 120 36, 150 36"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <circle cx="80" cy="4" r="3" fill="#c59b27" />
          <circle cx="80" cy="16" r="1.5" fill="#73162f" />
        </svg>
      </div>

      {/* Main Glass-Bordered Closing Card with Layered Glass Over Paper */}
      <div className="relative z-10 w-full max-w-xl mx-auto rounded-[32px] card-glass-outer p-2.5 xs:p-3 sm:p-4.5 select-none shadow-2xl overflow-hidden">
        {/* Top Specular Glare Reflection Beam across glass surface */}
        <div className="absolute top-0 left-0 right-0 h-44 rounded-t-[28px] glass-reflection-overlay pointer-events-none opacity-70 z-20" />
        {/* Outer Glass Bevel Rim */}
        <div className="absolute inset-1.5 xs:inset-2 rounded-[26px] border border-white/70 pointer-events-none z-20" />

        {/* Inner Floating Luxury Paper Sheet */}
        <div className="relative z-10 w-full rounded-[24px] card-paper-inner p-5 xs:p-6 sm:p-10 shadow-lg border border-[#c59b27]/35 bg-[#fdfbf7]/95 overflow-hidden space-y-5 sm:space-y-6">
          {/* Inner hairline frame */}
          <div className="absolute inset-1.5 border border-[#c59b27]/20 rounded-[20px] pointer-events-none" />

          {/* Arabic Inshallah Calligraphy */}
          <div className="space-y-1">
            <p className="font-arabic text-2xl xs:text-3xl sm:text-4xl text-[#73162f] font-bold tracking-wide" dir="rtl">
              {closingConfig.arabicGreeting}
            </p>
            <h2 className="font-serif text-lg xs:text-xl sm:text-2xl font-bold tracking-[0.25em] text-[#c59b27] uppercase">
              {closingConfig.heading}
            </h2>
          </div>

          <SectionDivider className="my-3 sm:my-4" />

          {/* English Warm Closing Message */}
          <p className="font-serif text-xs xs:text-sm sm:text-base text-[#423d3a] leading-relaxed max-w-md mx-auto italic">
            "{closingConfig.message}"
          </p>

          {/* Urdu Closing Message */}
          <p className="font-urdu text-xs xs:text-sm sm:text-base text-[#73162f] leading-loose max-w-md mx-auto" dir="rtl">
            {closingConfig.urduMessage}
          </p>

          {/* Traditional Islamic Wedding Dua */}
          {closingConfig.duas && (
            <div className="py-2.5 px-4 sm:py-3 sm:px-5 rounded-xl bg-[#fdfcf9] border border-[#c59b27]/30 max-w-md mx-auto shadow-xs">
              <p className="font-arabic text-xs xs:text-sm text-[#73162f] leading-relaxed" dir="rtl">
                بَارَكَ اللَّهُ لَكَ وَبَارَكَ عَلَيْكَ وَجَمَعَ بَيْنَكُمَا فِي خَيْرٍ
              </p>
              <p className="font-serif text-[10px] xs:text-[11px] text-[#655e5a] tracking-wider italic mt-1">
                "{closingConfig.duas}"
              </p>
            </div>
          )}

          {/* Couple Signature & Salutation */}
          <div className="pt-4 sm:pt-6 space-y-2">
            <p className="font-serif text-[10px] xs:text-xs uppercase tracking-[0.2em] text-[#c59b27] font-semibold">
              {closingConfig.salutation}
            </p>
            <h3 className="font-calligraphy text-2xl xs:text-2xl sm:text-3xl text-[#73162f] font-bold">
              {closingConfig.coupleSign || `${couple?.groom?.name} & ${couple?.bride?.name}`}
            </h3>
          </div>

          {/* Back to top or subtle celebration mark */}
          {onBackToTop && (
            <div className="pt-6 sm:pt-8">
              <button
                onClick={onBackToTop}
                className="inline-flex items-center gap-1.5 px-5 py-2 rounded-full border border-[#c59b27]/40 bg-[#fdfbf7] hover:bg-[#73162f] text-[#73162f] hover:text-[#fdfbf7] text-xs font-serif tracking-widest uppercase transition-all duration-300 shadow-xs cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Back to Top</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Footer copyright / subtle signature */}
      <div className="relative z-10 mt-12 sm:mt-16 text-[10px] xs:text-[11px] font-serif tracking-widest text-[#655e5a]/80 uppercase">
        Shahid Anwar &amp; Nasreen Parween • Nikah 2026
      </div>
    </section>
  );
};
