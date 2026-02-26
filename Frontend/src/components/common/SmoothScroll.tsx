'use client';

import { ReactLenis } from 'lenis/react';
import { ReactNode } from 'react';

interface SmoothScrollProps {
  children: ReactNode;
}

const SmoothScroll = ({ children }: SmoothScrollProps) => {
  return (
    <ReactLenis root options={{ 
      lerp: 0.15,
      smoothWheel: true,
      wheelMultiplier: 1,
    }}>
      {children}
    </ReactLenis>
  );
};

export default SmoothScroll;
