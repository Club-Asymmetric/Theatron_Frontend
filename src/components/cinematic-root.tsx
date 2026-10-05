'use client';

import { useState, useEffect, type ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import CinematicIntro from './cinematic-intro';

export interface CinematicRootProps {
  children: ReactNode;
}

export default function CinematicRoot({ children }: CinematicRootProps) {
  const pathname = usePathname();

  // Show intro only when landing on the home page '/'
  const [showIntro, setShowIntro] = useState<boolean>(() => {
    return pathname === '/';
  });

  useEffect(() => {
    // If navigating directly to a non-home route, ensure intro is skipped
    if (pathname && pathname !== '/') {
      setShowIntro(false);
      return;
    }

    // Check prefers-reduced-motion accessibility setting
    if (
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      setShowIntro(false);
      return;
    }
  }, [pathname]);

  const handleComplete = () => {
    setShowIntro(false);
  };

  return (
    <>
      {showIntro && <CinematicIntro onComplete={handleComplete} />}
      <div className={`theatron-app relative min-h-screen ${showIntro ? 'pointer-events-none' : ''}`}>
        {children}
      </div>
    </>
  );
}
