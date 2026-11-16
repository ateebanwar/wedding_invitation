import React from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';

interface MusicControllerProps {
  isPlaying: boolean;
  isMuted: boolean;
  togglePlay: () => void;
  toggleMute: () => void;
  hasStarted: boolean;
}

export const MusicController: React.FC<MusicControllerProps> = ({
  isPlaying,
  isMuted,
  togglePlay,
  toggleMute,
}) => {
  return (
    <div className="fixed top-4 right-4 sm:top-6 sm:right-6 z-50 flex items-center gap-2 bg-[#fffdfa]/85 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-[#dfba73]/40 shadow-[0_6px_20px_rgba(84,18,35,0.07),inset_0_1px_1px_rgba(255,255,255,0.95),inset_0_-1px_2px_rgba(223,186,115,0.3)] transition-all duration-300 hover:shadow-md">
      {/* Play/Pause Button with Music Note & Animated 4-Bar Equalizer */}
      <button
        onClick={togglePlay}
        aria-label={isPlaying ? 'Pause wedding music' : 'Play wedding music'}
        className="flex items-center gap-2 text-[#73162f] focus:outline-none group select-none cursor-pointer"
      >
        {/* Soft Burgundy Rounded Icon Badge matching reference image */}
        <div className="w-5 h-5 rounded-full bg-[#73162f]/10 group-hover:bg-[#73162f]/20 flex items-center justify-center transition-colors">
          <Music className={`w-3 h-3 text-[#73162f] ${isPlaying ? 'animate-pulse' : 'opacity-85'}`} />
        </div>

        {/* 4 Animated Golden Equalizer Bars */}
        <div className="flex items-end gap-[2px] h-3.5 w-4 overflow-hidden">
          <span
            className={`w-[2px] bg-[#dfba73] rounded-full transition-all duration-300 ${
              isPlaying ? 'h-3 animate-bounce' : 'h-1.5'
            }`}
            style={{ animationDelay: '0ms' }}
          />
          <span
            className={`w-[2px] bg-[#941e3d] rounded-full transition-all duration-300 ${
              isPlaying ? 'h-3.5 animate-bounce' : 'h-2.5'
            }`}
            style={{ animationDelay: '150ms' }}
          />
          <span
            className={`w-[2px] bg-[#c59b27] rounded-full transition-all duration-300 ${
              isPlaying ? 'h-2 animate-bounce' : 'h-1'
            }`}
            style={{ animationDelay: '300ms' }}
          />
          <span
            className={`w-[2px] bg-[#dfba73] rounded-full transition-all duration-300 ${
              isPlaying ? 'h-3 animate-bounce' : 'h-2'
            }`}
            style={{ animationDelay: '450ms' }}
          />
        </div>

        {/* Label: MUSIC ON / MUSIC OFF */}
        <span className="text-[11px] font-serif font-bold tracking-wider text-[#541223] uppercase">
          {isPlaying ? 'MUSIC ON' : 'MUSIC OFF'}
        </span>
      </button>

      {/* Thin Vertical Divider */}
      <div className="h-3.5 w-[1px] bg-[#c59b27]/40 mx-0.5" />

      {/* Speaker Mute/Unmute Toggle */}
      <button
        onClick={toggleMute}
        aria-label={isMuted ? 'Unmute music' : 'Mute music'}
        className="text-[#73162f]/80 hover:text-[#73162f] p-0.5 rounded-full transition-colors focus:outline-none cursor-pointer"
      >
        {isMuted || !isPlaying ? (
          <VolumeX className="w-3.5 h-3.5 text-[#8c7467]" />
        ) : (
          <Volume2 className="w-3.5 h-3.5 text-[#73162f]" />
        )}
      </button>
    </div>
  );
};
