import { useState } from 'react';
import { useMount } from 'react-use';
import { currentList, playPlayList } from '~/services/audioengine';
import { PlayList } from '~/types';

export function useActivePlaylist(): PlayList {
  const [playlist, setPlaylist] = useState(currentList.value);
  useMount(() => {
    return currentList.subscribe((next) => setPlaylist(next));
  });
  return playlist;
}

export function usePlayPlayList(): typeof playPlayList {
  return playPlayList;
}
