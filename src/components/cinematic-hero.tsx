'use client';

import { useCallback, useEffect, useLayoutEffect, useRef, useState, type FocusEvent, type ReactNode } from 'react';
import HeroParticles, { type MaskFocus } from '@/components/hero-particles';
import styles from './cinematic-hero.module.css';

const INTRO_SRC = '/nocturne-red-intro.mp4';
const LOOP_SRC = '/nocturne-red-loop.mp4';
// First frame of the loop == last frame of the intro, so it doubles as the static fallback.
const POSTER_SRC = '/nocturne-red-poster.jpg';

// Mask bounds inside the 1920x1080 frame (fractions), measured on the shared
// intro-end / loop-start frame. Used to place the mask after the intro.
const FRAME_W = 1920;
const FRAME_H = 1080;
const MASK = { cx: 0.5, cy: 0.478, w: 0.264, h: 0.726 };

const REVEAL_LEAD_S = 1.6; // start gliding + revealing copy this long before the intro ends
const STALL_MS = 3500; // give up on the intro if playback makes no progress for this long
const MAX_INTRO_MS = 16000;
const NAV_CLEARANCE = 100;
const SESSION_KEY = 'theatron:intro-played';

type Phase = 'pending' | 'intro' | 'reveal' | 'rest' | 'static';
type Layout = 'side' | 'stacked' | 'behind';

// Survives remounts (switching sections unmounts the hero) without touching the server.
let introPlayedThisLoad = false;

const useIsoLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect;

function introAlreadyPlayed() {
  if (introPlayedThisLoad) return true;
  try {
    return sessionStorage.getItem(SESSION_KEY) === '1';
  } catch {
    return false;
  }
}

function markIntroPlayed() {
  introPlayedThisLoad = true;
  try {
    sessionStorage.setItem(SESSION_KEY, '1');
  } catch {}
}

function choosePhase(): Phase {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
  if (reducedMotion || saveData) return 'static';
  return introAlreadyPlayed() ? 'rest' : 'intro';
}

/**
 * The stage is the whole 16:9 frame at "cover" size, centred on the hero, so
 * scaling it down reveals the frame's own near-black edges rather than a
 * cropped rectangle. Where the mask rests after the intro is expressed as a
 * transform on that stage (origin top-left); only translate/scale are used so
 * the glide is GPU-composited and never causes layout.
 */
function computeRest(hero: HTMLElement, content: HTMLElement | null) {
  const w = hero.clientWidth;
  const h = hero.clientHeight;
  const k = Math.max(w / FRAME_W, h / FRAME_H); // object-fit: cover scale
  const fw = FRAME_W * k;
  const fh = FRAME_H * k;
  const fx = (w - fw) / 2;
  const fy = (h - fh) / 2;
  const mx = MASK.cx * fw; // stage-local
  const my = MASK.cy * fh;
  const mw = MASK.w * fw;
  const mh = MASK.h * fh;
  const maskAspect = mw / mh;

  let layout: Layout;
  let s: number;
  let cx: number;
  let cy: number;

  if (w > 900 && w / h >= 1.15) {
    // Copy on the left, mask takes the stage on the right (where the old hero subject stood).
    layout = 'side';
    s = Math.min(1, (h - NAV_CLEARANCE - 24) / mh);
    cx = Math.min(w * 0.72, w * 0.95 - (mw * s) / 2);
    cy = Math.min(Math.max(fy + my, NAV_CLEARANCE + (mh * s) / 2), h - (mh * s) / 2 - 16);
  } else {
    // Portrait / narrow: mask sits in the free space beneath the copy.
    const contentBottom = content ? content.offsetTop + content.offsetHeight : h * 0.6;
    const top = contentBottom + 20;
    const target = Math.min(h - top - 28, (w * 0.72) / maskAspect, mh);
    if (target >= 150) {
      layout = 'stacked';
      s = target / mh;
      cx = w / 2;
      cy = top + target / 2;
    } else {
      layout = 'behind';
      s = Math.min(1, (h * 0.55) / mh);
      cx = w / 2;
      cy = h * 0.6;
    }
  }

  return {
    layout,
    frame: { x: `${fx.toFixed(2)}px`, y: `${fy.toFixed(2)}px`, w: `${fw.toFixed(2)}px`, h: `${fh.toFixed(2)}px` },
    transform: `translate3d(${(cx - fx - s * mx).toFixed(2)}px, ${(cy - fy - s * my).toFixed(2)}px, 0) scale(${s.toFixed(4)})`,
    floatAmp: `${(6 / s).toFixed(2)}px`,
    focus: { cx, cy, h: mh * s } as MaskFocus,
  };
}

interface CinematicHeroProps {
  children: ReactNode;
  id?: string;
  ariaLabel?: string;
}

/**
 * Homepage hero backed by the Nocturne intro: curtains part, the crimson mask
 * settles, then the stage glides the mask into its resting spot while the
 * existing hero copy fades in. The intro hands off to a seamless ambient loop
 * (pixel-matched first frame), with a gentle float and drifting embers on top.
 * Plays once per browser session; reduced-motion / save-data users get the
 * static final frame.
 */
export default function CinematicHero({ children, id = 'home', ariaLabel }: CinematicHeroProps) {
  const heroRef = useRef<HTMLElement | null>(null);
  const introRef = useRef<HTMLVideoElement | null>(null);
  const loopRef = useRef<HTMLVideoElement | null>(null);
  const skipRef = useRef<HTMLButtonElement | null>(null);

  // On first load this is 'pending' on both server and client (no hydration
  // mismatch); on client-side remounts we already know the answer.
  const [phase, setPhase] = useState<Phase>(() =>
    typeof window !== 'undefined' && introPlayedThisLoad ? choosePhase() : 'pending',
  );
  const [glide, setGlide] = useState(false);
  const [loopMounted, setLoopMounted] = useState(phase === 'rest');
  const [introFading, setIntroFading] = useState(false);
  const [introGone, setIntroGone] = useState(phase !== 'pending');
  const [layout, setLayout] = useState<Layout>('side');
  const [focus, setFocus] = useState<MaskFocus | null>(null);

  const phaseRef = useRef(phase);
  phaseRef.current = phase;

  useIsoLayoutEffect(() => {
    if (phase !== 'pending') return;
    const next = choosePhase();
    if (next === 'intro') {
      markIntroPlayed();
    } else {
      setIntroGone(true);
      setLoopMounted(next === 'rest');
    }
    setPhase(next);
  }, []);

  // Keep the resting transform in sync with the hero/copy size.
  useIsoLayoutEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;
    const content = hero.querySelector<HTMLElement>('.theatron-hero-content');
    const update = () => {
      const rest = computeRest(hero, content);
      hero.style.setProperty('--stage-x', rest.frame.x);
      hero.style.setProperty('--stage-y', rest.frame.y);
      hero.style.setProperty('--stage-w', rest.frame.w);
      hero.style.setProperty('--stage-h', rest.frame.h);
      hero.style.setProperty('--rest-transform', rest.transform);
      hero.style.setProperty('--float-amp', rest.floatAmp);
      setLayout(rest.layout);
      setFocus((prev) =>
        prev && Math.abs(prev.cx - rest.focus.cx) < 1 && Math.abs(prev.cy - rest.focus.cy) < 1 && Math.abs(prev.h - rest.focus.h) < 1
          ? prev
          : rest.focus,
      );
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(hero);
    if (content) ro.observe(content);
    return () => ro.disconnect();
  }, []);

  const finishIntro = useCallback(() => {
    const current = phaseRef.current;
    if (current !== 'pending' && current !== 'intro' && current !== 'reveal') return;
    markIntroPlayed();
    setGlide(true);
    setLoopMounted(true);
    setPhase('rest');
  }, []);

  const skipIntro = useCallback(() => {
    // Cut straight to the resting mask; the curtains dissolve rather than wait for the loop.
    setIntroFading(true);
    finishIntro();
  }, [finishIntro]);

  // Intro playback: start, watch for stalls / blocked autoplay, allow skipping.
  useEffect(() => {
    if (phase !== 'intro') return;
    const video = introRef.current;
    const hero = heroRef.current;
    if (!video || !hero) return;

    video.defaultMuted = true;
    video.muted = true;
    video.play()?.catch(skipIntro);

    let lastTime = -1;
    let lastProgress = performance.now();
    const watchdog = window.setInterval(() => {
      const now = performance.now();
      if (video.currentTime !== lastTime) {
        lastTime = video.currentTime;
        lastProgress = now;
      } else if (now - lastProgress > STALL_MS) {
        skipIntro();
      }
    }, 500);
    const cap = window.setTimeout(skipIntro, MAX_INTRO_MS);

    // Scrolled away mid-intro: don't make them come back to finish it.
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) skipIntro();
    });
    io.observe(hero);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') skipIntro();
    };
    window.addEventListener('keydown', onKey);

    return () => {
      window.clearInterval(watchdog);
      window.clearTimeout(cap);
      io.disconnect();
      window.removeEventListener('keydown', onKey);
    };
  }, [phase, skipIntro]);

  // The copy is already showing during the reveal; don't let a stall near the end strand it.
  useEffect(() => {
    if (phase !== 'reveal') return;
    const t = window.setTimeout(finishIntro, (REVEAL_LEAD_S + 2.5) * 1000);
    return () => window.clearTimeout(t);
  }, [phase, finishIntro]);

  const onIntroTimeUpdate = () => {
    const v = introRef.current;
    if (!v || !v.duration) return;
    if (v.currentTime >= v.duration / 2) setLoopMounted(true);
    if (phaseRef.current === 'intro' && v.currentTime >= v.duration - REVEAL_LEAD_S) {
      setGlide(true);
      setLoopMounted(true);
      setPhase('reveal');
    }
  };

  // Resting: run the loop while the hero is on screen, then retire the intro.
  useEffect(() => {
    if (phase !== 'rest' || !loopMounted) return;
    const hero = heroRef.current;
    const loop = loopRef.current;
    if (!hero || !loop) return;
    loop.defaultMuted = true;
    loop.muted = true;

    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) loop.play().catch(() => setIntroFading(true));
      else loop.pause();
    });
    io.observe(hero);
    // If the loop never starts, the poster beneath already shows the same frame.
    const fallback = window.setTimeout(() => setIntroFading(true), 1200);
    return () => {
      io.disconnect();
      window.clearTimeout(fallback);
    };
  }, [phase, loopMounted]);

  useEffect(() => {
    if (!introFading || introGone) return;
    const t = window.setTimeout(() => setIntroGone(true), 1000);
    return () => window.clearTimeout(t);
  }, [introFading, introGone]);

  // Focusing a hero control during the intro reveals it immediately.
  const onFocusCapture = (e: FocusEvent<HTMLElement>) => {
    if ((phase === 'intro' || phase === 'pending') && e.target !== skipRef.current) skipIntro();
  };

  const showSkip = phase === 'intro' || phase === 'reveal';
  const animated = phase !== 'static';

  return (
    <section
      ref={heroRef}
      id={id}
      aria-label={ariaLabel}
      className={`theatron-hero ${styles.hero}`}
      data-phase={phase}
      data-layout={layout}
      data-glide={glide ? '' : undefined}
      onFocusCapture={onFocusCapture}
    >
      <div className={styles.stage} aria-hidden="true">
        <div className={styles.float}>
          {(phase === 'rest' || phase === 'static') && (
            <div className={styles.poster} style={{ backgroundImage: `url(${POSTER_SRC})` }} />
          )}
          {animated && loopMounted && (
            <video
              ref={loopRef}
              className={styles.video}
              src={LOOP_SRC}
              poster={POSTER_SRC}
              muted
              loop
              playsInline
              preload="auto"
              disablePictureInPicture
              disableRemotePlayback
              tabIndex={-1}
              onPlaying={() => setIntroFading(true)}
            />
          )}
          {/* Mounted only once the client has decided to play it, so skipped visits never fetch it */}
          {phase !== 'pending' && !introGone && (
            <video
              ref={introRef}
              className={`${styles.video} ${styles.intro}`}
              data-fading={introFading ? '' : undefined}
              src={INTRO_SRC}
              autoPlay
              muted
              playsInline
              preload="auto"
              disablePictureInPicture
              disableRemotePlayback
              tabIndex={-1}
              onTimeUpdate={onIntroTimeUpdate}
              onEnded={finishIntro}
              onError={skipIntro}
              onTransitionEnd={(e) => e.propertyName === 'opacity' && introFading && setIntroGone(true)}
            />
          )}
        </div>
      </div>

      <div className={`theatron-hero-vignette ${styles.vignette}`} />
      {phase === 'rest' && <HeroParticles focus={focus} className={styles.particles} />}
      <div className="theatron-hero-grain" />

      {showSkip && (
        <button ref={skipRef} type="button" className={styles.skip} onClick={skipIntro} data-hidden={phase === 'reveal' ? '' : undefined}>
          Skip intro
        </button>
      )}

      {children}
    </section>
  );
}
