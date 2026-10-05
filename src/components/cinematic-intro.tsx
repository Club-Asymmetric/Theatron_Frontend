'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import type { IntroState } from '@/types';

export interface CinematicIntroProps {
  onEnteringScreen?: () => void;
  onRevealingHome?: () => void;
  onComplete?: () => void;
  onStateChange?: (state: IntroState) => void;
}

/**
 * CinematicIntro
 *
 * Flawless continuous cinematic push-in transition:
 * 1. Fullscreen intro video plays continuously.
 * 2. 1.5s before video ends, the camera smoothly zooms INTO the center of the screen
 *    ([transform-origin:50%_48%], scale 2.4).
 * 3. Video opacity dissolves smoothly (1.0 -> 0.0) with Tailwind CSS transitions.
 * 4. The Home page underneath emerges cleanly into full view.
 * 5. Video is unmounted cleanly with multiple failsafes:
 *    - onTransitionEnd event on CSS opacity
 *    - setTimeout at 1100ms
 *    - video onEnded event
 *    - hard safety timeout at 5800ms
 *    - click or Escape key skip
 *
 * Timer cancellation bug is solved by storing parent callbacks in stable useRef hooks.
 */
export default function CinematicIntro({
  onEnteringScreen,
  onRevealingHome,
  onComplete,
  onStateChange,
}: CinematicIntroProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const [isComplete, setIsComplete] = useState<boolean>(false);
  const hasTriggeredRef = useRef<boolean>(false);
  const hasCompletedRef = useRef<boolean>(false);

  // Stable callback refs so parent re-renders NEVER cancel active timers
  const onEnteringScreenRef = useRef(onEnteringScreen);
  const onRevealingHomeRef = useRef(onRevealingHome);
  const onCompleteRef = useRef(onComplete);
  const onStateChangeRef = useRef(onStateChange);

  useEffect(() => {
    onEnteringScreenRef.current = onEnteringScreen;
    onRevealingHomeRef.current = onRevealingHome;
    onCompleteRef.current = onComplete;
    onStateChangeRef.current = onStateChange;
  });

  // Master unmount function - idempotent, guaranteed to fire once
  const finishIntro = useCallback(() => {
    if (hasCompletedRef.current) return;
    hasCompletedRef.current = true;
    setIsComplete(true);
    onStateChangeRef.current?.('INTRO_COMPLETE');
    onCompleteRef.current?.();
  }, []);

  // Trigger continuous zoom and dissolve transition
  const startTransition = useCallback(() => {
    if (hasTriggeredRef.current || hasCompletedRef.current) return;
    hasTriggeredRef.current = true;

    setIsTransitioning(true);
    onEnteringScreenRef.current?.();
    onStateChangeRef.current?.('INTRO_ENTERING_SCREEN');

    // At 300ms: notify Home page is revealing
    setTimeout(() => {
      onRevealingHomeRef.current?.();
      onStateChangeRef.current?.('INTRO_REVEALING_HOME');
    }, 300);

    // At 1100ms: complete transition and unmount video layer
    setTimeout(() => {
      finishIntro();
    }, 1100);
  }, [finishIntro]);

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
        playPromise.catch((err) => {
          console.warn('Autoplay restricted by browser, waiting for user gesture:', err);

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

    // High-frequency 60fps monitor: trigger zoom BEFORE video reaches its final frame
    let animFrameId: number;
    const checkProgress = () => {
      const v = videoRef.current;
      if (v && v.duration && v.duration > 0 && v.currentTime > 0) {
        const remaining = v.duration - v.currentTime;

        // When <= 1.5 seconds remain: begin zoom and dissolve
        if (remaining <= 1.5 && !hasTriggeredRef.current) {
          startTransition();
          return;
        }
      }

      if (!hasTriggeredRef.current) {
        animFrameId = requestAnimationFrame(checkProgress);
      }
    };

    animFrameId = requestAnimationFrame(checkProgress);

    // Safety fallback 1: If video is ~6.2s, trigger transition at 4.6s regardless
    const safetyTransitionTimer = setTimeout(() => {
      if (!hasTriggeredRef.current) {
        startTransition();
      }
    }, 4600);

    // Safety fallback 2: Guaranteed unmount at 5.8s no matter what happens
    const safetyCompleteTimer = setTimeout(() => {
      finishIntro();
    }, 5800);

    // Escape key to skip intro instantly
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === ' ') {
        finishIntro();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      cancelAnimationFrame(animFrameId);
      clearTimeout(safetyTransitionTimer);
      clearTimeout(safetyCompleteTimer);
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [startTransition, finishIntro]);

  // Monitor timeupdate for immediate reaction
  const handleTimeUpdate = () => {
    const v = videoRef.current;
    if (v && v.duration && v.duration > 0 && v.currentTime > 0) {
      if (v.duration - v.currentTime <= 1.5 && !hasTriggeredRef.current) {
        startTransition();
      }
    }
  };

  // If video fires ended, complete immediately
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

  if (isComplete) {
    return null;
  }

  return (
    <div
      onClick={handleContainerClick}
      className={`fixed inset-0 w-screen h-screen h-[100dvh] z-[9999] overflow-hidden select-none bg-black transition-opacity duration-300 ${
        isTransitioning ? 'pointer-events-none' : 'pointer-events-auto'
      }`}
      aria-hidden="true"
    >
      {/* Zoom Container: Centers on cinema screen (50% 48%) and pushes forward into it while dissolving */}
      <div
        onTransitionEnd={handleTransitionEnd}
        className={`w-full h-full relative will-change-[transform,opacity] [transform-origin:50%_48%] ${
          isTransitioning
            ? 'scale-[2.4] opacity-0 transition-all duration-[1100ms] [transition-timing-function:cubic-bezier(0.22,0.85,0.3,1)] [transition-delay:0ms,250ms]'
            : 'scale-100 opacity-100'
        }`}
      >
        {/* Fullscreen Video: Continues playing through the zoom; no poster, no pause, no static hold */}
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
