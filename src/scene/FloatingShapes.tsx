import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import type { Mesh } from 'three';

interface ShapeConfig {
  position: [number, number, number];
  scale: number;
  color: string;
  speed: number;
  offset: number;
  geometry: 'sphere' | 'capsule';
}

const SHAPE_CONFIGS: readonly ShapeConfig[] = [
  { position: [-4, 2, -6], scale: 0.8, color: '#d8c0e8', speed: 0.15, offset: 0, geometry: 'sphere' },
  { position: [3, -1, -8], scale: 1.2, color: '#e8c8d8', speed: 0.12, offset: 1.5, geometry: 'sphere' },
  { position: [-2, -2.5, -5], scale: 0.6, color: '#f0dcc0', speed: 0.18, offset: 3, geometry: 'capsule' },
  { position: [5, 1.5, -10], scale: 1.0, color: '#c8c0e0', speed: 0.1, offset: 0.8, geometry: 'sphere' },
  { position: [-5, 0, -7], scale: 0.5, color: '#e0b8c8', speed: 0.2, offset: 2.2, geometry: 'capsule' },
  { position: [1, 3, -9], scale: 0.7, color: '#d0d8f0', speed: 0.14, offset: 4, geometry: 'sphere' },
  { position: [4, -2, -6], scale: 0.4, color: '#f0d8b8', speed: 0.22, offset: 5, geometry: 'sphere' },
];

function FloatingShape({ config }: { config: ShapeConfig }) {
  const meshRef = useRef<Mesh>(null);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime() * config.speed + config.offset;
    meshRef.current.position.x = config.position[0] + Math.sin(t) * 0.4;
    meshRef.current.position.y = config.position[1] + Math.cos(t * 0.7) * 0.3;
    meshRef.current.rotation.x = t * 0.1;
    meshRef.current.rotation.z = t * 0.08;
  });

  const geometry = useMemo(() => {
    if (config.geometry === 'capsule') {
      return <capsuleGeometry args={[0.3, 0.6, 8, 16]} />;
    }
    return <sphereGeometry args={[0.5, 24, 24]} />;
  }, [config.geometry]);

  return (
    <mesh ref={meshRef} position={config.position} scale={config.scale}>
      {geometry}
      <meshStandardMaterial
        color={config.color}
        roughness={0.8}
        metalness={0.05}
        transparent
        opacity={0.6}
      />
    </mesh>
  );
}

export default function FloatingShapes() {
  return (
    <group>
      {SHAPE_CONFIGS.map((config, i) => (
        <FloatingShape key={i} config={config} />
      ))}
    </group>
  );
}
