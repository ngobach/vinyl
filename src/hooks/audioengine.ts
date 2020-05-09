import { currentList, playList } from '~/services/audioengine';
import { PlayList } from '~/services/common';
import { useState, useEffect } from 'react';

export function useActivePlaylist(): PlayList {
  const [pl, setPl] = useState(currentList.value);
  useEffect(() => {
    currentList.subscribe((next) => setPl(next));
  }, [currentList.value]);
  return pl;
}

export function usePlayList() {
  return playList;
}
