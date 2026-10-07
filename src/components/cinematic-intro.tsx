'use client';

import { useState, useRef, useEffect } from 'react';
import type { IntroState } from '@/types';

export interface CinematicIntroProps {
  onTransitioning?: () => void;
  onComplete?: () => void;
  onStateChange?: (state: IntroState) => void;
}

/**
 * CinematicIntro
 *
 * Exact 3-State Seamless Architecture:
 * 1. INTRO_PLAYING (0.0s – ~5.05s)
 *    - Fullscreen cinematic video playing with opacity 1, scale 1.
 *    - Home page already mounted underneath with opacity 0, scale 0.99.
 *    - Monitored at 60fps via requestAnimationFrame and native timeupdate.
 *
 * 2. INTRO_TRANSITIONING (~5.05s – ~5.95s)
 *    - Triggered at the exact screenshot moment (~1.15s before video ends or currentTime >= 5.05s).
 *    - Video CONTINUES PLAYING (never paused, never frozen, no hold, no zoom).
 *    - Video dissolves: opacity 1 -> 0 with subtle cinematic scale 1 -> 1.03 over 900ms.
 *    - Home page dissolves: opacity 0 -> 1 simultaneously over 900ms.
 *
 * 3. INTRO_COMPLETE (~5.95s)
 *    - Crossfade is 100% complete before the video file reaches its final frame.
 *    - Intro overlay is completely unmounted from the DOM.
 *    - Normal body scrolling restored; Home page is fully interactive.
 */
export default function CinematicIntro({
  onTransitioning,
  onComplete,
  onStateChange,
}: CinematicIntroProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [introState, setIntroState] = useState<IntroState>('INTRO_PLAYING');
  const [isUnmounted, setIsUnmounted] = useState<boolean>(false);

  const hasTriggeredRef = useRef<boolean>(false);
  const hasFinishedRef = useRef<boolean>(false);
  const completeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Store callbacks in refs so changing parent props NEVER cancel timers or effects
  const onTransitioningRef = useRef(onTransitioning);
  const onCompleteRef = useRef(onComplete);
  const onStateChangeRef = useRef(onStateChange);

  useEffect(() => {
    onTransitioningRef.current = onTransitioning;
    onCompleteRef.current = onComplete;
    onStateChangeRef.current = onStateChange;
  });

  // Finish and unmount cleanly - idempotent
  const finishIntro = () => {
    if (hasFinishedRef.current) return;
    hasFinishedRef.current = true;

    if (completeTimerRef.current) {
      clearTimeout(completeTimerRef.current);
      completeTimerRef.current = null;
    }

    setIntroState('INTRO_COMPLETE');
    onStateChangeRef.current?.('INTRO_COMPLETE');
    onCompleteRef.current?.();

    // Clean DOM removal
    setTimeout(() => {
      setIsUnmounted(true);
    }, 40);
  };

  // Start crossfade: Video dissolves 1 -> 0 while Home dissolves 0 -> 1 over 900ms
  const startTransition = () => {
    if (hasTriggeredRef.current || hasFinishedRef.current) return;
    hasTriggeredRef.current = true;

    setIntroState('INTRO_TRANSITIONING');
    onTransitioningRef.current?.();
    onStateChangeRef.current?.('INTRO_TRANSITIONING');

    // Exactly 900ms crossfade to complete unmount
    completeTimerRef.current = setTimeout(finishIntro, 900);
  };

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const video = videoRef.current;
    if (video) {
      video.defaultMuted = true;
      video.muted = true;
      video.volume = 0;
      video.playsInline = true;

      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // In case browser autoplay policy requires user interaction
          const startPlayback = () => {
            if (videoRef.current && !hasTriggeredRef.current) {
              videoRef.current.play().catch(() => {});
            }
            window.removeEventListener('pointerdown', startPlayback);
            window.removeEventListener('keydown', startPlayback);
            window.removeEventListener('touchstart', startPlayback);
          };

          window.addEventListener('pointerdown', startPlayback, { once: true });
          window.addEventListener('keydown', startPlayback, { once: true });
          window.addEventListener('touchstart', startPlayback, { once: true });
        });
      }
    }

    // 60fps frame monitor: trigger transition at the screenshot frame (~5.05s / 1.15s remaining)
    let rafId: number;
    const checkProgress = () => {
      const v = videoRef.current;
      if (v && v.duration && v.duration > 0 && v.currentTime > 0) {
        const remaining = v.duration - v.currentTime;
        const current = v.currentTime;

        if ((remaining <= 1.15 || current >= 5.05) && !hasTriggeredRef.current) {
          startTransition();
          return;
        }
      }

      if (!hasTriggeredRef.current) {
        rafId = requestAnimationFrame(checkProgress);
      }
    };

    rafId = requestAnimationFrame(checkProgress);

    // Fallback timer: Video is 6.20s; trigger transition at 5.05s
    const fallbackTimer = setTimeout(startTransition, 5050);

    // Hard failsafe timer: guarantee unmount by 6.5s no matter what
    const failsafeTimer = setTimeout(finishIntro, 6500);

    // Escape or Space to skip instantly
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === ' ') {
        finishIntro();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(fallbackTimer);
      clearTimeout(failsafeTimer);
      if (completeTimerRef.current) clearTimeout(completeTimerRef.current);
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty dependency array ensures timers are NEVER cancelled by parent re-renders

  // Native timeupdate listener for immediate reaction
  const handleTimeUpdate = () => {
    const v = videoRef.current;
    if (v && v.duration && v.duration > 0 && v.currentTime > 0) {
      if ((v.duration - v.currentTime <= 1.15 || v.currentTime >= 5.05) && !hasTriggeredRef.current) {
        startTransition();
      }
    }
  };

  // If video ends for any reason, finish immediately
  const handleEnded = () => {
    finishIntro();
  };

  // When CSS opacity reaches 0, unmount immediately
  const handleTransitionEnd = (e: React.TransitionEvent<HTMLDivElement>) => {
    if (e.propertyName === 'opacity') {
      finishIntro();
    }
  };

  const handleContainerClick = () => {
    if (videoRef.current && videoRef.current.paused && !hasTriggeredRef.current) {
      videoRef.current.play().catch(() => {});
    }
  };

  if (isUnmounted || introState === 'INTRO_COMPLETE') {
    return null;
  }

  const isTransitioning = introState === 'INTRO_TRANSITIONING';

  return (
    <div
      onClick={handleContainerClick}
      className={`fixed inset-0 w-screen h-screen h-[100dvh] z-[9999] overflow-hidden select-none bg-black ${
        isTransitioning ? 'pointer-events-none' : 'pointer-events-auto'
      }`}
      aria-hidden="true"
    >
      {/* Cinematic Dissolve Layer: Dissolves opacity 1 -> 0 with subtle scale 1 -> 1.03 over 900ms */}
      <div
        onTransitionEnd={handleTransitionEnd}
        className={`w-full h-full relative will-change-[transform,opacity] ${
          isTransitioning
            ? 'opacity-0 scale-[1.03] transition-all duration-[900ms] [transition-timing-function:cubic-bezier(0.4,0,0.2,1)]'
            : 'opacity-100 scale-100'
        }`}
      >
        {/* Fullscreen Video: Continues actively playing through the dissolve */}
        <video
          ref={(el) => {
            if (el) {
              videoRef.current = el;
              el.defaultMuted = true;
              el.muted = true;
              el.volume = 0;
            }
          }}
          src="/theatron-intro-clean.mp4"
          autoPlay
          muted
          playsInline
          webkit-playsinline="true"
          x5-playsinline="true"
          preload="auto"
          controls={false}
          disablePictureInPicture
          disableRemotePlayback
          onTimeUpdate={handleTimeUpdate}
          onEnded={handleEnded}
          onError={handleEnded}
          className="w-full h-full object-cover object-center block border-0 outline-none"
        >
          <source src="/theatron-intro-clean.mp4" type="video/mp4" />
          <source src="/intro-video.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Skip button for user convenience */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          finishIntro();
        }}
        className="absolute top-6 right-6 z-50 text-white/50 hover:text-white text-xs tracking-widest uppercase bg-black/40 hover:bg-black/80 px-4 py-2 rounded-full border border-white/20 transition-all duration-200 pointer-events-auto cursor-pointer"
        aria-label="Skip Intro"
      >
        Skip ✕
      </button>
    </div>
  );
}
