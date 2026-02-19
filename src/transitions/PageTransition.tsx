import { motion, AnimatePresence } from 'framer-motion';
import { EASINGS, ZINDEX } from '@/shared/design-tokens';

interface PageTransitionProps {
  readonly isActive: boolean;
  readonly color?: string;
}

export default function PageTransition({ isActive, color = '#b0bec5' }: PageTransitionProps) {
  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: '0%' }}
          exit={{ y: '-100%' }}
          transition={{
            duration: 0.5,
            ease: EASINGS.sharpInOut as unknown as number[],
          }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: ZINDEX.transitionOverlay,
            background: color,
            pointerEvents: 'none',
          }}
        />
      )}
    </AnimatePresence>
  );
}
