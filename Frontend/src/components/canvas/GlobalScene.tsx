'use client';

import { useRef, useMemo } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
// @ts-ignore
import * as random from 'maath/random/dist/maath-random.esm';
import { useScroll } from 'framer-motion';

const ParticleField = () => {
  const ref = useRef<any>(null);
  const sphere = useMemo(() => random.inSphere(new Float32Array(24000), { radius: 1.8 }), []);
  
  // Create a connection to the global scroll
  const { scrollYProgress } = useScroll();
  const currentRotation = useRef({ x: 0, y: 0 });

  useFrame((state, delta) => {
    if (ref.current) {
      const scroll = scrollYProgress.get();
      
      // Target values
      const targetX = scroll * 5;
      const targetY = scroll * 2;

      // Manually lerp for perfect settling (0.1 means 10% towards target every frame)
      // This is much more stable than a spring for scroll-linked rotation
      currentRotation.current.x = THREE.MathUtils.lerp(currentRotation.current.x, targetX, 0.2);
      currentRotation.current.y = THREE.MathUtils.lerp(currentRotation.current.y, targetY, 0.2);
      
      ref.current.rotation.x = currentRotation.current.x + (state.clock.elapsedTime / 20);
      ref.current.rotation.y = currentRotation.current.y + (state.clock.elapsedTime / 25);
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#037DD6"
          size={0.003}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.6}
        />
      </Points>
    </group>
  );
};

const GlobalScene = () => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none opacity-40">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <ParticleField />
      </Canvas>
    </div>
  );
};

export default GlobalScene;
