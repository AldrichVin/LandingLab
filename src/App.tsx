import { useState, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import BackgroundScene from './scene/BackgroundScene';
import Home from './home/Home';
import PageViewer from './viewer/PageViewer';
import PageTransition from './transitions/PageTransition';
import { getPageBySlug } from './registry/page-registry';
import type { PageEntry } from './registry/types';

type AppState =
  | { view: 'home' }
  | { view: 'entering'; page: PageEntry }
  | { view: 'viewing'; page: PageEntry }
  | { view: 'exiting' };

export default function App() {
  const [state, setState] = useState<AppState>({ view: 'home' });

  const handleSelectPage = useCallback((slug: string) => {
    const page = getPageBySlug(slug);
    if (!page) return;

    setState({ view: 'entering', page });

    setTimeout(() => {
      setState({ view: 'viewing', page });
    }, 450);
  }, []);

  const handleBack = useCallback(() => {
    setState({ view: 'exiting' });

    setTimeout(() => {
      setState({ view: 'home' });
    }, 450);
  }, []);

  const isTransitioning = state.view === 'entering' || state.view === 'exiting';
  const transitionColor = state.view === 'entering' ? state.page.color : undefined;

  return (
    <>
      <BackgroundScene />

      <PageTransition isActive={isTransitioning} color={transitionColor} />

      <AnimatePresence mode="wait">
        {(state.view === 'home' || state.view === 'entering') && (
          <Home key="home" onSelectPage={handleSelectPage} />
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {state.view === 'viewing' && (
          <PageViewer
            key={state.page.slug}
            page={state.page}
            onBack={handleBack}
          />
        )}
      </AnimatePresence>
    </>
  );
}
