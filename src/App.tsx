import React, { useEffect, useState } from 'react';
import { animated, useSpring } from 'react-spring';
import { useMediaLoader } from '~/hooks';
import { LOADER_SKIPPED } from '~/env';
import Loader from '~/components/Loader';
import Panic from '~/components/Panic';
import AppRouter from '~/pages';

const AnimatedLoader = animated(Loader);

const App: React.FC = () => {
  const [progress, setProgress] = useState(0);
  const p = useSpring({ progress: progress / 100 });
  const [ml, error] = useMediaLoader();
  const [ready, setReady] = useState<boolean>(false);

  useEffect(() => {
    if (LOADER_SKIPPED || ml) {
      return;
    }
    if (progress === 0) {
      requestAnimationFrame(() => setProgress(40));
    } else if (progress < 95) {
      setTimeout(
        () => setProgress(Math.min(progress + Math.random() * 4 + 1, 95)),
        Math.random() * 500);
    }
  }, [progress, ml]);

  useEffect(() => {
    if (ml) {
      if (LOADER_SKIPPED) {
        setReady(true);
      } else {
        setTimeout(() => setProgress(100), 1000);
        setTimeout(() => setReady(true), 2000);
      }
    }
  }, [ml]);

  if (error) {
    return (
      <Panic error={error}/>
    );
  }

  if (!ready) {
    return LOADER_SKIPPED ? null : (
      <AnimatedLoader progress={p.progress} random={false}/>
    );
  }

  return (
    <AppRouter/>
  );
};

export default App;
