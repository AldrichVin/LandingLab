import { useEffect } from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  AnimatePresence,
} from 'framer-motion';
import { useGalleryStore } from '@/shared/store';
import { useViewportSize } from '@/shared/hooks/useViewportSize';
import { COLORS, SPRINGS, CURSOR, ZINDEX } from '@/shared/design-tokens';

const VARIANTS = {
  default: { dotScale: 1, ringScale: 1, dotOpacity: 1 },
  hover: { dotScale: 0, ringScale: 1.5, dotOpacity: 0 },
  drag: { dotScale: 0.8, ringScale: 0.8, dotOpacity: 1 },
  hidden: { dotScale: 0, ringScale: 0, dotOpacity: 0 },
} as const;

export default function CustomCursor() {
  const { isMobile } = useViewportSize();
  const cursorVariant = useGalleryStore((s) => s.cursorVariant);
  const cursorLabel = useGalleryStore((s) => s.cursorLabel);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const dotX = useSpring(mouseX, SPRINGS.cursor);
  const dotY = useSpring(mouseY, SPRINGS.cursor);
  const ringX = useSpring(mouseX, SPRINGS.cursorRing);
  const ringY = useSpring(mouseY, SPRINGS.cursorRing);

  useEffect(() => {
    if (isMobile) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.body.classList.add('custom-cursor');

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.body.classList.remove('custom-cursor');
    };
  }, [isMobile, mouseX, mouseY]);

  if (isMobile) return null;

  const v = VARIANTS[cursorVariant];

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: ZINDEX.cursor,
        pointerEvents: 'none',
      }}
    >
      {/* Dot */}
      <motion.div
        style={{
          position: 'absolute',
          width: CURSOR.dotSize,
          height: CURSOR.dotSize,
          borderRadius: '50%',
          background: COLORS.ink,
          x: dotX,
          y: dotY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: v.dotScale,
          opacity: v.dotOpacity,
        }}
        transition={{ type: 'spring', ...SPRINGS.cursor }}
      />

      {/* Ring */}
      <motion.div
        style={{
          position: 'absolute',
          width: CURSOR.ringSize,
          height: CURSOR.ringSize,
          borderRadius: '50%',
          border: `1.5px solid ${COLORS.ink}`,
          backdropFilter: 'blur(2px)',
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{ scale: v.ringScale }}
        transition={{ type: 'spring', ...SPRINGS.cursorRing }}
      />

      {/* Label */}
      <AnimatePresence>
        {cursorVariant === 'hover' && cursorLabel && (
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            transition={{ duration: 0.15 }}
            style={{
              position: 'absolute',
              x: ringX,
              y: ringY,
              translateX: '-50%',
              translateY: CURSOR.ringSize * 0.8,
              fontFamily: "'Inter', sans-serif",
              fontSize: '0.7rem',
              fontWeight: 500,
              color: COLORS.ink,
              whiteSpace: 'nowrap',
              letterSpacing: '0.04em',
              pointerEvents: 'none',
            }}
          >
            {cursorLabel}
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
}
