import { CrossfadeOverlay } from './CrossfadeOverlay';
import { useAppStore } from '@/store/app-store';
import { PageViewer } from '@/viewer/PageViewer';
import { BackButton } from '@/ui/BackButton';

export function TransitionOrchestrator() {
  const { transitionState, activePage } = useAppStore();
  const showViewer = transitionState === 'inside' || transitionState === 'exiting';
  const showBack = transitionState === 'inside';

  return (
    <>
      <CrossfadeOverlay />
      {showViewer && activePage && (
        <PageViewer page={activePage} />
      )}
      {showBack && <BackButton />}
    </>
  );
}
