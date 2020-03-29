import { useState, useEffect } from 'react';
import mediaList, { MediaList } from '~/services/medialist';

type Result = [MediaList, Error];

function useMediaLoader(): Result {
  const [ml, setMl] = useState<MediaList>(null);
  const [error, setError] = useState<Error>(null);
  useEffect(() => {
    mediaList.fetch().then(() => {
      setMl(mediaList);
    }, (err) => {
      setError(err);
    })
  }, []);
  return [ml, error];
}

export default useMediaLoader;
