import { PAGE_REGISTRY } from '@/registry/page-registry';
import ProjectCard from './ProjectCard';
import EmptyState from './EmptyState';

interface ProjectGridProps {
  readonly onSelectPage: (slug: string) => void;
}

export default function ProjectGrid({ onSelectPage }: ProjectGridProps) {
  if (PAGE_REGISTRY.length === 0) {
    return <EmptyState />;
  }

  return (
    <section
      style={{
        position: 'relative',
        zIndex: 10,
        padding: '2rem 1.5rem 6rem',
        maxWidth: '72rem',
        margin: '0 auto',
      }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.5rem',
        }}
      >
        {PAGE_REGISTRY.map((entry, i) => (
          <ProjectCard
            key={entry.slug}
            entry={entry}
            index={i}
            onClick={onSelectPage}
          />
        ))}
      </div>
    </section>
  );
}
