import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import type { NodeLayout } from './useConstellationLayout';
import { dampedLerpColor } from '@/shared/spring';
import { useAppStore } from '@/store/app-store';
import { COLORS } from '@/shared/design-tokens';

const _tempColor = new THREE.Color();
const _blendColor = new THREE.Color();

export function useAdaptiveColor(nodes: NodeLayout[]) {
  const { camera } = useThree();
  const setAdaptiveColor = useAppStore((s) => s.setAdaptiveColor);
  const currentColor = useRef(new THREE.Color(COLORS.void));
  const frameCount = useRef(0);

  useFrame((_, delta) => {
    frameCount.current++;
    if (frameCount.current % 3 !== 0) return;

    if (nodes.length === 0) return;

    const distances = nodes.map((n) => ({
      node: n,
      dist: camera.position.distanceTo(n.position),
    }));
    distances.sort((a, b) => a.dist - b.dist);

    const closest = distances.slice(0, 3);
    const totalInv = closest.reduce((sum, c) => sum + 1 / (c.dist + 0.5), 0);

    _blendColor.set(COLORS.void);
    for (const c of closest) {
      const weight = (1 / (c.dist + 0.5)) / totalInv;
      _tempColor.set(c.node.page.color);
      _tempColor.multiplyScalar(0.25);
      _blendColor.lerp(_tempColor, weight);
    }

    dampedLerpColor(currentColor.current, _blendColor, delta, 0.08);
    setAdaptiveColor(`#${currentColor.current.getHexString()}`);
  });
}
