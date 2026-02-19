import { useEffect } from 'react';
import { useMotionValue, useSpring, type MotionValue } from 'framer-motion';

interface MouseParallaxResult {
  readonly x: MotionValue<number>;
  readonly y: MotionValue<number>;
}

/**
 * Tracks mouse position normalized to [-1, 1] relative to viewport center.
 * Returns spring-animated motion values for smooth parallax displacement.
 */
export function useMouseParallax(enabled = true): MouseParallaxResult {
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  const x = useSpring(rawX, { damping: 50, stiffness: 100 });
  const y = useSpring(rawY, { damping: 50, stiffness: 100 });

  useEffect(() => {
    if (!enabled) return;

    const handleMouseMove = (e: MouseEvent) => {
      const normalizedX = (e.clientX / window.innerWidth - 0.5) * 2;
      const normalizedY = (e.clientY / window.innerHeight - 0.5) * 2;
      rawX.set(normalizedX);
      rawY.set(normalizedY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [enabled, rawX, rawY]);

  return { x, y };
}
