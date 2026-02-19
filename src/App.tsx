import { AnimatePresence, LayoutGroup } from 'framer-motion';
import BackgroundScene from './scene/BackgroundScene';
import Home from './home/Home';
import PageViewer from './viewer/PageViewer';
import PageTransition from './transitions/PageTransition';
import CustomCursor from './cursor/CustomCursor';
import { useGalleryStore } from './shared/store';

export default function App() {
  const view = useGalleryStore((s) => s.view);
  const activePage = useGalleryStore((s) => s.activePage);

  const isTransitioning = view === 'entering' || view === 'exiting';
  const transitionColor = view === 'entering' ? activePage?.color : undefined;

  return (
    <LayoutGroup>
      <BackgroundScene />
      <CustomCursor />

      <PageTransition isActive={isTransitioning} color={transitionColor} />

      <AnimatePresence mode="wait">
        {(view === 'home' || view === 'entering') && (
          <Home key="home" />
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {view === 'viewing' && activePage && (
          <PageViewer key={activePage.slug} page={activePage} />
        )}
      </AnimatePresence>
    </LayoutGroup>
  );
}
