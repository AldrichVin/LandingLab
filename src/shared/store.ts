import { create } from 'zustand';
import { getPageBySlug } from '@/registry/page-registry';
import type { PageEntry } from '@/registry/types';

type View = 'home' | 'entering' | 'viewing' | 'exiting';
type CursorVariant = 'default' | 'hover' | 'drag' | 'hidden';

interface GalleryStore {
  readonly view: View;
  readonly activePage: PageEntry | null;
  readonly cursorVariant: CursorVariant;
  readonly cursorLabel: string;
  readonly carouselIndex: number;
  readonly isDragging: boolean;
  selectPage: (slug: string) => void;
  goBack: () => void;
  setCursorVariant: (v: CursorVariant) => void;
  setCursorLabel: (label: string) => void;
  setCarouselIndex: (i: number) => void;
  setDragging: (d: boolean) => void;
}

export const useGalleryStore = create<GalleryStore>((set) => ({
  view: 'home',
  activePage: null,
  cursorVariant: 'default',
  cursorLabel: '',
  carouselIndex: 0,
  isDragging: false,

  selectPage: (slug: string) => {
    const page = getPageBySlug(slug);
    if (!page) return;

    set({ view: 'entering', activePage: page });

    setTimeout(() => {
      set({ view: 'viewing' });
    }, 700);
  },

  goBack: () => {
    set({ view: 'exiting' });

    setTimeout(() => {
      set({ view: 'home', activePage: null, carouselIndex: 0 });
    }, 600);
  },

  setCursorVariant: (v) => set({ cursorVariant: v }),
  setCursorLabel: (label) => set({ cursorLabel: label }),
  setCarouselIndex: (i) => set({ carouselIndex: i }),
  setDragging: (d) => set({ isDragging: d }),
}));
