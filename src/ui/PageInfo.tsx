import { motion } from 'framer-motion';
import { useAppStore } from '@/store/app-store';
import { TYPOGRAPHY, COLORS } from '@/shared/design-tokens';

export function PageInfo() {
  const { activePage, transitionState } = useAppStore();
  if (transitionState !== 'inside' || !activePage) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.4, delay: 0.6 }}
      style={{
        position: 'fixed',
        bottom: '24px',
        left: '24px',
        zIndex: 40,
        fontFamily: TYPOGRAPHY.body,
        color: COLORS.cream,
        fontSize: '12px',
        opacity: 0.5,
        letterSpacing: '0.04em',
        textTransform: 'uppercase',
        pointerEvents: 'none',
        userSelect: 'none',
      }}
    >
      {activePage.title} — {activePage.subtitle}
    </motion.div>
  );
}
