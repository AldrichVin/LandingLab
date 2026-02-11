import CloudLayer from './CloudLayer';
import HeroSection from './HeroSection';
import ProjectGrid from './ProjectGrid';
import { COLORS, TYPOGRAPHY } from '@/shared/design-tokens';

interface HomeProps {
  readonly onSelectPage: (slug: string) => void;
}

function Navbar() {
  return (
    <nav
      style={{
        position: 'fixed',
        top: '1rem',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 50,
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
    </nav>
  );
}

export default function Home({ onSelectPage }: HomeProps) {
  return (
    <>
      <CloudLayer />
      <Navbar />
      <main
        style={{
          position: 'relative',
          zIndex: 10,
          minHeight: '100vh',
          overflowY: 'auto',
        }}
      >
        <HeroSection />
        <ProjectGrid onSelectPage={onSelectPage} />
      </main>
    </>
  );
}
