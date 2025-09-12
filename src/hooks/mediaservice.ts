import { useAsync } from 'react-use';
import MediaList from '@/services/medialist';

export function useMediaList(): MediaList {
  return MediaList;
}

export function useMediaLoader(): [MediaList | undefined, Error | undefined] {
  const { value: ml, error } = useAsync(async (): Promise<MediaList> => {
    return await MediaList.ensureFetched();
  });

  return [ml, error];
}
