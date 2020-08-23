import { useState } from 'react';
import { useAsync } from 'react-use';
import mediaList, { MediaList } from '~/services/medialist';
import medialist from '~/services/medialist';

type Result = [MediaList, Error];

export function useMedialist() {
  return medialist;
}

export function useMediaLoader(): Result {
  const [ml, setMl] = useState<MediaList>(null);
  const [error, setError] = useState<Error>(null);
  useAsync(async () => {
    try {
      await mediaList.fetch();
      setMl(mediaList);
    } catch (error) {
      setError(error);
    }
  });
  return [ml, error];
}
