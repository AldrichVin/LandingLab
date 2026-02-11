import { Canvas } from '@react-three/fiber';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import FloatingShapes from './FloatingShapes';
import { useMouseParallax } from './useMouseParallax';
import { SCENE } from '@/shared/design-tokens';

function SceneContent() {
  useMouseParallax();

  return (
    <>
      <ambientLight intensity={SCENE.ambientLight} />
      <pointLight position={[5, 5, 5]} intensity={0.4} color="#f0d8c8" />

      <FloatingShapes />

      <EffectComposer>
        <Bloom
          intensity={SCENE.bloomIntensity}
          luminanceThreshold={0.6}
          luminanceSmoothing={0.9}
        />
      </EffectComposer>
    </>
  );
}

export default function BackgroundScene() {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        background: 'linear-gradient(180deg, #b8b4d4 0%, #c4bde0 40%, #d4c8e0 100%)',
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 12], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <SceneContent />
      </Canvas>
    </div>
  );
}
