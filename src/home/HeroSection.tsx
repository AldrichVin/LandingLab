import { motion } from 'framer-motion';
import { COLORS, TYPOGRAPHY } from '@/shared/design-tokens';

const springTransition = {
  type: 'spring' as const,
  stiffness: 120,
  damping: 20,
  mass: 1,
};

export default function HeroSection() {
  return (
    <section
      style={{
        position: 'relative',
        zIndex: 10,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '70vh',
        padding: '6rem 1.5rem 2rem',
        textAlign: 'center',
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...springTransition, delay: 0.2 }}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          marginBottom: '1.5rem',
        }}
      >
        <span style={{ fontSize: '1.5rem' }}>&#10022;</span>
        <span
          style={{
            fontFamily: TYPOGRAPHY.body,
            fontSize: '0.85rem',
            fontWeight: 500,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: COLORS.inkLight,
          }}
        >
          A curated collection
        </span>
        <span style={{ fontSize: '1.5rem' }}>&#10022;</span>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...springTransition, delay: 0.35 }}
        style={{
          fontFamily: TYPOGRAPHY.display,
          fontSize: 'clamp(3rem, 10vw, 7rem)',
          fontWeight: 700,
          color: COLORS.ink,
          lineHeight: 1.05,
          marginBottom: '1.25rem',
        }}
      >
        Landing Lab
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...springTransition, delay: 0.5 }}
        style={{
          fontFamily: TYPOGRAPHY.body,
          fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
          fontWeight: 300,
          color: COLORS.inkLight,
          maxWidth: '28rem',
          lineHeight: 1.6,
        }}
      >
        An interactive archive of exquisite landing pages,
        each one a small world to explore.
      </motion.p>
    </section>
  );
}
