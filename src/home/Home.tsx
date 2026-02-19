import { useRef } from 'react';
import { motion } from 'framer-motion';
import CloudLayer from './CloudLayer';
import HeroSection from './HeroSection';
import CardCarousel from './CardCarousel';
import ScrollReveal from '@/shared/components/ScrollReveal';
import { useMagneticButton } from '@/cursor/useMagneticButton';
import { COLORS, TYPOGRAPHY, ZINDEX } from '@/shared/design-tokens';

function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const { x, y } = useMagneticButton(navRef);

  return (
    <motion.nav
      ref={navRef}
      style={{
        position: 'fixed',
        top: '1rem',
        left: '50%',
        translateX: '-50%',
        x,
        y,
        zIndex: ZINDEX.navbar,
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        padding: '0.6rem 1.5rem',
        background: COLORS.glass,
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderRadius: '999px',
        border: `1px solid ${COLORS.glassBorder}`,
        boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
      }}
    >
      <span
        style={{
          fontFamily: TYPOGRAPHY.display,
          fontSize: '1rem',
          fontWeight: 600,
          color: COLORS.ink,
        }}
      >
        Landing Lab
      </span>
    </motion.nav>
  );
}

export default function Home() {
  return (
    <>
      <CloudLayer />
      <Navbar />
      <main
        style={{
          position: 'relative',
          zIndex: ZINDEX.content,
          minHeight: '100vh',
          overflowY: 'auto',
        }}
      >
        <HeroSection />
        <ScrollReveal>
          <CardCarousel />
        </ScrollReveal>
      </main>
    </>
  );
}
