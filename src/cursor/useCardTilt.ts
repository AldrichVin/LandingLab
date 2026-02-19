import { useCallback, type RefObject } from 'react';
import { useMotionValue, useSpring } from 'framer-motion';
import { useGalleryStore } from '@/shared/store';
import { useReducedMotion } from '@/shared/hooks/useReducedMotion';
import { SPRINGS } from '@/shared/design-tokens';

const MAX_TILT = 12;
const TILT_SPRING = { damping: 20, stiffness: 200, mass: 0.8 };

interface CardTiltResult {
  readonly rotateX: ReturnType<typeof useSpring>;
  readonly rotateY: ReturnType<typeof useSpring>;
  readonly glareX: ReturnType<typeof useSpring>;
  readonly glareY: ReturnType<typeof useSpring>;
  readonly handleMouseMove: (e: React.MouseEvent) => void;
  readonly handleMouseEnter: (label: string) => void;
  readonly handleMouseLeave: () => void;
}

export function useCardTilt(ref: RefObject<HTMLElement | null>): CardTiltResult {
  const reducedMotion = useReducedMotion();
  const setCursorVariant = useGalleryStore((s) => s.setCursorVariant);
  const setCursorLabel = useGalleryStore((s) => s.setCursorLabel);

  const rawRotateX = useMotionValue(0);
  const rawRotateY = useMotionValue(0);
  const rawGlareX = useMotionValue(50);
  const rawGlareY = useMotionValue(50);

  const rotateX = useSpring(rawRotateX, TILT_SPRING);
  const rotateY = useSpring(rawRotateY, TILT_SPRING);
  const glareX = useSpring(rawGlareX, SPRINGS.smooth);
  const glareY = useSpring(rawGlareY, SPRINGS.smooth);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (reducedMotion || !ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const normalX = (e.clientX - rect.left) / rect.width;
      const normalY = (e.clientY - rect.top) / rect.height;

      rawRotateX.set((normalY - 0.5) * -MAX_TILT * 2);
      rawRotateY.set((normalX - 0.5) * MAX_TILT * 2);
      rawGlareX.set(normalX * 100);
      rawGlareY.set(normalY * 100);
    },
    [reducedMotion, ref, rawRotateX, rawRotateY, rawGlareX, rawGlareY],
  );

  const handleMouseEnter = useCallback(
    (label: string) => {
      setCursorVariant('hover');
      setCursorLabel(label);
    },
    [setCursorVariant, setCursorLabel],
  );

  const handleMouseLeave = useCallback(() => {
    rawRotateX.set(0);
    rawRotateY.set(0);
    rawGlareX.set(50);
    rawGlareY.set(50);
    setCursorVariant('default');
    setCursorLabel('');
  }, [rawRotateX, rawRotateY, rawGlareX, rawGlareY, setCursorVariant, setCursorLabel]);

  return {
    rotateX,
    rotateY,
    glareX,
    glareY,
    handleMouseMove,
    handleMouseEnter,
    handleMouseLeave,
  };
}
