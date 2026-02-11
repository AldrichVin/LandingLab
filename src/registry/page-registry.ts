import type { PageEntry } from './types';

export const PAGE_REGISTRY: readonly PageEntry[] = [];

export function getPageBySlug(slug: string): PageEntry | undefined {
  return PAGE_REGISTRY.find((p) => p.slug === slug);
}
