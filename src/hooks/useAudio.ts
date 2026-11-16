import { useState, useEffect, useRef, useCallback } from 'react';

interface UseAudioReturn {
  isPlaying: boolean;
  isMuted: boolean;
  togglePlay: () => void;
  toggleMute: () => void;
  startAudio: () => Promise<void>;
  hasStarted: boolean;
}

export function useAudio(audioSrc?: string): UseAudioReturn {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [hasStarted, setHasStarted] = useState<boolean>(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const synthNodesRef = useRef<{
    ctx: AudioContext;
    masterGain: GainNode;
    oscillators: OscillatorNode[];
  } | null>(null);

  // Setup HTML audio element if audioSrc is provided
  useEffect(() => {
    if (!audioSrc) return;

    const audio = new Audio();
    audio.src = audioSrc;
    audio.loop = true;
    audio.preload = 'auto';
    audioRef.current = audio;

    const handleEnded = () => setIsPlaying(false);
    const handlePause = () => setIsPlaying(false);
    const handlePlay = () => setIsPlaying(true);

    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('play', handlePlay);

    return () => {
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('play', handlePlay);
      audio.pause();
      audio.src = '';
      audioRef.current = null;
    };
  }, [audioSrc]);

  // Start synthesized spiritual ambient melody / drone if audio file fails or isn't available
  const startHarmonicSynth = useCallback(() => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;

      const ctx = new AudioCtx();
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.001, ctx.currentTime);
      masterGain.gain.exponentialRampToValueAtTime(0.08, ctx.currentTime + 3);
      masterGain.connect(ctx.destination);

      // Warm eastern modal chords: D, A, D, F#, A (Maqam Rast / Bayati warm undertones)
      const freqs = [146.83, 220.0, 293.66, 370.0, 440.0];
      const oscillators: OscillatorNode[] = [];

      freqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const panner = ctx.createStereoPanner ? ctx.createStereoPanner() : null;
        const oscGain = ctx.createGain();

        osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        // Gentle vibrato / tremolo
        const lfo = ctx.createOscillator();
        const lfoGain = ctx.createGain();
        lfo.frequency.value = 0.2 + idx * 0.1;
        lfoGain.gain.value = 1.2;
        lfo.connect(osc.frequency);
        lfo.start();

        oscGain.gain.value = 0.2 / (idx + 1);

        if (panner) {
          panner.pan.value = (idx - 2) * 0.3;
          osc.connect(oscGain);
          oscGain.connect(panner);
          panner.connect(masterGain);
        } else {
          osc.connect(oscGain);
          oscGain.connect(masterGain);
        }

        osc.start();
        oscillators.push(osc);
      });

      synthNodesRef.current = { ctx, masterGain, oscillators };
    } catch (e) {
      console.warn('Web Audio Ambient Synthesizer not permitted or unavailable:', e);
    }
  }, []);

  const startAudio = useCallback(async () => {
    setHasStarted(true);
    if (audioRef.current && audioSrc) {
      try {
        await audioRef.current.play();
        setIsPlaying(true);
      } catch (err) {
        console.info('Audio file playback prevented or not found, initializing harmonic ambient soundscape:', err);
        startHarmonicSynth();
        setIsPlaying(true);
      }
    } else {
      startHarmonicSynth();
      setIsPlaying(true);
    }
  }, [audioSrc, startHarmonicSynth]);

  const togglePlay = useCallback(() => {
    if (!hasStarted) {
      startAudio();
      return;
    }

    if (isPlaying) {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      if (synthNodesRef.current) {
        synthNodesRef.current.masterGain.gain.setTargetAtTime(0.0001, synthNodesRef.current.ctx.currentTime, 0.2);
      }
      setIsPlaying(false);
    } else {
      if (audioRef.current) {
        audioRef.current.play().catch(() => {
          if (synthNodesRef.current) {
            synthNodesRef.current.masterGain.gain.setTargetAtTime(0.08, synthNodesRef.current.ctx.currentTime, 0.5);
          }
        });
      } else if (synthNodesRef.current) {
        if (synthNodesRef.current.ctx.state === 'suspended') {
          synthNodesRef.current.ctx.resume();
        }
        synthNodesRef.current.masterGain.gain.setTargetAtTime(0.08, synthNodesRef.current.ctx.currentTime, 0.5);
      } else {
        startHarmonicSynth();
      }
      setIsPlaying(true);
    }
  }, [hasStarted, isPlaying, startAudio, startHarmonicSynth]);

  const toggleMute = useCallback(() => {
    setIsMuted(prev => {
      const next = !prev;
      if (audioRef.current) {
        audioRef.current.muted = next;
      }
      if (synthNodesRef.current) {
        synthNodesRef.current.masterGain.gain.setTargetAtTime(
          next ? 0.0001 : 0.08,
          synthNodesRef.current.ctx.currentTime,
          0.1
        );
      }
      return next;
    });
  }, []);

  return {
    isPlaying,
    isMuted,
    togglePlay,
    toggleMute,
    startAudio,
    hasStarted,
  };
}
