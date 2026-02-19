import { useEffect, useRef } from 'react';
import type LocomotiveScroll from 'locomotive-scroll';

interface UseLocomotiveScrollOptions {
  el?: HTMLElement | null;
  smooth?: boolean;
  multiplier?: number;
  lerp?: number;
}

export function useLocomotiveScroll(options: UseLocomotiveScrollOptions = {}) {
  const scrollRef = useRef<LocomotiveScroll | null>(null);

  useEffect(() => {
    if (!options.el) return;

    // Dynamically import locomotive-scroll to avoid SSR issues
    import('locomotive-scroll').then(({ default: LocomotiveScroll }) => {
      const scroll = new LocomotiveScroll({
        el: options.el!,
        smooth: options.smooth ?? true,
        multiplier: options.multiplier ?? 1.0,
        lerp: options.lerp ?? 0.1,
      } as any);

      scrollRef.current = scroll;

      // Update on window resize
      const handleResize = () => {
        if (scrollRef.current && typeof (scrollRef.current as any).update === 'function') {
          (scrollRef.current as any).update();
        }
      };

      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
        if (scrollRef.current && typeof (scrollRef.current as any).destroy === 'function') {
          (scrollRef.current as any).destroy();
        }
        scrollRef.current = null;
      };
    });
  }, [options.el, options.smooth, options.multiplier, options.lerp]);

  return scrollRef;
}
