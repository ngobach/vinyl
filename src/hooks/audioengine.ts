import { useState } from 'react';
import { useMount } from 'react-use';
import { currentPlayList, playPlayList } from '~/services/audioengine';
import { PlayList } from '~/types';

export function useActivePlaylist(): PlayList {
  const [playlist, setPlaylist] = useState(currentPlayList.value);
  useMount(() => {
    return currentPlayList.subscribe((next) => setPlaylist(next));
  });
  return playlist;
}

export function usePlayPlayList(): typeof playPlayList {
  return playPlayList;
}
