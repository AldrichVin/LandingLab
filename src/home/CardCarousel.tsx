import { useCallback, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, type PanInfo } from 'framer-motion';
import { PAGE_REGISTRY } from '@/registry/page-registry';
import { useGalleryStore } from '@/shared/store';
import { useViewportSize } from '@/shared/hooks/useViewportSize';
import { useReducedMotion } from '@/shared/hooks/useReducedMotion';
import { CAROUSEL, COLORS, SPRINGS, TYPOGRAPHY, ZINDEX } from '@/shared/design-tokens';
import ProjectCard from './ProjectCard';
import EmptyState from './EmptyState';

const VISIBLE_RANGE = 3;

export default function CardCarousel() {
  const { isMobile } = useViewportSize();
  const reducedMotion = useReducedMotion();
  const carouselIndex = useGalleryStore((s) => s.carouselIndex);
  const setCarouselIndex = useGalleryStore((s) => s.setCarouselIndex);
  const selectPage = useGalleryStore((s) => s.selectPage);
  const setDragging = useGalleryStore((s) => s.setDragging);

  const entries = PAGE_REGISTRY;
  const count = entries.length;

  if (count === 0) {
    return <EmptyState />;
  }

  const clampIndex = useCallback(
    (i: number) => Math.max(0, Math.min(i, count - 1)),
    [count],
  );

  const handlePanEnd = useCallback(
    (_: unknown, info: PanInfo) => {
      setDragging(false);
      if (Math.abs(info.offset.x) > CAROUSEL.dragThreshold) {
        const direction = info.offset.x > 0 ? -1 : 1;
        setCarouselIndex(clampIndex(carouselIndex + direction));
      }
    },
    [carouselIndex, clampIndex, setCarouselIndex, setDragging],
  );

  const handlePanStart = useCallback(() => {
    setDragging(true);
  }, [setDragging]);

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        setCarouselIndex(clampIndex(carouselIndex - 1));
      } else if (e.key === 'ArrowRight') {
        setCarouselIndex(clampIndex(carouselIndex + 1));
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [carouselIndex, clampIndex, setCarouselIndex]);

  const handleCardClick = useCallback(
    (index: number) => {
      if (index === carouselIndex) {
        selectPage(entries[index].slug);
      } else {
        setCarouselIndex(index);
      }
    },
    [carouselIndex, entries, selectPage, setCarouselIndex],
  );

  // Mobile: horizontal scroll-snap
  if (isMobile) {
    return (
      <MobileCarousel
        entries={entries}
        onSelect={(slug) => selectPage(slug)}
      />
    );
  }

  return (
    <section
      style={{
        position: 'relative',
        zIndex: ZINDEX.content,
        padding: '2rem 0 4rem',
      }}
    >
      {/* 3D container */}
      <div
        style={{
          perspective: `${CAROUSEL.perspective}px`,
          height: 480,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'visible',
        }}
      >
        <motion.div
          onPanStart={handlePanStart}
          onPanEnd={handlePanEnd}
          style={{
            position: 'relative',
            width: CAROUSEL.cardWidth,
            height: '100%',
            transformStyle: 'preserve-3d',
            cursor: 'grab',
          }}
        >
          {entries.map((entry, i) => {
            const offset = i - carouselIndex;
            if (Math.abs(offset) > VISIBLE_RANGE) return null;

            const absOffset = Math.abs(offset);
            const x = offset * (CAROUSEL.cardWidth + CAROUSEL.cardGap);
            const z = -absOffset * CAROUSEL.depthPerStep;
            const rotateY = offset * -CAROUSEL.rotationPerStep;
            const scale = 1 - absOffset * CAROUSEL.scalePerStep;
            const opacity = 1 - absOffset * CAROUSEL.opacityPerStep;
            const blur = Math.max(0, (absOffset - 1) * 1.5);

            return (
              <motion.div
                key={entry.slug}
                animate={
                  reducedMotion
                    ? { x, opacity, scale }
                    : { x, z, rotateY, scale, opacity }
                }
                transition={{
                  type: 'spring',
                  ...SPRINGS.smooth,
                }}
                onClick={() => handleCardClick(i)}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: '50%',
                  marginLeft: -(CAROUSEL.cardWidth / 2),
                  width: CAROUSEL.cardWidth,
                  height: '100%',
                  filter: blur > 0 ? `blur(${blur}px)` : undefined,
                  transformStyle: 'preserve-3d',
                  cursor: i === carouselIndex ? 'pointer' : 'default',
                  pointerEvents: absOffset > 2 ? 'none' : 'auto',
                }}
              >
                <ProjectCard
                  entry={entry}
                  index={i}
                  isCenter={i === carouselIndex}
                  onClick={() => handleCardClick(i)}
                />
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Navigation dots */}
      {count > 1 && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '0.5rem',
            marginTop: '1.5rem',
          }}
        >
          {entries.map((_, i) => (
            <button
              key={i}
              onClick={() => setCarouselIndex(i)}
              aria-label={`Go to card ${i + 1}`}
              style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                border: 'none',
                padding: 0,
                background: i === carouselIndex ? COLORS.ink : COLORS.inkLight,
                opacity: i === carouselIndex ? 1 : 0.4,
                transform: i === carouselIndex ? 'scale(1.3)' : 'scale(1)',
                transition: 'all 0.2s ease',
                cursor: 'pointer',
              }}
            />
          ))}
        </div>
      )}
    </section>
  );
}

function MobileCarousel({
  entries,
  onSelect,
}: {
  entries: readonly typeof PAGE_REGISTRY[number][];
  onSelect: (slug: string) => void;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <section
      style={{
        position: 'relative',
        zIndex: ZINDEX.content,
        padding: '1rem 0 3rem',
      }}
    >
      <div
        ref={scrollRef}
        style={{
          display: 'flex',
          gap: '1rem',
          overflowX: 'auto',
          scrollSnapType: 'x mandatory',
          padding: '0 calc((100vw - 85vw) / 2)',
          WebkitOverflowScrolling: 'touch',
          scrollbarWidth: 'none',
        }}
      >
        {entries.map((entry, i) => (
          <div
            key={entry.slug}
            style={{
              flex: '0 0 85vw',
              scrollSnapAlign: 'center',
            }}
          >
            <ProjectCard
              entry={entry}
              index={i}
              isCenter
              onClick={() => onSelect(entry.slug)}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
