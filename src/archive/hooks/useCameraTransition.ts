import { useRef, useCallback } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { dampedLerpV3 } from '@/shared/spring';

interface CameraTransitionState {
  isFlying: boolean;
  target: THREE.Vector3;
  lookAt: THREE.Vector3;
  onComplete: (() => void) | null;
}

export function useCameraTransition() {
  const { camera } = useThree();
  const state = useRef<CameraTransitionState>({
    isFlying: false,
    target: new THREE.Vector3(),
    lookAt: new THREE.Vector3(),
    onComplete: null,
  });

  const flyTo = useCallback(
    (target: THREE.Vector3, lookAt: THREE.Vector3, onComplete?: () => void) => {
      const offset = new THREE.Vector3().subVectors(target, lookAt).normalize().multiplyScalar(3);
      state.current = {
        isFlying: true,
        target: target.clone().add(offset),
        lookAt: lookAt.clone(),
        onComplete: onComplete ?? null,
      };
    },
    [camera],
  );

  const pullBack = useCallback(
    (lookAt: THREE.Vector3, onComplete?: () => void) => {
      const direction = new THREE.Vector3()
        .subVectors(camera.position, lookAt)
        .normalize()
        .multiplyScalar(15);
      state.current = {
        isFlying: true,
        target: lookAt.clone().add(direction),
        lookAt: lookAt.clone(),
        onComplete: onComplete ?? null,
      };
    },
    [camera],
  );

  useFrame((_, delta) => {
    const s = state.current;
    if (!s.isFlying) return;

    dampedLerpV3(camera.position, s.target, delta, 0.12);
    camera.lookAt(s.lookAt);

    if (camera.position.distanceTo(s.target) < 0.05) {
      s.isFlying = false;
      s.onComplete?.();
    }
  });

  return { flyTo, pullBack, isFlying: state.current.isFlying };
}
