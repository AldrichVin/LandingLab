import { useRef, useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { useAppStore } from '@/store/app-store';
import { useIdleDrift } from './hooks/useIdleDrift';
import { useCameraTransition } from './hooks/useCameraTransition';
import type { NodeLayout } from './hooks/useConstellationLayout';
import { SCENE } from '@/shared/design-tokens';

interface CameraControllerProps {
  nodes: NodeLayout[];
}

export function CameraController({ nodes }: CameraControllerProps) {
  const controlsRef = useRef<React.ComponentRef<typeof OrbitControls>>(null);
  const driftTarget = useRef(new THREE.Vector3(0, 0, SCENE.cameraDefaultDistance));
  const { transitionState, activePage, setTransitionState } = useAppStore();
  const { camera } = useThree();
  const { flyTo, pullBack } = useCameraTransition();
  const isUserInteracting = useRef(false);

  const isIdle = transitionState === 'idle' && !isUserInteracting.current;
  useIdleDrift(isIdle, driftTarget);

  useEffect(() => {
    camera.position.set(0, 2, SCENE.cameraDefaultDistance);
    camera.lookAt(0, 0, 0);
  }, [camera]);

  useEffect(() => {
    if (transitionState === 'entering' && activePage) {
      const node = nodes.find((n) => n.page.slug === activePage.slug);
      if (node) {
        flyTo(node.position, node.position, () => {
          setTransitionState('inside');
        });
      }
    }

    if (transitionState === 'exiting') {
      const node = activePage
        ? nodes.find((n) => n.page.slug === activePage.slug)
        : null;
      const lookAt = node?.position ?? new THREE.Vector3(0, 0, 0);
      pullBack(lookAt, () => {
        setTransitionState('idle');
      });
    }
  }, [transitionState, activePage, nodes, flyTo, pullBack, setTransitionState]);

  const showControls = transitionState === 'idle';

  return showControls ? (
    <OrbitControls
      ref={controlsRef}
      enablePan={false}
      enableDamping
      dampingFactor={0.05}
      minDistance={SCENE.cameraMinDistance}
      maxDistance={SCENE.cameraMaxDistance}
      maxPolarAngle={Math.PI * 0.75}
      minPolarAngle={Math.PI * 0.25}
      onStart={() => { isUserInteracting.current = true; }}
      onEnd={() => {
        setTimeout(() => { isUserInteracting.current = false; }, 3000);
      }}
    />
  ) : null;
}
