import { Suspense, useEffect, useRef, useState } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import type { PageEntry } from '@/registry/types';
import { useGalleryStore } from '@/shared/store';
import { useMagneticButton } from '@/cursor/useMagneticButton';
import ScrollProgressBar from './ScrollProgressBar';
import AmbientFrame from './AmbientFrame';
import { COLORS, TYPOGRAPHY, SPRINGS, ZINDEX } from '@/shared/design-tokens';

interface PageViewerProps {
  readonly page: PageEntry;
}

export default function PageViewer({ page }: PageViewerProps) {
  const goBack = useGalleryStore((s) => s.goBack);
  const PageComponent = page.component;

  // Escape key to go back
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') goBack();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [goBack]);

  return (
    <motion.div
      layoutId={`card-${page.slug}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: ZINDEX.pageViewer,
        background: '#fff',
        overflowY: 'auto',
        borderRadius: 0,
      }}
    >
      <Suspense
        fallback={
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100vh',
              fontFamily: TYPOGRAPHY.body,
              color: COLORS.inkLight,
            }}
          >
            Loading...
          </div>
        }
      >
        <PageComponent />
      </Suspense>

      <ScrollProgressBar color={page.color} />
      <AmbientFrame color={page.color} />
      <BackButton onClick={goBack} />
    </motion.div>
  );
}

function BackButton({ onClick }: { onClick: () => void }) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { x: magnetX, y: magnetY } = useMagneticButton(buttonRef);
  const [collapsed, setCollapsed] = useState(false);

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const prev = scrollY.getPrevious() ?? 0;
    if (latest > 200 && latest > prev) {
      setCollapsed(true);
    } else if (latest < prev || latest < 50) {
      setCollapsed(false);
    }
  });

  return (
    <motion.button
      ref={buttonRef}
      initial={{ opacity: 0, x: -20 }}
      animate={{
        opacity: 1,
        x: 0,
        width: collapsed ? 40 : 'auto',
        paddingLeft: collapsed ? '0.5rem' : '1.25rem',
        paddingRight: collapsed ? '0.5rem' : '1.25rem',
      }}
      transition={{ delay: 0.3, type: 'spring', ...SPRINGS.snappy }}
      onClick={onClick}
      style={{
        position: 'fixed',
        top: '1.25rem',
        left: '1.25rem',
        zIndex: ZINDEX.backButton,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: collapsed ? 0 : '0.5rem',
        padding: '0.5rem 1.25rem',
        background: 'rgba(255,255,255,0.7)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        border: '1px solid rgba(255,255,255,0.4)',
        borderRadius: '999px',
        cursor: 'pointer',
        fontFamily: TYPOGRAPHY.body,
        fontSize: '0.85rem',
        fontWeight: 500,
        color: COLORS.ink,
        boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
        x: magnetX,
        y: magnetY,
        overflow: 'hidden',
      }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Back to gallery"
    >
      <span aria-hidden>&#8592;</span>
      <motion.span
        animate={{ opacity: collapsed ? 0 : 1, width: collapsed ? 0 : 'auto' }}
        transition={{ duration: 0.15 }}
        style={{ overflow: 'hidden', whiteSpace: 'nowrap' }}
      >
        Back
      </motion.span>
    </motion.button>
  );
}
