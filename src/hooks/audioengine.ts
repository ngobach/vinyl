import { useObservable } from 'react-use';
import {
  currentItem,
  currentPlayList,
  currentStatus,
  mode,
  playNext,
  playPlayList,
  playSingle,
  setMode,
  setVolume,
  togglePlay,
  volume,
} from '@/services/audioengine';

// eslint-disable-next-line
export function useMediaEngine() {
  return {
    currentPlayList: useObservable(currentPlayList, currentPlayList.value),
    currentTrack: useObservable(currentItem, currentItem.value),
    mode: useObservable(mode, mode.value),
    volume: useObservable(volume, volume.value),
    status: useObservable(currentStatus, currentStatus.value),
  };
}

// eslint-disable-next-line
export function useMediaController() {
  const engine = useMediaEngine();

  return {
    playPlayList,
    playSingle,
    setVolume,
    setMode,
    play() {
      togglePlay(true);
    },
    pause() {
      togglePlay(false);
    },
    next() {
      const tracks = engine.currentPlayList.tracks.concat(
        currentPlayList.value.tracks,
      );
      const nextTrack = tracks[tracks.indexOf(engine.currentTrack) + 1];
      playNext(nextTrack);
    },
    prev() {
      const tracks = engine.currentPlayList.tracks.concat(
        currentPlayList.value.tracks,
      );
      const nextTrack = tracks[tracks.lastIndexOf(engine.currentTrack) - 1];
      playNext(nextTrack);
    },
  };
}
