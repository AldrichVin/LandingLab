import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { TIMING, SCENE } from '@/shared/design-tokens';

export function useIdleDrift(
  enabled: boolean,
  targetRef: React.MutableRefObject<THREE.Vector3>,
) {
  const timeRef = useRef(0);

  useFrame((_, delta) => {
    if (!enabled) return;

    timeRef.current += delta * TIMING.idleDriftSpeed;
    const t = timeRef.current;

    const radius = SCENE.cameraDefaultDistance;
    const lissajousX = Math.sin(t * 0.7) * radius * 0.3;
    const lissajousY = Math.sin(t * 0.5) * 2;
    const lissajousZ = Math.cos(t * 0.3) * radius * 0.3;

    targetRef.current.set(lissajousX, lissajousY, lissajousZ);
  });
}
