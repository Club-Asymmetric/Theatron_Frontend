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
 * Implements the continuous 4-state cinematic transition with full TypeScript typing:
 * 1. INTRO_PLAYING:
 *    - Fullscreen video playback rolling actively
 *    - Real-time 60fps rAF + timeupdate monitoring
 *    - Triggers transition when (video.duration - video.currentTime <= 1.5s)
 * 2. INTRO_ENTERING_SCREEN:
 *    - Video CONTINUES PLAYING (never paused, never held)
 *    - Camera zoom pushes into center of theatre screen (scale: 1.0 -> 2.4, origin: 50% 48%)
 *    - Curtains move outward past viewport edges; screen expands to fill viewport
 * 3. INTRO_REVEALING_HOME:
 *    - At 450ms into zoom: video dissolves opacity 1.0 -> 0.0 over 850ms
 *    - THEATRON Home page (already mounted underneath) emerges through the screen
 * 4. INTRO_COMPLETE:
 *    - At 1350ms total: video layer unmounts completely from DOM
 *    - Zero held frames, zero blank screens, unmounts before video reaches final frame
 */
export default function CinematicIntro({
  onEnteringScreen,
  onRevealingHome,
  onComplete,
  onStateChange,
}: CinematicIntroProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [introState, setIntroState] = useState<IntroState>('INTRO_PLAYING');
  const stateRef = useRef<IntroState>('INTRO_PLAYING');
  const animFrameIdRef = useRef<number | null>(null);
  const transitionTimerRef = useRef<NodeJS.Timeout | null>(null);
  const completeTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Synchronize state ref for event handlers and callbacks
  useEffect(() => {
    stateRef.current = introState;
  }, [introState]);

  // Master transition trigger: executed BEFORE the video ever reaches its final frame
  const triggerTransition = useCallback(() => {
    if (stateRef.current !== 'INTRO_PLAYING') return;

    stateRef.current = 'INTRO_ENTERING_SCREEN';
    setIntroState('INTRO_ENTERING_SCREEN');
    onEnteringScreen?.();
    onStateChange?.('INTRO_ENTERING_SCREEN');

    // 450ms into zoom: screen fills viewport; start fading video to reveal Home page
    transitionTimerRef.current = setTimeout(() => {
      if (stateRef.current !== 'INTRO_COMPLETE') {
        stateRef.current = 'INTRO_REVEALING_HOME';
        setIntroState('INTRO_REVEALING_HOME');
        onRevealingHome?.();
        onStateChange?.('INTRO_REVEALING_HOME');
      }
    }, 450);

    // 1350ms total: transition completes and video unmounts BEFORE the file reaches its end
    completeTimerRef.current = setTimeout(() => {
      if (stateRef.current !== 'INTRO_COMPLETE') {
        stateRef.current = 'INTRO_COMPLETE';
        setIntroState('INTRO_COMPLETE');
        onComplete?.();
        onStateChange?.('INTRO_COMPLETE');
      }
    }, 1350);
  }, [onEnteringScreen, onRevealingHome, onComplete, onStateChange]);

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
            if (videoRef.current && stateRef.current === 'INTRO_PLAYING') {
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

    // High-frequency 60fps monitor to trigger zoom BEFORE the video reaches its end
    const checkProgress = () => {
      const v = videoRef.current;
      if (v && v.duration && v.duration > 0 && v.currentTime > 0) {
        const remaining = v.duration - v.currentTime;

        // When <= 1.5 seconds remain: start camera zoom INTO the screen
        if (remaining <= 1.5 && stateRef.current === 'INTRO_PLAYING') {
          triggerTransition();
          return;
        }
      }

      if (stateRef.current === 'INTRO_PLAYING') {
        animFrameIdRef.current = requestAnimationFrame(checkProgress);
      }
    };

    animFrameIdRef.current = requestAnimationFrame(checkProgress);

    // Fallback timer: Video is 6.2s; trigger transition at 4.8s if rAF or events were delayed
    const fallbackTimer = setTimeout(() => {
      if (stateRef.current === 'INTRO_PLAYING') {
        triggerTransition();
      }
    }, 4800);

    return () => {
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
      clearTimeout(fallbackTimer);
      if (transitionTimerRef.current) clearTimeout(transitionTimerRef.current);
      if (completeTimerRef.current) clearTimeout(completeTimerRef.current);
      document.body.style.overflow = originalOverflow;
    };
  }, [triggerTransition]);

  // Monitor timeupdate for immediate reaction
  const handleTimeUpdate = () => {
    const v = videoRef.current;
    if (v && v.duration && v.duration > 0 && v.currentTime > 0) {
      if (v.duration - v.currentTime <= 1.5 && stateRef.current === 'INTRO_PLAYING') {
        triggerTransition();
      }
    }
  };

  const handleContainerClick = () => {
    if (videoRef.current && videoRef.current.paused && stateRef.current === 'INTRO_PLAYING') {
      videoRef.current.play().catch(() => {});
    }
  };

  if (introState === 'INTRO_COMPLETE') {
    return null;
  }

  const isZooming = introState === 'INTRO_ENTERING_SCREEN' || introState === 'INTRO_REVEALING_HOME';
  const isFadingOut = introState === 'INTRO_REVEALING_HOME';

  return (
    <div
      onClick={handleContainerClick}
      className="fixed inset-0 w-screen h-screen h-[100dvh] z-[9999] overflow-hidden select-none"
      style={{
        margin: 0,
        padding: 0,
        border: 'none',
        pointerEvents: isZooming ? 'none' : 'auto',
        backgroundColor: 'transparent',
      }}
      aria-hidden="true"
    >
      {/* Zoom Container: Centers on cinema screen (50% 48%) and pushes forward into it while video continues playing */}
      <div
        className="w-full h-full relative"
        style={{
          transformOrigin: '50% 48%',
          transform: isZooming ? 'scale(2.4)' : 'scale(1)',
          opacity: isFadingOut ? 0 : 1,
          transition: isZooming
            ? 'transform 1350ms cubic-bezier(0.22, 0.85, 0.3, 1), opacity 850ms ease-out 450ms'
            : 'none',
          willChange: 'transform, opacity',
        }}
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
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
            display: 'block',
            border: 'none',
            outline: 'none',
          }}
        >
          <source src="/theatron-intro-clean.mp4" type="video/mp4" />
          <source src="/intro-video.mp4" type="video/mp4" />
        </video>
      </div>
    </div>
  );
}
