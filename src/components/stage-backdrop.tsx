import HeroParticles from '@/components/hero-particles';

/**
 * Section backdrop in the Nocturne style: a soft spotlight from above,
 * velvet folds at the wings and a few drifting embers.
 * Place inside a `relative` container; it never takes pointer events.
 */
export default function StageBackdrop({ dust = 0.55 }: { dust?: number }) {
  return (
    <div className="nx-stage" aria-hidden="true">
      {dust > 0 && <HeroParticles className="nx-dust" density={dust} />}
    </div>
  );
}
