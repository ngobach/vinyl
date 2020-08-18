import { currentList, playPlayList } from '~/services/audioengine';
import { PlayList } from '~/types';
import { useState, useEffect } from 'react';

export function useActivePlaylist(): PlayList {
  const [pl, setPl] = useState(currentList.value);
  useEffect(() => {
    currentList.subscribe((next) => setPl(next));
  }, [currentList.value]);
  return pl;
}

export function usePlayPlayList() {
  return playPlayList;
}
