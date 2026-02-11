import { motion } from 'framer-motion';
import { COLORS, TYPOGRAPHY, TIMING } from '@/shared/design-tokens';
import { useReducedMotion } from '@/shared/hooks/useReducedMotion';

function EaselIllustration() {
  return (
    <svg
      width="120"
      height="140"
      viewBox="0 0 120 140"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      {/* Easel legs */}
      <line x1="30" y1="90" x2="20" y2="135" stroke={COLORS.inkLight} strokeWidth="2.5" strokeLinecap="round" />
      <line x1="90" y1="90" x2="100" y2="135" stroke={COLORS.inkLight} strokeWidth="2.5" strokeLinecap="round" />
      <line x1="60" y1="90" x2="60" y2="130" stroke={COLORS.inkLight} strokeWidth="2.5" strokeLinecap="round" />

      {/* Canvas frame */}
      <rect x="22" y="15" width="76" height="65" rx="4" fill="white" fillOpacity="0.6" stroke={COLORS.inkLight} strokeWidth="2" />

      {/* Inner canvas */}
      <rect x="28" y="21" width="64" height="53" rx="2" fill={COLORS.cloudCream} fillOpacity="0.5" />

      {/* Little star/sparkle in the empty canvas */}
      <path
        d="M60 42 L62 38 L64 42 L68 44 L64 46 L62 50 L60 46 L56 44 Z"
        fill={COLORS.cloudSlate}
        fillOpacity="0.7"
      />

      {/* Easel shelf */}
      <line x1="26" y1="78" x2="94" y2="78" stroke={COLORS.inkLight} strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

export default function EmptyState() {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.6, duration: 0.8 }}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '2rem 1.5rem 6rem',
        textAlign: 'center',
        position: 'relative',
        zIndex: 10,
      }}
    >
      <motion.div
        animate={
          reducedMotion
            ? {}
            : { y: [0, -6, 0] }
        }
        transition={
          reducedMotion
            ? { duration: 0 }
            : {
                duration: TIMING.emptyStateBob,
                repeat: Infinity,
                ease: 'easeInOut',
              }
        }
        style={{ marginBottom: '2rem' }}
      >
        <EaselIllustration />
      </motion.div>

      <p
        style={{
          fontFamily: TYPOGRAPHY.display,
          fontSize: 'clamp(1.1rem, 3vw, 1.5rem)',
          fontWeight: 500,
          fontStyle: 'italic',
          color: COLORS.inkLight,
          maxWidth: '24rem',
          lineHeight: 1.6,
        }}
      >
        No exhibits yet &mdash; the gallery is being curated.
      </p>

      <p
        style={{
          fontFamily: TYPOGRAPHY.body,
          fontSize: '0.875rem',
          fontWeight: 400,
          color: COLORS.inkLight,
          opacity: 0.7,
          marginTop: '0.75rem',
        }}
      >
        Check back soon for something beautiful.
      </p>
    </motion.div>
  );
}
