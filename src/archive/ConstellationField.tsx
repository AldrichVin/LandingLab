import { PAGE_REGISTRY } from '@/registry/page-registry';
import { useConstellationLayout } from './hooks/useConstellationLayout';
import { PageNode } from './PageNode';
import { AdaptiveBackground } from './AdaptiveBackground';
import { CameraController } from './CameraController';

export function ConstellationField() {
  const nodes = useConstellationLayout(PAGE_REGISTRY);

  return (
    <>
      <CameraController nodes={nodes} />
      <AdaptiveBackground nodes={nodes} />
      {nodes.map((node) => (
        <PageNode
          key={node.page.slug}
          page={node.page}
          position={node.position}
        />
      ))}
    </>
  );
}
