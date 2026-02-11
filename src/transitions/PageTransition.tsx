import { motion, AnimatePresence } from 'framer-motion';
import { TIMING } from '@/shared/design-tokens';

interface PageTransitionProps {
  readonly isActive: boolean;
  readonly color?: string;
}

export default function PageTransition({ isActive, color = '#b0bec5' }: PageTransitionProps) {
  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: TIMING.transitionOverlay / 1000 }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 60,
            background: `radial-gradient(ellipse at center, ${color}, ${color}ee)`,
            pointerEvents: 'none',
          }}
        />
      )}
    </AnimatePresence>
  );
}
