import { useState } from 'react';
import { useMount } from 'react-use';
import { currentPlayList, playPlayList, playSingle } from '~/services/audioengine';
import { PlayList } from '~/types';

export function useActivePlaylist(): PlayList {
  const [playlist, setPlaylist] = useState(currentPlayList.value);
  useMount(() => {
    return currentPlayList.subscribe((next) => setPlaylist(next));
  });
  return playlist;
}

// eslint-disable-next-line
export function useMediaController() {
  return {
    playPlayList: playPlayList,
    playSingle: playSingle,
  };
}
