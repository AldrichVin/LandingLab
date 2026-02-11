import { ArchiveScene } from '@/archive/ArchiveScene';
import { TransitionOrchestrator } from '@/transitions/TransitionOrchestrator';
import { PageInfo } from '@/ui/PageInfo';

export default function App() {
  return (
    <>
      <ArchiveScene />
      <TransitionOrchestrator />
      <PageInfo />
    </>
  );
}
