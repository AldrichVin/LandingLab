import { motion, useScroll, useTransform } from 'framer-motion';
import { COLORS, TYPOGRAPHY, SPRINGS } from '@/shared/design-tokens';
import { useMouseParallax } from '@/shared/hooks/useMouseParallax';
import { useSplitText } from '@/shared/hooks/useSplitText';
import { useReducedMotion } from '@/shared/hooks/useReducedMotion';

const springTransition = {
  type: 'spring' as const,
  ...SPRINGS.gentle,
};

export default function HeroSection() {
  const { x: mouseX, y: mouseY } = useMouseParallax();
  const reducedMotion = useReducedMotion();
  const chars = useSplitText('Landing Lab');

  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);
  const heroY = useTransform(scrollY, [0, 400], [0, -60]);

  return (
    <motion.section
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
        opacity: reducedMotion ? 1 : heroOpacity,
        y: reducedMotion ? 0 : heroY,
      }}
    >
      {/* Badge — furthest parallax layer */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...springTransition, delay: 0.2 }}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          marginBottom: '1.5rem',
          x: reducedMotion ? 0 : useTransform(mouseX, (v) => v * -20),
          y: reducedMotion ? 0 : useTransform(mouseY, (v) => v * -12),
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

      {/* Title with split text — middle parallax layer */}
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.3 }}
        style={{
          fontFamily: TYPOGRAPHY.display,
          fontSize: 'clamp(3rem, 10vw, 7rem)',
          fontWeight: 700,
          color: COLORS.ink,
          lineHeight: 1.05,
          marginBottom: '1.25rem',
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
          x: reducedMotion ? 0 : useTransform(mouseX, (v) => v * -15),
          y: reducedMotion ? 0 : useTransform(mouseY, (v) => v * -10),
        }}
      >
        {chars.map((char, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              ...springTransition,
              delay: 0.35 + i * 0.04,
            }}
            style={{
              display: 'inline-block',
              whiteSpace: char === ' ' ? 'pre' : undefined,
            }}
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        ))}
      </motion.h1>

      {/* Subtitle — closest parallax layer */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...springTransition, delay: 0.8 }}
        style={{
          fontFamily: TYPOGRAPHY.body,
          fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
          fontWeight: 300,
          color: COLORS.inkLight,
          maxWidth: '28rem',
          lineHeight: 1.6,
          x: reducedMotion ? 0 : useTransform(mouseX, (v) => v * -8),
          y: reducedMotion ? 0 : useTransform(mouseY, (v) => v * -5),
        }}
      >
        An interactive archive of exquisite landing pages,
        each one a small world to explore.
      </motion.p>
    </motion.section>
  );
}
