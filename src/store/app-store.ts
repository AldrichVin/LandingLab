import { create } from 'zustand';
import * as THREE from 'three';
import type { PageEntry } from '@/registry/types';

export type TransitionState = 'idle' | 'entering' | 'inside' | 'exiting';

interface AppState {
  transitionState: TransitionState;
  activePage: PageEntry | null;
  hoveredPage: PageEntry | null;
  cameraTarget: THREE.Vector3;
  adaptiveColor: string;

  enterPage: (page: PageEntry) => void;
  exitPage: () => void;
  setTransitionState: (state: TransitionState) => void;
  setHoveredPage: (page: PageEntry | null) => void;
  setCameraTarget: (target: THREE.Vector3) => void;
  setAdaptiveColor: (color: string) => void;
}

export const useAppStore = create<AppState>((set) => ({
  transitionState: 'idle',
  activePage: null,
  hoveredPage: null,
  cameraTarget: new THREE.Vector3(0, 0, 0),
  adaptiveColor: '#0a0a1a',

  enterPage: (page) =>
    set({ activePage: page, transitionState: 'entering' }),

  exitPage: () =>
    set({ transitionState: 'exiting' }),

  setTransitionState: (transitionState) =>
    set({ transitionState, ...(transitionState === 'idle' ? { activePage: null } : {}) }),

  setHoveredPage: (hoveredPage) =>
    set({ hoveredPage }),

  setCameraTarget: (cameraTarget) =>
    set({ cameraTarget }),

  setAdaptiveColor: (adaptiveColor) =>
    set({ adaptiveColor }),
}));
