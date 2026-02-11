import type { PageEntry } from './types';

export const PAGE_REGISTRY: readonly PageEntry[] = [
  {
    slug: 'aurora',
    title: 'Aurora',
    subtitle: 'Northern light gradients',
    date: '2026-01-15',
    tags: ['gradient', 'immersive'],
    featured: true,
    color: '#6c9fcb',
    framerUrl: 'https://aurora-landing.framer.website',
  },
  {
    slug: 'ember',
    title: 'Ember',
    subtitle: 'Warmth in motion',
    date: '2026-01-28',
    tags: ['animation', 'warm'],
    featured: true,
    color: '#e8845c',
    framerUrl: 'https://ember-landing.framer.website',
  },
  {
    slug: 'velvet',
    title: 'Velvet',
    subtitle: 'Soft depth and texture',
    date: '2026-02-05',
    tags: ['texture', 'elegant'],
    featured: false,
    color: '#9b6b9e',
    framerUrl: 'https://velvet-landing.framer.website',
  },
  {
    slug: 'tide',
    title: 'Tide',
    subtitle: 'Fluid rhythm',
    date: '2026-02-10',
    tags: ['fluid', 'cool'],
    featured: true,
    color: '#4a90a4',
    framerUrl: 'https://tide-landing.framer.website',
  },
  {
    slug: 'solstice',
    title: 'Solstice',
    subtitle: 'Golden hour captured',
    date: '2025-12-21',
    tags: ['golden', 'atmospheric'],
    featured: false,
    color: '#d4a853',
    framerUrl: 'https://solstice-landing.framer.website',
  },
] as const;

export function getPageBySlug(slug: string): PageEntry | undefined {
  return PAGE_REGISTRY.find((p) => p.slug === slug);
}
