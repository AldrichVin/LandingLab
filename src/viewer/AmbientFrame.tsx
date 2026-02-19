import { motion } from 'framer-motion';
import { useReducedMotion } from '@/shared/hooks/useReducedMotion';
import { ZINDEX } from '@/shared/design-tokens';

interface AmbientFrameProps {
  readonly color: string;
}

const SIDES = ['top', 'bottom', 'left', 'right'] as const;

const SIDE_STYLES: Record<typeof SIDES[number], React.CSSProperties> = {
  top: {
    top: 0,
    left: 0,
    right: 0,
    height: '120px',
    background: 'linear-gradient(to bottom, var(--ambient-color), transparent)',
  },
  bottom: {
    bottom: 0,
    left: 0,
    right: 0,
    height: '120px',
    background: 'linear-gradient(to top, var(--ambient-color), transparent)',
  },
  left: {
    top: 0,
    bottom: 0,
    left: 0,
    width: '80px',
    background: 'linear-gradient(to right, var(--ambient-color), transparent)',
  },
  right: {
    top: 0,
    bottom: 0,
    right: 0,
    width: '80px',
    background: 'linear-gradient(to left, var(--ambient-color), transparent)',
  },
};

export default function AmbientFrame({ color }: AmbientFrameProps) {
  const reducedMotion = useReducedMotion();

  const ambientColor = `${color}26`;

  return (
    <>
      {SIDES.map((side, i) => (
        <motion.div
          key={side}
          initial={{ opacity: 0 }}
          animate={
            reducedMotion
              ? { opacity: 0.8 }
              : { opacity: [0.6, 1, 0.6] }
          }
          transition={
            reducedMotion
              ? { duration: 0.3 }
              : {
                  duration: 4,
                  repeat: Infinity,
                  repeatType: 'reverse' as const,
                  delay: i * 0.3,
                  ease: 'easeInOut',
                }
          }
          style={{
            ...SIDE_STYLES[side],
            '--ambient-color': ambientColor,
            position: 'fixed',
            zIndex: ZINDEX.ambientFrame,
            pointerEvents: 'none',
          } as React.CSSProperties}
        />
      ))}
    </>
  );
}
