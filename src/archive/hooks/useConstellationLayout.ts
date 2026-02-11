import { useMemo } from 'react';
import * as THREE from 'three';
import type { PageEntry } from '@/registry/types';
import { SCENE } from '@/shared/design-tokens';

const GOLDEN_ANGLE = Math.PI * (3 - Math.sqrt(5));

export interface NodeLayout {
  page: PageEntry;
  position: THREE.Vector3;
}

export function useConstellationLayout(pages: readonly PageEntry[]): NodeLayout[] {
  return useMemo(() => {
    return pages.map((page, i) => {
      const theta = i * GOLDEN_ANGLE;
      const radius = SCENE.constellationRadius * Math.sqrt((i + 1) / pages.length);
      const y = (i / (pages.length - 1) - 0.5) * SCENE.constellationRadius * 0.6;

      return {
        page,
        position: new THREE.Vector3(
          Math.cos(theta) * radius,
          y,
          Math.sin(theta) * radius,
        ),
      };
    });
  }, [pages]);
}
