import React, { useEffect } from 'react';
import { useMediaLoader } from '@/hooks';
import AppRouter from '@/pages';
import Panic from '@/components/Panic';

const App: React.FC = () => {
  const [ml, error] = useMediaLoader();
  const ready = !!ml;

  useEffect(() => {
    if (error) {
      console.error(error);
    }
  }, [error]);

  if (error) {
    return <Panic error={error} />;
  }

  return ready ? <AppRouter /> : null;
};

export default App;
