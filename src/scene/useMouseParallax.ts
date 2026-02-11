import { useEffect, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { SCENE } from '@/shared/design-tokens';

export function useMouseParallax() {
  const mouse = useRef({ x: 0, y: 0 });
  const { camera } = useThree();

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', handler);
    return () => window.removeEventListener('mousemove', handler);
  }, []);

  useFrame(() => {
    const range = SCENE.cameraParallaxRange;
    const targetX = mouse.current.x * range;
    const targetY = -mouse.current.y * range * 0.6;

    camera.position.x += (targetX - camera.position.x) * 0.03;
    camera.position.y += (targetY - camera.position.y) * 0.03;
    camera.lookAt(0, 0, 0);
  });
}
