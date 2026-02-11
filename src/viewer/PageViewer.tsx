import { motion } from 'framer-motion';
import type { PageEntry } from '@/registry/types';

interface PageViewerProps {
  page: PageEntry;
}

export function PageViewer({ page }: PageViewerProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 20,
      }}
    >
      <iframe
        src={page.framerUrl}
        title={page.title}
        style={{
          width: '100%',
          height: '100%',
          border: 'none',
          background: '#0a0a1a',
        }}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope"
        loading="lazy"
      />
    </motion.div>
  );
}
