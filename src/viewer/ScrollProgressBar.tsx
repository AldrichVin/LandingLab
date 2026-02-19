import { motion, useScroll, useSpring } from 'framer-motion';
import { ZINDEX } from '@/shared/design-tokens';

interface ScrollProgressBarProps {
  readonly color: string;
}

export default function ScrollProgressBar({ color }: ScrollProgressBarProps) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      initial={{ scaleY: 0 }}
      animate={{ scaleY: 1 }}
      transition={{ duration: 0.3, delay: 0.5 }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: 3,
        zIndex: ZINDEX.scrollProgress,
        background: color,
        transformOrigin: '0%',
        scaleX,
      }}
    />
  );
}
