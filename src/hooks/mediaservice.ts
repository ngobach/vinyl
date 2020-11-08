import { useState } from 'react';
import { useAsync } from 'react-use';
import MediaList from '~/services/medialist';

type Result = [MediaList, Error];

export function useMediaList(): MediaList {
  return MediaList;
}

export function useMediaLoader(): Result {
  const [ml, setMl] = useState<MediaList>(null);
  const [error, setError] = useState<Error>(null);
  useAsync(async () => {
    try {
      await MediaList.ensureFetched();
      setMl(MediaList);
    } catch (error) {
      setError(error);
    }
  });

  return [ml, error];
}
