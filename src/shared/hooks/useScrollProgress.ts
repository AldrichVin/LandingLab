import { useScroll, useTransform, type MotionValue } from 'framer-motion';
import type { RefObject } from 'react';

/**
 * Get scroll progress for an element (0 to 1)
 */
export function useScrollProgress(
  ref: RefObject<HTMLElement>,
  offset: ['start end' | 'end start', 'start end' | 'end start'] = ['start end', 'end start']
): MotionValue<number> {
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: offset as any,
  });

  return scrollYProgress;
}

/**
 * Map scroll progress to a range of values
 */
export function useScrollTransform<T>(
  ref: RefObject<HTMLElement>,
  outputRange: T[],
  offset: ['start end' | 'end start', 'start end' | 'end start'] = ['start end', 'end start']
): MotionValue<T> {
  const progress = useScrollProgress(ref, offset);
  const inputRange = outputRange.map((_, i) => i / (outputRange.length - 1));

  return useTransform(progress, inputRange, outputRange);
}
