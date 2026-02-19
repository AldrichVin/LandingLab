import { useRef } from 'react';
import { motion, useTransform } from 'framer-motion';
import type { PageEntry } from '@/registry/types';
import { useCardTilt } from '@/cursor/useCardTilt';
import { COLORS, TYPOGRAPHY, SPRINGS } from '@/shared/design-tokens';

interface ProjectCardProps {
  readonly entry: PageEntry;
  readonly index: number;
  readonly isCenter?: boolean;
  readonly onClick: (slug: string) => void;
}

export default function ProjectCard({
  entry,
  index,
  isCenter = false,
  onClick,
}: ProjectCardProps) {
  const cardRef = useRef<HTMLElement>(null);
  const {
    rotateX,
    rotateY,
    glareX,
    glareY,
    handleMouseMove,
    handleMouseEnter,
    handleMouseLeave,
  } = useCardTilt(cardRef);

  return (
    <motion.article
      ref={cardRef}
      layoutId={`card-${entry.slug}`}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.5, type: 'spring', ...SPRINGS.snappy }}
      whileHover={isCenter ? { y: -8, scale: 1.02 } : undefined}
      whileTap={isCenter ? { scale: 0.98 } : undefined}
      onClick={() => onClick(entry.slug)}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => handleMouseEnter(entry.title)}
      onMouseLeave={handleMouseLeave}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick(entry.slug);
        }
      }}
      style={{
        background: COLORS.cardBg,
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderRadius: '1rem',
        border: `1px solid ${COLORS.glassBorder}`,
        padding: '1.5rem',
        cursor: 'pointer',
        overflow: 'hidden',
        position: 'relative',
        height: '100%',
        rotateX: isCenter ? rotateX : 0,
        rotateY: isCenter ? rotateY : 0,
        transformPerspective: 800,
      }}
    >
      {/* Glare overlay */}
      {isCenter && (
        <motion.div
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '1rem',
            background: useTransform(
              [glareX, glareY],
              ([gx, gy]) =>
                `radial-gradient(circle at ${gx}% ${gy}%, rgba(255,255,255,0.15), transparent 60%)`,
            ),
            mixBlendMode: 'overlay',
            pointerEvents: 'none',
            zIndex: 2,
          }}
        />
      )}

      {/* Accent strip */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '4px',
          background: entry.color,
          borderRadius: '1rem 1rem 0 0',
        }}
      />

      {/* Thumbnail placeholder */}
      <div
        style={{
          width: '100%',
          aspectRatio: '16 / 10',
          borderRadius: '0.5rem',
          background: `linear-gradient(135deg, ${entry.color}40, ${entry.color}20)`,
          marginBottom: '1rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <span
          style={{
            fontSize: '2rem',
            opacity: 0.3,
            color: COLORS.ink,
          }}
        >
          &#10022;
        </span>
      </div>

      <h3
        style={{
          fontFamily: TYPOGRAPHY.display,
          fontSize: '1.25rem',
          fontWeight: 600,
          color: COLORS.ink,
          marginBottom: '0.25rem',
        }}
      >
        {entry.title}
      </h3>

      <p
        style={{
          fontFamily: TYPOGRAPHY.body,
          fontSize: '0.8rem',
          fontWeight: 400,
          color: COLORS.inkLight,
          letterSpacing: '0.05em',
        }}
      >
        {entry.subtitle}
      </p>

      {/* Tags */}
      <div
        style={{
          display: 'flex',
          gap: '0.4rem',
          marginTop: '0.75rem',
          flexWrap: 'wrap',
        }}
      >
        {entry.tags.map((tag) => (
          <span
            key={tag}
            style={{
              fontFamily: TYPOGRAPHY.body,
              fontSize: '0.65rem',
              fontWeight: 500,
              color: COLORS.inkLight,
              background: 'rgba(255,255,255,0.5)',
              padding: '0.15rem 0.5rem',
              borderRadius: '999px',
              letterSpacing: '0.04em',
            }}
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.article>
  );
}
