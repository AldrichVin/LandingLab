import type { NodeLayout } from './hooks/useConstellationLayout';
import { useAdaptiveColor } from './hooks/useAdaptiveColor';

interface AdaptiveBackgroundProps {
  nodes: NodeLayout[];
}

export function AdaptiveBackground({ nodes }: AdaptiveBackgroundProps) {
  useAdaptiveColor(nodes);
  return null;
}
