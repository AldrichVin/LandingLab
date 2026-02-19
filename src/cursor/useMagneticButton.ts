import { useEffect, useCallback, type RefObject } from 'react';
import { useMotionValue, useSpring, type MotionValue } from 'framer-motion';
import { useGalleryStore } from '@/shared/store';
import { useViewportSize } from '@/shared/hooks/useViewportSize';
import { CURSOR, SPRINGS } from '@/shared/design-tokens';

interface MagneticResult {
  readonly x: MotionValue<number>;
  readonly y: MotionValue<number>;
}

export function useMagneticButton(
  ref: RefObject<HTMLElement | null>,
  strength = CURSOR.magneticStrength,
): MagneticResult {
  const { isMobile } = useViewportSize();
  const setCursorVariant = useGalleryStore((s) => s.setCursorVariant);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, SPRINGS.snappy);
  const y = useSpring(rawY, SPRINGS.snappy);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const distX = e.clientX - centerX;
      const distY = e.clientY - centerY;
      const dist = Math.sqrt(distX * distX + distY * distY);

      if (dist < CURSOR.magneticRange) {
        rawX.set(distX * strength);
        rawY.set(distY * strength);
      }
    },
    [ref, strength, rawX, rawY],
  );

  const handleMouseEnter = useCallback(() => {
    setCursorVariant('hover');
  }, [setCursorVariant]);

  const handleMouseLeave = useCallback(() => {
    rawX.set(0);
    rawY.set(0);
    setCursorVariant('default');
  }, [rawX, rawY, setCursorVariant]);

  useEffect(() => {
    if (isMobile || !ref.current) return;

    const el = ref.current;
    el.addEventListener('mousemove', handleMouseMove);
    el.addEventListener('mouseenter', handleMouseEnter);
    el.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      el.removeEventListener('mousemove', handleMouseMove);
      el.removeEventListener('mouseenter', handleMouseEnter);
      el.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isMobile, ref, handleMouseMove, handleMouseEnter, handleMouseLeave]);

  return { x, y };
}
