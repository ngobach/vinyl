/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { useState, useEffect, FunctionComponent } from 'react';
import { useSpring, animated } from 'react-spring';
import useMedialistLoader from '~/hooks/use-medialist-loader';

import Loader from './Loader';
import Panic from './Panic';

const AnimatedLoader = animated(Loader);

const App: FunctionComponent<{}> = () => {
  const [progress, setProgress] = useState(0);
  const p = useSpring({ progress: progress / 100 });
  const [ml, error] = useMedialistLoader();
  const [ready, setReady] = useState<boolean>(false);

  useEffect(() => {
    if (ml) {
      return;
    }
    if (progress === 0) {
      requestAnimationFrame(() => setProgress(40));
    } else if (progress < 95) {
      setTimeout(() => setProgress(Math.min(progress + Math.random() * 4 + 1, 95)), Math.random() * 500);
    }
  }, [progress, ml]);

  useEffect(() => {
    if (ml) {
      setTimeout(() => setProgress(100), 1000);
      setTimeout(() => setReady(true), 2000);
      return;
    }
  }, [ml]);

  if (error) {
    return (
      <Panic error={error} />
    );
  }

  if (!ready) {
    return (
      <AnimatedLoader progress={p.progress} random={false} />
    );
  }
  return (
    <div>Nice</div>
  )
}

export default App;
