import { Canvas } from '@react-three/fiber';
import { ConstellationField } from './ConstellationField';
import { AmbientParticles } from './AmbientParticles';
import { PostProcessing } from './PostProcessing';
import { useAppStore } from '@/store/app-store';

export function ArchiveScene() {
  const transitionState = useAppStore((s) => s.transitionState);
  const adaptiveColor = useAppStore((s) => s.adaptiveColor);

  const isVisible = transitionState !== 'inside';

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 10,
        opacity: isVisible ? 1 : 0,
        pointerEvents: isVisible ? 'auto' : 'none',
        transition: 'opacity 0.4s ease-out',
        background: `radial-gradient(ellipse at center, ${adaptiveColor} 0%, #0a0a1a 100%)`,
      }}
    >
      <Canvas
        camera={{ fov: 50, near: 0.1, far: 100 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.15} />
        <pointLight position={[10, 10, 10]} intensity={0.3} />
        <ConstellationField />
        <AmbientParticles />
        <PostProcessing />
      </Canvas>
    </div>
  );
}
