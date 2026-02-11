import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import type { PageEntry } from '@/registry/types';
import { useAppStore } from '@/store/app-store';
import { SCENE, TIMING, TYPOGRAPHY } from '@/shared/design-tokens';
import { dampedLerp } from '@/shared/spring';

interface PageNodeProps {
  page: PageEntry;
  position: THREE.Vector3;
}

export function PageNode({ page, position }: PageNodeProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const scaleRef = useRef(1);
  const [hovered, setHovered] = useState(false);
  const { enterPage, setHoveredPage, transitionState } = useAppStore();

  const isInteractive = transitionState === 'idle';

  useFrame((state, delta) => {
    if (!meshRef.current) return;

    const breathe = Math.sin(state.clock.elapsedTime * (2 * Math.PI / (TIMING.nodeBreathCycle / 1000))) * 0.05;
    const targetScale = hovered ? 1.15 : 1.0;
    scaleRef.current = dampedLerp(scaleRef.current, targetScale, delta, 0.2);

    const finalScale = scaleRef.current + breathe;
    meshRef.current.scale.setScalar(finalScale);

    if (glowRef.current) {
      glowRef.current.scale.setScalar(finalScale * 2.5);
    }
  });

  const handlePointerOver = () => {
    if (!isInteractive) return;
    setHovered(true);
    setHoveredPage(page);
    document.body.style.cursor = 'pointer';
  };

  const handlePointerOut = () => {
    setHovered(false);
    setHoveredPage(null);
    document.body.style.cursor = 'default';
  };

  const handleClick = () => {
    if (!isInteractive) return;
    document.body.style.cursor = 'default';
    enterPage(page);
  };

  return (
    <group position={position}>
      {/* Glow sphere (additive) */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[SCENE.nodeBaseRadius, 16, 16]} />
        <meshBasicMaterial
          color={page.color}
          transparent
          opacity={hovered ? 0.15 : 0.08}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Core sphere */}
      <mesh
        ref={meshRef}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={handleClick}
      >
        <sphereGeometry args={[SCENE.nodeBaseRadius, 32, 32]} />
        <meshStandardMaterial
          color={page.color}
          emissive={page.color}
          emissiveIntensity={hovered ? SCENE.nodeGlowIntensity * 1.5 : SCENE.nodeGlowIntensity}
          roughness={0.3}
          metalness={0.1}
          toneMapped={false}
        />
      </mesh>

      {/* HTML label */}
      {hovered && isInteractive && (
        <Html
          position={[0, SCENE.nodeBaseRadius * 2.5, 0]}
          center
          distanceFactor={10}
          style={{ pointerEvents: 'none' }}
        >
          <div
            style={{
              fontFamily: TYPOGRAPHY.display,
              color: '#f5f0e8',
              textAlign: 'center',
              whiteSpace: 'nowrap',
              userSelect: 'none',
            }}
          >
            <div style={{ fontSize: '18px', fontWeight: 700, marginBottom: '4px' }}>
              {page.title}
            </div>
            <div
              style={{
                fontSize: '12px',
                fontFamily: TYPOGRAPHY.body,
                opacity: 0.7,
                fontWeight: 400,
              }}
            >
              {page.subtitle}
            </div>
          </div>
        </Html>
      )}
    </group>
  );
}
