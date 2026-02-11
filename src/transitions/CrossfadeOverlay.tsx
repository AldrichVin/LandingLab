import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '@/store/app-store';

export function CrossfadeOverlay() {
  const { transitionState, activePage } = useAppStore();
  const isVisible = transitionState === 'entering' || transitionState === 'exiting';
  const overlayColor = activePage?.color ?? '#0a0a1a';

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 30,
            background: `radial-gradient(ellipse at center, ${overlayColor}dd 0%, #0a0a1aff 100%)`,
            pointerEvents: 'none',
          }}
        />
      )}
    </AnimatePresence>
  );
}
