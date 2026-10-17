'use client';

import { useEffect, useRef } from 'react';

export interface MaskFocus {
  /** Mask centre and height in hero-local CSS pixels. */
  cx: number;
  cy: number;
  h: number;
}

interface HeroParticlesProps {
  /** Cluster the dust around this point. Omit to scatter it across the whole canvas (section backdrops). */
  focus?: MaskFocus | null;
  /** Particle count multiplier. */
  density?: number;
  className?: string;
}

interface Particle {
  x: number;
  y: number;
  r: number;
  vy: number;
  sway: number;
  phase: number;
  age: number;
  life: number;
  peak: number;
}

/**
 * Sparse embers drifting up around the mask. Draws a pre-rendered glow
 * sprite (no per-frame shadowBlur), caps DPR, halves the frame rate and the
 * particle count on small/touch screens, and stops entirely while the hero is
 * offscreen or the tab is hidden.
 */
export default function HeroParticles({ focus, density = 1, className }: HeroParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const focusRef = useRef<MaskFocus | null | undefined>(focus);
  focusRef.current = focus;
  const scatter = focus === undefined;

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const lite = window.matchMedia('(max-width: 768px), (pointer: coarse)').matches;
    const count = Math.round((lite ? 16 : 34) * density);
    const frameInterval = lite ? 1000 / 30 : 0;
    const dpr = Math.min(window.devicePixelRatio || 1, lite ? 1.25 : 1.5);

    const sprite = document.createElement('canvas');
    sprite.width = sprite.height = 32;
    const sctx = sprite.getContext('2d')!;
    const glow = sctx.createRadialGradient(16, 16, 0, 16, 16, 16);
    glow.addColorStop(0, 'rgba(255, 210, 186, 1)');
    glow.addColorStop(0.25, 'rgba(241, 102, 87, 0.75)');
    glow.addColorStop(1, 'rgba(231, 48, 28, 0)');
    sctx.fillStyle = glow;
    sctx.fillRect(0, 0, 32, 32);

    let width = 0;
    let height = 0;
    const resize = () => {
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const spawn = (p: Partial<Particle> = {}, scatterAge = false): Particle => {
      const f = focusRef.current ?? { cx: width / 2, cy: height / 2, h: height * 0.6 };
      const spread = f.h * 0.62;
      const life = 4.5 + Math.random() * 5;
      return Object.assign(p, {
        x: scatter ? Math.random() * width : f.cx + (Math.random() + Math.random() - 1) * spread,
        y: scatter ? Math.random() * height * 1.1 : f.cy + (Math.random() - 0.35) * f.h * 0.9,
        r: 1.2 + Math.random() * 2.6,
        vy: 6 + Math.random() * 14,
        sway: 4 + Math.random() * 10,
        phase: Math.random() * Math.PI * 2,
        age: scatterAge ? Math.random() * life : 0,
        life,
        peak: 0.35 + Math.random() * 0.5,
      }) as Particle;
    };
    const particles = Array.from({ length: count }, () => spawn({}, true));

    let raf = 0;
    let last = 0;
    let running = false;

    const tick = (now: number) => {
      raf = requestAnimationFrame(tick);
      const elapsed = now - last;
      if (elapsed < frameInterval) return;
      const dt = Math.min(elapsed, 100) / 1000;
      last = now;

      ctx.clearRect(0, 0, width, height);
      ctx.globalCompositeOperation = 'lighter';
      for (const p of particles) {
        p.age += dt;
        if (p.age >= p.life) spawn(p);
        const t = p.age / p.life;
        // ease in over the first quarter, linger, fade out over the last 40%
        const alpha = p.peak * Math.min(1, t / 0.25) * Math.min(1, (1 - t) / 0.4);
        const x = p.x + Math.sin(p.phase + p.age * 0.8) * p.sway;
        const y = p.y - p.vy * p.age;
        const size = p.r * 4;
        ctx.globalAlpha = alpha;
        ctx.drawImage(sprite, x - size / 2, y - size / 2, size, size);
      }
      ctx.globalAlpha = 1;
    };

    const start = () => {
      if (running) return;
      running = true;
      last = performance.now();
      raf = requestAnimationFrame(tick);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    let onScreen = true;
    const sync = () => (onScreen && !document.hidden ? start() : stop());
    const io = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
      sync();
    });
    io.observe(canvas);
    document.addEventListener('visibilitychange', sync);
    sync();

    return () => {
      stop();
      io.disconnect();
      ro.disconnect();
      document.removeEventListener('visibilitychange', sync);
    };
  }, [density, scatter]);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
