import { motion } from 'framer-motion';
import { useAppStore } from '@/store/app-store';
import { TYPOGRAPHY, COLORS } from '@/shared/design-tokens';

export function BackButton() {
  const { exitPage, activePage } = useAppStore();

  return (
    <motion.button
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3, delay: 0.5 }}
      onClick={exitPage}
      aria-label="Back to constellation"
      style={{
        position: 'fixed',
        top: '24px',
        left: '24px',
        zIndex: 40,
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        background: 'rgba(10, 10, 26, 0.6)',
        backdropFilter: 'blur(12px)',
        border: '1px solid rgba(245, 240, 232, 0.15)',
        borderRadius: '100px',
        padding: '10px 20px',
        cursor: 'pointer',
        fontFamily: TYPOGRAPHY.body,
        fontSize: '13px',
        fontWeight: 500,
        color: COLORS.cream,
        letterSpacing: '0.02em',
      }}
    >
      <span
        style={{
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          background: activePage?.color ?? COLORS.mauve,
          boxShadow: `0 0 12px ${activePage?.color ?? COLORS.mauve}`,
        }}
      />
      Back
    </motion.button>
  );
}
