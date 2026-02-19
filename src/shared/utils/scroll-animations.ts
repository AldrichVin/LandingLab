import { useEffect, useState, type RefObject } from 'react';
import { useScroll, useTransform, type MotionValue } from 'framer-motion';

/**
 * Track scroll progress of an element (0 to 1)
 */
export function useScrollProgress(ref: RefObject<HTMLElement>) {
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'] as any,
  });

  return scrollYProgress;
}

/**
 * Create a CSS variable for scroll progress
 */
export function useScrollCSSProgress(
  ref: RefObject<HTMLElement>,
  varName: string = '--progress'
): void {
  const progress = useScrollProgress(ref);

  useEffect(() => {
    const unsubscribe = progress.on('change', (latest) => {
      if (ref.current) {
        ref.current.style.setProperty(varName, latest.toString());
      }
    });

    return () => unsubscribe();
  }, [progress, ref, varName]);
}

/**
 * Split text into characters for animation
 */
export function useSplitText(text: string): string[] {
  return text.split('');
}

/**
 * Split text into words for animation
 */
export function useSplitWords(text: string): string[] {
  return text.split(' ');
}

/**
 * Trigger animation when element enters viewport
 */
export function useScrollTrigger(
  ref: RefObject<HTMLElement>,
  threshold: number = 0.1
): boolean {
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [ref, threshold]);

  return isInView;
}

/**
 * Create parallax transform based on scroll
 */
export function useParallaxTransform(
  scrollY: MotionValue<number>,
  speed: number = 0.5
): MotionValue<string> {
  return useTransform(scrollY, (value) => `translateY(${value * speed}px)`);
}

/**
 * Create fade out effect based on scroll
 */
export function useFadeOnScroll(
  scrollY: MotionValue<number>,
  startY: number,
  endY: number
): MotionValue<number> {
  return useTransform(scrollY, [startY, endY], [1, 0]);
}
