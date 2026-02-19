import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '@/shared/hooks/useReducedMotion';
import { EASINGS } from '@/shared/design-tokens';

interface ScrollRevealProps {
  readonly children: ReactNode;
  readonly direction?: 'up' | 'down' | 'left' | 'right';
  readonly delay?: number;
  readonly distance?: number;
  readonly once?: boolean;
}

const OFFSETS: Record<string, { x: number; y: number }> = {
  up: { x: 0, y: 1 },
  down: { x: 0, y: -1 },
  left: { x: 1, y: 0 },
  right: { x: -1, y: 0 },
};

export default function ScrollReveal({
  children,
  direction = 'up',
  delay = 0,
  distance = 40,
  once = true,
}: ScrollRevealProps) {
  const reducedMotion = useReducedMotion();
  const offset = OFFSETS[direction];

  if (reducedMotion) {
    return <>{children}</>;
  }

  return (
    <motion.div
      initial={{
        opacity: 0,
        x: offset.x * distance,
        y: offset.y * distance,
      }}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
      }}
      viewport={{ once, amount: 0.3 }}
      transition={{
        duration: 0.6,
        delay,
        ease: EASINGS.snappyDecel as unknown as number[],
      }}
    >
      {children}
    </motion.div>
  );
}
