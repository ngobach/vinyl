import { useAsync } from 'react-use';
import MediaList from '@/services/medialist';

type Result = [MediaList, Error];

export function useMediaList(): MediaList {
  return MediaList;
}

export function useMediaLoader(): Result {
  const { value: ml, error } = useAsync(async (): Promise<MediaList> => {
    return await MediaList.ensureFetched();
  });

  return [ml, error];
}
