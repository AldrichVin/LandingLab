import { Suspense } from 'react';
import { motion } from 'framer-motion';
import type { PageEntry } from '@/registry/types';

interface PageViewerProps {
  readonly page: PageEntry;
  readonly onBack: () => void;
}

export default function PageViewer({ page, onBack }: PageViewerProps) {
  const PageComponent = page.component;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 20,
        background: '#fff',
        overflowY: 'auto',
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
              fontFamily: "'Inter', sans-serif",
              color: '#5c5480',
            }}
          >
            Loading...
          </div>
        }
      >
        <PageComponent />
      </Suspense>

      <BackButton onClick={onBack} />
    </motion.div>
  );
}

function BackButton({ onClick }: { onClick: () => void }) {
  return (
    <motion.button
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.3, type: 'spring', stiffness: 200, damping: 20 }}
      onClick={onClick}
      style={{
        position: 'fixed',
        top: '1.25rem',
        left: '1.25rem',
        zIndex: 40,
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        padding: '0.5rem 1.25rem',
        background: 'rgba(255,255,255,0.7)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        border: '1px solid rgba(255,255,255,0.4)',
        borderRadius: '999px',
        cursor: 'pointer',
        fontFamily: "'Inter', sans-serif",
        fontSize: '0.85rem',
        fontWeight: 500,
        color: '#2a2450',
        boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
      }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Back to gallery"
    >
      <span aria-hidden>&#8592;</span>
      Back
    </motion.button>
  );
}
